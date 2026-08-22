// src/tokens/generate.ts
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// src/tokens/colors.ts
var darkColors = {
  /* ── 背景层级 ── */
  bgBase: "#17191C",
  bgSidebar: "#17191C",
  bgHeader: "#17191C",
  bgCard: "#222427",
  bgElevated: "#2C2E31",
  bgOverlay: "rgba(0, 0, 0, 0.6)",
  bgInput: "#1d1f23",
  bgHover: "#2a2c30",
  contentBg: "rgba(255,255,255,0.02)",
  /* ── 品牌色 ── */
  primary: "#5264E0",
  primaryHover: "#6B80F0",
  primaryActive: "#3F50C0",
  primarySubtle: "rgba(82, 100, 224, 0.12)",
  primarySubtleHover: "rgba(82, 100, 224, 0.18)",
  primaryBorder: "rgba(82, 100, 224, 0.35)",
  /* ── 语义色 ── */
  success: "#43CB89",
  successBg: "rgba(52, 199, 126, 0.15)",
  warning: "#FFA564",
  warningBg: "rgba(240, 160, 48, 0.12)",
  danger: "#FF6464",
  dangerBg: "rgba(229, 80, 80, 0.12)",
  info: "#5264E0",
  infoBg: "rgba(82, 100, 224, 0.12)",
  neutral: "#8a8f99",
  neutralBg: "rgba(200, 205, 215, 0.1)",
  /* ── 禁用态 ── */
  disabledText: "#50545c",
  disabledBg: "#1c1e21",
  disabledBorder: "#2a2d33",
  /* ── 文字色 ── */
  textPrimary: "#f2f3f5",
  textSecondary: "#8a8f99",
  textTertiary: "#6d717a",
  textInverse: "#ffffff",
  textLink: "#5264E0",
  textError: "#FF8A8A",
  textSuccess: "#6DE0A8",
  /* ── 边框 ── */
  border: "#323640",
  borderHover: "#5b62b8",
  borderActive: "#5264E0",
  borderMuted: "#3a3f4d",
  divider: "#323640",
  /* ── Header ── */
  headerBorder: "rgba(255,255,255,0.1)",
  headerButtonBg: "rgba(255,255,255,0.1)",
  /* ── Sidebar ── */
  sidebarItemHover: "rgba(255,255,255,0.04)",
  sidebarItemActive: "rgba(255,255,255,0.08)"
};
var lightColors = {
  /* ── 背景层级 ── */
  bgBase: "#f0f1f5",
  bgSidebar: "#f0f1f5",
  bgHeader: "#f0f1f5",
  bgCard: "#ffffff",
  bgElevated: "#f5f6fa",
  bgOverlay: "rgba(0, 0, 0, 0.4)",
  bgInput: "#f5f6fa",
  bgHover: "#f5f6fa",
  contentBg: "rgba(0,0,0,0.01)",
  /* ── 品牌色 ── */
  primary: "#5264E0",
  primaryHover: "#3F50C0",
  primaryActive: "#2D40B0",
  primarySubtle: "rgba(82, 100, 224, 0.08)",
  primarySubtleHover: "rgba(82, 100, 224, 0.14)",
  primaryBorder: "rgba(82, 100, 224, 0.25)",
  /* ── 语义色 ── */
  success: "#43CB89",
  successBg: "rgba(52, 199, 126, 0.12)",
  warning: "#FFA564",
  warningBg: "rgba(240, 160, 48, 0.08)",
  danger: "#FF6464",
  dangerBg: "rgba(229, 80, 80, 0.08)",
  info: "#5264E0",
  infoBg: "rgba(82, 100, 224, 0.08)",
  neutral: "#8c8c8c",
  neutralBg: "rgba(0, 0, 0, 0.04)",
  /* ── 禁用态 ── */
  disabledText: "#c8cbd0",
  disabledBg: "#ebebeb",
  disabledBorder: "#eeeff2",
  /* ── 文字色 ── */
  textPrimary: "#3d414a",
  textSecondary: "#787b84",
  textTertiary: "#b8bcc4",
  textInverse: "#ffffff",
  textLink: "#5264E0",
  textError: "#D44B4B",
  textSuccess: "#3AAA68",
  /* ── 边框 ── */
  border: "#e4e5e9",
  borderHover: "#d0d2d8",
  borderActive: "#5264E0",
  borderMuted: "#d0d2d8",
  divider: "#edf0f2",
  /* ── Header ── */
  headerBorder: "#e4e5e9",
  headerButtonBg: "rgba(0,0,0,0.04)",
  /* ── Sidebar ── */
  sidebarItemHover: "rgba(0,0,0,0.04)",
  sidebarItemActive: "rgba(0,0,0,0.06)"
};
var colors = {
  dark: darkColors,
  light: lightColors
};

// src/tokens/spacing.ts
var spacing = {
  space1: 4,
  space2: 8,
  space3: 12,
  space4: 16,
  space5: 20,
  space6: 24,
  space8: 32,
  space10: 40,
  space12: 48,
  space16: 64,
  headerHeight: 56,
  sidebarWidth: 200,
  sidebarCollapsedWidth: 56,
  contentPaddingX: 32,
  contentPaddingY: 24,
  radiusXs: 2,
  radiusSm: 4,
  radiusMd: 6,
  radiusLg: 8,
  radiusXl: 12,
  radiusFull: 9999,
  buttonHeight: 36,
  buttonHeightSm: 28,
  buttonHeightLg: 40,
  inputHeight: 36,
  inputHeightSm: 28,
  inputHeightLg: 40
};

// src/tokens/typography.ts
var typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
  fontFamilyMono: '"SF Mono", "Fira Code", Consolas, monospace',
  h1: { size: 24, lineHeight: 32, weight: 600 },
  h2: { size: 18, lineHeight: 26, weight: 600 },
  h3: { size: 16, lineHeight: 24, weight: 500 },
  body: { size: 14, lineHeight: 22, weight: 400 },
  small: { size: 13, lineHeight: 20, weight: 400 },
  caption: { size: 12, lineHeight: 18, weight: 400 },
  button: { size: 14, lineHeight: 22, weight: 500 },
  data: { size: 28, lineHeight: 36, weight: 600 }
};

// src/tokens/shadow.ts
var darkShadows = {
  z0: "none",
  z1: "0 1px 2px rgba(0,0,0,0.06)",
  z2: "0 2px 8px rgba(0,0,0,0.10)",
  z4: "0 4px 16px rgba(0,0,0,0.14)",
  z8: "0 8px 32px rgba(0,0,0,0.22)",
  z16: "0 16px 48px rgba(0,0,0,0.28)"
};
var lightShadows = {
  z0: "none",
  z1: "0 1px 2px rgba(0,0,0,0.02)",
  z2: "0 2px 8px rgba(0,0,0,0.04)",
  z4: "0 4px 16px rgba(0,0,0,0.06)",
  z8: "0 8px 32px rgba(0,0,0,0.08)",
  z16: "0 16px 48px rgba(0,0,0,0.10)"
};
var shadows = {
  dark: darkShadows,
  light: lightShadows
};

// src/tokens/generate.ts
var ROOT = process.cwd();
var DIST = join(ROOT, "dist");
var SRC_TOKENS = join(ROOT, "src", "tokens");
function colorToCssVars(tokens, indent = "  ") {
  const map = {
    bgBase: "--ds-bg-base",
    bgSidebar: "--ds-bg-sidebar",
    bgHeader: "--ds-bg-header",
    bgCard: "--ds-bg-card",
    bgElevated: "--ds-bg-elevated",
    bgOverlay: "--ds-bg-overlay",
    bgInput: "--ds-bg-input",
    bgHover: "--ds-bg-hover",
    contentBg: "--ds-content-bg",
    primary: "--ds-primary",
    primaryHover: "--ds-primary-hover",
    primaryActive: "--ds-primary-active",
    primarySubtle: "--ds-primary-subtle",
    primarySubtleHover: "--ds-primary-subtle-hover",
    primaryBorder: "--ds-primary-border",
    success: "--ds-success",
    successBg: "--ds-success-bg",
    warning: "--ds-warning",
    warningBg: "--ds-warning-bg",
    danger: "--ds-danger",
    dangerBg: "--ds-danger-bg",
    info: "--ds-info",
    infoBg: "--ds-info-bg",
    neutral: "--ds-neutral",
    neutralBg: "--ds-neutral-bg",
    textPrimary: "--ds-text-primary",
    textSecondary: "--ds-text-secondary",
    textTertiary: "--ds-text-tertiary",
    textInverse: "--ds-text-inverse",
    textLink: "--ds-text-link",
    textError: "--ds-text-error",
    textSuccess: "--ds-text-success",
    border: "--ds-border",
    borderHover: "--ds-border-hover",
    borderActive: "--ds-border-active",
    borderMuted: "--ds-border-muted",
    divider: "--ds-divider",
    headerBorder: "--ds-header-border",
    headerButtonBg: "--ds-header-button-bg",
    sidebarItemHover: "--ds-sidebar-item-hover",
    sidebarItemActive: "--ds-sidebar-item-active",
    disabledText: "--ds-disabled-text",
    disabledBg: "--ds-disabled-bg",
    disabledBorder: "--ds-disabled-border"
  };
  const lines = [];
  for (const key of Object.keys(map)) {
    const cssVar = map[key];
    const value = tokens[key];
    if (value !== void 0) {
      lines.push(`${indent}${cssVar}: ${value};`);
    }
  }
  return lines.join("\n");
}
function genTokensCss() {
  const dark = colorToCssVars(darkColors);
  const light = colorToCssVars(lightColors);
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
    `  --ds-shadow-z16: ${shadows.dark.z16};`
  ].join("\n");
  return `/* @insightst/theme \u2014 \u81EA\u52A8\u751F\u6210\uFF0C\u8BF7\u52FF\u624B\u52A8\u7F16\u8F91 */
/* \u6570\u636E\u6E90: src/tokens/colors.ts + spacing.ts + typography.ts + shadow.ts */

/* \u2500\u2500 \u6697\u8272\u4E3B\u9898\uFF08\u9ED8\u8BA4\uFF09 \u2500\u2500 */
:root,
[data-theme='dark'] {
  color-scheme: dark;

${dark}

${staticVars}
}

/* \u2500\u2500 \u4EAE\u8272\u4E3B\u9898 \u2500\u2500 */
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
function genScrollbarCss() {
  return `/* \u2550\u2550 \u6EDA\u52A8\u6761 \u2014 \u6697/\u4EAE\u4E3B\u9898\u7EDF\u4E00 \u2550\u2550
   \u6697\u8272 thumb \u9ED8\u8BA4: --ds-border (#323640)  hover: --ds-text-tertiary (#6d717a)
   \u4EAE\u8272 thumb \u9ED8\u8BA4/hover: --ds-text-tertiary (#b8bcc4)
   track: transparent \xB7 \u5BBD\u5EA6: 6px */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}

/* \u6697\u8272\uFF08\u9ED8\u8BA4\uFF09 */
:root ::-webkit-scrollbar-thumb,
[data-theme='dark'] ::-webkit-scrollbar-thumb {
  background: var(--ds-border);
  border-radius: 3px;
}
:root ::-webkit-scrollbar-thumb:hover,
[data-theme='dark'] ::-webkit-scrollbar-thumb:hover {
  background: var(--ds-text-tertiary);
}

/* \u4EAE\u8272 \u2014 \u9ED8\u8BA4\u4E0E hover \u540C\u8272 */
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
function genTokensJson() {
  const data = {
    colors,
    spacing,
    typography,
    shadows
  };
  return JSON.stringify(data, null, 2);
}
function genTokensTs() {
  return `/**
 * \u81EA\u52A8\u751F\u6210\u7684 Token \u5E38\u91CF \u2014 \u8BF7\u52FF\u624B\u52A8\u7F16\u8F91
 * \u6570\u636E\u6E90: src/tokens/colors.ts + spacing.ts + typography.ts + shadow.ts
 * \u751F\u6210: npx tsx src/tokens/generate.ts
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
function main() {
  mkdirSync(DIST, { recursive: true });
  const css = genTokensCss();
  writeFileSync(join(DIST, "tokens.css"), css);
  console.log("\u2705 dist/tokens.css");
  const json = genTokensJson();
  writeFileSync(join(DIST, "tokens.json"), json);
  console.log("\u2705 dist/tokens.json");
  const ts = genTokensTs();
  writeFileSync(join(SRC_TOKENS, "generated.ts"), ts);
  console.log("\u2705 src/tokens/generated.ts");
}
main();
