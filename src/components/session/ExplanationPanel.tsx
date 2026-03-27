import type { SessionQuestion } from '../../types/session'
import { RichContent } from '../shared/RichContent'

interface ExplanationPanelProps {
  sessionQuestion: SessionQuestion
  selectedChoiceIds: string[]
  isCorrect: boolean | null
}

export function ExplanationPanel({ sessionQuestion, selectedChoiceIds, isCorrect }: ExplanationPanelProps) {
  const { question, shuffled_choices } = sessionQuestion
  const isText = question.type === 'text'

  const correctChoices = shuffled_choices.filter((c) => c.is_correct)
  const incorrectSelected = selectedChoiceIds.filter(
    (id) => !shuffled_choices.find((c) => c.id === id)?.is_correct
  )

  const resultColor =
    isCorrect === true
      ? 'border-green-300 bg-green-50'
      : isCorrect === false
        ? 'border-red-300 bg-red-50'
        : 'border-gray-300 bg-gray-50'

  const resultIcon = isCorrect === true ? '✓' : isCorrect === false ? '✗' : 'ℹ'
  const resultLabel =
    isCorrect === true ? 'Correct!' : isCorrect === false ? 'Incorrect' : 'Answer submitted'
  const iconColor =
    isCorrect === true ? 'text-green-700' : isCorrect === false ? 'text-red-700' : 'text-gray-700'

  return (
    <div className={`rounded-xl border-2 p-5 ${resultColor}`}>
      <div className={`mb-3 flex items-center gap-2 font-semibold ${iconColor}`}>
        <span className="text-lg">{resultIcon}</span>
        <span>{resultLabel}</span>
      </div>

      {isText && correctChoices.length > 0 && (
        <div className="mb-3">
          <p className="mb-1.5 text-sm font-medium text-gray-700">
            {correctChoices.length === 1 ? 'Expected answer:' : 'Expected answers:'}
          </p>
          <ul className="space-y-1">
            {correctChoices.map((c) => (
              <li key={c.id} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 shrink-0 text-green-600">✓</span>
                <RichContent content={c.text} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isText && correctChoices.length > 0 && (
        <div className="mb-3">
          <p className="mb-1.5 text-sm font-medium text-gray-700">
            {correctChoices.length === 1 ? 'Correct answer:' : 'Correct answers:'}
          </p>
          <ul className="space-y-1">
            {correctChoices.map((c) => (
              <li key={c.id} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 shrink-0 text-green-600">✓</span>
                <RichContent content={c.text} />
              </li>
            ))}
          </ul>
          {incorrectSelected.length > 0 && (
            <ul className="mt-1 space-y-1">
              {incorrectSelected.map((id) => {
                const c = shuffled_choices.find((ch) => ch.id === id)
                return c ? (
                  <li key={id} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 shrink-0 text-red-600">✗</span>
                    <RichContent content={c.text} />
                  </li>
                ) : null
              })}
            </ul>
          )}
        </div>
      )}

      {question.explanation && (
        <div className="border-t border-gray-200 pt-3">
          <p className="mb-1.5 text-sm font-semibold text-gray-700">Explanation</p>
          <div className="text-sm text-gray-800">
            <RichContent content={question.explanation} />
          </div>
        </div>
      )}
    </div>
  )
}
