import { useContext } from 'react'
import { ShopContext } from './shopContext.js'

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop debe utilizarse dentro de ShopProvider')
  return context
}
