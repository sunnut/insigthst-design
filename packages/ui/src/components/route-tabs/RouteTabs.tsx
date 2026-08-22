import { useCallback, useMemo, type FC } from 'react';
import type { TabsProps } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import styles from './routeTabs.module.css';

export type RouteTabsItem = NonNullable<TabsProps['items']>[number] & {
  key: string;
};

export interface RouteTabsProps {
  basePath: string;
  defaultActiveKey: string;
  items: RouteTabsItem[];
}

function normalizeRoutePath(path: string) {
  return path.replace(/\/+$/, '') || '/';
}

function isRoutePathMatch(pathname: string, routePath: string): boolean {
  const normalized = normalizeRoutePath(pathname);
  const target = normalizeRoutePath(routePath);
  return normalized === target || normalized.startsWith(target + '/');
}

const RouteTabs: FC<RouteTabsProps> = ({ basePath, defaultActiveKey, items }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const normalizedBasePath = useMemo(() => normalizeRoutePath(basePath), [basePath]);

  const tabRoutes = useMemo(
    () =>
      items.map((item) => ({
        key: item.key,
        path: `${normalizedBasePath}/${item.key}`,
      })),
    [items, normalizedBasePath],
  );

  const activeKey =
    tabRoutes.find((route) => isRoutePathMatch(pathname, route.path))?.key ?? defaultActiveKey;

  const tabRouteByKey = useMemo(
    () => new Map(tabRoutes.map((route) => [route.key, route.path])),
    [tabRoutes],
  );

  const handleTabChange = useCallback(
    (key: string) => {
      const targetPath = tabRouteByKey.get(key);
      if (!targetPath || isRoutePathMatch(pathname, targetPath)) return;
      navigate(targetPath);
    },
    [navigate, pathname, tabRouteByKey],
  );

  return (
    <div className={styles.root}>
      <div className={styles.tabsBar}>
        {items.map((item) => {
          const isActive = activeKey === item.key;
          return (
            <button
              key={item.key}
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleTabChange(item.key)}
              className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ''}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className={styles.tabsContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default RouteTabs;
