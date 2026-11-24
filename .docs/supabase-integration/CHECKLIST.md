# Integración Supabase - Checklist

## Estado actual

- [x] Revisar el proyecto y validar el PDF. Evidencia: `.docs/ER-CRUD/ER-CRUD.pdf` tiene 4 páginas legibles y se revisó texto y visualmente. Su SHA-256 coincide con `.docs/supabase-integration/INFORME-TECNICO-SUPABASE-CRUD-CORREGIDO.pdf`; es el informe técnico corregido, no un modelo ER.
- [x] Documentar el modelo y su correspondencia. El PDF no es un ER; se documentó en `ANALISIS.md` un esquema inferido de las estructuras reales de producto y pedido de la aplicación.
- [x] Identificar y enlazar el proyecto remoto. `projects list` mostró `la-bourboneria`, ref `asiqvfbsrlswmnjghpha`, `ACTIVE_HEALTHY`, `linked: true`.
- [x] Crear, aplicar y verificar migración y permisos. `db push --dry-run` identificó una sola migración; `db push --remote --yes` la aplicó y `migration list --remote` confirmó el ID. No se modificaron tablas previas.
- [x] Configurar el SDK y las variables de entorno. Evidencia: `@supabase/supabase-js` en `package.json`, cliente `src/lib/supabaseClient.js`, `.env.example`; `.env.local` existe, está ignorado por Git y tiene permisos `0600`. No se imprimieron los valores.
- [x] Integrar y comprobar el CRUD definido para pedidos. `src/services/orders.js` usa `submit_order`; `src/services/products.js` consulta 27 productos activos y sus precios. Catálogo y totales usan esos valores; pedidos no se pueden leer/actualizar/borrar desde cliente.
- [x] Verificar persistencia, permisos y build. RPC pública insertó pedido ficticio; SQL remoto confirmó importes y artículo. SDK público recibió `42501` al leer y actualizar; estado siguió `pendiente`. Se borraron los dos pedidos ficticios y la consulta final devolvió cero. `npm run build` y `npm run lint` pasan con Node 24.21.0. No hay runner de tests.
- [x] Documentar la ejecución y los pendientes. Evidencia: este checklist y `ANALISIS.md`.

## CRUD implementado

| Entidad/interfaz | Crear | Leer | Actualizar | Eliminar | Estado / archivo relacionado |
|---|---|---|---|---|---|
| Productos | No | Catálogo activo | No | No | Tabla `products`; lectura pública, escritura solo por migración/administración. |
| Carrito | Agregar línea | Consultar líneas | Cambiar cantidades/opciones | Quitar línea o vaciar | Sigue en React/localStorage. |
| Pedido | Confirmar | Recibo local | No desde cliente | No desde cliente | RPC guarda en Supabase; tabla privada por RLS. |
| Líneas | Con el pedido | No desde cliente | No desde cliente | Cascade al borrar pedido | Se insertan atómicamente por RPC. |
| Perfil | Guardar perfil | Formulario local | Editar | Limpiar | Sigue en localStorage; no es una cuenta autenticada. |

## Evidencia de seguridad que acompaña la fuente

La página 3 documenta una prueba automatizada por renderizado Vite SSR de acceso directo a `/admin` con el pedido ficticio `#TEST-SEC-001`: `restricted=true`, `fakeEmailHidden=true`, `noStatusAction=true`, `localStatusUntouched=true`. No es una prueba de navegador ni una prueba contra servidor/RLS.

La página 4 presenta como propuesta futura comprobar la sesión y permisos en cada operación del servidor y probar que una actualización sin permiso se rechaza y el pedido/historial permanecen intactos. Esto aún no está implementado ni verificado remotamente.

## Próxima acción

- [x] Publicar la aplicación conectada. Evidencia: variables Actions configuradas; commit `40b5c411afe8616c74497641189c2ff1f82b98fd`; workflow `45297765098` success; Pages HTTP 200 y bundle idéntico al `dist` local.
- [ ] Probar una compra desde la página pública y verificar el pedido en Supabase Studio. Pendiente de comprobación visual interactiva; el flujo RPC y la persistencia sí fueron comprobados desde cliente local.
- [ ] Reemplazar el esquema inferido por el modelo ER oficial si la evaluación exige correspondencia exacta; el PDF disponible no es un diagrama ER.

Siguiente acción: abrir Pages, registrar un pedido con datos ficticios y comprobarlo en Supabase Studio.
