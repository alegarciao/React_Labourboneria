import { useState } from 'react'
import { PRODUCTS } from '../data/products.js'
import { CategoryTabs, ProductCard } from '../components/Products.jsx'

const CATEGORIES = [
  { id: 'cafes', label: 'Cafés', title: 'Cafés de Especialidad' },
  { id: 'bebidas', label: 'Bebidas', title: 'Bebidas Artesanales' },
  { id: 'desayunos', label: 'Desayunos', title: 'Desayunos & Horneados' },
  { id: 'postres', label: 'Postres', title: 'Postres de Autor' },
  { id: 'especialidades', label: 'Especialidades', title: 'Especialidades de la Casa' },
]

export function MenuPage({ onAdd, initialCategory = 'cafes' }) {
  const [selected, setSelected] = useState(initialCategory)
  const category = CATEGORIES.find((item) => item.id === selected) || CATEGORIES[0]
  const products = PRODUCTS.filter((product) => product.category === selected)

  return (
    <main className="menu-page">
      <section className="intro-panel">
        <div className="ornament" />
        <h1>Nuestro Menú</h1>
        <p>Selecciones artesanales preparadas con esmero. Explore nuestra oferta de cafés de especialidad, bollería horneada diariamente y opciones selectas para cada momento del día.</p>
        <div className="ornament" />
      </section>

      <CategoryTabs categories={CATEGORIES} selected={selected} onSelect={setSelected} />
      <p className="sr-only" aria-live="polite">Mostrando {products.length} productos en {category.title}.</p>
      <section className="menu-section" id="menu-panel" role="tabpanel" aria-labelledby={`tab-${selected}`} tabIndex="0">
        <div className="section-line"><h2>{category.title}</h2></div>
        <div className="menu-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}
        </div>
      </section>
    </main>
  )
}
