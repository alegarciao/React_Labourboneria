# Informe del proceso de desarrollo y verificación

**Proyecto:** La Bourboneria  
**Fecha de verificación:** 23 de noviembre de 2026  
**Objetivo:** disponer de una web React que lea el catálogo desde Supabase y registre pedidos para demostrar su persistencia.

## 1. Descripción del proyecto

La Bourboneria es una aplicación web para consultar un menú de cafetería, añadir productos a un carrito y confirmar pedidos. La interfaz está desarrollada con React, JavaScript y JSX, y Vite se utiliza para ejecutar el entorno local y generar la versión publicable. Supabase Cloud proporciona el catálogo y guarda los pedidos confirmados.

## 2. Actividades realizadas

1. **Inspección del proyecto:** se revisaron la estructura React/Vite, sus formularios, carrito, perfil local y archivos de configuración de Supabase.
2. **Preparación de Supabase Cloud:** se autenticó Supabase CLI, se identificó y enlazó el proyecto `la-bourboneria`, y se aplicó la migración SQL del catálogo y los pedidos.
3. **Modelo de datos:** se prepararon las tablas `products`, `orders` y `order_items`. El PDF disponible es un informe técnico, no un diagrama ER formal; por ello, el esquema se derivó del modelo descrito y de los campos que usa la aplicación. Esa correspondencia debe reemplazarse si la actividad exige un ER oficial.
4. **Conexión de la aplicación:** se centralizó el cliente del SDK `@supabase/supabase-js` y la configuración local se guardó en `.env.local`, excluida de Git.
5. **Consulta del catálogo:** el menú, favoritos, carrito e historial reciben los productos activos de Supabase. Los precios se vuelven a consultar al abrir la aplicación, al regresar a la pestaña y cada 60 segundos. Las imágenes y descripciones continúan usando los recursos del proyecto.
6. **Registro de pedidos:** al confirmar el carrito, la aplicación envía el pedido a una función SQL de Supabase. Esta toma los precios vigentes de la tabla, calcula los importes y guarda el pedido y sus productos. La confirmación aparece después de que la operación remota termina correctamente.
7. **Protección de datos:** se habilitó RLS. El navegador puede leer productos activos y enviar pedidos mediante la función prevista; no puede consultar los pedidos/contactos ni cambiar estados directamente. El panel administrativo público permanece restringido porque la aplicación aún no tiene autenticación de personal.
8. **Preparación de publicación:** el flujo de GitHub Actions compila para GitHub Pages y contempla variables de entorno de Supabase, además del fallback para rutas de la SPA.

## 3. Herramientas utilizadas

| Herramienta | Uso |
|---|---|
| React 19, JavaScript y JSX | Interfaz, páginas y estado del carrito |
| Vite 8 | Servidor de desarrollo y compilación |
| npm | Instalación de dependencias y scripts del proyecto |
| Supabase Cloud / PostgreSQL | Catálogo y persistencia de pedidos |
| Supabase CLI | Inicio de sesión, enlace del proyecto y migraciones remotas |
| `@supabase/supabase-js` | Conexión del frontend con el catálogo y la función de pedidos |
| GitHub Actions / GitHub Pages | Compilación y publicación web |
| curl, `npm run build`, `npm run lint` | Verificación HTTP, compilación y análisis estático |

El Node 16 que aparece primero en el `PATH` del terminal no es compatible con Vite 8. Node 24 ya estaba instalado y se usó explícitamente para compilar y ejecutar la aplicación, sin reinstalar ni cambiar globalmente Node.

## 4. Resultados de las verificaciones

| Comprobación | Resultado observado |
|---|---|
| `npm run build` con Node 24.21.0 | Correcto; Vite generó `dist/` |
| `npm run lint` | Correcto; Oxlint no informó errores |
| `git diff --check` | Correcto; sin errores de espacios/parches |
| Lectura del catálogo Supabase | Correcta; 27 productos activos |
| Correspondencia producto–interfaz | Correcta; los 27 IDs remotos corresponden a productos con imagen y descripción local |
| Lectura de producto de ejemplo | Correcta; `latte-clasico` devuelve Bs. 30 en la consulta realizada |
| Flujo de pedido remoto | En la prueba previa del flujo, se guardó un pedido ficticio con subtotal Bs. 50, servicio Bs. 5 y total Bs. 55; la lectura/actualización directa desde el cliente fue rechazada por RLS y el pedido permaneció pendiente |
| Servidor local | Vite respondió `HTTP 200` en la dirección indicada abajo |
| Repositorio público | GitHub respondió `HTTP 200` |
| GitHub Pages | La URL respondió `HTTP 200`, pero el archivo JavaScript publicado no contiene la referencia al proyecto Supabase ni la integración de catálogo actual. Esa publicación está desactualizada frente al código local. |
| Navegación visual en navegador | No se realizó: no había navegador de prueba disponible en esta sesión |

La prueba CRUD remota no incluyó crear, leer, actualizar ni eliminar pedidos desde el navegador de forma irrestricta: el diseño actual permite al cliente crear pedidos, pero deliberadamente bloquea la lectura de datos privados y los cambios administrativos. El CRUD administrativo requiere autenticación/autorización real en servidor antes de habilitarse.

## 5. Cómo demostrar el punto 4 en el video

Usa datos ficticios para no grabar información personal real:

1. Abre la web local y entra al menú.
2. Añade uno o más productos al carrito y confirma el pedido.
3. Muestra el mensaje **“Pedido guardado en la base de datos”**.
4. Abre Supabase Dashboard → proyecto `la-bourboneria` → **Table Editor** → tabla `orders`; busca el pedido recién creado. Luego abre `order_items` para mostrar sus líneas, cantidades y precios.
5. Si quieres mostrarlo con SQL en Supabase SQL Editor, consulta el pedido más reciente y sus líneas. No uses ni grabes claves secretas o tokens.

La cuenta anónima del navegador no tiene permiso para leer pedidos. La verificación de almacenamiento debe hacerse desde el Dashboard de Supabase, como administrador del proyecto.

## 6. Enlaces y estado de publicación

- **Repositorio público:** [github.com/alegarciao/React_Labourboneria](https://github.com/alegarciao/React_Labourboneria)
- **Página publicada en GitHub Pages:** [alegarciao.github.io/React_Labourboneria](https://alegarciao.github.io/React_Labourboneria/)
- **Servidor local con la versión actual:** [http://127.0.0.1:5175/](http://127.0.0.1:5175/)

La página pública existe y responde, pero **todavía no sirve la integración más reciente**. Para publicar la versión actual se debe enviar el código actualizado a la rama `main`, configurar en el repositorio las variables de GitHub Actions `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`, y comprobar que finalice correctamente la ejecución **Deploy to GitHub Pages**. No se subió ningún cambio ni se realizó un `push` durante esta verificación.

Para iniciar el servidor local en una terminal nueva:

```sh
cd "/Users/islavesoft/Documents/Ale trabajos/Nuevas tendencias web/React/react-app"
export PATH="$HOME/.nvm/versions/node/v24.21.0/bin:$PATH"
npm run dev
```

Vite puede elegir otro puerto si 5173 está ocupado. En esta sesión usa el puerto 5175.

## 7. Conclusión

La versión local está compilada, consulta los 27 productos de Supabase y dispone del flujo para guardar pedidos remotos. En la prueba previa, un pedido ficticio quedó almacenado y las políticas impidieron que el cliente leyera o alterara el pedido directamente. La URL de GitHub Pages responde, pero se comprobó que su bundle no corresponde a la integración local más reciente; por eso, para presentar una versión pública conectada a Supabase aún falta publicar el código actual y configurar sus dos variables de compilación en GitHub.
