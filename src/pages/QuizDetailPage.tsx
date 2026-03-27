import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import type { Quiz } from '../types/quiz'
import { useDataService } from '../context/ServiceContext'
import { useSession } from '../context/SessionContext'
import { useConfig } from '../context/ConfigContext'
import { buildSession } from '../utils/sessionBuilder'
import { PageContainer } from '../components/layout/PageContainer'
import { RichContent } from '../components/shared/RichContent'
import { TagBadge } from '../components/shared/TagBadge'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import { ErrorMessage } from '../components/shared/ErrorMessage'

export function QuizDetailPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const service = useDataService()
  const { dispatch } = useSession()
  const config = useConfig()

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    if (!quizId) return
    setLoading(true)
    setError(null)
    service
      .getQuiz(quizId)
      .then((data) => {
        setQuiz(data)
        setLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load quiz')
        setLoading(false)
      })
  }

  useEffect(() => { load() }, [quizId]) // eslint-disable-line react-hooks/exhaustive-deps

  const examNotAvailable = quiz?.mode === 'exam' && config.mode === 'static'

  const handleStart = () => {
    if (!quiz) return
    const session = buildSession(quiz)
    dispatch({ type: 'START_SESSION', payload: session })
    navigate(`/quiz/${quiz.id}/session`)
  }

  // Allow pressing Enter to start the quiz
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.tagName === 'A') return
      if (quiz && !loading && !examNotAvailable) handleStart()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageContainer>
      <div className="mb-4">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          ← Back to quizzes
        </Link>
      </div>

      {loading && <LoadingSpinner message="Loading quiz..." />}
      {error && <ErrorMessage message={error} onRetry={load} />}

      {quiz && !loading && (
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl">{quiz.name}</h1>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {quiz.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            </div>
            <span
              className={[
                'shrink-0 rounded-full px-3 py-1 text-sm font-semibold',
                quiz.mode === 'exam'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-green-100 text-green-800',
              ].join(' ')}
            >
              {quiz.mode} mode
            </span>
          </div>

          {quiz.description && (
            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm text-gray-700">
              <RichContent content={quiz.description} />
            </div>
          )}

          {/* Metadata */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white border border-gray-200 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{quiz.questions.length}</div>
              <div className="text-sm text-gray-500">Questions</div>
            </div>
            {quiz.question_limit && quiz.question_limit < quiz.questions.length && (
              <div className="rounded-lg bg-white border border-gray-200 p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{quiz.question_limit}</div>
                <div className="text-sm text-gray-500">Per session</div>
              </div>
            )}
            <div className="rounded-lg bg-white border border-gray-200 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{quiz.pass_threshold}%</div>
              <div className="text-sm text-gray-500">Pass threshold</div>
            </div>
          </div>

          {examNotAvailable && (
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <strong>Exam mode requires API backend.</strong> This quiz is set to exam mode, but
              the app is currently running in static mode. Configure an API backend in{' '}
              <code className="rounded bg-amber-100 px-1">public/config.json</code> to take this
              quiz.
            </div>
          )}

          <button
            onClick={handleStart}
            disabled={!!examNotAvailable}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            Start quiz →
          </button>
          <p className="mt-2 text-xs text-gray-400">Press Enter to start</p>
        </div>
      )}
    </PageContainer>
  )
}
