# Análisis del modelo ER/CRUD y correspondencia con La Bourboneria

## Fuente revisada

- Archivo solicitado: `.docs/ER-CRUD/ER-CRUD.pdf`.
- Validez técnica: PDF de 4 páginas, texto extraíble y páginas revisadas visualmente.
- Hallazgo: el archivo tiene el mismo SHA-256 (`51e27d59476e234c8c6172345f1554c888d323788d9954d2eb0870f4914ab533`) que `.docs/supabase-integration/INFORME-TECNICO-SUPABASE-CRUD-CORREGIDO.pdf`. Es el informe técnico actualizado sobre el CRUD actual y Supabase, no un modelo entidad-relación.
- No contiene diagrama entidad-relación, definición de esquema PostgreSQL, PK/FK ni matriz de permisos por rol. Sí documenta la diferencia entre el commit `da0c30c` (AdminPage con contactos y cambio de estado local) y el workspace actual (RestrictedAdminPage), además de la prueba local automatizada del acceso directo a `/admin`.
- No se encontraron imágenes o diagramas ER incrustados. Se revisó el texto extraíble y visualmente las cuatro páginas.
- Las páginas describen operaciones de la aplicación cliente. No deben interpretarse como definición de tablas, relaciones ni políticas de acceso.

### Contenido relevante por página

1. **Página 1:** React + Vite, estado local, preparación Supabase y decisiones técnicas.
2. **Página 2:** matriz de interfaz para catálogo, carrito, pedido y perfil; corrección por versión del flujo `/admin` y precisión del riesgo local.
3. **Página 3:** prueba automatizada del pedido ficticio, alcance de esa prueba y estado de preparación de Supabase.
4. **Página 4:** diagrama que separa el flujo local actual de la propuesta de autorización por servidor al conectar pedidos reales.

## Requisitos ER que el PDF no define

| Requisito de esquema | Resultado en el PDF |
|---|---|
| Entidades/tablas formales | Nombra catálogo, carrito, pedido y perfil como áreas de interfaz; no los define como tablas. |
| Atributos de cada entidad | No especificados como modelo persistente. |
| Tipos PostgreSQL | No especificados. |
| Claves primarias (PK) | No especificadas. |
| Claves foráneas (FK) | No especificadas. |
| Nulabilidad y valores por defecto | No especificados. |
| Relaciones y cardinalidades | No especificadas. |
| Reglas `ON DELETE` | No especificadas. |
| Roles y permisos por operación | No existe matriz de autorización por rol. El PDF indica que el panel administrativo está restringido. |

## CRUD de interfaz documentado por la fuente

| Área | Crear | Leer | Actualizar | Eliminar | Fuente de datos actual |
|---|---|---|---|---|---|
| Catálogo | No | Consultar productos | No | No | Arreglo JavaScript estático. |
| Carrito | Agregar producto | Consultar líneas | Cantidad y opciones | Quitar al llegar a cero o limpiar | Estado React compartido y `localStorage`. |
| Pedido | Confirmar compra | Confirmación e historial | Cambio de estado administrativo deshabilitado | No | Estado local y `localStorage`; máximo 12 pedidos guardados. |
| Perfil | Guardar datos | Formulario del navegador | Editar y guardar | Limpiar | Estado React y `localStorage`; no es una cuenta autenticada. |

Esta tabla transcribe el comportamiento descrito en la página 2. No representa permisos de base de datos ni autorización segura.

## Correspondencia con el código observado

| Fuente/área | Operación observada | Correspondencia provisional |
|---|---|---|
| `src/data/products.js` | Catálogo definido como arreglo `PRODUCTS`, con `id`, `name`, `category`, `price`, `image`, `description`. | Solo lectura en la interfaz. El PDF no define tipos SQL, PK ni restricciones. |
| `src/App.jsx` (`addToCart`, `changeQuantity`, `updatePreference`, `clearCart`) | Agrega productos por ID; ajusta cantidad/opciones; elimina al quedar en cero o al limpiar. | Carrito de cliente; no modifica el objeto original del catálogo. |
| `src/context/ShopContext.jsx` | Comparte estados de carrito, pedidos y perfil; escribe cambios en `localStorage`. | Persistencia en este navegador, no en la nube. |
| `src/utils/shop.js` | Claves `bourboneria_cart`, `bourboneria_last_order`, `bourboneria_orders`, `bourboneria_profile`; calcula totales y normaliza opciones. | Esquema JavaScript existente; no define esquema PostgreSQL. |
| `src/App.jsx` (`checkout`) | Crea número, estado inicial, datos de cliente, artículos, totales y fecha; conserva hasta 12 pedidos y vacía el carrito. | Crear pedido local; campos y relaciones SQL requieren confirmación. |
| `src/utils/shop.js` (`buildPersonalHistory`) | Genera pedidos marcados `sample: true` a partir del perfil. | Datos demostrativos, no deben migrarse como pedidos reales. |
| `src/components/AccountComponents.jsx` y `src/App.jsx` | Guarda y limpia nombre, email, teléfono y dirección. | Perfil solo local; no existe identidad ni propiedad autenticada. |
| `src/pages/RestrictedAdminPage.jsx` | Muestra acceso restringido por falta de autenticación/autorización en servidor. | No existe CRUD administrativo público ni permiso de actualización de estado. |

### Estructuras JavaScript observadas (no son modelo aprobado)

- **Producto:** `id`, `name`, `category`, `price`, `image`, `description`.
- **Línea de carrito/pedido:** `id`, `qty`, opciones `milk`, `sugar`, `allergy`.
- **Pedido:** `number`, `status`, `customer` (`name`, `email`, `phone`, `address`), `items`, `totals` (`subtotal`, `service`, `total`), `createdAt`.
- **Perfil:** `name`, `email`, `phone`, `address`.

Los tipos de JavaScript sugieren campos de texto, números y fechas, pero **no se asignan tipos PostgreSQL** aquí. Que una línea use `id` de producto sugiere una asociación en memoria; no confirma FK, cardinalidad o comportamiento de borrado. No se crearán estas relaciones en SQL sin el modelo correcto.

## Configuración Supabase existente

- CLI local `supabase` v3.0.0; la CLI anunció que v3.2.0 está disponible. La versión instalada responde y sus comandos `orgs list`, `projects list`, `orgs create --help` y `projects create --help` se verificaron.
- `supabase/config.toml` existe con `project_id = "react-app"` generado por `supabase init`; el ref remoto vinculado está en `supabase/.temp/project-ref`.
- SDK `@supabase/supabase-js` existe en `package.json`.
- Organización Free creada: `La Bourboneria` (`jlzhqhrrfupqpxfrvvmw`). Proyecto Cloud: `la-bourboneria`, ref `asiqvfbsrlswmnjghpha`, región `sa-east-1` (São Paulo).
- La documentación registra que la CLI verificó el proyecto y `supabase link --project-ref asiqvfbsrlswmnjghpha` terminó correctamente. El archivo local `supabase/.temp/project-ref` coincide con la referencia. En la sesión actual la CLI no pudo revalidar Cloud porque falta el access token local; no se repitió la creación del proyecto.
- `src/lib/supabaseClient.js` crea el cliente si hay URL y publishable key; si faltan, exporta `null`. La carga SSR con Vite comprobó `isSupabaseConfigured` y que el SDK expone `.from`; no se hicieron solicitudes de red.
- `.env.example` conserva marcadores. `.env.local` contiene la URL y la clave publishable del proyecto, tiene permisos `0600` y está excluido por `.gitignore`. No se guardaron claves secretas en el repositorio.
- No hay archivos de migración en `supabase/migrations/`.
- `supabase migration list --remote --password <contraseña local>` terminó correctamente y no mostró migraciones locales ni remotas.
- Se usó CLI v3.0.0 (la salida indicó v3.2.0 disponible); no se actualizó porque la versión instalada ejecutó las operaciones necesarias.
- No se usó Docker. La organización y el proyecto se crearon en el plan Free predeterminado. No se seleccionó tamaño especial ni alta disponibilidad. No se crearon tablas ni se aplicaron cambios al esquema remoto.

## Decisiones y bloqueos

1. El nombre del archivo no coincide con su contenido: el nuevo `ER-CRUD.pdf` es el informe técnico corregido, idéntico al informe en `supabase-integration/`, no el modelo ER/CRUD requerido para derivar el esquema.
2. El PDF permite documentar el comportamiento local actual, pero no permite decidir tablas, constraints, relaciones, roles ni políticas RLS.
3. Antes de escribir migraciones se necesita el ER correcto o la especificación confirmada descrita en `CHECKLIST.md`.
4. El proyecto remoto y el vínculo local están documentados; el vínculo local apunta a `asiqvfbsrlswmnjghpha`. La CLI ahora solicita autenticación para `projects list`, así que el estado remoto actual no se revalidó en esta sesión. El PDF no permite crear esquema ni RLS sin inventar requisitos.
5. La contraseña de base de datos se generó de forma aleatoria y se guardó en el Llavero de macOS; no se comparte por chat ni se guarda en Git.

## Siguiente acción

1. Reemplazar `.docs/ER-CRUD/ER-CRUD.pdf` por el modelo ER/CRUD real o aportar sus entidades, atributos y tipos, PK/FK, nulabilidad, valores por defecto, relaciones/cardinalidades, reglas de borrado y permisos por rol. El PDF actual es el informe corregido, no el modelo.
2. Volver a autenticar Supabase CLI localmente (`npx supabase login`) y comprobar la organización/proyecto existente antes de cualquier cambio remoto. No crear un proyecto duplicado.
3. Derivar migraciones y RLS del modelo confirmado; revisar `db push --dry-run --remote` antes de aplicar cualquier migración.
4. Integrar las operaciones requeridas y verificar con datos ficticios, incluidos permisos permitidos y denegados.

## Estado de integración remota (23 de noviembre de 2026)

El esquema siguiente se infirió de las estructuras reales de `src/data/products.js`, `src/App.jsx` y `src/utils/shop.js`; el PDF disponible no proporciona un modelo ER formal. La migración y sus permisos quedaron aplicados al proyecto existente `la-bourboneria` (`asiqvfbsrlswmnjghpha`).

| Tabla/función | Uso | Acceso de cliente |
|---|---|---|
| `products` | Catálogo con ID, nombre, categoría, precio y activo. Semillas desde `PRODUCTS`. | `anon`/`authenticated` pueden leer productos activos; no escribir. |
| `orders` | Pedido, estado, contactos opcionales, importes y fecha. | RLS activo; sin políticas ni permisos públicos directos de lectura/escritura. |
| `order_items` | Artículos, cantidades, precio usado y personalizaciones; FK a pedido y producto. | RLS activo; sin acceso público directo. Borrado del pedido cascada; producto referenciado restringe borrado. |
| `submit_order(jsonb,jsonb)` | Valida el pedido, obtiene precios del catálogo, calcula totales e inserta pedido y líneas atómicamente. | `anon` puede ejecutarla para crear pedido; devuelve solo número. No permite leer, actualizar o borrar. |

El perfil y carrito siguen en `localStorage`; los datos de contacto proporcionados se guardan en la fila del pedido. No hay cuenta autenticada. El panel `/admin` sigue restringido. El endpoint de pedido es anónimo; valida campos y cantidades, pero no tiene limitación de tasa ni verificación de identidad, riesgo que debe atenderse antes de una operación real con clientes.

### Correspondencia con la aplicación

- Migración: `supabase/migrations/20261123120000_catalog_and_guest_orders.sql`.
- Cliente: `src/lib/supabaseClient.js`; RPC: `src/services/orders.js`.
- `src/App.jsx` confirma el flujo solo tras respuesta exitosa; ante error conserva el carrito. `src/pages/CartPage.jsx` muestra espera, error y aviso de datos enviados.
- GitHub Pages usa `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` del entorno de Actions. Se deben agregar en GitHub, Settings → Secrets and variables → Actions → Variables.

### Verificación remota ejecutada

- `projects list`: `la-bourboneria`, `ACTIVE_HEALTHY`, vinculado.
- `db push --remote --dry-run`: solo identificó `20261123120000_catalog_and_guest_orders.sql`.
- `db push --remote --yes`: migración aplicada; `migration list --remote` la muestra en local y remoto.
- Prueba con el SDK público: un pedido ficticio de 2 cafés fue insertado por RPC; consulta remota verificó subtotal Bs. 50, servicio Bs. 5, total Bs. 55, 2 unidades y una línea.
- Permisos: con SDK público, lectura y actualización de un pedido fueron rechazadas con código `42501`; consulta privilegiada confirmó estado `pendiente`.
- Ambos pedidos ficticios se eliminaron; consulta final verificó `remaining_test_orders = 0`.
- `npm run build` y `npm run lint` pasan con Node 24.21.0. No existe un runner de tests en `package.json`.

### Pendiente

Añadir las variables de Actions y desplegar desde `main`. Luego realizar una compra ficticia desde la URL pública y observarla en Supabase Studio; la comprobación ejecutada hasta ahora usó el SDK público y SQL remoto, no una sesión visual del navegador.
