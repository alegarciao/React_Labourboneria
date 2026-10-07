export function AppLink({ href, onNavigate, children, ...props }) {
  function handleClick(event) {
    props.onClick?.(event)
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (props.target && props.target !== '_self') return
    event.preventDefault()
    onNavigate(href)
  }

  return <a href={href} {...props} onClick={handleClick}>{children}</a>
}

export function SiteHeader({ page, cartCount, onNavigate }) {
  return (
    <header className="site-header">
      <AppLink className="brand" href="/" aria-label="Ir al inicio" onNavigate={onNavigate}>
        <span><strong>La Bourboneria</strong></span>
      </AppLink>
      <nav className="main-nav" aria-label="Navegación principal">
        <AppLink className={page === 'inicio' ? 'active' : ''} href="/" onNavigate={onNavigate}>Inicio</AppLink>
        <AppLink className={page === 'menu' ? 'active' : ''} href="/menu" onNavigate={onNavigate}>Menú</AppLink>
        <AppLink className={page === 'cuenta' ? 'active' : ''} href="/cuenta" onNavigate={onNavigate}>Mi Cuenta</AppLink>
      </nav>
      <div className="header-actions">
        <AppLink className="icon-btn" href="/carrito" aria-label="Abrir carrito" onNavigate={onNavigate}>
          <span className="cart-count">{cartCount}</span>
          <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
        </AppLink>
        <AppLink className="icon-btn" href="/admin" aria-label="Panel administrativo" onNavigate={onNavigate}>
          <i className="fa-solid fa-user-gear" aria-hidden="true" />
        </AppLink>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid new-footer-grid">
        <section>
          <h3>Contacto</h3>
          <p><i className="fa-solid fa-envelope" aria-hidden="true" /> hola@labourboneria.com</p>
          <p><i className="fa-solid fa-phone" aria-hidden="true" /> 74756239</p>
        </section>
        <section>
          <h3>Ubicación</h3>
          <p>Calle Salamanca</p>
          <p>Centro de Cochabamba</p>
          <div className="footer-icons"><i className="fa-solid fa-earth-americas" /><i className="fa-solid fa-location-dot" /></div>
        </section>
        <section>
          <h3>Síguenos</h3>
          <div className="footer-icons"><i className="fa-brands fa-facebook" /><i className="fa-brands fa-instagram" /><i className="fa-brands fa-tiktok" /></div>
          <p className="since">Desde 2017</p>
        </section>
      </div>
      <p className="copyright">© 2026 Ale Garcia Tendencias web</p>
    </footer>
  )
}

export function Toast({ message }) {
  return <div className={`toast${message ? ' show' : ''}`} role="status" aria-live="polite">{message}</div>
}
