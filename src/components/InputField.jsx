export function InputField({ label, name, id = name, ...inputProps }) {
  return (
    <label htmlFor={id}>
      {label}
      <input id={id} name={name} {...inputProps} />
    </label>
  )
}
