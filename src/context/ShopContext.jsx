import { useEffect, useMemo, useState } from 'react'
import { STORAGE_KEYS, loadCart, loadLastOrder, loadOrders, loadProfile } from '../utils/shop.js'
import { PRODUCTS } from '../data/products.js'
import { isSupabaseConfigured } from '../lib/supabaseClient.js'
import { fetchActiveProducts } from '../services/products.js'
import { ShopContext } from './shopContext.js'

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(loadCart)
  const [orders, setOrders] = useState(loadOrders)
  const [lastOrder, setLastOrder] = useState(loadLastOrder)
  const [profile, setProfile] = useState(loadProfile)
  const [profileDraft, setProfileDraft] = useState(() => profile)
  const [products, setProducts] = useState(PRODUCTS)
  const [catalogError, setCatalogError] = useState('')
  const [catalogLoading, setCatalogLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined
    let cancelled = false
    let requestInProgress = false

    async function refreshCatalog() {
      if (requestInProgress) return
      requestInProgress = true

      try {
        const rows = await fetchActiveProducts()
        if (cancelled || !rows) return
        const localProducts = new Map(PRODUCTS.map((product) => [product.id, product]))
        setProducts(rows.map((row) => ({
          ...localProducts.get(row.id),
          id: row.id,
          name: row.name,
          category: row.category,
          price: Number(row.unit_price),
        })))
        setCatalogError('')
      } catch {
        if (!cancelled) setCatalogError('No se pudo actualizar el catálogo desde Supabase. Los precios mostrados podrían estar desactualizados.')
      } finally {
        requestInProgress = false
        if (!cancelled) setCatalogLoading(false)
      }
    }

    refreshCatalog()
    window.addEventListener('focus', refreshCatalog)
    const refreshInterval = window.setInterval(refreshCatalog, 60_000)

    return () => {
      cancelled = true
      window.removeEventListener('focus', refreshCatalog)
      window.clearInterval(refreshInterval)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart))
  }, [cart])
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders))
  }, [orders])
  useEffect(() => {
    if (lastOrder) window.localStorage.setItem(STORAGE_KEYS.order, JSON.stringify(lastOrder))
    else window.localStorage.removeItem(STORAGE_KEYS.order)
  }, [lastOrder])
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile))
  }, [profile])

  const value = useMemo(() => ({
    cart,
    setCart,
    orders,
    setOrders,
    lastOrder,
    setLastOrder,
    profile,
    setProfile,
    profileDraft,
    setProfileDraft,
    products,
    catalogError,
    catalogLoading,
  }), [cart, orders, lastOrder, profile, profileDraft, products, catalogError, catalogLoading])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
