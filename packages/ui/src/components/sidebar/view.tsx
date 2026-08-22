import { useState, useEffect, type FC, type ReactNode } from 'react';
import { DownOutlined, RightOutlined } from '@insightst-design/icons';
import styles from './view.module.css';

/** 导航菜单项（支持二级子项） */
export interface NavItem {
  key: string;
  label: string;
  /** 图标：支持 SVG 路径字符串（如 "/icons/nav/icon-home.svg"）或 ReactNode（如组件） */
  icon?: string | ReactNode;
  /** 二级子项（可选，存在即表示可展开） */
  children?: NavItem[];
}

/** 导航分类（带分类标题的菜单组） */
export interface NavCategory {
  label: string;
  items: NavItem[];
}

export interface SidebarProps {
  /** 分类列表 */
  data: NavCategory[];
  /** 当前激活的菜单项 key */
  activeKey?: string;
  /** 选中回调 */
  onSelect?: (key: string) => void;
  /** 默认是否折叠 */
  defaultCollapsed?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义展开状态时的宽度 */
  width?: number | string;
}

/**
 * 侧边导航菜单
 */
const Sidebar: FC<SidebarProps> = ({
  data = [],
  activeKey,
  onSelect,
  defaultCollapsed = false,
  className = '',
  style,
  width,
}) => {
  /** 记录哪些一级菜单处于展开状态（有 children 的） */
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  /** 折叠状态 */
  const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);
  /** 高亮选项状态 */
  const [selectedKey, setSelectedKey] = useState<string | undefined>(activeKey);

  // 当外部 activeKey 发生变化时，同步更新内部的高亮状态
  useEffect(() => {
    if (activeKey !== undefined) {
      setSelectedKey(activeKey);
    }
  }, [activeKey]);

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleSelect = (key: string) => {
    setSelectedKey(key);
    onSelect?.(key);
  };

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const sidebarClass = `${styles.sidebar} ${
    collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
  } ${className}`.trim();

  const contentClass = `${styles.content} ${
    collapsed ? styles.contentCollapsed : styles.contentExpanded
  }`;

  const footerClass = `${styles.footer} ${
    collapsed ? styles.footerCollapsed : styles.footerExpanded
  }`;

  const mergedStyle = {
    ...style,
    ...(width !== undefined && !collapsed
      ? { width: typeof width === 'number' ? `${width}px` : width }
      : {}),
  };

  return (
    <nav className={sidebarClass} style={mergedStyle}>
      {/* 菜单内容区 */}
      <div className={contentClass}>
        {data.map((category) => (
          <div key={category.label} className={styles.category}>
            {/* 分类标题 —— 折叠时隐藏 */}
            {!collapsed && category.label && (
              <div className={styles.categoryTitle}>
                <span className={styles.categoryTitleText}>{category.label}</span>
              </div>
            )}

            {/* 分类下的菜单项 */}
            {category.items.map((item) => {
              const isActive = item.key === selectedKey;
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedKeys.has(item.key);
              // 检查子项是否有激活的
              const hasActiveChild =
                hasChildren && item.children!.some((c) => c.key === selectedKey);

              const itemBgClass = isActive && !hasActiveChild
                ? styles.itemActive
                : hasActiveChild
                ? styles.itemHasActiveChild
                : styles.itemDefault;

              const itemClass = `${styles.item} ${
                collapsed ? styles.itemCollapsed : styles.itemExpanded
              } ${itemBgClass}`;

              const iconClass = `${styles.iconWrapper} ${
                isActive || hasActiveChild ? styles.iconActive : styles.iconInactive
              }`;

              const labelClass = `${styles.label} ${
                isActive
                  ? styles.labelActive
                  : hasActiveChild
                  ? styles.labelHasActiveChild
                  : styles.labelDefault
              }`;

              return (
                <div key={item.key} className={styles.itemWrapper}>
                  {/* 一级菜单项 */}
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (hasChildren) {
                          toggleExpand(item.key);
                        }
                        handleSelect(item.key);
                      }
                    }}
                    onClick={() => {
                      if (hasChildren) {
                        toggleExpand(item.key);
                      }
                      handleSelect(item.key);
                    }}
                    title={collapsed ? item.label : undefined}
                    className={itemClass}
                  >
                    <div className={iconClass}>
                      {typeof item.icon === 'string' ? (
                        <img
                          src={item.icon}
                          alt={item.label}
                          className={styles.navIconImg}
                        />
                      ) : (
                        item.icon
                      )}
                    </div>

                    {/* 文字 */}
                    {!collapsed && (
                      <>
                        <p className={labelClass}>{item.label}</p>

                        {/* 展开/折叠箭头 */}
                        {hasChildren && (
                          <div className={styles.arrowWrapper}>
                            {isExpanded ? (
                              <DownOutlined style={{ fontSize: 12 }} />
                            ) : (
                              <RightOutlined style={{ fontSize: 12 }} />
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* 二级展开项 */}
                  {hasChildren && isExpanded && !collapsed && (
                    <div className={styles.subItemsContainer}>
                      {item.children!.map((child) => {
                        const isChildActive = child.key === selectedKey;
                        const subItemBgClass = isChildActive
                          ? styles.subItemActive
                          : styles.subItemDefault;

                        const subItemClass = `${styles.subItem} ${subItemBgClass}`;

                        const subItemLabelClass = `${styles.subItemLabel} ${
                          isChildActive ? styles.subItemLabelActive : styles.subItemLabelDefault
                        }`;

                        return (
                          <div
                            key={child.key}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSelect(child.key);
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelect(child.key);
                            }}
                            className={subItemClass}
                          >
                            {/* 24px 左侧缩进占位 */}
                            <div className={styles.subItemIndent} />

                            <p className={subItemLabelClass}>{child.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 底部收起导航 */}
      <div className={footerClass}>
        <div
          role="button"
          tabIndex={0}
          aria-label={collapsed ? '展开导航' : '收起导航'}
          aria-expanded={!collapsed}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleCollapse();
            }
          }}
          onClick={toggleCollapse}
          className={`${styles.toggleBtn} ${
            collapsed ? styles.toggleBtnCollapsed : styles.toggleBtnExpanded
          }`}
        >
          {/* 折叠图标 */}
          <div
            className={`${styles.toggleIconWrapper} ${
              collapsed ? styles.toggleIconCollapsed : styles.toggleIconExpanded
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="var(--ds-text-secondary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {!collapsed && <span className={styles.toggleLabel}>收起导航</span>}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
