/**
 * Core Color Tokens — 唯一数据源
 *
 * 命名规范: `--ds-{category}-{variant}`
 * 所有 AntD adapter、CSS variables、JSON 均由此派生。
 */

export type ColorTokenValue = string;

export interface ColorTokens {
  /* ── 背景层级 ── */
  bgBase: ColorTokenValue;
  bgSidebar: ColorTokenValue;
  bgHeader: ColorTokenValue;
  bgCard: ColorTokenValue;
  bgElevated: ColorTokenValue;
  bgOverlay: ColorTokenValue;
  bgInput: ColorTokenValue;
  bgHover: ColorTokenValue;
  contentBg: ColorTokenValue;

  /* ── 品牌色 ── */
  primary: ColorTokenValue;
  primaryHover: ColorTokenValue;
  primaryActive: ColorTokenValue;
  primarySubtle: ColorTokenValue;
  primarySubtleHover: ColorTokenValue;
  primaryBorder: ColorTokenValue;

  /* ── 语义色 ── */
  success: ColorTokenValue;
  successBg: ColorTokenValue;
  warning: ColorTokenValue;
  warningBg: ColorTokenValue;
  danger: ColorTokenValue;
  dangerBg: ColorTokenValue;
  info: ColorTokenValue;
  infoBg: ColorTokenValue;
  neutral: ColorTokenValue;
  neutralBg: ColorTokenValue;

  /* ── 禁用态 ── */
  disabledText: ColorTokenValue;
  disabledBg: ColorTokenValue;
  disabledBorder: ColorTokenValue;

  /* ── 文字色 ── */
  textPrimary: ColorTokenValue;
  textSecondary: ColorTokenValue;
  textTertiary: ColorTokenValue;
  textInverse: ColorTokenValue;
  textLink: ColorTokenValue;
  textError: ColorTokenValue;
  textSuccess: ColorTokenValue;

  /* ── 边框 ── */
  border: ColorTokenValue;
  borderHover: ColorTokenValue;
  borderActive: ColorTokenValue;
  borderMuted: ColorTokenValue;
  divider: ColorTokenValue;

  /* ── Header ── */
  headerBorder: ColorTokenValue;
  headerButtonBg: ColorTokenValue;

  /* ── Sidebar ── */
  sidebarItemHover: ColorTokenValue;
  sidebarItemActive: ColorTokenValue;
}

export interface ThemeColorSet {
  dark: ColorTokens;
  light: ColorTokens;
}

/**
 * 暗色主题色彩
 */
export const darkColors: ColorTokens = {
  /* ── 背景层级 ── */
  bgBase: '#17191C',
  bgSidebar: '#17191C',
  bgHeader: '#17191C',
  bgCard: '#222427',
  bgElevated: '#2C2E31',
  bgOverlay: 'rgba(0, 0, 0, 0.6)',
  bgInput: '#1d1f23',
  bgHover: '#2a2c30',
  contentBg: 'rgba(255,255,255,0.02)',

  /* ── 品牌色 ── */
  primary: '#5264E0',
  primaryHover: '#6B80F0',
  primaryActive: '#3F50C0',
  primarySubtle: 'rgba(82, 100, 224, 0.12)',
  primarySubtleHover: 'rgba(82, 100, 224, 0.18)',
  primaryBorder: 'rgba(82, 100, 224, 0.35)',

  /* ── 语义色 ── */
  success: '#43CB89',
  successBg: 'rgba(52, 199, 126, 0.15)',
  warning: '#FFA564',
  warningBg: 'rgba(240, 160, 48, 0.12)',
  danger: '#FF6464',
  dangerBg: 'rgba(229, 80, 80, 0.12)',
  info: '#5264E0',
  infoBg: 'rgba(82, 100, 224, 0.12)',
  neutral: '#8a8f99',
  neutralBg: 'rgba(200, 205, 215, 0.1)',

  /* ── 禁用态 ── */
  disabledText: '#50545c',
  disabledBg: '#1c1e21',
  disabledBorder: '#2a2d33',

  /* ── 文字色 ── */
  textPrimary: '#f2f3f5',
  textSecondary: '#8a8f99',
  textTertiary: '#6d717a',
  textInverse: '#ffffff',
  textLink: '#5264E0',
  textError: '#FF8A8A',
  textSuccess: '#6DE0A8',

  /* ── 边框 ── */
  border: '#323640',
  borderHover: '#5b62b8',
  borderActive: '#5264E0',
  borderMuted: '#3a3f4d',
  divider: '#323640',

  /* ── Header ── */
  headerBorder: 'rgba(255,255,255,0.1)',
  headerButtonBg: 'rgba(255,255,255,0.1)',

  /* ── Sidebar ── */
  sidebarItemHover: 'rgba(255,255,255,0.04)',
  sidebarItemActive: 'rgba(255,255,255,0.08)',
};

/**
 * 亮色主题色彩
 */
export const lightColors: ColorTokens = {
  /* ── 背景层级 ── */
  bgBase: '#f0f1f5',
  bgSidebar: '#f0f1f5',
  bgHeader: '#f0f1f5',
  bgCard: '#ffffff',
  bgElevated: '#f5f6fa',
  bgOverlay: 'rgba(0, 0, 0, 0.4)',
  bgInput: '#f5f6fa',
  bgHover: '#f5f6fa',
  contentBg: 'rgba(0,0,0,0.01)',

  /* ── 品牌色 ── */
  primary: '#5264E0',
  primaryHover: '#3F50C0',
  primaryActive: '#2D40B0',
  primarySubtle: 'rgba(82, 100, 224, 0.08)',
  primarySubtleHover: 'rgba(82, 100, 224, 0.14)',
  primaryBorder: 'rgba(82, 100, 224, 0.25)',

  /* ── 语义色 ── */
  success: '#43CB89',
  successBg: 'rgba(52, 199, 126, 0.12)',
  warning: '#FFA564',
  warningBg: 'rgba(240, 160, 48, 0.08)',
  danger: '#FF6464',
  dangerBg: 'rgba(229, 80, 80, 0.08)',
  info: '#5264E0',
  infoBg: 'rgba(82, 100, 224, 0.08)',
  neutral: '#8c8c8c',
  neutralBg: 'rgba(0, 0, 0, 0.04)',

  /* ── 禁用态 ── */
  disabledText: '#c8cbd0',
  disabledBg: '#ebebeb',
  disabledBorder: '#eeeff2',

  /* ── 文字色 ── */
  textPrimary: '#3d414a',
  textSecondary: '#787b84',
  textTertiary: '#b8bcc4',
  textInverse: '#ffffff',
  textLink: '#5264E0',
  textError: '#D44B4B',
  textSuccess: '#3AAA68',

  /* ── 边框 ── */
  border: '#e4e5e9',
  borderHover: '#d0d2d8',
  borderActive: '#5264E0',
  borderMuted: '#d0d2d8',
  divider: '#edf0f2',

  /* ── Header ── */
  headerBorder: '#e4e5e9',
  headerButtonBg: 'rgba(0,0,0,0.04)',

  /* ── Sidebar ── */
  sidebarItemHover: 'rgba(0,0,0,0.04)',
  sidebarItemActive: 'rgba(0,0,0,0.06)',
};

export const colors: ThemeColorSet = {
  dark: darkColors,
  light: lightColors,
};
