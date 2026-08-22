import { createContext, useContext } from 'react';
import type { ThemeMode } from '@insightst-design/theme';

interface ThemeContextType {
  mode: ThemeMode;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ mode: 'dark', toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

