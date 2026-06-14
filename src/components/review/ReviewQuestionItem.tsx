import type { SessionQuestion, SessionAnswer } from '../../types/session'
import { RichContent } from '../shared/RichContent'

interface ReviewQuestionItemProps {
  index: number
  sessionQuestion: SessionQuestion
  answer: SessionAnswer | undefined
}

export function ReviewQuestionItem({ index, sessionQuestion, answer }: ReviewQuestionItemProps) {
  const { question, shuffled_choices } = sessionQuestion
  const isOpen = question.type === 'open'
  const isText = question.type === 'text'
  const isSort = question.type === 'sort'

  const correctOrder = isSort
    ? [...shuffled_choices].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : []

  const isCorrect = answer?.is_correct
  // 'open' questions are always neutral (null)
  const borderColor =
    isCorrect === true ? 'border-green-300' : isCorrect === false ? 'border-red-300' : 'border-gray-200'
  const headerBg =
    isCorrect === true ? 'bg-green-50' : isCorrect === false ? 'bg-red-50' : 'bg-gray-50'
  const icon = isCorrect === true ? '✓' : isCorrect === false ? '✗' : '○'
  const iconColor =
    isCorrect === true ? 'text-green-600' : isCorrect === false ? 'text-red-500' : 'text-gray-400'

  return (
    <div className={`rounded-xl border-2 ${borderColor} overflow-hidden`}>
      <div className={`flex items-start gap-3 p-4 ${headerBg}`}>
        <span className={`mt-0.5 shrink-0 text-lg font-bold ${iconColor}`}>{icon}</span>
        <div className="flex-1 text-sm text-gray-900">
          <span className="mr-2 font-semibold text-gray-500">Q{index + 1}.</span>
          <RichContent content={question.text} />
        </div>
      </div>

      <div className="p-4 text-sm">
        {isSort ? (
          <div className="space-y-1">
            <p className="mb-2 font-medium text-gray-600">Your order:</p>
            {(answer?.selected_choice_ids ?? []).map((id, idx) => {
              const choice = shuffled_choices.find((c) => c.id === id)
              const positionCorrect = correctOrder[idx]?.id === id
              if (!choice) return null
              return (
                <div
                  key={id}
                  className={`flex items-start gap-2 rounded-lg px-3 py-2 ${
                    positionCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">{positionCorrect ? '✓' : '✗'}</span>
                  <span>
                    {idx + 1}. <RichContent content={choice.text} />
                    {!positionCorrect && correctOrder[idx] && (
                      <span className="ml-1 text-xs opacity-75">
                        (correct: {correctOrder[idx].text})
                      </span>
                    )}
                  </span>
                </div>
              )
            })}
            {isCorrect === false && (
              <div className="mt-3">
                <p className="mb-2 font-medium text-gray-600">Correct order:</p>
                {correctOrder.map((choice, idx) => (
                  <div
                    key={choice.id}
                    className="flex items-start gap-2 rounded-lg px-3 py-2 bg-green-50 text-green-800"
                  >
                    <span className="mt-0.5 shrink-0">✓</span>
                    <span>
                      {idx + 1}. <RichContent content={choice.text} />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : isOpen ? (
          <div>
            <p className="mb-1 font-medium text-gray-600">Your answer:</p>
            <p className="text-gray-800">
              {answer?.text_response || <em className="text-gray-400">No answer provided</em>}
            </p>
          </div>
        ) : isText ? (
          <div className="space-y-2">
            <div>
              <p className="mb-1 font-medium text-gray-600">Your answer:</p>
              <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                {answer?.text_response || <em className="text-gray-400">No answer provided</em>}
                {isCorrect === true && <span className="ml-2 text-green-600">✓</span>}
                {isCorrect === false && <span className="ml-2 text-red-500">✗</span>}
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-600">Expected answer:</p>
              <p className="text-gray-700">
                {shuffled_choices
                  .filter((c) => c.is_correct)
                  .map((c) => c.text)
                  .join(' / ')}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            {shuffled_choices.map((choice) => {
              const wasSelected = answer?.selected_choice_ids.includes(choice.id) ?? false
              const isCorrectChoice = choice.is_correct

              let rowClass = 'flex items-start gap-2 rounded-lg px-3 py-2'
              if (isCorrectChoice) rowClass += ' bg-green-50 text-green-800'
              else if (wasSelected && !isCorrectChoice) rowClass += ' bg-red-50 text-red-800'
              else rowClass += ' text-gray-600'

              return (
                <div key={choice.id} className={rowClass}>
                  <span className="mt-0.5 shrink-0">
                    {isCorrectChoice ? '✓' : wasSelected ? '✗' : '○'}
                  </span>
                  <RichContent content={choice.text} />
                </div>
              )
            })}
          </div>
        )}

        {question.explanation && (
          <div className="mt-3 border-t border-gray-100 pt-3">
            <p className="mb-1 font-medium text-gray-600">Explanation:</p>
            <div className="text-gray-700">
              <RichContent content={question.explanation} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
