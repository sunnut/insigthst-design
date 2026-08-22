import { Suspense, lazy, type ReactNode } from 'react'
import { Navigate } from 'react-router'
import PageLoading from './components/PageLoading'

const QuickStartSection = lazy(() => import('./sections/QuickStartSection'))
const TypographySection = lazy(() => import('./sections/TypographySection'))
const SpacingSection = lazy(() => import('./sections/SpacingSection'))
const ShadowPlayground = lazy(() => import('./sections/ShadowPlayground'))
const InteractionsSection = lazy(() => import('./sections/InteractionsSection'))
const PrinciplesSection = lazy(() => import('./sections/PrinciplesSection'))

const ColorsPage = lazy(() => import('./pages/ColorsPage'))
const ThemePage = lazy(() => import('./pages/ThemePage'))
const IconsPage = lazy(() => import('./pages/IconsPage'))
const ComponentsOverviewPage = lazy(() => import('./pages/ComponentsOverviewPage'))
const ComponentDocPage = lazy(() => import('./pages/ComponentDocPage'))
const UtilsOverviewPage = lazy(() => import('./pages/UtilsOverviewPage'))
const UtilsDocPage = lazy(() => import('./pages/UtilsDocPage'))
const HooksOverviewPage = lazy(() => import('./pages/HooksOverviewPage'))
const HooksDocPage = lazy(() => import('./pages/HooksDocPage'))

// RouteTabs 实例：layout 为组件文档页，子路由对应各标签页内容
const UserInfo = lazy(() => import('./sections/RouteTabsPlayground/UserInfo'))
const UserOrder = lazy(() => import('./sections/RouteTabsPlayground/UserOrder'))
const UserSettings = lazy(() => import('./sections/RouteTabsPlayground/UserSettings'))

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageLoading />}>{element}</Suspense>
}

export interface DocRoute {
  path: string
  element: ReactNode
  children?: { index?: boolean; path?: string; element: ReactNode }[]
}

export const docRoutes: DocRoute[] = [
  { path: 'quickstart', element: withSuspense(<QuickStartSection />) },
  { path: 'colors', element: withSuspense(<ColorsPage />) },
  { path: 'typography', element: withSuspense(<TypographySection />) },
  { path: 'spacing', element: withSuspense(<SpacingSection />) },
  { path: 'themes', element: withSuspense(<ThemePage />) },
  { path: 'icons', element: withSuspense(<IconsPage />) },
  { path: 'components', element: withSuspense(<ComponentsOverviewPage />) },
  {
    // 路由标签实例：文档页作为 layout，三个标签页为子路由
    path: 'components/route-tabs',
    element: withSuspense(<ComponentDocPage slug="route-tabs" />),
    children: [
      { index: true, element: <Navigate to="info" replace /> },
      { path: 'info', element: withSuspense(<UserInfo />) },
      { path: 'order', element: withSuspense(<UserOrder />) },
      { path: 'settings', element: withSuspense(<UserSettings />) },
    ],
  },
  { path: 'components/:slug', element: withSuspense(<ComponentDocPage />) },
  { path: 'utils', element: withSuspense(<UtilsOverviewPage />) },
  { path: 'utils/:slug', element: withSuspense(<UtilsDocPage />) },
  { path: 'hooks', element: withSuspense(<HooksOverviewPage />) },
  { path: 'hooks/:slug', element: withSuspense(<HooksDocPage />) },
  { path: 'shadow', element: withSuspense(<ShadowPlayground />) },
  { path: 'interactions', element: withSuspense(<InteractionsSection />) },
  { path: 'principles', element: withSuspense(<PrinciplesSection />) },
]
