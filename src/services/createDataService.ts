import type { AppConfig } from '../config/types'
import type { IDataService } from './DataService'
import { StaticDataService } from './StaticDataService'
import { ApiDataService } from './ApiDataService'

export function createDataService(config: AppConfig): IDataService {
  if (config.mode === 'api') {
    if (!config.backend_url) {
      throw new Error('backend_url is required for API mode')
    }
    return new ApiDataService(config.backend_url, config.signin_page_url)
  }
  return new StaticDataService()
}
