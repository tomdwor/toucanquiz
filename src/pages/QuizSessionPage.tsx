import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSession } from '../context/SessionContext'
import { useDataService } from '../context/ServiceContext'
import { useKeyboardNav, type InputMode } from '../hooks/useKeyboardNav'
import type { SessionAnswer } from '../types/session'
import { PageContainer } from '../components/layout/PageContainer'
import { ProgressBar } from '../components/session/ProgressBar'
import { QuestionCard } from '../components/session/QuestionCard'
import { ExplanationPanel } from '../components/session/ExplanationPanel'
import { SessionControls } from '../components/session/SessionControls'

export function QuizSessionPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const { session, dispatch } = useSession()
  const service = useDataService()

  const [selectedChoiceIds, setSelectedChoiceIds] = useState<string[]>([])
  const [textResponse, setTextResponse] = useState('')
  const [answered, setAnswered] = useState(false)
  const [focusedChoiceIndex, setFocusedChoiceIndex] = useState(0)
  const [usingKeyboard, setUsingKeyboard] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showEscapeConfirm, setShowEscapeConfirm] = useState(false)

  // Redirect if no active session for this quiz
  useEffect(() => {
    if (!session || session.quiz_id !== quizId || session.status !== 'active') {
      navigate(`/quiz/${quizId}`, { replace: true })
    }
  }, [session, quizId, navigate])

  // Reset local state on question change
  useEffect(() => {
    setSelectedChoiceIds([])
    setTextResponse('')
    setAnswered(false)
    setFocusedChoiceIndex(0)
    setUsingKeyboard(false)
  }, [session?.current_index])

  // Escape key to open quit confirmation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const target = e.target as HTMLElement
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
        // Blur the input instead of opening the dialog
        target.blur()
        return
      }
      setShowEscapeConfirm(true)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (!session || session.quiz_id !== quizId || session.status !== 'active') {
    return null
  }

  const currentSQ = session.questions[session.current_index]
  const question = currentSQ.question
  const isOpen = question.type === 'open'
  const isText = question.type === 'text'
  const isFreeResponse = isOpen || isText
  const isLast = session.current_index === session.questions.length - 1
  const isPractice = session.mode === 'practice'

  const toggleChoice = (choiceId: string) => {
    if (question.type === 'single_choice') {
      setSelectedChoiceIds([choiceId])
    } else {
      setSelectedChoiceIds((prev) =>
        prev.includes(choiceId) ? prev.filter((id) => id !== choiceId) : [...prev, choiceId]
      )
    }
  }

  const handleConfirm = useCallback(() => {
    if (answered) {
      // "Next" action
      handleNext()
      return
    }

    if (!isFreeResponse && selectedChoiceIds.length === 0) return
    if (isFreeResponse && !textResponse.trim()) return

    // Evaluate correctness
    let isCorrect: boolean | null = null
    if (isText) {
      // Exact match (case-insensitive) against any choice marked is_correct
      const normalized = textResponse.trim().toLowerCase()
      isCorrect = currentSQ.shuffled_choices.some(
        (c) => c.is_correct && c.text.trim().toLowerCase() === normalized
      )
    } else if (!isFreeResponse && currentSQ.shuffled_choices.length > 0) {
      const correctIds = new Set(
        currentSQ.shuffled_choices.filter((c) => c.is_correct).map((c) => c.id)
      )
      const selectedSet = new Set(selectedChoiceIds)
      isCorrect =
        correctIds.size === selectedSet.size &&
        [...correctIds].every((id) => selectedSet.has(id))
    }

    const answer: SessionAnswer = {
      question_id: question.id,
      selected_choice_ids: selectedChoiceIds,
      text_response: textResponse,
      is_correct: isCorrect,
      answered_at: Date.now(),
    }

    dispatch({ type: 'SUBMIT_ANSWER', payload: { question_id: question.id, answer } })

    if (isPractice) {
      setAnswered(true)
    } else {
      // Exam mode: advance directly
      handleNext()
    }
  }, [answered, isText, selectedChoiceIds, textResponse, question, currentSQ, dispatch, isPractice]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleNext = useCallback(() => {
    if (isLast) {
      dispatch({ type: 'COMPLETE_SESSION' })

      if (session.mode === 'exam') {
        setSubmitting(true)
        service
          .submitExamSession({ ...session, status: 'reviewing', completed_at: Date.now() })
          .then(() => navigate(`/quiz/${quizId}/submitted`))
          .catch(() => navigate(`/quiz/${quizId}/submitted`))
          .finally(() => setSubmitting(false))
      } else {
        navigate(`/quiz/${quizId}/review`)
      }
    } else {
      dispatch({ type: 'NEXT_QUESTION' })
    }
  }, [isLast, session, dispatch, service, navigate, quizId])

  const handleKeyboardSelect = useCallback(
    (index: number) => {
      if (answered) return
      const choice = currentSQ.shuffled_choices[index]
      if (choice) toggleChoice(choice.id)
    },
    [answered, currentSQ, selectedChoiceIds, question.type] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const handleKeyboardConfirm = useCallback(() => {
    handleConfirm()
  }, [handleConfirm])

  const handleInputModeChange = useCallback((mode: InputMode) => {
    setUsingKeyboard(mode === 'keyboard')
  }, [])

  useKeyboardNav({
    choiceCount: isFreeResponse ? 0 : currentSQ.shuffled_choices.length,
    focusedIndex: focusedChoiceIndex,
    setFocusedIndex: setFocusedChoiceIndex,
    onSelect: handleKeyboardSelect,
    onConfirm: handleKeyboardConfirm,
    onInputModeChange: handleInputModeChange,
    disabled: isFreeResponse,
  })

  const handleQuit = () => {
    dispatch({ type: 'RESET_SESSION' })
    navigate(`/quiz/${quizId}`)
  }

  if (submitting) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center gap-4 py-24">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          <p className="text-gray-600">Submitting your answers...</p>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer className="max-w-2xl">
      {/* Escape / quit confirmation dialog */}
      {showEscapeConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">Quit quiz?</h2>
            <p className="mb-5 text-sm text-gray-600">Your progress will be lost.</p>
            <div className="flex gap-3">
              <button
                onClick={handleQuit}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Quit
              </button>
              <button
                onClick={() => setShowEscapeConfirm(false)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Continue quiz
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-2 flex items-center justify-between">
        <div className="flex-1">
          <ProgressBar
            current={session.current_index + 1}
            total={session.questions.length}
          />
        </div>
        <button
          onClick={() => setShowEscapeConfirm(true)}
          className="ml-4 mb-6 rounded-lg px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
          title="Quit quiz (Esc)"
        >
          ✕ Quit
        </button>
      </div>

      <div className="space-y-4">
        <QuestionCard
          sessionQuestion={currentSQ}
          selectedChoiceIds={selectedChoiceIds}
          textResponse={textResponse}
          focusedChoiceIndex={focusedChoiceIndex}
          usingKeyboard={usingKeyboard}
          answered={answered}
          onChoiceToggle={toggleChoice}
          onTextChange={setTextResponse}
        />

        {answered && isPractice && (
          <ExplanationPanel
            sessionQuestion={currentSQ}
            selectedChoiceIds={selectedChoiceIds}
            isCorrect={session.answers[question.id]?.is_correct ?? null}
          />
        )}

        <SessionControls
          answered={answered}
          isLast={isLast}
          hasSelection={selectedChoiceIds.length > 0}
          isTextType={isFreeResponse}
          onConfirm={handleConfirm}
          onNext={handleNext}
        />

        {!isFreeResponse && (
          <p className="text-center text-xs text-gray-400">
            Keyboard: ↑↓ navigate · Space select · Enter confirm/next · Esc quit
          </p>
        )}
      </div>
    </PageContainer>
  )
}
