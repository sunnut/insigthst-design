import { lazy, type LazyExoticComponent, type ComponentType } from 'react'

export interface ComponentSectionConfig {
  id: string
  slug: string
  title: string
  titleEn: string
  /** 左侧菜单显示文案 */
  menuLabel: string
  /** 通用组件 / 业务组件，对应 nav 子菜单分组 */
  category: 'common' | 'business'
  color: string
  Component: LazyExoticComponent<ComponentType>
}

/** 组件文档页 + 左侧菜单的唯一数据源 */
export const componentSections: ComponentSectionConfig[] = [
  { id: 'comp-button', slug: 'button', title: '按钮', titleEn: 'Button', menuLabel: '按钮 Button', category: 'common', color: '#5264E0', Component: lazy(() => import('./ButtonPlayground')) },
  { id: 'comp-input', slug: 'form', title: '输入控件', titleEn: 'Form', menuLabel: '输入控件 Form', category: 'common', color: '#FFA564', Component: lazy(() => import('./FormPlayground')) },
  { id: 'comp-tag', slug: 'tag', title: '状态标签', titleEn: 'Tag / Status', menuLabel: '状态标签 Tag', category: 'common', color: '#FF6464', Component: lazy(() => import('./TagPlayground')) },
  { id: 'comp-table', slug: 'table', title: '表格', titleEn: 'Table', menuLabel: '表格 Table', category: 'common', color: '#8a8f99', Component: lazy(() => import('./TablePlayground')) },
  { id: 'comp-modal', slug: 'modal', title: '弹窗', titleEn: 'Modal', menuLabel: '弹窗 Modal', category: 'common', color: '#5264E0', Component: lazy(() => import('./ModalPlayground')) },
  { id: 'comp-step', slug: 'step', title: '步骤条', titleEn: 'Step', menuLabel: '步骤条 Steps', category: 'common', color: '#FFA564', Component: lazy(() => import('./StepPlayground')) },
  { id: 'comp-calendar', slug: 'calendar', title: '日历', titleEn: 'Calendar', menuLabel: '日历 Calendar', category: 'common', color: '#43CB89', Component: lazy(() => import('./CalendarPlayground')) },
  { id: 'comp-loading', slug: 'loading', title: '加载与空状态', titleEn: 'Loading / Empty', menuLabel: '加载/空状态 Loading', category: 'common', color: '#8c8c8c', Component: lazy(() => import('./LoadingPlayground')) },
  { id: 'comp-tooltip', slug: 'tooltip', title: '气泡与提示', titleEn: 'Tooltip', menuLabel: '气泡/提示 Tooltip', category: 'common', color: '#5264E0', Component: lazy(() => import('./TooltipPlayground')) },
  { id: 'comp-layout', slug: 'layout', title: '整体布局', titleEn: 'Layout', menuLabel: '整体布局 Layout', category: 'business', color: '#5264E0', Component: lazy(() => import('./LayoutPlayground')) },
  { id: 'comp-sidebar', slug: 'sidebar', title: '侧边栏', titleEn: 'Sidebar', menuLabel: '侧边栏 Sidebar', category: 'business', color: '#5264E0', Component: lazy(() => import('./SidebarPlayground')) },
  { id: 'comp-route-tabs', slug: 'route-tabs', title: '路由标签', titleEn: 'RouteTabs', menuLabel: '路由标签 RouteTabs', category: 'business', color: '#5264E0', Component: lazy(() => import('./RouteTabsPlayground')) },
  { id: 'comp-buttons', slug: 'buttons', title: '按钮组', titleEn: 'Buttons', menuLabel: '按钮组 Buttons', category: 'business', color: '#5264E0', Component: lazy(() => import('./ButtonsPlayground')) },
  { id: 'comp-card', slug: 'card', title: '卡片', titleEn: 'CardPro', menuLabel: '卡片 CardPro', category: 'business', color: '#43CB89', Component: lazy(() => import('./CardPlayground')) },
  { id: 'comp-map-drawing', slug: 'map-drawing', title: '地图绘制', titleEn: 'MapDrawing', menuLabel: '地图绘制 MapDrawing', category: 'business', color: '#43CB89', Component: lazy(() => import('./MapDrawingPlayground')) },
  { id: 'comp-knowledge-graph-3d', slug: 'knowledge-graph-3d', title: '知识图谱 3D', titleEn: 'KnowledgeGraph3D', menuLabel: '知识图谱 KnowledgeGraph3D', category: 'business', color: '#5264E0', Component: lazy(() => import('./KnowledgeGraph3DPlayground')) },
  { id: 'comp-panel', slug: 'panel', title: '面板', titleEn: 'Panel', menuLabel: '面板 Panel', category: 'business', color: '#5264E0', Component: lazy(() => import('./PanelPlayground')) },
]

function toSubItems(sections: ComponentSectionConfig[]) {
  return sections.map(({ id, menuLabel, slug }) => ({ key: id, label: menuLabel, slug }))
}

export const commonCompSubItems = toSubItems(componentSections.filter((s) => s.category === 'common'))
export const businessCompSubItems = toSubItems(componentSections.filter((s) => s.category === 'business'))
export const compSubItems = toSubItems(componentSections)

export type CompSubKey = (typeof compSubItems)[number]['key']

export const componentTokenData = {
  Button: {
    'btn-height': '36px',
    'btn-padding-x': '16px',
    'btn-radius': '6px',
    'btn-font-size': '14px',
    'btn-font-weight': 500,
    'btn-primary': '#5264E0',
    'btn-primary-hover': '#6B80F0',
    'btn-primary-active': '#3F50C0',
    'btn-primary-subtle': 'rgba(82,100,224,0.08)',
    'btn-danger': '#FF6464',
    'btn-success': '#43CB89',
  },
  Input: {
    'input-height': '36px',
    'input-padding-x': '12px',
    'input-radius': '6px',
    'input-bg': '#f5f6fa',
    'input-border': '#e4e5e9',
    'input-focus-border': '#5264E0',
    'input-focus-shadow': '0 0 0 2px rgba(82,100,224,0.12)',
    'input-error-border': '#FF6464',
    'input-error-shadow': '0 0 0 2px rgba(255,100,100,0.12)',
    'input-placeholder': '#b8bcc4',
  },
  Tag: {
    'tag-padding-x': '12px',
    'tag-padding-y': '4px',
    'tag-radius': '4px',
    'tag-font-size': '12px',
    'tag-font-weight': 500,
  },
  Card: {
    'card-radius': '8px',
    'card-padding': '16px',
    'card-bg': '#ffffff',
    'card-border': '#e4e5e9',
    'status-bar-width': '3px',
  },
  CardPro: {
    variant: 'model | market | entity | dataset',
    'status-tone': 'success | warning | neutral | danger | { color, bg?, bar? }',
    'description-lines': '2（CSS line-clamp）',
    'meta-row': 'creator + time；onEdit/onDelete 或 meta.menuItems + onMenuClick',
    otherTags: '{ label, icon?, value? }[] · 渲染在 tags 下一行',
    coverGradient: 'CSS 渐变 / 图片 URL / url(...)',
  },
  StatCard: {
    'stat-value-size': '28px',
    'stat-value-weight': '600',
    'stat-label-size': '13px',
    'stat-icon-size': '44px',
    'stat-icon-radius': '50%',
    'stat-layout': '左圆形图标 + 右标题 + 大数字',
    'stat-tone': 'primary | success | warning | danger | neutral | purple | { color, bg? }',
  },
  Modal: {
    'modal-radius': '12px',
    'modal-width-sm': '420px',
    'modal-width-lg': '640px',
  },
  Switch: {
    'switch-width': '40px',
    'switch-height': '22px',
    'switch-knob-size': '16px',
    'switch-checked': '#5264E0',
    'switch-unchecked': '#d0d2d8',
  },
  Slider: {
    'slider-track-height': '4px',
    'slider-track-bg': '#e4e5e9',
    'slider-fill': '#5264E0',
    'slider-thumb-size': '16px',
  },
} as const
