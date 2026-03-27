import type { AppConfig } from './types'

export async function loadConfig(): Promise<AppConfig> {
  const res = await fetch('/config.json')
  if (!res.ok) {
    console.warn('Could not load /config.json, defaulting to static mode')
    return { mode: 'static' }
  }
  const config = (await res.json()) as AppConfig
  if (!config.mode) {
    throw new Error('config.json must include a "mode" field ("static" or "api")')
  }
  if (config.mode === 'api' && !config.backend_url) {
    throw new Error('config.json: "backend_url" is required when mode is "api"')
  }
  return config
}
