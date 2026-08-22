/**
 * SidebarMenu — 数据平台侧边导航菜单
 *
 * ═══════════════ CSS 变量映射速查 ═══════════════
 * 颜色均通过 CSS 变量注入，支持暗/亮双主题自动切换。
 * 变量定义详见 src/index.css。
 *
 * ── 布局尺寸 ──
 *   展开宽度:         var(--layout-sidebar-width)              → 200px
 *   折叠宽度:         var(--layout-sidebar-collapsed-width)    → 56px
 *
 * ── 背景色 ──
 *   侧边栏背景:       var(--ds-bg-sidebar)                  → #17191C (暗) / #ffffff (亮)
 *   菜单项悬停:       var(--ds-sidebar-item-hover)          → rgba(255,255,255,0.04) / rgba(0,0,0,0.04)
 *   菜单项激活:       var(--ds-sidebar-item-active)         → rgba(255,255,255,0.08) / rgba(0,0,0,0.06)
 *   底部分割线:       var(--sidebar-border)                    → #323640 / #e4e5e9
 *
 * ── 文字色 ──
 *   默认菜单文字:      var(--sidebar-foreground)                → #5C5F66 (暗) / #5c5f66 (亮)
 *   激活菜单文字:      var(--ds-text-inverse)               → #ffffff (暗) / #1d1f23 (亮)
 *   分类标题:         var(--sidebar-foreground)                (13px, 无需额外变量)
 *
 * ── 导航项 Token ──
 *   一级菜单高度: 44px  |  Icon: 24×24  |  gap: 8px  |  padding: 0 12px
 *   二级菜单高度: 36px  |  缩进: 24px   |  左侧 1px 连线  |  radius: 4px
 *   激活态: background var(--ds-sidebar-item-active), font-weight 700
 */
import { useState, type FC, type ReactNode } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

/** 导航菜单项（支持二级子项） */
export interface NavItem {
  key: string
  label: string
  /** 图标：支持 SVG 路径字符串（如 "/icons/nav/icon-home.svg"）或 ReactNode（如 lucide-react 组件） */
  icon: string | ReactNode
  /** 二级子项（可选，存在即表示可展开） */
  children?: NavItem[]
}

/** 导航分类（带分类标题的菜单组） */
export interface NavCategory {
  label: string
  items: NavItem[]
}

export interface SidebarMenuProps {
  /** 分类列表 */
  categories: NavCategory[]
  /** 当前激活的菜单项 key */
  activeKey?: string
  /** 选中回调 */
  onSelect?: (key: string) => void
  /** 是否折叠（仅显示图标） */
  collapsed?: boolean
  /** 折叠切换回调 */
  onToggleCollapse?: () => void
  /** 自定义类名 */
  className?: string
}

/**
 * 数据平台侧边导航菜单 —— 1:1 复刻 MasterGo 设计稿
 *
 * 设计来源：MasterGo 节点 447:14952「数据集成-数据下载」→ 右侧导航栏
 *
 * Token：
 * - 分类标题：13px, var(--sidebar-foreground), padding 0 12px
 * - 一级菜单：height 44px, icon 24×24, gap 8px, padding 0 12px, radius 4px
 * - 二级菜单：height 36px, 24px 缩进留白, padding 0 12px, radius 4px
 * - 激活态：bg var(--ds-sidebar-item-active), text var(--ds-text-inverse), weight 700
 * - 底部收起：height 44px, gap 8px
 */
const SidebarMenu: FC<SidebarMenuProps> = ({
  categories,
  activeKey,
  onSelect,
  collapsed = false,
  onToggleCollapse,
  className = '',
}) => {
  /** 记录哪些一级菜单处于展开状态（有 children 的） */
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const handleSelect = (key: string) => {
    onSelect?.(key)
  }

  return (
    <nav
      className={className}
      style={{
        width: collapsed ? 56 : 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 12,
        background: 'var(--ds-bg-sidebar)',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* 菜单内容区（flex:1 撑开，底部收起固定） */}
      <div
        style={{
          flex: 1,
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          paddingRight: collapsed ? 8 : 16,
          paddingLeft: collapsed ? 8 : 16,
        }}
      >
        {categories.map((category) => (
          <div
            key={category.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              alignSelf: 'stretch',
            }}
          >
            {/* 分类标题 —— 折叠时隐藏 */}
            {!collapsed && (
              <div
                style={{
                  display: 'flex',
                  padding: '0 12px 4px 12px',
                }}
              >
                <span
                  style={{
                    color: 'var(--sidebar-foreground)',
                    fontSize: 13,
                    fontFamily: 'OPPOSans, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
                    lineHeight: '17px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {category.label}
                </span>
              </div>
            )}

            {/* 分类下的菜单项 */}
            {category.items.map((item) => {
              const isActive = item.key === activeKey
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = expandedKeys.has(item.key)
              // 检查子项是否有激活的
              const hasActiveChild = hasChildren && item.children!.some((c) => c.key === activeKey)

              return (
                <div key={item.key} style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* 一级菜单项 */}
                  <div
                    onClick={() => {
                      if (hasChildren) {
                        toggleExpand(item.key)
                      }
                      handleSelect(item.key)
                    }}
                    title={collapsed ? item.label : undefined}
                    style={{
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '0 12px',
                      alignSelf: 'stretch',
                      borderRadius: 4,
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'background 0.15s ease',
                      background: isActive && !hasActiveChild
                        ? 'var(--ds-sidebar-item-active)'
                        : hasActiveChild
                          ? 'var(--ds-sidebar-item-hover)'
                          : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive && !hasActiveChild) {
                        e.currentTarget.style.background = 'var(--ds-sidebar-item-hover)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive && !hasActiveChild) {
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {/* 图标 24×24 */}
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        opacity: isActive || hasActiveChild ? 1 : 0.8,
                        transition: 'opacity 0.15s ease',
                      }}
                    >
                      {typeof item.icon === 'string' ? (
                        <img src={item.icon} alt={item.label} className="nav-icon-img" style={{ width: 24, height: 24 }} />
                      ) : (
                        item.icon
                      )}
                    </div>

                    {/* 文字 */}
                    {!collapsed && (
                      <>
                        <p
                          style={{
                            flex: 1,
                            margin: 0,
                            color: isActive || hasActiveChild ? 'var(--ds-text-inverse)' : 'var(--sidebar-foreground)',
                            fontSize: 14,
                            fontFamily: 'OPPOSans, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
                            fontWeight: isActive ? 700 : hasActiveChild ? 500 : 400,
                            lineHeight: '18px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            transition: 'color 0.15s ease',
                          }}
                        >
                          {item.label}
                        </p>

                        {/* 展开/折叠箭头 */}
                        {hasChildren && (
                          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                            {isExpanded ? (
                              <ChevronDown size={16} color="var(--sidebar-foreground)" />
                            ) : (
                              <ChevronRight size={16} color="var(--sidebar-foreground)" />
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* 二级展开项 */}
                  {hasChildren && isExpanded && !collapsed && (
                    <div
                      style={{
                        animation: 'expandIn 0.15s ease',
                      }}
                    >
                      {item.children!.map((child) => {
                        const isChildActive = child.key === activeKey

                        return (
                          <div
                            key={child.key}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSelect(child.key)
                            }}
                            style={{
                              height: 36,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '0 12px',
                              alignSelf: 'stretch',
                              borderRadius: 4,
                              cursor: 'pointer',
                              userSelect: 'none',
                              transition: 'background 0.15s ease',
                              background: isChildActive
                                ? 'var(--ds-sidebar-item-active)'
                                : 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              if (!isChildActive) {
                                e.currentTarget.style.background = 'var(--ds-sidebar-item-hover)'
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isChildActive) {
                                e.currentTarget.style.background = 'transparent'
                              }
                            }}
                          >
                            {/* 24px 左侧缩进占位 */}
                            <div style={{ width: 24, height: 24, flexShrink: 0 }} />

                            <p
                              style={{
                                flex: 1,
                                margin: 0,
                                color: isChildActive ? 'var(--ds-text-inverse)' : 'var(--sidebar-foreground)',
                                fontSize: 14,
                                fontFamily: 'OPPOSans, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
                                fontWeight: isChildActive ? 700 : 400,
                                lineHeight: '18px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                transition: 'color 0.15s ease',
                              }}
                            >
                              {child.label}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* 底部收起导航 */}
      <div
        style={{
          display: 'flex',
          alignSelf: 'stretch',
          flexDirection: 'column',
          gap: 4,
          paddingTop: 12,
          paddingBottom: 12,
          paddingRight: collapsed ? 8 : 16,
          paddingLeft: collapsed ? 8 : 16,
          borderTop: '1px solid var(--sidebar-border)',
        }}
      >
        <div
          onClick={onToggleCollapse}
          style={{
            height: 44,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 12px',
            alignSelf: 'stretch',
            borderRadius: 4,
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--ds-sidebar-item-hover)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          {/* 折叠图标 */}
          <div
            style={{
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              opacity: 0.8,
              transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="var(--sidebar-foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {!collapsed && (
            <span
              style={{
                color: 'var(--sidebar-foreground)',
                fontSize: 14,
                fontFamily: 'OPPOSans, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
                lineHeight: '18px',
                whiteSpace: 'nowrap',
              }}
            >
              收起导航
            </span>
          )}
        </div>
      </div>

      {/* 展开动画 */}
      <style>{`
        @keyframes expandIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  )
}

export default SidebarMenu
