import { useMemo, useEffect, Suspense } from 'react'
import { Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router'
import {
  Button,
  Layout,
  Sidebar,
} from '@insightst-design/ui'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './theme'
import { useBreadcrumb, useBreadcrumbValue } from '@insightst-design/hooks'
import {
  mainNavItems,
  themeSubItems,
  iconsSubItems,
  commonCompSubItems,
  businessCompSubItems,
  utilsSubItems,
  hooksSubItems,
  pathByMenuKey,
  legacyHashToPath,
  getMenuKeyFromPath,
  getBreadcrumbFromPath,
} from './nav'
import { docRoutes } from './routes'
import PageLoading from './components/PageLoading'

function HeaderTools() {
  const { mode, toggle } = useTheme()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Button
        icon={mode === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        onClick={toggle}
        size="small"
      >
        {mode === 'dark' ? '亮色' : '暗色'}
      </Button>
    </div>
  )
}

function DocsLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode } = useTheme()

  const pathname = location.pathname
  const menuKey = getMenuKeyFromPath(pathname)

  const calculatedBreadcrumbs = useMemo(() => {
    const {
      currentNav,
      currentComp,
      currentTheme,
      currentIcons,
      currentUtils,
      currentHooks,
      isCompActive,
      isThemeActive,
      isIconsActive,
      isUtilsActive,
      isHooksActive,
    } = getBreadcrumbFromPath(pathname)

    return [
      { title: '组件库' },
      ...(currentNav ? [{ title: currentNav.label }] : []),
      ...(isThemeActive && currentTheme ? [{ title: currentTheme.label }] : []),
      ...(isIconsActive && currentIcons ? [{ title: currentIcons.label }] : []),
      ...(isCompActive && currentComp ? [{ title: currentComp.label }] : []),
      ...(isUtilsActive && currentUtils ? [{ title: currentUtils.label }] : []),
      ...(isHooksActive && currentHooks ? [{ title: currentHooks.label }] : []),
    ]
  }, [pathname])

  useBreadcrumb(calculatedBreadcrumbs)
  const breadcrumbItems = useBreadcrumbValue()

  const navData = useMemo(() => {
    const categories: any[] = []

    // 1. 快速入门 (no category label)
    const quickstartItem = mainNavItems.find((item) => item.key === 'quickstart')
    if (quickstartItem) {
      const Icon = quickstartItem.icon
      categories.push({
        label: '',
        items: [
          {
            key: quickstartItem.key,
            icon: <Icon size={16} />,
            label: quickstartItem.label,
          },
        ],
      })
    }

    // 2. 组件与工具分类
    const groups = [
      { key: 'themes', label: '主题', subItems: themeSubItems },
      { key: 'icons', label: '图标', subItems: iconsSubItems },
      { key: 'common-components', label: '通用', subItems: commonCompSubItems },
      { key: 'business-components', label: '业务', subItems: businessCompSubItems },
      { key: 'utils', label: '工具', subItems: utilsSubItems },
      { key: 'hooks', label: 'Hooks', subItems: hooksSubItems },
    ]

    groups.forEach((group) => {
      categories.push({
        label: group.label,
        items: group.subItems.map((child) => ({
          key: child.key,
          label: child.label,
          icon: <></>, // Empty ReactNode as icon for component/tool items
        })),
      })
    })

    // 3. 设计分类 (从色彩系统到设计原则)
    const designKeys = [
      'colors',
      'typography',
      'spacing',
      'shadow',
      'interactions',
      'principles',
    ]

    const designItems = mainNavItems
      .filter((item) => designKeys.includes(item.key))
      .map((item) => {
        return {
          key: item.key,
          icon: <></>,
          label: item.label,
        }
      })

    categories.push({
      label: '设计',
      items: designItems,
    })

    return categories
  }, [])

  const handleMenuSelect = (key: string) => {
    const path = pathByMenuKey[key]
    if (path) navigate(path)
  }

  // 兼容旧 hash 链接：/#comp-button → /components/button
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && legacyHashToPath[hash]) {
      navigate(legacyHashToPath[hash], { replace: true })
    }
  }, [navigate])

  return (
    <Layout
      logo={
        <img
          src={mode === 'dark' ? '/logo-white.png' : '/logo-blue.png'}
          alt="Logo"
          style={{ height: 26, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
        />
      }
      platformName="组件库"
      items={breadcrumbItems}
      topRight={<HeaderTools />}
      contentStyle={{ padding: 20 }}
      sidebar={
        <Sidebar
          width={272}
          data={navData}
          activeKey={menuKey}
          onSelect={handleMenuSelect}
        />
      }
    >
      <div style={{ maxWidth: 1200 }}>
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </div>
    </Layout>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        <Route index element={<Navigate to="/quickstart" replace />} />
        {docRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child, i) =>
              child.index ? (
                <Route key="index" index element={child.element} />
              ) : (
                <Route key={child.path ?? i} path={child.path} element={child.element} />
              ),
            )}
          </Route>
        ))}
        <Route path="*" element={<Navigate to="/quickstart" replace />} />
      </Route>
    </Routes>
  )
}

export default App
