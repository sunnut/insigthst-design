import { useState } from 'react'
import { Tag, Space, Button } from '@insightst-design/ui'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundSection,
  buildThemeCode,
} from './playgroundLayout'

const statuses = [
  { cn: '进行中', en: 'Processing', antColor: 'processing' as const },
  { cn: '已完成', en: 'Completed', antColor: 'success' as const },
  { cn: '草稿', en: 'Draft', antColor: 'default' as const },
  { cn: '建议复审', en: 'Review', antColor: 'warning' as const },
  { cn: '不建议使用', en: 'Rejected', antColor: 'error' as const },
]

const tagCode = `import { Tag } from '@insightst-design/ui'

<Tag color="processing">进行中 Processing</Tag>
<Tag color="success">已完成 Completed</Tag>
<Tag>草稿 Draft</Tag>
<Tag color="warning">建议复审 Review</Tag>
<Tag color="error">不建议使用 Rejected</Tag>

{/* 可关闭 */}
<Tag closable onClose={() => {}}>可关闭标签</Tag>

{/* 可选中（需自行管理选中态样式） */}
<Tag.CheckableTag checked={checked} onChange={setChecked}>可选中</Tag.CheckableTag>`

export default function TagPlayground() {
  const [checkable, setCheckable] = useState(true)
  const [closableVisible, setClosableVisible] = useState(true)

  const { darkCode, lightCode } = buildThemeCode('标签 (Tag)', tagCode)

  return (
    <PlaygroundRoot>
      <PlaygroundHeader hint="交互范例 · Interactive Example" />

      <PlaygroundSection title="语义色标签" titleEn="Semantic Colors">
        <Space size={[8, 8]} wrap>
          {statuses.map((s) => (
            <Tag key={s.cn} color={s.antColor} style={{ fontSize: 12 }}>
              {s.cn} <span style={{ opacity: 0.6 }}>{s.en}</span>
            </Tag>
          ))}
        </Space>
      </PlaygroundSection>

      <PlaygroundSection title="可关闭标签" titleEn="Closable">
        {closableVisible ? (
          <Tag closable onClose={() => setClosableVisible(false)}>可关闭标签</Tag>
        ) : (
          <Button type="link" size="small" onClick={() => setClosableVisible(true)} style={{ padding: 0, fontSize: 12 }}>
            重置标签
          </Button>
        )}
      </PlaygroundSection>

      <PlaygroundSection title="可选中标签" titleEn="Checkable">
        <Tag.CheckableTag checked={checkable} onChange={setCheckable}>
          文献筛选 · {checkable ? '已启用' : '未启用'}
        </Tag.CheckableTag>
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
