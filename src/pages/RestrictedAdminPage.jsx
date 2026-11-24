import { AppLink } from '../components/SiteChrome.jsx'

export function RestrictedAdminPage({ onNavigate }) {
  return (
    <main className="admin-shell compact">
      <section className="admin-content">
        <section className="dashboard-head">
          <div>
            <p className="eyebrow">Acceso restringido</p>
            <h1>Panel temporalmente deshabilitado</h1>
          </div>
        </section>
        <p role="status">Las funciones administrativas no están disponibles porque esta aplicación aún no cuenta con inicio de sesión ni autorización en un servidor.</p>
        <div className="order-actions">
          <AppLink className="btn primary" href="/" onNavigate={onNavigate}>Volver al inicio</AppLink>
          <AppLink className="btn outline" href="/menu" onNavigate={onNavigate}>Ir al menú</AppLink>
        </div>
      </section>
    </main>
  )
}
