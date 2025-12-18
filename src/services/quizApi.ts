// Quiz API service for Daily Quiz Card
// Mock-first implementation with deterministic daily quiz selection

export interface QuizQuestion {
  id: string
  question: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: 'multiple' | 'boolean'
  correctAnswer: string
  incorrectAnswers: string[]
  allAnswers: string[]
  explanation?: string
  relatedCountry?: string // For "Explore [Country]" CTA
}

export interface QuizResponse {
  question: QuizQuestion
  timestamp: number
  source: 'mock' | 'api'
}

// Mock quiz data - geography questions for kids
const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: 'Which country is known as the "Land of the Rising Sun"?',
    category: 'Geography',
    difficulty: 'easy',
    type: 'multiple',
    correctAnswer: 'Japan',
    incorrectAnswers: ['China', 'South Korea', 'Thailand'],
    allAnswers: ['Japan', 'China', 'South Korea', 'Thailand'],
    explanation: 'Japan is called the "Land of the Rising Sun" because it is located to the east of Asia, where the sun rises.',
    relatedCountry: 'Japan'
  },
  {
    id: 'quiz-2',
    question: 'What is the capital city of Australia?',
    category: 'Geography',
    difficulty: 'easy',
    type: 'multiple',
    correctAnswer: 'Canberra',
    incorrectAnswers: ['Sydney', 'Melbourne', 'Brisbane'],
    allAnswers: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
    explanation: 'Canberra is the capital of Australia, even though Sydney and Melbourne are larger cities.',
    relatedCountry: 'Australia'
  },
  {
    id: 'quiz-3',
    question: 'Which country is home to the Amazon Rainforest?',
    category: 'Geography',
    difficulty: 'medium',
    type: 'multiple',
    correctAnswer: 'Brazil',
    incorrectAnswers: ['Peru', 'Colombia', 'Venezuela'],
    allAnswers: ['Brazil', 'Peru', 'Colombia', 'Venezuela'],
    explanation: 'Brazil contains about 60% of the Amazon Rainforest, the largest tropical rainforest in the world.',
    relatedCountry: 'Brazil'
  },
  {
    id: 'quiz-4',
    question: 'What is the smallest country in the world by land area?',
    category: 'Geography',
    difficulty: 'medium',
    type: 'multiple',
    correctAnswer: 'Vatican City',
    incorrectAnswers: ['Monaco', 'San Marino', 'Liechtenstein'],
    allAnswers: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
    explanation: 'Vatican City is the smallest country in the world, covering only about 0.17 square miles!'
  },
  {
    id: 'quiz-5',
    question: 'Which African country is famous for its wildlife safaris?',
    category: 'Geography',
    difficulty: 'easy',
    type: 'multiple',
    correctAnswer: 'Kenya',
    incorrectAnswers: ['Egypt', 'South Africa', 'Nigeria'],
    allAnswers: ['Kenya', 'Egypt', 'South Africa', 'Nigeria'],
    explanation: 'Kenya is world-famous for its national parks and wildlife safaris, especially the Great Migration.',
    relatedCountry: 'Kenya'
  }
]

/**
 * Shuffle array using Fisher-Yates algorithm
 * Uses a seed for deterministic shuffling
 */
function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array]
  let random = seed
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Simple pseudo-random using seed
    random = (random * 9301 + 49297) % 233280
    const j = Math.floor((random / 233280) * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

/**
 * Get a deterministic daily quiz question based on the date
 * @param date - Optional date parameter for testing determinism (defaults to current date)
 * @returns QuizResponse with the daily question
 */
export async function getDailyQuizQuestion(date: Date = new Date()): Promise<QuizResponse> {
  // Use UTC date string as seed for deterministic selection
  const dateString = date.toISOString().split('T')[0] // YYYY-MM-DD
  const daySeed = dateString.split('-').reduce((acc, val) => acc + parseInt(val, 10), 0)
  
  // Select question based on day of year (deterministic)
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const questionIndex = dayOfYear % MOCK_QUIZ_QUESTIONS.length
  const selectedQuestion = MOCK_QUIZ_QUESTIONS[questionIndex]
  
  // Shuffle answers deterministically using date as seed
  const shuffledAnswers = shuffleArray(
    [selectedQuestion.correctAnswer, ...selectedQuestion.incorrectAnswers],
    daySeed
  )
  
  return {
    question: {
      ...selectedQuestion,
      allAnswers: shuffledAnswers
    },
    timestamp: date.getTime(),
    source: 'mock'
  }
}

