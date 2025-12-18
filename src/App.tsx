import { useState } from 'react'
import './App.css'
import CountrySearch from './components/CountrySearch'
import CountrySpotlight from './components/CountrySpotlight'
import DailyQuizCard from './components/DailyQuizCard'

function App() {
  const [showSpotlight, setShowSpotlight] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleExploreCountry = (countryName: string) => {
    setHasSearched(true)
    // Trigger search by setting value and submitting form
    setTimeout(() => {
      const searchInput = document.querySelector('.search-input') as HTMLInputElement
      const searchForm = document.querySelector('.search-form') as HTMLFormElement
      if (searchInput && searchForm) {
        searchInput.value = countryName
        const inputEvent = new Event('input', { bubbles: true })
        searchInput.dispatchEvent(inputEvent)
        const changeEvent = new Event('change', { bubbles: true })
        searchInput.dispatchEvent(changeEvent)
        searchForm.requestSubmit()
      }
    }, 50)
  }

  const handleSearch = () => {
    setHasSearched(true)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌍 GeoQuest Kids</h1>
        <p>Discover the world, one country at a time!</p>
      </header>
      
      <main className="app-main">
        {!hasSearched && (
          <DailyQuizCard onExploreCountry={handleExploreCountry} />
        )}
        <CountrySearch 
          onSearchClick={() => setShowSpotlight(true)}
          onSearch={handleSearch}
        />
        {showSpotlight && <CountrySpotlight onClose={() => setShowSpotlight(false)} />}
      </main>
    </div>
  )
}

export default App

