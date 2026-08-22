/**
 * @insightst/theme — Core Tokens 导出
 *
 * 框架无关、UI 库无关的设计 token 层。
 * 不依赖 React、Ant Design。
 */
export { colors, darkColors, lightColors } from './colors';
export type { ColorTokens, ThemeColorSet } from './colors';
export { spacing } from './spacing';
export type { SpacingTokens } from './spacing';
export { typography } from './typography';
export type { TypographyTokens } from './typography';
export { shadows, darkShadows, lightShadows } from './shadow';
export type { ShadowTokens, ThemeShadowSet } from './shadow';
export { tokens, lightTokens, darkTokens } from './generated';
export type { ThemeMode, ThemeTokenValue, ThemeTokens } from './generated';
