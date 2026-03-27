import { useRef, useEffect } from 'react'
import type { SessionQuestion } from '../../types/session'
import { RichContent } from '../shared/RichContent'
import { ChoiceOption } from './ChoiceOption'

interface QuestionCardProps {
  sessionQuestion: SessionQuestion
  selectedChoiceIds: string[]
  textResponse: string
  focusedChoiceIndex: number
  usingKeyboard: boolean
  answered: boolean
  onChoiceToggle: (choiceId: string) => void
  onTextChange: (text: string) => void
}

export function QuestionCard({
  sessionQuestion,
  selectedChoiceIds,
  textResponse,
  focusedChoiceIndex,
  usingKeyboard,
  answered,
  onChoiceToggle,
  onTextChange,
}: QuestionCardProps) {
  const { question, shuffled_choices } = sessionQuestion
  const isOpen = question.type === 'open'
  const isText = question.type === 'text'
  const isFreeResponse = isOpen || isText

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus when this question is shown (key-based remount handles this)
  useEffect(() => {
    if (isOpen) textareaRef.current?.focus()
    else if (isText) inputRef.current?.focus()
  }, [isOpen, isText])

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 text-base text-gray-900">
        <RichContent content={question.text} />
      </div>

      {isOpen ? (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Your answer
          </label>
          <textarea
            ref={textareaRef}
            value={textResponse}
            onChange={(e) => onTextChange(e.target.value)}
            disabled={answered}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Type your answer here..."
          />
        </div>
      ) : isText ? (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Your answer
          </label>
          <input
            ref={inputRef}
            type="text"
            value={textResponse}
            onChange={(e) => onTextChange(e.target.value)}
            disabled={answered}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Type your answer here..."
          />
        </div>
      ) : (
        <div
          role={question.type === 'single_choice' ? 'radiogroup' : 'group'}
          className="space-y-2"
        >
          {question.type === 'multiple_choice' && (
            <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Select all that apply
            </p>
          )}
          {shuffled_choices.map((choice, idx) => (
            <ChoiceOption
              key={choice.id}
              choice={choice}
              index={idx}
              type={question.type as 'single_choice' | 'multiple_choice'}
              selected={selectedChoiceIds.includes(choice.id)}
              isFocused={usingKeyboard && idx === focusedChoiceIndex}
              disabled={answered}
              onToggle={() => onChoiceToggle(choice.id)}
            />
          ))}
        </div>
      )}

      {isFreeResponse && answered && (
        <p className="mt-2 text-xs text-gray-400">
          Keyboard: Enter to continue
        </p>
      )}
    </div>
  )
}
