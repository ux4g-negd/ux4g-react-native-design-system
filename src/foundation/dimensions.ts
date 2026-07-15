/**
 * UX4G Design System Spacing, Radius, and Border Width Tokens
 * Direct port of the UX4G Flutter design system dimensions (`dimensions.dart`).
 */

export const Ux4gSpace = {
  spaceNone: 0,
  space2: 2,
  space4: 4,
  space6: 6,
  space8: 8,
  space12: 12,
  space16: 16,
  space20: 20,
  space24: 24,
  space32: 32,
  space40: 40,
  space48: 48,
  space56: 56,
  space64: 64,
  space80: 80,
} as const;

export type Ux4gSpaceToken = keyof typeof Ux4gSpace;

export const Ux4gRadius = {
  radiusNone: 0,
  radius2: 2,
  radius4: 4,
  radius8: 8,
  radius12: 12,
  radius16: 16,
  radius24: 24,
  radius999: 999,
} as const;

export type Ux4gRadiusToken = keyof typeof Ux4gRadius;

export const Ux4gBorderWidth = {
  none: 0,
  thin: 1,
  thick: 2,
  thicker: 3,
  thickest: 4,
} as const;

export type Ux4gBorderWidthToken = keyof typeof Ux4gBorderWidth;
