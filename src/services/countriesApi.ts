// Countries API service with pre-loading and caching
// Uses REST Countries API: https://restcountries.com

export interface Country {
  name: {
    common: string
    official: string
  }
  capital?: string[]
  region: string
  subregion?: string
  population: number
  area: number
  flags: {
    png: string
    svg: string
    alt?: string
  }
  currencies?: Record<string, { name: string; symbol: string }>
  languages?: Record<string, string>
  borders?: string[]
}

// REST Countries API response type (what we receive from the API)
interface RestCountryResponse {
  name: {
    common: string
    official: string
  }
  cca2: string
  capital?: string[]
  region: string
  subregion?: string
  population: number
  area?: number
  flags: {
    png: string
    svg: string
    alt?: string
  }
  currencies?: Record<string, { name: string; symbol: string }>
  languages?: Record<string, string>
  borders?: string[]
}

// In-memory cache for countries
interface CountriesCache {
  countries: Country[] | null
  loading: Promise<Country[]> | null
  error: Error | null
}

const cache: CountriesCache = {
  countries: null,
  loading: null,
  error: null
}

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,cca2,flags,region,subregion,capital,population,area,languages,currencies,borders'

/**
 * Transform REST Countries API response to our Country interface
 */
function transformCountry(apiCountry: RestCountryResponse): Country {
  return {
    name: {
      common: apiCountry.name.common,
      official: apiCountry.name.official
    },
    capital: apiCountry.capital,
    region: apiCountry.region,
    subregion: apiCountry.subregion,
    population: apiCountry.population,
    area: apiCountry.area ?? 0, // Default to 0 if area not provided
    flags: {
      png: apiCountry.flags.png,
      svg: apiCountry.flags.svg,
      alt: apiCountry.flags.alt
    },
    currencies: apiCountry.currencies,
    languages: apiCountry.languages,
    borders: apiCountry.borders
  }
}

/**
 * Pre-load all countries from REST Countries API
 * Caches results in memory for subsequent searches
 */
async function preloadCountries(): Promise<Country[]> {
  // If already loading, return the existing promise
  if (cache.loading) {
    return cache.loading
  }

  // If already cached, return cached data
  if (cache.countries) {
    return cache.countries
  }

  // If previous load failed, clear error and retry
  if (cache.error) {
    cache.error = null
  }

  // Create loading promise
  const loadPromise = fetch(API_URL)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`)
      }

      const apiCountries = await response.json() as RestCountryResponse[]
      const transformedCountries = apiCountries.map(transformCountry)

      // Cache the results
      cache.countries = transformedCountries
      cache.loading = null

      return transformedCountries
    })
    .catch((error) => {
      cache.error = error instanceof Error ? error : new Error('Unknown error loading countries')
      cache.loading = null
      throw cache.error
    })

  cache.loading = loadPromise
  return loadPromise
}

/**
 * Search countries by name using cached data
 * Pre-loads countries on first call if cache is empty
 */
export async function searchCountryByName(name: string): Promise<Country[]> {
  if (!name.trim()) {
    return []
  }

  // Ensure countries are loaded
  if (!cache.countries && !cache.loading) {
    await preloadCountries()
  }

  // If still loading, wait for it
  if (cache.loading) {
    await cache.loading
  }

  // If error occurred, throw it
  if (cache.error) {
    throw cache.error
  }

  // If no countries cached (shouldn't happen, but handle gracefully)
  if (!cache.countries) {
    return []
  }

  // Filter cached countries by name (case-insensitive partial match)
  const searchLower = name.toLowerCase().trim()
  const results = cache.countries.filter(country =>
    country.name.common.toLowerCase().includes(searchLower) ||
    country.name.official.toLowerCase().includes(searchLower)
  )

  return results
}
