import { useState } from 'react'
import { Button, Breadcrumb } from '@insightst-design/ui'
import { Sun, Moon } from 'lucide-react'
import { ThemeProvider as AntdThemeProvider } from '@insightst-design/theme'
import type { ThemeMode } from '@insightst-design/theme'
import CodeBlock from './CodeBlock'
import { PlaygroundRoot, PlaygroundHeader, PlaygroundSection } from './playgroundLayout'

function buildCode(mode: ThemeMode) {
  return `import { Breadcrumb } from '@insightst-design/ui'
import { ThemeProvider } from '@insightst-design/theme'
import '@insightst-design/theme/tokens.css'

<ThemeProvider mode="${mode}">
  <Breadcrumb
    items={[
      { title: '首页' },
      { title: '组件库' },
      { title: '主题沙箱' },
    ]}
  />
</ThemeProvider>`
}

export default function ThemeProviderPlayground() {
  const [localMode, setLocalMode] = useState<ThemeMode>('dark')
  const isDark = localMode === 'dark'

  const toggle = () => setLocalMode(isDark ? 'light' : 'dark')

  const code = buildCode(localMode)

  return (
    <PlaygroundRoot>
      <PlaygroundHeader
        hint="在沙箱中独立切换主题，不影响全局页面"
        trailing={
          <Button
            size="small"
            icon={isDark ? <Sun size={14} /> : <Moon size={14} />}
            onClick={toggle}
          >
            {isDark ? '切换亮色' : '切换暗色'}
          </Button>
        }
      />

      <PlaygroundSection title="主题预览" titleEn="Preview">
        <AntdThemeProvider mode={localMode} syncDocumentTheme={false}>
          <div
            style={{
              padding: 24,
              borderRadius: 8,
              background: isDark ? '#141414' : '#ffffff',
              border: `1px solid ${isDark ? '#303030' : '#e8e8e8'}`,
            }}
          >
            <Breadcrumb
              items={[
                { title: '首页' },
                { title: '组件库' },
                { title: '主题沙箱' },
              ]}
            />
          </div>
        </AntdThemeProvider>
      </PlaygroundSection>

      <CodeBlock darkCode={code} lightCode={code} />
    </PlaygroundRoot>
  )
}

