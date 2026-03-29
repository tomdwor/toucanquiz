import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="bg-stone-900">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-amber-400 hover:text-amber-300">
            <img src="/logo.png" alt="" className="h-10 w-10 object-contain" />
            <span>Toucan Quiz</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-stone-900 py-4 text-center text-sm text-stone-500">
        Toucan Quiz
      </footer>
    </div>
  )
}
