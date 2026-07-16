import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { Ux4gIcons } from '../../foundation/icons';
import { Ux4gBadge } from '../badge/Badge';

let Svg: any = null;
let Path: any = null;
let Circle: any = null;
let Rect: any = null;
try {
  const RNSvg = require('react-native-svg');
  Svg = RNSvg.Svg || RNSvg.default;
  Path = RNSvg.Path;
  Circle = RNSvg.Circle;
  Rect = RNSvg.Rect;
} catch (e) {
  // react-native-svg not present; fallback to text/emoji
}

export type Ux4gAvatarSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

const AVATAR_SIZE_MAP: Record<Ux4gAvatarSize, { size: number; fontSize: number; iconSize: number }> = {
  xs: { size: 24, fontSize: 10, iconSize: 14 },
  s: { size: 32, fontSize: 14, iconSize: 16 },
  m: { size: 40, fontSize: 16, iconSize: 20 },
  l: { size: 48, fontSize: 20, iconSize: 24 },
  xl: { size: 64, fontSize: 24, iconSize: 32 },
  xxl: { size: 80, fontSize: 32, iconSize: 40 },
  xxxl: { size: 120, fontSize: 48, iconSize: 60 },
};

function PersonIcon({ size, color }: { size: number; color: string }) {
  if (Svg && Path && Circle) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="8" r="4" fill={color} />
        <Path d="M12 14c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" fill={color} />
      </Svg>
    );
  }
  return <Text style={{ fontSize: size * 0.8, color }}>👤</Text>;
}

function EditIcon({ size, color }: { size: number; color: string }) {
  if (Svg && Path) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill={color} />
      </Svg>
    );
  }
  return <Text style={{ fontSize: size * 0.7, color }}>✏️</Text>;
}

function CameraIcon({ size, color }: { size: number; color: string }) {
  if (Svg && Path && Rect) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z" fill={color} />
        <Path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill={color} />
      </Svg>
    );
  }
  return <Text style={{ fontSize: size * 0.7, color }}>📷</Text>;
}

function RemoveIcon({ size, color }: { size: number; color: string }) {
  if (Svg && Path) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M19 13H5v-2h14v2z" fill={color} />
      </Svg>
    );
  }
  return <Text style={{ fontSize: size * 0.7, color, fontWeight: 'bold' }}>−</Text>;
}

const ICON_RENDERERS = {
  person: PersonIcon,
  edit: EditIcon,
  camera: CameraIcon,
  remove: RemoveIcon,
} as const;

function getBadgeVariantIndicatorSize(size: Ux4gAvatarSize): number {
  const map: Record<Ux4gAvatarSize, number> = {
    xs: 12, s: 14, m: 16, l: 18, xl: 24, xxl: 30, xxxl: 42,
  };
  return map[size] ?? 16;
}

function getStatusIndicatorSize(size: Ux4gAvatarSize): number {
  const map: Record<Ux4gAvatarSize, number> = {
    xs: 10, s: 12, m: 14, l: 16, xl: 20, xxl: 24, xxxl: 34,
  };
  return map[size] ?? 14;
}

function getStatusColor(
  variant: Ux4gStatusVariant,
  isDark: boolean,
  colors: { success?: string; onSurface?: string; error?: string; warning?: string }
): string {
  switch (variant) {
    case 'online':
    case 'success':
      return colors.success ?? '#4CAF50';
    case 'offline': {
      const base = colors.onSurface ?? '#888';
      return isDark ? `${base}80` : `${base}80`;
    }
    case 'busy':
    case 'error':
      return colors.error ?? '#F44336';
    case 'warning':
      return colors.warning ?? '#FF9800';
  }
}

function computeCircleOffset(avatarSize: number, indicatorSize: number): number {
  const r = avatarSize / 2;
  const circleOffset = r - r / 1.41421356;
  return circleOffset - indicatorSize / 2;
}

// ─── Ux4gAvatar ──────────────────────────────────────────────────────────────

export type Ux4gAvatarShape = 'circle' | 'rounded' | 'square';

export interface Ux4gAvatarProps {
  size?: Ux4gAvatarSize;
  shape?: Ux4gAvatarShape;
  imageUrl?: string;
  initials?: string;
  icon?: React.ReactNode;
  containerColor?: string;
  contentColor?: string;
  iconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Ux4gAvatar: React.FC<Ux4gAvatarProps> = ({
  size = 'm',
  shape = 'circle',
  imageUrl,
  initials,
  icon,
  containerColor,
  contentColor,
  iconColor,
  containerStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const typography = theme.typography;

  const dims = AVATAR_SIZE_MAP[size] ?? AVATAR_SIZE_MAP.m;
  const resolvedPrimary = colors.primary;
  const finalContainerColor = containerColor ?? `${resolvedPrimary}1A`;
  const finalContentColor = contentColor ?? resolvedPrimary;
  const finalIconColor = iconColor ?? resolvedPrimary;

  const borderRadius = shape === 'circle' ? dims.size / 2 : shape === 'rounded' ? 8 : 0;

  const [imageFailed, setImageFailed] = React.useState(false);

  const renderContent = () => {
    if (imageUrl && !imageFailed) {
      return (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: dims.size, height: dims.size, borderRadius }}
          resizeMode="cover"
          onError={() => setImageFailed(true)}
        />
      );
    }

    if (initials && initials.length > 0) {
      const display = initials.substring(0, 2).toUpperCase();
      const textStyle: TextStyle = {
        fontSize: dims.fontSize,
        fontWeight: '500',
        color: finalContentColor,
        textAlign: 'center',
      };
      return (
        <Text style={textStyle}>{display}</Text>
      );
    }

    const iconEl = icon ?? <PersonIcon size={dims.iconSize} color={finalIconColor} />;
    if (React.isValidElement(iconEl)) {
      return iconEl;
    }
    return <Text style={{ fontSize: dims.iconSize, color: finalIconColor }}>{String(iconEl)}</Text>;
  };

  return (
    <View
      testID={testID}
      style={[
        {
          width: dims.size,
          height: dims.size,
          borderRadius,
          backgroundColor: finalContainerColor,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        containerStyle,
      ]}
    >
      {renderContent()}
    </View>
  );
};

// ─── Ux4gAvatarGroupItem ─────────────────────────────────────────────────────

export interface Ux4gAvatarGroupItem {
  imageUrl?: string;
  initials?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
}

// ─── Ux4gAvatarGroup ─────────────────────────────────────────────────────────

export interface Ux4gAvatarGroupProps {
  items: Ux4gAvatarGroupItem[];
  size?: Ux4gAvatarSize;
  maxLimit?: number;
  collapsed?: boolean;
  borderColor?: string;
  borderWidth?: number;
  onRemainingPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Ux4gAvatarGroup: React.FC<Ux4gAvatarGroupProps> = ({
  items,
  size = 'm',
  maxLimit,
  collapsed = true,
  borderColor,
  borderWidth = 2,
  onRemainingPress,
  containerStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const dims = AVATAR_SIZE_MAP[size] ?? AVATAR_SIZE_MAP.m;

  if (items.length === 0) return null;

  const resolvedBorderColor = borderColor ?? colors.surface;
  const actualLimit = maxLimit ?? items.length;
  const exceedsLimit = items.length > actualLimit;
  const visibleItems = exceedsLimit ? items.slice(0, actualLimit - 1) : items;
  const remainingCount = exceedsLimit ? items.length - (actualLimit - 1) : 0;
  const overlap = collapsed ? -(dims.size * 0.25) : 8;

  const renderAvatarWithBorder = (avatar: React.ReactElement) => {
    if (!collapsed) return avatar;
    return (
      <View
        style={{
          width: dims.size + borderWidth * 2,
          height: dims.size + borderWidth * 2,
          borderRadius: (dims.size + borderWidth * 2) / 2,
          backgroundColor: resolvedBorderColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {avatar}
      </View>
    );
  };

  const itemStyle = (idx: number) => {
    if (idx === 0) return undefined;
    return { marginLeft: overlap };
  };

  return (
    <View
      testID={testID}
      style={[{ flexDirection: 'row', alignItems: 'center' }, containerStyle]}
    >
      {visibleItems.map((item, idx) => (
        <Pressable
          key={`avatar-group-${idx}`}
          onPress={item.onPress}
          style={itemStyle(idx)}
        >
          {renderAvatarWithBorder(
            <Ux4gAvatar
              size={size}
              imageUrl={item.imageUrl}
              initials={item.initials}
              icon={item.icon}
            />
          )}
        </Pressable>
      ))}
      {remainingCount > 0 && (
        <Pressable
          onPress={onRemainingPress}
          style={itemStyle(visibleItems.length)}
        >
          {renderAvatarWithBorder(
            <Ux4gAvatar
              size={size}
              initials={`+${remainingCount}`}
            />
          )}
        </Pressable>
      )}
    </View>
  );
};

// ─── Profile Badge/Action Types ──────────────────────────────────────────────

export type Ux4gProfileBadge = 'verified' | 'star' | 'admin';

export type Ux4gProfileAction = 'edit' | 'camera' | 'remove';

// ─── Ux4gProfileAvatar ───────────────────────────────────────────────────────

export interface Ux4gProfileAvatarProps {
  size?: Ux4gAvatarSize;
  shape?: Ux4gAvatarShape;
  imageUrl?: string;
  initials?: string;
  avatarIcon?: React.ReactNode;
  variant?: Ux4gProfileBadge | Ux4gProfileAction;
  badgeSize?: number;
  onVariantPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Ux4gProfileAvatar: React.FC<Ux4gProfileAvatarProps> = ({
  size = 'm',
  shape = 'circle',
  imageUrl,
  initials,
  avatarIcon,
  variant,
  badgeSize,
  onVariantPress,
  containerStyle,
  testID,
}) => {
  const dims = AVATAR_SIZE_MAP[size] ?? AVATAR_SIZE_MAP.m;
  const indicatorSize = badgeSize ?? getBadgeVariantIndicatorSize(size);
  const offset = computeCircleOffset(dims.size, indicatorSize);

  const renderVariant = () => {
    if (!variant) return null;

    if (variant === 'verified') {
      return (
        <View style={{ position: 'relative' }}>
          <View style={{ position: 'absolute', top: -2, left: -2 }}>
            {Ux4gIcons.verification({ size: indicatorSize + 4 })}
          </View>
          {Ux4gIcons.verification({ size: indicatorSize })}
        </View>
      );
    }

    if (variant === 'star') {
      return (
        <View style={{ position: 'relative' }}>
          <View style={{ position: 'absolute', top: -2, left: -2 }}>
            {Ux4gIcons.star({ size: indicatorSize + 4 })}
          </View>
          {Ux4gIcons.star({ size: indicatorSize })}
        </View>
      );
    }

    if (variant === 'admin') {
      const containerDims = indicatorSize + 4;
      return (
        <View
          style={{
            width: containerDims,
            height: containerDims,
            borderRadius: containerDims / 2,
            backgroundColor: '#4B39EF',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: '#FFFFFF',
          }}
        >
          {Ux4gIcons.shield({ size: indicatorSize * 0.6, color: '#FFFFFF' })}
        </View>
      );
    }

    const icon = ICON_RENDERERS[variant];
    const containerDims = indicatorSize + 4;
    const bgColor = variant === 'remove' ? '#F44336' : '#4B39EF';
    return (
      <View
        style={{
          width: containerDims,
          height: containerDims,
          borderRadius: containerDims / 2,
          backgroundColor: bgColor,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#FFFFFF',
        }}
      >
        {icon({ size: indicatorSize * 0.6, color: '#FFFFFF' })}
      </View>
    );
  };

  const variantWidget = renderVariant();

  return (
    <View testID={testID} style={[styles.stackContainer, containerStyle]}>
      <Ux4gAvatar
        size={size}
        shape={shape}
        imageUrl={imageUrl}
        initials={initials}
        icon={avatarIcon}
      />
      {variantWidget && (
        <View
          style={[
            styles.variantPosition,
            { right: offset, bottom: offset },
          ]}
        >
          <Pressable onPress={onVariantPress} hitSlop={4}>
            {variantWidget}
          </Pressable>
        </View>
      )}
    </View>
  );
};

// ─── Ux4gStatusVariant ───────────────────────────────────────────────────────

export type Ux4gStatusVariant = 'online' | 'offline' | 'busy' | 'success' | 'error' | 'warning';

// ─── Ux4gStatusAvatar ────────────────────────────────────────────────────────

export interface Ux4gStatusAvatarProps {
  size?: Ux4gAvatarSize;
  shape?: Ux4gAvatarShape;
  imageUrl?: string;
  initials?: string;
  avatarIcon?: React.ReactNode;
  variant?: Ux4gStatusVariant;
  statusSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Ux4gStatusAvatar: React.FC<Ux4gStatusAvatarProps> = ({
  size = 'm',
  shape = 'circle',
  imageUrl,
  initials,
  avatarIcon,
  variant = 'online',
  statusSize,
  containerStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const dims = AVATAR_SIZE_MAP[size] ?? AVATAR_SIZE_MAP.m;
  const indicatorSize = statusSize ?? getStatusIndicatorSize(size);
  const offset = computeCircleOffset(dims.size, indicatorSize);
  const statusColor = getStatusColor(variant, theme.isDark, colors);

  return (
    <View testID={testID} style={[styles.stackContainer, containerStyle]}>
      <Ux4gAvatar
        size={size}
        shape={shape}
        imageUrl={imageUrl}
        initials={initials}
        icon={avatarIcon}
      />
      <View
        style={[
          styles.variantPosition,
          { right: offset, bottom: offset },
        ]}
      >
        <Ux4gBadge.dot
          containerColor={statusColor}
          showBorder
          borderColor={colors.surface}
          badgeStyle={{
            width: indicatorSize,
            height: indicatorSize,
            borderRadius: indicatorSize / 2,
            borderWidth: 2,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stackContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
    overflow: 'visible',
  },
  variantPosition: {
    position: 'absolute',
    zIndex: 1,
    overflow: 'visible',
  },
});
