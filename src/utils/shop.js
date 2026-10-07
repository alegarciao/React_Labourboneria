import { PRODUCTS } from '../data/products.js'

export const STORAGE_KEYS = {
  cart: 'bourboneria_cart',
  order: 'bourboneria_last_order',
  orders: 'bourboneria_orders',
  profile: 'bourboneria_profile',
}

export const DEFAULT_PROFILE = {
  name: '',
  email: '',
  phone: '',
  address: '',
}

const OLD_DEFAULT_PROFILE = {
  name: 'María González',
  email: 'maria.artesana@email.com',
  phone: '+34 600 123 456',
}

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const loadCart = () => readStorage(STORAGE_KEYS.cart, [])
export const loadOrders = () => readStorage(STORAGE_KEYS.orders, [])
export const loadLastOrder = () => readStorage(STORAGE_KEYS.order, null)

export function loadProfile() {
  const saved = readStorage(STORAGE_KEYS.profile, null)
  if (!saved) return DEFAULT_PROFILE
  const isOldDefault = saved.name === OLD_DEFAULT_PROFILE.name
    && saved.email === OLD_DEFAULT_PROFILE.email
    && saved.phone === OLD_DEFAULT_PROFILE.phone
  return isOldDefault ? DEFAULT_PROFILE : { ...DEFAULT_PROFILE, ...saved }
}

export const findProduct = (id) => PRODUCTS.find((product) => product.id === id)
export const formatMoney = (value) => `Bs. ${Number(value || 0).toFixed(2)}`

export function getCustomizationFields(product = {}) {
  if (['latte-clasico', 'flat-white', 'capuccino-canela', 'mocha-artesanal', 'chocolate-caliente', 'matcha-avena'].includes(product.id)) {
    return ['milk', 'sugar', 'allergy']
  }

  if (['cafe-bourbon', 'espresso-doble', 'americano-herencia', 'limonada-romero', 'te-earl-grey', 'cold-brew-tonic'].includes(product.id)) {
    return ['sugar', 'allergy']
  }

  if (['desayunos', 'postres'].includes(product.category)) return ['allergy']
  if (product.id === 'brunch-bourboneria') return ['sugar', 'allergy']
  return []
}

export function getCartTotals(cart) {
  const subtotal = cart.reduce((sum, item) => {
    const product = findProduct(item.id)
    return sum + (product ? product.price * item.qty : 0)
  }, 0)
  const service = subtotal > 0 ? 5 : 0
  return { subtotal, service, total: subtotal + service }
}

export function getCartCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0)
}

export function itemNotes(item = {}) {
  const fields = getCustomizationFields(findProduct(item.id))
  const notes = []
  const milk = fields.includes('milk') ? item.milk || '' : ''
  const sugar = fields.includes('sugar') ? item.sugar || '' : ''
  const allergy = fields.includes('allergy') ? item.allergy || item.note || '' : ''

  if (milk) notes.push(`Leche: ${milk}`)
  if (sugar) notes.push(`Azúcar: ${sugar}`)
  if (allergy) notes.push(`Alergias: ${allergy}`)
  return notes.join(' · ')
}

export function normalizeItemOptions(item = {}) {
  const fields = getCustomizationFields(findProduct(item.id))
  return {
    id: item.id,
    qty: item.qty,
    milk: fields.includes('milk') ? item.milk || '' : '',
    sugar: fields.includes('sugar') ? item.sugar || '' : '',
    allergy: fields.includes('allergy') ? item.allergy || item.note || '' : '',
  }
}

export function hasProfileDetails(profile) {
  return Boolean(`${profile.name}${profile.email}${profile.phone}${profile.address}`.trim())
}

export function orderMatchesProfile(order, profile) {
  const customer = order.customer || {}
  return [
    customer.name === profile.name,
    customer.email === profile.email,
    customer.phone === profile.phone,
    customer.address === profile.address,
  ].some(Boolean)
}

export function buildPersonalHistory(profile) {
  const seedText = `${profile.name}|${profile.email}|${profile.phone}|${profile.address}`
  if (!hasProfileDetails(profile)) return []

  let seed = Array.from(seedText).reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const next = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  const notes = ['', 'Sin azúcar', 'Leche deslactosada', 'Sin nueces', 'Poca espuma', 'Extra caliente']
  const count = 2 + Math.floor(next() * 2)

  return Array.from({ length: count }, (_, index) => {
    const items = Array.from({ length: 2 + Math.floor(next() * 2) }, () => {
      const product = PRODUCTS[Math.floor(next() * PRODUCTS.length)]
      return {
        id: product.id,
        qty: 1 + Math.floor(next() * 3),
        note: notes[Math.floor(next() * notes.length)],
      }
    })
    const date = new Date()
    date.setDate(date.getDate() - (8 + index * 14 + Math.floor(next() * 9)))

    return {
      number: `#H${String(seed + index).slice(-4)}`,
      status: 'entregado',
      customer: {
        name: profile.name || 'Cliente sin nombre',
        email: profile.email || 'Sin correo',
        phone: profile.phone || 'Sin teléfono',
        address: profile.address || 'Sin dirección',
      },
      items,
      totals: getCartTotals(items),
      createdAt: date.toISOString(),
      sample: true,
    }
  })
}

export function formatOrderDate(value) {
  return new Date(value).toLocaleDateString('es-BO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
