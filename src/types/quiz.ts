export type QuestionType = 'open' | 'text' | 'single_choice' | 'multiple_choice'
export type QuizMode = 'practice' | 'exam'

export interface Choice {
  id: string
  text: string
  is_correct: boolean
}

export interface Question {
  id: string
  text: string
  type: QuestionType
  choices: Choice[]
  explanation: string
  tags: string[]
}

export interface Quiz {
  id: string
  name: string
  description: string
  tags: string[]
  mode: QuizMode
  pass_threshold: number
  question_limit: number | null
  questions: Question[]
  created_at: string
  modified_at: string | null
  language: string
}

export interface QuizSummary {
  id: string
  name: string
  description: string
  tags: string[]
  mode: QuizMode
  pass_threshold: number
  question_limit: number | null
  question_count: number
  created_at: string
  modified_at: string | null
  language: string
}
