import { AppLink } from '../components/SiteChrome.jsx'
import { CartItemCard, ReceiptTotals } from '../components/CartItemCard.jsx'
import { findProduct } from '../utils/shop.js'

export function CartPage({ cart, totals, onQuantityChange, onPreferenceChange, onCheckout, onClear, onNavigate }) {
  const items = cart.map((item) => ({ item, product: findProduct(item.id) })).filter(({ product }) => product)

  return (
    <main className="cart-page">
      <section className="order-status cart-intro">
        <span className="status-icon"><i className="fa-solid fa-cart-shopping" aria-hidden="true" /></span>
        <p className="eyebrow">Carrito de Compras</p>
        <h1>Revisa tu pedido</h1>
        <p>Modifica cantidades, confirma el total en bolivianos y envía tu orden a la barra.</p>
      </section>

      <section className="order-layout">
        <article className="receipt cart-receipt">
          <i /><i /><i /><i />
          <h2>Detalle del Carrito</h2>
          <p>Recogida estimada: <strong>15 minutos</strong></p>
          <div className="receipt-divider" />
          {items.length ? (
            <>
              {items.map(({ item, product }) => (
                <CartItemCard key={item.id} item={item} product={product} onQuantityChange={onQuantityChange} onPreferenceChange={onPreferenceChange} />
              ))}
              <ReceiptTotals totals={totals} />
              <div className="cart-page-actions">
                <button className="btn primary" type="button" onClick={onCheckout}>Confirmar Pedido</button>
                <button className="btn outline danger" type="button" onClick={onClear}>Limpiar Carrito</button>
                <AppLink className="btn outline" href="/menu" onNavigate={onNavigate}>Volver al Menú</AppLink>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <h3>Tu carrito está vacío</h3>
              <p>Agrega cafés, desayunos o postres desde el menú para preparar tu pedido.</p>
              <AppLink className="btn primary" href="/menu" onNavigate={onNavigate}>Ir al Menú</AppLink>
            </div>
          )}
        </article>
        <article className="pickup-photo">
          <img src="https://i.pinimg.com/1200x/eb/35/fb/eb35fbcc1f1dfcca28f421f90a2d5179.jpg" alt="Café artesanal en mesa de madera" />
        </article>
      </section>
    </main>
  )
}
