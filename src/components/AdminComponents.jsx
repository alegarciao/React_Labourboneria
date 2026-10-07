export function StatisticCard({ value, label, unit, dark = false }) {
  return (
    <article className={dark ? 'dark' : ''}>
      <strong>{value}</strong>
      <span>{label}</span>
      {unit && <em>{unit}</em>}
    </article>
  )
}
