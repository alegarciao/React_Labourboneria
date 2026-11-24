import { supabase } from '../lib/supabaseClient.js'

export async function fetchActiveProducts() {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('products')
    .select('id, name, category, unit_price')
    .eq('active', true)
    .order('name')

  if (error) throw new Error(error.message || 'No se pudo cargar el catálogo actualizado.')
  return data
}
