import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
  Platform,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { UX4GColors } from '../../foundation/colors';
import { Ux4gTypography } from '@/foundation/typography';

// Dynamic import of react-native-svg for optional vector icons inside status descriptions
let SvgComponent: any = null;
let PathComponent: any = null;
try {
  const Svg = require('react-native-svg');
  SvgComponent = Svg.Svg || Svg.default || Svg;
  PathComponent = Svg.Path || Svg.default?.Path;
} catch (e) {
  // react-native-svg not linked or installed; fallback to Text/View
}

export type Ux4gSwitchSize = 's' | 'm' | 'l' | 'small' | 'medium' | 'large';
export type Ux4gSwitchLabelPosition = 'noLabel' | 'left' | 'right' | 'bothSides';

/**
 * Size configuration mapping matching Flutter `Ux4gSwitchSize` tuples: `(width, height, thumbSize, thumbPadding)`.
 */
const SWITCH_SIZE_MAP: Record<
  Ux4gSwitchSize,
  {
    width: number;
    height: number;
    thumbSize: number;
    thumbPadding: number;
    labelTypographyKey: keyof Ux4gTypography;
    descTypographyKey: keyof Ux4gTypography;
  }
> = {
  s: {
    width: 32,
    height: 18,
    thumbSize: 14,
    thumbPadding: 2,
    labelTypographyKey: 'lM_default',
    descTypographyKey: 'lS_default',
  },
  small: {
    width: 32,
    height: 18,
    thumbSize: 14,
    thumbPadding: 2,
    labelTypographyKey: 'lM_default',
    descTypographyKey: 'lS_default',
  },
  m: {
    width: 40,
    height: 22,
    thumbSize: 18,
    thumbPadding: 2,
    labelTypographyKey: 'lL_default',
    descTypographyKey: 'lM_default',
  },
  medium: {
    width: 40,
    height: 22,
    thumbSize: 18,
    thumbPadding: 2,
    labelTypographyKey: 'lL_default',
    descTypographyKey: 'lM_default',
  },
  l: {
    width: 48,
    height: 28,
    thumbSize: 24,
    thumbPadding: 2,
    labelTypographyKey: 'lXL_default',
    descTypographyKey: 'lL_default',
  },
  large: {
    width: 48,
    height: 28,
    thumbSize: 24,
    thumbPadding: 2,
    labelTypographyKey: 'lXL_default',
    descTypographyKey: 'lL_default',
  },
};

const getHexWithAlpha = (hexColor: string, alphaHex: string): string => {
  if (!hexColor || !hexColor.startsWith('#')) return hexColor;
  const cleanHex = hexColor.replace('#', '');
  if (cleanHex.length === 6) return `#${cleanHex}${alphaHex}`;
  if (cleanHex.length === 3) {
    const r = cleanHex[0];
    const g = cleanHex[1];
    const b = cleanHex[2];
    return `#${r}${r}${g}${g}${b}${b}${alphaHex}`;
  }
  return hexColor;
};

export interface Ux4gSwitchProps extends Omit<PressableProps, 'style' | 'onPress'> {
  /**
   * Whether the switch is checked/on (`true`) or unchecked/off (`false`).
   */
  checked?: boolean;
  /**
   * Alias for `checked` for standard React Native form compatibility.
   */
  value?: boolean;
  /**
   * Callback fired when the checked state toggles.
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Alias for `onCheckedChange` for consistent form component patterns (`Checkbox`, `RadioButton`).
   */
  onChanged?: (checked: boolean) => void;
  /**
   * Primary label text displayed next to the switch.
   */
  label?: string;
  /**
   * Supporting description text below the primary label.
   */
  description?: string;
  /**
   * Size of the switch (`s`/`small`, `m`/`medium` default, or `l`/`large`).
   * @default 'm'
   */
  size?: Ux4gSwitchSize;
  /**
   * Position of the label relative to the switch (`noLabel`, `left`, `right` default, or `bothSides`).
   * @default 'right'
   */
  labelPosition?: Ux4gSwitchLabelPosition;
  /**
   * Whether the switch is enabled (`true` default) or disabled (`false`).
   * @default true
   */
  enabled?: boolean;
  /**
   * Whether to display a required red asterisk (`*`) next to the primary label.
   * @default false
   */
  isRequired?: boolean;
  /**
   * Optional trailing icon displayed next to the primary label text.
   */
  icon?: React.ReactNode;
  /**
   * Custom typography style override for the primary label text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Custom typography style override for the description text.
   */
  descriptionStyle?: StyleProp<TextStyle>;
  /**
   * Secondary label text used when `labelPosition = 'bothSides'`.
   */
  secondaryLabel?: string;
  /**
   * Whether to display a required red asterisk (`*`) next to the secondary label (`bothSides`).
   * @default false
   */
  isSecondaryRequired?: boolean;
  /**
   * Optional trailing icon displayed next to the secondary label text (`bothSides`).
   */
  secondaryIcon?: React.ReactNode;
  /**
   * Optional description status variant (`helper`, `error`, `warning`, `success`) for dynamic coloring and icons.
   */
  descriptionVariant?: 'helper' | 'error' | 'warning' | 'success';
  /**
   * Optional custom status icon to display before the description text when `descriptionVariant` is set.
   */
  descriptionIcon?: React.ReactNode;
  /**
   * Additional style attributes for the root container (`View` or `Pressable`).
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gSwitch** (`Switch`)
 *
 * Full React Native port of Flutter `toggle.dart` (`Ux4gSwitch`), supporting multiple sizes (`s`, `m`, `l`),
 * configurable label positioning (`left`, `right`, `bothSides`, `noLabel`), secondary labels, icons, status variants,
 * required asterisks (`*`), and smooth native thumb animations.
 */
export const Ux4gSwitch: React.FC<Ux4gSwitchProps> = ({
  checked,
  value,
  onCheckedChange,
  onChanged,
  label,
  description,
  size = 'm',
  labelPosition = 'right',
  enabled = true,
  isRequired = false,
  icon,
  labelStyle,
  descriptionStyle,
  secondaryLabel,
  isSecondaryRequired = false,
  secondaryIcon,
  descriptionVariant,
  descriptionIcon,
  style,
  testID,
  accessibilityLabel,
  accessibilityRole = 'switch',
  ...restProps
}) => {
  const theme = useUx4gTheme();
  const isChecked = checked !== undefined ? checked : (value ?? false);
  const handleToggle = onCheckedChange ?? onChanged;

  const sizeCfg = SWITCH_SIZE_MAP[size] ?? SWITCH_SIZE_MAP.m;
  const startOffset = sizeCfg.thumbPadding;
  const endOffset = sizeCfg.width - sizeCfg.thumbSize - sizeCfg.thumbPadding;

  const animValue = useRef(new Animated.Value(isChecked ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isChecked ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isChecked, animValue]);

  const thumbTranslateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startOffset, endOffset],
  });

  // Track & Thumb Color definitions from toggle.dart
  const isDark = theme.isDark;
  const checkedTrackColor = theme.colors.primary ?? (isDark ? UX4GColors.primary300 : UX4GColors.primary600);
  const uncheckedTrackColor = isDark ? UX4GColors.neutral700 : UX4GColors.neutral300;
  const disabledTrackColor = isDark ? UX4GColors.neutral800 : UX4GColors.neutral200;

  const trackColor = !enabled
    ? disabledTrackColor
    : isChecked
      ? checkedTrackColor
      : uncheckedTrackColor;

  const thumbColor = isDark && isChecked && enabled ? UX4GColors.gray900 : UX4GColors.white;

  const handlePress = () => {
    if (enabled && handleToggle) {
      handleToggle(!isChecked);
    }
  };

  const rippleColor = getHexWithAlpha(theme.colors.primary, '1F');

  // Helper to render description variant status icon
  const renderStatusIcon = () => {
    if (descriptionIcon) return descriptionIcon;
    if (!descriptionVariant) return null;

    let glyphColor = theme.colors.secondary;
    if (descriptionVariant === 'error') glyphColor = theme.colors.error;
    if (descriptionVariant === 'warning') glyphColor = theme.colors.warning;
    if (descriptionVariant === 'success') glyphColor = theme.colors.success;

    const iconSize = 14;
    if (SvgComponent && PathComponent) {
      if (descriptionVariant === 'error' || descriptionVariant === 'warning') {
        return (
          <SvgComponent width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
            <PathComponent
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              stroke={glyphColor}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </SvgComponent>
        );
      }
      if (descriptionVariant === 'success') {
        return (
          <SvgComponent width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
            <PathComponent
              d="M20 6L9 17l-5-5"
              stroke={glyphColor}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </SvgComponent>
        );
      }
      return (
        <SvgComponent width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
          <PathComponent
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke={glyphColor}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgComponent>
      );
    }

    let symbol = 'ⓘ';
    if (descriptionVariant === 'error' || descriptionVariant === 'warning') symbol = '⚠';
    if (descriptionVariant === 'success') symbol = '✓';
    return <Text style={[styles.fallbackStatusIcon, { color: glyphColor }]}>{symbol}</Text>;
  };

  // Helper to render primary or secondary text blocks matching buildTextsWidget in toggle.dart
  const buildTextsWidget = (
    mainText?: string,
    required?: boolean,
    trailingIcon?: React.ReactNode,
    descText?: string
  ) => {
    if (!mainText && !descText) return null;

    const onSurface = theme.colors.onSurface;
    const labelColor = enabled ? onSurface : getHexWithAlpha(onSurface, '61'); // alpha ~ 0.38
    const descColor = enabled
      ? getHexWithAlpha(onSurface, 'B2') // alpha ~ 0.70
      : getHexWithAlpha(onSurface, '61');

    let effectiveDescColor = descColor;
    if (descriptionVariant === 'error') effectiveDescColor = theme.colors.error;
    if (descriptionVariant === 'warning') effectiveDescColor = theme.colors.warning;
    if (descriptionVariant === 'success') effectiveDescColor = theme.colors.success;

    const statusIconNode = renderStatusIcon();
    const labelTypo = theme.typography[sizeCfg.labelTypographyKey];
    const descTypo = theme.typography[sizeCfg.descTypographyKey];

    return (
      <View style={styles.textColumn}>
        {mainText ? (
          <View style={styles.labelRow}>
            <Text
              style={[
                styles.labelText,
                {
                  fontSize: labelTypo.fontSize,
                  fontWeight: labelTypo.fontWeight,
                  lineHeight: labelTypo.lineHeight,
                  color: labelColor,
                },
                labelStyle,
              ]}
            >
              {mainText}
              {required && <Text style={{ color: theme.colors.error }}> *</Text>}
            </Text>
            {trailingIcon && <View style={styles.iconWrapper}>{trailingIcon}</View>}
          </View>
        ) : null}

        {descText ? (
          <View style={[styles.descRow, mainText ? { marginTop: 4 } : null]}>
            {statusIconNode && <View style={styles.statusIconWrapper}>{statusIconNode}</View>}
            <Text
              style={[
                styles.descriptionText,
                {
                  fontSize: descTypo.fontSize,
                  lineHeight: descTypo.lineHeight,
                  color: effectiveDescColor,
                },
                descriptionStyle,
              ]}
            >
              {descText}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  const isStandalone = labelPosition === 'noLabel' || (!label && !description && !secondaryLabel);

  if (isStandalone) {
    return (
      <Pressable
        testID={testID}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityRole={accessibilityRole}
        accessibilityState={{
          disabled: !enabled,
          checked: isChecked,
        }}
        disabled={!enabled || !handleToggle}
        onPress={handlePress}
        android_ripple={
          enabled && handleToggle
            ? {
              color: rippleColor,
              borderless: true,
              radius: Math.round(sizeCfg.height / 2 + 8),
            }
            : undefined
        }
        style={(state) => [
          styles.switchControlWrapper,
          {
            opacity: state.pressed && enabled && Platform.OS !== 'android' ? 0.8 : 1,
          },
          style,
        ]}
        {...restProps}
      >
        <View
          style={[
            styles.track,
            {
              width: sizeCfg.width,
              height: sizeCfg.height,
              borderRadius: sizeCfg.height / 2,
              backgroundColor: trackColor,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.thumb,
              {
                width: sizeCfg.thumbSize,
                height: sizeCfg.thumbSize,
                borderRadius: sizeCfg.thumbSize / 2,
                backgroundColor: thumbColor,
                transform: [{ translateX: thumbTranslateX }],
              },
              enabled && styles.thumbShadow,
            ]}
          />
        </View>
      </Pressable>
    );
  }

  // Switch control widget (`toggleControl`) with exact ripple only on the control box for labeled switches
  const toggleControl = (
    <Pressable
      testID={testID ? `${testID}-control` : undefined}
      disabled={!enabled || !handleToggle}
      onPress={handlePress}
      android_ripple={
        enabled && handleToggle
          ? {
            color: rippleColor,
            borderless: true,
            radius: Math.round(sizeCfg.height / 2 + 8),
          }
          : undefined
      }
      style={(state) => [
        styles.switchControlWrapper,
        {
          opacity: state.pressed && enabled && Platform.OS !== 'android' ? 0.8 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.track,
          {
            width: sizeCfg.width,
            height: sizeCfg.height,
            borderRadius: sizeCfg.height / 2,
            backgroundColor: trackColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: sizeCfg.thumbSize,
              height: sizeCfg.thumbSize,
              borderRadius: sizeCfg.thumbSize / 2,
              backgroundColor: thumbColor,
              transform: [{ translateX: thumbTranslateX }],
            },
            enabled && styles.thumbShadow,
          ]}
        />
      </View>
    </Pressable>
  );

  if (labelPosition === 'bothSides') {
    return (
      <Pressable
        testID={testID}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityRole={accessibilityRole}
        accessibilityState={{
          disabled: !enabled,
          checked: isChecked,
        }}
        disabled={!enabled || !handleToggle}
        onPress={handlePress}
        android_ripple={undefined}
        style={(state) => [
          styles.rowContainer,
          {
            alignItems: description ? 'flex-start' : 'center',
            opacity: state.pressed && enabled && Platform.OS !== 'android' ? 0.8 : 1,
          },
          style,
        ]}
        {...restProps}
      >
        {buildTextsWidget(label, isRequired, icon, description)}
        <View style={{ width: 12 }} />
        {toggleControl}
        <View style={{ width: 12 }} />
        {buildTextsWidget(secondaryLabel, isSecondaryRequired, secondaryIcon, undefined)}
      </Pressable>
    );
  }

  if (labelPosition === 'left') {
    return (
      <Pressable
        testID={testID}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityRole={accessibilityRole}
        accessibilityState={{
          disabled: !enabled,
          checked: isChecked,
        }}
        disabled={!enabled || !handleToggle}
        onPress={handlePress}
        android_ripple={undefined}
        style={(state) => [
          styles.rowContainer,
          {
            alignItems: description ? 'flex-start' : 'center',
            opacity: state.pressed && enabled && Platform.OS !== 'android' ? 0.8 : 1,
          },
          style,
        ]}
        {...restProps}
      >
        {buildTextsWidget(label, isRequired, icon, description)}
        <View style={{ width: 12 }} />
        {toggleControl}
      </Pressable>
    );
  }

  // Default `right` label position
  return (
    <Pressable
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        disabled: !enabled,
        checked: isChecked,
      }}
      disabled={!enabled || !handleToggle}
      onPress={handlePress}
      android_ripple={undefined}
      style={(state) => [
        styles.rowContainer,
        {
          alignItems: description ? 'flex-start' : 'center',
          opacity: state.pressed && enabled && Platform.OS !== 'android' ? 0.8 : 1,
        },
        style,
      ]}
      {...restProps}
    >
      {toggleControl}
      <View style={{ width: 12 }} />
      {buildTextsWidget(label, isRequired, icon, description)}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchControlWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
  },
  thumbShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },
  textColumn: {
    flexShrink: 1,
    justifyContent: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  labelText: {
    flexShrink: 1,
  },
  iconWrapper: {
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIconWrapper: {
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    flexShrink: 1,
  },
  fallbackStatusIcon: {
    fontSize: 12,
    fontWeight: '700',
  },
});
