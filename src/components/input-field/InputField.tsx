import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { UX4GColors } from '../../foundation/colors';
import { Ux4gRadius } from '../../foundation/dimensions';
import { Ux4gIcons } from '../../foundation/icons';

/**
 * Helper to compute hex with alpha or rgba color string.
 */
const addOpacityToHex = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    let hex = color.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    if (hex.length === 8) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }
  return color;
};

export type Ux4gInputFieldSize = 'small' | 'medium' | 'large' | 'xl';

export const Ux4gInputFieldSizeMap: Record<Ux4gInputFieldSize, number> = {
  small: 32,
  medium: 40,
  large: 48,
  xl: 56,
};

export type Ux4gInputFieldType = 'text' | 'password' | 'number' | 'email';

export type Ux4gInputFieldStatus = 'defaultStatus' | 'error' | 'warning' | 'success';

export interface Ux4gInputFieldProps {
  /**
   * Current text string inside the input field.
   */
  value: string;
  /**
   * Callback triggered when text inside the input field changes.
   */
  onValueChange: (value: string) => void;
  /**
   * Size of the input field (`small` 32px, `medium` 40px, `large` 48px, `xl` 56px when `singleLine = true`).
   * @default 'medium'
   */
  size?: Ux4gInputFieldSize;
  /**
   * Type of input field (`text`, `password`, `number`, `email`).
   * @default 'text'
   */
  type?: Ux4gInputFieldType;
  /**
   * Validation status (`defaultStatus`, `error`, `warning`, `success`).
   * @default 'defaultStatus'
   */
  status?: Ux4gInputFieldStatus;
  /**
   * Optional label displayed above the input box.
   */
  label?: string;
  /**
   * Whether the field is required (displays red `*` right after the label text).
   * @default false
   */
  required?: boolean;
  /**
   * Placeholder hint text displayed inside the input box when empty.
   */
  placeholder?: string;
  /**
   * Optional caption or validation message displayed below the input box.
   */
  caption?: string;
  /**
   * Optional leading widget/icon inside the left side of the input box.
   */
  leadingIcon?: React.ReactNode;
  /**
   * Optional trailing widget/icon inside the right side of the input box when `type !== 'password'`.
   */
  trailingIcon?: React.ReactNode;
  /**
   * Callback triggered when `trailingIcon` is pressed.
   */
  onTrailingIconPressed?: () => void;
  /**
   * Optional text prefix string displayed immediately after `leadingIcon`.
   */
  prefixText?: string;
  /**
   * Optional text postfix string displayed immediately before `trailingIcon`.
   */
  postfixText?: string;
  /**
   * Optional trailing widget/icon displayed right after the label text in the top label row.
   */
  trailingIconLabel?: React.ReactNode;
  /**
   * Whether the input field is interactive (`true`) or disabled (`false`).
   * @default true
   */
  enabled?: boolean;
  /**
   * Whether the input field is read-only (`true`) or editable (`false`).
   * @default false
   */
  readOnly?: boolean;
  /**
   * Whether the field is a single-line input (`true`) or multi-line area (`false`).
   * @default true
   */
  singleLine?: boolean;
  /**
   * Maximum lines when `singleLine = false`.
   */
  maxLines?: number;
  /**
   * Maximum character length allowed (`maxLength`).
   */
  maxLength?: number;
  /**
   * Text alignment (`left`, `center`, `right`).
   * @default 'left'
   */
  textAlign?: 'left' | 'center' | 'right';
  /**
   * Custom style for input text (`style`).
   */
  style?: StyleProp<TextStyle>;
  /**
   * Custom style for placeholder text (`placeholderStyle`).
   */
  placeholderStyle?: StyleProp<TextStyle>;
  /**
   * Custom style for top label (`labelStyle`).
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Custom style for bottom caption text (`captionStyle`).
   */
  captionStyle?: StyleProp<TextStyle>;
  /**
   * Custom background color override (`backgroundColor`).
   */
  backgroundColor?: string;
  /**
   * Custom border color override (`borderColor`).
   */
  borderColor?: string;
  /**
   * Custom disabled border color override (`disabledBorderColor`).
   */
  disabledBorderColor?: string;
  /**
   * Custom border width (`borderWidth`).
   * @default 1.0
   */
  borderWidth?: number;
  /**
   * Custom disabled border width (`disabledBorderWidth`).
   * @default 0.0
   */
  disabledBorderWidth?: number;
  /**
   * Custom outer container style.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gInputField** (`InputField`)
 *
 * Direct React Native port of Flutter `input_field.dart` (`Ux4gInputField`).
 * Complete feature parity across sizes (`small`, `medium`, `large`, `xl`), types (`text`, `password`, `number`, `email`),
 * validation statuses (`defaultStatus`, `error`, `warning`, `success`), prefix/postfix strings, leading/trailing icons, and captions.
 */
export const Ux4gInputField: React.FC<Ux4gInputFieldProps> = ({
  value,
  onValueChange,
  size = 'medium',
  type = 'text',
  status = 'defaultStatus',
  label,
  required = false,
  placeholder,
  caption,
  leadingIcon,
  trailingIcon,
  onTrailingIconPressed,
  prefixText,
  postfixText,
  trailingIconLabel,
  enabled = true,
  readOnly = false,
  singleLine = true,
  maxLines,
  maxLength,
  textAlign = 'left',
  style,
  placeholderStyle,
  labelStyle,
  captionStyle,
  backgroundColor,
  borderColor: customBorderColor,
  disabledBorderColor,
  borderWidth = 1.0,
  disabledBorderWidth = 0.0,
  containerStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const typography = theme.typography;
  const isDark = theme.isDark;

  const [obscureText, setObscureText] = useState<boolean>(type === 'password');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const primaryColor = colors.primary ?? UX4GColors.primary600;
  const onSurfaceColor = colors.onSurface ?? (isDark ? UX4GColors.neutral0 : UX4GColors.neutral1000black);
  const errorColor = colors.error ?? (isDark ? UX4GColors.red300 : UX4GColors.red600);

  const getBorderColor = (): string => {
    if (!enabled) {
      return disabledBorderColor ?? addOpacityToHex(onSurfaceColor, 0.3);
    }
    switch (status) {
      case 'error':
        return isDark ? UX4GColors.red300 : UX4GColors.red600;
      case 'warning':
        return colors.warning ?? UX4GColors.orange600;
      case 'success':
        return colors.success ?? UX4GColors.green600;
      case 'defaultStatus':
      default:
        if (isFocused) return primaryColor;
        return customBorderColor ?? (isDark ? UX4GColors.neutral700 : UX4GColors.neutral200);
    }
  };

  const getLabelColor = (): string => {
    if (!enabled) return addOpacityToHex(onSurfaceColor, 0.4);
    return isDark ? UX4GColors.neutral200 : UX4GColors.neutral700;
  };

  const getStatusIconColor = (): string => {
    if (!enabled) return addOpacityToHex(onSurfaceColor, 0.4);
    switch (status) {
      case 'error':
        return isDark ? UX4GColors.red400 : UX4GColors.red600;
      case 'warning':
        return colors.warning ?? UX4GColors.orange600;
      case 'success':
        return colors.success ?? UX4GColors.green600;
      case 'defaultStatus':
      default:
        return addOpacityToHex(onSurfaceColor, 0.6);
    }
  };

  const getStatusTextColor = (): string => {
    if (!enabled) return addOpacityToHex(onSurfaceColor, 0.4);
    switch (status) {
      case 'error':
        return isDark ? UX4GColors.red300 : UX4GColors.red800;
      case 'warning':
        return colors.warning ?? UX4GColors.orange600;
      case 'success':
        return colors.success ?? UX4GColors.green600;
      case 'defaultStatus':
      default:
        return addOpacityToHex(onSurfaceColor, 0.6);
    }
  };

  const renderStatusIcon = (): React.ReactElement | null => {
    const iconColor = getStatusIconColor();
    switch (status) {
      case 'error':
        return Ux4gIcons.error({ size: 14, color: iconColor });
      case 'warning':
        return Ux4gIcons.warning({ size: 14, color: iconColor });
      case 'success':
        return Ux4gIcons.success({ size: 14, color: iconColor });
      case 'defaultStatus':
      default:
        return Ux4gIcons.info({ size: 14, color: iconColor });
    }
  };

  const getKeyboardType = (): KeyboardTypeOptions => {
    switch (type) {
      case 'number':
        return 'numeric';
      case 'email':
        return 'email-address';
      case 'password':
      case 'text':
      default:
        return 'default';
    }
  };

  const computedHeight = singleLine ? Ux4gInputFieldSizeMap[size] : undefined;
  const computedBorderColor = getBorderColor();
  const computedBorderWidth = !enabled
    ? disabledBorderWidth
    : isFocused
    ? 2.0
    : borderWidth;

  const defaultBgColor = isDark ? UX4GColors.neutral950 : UX4GColors.neutral0;
  const bgColor =
    backgroundColor ??
    (enabled ? defaultBgColor : (isDark ? UX4GColors.neutral800 : UX4GColors.neutral200));

  return (
    <View testID={testID} style={[styles.outerContainer, containerStyle]}>
      {/* Label Section */}
      {label !== undefined && label !== null && (
        <View style={styles.labelRow}>
          <Text
            style={[
              typography.lL_default,
              { color: getLabelColor() },
              labelStyle,
            ]}
          >
            {label}
          </Text>
          {required && (
            <Text
              style={[
                typography.bS_strong,
                { color: errorColor, marginLeft: 4 },
              ]}
            >
              *
            </Text>
          )}
          {trailingIconLabel !== undefined && trailingIconLabel !== null && (
            <View style={{ marginLeft: 6 }}>{trailingIconLabel}</View>
          )}
        </View>
      )}

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          {
            height: computedHeight,
            minHeight: singleLine ? undefined : 100,
            backgroundColor: bgColor,
            borderColor: computedBorderColor,
            borderWidth: computedBorderWidth,
            borderRadius: Ux4gRadius.radius8,
          },
        ]}
      >
        {/* Leading Icon */}
        {leadingIcon !== undefined && leadingIcon !== null && (
          <View style={styles.leadingBox}>{leadingIcon}</View>
        )}

        {/* Prefix Text */}
        {prefixText !== undefined && prefixText !== null && (
          <Text
            style={[
              typography.bS_default,
              {
                color: isDark ? UX4GColors.neutral200 : UX4GColors.neutral700,
                marginRight: 4,
              },
            ]}
          >
            {prefixText}
          </Text>
        )}

        {/* Input Field */}
        <TextInput
          value={value}
          onChangeText={onValueChange}
          editable={enabled && !readOnly}
          secureTextEntry={type === 'password' && obscureText}
          multiline={!singleLine}
          numberOfLines={singleLine ? 1 : maxLines}
          maxLength={maxLength}
          keyboardType={getKeyboardType()}
          textAlign={textAlign}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={
            (placeholderStyle as any)?.color ??
            (isDark ? UX4GColors.neutral500 : UX4GColors.neutral400)
          }
          style={[
            styles.textInput,
            typography.bM_default,
            {
              color: enabled
                ? onSurfaceColor
                : addOpacityToHex(onSurfaceColor, 0.4),
            },
            style,
          ]}
        />

        {/* Postfix Text */}
        {postfixText !== undefined && postfixText !== null && (
          <Text
            style={[
              typography.bM_default,
              {
                color: addOpacityToHex(onSurfaceColor, 0.5),
                marginLeft: 4,
              },
            ]}
          >
            {postfixText}
          </Text>
        )}

        {/* Trailing Icon / Password Toggle */}
        {type === 'password' ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setObscureText((prev) => !prev)}
            style={styles.trailingBox}
          >
            {obscureText
              ? Ux4gIcons.visibilityOff({
                  size: 20,
                  color: addOpacityToHex(onSurfaceColor, 0.5),
                })
              : Ux4gIcons.visibility({
                  size: 20,
                  color: addOpacityToHex(onSurfaceColor, 0.5),
                })}
          </TouchableOpacity>
        ) : trailingIcon !== undefined && trailingIcon !== null ? (
          <TouchableOpacity
            activeOpacity={onTrailingIconPressed ? 0.7 : 1}
            disabled={!onTrailingIconPressed}
            onPress={onTrailingIconPressed}
            style={styles.trailingBox}
          >
            {trailingIcon}
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Caption Section */}
      {caption !== undefined && caption !== null && caption.trim().length > 0 && (
        <View style={styles.captionRow}>
          {renderStatusIcon()}
          <Text
            style={[
              typography.bXS_default,
              {
                color: getStatusTextColor(),
                marginLeft: 6,
                flex: 1,
              },
              captionStyle,
            ]}
          >
            {caption}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  leadingBox: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  trailingBox: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});
