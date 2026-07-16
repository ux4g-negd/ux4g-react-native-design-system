import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { UX4GColors } from '../../foundation/colors';

export type Ux4gTagSize = 'm' | 'l' | 'medium' | 'large';
export type Ux4gTagShape = 'circular' | 'rectangular';
export type Ux4gTagStyle = 'tonal' | 'filled' | 'outline' | 'text';
export type Ux4gTagColor = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';

export interface Ux4gTagProps {
  /**
   * The text string displayed inside the tag label.
   */
  text: string;
  /**
   * Size of the tag (`m` `20px` height or `l` `24px` height).
   * @default 'm'
   */
  size?: Ux4gTagSize;
  /**
   * Shape of the tag (`circular` pill vs `rectangular` rounded `4px`).
   * @default 'circular'
   */
  shape?: Ux4gTagShape;
  /**
   * Visual style of the tag (`tonal`, `filled`, `outline`, or `text`).
   * @default 'tonal'
   */
  style?: Ux4gTagStyle;
  /**
   * Color scheme palette matching design foundation tokens (`neutral`, `brand`, `success`, `warning`, `error`, `info`).
   * @default 'neutral'
   */
  colorScheme?: Ux4gTagColor;
  /**
   * Optional custom widget/icon rendered before the text label.
   */
  leadingContent?: React.ReactNode;
  /**
   * Optional dismiss callback. When provided, renders a trailing close icon button (`✕`).
   */
  onDismiss?: () => void;
  /**
   * Custom background color override.
   */
  customBackgroundColor?: string;
  /**
   * Custom content/text color override.
   */
  customContentColor?: string;
  /**
   * Custom border color override.
   */
  customBorderColor?: string;
  /**
   * Custom border radius override in pixels.
   */
  customBorderRadius?: number;
  /**
   * Custom container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Custom text style override.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

export interface Ux4gPillSegment {
  text: string;
  leading?: React.ReactNode;
  textColor?: string;
  bold?: boolean;
}

export interface Ux4gUnifiedPillTagProps {
  segments: Ux4gPillSegment[];
  backgroundColor?: string;
  dividerColor?: string;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * **Ux4gTag** (`Tag`)
 *
 * Full React Native port of Flutter `tag.dart` (`Ux4gTag`). Supports sizes (`m`, `l`), shapes (`circular`, `rectangular`),
 * styles (`tonal`, `filled`, `outline`, `text`), color palettes (`neutral`, `brand`, `success`, `warning`, `error`, `info`),
 * leading widgets, and interactive dismiss actions (`onDismiss`).
 */
export const Ux4gTag: React.FC<Ux4gTagProps> = ({
  text,
  size = 'm',
  shape = 'circular',
  style = 'tonal',
  colorScheme = 'neutral',
  leadingContent,
  onDismiss,
  customBackgroundColor,
  customContentColor,
  customBorderColor,
  customBorderRadius,
  containerStyle,
  textStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const typography = theme.typography;
  const isDark = theme.isDark;

  const getTagColors = () => {
    let baseColor = colors.primary ?? UX4GColors.primary600;
    if (colorScheme === 'neutral') {
      baseColor = isDark ? UX4GColors.neutral300 : UX4GColors.neutral700;
    } else if (colorScheme === 'success') {
      baseColor = colors.success ?? (isDark ? UX4GColors.green400 : UX4GColors.green600);
    } else if (colorScheme === 'warning') {
      baseColor = colors.warning ?? (isDark ? UX4GColors.orange400 : UX4GColors.orange600);
    } else if (colorScheme === 'error') {
      baseColor = colors.error ?? (isDark ? UX4GColors.red400 : UX4GColors.red600);
    } else if (colorScheme === 'info') {
      baseColor = colors.info ?? (isDark ? UX4GColors.cyan400 : UX4GColors.cyan600);
    }

    let bg = 'transparent';
    let content = baseColor;
    let border = 'transparent';

    switch (style) {
      case 'tonal':
        if (colorScheme === 'neutral') {
          bg = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
          content = isDark ? UX4GColors.neutral200 : UX4GColors.neutral800;
        } else {
          bg = isDark ? `${baseColor}26` : `${baseColor}1A`;
          content = baseColor;
        }
        break;
      case 'filled':
        bg = baseColor;
        content = colorScheme === 'neutral' && !isDark ? UX4GColors.white : colors.surface ?? UX4GColors.white;
        break;
      case 'outline':
        bg = 'transparent';
        content = baseColor;
        border = baseColor;
        break;
      case 'text':
        bg = 'transparent';
        content = baseColor;
        break;
    }

    return { backgroundColor: bg, contentColor: content, borderColor: border };
  };

  const defaultColors = getTagColors();
  const bgColor = customBackgroundColor ?? defaultColors.backgroundColor;
  const contentColor = customContentColor ?? defaultColors.contentColor;
  const borderColor = customBorderColor ?? defaultColors.borderColor;

  const isLarge = size === 'l' || size === 'large';
  const height = isLarge ? 24 : 20;
  const horizontalPadding = isLarge ? 12 : 8;

  let borderRadius = shape === 'circular' ? 999 : 4;
  if (customBorderRadius !== undefined) borderRadius = customBorderRadius;

  const typo = isLarge ? typography.lM_default : typography.lS_default;

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          height,
          paddingHorizontal: horizontalPadding,
          backgroundColor: bgColor,
          borderRadius,
          borderWidth: style === 'outline' || customBorderColor ? 1 : 0,
          borderColor: style === 'outline' || customBorderColor ? borderColor : 'transparent',
        },
        containerStyle,
      ]}
    >
      {leadingContent && <View style={styles.leading}>{leadingContent}</View>}
      <Text
        style={[
          styles.text,
          {
            fontSize: typo.fontSize,
            fontWeight: typo.fontWeight,
            lineHeight: typo.lineHeight,
            color: contentColor,
          },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {text}
      </Text>
      {onDismiss && (
        <Pressable
          testID={testID ? `${testID}-dismiss` : undefined}
          onPress={onDismiss}
          style={({ pressed }) => [styles.dismissBtn, { opacity: pressed ? 0.5 : 1 }]}
          hitSlop={8}
        >
          <Text style={[styles.dismissText, { color: contentColor }]}>✕</Text>
        </Pressable>
      )}
    </View>
  );
};

/**
 * **Ux4gUnifiedPillTag** (`UnifiedPillTag`)
 *
 * Multi-segment pill tag separated by vertical divider lines matching Flutter `Ux4gUnifiedPillTag`.
 */
export const Ux4gUnifiedPillTag: React.FC<Ux4gUnifiedPillTagProps> = ({
  segments,
  backgroundColor,
  dividerColor,
  height = 24,
  containerStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const bg = backgroundColor ?? (theme.isDark ? '#27272A' : '#F4F4F5');
  const divCol = dividerColor ?? (theme.isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)');
  const typoStrong = theme.typography.lS_strong;
  const typoDefault = theme.typography.lS_default;

  return (
    <View
      testID={testID}
      style={[
        styles.unifiedContainer,
        { backgroundColor: bg, height, borderRadius: 8, borderColor: divCol, borderWidth: 1 },
        containerStyle,
      ]}
    >
      {segments.map((seg, idx) => {
        const typo = seg.bold ? typoStrong : typoDefault;
        const col = seg.textColor ?? (theme.isDark ? UX4GColors.neutral200 : UX4GColors.neutral800);
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <View style={[styles.segmentDivider, { backgroundColor: divCol }]} />}
            <View style={styles.segment}>
              {seg.leading && <View style={styles.leading}>{seg.leading}</View>}
              <Text style={{ fontSize: typo.fontSize, fontWeight: typo.fontWeight, color: col }}>
                {seg.text}
              </Text>
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  leading: {
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  dismissBtn: {
    marginLeft: 6,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissText: {
    fontSize: 10,
    fontWeight: '700',
  },
  unifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  segment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  segmentDivider: {
    width: 1,
    height: '60%',
  },
});
