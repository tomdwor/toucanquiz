import { Link } from 'react-router-dom'
import { PageContainer } from '../components/layout/PageContainer'

export function NotFoundPage() {
  return (
    <PageContainer className="max-w-lg text-center">
      <div className="py-16">
        <div className="mb-4 text-6xl font-bold text-gray-200">404</div>
        <h1 className="mb-2 text-xl font-semibold text-gray-800">Page not found</h1>
        <p className="mb-6 text-gray-500">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Go home
        </Link>
      </div>
    </PageContainer>
  )
}
