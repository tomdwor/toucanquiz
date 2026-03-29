import type { Choice } from '../../types/quiz'
import { RichContent } from '../shared/RichContent'

interface ChoiceOptionProps {
  choice: Choice
  index: number
  type: 'single_choice' | 'multiple_choice'
  selected: boolean
  isFocused: boolean
  disabled: boolean
  onToggle: () => void
}

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export function ChoiceOption({
  choice,
  index,
  type,
  selected,
  isFocused,
  disabled,
  onToggle,
}: ChoiceOptionProps) {
  const key = KEYS[index] ?? String(index + 1)

  const containerClass = [
    'flex items-start gap-3 rounded-xl border-2 p-4 transition-all',
    disabled ? 'cursor-default' : 'cursor-pointer',
    selected
      ? 'border-amber-500 bg-amber-50'
      : isFocused
        ? 'border-amber-300 bg-amber-50/50'
        : 'border-gray-200 bg-white hover:border-gray-300',
    isFocused && !selected ? 'ring-2 ring-amber-200 ring-offset-1' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={containerClass}
      onClick={disabled ? undefined : onToggle}
      role={type === 'single_choice' ? 'radio' : 'checkbox'}
      aria-checked={selected}
      tabIndex={-1}
    >
      {/* Key indicator */}
      <span
        className={[
          'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold',
          selected ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600',
        ].join(' ')}
      >
        {key}
      </span>

      {/* Choice indicator */}
      <span
        className={[
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center',
          type === 'single_choice' ? 'rounded-full border-2' : 'rounded border-2',
          selected ? 'border-amber-500 bg-amber-500' : 'border-gray-300',
        ].join(' ')}
      >
        {selected && (
          <span className="block rounded-full bg-white" style={type === 'single_choice' ? { width: 8, height: 8 } : {}}>
            {type === 'multiple_choice' && (
              <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="currentColor">
                <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        )}
      </span>

      <div className="flex-1 text-sm text-gray-800">
        <RichContent content={choice.text} />
      </div>
    </div>
  )
}
