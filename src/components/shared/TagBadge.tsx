import { tagHue } from '../../utils/tagColor'

interface TagBadgeProps {
  tag: string
  active?: boolean
  onClick?: () => void
}

export function TagBadge({ tag, active = false, onClick }: TagBadgeProps) {
  const base = 'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors'
  const cursor = onClick ? 'cursor-pointer' : ''

  const hue = tagHue(tag)
  const style = active
    ? { backgroundColor: `hsl(${hue}, 65%, 35%)`, color: 'white' }
    : { backgroundColor: `hsl(${hue}, 50%, 88%)`, color: `hsl(${hue}, 45%, 32%)` }

  return (
    <span
      className={`${base} ${cursor}`}
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
