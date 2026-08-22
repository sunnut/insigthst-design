/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

/**
 * 拆成两个 context：setItems 稳定不变，items 频繁变化。
 * 这样 useBreadcrumb 只订阅 setItems（永不重渲染），
 * 只有 Breadcrumb 渲染组件订阅 items。
 */
const BreadcrumbSetterContext = createContext<React.Dispatch<React.SetStateAction<ItemType[]>> | null>(null);
const BreadcrumbItemsContext = createContext<ItemType[]>([]);

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ItemType[]>([]);

  return (
    <BreadcrumbSetterContext.Provider value={setItems}>
      <BreadcrumbItemsContext.Provider value={items}>{children}</BreadcrumbItemsContext.Provider>
    </BreadcrumbSetterContext.Provider>
  );
};

/**
 * 子路由调用此 hook 声明面包屑项。
 * 只订阅 setter context（稳定引用），不会因 items 变化而重渲染。
 * 组件卸载时自动清空。
 */
export function useBreadcrumb(items: ItemType[]) {
  const setItems = useContext(BreadcrumbSetterContext);
  if (!setItems) {
    throw new Error('useBreadcrumb must be used within BreadcrumbProvider');
  }

  useEffect(() => {
    setItems(items);
    return () => setItems([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setItems, JSON.stringify(items)]);
}

/**
 * 仅限面包屑渲染组件调用，订阅 items 变化。
 */
export function useBreadcrumbValue(): ItemType[] {
  return useContext(BreadcrumbItemsContext);
}
