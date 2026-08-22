import { RouteTabs, type RouteTabsItem } from '@insightst-design/ui'
import CodeBlock from '../CodeBlock'
import {
  PlaygroundRoot,
  PlaygroundHeader,
  PlaygroundSection,
  buildThemeCode,
} from '../playgroundLayout'

/** 演示用的基础路径，与 docs 顶层路由 (routes.tsx) 保持一致 */
const DEMO_BASE_PATH = '/components/route-tabs'

const tabItems: RouteTabsItem[] = [
  { key: 'info', label: '个人信息' },
  { key: 'order', label: '我的订单' },
  { key: 'settings', label: '账号设置' },
]

function buildCode() {
  return `import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router'
import { RouteTabs } from '@insightst-design/ui'

const UserInfo = lazy(() => import('./UserInfo'))
const UserOrder = lazy(() => import('./UserOrder'))
const UserSettings = lazy(() => import('./UserSettings'))

const tabItems = [
  { key: 'info',     label: '个人信息' },
  { key: 'order',    label: '我的订单' },
  { key: 'settings', label: '账号设置' },
]

// 在顶层路由定义处直接使用 RouteTabs 作为 layout，
// 子路由 (children) 对应各个标签页内容。
export const routes = [
  {
    path: '/user',
    element: (
      <RouteTabs
        basePath="/user"
        defaultActiveKey="info"
        items={tabItems}
      />
    ),
    children: [
      { index: true, element: <Navigate to="info" replace /> },
      {
        path: 'info',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <UserInfo />
          </Suspense>
        ),
      },
      {
        path: 'order',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <UserOrder />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <UserSettings />
          </Suspense>
        ),
      },
    ],
  },
]`
}

export default function RouteTabsPlayground() {
  const { darkCode, lightCode } = buildThemeCode('路由标签 (RouteTabs)', buildCode())

  return (
    <PlaygroundRoot>
      <PlaygroundHeader hint="交互范例 · 路由标签（RouteTabs）· 切换标签会真实更新地址栏路由" />

      <PlaygroundSection title="预览" titleEn="Preview">
        <div
          style={{
            height: 360,
            borderRadius: 8,
            overflow: 'hidden'
          }}
        >
          {/* 实例直接复用 docs 顶层定义的真实路由，子路由内容由 <Outlet /> 渲染 */}
          <RouteTabs
            basePath={DEMO_BASE_PATH}
            defaultActiveKey="info"
            items={tabItems}
          />
        </div>
      </PlaygroundSection>

      <CodeBlock darkCode={darkCode} lightCode={lightCode} />
    </PlaygroundRoot>
  )
}
