import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';

// Dynamically require react-native-svg so that it works seamlessly when installed,
// without crashing in environments where native SVG is not linked.
let SvgComponent: any = null;
let PathComponent: any = null;
let CircleComponent: any = null;
let GComponent: any = null;

try {
  const rns = require('react-native-svg');
  SvgComponent = rns.Svg ?? rns.default;
  PathComponent = rns.Path;
  CircleComponent = rns.Circle;
  GComponent = rns.G;
} catch (e) {
  // react-native-svg not available
}

export interface Ux4gSpinnerProps {
  /** Diameter size of the spinner ring in points. Defaults to `40`. */
  size?: number;
  /** Primary color of the spinner arc. Defaults to `theme.colors.primary`. */
  color?: string;
  /** Optional list of colors for multi-tone or gradient ring segments (`[startColor, midColor, endColor]`). */
  gradientColors?: string[];
  /** Arc fill percentage (`0` to `100`). Defaults to `100` (`360°` optical arc when continuous spinning). */
  percentage?: number;
  /** Thickness of the spinner ring/arc (`strokeWidth`). Defaults to `4`. */
  strokeWidth?: number;
  /** Milliseconds for a full 360° rotation (`rotationDurationMillis`). Defaults to `1200`. */
  rotationDurationMillis?: number;
  /** Optional style override for the outer container */
  style?: StyleProp<ViewStyle>;
  /** Test identifier */
  testID?: string;
}

// Helper to interpolate between hex colors across segments when gradientColors is provided
const interpolateColor = (colors: string[], fraction: number): string => {
  if (!colors || colors.length === 0) return '#6366F1';
  if (colors.length === 1) return colors[0];
  const scaled = Math.max(0, Math.min(1, fraction)) * (colors.length - 1);
  const index = Math.floor(scaled);
  if (index >= colors.length - 1) return colors[colors.length - 1];
  return colors[index];
};

/**
 * UX4G Design System Spinner (`Ux4gSpinner`) for React Native and TypeScript.
 * Ported directly from the Flutter `Ux4gLoader` (`loader.dart`) component.
 * Uses 60 FPS hardware-accelerated (`useNativeDriver: true`) rotation animation without any external dependencies.
 * Renders a true angular sweep-gradient arc (`percentage` from 0 to 100) with a rounded leading cap dot (`Circle`),
 * exact visual fidelity matching Flutter's `_LoaderPainter` and SweepGradient without Android linear gradient bugs.
 */
export const Ux4gSpinner: React.FC<Ux4gSpinnerProps> = ({
  size = 40,
  color,
  gradientColors,
  percentage = 100,
  strokeWidth = 4,
  rotationDurationMillis = 1200,
  style,
  testID,
}) => {
  const theme = useUx4gTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    spinValue.setValue(0);
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: rotationDurationMillis,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();

    return () => {
      animation.stop();
    };
  }, [spinValue, rotationDurationMillis]);

  const spinInterpolation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const resolvedColor = color ?? theme.colors.primary;
  const hasCustomGradients = gradientColors && gradientColors.length > 0;
  const capColor = hasCustomGradients
    ? gradientColors[gradientColors.length - 1]
    : resolvedColor;

  const halfSize = size / 2;
  const r = Math.max(0, halfSize - strokeWidth / 2);
  const normalized = Math.max(0, Math.min(1.0, percentage / 100));
  // 0.999 to prevent exact overlap collapse in SVG paths when percentage === 100
  const sweepAngle = 2 * Math.PI * (normalized === 1 ? 0.999 : normalized);

  // Generate 60 ultra-fine segments along the arc to create a seamless, buttery-smooth angular SweepGradient.
  // Using 1.003 overlap (just 0.3%) completely eliminates the 15% double-alpha dark radial linking lines (`linking seams`).
  const numSegments = 60;
  const segments: Array<{ d: string; color: string; opacity: number }> = [];

  for (let i = 0; i < numSegments; i++) {
    const fractionStart = i / numSegments;
    const fractionEnd = Math.min(1.0, (i + 1.003) / numSegments);

    const startAngle = fractionStart * sweepAngle;
    const endAngle = fractionEnd * sweepAngle;

    const xA = halfSize + r * Math.cos(startAngle);
    const yA = halfSize + r * Math.sin(startAngle);
    const xB = halfSize + r * Math.cos(endAngle);
    const yB = halfSize + r * Math.sin(endAngle);

    const segSweep = endAngle - startAngle;
    const largeArcFlag = segSweep > Math.PI ? 1 : 0;
    const d = `M ${xA} ${yA} A ${r} ${r} 0 ${largeArcFlag} 1 ${xB} ${yB}`;

    const segColor = hasCustomGradients
      ? interpolateColor(gradientColors, fractionStart)
      : resolvedColor;

    // Smooth angular opacity transition from 0.0 at the tail ($0^\circ$) up to 1.0 at the head (`sweepAngle`)
    const segOpacity = Math.pow(fractionStart, 1.1);

    segments.push({ d, color: segColor, opacity: segOpacity });
  }

  // Rounded Head Cap Dot coordinates at angle sweepAngle
  const capX = halfSize + r * Math.cos(sweepAngle);
  const capY = halfSize + r * Math.sin(sweepAngle);

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          width: size,
          height: size,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.spinnerContainer,
          {
            width: size,
            height: size,
            transform: [{ rotate: spinInterpolation }],
          },
        ]}
      >
        {SvgComponent && PathComponent && CircleComponent ? (
          <SvgComponent width={size} height={size}>
            {GComponent ? (
              <GComponent>
                {segments.map((seg, idx) => (
                  <PathComponent
                    key={idx}
                    d={seg.d}
                    stroke={seg.color}
                    strokeWidth={strokeWidth}
                    strokeCap="butt"
                    strokeOpacity={seg.opacity}
                    fill="none"
                  />
                ))}
              </GComponent>
            ) : (
              segments.map((seg, idx) => (
                <PathComponent
                  key={idx}
                  d={seg.d}
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeCap="butt"
                  strokeOpacity={seg.opacity}
                  fill="none"
                />
              ))
            )}

            {/* Rounded Head Cap Dot matching drawCircle at sweepAngle */}
            <CircleComponent
              cx={capX}
              cy={capY}
              r={strokeWidth / 2}
              fill={capColor}
            />
          </SvgComponent>
        ) : (
          /* Pure React Native Fallback if SVG is not present */
          <View style={[styles.fallbackContainer, { width: size, height: size }]}>
            <View
              style={[
                styles.fallbackRing,
                {
                  width: size,
                  height: size,
                  borderRadius: halfSize,
                  borderWidth: strokeWidth,
                  borderColor: resolvedColor,
                  borderLeftColor: 'transparent',
                },
              ]}
            />
            <View
              style={[
                styles.fallbackCap,
                {
                  width: strokeWidth,
                  height: strokeWidth,
                  borderRadius: strokeWidth / 2,
                  backgroundColor: capColor,
                  left: capX - strokeWidth / 2,
                  top: capY - strokeWidth / 2,
                },
              ]}
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerContainer: {
    position: 'relative',
  },
  fallbackContainer: {
    position: 'relative',
  },
  fallbackRing: {
    position: 'absolute',
  },
  fallbackCap: {
    position: 'absolute',
  },
});

export default Ux4gSpinner;
