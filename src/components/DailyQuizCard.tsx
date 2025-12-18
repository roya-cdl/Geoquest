import { useState, useEffect } from 'react'
import { getDailyQuizQuestion, type QuizQuestion } from '../services/quizApi'
import './DailyQuizCard.css'
import LoadingSpinner from './LoadingSpinner'

interface DailyQuizCardProps {
  onExploreCountry?: (countryName: string) => void
}

function DailyQuizCard({ onExploreCountry }: DailyQuizCardProps) {
  const [quiz, setQuiz] = useState<QuizQuestion | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    async function loadQuiz() {
      setLoading(true)
      try {
        const response = await getDailyQuizQuestion()
        setQuiz(response.question)
      } catch (error) {
        // Error handling - could show error message in future
      } finally {
        setLoading(false)
      }
    }

    loadQuiz()
  }, [])

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer !== null || !quiz) return // Already answered

    setSelectedAnswer(answer)
    setShowFeedback(true)
  }

  const handleExploreClick = () => {
    if (quiz?.relatedCountry && onExploreCountry) {
      onExploreCountry(quiz.relatedCountry)
    }
  }

  if (loading) {
    return (
      <article className="daily-quiz-card">
        <div className="quiz-loading">
          <LoadingSpinner />
        </div>
      </article>
    )
  }

  if (!quiz) {
    return null
  }

  const isCorrect = selectedAnswer === quiz.correctAnswer
  const showExploreCTA = quiz.relatedCountry && selectedAnswer !== null

  return (
    <article className="daily-quiz-card" aria-label="Daily geography quiz">
      <header className="quiz-header">
        <h2 className="quiz-title">🎯 Daily Quiz</h2>
      </header>

      <section className="quiz-content">
        <h3 className="quiz-question">{quiz.question}</h3>

        <div className="quiz-options" role="group" aria-label="Answer options">
          {quiz.allAnswers.map((answer, index) => {
            const isSelected = selectedAnswer === answer
            const isCorrectAnswer = answer === quiz.correctAnswer
            const showResult = selectedAnswer !== null

            let buttonClass = 'quiz-option'
            if (showResult) {
              if (isCorrectAnswer) {
                buttonClass += ' quiz-option-correct'
              } else if (isSelected && !isCorrectAnswer) {
                buttonClass += ' quiz-option-incorrect'
              } else {
                buttonClass += ' quiz-option-disabled'
              }
            }

            return (
              <button
                key={`${answer}-${index}`}
                type="button"
                className={buttonClass}
                onClick={() => handleAnswerClick(answer)}
                disabled={selectedAnswer !== null}
                aria-label={`Answer option ${index + 1}: ${answer}`}
                aria-pressed={isSelected}
              >
                {answer}
              </button>
            )
          })}
        </div>

        {showFeedback && (
          <section
            className={`quiz-feedback ${isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-incorrect'}`}
            role="alert"
            aria-live="polite"
          >
            <span className="feedback-icon">{isCorrect ? '✅' : '❌'}</span>
            <p className="feedback-message">
              {isCorrect
                ? 'Great job! You got it right!'
                : `Not quite! The correct answer is ${quiz.correctAnswer}.`}
            </p>
            {quiz.explanation && (
              <p className="feedback-explanation">{quiz.explanation}</p>
            )}
          </section>
        )}

        {showExploreCTA && (
          <div className="quiz-cta">
            <button
              type="button"
              className="explore-button"
              onClick={handleExploreClick}
              aria-label={`Explore ${quiz.relatedCountry}`}
            >
              🌍 Explore {quiz.relatedCountry}
            </button>
          </div>
        )}
      </section>
    </article>
  )
}

export default DailyQuizCard

