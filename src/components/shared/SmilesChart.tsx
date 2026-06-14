import { useEffect, useRef, useState } from 'react'

interface SmilesChartProps {
  source: string
}

export function SmilesChart({ source }: SmilesChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const SmilesDrawer = (await import('smiles-drawer')).default
        const drawer = new SmilesDrawer.Drawer({ width: 400, height: 300, bondThickness: 1.0 })
        SmilesDrawer.parse(
          source.trim(),
          (tree) => {
            if (!cancelled && canvasRef.current) {
              drawer.draw(tree, canvasRef.current, 'light', false)
            }
          },
          (msg) => {
            if (!cancelled) setError(msg)
          }
        )
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to render structure')
        }
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [source])

  if (error) {
    return (
      <div className="my-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        <strong>Structure error:</strong> {error}
        <pre className="mt-2 text-xs opacity-75">{source}</pre>
      </div>
    )
  }

  return (
    <div className="my-4 flex justify-center rounded border border-gray-200 bg-white p-4">
      <canvas ref={canvasRef} />
    </div>
  )
}
