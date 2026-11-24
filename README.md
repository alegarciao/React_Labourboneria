# La Bourboneria

Aplicación web de La Bourboneria migrada de HTML, CSS y JavaScript tradicional a React con JSX y Vite.

## Requisitos

- Node.js 20.19 o posterior (o 22.12 o posterior).
- npm.

## Desarrollo

```bash
npm install
npm run dev
```

## Comandos disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve la compilación localmente.
- `npm run lint`: revisa el código con Oxlint.

## Estructura

- `src/pages/`: inicio, menú, carrito, pedido, cuenta y panel administrativo.
- `src/components/`: navegación y componentes reutilizables de productos, cuenta y pedidos.
- `src/data/`: catálogo de productos.
- `src/utils/`: persistencia local, precios y reglas de pedidos.
- `public/`: recursos públicos.
- `.docs/`: proyecto Legacy y documento de arquitectura de componentes usados como referencia.

El catálogo activo y sus precios se consultan desde Supabase. Los pedidos confirmados se guardan en Supabase; el carrito y el perfil de demostración se conservan en el almacenamiento local del navegador. Las imágenes, fuentes e iconos conservan las referencias externas utilizadas por el Legacy.

## Conexión local con Supabase

Copia `.env.example` como `.env.local` y configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` con los datos publishable del proyecto. No uses una clave `service_role` en el frontend.

```bash
npm run dev
```

Los precios se consultan al abrir la app, volver a la pestaña y cada 60 segundos. Si la consulta falla, la interfaz muestra un aviso y bloquea la confirmación para evitar enviar un total desactualizado.

## GitHub Pages

El workflow `.github/workflows/deploy.yml` despliega al hacer push a `main`. En **Settings → Secrets and variables → Actions → Variables** del repositorio crea `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`. La compilación se detendrá si falta alguna variable.
