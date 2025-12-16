import { useState } from 'react'
import './App.css'
import CountrySearch from './components/CountrySearch'
import CountrySpotlight from './components/CountrySpotlight'

function App() {
  const [showSpotlight, setShowSpotlight] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌍 GeoQuest Kids</h1>
        <p>Discover the world, one country at a time!</p>
      </header>
      
      <main className="app-main">
        <CountrySearch onSearchClick={() => setShowSpotlight(true)} />
        {showSpotlight && <CountrySpotlight onClose={() => setShowSpotlight(false)} />}
      </main>
    </div>
  )
}

export default App

