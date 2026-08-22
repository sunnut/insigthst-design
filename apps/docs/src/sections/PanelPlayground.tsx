import { Panel } from '@insightst-design/ui'
import { SettingOutlined, ReloadOutlined } from '@insightst-design/icons'
import { Button, Space, Typography } from '@insightst-design/ui'
import CodeBlock from './CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  buildThemeCode,
} from './playgroundLayout'

const { Text } = Typography

const panelCode = `import { Panel } from '@insightst-design/ui'
import { Button } from '@insightst-design/ui'
import { SettingOutlined } from '@insightst-design/icons'

// 带 header
<Panel title="数据概览" extra={<Button type="text" icon={<SettingOutlined />} />} fullscreen>
  这里是面板内容区域。
</Panel>

// 隐藏 header
<Panel hideHeader>
  这里是面板内容区域，无标题栏。
</Panel>`

const { darkCode, lightCode } = buildThemeCode('面板 (Panel)', panelCode)

export default function PanelPlayground() {
  return (
    <PlaygroundRoot>
      <PlaygroundHeader hint="Panel 面板 · 支持全屏切换与隐藏标题栏，适用于数据平台内容区域" />

      {/* 示例 1：带 header */}
      <div>
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          带 header · title + extra 操作区
        </Text>
        <Panel
          title="数据概览"
          fullscreen
          extra={
            <Space size={4}>
              <Button type="text" icon={<ReloadOutlined />} size="small" />
              <Button type="text" icon={<SettingOutlined />} size="small" />
            </Space>
          }
          onToggleFull={(isFull) => console.log('全屏状态:', isFull)}
        >
          <p>这里是面板内容区域。可以放置任意内容，例如统计数据、表格或说明文字。</p>
          <p>点击右上角全屏图标可切换全屏模式。</p>
        </Panel>
      </div>

      {/* 示例 2：隐藏 header */}
      <div>
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          隐藏 header · hideHeader=true
        </Text>
        <Panel hideHeader>
          <p>这里是面板内容区域，标题栏已隐藏。适合无需标题的纯内容展示场景。</p>
        </Panel>
      </div>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
