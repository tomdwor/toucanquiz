export interface ExamResult {
  session_id: string
  score: number
  passed: boolean
  submitted_at: string
}

export interface ApiError {
  status: number
  message: string
}
