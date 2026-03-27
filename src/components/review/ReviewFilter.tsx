export type ReviewFilterType = 'all' | 'correct' | 'incorrect' | 'neutral'

interface ReviewFilterProps {
  active: ReviewFilterType
  onChange: (f: ReviewFilterType) => void
  counts: { all: number; correct: number; incorrect: number; neutral: number }
}

export function ReviewFilter({ active, onChange, counts }: ReviewFilterProps) {
  const tabs: { key: ReviewFilterType; label: string }[] = [
    { key: 'all', label: `All (${counts.all})` },
    { key: 'correct', label: `Correct (${counts.correct})` },
    { key: 'incorrect', label: `Incorrect (${counts.incorrect})` },
    ...(counts.neutral > 0
      ? [{ key: 'neutral' as ReviewFilterType, label: `Neutral (${counts.neutral})` }]
      : []),
  ]

  return (
    <div className="flex rounded-lg border border-gray-200 bg-gray-100 p-1 text-sm">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={[
            'flex-1 rounded-md px-3 py-1.5 font-medium transition-colors',
            active === key
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700',
          ].join(' ')}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
