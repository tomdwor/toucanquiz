import type { IDataService } from './DataService'
import type { Quiz, QuizSummary } from '../types/quiz'
import type { QuizSession, SessionAnswer } from '../types/session'
import type { ExamResult } from '../types/api'

export class ApiDataService implements IDataService {
  private readonly baseUrl: string
  private readonly signinPageUrl: string | undefined

  constructor(backendUrl: string, signinPageUrl?: string) {
    this.baseUrl = backendUrl.replace(/\/$/, '') + '/api/v1'
    this.signinPageUrl = signinPageUrl
  }

  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
    })

    if (res.status === 401) {
      const returnUrl = encodeURIComponent(window.location.href)
      const target = this.signinPageUrl
        ? `${this.signinPageUrl}?returnUrl=${returnUrl}`
        : `/signin?returnUrl=${returnUrl}`
      window.location.href = target
      // Return a never-resolving promise since we're redirecting
      return new Promise<never>(() => undefined)
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`API error ${res.status}: ${text || res.statusText}`)
    }

    return res.json() as Promise<T>
  }

  listQuizzes(): Promise<QuizSummary[]> {
    return this.request<QuizSummary[]>('/quizzes')
  }

  getQuiz(quizId: string): Promise<Quiz> {
    return this.request<Quiz>(`/quizzes/${quizId}`)
  }

  async submitExamSession(session: QuizSession): Promise<ExamResult> {
    const answers: SessionAnswer[] = Object.values(session.answers)
    return this.request<ExamResult>(`/sessions/${session.session_id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    })
  }
}
