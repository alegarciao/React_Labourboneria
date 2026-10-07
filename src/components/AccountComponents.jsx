import { InputField } from './InputField.jsx'
import { useShop } from '../context/useShop.js'
import { DEFAULT_PROFILE } from '../utils/shop.js'

export function ProfileForm({ onSave, onClear }) {
  const { profileDraft: draft, setProfileDraft } = useShop()

  function updateField(event) {
    const { name, value } = event.target
    setProfileDraft((current) => ({ ...current, [name]: value }))
  }

  function submit(event) {
    event.preventDefault()
    onSave(Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()])))
  }

  function clearDetails() {
    setProfileDraft(DEFAULT_PROFILE)
    onClear()
  }

  return (
    <aside className="profile-card">
      <h2>Detalles Personales <button type="button" aria-label="Editar"><i className="fa-solid fa-pen" aria-hidden="true" /></button></h2>
      <form className="profile-form" onSubmit={submit}>
        <InputField label="Nombre" name="name" type="text" autoComplete="name" value={draft.name} onChange={updateField} />
        <InputField label="Correo Electrónico" name="email" type="email" autoComplete="email" value={draft.email} onChange={updateField} />
        <InputField label="Teléfono" name="phone" type="tel" autoComplete="tel" value={draft.phone} onChange={updateField} />
        <InputField label="Dirección favorita" name="address" type="text" autoComplete="street-address" value={draft.address} onChange={updateField} />
        <div className="profile-actions">
          <button className="btn primary" type="submit">Guardar Datos</button>
          <button className="btn outline" type="button" onClick={clearDetails}>Limpiar Datos</button>
        </div>
      </form>
    </aside>
  )
}

export function AccountInfoCard({ icon, title, value, description }) {
  return (
    <article className="loyalty-card">
      <span><i className={icon} aria-hidden="true" /></span>
      <p>{title}</p>
      <strong>{value}</strong>
      <small>{description}</small>
    </article>
  )
}
