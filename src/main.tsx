import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { App } from './App'
import { loadConfig } from './config/loader'
import { createDataService } from './services/createDataService'
import { ConfigContext } from './context/ConfigContext'
import { ServiceContext } from './context/ServiceContext'
import { SessionProvider } from './context/SessionContext'

async function bootstrap() {
  const config = await loadConfig()
  const service = createDataService(config)

  const root = document.getElementById('root')!
  createRoot(root).render(
    <StrictMode>
      <ConfigContext.Provider value={config}>
        <ServiceContext.Provider value={service}>
          <SessionProvider>
            <App />
          </SessionProvider>
        </ServiceContext.Provider>
      </ConfigContext.Provider>
    </StrictMode>
  )
}

bootstrap().catch((err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err)
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;">
      <div style="text-align:center;padding:2rem;max-width:480px;">
        <h1 style="color:#dc2626;font-size:1.5rem;font-weight:700;margin-bottom:0.5rem;">
          Failed to start ToucanQuiz
        </h1>
        <p style="color:#6b7280;font-size:0.9rem;">${msg}</p>
      </div>
    </div>
  `
})
