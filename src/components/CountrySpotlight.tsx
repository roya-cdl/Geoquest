import './CountrySpotlight.css'

interface CountrySpotlightProps {
  onClose: () => void
}

function CountrySpotlight({ onClose }: CountrySpotlightProps) {
  return (
    <div className="spotlight-overlay" onClick={onClose}>
      <div className="spotlight-card" onClick={(e) => e.stopPropagation()}>
        <button className="spotlight-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="spotlight-content">
          <div className="construction-icon">🚧</div>
          <h2>Country Spotlight</h2>
          <p>This feature is under construction!</p>
          <p className="spotlight-subtext">
            Check back soon for exciting country spotlights with fun facts, 
            quizzes, and interactive learning activities!
          </p>
        </div>
      </div>
    </div>
  )
}

export default CountrySpotlight

