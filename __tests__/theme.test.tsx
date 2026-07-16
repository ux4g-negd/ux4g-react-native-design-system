import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import {
  Ux4gThemeProvider,
  useUx4gTheme,
  useUx4gStyleSheet,
  lightUx4gColors,
  darkUx4gColors,
  UX4GColors,
} from '../src';

describe('UX4G Theme Provider and Hooks', () => {
  it('should provide default light theme tokens when no props passed', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Ux4gThemeProvider>{children}</Ux4gThemeProvider>
    );

    const { result } = renderHook(() => useUx4gTheme(), { wrapper });

    expect(result.current.isDark).toBe(false);
    expect(result.current.colors.primary).toBe(lightUx4gColors.primary);
    expect(result.current.colors.background).toBe(lightUx4gColors.background);
  });

  it('should provide dark theme tokens when isDark=true', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Ux4gThemeProvider isDark={true}>{children}</Ux4gThemeProvider>
    );

    const { result } = renderHook(() => useUx4gTheme(), { wrapper });

    expect(result.current.isDark).toBe(true);
    expect(result.current.colors.primary).toBe(darkUx4gColors.primary);
    expect(result.current.colors.background).toBe(darkUx4gColors.background);
  });

  it('should allow dynamic theme toggling via toggleTheme() and setTheme()', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Ux4gThemeProvider isDark={false}>{children}</Ux4gThemeProvider>
    );

    const { result } = renderHook(() => useUx4gTheme(), { wrapper });

    expect(result.current.isDark).toBe(false);

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.isDark).toBe(true);
    expect(result.current.colors.primary).toBe(darkUx4gColors.primary);

    act(() => {
      result.current.setTheme(false);
    });
    expect(result.current.isDark).toBe(false);
    expect(result.current.colors.primary).toBe(lightUx4gColors.primary);
  });

  it('should support custom color token overrides on top of base theme', () => {
    const customPrimary = '#999999';
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Ux4gThemeProvider colors={{ primary: customPrimary }}>
        {children}
      </Ux4gThemeProvider>
    );

    const { result } = renderHook(() => useUx4gTheme(), { wrapper });

    expect(result.current.colors.primary).toBe(customPrimary);
    // Unchanged tokens should remain intact
    expect(result.current.colors.secondary).toBe(lightUx4gColors.secondary);
  });

  it('should dynamically generate memoized style definitions using useUx4gStyleSheet', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Ux4gThemeProvider>{children}</Ux4gThemeProvider>
    );

    const { result } = renderHook(
      () =>
        useUx4gStyleSheet((theme) => ({
          container: {
            backgroundColor: theme.colors.background,
            padding: theme.space.space16,
          },
        })),
      { wrapper }
    );

    expect(result.current.container.backgroundColor).toBe(
      lightUx4gColors.background
    );
    expect(result.current.container.padding).toBe(16);
  });
});
