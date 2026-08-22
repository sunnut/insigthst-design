import { useMemo, useState } from 'react'
import {
  App,
  Modal,
  Button,
  Space,
  Typography,
  Tag,
} from '@insightst-design/ui'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import {
  ExclamationCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  FormOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
} from '@insightst-design/icons'
import CodeBlock from './CodeBlock'

const { Text } = Typography

const NOTIFICATION_ICONS = {
  confirm: ExclamationCircleOutlined,
  warning: WarningOutlined,
  success: CheckCircleOutlined,
  error: CloseCircleOutlined,
} as const

type NotificationKind = keyof typeof NOTIFICATION_ICONS

const NOTIFICATION_DEFAULT_OK_TEXT: Record<NotificationKind, string> = {
  confirm: '确认 Confirm',
  warning: '确认 Confirm',
  success: '确认 Confirm',
  error: '重试 Retry',
}

const NOTIFICATION_ICON_NAMES: Record<NotificationKind, string> = {
  confirm: 'ExclamationCircleOutlined',
  warning: 'WarningOutlined',
  success: 'CheckCircleOutlined',
  error: 'CloseCircleOutlined',
}

const NOTIFICATION_EXAMPLES: {
  kind: NotificationKind
  title: string
  content: string
}[] = [
  {
    kind: 'confirm',
    title: '确认提交',
    content: '提交后将进入审核流程，审核期间不可修改。是否继续？',
  },
  {
    kind: 'warning',
    title: '警告',
    content: '删除此知识图谱将同时删除所有关联数据，此操作不可撤销。',
  },
  {
    kind: 'success',
    title: '操作成功',
    content: '知识图谱已成功创建，系统将在2分钟内完成索引构建。',
  },
  {
    kind: 'error',
    title: '操作失败',
    content: '网络连接超时，请检查网络设置后重试。',
  },
]

interface OpenNotificationOptions {
  title: string
  content: string
  okText?: string
  cancelText?: string
  showCancel?: boolean
  closable?: boolean
  onOk?: () => void | Promise<void>
  onCancel?: () => void
}

type NotificationModalHost = Pick<
  ModalStaticFunctions,
  'confirm' | 'warning' | 'success' | 'error'
>

const NOTIFICATION_MODAL_METHOD = {
  confirm: 'confirm',
  warning: 'warning',
  success: 'success',
  error: 'error',
} as const satisfies Record<NotificationKind, keyof NotificationModalHost>

function getNotificationIcon(kind: NotificationKind) {
  const Icon = NOTIFICATION_ICONS[kind]
  return <Icon />
}

/** docs 演示用；业务侧见代码示例 */
function openNotificationModal(
  modal: NotificationModalHost,
  kind: NotificationKind,
  options: OpenNotificationOptions,
) {
  const showCancel = options.showCancel ?? true
  const closable = options.closable ?? true

  return modal[NOTIFICATION_MODAL_METHOD[kind]]({
    className: 'ds-modal-notification',
    width: 420,
    closable,
    okCancel: showCancel,
    icon: getNotificationIcon(kind),
    title: options.title,
    content: options.content,
    okText: options.okText ?? NOTIFICATION_DEFAULT_OK_TEXT[kind],
    cancelText: options.cancelText ?? '取消 Cancel',
    okButtonProps: kind === 'warning' || kind === 'error' ? { danger: true } : undefined,
    onOk: options.onOk,
    onCancel: options.onCancel,
  })
}

type ContentTemplate = 'form' | 'detail' | 'config'

/* ── 表单型 · 编辑接口服务 ── */
// fullWidth=true 通栏，false（默认）半栏左右并排
const formFields: { label: string; value: string; fullWidth?: boolean }[] = [
  { label: '接口 ID', value: 'admin-workflow-123456' },
  { label: '名称', value: 'admin-register' },
  { label: '版本', value: 'v1' },
  { label: '协议', value: 'HTTP' },
  { label: '请求路径', value: '/api/v1/dev/register/workflows/{flowId}', fullWidth: true },
  { label: '部署方式', value: '集群（集群部署）' },
  { label: '描述', value: 'Imported from MockServer: https://api73.dev:8080/', fullWidth: true },
  { label: '标签', value: '0' },
]

/* ── 详情型 · 节点详情 ── */
const detailGroups = [
  {
    group: '基础信息',
    fields: [
      { label: '实体名称', value: '知识抽取服务' },
      { label: '实体类型', value: '服务节点' },
      { label: '状态', value: '已部署', tag: 'success' as const },
      { label: '创建时间', value: '2026-06-01 14:32' },
    ],
  },
  {
    group: '关联信息',
    fields: [
      { label: '所属图谱', value: '知识抽取与融合' },
      { label: '数据源', value: 'MySQL / api-db-v2' },
      { label: '版本号', value: 'v2.3.1' },
    ],
  },
]

/* ── 配置型 · 高级过滤 ── */
const configItems = [
  { label: '过滤器开关', control: 'switch', value: true },
  { label: '过滤规则', control: 'select', value: '包含' },
  { label: '最大返回数', control: 'input', value: '100' },
  { label: '缓存策略', control: 'select', value: '启用缓存' },
  { label: '超时时间', control: 'input', value: '30' },
]

const MODAL_WIDTHS = { small: 480, medium: 640, large: 900 } as const
const CONTENT_MODAL_CLASS = 'ds-modal-content'

const CONTENT_MODAL_META = {
  form: {
    icon: EditOutlined,
    iconName: 'EditOutlined',
    iconColorClass: 'ds-modal-icon-blue',
    title: '编辑接口服务',
    subtitle: 'Edit API Service',
  },
  detail: {
    icon: EyeOutlined,
    iconName: 'EyeOutlined',
    iconColorClass: 'ds-modal-icon-green',
    title: '节点详情',
    subtitle: 'Node Detail · 实体属性概览',
  },
  config: {
    icon: SettingOutlined,
    iconName: 'SettingOutlined',
    iconColorClass: 'ds-modal-icon-orange',
    title: '高级过滤配置',
    subtitle: 'Advanced Filter Configuration',
  },
} as const

function ContentModalTitle({ template }: { template: ContentTemplate }) {
  const meta = CONTENT_MODAL_META[template]
  const Icon = meta.icon
  return (
    <div className="ds-modal-heading">
      <div className="ds-modal-title-row">
        <Icon className={`ds-modal-title-icon ${meta.iconColorClass}`} />
        <span className="ds-modal-title">{meta.title}</span>
      </div>
      <div className="ds-modal-subtitle">{meta.subtitle}</div>
    </div>
  )
}

function buildFormRows(fields: typeof formFields) {
  const rows: { left: (typeof formFields)[0]; right?: (typeof formFields)[0] }[] = []
  for (let i = 0; i < fields.length; i++) {
    const f = fields[i]
    if (f.fullWidth) {
      rows.push({ left: f })
    } else {
      const next = fields[i + 1]
      if (next && !next.fullWidth) {
        rows.push({ left: f, right: next })
        i++
      } else {
        rows.push({ left: f })
      }
    }
  }
  return rows
}

const FIELD_VALUE_STYLE = `{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, lineHeight: '22px' }`
const FIELD_LABEL_STYLE = `{ fontSize: 13, color: 'var(--ds-text-secondary)', width: 72, flexShrink: 0, textAlign: 'right' }`

function buildFormFieldCode(label: string, value: string, flex: string) {
  return `    <div style={{ flex: ${flex}, display: 'flex', alignItems: 'center', gap: 12 }}>
      <Text style=${FIELD_LABEL_STYLE}>${label}</Text>
      <div style=${FIELD_VALUE_STYLE}>
        ${value}
      </div>
    </div>`
}

function buildFormBodyCode(isSmall: boolean) {
  const rows = buildFormRows(formFields)
  const rowsCode = rows
    .map((row, ri) => {
      const leftFlex = row.right && !isSmall ? 1 : "'1 1 100%'"
      const left = buildFormFieldCode(row.left.label, row.left.value, String(leftFlex))
      const right = row.right
        ? buildFormFieldCode(row.right.label, row.right.value, '1')
        : ''
      return `  <div key={${ri}} style={{ display: 'flex', gap: 16, flexDirection: ${isSmall ? "'column'" : "'row'"} }}>
${left}${right ? `\n${right}` : ''}
  </div>`
    })
    .join('\n')

  return `<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
${rowsCode}
</div>`
}

function buildDetailBodyCode(isSmall: boolean) {
  const groupsCode = detailGroups
    .map((g, gi) => {
      const fieldsCode = g.fields
        .map((f, fi) => {
          const value = f.tag
            ? `<Tag color="success" style={{ margin: 0, fontSize: 12 }}>${f.value}</Tag>`
            : `<Text style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>${f.value}</Text>`
          return `        <div key={${fi}} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 26 }}>
          <Text style={{ fontSize: 14, color: 'var(--ds-text-secondary)', width: 60, flexShrink: 0 }}>${f.label}</Text>
          ${value}
        </div>`
        })
        .join('\n')

      return `    <div key={${gi}}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Text style={{ fontSize: 12, color: 'var(--ds-text-tertiary)', fontWeight: 600 }}>${g.group}</Text>
        <div style={{ flex: 1, height: 1, background: 'var(--ds-divider)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: ${isSmall ? "'1fr'" : "'1fr 1fr'"}, gap: '6px 16px' }}>
${fieldsCode}
      </div>
    </div>`
    })
    .join('\n')

  return `<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
${groupsCode}
</div>`
}

function buildConfigControlCode(control: string, value: string | boolean) {
  switch (control) {
    case 'switch':
      return `<div style={{ width: 40, height: 22, borderRadius: 11, background: 'var(--ds-primary)', position: 'relative', cursor: 'default' }}>
        <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', right: 2, top: 2 }} />
      </div>`
    case 'select':
      return `<div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        ${value}
        <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 10 }}>▼</span>
      </div>`
    case 'input':
      return `<div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13 }}>
        ${value}
      </div>`
    default:
      return ''
  }
}

function buildConfigBodyCode() {
  const itemsCode = configItems
    .map((c, i) => `    <div key={${i}} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', width: 100, flexShrink: 0 }}>${c.label}</Text>
      ${buildConfigControlCode(c.control, c.value)}
    </div>`)
    .join('\n')

  return `<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
${itemsCode}
</div>`
}

function buildContentModalFooterCode(template: ContentTemplate) {
  switch (template) {
    case 'form':
      return `    <>
      <Button onClick={() => setOpenContent(false)}>取消 Cancel</Button>
      <Button type="primary" onClick={() => setOpenContent(false)}>保存 Save</Button>
    </>`
    case 'detail':
      return `    <>
      <Button onClick={() => setOpenContent(false)}>关闭 Close</Button>
      <Button type="primary" onClick={() => setOpenContent(false)}>编辑 Edit</Button>
    </>`
    case 'config':
      return `    <>
      <Button onClick={() => setOpenContent(false)}>重置 Reset</Button>
      <Button type="primary" onClick={() => setOpenContent(false)}>应用配置 Apply</Button>
    </>`
  }
}

function buildNotificationExampleCode(example: (typeof NOTIFICATION_EXAMPLES)[number]) {
  const { kind } = example
  const iconName = NOTIFICATION_ICON_NAMES[kind]
  const okText = NOTIFICATION_DEFAULT_OK_TEXT[kind]
  const dangerProps =
    kind === 'warning' || kind === 'error' ? '\n  okButtonProps: { danger: true },' : ''

  return `modal.${NOTIFICATION_MODAL_METHOD[kind]}({
  className: 'ds-modal-notification',
  width: 420,
  closable: true,
  okCancel: true,
  icon: <${iconName} />,
  title: '${example.title}',
  content: '${example.content}',
  okText: '${okText}',
  cancelText: '取消 Cancel',${dangerProps}
  onOk: () => {},
  onCancel: () => {},
})`
}

function buildNotificationCode() {
  return `/* === 通知弹窗 · 原生 modal + theme 样式 === */
/* 前置：ThemeProvider 已含 notification-modal.css + App + tokens.css */
/* className="ds-modal-notification"；图标色随 modal.warning 等方法自动匹配 */

const { modal } = App.useApp()

${NOTIFICATION_EXAMPLES.map(buildNotificationExampleCode).join('\n\n')}

// 单按钮：okCancel: false, closable: false`
}

function buildContentModalCode(template: ContentTemplate, width: number, isSmall: boolean) {
  const meta = CONTENT_MODAL_META[template]
  const bodyCode =
    template === 'form'
      ? buildFormBodyCode(isSmall)
      : template === 'detail'
        ? buildDetailBodyCode(isSmall)
        : buildConfigBodyCode()

  const templateLabel =
    template === 'form'
      ? '1. 表单型 · Header 带副标题'
      : template === 'detail'
        ? '2. 详情型 · 分组展示'
        : '3. 配置型 · 控件组合'

  return `{/* ── ${templateLabel} ── */}
<Modal
  className="${CONTENT_MODAL_CLASS}"
  open={openContent}
  onCancel={() => setOpenContent(false)}
  width={${width}}
  title={
    <div className="ds-modal-heading">
      <div className="ds-modal-title-row">
        <${meta.iconName} className="ds-modal-title-icon ${meta.iconColorClass}" />
        <span className="ds-modal-title">${meta.title}</span>
      </div>
      <div className="ds-modal-subtitle">${meta.subtitle}</div>
    </div>
  }
  footer={
${buildContentModalFooterCode(template)}
  }
>
  ${bodyCode}
</Modal>`
}

function buildAllContentModalCode(template: ContentTemplate, width: number, isSmall: boolean) {
  return `{/* === 内容弹窗模板（三段式 Header + Body + Footer）=== */}
{/* 加 className="${CONTENT_MODAL_CLASS}" 启用 modal.css 统一样式 */}

${buildContentModalCode(template, width, isSmall)}`
}

function buildModalCode(
  theme: 'dark' | 'light',
  width: number,
  isSmall: boolean,
  contentTemplate: ContentTemplate,
) {
  const themeHeader = theme === 'dark'
    ? `// 弹窗 (Modal) · 暗色主题
// 通知弹窗：className="ds-modal-notification" + modal.confirm / warning / success / error
// 内容弹窗：className="${CONTENT_MODAL_CLASS}" + modal.css 统一头尾样式`
    : `// 弹窗 (Modal) · 亮色主题
// 通知弹窗：className="ds-modal-notification" + modal.confirm / warning / success / error
// 内容弹窗：className="${CONTENT_MODAL_CLASS}" + modal.css 统一头尾样式`

  return `${themeHeader}
import { App, Modal, Button, Typography, Tag } from '@insightst-design/ui'
import {
  ExclamationCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  SettingOutlined,
} from '@insightst-design/icons'

const { Text } = Typography

${buildNotificationCode()}

${buildAllContentModalCode(contentTemplate, width, isSmall)}`
}

export default function ModalPlayground() {
  const { modal } = App.useApp()
  const [openContent, setOpenContent] = useState(false)
  const [contentSize, setContentSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [contentTemplate, setContentTemplate] = useState<ContentTemplate>('form')

  const notificationModalMeta: Record<
    NotificationKind,
    { icon: typeof ExclamationCircleOutlined; color: string; desc: string }
  > = {
    confirm: {
      icon: ExclamationCircleOutlined,
      color: 'var(--ds-primary)',
      desc: '需要用户确认的操作',
    },
    warning: {
      icon: WarningOutlined,
      color: 'var(--ds-warning)',
      desc: '提醒用户潜在风险',
    },
    success: {
      icon: CheckCircleOutlined,
      color: 'var(--ds-success)',
      desc: '展示重要信息',
    },
    error: {
      icon: CloseCircleOutlined,
      color: 'var(--ds-danger)',
      desc: '操作失败的提示',
    },
  }

  const modals = NOTIFICATION_EXAMPLES.map((example) => {
    const meta = notificationModalMeta[example.kind]
    return {
      key: example.kind === 'success' ? 'info' : example.kind,
      title: example.title,
      ...meta,
      open: () =>
        openNotificationModal(modal, example.kind, {
          title: example.title,
          content: example.content,
        }),
    }
  })

  const formRows = buildFormRows(formFields)
  const isSmallContent = contentSize === 'small'
  const modalWidth = MODAL_WIDTHS[contentSize]
  const darkCode = useMemo(
    () => buildModalCode('dark', modalWidth, isSmallContent, contentTemplate),
    [modalWidth, isSmallContent, contentTemplate],
  )
  const lightCode = useMemo(
    () => buildModalCode('light', modalWidth, isSmallContent, contentTemplate),
    [modalWidth, isSmallContent, contentTemplate],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ═══ 通知弹窗 · 基础反馈 ═══ */}
      <div style={{ padding: 16, borderRadius: 8, background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-primary)' }} />
          <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>通知弹窗 Notification Modal</Text>
        </div>
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
          最基础的操作反馈弹窗 · 四种语义色区分场景 · 支持 confirm/warning/success/error
        </Text>

        <Space wrap>
          {modals.map((m) => {
            const Icon = m.icon
            return (
            <Button
              key={m.key}
              onClick={m.open}
              icon={<Icon style={{ color: m.color }} />}
              style={{
                background: `${m.color}15`,
                color: m.color,
                borderColor: `${m.color}30`,
              }}
            >
              {m.title}
            </Button>
            )
          })}
        </Space>
      </div>

      {/* ═══ 内容弹窗 · 三段式模板 ═══ */}
      <div style={{ padding: 16, borderRadius: 8, background: 'var(--ds-bg-card)', border: '1px solid var(--ds-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--ds-success)' }} />
          <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>内容弹窗 Content Templates</Text>
        </div>
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
          三段式结构 · Header（标题 + 可选副标题）· Body（内容模板）· Footer（操作按钮）
        </Text>

        {/* ── 工具栏：选模板 → 选尺寸 → 打开弹窗 ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>模板</Text>
              {/* 分类标签 — 规范：bg-input 容器 + 28px 高 + 蓝底激活 */}
              <div role="tablist" style={{ display: 'inline-flex', gap: 8, padding: 4, background: 'var(--ds-bg-input)', borderRadius: 6, border: '1px solid var(--ds-border)' }}>
                {[
                  { key: 'form', label: <span><EditOutlined /> 表单型</span> },
                  { key: 'detail', label: <span><EyeOutlined /> 详情型</span> },
                  { key: 'config', label: <span><SettingOutlined /> 配置型</span> },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setContentTemplate(t.key as ContentTemplate)}
                    style={{
                      height: 28, padding: '0 10px', fontSize: 12, fontWeight: contentTemplate === t.key ? 500 : 400,
                      background: contentTemplate === t.key ? 'var(--ds-primary)' : 'transparent',
                      color: contentTemplate === t.key ? 'var(--ds-text-inverse)' : 'var(--ds-text-secondary)',
                      borderRadius: 4, border: 'none', cursor: 'pointer',
                    }}
                  >{t.label}</button>
                ))}
              </div>
            </div>
            <div style={{ width: 1, height: 20, background: 'var(--ds-divider)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Text style={{ fontSize: 12, color: 'var(--ds-text-secondary)' }}>尺寸</Text>
              <div role="tablist" style={{ display: 'inline-flex', gap: 8, padding: 4, background: 'var(--ds-bg-input)', borderRadius: 6, border: '1px solid var(--ds-border)' }}>
                {[
                  { key: 'small', label: '小 480' },
                  { key: 'medium', label: '中 640' },
                  { key: 'large', label: '大 900' },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setContentSize(s.key as 'small' | 'medium' | 'large')}
                    style={{
                      height: 28, padding: '0 10px', fontSize: 12, fontWeight: contentSize === s.key ? 500 : 400,
                      background: contentSize === s.key ? 'var(--ds-primary)' : 'transparent',
                      color: contentSize === s.key ? 'var(--ds-text-inverse)' : 'var(--ds-text-secondary)',
                      borderRadius: 4, border: 'none', cursor: 'pointer',
                    }}
                  >{s.label}</button>
                ))}
              </div>
            </div>
          </div>
          <Button type="primary" icon={<FormOutlined />} onClick={() => setOpenContent(true)}>
            打开内容弹窗
          </Button>
        </div>

        {/* ── Mock 弹窗预览（仅示意，真实效果点上方按钮） ── */}
        <div style={{ width: contentSize === 'small' ? 480 : contentSize === 'medium' ? 640 : 900, background: 'var(--ds-bg-card)', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--ds-border)' }}>
          <div className="ds-modal-header">
            <ContentModalTitle template={contentTemplate} />
            {/* mock 静态预览：与 antd Modal 关闭图标一致，不可点击 */}
            <CloseOutlined className="ds-modal-close ds-modal-close--static" aria-hidden />
          </div>

          <div className="ds-modal-body" style={{ minHeight: contentTemplate === 'form' ? 340 : contentTemplate === 'detail' ? 300 : 280 }}>

            {/* ── 表单型 Form · 两列网格 + 通栏 ── */}
            {contentTemplate === 'form' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {formRows.map((row, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: 16, flexDirection: isSmallContent ? 'column' : 'row' }}>
                    <div style={{ flex: (row.right && !isSmallContent) ? 1 : '1 1 100%', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', width: 72, flexShrink: 0, textAlign: 'right' }}>{row.left.label}</Text>
                      <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, lineHeight: '22px', minHeight: 22 }}>
                        {row.left.value}
                      </div>
                    </div>
                    {row.right && (
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', width: 72, flexShrink: 0, textAlign: 'right' }}>{row.right.label}</Text>
                        <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, lineHeight: '22px', minHeight: 22 }}>
                          {row.right.value}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── 详情型 Detail · 紧凑双列网格 ── */}
            {contentTemplate === 'detail' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {detailGroups.map((g, gi) => (
                  <div key={gi}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <Text style={{ fontSize: 12, color: 'var(--ds-text-tertiary)', fontWeight: 600 }}>{g.group}</Text>
                      <div style={{ flex: 1, height: 1, background: 'var(--ds-divider)' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isSmallContent ? '1fr' : '1fr 1fr', gap: '6px 16px' }}>
                      {g.fields.map((f, fi) => (
                        <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 26 }}>
                          <Text style={{ fontSize: 14, color: 'var(--ds-text-secondary)', width: 60, flexShrink: 0 }}>{f.label}</Text>
                          {f.tag ? (
                            <Tag color="success" style={{ margin: 0, fontSize: 12 }}>{f.value}</Tag>
                          ) : (
                            <Text style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>{f.value}</Text>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── 配置型 Config ── */}
            {contentTemplate === 'config' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {configItems.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', width: 100, flexShrink: 0 }}>{c.label}</Text>
                    {c.control === 'switch' && (
                      <div style={{ width: 40, height: 22, borderRadius: 11, background: 'var(--ds-primary)', position: 'relative', cursor: 'default' }}>
                        <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', right: 2, top: 2 }} />
                      </div>
                    )}
                    {c.control === 'select' && (
                      <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {String(c.value)}
                        <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 10 }}>▼</span>
                      </div>
                    )}
                    {c.control === 'input' && (
                      <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13 }}>
                        {String(c.value)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>

          <div className="ds-modal-footer">
            {contentTemplate === 'form' && <>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'transparent', color: 'var(--ds-text-primary)', borderRadius: 6, border: '1px solid var(--ds-border-muted)', cursor: 'default' }}>取消 Cancel</button>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)', borderRadius: 6, border: 'none', cursor: 'default' }}>保存 Save</button>
            </>}
            {contentTemplate === 'detail' && <>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'transparent', color: 'var(--ds-text-primary)', borderRadius: 6, border: '1px solid var(--ds-border-muted)', cursor: 'default' }}>关闭 Close</button>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)', borderRadius: 6, border: 'none', cursor: 'default' }}>编辑 Edit</button>
            </>}
            {contentTemplate === 'config' && <>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'transparent', color: 'var(--ds-text-primary)', borderRadius: 6, border: '1px solid var(--ds-border-muted)', cursor: 'default' }}>重置 Reset</button>
              <button style={{ height: 36, padding: '0 16px', fontSize: 14, fontWeight: 500, background: 'var(--ds-primary)', color: 'var(--ds-text-inverse)', borderRadius: 6, border: 'none', cursor: 'default' }}>应用配置 Apply</button>
            </>}
          </div>
        </div>
      </div>

      <Modal
        className={CONTENT_MODAL_CLASS}
        open={openContent}
        onCancel={() => setOpenContent(false)}
        width={modalWidth}
        title={<ContentModalTitle template={contentTemplate} />}
        footer={
          contentTemplate === 'form' ? (
            <>
              <Button onClick={() => setOpenContent(false)}>取消 Cancel</Button>
              <Button type="primary" onClick={() => setOpenContent(false)}>保存 Save</Button>
            </>
          ) : contentTemplate === 'detail' ? (
            <>
              <Button onClick={() => setOpenContent(false)}>关闭 Close</Button>
              <Button type="primary" onClick={() => setOpenContent(false)}>编辑 Edit</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setOpenContent(false)}>重置 Reset</Button>
              <Button type="primary" onClick={() => setOpenContent(false)}>应用配置 Apply</Button>
            </>
          )
        }
      >
        {contentTemplate === 'form' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {formRows.map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 16, flexDirection: isSmallContent ? 'column' : 'row' }}>
                <div style={{ flex: (row.right && !isSmallContent) ? 1 : '1 1 100%', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', width: 72, flexShrink: 0, textAlign: 'right' }}>{row.left.label}</Text>
                  <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, lineHeight: '22px' }}>
                    {row.left.value}
                  </div>
                </div>
                {row.right && (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', width: 72, flexShrink: 0, textAlign: 'right' }}>{row.right.label}</Text>
                    <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, lineHeight: '22px' }}>
                      {row.right.value}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {contentTemplate === 'detail' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {detailGroups.map((g, gi) => (
              <div key={gi}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Text style={{ fontSize: 12, color: 'var(--ds-text-tertiary)', fontWeight: 600 }}>{g.group}</Text>
                  <div style={{ flex: 1, height: 1, background: 'var(--ds-divider)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isSmallContent ? '1fr' : '1fr 1fr', gap: '6px 16px' }}>
                  {g.fields.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 26 }}>
                      <Text style={{ fontSize: 14, color: 'var(--ds-text-secondary)', width: 60, flexShrink: 0 }}>{f.label}</Text>
                      {f.tag ? (
                        <Tag color="success" style={{ margin: 0, fontSize: 12 }}>{f.value}</Tag>
                      ) : (
                        <Text style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>{f.value}</Text>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {contentTemplate === 'config' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {configItems.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Text style={{ fontSize: 13, color: 'var(--ds-text-secondary)', width: 100, flexShrink: 0 }}>{c.label}</Text>
                {c.control === 'switch' && (
                  <div style={{ width: 40, height: 22, borderRadius: 11, background: 'var(--ds-primary)', position: 'relative', cursor: 'default' }}>
                    <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', position: 'absolute', right: 2, top: 2 }} />
                  </div>
                )}
                {c.control === 'select' && (
                  <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {String(c.value)}
                    <span style={{ color: 'var(--ds-text-tertiary)', fontSize: 10 }}>▼</span>
                  </div>
                )}
                {c.control === 'input' && (
                  <div style={{ flex: 1, padding: '6px 12px', borderRadius: 6, background: 'var(--ds-bg-input)', border: '1px solid var(--ds-border)', color: 'var(--ds-text-primary)', fontSize: 13 }}>
                    {String(c.value)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Modal>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </div>
  )
}
