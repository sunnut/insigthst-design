import { useState } from 'react'
import { Breadcrumb, Button, Space, Typography, Tag } from '@insightst-design/ui'
import { BreadcrumbProvider, useBreadcrumb, useBreadcrumbValue } from '@insightst-design/hooks'
import CodeBlock from './CodeBlock'
import { PlaygroundRoot, PlaygroundSection, PlaygroundHeader } from './playgroundLayout'

const { Text } = Typography

// ── 面包屑展示组件（使用 useBreadcrumbValue）──────────────────────────────
function AppBreadcrumb() {
  const items = useBreadcrumbValue()
  return (
    <div
      style={{
        padding: '8px 16px',
        background: 'var(--ds-bg-input)',
        border: '1px solid var(--ds-border)',
        borderRadius: 6,
        minHeight: 36,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {items.length > 0 ? (
        <Breadcrumb items={items} />
      ) : (
        <Text type="secondary" style={{ fontSize: 12 }}>（未设置面包屑）</Text>
      )}
    </div>
  )
}

// ── 各"页面"子组件，分别调用 useBreadcrumb 声明自己的面包屑 ──────────────
function HomePage() {
  useBreadcrumb([{ title: '首页' }])
  return (
    <PageContent
      title="首页"
      color="var(--ds-primary)"
      bg="var(--ds-primary-subtle)"
    />
  )
}

function ListPage() {
  useBreadcrumb([{ title: '首页' }, { title: '用户列表' }])
  return (
    <PageContent
      title="用户列表"
      color="var(--ds-success)"
      bg="var(--ds-success-bg)"
    />
  )
}

function DetailPage() {
  useBreadcrumb([{ title: '首页' }, { title: '用户列表' }, { title: '用户详情' }])
  return (
    <PageContent
      title="用户详情"
      color="var(--ds-warning)"
      bg="var(--ds-warning-bg)"
    />
  )
}

function PageContent({ title, color, bg }: { title: string; color: string; bg: string }) {
  return (
    <div
      style={{
        padding: '20px 16px',
        borderRadius: 6,
        background: bg,
        border: `1px dashed ${color}`,
        textAlign: 'center',
      }}
    >
      <Text style={{ color, fontWeight: 600 }}>{title}</Text>
    </div>
  )
}

// ── 交互演示 ──────────────────────────────────────────────────────────────
type PageKey = 'home' | 'list' | 'detail'

const pages: { key: PageKey; label: string }[] = [
  { key: 'home', label: '首页' },
  { key: 'list', label: '用户列表' },
  { key: 'detail', label: '用户详情' },
]

function Demo() {
  const [page, setPage] = useState<PageKey>('home')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Space wrap>
        {pages.map((p) => (
          <Button
            key={p.key}
            type={page === p.key ? 'primary' : 'default'}
            size="small"
            onClick={() => setPage(p.key)}
          >
            {p.label}
          </Button>
        ))}
      </Space>
      <AppBreadcrumb />
      {page === 'home' && <HomePage />}
      {page === 'list' && <ListPage />}
      {page === 'detail' && <DetailPage />}
    </div>
  )
}

// ── 代码示例 ──────────────────────────────────────────────────────────────
const providerCode = `// main.tsx / App.tsx —— 在应用顶层包裹 Provider
import { BreadcrumbProvider } from '@insightst-design/hooks';

export default function App() {
  return (
    <BreadcrumbProvider>
      <Layout />   {/* 内部包含路由和面包屑展示组件 */}
    </BreadcrumbProvider>
  );
}`

const displayCode = `// AppBreadcrumb.tsx —— 面包屑展示组件
import { useBreadcrumbValue } from '@insightst-design/hooks';
import { Breadcrumb } from '@insightst-design/ui';

export function AppBreadcrumb() {
  const items = useBreadcrumbValue();   // 订阅 items 变化
  return <Breadcrumb items={items} />;
}`

const hookCode = `// UserDetailPage.tsx —— 子路由页面声明面包屑
import { useBreadcrumb } from '@insightst-design/hooks';

export default function UserDetailPage() {
  useBreadcrumb([
    { title: '首页' },
    { title: '用户列表' },
    { title: '用户详情' },
  ]);

  return <div>用户详情内容…</div>;
}`

const apiCode = `// API 说明
// BreadcrumbProvider  — Context 提供者，包裹在应用顶层
// useBreadcrumb(items) — 子路由调用，声明当前页面的面包屑；组件卸载自动清空
// useBreadcrumbValue() — 面包屑渲染组件调用，读取当前 items`

export default function BreadcrumbPlayground() {
  return (
    <PlaygroundRoot>
      <div>
        <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', display: 'block', marginBottom: 8 }}>
          <code>useBreadcrumb</code> / <code>useBreadcrumbValue</code> / <code>BreadcrumbProvider</code>{' '}
          通过双 Context 实现面包屑的声明式管理：子路由用{' '}
          <code>useBreadcrumb</code> 声明路径，顶部栏用{' '}
          <code>useBreadcrumbValue</code> 展示，互不干扰，卸载自动清空。
        </Text>
        <Space size={6} wrap>
          <Tag style={{ color: 'var(--ds-primary)', background: 'var(--ds-primary-subtle)', border: 'none' }}>
            BreadcrumbProvider
          </Tag>
          <Tag style={{ color: 'var(--ds-success)', background: 'var(--ds-success-bg)', border: 'none' }}>
            useBreadcrumb
          </Tag>
          <Tag style={{ color: 'var(--ds-warning)', background: 'var(--ds-warning-bg)', border: 'none' }}>
            useBreadcrumbValue
          </Tag>
        </Space>
      </div>

      <PlaygroundSection title="交互演示" titleEn="Interactive Demo">
        <PlaygroundHeader hint="切换页面 · 面包屑自动更新" />
        <div style={{ marginTop: 16 }}>
          <BreadcrumbProvider>
            <Demo />
          </BreadcrumbProvider>
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="1. 顶层包裹 Provider" titleEn="App.tsx">
        <CodeBlock darkCode={providerCode} lightCode={providerCode} lang="tsx" />
      </PlaygroundSection>

      <PlaygroundSection title="2. 面包屑展示组件" titleEn="AppBreadcrumb.tsx">
        <CodeBlock darkCode={displayCode} lightCode={displayCode} lang="tsx" />
      </PlaygroundSection>

      <PlaygroundSection title="3. 子路由声明面包屑" titleEn="UserDetailPage.tsx">
        <CodeBlock darkCode={hookCode} lightCode={hookCode} lang="tsx" />
      </PlaygroundSection>

      <PlaygroundSection title="API 说明" titleEn="API">
        <CodeBlock darkCode={apiCode} lightCode={apiCode} lang="typescript" />
      </PlaygroundSection>
    </PlaygroundRoot>
  )
}
