# Configuración inicial de Supabase

## Entorno

- Sistema: macOS, arquitectura x86_64 (Intel).
- Proyecto: React 19 con JavaScript/JSX, Vite y npm.
- Node.js utilizado para esta configuración: v24.21.0 (LTS); npm: 11.19.0.
- Supabase CLI: v3.0.0, instalada como dependencia de desarrollo con npm.
- Las verificaciones iniciales de la CLI usaron un `SUPABASE_HOME` temporal por las restricciones de escritura del entorno. Luego se inició sesión en la ubicación normal de la CLI, fuera del repositorio. No se guardó ninguna credencial en Git.
- Docker no se instaló ni se utilizó. La inicialización es para Supabase Cloud; no se inició un stack local.

## Estado de Supabase Cloud

- CLI instalada e inicialización local completada (`supabase/config.toml`).
- Sesión CLI: **activa al momento de la última verificación**; `supabase projects list` llegó a consultar Supabase Cloud.
- Organizaciones/proyectos visibles: **ninguno**. El Dashboard muestra la página Organizations sin organizaciones, y la lista de proyectos de la CLI está vacía.
- Proyecto remoto vinculado: **pendiente**. Primero hay que abrir la cuenta que contiene el proyecto o crear una organización y un proyecto; luego se podrá ejecutar `supabase link`.
- No se crearon tablas, migraciones, políticas, funciones ni cambios en la base de datos remota.

Cuando una organización y un proyecto estén disponibles, verifica la lista y vincula el proyecto desde una terminal:

```sh
npx supabase login
npx supabase projects list
npx supabase link --project-ref <project-ref>
```

El `project-ref` se obtiene de la lista de proyectos o de la URL del proyecto. No compartas un access token. Si hay varios proyectos, confirma cuál corresponde a esta aplicación antes de vincularlo. La CLI puede requerir permisos de lectura de proyectos, configuración y claves del proyecto.

## Variables de entorno y cliente

Copia `.env.example` a `.env.local` y reemplaza los marcadores usando los valores del proyecto Cloud:

```dotenv
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
```

Vite solo expone al navegador variables con prefijo `VITE_`. La publishable key está diseñada para uso público en el cliente, pero **no** reemplaza las políticas de seguridad de la base de datos. Nunca pongas una `service_role` key, secret key, contraseña ni token de acceso en variables `VITE_*`, el código o Git. Antes de conectar datos, el backend y las políticas RLS deben limitar correctamente el acceso.

El cliente centralizado se encuentra en `src/lib/supabaseClient.js`. Si todavía no existen las variables, exporta `supabase` como `null`; esto permite que el proyecto compile sin credenciales y evita simular una conexión. Aún no hay operaciones de negocio conectadas.

## Archivos de esta preparación

- `package.json` y `package-lock.json`: añaden `supabase` como dependencia de desarrollo y `@supabase/supabase-js` como dependencia de ejecución.
- `supabase/config.toml`: configuración generada por `supabase init`, todavía sin vínculo remoto.
- `.env.example`: nombres de variables requeridas, sin valores reales.
- `.gitignore`: excluye `.env` y variantes locales, manteniendo `.env.example` versionable.
- `src/lib/supabaseClient.js`: inicialización central del SDK, sin integrarlo en funcionalidades de negocio.

## Comandos útiles

```sh
npx supabase --version
npx supabase login
npx supabase projects list
npx supabase link --project-ref <project-ref>
npm run dev
npm run build
```

## Pendientes

1. Confirmar que la cuenta del Dashboard sea la que contiene el proyecto esperado; actualmente no muestra organizaciones. Si no existe una, crear una organización y luego un proyecto Cloud.
2. Ejecutar `npx supabase projects list` y vincular el `project-ref` correcto con `supabase link`.
3. Copiar URL y publishable key al archivo local `.env.local` (no subir ese archivo).
4. Ejecutar nuevamente `npm run build` y comenzar la integración solo después de definir el modelo y los controles de acceso.
