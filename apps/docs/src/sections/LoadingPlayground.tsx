import { useState } from 'react'
import { Spin, Skeleton, Empty, Button, Card, Row, Col, Typography, Progress, Space, Slider } from '@insightst-design/ui'
import { ReloadOutlined, InboxOutlined, SearchOutlined, CheckCircleOutlined } from '@insightst-design/icons'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundSection,
  buildThemeCode,
} from './playgroundLayout'

const { Text } = Typography

const loadingCode = `import { useState } from 'react'
import { Spin, Skeleton, Empty, Button, Progress, Typography, Space, Slider } from '@insightst-design/ui'
import { InboxOutlined, SearchOutlined } from '@insightst-design/icons'

const { Text } = Typography

function LoadingDemo() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(65)

  return (
    <>
      {/* 加载 */}
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
          <div style={{ marginTop: 12 }}><Text strong>加载中 Loading…</Text></div>
          <Text type="secondary" style={{ fontSize: 12 }}>正在获取数据</Text>
        </div>
      ) : (
        <Text strong>加载完成</Text>
      )}

      {/* 空状态 */}
      <Empty image={<InboxOutlined style={{ fontSize: 48 }} />} description="暂无数据 No Data">
        <Button type="primary" size="small">创建新任务</Button>
      </Empty>

      <Empty image={<SearchOutlined style={{ fontSize: 48 }} />} description="未找到结果">
        <Button size="small">清除筛选</Button>
      </Empty>

      {/* 骨架屏 */}
      <Skeleton active avatar paragraph={{ rows: 3 }} />
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Skeleton.Input active style={{ width: '100%' }} />
        <Skeleton.Button active block size="large" />
      </Space>

      {/* 进度条 */}
      <Slider value={progress} onChange={setProgress} />
      <Progress percent={progress} />
      <Progress percent={80} status="active" />
      <Progress percent={100} />
    </>
  )
}`

export default function LoadingPlayground() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(65)

  const toggleLoading = () => {
    setLoading(false)
    setTimeout(() => setLoading(true), 2000)
  }

  const { darkCode, lightCode } = buildThemeCode('加载与空状态 (Loading / Empty)', loadingCode)

  return (
    <PlaygroundRoot>
      <PlaygroundHeader
        hint="交互范例 · 加载、骨架屏、进度条与空状态"
        trailing={
          <Button size="small" icon={<ReloadOutlined />} onClick={toggleLoading}>
            刷新 Refresh
          </Button>
        }
      />

      <PlaygroundSection title="加载与空状态" titleEn="Spin & Empty">
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin size="large" />
                  <div style={{ marginTop: 12 }}><Text strong>加载中 Loading…</Text></div>
                  <Text type="secondary" style={{ fontSize: 12 }}>正在获取数据</Text>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <CheckCircleOutlined style={{ fontSize: 32, color: 'var(--ds-success)' }} />
                  <div style={{ marginTop: 8 }}><Text strong>加载完成</Text></div>
                </div>
              )}
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Empty image={<InboxOutlined style={{ fontSize: 48 }} />} description="暂无数据 No Data">
                <Button type="primary" size="small">创建新任务</Button>
              </Empty>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Empty image={<SearchOutlined style={{ fontSize: 48 }} />} description="未找到结果">
                <Button size="small">清除筛选</Button>
              </Empty>
            </Card>
          </Col>
        </Row>
      </PlaygroundSection>

      <PlaygroundSection title="骨架屏" titleEn="Skeleton">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Card size="small">
              <Skeleton active avatar paragraph={{ rows: 3 }} />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <Skeleton.Input active style={{ width: '100%' }} />
                <Skeleton.Button active block size="large" />
              </Space>
            </Card>
          </Col>
        </Row>
      </PlaygroundSection>

      <PlaygroundSection title="进度条" titleEn="Progress">
        <Card size="small" style={{ maxWidth: 480 }}>
          <Slider value={progress} onChange={setProgress} style={{ marginBottom: 16 }} />
          <Progress percent={progress} />
          <div style={{ marginTop: 16 }}>
            <Progress percent={80} status="active" />
          </div>
          <div style={{ marginTop: 16 }}>
            <Progress percent={100} />
          </div>
        </Card>
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
