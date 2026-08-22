import { Link } from 'react-router'
import { Package, Paintbrush, Box, Palette, ArrowRight, Workflow, Wrench } from 'lucide-react'
import CodeBlock from './CodeBlock'
import { PlaygroundRoot, PlaygroundSection } from './playgroundLayout'

const installCode = `# 配置私有源（项目根目录 .npmrc）
registry=https://npm-registry.insightst.com/
或运行如下命令
npm config set registry https://npm-registry.insightst.com/

# 安装核心包（theme、icons会随 @insightst-design/ui 自动安装）
npm install @insightst-design/ui

# 安装hooks包
npm install @insightst-design/hooks

# 安装utils包
npm install @insightst-design/utils
`

const setupCode = `// main.tsx
import { ThemeProvider } from '@insightst-design/theme'
import '@insightst-design/theme/tokens.css'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider mode="dark">
    <App />
  </ThemeProvider>,
)`

const componentCode = `import { Button, CardPro } from '@insightst-design/ui'

export function Demo() {
  return (
    <>
      <Button type="primary">主要按钮</Button>
      <CardPro
        title="示例卡片"
        description="基于设计系统封装的业务组件"
        variant="model"
        statusTone="success"
      />
    </>
  )
}`

const packages = [
  {
    name: '@insightst-design/theme',
    desc: '设计 Token、CSS 变量与 Ant Design 主题适配',
    icon: Paintbrush,
    link: '/themes',
  },
  {
    name: '@insightst-design/ui',
    desc: '基于 Ant Design 开发的通用组件与自定义的业务组件库',
    icon: Box,
    link: '/components/button',
  },
  {
    name: '@insightst-design/icons',
    desc: '图标组件，统一图标使用方式',
    icon: Package,
    link: '/icons',
  },
  {
    name: '@insightst-design/hooks',
    desc: 'React 业务 Hooks（表格、分页、请求等），按需安装',
    icon: Workflow,
    link: '/hooks/use-table',
  },
  {
    name: '@insightst-design/utils',
    desc: '通用工具函数（请求封装、Session、clsx 等），按需安装',
    icon: Wrench,
    link: '/utils/http-client',
  },
]

const steps = [
  {
    step: '01',
    title: '安装依赖',
    desc: '通过私有 npm 源安装 theme、ui；antd、react、react-dom 会随 ui 包自动安装。',
  },
  {
    step: '02',
    title: '接入主题',
    desc: '在应用入口引入 tokens.css，使用 ThemeProvider 包裹根组件。',
  },
  {
    step: '03',
    title: '使用组件',
    desc: '从 @insightst-design/ui 按需引入组件，配合主题 Token 保持视觉一致。',
  },
]

const quickLinks = [
  { label: '色彩系统', path: '/colors', color: '#5264E0' },
  { label: '排版系统', path: '/typography', color: '#43CB89' },
  { label: '通用', path: '/components/button', color: '#FFA564' },
  { label: '设计原则', path: '/principles', color: '#8a8f99' },
]

function SectionCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="rounded-lg p-6"
      style={{
        background: 'var(--ds-bg-card)',
        border: '1px solid var(--ds-border)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default function QuickStartSection() {
  return (
    <PlaygroundRoot>
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>
          快速入门
        </h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Quick Start · 5 分钟接入洞察时空设计系统
        </p>
      </div>

      <SectionCard>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)', lineHeight: 1.8, margin: 0 }}>
          <strong style={{ color: 'var(--ds-text-primary)' }}>Insightst Design</strong> 是洞察时空的统一 UI 组件库，
          包含设计 Token、主题适配与业务组件。本文档将引导你完成安装、主题接入与第一个组件的使用。
        </p>
      </SectionCard>

      <PlaygroundSection title="接入步骤" titleEn="Steps">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-lg p-5"
              style={{
                background: 'var(--ds-bg-card)',
                border: '1px solid var(--ds-border)',
              }}
            >
              <div
                className="text-caption font-mono mb-3"
                style={{ color: 'var(--ds-primary)', fontWeight: 600, fontSize: 13 }}
              >
                STEP {item.step}
              </div>
              <div className="text-h3 mb-2" style={{ color: 'var(--ds-text-primary)', fontSize: 16 }}>
                {item.title}
              </div>
              <p className="text-caption" style={{ color: 'var(--ds-text-secondary)', margin: 0, lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="安装依赖" titleEn="Install">
        <CodeBlock darkCode={installCode} lightCode={installCode} lang="bash" />
      </PlaygroundSection>

      <PlaygroundSection title="接入主题" titleEn="Theme Setup">
        <CodeBlock darkCode={setupCode} lightCode={setupCode} />
        <p className="text-caption mt-3" style={{ color: 'var(--ds-text-tertiary)' }}>
          ThemeProvider 支持 <code>mode</code>（dark / light）、<code>lang</code>（zh / en）等配置，
          详见 <Link to="/themes" style={{ color: 'var(--ds-primary)' }}>主题</Link>。
        </p>
      </PlaygroundSection>

      <PlaygroundSection title="使用组件" titleEn="Use Components">
        <CodeBlock darkCode={componentCode} lightCode={componentCode} />
      </PlaygroundSection>

      <PlaygroundSection title="核心包" titleEn="Packages">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {packages.map(({ name, desc, icon: Icon, link }) => {
            const cardStyle = {
              background: 'var(--ds-bg-card)',
              border: '1px solid var(--ds-border)',
              textDecoration: 'none' as const,
            }
            const cardContent = (
              <>
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 40,
                    height: 40,
                    background: 'rgba(82,100,224,0.08)',
                    color: 'var(--ds-primary)',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="font-mono text-body" style={{ color: 'var(--ds-text-primary)', fontWeight: 500 }}>
                    {name}
                  </div>
                  <div className="text-caption" style={{ color: 'var(--ds-text-secondary)' }}>
                    {desc}
                  </div>
                </div>
                {link ? <ArrowRight size={16} style={{ color: 'var(--ds-text-tertiary)', flexShrink: 0 }} /> : null}
              </>
            )

            return link ? (
              <Link
                key={name}
                to={link}
                className="rounded-lg p-4 flex items-center gap-4 hover:no-underline transition-all duration-150"
                style={cardStyle}
              >
                {cardContent}
              </Link>
            ) : (
              <div key={name} className="rounded-lg p-4 flex items-center gap-4" style={cardStyle}>
                {cardContent}
              </div>
            )
          })}
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="继续探索" titleEn="Explore More">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {quickLinks.map(({ label, path, color }) => (
            <Link
              key={path}
              to={path}
              className="rounded-lg p-4 flex flex-col gap-2 hover:no-underline transition-all duration-150"
              style={{
                background: 'var(--ds-bg-card)',
                border: '1px solid var(--ds-border)',
                textDecoration: 'none',
              }}
            >
              <div className="w-1 h-4 rounded-full" style={{ background: color }} />
              <span style={{ color: 'var(--ds-text-primary)', fontSize: 14, fontWeight: 500 }}>
                {label}
              </span>
              <span className="flex items-center gap-1 text-caption" style={{ color: 'var(--ds-primary)' }}>
                查看文档 <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </PlaygroundSection>

      <SectionCard
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(82,100,224,0.06)',
          border: '1px solid rgba(82,100,224,0.15)',
        }}
      >
        <Palette size={20} style={{ color: 'var(--ds-primary)', flexShrink: 0 }} />
        <p className="text-caption" style={{ color: 'var(--ds-text-secondary)', margin: 0, lineHeight: 1.7 }}>
          建议先阅读 <Link to="/colors" style={{ color: 'var(--ds-primary)' }}>色彩系统</Link> 与{' '}
          <Link to="/typography" style={{ color: 'var(--ds-primary)' }}>排版系统</Link>，
          再进入组件文档查看交互范例与代码片段。
        </p>
      </SectionCard>
    </PlaygroundRoot>
  )
}
