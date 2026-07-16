import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';

// Dynamically require react-native-svg for crisp dashed/dotted vector lines
let SvgComponent: any = null;
let LineComponent: any = null;
try {
  const rns = require('react-native-svg');
  SvgComponent = rns.Svg;
  LineComponent = rns.Line;
} catch (e) {
  // react-native-svg not available, fallback to native View borderStyle
}

const getHexWithAlpha = (baseHex: string, alphaHex: string): string => {
  if (baseHex && baseHex.startsWith('#') && baseHex.length === 7) {
    return `${baseHex}${alphaHex}`;
  }
  return baseHex;
};

export type Ux4gDividerOrientation = 'horizontal' | 'vertical';
export type Ux4gDividerStyle = 'solid' | 'dashed' | 'dotted';

export interface Ux4gDividerProps {
  /**
   * Orientation of the divider (`horizontal` or `vertical`).
   * @default 'horizontal'
   */
  orientation?: Ux4gDividerOrientation;
  /**
   * Color of the divider line.
   * If undefined, defaults to `theme.colors.onSurface` with 20% opacity (`#...33`).
   */
  color?: string;
  /**
   * Thickness (stroke width / height / width) of the divider line.
   * @default 1.0
   */
  thickness?: number;
  /**
   * Line style (`solid`, `dashed`, or `dotted`).
   * @default 'solid'
   */
  style?: Ux4gDividerStyle;
  /**
   * Leading space indentation before the line begins.
   * For horizontal divider, applies to left margin/padding.
   * For vertical divider, applies to top margin/padding.
   * @default 0.0
   */
  startIndent?: number;
  /**
   * Trailing space indentation after the line ends.
   * For horizontal divider, applies to right margin/padding.
   * For vertical divider, applies to bottom margin/padding.
   * @default 0.0
   */
  endIndent?: number;
  /**
   * Optional label component or string rendered at the center of the divider.
   * When provided, the divider line splits into two symmetrical segments on either side of the label.
   */
  label?: React.ReactNode | string;
  /**
   * Spacing around the label (`width` for horizontal, `height` for vertical).
   * @default 8.0
   */
  labelSpacing?: number;
  /**
   * Explicit width constraint of the divider container.
   */
  width?: number | string;
  /**
   * Explicit height constraint of the divider container.
   */
  height?: number | string;
  /**
   * Additional style attributes for the root divider container.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Custom style attributes for the label text when `label` is passed as a string.
   */
  labelTextStyle?: StyleProp<TextStyle>;
}

const renderDividerSegment = (
  orient: Ux4gDividerOrientation,
  lineColor: string,
  lineThickness: number,
  lineStyle: Ux4gDividerStyle,
  sIndent: number,
  eIndent: number,
  explicitWidth?: number | string,
  explicitHeight?: number | string
) => {
  const isHorizontal = orient === 'horizontal';

  const containerW = explicitWidth ?? (isHorizontal ? '100%' : lineThickness);
  const containerH = explicitHeight ?? (isHorizontal ? lineThickness : '100%');

  const wrapperStyle: ViewStyle = isHorizontal
    ? {
        width: containerW as any,
        height: containerH as any,
        paddingLeft: sIndent,
        paddingRight: eIndent,
        justifyContent: 'center',
      }
    : {
        width: containerW as any,
        height: containerH as any,
        paddingTop: sIndent,
        paddingBottom: eIndent,
        alignItems: 'center',
      };

  if (lineStyle === 'solid') {
    return (
      <View style={wrapperStyle}>
        <View
          style={[
            isHorizontal
              ? { width: '100%', height: lineThickness }
              : { width: lineThickness, height: '100%' },
            { backgroundColor: lineColor },
          ]}
        />
      </View>
    );
  }

  // SVG dashed/dotted rendering matching Flutter _DividerPainter
  if (SvgComponent && LineComponent) {
    const strokeDasharray = lineStyle === 'dashed' ? '12, 8' : '4, 4';
    return (
      <View style={wrapperStyle}>
        <View style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <SvgComponent width="100%" height="100%">
            <LineComponent
              x1={isHorizontal ? 0 : lineThickness / 2}
              y1={isHorizontal ? lineThickness / 2 : 0}
              x2={isHorizontal ? '100%' : lineThickness / 2}
              y2={isHorizontal ? lineThickness / 2 : '100%'}
              stroke={lineColor}
              strokeWidth={lineThickness}
              strokeDasharray={strokeDasharray}
            />
          </SvgComponent>
        </View>
      </View>
    );
  }

  // Fallback if react-native-svg is not installed
  return (
    <View style={wrapperStyle}>
      <View
        style={[
          isHorizontal
            ? { width: '100%', height: lineThickness }
            : { width: lineThickness, height: '100%' },
          {
            borderColor: lineColor,
            borderWidth: lineThickness / 2,
            borderStyle: lineStyle === 'dashed' ? 'dashed' : 'dotted',
          },
        ]}
      />
    </View>
  );
};

export const Ux4gDivider: React.FC<Ux4gDividerProps> = ({
  orientation = 'horizontal',
  color,
  thickness = 1.0,
  style = 'solid',
  startIndent = 0.0,
  endIndent = 0.0,
  label,
  labelSpacing = 8.0,
  width,
  height,
  containerStyle,
  labelTextStyle,
}) => {
  const theme = useUx4gTheme();

  // 20% alpha on onSurface by default (`33` hex = 0.2 * 255 = 51)
  const dividerColor = color ?? getHexWithAlpha(theme.colors.onSurface, '33');

  const isHorizontal = orientation === 'horizontal';

  if (label !== undefined && label !== null) {
    const renderedLabel =
      typeof label === 'string' ? (
        <Text
          style={[
            styles.defaultLabelText,
            { color: theme.colors.onSurface },
            labelTextStyle,
          ]}
        >
          {label}
        </Text>
      ) : (
        label
      );

    const labeledContent = isHorizontal ? (
      <View
        style={[
          styles.rowContainer,
          width !== undefined && { width: width as any },
          height !== undefined && { height: height as any },
          containerStyle,
        ]}
      >
        <View style={styles.flexSegment}>
          {renderDividerSegment(
            orientation,
            dividerColor,
            thickness,
            style,
            startIndent,
            0,
            undefined,
            height
          )}
        </View>
        <View style={{ width: labelSpacing }} />
        {renderedLabel}
        <View style={{ width: labelSpacing }} />
        <View style={styles.flexSegment}>
          {renderDividerSegment(
            orientation,
            dividerColor,
            thickness,
            style,
            0,
            endIndent,
            undefined,
            height
          )}
        </View>
      </View>
    ) : (
      <View
        style={[
          styles.columnContainer,
          width !== undefined && { width: width as any },
          height !== undefined && { height: height as any },
          containerStyle,
        ]}
      >
        <View style={styles.flexSegment}>
          {renderDividerSegment(
            orientation,
            dividerColor,
            thickness,
            style,
            startIndent,
            0,
            width,
            undefined
          )}
        </View>
        <View style={{ height: labelSpacing }} />
        {renderedLabel}
        <View style={{ height: labelSpacing }} />
        <View style={styles.flexSegment}>
          {renderDividerSegment(
            orientation,
            dividerColor,
            thickness,
            style,
            0,
            endIndent,
            width,
            undefined
          )}
        </View>
      </View>
    );

    return labeledContent;
  }

  const singleContent = renderDividerSegment(
    orientation,
    dividerColor,
    thickness,
    style,
    startIndent,
    endIndent,
    width,
    height
  );

  if (width !== undefined || height !== undefined || containerStyle !== undefined) {
    return (
      <View
        style={[
          width !== undefined && { width: width as any },
          height !== undefined && { height: height as any },
          containerStyle,
        ]}
      >
        {singleContent}
      </View>
    );
  }

  return singleContent;
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  flexSegment: {
    flex: 1,
  },
  defaultLabelText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
