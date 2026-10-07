import { useEffect, useRef, useState } from 'react'
import { SiteFooter, SiteHeader, Toast } from './components/SiteChrome.jsx'
import { useShop } from './context/useShop.js'
import { PRODUCTS } from './data/products.js'
import { AccountPage } from './pages/AccountPage.jsx'
import { AdminPage } from './pages/AdminPage.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { MenuPage } from './pages/MenuPage.jsx'
import { OrderPage } from './pages/OrderPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { readAppLocation, toAppHref } from './utils/navigation.js'
import {
  DEFAULT_PROFILE,
  buildPersonalHistory,
  findProduct,
  getCartCount,
  getCartTotals,
  normalizeItemOptions,
} from './utils/shop.js'

function App() {
  const [location, setLocation] = useState(() => ({ ...readAppLocation(), revision: 0 }))
  const { cart, setCart, orders, setOrders, lastOrder, setLastOrder, profile, setProfile, setProfileDraft } = useShop()
  const [toastMessage, setToastMessage] = useState('')
  const toastTimer = useRef(null)

  useEffect(() => {
    const handlePopState = () => setLocation((current) => ({ ...readAppLocation(), revision: current.revision + 1 }))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])
  useEffect(() => {
    const titles = {
      inicio: 'Inicio',
      menu: 'Menú',
      carrito: 'Carrito',
      pedido: 'Pedido Confirmado',
      cuenta: 'Mi Cuenta',
      admin: 'Panel',
      notFound: 'Página no encontrada',
    }
    document.title = `La Bourboneria | ${titles[location.page]}`
  }, [location.page])

  useEffect(() => {
    if (!location.hash) return
    let targetId = location.hash.slice(1)
    try {
      targetId = decodeURIComponent(targetId)
    } catch {
      // A malformed URL fragment should not prevent the route from rendering.
    }
    window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView())
  }, [location.hash, location.page, location.revision])

  function navigate(href) {
    const next = new URL(toAppHref(href), window.location.href)
    if (next.origin !== window.location.origin) return
    window.history.pushState({}, '', `${next.pathname}${next.search}${next.hash}`)
    setLocation((current) => ({ ...readAppLocation(), revision: current.revision + 1 }))
    if (!next.hash) window.scrollTo(0, 0)
  }

  function showToast(message) {
    setToastMessage(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastMessage(''), 2400)
  }

  function addToCart(id, qty = 1) {
    const product = findProduct(id)
    if (!product) return
    setCart((current) => {
      const existing = current.find((item) => item.id === id)
      return existing
        ? current.map((item) => item.id === id ? { ...item, qty: item.qty + qty } : item)
        : [...current, { id, qty, milk: '', sugar: '', allergy: '' }]
    })
    showToast(`${product.name} añadido al carrito`)
  }

  function changeQuantity(id, delta) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
      .filter((item) => item.qty > 0))
  }

  function updatePreference(id, field, value) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, [field]: value } : item))
  }

  function clearCart() {
    setCart([])
    showToast('Carrito limpiado')
  }

  function checkout() {
    if (!cart.length) return
    const currentOrder = {
      number: `#${String(Date.now()).slice(-5)}`,
      status: 'pendiente',
      customer: {
        name: profile.name || 'Cliente sin nombre',
        email: profile.email || 'Sin correo',
        phone: profile.phone || 'Sin teléfono',
        address: profile.address || 'Sin dirección',
      },
      items: cart.map(normalizeItemOptions),
      totals: getCartTotals(cart),
      createdAt: new Date().toISOString(),
    }
    setLastOrder(currentOrder)
    setOrders((current) => [currentOrder, ...current].slice(0, 12))
    setCart([])
    // El flujo del Legacy envía la nueva orden al panel para su atención.
    navigate('/admin')
  }

  function saveProfile(nextProfile) {
    setProfile(nextProfile)
    setProfileDraft(nextProfile)
    showToast('Datos personales actualizados')
  }

  function clearProfile() {
    setProfile(DEFAULT_PROFILE)
    setProfileDraft(DEFAULT_PROFILE)
    showToast('Datos personales limpiados')
  }

  function repeatOrder(number) {
    const order = [...orders, ...buildPersonalHistory(profile)].find((item) => item.number === number)
    if (!order) return
    setCart(order.items.map((item) => ({
      id: item.id,
      qty: item.qty,
      milk: item.milk || '',
      sugar: item.sugar || '',
      allergy: item.allergy || item.note || '',
    })))
    showToast('Pedido cargado al carrito')
    window.setTimeout(() => navigate('/carrito'), 650)
  }

  function advanceOrder(number, status) {
    setOrders((current) => current.map((order) => order.number === number ? { ...order, status } : order))
    showToast('Estado de orden actualizado')
  }

  const menuHash = location.hash.replace('#', '')
  const menuCategory = PRODUCTS.some((product) => product.category === menuHash) ? menuHash : 'cafes'

  return (
    <>
      <SiteHeader page={location.page} cartCount={getCartCount(cart)} onNavigate={navigate} />
      {location.page === 'inicio' && <HomePage key={location.revision} onAdd={addToCart} onNavigate={navigate} />}
      {location.page === 'menu' && <MenuPage key={`${location.revision}-${menuCategory}`} onAdd={addToCart} initialCategory={menuCategory} />}
      {location.page === 'carrito' && <CartPage key={location.revision} cart={cart} totals={getCartTotals(cart)} onQuantityChange={changeQuantity} onPreferenceChange={updatePreference} onCheckout={checkout} onClear={clearCart} onNavigate={navigate} />}
      {location.page === 'pedido' && <OrderPage key={location.revision} order={lastOrder} onNavigate={navigate} />}
      {location.page === 'cuenta' && <AccountPage key={location.revision} profile={profile} orders={orders} onSave={saveProfile} onClear={clearProfile} onRepeat={repeatOrder} onNavigate={navigate} />}
      {location.page === 'admin' && <AdminPage key={location.revision} orders={orders} onAdvance={advanceOrder} onNavigate={navigate} />}
      {location.page === 'notFound' && <NotFoundPage onNavigate={navigate} />}
      <SiteFooter />
      <Toast message={toastMessage} />
    </>
  )
}

export default App
