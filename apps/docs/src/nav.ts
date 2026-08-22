import {
  Rocket,
  Palette,
  Type,
  LayoutGrid,
  Box,
  MousePointerClick,
  BookOpen,
  Layers,
  Paintbrush,
  Smile,
  Wrench,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import {
  compSubItems,
  commonCompSubItems,
  businessCompSubItems,
  type CompSubKey,
} from './sections/componentSections'

export { compSubItems, commonCompSubItems, businessCompSubItems, type CompSubKey }

export const mainNavItems = [
  { key: 'quickstart', label: '快速入门', subtitle: 'Quick Start', icon: Rocket },
  { key: 'colors', label: '色彩系统', subtitle: 'Color System', icon: Palette },
  { key: 'typography', label: '排版系统', subtitle: 'Typography', icon: Type },
  { key: 'spacing', label: '间距与布局', subtitle: 'Spacing & Layout', icon: LayoutGrid },
  { key: 'themes', label: '主题', subtitle: 'Theme', icon: Paintbrush },
  { key: 'icons', label: '图标', subtitle: 'Icons', icon: Smile },
  { key: 'common-components', label: '通用', subtitle: 'General', icon: Box },
  { key: 'business-components', label: '业务', subtitle: 'Business', icon: Box },
  { key: 'utils', label: '工具', subtitle: 'Utils', icon: Wrench },
  { key: 'hooks', label: 'Hooks', subtitle: 'Hooks', icon: Workflow },
  { key: 'shadow', label: '投影与层级', subtitle: 'Shadow & Elevation', icon: Layers },
  { key: 'interactions', label: '交互演示', subtitle: 'Interactions', icon: MousePointerClick },
  { key: 'principles', label: '设计原则', subtitle: 'UX Principles', icon: BookOpen },
] as const

export const themeSubItems = [
  { key: 'theme-provider', label: '主题 ThemeProvider' },
] as const

export const iconsSubItems = [
  { key: 'icon-icons', label: '图标 Icons' },
] as const

export const utilsSubItems = [
  { key: 'utils-http-client', label: '请求工具 HttpClient', slug: 'http-client' },
  { key: 'utils-session-manager', label: '本地操作 SessionManager', slug: 'session-manager' },
] as const

export const hooksSubItems = [
  { key: 'hooks-use-fetch', label: 'useFetch Hook', slug: 'use-fetch' },
  { key: 'hooks-use-table', label: 'useTable Hook', slug: 'use-table' },
  { key: 'hooks-use-breadcrumb', label: 'useBreadcrumb Hook', slug: 'use-breadcrumb' },
] as const

/** 菜单 key → 路由路径 */
export const pathByMenuKey: Record<string, string> = {
  quickstart: '/quickstart',
  colors: '/colors',
  typography: '/typography',
  spacing: '/spacing',
  themes: '/themes',
  'theme-provider': '/themes',
  icons: '/icons',
  'icon-icons': '/icons',
  'common-components': '/components',
  'business-components': '/components',
  utils: '/utils',
  hooks: '/hooks',
  shadow: '/shadow',
  interactions: '/interactions',
  principles: '/principles',
  ...Object.fromEntries(compSubItems.map((item) => [item.key, `/components/${item.slug}`])),
  ...Object.fromEntries(utilsSubItems.map((item) => [item.key, `/utils/${item.slug}`])),
  ...Object.fromEntries(hooksSubItems.map((item) => [item.key, `/hooks/${item.slug}`])),
}

/** 旧 hash 锚点 → 路由路径（兼容旧链接） */
export const legacyHashToPath: Record<string, string> = { ...pathByMenuKey }

export type MainNavKey = (typeof mainNavItems)[number]['key']
export type UtilsSubKey = (typeof utilsSubItems)[number]['key']
export type HooksSubKey = (typeof hooksSubItems)[number]['key']

/** 有子菜单的一级导航 key */
export const navKeysWithChildren = ['themes', 'icons', 'common-components', 'business-components', 'utils', 'hooks'] as const satisfies readonly MainNavKey[]

export function getMenuKeyFromPath(pathname: string): string {
  if (pathname.startsWith('/components/')) {
    const rest = pathname.slice('/components/'.length)
    // 兼容带子路由的组件（如 route-tabs/info），按 slug 前缀匹配
    const comp = compSubItems.find(
      (item) => rest === item.slug || rest.startsWith(`${item.slug}/`),
    )
    return comp?.key ?? 'common-components'
  }
  if (pathname.startsWith('/utils/')) {
    const slug = pathname.slice('/utils/'.length)
    const util = utilsSubItems.find((item) => item.slug === slug)
    return util?.key ?? 'utils'
  }
  if (pathname.startsWith('/hooks/')) {
    const slug = pathname.slice('/hooks/'.length)
    const hook = hooksSubItems.find((item) => item.slug === slug)
    return hook?.key ?? 'hooks'
  }
  if (pathname === '/components') return 'common-components'
  if (pathname === '/utils') return 'utils'
  if (pathname === '/hooks') return 'hooks'
  if (pathname === '/themes') return 'theme-provider'
  if (pathname === '/icons') return 'icon-icons'

  const segment = pathname.replace(/^\//, '')
  const main = mainNavItems.find((item) => item.key === segment)
  return main?.key ?? 'quickstart'
}

export function getParentMenuKey(menuKey: string): string {
  if (menuKey.startsWith('comp-')) {
    const isBusiness = businessCompSubItems.some((item) => item.key === menuKey)
    return isBusiness ? 'business-components' : 'common-components'
  }
  if (menuKey.startsWith('theme-')) return 'themes'
  if (menuKey.startsWith('icon-')) return 'icons'
  if (menuKey.startsWith('utils-')) return 'utils'
  if (menuKey.startsWith('hooks-')) return 'hooks'
  return menuKey
}

export function getBreadcrumbFromPath(pathname: string) {
  const menuKey = getMenuKeyFromPath(pathname)
  const parentKey = getParentMenuKey(menuKey)
  const currentNav = mainNavItems.find((item) => item.key === parentKey)
  const currentComp = compSubItems.find((item) => item.key === menuKey)
  const currentTheme = themeSubItems.find((item) => item.key === menuKey)
  const currentIcons = iconsSubItems.find((item) => item.key === menuKey)
  const currentUtils = utilsSubItems.find((item) => item.key === menuKey)
  const currentHooks = hooksSubItems.find((item) => item.key === menuKey)

  return {
    parentKey,
    currentNav,
    currentComp,
    currentTheme,
    currentIcons,
    currentUtils,
    currentHooks,
    isCompActive: (parentKey === 'common-components' || parentKey === 'business-components') && menuKey !== 'common-components' && menuKey !== 'business-components',
    isThemeActive: parentKey === 'themes',
    isIconsActive: parentKey === 'icons',
    isUtilsActive: parentKey === 'utils' && menuKey !== 'utils',
    isHooksActive: parentKey === 'hooks' && menuKey !== 'hooks',
  }
}

export type NavIcon = LucideIcon
