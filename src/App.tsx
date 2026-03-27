import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'
import { QuizDetailPage } from './pages/QuizDetailPage'
import { QuizSessionPage } from './pages/QuizSessionPage'
import { ReviewPage } from './pages/ReviewPage'
import { ExamSubmittedPage } from './pages/ExamSubmittedPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/:quizId" element={<QuizDetailPage />} />
          <Route path="/quiz/:quizId/session" element={<QuizSessionPage />} />
          <Route path="/quiz/:quizId/review" element={<ReviewPage />} />
          <Route path="/quiz/:quizId/submitted" element={<ExamSubmittedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
