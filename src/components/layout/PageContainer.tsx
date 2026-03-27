import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 ${className}`}>
      {children}
    </div>
  )
}
