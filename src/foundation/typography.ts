/**
 * UX4G Design System Typography Tokens
 * Direct port of the UX4G Flutter design system typography (`typography.dart`).
 */

export type Ux4gFontWeight = '400' | '500' | '600' | '700';

export interface Ux4gTextStyle {
  fontSize: number;
  fontWeight: Ux4gFontWeight;
  lineHeight: number;
}

export interface Ux4gTypography {
  // Header
  hXXS_default: Ux4gTextStyle;
  hXXS_strong: Ux4gTextStyle;
  hXS_default: Ux4gTextStyle;
  hXS_strong: Ux4gTextStyle;
  hS_default: Ux4gTextStyle;
  hS_strong: Ux4gTextStyle;
  hM_default: Ux4gTextStyle;
  hM_strong: Ux4gTextStyle;
  hL_default: Ux4gTextStyle;
  hL_strong: Ux4gTextStyle;
  hXL_default: Ux4gTextStyle;
  hXL_strong: Ux4gTextStyle;
  hXXL_default: Ux4gTextStyle;
  hXXL_strong: Ux4gTextStyle;

  // Display
  dXS_default: Ux4gTextStyle;
  dXS_strong: Ux4gTextStyle;
  dS_default: Ux4gTextStyle;
  dS_strong: Ux4gTextStyle;
  dM_default: Ux4gTextStyle;
  dM_strong: Ux4gTextStyle;
  dL_default: Ux4gTextStyle;
  dL_strong: Ux4gTextStyle;

  // Body
  bXS_default: Ux4gTextStyle;
  bXS_strong: Ux4gTextStyle;
  bS_default: Ux4gTextStyle;
  bS_strong: Ux4gTextStyle;
  bM_default: Ux4gTextStyle;
  bM_strong: Ux4gTextStyle;
  bL_default: Ux4gTextStyle;
  bL_strong: Ux4gTextStyle;

  // Label
  lS_default: Ux4gTextStyle;
  lS_strong: Ux4gTextStyle;
  lM_default: Ux4gTextStyle;
  lM_strong: Ux4gTextStyle;
  lL_default: Ux4gTextStyle;
  lL_strong: Ux4gTextStyle;
  lXL_default: Ux4gTextStyle;
  lXL_strong: Ux4gTextStyle;

  // Title
  tS_default: Ux4gTextStyle;
  tS_strong: Ux4gTextStyle;
  tM_default: Ux4gTextStyle;
  tM_strong: Ux4gTextStyle;
  tL_default: Ux4gTextStyle;
  tL_strong: Ux4gTextStyle;
}

export const defaultUx4gTypography: Ux4gTypography = {
  // Header
  hXXS_default: { fontWeight: '600', fontSize: 14, lineHeight: 16 },
  hXXS_strong: { fontWeight: '700', fontSize: 14, lineHeight: 16 },
  hXS_default: { fontWeight: '600', fontSize: 16, lineHeight: 20 },
  hXS_strong: { fontWeight: '700', fontSize: 16, lineHeight: 20 },
  hS_default: { fontWeight: '600', fontSize: 20, lineHeight: 24 },
  hS_strong: { fontWeight: '700', fontSize: 20, lineHeight: 24 },
  hM_default: { fontWeight: '600', fontSize: 24, lineHeight: 28 },
  hM_strong: { fontWeight: '700', fontSize: 24, lineHeight: 28 },
  hL_default: { fontWeight: '600', fontSize: 28, lineHeight: 32 },
  hL_strong: { fontWeight: '700', fontSize: 28, lineHeight: 32 },
  hXL_default: { fontWeight: '600', fontSize: 32, lineHeight: 36 },
  hXL_strong: { fontWeight: '700', fontSize: 32, lineHeight: 36 },
  hXXL_default: { fontWeight: '600', fontSize: 40, lineHeight: 44 },
  hXXL_strong: { fontWeight: '700', fontSize: 40, lineHeight: 44 },

  // Display
  dXS_default: { fontWeight: '600', fontSize: 36, lineHeight: 44 },
  dXS_strong: { fontWeight: '700', fontSize: 36, lineHeight: 44 },
  dS_default: { fontWeight: '600', fontSize: 40, lineHeight: 52 },
  dS_strong: { fontWeight: '700', fontSize: 40, lineHeight: 52 },
  dM_default: { fontWeight: '600', fontSize: 52, lineHeight: 72 },
  dM_strong: { fontWeight: '700', fontSize: 52, lineHeight: 72 },
  dL_default: { fontWeight: '600', fontSize: 60, lineHeight: 80 },
  dL_strong: { fontWeight: '700', fontSize: 60, lineHeight: 80 },

  // Body
  bXS_default: { fontWeight: '500', fontSize: 11, lineHeight: 14 },
  bXS_strong: { fontWeight: '700', fontSize: 11, lineHeight: 14 },
  bS_default: { fontWeight: '500', fontSize: 12, lineHeight: 16 },
  bS_strong: { fontWeight: '700', fontSize: 12, lineHeight: 16 },
  bM_default: { fontWeight: '500', fontSize: 14, lineHeight: 18 },
  bM_strong: { fontWeight: '700', fontSize: 14, lineHeight: 18 },
  bL_default: { fontWeight: '500', fontSize: 16, lineHeight: 20 },
  bL_strong: { fontWeight: '700', fontSize: 16, lineHeight: 20 },

  // Label
  lS_default: { fontWeight: '500', fontSize: 11, lineHeight: 14 },
  lS_strong: { fontWeight: '700', fontSize: 11, lineHeight: 14 },
  lM_default: { fontWeight: '500', fontSize: 12, lineHeight: 16 },
  lM_strong: { fontWeight: '700', fontSize: 12, lineHeight: 16 },
  lL_default: { fontWeight: '500', fontSize: 14, lineHeight: 18 },
  lL_strong: { fontWeight: '700', fontSize: 14, lineHeight: 18 },
  lXL_default: { fontWeight: '500', fontSize: 16, lineHeight: 20 },
  lXL_strong: { fontWeight: '700', fontSize: 16, lineHeight: 20 },

  // Title
  tS_default: { fontWeight: '400', fontSize: 14, lineHeight: 20 },
  tS_strong: { fontWeight: '600', fontSize: 14, lineHeight: 20 },
  tM_default: { fontWeight: '400', fontSize: 16, lineHeight: 24 },
  tM_strong: { fontWeight: '600', fontSize: 16, lineHeight: 24 },
  tL_default: { fontWeight: '400', fontSize: 18, lineHeight: 24 },
  tL_strong: { fontWeight: '600', fontSize: 18, lineHeight: 24 },
};
