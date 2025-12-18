// Quiz API service for Daily Quiz Card
// Uses Open Trivia DB API: https://opentdb.com

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

// Open Trivia DB API response types
interface OpenTriviaResponse {
  response_code: number
  results: OpenTriviaQuestion[]
}

interface OpenTriviaQuestion {
  category: string
  type: 'multiple' | 'boolean'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string // HTML entities need decoding
  correct_answer: string // HTML entities need decoding
  incorrect_answers: string[] // HTML entities need decoding
}

const API_URL = 'https://opentdb.com/api.php?amount=1&category=22&type=multiple'

/**
 * Decode HTML entities in strings
 * Handles common entities like &quot;, &#039;, &amp;, etc.
 */
function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Transform Open Trivia DB response to our QuizQuestion interface
 */
function transformTriviaQuestion(apiQuestion: OpenTriviaQuestion): QuizQuestion {
  const decodedQuestion = decodeHtmlEntities(apiQuestion.question)
  const decodedCorrect = decodeHtmlEntities(apiQuestion.correct_answer)
  const decodedIncorrect = apiQuestion.incorrect_answers.map(answer => decodeHtmlEntities(answer))
  
  // Combine and shuffle all answers
  const allAnswers = shuffleArray([decodedCorrect, ...decodedIncorrect])
  
  return {
    id: `trivia-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    question: decodedQuestion,
    category: apiQuestion.category,
    difficulty: apiQuestion.difficulty,
    type: apiQuestion.type,
    correctAnswer: decodedCorrect,
    incorrectAnswers: decodedIncorrect,
    allAnswers
  }
}

/**
 * Get a daily quiz question from Open Trivia DB
 * Falls back to a friendly error message if the API fails
 * @param date - Optional date parameter for testing determinism (defaults to current date)
 * @returns QuizResponse with the daily question
 */
export async function getDailyQuizQuestion(date: Date = new Date()): Promise<QuizResponse> {
  try {
    const response = await fetch(API_URL)
    
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`)
    }
    
    const data = await response.json() as OpenTriviaResponse
    
    // Check response code (0 = success)
    if (data.response_code !== 0) {
      throw new Error(`API returned response code ${data.response_code}`)
    }
    
    // Check if we have results
    if (!data.results || data.results.length === 0) {
      throw new Error('No quiz questions available')
    }
    
    const transformedQuestion = transformTriviaQuestion(data.results[0])
    
    return {
      question: transformedQuestion,
      timestamp: date.getTime(),
      source: 'api'
    }
  } catch {
    // Return a fallback question with a friendly message
    const fallbackQuestion: QuizQuestion = {
      id: 'fallback-quiz',
      question: 'Oops! We couldn\'t load a new quiz question right now. Try again in a moment! 🌍',
      category: 'Geography',
      difficulty: 'easy',
      type: 'multiple',
      correctAnswer: 'Try Again',
      incorrectAnswers: ['Refresh Page', 'Check Internet', 'Wait a Bit'],
      allAnswers: shuffleArray(['Try Again', 'Refresh Page', 'Check Internet', 'Wait a Bit']),
      explanation: 'Sometimes the quiz service needs a quick break. Don\'t worry, you can try searching for countries instead!'
    }
    
    return {
      question: fallbackQuestion,
      timestamp: date.getTime(),
      source: 'api'
    }
  }
}

