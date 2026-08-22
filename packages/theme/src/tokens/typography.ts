/**
 * Core Typography Tokens
 */
export interface TypographyTokens {
  fontFamily: string;
  fontFamilyMono: string;

  h1: { size: number; lineHeight: number; weight: number };
  h2: { size: number; lineHeight: number; weight: number };
  h3: { size: number; lineHeight: number; weight: number };
  body: { size: number; lineHeight: number; weight: number };
  small: { size: number; lineHeight: number; weight: number };
  caption: { size: number; lineHeight: number; weight: number };
  button: { size: number; lineHeight: number; weight: number };
  data: { size: number; lineHeight: number; weight: number };
}

export const typography: TypographyTokens = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
  fontFamilyMono: '"SF Mono", "Fira Code", Consolas, monospace',

  h1: { size: 24, lineHeight: 32, weight: 600 },
  h2: { size: 18, lineHeight: 26, weight: 600 },
  h3: { size: 16, lineHeight: 24, weight: 500 },
  body: { size: 14, lineHeight: 22, weight: 400 },
  small: { size: 13, lineHeight: 20, weight: 400 },
  caption: { size: 12, lineHeight: 18, weight: 400 },
  button: { size: 14, lineHeight: 22, weight: 500 },
  data: { size: 28, lineHeight: 36, weight: 600 },
};
