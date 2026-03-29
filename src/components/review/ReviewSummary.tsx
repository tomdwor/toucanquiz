import type { ScoreResult } from '../../utils/scoring'

interface ReviewSummaryProps {
  quizName: string
  score: ScoreResult
}

export function ReviewSummary({ quizName, score }: ReviewSummaryProps) {
  const passColor = score.passed ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
  const passTextColor = score.passed ? 'text-green-700' : 'text-red-700'

  return (
    <div className={`rounded-xl border-2 p-6 ${passColor}`}>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{quizName}</h1>
          <p className="text-sm text-gray-600">Quiz complete</p>
        </div>
        <div className={`text-center ${passTextColor}`}>
          <div className="text-5xl font-bold">{score.percentage}%</div>
          <div className="text-lg font-semibold">{score.passed ? '✓ Passed' : '✗ Failed'}</div>
        </div>
      </div>

      <div className={`grid divide-x divide-gray-200 rounded-lg bg-white/60 p-3 text-center text-sm ${score.neutral > 0 ? 'grid-cols-4' : 'grid-cols-3'}`}>
        <div>
          <div className="text-2xl font-bold text-green-600">{score.correct}</div>
          <div className="text-gray-600">Correct</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-red-500">{score.incorrect}</div>
          <div className="text-gray-600">Incorrect</div>
        </div>
        {score.neutral > 0 && (
          <div>
            <div className="text-2xl font-bold text-gray-500">{score.neutral}</div>
            <div className="text-gray-600">Neutral</div>
          </div>
        )}
        <div>
          <div className="text-2xl font-bold text-gray-500">{score.total}</div>
          <div className="text-gray-600">Total</div>
        </div>
      </div>
    </div>
  )
}
