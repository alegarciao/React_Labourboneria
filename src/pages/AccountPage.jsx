import { useMemo } from 'react'
import { AccountInfoCard, ProfileForm } from '../components/AccountComponents.jsx'
import { AppLink } from '../components/SiteChrome.jsx'
import { buildPersonalHistory, formatMoney, formatOrderDate, hasProfileDetails, itemNotes, orderMatchesProfile, findProduct } from '../utils/shop.js'

function accountOrders(profile, orders) {
  if (!hasProfileDetails(profile)) return []
  return [
    ...orders.filter((order) => orderMatchesProfile(order, profile)),
    ...buildPersonalHistory(profile),
  ].slice(0, 4)
}

function orderStatus(status) {
  if (status === 'preparacion') return { label: 'En preparación', color: 'green' }
  if (status === 'listo') return { label: 'Listo para recoger', color: 'tan' }
  if (status === 'entregado') return { label: 'Entregado', color: 'green' }
  return { label: 'Pendiente', color: 'red' }
}

function HistoryCard({ order, index, profile, onRepeat }) {
  const status = orderStatus(order.status)
  return (
    <article className={`history-card${index === 0 ? ' active' : ''}`}>
      <div>
        <p>Pedido N° {order.number.replace('#', '')}</p>
        <strong>{formatOrderDate(order.createdAt)}</strong>
        <p>{order.customer?.name || profile.name || 'Cliente sin nombre'}</p>
        <ul>
          {order.items.map((item, itemIndex) => {
            const product = findProduct(item.id)
            if (!product) return null
            const notes = itemNotes(item)
            return <li key={`${item.id}-${itemIndex}`}>{item.qty}x {product.name}{notes && <small> {notes}</small>}</li>
          })}
        </ul>
      </div>
      <div>
        <span className={`tag ${status.color}`}>{status.label}</span>
        <p>Total del Pedido</p>
        <strong>{formatMoney(order.totals?.total)}</strong>
        <button className="btn primary" type="button" onClick={() => onRepeat(order.number)}>Pedir Nuevamente</button>
      </div>
    </article>
  )
}

export function AccountPage({ profile, orders, onSave, onClear, onRepeat, onNavigate }) {
  const shownOrders = useMemo(() => accountOrders(profile, orders), [profile, orders])
  const realOrders = hasProfileDetails(profile) ? orders.filter((order) => orderMatchesProfile(order, profile)) : []
  const points = realOrders.reduce((sum, order) => sum + Math.floor(Number(order.totals?.total || 0)), 0) + (hasProfileDetails(profile) ? 50 : 0)

  return (
    <main className="account-page">
      <section className="account-hero">
        <div>
          <p className="eyebrow">Mi Cuenta</p>
          <h1>{profile.name ? `El Rincón de ${profile.name.split(' ')[0]}` : 'Mi Cuenta'}</h1>
          <p><em>"Donde los buenos momentos se convierten en tradición."</em></p>
        </div>
        <div className="visit-card"><span><i className="fa-solid fa-gem" aria-hidden="true" /></span><strong>12</strong><small>Visitas este mes</small></div>
      </section>

      <section className="account-layout">
        <ProfileForm onSave={onSave} onClear={onClear} />

        <section className="orders-history">
          <div className="loyalty-grid">
            <AccountInfoCard icon="fa-solid fa-medal" title="Programa de Fidelización" value={`${points} pts`} description={hasProfileDetails(profile) ? 'Ganas 1 punto por cada Bs. 1 confirmado. Ya tienes bono de bienvenida.' : 'Guarda tus datos para empezar a acumular puntos.'} />
            <AccountInfoCard icon="fa-solid fa-truck-fast" title="Entrega Guardada" value={profile.address || 'Sin dirección'} description="Se usará al repetir pedidos o confirmar compras." />
          </div>
          <div className="history-top"><h2>Historial de Pedidos</h2><span>Últimos 6 meses</span></div>
          {shownOrders.length ? shownOrders.map((order, index) => <HistoryCard key={`${order.number}-${index}`} order={order} index={index} profile={profile} onRepeat={onRepeat} />) : (
            <article className="history-card active">
              <div><p>Sin pedidos todavía</p><strong>Aún no has realizado ningún pedido</strong><ul><li>Cuando confirmes un pedido desde el carrito, aparecerá aquí automáticamente.</li></ul></div>
              <div><span className="tag tan">Vacío</span><p>Total del Pedido</p><strong>{formatMoney(0)}</strong><AppLink className="btn primary" href="/menu" onNavigate={onNavigate}>Ir al Menú</AppLink></div>
            </article>
          )}
        </section>
      </section>
    </main>
  )
}
