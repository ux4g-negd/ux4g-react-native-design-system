import {
  Ux4gPalette,
  lightUx4gColors,
  darkUx4gColors,
  defaultUx4gTypography,
  Ux4gSpace,
  Ux4gRadius,
  Ux4gBorderWidth,
} from '../src';

describe('UX4G React Native Design System Tokens', () => {
  describe('Color Palette Tokens', () => {
    it('should exact match key primary, secondary, and neutral colors from Flutter design system', () => {
      expect(Ux4gPalette.primary600).toBe('#4A2BC2');
      expect(Ux4gPalette.primary300).toBe('#A391FF');
      expect(Ux4gPalette.secondary600).toBe('#A46800');
      expect(Ux4gPalette.neutral0).toBe('#FFFFFF');
      expect(Ux4gPalette.neutral900).toBe('#171717');
      expect(Ux4gPalette.neutral1000black).toBe('#000000');
    });

    it('should exact match semantic colors for light and dark themes', () => {
      expect(lightUx4gColors.primary).toBe(Ux4gPalette.primary600);
      expect(lightUx4gColors.onPrimary).toBe(Ux4gPalette.neutral50);
      expect(lightUx4gColors.background).toBe(Ux4gPalette.neutral50);
      expect(lightUx4gColors.surface).toBe(Ux4gPalette.white);
      expect(lightUx4gColors.error).toBe(Ux4gPalette.red600);

      expect(darkUx4gColors.primary).toBe(Ux4gPalette.primary300);
      expect(darkUx4gColors.onPrimary).toBe(Ux4gPalette.neutral900);
      expect(darkUx4gColors.background).toBe(Ux4gPalette.neutral900);
      expect(darkUx4gColors.surface).toBe(Ux4gPalette.neutral950);
      expect(darkUx4gColors.error).toBe(Ux4gPalette.red300);
    });
  });

  describe('Typography Scale Tokens', () => {
    it('should exact match font sizes, weights, and line heights for all scale categories', () => {
      // Header
      expect(defaultUx4gTypography.hXXS_default).toEqual({
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 16,
      });
      expect(defaultUx4gTypography.hXXL_strong).toEqual({
        fontWeight: '700',
        fontSize: 40,
        lineHeight: 44,
      });

      // Display
      expect(defaultUx4gTypography.dL_strong).toEqual({
        fontWeight: '700',
        fontSize: 60,
        lineHeight: 80,
      });

      // Body
      expect(defaultUx4gTypography.bM_default).toEqual({
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
      });

      // Label
      expect(defaultUx4gTypography.lXL_strong).toEqual({
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20,
      });

      // Title
      expect(defaultUx4gTypography.tL_strong).toEqual({
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 24,
      });
    });
  });

  describe('Dimension & Spacing Tokens', () => {
    it('should verify spacing constants scale correctly', () => {
      expect(Ux4gSpace.spaceNone).toBe(0);
      expect(Ux4gSpace.space4).toBe(4);
      expect(Ux4gSpace.space16).toBe(16);
      expect(Ux4gSpace.space24).toBe(24);
      expect(Ux4gSpace.space80).toBe(80);
    });

    it('should verify corner radius and border width scales', () => {
      expect(Ux4gRadius.radiusNone).toBe(0);
      expect(Ux4gRadius.radius8).toBe(8);
      expect(Ux4gRadius.radius999).toBe(999);

      expect(Ux4gBorderWidth.none).toBe(0);
      expect(Ux4gBorderWidth.thin).toBe(1);
      expect(Ux4gBorderWidth.thick).toBe(2);
      expect(Ux4gBorderWidth.thickest).toBe(4);
    });
  });
});
