import { useState } from 'react'
import { DEFAULT_PROFILE } from '../utils/shop.js'

export function ProfileForm({ profile, onSave, onClear }) {
  const [draftState, setDraftState] = useState(() => ({ sourceProfile: profile, values: profile }))
  const draft = draftState.sourceProfile === profile ? draftState.values : profile

  function updateField(event) {
    setDraftState({ sourceProfile: profile, values: { ...draft, [event.target.name]: event.target.value } })
  }

  function submit(event) {
    event.preventDefault()
    onSave(Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()])))
  }

  function clearDetails() {
    setDraftState({ sourceProfile: profile, values: DEFAULT_PROFILE })
    onClear()
  }

  return (
    <aside className="profile-card">
      <h2>Detalles Personales <button type="button" aria-label="Editar"><i className="fa-solid fa-pen" aria-hidden="true" /></button></h2>
      <form className="profile-form" onSubmit={submit}>
        <label>Nombre<input name="name" type="text" autoComplete="name" value={draft.name} onChange={updateField} /></label>
        <label>Correo Electrónico<input name="email" type="email" autoComplete="email" value={draft.email} onChange={updateField} /></label>
        <label>Teléfono<input name="phone" type="tel" autoComplete="tel" value={draft.phone} onChange={updateField} /></label>
        <label>Dirección favorita<input name="address" type="text" autoComplete="street-address" value={draft.address} onChange={updateField} /></label>
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
