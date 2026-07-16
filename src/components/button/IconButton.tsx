import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  PressableProps,
  PressableStateCallbackType,
  Platform,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { Ux4gPalette } from '../../foundation/colors';
import { Ux4gButtonVariant, Ux4gIconProp } from './Button';
import { Ux4gSpinner } from '../spinner/Spinner';

export interface Ux4gIconButtonProps
  extends Omit<PressableProps, 'style' | 'children' | 'disabled'> {
  /** Icon element or callback (`({ color, size }) => ReactNode`) */
  icon: Ux4gIconProp;
  /** Whether the icon button is currently in a loading state. When `true`, displays `<Ux4gSpinner />` instead of icon. Defaults to `false`. */
  isLoading?: boolean;
  /** Button style variant (`'primary' | 'secondary' | 'outline' | 'ghost'`). Defaults to `'primary'`. */
  variant?: Ux4gButtonVariant;
  /** Square width and height dimension in points. Defaults to `40`. */
  size?: number;
  /** Whether the icon button is interactive. Defaults to `true`. */
  enabled?: boolean;
  /** Direct override for background color */
  backgroundColor?: string;
  /** Direct override for icon foreground color */
  contentColor?: string;
  /** Direct override for border color */
  borderColor?: string;
  /** Direct override for corner radius */
  borderRadius?: number;
  /** Elevation shadow for Android / shadow style for iOS */
  elevation?: number;
  /** Style override for button container */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
}

const getHexWithAlpha = (baseHex: string, alphaHex: string = '1F'): string => {
  if (!baseHex || !baseHex.startsWith('#')) return baseHex;
  const cleanHex = baseHex.slice(0, 7);
  return `${cleanHex}${alphaHex}`;
};

export const Ux4gIconButton: React.FC<Ux4gIconButtonProps> = ({
  icon,
  isLoading = false,
  variant = 'primary',
  size = 40,
  enabled = true,
  backgroundColor,
  contentColor,
  borderColor,
  borderRadius,
  elevation = 0,
  style,
  onPress,
  testID,
  accessibilityLabel,
  accessibilityRole = 'button',
  ...restProps
}) => {
  const theme = useUx4gTheme();

  let baseBgColor = theme.colors.primary;
  let baseContentColor = theme.colors.onPrimary;
  let baseBorderColor = 'transparent';
  let baseBorderWidth = 0;

  switch (variant) {
    case 'primary':
      baseBgColor = theme.colors.primary;
      baseContentColor = theme.colors.onPrimary;
      break;
    case 'secondary':
      baseBgColor = theme.colors.secondary;
      baseContentColor = theme.colors.onSecondary;
      break;
    case 'outline':
      baseBgColor = 'transparent';
      baseContentColor = theme.colors.primary;
      baseBorderColor = theme.colors.primary;
      baseBorderWidth = 1;
      break;
    case 'ghost':
      baseBgColor = 'transparent';
      baseContentColor = theme.colors.primary;
      break;
  }

  const isInteractive = enabled && !isLoading;

  const outlineSharedColor =
    variant === 'outline'
      ? (contentColor ?? borderColor ?? baseContentColor)
      : undefined;

  const effectiveBgColor = isInteractive
    ? backgroundColor ?? baseBgColor
    : variant === 'primary' || variant === 'secondary'
    ? getHexWithAlpha(theme.colors.onSurface, '1F')
    : 'transparent';

  const effectiveContentColor = isInteractive
    ? (variant === 'outline'
        ? outlineSharedColor!
        : contentColor ?? baseContentColor)
    : getHexWithAlpha(theme.colors.onSurface, '61');

  const effectiveBorderColor = isInteractive
    ? (variant === 'outline'
        ? outlineSharedColor!
        : borderColor ?? baseBorderColor)
    : variant === 'outline'
    ? getHexWithAlpha(theme.colors.onSurface, '1F')
    : 'transparent';

  const effectiveBorderRadius = borderRadius ?? theme.radius.radius8;
  const iconPixelSize = size * 0.6;

  const renderIcon = (): React.ReactNode => {
    if (typeof icon === 'function') {
      return icon({ color: effectiveContentColor, size: iconPixelSize });
    }
    return icon;
  };

  const rippleColor = getHexWithAlpha(effectiveContentColor, '1F');

  return (
    <Pressable
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: !isInteractive, busy: isLoading }}
      disabled={!isInteractive}
      onPress={onPress}
      android_ripple={
        isInteractive
          ? { color: rippleColor, borderless: false }
          : undefined
      }
      style={(state) => {
        const customStyle =
          typeof style === 'function' ? style(state) : style;

        const pressedBgColor =
          state.pressed && isInteractive && Platform.OS !== 'android'
            ? (variant === 'outline' || variant === 'ghost'
                ? rippleColor
                : getHexWithAlpha(theme.colors.onSurface, '1F'))
            : effectiveBgColor;

        return [
          styles.container,
          {
            width: size,
            height: size,
            backgroundColor: pressedBgColor,
            borderColor: effectiveBorderColor,
            borderWidth: baseBorderWidth,
            borderRadius: effectiveBorderRadius,
            opacity: state.pressed && isInteractive && Platform.OS !== 'android' ? 0.85 : 1,
          },
          elevation > 0
            ? {
                elevation,
                shadowColor: Ux4gPalette.neutral1000black,
                shadowOffset: { width: 0, height: elevation * 0.5 },
                shadowOpacity: 0.15,
                shadowRadius: elevation * 0.8,
              }
            : undefined,
          customStyle,
        ];
      }}
      {...restProps}
    >
      <View style={styles.iconWrapper}>
        {isLoading ? (
          <Ux4gSpinner
            size={iconPixelSize}
            color={effectiveContentColor}
            strokeWidth={Math.max(2, Math.round(iconPixelSize * 0.125))}
            testID={`${testID ?? 'ux4g-icon-button'}-loader`}
          />
        ) : (
          renderIcon()
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
