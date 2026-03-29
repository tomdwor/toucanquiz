import { TagBadge } from '../shared/TagBadge'
import { langName } from '../../utils/langName'

interface QuizFilterProps {
  nameQuery: string
  onNameChange: (v: string) => void
  allTags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  allLanguages: string[]
  selectedLanguages: string[]
  onLanguageToggle: (lang: string) => void
}

export function QuizFilter({
  nameQuery,
  onNameChange,
  allTags,
  selectedTags,
  onTagToggle,
  allLanguages,
  selectedLanguages,
  onLanguageToggle,
}: QuizFilterProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600">
        Filter
      </h2>

      <div className="space-y-4">
        {/* Name search */}
        <div>
          <label htmlFor="quiz-name-filter" className="mb-1 block text-sm font-bold text-amber-700">
            Name
          </label>
          <input
            id="quiz-name-filter"
            type="text"
            value={nameQuery}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Search quizzes..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div>

            <p className="mb-1.5 text-sm font-bold text-amber-700">Tags</p>
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

        {/* Language */}
        {allLanguages.length > 0 && (
          <div>

            <p className="mb-1.5 text-sm font-bold text-amber-700">Language</p>
            <div className="flex flex-wrap gap-1.5">
              {allLanguages.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onLanguageToggle(code)}
                  className={`rounded px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    selectedLanguages.includes(code)
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {langName(code)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
