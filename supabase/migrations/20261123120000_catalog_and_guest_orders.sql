-- Esquema inicial inferido de los objetos JavaScript del proyecto.
-- El PDF disponible no contiene un modelo ER formal; ver .docs/supabase-integration/ANALISIS.md.

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  active boolean not null default true
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  status text not null default 'pendiente'
    check (status in ('pendiente', 'preparacion', 'listo', 'entregado')),
  customer_name text,
  customer_email text,
  customer_phone text,
  customer_address text,
  subtotal numeric(10, 2) not null default 0 check (subtotal >= 0),
  service_fee numeric(10, 2) not null default 0 check (service_fee >= 0),
  total numeric(10, 2) not null default 0 check (total >= 0),
  created_at timestamptz not null default now(),
  check (customer_name is null or char_length(customer_name) <= 120),
  check (customer_email is null or char_length(customer_email) <= 254),
  check (customer_phone is null or char_length(customer_phone) <= 40),
  check (customer_address is null or char_length(customer_address) <= 300)
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id) on delete restrict,
  product_name text not null,
  quantity integer not null check (quantity between 1 and 50),
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  options jsonb not null default '{}'::jsonb
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists order_items_order_id_idx on public.order_items (order_id);

insert into public.products (id, name, category, unit_price) values
  ('cafe-bourbon', 'Café Bourbon', 'cafes', 25),
  ('flat-white', 'Flat White Herencia', 'cafes', 32),
  ('latte-clasico', 'Latte Macchiato Clásico', 'cafes', 30),
  ('espresso-doble', 'Espresso Doble', 'cafes', 20),
  ('capuccino-canela', 'Capuccino con Canela', 'cafes', 29),
  ('americano-herencia', 'Americano Herencia', 'cafes', 22),
  ('mocha-artesanal', 'Mocha Artesanal', 'cafes', 34),
  ('croissant-mantequilla', 'Croissant de Mantequilla', 'desayunos', 18),
  ('tostada-aguacate', 'Tostada de Aguacate', 'desayunos', 45),
  ('huevos-benedictinos', 'Huevos Benedictinos', 'desayunos', 52),
  ('granola-casa', 'Granola de la Casa', 'desayunos', 36),
  ('focaccia-romero', 'Focaccia de Romero y Oliva', 'desayunos', 33),
  ('limonada-romero', 'Limonada de Romero', 'bebidas', 24),
  ('te-earl-grey', 'Té Earl Grey Artesanal', 'bebidas', 21),
  ('chocolate-caliente', 'Chocolate Caliente Noir', 'bebidas', 30),
  ('cold-brew-tonic', 'Cold Brew Tonic', 'bebidas', 35),
  ('matcha-avena', 'Matcha con Avena', 'bebidas', 38),
  ('tarta-limon', 'Tarta Rústica de Limón', 'postres', 28),
  ('cheesecake-frutos', 'Cheesecake de Frutos Rojos', 'postres', 32),
  ('brownie-noir', 'Brownie Café Noir', 'postres', 26),
  ('tiramisu-bourbon', 'Tiramisú Bourboneria', 'postres', 34),
  ('galleta-avena', 'Galleta de Avena y Miel', 'postres', 16),
  ('caja-trufas', 'Caja Degustación de Trufas', 'especialidades', 96),
  ('brunch-bourboneria', 'Brunch Bourboneria', 'especialidades', 118),
  ('tabla-panaderia', 'Tabla de Panadería', 'especialidades', 88),
  ('cata-cafe', 'Cata de Café de Origen', 'especialidades', 75),
  ('pack-regalo', 'Pack tablita La Bourbonería', 'especialidades', 145)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  unit_price = excluded.unit_price,
  active = true;

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

revoke all on public.products, public.orders, public.order_items from anon, authenticated;
grant select on public.products to anon, authenticated;

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
  on public.products for select to anon, authenticated
  using (active);

create or replace function public.submit_order(p_customer jsonb, p_items jsonb)
returns table (order_number text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_order_id uuid := pg_catalog.gen_random_uuid();
  v_order_number text := 'LB-' || pg_catalog.upper(pg_catalog.substr(pg_catalog.replace(v_order_id::text, '-', ''), 1, 10));
  v_item jsonb;
  v_product_id text;
  v_product_name text;
  v_unit_price numeric(10, 2);
  v_quantity integer;
  v_subtotal numeric(10, 2) := 0;
  v_service_fee numeric(10, 2);
  v_customer_name text;
  v_customer_email text;
  v_customer_phone text;
  v_customer_address text;
  v_line_count integer;
begin
  if p_customer is null or pg_catalog.jsonb_typeof(p_customer) <> 'object' then
    raise exception 'Datos de cliente inválidos';
  end if;
  if p_items is null or pg_catalog.jsonb_typeof(p_items) <> 'array' then
    raise exception 'El pedido no contiene una lista válida de productos';
  end if;

  v_line_count := pg_catalog.jsonb_array_length(p_items);
  if v_line_count < 1 or v_line_count > 30 then
    raise exception 'El pedido debe tener entre 1 y 30 productos';
  end if;

  v_customer_name := nullif(pg_catalog.btrim(p_customer->>'name'), '');
  v_customer_email := nullif(pg_catalog.btrim(p_customer->>'email'), '');
  v_customer_phone := nullif(pg_catalog.btrim(p_customer->>'phone'), '');
  v_customer_address := nullif(pg_catalog.btrim(p_customer->>'address'), '');

  if v_customer_name is not null and pg_catalog.char_length(v_customer_name) > 120 then
    raise exception 'El nombre supera el límite permitido';
  end if;
  if v_customer_email is not null and (pg_catalog.char_length(v_customer_email) > 254 or v_customer_email !~* '^[^@[:space:]]+@[^@[:space:]]+[.][^@[:space:]]+$') then
    raise exception 'El correo no es válido';
  end if;
  if v_customer_phone is not null and pg_catalog.char_length(v_customer_phone) > 40 then
    raise exception 'El teléfono supera el límite permitido';
  end if;
  if v_customer_address is not null and pg_catalog.char_length(v_customer_address) > 300 then
    raise exception 'La dirección supera el límite permitido';
  end if;

  insert into public.orders (id, order_number, customer_name, customer_email, customer_phone, customer_address)
  values (v_order_id, v_order_number, v_customer_name, v_customer_email, v_customer_phone, v_customer_address);

  for v_item in select value from pg_catalog.jsonb_array_elements(p_items)
  loop
    v_product_id := nullif(pg_catalog.btrim(v_item->>'id'), '');
    if v_product_id is null then
      raise exception 'Producto inválido en el pedido';
    end if;
    begin
      v_quantity := (v_item->>'qty')::integer;
    exception when others then
      raise exception 'Cantidad inválida para el producto %', v_product_id;
    end;
    if v_quantity < 1 or v_quantity > 50 then
      raise exception 'La cantidad debe estar entre 1 y 50';
    end if;

    select p.name, p.unit_price into v_product_name, v_unit_price
    from public.products as p
    where p.id = v_product_id and p.active;
    if not found then
      raise exception 'Producto no disponible: %', v_product_id;
    end if;

    insert into public.order_items (order_id, product_id, product_name, quantity, unit_price, options)
    values (
      v_order_id,
      v_product_id,
      v_product_name,
      v_quantity,
      v_unit_price,
      pg_catalog.jsonb_build_object(
        'milk', pg_catalog.left(coalesce(v_item->>'milk', ''), 80),
        'sugar', pg_catalog.left(coalesce(v_item->>'sugar', ''), 80),
        'allergy', pg_catalog.left(coalesce(v_item->>'allergy', ''), 300)
      )
    );
    v_subtotal := v_subtotal + (v_unit_price * v_quantity);
  end loop;

  v_service_fee := case when v_subtotal > 0 then 5 else 0 end;
  update public.orders
  set subtotal = v_subtotal, service_fee = v_service_fee, total = v_subtotal + v_service_fee
  where id = v_order_id;

  return query select v_order_number;
end;
$$;

revoke all on function public.submit_order(jsonb, jsonb) from public;
grant execute on function public.submit_order(jsonb, jsonb) to anon, authenticated;
