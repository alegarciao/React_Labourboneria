import { AppLink } from '../components/SiteChrome.jsx'
import { ReceiptTotals } from '../components/CartItemCard.jsx'
import { findProduct, formatMoney, itemNotes } from '../utils/shop.js'

export function OrderPage({ order, onNavigate }) {
  const currentOrder = order || { number: '#00000', items: [], totals: { subtotal: 0, service: 0, total: 0 } }
  const totals = currentOrder.totals || { subtotal: 0, service: 0, total: 0 }

  return (
    <main className="order-page">
      <section className="order-status">
        <span className="status-icon"><i className="fa-solid fa-circle-check" aria-hidden="true" /></span>
        <p className="eyebrow">Orden <span>{currentOrder.number}</span></p>
        <h1>¡Pedido confirmado!</h1>
        <p>Su pedido ha sido recibido en nuestra barra y estamos comenzando a prepararlo con la atención que merece.</p>
      </section>

      <section className="order-layout">
        <article className="receipt">
          <i /><i /><i /><i />
          <h2>Detalle del Pedido</h2>
          <p>Recogida estimada: <strong>10:45 AM</strong></p>
          <div className="receipt-divider" />
          {currentOrder.items.length ? currentOrder.items.map((item, index) => {
            const product = findProduct(item.id)
            if (!product) return null
            const notes = itemNotes(item)
            return (
              <div className="receipt-row" key={`${item.id}-${index}`}>
                <strong>{item.qty}x {product.name}{notes && <small>{notes}</small>}</strong>
                <span>{formatMoney(product.price * item.qty)}</span>
              </div>
            )
          }) : <p>No hay un pedido confirmado todavía.</p>}
          <ReceiptTotals totals={totals} />
        </article>
        <article className="pickup-photo">
          <img src="https://i.pinimg.com/1200x/eb/35/fb/eb35fbcc1f1dfcca28f421f90a2d5179.jpg" alt="Café listo para recoger" />
        </article>
      </section>

      <div className="order-actions">
        <AppLink className="btn primary" href="/admin" onNavigate={onNavigate}>Ver Estado del Pedido</AppLink>
        <AppLink className="btn outline" href="/menu" onNavigate={onNavigate}>Volver al Menú</AppLink>
      </div>
    </main>
  )
}
