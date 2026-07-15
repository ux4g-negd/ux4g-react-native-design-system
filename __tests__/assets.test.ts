import { Ux4gAssets, Ux4gAssetIcons, Ux4gAssetImages } from '../src';

describe('UX4G Design System Asset Registry', () => {
  it('should export all primary SVG icon mappings ported from Flutter design system', () => {
    expect(Ux4gAssetIcons.digitalIndiaLogo).toBeDefined();
    expect(Ux4gAssetIcons.nationalEmblemLogo).toBeDefined();
    expect(Ux4gAssetIcons.androidWhite).toBeDefined();
    expect(Ux4gAssetIcons.inbox).toBeDefined();
    expect(Ux4gAssetIcons.icFace0).toBeDefined();
    expect(Ux4gAssetIcons.verification).toBeDefined();
  });

  it('should export PNG image mappings', () => {
    expect(Ux4gAssetImages.digitalIndiaLogoPng).toBeDefined();
  });

  it('should group both icons and images cleanly under Ux4gAssets', () => {
    expect(Ux4gAssets.icons).toBe(Ux4gAssetIcons);
    expect(Ux4gAssets.images).toBe(Ux4gAssetImages);
  });
});
