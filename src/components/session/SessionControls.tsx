interface SessionControlsProps {
  answered: boolean
  isLast: boolean
  hasSelection: boolean
  isTextType: boolean
  onConfirm: () => void
  onNext: () => void
}

export function SessionControls({
  answered,
  isLast,
  hasSelection,
  isTextType,
  onConfirm,
  onNext,
}: SessionControlsProps) {
  if (answered) {
    return (
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="rounded-xl bg-amber-600 px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          {isLast ? 'Finish quiz →' : 'Next question →'}
        </button>
      </div>
    )
  }

  const canConfirm = isTextType || hasSelection

  return (
    <div className="flex justify-end">
      <button
        onClick={onConfirm}
        disabled={!canConfirm}
        className="rounded-xl bg-amber-600 px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Confirm answer
      </button>
    </div>
  )
}
