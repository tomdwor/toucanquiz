import { Link } from 'react-router-dom'
import { PageContainer } from '../components/layout/PageContainer'

export function ExamSubmittedPage() {
  return (
    <PageContainer className="max-w-lg text-center">
      <div className="rounded-xl border border-green-200 bg-green-50 p-10">
        <div className="mb-4 text-5xl">✓</div>
        <h1 className="mb-2 text-2xl font-bold text-green-800">Answers submitted</h1>
        <p className="mb-6 text-green-700">
          Your exam answers have been submitted successfully.
        </p>
        <Link
          to="/"
          className="inline-block rounded-xl bg-amber-600 px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Back to quizzes
        </Link>
      </div>
    </PageContainer>
  )
}
