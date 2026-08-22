/**
 * Core Spacing & Layout Tokens
 */
export interface SpacingTokens {
  /** 4px 栅格刻度 */
  space1: number;   // 4
  space2: number;   // 8
  space3: number;   // 12
  space4: number;   // 16
  space5: number;   // 20
  space6: number;   // 24
  space8: number;   // 32
  space10: number;  // 40
  space12: number;  // 48
  space16: number;  // 64

  /** 布局尺寸 */
  headerHeight: number;               // 56
  sidebarWidth: number;               // 200
  sidebarCollapsedWidth: number;      // 56
  contentPaddingX: number;            // 32
  contentPaddingY: number;            // 24

  /** 圆角 */
  radiusXs: number;  // 2
  radiusSm: number;  // 4
  radiusMd: number;  // 6
  radiusLg: number;  // 8
  radiusXl: number;  // 12
  radiusFull: number; // 9999

  /** 组件基准尺寸 */
  buttonHeight: number;    // 36
  buttonHeightSm: number;  // 28
  buttonHeightLg: number;  // 40
  inputHeight: number;     // 36
  inputHeightSm: number;   // 28
  inputHeightLg: number;   // 40
}

export const spacing: SpacingTokens = {
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
  inputHeightLg: 40,
};
