import { Benefits, FavoritesSection, Hero, LocationSection, StorySection } from '../components/LandingSections.jsx'

export function HomePage({ onAdd, onNavigate }) {
  return (
    <main>
      <Hero onNavigate={onNavigate} />
      <Benefits />
      <FavoritesSection onAdd={onAdd} />
      <StorySection />
      <LocationSection />
    </main>
  )
}
