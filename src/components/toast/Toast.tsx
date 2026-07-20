import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { Ux4gSpace } from '../../foundation/dimensions';
import { Ux4gIcons } from '../../foundation/icons';
import { Ux4gRadius } from '../../foundation/dimensions';

export type Ux4gToastCategory = 'info' | 'success' | 'warning' | 'error' | 'slot';
export type Ux4gToastLayout = 'full' | 'stacked';

export interface Ux4gToastData {
  category: Ux4gToastCategory;
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
  showCloseButton?: boolean;
  backgroundColor?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  actionColor?: string;
  autoClose?: boolean;
  durationMs?: number;
  /**
   * If true, this specific toast slides in from the bottom.
   * Overrides the global `isBottom` from the provider.
   */
  isBottom?: boolean;
}

export interface Ux4gToastProps extends Omit<Ux4gToastData, 'autoClose' | 'durationMs' | 'isBottom'> {
  onCloseClick?: () => void;
  layout?: Ux4gToastLayout;
  style?: StyleProp<ViewStyle>;
}

// ─────────────────────────────────────────────────────────────────────────────
// TOAST PRESENTATIONAL COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const Ux4gToast: React.FC<Ux4gToastProps> = ({
  category,
  title,
  subtitle,
  actionText,
  onActionClick,
  onCloseClick,
  showCloseButton = true,
  layout,
  backgroundColor,
  icon,
  iconColor,
  actionColor,
  style,
}) => {
  const { colors, typography, isDark } = useUx4gTheme();
  const { width } = useWindowDimensions();

  // Resolve layout
  const resolvedLayout = layout ?? (width < 600 ? 'stacked' : 'full');

  // Resolve base styles based on category
  const getBaseStyle = () => {
    const surface = colors.surface ?? (isDark ? '#18181B' : '#FFFFFF');
    const info = colors.info ?? '#0052CC';
    const success = colors.success ?? '#00875A';
    const warning = colors.warning ?? '#FF991F';
    const error = colors.error ?? '#DE350B';
    const primary = colors.primary ?? '#0052CC';

    // Simple hex blend approximation for React Native (like Color.lerp(surface, color, 0.12))
    // Instead of precise lerp, we'll use a very light background tint
    const getTint = (baseHex: string) => {
       if (isDark) {
          // Dark mode: very dark tint
          return `${baseHex}20`; // 12% opacity roughly
       }
       return `${baseHex}15`; // 10-15% opacity tint for light mode
    };

    switch (category) {
      case 'info':
        return { bg: getTint(info), iconCol: info, actCol: info, defaultIcon: 'info' };
      case 'success':
        return { bg: getTint(success), iconCol: success, actCol: success, defaultIcon: 'success' };
      case 'warning':
        return { bg: getTint(warning), iconCol: warning, actCol: warning, defaultIcon: 'warning' };
      case 'error':
        return { bg: getTint(error), iconCol: error, actCol: error, defaultIcon: 'error' };
      case 'slot':
      default:
        return { bg: getTint(primary), iconCol: primary, actCol: primary, defaultIcon: 'settings' };
    }
  };

  const baseStyle = getBaseStyle();
  const resolvedBgColor = backgroundColor ?? baseStyle.bg;
  const resolvedIconColor = iconColor ?? baseStyle.iconCol;
  const resolvedActionColor = actionColor ?? baseStyle.actCol;
  
  const renderIcon = () => {
    if (icon) return icon;
    const size = 20;
    const color = resolvedIconColor;
    switch (baseStyle.defaultIcon) {
      case 'success':
        return typeof Ux4gIcons.success === 'function' ? Ux4gIcons.success({ size, color }) : <Text style={{color, fontSize: size}}>✓</Text>;
      case 'warning':
        return typeof Ux4gIcons.warning === 'function' ? Ux4gIcons.warning({ size, color }) : <Text style={{color, fontSize: size}}>⚠️</Text>;
      case 'error':
        return typeof Ux4gIcons.error === 'function' ? Ux4gIcons.error({ size, color }) : <Text style={{color, fontSize: size}}>✕</Text>;
      case 'info':
      default:
        return typeof Ux4gIcons.info === 'function' ? Ux4gIcons.info({ size, color }) : <Text style={{color, fontSize: size}}>ℹ</Text>;
    }
  };

  const onSurface = colors.onSurface ?? (isDark ? '#F4F4F5' : '#09090B');
  const onSurfaceMuted = isDark ? '#A1A1AA' : '#71717A';

  const containerPaddingH = resolvedLayout === 'full' ? Ux4gSpace.space16 : Ux4gSpace.space12;
  const containerPaddingV = resolvedLayout === 'full' ? Ux4gSpace.space8 : Ux4gSpace.space12;

  const renderClose = () => {
    if (!showCloseButton || !onCloseClick) return null;
    return (
      <TouchableOpacity onPress={onCloseClick} style={{ padding: 4, marginLeft: 8 }}>
        {typeof Ux4gIcons.close === 'function' ? (
          Ux4gIcons.close({ size: 20, color: onSurface })
        ) : (
          <Text style={{ fontSize: 20, color: onSurface }}>✕</Text>
        )}
      </TouchableOpacity>
    );
  };

  const surfaceColor = colors.surface ?? (isDark ? '#18181B' : '#FFFFFF');

  if (resolvedLayout === 'full') {
    return (
      <View style={[styles.container, { backgroundColor: surfaceColor }, style]}>
        <View style={[StyleSheet.absoluteFill, { backgroundColor: resolvedBgColor, borderRadius: Ux4gRadius.radius4 }]} />
        <View style={[styles.innerContainer, { paddingHorizontal: containerPaddingH, paddingVertical: containerPaddingV }]}>
          <View style={styles.fullIcon}>{renderIcon()}</View>
        <View style={styles.fullContent}>
           <View style={styles.fullTitleRow}>
             <Text style={[typography.bS_strong, { color: onSurface, fontWeight: '700' }]} numberOfLines={1}>
               {title}
             </Text>
             {!!subtitle && (
                <Text style={[typography.bS_default, { color: onSurfaceMuted, marginLeft: 8, flex: 1 }]} numberOfLines={1}>
                  {subtitle}
                </Text>
             )}
           </View>
        </View>
        {!!actionText && !!onActionClick && (
          <TouchableOpacity onPress={onActionClick} style={styles.fullAction}>
            <Text style={[typography.lM_strong, { color: resolvedActionColor, fontWeight: '700' }]}>{actionText}</Text>
          </TouchableOpacity>
        )}
        {renderClose()}
        </View>
      </View>
    );
  }

  // Stacked Layout
  return (
    <View style={[styles.container, styles.stackedContainer, { backgroundColor: surfaceColor }, style]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: resolvedBgColor, borderRadius: Ux4gRadius.radius4 }]} />
      <View style={[styles.innerContainer, styles.stackedContainer, { paddingHorizontal: containerPaddingH, paddingVertical: containerPaddingV }]}>
        <View style={styles.stackedHeader}>
         <View style={styles.fullIcon}>{renderIcon()}</View>
         <Text style={[typography.bS_strong, { color: onSurface, fontWeight: '700', flex: 1 }]} numberOfLines={2}>
            {title}
         </Text>
         {renderClose()}
      </View>
      
      {!!subtitle && (
         <View style={styles.stackedSubtitle}>
            <Text style={[typography.bS_default, { color: onSurfaceMuted }]}>{subtitle}</Text>
         </View>
      )}

      {!!actionText && !!onActionClick && (
         <TouchableOpacity onPress={onActionClick} style={styles.stackedAction}>
            <Text style={[typography.lM_strong, { color: resolvedActionColor, fontWeight: '700' }]}>{actionText}</Text>
         </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: Ux4gRadius.radius4,
    // Note: removed flex/padding from outer container to let inner container handle it
  },
  innerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  stackedContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  fullIcon: {
    marginRight: Ux4gSpace.space12,
  },
  fullContent: {
    flex: 1,
    justifyContent: 'center',
  },
  fullTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullAction: {
    paddingHorizontal: Ux4gSpace.space16,
    justifyContent: 'center',
  },
  stackedHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stackedSubtitle: {
    paddingLeft: 20 + Ux4gSpace.space12, // icon size + gap
    marginTop: 2,
  },
  stackedAction: {
    paddingLeft: 20 + Ux4gSpace.space12,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// TOAST CONTEXT & HOOK
// ─────────────────────────────────────────────────────────────────────────────

interface ToastContextValue {
  showToast: (data: Ux4gToastData) => void;
  dismiss: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useUx4gToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useUx4gToast must be used within a Ux4gToastProvider');
  }
  return ctx;
};

// ─────────────────────────────────────────────────────────────────────────────
// TOAST HOST/PROVIDER
// ─────────────────────────────────────────────────────────────────────────────

export interface Ux4gToastProviderProps {
  children: React.ReactNode;
  /**
   * If true, toasts slide in from the bottom. Otherwise, from the top.
   * @default false
   */
  isBottom?: boolean;
}

export const Ux4gToastProvider: React.FC<Ux4gToastProviderProps> = ({ children, isBottom = false }) => {
  const [currentToast, setCurrentToast] = useState<Ux4gToastData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Animation state
  const slideAnim = useRef(new Animated.Value(0)).current;

  const dismiss = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Animate out
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
      setCurrentToast(null);
    });
  }, [slideAnim]);

  const showToast = useCallback((data: Ux4gToastData) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    setCurrentToast(data);
    setIsVisible(true);
    
    // Animate in
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const autoClose = data.autoClose ?? true;
    if (autoClose) {
       const durationMs = data.durationMs ?? 3000;
       timerRef.current = setTimeout(() => {
          dismiss();
       }, durationMs);
    }
  }, [slideAnim, dismiss]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const activeIsBottom = currentToast?.isBottom ?? isBottom;

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [activeIsBottom ? 100 : -100, 0], // slide from off-screen
  });

  return (
    <ToastContext.Provider value={{ showToast, dismiss }}>
      {children}
      
      {/* Toast Host Overlay */}
      {currentToast && isVisible && (
         <Animated.View
           style={[
             StyleSheet.absoluteFill,
             {
               top: activeIsBottom ? undefined : 0,
               bottom: activeIsBottom ? 0 : undefined,
               height: undefined, // Let it wrap content
               padding: Ux4gSpace.space16,
               opacity: slideAnim,
               transform: [{ translateY }],
               pointerEvents: 'box-none',
               zIndex: 9999,
               elevation: 9999,
             },
           ]}
         >
           <Ux4gToast
             {...currentToast}
             onCloseClick={dismiss}
             style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 6,
             }}
           />
         </Animated.View>
      )}
    </ToastContext.Provider>
  );
};
