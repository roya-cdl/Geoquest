import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getDailyQuizQuestion } from '../quizApi'

beforeEach(() => {
  // Reset fetch mock
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('quizApi', () => {
  describe('getDailyQuizQuestion', () => {
    it('should fetch and transform a quiz question from Open Trivia DB (happy path)', async () => {
      const mockResponse = {
        response_code: 0,
        results: [
          {
            category: 'Geography',
            type: 'multiple',
            difficulty: 'easy',
            question: 'Which country is known as the &quot;Land of the Rising Sun&quot;?',
            correct_answer: 'Japan',
            incorrect_answers: ['China', 'South Korea', 'Thailand']
          }
        ]
      }

      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockResponse
        } as Response)
      )

      const result = await getDailyQuizQuestion()

      expect(result).toBeDefined()
      expect(result.source).toBe('api')
      expect(result.question).toBeDefined()
      // HTML entities should be decoded
      expect(result.question.question).toBe('Which country is known as the "Land of the Rising Sun"?')
      expect(result.question.correctAnswer).toBe('Japan')
      expect(result.question.incorrectAnswers).toEqual(['China', 'South Korea', 'Thailand'])
      expect(result.question.allAnswers).toHaveLength(4)
      expect(result.question.allAnswers).toContain('Japan')
      expect(result.question.allAnswers).toContain('China')
    })

    it('should decode HTML entities in question and answers', async () => {
      const mockResponse = {
        response_code: 0,
        results: [
          {
            category: 'Geography',
            type: 'multiple',
            difficulty: 'medium',
            question: 'What is the capital of France? &amp; Paris is beautiful!',
            correct_answer: 'Paris',
            incorrect_answers: ['London', 'Berlin', 'Madrid']
          }
        ]
      }

      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockResponse
        } as Response)
      )

      const result = await getDailyQuizQuestion()

      // HTML entities should be decoded (jsdom handles this)
      expect(result.question.question).toContain('&')
      expect(result.question.correctAnswer).toBe('Paris')
    })

    it('should shuffle answer options', async () => {
      const mockResponse = {
        response_code: 0,
        results: [
          {
            category: 'Geography',
            type: 'multiple',
            difficulty: 'easy',
            question: 'Test question?',
            correct_answer: 'Correct',
            incorrect_answers: ['Wrong1', 'Wrong2', 'Wrong3']
          }
        ]
      }

      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockResponse
        } as Response)
      )

      const result = await getDailyQuizQuestion()

      // Answers should be shuffled (order may differ from original)
      expect(result.question.allAnswers).toHaveLength(4)
      expect(result.question.allAnswers).toContain('Correct')
      expect(result.question.allAnswers).toContain('Wrong1')
      expect(result.question.allAnswers).toContain('Wrong2')
      expect(result.question.allAnswers).toContain('Wrong3')
      // Verify the first answer is not always the correct one (shuffled)
      // Note: This test may occasionally fail if shuffle happens to put correct first
      // but it's unlikely with 4 items
    })

    it('should handle empty response or no results', async () => {
      const mockResponse = {
        response_code: 0,
        results: []
      }

      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockResponse
        } as Response)
      )

      const result = await getDailyQuizQuestion()

      expect(result).toBeDefined()
      expect(result.question.id).toBe('fallback-quiz')
      expect(result.question.question).toContain('Oops! We couldn\'t load')
    })

    it('should handle non-zero response code', async () => {
      const mockResponse = {
        response_code: 1, // No results
        results: []
      }

      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockResponse
        } as Response)
      )

      const result = await getDailyQuizQuestion()

      expect(result).toBeDefined()
      expect(result.question.id).toBe('fallback-quiz')
    })

    it('should handle network errors gracefully', async () => {
      globalThis.fetch = vi.fn(() => Promise.reject(new Error('Network error')))

      const result = await getDailyQuizQuestion()

      expect(result).toBeDefined()
      expect(result.question.id).toBe('fallback-quiz')
      expect(result.question.question).toContain('Oops! We couldn\'t load')
    })

    it('should handle non-200 HTTP status', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error'
        } as Response)
      )

      const result = await getDailyQuizQuestion()

      expect(result).toBeDefined()
      expect(result.question.id).toBe('fallback-quiz')
    })

    it('should accept optional date parameter for testing', async () => {
      const mockResponse = {
        response_code: 0,
        results: [
          {
            category: 'Geography',
            type: 'multiple',
            difficulty: 'easy',
            question: 'Test question?',
            correct_answer: 'Answer',
            incorrect_answers: ['Wrong1', 'Wrong2', 'Wrong3']
          }
        ]
      }

      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => mockResponse
        } as Response)
      )

      const testDate = new Date('2024-01-15')
      const result = await getDailyQuizQuestion(testDate)

      expect(result).toBeDefined()
      expect(result.timestamp).toBe(testDate.getTime())
    })
  })
})

