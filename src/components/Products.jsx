import { useRef } from 'react'
import { formatMoney } from '../utils/shop.js'

export function ProductCard({ product, variant = 'menu', featured = false, onAdd }) {
  if (variant === 'favorite') {
    return (
      <article className={`product-card${featured ? ' featured' : ''}`}>
        <img src={product.image} alt={product.imageAlt || product.name} />
        <div className="product-body">
          <div className="product-title"><h3>{product.name}</h3><strong>{formatMoney(product.price)}</strong></div>
          <p>{product.description}</p>
          <button className={`btn ${featured ? 'primary' : 'outline'} js-add`} type="button" onClick={() => onAdd(product.id)}>Agregar</button>
        </div>
      </article>
    )
  }

  return (
    <article className="menu-item" data-category={product.category}>
      <img src={product.image} alt={product.name} />
      <div>
        <div className="product-title"><h3>{product.name}</h3><span className="menu-price">{formatMoney(product.price)}</span></div>
        <p>{product.description}</p>
        <button className="btn primary js-add" type="button" onClick={() => onAdd(product.id)}>+ Agregar</button>
      </div>
    </article>
  )
}

export function CategoryTabs({ categories, selected, onSelect }) {
  const tabRefs = useRef([])

  function handleKeyDown(event, index) {
    let nextIndex = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % categories.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + categories.length) % categories.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = categories.length - 1
    else return

    event.preventDefault()
    tabRefs.current[nextIndex]?.focus()
    onSelect(categories[nextIndex].id, nextIndex)
  }

  return (
    <section className="tabs" role="tablist" aria-label="Categorías de menú">
      {categories.map((category, index) => (
        <button
          className={`tab${selected === category.id ? ' active' : ''}`}
          id={`tab-${category.id}`}
          key={category.id}
          ref={(element) => { tabRefs.current[index] = element }}
          role="tab"
          aria-selected={selected === category.id}
          aria-controls="menu-panel"
          tabIndex={selected === category.id ? 0 : -1}
          type="button"
          onClick={() => onSelect(category.id, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          {category.label}
        </button>
      ))}
    </section>
  )
}
