import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { UX4GColors } from '../../foundation/colors';

// Dynamic import of react-native-svg for readyToUse .svg asset paths if available
let SvgPicture: any = null;
try {
  const Svg = require('react-native-svg');
  SvgPicture = Svg.SvgUri || Svg.default?.SvgUri;
} catch (e) {
  // react-native-svg SvgUri not available; fallback to standard Image / custom content
}

export type Ux4gBadgeLimit = 'singleDigit' | 'doubleDigit';
export type Ux4gBadgeVariant = 'dot' | 'count' | 'label' | 'icon' | 'readyToUse';
export type Ux4gBadgeAlignment = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export interface Ux4gBadgeOffset {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface Ux4gBadgeProps {
  /**
   * Optional child element around which the badge will be overlayed (`Stack` / `Positioned`).
   * If not provided, renders the badge standalone.
   */
  child?: React.ReactNode;
  /**
   * Alias `children` prop for wrapping (`child`).
   */
  children?: React.ReactNode;
  /**
   * The type of badge (`dot`, `count`, `label`, `icon`, or `readyToUse`).
   * Can be auto-inferred from `count`, `label`, `icon`, or `assetPath`.
   */
  variant?: Ux4gBadgeVariant;
  /**
   * Number to display when `variant = 'count'`.
   */
  count?: number;
  /**
   * Limit formatting threshold (`singleDigit` -> `9+`, `doubleDigit` -> `99+`).
   * @default 'singleDigit'
   */
  limit?: Ux4gBadgeLimit;
  /**
   * Short string text displayed when `variant = 'label'` (e.g., `"NEW"`, `"PRO"`).
   */
  label?: string;
  /**
   * Custom icon element or widget displayed when `variant = 'icon'`.
   */
  icon?: React.ReactNode;
  /**
   * Local or remote asset path string, `ImageSourcePropType`, React element, or icon function for `variant = 'readyToUse'`.
   */
  assetPath?: string | ImageSourcePropType | React.ReactNode | ((props: any) => React.ReactElement);
  /**
   * Custom badge container background color (defaults to `theme.colors.primary`).
   */
  containerColor?: string;
  /**
   * Custom text/icon color inside the badge (defaults to `#FFFFFF`).
   */
  contentColor?: string;
  /**
   * Alignment position when wrapping a `child` element (`topRight` default).
   * @default 'topRight'
   */
  alignment?: Ux4gBadgeAlignment;
  /**
   * Custom offset override for precise placement around `child` (defaults to `-4px` on aligned edges).
   */
  offset?: Ux4gBadgeOffset;
  /**
   * Whether to display a `1.5px` border around the badge (`false` default).
   * @default false
   */
  showBorder?: boolean;
  /**
   * Custom border color (defaults to `theme.colors.surface`).
   */
  borderColor?: string;
  /**
   * Custom style override for the standalone badge container or outer wrapper when wrapping a child.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom style override specifically applied to the badge pill (`_buildBadge`).
   */
  badgeStyle?: StyleProp<ViewStyle>;
  /**
   * Custom text style override applied to numeric count or label string.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gBadgeComponent**
 *
 * Internal core functional renderer matching exact Flutter `badge.dart` (`_buildBadge` and `Stack/Positioned`).
 */
const Ux4gBadgeComponent: React.FC<Ux4gBadgeProps> = ({
  child,
  children,
  variant,
  count,
  limit = 'singleDigit',
  label,
  icon,
  assetPath,
  containerColor,
  contentColor,
  alignment = 'topRight',
  offset,
  showBorder = false,
  borderColor,
  style,
  badgeStyle,
  textStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const typography = theme.typography;

  const resolvedChild = child ?? children;

  // Infer variant exactly matching Flutter constructors if not explicitly provided
  let resolvedVariant: Ux4gBadgeVariant = variant ?? 'dot';
  if (!variant) {
    if (count !== undefined && count !== null) {
      resolvedVariant = 'count';
    } else if (label !== undefined && label !== null && label !== '') {
      resolvedVariant = 'label';
    } else if (icon !== undefined && icon !== null) {
      resolvedVariant = 'icon';
    } else if (assetPath !== undefined && assetPath !== null) {
      resolvedVariant = 'readyToUse';
    } else {
      resolvedVariant = 'dot';
    }
  }

  const resolvedBg =
    containerColor ?? (colors.primary ?? (theme.isDark ? UX4GColors.primary400 : UX4GColors.primary600));
  const resolvedContent = contentColor ?? UX4GColors.white;
  const resolvedBorderColor =
    borderColor ?? (colors.surface ?? (theme.isDark ? UX4GColors.neutral900 : UX4GColors.white));

  const borderProps: ViewStyle = showBorder
    ? {
        borderWidth: 1.5,
        borderColor: resolvedBorderColor,
      }
    : {};

  const lSStrong = typography.lS_strong;

  const buildBadgeContent = (): React.ReactElement | null => {
    switch (resolvedVariant) {
      case 'dot':
        return (
          <View
            testID={testID ? `${testID}-badge` : undefined}
            style={[
              styles.dotBadge,
              showBorder && { width: 10, height: 10, borderRadius: 5 },
              { backgroundColor: resolvedBg },
              borderProps,
              badgeStyle,
            ]}
          />
        );

      case 'count': {
        if (count === undefined || count === null) return null;
        const displayCount =
          limit === 'singleDigit'
            ? count > 9
              ? '9+'
              : count.toString()
            : count > 99
            ? '99+'
            : count.toString();

        const isSingleChar = displayCount.length === 1;

        return (
          <View
            testID={testID ? `${testID}-badge` : undefined}
            style={[
              styles.countBadge,
              {
                backgroundColor: resolvedBg,
                paddingHorizontal: isSingleChar ? 0 : 6,
                borderRadius: 999,
              },
              borderProps,
              badgeStyle,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  fontSize: 10,
                  fontWeight: lSStrong.fontWeight,
                  lineHeight: 12,
                  color: resolvedContent,
                },
                textStyle,
              ]}
              numberOfLines={1}
            >
              {displayCount}
            </Text>
          </View>
        );
      }

      case 'label': {
        if (label === undefined || label === null || label === '') return null;
        return (
          <View
            testID={testID ? `${testID}-badge` : undefined}
            style={[
              styles.labelBadge,
              { backgroundColor: resolvedBg },
              borderProps,
              badgeStyle,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  fontSize: lSStrong.fontSize,
                  fontWeight: lSStrong.fontWeight,
                  lineHeight: lSStrong.lineHeight,
                  color: resolvedContent,
                },
                textStyle,
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
          </View>
        );
      }

      case 'icon': {
        if (icon === undefined || icon === null) return null;

        // If valid React element, clone or render with resolvedContent color / 12px size
        let renderedIcon = icon;
        if (React.isValidElement(icon)) {
          renderedIcon = React.cloneElement(icon as React.ReactElement<any>, {
            size: (icon.props as any).size ?? 12,
            color: (icon.props as any).color ?? resolvedContent,
          });
        }

        return (
          <View
            testID={testID ? `${testID}-badge` : undefined}
            style={[
              styles.iconBadge,
              showBorder && { width: 20, height: 20, borderRadius: 10 },
              { backgroundColor: resolvedBg },
              borderProps,
              badgeStyle,
            ]}
          >
            {renderedIcon}
          </View>
        );
      }

      case 'readyToUse': {
        if (assetPath === undefined || assetPath === null) return null;

        let imageWidget: React.ReactElement;
        if (React.isValidElement(assetPath)) {
          imageWidget = assetPath as React.ReactElement;
        } else if (typeof assetPath === 'function') {
          imageWidget = (assetPath as any)({ size: 18 });
        } else if (typeof assetPath === 'string') {
          if (assetPath.toLowerCase().endsWith('.svg') && SvgPicture) {
            imageWidget = <SvgPicture uri={assetPath} width={18} height={18} />;
          } else {
            imageWidget = (
              <Image source={{ uri: assetPath }} style={styles.readyImage} resizeMode="contain" />
            );
          }
        } else {
          imageWidget = <Image source={assetPath as ImageSourcePropType} style={styles.readyImage} resizeMode="contain" />;
        }

        if (showBorder) {
          return (
            <View
              testID={testID ? `${testID}-badge` : undefined}
              style={[
                styles.readyToUseBordered,
                borderProps,
                badgeStyle,
              ]}
            >
              {imageWidget}
            </View>
          );
        }

        return (
          <View testID={testID ? `${testID}-badge` : undefined} style={badgeStyle}>
            {imageWidget}
          </View>
        );
      }

      default:
        return null;
    }
  };

  const badgeElement = buildBadgeContent();
  if (!badgeElement) return null;

  if (!resolvedChild) {
    return (
      <View testID={testID} style={[styles.standaloneContainer, style]}>
        {badgeElement}
      </View>
    );
  }

  // Overlay badge on edge of child matching Stack/Positioned logic
  const getPositionStyles = (): ViewStyle => {
    if (offset) {
      return {
        position: 'absolute',
        ...offset,
      };
    }

    switch (alignment) {
      case 'topLeft':
        return { position: 'absolute', top: -4, left: -4 };
      case 'bottomRight':
        return { position: 'absolute', bottom: -4, right: -4 };
      case 'bottomLeft':
        return { position: 'absolute', bottom: -4, left: -4 };
      case 'topRight':
      default:
        return { position: 'absolute', top: -4, right: -4 };
    }
  };

  return (
    <View testID={testID} style={[styles.overlayWrapper, style]}>
      {resolvedChild}
      <View style={[styles.badgePositionContainer, getPositionStyles()]}>
        {badgeElement}
      </View>
    </View>
  );
};

/**
 * **Ux4gBadge** (`Badge`)
 *
 * Compound functional component matching exact Flutter `badge.dart` constructors (`Ux4gBadge.dot()`,
 * `Ux4gBadge.count()`, `Ux4gBadge.label()`, `Ux4gBadge.icon()`, and `Ux4gBadge.readyToUse()`).
 */
export const Ux4gBadge = Object.assign(Ux4gBadgeComponent, {
  /**
   * Dot indicator badge (`Ux4gBadge.dot(...)`).
   */
  dot: (props?: Omit<Ux4gBadgeProps, 'variant'>) => <Ux4gBadgeComponent {...props} variant="dot" />,

  /**
   * Numeric counter badge (`Ux4gBadge.count(...)`). Accepts either exact `count` first argument
   * or standard props object.
   */
  count: (
    countOrProps: number | Omit<Ux4gBadgeProps, 'variant'>,
    optionalProps?: Omit<Ux4gBadgeProps, 'variant' | 'count'>
  ) => {
    if (typeof countOrProps === 'number') {
      return <Ux4gBadgeComponent {...optionalProps} variant="count" count={countOrProps} />;
    }
    return <Ux4gBadgeComponent {...countOrProps} variant="count" />;
  },

  /**
   * Label string badge (`Ux4gBadge.label(...)`). Accepts either `label` string first argument
   * or standard props object.
   */
  label: (
    labelOrProps: string | Omit<Ux4gBadgeProps, 'variant'>,
    optionalProps?: Omit<Ux4gBadgeProps, 'variant' | 'label'>
  ) => {
    if (typeof labelOrProps === 'string') {
      return <Ux4gBadgeComponent {...optionalProps} variant="label" label={labelOrProps} />;
    }
    return <Ux4gBadgeComponent {...labelOrProps} variant="label" />;
  },

  /**
   * Icon element badge (`Ux4gBadge.icon(...)`). Accepts either `icon` node first argument
   * or standard props object.
   */
  icon: (
    iconOrProps: React.ReactNode | Omit<Ux4gBadgeProps, 'variant'>,
    optionalProps?: Omit<Ux4gBadgeProps, 'variant' | 'icon'>
  ) => {
    if (React.isValidElement(iconOrProps)) {
      return <Ux4gBadgeComponent {...optionalProps} variant="icon" icon={iconOrProps} />;
    }
    if (iconOrProps && typeof iconOrProps === 'object' && !Array.isArray(iconOrProps) && !React.isValidElement(iconOrProps)) {
      return <Ux4gBadgeComponent {...(iconOrProps as Omit<Ux4gBadgeProps, 'variant'>)} variant="icon" />;
    }
    return <Ux4gBadgeComponent {...optionalProps} variant="icon" icon={iconOrProps} />;
  },

  /**
   * Asset image/svg badge (`Ux4gBadge.readyToUse(...)`). Accepts either `assetPath` first argument
   * or standard props object.
   */
  readyToUse: (
    assetOrProps: string | ImageSourcePropType | React.ReactNode | ((props: any) => React.ReactElement) | Omit<Ux4gBadgeProps, 'variant'>,
    optionalProps?: Omit<Ux4gBadgeProps, 'variant' | 'assetPath'>
  ) => {
    if (typeof assetOrProps === 'string' || typeof assetOrProps === 'number' || React.isValidElement(assetOrProps) || typeof assetOrProps === 'function') {
      return <Ux4gBadgeComponent {...optionalProps} variant="readyToUse" assetPath={assetOrProps as any} />;
    }
    if (assetOrProps && typeof assetOrProps === 'object' && !Array.isArray(assetOrProps) && !('uri' in assetOrProps) && !React.isValidElement(assetOrProps)) {
      return <Ux4gBadgeComponent {...(assetOrProps as Omit<Ux4gBadgeProps, 'variant'>)} variant="readyToUse" />;
    }
    return <Ux4gBadgeComponent {...optionalProps} variant="readyToUse" assetPath={assetOrProps as ImageSourcePropType} />;
  },
});

const styles = StyleSheet.create({
  standaloneContainer: {
    alignSelf: 'flex-start',
    overflow: 'visible',
  },
  overlayWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
    overflow: 'visible',
  },
  badgePositionContainer: {
    zIndex: 999,
    overflow: 'visible',
  },
  dotBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  countBadge: {
    minWidth: 18,
    minHeight: 18,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  labelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minHeight: 18,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconBadge: {
    width: 18,
    height: 18,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  badgeText: {
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  readyImage: {
    width: 18,
    height: 18,
  },
  readyToUseBordered: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
});
