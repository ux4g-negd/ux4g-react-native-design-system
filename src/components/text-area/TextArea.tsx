import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { UX4GColors } from '../../foundation/colors';
import { Ux4gRadius } from '../../foundation/dimensions';
import { Ux4gIcons } from '../../foundation/icons';
import { Ux4gInputFieldStatus } from '../input-field/InputField';

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

export type Ux4gTextAreaSize = 'small' | 'large';

export type Ux4gTextAreaMinHeight = 'small' | 'medium' | 'large' | number;

export const Ux4gTextAreaMinHeightMap: Record<'small' | 'medium' | 'large', number> = {
  small: 80,
  medium: 120,
  large: 160,
};

export interface Ux4gTextAreaProps {
  /**
   * Current text string inside the text area.
   */
  value: string;

  /**
   * Callback invoked when text changes.
   */
  onValueChange: (value: string) => void;

  /**
   * Padding sizing (`small` = 12px, `large` = 16px).
   * @default 'large'
   */
  size?: Ux4gTextAreaSize;

  /**
   * Minimum height token (`small`=80, `medium`=120, `large`=160) or exact number in px.
   * @default 'medium'
   */
  minHeight?: Ux4gTextAreaMinHeight;

  /**
   * Semantic validation status (`defaultStatus`, `error`, `warning`, `success`).
   * @default 'defaultStatus'
   */
  status?: Ux4gInputFieldStatus;

  /**
   * Optional top label displayed above the text area.
   */
  label?: string;

  /**
   * Whether to display a red asterisk (`*`) next to the label.
   * @default false
   */
  required?: boolean;

  /**
   * Placeholder hint text displayed when empty.
   */
  placeholder?: string;

  /**
   * Helper or status caption displayed below the text area.
   */
  caption?: string;

  /**
   * Whether to show semantic status icon next to the caption.
   * @default true
   */
  showCaptionIcon?: boolean;

  /**
   * Optional trailing icon/node placed next to the label string.
   */
  trailingIconLabel?: React.ReactNode;

  /**
   * Custom string override for character count text (e.g. "0/500 words").
   */
  characterCountText?: string;

  /**
   * Whether the text area is enabled and interactive.
   * @default true
   */
  enabled?: boolean;

  /**
   * Whether the text area is read-only.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Maximum character length limit.
   */
  maxLength?: number;

  /**
   * Custom style for the inner `TextInput`.
   */
  style?: StyleProp<TextStyle>;

  /**
   * Custom style for the outer container.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for the top label.
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Custom style for the bottom caption.
   */
  captionStyle?: StyleProp<TextStyle>;

  /**
   * Custom placeholder text color.
   */
  placeholderTextColor?: string;

  /**
   * Test identifier for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gTextArea**
 *
 * Multiline text area component mirroring the Flutter `Ux4gTextArea` component (`text_area.dart`),
 * supporting semantic statuses (`error`, `warning`, `success`), customizable `minHeight` tokens (`small`, `medium`, `large`),
 * character counting (`maxLength`), and visual resize grip indicators.
 */
export const Ux4gTextArea: React.FC<Ux4gTextAreaProps> = ({
  value,
  onValueChange,
  size = 'large',
  minHeight = 'medium',
  status = 'defaultStatus',
  label,
  required = false,
  placeholder,
  caption,
  showCaptionIcon = true,
  trailingIconLabel,
  characterCountText,
  enabled = true,
  readOnly = false,
  maxLength,
  style,
  containerStyle,
  labelStyle,
  captionStyle,
  placeholderTextColor,
  testID,
}) => {
  const { colors, typography, isDark } = useUx4gTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Surface and border colors
  const surface = colors?.surface ?? (isDark ? '#18181B' : '#FFFFFF');
  const onSurfaceColor = colors?.onSurface ?? (isDark ? '#FAFAFA' : '#18181B');
  const onBackground = colors?.onBackground ?? onSurfaceColor;
  const primaryColor = colors?.primary ?? (isDark ? '#60A5FA' : '#3271EA');
  const errorColor = colors?.error ?? (isDark ? '#F87171' : '#DC2626');
  const warningColor = colors?.warning ?? (isDark ? '#FBBF24' : '#D97706');
  const successColor = colors?.success ?? (isDark ? '#34D399' : '#059669');

  const getBorderColor = (): string => {
    if (!enabled) return addOpacityToHex(onSurfaceColor, 0.3);
    switch (status) {
      case 'error':
        return errorColor;
      case 'warning':
        return warningColor;
      case 'success':
        return successColor;
      case 'defaultStatus':
      default:
        return isFocused ? primaryColor : addOpacityToHex(onSurfaceColor, 0.3);
    }
  };

  const getLabelColor = (): string => {
    if (!enabled) return addOpacityToHex(onSurfaceColor, 0.4);
    switch (status) {
      case 'error':
        return errorColor;
      case 'warning':
        return warningColor;
      case 'success':
        return successColor;
      case 'defaultStatus':
      default:
        return onBackground;
    }
  };

  const getCaptionColor = (): string => {
    if (!enabled) return addOpacityToHex(onSurfaceColor, 0.4);
    switch (status) {
      case 'error':
        return errorColor;
      case 'warning':
        return warningColor;
      case 'success':
        return successColor;
      case 'defaultStatus':
      default:
        return addOpacityToHex(onSurfaceColor, 0.6);
    }
  };

  const renderStatusIcon = (): React.ReactNode | null => {
    const iconColor = getCaptionColor();
    switch (status) {
      case 'error':
        return Ux4gIcons.error({ size: 14, color: iconColor });
      case 'warning':
        return Ux4gIcons.warning({ size: 14, color: iconColor });
      case 'success':
        return Ux4gIcons.success({ size: 14, color: iconColor });
      case 'defaultStatus':
      default:
        return null;
    }
  };

  const getMinHeightPx = (): number => {
    if (typeof minHeight === 'number') {
      return minHeight;
    }
    return Ux4gTextAreaMinHeightMap[minHeight] ?? 120;
  };

  const contentPadding = size === 'large' ? 16 : 12;
  const bgColor = enabled ? surface : addOpacityToHex(onSurfaceColor, 0.05);

  const renderResizeGrip = () => {
    const gripColor = addOpacityToHex(onSurfaceColor, 0.4);
    try {
      const RNSvg = require('react-native-svg');
      const Svg = RNSvg.Svg || RNSvg.default;
      const Line = RNSvg.Line;
      if (Svg && Line) {
        return (
          <Svg width={8} height={8} viewBox="0 0 8 8">
            <Line
              x1="2"
              y1="8"
              x2="8"
              y2="2"
              stroke={gripColor}
              strokeWidth="1.2"
              strokeCap="round"
            />
            <Line
              x1="0"
              y1="5.6"
              x2="5.6"
              y2="0"
              stroke={gripColor}
              strokeWidth="1.2"
              strokeCap="round"
            />
          </Svg>
        );
      }
    } catch (e) {
      // SVG not available, fallback to pure React Native View lines
    }
    return (
      <View style={styles.fallbackGripBox}>
        <View style={[styles.fallbackLine1, { backgroundColor: gripColor }]} />
        <View style={[styles.fallbackLine2, { backgroundColor: gripColor }]} />
      </View>
    );
  };

  return (
    <View testID={testID} style={[styles.outerContainer, containerStyle]}>
      {/* Label Section */}
      {label !== undefined && label !== null && (
        <View style={styles.labelRow}>
          <Text
            style={[
              typography.lL_default,
              { color: getLabelColor(), fontWeight: '500' },
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
            <View style={{ marginLeft: 4 }}>{trailingIconLabel}</View>
          )}
        </View>
      )}

      {/* Main Text Area Container Box */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (enabled && !readOnly) {
            inputRef.current?.focus();
          }
        }}
        style={[
          styles.boxContainer,
          {
            minHeight: getMinHeightPx(),
            backgroundColor: bgColor,
            borderColor: getBorderColor(),
            borderWidth: isFocused ? 2 : 1,
            padding: contentPadding,
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onValueChange}
          editable={enabled && !readOnly}
          multiline={true}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor ?? addOpacityToHex(onSurfaceColor, 0.4)
          }
          style={[
            styles.textInput,
            typography.bM_default,
            {
              color: enabled
                ? onBackground
                : addOpacityToHex(onSurfaceColor, 0.4),
            },
            style,
          ]}
        />

        {/* Bottom-Right Bar (Counter & Resize Grip) */}
        <View style={styles.bottomRightBar}>
          {(characterCountText !== undefined || maxLength !== undefined) && (
            <Text
              style={[
                typography.bXS_default,
                {
                  color: addOpacityToHex(onSurfaceColor, 0.5),
                  marginRight: 4,
                },
              ]}
            >
              {characterCountText ?? `${value.length}/${maxLength}`}
            </Text>
          )}
          <View style={styles.gripWrapper}>{renderResizeGrip()}</View>
        </View>
      </TouchableOpacity>

      {/* Caption Section */}
      {caption !== undefined &&
        caption !== null &&
        caption.trim().length > 0 && (
          <View style={styles.captionRow}>
            {showCaptionIcon && renderStatusIcon() !== null && (
              <View style={{ marginRight: 6 }}>{renderStatusIcon()}</View>
            )}
            <Text
              style={[
                typography.bXS_default,
                { color: getCaptionColor(), flex: 1 },
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
  boxContainer: {
    width: '100%',
    borderRadius: Ux4gRadius.radius8,
    position: 'relative',
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    includeFontPadding: false,
    textAlignVertical: 'top',
    paddingBottom: 24, // Reserve space at bottom right for character counter and grip
  },
  bottomRightBar: {
    position: 'absolute',
    right: 8,
    bottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gripWrapper: {
    paddingBottom: 2,
    paddingRight: 2,
    paddingLeft: 2,
  },
  fallbackGripBox: {
    width: 8,
    height: 8,
    position: 'relative',
  },
  fallbackLine1: {
    position: 'absolute',
    right: 0,
    bottom: 2,
    width: 6,
    height: 1.2,
    transform: [{ rotate: '-45deg' }],
  },
  fallbackLine2: {
    position: 'absolute',
    right: 2,
    bottom: 0,
    width: 6,
    height: 1.2,
    transform: [{ rotate: '-45deg' }],
  },
  captionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});
