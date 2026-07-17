import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Animated,
  Easing,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { Ux4gSpace, Ux4gBorderWidth } from '../../foundation/dimensions';
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

export type Ux4gAccordionChevronPosition = 'leading' | 'trailing';

export interface Ux4gAccordionProps {
  /**
   * Title text displayed in the accordion header.
   */
  title: string;

  /**
   * Content inside the expandable panel.
   */
  children?: React.ReactNode;

  /**
   * Content inside the expandable panel (alias for children, mirrors Flutter `child`).
   */
  content?: React.ReactNode;

  /**
   * Whether the accordion panel is currently expanded.
   * @default false
   */
  expanded?: boolean;

  /**
   * Whether the accordion is interactive and enabled.
   * @default true
   */
  enabled?: boolean;

  /**
   * Callback fired when the user taps the accordion header.
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * Background color for the header bar.
   */
  backgroundColor?: string;

  /**
   * Background color for the expanded content container.
   */
  contentBackgroundColor?: string;

  /**
   * Border color when collapsed (`onSurface` with 0.12 opacity by default).
   */
  collapsedBorderColor?: string;

  /**
   * Border color when expanded (`collapsedBorderColor` by default).
   */
  expandedBorderColor?: string;

  /**
   * Title text color (`onSurface` by default).
   */
  titleColor?: string;

  /**
   * Title text color when disabled (`onSurface` with 0.38 opacity by default).
   */
  disabledTitleColor?: string;

  /**
   * Chevron and leading icon color (`onSurface` by default).
   */
  iconColor?: string;

  /**
   * Chevron and leading icon color when disabled (`onSurface` with 0.38 opacity by default).
   */
  disabledIconColor?: string;

  /**
   * Optional leading icon node displayed before the title.
   */
  leadingIcon?: React.ReactNode;

  /**
   * Position of the chevron indicator (`leading` or `trailing`).
   * @default 'trailing'
   */
  chevronPosition?: Ux4gAccordionChevronPosition;

  /**
   * Custom style for the outermost wrapper view.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom style for the header row container.
   */
  headerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for the expanded content container.
   */
  contentStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for the header title text.
   */
  titleStyle?: StyleProp<TextStyle>;

  /**
   * Test identifier.
   */
  testID?: string;
}

/**
 * **Ux4gAccordion**
 *
 * Expandable panel component mirroring the Flutter `Ux4gAccordion` (`accordion.dart`),
 * supporting custom border colors, leading/trailing chevrons, animated chevron rotation (`220ms`),
 * and exact spacing/typography tokens.
 */
export const Ux4gAccordion: React.FC<Ux4gAccordionProps> = ({
  title,
  children,
  content,
  expanded = false,
  enabled = true,
  onExpandedChange,
  backgroundColor,
  contentBackgroundColor,
  collapsedBorderColor,
  expandedBorderColor,
  titleColor,
  disabledTitleColor,
  iconColor,
  disabledIconColor,
  leadingIcon,
  chevronPosition = 'trailing',
  style,
  headerStyle,
  contentStyle,
  titleStyle,
  testID,
}) => {
  const { colors, typography, isDark } = useUx4gTheme();

  // Surface and fallback colors
  const surface = colors?.surface ?? (isDark ? '#18181B' : '#FFFFFF');
  const onSurfaceColor = colors?.onSurface ?? (isDark ? '#FAFAFA' : '#18181B');

  const resolvedCollapsedBorderColor =
    collapsedBorderColor ?? addOpacityToHex(onSurfaceColor, 0.12);
  const resolvedExpandedBorderColor =
    expandedBorderColor ?? resolvedCollapsedBorderColor;
  const resolvedTitleColor = titleColor ?? onSurfaceColor;
  const resolvedDisabledTitleColor =
    disabledTitleColor ?? addOpacityToHex(onSurfaceColor, 0.38);
  const resolvedIconColor = iconColor ?? onSurfaceColor;
  const resolvedDisabledIconColor =
    disabledIconColor ?? addOpacityToHex(onSurfaceColor, 0.38);

  const borderColor = !enabled
    ? 'transparent'
    : expanded
    ? resolvedExpandedBorderColor
    : resolvedCollapsedBorderColor;

  const activeTitleColor = enabled
    ? resolvedTitleColor
    : resolvedDisabledTitleColor;
  const activeIconColor = enabled
    ? resolvedIconColor
    : resolvedDisabledIconColor;

  const [measuredHeight, setMeasuredHeight] = useState<number>(0);
  const progressAnim = useRef(new Animated.Value(expanded && enabled ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: expanded && enabled ? 1 : 0,
      duration: 220,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [expanded, enabled, progressAnim]);

  const rotateDeg = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const containerHeight = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, measuredHeight > 0 ? measuredHeight : 1000],
  });

  const contentOpacity = progressAnim.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 0.6, 1],
  });

  const handleHeaderPress = () => {
    if (enabled && onExpandedChange) {
      onExpandedChange(!expanded);
    }
  };

  const chevronNode = (
    <Animated.View style={{ transform: [{ rotate: rotateDeg }] }}>
      {typeof Ux4gIcons.arrowDropDown === 'function' ? (
        Ux4gIcons.arrowDropDown({
          size: Ux4gSpace.space16,
          color: activeIconColor,
        })
      ) : (
        <Text style={{ fontSize: Ux4gSpace.space16, color: activeIconColor }}>
          ▼
        </Text>
      )}
    </Animated.View>
  );

  const headerBgColor = backgroundColor ?? surface;
  const expandedBgColor = contentBackgroundColor ?? backgroundColor ?? surface;
  const innerContent = children ?? content;

  const isMeasuring = measuredHeight === 0 && expanded && enabled;
  const animatedClipStyle = isMeasuring
    ? { opacity: contentOpacity }
    : { height: containerHeight, opacity: contentOpacity };

  return (
    <View testID={testID} style={[styles.outerWrapper, style]}>
      {/* Header Row Bar */}
      <TouchableOpacity
        activeOpacity={enabled ? 0.75 : 1}
        onPress={handleHeaderPress}
        disabled={!enabled}
        style={[
          styles.headerContainer,
          {
            backgroundColor: headerBgColor,
            borderColor: borderColor,
            borderWidth: enabled ? Ux4gBorderWidth.thin : Ux4gBorderWidth.none,
          },
          headerStyle,
        ]}
      >
        {chevronPosition === 'leading' && (
          <>
            {chevronNode}
            <View style={{ width: Ux4gSpace.space8 }} />
          </>
        )}

        {leadingIcon !== undefined && leadingIcon !== null && (
          <>
            <View style={styles.iconContainer}>{leadingIcon}</View>
            <View style={{ width: Ux4gSpace.space8 }} />
          </>
        )}

        <Text
          style={[
            typography.lL_default,
            styles.titleText,
            { color: activeTitleColor },
            titleStyle,
          ]}
        >
          {title}
        </Text>

        {chevronPosition === 'trailing' && (
          <>
            <View style={{ width: Ux4gSpace.space8 }} />
            {chevronNode}
          </>
        )}
      </TouchableOpacity>

      {/* Expanded Content Section (Smooth ClipRect + AnimatedSize clone) */}
      <Animated.View style={[styles.clipContainer, animatedClipStyle]}>
        <View
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            if (h > 0 && Math.abs(h - measuredHeight) > 0.5) {
              setMeasuredHeight(h);
            }
          }}
          style={[
            styles.contentContainer,
            {
              backgroundColor: expandedBgColor,
              position: isMeasuring || measuredHeight === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              right: 0,
            },
            contentStyle,
          ]}
        >
          {innerContent}
        </View>
      </Animated.View>
    </View>
  );
};


export interface Ux4gAccordionItem {
  /**
   * Title text for this item.
   */
  title: string;

  /**
   * Whether this accordion item is enabled.
   * @default true
   */
  enabled?: boolean;

  /**
   * Optional leading icon node.
   */
  leadingIcon?: React.ReactNode;

  /**
   * Chevron position (`leading` or `trailing`).
   * @default 'trailing'
   */
  chevronPosition?: Ux4gAccordionChevronPosition;

  /**
   * Optional direct content node (used if contentBuilder is not passed).
   */
  content?: React.ReactNode;
}

export interface Ux4gAccordionGroupProps {
  /**
   * Array of accordion items.
   */
  items: Ux4gAccordionItem[];

  /**
   * Index of the currently expanded item (`null` or `undefined` if none expanded).
   */
  expandedIndex?: number | null;

  /**
   * Callback fired when an item is expanded or collapsed.
   */
  onExpandedIndexChange?: (index: number | null) => void;

  /**
   * Vertical spacing (`itemSpacing`) between accordion items.
   * @default Ux4gSpace.space20 (20)
   */
  itemSpacing?: number;

  /**
   * Optional builder function returning ReactNode for a given item/index.
   */
  contentBuilder?: (index: number, item: Ux4gAccordionItem) => React.ReactNode;

  /**
   * Custom style for the group container.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Test identifier.
   */
  testID?: string;
}

/**
 * **Ux4gAccordionGroup**
 *
 * Grouping controller for multiple `Ux4gAccordion` items, supporting mutually exclusive
 * expansion (`expandedIndex`) and customizable `itemSpacing` (`Ux4gSpace.space20` default).
 */
export const Ux4gAccordionGroup: React.FC<Ux4gAccordionGroupProps> = ({
  items,
  expandedIndex,
  onExpandedIndexChange,
  itemSpacing = Ux4gSpace.space20,
  contentBuilder,
  style,
  testID,
}) => {
  return (
    <View testID={testID} style={[styles.groupWrapper, style]}>
      {items.map((item, index) => {
        const isExpanded = expandedIndex === index;
        const bottomPadding = index === items.length - 1 ? 0 : itemSpacing;

        const itemContent = contentBuilder
          ? contentBuilder(index, item)
          : item.content;

        return (
          <View key={`accordion-item-${index}`} style={{ marginBottom: bottomPadding }}>
            <Ux4gAccordion
              title={item.title}
              leadingIcon={item.leadingIcon}
              chevronPosition={item.chevronPosition}
              expanded={isExpanded}
              enabled={item.enabled}
              onExpandedChange={(newExpanded) => {
                if (onExpandedIndexChange) {
                  onExpandedIndexChange(newExpanded ? index : null);
                }
              }}
            >
              {itemContent}
            </Ux4gAccordion>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  clipContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  groupWrapper: {
    width: '100%',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Ux4gSpace.space12,
    paddingVertical: Ux4gSpace.space8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    paddingTop: Ux4gSpace.space12,
    paddingLeft: Ux4gSpace.space12,
    paddingRight: Ux4gSpace.space12,
    paddingBottom: Ux4gSpace.space12,
  },
});
