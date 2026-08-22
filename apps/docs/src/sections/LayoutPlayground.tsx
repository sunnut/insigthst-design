import { Layout } from '@insightst-design/ui'
import { useTheme } from '../theme'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundSection,
  buildThemeCode,
} from './playgroundLayout'
import styles from './LayoutPlayground.module.css'

function buildLayoutCode() {
  return `import { Layout } from '@insightst-design/ui'
import styles from './LayoutPlayground.module.css'

const breadcrumbItems = [
  { title: '首页' },
  { title: '功能模块' },
  { title: '当前页面' },
]

export function LayoutDemo() {
  return (
    <div style={{ height: 520, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--ds-border)' }}>
      <Layout
        className={styles.customLayoutDemo}
        platformName="项目xxx"
        logo="/icons/icon-logo.svg"
        items={breadcrumbItems}
        topRight={
          <div style={{ height: 36, display: 'flex', alignItems: 'center', gap: 4, padding: '0 10px', background: 'var(--ds-header-button-bg)', borderRadius: 224, cursor: 'pointer' }}>
            <img src="/icons/icon-user.svg" alt="用户" style={{ width: 16, height: 16 }} />
            <span style={{ color: 'var(--ds-text-inverse)', fontSize: 14, whiteSpace: 'nowrap' }}>
              xxx
            </span>
          </div>
        }
        sidebar={
          <div style={{ width: 200, height: '100%', background: 'var(--ds-bg-sidebar)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ds-text-secondary)' }}>
            导航菜单区域
          </div>
        }
      >
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ds-bg-card)', borderRadius: 8, border: '1px solid var(--ds-border)' }}>
          内容区域
        </div>
      </Layout>
    </div>
  )
}`
}

const breadcrumbItems = [
  { title: '首页' },
  { title: '功能模块' },
  { title: '当前页面' },
]

export default function LayoutPlayground() {
  const { mode } = useTheme()
  const { darkCode, lightCode } = buildThemeCode('整体布局 (Layout)', buildLayoutCode())

  return (
    <PlaygroundRoot>
      <PlaygroundHeader
        hint="交互范例 · 整体布局（Layout）"
      />

      <PlaygroundSection title="布局预览" titleEn="Layout Preview">
        <div style={{ height: 520, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--ds-border)' }}>
          <Layout
            className={styles.customLayoutDemo}
            platformName="项目xxx"
            logo={mode === 'light' ? '/icons/icon-logo-light.svg' : '/icons/icon-logo.svg'}
            items={breadcrumbItems}
            topRight={
              <div
                style={{
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '0 10px',
                  background: 'var(--ds-header-button-bg)',
                  borderRadius: 224,
                  cursor: 'pointer',
                }}
              >
                <img
                  src="/icons/icon-user.svg"
                  alt="用户"
                  className="nav-icon-img"
                  style={{ width: 16, height: 16 }}
                />
                <span
                  style={{
                    color: 'var(--ds-text-inverse)',
                    fontSize: 14,
                    fontFamily: 'OPPOSans, -apple-system, sans-serif',
                    lineHeight: '18px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  xxx
                </span>
              </div>
            }
            sidebar={
              <div
                style={{
                  width: 'var(--layout-sidebar-width, 200px)',
                  height: '100%',
                  background: 'var(--ds-bg-sidebar, #17191C)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ds-text-secondary)',
                  fontSize: 14,
                }}
              >
                导航菜单区域
              </div>
            }
          >
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--ds-bg-card)',
                borderRadius: 8,
                border: '1px solid var(--ds-border)',
                color: 'var(--ds-text-primary)',
                fontSize: 16,
              }}
            >
              内容区域
            </div>
          </Layout>
        </div>
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
