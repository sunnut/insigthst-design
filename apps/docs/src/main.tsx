import { StrictMode, useState, useCallback, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ThemeProvider, type ThemeMode } from '@insightst-design/theme'
import { BreadcrumbProvider } from '@insightst-design/hooks'
import { App as AntdApp } from '@insightst-design/ui'
import { ThemeContext } from './theme'
import '@insightst-design/theme/tokens.css'
import './index.css'
import App from './App.tsx'

const STORAGE_KEY = 'kimi-theme'

function Root() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'dark'
    }
    return 'dark'
  })

  const toggle = useCallback(() => {
    setMode((m) => (m === 'dark' ? 'light' : 'dark'))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider mode={mode} syncDocumentTheme={true}>
        <BreadcrumbProvider>
          <AntdApp>
            <App />
          </AntdApp>
        </BreadcrumbProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>,
)

