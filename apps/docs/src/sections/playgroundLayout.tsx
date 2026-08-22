import type { CSSProperties, ReactNode } from 'react'
import { Space, Switch, Segmented, Typography } from '@insightst-design/ui'

const { Text } = Typography

export const PLAYGROUND_GAP = 40

export const labelStyle: CSSProperties = {
  fontSize: 12,
  display: 'block',
  marginBottom: 8,
}

export function buildThemeCode(componentLabel: string, body: string) {
  return {
    darkCode: `// ${componentLabel} · 暗色主题\n${body.trim()}`,
    lightCode: `// ${componentLabel} · 亮色主题\n${body.trim()}`,
  }
}

export function PlaygroundRoot({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: PLAYGROUND_GAP }}>
      {children}
    </div>
  )
}

export function PlaygroundHeader({
  hint = '交互范例 · Interactive Example',
  trailing,
}: {
  hint?: string
  trailing?: ReactNode
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
      <Text type="secondary" style={{ fontSize: 12 }}>{hint}</Text>
      {trailing}
    </div>
  )
}

export function PlaygroundDisabledSwitch({
  disabled,
  onChange,
}: {
  disabled: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <Space>
      <Text type="secondary" style={{ fontSize: 12 }}>禁用 Disabled</Text>
      <Switch checked={disabled} onChange={onChange} size="small" />
    </Space>
  )
}

export function PlaygroundSizeControl({
  size,
  onChange,
}: {
  size: 'small' | 'middle' | 'large'
  onChange: (v: 'small' | 'middle' | 'large') => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Text type="secondary" style={{ fontSize: 12, width: 60 }}>尺寸 Size</Text>
      <Segmented
        size="small"
        value={size}
        onChange={(val) => onChange(val as 'small' | 'middle' | 'large')}
        options={[
          { label: '小 sm', value: 'small' },
          { label: '中 md', value: 'middle' },
          { label: '大 lg', value: 'large' },
        ]}
      />
    </div>
  )
}

export function PlaygroundSection({
  title,
  titleEn,
  children,
}: {
  title: string
  titleEn?: string
  children: ReactNode
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
        <Text strong style={{ fontSize: 13 }}>{title}</Text>
        {titleEn && (
          <Text type="secondary" style={{ fontSize: 12 }}>{titleEn}</Text>
        )}
      </div>
      {children}
    </div>
  )
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <Text type="secondary" style={labelStyle}>{children}</Text>
}
