import { Tooltip, Button, Table, Typography, Space, Popover, Alert } from '@insightst-design/ui'
import { DeleteOutlined, LinkOutlined, InfoCircleOutlined } from '@insightst-design/icons'
import { useTheme } from '../theme'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundSection,
  buildThemeCode,
} from './playgroundLayout'

const { Text } = Typography

const tooltipCode = `import { Tooltip, Button, Popover, Alert, Space } from '@insightst-design/ui'
import { DeleteOutlined, LinkOutlined, InfoCircleOutlined } from '@insightst-design/icons'

{/* 弹出方向 */}
<Space size="large" wrap>
  <Tooltip title="top 方向提示" placement="top"><Button>top</Button></Tooltip>
  <Tooltip title="bottom 方向提示" placement="bottom"><Button>bottom</Button></Tooltip>
  <Tooltip title="left 方向提示" placement="left"><Button>left</Button></Tooltip>
  <Tooltip title="right 方向提示" placement="right"><Button>right</Button></Tooltip>
</Space>

{/* 场景演示 */}
<Space size="large" wrap align="start">
  <Tooltip title="点击提交后将进入审核流程">
    <Button type="primary">提交 Submit</Button>
  </Tooltip>
  <Tooltip title="删除此节点">
    <Button danger icon={<DeleteOutlined />} />
  </Tooltip>
  <Popover title="节点详情" content="包含概念、关系和版本信息" trigger="click">
    <Button type="link" icon={<LinkOutlined />}>知识图谱节点</Button>
  </Popover>
</Space>

<Alert
  style={{ marginTop: 16, maxWidth: 480 }}
  message="操作提示"
  description="配置已自动保存，可在设置中恢复默认。"
  type="info"
  showIcon
  icon={<InfoCircleOutlined />}
  closable
/>`

const specData = [
  { key: 'bg', label: '背景色 Background', dark: 'var(--ds-bg-elevated)', light: 'var(--ds-bg-card)' },
  { key: 'border', label: '边框色 Border', dark: 'var(--ds-border)', light: 'var(--ds-border)' },
  { key: 'text', label: '文字色 Text', dark: 'var(--ds-text-inverse)', light: 'var(--ds-text-inverse)' },
  { key: 'size', label: '字号 Font Size', dark: '12px', light: '12px' },
  { key: 'padding', label: '内边距 Padding', dark: '8px 12px', light: '8px 12px' },
  { key: 'radius', label: '圆角 Radius', dark: '8px', light: '8px' },
  { key: 'shadow', label: '阴影 Shadow', dark: '0 4px 12px rgba(0,0,0,0.15)', light: '0 4px 12px rgba(0,0,0,0.12)' },
  { key: 'offset', label: '间距 Offset', dark: '8px', light: '8px' },
]

export default function TooltipPlayground() {
  const { mode } = useTheme()
  const { darkCode, lightCode } = buildThemeCode('气泡与提示 (Tooltip / Popover / Alert)', tooltipCode)

  const specColumns = [
    { title: '属性 Property', dataIndex: 'label', key: 'label', width: '50%' },
    {
      title: 'Token 值',
      key: 'value',
      render: (_: unknown, record: (typeof specData)[0]) => (
        <Text code style={{ fontSize: 12 }}>{mode === 'dark' ? record.dark : record.light}</Text>
      ),
    },
  ]

  return (
    <PlaygroundRoot>
      <PlaygroundHeader hint="交互范例 · Tooltip、Popover 与 Alert" />

      <PlaygroundSection title="弹出方向" titleEn="Placement">
        <Space size="large" wrap>
          {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
            <Tooltip key={p} title={`${p} 方向提示`} placement={p}>
              <Button>{p}</Button>
            </Tooltip>
          ))}
        </Space>
      </PlaygroundSection>

      <PlaygroundSection title="样式参数" titleEn="Style Spec">
        <Table columns={specColumns} dataSource={specData} pagination={false} size="small" />
      </PlaygroundSection>

      <PlaygroundSection title="场景演示" titleEn="In Context">
        <Space size="large" wrap align="start">
          <Tooltip title="点击提交后将进入审核流程">
            <Button type="primary">提交 Submit</Button>
          </Tooltip>
          <Tooltip title="删除此节点">
            <Button danger icon={<DeleteOutlined />} />
          </Tooltip>
          <Popover
            title="节点详情"
            content="包含概念、关系和版本信息"
            trigger="click"
          >
            <Button type="link" icon={<LinkOutlined />}>知识图谱节点</Button>
          </Popover>
        </Space>
        <Alert
          style={{ marginTop: 16, maxWidth: 480 }}
          message="操作提示"
          description="配置已自动保存，可在设置中恢复默认。"
          type="info"
          showIcon
          icon={<InfoCircleOutlined />}
          closable
        />
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
