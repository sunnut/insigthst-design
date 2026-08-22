/**
 * 自动生成的 Token 常量 — 请勿手动编辑
 * 数据源: src/tokens/colors.ts + spacing.ts + typography.ts + shadow.ts
 * 生成: npx tsx src/tokens/generate.ts
 */
import { darkColors, lightColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { darkShadows, lightShadows } from './shadow';

export type ThemeMode = 'light' | 'dark';
export type ThemeTokenValue = string | number | undefined;
export type ThemeTokens = Readonly<Record<string, ThemeTokenValue>>;

export const lightTokens = {
  ...lightColors,
  shadowZ0: lightShadows.z0,
  shadowZ1: lightShadows.z1,
  shadowZ2: lightShadows.z2,
  shadowZ4: lightShadows.z4,
  shadowZ8: lightShadows.z8,
  shadowZ16: lightShadows.z16,
  space1: spacing.space1,
  space2: spacing.space2,
  space3: spacing.space3,
  space4: spacing.space4,
  space5: spacing.space5,
  space6: spacing.space6,
  space8: spacing.space8,
  space10: spacing.space10,
  space12: spacing.space12,
  space16: spacing.space16,
  headerHeight: spacing.headerHeight,
  sidebarWidth: spacing.sidebarWidth,
  sidebarCollapsedWidth: spacing.sidebarCollapsedWidth,
  radiusXs: spacing.radiusXs,
  radiusSm: spacing.radiusSm,
  radiusMd: spacing.radiusMd,
  radiusLg: spacing.radiusLg,
  radiusXl: spacing.radiusXl,
  radiusFull: spacing.radiusFull,
  fontFamily: typography.fontFamily,
  fontSizeH1: typography.h1.size,
  fontSizeH2: typography.h2.size,
  fontSizeH3: typography.h3.size,
  fontSizeBody: typography.body.size,
  fontSizeSmall: typography.small.size,
  fontSizeCaption: typography.caption.size,
} as const;

export const darkTokens = {
  ...darkColors,
  shadowZ0: darkShadows.z0,
  shadowZ1: darkShadows.z1,
  shadowZ2: darkShadows.z2,
  shadowZ4: darkShadows.z4,
  shadowZ8: darkShadows.z8,
  shadowZ16: darkShadows.z16,
  space1: spacing.space1,
  space2: spacing.space2,
  space3: spacing.space3,
  space4: spacing.space4,
  space5: spacing.space5,
  space6: spacing.space6,
  space8: spacing.space8,
  space10: spacing.space10,
  space12: spacing.space12,
  space16: spacing.space16,
  headerHeight: spacing.headerHeight,
  sidebarWidth: spacing.sidebarWidth,
  sidebarCollapsedWidth: spacing.sidebarCollapsedWidth,
  radiusXs: spacing.radiusXs,
  radiusSm: spacing.radiusSm,
  radiusMd: spacing.radiusMd,
  radiusLg: spacing.radiusLg,
  radiusXl: spacing.radiusXl,
  radiusFull: spacing.radiusFull,
  fontFamily: typography.fontFamily,
  fontSizeH1: typography.h1.size,
  fontSizeH2: typography.h2.size,
  fontSizeH3: typography.h3.size,
  fontSizeBody: typography.body.size,
  fontSizeSmall: typography.small.size,
  fontSizeCaption: typography.caption.size,
} as const;

export const tokens = {
  light: lightTokens,
  dark: darkTokens,
} as const;
