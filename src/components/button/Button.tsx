import React from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
  PressableStateCallbackType,
  DimensionValue,
  Platform,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { Ux4gPalette } from '../../foundation/colors';
import { Ux4gSpinner } from '../spinner/Spinner';

export type Ux4gButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export type Ux4gButtonSize = 'small' | 'medium' | 'large';

export type Ux4gIconProp =
  | React.ReactNode
  | ((props: { color: string; size: number }) => React.ReactNode);

export interface Ux4gButtonProps
  extends Omit<PressableProps, 'style' | 'children' | 'disabled'> {
  /** Text label inside the button */
  text?: string;
  /** Custom child content overriding or supplementing `text` */
  children?: React.ReactNode;
  /** Visual button style variant. Defaults to `'primary'`. */
  variant?: Ux4gButtonVariant;
  /** Button sizing preset. Defaults to `'medium'`. */
  size?: Ux4gButtonSize;
  /** Whether button is interactive and enabled. Defaults to `true`. */
  enabled?: boolean;
  /** Whether button displays an ActivityIndicator and prevents press. Defaults to `false`. */
  isLoading?: boolean;
  /** Direct override for button background color */
  backgroundColor?: string;
  /** Direct override for button foreground text/icon color */
  contentColor?: string;
  /** Direct override for background color when disabled */
  disabledBackgroundColor?: string;
  /** Direct override for foreground content color when disabled */
  disabledContentColor?: string;
  /** Direct override for border color */
  borderColor?: string;
  /** Direct override for border width */
  borderWidth?: number;
  /** Direct override for corner radius */
  borderRadius?: number;
  /** Explicit horizontal/vertical padding override */
  paddingHorizontal?: number;
  paddingVertical?: number;
  /** Leading icon rendered before text */
  leadingIcon?: Ux4gIconProp;
  /** Trailing icon rendered after text */
  trailingIcon?: Ux4gIconProp;
  /** Explicit icon size across leading/trailing icons */
  iconSize?: number;
  /** Explicit width dimension */
  width?: DimensionValue;
  /** Explicit height dimension */
  height?: number;
  /** Elevation shadow for Android / shadow style for iOS */
  elevation?: number;
  /** Style override for main button container */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  /** Style override for inner horizontal flex row (`leadingIcon` + `text` + `trailingIcon`) */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Style override for typography of the button `text` */
  textStyle?: StyleProp<TextStyle>;
}

const SIZE_CONFIG: Record<
  Ux4gButtonSize,
  {
    horizontalPadding: number;
    verticalPadding: number;
    defaultHeight: number;
    typographyKey: 'lL_default' | 'lXL_default';
    defaultIconSize: number;
  }
> = {
  small: {
    horizontalPadding: 16,
    verticalPadding: 7,
    defaultHeight: 32,
    typographyKey: 'lL_default',
    defaultIconSize: 16,
  },
  medium: {
    horizontalPadding: 20,
    verticalPadding: 10,
    defaultHeight: 40,
    typographyKey: 'lXL_default',
    defaultIconSize: 18,
  },
  large: {
    horizontalPadding: 24,
    verticalPadding: 14,
    defaultHeight: 48,
    typographyKey: 'lXL_default',
    defaultIconSize: 20,
  },
};

/**
 * Helper to append hex opacity ('1F' for 12%, '61' for 38%) to 7-char or 9-char hex strings.
 */
const getHexWithAlpha = (baseHex: string, alphaHex: string = '1F'): string => {
  if (!baseHex || !baseHex.startsWith('#')) return baseHex;
  const cleanHex = baseHex.slice(0, 7); // Strip any existing alpha
  return `${cleanHex}${alphaHex}`;
};

export const Ux4gButton: React.FC<Ux4gButtonProps> = ({
  text,
  children,
  variant = 'primary',
  size = 'medium',
  enabled = true,
  isLoading = false,
  backgroundColor,
  contentColor,
  disabledBackgroundColor,
  disabledContentColor,
  borderColor,
  borderWidth,
  borderRadius,
  paddingHorizontal,
  paddingVertical,
  leadingIcon,
  trailingIcon,
  iconSize,
  width,
  height,
  elevation = 0,
  style,
  contentContainerStyle,
  textStyle,
  onPress,
  testID,
  accessibilityLabel,
  accessibilityRole = 'button',
  ...restProps
}) => {
  const theme = useUx4gTheme();
  const sizeCfg = SIZE_CONFIG[size];

  // 1. Resolve base theme colors by variant
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

  // 2. Compute effective colors with direct prop overrides and disabled opacities
  const isInteractive = enabled && !isLoading;

  // When button is outlinebutton, border and text color should be same as per the flutter button component
  const outlineSharedColor =
    variant === 'outline'
      ? (contentColor ?? borderColor ?? baseContentColor)
      : undefined;

  const effectiveBgColor = isInteractive
    ? backgroundColor ?? baseBgColor
    : disabledBackgroundColor ??
      (variant === 'primary' || variant === 'secondary'
        ? getHexWithAlpha(theme.colors.onSurface, '1F') // 12% alpha
        : 'transparent');

  const effectiveContentColor = isInteractive
    ? (variant === 'outline'
        ? outlineSharedColor!
        : contentColor ?? baseContentColor)
    : disabledContentColor ?? getHexWithAlpha(theme.colors.onSurface, '61'); // 38% alpha

  const effectiveBorderColor = isInteractive
    ? (variant === 'outline'
        ? outlineSharedColor!
        : borderColor ?? baseBorderColor)
    : borderColor ??
      (variant === 'outline'
        ? getHexWithAlpha(theme.colors.onSurface, '1F')
        : 'transparent');

  const effectiveBorderWidth = borderWidth ?? baseBorderWidth;
  const effectiveBorderRadius = borderRadius ?? theme.radius.radius8;
  const effectiveHeight = height ?? sizeCfg.defaultHeight;
  const effectiveIconSize = iconSize ?? sizeCfg.defaultIconSize;

  // 3. Resolve typography
  const typoStyle = theme.typography[sizeCfg.typographyKey];
  const resolvedTextStyle: StyleProp<TextStyle> = [
    {
      fontSize: typoStyle.fontSize,
      fontWeight: typoStyle.fontWeight,
      lineHeight: typoStyle.lineHeight,
      color: effectiveContentColor,
      textAlign: 'center',
      textAlignVertical: 'center',
      includeFontPadding: false,
    },
    textStyle,
  ];

  // 4. Helper to render icon prop
  const renderIconNode = (iconProp?: Ux4gIconProp): React.ReactNode => {
    if (!iconProp) return null;
    if (typeof iconProp === 'function') {
      return iconProp({ color: effectiveContentColor, size: effectiveIconSize });
    }
    return iconProp;
  };

  // When button is outlinebutton (and across variants), ripple effect color should be same as border/text color (12% alpha overlay)
  const rippleColor = getHexWithAlpha(effectiveContentColor, '1F');

  return (
    <Pressable
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? text}
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
            backgroundColor: pressedBgColor,
            borderColor: effectiveBorderColor,
            borderWidth: effectiveBorderWidth,
            borderRadius: effectiveBorderRadius,
            height: effectiveHeight,
            paddingHorizontal: paddingHorizontal ?? sizeCfg.horizontalPadding,
            paddingVertical: paddingVertical ?? sizeCfg.verticalPadding,
            opacity: state.pressed && isInteractive && Platform.OS !== 'android' ? 0.85 : 1,
          },
          width !== undefined ? { width } : undefined,
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
      <View style={[styles.contentRow, contentContainerStyle]}>
        {isLoading && (
          <Ux4gSpinner
            size={effectiveIconSize}
            color={effectiveContentColor}
            strokeWidth={Math.max(2, Math.round(effectiveIconSize * 0.125))}
            style={styles.loader}
            testID={`${testID ?? 'ux4g-button'}-loader`}
          />
        )}

        {!isLoading && leadingIcon && (
          <View style={styles.leadingIconContainer}>
            {renderIconNode(leadingIcon)}
          </View>
        )}

        {children ??
          (text ? (
            <Text
              style={resolvedTextStyle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {text}
            </Text>
          ) : null)}

        {trailingIcon && (
          <View style={styles.trailingIconContainer}>
            {renderIconNode(trailingIcon)}
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginRight: 8,
  },
  leadingIconContainer: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trailingIconContainer: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
