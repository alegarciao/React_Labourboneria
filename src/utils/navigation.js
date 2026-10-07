const BASE_URL = import.meta.env.BASE_URL

function normalizedBasePath() {
  const basePath = new URL(BASE_URL, window.location.origin).pathname
  return basePath === '/' ? '' : basePath.replace(/\/$/, '')
}

export function toAppHref(href) {
  const target = new URL(href, window.location.href)
  if (target.origin !== window.location.origin || !['http:', 'https:'].includes(target.protocol)) return href

  const basePath = normalizedBasePath()
  if (!basePath || target.pathname === basePath || target.pathname.startsWith(`${basePath}/`)) {
    return `${target.pathname}${target.search}${target.hash}`
  }

  const logicalPath = target.pathname.replace(/^\/+/, '')
  return `${basePath}/${logicalPath}${target.search}${target.hash}`
}

export function readAppLocation() {
  const basePath = normalizedBasePath()
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  const isWithinBase = !basePath || currentPath === basePath || currentPath.startsWith(`${basePath}/`)
  const path = (isWithinBase && basePath ? currentPath.slice(basePath.length) : currentPath) || '/'
  const aliases = {
    '/': 'inicio',
    '/index.html': 'inicio',
    '/menu': 'menu',
    '/menu.html': 'menu',
    '/carrito': 'carrito',
    '/carrito.html': 'carrito',
    '/pedido': 'pedido',
    '/pedido.html': 'pedido',
    '/cuenta': 'cuenta',
    '/cuenta.html': 'cuenta',
    '/admin': 'admin',
    '/admin.html': 'admin',
  }

  return { page: isWithinBase ? aliases[path] || 'notFound' : 'notFound', hash: window.location.hash }
}
