import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

let Svg: any = null;
let Path: any = null;
let G: any = null;
try {
  const RNSvg = require('react-native-svg');
  Svg = RNSvg.Svg || RNSvg.default;
  Path = RNSvg.Path;
  G = RNSvg.G;
} catch (e) {
  // react-native-svg not present, fallback to text/emoji representation
}

export type Ux4gIconName =
  | 'check'
  | 'close'
  | 'search'
  | 'arrow-back'
  | 'arrow-forward'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-left'
  | 'chevron-right'
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
  | 'calendar'
  | 'time'
  | 'upload'
  | 'download'
  | 'aadhaar'
  | 'pan'
  | 'biometric'
  | 'verification'
  | 'star'
  | 'shield'
  | string;

export interface Ux4gIconData {
  name: Ux4gIconName;
  size?: number;
  color?: string;
}

export interface Ux4gIconProps {
  size?: number;
  color?: string;
}

/**
 * **Ux4gIcons**
 *
 * Exact icon asset definitions matching Flutter `icons.dart` (`verification`, `star`, `shield`, `check`, etc.)
 * for 100% exact visual parity in React Native.
 */
export const Ux4gIcons = {
  /**
   * Scalloped verification checkmark badge asset (`verification.svg`).
   */
  verification: ({ size = 18 }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path && G) {
      return (
        <Svg width={size} height={size} viewBox="-0.5 -0.5 17 17" fill="none">
          <G>
            <Path
              d="M16.25 8L14.42 5.9075L14.675 3.14L11.9675 2.525L10.55 0.125L8 1.22L5.45 0.125L4.0325 2.5175L1.325 3.125L1.58 5.9L-0.25 8L1.58 10.0925L1.325 12.8675L4.0325 13.4825L5.45 15.875L8 14.7725L10.55 15.8675L11.9675 13.475L14.675 12.86L14.42 10.0925L16.25 8Z"
              fill="#3271EA"
            />
            <Path
              d="M6.03501 11.0075L4.25001 9.20752C3.95751 8.91502 3.95751 8.44252 4.25001 8.15002L4.30251 8.09752C4.59501 7.80502 5.07501 7.80502 5.36751 8.09752L6.57502 9.31252L10.4375 5.44252C10.73 5.15002 11.21 5.15002 11.5025 5.44252L11.555 5.49502C11.8475 5.78752 11.8475 6.26002 11.555 6.55252L7.11501 11.0075C6.80751 11.3 6.33501 11.3 6.03501 11.0075Z"
              fill="#FAFAFA"
            />
          </G>
        </Svg>
      );
    }
    return (
      <View style={[styles.fallbackBox, { width: size, height: size, backgroundColor: '#3271EA' }]}>
        <Text style={[styles.fallbackText, { fontSize: size * 0.6 }]}>✓</Text>
      </View>
    );
  },

  /**
   * Gold 5-pointed star badge asset (`star.svg`).
   */
  star: ({ size = 18 }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path && G) {
      return (
        <Svg width={size} height={size} viewBox="-1 -1 18 18" fill="none">
          <G>
            <Path
              d="M8 13.3995L11.8799 15.8549C12.5904 16.3049 13.4599 15.6397 13.2729 14.7984L12.2445 10.1811L15.6756 7.07027C16.302 6.50289 15.9654 5.42682 15.1427 5.35834L10.6271 4.95726L8.86012 0.594284C8.54225 -0.198095 7.45775 -0.198095 7.13988 0.594284L5.3729 4.94748L0.857274 5.34856C0.034552 5.41703 -0.302016 6.4931 0.324375 7.06049L3.7555 10.1713L2.7271 14.7886C2.54012 15.6299 3.40958 16.2951 4.12012 15.8451L8 13.3995Z"
              fill="#FFC327"
            />
          </G>
        </Svg>
      );
    }
    return (
      <View style={[styles.fallbackBox, { width: size, height: size, backgroundColor: '#FFC327' }]}>
        <Text style={[styles.fallbackText, { fontSize: size * 0.7 }]}>★</Text>
      </View>
    );
  },

  /**
   * Shield security icon asset matching `Icons.shield`.
   */
  shield: ({ size = 12, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
            fill={color}
          />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>🛡️</Text>;
  },

  /**
   * Checkmark icon (`Icons.check`).
   */
  check: ({ size = 12, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill={color} />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>✓</Text>;
  },
};

const styles = StyleSheet.create({
  fallbackBox: {
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  fallbackText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
