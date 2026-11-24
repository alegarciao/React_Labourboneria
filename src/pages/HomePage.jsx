import { Benefits, FavoritesSection, Hero, LocationSection, StorySection } from '../components/LandingSections.jsx'

export function HomePage({ products, onAdd, onNavigate }) {
  return (
    <main>
      <Hero onNavigate={onNavigate} />
      <Benefits />
      <FavoritesSection products={products} onAdd={onAdd} />
      <StorySection />
      <LocationSection />
    </main>
  )
}
