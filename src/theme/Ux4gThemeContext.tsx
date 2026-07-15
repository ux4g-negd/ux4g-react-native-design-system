import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Ux4gColors, lightUx4gColors, darkUx4gColors } from '../foundation/colors';
import { Ux4gTypography, defaultUx4gTypography } from '../foundation/typography';
import { Ux4gSpace, Ux4gRadius, Ux4gBorderWidth } from '../foundation/dimensions';

export interface Ux4gThemeData {
  isDark: boolean;
  colors: Ux4gColors;
  typography: Ux4gTypography;
  space: typeof Ux4gSpace;
  radius: typeof Ux4gRadius;
  borderWidth: typeof Ux4gBorderWidth;
  setTheme: (isDark: boolean) => void;
  toggleTheme: () => void;
}

const defaultThemeData: Ux4gThemeData = {
  isDark: false,
  colors: lightUx4gColors,
  typography: defaultUx4gTypography,
  space: Ux4gSpace,
  radius: Ux4gRadius,
  borderWidth: Ux4gBorderWidth,
  setTheme: () => {},
  toggleTheme: () => {},
};

export const Ux4gThemeContext = createContext<Ux4gThemeData>(defaultThemeData);

export interface Ux4gThemeProviderProps {
  children: React.ReactNode;
  /** Initial or controlled dark theme state */
  isDark?: boolean;
  /** Custom color overrides applied on top of light/dark defaults */
  colors?: Partial<Ux4gColors>;
  /** Custom typography overrides applied on top of default scale */
  typography?: Partial<Ux4gTypography>;
}

export const Ux4gThemeProvider: React.FC<Ux4gThemeProviderProps> = ({
  children,
  isDark: initialIsDark = false,
  colors: customColors,
  typography: customTypography,
}) => {
  const [isDarkState, setIsDarkState] = useState<boolean>(initialIsDark);

  useEffect(() => {
    setIsDarkState(initialIsDark);
  }, [initialIsDark]);

  const toggleTheme = () => {
    setIsDarkState((prev) => !prev);
  };

  const setTheme = (dark: boolean) => {
    setIsDarkState(dark);
  };

  const themeData: Ux4gThemeData = useMemo(() => {
    const baseColors = isDarkState ? darkUx4gColors : lightUx4gColors;
    const mergedColors: Ux4gColors = customColors
      ? { ...baseColors, ...customColors }
      : baseColors;

    const mergedTypography: Ux4gTypography = customTypography
      ? { ...defaultUx4gTypography, ...customTypography }
      : defaultUx4gTypography;

    return {
      isDark: isDarkState,
      colors: mergedColors,
      typography: mergedTypography,
      space: Ux4gSpace,
      radius: Ux4gRadius,
      borderWidth: Ux4gBorderWidth,
      setTheme,
      toggleTheme,
    };
  }, [isDarkState, customColors, customTypography]);

  return (
    <Ux4gThemeContext.Provider value={themeData}>
      {children}
    </Ux4gThemeContext.Provider>
  );
};

/**
 * Hook to access current UX4G theme tokens (`colors`, `typography`, `space`, `radius`, `borderWidth`, and theme controls).
 */
export const useUx4gTheme = (): Ux4gThemeData => {
  const context = useContext(Ux4gThemeContext);
  if (!context) {
    throw new Error('useUx4gTheme must be used within a <Ux4gThemeProvider>');
  }
  return context;
};

/**
 * Hook to create dynamic, memoized React Native styles that recalculate automatically when theme tokens change.
 *
 * @example
 * ```tsx
 * const styles = useUx4gStyleSheet((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.primary,
 *     padding: theme.space.space16,
 *     borderRadius: theme.radius.radius8,
 *   },
 * }));
 * ```
 */
export const useUx4gStyleSheet = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
  createStyles: (theme: Ux4gThemeData) => T
): T => {
  const theme = useUx4gTheme();
  return useMemo(() => StyleSheet.create(createStyles(theme)), [
    theme.isDark,
    theme.colors,
    theme.typography,
  ]);
};
