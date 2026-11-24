# Configuración inicial de Supabase

## Entorno

- Sistema: macOS, arquitectura x86_64 (Intel).
- Proyecto: React 19 con JavaScript/JSX, Vite y npm.
- Node.js utilizado para esta configuración: v24.21.0 (LTS); npm: 11.19.0.
- Supabase CLI: v3.0.0, instalada como dependencia de desarrollo con npm.
- Las verificaciones iniciales usaron un `SUPABASE_HOME` temporal por las restricciones de escritura; la sesión CLI se autenticó después en la ubicación normal del usuario. No se guardó ninguna credencial en Git.
- Docker no se instaló ni se utilizó. La inicialización es para Supabase Cloud; no se inició un stack local.

## Estado de Supabase Cloud

- CLI instalada como dependencia local (`supabase@3.0.0`); se ejecuta con `npx supabase`. La inicialización local está completada (`supabase/config.toml`).
- La sesión actual del CLI está **autenticada**: `npx supabase orgs list` y `npx supabase projects list` respondieron correctamente. El proyecto enlazado **la-bourboneria** (`asiqvfbsrlswmnjghpha`) se reactivó desde el Dashboard y `projects list` informa `ACTIVE_HEALTHY`.
- `npx supabase db push --remote --dry-run` identificó únicamente `20261123120000_catalog_and_guest_orders.sql`; `db push --remote --yes` la aplicó y `migration list --remote` confirmó el ID local/remoto.
- Organización creada: **La Bourboneria** (`jlzhqhrrfupqpxfrvvmw`), usando el plan Free predeterminado.
- Proyecto creado: **la-bourboneria**, referencia `asiqvfbsrlswmnjghpha`, región `sa-east-1` (São Paulo). No se seleccionaron tamaños especiales ni alta disponibilidad.
- Vínculo local: **completado** con `supabase link`; `supabase/.temp/project-ref` contiene la referencia del proyecto.
- El PDF `.docs/ER-CRUD/ER-CRUD.pdf` es el informe técnico corregido, no un ER formal. Se implementó un esquema inferido del código. El navegador puede crear pedidos y leer catálogo; no puede leer ni modificar pedidos.

Comandos para revisar la cuenta y el proyecto ya enlazado:

```sh
npx supabase orgs list
npx supabase projects list
npx supabase migration list --remote
```

Ejecuta `npx supabase login` solo si el CLI deja de estar autenticado. No pegues el access token en el chat ni lo guardes en el repositorio.

La CLI instalada es v3.0.0; los comandos usados están disponibles en esa versión. La CLI informó que v3.2.0 está disponible, pero no se actualizó porque la instalación existente funciona para este flujo. No compartas un access token.

## Variables de entorno y cliente

`.env.local` ya existe localmente con la URL del proyecto y solo la clave publishable real. Git lo ignora y el archivo tiene permisos `0600`. No se incluyen los valores en esta documentación. Para configurar otra máquina, copia `.env.example` a `.env.local` y obtén los valores en el Dashboard:

```dotenv
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
```

Vite solo expone al navegador variables con prefijo `VITE_`. La publishable key está diseñada para uso público en el cliente, pero **no** reemplaza las políticas de seguridad de la base de datos. Nunca pongas una `service_role` key, secret key, contraseña ni token de acceso en variables `VITE_*`, el código o Git. Antes de conectar datos, el backend y las políticas RLS deben limitar correctamente el acceso.

El cliente centralizado se encuentra en `src/lib/supabaseClient.js`. `src/services/products.js` lee el catálogo activo y `src/services/orders.js` registra pedidos mediante la función SQL `submit_order`. La lectura remota confirmó 27 productos activos y coincidencia de sus IDs con los productos visuales locales. La función calcula importes con los precios de la tabla. RLS bloquea la lectura y actualización de pedidos desde el navegador.

## Archivos de esta preparación

- `package.json` y `package-lock.json`: añaden `supabase` como dependencia de desarrollo y `@supabase/supabase-js` como dependencia de ejecución.
- `supabase/config.toml`: configuración local generada por `supabase init`.
- `supabase/.temp/project-ref`: vínculo local ignorado por Git; apunta a `asiqvfbsrlswmnjghpha`.
- `.env.example`: nombres de variables requeridas, sin valores reales.
- `.gitignore`: excluye `.env` y variantes locales, manteniendo `.env.example` versionable.
- `src/lib/supabaseClient.js`: inicialización central del SDK.
- `src/services/products.js` y `src/services/orders.js`: lectura del catálogo y registro de pedidos.
- `supabase/migrations/20261123120000_catalog_and_guest_orders.sql`: catálogo, pedidos, líneas, RLS y función de confirmación.
- `.env.local`: URL y clave publishable configuradas localmente; ignorado por Git y con permisos `0600`.
- `.docs/supabase-integration/ANALISIS.md` y `CHECKLIST.md`: correspondencia de la fuente actual con el código, verificación y tareas bloqueadas.

## Comandos útiles

```sh
npx supabase --version
npx supabase login
npx supabase orgs list
npx supabase projects list
npx supabase migration list --remote
npm run dev
npm run build
```

## Pendientes

1. La integración se desplegó desde `main` en GitHub Pages; el workflow terminó correctamente para el commit `40b5c411afe8616c74497641189c2ff1f82b98fd` (run `45297765098`). Las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` están configuradas como Actions Variables.
2. Pendiente de demostración: crear un pedido de prueba desde la URL pública y comprobar su registro en Supabase Studio. La operación RPC y la persistencia ya se probaron desde el cliente local.
3. Sustituir el esquema inferido por el ER oficial si la evaluación exige correspondencia exacta con un modelo formal.
4. No publicar claves secretas ni credenciales. `.env.local` se ignora por Git; las variables de Actions son los valores URL/publicable para la compilación frontend.
