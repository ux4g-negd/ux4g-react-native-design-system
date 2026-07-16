import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { SOCIAL_SVG_ICONS } from './socialIconData';

// Dynamic import of react-native-svg
let Svg: any = null;
let Path: any = null;
let G: any = null;
let Circle: any = null;
let Rect: any = null;
let Defs: any = null;
let ClipPath: any = null;
try {
  const RNSvg = require('react-native-svg');
  Svg = RNSvg.Svg || RNSvg.default;
  Path = RNSvg.Path;
  G = RNSvg.G;
  Circle = RNSvg.Circle;
  Rect = RNSvg.Rect;
  Defs = RNSvg.Defs;
  ClipPath = RNSvg.ClipPath;
} catch (e) {
  // react-native-svg not present; fallback to text/emoji
}

// ─── SocialLinkSize ──────────────────────────────────────────────────────────

export type SocialLinkSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

const SOCIAL_LINK_SIZE_MAP: Record<SocialLinkSize, number> = {
  xs: 16,
  s: 20,
  m: 24,
  l: 32,
  xl: 40,
  xxl: 48,
};

// ─── SocialMediaIcon ─────────────────────────────────────────────────────────

/**
 * Available social media icon identifiers matching Flutter `SocialMediaIcon` enum.
 */
export type SocialMediaIcon =
  | 'android'
  | 'apple'
  | 'behance'
  | 'dribbble'
  | 'figma'
  | 'github'
  | 'gmail'
  | 'googleMeet'
  | 'googlePlay'
  | 'google'
  | 'instagram'
  | 'medium'
  | 'microsoftTeams'
  | 'notion'
  | 'reddit'
  | 'skype'
  | 'slack'
  | 'social'
  | 'stackoverflow'
  | 'twitter'
  | 'vector'
  | 'whatsapp'
  | 'youtube'
  | 'zoom';

/**
 * Fallback emoji labels for each social media icon (used when react-native-svg is unavailable).
 */
const SOCIAL_ICON_FALLBACK: Record<SocialMediaIcon, string> = {
  android: '🤖',
  apple: '🍎',
  behance: 'Bē',
  dribbble: '🏀',
  figma: '🎨',
  github: '🐙',
  gmail: '✉️',
  googleMeet: '📹',
  googlePlay: '▶️',
  google: 'G',
  instagram: '📷',
  medium: 'M',
  microsoftTeams: '👥',
  notion: 'N',
  reddit: '🤖',
  skype: 'S',
  slack: '#',
  social: '🌐',
  stackoverflow: '⬡',
  twitter: '𝕏',
  vector: '⌘',
  whatsapp: '📱',
  youtube: '▶',
  zoom: 'Z',
};

// ─── SVG Icon Renderer ───────────────────────────────────────────────────────

function renderSocialSvg(
  icon: SocialMediaIcon,
  size: number,
  useColor: boolean,
  tintColor?: string
): React.ReactElement {
  const def = SOCIAL_SVG_ICONS[icon];

  // If no inline def or react-native-svg unavailable → fallback
  if (!def || !Svg || !Path) {
    const fallback = SOCIAL_ICON_FALLBACK[icon] ?? '?';
    return (
      <View style={[iconStyles.fallbackBox, { width: size, height: size }]}>
        <Text style={[iconStyles.fallbackText, { fontSize: size * 0.55, color: tintColor ?? '#888' }]}>
          {fallback}
        </Text>
      </View>
    );
  }

  const variant = useColor ? def.color : def.white;
  const shouldTint = !useColor || !!tintColor;

  return (
    <Svg width={size} height={size} viewBox={variant.viewBox} fill="none">
      {variant.rects?.map((r, idx) => (
        <Rect
          key={`rect-${idx}`}
          x={r.x}
          y={r.y}
          width={r.width}
          height={r.height}
          rx={r.rx}
          fill={shouldTint ? (tintColor ?? '#FFFFFF') : (r.fill ?? '#FFFFFF')}
        />
      ))}
      {variant.circles?.map((c, idx) => (
        <Circle
          key={`circle-${idx}`}
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          fill={shouldTint ? (tintColor ?? '#FFFFFF') : (c.fill ?? '#FFFFFF')}
        />
      ))}
      {variant.paths.map((p, idx) => (
        <Path
          key={`path-${idx}`}
          d={p.d}
          fill={shouldTint ? (tintColor ?? '#FFFFFF') : (p.fill ?? '#FFFFFF')}
          fillRule={p.fillRule}
          clipRule={p.clipRule}
        />
      ))}
    </Svg>
  );
}

const iconStyles = StyleSheet.create({
  fallbackBox: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  fallbackText: {
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

// ─── Ux4gSocialLink ─────────────────────────────────────────────────────────

export interface Ux4gSocialLinkProps {
  /**
   * The social media icon to display.
   */
  icon: SocialMediaIcon;
  /**
   * Size of the icon.
   * @default 'm'
   */
  size?: SocialLinkSize;
  /**
   * Custom tint color override for the icon.
   */
  color?: string;
  /**
   * Callback invoked when the icon is pressed.
   */
  onPress?: () => void;
  /**
   * Accessibility label (maps to Flutter `tooltip`).
   */
  tooltip?: string;
  /**
   * Explicit container size in pixels. Only effective when `enableBackground` is true.
   */
  containerSize?: number;
  /**
   * Custom container background color.
   */
  containerColor?: string;
  /**
   * When true, wraps the icon in a circular background container.
   * @default false
   */
  enableBackground?: boolean;
  /**
   * When true, renders the branded color variant of the icon instead of the mono/white variant.
   * @default false
   */
  useColoredIcon?: boolean;
  /**
   * Custom container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gSocialLink**
 *
 * Full React Native port of Flutter `Ux4gSocialLink`. Renders a social media
 * icon with optional circular background, press handling, and branded color variants.
 */
export const Ux4gSocialLink: React.FC<Ux4gSocialLinkProps> = ({
  icon,
  size = 'm',
  color,
  onPress,
  tooltip,
  containerSize,
  containerColor,
  enableBackground = false,
  useColoredIcon = false,
  containerStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;

  const iconSize = SOCIAL_LINK_SIZE_MAP[size] ?? 24;
  const finalColor = color ?? colors.onSurface;
  const finalBackgroundColor =
    containerColor ?? `${colors.primary}1A`; // ~10% alpha

  // Render icon SVG
  let iconWidget = renderSocialSvg(icon, iconSize, useColoredIcon, useColoredIcon && !color ? undefined : finalColor);

  // Wrap in circular background if enabled
  if (enableBackground) {
    const cSize = containerSize ?? iconSize + 16;
    iconWidget = (
      <View
        style={[
          styles.backgroundCircle,
          {
            width: cSize,
            height: cSize,
            backgroundColor: finalBackgroundColor,
          },
        ]}
      >
        {iconWidget}
      </View>
    );
  }

  // Wrap in pressable if onPress provided
  if (onPress) {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        accessibilityLabel={tooltip ?? icon}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.pressable,
          { opacity: pressed ? 0.6 : 1 },
          containerStyle,
        ]}
        hitSlop={4}
      >
        {iconWidget}
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={[styles.pressable, containerStyle]}>
      {iconWidget}
    </View>
  );
};

// ─── Ux4gSocialLinkGroup ────────────────────────────────────────────────────

export interface Ux4gSocialLinkGroupProps {
  /**
   * Array of social media icons to render.
   */
  icons: SocialMediaIcon[];
  /**
   * Size for all icons.
   * @default 'm'
   */
  size?: SocialLinkSize;
  /**
   * Custom tint color applied to all icons.
   */
  iconColor?: string;
  /**
   * Factory callback returning an onPress handler per icon.
   */
  onIconPressed?: (icon: SocialMediaIcon) => (() => void) | undefined;
  /**
   * Spacing between icons.
   * @default 12
   */
  spacing?: number;
  /**
   * When true, renders circular backgrounds behind all icons.
   * @default false
   */
  enableBackground?: boolean;
  /**
   * Custom background color for all icon containers.
   */
  backgroundColor?: string;
  /**
   * Custom container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gSocialLinkGroup**
 *
 * Renders a wrapping row of `Ux4gSocialLink` icons with configurable spacing,
 * matching Flutter `Ux4gSocialLinkGroup` (Wrap widget with spacing + runSpacing).
 */
export const Ux4gSocialLinkGroup: React.FC<Ux4gSocialLinkGroupProps> = ({
  icons,
  size = 'm',
  iconColor,
  onIconPressed,
  spacing = 12,
  enableBackground = false,
  backgroundColor,
  containerStyle,
  testID,
}) => {
  return (
    <View
      testID={testID}
      style={[styles.wrapContainer, { gap: spacing }, containerStyle]}
    >
      {icons.map((icon, idx) => (
        <Ux4gSocialLink
          key={`${icon}-${idx}`}
          icon={icon}
          size={size}
          color={iconColor}
          onPress={onIconPressed ? onIconPressed(icon) : undefined}
          containerColor={backgroundColor}
          enableBackground={enableBackground}
        />
      ))}
    </View>
  );
};

// ─── Ux4gSocialLinkList ─────────────────────────────────────────────────────

export type Ux4gSocialLinkAlignment =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

export type Ux4gSocialLinkDirection = 'horizontal' | 'vertical';

export interface Ux4gSocialLinkListProps {
  /**
   * Array of social media icons to render.
   */
  icons: SocialMediaIcon[];
  /**
   * Size for all icons.
   * @default 'm'
   */
  size?: SocialLinkSize;
  /**
   * Custom tint color applied to all icons.
   */
  iconColor?: string;
  /**
   * Factory callback returning an onPress handler per icon.
   */
  onIconPressed?: (icon: SocialMediaIcon) => (() => void) | undefined;
  /**
   * When true, renders circular backgrounds behind all icons.
   * @default false
   */
  enableBackground?: boolean;
  /**
   * Custom background color for all icon containers.
   */
  backgroundColor?: string;
  /**
   * Main axis alignment of the icon list.
   * @default 'flex-start'
   */
  alignment?: Ux4gSocialLinkAlignment;
  /**
   * Layout direction of the list (`horizontal` or `vertical`).
   * @default 'horizontal'
   */
  direction?: Ux4gSocialLinkDirection;
  /**
   * Custom container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gSocialLinkList**
 *
 * Renders a row/column of social media icons with configurable alignment and direction,
 * matching Flutter `Ux4gSocialLinkList` (Wrap widget with MainAxisAlignment + Axis direction).
 */
export const Ux4gSocialLinkList: React.FC<Ux4gSocialLinkListProps> = ({
  icons,
  size = 'm',
  iconColor,
  onIconPressed,
  enableBackground = false,
  backgroundColor,
  alignment = 'flex-start',
  direction = 'horizontal',
  containerStyle,
  testID,
}) => {
  return (
    <View
      testID={testID}
      style={[
        styles.wrapContainer,
        {
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          justifyContent: alignment,
          gap: 8,
        },
        containerStyle,
      ]}
    >
      {icons.map((icon, idx) => (
        <Ux4gSocialLink
          key={`${icon}-${idx}`}
          icon={icon}
          size={size}
          color={iconColor}
          onPress={onIconPressed ? onIconPressed(icon) : undefined}
          containerColor={backgroundColor}
          enableBackground={enableBackground}
        />
      ))}
    </View>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  pressable: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundCircle: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
