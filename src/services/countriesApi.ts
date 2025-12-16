// Mock Countries API service
// Students will replace this with real REST Countries API in Step 5

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

// Mock data for initial implementation
const MOCK_COUNTRIES: Country[] = [
  {
    name: { common: 'France', official: 'French Republic' },
    capital: ['Paris'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 67390000,
    area: 551695,
    flags: { png: 'https://flagcdn.com/w320/fr.png', svg: 'https://flagcdn.com/fr.svg', alt: 'Flag of France' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    languages: { fra: 'French' },
    borders: ['AND', 'BEL', 'DEU', 'ITA', 'LUX', 'MCO', 'ESP', 'CHE']
  },
  {
    name: { common: 'Japan', official: 'Japan' },
    capital: ['Tokyo'],
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 125836021,
    area: 377930,
    flags: { png: 'https://flagcdn.com/w320/jp.png', svg: 'https://flagcdn.com/jp.svg', alt: 'Flag of Japan' },
    currencies: { JPY: { name: 'Japanese yen', symbol: '¥' } },
    languages: { jpn: 'Japanese' },
    borders: []
  },
  {
    name: { common: 'Brazil', official: 'Federative Republic of Brazil' },
    capital: ['Brasília'],
    region: 'Americas',
    subregion: 'South America',
    population: 212559417,
    area: 8515767,
    flags: { png: 'https://flagcdn.com/w320/br.png', svg: 'https://flagcdn.com/br.svg', alt: 'Flag of Brazil' },
    currencies: { BRL: { name: 'Brazilian real', symbol: 'R$' } },
    languages: { por: 'Portuguese' },
    borders: ['ARG', 'BOL', 'COL', 'GUF', 'GUY', 'PRY', 'PER', 'SUR', 'URY', 'VEN']
  },
  {
    name: { common: 'Australia', official: 'Commonwealth of Australia' },
    capital: ['Canberra'],
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    population: 25687041,
    area: 7692024,
    flags: { png: 'https://flagcdn.com/w320/au.png', svg: 'https://flagcdn.com/au.svg', alt: 'Flag of Australia' },
    currencies: { AUD: { name: 'Australian dollar', symbol: '$' } },
    languages: { eng: 'English' },
    borders: []
  },
  {
    name: { common: 'Kenya', official: 'Republic of Kenya' },
    capital: ['Nairobi'],
    region: 'Africa',
    subregion: 'Eastern Africa',
    population: 53771296,
    area: 580367,
    flags: { png: 'https://flagcdn.com/w320/ke.png', svg: 'https://flagcdn.com/ke.svg', alt: 'Flag of Kenya' },
    currencies: { KES: { name: 'Kenyan shilling', symbol: 'Sh' } },
    languages: { eng: 'English', swa: 'Swahili' },
    borders: ['ETH', 'SOM', 'SSD', 'TZA', 'UGA']
  }
]

// Simulate network delay for realistic UX
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function searchCountryByName(name: string): Promise<Country[]> {
  if (!name.trim()) {
    return []
  }

  // Simulate network delay (300-600ms)
  await simulateDelay(300 + Math.random() * 300)

  // Filter mock data by name (case-insensitive partial match)
  const searchLower = name.toLowerCase().trim()
  const results = MOCK_COUNTRIES.filter(country =>
    country.name.common.toLowerCase().includes(searchLower) ||
    country.name.official.toLowerCase().includes(searchLower)
  )

  return results
}
