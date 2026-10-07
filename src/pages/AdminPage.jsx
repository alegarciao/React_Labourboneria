import { useState } from 'react'
import { StatisticCard } from '../components/AdminComponents.jsx'
import { AppLink } from '../components/SiteChrome.jsx'
import { findProduct, formatMoney, itemNotes } from '../utils/shop.js'

function statusStyle(status) {
  return { pendiente: 'red', preparacion: 'green', listo: 'tan', entregado: 'tan' }[status] || 'tan'
}

function statusLabel(status) {
  return {
    pendiente: 'Pendiente',
    preparacion: 'En Preparación',
    listo: 'Listo Para Recoger',
    entregado: 'Entregado',
  }[status] || 'Pendiente'
}

function nextAction(status) {
  if (status === 'pendiente') return { label: 'Preparar', next: 'preparacion', variant: 'primary' }
  if (status === 'preparacion') return { label: 'Marcar Listo', next: 'listo', variant: 'primary' }
  if (status === 'listo') return { label: 'Marcar Entregado', next: 'entregado', variant: 'outline' }
  return null
}

export function AdminPage({ orders, onAdvance, onNavigate }) {
  const [now] = useState(() => new Date())
  const today = now.toDateString()
  const sales = orders.filter((order) => new Date(order.createdAt).toDateString() === today)
    .reduce((sum, order) => sum + Number(order.totals?.total || 0), 0)
  const metrics = [
    { value: orders.filter((order) => order.status === 'pendiente').length, label: 'Pedidos Pendientes', unit: 'órdenes' },
    { value: orders.filter((order) => order.status === 'preparacion').length, label: 'En Preparación', unit: 'órdenes' },
    { value: orders.filter((order) => order.status === 'listo').length, label: 'Listos Para Recoger', unit: 'órdenes' },
    { value: formatMoney(sales), label: 'Ventas de Hoy', dark: true },
  ]
  const currentDate = now.toLocaleDateString('es-BO', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <main className="admin-shell compact">
      <section className="admin-content">
        <section className="dashboard-head">
          <div><p className="eyebrow">Panel de Control</p><h1>Hola!</h1></div>
          <div className="shift-info"><span>{currentDate}</span><strong>Matutino</strong></div>
        </section>
        <section className="metric-grid">
          {metrics.map((metric) => <StatisticCard key={metric.label} {...metric} />)}
        </section>
        <section className="attention">
          <div className="section-line"><h2>Pedidos que necesitan atención</h2></div>
          <div className="admin-orders">
            {orders.length ? orders.slice(0, 10).map((order) => {
              const action = nextAction(order.status)
              return (
                <article className="admin-order" key={order.number}>
                  <span className={`tag ${statusStyle(order.status)}`}>{statusLabel(order.status)}</span>
                  <strong>{formatMoney(order.totals?.total)}</strong>
                  <h3>Orden {order.number}</h3>
                  <p>{order.customer?.name || 'Cliente sin nombre'}</p>
                  <small>{order.customer?.email || 'Sin correo'} · {order.customer?.phone || 'Sin teléfono'} · {order.customer?.address || 'Sin dirección'}</small>
                  <hr />
                  {order.items.map((item, index) => {
                    const product = findProduct(item.id)
                    if (!product) return null
                    const notes = itemNotes(item)
                    return <p key={`${item.id}-${index}`}>{item.qty}x {product.name}{notes && <small>{notes}</small>}</p>
                  })}
                  <div>{action ? <button className={`btn ${action.variant}`} type="button" onClick={() => onAdvance(order.number, action.next)}>{action.label}</button> : <button className="btn outline" type="button" disabled>Entregado</button>}</div>
                </article>
              )
            }) : (
              <article className="admin-order empty-admin">
                <h3>No hay pedidos todavía</h3>
                <p>Cuando un cliente confirme un pedido desde el menú, aparecerá aquí automáticamente.</p>
                <div><AppLink className="btn primary" href="/menu" onNavigate={onNavigate}>Crear Pedido</AppLink></div>
              </article>
            )}
          </div>
        </section>
      </section>
    </main>
  )
}
