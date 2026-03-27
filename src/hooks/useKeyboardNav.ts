import { useEffect, useCallback } from 'react'

export type InputMode = 'keyboard' | 'mouse'

interface UseKeyboardNavOptions {
  choiceCount: number
  focusedIndex: number
  setFocusedIndex: (index: number) => void
  onSelect: (index: number) => void
  onConfirm: () => void
  onInputModeChange: (mode: InputMode) => void
  disabled?: boolean
}

export function useKeyboardNav({
  choiceCount,
  focusedIndex,
  setFocusedIndex,
  onSelect,
  onConfirm,
  onInputModeChange,
  disabled = false,
}: UseKeyboardNavOptions) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return

      // Don't intercept when user is typing in a textarea/input
      const target = e.target as HTMLElement
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') return

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault()
          onInputModeChange('keyboard')
          setFocusedIndex((focusedIndex + 1) % choiceCount)
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault()
          onInputModeChange('keyboard')
          setFocusedIndex((focusedIndex - 1 + choiceCount) % choiceCount)
          break
        case ' ':
          e.preventDefault()
          if (choiceCount > 0) {
            onInputModeChange('keyboard')
            onSelect(focusedIndex)
          }
          break
        case 'Enter':
          e.preventDefault()
          onConfirm()
          break
      }
    },
    [disabled, focusedIndex, choiceCount, setFocusedIndex, onSelect, onConfirm, onInputModeChange]
  )

  const handleMouseDown = useCallback(() => {
    onInputModeChange('mouse')
  }, [onInputModeChange])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    window.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [handleKey, handleMouseDown])
}
