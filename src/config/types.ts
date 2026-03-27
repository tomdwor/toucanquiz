export type AppMode = 'static' | 'api'

export interface AppConfig {
  mode: AppMode
  backend_url?: string
  signin_page_url?: string
  quizzes_per_page?: number
}
