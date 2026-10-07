import { useEffect, useMemo, useState } from 'react'
import { STORAGE_KEYS, loadCart, loadLastOrder, loadOrders, loadProfile } from '../utils/shop.js'
import { ShopContext } from './shopContext.js'

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(loadCart)
  const [orders, setOrders] = useState(loadOrders)
  const [lastOrder, setLastOrder] = useState(loadLastOrder)
  const [profile, setProfile] = useState(loadProfile)
  const [profileDraft, setProfileDraft] = useState(() => profile)

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
  }), [cart, orders, lastOrder, profile, profileDraft])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
