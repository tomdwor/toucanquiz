import { useEffect, useMemo, useState } from 'react'
import type { QuizSummary } from '../types/quiz'
import { useDataService } from '../context/ServiceContext'
import { useConfig } from '../context/ConfigContext'
import { PageContainer } from '../components/layout/PageContainer'
import { QuizList } from '../components/quiz-list/QuizList'
import { QuizFilter } from '../components/quiz-list/QuizFilter'
import { QuizSort, type SortDir, type SortField } from '../components/quiz-list/QuizSort'
import { Pagination } from '../components/quiz-list/Pagination'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import { ErrorMessage } from '../components/shared/ErrorMessage'

export function HomePage() {
  const service = useDataService()
  const config = useConfig()
  const perPage = config.quizzes_per_page ?? 10

  const [quizzes, setQuizzes] = useState<QuizSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter state
  const [nameQuery, setNameQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [minThreshold, setMinThreshold] = useState('')
  const [maxThreshold, setMaxThreshold] = useState('')

  // Sort state
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  // Pagination state
  const [page, setPage] = useState(1)

  const load = () => {
    setLoading(true)
    setError(null)
    service
      .listQuizzes()
      .then((data) => {
        setQuizzes(data)
        setLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load quizzes')
        setLoading(false)
      })
  }

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Collect all unique tags
  const allTags = useMemo(
    () => Array.from(new Set(quizzes.flatMap((q) => q.tags))).sort(),
    [quizzes]
  )

  // Filter + sort
  const filtered = useMemo(() => {
    let list = quizzes

    if (nameQuery.trim()) {
      const q = nameQuery.trim().toLowerCase()
      list = list.filter((quiz) => quiz.name.toLowerCase().includes(q))
    }

    if (selectedTags.length > 0) {
      list = list.filter((quiz) => selectedTags.every((t) => quiz.tags.includes(t)))
    }

    const min = minThreshold !== '' ? Number(minThreshold) : null
    const max = maxThreshold !== '' ? Number(maxThreshold) : null
    if (min !== null) list = list.filter((q) => q.pass_threshold >= min)
    if (max !== null) list = list.filter((q) => q.pass_threshold <= max)

    return [...list].sort((a, b) => {
      const cmp =
        sortField === 'name'
          ? a.name.localeCompare(b.name)
          : a.pass_threshold - b.pass_threshold
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [quizzes, nameQuery, selectedTags, minThreshold, maxThreshold, sortField, sortDir])

  // Reset to page 1 when filters/sort change
  useEffect(() => { setPage(1) }, [nameQuery, selectedTags, minThreshold, maxThreshold, sortField, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )

  return (
    <PageContainer>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">Quizzes</h1>

      {loading && <LoadingSpinner message="Loading quizzes..." />}
      {error && <ErrorMessage message={error} onRetry={load} />}

      {!loading && !error && (
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-64 lg:shrink-0">
            <QuizFilter
              nameQuery={nameQuery}
              onNameChange={setNameQuery}
              allTags={allTags}
              selectedTags={selectedTags}
              onTagToggle={toggleTag}
              minThreshold={minThreshold}
              onMinThresholdChange={setMinThreshold}
              maxThreshold={maxThreshold}
              onMaxThresholdChange={setMaxThreshold}
            />
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500">
                {filtered.length} quiz{filtered.length !== 1 ? 'zes' : ''}
              </p>
              <QuizSort
                sortField={sortField}
                sortDir={sortDir}
                onSortFieldChange={setSortField}
                onSortDirChange={setSortDir}
              />
            </div>
            <QuizList quizzes={paginated} />
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      )}
    </PageContainer>
  )
}
