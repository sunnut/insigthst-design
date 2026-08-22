import { useState, type Key } from 'react'
import { Table, Tag, Button, Space, Typography, Segmented } from '@insightst-design/ui'
import type { TableColumnsType } from '@insightst-design/ui'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundSection,
  buildThemeCode,
} from './playgroundLayout'

const { Text } = Typography

interface DataType {
  key: number
  name: string
  field: string
  status: string
  papers: number
  time: string
}

const TABLE_SCROLL_X = 280 + 100 + 100 + 140 + 120 + 170 + 48
const TABLE_DEMO_WIDTH = 800

const initialData: DataType[] = [
  { key: 1, name: '基于U-Net深度学习网络的风速预报订正...', field: '气象', status: '进行中', papers: 0, time: '2025-08-20' },
  { key: 2, name: '一种融合大语言模型与知识图谱的电力数据...', field: '金融', status: '待确认', papers: 1, time: '2025-08-20' },
  { key: 3, name: '复杂地形风场多尺度耦合的地形边界效应研究...', field: '医疗', status: '草稿', papers: 3, time: '2025-08-20' },
  { key: 4, name: '基于注意力机制的遥感图像语义分割方法...', field: '计算机', status: '已完成', papers: 7, time: '2025-08-19' },
]

function getStatusColor(status: string) {
  switch (status) {
    case '进行中': return 'processing'
    case '待确认': return 'warning'
    case '草稿': return 'default'
    case '已完成': return 'success'
    default: return 'default'
  }
}

const tableTokenComment = `// 颜色通过 Ant Design theme token 注入，映射到 CSS 变量：
//   headerBg: 'var(--ds-bg-elevated)'          → 表头背景
//   headerColor: 'var(--ds-text-secondary)'     → --ant-table-header-color  表头文字
//   borderColor: 'var(--ds-border)'             → 描边/分割线
//   rowHoverBg: 'var(--ds-bg-elevated)'         → 暗色行悬停 / 亮色 #f8f9fc
//   rowSelectedBg: color-mix(primary, bg-card)  → 选中行（不透明，避免 fixed 列叠字）
//   cellPaddingBlock: 12px · cellPaddingInline: 16px
//   单元格文字: var(--ds-text-primary) · 链接: var(--ds-text-link) / var(--ds-danger)`

function buildTableCode(size: 'small' | 'middle' | 'large', bordered: boolean) {
  return `${tableTokenComment}
import { useState } from 'react'
import { Table, Tag, Button, Space } from '@insightst-design/ui'

const data = [
  { key: 1, name: '任务名称示例', field: '气象', status: '进行中', papers: 0, time: '2025-08-20' },
  { key: 2, name: '另一条任务', field: '金融', status: '已完成', papers: 7, time: '2025-08-19' },
]

function TaskTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])

  const columns = [
    { title: '任务名称', dataIndex: 'name', width: 280, ellipsis: true },
    { title: '领域', dataIndex: 'field', width: 100 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={
          status === '进行中' ? 'processing'
          : status === '待确认' ? 'warning'
          : status === '已完成' ? 'success' : 'default'
        }>{status}</Tag>
      ),
    },
    {
      title: '文献数',
      dataIndex: 'papers',
      width: 140,
      sorter: (a, b) => a.papers - b.papers,
    },
    { title: '更新时间', dataIndex: 'time', width: 120 },
    {
      title: '操作',
      key: 'action',
      width: 170,
      fixed: 'right',
      render: () => (
        <Space>
          <Button type="link" size="small" style={{ padding: 0 }}>查看</Button>
          <Button type="link" size="small" danger style={{ padding: 0 }}>删除</Button>
        </Space>
      ),
    },
  ]

  return (
    <Table
      rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
      columns={columns}
      dataSource={data}
      size="${size}"${bordered ? '\n      bordered' : ''}
      pagination={false}
      scroll={{ x: ${TABLE_SCROLL_X} }}
    />
  )
}`
}

export default function TablePlayground() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [dataSource, setDataSource] = useState(initialData)
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('middle')
  const [bordered, setBordered] = useState(false)

  const handleBatchDelete = () => {
    setDataSource((prev) => prev.filter((item) => !selectedRowKeys.includes(item.key)))
    setSelectedRowKeys([])
  }

  const columns: TableColumnsType<DataType> = [
    { title: '任务名称 Task', dataIndex: 'name', key: 'name', width: 280, ellipsis: true },
    { title: '领域 Field', dataIndex: 'field', key: 'field', width: 100 },
    {
      title: '状态 Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: '文献数 Papers',
      dataIndex: 'papers',
      key: 'papers',
      width: 140,
      sorter: (a, b) => a.papers - b.papers,
    },
    { title: '更新时间 Time', dataIndex: 'time', key: 'time', width: 120 },
    {
      title: '操作 Action',
      key: 'action',
      width: 170,
      fixed: 'right',
      render: () => (
        <Space size="middle">
          <Button type="link" size="small" style={{ padding: 0 }}>查看 View</Button>
          <Button type="link" size="small" danger style={{ padding: 0 }}>删除 Delete</Button>
        </Space>
      ),
    },
  ]

  const { darkCode, lightCode } = buildThemeCode('表格 (Table)', buildTableCode(size, bordered))

  return (
    <PlaygroundRoot>
      <PlaygroundHeader
        hint="交互范例 · 多选、排序、固定列、横向滚动"
        trailing={
          <Text type="secondary" style={{ fontSize: 12 }}>
            已选 {selectedRowKeys.length} 项
          </Text>
        }
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>尺寸</Text>
          <Segmented
            size="small"
            value={size}
            onChange={(v) => setSize(v as typeof size)}
            options={[
              { label: '小', value: 'small' },
              { label: '中', value: 'middle' },
              { label: '大', value: 'large' },
            ]}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>边框</Text>
          <Segmented
            size="small"
            value={bordered ? 'on' : 'off'}
            onChange={(v) => setBordered(v === 'on')}
            options={[
              { label: '无边框', value: 'off' },
              { label: '有边框', value: 'on' },
            ]}
          />
        </div>
      </div>

      <PlaygroundSection title="数据表格" titleEn="Data Table">
        <Space direction="vertical" size="middle" style={{ width: '100%', maxWidth: TABLE_DEMO_WIDTH }}>
          <Button danger disabled={selectedRowKeys.length === 0} onClick={handleBatchDelete}>
            批量删除
            <Text style={{ fontSize: 12, opacity: 0.5, marginLeft: 4 }}>Batch Delete</Text>
          </Button>
          <Table<DataType>
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            columns={columns}
            dataSource={dataSource}
            size={size}
            bordered={bordered}
            pagination={false}
            scroll={{ x: TABLE_SCROLL_X }}
          />
        </Space>
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
