import { useMemo, useState } from 'react'
import { Input, message, theme as antdTheme } from '@insightst-design/ui'
import { Check, Copy, Search } from 'lucide-react'
import { Icon, FILL_ICON_NAMES, LINE_ICON_NAMES } from '@insightst-design/icons'
import CodeBlock from './CodeBlock'
import { PlaygroundRoot, PlaygroundSection } from './playgroundLayout'

const USAGE_CODE = `import { Icon } from '@insightst-design/icons'

// 实心图标
<Icon name="apps-fill" />
<Icon name="database-fill" />

// 空心图标
<Icon name="apps-line" />
<Icon name="download-line" />`

function IconGrid({
  icons,
  copiedName,
  onCopy,
}: {
  icons: readonly string[]
  copiedName: string | null
  onCopy: (name: string) => void
}) {
  const { token } = antdTheme.useToken()

  if (icons.length === 0) {
    return (
      <div
        style={{
          padding: '32px 0',
          textAlign: 'center',
          color: token.colorTextTertiary,
          fontSize: 13,
        }}
      >
        没有匹配的图标
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(108px, 1fr))',
        gap: 12,
      }}
    >
      {icons.map((name) => {
        const isCopied = copiedName === name
        return (
          <button
            key={name}
            type="button"
            onClick={() => onCopy(name)}
            title={`复制 ${name}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: '14px 8px',
              borderRadius: 8,
              border: `1px solid ${isCopied ? token.colorPrimary : token.colorBorder}`,
              background: isCopied ? `${token.colorPrimary}14` : token.colorBgContainer,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <Icon name={name} />
            <span
              style={{
                fontSize: 11,
                color: token.colorTextSecondary,
                wordBreak: 'break-all',
                textAlign: 'center',
                lineHeight: 1.4,
              }}
            >
              {name}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 11,
                color: isCopied ? token.colorSuccess : token.colorTextTertiary,
              }}
            >
              {isCopied ? <Check size={10} /> : <Copy size={10} />}
              {isCopied ? '已复制' : '点击复制'}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default function IconsSection() {
  const { token } = antdTheme.useToken()
  const [keyword, setKeyword] = useState('')
  const [copiedName, setCopiedName] = useState<string | null>(null)

  const normalizedKeyword = keyword.trim().toLowerCase()

  const filteredFillIcons = useMemo(
    () =>
      FILL_ICON_NAMES.filter((name) =>
        name.toLowerCase().includes(normalizedKeyword),
      ),
    [normalizedKeyword],
  )

  const filteredLineIcons = useMemo(
    () =>
      LINE_ICON_NAMES.filter((name) =>
        name.toLowerCase().includes(normalizedKeyword),
      ),
    [normalizedKeyword],
  )

  const handleCopy = (name: string) => {
    const snippet = `<Icon name="${name}" />`
    navigator.clipboard.writeText(snippet).then(() => {
      setCopiedName(name)
      message.success(`已复制 ${snippet}`)
      setTimeout(() => setCopiedName(null), 1500)
    })
  }

  const fillCode = `import { Icon } from '@insightst-design/icons'\n\n${filteredFillIcons
    .slice(0, 6)
    .map((name) => `<Icon name="${name}" />`)
    .join('\n')}${filteredFillIcons.length > 6 ? '\n// ...' : ''}`

  const lineCode = `import { Icon } from '@insightst-design/icons'\n\n${filteredLineIcons
    .slice(0, 6)
    .map((name) => `<Icon name="${name}" />`)
    .join('\n')}${filteredLineIcons.length > 6 ? '\n// ...' : ''}`

  return (
    <PlaygroundRoot>
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>
          图标
        </h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Icons · 共 {FILL_ICON_NAMES.length} 个实心图标、{LINE_ICON_NAMES.length} 个空心图标，点击可复制用法
        </p>
      </div>

      <Input
        allowClear
        prefix={<Search size={14} style={{ color: token.colorTextTertiary }} />}
        placeholder="搜索图标名称，如 database、search、folder"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ maxWidth: 360 }}
      />

      <PlaygroundSection title={`实心图标 Fill (${filteredFillIcons.length})`}>
        <IconGrid icons={filteredFillIcons} copiedName={copiedName} onCopy={handleCopy} />
        <CodeBlock darkCode={fillCode} lightCode={fillCode} />
      </PlaygroundSection>

      <PlaygroundSection title={`空心图标 Line (${filteredLineIcons.length})`}>
        <IconGrid icons={filteredLineIcons} copiedName={copiedName} onCopy={handleCopy} />
        <CodeBlock darkCode={lineCode} lightCode={lineCode} />
      </PlaygroundSection>

      <PlaygroundSection title="基础用法" titleEn="Usage">
        <CodeBlock darkCode={USAGE_CODE} lightCode={USAGE_CODE} />
      </PlaygroundSection>
    </PlaygroundRoot>
  )
}
