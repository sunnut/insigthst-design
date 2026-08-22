/**
 * Core Shadow Tokens
 */
export interface ShadowTokens {
  z0: string;
  z1: string;
  z2: string;
  z4: string;
  z8: string;
  z16: string;
}

export interface ThemeShadowSet {
  dark: ShadowTokens;
  light: ShadowTokens;
}

export const darkShadows: ShadowTokens = {
  z0: 'none',
  z1: '0 1px 2px rgba(0,0,0,0.06)',
  z2: '0 2px 8px rgba(0,0,0,0.10)',
  z4: '0 4px 16px rgba(0,0,0,0.14)',
  z8: '0 8px 32px rgba(0,0,0,0.22)',
  z16: '0 16px 48px rgba(0,0,0,0.28)',
};

export const lightShadows: ShadowTokens = {
  z0: 'none',
  z1: '0 1px 2px rgba(0,0,0,0.02)',
  z2: '0 2px 8px rgba(0,0,0,0.04)',
  z4: '0 4px 16px rgba(0,0,0,0.06)',
  z8: '0 8px 32px rgba(0,0,0,0.08)',
  z16: '0 16px 48px rgba(0,0,0,0.10)',
};

export const shadows: ThemeShadowSet = {
  dark: darkShadows,
  light: lightShadows,
};
