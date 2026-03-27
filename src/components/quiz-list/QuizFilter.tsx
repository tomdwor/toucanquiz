import { TagBadge } from '../shared/TagBadge'

interface QuizFilterProps {
  nameQuery: string
  onNameChange: (v: string) => void
  allTags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

export function QuizFilter({
  nameQuery,
  onNameChange,
  allTags,
  selectedTags,
  onTagToggle,
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
      </div>
    </div>
  )
}
