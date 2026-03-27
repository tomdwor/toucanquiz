import type { QuizSession } from '../types/session'

export interface ScoreResult {
  total: number
  correct: number
  incorrect: number
  neutral: number
  unanswered: number
  percentage: number
  passed: boolean
}

export function calculateScore(session: QuizSession): ScoreResult {
  const total = session.questions.length
  let correct = 0
  let neutral = 0
  let unanswered = 0

  for (const sq of session.questions) {
    const answer = session.answers[sq.question.id]
    if (!answer) {
      unanswered++
      continue
    }
    if (answer.is_correct === true) correct++
    else if (answer.is_correct === null) neutral++
    // is_correct === false → counted in incorrect below
  }

  const incorrect = total - correct - neutral - unanswered
  // Score percentage is based on gradable questions only (excludes neutral/unanswered)
  const gradable = total - neutral
  const percentage = gradable === 0 ? 0 : Math.round((correct / gradable) * 100)
  const passed = percentage >= session.pass_threshold

  return { total, correct, incorrect, neutral, unanswered, percentage, passed }
}
