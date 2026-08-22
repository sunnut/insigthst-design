/**
 * @insightst-design/theme — 根出口
 */
export {
  colors, darkColors, lightColors,
  spacing, typography,
  shadows, darkShadows, lightShadows,
  tokens, lightTokens, darkTokens,
} from './tokens/index';
export type {
  ColorTokens, ThemeColorSet,
  SpacingTokens, TypographyTokens,
  ShadowTokens, ThemeShadowSet,
  ThemeMode, ThemeTokenValue, ThemeTokens,
} from './tokens/index';

export { ThemeProvider } from './ui/ThemeProvider';
export type { ThemeProviderProps, Language } from './ui/ThemeProvider';
