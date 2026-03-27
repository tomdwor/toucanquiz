import { useEffect, useId, useRef, useState } from 'react'

interface MermaidChartProps {
  source: string
}

export function MermaidChart({ source }: MermaidChartProps) {
  const id = useId().replace(/:/g, '-')
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({ startOnLoad: false, theme: 'neutral' })

        const { svg } = await mermaid.render(`mermaid-${id}`, source)
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram')
        }
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [id, source])

  if (error) {
    return (
      <div className="my-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        <strong>Diagram error:</strong> {error}
        <pre className="mt-2 text-xs opacity-75">{source}</pre>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="my-4 overflow-x-auto rounded border border-gray-200 bg-gray-50 p-4 [&_svg]:mx-auto [&_svg]:max-w-full"
    />
  )
}
