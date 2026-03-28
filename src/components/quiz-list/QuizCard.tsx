import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { QuizSummary } from '../../types/quiz'
import { TagBadge } from '../shared/TagBadge'
import { RichContent } from '../shared/RichContent'
import { langName } from '../../utils/langName'
import { tagHue } from '../../utils/tagColor'

const fmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

function formatDate(iso: string) {
  return fmt.format(new Date(iso))
}

interface QuizCardProps {
  quiz: QuizSummary
}

export function QuizCard({ quiz }: QuizCardProps) {
  const [hovered, setHovered] = useState(false)

  const modeBadge =
    quiz.mode === 'exam'
      ? 'bg-amber-100 text-amber-800'
      : 'bg-green-100 text-green-800'

  const accentHue = quiz.tags.length > 0 ? tagHue(quiz.tags[0]) : null
  const borderLeftColor = accentHue !== null
    ? `hsl(${accentHue}, ${hovered ? '55%, 60%' : '50%, 70%'})`
    : hovered ? '#60a5fa' : '#93c5fd'

  return (
    <Link
      to={`/quiz/${quiz.id}`}
      className="group block rounded-xl border border-l-4 border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      style={{ borderLeftColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
          {quiz.name}
        </h2>
        <div className="flex shrink-0 items-center gap-1.5">
          {quiz.language && (
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
              {langName(quiz.language)}
            </span>
          )}
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${modeBadge}`}>
            {quiz.mode}
          </span>
        </div>
      </div>

      {quiz.description && (
        <div className="mb-3 line-clamp-2 text-sm text-gray-600">
          <RichContent content={quiz.description} />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
        <span>{quiz.question_count} question{quiz.question_count !== 1 ? 's' : ''}</span>
        {quiz.question_limit && quiz.question_limit < quiz.question_count && (
          <span className="text-gray-400">({quiz.question_limit} shown per session)</span>
        )}
      </div>

      {quiz.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {quiz.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-400">
        <span>Created: {formatDate(quiz.created_at)}</span>
        {quiz.modified_at && (
          <span>Updated: {formatDate(quiz.modified_at)}</span>
        )}
      </div>
    </Link>
  )
}
