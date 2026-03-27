import type { Choice, Question, QuizMode } from './quiz'

export type SessionStatus = 'idle' | 'active' | 'reviewing'

export interface SessionAnswer {
  question_id: string
  selected_choice_ids: string[]
  text_response: string
  is_correct: boolean | null
  answered_at: number
}

export interface SessionQuestion {
  question: Question
  shuffled_choices: Choice[]
}

export interface QuizSession {
  session_id: string
  quiz_id: string
  quiz_name: string
  mode: QuizMode
  pass_threshold: number
  questions: SessionQuestion[]
  current_index: number
  answers: Record<string, SessionAnswer>
  status: SessionStatus
  started_at: number
  completed_at: number | null
}
