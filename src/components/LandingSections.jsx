import { PRODUCTS } from '../data/products.js'
import { ProductCard } from './Products.jsx'
import { AppLink } from './SiteChrome.jsx'

const FAVORITES = [
  {
    id: 'latte-clasico',
    image: 'https://i.pinimg.com/1200x/c3/41/c9/c341c9711576ff79b316de129baea4f1.jpg',
    imageAlt: 'Latte macchiato clásico sobre mesa de madera',
  },
  {
    id: 'tostada-aguacate',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=720&q=80',
    imageAlt: 'Tostada de aguacate servida en plato',
  },
  {
    id: 'croissant-mantequilla',
    image: 'https://i.pinimg.com/736x/2d/7f/d9/2d7fd9ea299d16f0d7b56f2e395ef925.jpg',
    imageAlt: 'Croissant de mantequilla en plato',
  },
]

export function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">Café de especialidad &amp; tradición</p>
        <h1>La Bourboneria</h1>
        <p>Cafés que van contigo. Un rincón europeo en el corazón de la ciudad donde cada taza cuenta una historia.</p>
        <div className="hero-actions">
          <AppLink className="btn primary" href="/menu" onNavigate={onNavigate}>Ver Menú</AppLink>
          <AppLink className="btn ghost-light" href="/menu#cafes" onNavigate={onNavigate}>Hacer Mi Pedido</AppLink>
        </div>
      </div>
    </section>
  )
}

export function Benefits() {
  return (
    <section className="benefits section-band">
      <article><span className="line-icon"><i className="fa-solid fa-mug-hot" /></span><h3>Café de Especialidad</h3><p>Tostaderos asociados, 100% arábica y extracción precisa.</p></article>
      <article><span className="line-icon"><i className="fa-solid fa-bread-slice" /></span><h3>Panadería Matutina</h3><p>Croissants, masas, tartas y focaccia horneadas en casa.</p></article>
      <article><span className="line-icon"><i className="fa-solid fa-cheese" /></span><h3>Desayuno Todo el Día</h3><p>Platos servidos hasta el cierre, sin perder el encanto lento.</p></article>
      <article><span className="line-icon"><i className="fa-solid fa-egg" /></span><h3>Pedidos Rápidos</h3><p>Ordena antes y estará en camino en 15 minutos.</p></article>
    </section>
  )
}

export function FavoritesSection({ onAdd }) {
  const favorites = FAVORITES.map((favorite) => ({
    ...PRODUCTS.find((product) => product.id === favorite.id),
    image: favorite.image,
    imageAlt: favorite.imageAlt,
  }))

  return (
    <section className="section-wrap">
      <div className="section-heading"><span>Nuestros Favoritos</span><h2>Selecciones de la Casa</h2></div>
      <div className="favorites-grid">
        {favorites.map((product, index) => <ProductCard key={product.id} product={product} variant="favorite" featured={index === 1} onAdd={onAdd} />)}
      </div>
    </section>
  )
}

export function StorySection() {
  return (
    <section className="story section-band">
      <div className="framed-image">
        <img src="https://i.pinimg.com/736x/aa/b8/fa/aab8fafafeac9f0931291bc8af0e15c2.jpg" alt="Barista preparando café" />
      </div>
      <div>
        <p className="eyebrow">Nuestra Historia</p>
        <h2>Sobre La Bourboneria</h2>
        <p>Nacida de la pasión por el café auténtico y la panadería artesanal, La Bourboneria es más que una cafetería: es una experiencia sensorial.</p>
        <p>Rescatamos métodos tradicionales, seleccionamos granos de origen y horneamos con paciencia para que cada visita conserve el ritmo del presente.</p>
      </div>
    </section>
  )
}

export function LocationSection() {
  return (
    <section className="location-block">
      <div>
        <p className="eyebrow">Ubicación</p>
        <h2>Un rincón tranquilo en el Barrio Histórico</h2>
        <p>La Bourboneria se encuentra en Calle Salamanca, a pasos de las galerías antiguas del centro. Es un lugar pensado para llegar caminando, pedir un café sin prisa y quedarse a conversar.</p>
      </div>
      <div className="location-card">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfA6ejtRiLKZTzwQtK572j5BSnJ0vOhFBSruRI4Unf2OpFUdOU_qNqBWva&s=10" alt="" />
      </div>
    </section>
  )
}
