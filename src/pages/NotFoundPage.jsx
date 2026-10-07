import { AppLink } from '../components/SiteChrome.jsx'

export function NotFoundPage({ onNavigate }) {
  return (
    <main className="not-found-page">
      <section className="order-status">
        <p className="eyebrow">Error 404</p>
        <h1>No encontramos esta página</h1>
        <p>La dirección puede haber cambiado o no estar disponible.</p>
        <div className="order-actions">
          <AppLink className="btn primary" href="/" onNavigate={onNavigate}>Volver al inicio</AppLink>
          <AppLink className="btn outline" href="/menu" onNavigate={onNavigate}>Explorar el menú</AppLink>
        </div>
      </section>
    </main>
  )
}
