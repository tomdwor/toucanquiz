import { v4 as uuidv4 } from 'uuid'
import type { Quiz } from '../types/quiz'
import type { QuizSession } from '../types/session'
import { shuffle } from './shuffle'

export function buildSession(quiz: Quiz): QuizSession {
  // Select and shuffle questions
  const shuffled = shuffle(quiz.questions)
  const limit =
    quiz.question_limit && quiz.question_limit > 0 && quiz.question_limit < shuffled.length
      ? quiz.question_limit
      : shuffled.length

  const selected = shuffled.slice(0, limit)

  // Build session questions with shuffled choices
  const questions = selected.map((q) => ({
    question: q,
    // 'open' questions have no choices; 'text' keeps choices for exact-match evaluation
    shuffled_choices: q.type === 'open' ? [] : shuffle(q.choices),
  }))

  return {
    session_id: uuidv4(),
    quiz_id: quiz.id,
    quiz_name: quiz.name,
    mode: quiz.mode,
    pass_threshold: quiz.pass_threshold,
    questions,
    current_index: 0,
    answers: {},
    status: 'active',
    started_at: Date.now(),
    completed_at: null,
  }
}
