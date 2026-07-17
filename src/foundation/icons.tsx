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
  | 'mic'
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

  close: ({ size = 16, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            fill={color}
          />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>✕</Text>;
  },

  add: ({ size = 18, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>+</Text>;
  },

  arrowDropDown: ({ size = 20, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M7 10l5 5 5-5z" fill={color} />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>▼</Text>;
  },

  arrowUp: ({ size = 20, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M7 14l5-5 5 5z" fill={color} />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>▲</Text>;
  },

  chevronRight: ({ size = 20, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill={color} />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>›</Text>;
  },

  search: ({ size = 18, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            fill={color}
          />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>🔍</Text>;
  },

  info: ({ size = 16, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
            fill={color}
          />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>ℹ️</Text>;
  },

  error: ({ size = 16, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
            fill={color}
          />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>⚠️</Text>;
  },

  warning: ({ size = 16, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
            fill={color}
          />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>⚠️</Text>;
  },

  success: ({ size = 16, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill={color}
          />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>✓</Text>;
  },

  visibility: ({ size = 20, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            fill={color}
          />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>👁️</Text>;
  },

  visibilityOff: ({ size = 20, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
            fill={color}
          />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>🙈</Text>;
  },

  mic: ({ size = 20, color = '#FFFFFF' }: Ux4gIconProps = {}): React.ReactElement => {
    if (Svg && Path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
            fill={color}
          />
        </Svg>
      );
    }
    return <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>🎤</Text>;
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
