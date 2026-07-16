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
import { UX4GColors } from '../../foundation/colors';

// Dynamically require react-native-svg for crisp vector checkmarks and dashes
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

export type Ux4gCheckboxSize = 'small' | 'medium' | 'large';

export type Ux4gCheckboxDescriptionVariant =
  | 'helper'
  | 'error'
  | 'warning'
  | 'success';

export interface Ux4gCheckboxProps extends Omit<PressableProps, 'onPress' | 'value' | 'style'> {
  /** Checkbox state: `true` = Checked, `false` = Unchecked, `null` = Indeterminate (Tristate dash) */
  value?: boolean | null;
  /** Callback triggered when the checkbox or label is pressed. Receives the next state (`value == null ? true : !value`) */
  onChanged?: (newValue: boolean | null) => void;
  /** Primary label text displayed next to the checkbox */
  label?: string;
  /** Secondary description/helper text displayed below the label */
  description?: string;
  /** Size of the checkbox box (`small` = 16pt, `medium` = 20pt, `large` = 24pt). Defaults to `medium`. */
  size?: Ux4gCheckboxSize;
  /** Whether the field is required. Appends a red asterisk (`*`) to the label. Defaults to `false`. */
  isRequired?: boolean;
  /** Whether the field has an error. Highlights the box border in red. Defaults to `false`. */
  hasError?: boolean;
  /** Variant styling for the description text (`helper`, `error`, `warning`, `success`). Defaults to `helper`. */
  descriptionVariant?: Ux4gCheckboxDescriptionVariant;
  /** Whether the checkbox is interactive. Defaults to `true`. */
  enabled?: boolean;
  /** Custom active fill/border color when checked or indeterminate. Defaults to `theme.colors.primary`. */
  activeColor?: string;
  /** Custom checkmark (`✓`) / dash (`—`) color. Defaults to `theme.colors.onPrimary`. */
  checkColor?: string;
  /** Style for the outer row/container `Pressable` */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  /** Style override for the label `Text` */
  labelStyle?: StyleProp<TextStyle>;
  /** Style override for the description `Text` */
  descriptionStyle?: StyleProp<TextStyle>;
}

const SIZE_MAP: Record<
  Ux4gCheckboxSize,
  { boxSize: number; typographyKey: 'lM_default' | 'lL_default' | 'lXL_default' }
> = {
  small: { boxSize: 16, typographyKey: 'lM_default' },
  medium: { boxSize: 20, typographyKey: 'lL_default' },
  large: { boxSize: 24, typographyKey: 'lXL_default' },
};

/**
 * Helper to append hex opacity ('1F' for 12%, '61' for 38%, 'B3' for 70%) to hex strings.
 */
const getHexWithAlpha = (baseHex: string, alphaHex: string): string => {
  if (!baseHex || !baseHex.startsWith('#')) return baseHex;
  const cleanHex = baseHex.slice(0, 7);
  return `${cleanHex}${alphaHex}`;
};

export const Ux4gCheckbox: React.FC<Ux4gCheckboxProps> = ({
  value = false,
  onChanged,
  label,
  description,
  size = 'medium',
  isRequired = false,
  hasError = false,
  descriptionVariant = 'helper',
  enabled = true,
  activeColor,
  checkColor,
  style,
  labelStyle,
  descriptionStyle,
  testID,
  accessibilityLabel,
  accessibilityRole = 'checkbox',
  ...restProps
}) => {
  const theme = useUx4gTheme();
  const sizeCfg = SIZE_MAP[size];

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

  // 2. Resolve label typography and color
  const labelTypography = theme.typography[sizeCfg.typographyKey];
  const effectiveLabelColor = enabled
    ? theme.colors.onSurface
    : getHexWithAlpha(theme.colors.onSurface, '61'); // 38% alpha

  // 3. Resolve checkbox box colors
  const isCheckedOrIndeterminate = value === true || value === null;
  const effectiveActiveColor = activeColor ?? theme.colors.primary;
  const effectiveCheckColor = checkColor ?? theme.colors.onPrimary;

  let boxBgColor = 'transparent';
  let boxBorderColor = 'transparent';

  if (!enabled) {
    if (isCheckedOrIndeterminate) {
      boxBgColor = getHexWithAlpha(theme.colors.onSurface, '1F'); // 12% alpha
      boxBorderColor = 'transparent';
    } else {
      boxBgColor = 'transparent';
      boxBorderColor = getHexWithAlpha(theme.colors.onSurface, '1F'); // 12% alpha
    }
  } else if (isCheckedOrIndeterminate) {
    boxBgColor = effectiveActiveColor;
    boxBorderColor = effectiveActiveColor;
  } else {
    // Unchecked enabled
    boxBgColor = 'transparent';
    if (hasError || descriptionVariant === 'error') {
      boxBorderColor = theme.colors.error;
    } else {
      boxBorderColor = theme.isDark
        ? UX4GColors.neutral700
        : UX4GColors.neutral300;
    }
  }

  // 4. Handle press event matching Flutter's tristate toggle:
  // If value == null (Indeterminate) -> true
  // If value == true -> false
  // If value == false -> true
  const handlePress = () => {
    if (!enabled || !onChanged) return;
    const nextValue = value === null ? true : !value;
    onChanged(nextValue);
  };

  const hasLabel = label !== undefined && label.trim().length > 0;
  const hasDescription =
    description !== undefined && description.trim().length > 0;

  // Render Checkmark (✓) or Indeterminate Dash (—) inside box
  const renderCheckGlyph = () => {
    if (!isCheckedOrIndeterminate) return null;

    const glyphColor = !enabled
      ? getHexWithAlpha(theme.colors.onSurface, '61')
      : effectiveCheckColor;

    const iconSize = Math.round(sizeCfg.boxSize * 0.7);

    // If SVG is available, render precise vector check/dash
    if (SvgComponent && PathComponent) {
      if (value === true) {
        // Checkmark vector path
        return (
          <SvgComponent
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
          >
            <PathComponent
              d="M4 12l5 5L20 6"
              stroke={glyphColor}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </SvgComponent>
        );
      }
      if (value === null) {
        // Indeterminate dash vector path
        return (
          <SvgComponent
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
          >
            <PathComponent
              d="M5 12h14"
              stroke={glyphColor}
              strokeWidth={3.5}
              strokeLinecap="round"
            />
          </SvgComponent>
        );
      }
    }

    // Fallback if react-native-svg is unavailable
    if (value === true) {
      return (
        <Text
          style={[
            styles.fallbackCheckText,
            { color: glyphColor, fontSize: sizeCfg.boxSize * 0.65 },
          ]}
        >
          ✓
        </Text>
      );
    }
    if (value === null) {
      return (
        <View
          style={[
            styles.fallbackDashView,
            {
              backgroundColor: glyphColor,
              width: sizeCfg.boxSize * 0.55,
              height: 2.5,
            },
          ]}
        />
      );
    }

    return null;
  };

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
      return (
        <SvgComponent width={16} height={16} viewBox="0 0 24 24" fill="none">
          {CircleComponent && (
            <CircleComponent cx="12" cy="12" r="10" stroke={descriptionColor} strokeWidth="2" />
          )}
          <PathComponent d="M12 16v-4M12 8h.01" stroke={descriptionColor} strokeWidth="2" strokeLinecap="round" />
        </SvgComponent>
      );
    }

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

  return (
    <Pressable
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        disabled: !enabled,
        checked: value === null ? 'mixed' : value,
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
          styles.checkboxAlignmentWrapper,
          {
            opacity:
              state.pressed && enabled && Platform.OS !== 'android' ? 0.8 : 1,
          },
        ]}
      >
        <View
          style={[
            styles.checkboxBox,
            {
              width: sizeCfg.boxSize,
              height: sizeCfg.boxSize,
              backgroundColor: boxBgColor,
              borderColor: boxBorderColor,
              borderWidth: isCheckedOrIndeterminate && enabled ? 0 : 1.5,
            },
          ]}
        >
          {renderCheckGlyph()}
        </View>
      </Pressable>

      {(hasLabel || hasDescription) && (
        <View style={styles.textColumn}>
          {hasLabel && (
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
              {isRequired && (
                <Text style={{ color: theme.colors.error }}> *</Text>
              )}
            </Text>
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
                    fontSize: theme.typography.lS_default.fontSize,
                    fontWeight: theme.typography.lS_default.fontWeight,
                    lineHeight: theme.typography.lS_default.lineHeight,
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
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkboxAlignmentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBox: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  fallbackCheckText: {
    fontWeight: '700',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  fallbackDashView: {
    borderRadius: 1.5,
  },
  textColumn: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  labelText: {
    includeFontPadding: false,
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionIconContainer: {
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackIconText: {
    fontSize: 13,
    fontWeight: '700',
    includeFontPadding: false,
  },
  descriptionText: {
    flex: 1,
    includeFontPadding: false,
  },
});
