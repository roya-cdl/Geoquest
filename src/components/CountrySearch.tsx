import { useState, FormEvent } from 'react'
import { searchCountryByName, type Country } from '../services/countriesApi'
import './CountrySearch.css'
import LoadingSpinner from './LoadingSpinner'
import CountryCard from './CountryCard'

interface CountrySearchProps {
  onSearchClick: () => void
  onSearch?: () => void
}

function CountrySearch({ onSearchClick, onSearch }: CountrySearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!searchTerm.trim()) {
      return
    }

    setLoading(true)
    setError(null)
    setHasSearched(true)
    setCountries([])

    if (onSearch) {
      onSearch()
    }

    try {
      const results = await searchCountryByName(searchTerm.trim())
      setCountries(results)
    } catch (_err) {
      setError('Oops! Something went wrong. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  const handleSearchButtonClick = () => {
    onSearchClick()
  }

  return (
    <div className="country-search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a country... (e.g., France, Japan, Brazil)"
            aria-label="Search for a country"
            className="search-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !searchTerm.trim()}
          >
            🔍 Search
          </button>
        </div>
        <button
          type="button"
          onClick={handleSearchButtonClick}
          className="spotlight-button"
        >
          🌟 Country Spotlight
        </button>
      </form>

      {loading && (
        <div className="search-results">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="search-results">
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && hasSearched && countries.length === 0 && (
        <div className="search-results">
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>No countries found. Try searching for a different country!</p>
          </div>
        </div>
      )}

      {!loading && !error && countries.length > 0 && (
        <div className="search-results">
          <h2 className="results-title">Found {countries.length} {countries.length === 1 ? 'country' : 'countries'}!</h2>
          <div className="countries-grid">
            {countries.map((country) => (
              <CountryCard key={country.name.common} country={country} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CountrySearch

