import { Suspense, lazy } from 'react'
import { theme as antdTheme } from '@insightst-design/ui'
import PageLoading from '../components/PageLoading'

const ThemeProviderPlayground = lazy(() => import('../sections/ThemeProviderPlayground'))

export default function ThemePage() {
  const { token } = antdTheme.useToken()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>主题</h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Theme · ThemeProvider 封装 Ant Design 主题与语言切换
        </p>
      </div>

      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 4, height: 20, borderRadius: 9999, background: '#5264E0' }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: token.colorText }}>主题</span>
          <span style={{ fontSize: 13, color: token.colorTextTertiary }}>ThemeProvider</span>
        </div>
        <div
          className="rounded-lg p-6"
          style={{ background: 'var(--ds-bg-card)', borderRadius: 8, padding: 24 }}
        >
          <Suspense fallback={<PageLoading />}>
            <ThemeProviderPlayground />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
