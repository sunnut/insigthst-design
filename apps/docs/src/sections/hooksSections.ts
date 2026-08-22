import { lazy, type LazyExoticComponent, type ComponentType } from 'react'

export interface HooksSectionConfig {
  id: string
  slug: string
  title: string
  titleEn: string
  color: string
  Component: LazyExoticComponent<ComponentType>
}

export const hooksSections: HooksSectionConfig[] = [
  {
    id: 'hooks-use-fetch',
    slug: 'use-fetch',
    title: 'useFetch Hook',
    titleEn: 'useFetch',
    color: '#5264E0',
    Component: lazy(() => import('./UseFetchPlayground')),
  },
  {
    id: 'hooks-use-table',
    slug: 'use-table',
    title: 'useTable Hook',
    titleEn: 'useTable',
    color: '#43CB89',
    Component: lazy(() => import('./UseTablePlayground')),
  },
  {
    id: 'hooks-use-breadcrumb',
    slug: 'use-breadcrumb',
    title: 'useBreadcrumb Hook',
    titleEn: 'useBreadcrumb',
    color: '#FA8C16',
    Component: lazy(() => import('./BreadcrumbPlayground')),
  },
]
