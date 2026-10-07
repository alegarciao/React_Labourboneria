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
- `.docs/Legacy/`: archivos HTML, CSS y JavaScript originales, conservados como referencia de migración.

Los pedidos, el carrito y el perfil se guardan en el almacenamiento local del navegador. Las imágenes, fuentes e iconos conservan las referencias externas utilizadas por el Legacy.

## Publicación

El proyecto se publica en [GitHub Pages](https://alegarciao.github.io/React_Labourboneria/) mediante GitHub Actions cada vez que se actualiza la rama `main`.
