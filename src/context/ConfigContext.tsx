import { createContext, useContext } from 'react'
import type { AppConfig } from '../config/types'

export const ConfigContext = createContext<AppConfig | null>(null)

export function useConfig(): AppConfig {
  const ctx = useContext(ConfigContext)
  if (!ctx) throw new Error('useConfig must be used within ConfigContext.Provider')
  return ctx
}
