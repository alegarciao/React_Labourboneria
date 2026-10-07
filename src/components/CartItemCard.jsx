import { getCustomizationFields, formatMoney } from '../utils/shop.js'

const MILK_OPTIONS = ['Entera', 'Deslactosada', 'Avena', 'Almendra']
const SUGAR_OPTIONS = ['Sin azúcar', 'Bajo', 'Normal', 'Extra dulce']

function PreferenceSelect({ label, value, options, onChange }) {
  return (
    <label>
      {label}
      <select value={value || ''} onChange={(event) => onChange(event.target.value)}>
        <option value="">Sin cambio</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}

export function CartItemCard({ item, product, onQuantityChange, onPreferenceChange }) {
  const fields = getCustomizationFields(product)

  return (
    <div className="cart-receipt-row">
      <img src={product.image} alt={product.name} />
      <div>
        <strong>{product.name}</strong>
        <small>{formatMoney(product.price)} c/u</small>
        <div className="qty">
          <button type="button" aria-label={`Quitar una unidad de ${product.name}`} onClick={() => onQuantityChange(item.id, -1)}>−</button>
          <span>{item.qty}</span>
          <button type="button" aria-label={`Agregar una unidad de ${product.name}`} onClick={() => onQuantityChange(item.id, 1)}>+</button>
        </div>
        {fields.length > 0 && (
          <div className={`item-options${fields.length === 1 ? ' single-option' : ''}`}>
            {fields.includes('milk') && <PreferenceSelect label="Tipo de leche" value={item.milk} options={MILK_OPTIONS} onChange={(value) => onPreferenceChange(item.id, 'milk', value)} />}
            {fields.includes('sugar') && <PreferenceSelect label="Nivel de azúcar" value={item.sugar} options={SUGAR_OPTIONS} onChange={(value) => onPreferenceChange(item.id, 'sugar', value)} />}
            {fields.includes('allergy') && (
              <label className="allergy-field">
                Alergias o cuidados
                <textarea
                  rows="2"
                  placeholder="Ej: sin nueces, intolerancia a lactosa..."
                  value={item.allergy || item.note || ''}
                  onChange={(event) => onPreferenceChange(item.id, 'allergy', event.target.value)}
                />
              </label>
            )}
          </div>
        )}
      </div>
      <strong>{formatMoney(product.price * item.qty)}</strong>
    </div>
  )
}

export function ReceiptTotals({ totals }) {
  return (
    <div className="receipt-totals">
      <div className="receipt-total"><span>Subtotal</span><strong>{formatMoney(totals.subtotal)}</strong></div>
      <div className="receipt-total"><span>Servicio</span><strong>{formatMoney(totals.service)}</strong></div>
      <div className="receipt-total final"><span>Total</span><strong>{formatMoney(totals.total)}</strong></div>
    </div>
  )
}
