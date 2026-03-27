import type { Quiz, QuizSummary } from '../types/quiz'
import type { QuizSession } from '../types/session'
import type { ExamResult } from '../types/api'

export interface IDataService {
  listQuizzes(): Promise<QuizSummary[]>
  getQuiz(quizId: string): Promise<Quiz>
  submitExamSession(session: QuizSession): Promise<ExamResult>
}
