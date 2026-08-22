import { useState } from 'react'
import { Steps, Button, Card, Typography, Space, Segmented } from '@insightst-design/ui'
import {
  CloudUploadOutlined,
  ApiOutlined,
  MergeCellsOutlined,
  AuditOutlined,
  RocketOutlined,
} from '@insightst-design/icons'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundSection,
  buildThemeCode,
} from './playgroundLayout'

const { Text } = Typography

const stepItems = [
  { title: '上传文献', subTitle: 'Upload', description: '上传 PDF 或 Word 格式文献', icon: <CloudUploadOutlined /> },
  { title: '信息抽取', subTitle: 'Extract', description: '自动提取关键概念与关系', icon: <ApiOutlined /> },
  { title: '知识融合', subTitle: 'Merge', description: '将新知识与现有图谱融合', icon: <MergeCellsOutlined /> },
  { title: '人工审核', subTitle: 'Review', description: '专家审核并确认结果', icon: <AuditOutlined /> },
  { title: '发布图谱', subTitle: 'Publish', description: '正式发布到知识库', icon: <RocketOutlined /> },
]

function buildStepCode(direction: 'horizontal' | 'vertical') {
  const itemsCode = stepItems
    .map((item) => `  { title: '${item.title}', description: '${item.description}' },`)
    .join('\n')

  const directionProp = direction === 'vertical' ? '\n  direction="vertical"' : ''

  return `import { useState } from 'react'
import { Steps, Button, Space } from '@insightst-design/ui'

const [current, setCurrent] = useState(0)
const items = [
${itemsCode}
]

<Steps
  current={current}
  onChange={setCurrent}${directionProp}
  items={items}
  size="small"
/>`
}

export default function StepPlayground() {
  const [current, setCurrent] = useState(2)
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal')
  const { darkCode, lightCode } = buildThemeCode('步骤条 (Steps)', buildStepCode(direction))

  const stepsItems = stepItems.map((item, index) => ({
    title: (
      <div>
        <div style={{ fontWeight: index <= current ? 500 : 400 }}>{item.title}</div>
        <div style={{ fontSize: 11, opacity: 0.5 }}>{item.subTitle}</div>
      </div>
    ),
    description: item.description,
    icon: index < current ? undefined : item.icon,
  }))

  return (
    <PlaygroundRoot>
      <PlaygroundHeader hint="交互范例 · 点击步骤切换" />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>方向</Text>
        <Segmented
          size="small"
          value={direction}
          onChange={(v) => setDirection(v as typeof direction)}
          options={[
            { label: '水平', value: 'horizontal' },
            { label: '垂直', value: 'vertical' },
          ]}
        />
      </div>

      <PlaygroundSection title="流程步骤" titleEn="Workflow">
        <Card>
          <Steps
            direction={direction}
            current={current}
            onChange={setCurrent}
            items={stepsItems}
            size="small"
            style={{ marginBottom: 16 }}
          />
          <Card size="small">
            <Space wrap>
              <Text strong>{stepItems[current].title}</Text>
              <Text
                type="secondary"
                style={{
                  fontSize: 11,
                  background: 'var(--ds-primary-subtle)',
                  color: 'var(--ds-primary)',
                  padding: '0 8px',
                  borderRadius: 4,
                }}
              >
                步骤 {current + 1} / {stepItems.length}
              </Text>
            </Space>
            <p style={{ marginTop: 8, marginBottom: 12 }}>{stepItems[current].description}</p>
            <Space>
              {current > 0 && <Button onClick={() => setCurrent(current - 1)}>上一步 Prev</Button>}
              {current < stepItems.length - 1 && (
                <Button type="primary" onClick={() => setCurrent(current + 1)}>下一步 Next</Button>
              )}
              {current === stepItems.length - 1 && (
                <Button type="primary" style={{ background: 'var(--ds-success)', borderColor: 'var(--ds-success)' }}>
                  完成 Done
                </Button>
              )}
            </Space>
          </Card>
        </Card>
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
