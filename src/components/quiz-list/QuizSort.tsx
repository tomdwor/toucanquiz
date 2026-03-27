export type SortField = 'name' | 'pass_threshold'
export type SortDir = 'asc' | 'desc'

interface QuizSortProps {
  sortField: SortField
  sortDir: SortDir
  onSortFieldChange: (f: SortField) => void
  onSortDirChange: (d: SortDir) => void
}

export function QuizSort({ sortField, sortDir, onSortFieldChange, onSortDirChange }: QuizSortProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-gray-600">Sort by:</span>
      <select
        value={sortField}
        onChange={(e) => onSortFieldChange(e.target.value as SortField)}
        className="rounded-lg border border-gray-300 px-2.5 py-1.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="name">Name</option>
        <option value="pass_threshold">Pass threshold</option>
      </select>
      <button
        onClick={() => onSortDirChange(sortDir === 'asc' ? 'desc' : 'asc')}
        className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Sort ${sortDir === 'asc' ? 'descending' : 'ascending'}`}
      >
        {sortDir === 'asc' ? '↑ Asc' : '↓ Desc'}
      </button>
    </div>
  )
}
