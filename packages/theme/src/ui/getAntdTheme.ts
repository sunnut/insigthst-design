/**
 * @insightst/theme/antd — Ant Design 适配层
 *
 * 从 core tokens 映射为 AntD ThemeConfig。
 * 所有颜色/阴影/字号值都 read from core tokens，此处不重新维护。
 */
import type { ThemeConfig } from 'antd';
import { darkColors, lightColors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';
import { darkShadows, lightShadows } from '../tokens/shadow';
import type { ColorTokens } from '../tokens/colors';

export type ThemeMode = 'light' | 'dark';

/* ───────── 允许业务覆盖的组件白名单 ───────── */
export type ThemeOverrides = Partial<{
  token: Partial<ThemeConfig['token']>;
  components: Partial<
    Pick<
      NonNullable<ThemeConfig['components']>,
      | 'Button'
      | 'Table'
      | 'Card'
      | 'Input'
      | 'Select'
      | 'Tag'
      | 'Modal'
      | 'Menu'
      | 'Layout'
      | 'Breadcrumb'
      | 'Pagination'
      | 'Checkbox'
      | 'Radio'
      | 'DatePicker'
    >
  >;
}>;

/* ═══════════════════════ 核心映射逻辑 ═══════════════════════ */

function mapToken(c: ColorTokens): ThemeConfig['token'] {
  return {
    colorPrimary: c.primary,
    colorPrimaryHover: c.primaryHover,
    colorPrimaryActive: c.primaryActive,
    colorPrimaryBg: c.primarySubtle,
    colorPrimaryBgHover: c.primarySubtleHover,
    colorPrimaryBorder: c.primaryBorder,
    colorPrimaryBorderHover: c.primaryBorder,
    colorPrimaryText: c.primary,
    colorPrimaryTextHover: c.primaryHover,
    colorPrimaryTextActive: c.primaryActive,

    colorSuccess: c.success,
    colorSuccessBg: c.successBg,
    colorSuccessBgHover: c.successBg,
    colorSuccessBorder: c.success,
    colorSuccessBorderHover: c.success,
    colorSuccessText: c.success,
    colorSuccessTextHover: c.success,
    colorSuccessTextActive: c.success,

    colorWarning: c.warning,
    colorWarningBg: c.warningBg,
    colorWarningBgHover: c.warningBg,
    colorWarningBorder: c.warning,
    colorWarningBorderHover: c.warning,
    colorWarningText: c.warning,
    colorWarningTextHover: c.warning,
    colorWarningTextActive: c.warning,

    colorError: c.danger,
    colorErrorBg: c.dangerBg,
    colorErrorBgHover: c.dangerBg,
    colorErrorBorder: c.danger,
    colorErrorBorderHover: c.danger,
    colorErrorText: c.danger,
    colorErrorTextHover: c.danger,
    colorErrorTextActive: c.danger,

    colorInfo: c.info,
    colorInfoBg: c.infoBg,
    colorInfoBgHover: c.infoBg,
    colorInfoBorder: c.info,
    colorInfoBorderHover: c.info,
    colorInfoText: c.info,
    colorInfoTextHover: c.info,
    colorInfoTextActive: c.info,

    colorText: c.textPrimary,
    colorTextSecondary: c.textSecondary,
    colorTextTertiary: c.textTertiary,
    colorTextQuaternary: c.textTertiary,
    colorTextPlaceholder: c.textTertiary,
    colorTextDisabled: c.disabledText,
    colorTextHeading: c.textPrimary,
    colorTextLabel: c.textSecondary,
    colorTextDescription: c.textSecondary,
    colorTextLightSolid: c.textInverse,

    colorBgLayout: c.bgBase,
    colorBgContainer: c.bgCard,
    colorBgElevated: c.bgElevated,
    colorBgSpotlight: c.bgElevated,
    colorBgMask: c.bgOverlay,

    colorBorder: c.border,
    colorBorderSecondary: c.divider,
    colorSplit: c.divider,

    colorFill: c.neutralBg,
    colorFillSecondary: c.neutralBg,
    colorFillTertiary: c.neutralBg,
    colorFillQuaternary: c.neutralBg,

    colorBgContainerDisabled: c.disabledBg,
    colorBorderDisabled: c.disabledBorder,

    colorLink: c.textLink,
    colorLinkHover: c.primaryHover,
    colorLinkActive: c.primaryActive,

    borderRadius: spacing.radiusMd,
    borderRadiusLG: spacing.radiusLg,
    borderRadiusSM: spacing.radiusSm,
    borderRadiusXS: spacing.radiusXs,

    fontSize: typography.body.size,
    fontSizeLG: typography.h3.size,
    fontSizeSM: typography.caption.size,
    fontSizeHeading1: typography.h1.size,
    fontSizeHeading2: typography.h2.size,
    fontSizeHeading3: typography.h3.size,

    fontFamily: typography.fontFamily,

    controlHeight: spacing.inputHeight,
    controlHeightSM: spacing.inputHeightSm,
    controlHeightLG: spacing.inputHeightLg,

    lineHeight: typography.body.lineHeight / typography.body.size,
    paddingContentHorizontal: spacing.space4,
    paddingContentVertical: spacing.space3,

    boxShadow: c.bgBase === '#17191C' ? darkShadows.z1 : lightShadows.z1,
    boxShadowSecondary: c.bgBase === '#17191C' ? darkShadows.z4 : lightShadows.z4,
  };
}

function mapComponents(c: ColorTokens): ThemeConfig['components'] {
  const isDark = c.bgBase === '#17191C';
  return {
    Layout: {
      bodyBg: c.bgBase,
      headerBg: c.bgHeader,
      siderBg: c.bgSidebar,
      triggerBg: c.bgCard,
      triggerColor: c.textSecondary,
    },
    Menu: {
      darkItemBg: c.bgSidebar,
      darkSubMenuItemBg: c.bgSidebar,
      darkItemColor: c.textSecondary,
      darkItemHoverColor: c.textPrimary,
      darkItemSelectedColor: c.primary,
      darkItemHoverBg: c.primarySubtle,
      darkItemSelectedBg: c.primarySubtle,
      itemBorderRadius: spacing.radiusMd,
      itemHeight: 38,
      iconSize: 16,
      collapsedIconSize: 16,
    },
    Button: {
      contentFontSize: typography.button.size,
      contentFontSizeSM: typography.caption.size,
      fontWeight: typography.button.weight,
      borderRadius: spacing.radiusMd,
      borderRadiusSM: spacing.radiusSm,
      borderRadiusLG: spacing.radiusLg,
      controlHeight: spacing.buttonHeight,
      controlHeightSM: spacing.buttonHeightSm,
      controlHeightLG: spacing.buttonHeightLg,
      paddingInline: spacing.space4,
      paddingInlineSM: spacing.space3,
      paddingInlineLG: spacing.space5,
      defaultBg: 'transparent',
      defaultColor: c.textPrimary,
      defaultBorderColor: c.borderMuted,
      defaultHoverBorderColor: c.primary,
      defaultHoverColor: c.primary,
      defaultActiveBorderColor: c.primary,
      defaultActiveColor: c.primary,
      defaultShadow: 'none',
      primaryShadow: 'none',
      dangerShadow: 'none',
    },
    Table: {
      headerBg: c.bgElevated,
      headerColor: c.textSecondary,
      rowHoverBg: isDark ? c.bgElevated : '#f8f9fc',
      // 须不透明：半透明 primarySubtle 会使 fixed 列与滚动列文字重叠
      rowSelectedBg: `color-mix(in srgb, ${c.primary} ${isDark ? '12%' : '8%'}, ${c.bgCard})`,
      rowSelectedHoverBg: `color-mix(in srgb, ${c.primary} ${isDark ? '18%' : '14%'}, ${c.bgCard})`,
      borderColor: c.border,
      headerBorderRadius: 0,
      cellPaddingBlock: spacing.space3,
      cellPaddingInline: spacing.space4,
      stickyScrollBarBg: isDark ? c.border : c.textTertiary,
      stickyScrollBarBorderRadius: 3,
    },
    Tag: {
      defaultBg: c.neutralBg,
      defaultColor: c.neutral,
      fontSizeSM: typography.caption.size,
      lineHeightSM: 1.5,
    },
    Card: {
      colorBgContainer: c.bgCard,
      borderRadiusLG: spacing.radiusLg,
      paddingLG: spacing.space5,
      boxShadow: c.bgBase === '#17191C' ? darkShadows.z1 : lightShadows.z1,
      boxShadowSecondary: c.bgBase === '#17191C' ? darkShadows.z4 : lightShadows.z4,
    },
    Modal: {
      contentBg: c.bgCard,
      headerBg: c.bgCard,
      titleColor: c.textPrimary,
      colorIcon: c.neutral,
      colorIconHover: c.textPrimary,
      borderRadiusLG: spacing.radiusXl,
      titleFontSize: typography.h3.size,
    },
    Input: {
      activeBg: c.bgInput,
      hoverBg: c.bgInput,
      activeBorderColor: c.primary,
      hoverBorderColor: c.primary,
      borderRadius: spacing.radiusMd,
      controlHeight: spacing.inputHeight,
      colorBgContainer: c.bgInput,
      colorBorder: c.border,
      colorText: c.textPrimary,
      colorTextPlaceholder: c.textTertiary,
    },
    Select: {
      optionActiveBg: c.primarySubtle,
      optionSelectedBg: c.primarySubtle,
      optionSelectedColor: c.primary,
      selectorBg: c.bgInput,
      colorBgElevated: c.bgElevated,
      colorBgContainer: c.bgInput,
      colorBorder: c.border,
      borderRadius: spacing.radiusMd,
      controlHeight: spacing.inputHeight,
    },
    DatePicker: {
      colorBgContainer: c.bgInput,
      colorBgElevated: c.bgElevated,
      colorBorder: c.border,
      colorText: c.textPrimary,
      colorTextPlaceholder: c.textTertiary,
      activeBorderColor: c.primary,
      hoverBorderColor: c.borderMuted,
      cellHoverBg: c.primarySubtle,
      cellActiveWithRangeBg: c.primarySubtle,
      cellRangeBorderColor: c.primary,
      borderRadius: spacing.radiusMd,
      controlHeight: spacing.inputHeight,
    },
    Breadcrumb: {
      itemColor: c.textSecondary,
      lastItemColor: c.textPrimary,
      linkColor: c.textSecondary,
      linkHoverColor: c.primary,
      separatorColor: c.textTertiary,
      fontSize: typography.button.size,
    },
    Pagination: {
      itemActiveBg: c.primary,
      itemActiveColor: c.textInverse,
      itemActiveColorHover: c.textInverse,
      itemBg: c.bgCard,
      colorPrimary: c.textInverse,
      colorPrimaryHover: c.textPrimary,
      colorBgContainer: c.bgCard,
      colorText: c.neutral,
      colorTextDisabled: c.textTertiary,
    },
    Checkbox: {
      colorPrimary: c.primary,
      colorPrimaryHover: c.primaryHover,
      colorBgContainer: c.bgInput,
      colorBorder: c.borderMuted,
      borderRadiusSM: spacing.radiusSm,
    },
    Radio: {
      colorPrimary: c.primary,
      colorPrimaryHover: c.primaryHover,
      buttonBg: c.bgInput,
      buttonColor: c.neutral,
      buttonSolidCheckedColor: c.textInverse,
      buttonSolidCheckedBg: c.primary,
      buttonSolidCheckedHoverBg: c.primaryHover,
      radioSize: 16,
      dotSize: 8,
    },
    Tooltip: {
      colorBgSpotlight: c.bgElevated,
      colorTextLightSolid: c.textPrimary,
      borderRadius: spacing.radiusLg,
      fontSize: typography.caption.size,
    },
    Steps: {
      iconSize: 36,
      titleLineHeight: 22,
      descriptionMaxWidth: 140,
      colorTextDescription: c.textSecondary,
    },
    Progress: {
      defaultColor: c.primary,
      remainingColor: c.bgElevated,
    },
    Switch: {
      colorPrimary: c.primary,
      colorPrimaryHover: c.primaryHover,
      trackHeightSM: 22,
      trackMinWidthSM: 40,
      handleSizeSM: 16,
    },
    Slider: {
      trackBg: c.border,
      trackHoverBg: c.border,
      railBg: c.border,
      railHoverBg: c.border,
      handleColor: isDark ? c.textInverse : c.primary,
      handleActiveColor: isDark ? c.textInverse : c.primary,
      handleSize: 16,
      handleSizeHover: 18,
      dotActiveBorderColor: c.primary,
      dotBorderColor: c.border,
    },
    Segmented: {
      itemColor: c.neutral,
      itemHoverColor: c.textPrimary,
      itemSelectedBg: c.primary,
      itemSelectedColor: c.textInverse,
      trackBg: c.bgCard,
    },
    Dropdown: {
      colorBgElevated: c.bgElevated,
      colorText: c.textPrimary,
      controlItemBgHover: c.primarySubtle,
      borderRadiusLG: spacing.radiusLg,
    },
    Popover: {
      colorBgElevated: c.bgElevated,
      colorText: c.textPrimary,
      borderRadiusLG: spacing.radiusLg,
    },
    Upload: {
      colorBgContainer: c.bgInput,
      colorBorder: c.border,
      colorPrimary: c.primary,
      colorText: c.textPrimary,
      colorTextSecondary: c.textSecondary,
      colorTextDisabled: c.textTertiary,
      colorError: c.danger,
      borderRadiusLG: spacing.radiusLg,
    },
    Alert: {
      colorSuccessBg: c.successBg,
      colorSuccessBorder: c.success,
      colorWarningBg: c.warningBg,
      colorWarningBorder: c.warning,
      colorErrorBg: c.dangerBg,
      colorErrorBorder: c.danger,
      colorInfoBg: c.infoBg,
      colorInfoBorder: c.info,
    },
    Spin: {
      colorPrimary: c.primary,
      dotSize: 36,
      dotSizeSM: 24,
      dotSizeLG: 48,
    },
    Empty: {
      colorTextDescription: c.neutral,
    },
    Typography: {
      colorText: c.textPrimary,
      colorTextHeading: c.textPrimary,
      colorTextSecondary: c.textSecondary,
      colorTextDescription: c.textSecondary,
    },
  };
}

/* ═══════════════════════ 导出 ═══════════════════════ */

export const lightTheme: ThemeConfig = {
  token: mapToken(lightColors),
  components: mapComponents(lightColors),
};

export const darkTheme: ThemeConfig = {
  token: mapToken(darkColors),
  components: mapComponents(darkColors),
};

export function getAntdTheme(
  mode: ThemeMode,
  overrides?: ThemeOverrides,
): ThemeConfig {
  const base = mode === 'dark' ? darkTheme : lightTheme;
  if (!overrides) return base;

  return {
    ...base,
    token: { ...base.token, ...overrides.token },
    components: {
      ...base.components,
      ...overrides.components,
    } as ThemeConfig['components'],
  };
}
