import { Navigate } from 'react-router'
import TokenDownload from '../sections/TokenDownload'
import { componentTokenData } from '../sections/componentSections'

export default function ComponentsOverviewPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-h1 mb-1" style={{ color: 'var(--ds-text-primary)' }}>组件规范</h1>
        <p className="text-body" style={{ color: 'var(--ds-text-secondary)' }}>
          Components · 所有组件支持交互，切换明暗主题可查看不同配色代码
        </p>
      </div>

      <TokenDownload
        title="下载组件配置文件"
        subtitle="支持 JSON / CSS Variables / SCSS / LESS 四种格式"
        filePrefix="component-tokens"
        data={componentTokenData}
      />
    </div>
  )
}

export function ComponentsIndexRedirect() {
  return <Navigate to="/components/button" replace />
}
