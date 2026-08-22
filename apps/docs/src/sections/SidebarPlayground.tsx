import { useState } from 'react'
import { Switch, Space, Typography, Sidebar, type NavCategory } from '@insightst-design/ui'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundSection,
  buildThemeCode,
} from './playgroundLayout'
import HomeOutlined from '../assets/icons/nav/overview.svg?react'
import ProductOutlined from '../assets/icons/nav/asset.svg?react'
import FinetuneOutlined from '../assets/icons/nav/finetune.svg?react'
import AppsOutlined from '../assets/icons/nav/apps.svg?react'
import DeployOutlined from '../assets/icons/nav/deploy.svg?react'
import EvaluationOutlined from '../assets/icons/nav/evaluation.svg?react'
import MarketOutlined from '../assets/icons/nav/market.svg?react'
import NotebookOutlined from '../assets/icons/nav/notebook.svg?react'

const { Text } = Typography

const ICON_NAMES = {
  home: 'HomeOutlined',
  asset: 'ProductOutlined',
  finetune: 'FinetuneOutlined',
  apps: 'AppsOutlined',
  deploy: 'DeployOutlined',
  evaluation: 'EvaluationOutlined',
  market: 'MarketOutlined',
  notebook: 'NotebookOutlined',
} as const

const ICONS = {
  home: <HomeOutlined />,
  asset: <ProductOutlined />,
  finetune: <FinetuneOutlined />,
  apps: <AppsOutlined />,
  deploy: <DeployOutlined />,
  evaluation: <EvaluationOutlined />,
  market: <MarketOutlined />,
  notebook: <NotebookOutlined />,
} as const

const navCategories: NavCategory[] = [
  {
    label: '概览',
    items: [
      { key: '/home/overview', label: '首页', icon: ICONS.home },
    ],
  },
  {
    label: '应用',
    items: [
      { key: '/home/asset', label: '资产中心', icon: ICONS.asset },
      { key: '/home/train', label: '模型工厂', icon: ICONS.finetune },
      { key: '/home/apps', label: '应用工厂', icon: ICONS.apps },
    ],
  },
  {
    label: '服务',
    items: [
      { key: '/home/data-label', label: '数据工厂', icon: ICONS.asset },
      { key: '/home/services', label: '服务中心', icon: ICONS.deploy },
      { key: '/home/evaluation', label: '评测中心', icon: ICONS.evaluation },
      {
        key: '/home/market',
        label: '资产广场',
        icon: ICONS.market,
        children: [
          {
            key: '/home/market/model',
            label: '模型市场',
          },
          {
            key: '/home/market/dataset',
            label: '数据集市场',
          }
        ]
      },
      { key: '/home/notebooks', label: '开发与实验', icon: ICONS.notebook },
    ],
  },
]

function buildSidebarCode() {
  const importsCode = Object.entries(ICON_NAMES)
    .map(([key, name]) => `import ${name} from '@/assets/icons/nav/${key}.svg?react'`)
    .join('\n')

  const iconsCode = Object.entries(ICON_NAMES)
    .map(([key, name]) => `  ${key}: <${name} />,`)
    .join('\n')

  const categoriesCode = navCategories.map((cat) => {
    const itemsCode = cat.items.map((item) => {
      const ik = Object.entries(ICONS).find(([, icon]) => icon === item.icon)?.[0] ?? 'home'
      if (item.children) {
        const childrenCode = item.children
          .map((c) => `        { key: '${c.key}', label: '${c.label}', icon: null },`)
          .join('\n')
        return `      {
        key: '${item.key}',
        label: '${item.label}',
        icon: ICONS.${ik},
        children: [
${childrenCode}
        ],
      },`
      }
      return `      { key: '${item.key}', label: '${item.label}', icon: ICONS.${ik} },`
    }).join('\n')
    return `  {
    label: '${cat.label}',
    items: [
${itemsCode}
    ],
  },`
  }).join('\n')

  return `import { useState } from 'react'
import { Sidebar, type NavCategory } from '@insightst-design/ui'
${importsCode}

const ICONS = {
${iconsCode}
} as const

const navCategories: NavCategory[] = [
${categoriesCode}
]

export function SidebarDemo() {
  const [activeKey, setActiveKey] = useState('/home/overview')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ display: 'flex', height: 520, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--ds-border)' }}>
      <Sidebar
        key={collapsed ? 'collapsed' : 'expanded'}
        width={260}
        data={navCategories}
        activeKey={activeKey}
        onSelect={setActiveKey}
        defaultCollapsed={collapsed}
      />
      <div style={{ flex: 1, background: 'var(--ds-bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--ds-text-secondary)' }}>当前激活：{activeKey}</span>
      </div>
    </div>
  )
}`
}

export default function SidebarPlayground() {
  const [activeKey, setActiveKey] = useState('/home/overview')
  const [collapsed, setCollapsed] = useState(false)
  const { darkCode, lightCode } = buildThemeCode('侧边栏 (Sidebar)', buildSidebarCode())

  const activeLabel = (() => {
    for (const cat of navCategories) {
      for (const item of cat.items) {
        if (item.key === activeKey) return `${cat.label} › ${item.label}`
        const child = item.children?.find((c) => c.key === activeKey)
        if (child) return `${cat.label} › ${item.label} › ${child.label}`
      }
    }
    return activeKey
  })()

  return (
    <PlaygroundRoot>
      <PlaygroundHeader
        hint="交互范例 · 侧边栏（Sidebar）"
        trailing={
          <Space>
            <Text type="secondary" style={{ fontSize: 12 }}>折叠侧边栏</Text>
            <Switch checked={collapsed} onChange={setCollapsed} size="small" />
          </Space>
        }
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>当前激活：</Text>
        <span
          style={{
            padding: '2px 10px',
            borderRadius: 4,
            background: 'var(--ds-primary-subtle)',
            color: 'var(--ds-primary)',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {activeLabel}
        </span>
      </div>

      <PlaygroundSection title="布局预览" titleEn="Sidebar Preview">
        <div style={{ display: 'flex', height: 520, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--ds-border)' }}>
          <Sidebar
            key={collapsed ? 'collapsed' : 'expanded'}
            width={260}
            data={navCategories}
            activeKey={activeKey}
            onSelect={setActiveKey}
            defaultCollapsed={collapsed}
          />
          <div style={{ flex: 1, background: 'var(--ds-bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--ds-text-secondary)' }}>当前激活菜单项</span>
            <span style={{ fontSize: 18, fontWeight: 'bold', color: 'var(--ds-primary)' }}>{activeLabel}</span>
          </div>
        </div>
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
