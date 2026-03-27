import { TagBadge } from '../shared/TagBadge'

interface QuizFilterProps {
  nameQuery: string
  onNameChange: (v: string) => void
  allTags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  minThreshold: string
  onMinThresholdChange: (v: string) => void
  maxThreshold: string
  onMaxThresholdChange: (v: string) => void
}

export function QuizFilter({
  nameQuery,
  onNameChange,
  allTags,
  selectedTags,
  onTagToggle,
  minThreshold,
  onMinThresholdChange,
  maxThreshold,
  onMaxThresholdChange,
}: QuizFilterProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Filter
      </h2>

      <div className="space-y-4">
        {/* Name search */}
        <div>
          <label htmlFor="quiz-name-filter" className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="quiz-name-filter"
            type="text"
            value={nameQuery}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Search quizzes..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div>
            <p className="mb-1.5 text-sm font-medium text-gray-700">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map((tag) => (
                <TagBadge
                  key={tag}
                  tag={tag}
                  active={selectedTags.includes(tag)}
                  onClick={() => onTagToggle(tag)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pass threshold range */}
        <div>
          <p className="mb-1.5 text-sm font-medium text-gray-700">Pass threshold (%)</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={100}
              value={minThreshold}
              onChange={(e) => onMinThresholdChange(e.target.value)}
              placeholder="Min"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="shrink-0 text-gray-400">–</span>
            <input
              type="number"
              min={0}
              max={100}
              value={maxThreshold}
              onChange={(e) => onMaxThresholdChange(e.target.value)}
              placeholder="Max"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
