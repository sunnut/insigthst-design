import { type FC, type ReactNode } from 'react';
import { Breadcrumb } from 'antd';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import styles from './view.module.css';

export type { ItemType };

export interface LayoutProps {
  /** 侧边导航栏组件 */
  sidebar?: ReactNode;
  /** 平台名称 */
  platformName?: string;
  /** Logo，支持图片路径(string)或ReactNode */
  logo?: string | ReactNode;
  /** 是否隐藏顶部导航栏 */
  hideHeader?: boolean;
  /** 右侧工具栏区域内容 */
  topRight?: ReactNode;
  /** 右侧内容区 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 面包屑导航项，存在时显示在顶部弹性空白区域最左侧 */
  items?: ItemType[];
  /** 内容区自定义样式 */
  contentStyle?: React.CSSProperties;
}

/**
 * Layout — 页面整体布局组件
 */
const Layout: FC<LayoutProps> = ({
  sidebar,
  platformName = '',
  logo,
  hideHeader = false,
  topRight,
  children,
  className = '',
  items,
  contentStyle,
}) => {
  const layoutClass = `${styles.layout} ${className}`.trim();

  return (
    <div className={layoutClass}>
      {/* 顶部导航栏 */}
      {!hideHeader && (
        <header className={styles.header}>
          {/* Logo + 分隔线 + 平台名 */}
          <div className={styles.logoWrapper}>
            {logo && (
              <div className={styles.logo}>
                {typeof logo === 'string' ? (
                  <img src={logo} alt="Logo" className={styles.logoImg} />
                ) : (
                  logo
                )}
              </div>
            )}

            {platformName && (
              <span className={styles.platformName}>
                {platformName}
              </span>
            )}
          </div>

          {/* 弹性空白 + 面包屑 */}
          <div className={styles.spacer}>
            {items && <Breadcrumb items={items} />}
          </div>

          {/* 右侧工具栏 */}
          <div className={styles.topRight}>
            {topRight}
          </div>
        </header>
      )}

      {/* 功能区域（Sidebar + Content） */}
      <div className={styles.body}>
        <div className={styles.sidebarWrapper}>
          {sidebar}
        </div>
        <div className={styles.content} style={contentStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
