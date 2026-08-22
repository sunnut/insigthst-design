/**
 * ThemeProvider — 封装 AntD ConfigProvider + 主题切换
 */
import './modal.css';
import './notification-modal.css';
import './pagination.css';
import './table.css';
import './form.css';
import { useMemo, useEffect, type ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

type Locale = typeof zhCN;
import { getAntdTheme, type ThemeMode, type ThemeOverrides } from './getAntdTheme';

export type Language = 'zh' | 'en';

export interface ThemeProviderProps {
  /** 主题模式，默认 dark */
  mode?: ThemeMode;
  /** 语言，默认 zh（中文） */
  lang?: Language;
  /** 可选的主题覆盖 */
  overrides?: ThemeOverrides;
  /** 子元素 */
  children: ReactNode;
  /** 是否同步 data-theme 属性到 document.documentElement */
  syncDocumentTheme?: boolean;
}

const localeMap: Record<Language, Locale> = {
  zh: zhCN,
  en: enUS,
};

/**
 * 主题提供者 — 同时设置 AntD ConfigProvider 和 document data-theme
 */
export function ThemeProvider({
  mode = 'dark',
  lang = 'zh',
  overrides,
  children,
  syncDocumentTheme = true,
}: ThemeProviderProps) {
  const theme = useMemo(() => getAntdTheme(mode, overrides), [mode, overrides]);

  useEffect(() => {
    if (syncDocumentTheme) {
      document.documentElement.setAttribute('data-theme', mode);
    }
  }, [mode, syncDocumentTheme]);

  return (
    <ConfigProvider theme={theme} locale={localeMap[lang]}>
      {children}
    </ConfigProvider>
  );
}
