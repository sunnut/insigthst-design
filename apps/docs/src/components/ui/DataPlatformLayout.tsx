/**
 * DataPlatformLayout — 数据平台完整页面布局
 *
 * ═══════════════ CSS 变量映射速查 ═══════════════
 * 颜色均通过 CSS 变量注入，支持暗/亮双主题自动切换。
 * 变量定义详见 src/index.css，Ant Design 映射详见 @insightst-design/theme。
 *
 * ── 布局尺寸 ──
 *   Header 高度:      var(--layout-header-height)              → 56px
 *   Sidebar 展开宽度:  var(--layout-sidebar-width)              → 200px
 *   Sidebar 折叠宽度:  var(--layout-sidebar-collapsed-width)    → 56px
 *
 * ── 背景色 ──
 *   Header 背景:      var(--ds-bg-header)         → #17191C (暗) / #ffffff (亮)
 *   Header 底边框:     var(--ds-header-border)     → rgba(255,255,255,0.1) / #e4e5e9
 *   Sidebar 背景:      var(--ds-bg-sidebar)        → #17191C / #ffffff
 *   Content 背景:      var(--ds-content-bg)         → rgba(255,255,255,0.02) / rgba(0,0,0,0.01)
 *
 * ── 文字色 ──
 *   平台名称:         var(--ds-text-inverse)       → #ffffff (暗/亮一致)
 *   用户名:           var(--ds-text-inverse)
 *
 * ── 工具栏按钮 ──
 *   默认按钮背景:      var(--ds-header-button-bg)  → rgba(255,255,255,0.1) / rgba(0,0,0,0.04)
 *   AI 按钮渐变:       linear-gradient(136deg, #9A71D7, #434CC8)  (固定，双主题一致)
 *
 * ── Icon ──
 *   Header 图标:      16×16px, 来源 /public/icons/
 *   圆形按钮容器:       padding: 10px, border-radius: 224px (圆形)
 */
import { type FC, type ReactNode } from 'react'
import { useTheme } from '../../theme'
import SidebarMenu, { type SidebarMenuProps } from './SidebarMenu'

export interface DataPlatformLayoutProps {
  /** 侧边导航属性 */
  sidebar: SidebarMenuProps
  /** 平台名称 */
  platformName?: string
  /** Logo 图标路径 */
  logoIcon?: string
  /** 用户名 */
  userName?: string
  /** 右侧内容区 */
  children: ReactNode
  /** 自定义类名 */
  className?: string
}

/**
 * 数据平台完整页面布局 —— 1:1 复刻 MasterGo 设计稿
 *
 * 设计来源：MasterGo 节点 447:14952「数据集成-数据下载」
 *
 * 布局结构：
 * ┌─ Header (56px) ──────────────────────────────────────┐
 * │ Logo + 平台名 | spacer | AI | 通知 | 设置 | 用户▼   │
 * ├─ Sidebar (200px) ─┬─ Content (flex:1) ───────────────┤
 * │                    │                                   │
 */
const DataPlatformLayout: FC<DataPlatformLayoutProps> = ({
  sidebar,
  platformName = '数据中台',
  logoIcon: logoIconProp,
  userName = '金玮 8801',
  children,
  className = '',
}) => {
  const { mode } = useTheme()
  const logoIcon = logoIconProp ?? (mode === 'light' ? '/icons/icon-logo-light.svg' : '/icons/icon-logo.svg')

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: 'var(--ds-bg-header)',
        overflow: 'hidden',
      }}
    >
      {/* ═══ 顶部导航栏 ═══ */}
      <header
        style={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '0 16px',
          background: 'var(--ds-bg-header)',
          borderBottom: '1px solid var(--ds-header-border)',
          flexShrink: 0,
        }}
      >
        {/* Logo + 分隔线 + 平台名 —— 1:1 复刻 MasterGo 节点 447:14959 */}
        <div
          style={{
            width: 196,
            height: 56,
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Logo 图标 — left: 1px, 垂直居中 */}
          <div
            style={{
              position: 'absolute',
              left: 1,
              top: 16,
              zIndex: 0,
            }}
          >
            <img
              src={logoIcon}
              alt="Logo"
              style={{ height: 24, width: 'auto', display: 'block' }}
            />
          </div>

          {/* 分隔竖线 — left: 108px, 与 logo/文字 垂直对齐，高 12px */}
          <div
            style={{
              position: 'absolute',
              left: 108,
              top: 16,
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              height: 24,
            }}
          >
            <svg width="1" height="12" viewBox="0 0 1 12" fill="none">
              <line x1="0.5" y1="0" x2="0.5" y2="12" stroke="var(--ds-text-inverse)" strokeOpacity="0.4" strokeWidth="1" />
            </svg>
          </div>

          {/* 平台名称 — left: 117px, 垂直居中 */}
          <span
            style={{
              position: 'absolute',
              left: 117,
              top: 16,
              zIndex: 1,
              color: 'var(--ds-text-inverse)',
              fontSize: 20,
              fontFamily: 'Kingsoft_Cloud_Font, OPPOSans, -apple-system, sans-serif',
              lineHeight: '24px',
              whiteSpace: 'nowrap',
            }}
          >
            {platformName}
          </span>
        </div>

        {/* 弹性空白 */}
        <div style={{ flex: 1 }} />

        {/* 右侧工具栏 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* AI 助手 */}
          <div
            style={{
              display: 'flex',
              padding: 10,
              background: 'linear-gradient(136deg, #9A71D7 0%, #434CC8 100%)',
              borderRadius: 224,
              cursor: 'pointer',
            }}
          >
            <img
              src="/icons/icon-robot.svg"
              alt="AI"
              className="nav-icon-img"
              style={{ width: 16, height: 16 }}
            />
          </div>

          {/* 通知 */}
          <div
            style={{
              display: 'flex',
              padding: 10,
              background: 'var(--ds-header-button-bg)',
              borderRadius: 224,
              cursor: 'pointer',
            }}
          >
            <img
              src="/icons/icon-notification.svg"
              alt="通知"
              className="nav-icon-img"
              style={{ width: 16, height: 16 }}
            />
          </div>

          {/* 设置 */}
          <div
            style={{
              display: 'flex',
              padding: 10,
              background: 'var(--ds-header-button-bg)',
              borderRadius: 224,
              cursor: 'pointer',
            }}
          >
            <img
              src="/icons/icon-settings.svg"
              alt="设置"
              className="nav-icon-img"
              style={{ width: 16, height: 16 }}
            />
          </div>

          {/* 用户 */}
          <div
            style={{
              height: 36,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: 10,
              background: 'var(--ds-header-button-bg)',
              borderRadius: 224,
              cursor: 'pointer',
            }}
          >
            <img
              src="/icons/icon-user.svg"
              alt="用户"
              className="nav-icon-img"
              style={{ width: 16, height: 16 }}
            />
            <span
              style={{
                color: 'var(--ds-text-inverse)',
                fontSize: 14,
                fontFamily: 'OPPOSans, -apple-system, sans-serif',
                lineHeight: '18px',
                whiteSpace: 'nowrap',
              }}
            >
              {userName}
            </span>
            <img
              src="/icons/icon-chevron-down.svg"
              alt=""
              className="nav-icon-img"
              style={{ width: 16, height: 16 }}
            />
          </div>
        </div>
      </header>

      {/* ═══ 功能区域（Sidebar + Content） ═══ */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* 侧边导航栏 */}
        <SidebarMenu
          {...sidebar}
        />

        {/* 右侧内容区 */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px',
            backdropFilter: 'blur(30px)',
            background: 'var(--ds-content-bg)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default DataPlatformLayout
