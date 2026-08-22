import { useState } from 'react'
import { Typography, MapDrawing, Button, Space, type Point } from '@insightst-design/ui'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundSection,
  buildThemeCode,
} from './playgroundLayout'

const { Text } = Typography

const mapCode = `import { useState } from 'react'
import { MapDrawing, type Point } from '@insightst-design/ui'

function GeoFenceForm() {
  const [region, setRegion] = useState<Point[]>([])

  return (
    <div style={{ height: 480 }}>
      <MapDrawing onChange={setRegion} />
    </div>
  )
}

// onChange 返回: [{ lat: 34.34, lon: 108.93 }, ...]`

const features = [
  '矩形 / 多边形绘制',
  '编辑、拖拽、删除图形',
  '全屏模式',
  'onChange 返回经纬度坐标',
]

export default function MapDrawingPlayground() {
  const [points, setPoints] = useState<Point[]>([])
  const { darkCode, lightCode } = buildThemeCode('地图绘制 (MapDrawing)', mapCode)

  return (
    <PlaygroundRoot>
      <PlaygroundHeader hint="交互范例 · 自主开发组件 MapDrawing" />

      <PlaygroundSection title="能力说明" titleEn="Features">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {features.map((feature) => (
            <div
              key={feature}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 12,
                color: 'var(--ds-text-secondary)',
                background: 'var(--ds-bg-elevated)',
                border: '1px solid var(--ds-border)',
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="地图绘制" titleEn="Live Demo">
        <div style={{ height: 480, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--ds-border)' }}>
          <MapDrawing onChange={setPoints} />
        </div>
      </PlaygroundSection>

      <PlaygroundSection title="坐标输出" titleEn="Coordinates">
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: 'var(--ds-bg-elevated)',
            border: '1px solid var(--ds-border)',
          }}
        >
          <Space style={{ marginBottom: 8 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {points.length > 0 ? `已绘制 ${points.length} 个点` : '尚未绘制区域'}
            </Text>
            {points.length > 0 && (
              <Button size="small" onClick={() => setPoints([])}>清空</Button>
            )}
          </Space>
          {points.length > 0 ? (
            <pre
              style={{
                margin: 0,
                fontSize: 12,
                fontFamily: 'monospace',
                color: 'var(--ds-text-primary)',
                maxHeight: 140,
                overflow: 'auto',
              }}
            >
              {JSON.stringify(points, null, 2)}
            </pre>
          ) : (
            <Text type="secondary" style={{ fontSize: 12 }}>
              使用工具栏在地图上绘制矩形或多边形，坐标将实时显示在此处
            </Text>
          )}
        </div>
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
