import { useState } from 'react'
import { Tag, Typography, Segmented, CardPro, StatCard, message } from '@insightst-design/ui'
import type { CardProProps, StatCardProps } from '@insightst-design/ui'
import {
  FileTextOutlined,
  ClockCircleOutlined,
  UserOutlined,
  RiseOutlined,
  EditOutlined,
  CopyOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from '@insightst-design/icons'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  buildThemeCode,
} from './playgroundLayout'

const { Text } = Typography

const platforms = [
  { value: 'all', label: '全部' },
  { value: 'ai', label: 'AI 平台' },
  { value: 'graph', label: '图谱平台' },
  { value: 'data', label: '数据平台' },
] as const

function bindCardActions(title: string) {
  return {
    onEdit: () => message.info(`编辑：${title}`),
    onDelete: () => message.warning(`删除：${title}`),
  }
}

const modelCards: Extract<CardProProps, { variant: 'model' }>[] = [
  {
    variant: 'model',
    title: '通义千问3-VL-8B-Instruct',
    description: '支持图像、视频等多模态输入的视觉语言大模型，适用于图文理解、视觉问答、文档解析等场景',
    status: { label: '已完成', tone: 'success' },
    meta: { creator: '张三', time: '2025-08-20' },
    visibility: true,
    tags: [
      { label: '多模态', icon: <InfoCircleOutlined /> },
      { label: '视觉问答', icon: <SearchOutlined /> },
      { label: '文档解析', icon: <FileTextOutlined /> },
      { label: '文档解析', icon: <FileTextOutlined /> },
      { label: '文档解析', icon: <FileTextOutlined /> },
    ],
    otherTags: [
      { label: '参数量', icon: <RiseOutlined />, value: '8B' },
      { label: '上下文', value: '128K' },
      { label: '开源', value: '是' },
      { label: '许可', value: 'Apache-2.0' },
      { label: '框架', value: 'PyTorch' },
    ],
  },
  {
    variant: 'model',
    title: 'DeepSeek-V3-0324',
    description: 'DeepSeek 最新版本大语言模型，支持 128K 上下文窗口，在代码生成、数学推理等任务上表现优异',
    status: { label: '审核中', tone: 'warning' },
    meta: { creator: '李四', time: '2025-08-19' },
    visibility: false,
    tags: [
      { label: '代码生成', icon: <EditOutlined /> },
      { label: '数学推理', icon: <RiseOutlined /> },
      { label: '对话', icon: <UserOutlined /> },
      { label: '创作', icon: <FileTextOutlined /> },
      { label: '翻译', icon: <CopyOutlined /> },
    ],
  },
  {
    variant: 'model',
    title: 'GLM-4-9B-Chat',
    description: '智谱 AI 推出的开源大语言对话模型，支持 128K 上下文，适用于多轮对话和复杂指令场景',
    status: { label: '草稿', tone: 'neutral' },
    meta: { creator: '王五', time: '2025-08-18' },
  },
  {
    variant: 'model',
    title: 'Llama-3.1-70B-Instruct',
    description: 'Meta 开源大语言模型指令微调版本，支持多语言对话、代码生成等任务',
    status: { label: '已下线', tone: 'danger' },
    meta: { creator: '赵六', time: '2025-08-17' },
    muted: true,
  },
  {
    variant: 'model',
    title: 'Qwen3-0.6B-Instruct（无描述无标签）',
    // description 和 tags 均缺省，验证 metaRow 自动沉底
    status: { label: '已完成', tone: 'success' },
    meta: { creator: '测试账号', time: '2025-08-15' },
    visibility: true,
  },
  {
    variant: 'model',
    title: 'Qwen-Custom-Deploy',
    description: '自定义 tone 示例：color 控制标签文字/背景，bar 控制 model / entity 顶部 3px 色条',
    status: {
      label: '自定义颜色',
      tone: { color: '#b37feb', bg: 'rgba(114, 46, 209, 0.18)', bar: '#722ed1' },
    },
    meta: { creator: '设计系统', time: '2025-08-16' },
  },
]

const statCards: StatCardProps[] = [
  { label: '模型总数', value: '128', icon: <FileTextOutlined />, tone: 'primary' },
  { label: '已部署', value: '96', icon: <CheckCircleOutlined />, tone: 'success' },
  { label: '运行中任务', value: '23', icon: <ClockCircleOutlined />, tone: 'warning' },
  {
    label: '异常告警',
    value: '3',
    icon: <ExclamationCircleOutlined />,
    tone: 'danger',
    valueColor: 'var(--ds-danger)',
  },
  {
    label: '自定义图标颜色和底色',
    value: '99',
    icon: <InfoCircleOutlined />,
    tone: { color: '#b37feb', bg: 'rgba(114, 46, 209, 0.18)' },
  },
]

const marketCards: Extract<CardProProps, { variant: 'market' }>[] = [
  {
    variant: 'market',
    title: '通义千问3-VL-8B-Instruct',
    status: { label: '已上线', tone: 'success' },
    id: 'qwen3-vl-8b',
    description: '此仓库包含我们的 Tl2V-5B 模型，该模型使用先进的 Wan2.2-VAE 构建，实现了 16×16×4 的压缩比。该模型支持...',
    tags: [
      { label: 'TTS', icon: <InfoCircleOutlined /> },
      { label: '文档', icon: <FileTextOutlined /> },
      { label: 'sentence-transformers', icon: <RiseOutlined /> },
      { label: '表格', icon: <FileTextOutlined /> },
      { label: '搜索增强生成RAG', icon: <SearchOutlined /> },
      { label: '问答', icon: <UserOutlined /> },
    ],
    meta: { creator: '张三', time: '2025-10-12' },
    visibility: true,
    downloads: 12800,
  },
  {
    variant: 'market',
    title: 'DeepSeek-V3-0324',
    status: { label: '审核中', tone: 'warning' },
    id: 'deepseek-v3-0324',
    description: 'DeepSeek 最新大语言模型，支持多轮对话、代码生成、数学推理、文本创作等任务，上下文窗口 128K...',
    tags: [
      { label: '对话', icon: <UserOutlined /> },
      { label: '代码', icon: <EditOutlined /> },
      { label: '推理', icon: <InfoCircleOutlined /> },
      { label: '创作', icon: <FileTextOutlined /> },
      { label: '翻译', icon: <CopyOutlined /> },
    ],
    meta: { creator: '李四', time: '2025-09-28' },
    visibility: false,
    downloads: 8300,
  },
  {
    variant: 'market',
    title: 'GLM-4-9B-Chat（关联信息）',
    status: { label: '已上线', tone: 'success' },
    id: 'glm-4-9b-chat',
    description: '智谱 AI 开源对话模型，支持 128K 上下文，适用于多轮对话和复杂指令跟随场景...',
    tags: [
      { label: '可用文档数', value: 2 },
      { label: '关联应用数', value: 2 },
    ],
    meta: { creator: '王五', time: '2025-09-15' },
    visibility: true,
  },
  {
    variant: 'market',
    title: 'Llama-3.1-70B-Instruct',
    status: { label: '已下线', tone: 'danger' },
    id: 'llama-3.1-70b',
    description: 'Meta 开源大语言模型指令微调版本，支持多语言对话、代码生成等任务...',
    tags: [
      { label: '对话', icon: <UserOutlined /> },
      { label: '代码', icon: <EditOutlined /> },
    ],
    meta: { creator: '赵六', time: '2025-08-20' },
  },
  {
    variant: 'market',
    title: 'Embed-v3-small（无描述无标签）',
    status: { label: '已上线', tone: 'success' },
    id: 'embed-v3-small',
    // description 和 tags 均缺省，验证 metaRow 自动沉底
    meta: { creator: '示例账号', time: '2025-08-10' },
    visibility: false,
  },
  {
    variant: 'market',
    title: 'Qwen3-235B-A22B（多标签示例）',
    status: { label: '已上线', tone: 'success' },
    id: 'qwen3-235b-a22b',
    description: '通义千问3最新旗舰混合专家模型，参数量 235B，激活参数 22B，支持 128K 上下文，在推理、代码、多语言等任务上表现卓越...',
    tags: [
      { label: '对话', icon: <UserOutlined /> },
      { label: '代码', icon: <EditOutlined /> },
      { label: '推理', icon: <InfoCircleOutlined /> },
      { label: '多语言', icon: <CopyOutlined /> },
      { label: 'TTS', icon: <InfoCircleOutlined /> },
      { label: '文档', icon: <FileTextOutlined /> },
      { label: 'sentence-transformers', icon: <RiseOutlined /> },
      { label: '表格', icon: <FileTextOutlined /> },
      { label: '搜索增强生成RAG', icon: <SearchOutlined /> },
      { label: '问答', icon: <UserOutlined /> },
      { label: '数学', icon: <RiseOutlined /> },
      { label: '创作', icon: <EditOutlined /> },
      { label: '翻译', icon: <CopyOutlined /> },
      { label: '摘要', icon: <FileTextOutlined /> },
      { label: '分类', icon: <CheckCircleOutlined /> },
    ],
    meta: { creator: '系统', time: '2025-11-01' },
    visibility: true,
    downloads: 99500,
  },
]

const entityCards: Extract<CardProProps, { variant: 'entity' }>[] = [
  {
    variant: 'entity',
    title: '通义千问3-VL-8B-Instruct',
    domain: '通用领域',
    status: { label: '已上线', tone: 'success' },
    stats: [
      { label: '概念', value: 63 },
      { label: '关系', value: 63 },
      { label: '版本', value: 63 },
    ],
    meta: { creator: '创建者ID', time: '14 小时前' },
  },
  {
    variant: 'entity',
    title: 'DeepSeek-V3',
    domain: 'AI模型',
    status: { label: '审核中', tone: 'warning' },
    stats: [
      { label: '概念', value: 41 },
      { label: '关系', value: 28 },
      { label: '版本', value: 12 },
    ],
    meta: { creator: '创建者ID', time: '3 天前' },
  },
  {
    variant: 'entity',
    title: 'GLM-4-9B',
    domain: '通用领域',
    status: { label: '草稿', tone: 'neutral' },
    stats: [
      { label: '概念', value: 19 },
      { label: '关系', value: 8 },
      { label: '版本', value: 3 },
    ],
    meta: { creator: '创建者ID', time: '1 周前' },
  },
]

const datasetCards: Extract<CardProProps, { variant: 'dataset' }>[] = [
  {
    variant: 'dataset',
    title: 'Sentinel-3 OLCI EFR：海洋和陆地颜色仪器',
    description: 'Landsat 9 是美国陆地卫星计划的第九颗卫星，于 2021年9月27日从加利福尼亚州范登堡空军基地发射成...',
    temporal: '2021 至今',
    tags: ['USGS', 'Landsat', 'OLI/TIRS', '中国', '16天', 'Reflectance'],
    coverGradient: 'linear-gradient(135deg, #1a3a5c, #1e4d6e, #0d2137)',
  },
  {
    variant: 'dataset',
    title: '全球人口密度栅格数据（2025）',
    description: '基于 WorldPop 项目的最新人口分布估算数据，空间分辨率 100m，覆盖全球陆地范围，采用随机森林模型...',
    temporal: '2025',
    tags: ['WorldPop', '100m', '全球', 'GeoTIFF'],
    coverGradient: 'linear-gradient(135deg, #2d1a3c, #3d2454, #1a0d28)',
  },
]

const cardProCode = `import { CardPro, Modal, message } from '@insightst-design/ui'

{/* ① 模型内容卡片 · visibility 公有/私有 + tags */}
<CardPro
  variant="model"
  title="通义千问3-VL-8B-Instruct"
  description="支持图像、视频等多模态输入..."
  status={{ label: '已完成', tone: 'success' }}
  meta={{ creator: '张三', time: '2025-08-20' }}
  visibility={true}   // true=公有  false=私有
  tags={[
    { label: '多模态', icon: <InfoCircleOutlined /> },
    { label: '视觉问答', icon: <SearchOutlined /> },
    { label: '文档解析', icon: <FileTextOutlined /> },
  ]}
  otherTags={[
    { label: '参数量', icon: <RiseOutlined />, value: '8B' },
    { label: '上下文', value: '128K' },
    { label: '开源', value: '是' },
    { label: '许可', value: 'Apache-2.0' },
    { label: '框架', value: 'PyTorch' },  // 超出 3 个时 +N，hover 展示更多
  ]}
  onEdit={() => navigate('/models/qwen3-vl-8b/edit')}
  onDelete={() => Modal.confirm({ title: '确认删除？', onOk: () => deleteModel('qwen3-vl-8b') })}
/>

{/* ② 市场卡片 · visibility + downloads */}
<CardPro
  variant="market"
  title="通义千问3-VL-8B-Instruct"
  id="qwen3-vl-8b"
  status={{ label: '已上线', tone: 'success' }}
  description="此仓库包含我们的 Tl2V-5B 模型..."
  tags={[
    { label: 'TTS', icon: <InfoCircleOutlined /> },
    { label: '文档', icon: <FileTextOutlined /> },
    { label: 'sentence-transformers', icon: <RiseOutlined /> },
    { label: '表格', icon: <FileTextOutlined /> },
    { label: '搜索增强生成RAG', icon: <SearchOutlined /> },  // Popover 展示超出的标签
    { label: '问答', icon: <UserOutlined /> },
  ]}
  meta={{ creator: '张三', time: '2025-10-12' }}
  visibility={true}
  downloads={12800}  // 自动格式化为 12.8K
  onEdit={() => {}}
  onDelete={() => {}}
/>

{/* ③ 市场卡片 · CardProMarketTag 含 value → 以 "label: value | ..." 文本渲染 */}
<CardPro
  variant="market"
  title="GLM-4-9B-Chat（关联信息）"
  id="glm-4-9b-chat"
  status={{ label: '已上线', tone: 'success' }}
  description="智谱 AI 开源对话模型..."
  tags={[
    { label: '可用文档数', value: 2 },
    { label: '关联应用数', value: 2 },
  ]}
  meta={{ creator: '王五', time: '2025-09-15' }}
  visibility={true}
  onEdit={() => {}}
  onDelete={() => {}}
/>

{/* ④ description / tags 均可省略 · MetaRow 始终固定底部 */}
<CardPro
  variant="model"
  title="Qwen3-0.6B-Instruct（无描述无标签）"
  status={{ label: '已完成', tone: 'success' }}
  meta={{ creator: '测试账号', time: '2025-08-15' }}
  visibility={true}
  // description 省略 → 不占空间
  // tags 省略   → 不占空间
  // MetaRow 仍然自动保持在卡片底部
/>

<CardPro
  variant="market"
  title="Embed-v3-small（无描述无标签）"
  status={{ label: '已上线', tone: 'success' }}
  id="embed-v3-small"
  meta={{ creator: '示例账号', time: '2025-08-10' }}
  visibility={false}
/>

{/* ⑤ 自定义 tone · color / bg / bar */}
<CardPro
  variant="model"
  title="Qwen-Custom-Deploy"
  description="自定义 tone 示例..."
  status={{
    label: '自定义颜色',
    tone: { color: '#b37feb', bg: 'rgba(114, 46, 209, 0.18)', bar: '#722ed1' },
  }}
  meta={{ creator: '设计系统', time: '2025-08-16' }}
  onEdit={() => {}}
  onDelete={() => {}}
/>

{/* ⑥ 实体卡片 · 自定义菜单 + onMenuClick */}
<CardPro
  variant="entity"
  title="通义千问3-VL-8B-Instruct"
  domain="通用领域"
  status={{ label: '已上线', tone: 'success' }}
  stats={[{ label: '概念', value: 63 }]}
  meta={{
    creator: '创建者ID',
    time: '14 小时前',
    menuItems: [
      { key: 'edit', label: '编辑' },
      { key: 'share', label: '分享' },
      { key: 'delete', label: '删除', danger: true },
    ],
    onMenuClick: ({ key }) => {
      if (key === 'edit') navigate('/edit')
      if (key === 'delete') Modal.confirm({ title: '确认删除？', onOk: deleteItem })
    },
  }}
/>

{/* ⑦ 数据集卡片 */}
<CardPro
  variant="dataset"
  title="Sentinel-3 OLCI EFR"
  description="Landsat 9 是美国陆地卫星计划..."
  temporal="2021 至今"
  tags={['USGS', 'Landsat', 'OLI/TIRS']}
  coverGradient="linear-gradient(135deg, #1a3a5c, #1e4d6e, #0d2137)"
/>`

const statCardCode = `// 统计数字卡片 · StatCard
import { StatCard } from '@insightst-design/ui'
import { FileTextOutlined, InfoCircleOutlined } from '@insightst-design/icons'

<StatCard
  value="128"
  label="模型总数"
  icon={<FileTextOutlined />}
  tone="primary"
/>

{/* 自定义 tone · color / bg 控制圆形图标色 */}
<StatCard
  value="99"
  label="自定义"
  icon={<InfoCircleOutlined />}
  tone={{ color: '#b37feb', bg: 'rgba(114, 46, 209, 0.18)' }}
/>`

function SectionHeader({
  accent,
  title,
  badge,
  desc,
}: {
  accent: string
  title: string
  badge: string
  desc: string
}) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 3, height: 16, borderRadius: 2, background: accent }} />
        <Text strong style={{ fontSize: 14, color: 'var(--ds-text-primary)' }}>{title}</Text>
        <Tag style={{ fontSize: 11, color: 'var(--ds-neutral)', background: 'var(--ds-neutral-bg)', border: 'none' }}>{badge}</Tag>
      </div>
      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
        {desc}
      </Text>
    </>
  )
}

export default function CardPlayground() {
  const [platform, setPlatform] = useState<string | number>('all')
  const show = (p: string) => platform === 'all' || platform === p

  const allCode = [cardProCode, statCardCode].join('\n\n')
  const { darkCode, lightCode } = buildThemeCode('卡片 (CardPro / StatCard)', allCode)

  return (
    <PlaygroundRoot>
      <PlaygroundHeader hint="CardPro 业务卡片 · variant 区分 4 种模式；统计卡见 StatCard" />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Text type="secondary" style={{ fontSize: 13 }}>平台筛选：</Text>
        <Segmented
          value={platform}
          onChange={setPlatform}
          options={platforms.map(p => ({ value: String(p.value), label: p.label }))}
          style={{
            background: 'var(--ds-bg-card)',
            border: '1px solid var(--ds-border)',
            borderRadius: 'var(--radius)',
            padding: 4,
          }}
        />
      </div>

      {show('ai') && (
        <>
          <div>
            <SectionHeader
              accent="var(--ds-primary)"
              title="AI 平台 · 模型内容卡片"
              badge="variant=&quot;model&quot;"
              desc="顶部 3px 色条区分状态（预设 success / warning / neutral / danger，或 tone 对象自定义 color / bg / bar）；visibility 可选，true=公有 false=私有，显示在状态标签前"
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {modelCards.map((card) => (
                <CardPro key={card.title} {...card} {...bindCardActions(card.title)} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              accent="var(--ds-success)"
              title="AI 平台 · 统计数字卡片"
              badge="StatCard"
              desc="左侧圆形图标 + 右侧标题 + 大数字(28px/600)；tone 支持 primary / success / warning / danger 或 { color, bg? } 自定义"
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {statCards.map((card, index) => (
                <StatCard key={typeof card.label === 'string' ? card.label : index} {...card} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              accent="var(--ds-warning)"
              title="AI 平台 · 市场功能卡片"
              badge="variant=&quot;market&quot;"
              desc="visibility（公有/私有）+ 状态标签 + ID（内置 copyable）+ 描述 + 功能标签组（超出 3 个时 Popover 展示纯文本，最大宽 500px 换行）+ 下载数（≥1000 自动转 K/M）；tags 含 value 时整体以 label: value | ... 文本渲染"
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {marketCards.map((card) => (
                <CardPro key={card.title} {...card} {...bindCardActions(card.title)} />
              ))}
            </div>
          </div>
        </>
      )}

      {show('graph') && (
        <div>
          <SectionHeader
            accent="var(--ds-primary)"
            title="图谱平台 · 实体卡片"
            badge="variant=&quot;entity&quot;"
            desc="标题 + 领域标签 + 状态标签(R) + 三列统计(概念/关系/版本) + 创建者 + 更新时间"
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {entityCards.map((card) => (
              <CardPro key={card.title} {...card} {...bindCardActions(card.title)} />
            ))}
          </div>
        </div>
      )}

      {show('data') && (
        <div>
          <SectionHeader
            accent="var(--ds-success)"
            title="数据平台 · 数据集卡片"
            badge="variant=&quot;dataset&quot;"
            desc="顶部封面图 + 标题 + 描述(2行截断) + 时相信息 + 底部标签组(Chips)"
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {datasetCards.map((card) => (
              <CardPro key={card.title} {...card} />
            ))}
          </div>
        </div>
      )}

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
