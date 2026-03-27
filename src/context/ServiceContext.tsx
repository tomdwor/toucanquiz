import { createContext, useContext } from 'react'
import type { IDataService } from '../services/DataService'

export const ServiceContext = createContext<IDataService | null>(null)

export function useDataService(): IDataService {
  const ctx = useContext(ServiceContext)
  if (!ctx) throw new Error('useDataService must be used within ServiceContext.Provider')
  return ctx
}
