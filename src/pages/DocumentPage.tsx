import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDataService } from '../context/ServiceContext'
import { PageContainer } from '../components/layout/PageContainer'
import { RichContent } from '../components/shared/RichContent'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import { ErrorMessage } from '../components/shared/ErrorMessage'

function humanize(filename: string): string {
  return filename
    .replace(/\.md$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
}

function extractTitle(content: string, fallback: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : fallback
}

export function DocumentPage() {
  const { quizId, filename } = useParams<{ quizId: string; filename: string }>()
  const service = useDataService()

  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    if (!quizId || !filename) return
    setLoading(true)
    setError(null)
    service
      .getQuizDocument(quizId, filename)
      .then((text) => {
        setContent(text)
        setLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load document')
        setLoading(false)
      })
  }

  useEffect(() => { load() }, [quizId, filename]) // eslint-disable-line react-hooks/exhaustive-deps

  const displayTitle = content ? extractTitle(content, humanize(filename ?? '')) : humanize(filename ?? '')

  return (
    <PageContainer>
      <div className="mb-4">
        <Link to={`/quiz/${quizId}`} className="text-sm text-amber-600 hover:underline">
          ← Back to quiz
        </Link>
      </div>

      {loading && <LoadingSpinner message="Loading document..." />}
      {error && <ErrorMessage message={error} onRetry={load} />}

      {content && !loading && (
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">{displayTitle}</h1>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-gray-700">
            <RichContent content={content} />
          </div>
        </div>
      )}
    </PageContainer>
  )
}
