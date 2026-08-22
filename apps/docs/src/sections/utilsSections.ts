import { lazy, type LazyExoticComponent, type ComponentType } from 'react'

export interface UtilsSectionConfig {
  id: string
  slug: string
  title: string
  titleEn: string
  color: string
  Component: LazyExoticComponent<ComponentType>
}

export const utilsSections: UtilsSectionConfig[] = [
  {
    id: 'utils-http-client',
    slug: 'http-client',
    title: '请求工具',
    titleEn: 'HttpClient',
    color: '#5264E0',
    Component: lazy(() => import('./HttpClientPlayground')),
  },
  {
    id: 'utils-session-manager',
    slug: 'session-manager',
    title: '本地操作',
    titleEn: 'SessionManager',
    color: '#43CB89',
    Component: lazy(() => import('./SessionManagerPlayground')),
  },
]
