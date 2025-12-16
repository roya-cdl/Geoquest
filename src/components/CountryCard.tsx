import { type Country } from '../services/countriesApi'
import './CountryCard.css'

interface CountryCardProps {
  country: Country
}

function CountryCard({ country }: CountryCardProps) {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="country-card">
      <div className="country-flag">
        <img 
          src={country.flags.png} 
          alt={country.flags.alt || `${country.name.common} flag`}
          loading="lazy"
        />
      </div>
      
      <div className="country-info">
        <h3 className="country-name">{country.name.common}</h3>
        <p className="country-official">{country.name.official}</p>
        
        <div className="country-details">
          {country.capital && country.capital.length > 0 && (
            <div className="detail-item">
              <span className="detail-label">🏛️ Capital:</span>
              <span className="detail-value">{country.capital.join(', ')}</span>
            </div>
          )}
          
          <div className="detail-item">
            <span className="detail-label">🌎 Region:</span>
            <span className="detail-value">{country.region}</span>
          </div>
          
          {country.subregion && (
            <div className="detail-item">
              <span className="detail-label">📍 Subregion:</span>
              <span className="detail-value">{country.subregion}</span>
            </div>
          )}
          
          <div className="detail-item">
            <span className="detail-label">👥 Population:</span>
            <span className="detail-value">{formatNumber(country.population)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">📏 Area:</span>
            <span className="detail-value">{formatNumber(country.area)} km²</span>
          </div>
          
          {country.currencies && (
            <div className="detail-item">
              <span className="detail-label">💰 Currency:</span>
              <span className="detail-value">
                {Object.values(country.currencies)
                  .map(c => `${c.name} (${c.symbol})`)
                  .join(', ')}
              </span>
            </div>
          )}
          
          {country.languages && (
            <div className="detail-item">
              <span className="detail-label">🗣️ Languages:</span>
              <span className="detail-value">
                {Object.values(country.languages).join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryCard

