/**
 * Token Generator — 从数据源生成产物
 *
 * 用法: npx tsx src/tokens/generate.ts
 * 输出: dist/tokens.css, dist/tokens.json, src/tokens/generated.ts
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { colors, darkColors, lightColors, type ColorTokens } from './colors.js';
import { spacing } from './spacing.js';
import { typography } from './typography.js';
import { shadows } from './shadow.js';

// script is always run from project root (npm run build / npx tsx src/tokens/generate.ts)
const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const SRC_TOKENS = join(ROOT, 'src', 'tokens');

/* ═══════════════════════════════════ CSS Variables ═══════════════════════════════════ */

function colorToCssVars(tokens: ColorTokens, indent = '  '): string {
  const map: Record<keyof ColorTokens, string> = {
    bgBase: '--ds-bg-base',
    bgSidebar: '--ds-bg-sidebar',
    bgHeader: '--ds-bg-header',
    bgCard: '--ds-bg-card',
    bgElevated: '--ds-bg-elevated',
    bgOverlay: '--ds-bg-overlay',
    bgInput: '--ds-bg-input',
    bgHover: '--ds-bg-hover',
    contentBg: '--ds-content-bg',

    primary: '--ds-primary',
    primaryHover: '--ds-primary-hover',
    primaryActive: '--ds-primary-active',
    primarySubtle: '--ds-primary-subtle',
    primarySubtleHover: '--ds-primary-subtle-hover',
    primaryBorder: '--ds-primary-border',

    success: '--ds-success',
    successBg: '--ds-success-bg',
    warning: '--ds-warning',
    warningBg: '--ds-warning-bg',
    danger: '--ds-danger',
    dangerBg: '--ds-danger-bg',
    info: '--ds-info',
    infoBg: '--ds-info-bg',
    neutral: '--ds-neutral',
    neutralBg: '--ds-neutral-bg',

    textPrimary: '--ds-text-primary',
    textSecondary: '--ds-text-secondary',
    textTertiary: '--ds-text-tertiary',
    textInverse: '--ds-text-inverse',
    textLink: '--ds-text-link',
    textError: '--ds-text-error',
    textSuccess: '--ds-text-success',

    border: '--ds-border',
    borderHover: '--ds-border-hover',
    borderActive: '--ds-border-active',
    borderMuted: '--ds-border-muted',
    divider: '--ds-divider',

    headerBorder: '--ds-header-border',
    headerButtonBg: '--ds-header-button-bg',

    sidebarItemHover: '--ds-sidebar-item-hover',
    sidebarItemActive: '--ds-sidebar-item-active',

    disabledText: '--ds-disabled-text',
    disabledBg: '--ds-disabled-bg',
    disabledBorder: '--ds-disabled-border',
  };

  const lines: string[] = [];
  for (const key of Object.keys(map) as (keyof ColorTokens)[]) {
    const cssVar = map[key];
    const value = tokens[key];
    if (value !== undefined) {
      lines.push(`${indent}${cssVar}: ${value};`);
    }
  }
  return lines.join('\n');
}

function genTokensCss(): string {
  const dark = colorToCssVars(darkColors);
  const light = colorToCssVars(lightColors);

  // Spacing & other non-theme tokens
  const staticVars = [
    `  --ds-space-1: ${spacing.space1}px;`,
    `  --ds-space-2: ${spacing.space2}px;`,
    `  --ds-space-3: ${spacing.space3}px;`,
    `  --ds-space-4: ${spacing.space4}px;`,
    `  --ds-space-5: ${spacing.space5}px;`,
    `  --ds-space-6: ${spacing.space6}px;`,
    `  --ds-space-8: ${spacing.space8}px;`,
    `  --ds-space-10: ${spacing.space10}px;`,
    `  --ds-space-12: ${spacing.space12}px;`,
    `  --ds-space-16: ${spacing.space16}px;`,
    `  --ds-header-height: ${spacing.headerHeight}px;`,
    `  --ds-sidebar-width: ${spacing.sidebarWidth}px;`,
    `  --ds-sidebar-collapsed-width: ${spacing.sidebarCollapsedWidth}px;`,
    `  --ds-radius-xs: ${spacing.radiusXs}px;`,
    `  --ds-radius-sm: ${spacing.radiusSm}px;`,
    `  --ds-radius-md: ${spacing.radiusMd}px;`,
    `  --ds-radius-lg: ${spacing.radiusLg}px;`,
    `  --ds-radius-xl: ${spacing.radiusXl}px;`,
    `  --ds-radius-full: ${spacing.radiusFull}px;`,
    `  --ds-font-family: ${typography.fontFamily};`,
    `  --ds-font-family-mono: ${typography.fontFamilyMono};`,
    `  --ds-font-size-h1: ${typography.h1.size}px;`,
    `  --ds-font-size-h2: ${typography.h2.size}px;`,
    `  --ds-font-size-h3: ${typography.h3.size}px;`,
    `  --ds-font-size-body: ${typography.body.size}px;`,
    `  --ds-font-size-small: ${typography.small.size}px;`,
    `  --ds-font-size-caption: ${typography.caption.size}px;`,
    `  --ds-shadow-z0: ${shadows.dark.z0};`,
    `  --ds-shadow-z1: ${shadows.dark.z1};`,
    `  --ds-shadow-z2: ${shadows.dark.z2};`,
    `  --ds-shadow-z4: ${shadows.dark.z4};`,
    `  --ds-shadow-z8: ${shadows.dark.z8};`,
    `  --ds-shadow-z16: ${shadows.dark.z16};`,
  ].join('\n');

  return `/* @insightst/theme — 自动生成，请勿手动编辑 */
/* 数据源: src/tokens/colors.ts + spacing.ts + typography.ts + shadow.ts */

/* ── 暗色主题（默认） ── */
:root,
[data-theme='dark'] {
  color-scheme: dark;

${dark}

${staticVars}
}

/* ── 亮色主题 ── */
[data-theme='light'] {
  color-scheme: light;

${light}

  --ds-shadow-z0: ${shadows.light.z0};
  --ds-shadow-z1: ${shadows.light.z1};
  --ds-shadow-z2: ${shadows.light.z2};
  --ds-shadow-z4: ${shadows.light.z4};
  --ds-shadow-z8: ${shadows.light.z8};
  --ds-shadow-z16: ${shadows.light.z16};
}

${genScrollbarCss()}`;
}

function genScrollbarCss(): string {
  return `/* ══ 滚动条 — 暗/亮主题统一 ══
   暗色 thumb 默认: --ds-border (#323640)  hover: --ds-text-tertiary (#6d717a)
   亮色 thumb 默认/hover: --ds-text-tertiary (#b8bcc4)
   track: transparent · 宽度: 6px */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}

/* 暗色（默认） */
:root ::-webkit-scrollbar-thumb,
[data-theme='dark'] ::-webkit-scrollbar-thumb {
  background: var(--ds-border);
  border-radius: 3px;
}
:root ::-webkit-scrollbar-thumb:hover,
[data-theme='dark'] ::-webkit-scrollbar-thumb:hover {
  background: var(--ds-text-tertiary);
}

/* 亮色 — 默认与 hover 同色 */
[data-theme='light'] ::-webkit-scrollbar-thumb,
[data-theme='light'] ::-webkit-scrollbar-thumb:hover {
  background: var(--ds-text-tertiary);
  border-radius: 3px;
}

/* Firefox */
* {
  scrollbar-width: thin;
}
:root,
[data-theme='dark'] {
  scrollbar-color: var(--ds-border) transparent;
}
[data-theme='light'] {
  scrollbar-color: var(--ds-text-tertiary) transparent;
}`;
}

/* ═══════════════════════════════════ JSON ═══════════════════════════════════ */

function genTokensJson(): string {
  const data = {
    colors,
    spacing,
    typography,
    shadows,
  };
  return JSON.stringify(data, null, 2);
}

/* ═══════════════════════════════════ TypeScript ═══════════════════════════════════ */

function genTokensTs(): string {
  return `/**
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
`;
}

/* ═══════════════════════════════════ Main ═══════════════════════════════════ */

function main() {
  mkdirSync(DIST, { recursive: true });

  const css = genTokensCss();
  writeFileSync(join(DIST, 'tokens.css'), css);
  console.log('✅ dist/tokens.css');

  const json = genTokensJson();
  writeFileSync(join(DIST, 'tokens.json'), json);
  console.log('✅ dist/tokens.json');

  const ts = genTokensTs();
  writeFileSync(join(SRC_TOKENS, 'generated.ts'), ts);
  console.log('✅ src/tokens/generated.ts');
}

main();
