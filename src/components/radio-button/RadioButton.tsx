import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
  PressableStateCallbackType,
  Platform,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { Ux4gPalette } from '../../foundation/colors';
import { Ux4gIconProp } from '../button/Button';

// Dynamically require react-native-svg for crisp vector icons if available
let SvgComponent: any = null;
let PathComponent: any = null;
let CircleComponent: any = null;
try {
  const rns = require('react-native-svg');
  SvgComponent = rns.Svg;
  PathComponent = rns.Path;
  CircleComponent = rns.Circle;
} catch (e) {
  // react-native-svg not available, fallback to native View/Text
}

export type Ux4gRadioButtonSize = 'small' | 'medium' | 'large';

export type Ux4gRadioButtonDescriptionVariant =
  | 'helper'
  | 'error'
  | 'warning'
  | 'success';

/**
 * Visual status for the radio circle itself (independent of selection).
 * Drives the ring color so callers can render error / warning / success
 * states consistently (e.g. validation errors on the parent form).
 */
export type Ux4gRadioButtonStatus =
  | 'defaultStatus'
  | 'error'
  | 'warning'
  | 'success';

export interface Ux4gRadioButtonProps<T = any>
  extends Omit<PressableProps, 'onPress' | 'value' | 'style'> {
  /** The value represented by this radio button */
  value: T;
  /** The currently selected group value */
  groupValue?: T | null;
  /** Callback triggered when the radio button or label is pressed (`(value: T) => void`) */
  onChanged?: (value: T) => void;
  /** Primary label text displayed next to the radio circle */
  label?: string;
  /** Secondary description/helper text displayed below the label */
  description?: string;
  /** Size of the radio circle (`small` = 16pt, `medium` = 20pt, `large` = 24pt). Defaults to `medium`. */
  size?: Ux4gRadioButtonSize;
  /** Whether the field is required. Appends a red asterisk (`*`) to the label. Defaults to `false`. */
  isRequired?: boolean;
  /** Trailing icon rendered after the label */
  trailingIcon?: Ux4gIconProp;
  /** Variant styling for the description text and icon (`helper`, `error`, `warning`, `success`). Defaults to `helper`. */
  descriptionVariant?: Ux4gRadioButtonDescriptionVariant;
  /** Visual status for the radio circle (`defaultStatus`, `error`, `warning`, `success`). Defaults to `defaultStatus`. */
  status?: Ux4gRadioButtonStatus;
  /** Optional override for the radio circle color. Takes precedence over `status` and primary color. */
  color?: string;
  /** Custom label text foreground color */
  labelColor?: string;
  /** Style override for the label `Text` */
  labelStyle?: StyleProp<TextStyle>;
  /** Style override for the description `Text` */
  descriptionStyle?: StyleProp<TextStyle>;
  /** Whether the radio button is interactive. Defaults to `true`. */
  enabled?: boolean;
  /** Style for the outer row/container `Pressable` */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
}

const SIZE_MAP: Record<
  Ux4gRadioButtonSize,
  {
    boxSize: number;
    labelTypographyKey: 'lM_default' | 'lL_default' | 'lXL_default';
    descriptionTypographyKey: 'lS_default' | 'lM_default' | 'lL_default';
  }
> = {
  small: {
    boxSize: 16,
    labelTypographyKey: 'lM_default',
    descriptionTypographyKey: 'lS_default',
  },
  medium: {
    boxSize: 20,
    labelTypographyKey: 'lL_default',
    descriptionTypographyKey: 'lM_default',
  },
  large: {
    boxSize: 24,
    labelTypographyKey: 'lXL_default',
    descriptionTypographyKey: 'lL_default',
  },
};

/**
 * Helper to append hex opacity ('1A' for 10%, '1F' for 12%, '61' for 38%, 'B3' for 70%) to hex strings.
 */
const getHexWithAlpha = (baseHex: string, alphaHex: string): string => {
  if (!baseHex || !baseHex.startsWith('#')) return baseHex;
  const cleanHex = baseHex.slice(0, 7);
  return `${cleanHex}${alphaHex}`;
};

export function Ux4gRadioButton<T = any>({
  value,
  groupValue,
  onChanged,
  label,
  description,
  size = 'medium',
  isRequired = false,
  trailingIcon,
  descriptionVariant = 'helper',
  status = 'defaultStatus',
  color,
  labelColor,
  labelStyle,
  descriptionStyle,
  enabled = true,
  style,
  testID,
  accessibilityLabel,
  accessibilityRole = 'radio',
  ...restProps
}: Ux4gRadioButtonProps<T>) {
  const theme = useUx4gTheme();
  const sizeCfg = SIZE_MAP[size];

  const isSelected = value === groupValue && groupValue !== undefined && groupValue !== null;

  // 1. Resolve description text color
  let descriptionColor: string;
  switch (descriptionVariant) {
    case 'helper':
      descriptionColor = getHexWithAlpha(theme.colors.onSurface, 'B3'); // 70% alpha
      break;
    case 'error':
      descriptionColor = theme.colors.error;
      break;
    case 'warning':
      descriptionColor = theme.colors.warning;
      break;
    case 'success':
      descriptionColor = theme.colors.success;
      break;
  }

  // 2. Resolve label & description typography
  const labelTypography = theme.typography[sizeCfg.labelTypographyKey];
  const descriptionTypography = theme.typography[sizeCfg.descriptionTypographyKey];

  const effectiveLabelColor = !enabled
    ? getHexWithAlpha(theme.colors.onSurface, '61') // 38% alpha
    : labelColor ?? theme.colors.onSurface;

  // 3. Resolve status color
  let statusColor: string | null = null;
  switch (status) {
    case 'error':
      statusColor = theme.colors.error;
      break;
    case 'warning':
      statusColor = theme.colors.warning;
      break;
    case 'success':
      statusColor = theme.colors.success;
      break;
    case 'defaultStatus':
      statusColor = null;
      break;
  }

  const unselectedBorderColor = theme.isDark
    ? Ux4gPalette.neutral700
    : Ux4gPalette.neutral300;

  const radioColor = !enabled
    ? getHexWithAlpha(theme.colors.onSurface, '61') // 38% alpha
    : isSelected
    ? color ?? statusColor ?? theme.colors.primary
    : unselectedBorderColor;

  // 4. Ring / Donut thickness and disabled fills
  const selectedRingThickness = sizeCfg.boxSize * 0.28;
  const disabledFillColor = getHexWithAlpha(theme.colors.onSurface, '1A'); // 10% alpha

  const handlePress = () => {
    if (!enabled || !onChanged) return;
    onChanged(value);
  };

  const hasLabel = label !== undefined && label.trim().length > 0;
  const hasDescription =
    description !== undefined && description.trim().length > 0;

  // Helper to render trailing icon
  const renderTrailingIcon = () => {
    if (!trailingIcon) return null;
    const iconColor = enabled
      ? theme.colors.onSurface
      : getHexWithAlpha(theme.colors.onSurface, '61');
    if (typeof trailingIcon === 'function') {
      return trailingIcon({ color: iconColor, size: sizeCfg.boxSize });
    }
    return trailingIcon;
  };

  // Helper to render description variant icon
  const renderDescriptionIcon = () => {
    if (SvgComponent && PathComponent) {
      if (descriptionVariant === 'error') {
        return (
          <SvgComponent width={16} height={16} viewBox="0 0 24 24" fill="none">
            {CircleComponent && (
              <CircleComponent cx="12" cy="12" r="10" stroke={descriptionColor} strokeWidth="2" />
            )}
            <PathComponent d="M12 8v4M12 16h.01" stroke={descriptionColor} strokeWidth="2" strokeLinecap="round" />
          </SvgComponent>
        );
      }
      if (descriptionVariant === 'warning') {
        return (
          <SvgComponent width={16} height={16} viewBox="0 0 24 24" fill="none">
            <PathComponent
              d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
              stroke={descriptionColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </SvgComponent>
        );
      }
      if (descriptionVariant === 'success') {
        return (
          <SvgComponent width={16} height={16} viewBox="0 0 24 24" fill="none">
            {CircleComponent && (
              <CircleComponent cx="12" cy="12" r="10" stroke={descriptionColor} strokeWidth="2" />
            )}
            <PathComponent d="M8 12l2.5 2.5L16 9" stroke={descriptionColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </SvgComponent>
        );
      }
      // helper / default info
      return (
        <SvgComponent width={16} height={16} viewBox="0 0 24 24" fill="none">
          {CircleComponent && (
            <CircleComponent cx="12" cy="12" r="10" stroke={descriptionColor} strokeWidth="2" />
          )}
          <PathComponent d="M12 16v-4M12 8h.01" stroke={descriptionColor} strokeWidth="2" strokeLinecap="round" />
        </SvgComponent>
      );
    }

    // Fallback if react-native-svg is not available
    let symbol = 'ⓘ';
    if (descriptionVariant === 'error') symbol = '⚠';
    if (descriptionVariant === 'warning') symbol = '⚠';
    if (descriptionVariant === 'success') symbol = '✓';
    return (
      <Text style={[styles.fallbackIconText, { color: descriptionColor }]}>
        {symbol}
      </Text>
    );
  };

  const rippleColor = getHexWithAlpha(theme.colors.primary, '1F');
  const innerDotSize = Math.max(2, sizeCfg.boxSize - selectedRingThickness * 2);

  return (
    <Pressable
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        disabled: !enabled,
        checked: isSelected,
      }}
      disabled={!enabled || !onChanged}
      onPress={handlePress}
      android_ripple={undefined}
      style={(state) => {
        const customStyle =
          typeof style === 'function' ? style(state) : style;

        return [
          styles.rowContainer,
          {
            alignItems: hasDescription ? 'flex-start' : 'center',
            opacity:
              state.pressed && enabled && Platform.OS !== 'android' ? 0.8 : 1,
          },
          customStyle,
        ];
      }}
      {...restProps}
    >
      <Pressable
        disabled={!enabled || !onChanged}
        onPress={handlePress}
        android_ripple={
          enabled && onChanged
            ? {
                color: rippleColor,
                borderless: true,
                radius: Math.round(sizeCfg.boxSize * 1.1 + 4),
              }
            : undefined
        }
        style={(state) => [
          styles.radioAlignmentWrapper,
          {
            opacity:
              state.pressed && enabled && Platform.OS !== 'android' ? 0.8 : 1,
          },
        ]}
      >
        {isSelected ? (
          <View
            style={[
              styles.radioCircle,
              {
                width: sizeCfg.boxSize,
                height: sizeCfg.boxSize,
                borderRadius: sizeCfg.boxSize / 2,
                backgroundColor: !enabled ? disabledFillColor : radioColor,
                borderWidth: 0,
              },
            ]}
          >
            <View
              style={{
                width: innerDotSize,
                height: innerDotSize,
                borderRadius: innerDotSize / 2,
                backgroundColor: !enabled
                  ? radioColor
                  : theme.isDark
                  ? Ux4gPalette.neutral1000black
                  : Ux4gPalette.white,
              }}
            />
          </View>
        ) : (
          <View
            style={[
              styles.radioCircle,
              {
                width: sizeCfg.boxSize,
                height: sizeCfg.boxSize,
                borderRadius: sizeCfg.boxSize / 2,
                backgroundColor: !enabled ? disabledFillColor : 'transparent',
                borderColor: !enabled ? 'transparent' : radioColor,
                borderWidth: !enabled ? 0 : 1.5,
              },
            ]}
          />
        )}
      </Pressable>

      {(hasLabel || hasDescription) && (
        <View style={styles.textColumn}>
          {hasLabel && (
            <View style={styles.labelRow}>
              <Text
                style={[
                  styles.labelText,
                  {
                    fontSize: labelTypography.fontSize,
                    fontWeight: labelTypography.fontWeight,
                    lineHeight: labelTypography.lineHeight,
                    color: effectiveLabelColor,
                  },
                  labelStyle,
                ]}
              >
                {label}
              </Text>
              {isRequired && (
                <Text
                  style={[
                    styles.requiredText,
                    {
                      fontSize: labelTypography.fontSize,
                      fontWeight: labelTypography.fontWeight,
                      lineHeight: labelTypography.lineHeight,
                      color: theme.colors.error,
                    },
                  ]}
                >
                  {' *'}
                </Text>
              )}
              {trailingIcon && (
                <View style={styles.trailingIconWrapper}>
                  {renderTrailingIcon()}
                </View>
              )}
            </View>
          )}

          {hasDescription && (
            <View
              style={[
                styles.descriptionRow,
                { marginTop: hasLabel ? 4 : 0 },
              ]}
            >
              <View style={styles.descriptionIconContainer}>
                {renderDescriptionIcon()}
              </View>
              <Text
                style={[
                  styles.descriptionText,
                  {
                    fontSize: descriptionTypography.fontSize,
                    fontWeight: descriptionTypography.fontWeight,
                    lineHeight: descriptionTypography.lineHeight,
                    color: descriptionColor,
                  },
                  descriptionStyle,
                ]}
              >
                {description}
              </Text>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  radioAlignmentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textColumn: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  labelText: {
    includeFontPadding: false,
  },
  requiredText: {
    includeFontPadding: false,
  },
  trailingIconWrapper: {
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionIconContainer: {
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    flex: 1,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  fallbackIconText: {
    fontSize: 14,
    includeFontPadding: false,
    lineHeight: 16,
    textAlignVertical: 'center',
  },
});
