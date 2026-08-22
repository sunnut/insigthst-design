import { useState } from 'react'
import { Button, Space, Typography } from '@insightst-design/ui'
import { PlusOutlined, ReloadOutlined, DeleteOutlined, RightOutlined, DownloadOutlined } from '@insightst-design/icons'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundDisabledSwitch,
  PlaygroundSizeControl,
  PlaygroundSection,
  buildThemeCode,
} from './playgroundLayout'

const { Text } = Typography

const buttonCode = `import { Button } from '@insightst-design/ui'
import { PlusOutlined, ReloadOutlined, DeleteOutlined, DownloadOutlined } from '@insightst-design/icons'

{/* 主要类型 */}
<Button type="primary" size="middle" icon={<PlusOutlined />}>新建任务</Button>
<Button size="middle" icon={<ReloadOutlined />}>刷新列表</Button>
<Button type="dashed" icon={<DownloadOutlined />}>导出</Button>
<Button type="text">查看详情</Button>
<Button type="link">帮助文档</Button>
<Button type="primary" danger icon={<DeleteOutlined />}>删除任务</Button>

{/* 加载 / 禁用 */}
<Button type="primary" loading>提交中</Button>
<Button disabled>不可用</Button>

{/* 仅图标 */}
<Button type="primary" icon={<PlusOutlined />} aria-label="新建" />`

export default function ButtonPlayground() {
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('middle')

  const { darkCode, lightCode } = buildThemeCode('按钮 (Button)', buttonCode)

  return (
    <PlaygroundRoot>
      <PlaygroundHeader trailing={<PlaygroundDisabledSwitch disabled={disabled} onChange={setDisabled} />} />
      <PlaygroundSizeControl size={size} onChange={setSize} />

      <PlaygroundSection title="主要类型" titleEn="Variants">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px' }}>
          {[
            { label: '主按钮', node: <Button type="primary" size={size} icon={<PlusOutlined />} disabled={disabled} loading={loading}>新建任务</Button> },
            { label: '次按钮', node: <Button size={size} icon={<ReloadOutlined />} disabled={disabled}>刷新列表</Button> },
            { label: '虚线', node: <Button type="dashed" size={size} icon={<DownloadOutlined />} disabled={disabled}>导出</Button> },
            { label: '文字', node: <Button type="text" size={size} disabled={disabled}>查看详情 <RightOutlined style={{ fontSize: 12 }} /></Button> },
            { label: '链接', node: <Button type="link" size={size} disabled={disabled}>帮助文档</Button> },
            { label: '危险', node: <Button type="primary" danger size={size} icon={<DeleteOutlined />} disabled={disabled}>删除任务</Button> },
          ].map(({ label, node }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Text type="secondary" style={{ fontSize: 12, width: 56, textAlign: 'right', flexShrink: 0 }}>{label}</Text>
              {node}
            </div>
          ))}
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="状态" titleEn="States">
        <Space size="large" wrap>
          <div>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>加载 Loading</Text>
            <Space>
              <Button type="primary" loading={loading} disabled={disabled} onClick={() => setLoading(!loading)}>
                {loading ? '提交中…' : '切换加载'}
              </Button>
              <Button type="primary" loading disabled={disabled}>提交中</Button>
            </Space>
          </div>
          <div>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>禁用 Disabled</Text>
            <Button disabled>不可用</Button>
          </div>
          <div>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>仅图标 Icon only</Text>
            <Button type="primary" size={size} icon={<PlusOutlined />} disabled={disabled} aria-label="新建" />
          </div>
        </Space>
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
