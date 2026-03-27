// djb2 hash → deterministic hue for a tag string
function tagHue(tag: string): number {
  let h = 5381
  for (let i = 0; i < tag.length; i++) {
    h = ((h << 5) + h) ^ tag.charCodeAt(i)
  }
  return ((h % 360) + 360) % 360
}

interface TagBadgeProps {
  tag: string
  active?: boolean
  onClick?: () => void
}

export function TagBadge({ tag, active = false, onClick }: TagBadgeProps) {
  const base = 'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors'
  const cursor = onClick ? 'cursor-pointer' : ''

  const style = active
    ? undefined
    : (() => {
        const hue = tagHue(tag)
        return {
          backgroundColor: `hsl(${hue}, 50%, 88%)`,
          color: `hsl(${hue}, 45%, 32%)`,
        }
      })()

  const activeClass = active ? 'bg-blue-600 text-white' : ''

  return (
    <span
      className={`${base} ${activeClass} ${cursor}`}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {tag}
    </span>
  )
}
