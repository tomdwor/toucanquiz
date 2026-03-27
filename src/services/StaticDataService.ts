import type { IDataService } from './DataService'
import type { Quiz, QuizSummary } from '../types/quiz'
import type { QuizSession } from '../types/session'
import type { ExamResult } from '../types/api'

interface IndexJson {
  quizzes: QuizSummary[]
}

export class StaticDataService implements IDataService {
  async listQuizzes(): Promise<QuizSummary[]> {
    const res = await fetch('/data/index.json')
    if (!res.ok) {
      throw new Error(
        `Failed to load quiz index. Make sure you have a /data/index.json file. ` +
          `(Tip: copy the data_example/ folder to data/)`
      )
    }
    const data = (await res.json()) as IndexJson
    return data.quizzes
  }

  async getQuiz(quizId: string): Promise<Quiz> {
    const res = await fetch(`/data/${quizId}.json`)
    if (!res.ok) {
      throw new Error(`Quiz not found: ${quizId}`)
    }
    return (await res.json()) as Quiz
  }

  submitExamSession(_session: QuizSession): Promise<ExamResult> {
    return Promise.reject(
      new Error('Exam mode requires API backend. Set mode to "api" in config.json.')
    )
  }
}
