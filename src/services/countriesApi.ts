// Mock Countries API service
// Using the REST Countries API as a reference for the structure

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

const API_BASE_URL = 'https://restcountries.com/v3.1'

export async function searchCountryByName(name: string): Promise<Country[]> {
  if (!name.trim()) {
    return []
  }

  try {
    const response = await fetch(`${API_BASE_URL}/name/${encodeURIComponent(name)}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        return []
      }
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const data: Country[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching country data:', error)
    throw error
  }
}

