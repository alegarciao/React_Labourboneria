import { supabase } from '../lib/supabaseClient.js'

export async function submitOrderToSupabase(profile, cart) {
  if (!supabase) {
    throw new Error('La conexión con Supabase no está configurada en este entorno.')
  }

  const { data, error } = await supabase.rpc('submit_order', {
    p_customer: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
    },
    p_items: cart.map(({ id, qty, milk, sugar, allergy, note }) => ({
      id,
      qty,
      milk: milk || '',
      sugar: sugar || '',
      allergy: allergy || note || '',
    })),
  })

  if (error) throw new Error(error.message || 'No se pudo guardar el pedido.')

  const orderNumber = data?.[0]?.order_number
  if (!orderNumber) throw new Error('Supabase no confirmó el pedido. Intenta nuevamente.')
  return orderNumber
}
