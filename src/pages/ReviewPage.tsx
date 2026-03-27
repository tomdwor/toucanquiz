import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSession } from '../context/SessionContext'
import { calculateScore } from '../utils/scoring'
import { PageContainer } from '../components/layout/PageContainer'
import { ReviewSummary } from '../components/review/ReviewSummary'
import { ReviewFilter, type ReviewFilterType } from '../components/review/ReviewFilter'
import { ReviewQuestionItem } from '../components/review/ReviewQuestionItem'

export function ReviewPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const { session, dispatch } = useSession()

  const [filter, setFilter] = useState<ReviewFilterType>('all')

  useEffect(() => {
    if (!session || session.quiz_id !== quizId || session.status !== 'reviewing') {
      navigate('/', { replace: true })
    }
  }, [session, quizId, navigate])

  const score = useMemo(
    () => (session ? calculateScore(session) : null),
    [session]
  )

  const filteredQuestions = useMemo(() => {
    if (!session) return []
    return session.questions.filter((sq) => {
      const answer = session.answers[sq.question.id]
      if (filter === 'correct') return answer?.is_correct === true
      if (filter === 'incorrect') return answer?.is_correct === false
      if (filter === 'neutral') return answer != null && answer.is_correct === null
      return true
    })
  }, [session, filter])

  const handleRetake = () => {
    dispatch({ type: 'RESET_SESSION' })
    navigate(`/quiz/${quizId}`)
  }

  if (!session || !score) return null

  return (
    <PageContainer className="max-w-3xl">
      <div className="mb-4">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          ← Back to quizzes
        </Link>
      </div>

      <div className="space-y-6">
        <ReviewSummary quizName={session.quiz_name} score={score} />

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRetake}
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Retake quiz
          </button>
          <Link
            to="/"
            onClick={() => dispatch({ type: 'RESET_SESSION' })}
            className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            All quizzes
          </Link>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Question review</h2>
          <div className="mb-4">
            <ReviewFilter
              active={filter}
              onChange={setFilter}
              counts={{
                all: session.questions.length,
                correct: score.correct,
                incorrect: score.incorrect,
                neutral: score.neutral,
              }}
            />
          </div>

          <div className="space-y-4">
            {filteredQuestions.map((sq) => (
              <ReviewQuestionItem
                key={sq.question.id}
                index={session.questions.indexOf(sq)}
                sessionQuestion={sq}
                answer={session.answers[sq.question.id]}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
