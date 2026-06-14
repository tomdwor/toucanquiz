import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Choice } from '../../types/quiz'
import { RichContent } from '../shared/RichContent'

interface SortableItemProps {
  choice: Choice
  index: number
  disabled: boolean
}

function GripIcon() {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="5" cy="5" r="1.6" />
      <circle cx="11" cy="5" r="1.6" />
      <circle cx="5" cy="10" r="1.6" />
      <circle cx="11" cy="10" r="1.6" />
      <circle cx="5" cy="15" r="1.6" />
      <circle cx="11" cy="15" r="1.6" />
    </svg>
  )
}

function SortableItem({ choice, index, disabled }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: choice.id, disabled })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-sm transition-shadow ${
        isDragging
          ? 'border-indigo-300 shadow-lg opacity-90'
          : 'border-gray-200'
      }`}
    >
      <span className="w-6 shrink-0 text-center text-sm font-semibold text-gray-400">
        {index + 1}
      </span>
      <div className="flex-1 text-sm text-gray-900">
        <RichContent content={choice.text} />
      </div>
      <button
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        disabled={disabled}
        aria-label="Drag to reorder"
        className={`shrink-0 rounded p-1.5 text-gray-400 transition-colors ${
          disabled
            ? 'cursor-not-allowed opacity-30'
            : 'cursor-grab touch-none hover:bg-gray-100 hover:text-gray-600 active:cursor-grabbing'
        }`}
        tabIndex={-1}
      >
        <GripIcon />
      </button>
    </li>
  )
}

interface SortableListProps {
  items: Choice[]
  disabled?: boolean
  onReorder: (newIds: string[]) => void
}

export function SortableList({ items, disabled = false, onReorder }: SortableListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((c) => c.id === active.id)
    const newIndex = items.findIndex((c) => c.id === over.id)
    const reordered = arrayMove(items, oldIndex, newIndex)
    onReorder(reordered.map((c) => c.id))
  }

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
          ⇅ Sort — graded
        </span>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          <ol className="space-y-2">
            {items.map((choice, idx) => (
              <SortableItem
                key={choice.id}
                choice={choice}
                index={idx}
                disabled={disabled}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
    </div>
  )
}
