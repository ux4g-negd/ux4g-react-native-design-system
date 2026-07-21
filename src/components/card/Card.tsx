import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { UX4GColors } from '../../foundation/colors';
import { Ux4gSpace, Ux4gRadius } from '../../foundation/dimensions';
import { Ux4gBadge } from '../badge';
import { Ux4gButton } from '../button/Button';
import { Ux4gOutlineButton } from '../button/OutlineButton';

// ---------------------------------------------------------------------------
// Types & Enums
// ---------------------------------------------------------------------------

export type Ux4gCardDirection = 'vertical' | 'horizontal';

export type Ux4gCardFooterType =
  | 'none'
  | 'primaryOnly'
  | 'secondaryOnly'
  | 'primaryAndSecondary';

export type Ux4gCardFooterAlignment = 'left' | 'centered' | 'right';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface Ux4gCardProps {
  /** Custom child content. When provided the rich-card layout (media, title, body, etc.) is skipped. */
  children?: React.ReactNode;
  /** Corner radius of the card. @default Ux4gRadius.radius12 */
  cornerRadius?: number;
  /** Background color override. Defaults to `theme.colors.surface`. */
  backgroundColor?: string;
  /** Border color. @default 'transparent' */
  borderColor?: string;
  /** Border width. @default 0 */
  borderWidth?: number;
  /** Elevation / shadow depth. @default 0 */
  elevation?: number;
  /** When `true` the card is wrapped in a `Pressable`. @default false */
  isClickable?: boolean;
  /** Callback when card is pressed (requires `isClickable = true`). */
  onPress?: () => void;
  /** Layout direction of the rich card. @default 'vertical' */
  direction?: Ux4gCardDirection;

  // --- Media ---
  /** Network image URL shown at the top (vertical) or left (horizontal). */
  mediaImageUrl?: string;
  /** Height of the media area in vertical mode. @default 180 */
  mediaHeight?: number;
  /** Width of the media area in horizontal mode. @default 120 */
  mediaWidth?: number;
  /** Badge label displayed over the media image. */
  mediaLabelText?: string;
  /** Action widget/button rendered at the top right of the media. */
  mediaTrailingAction?: React.ReactNode;

  // --- Header ---
  /** Avatar element rendered before title/subtitle. */
  avatar?: React.ReactNode;
  /** Primary title text. */
  title?: string;
  /** Secondary subtitle text. */
  subtitle?: string;
  /** Action widget/button rendered at the trailing edge of the header. */
  headerTrailingAction?: React.ReactNode;

  // --- Chips ---
  /** Status chips rendered as plain text separated by a vertical bar `│` or custom React nodes. */
  statusChips?: (string | React.ReactNode)[];
  /** Body description text. */
  body?: string;
  /** Bottom chips rendered as bordered pills or custom React nodes. */
  bottomChips?: (string | React.ReactNode)[];

  // --- Footer ---
  /** Footer button configuration. @default 'none' */
  footerType?: Ux4gCardFooterType;
  /** Footer button alignment. @default 'left' */
  footerAlignment?: Ux4gCardFooterAlignment;
  /** Primary button label. @default 'Confirm' */
  primaryButtonText?: string;
  /** Secondary button label. @default 'Cancel' */
  secondaryButtonText?: string;
  /** Callback for the primary button. */
  onPrimaryClick?: () => void;
  /** Callback for the secondary button. */
  onSecondaryClick?: () => void;
  /** Leading icon for the primary button. */
  primaryButtonLeadingIcon?: React.ReactNode;
  /** Trailing icon for the primary button. */
  primaryButtonTrailingIcon?: React.ReactNode;
  /** Leading icon for the secondary button. */
  secondaryButtonLeadingIcon?: React.ReactNode;
  /** Trailing icon for the secondary button. */
  secondaryButtonTrailingIcon?: React.ReactNode;

  /** Additional style applied to the outer card container. */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing frameworks. */
  testID?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Apply an alpha multiplier (0–1) to a hex colour string and return an
 * `rgba()` CSS colour value that React Native understands.
 */
const hexWithAlpha = (hex: string, alpha: number): string => {
  if (!hex || !hex.startsWith('#')) return hex;
  const clean = hex.replace('#', '').slice(0, 6);
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Rough luminance check – returns `true` when the background colour
 * is considered dark so that we know to render white foreground text.
 */
const isDarkColor = (hex: string): boolean => {
  if (!hex || !hex.startsWith('#')) return false;
  const clean = hex.replace('#', '').slice(0, 6);
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface CardMediaProps {
  imageUrl: string;
  isHorizontal: boolean;
  mediaHeight: number;
  labelText?: string;
  trailingAction?: React.ReactNode;
  onSurfaceColor: string;
  surfaceColor: string;
}

const CardMedia: React.FC<CardMediaProps> = ({
  imageUrl,
  isHorizontal,
  mediaHeight,
  labelText,
  trailingAction,
  onSurfaceColor,
  surfaceColor,
}) => {
  const [hasError, setHasError] = React.useState(false);

  const containerStyle: ViewStyle = isHorizontal
    ? { flex: 1 }
    : { width: '100%', height: mediaHeight };

  return (
    <View style={[styles.mediaContainer, containerStyle]}>
      {hasError ? (
        <View
          style={[
            styles.mediaFallback,
            { backgroundColor: hexWithAlpha(onSurfaceColor, 0.08) },
          ]}
        >
          <Text style={{ color: hexWithAlpha(onSurfaceColor, 0.4), fontSize: 24 }}>
            🖼
          </Text>
        </View>
      ) : (
        <Image
          source={{ uri: imageUrl }}
          style={styles.mediaImage}
          resizeMode="cover"
          onError={() => setHasError(true)}
        />
      )}

      {labelText != null && (
        <View style={styles.mediaLabel}>
          <Ux4gBadge
            label={labelText}
            variant="label"
            containerColor={onSurfaceColor}
            contentColor={surfaceColor}
          />
        </View>
      )}
    </View>
  );
};

// ---------- Chip Row ----------

interface CardChipRowProps {
  chips: (string | React.ReactNode)[];
  pillStyle: boolean;
  contentColor: string;
  typography: any;
}

const CardChipRow: React.FC<CardChipRowProps> = ({
  chips,
  pillStyle,
  contentColor,
  typography,
}) => {
  const labelStyle = typography.lS_default;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.chipRowInner}>
        {chips.map((chip, index) => {
          if (typeof chip !== 'string') {
            return (
              <View key={`chip-node-${index}`} style={{ marginRight: index === chips.length - 1 ? 0 : Ux4gSpace.space6 }}>
                {chip}
              </View>
            );
          }

          if (pillStyle) {
            return (
              <View
                key={`pill-${index}`}
                style={[
                  styles.pillChip,
                  {
                    borderColor: hexWithAlpha(contentColor, 0.3),
                    marginRight: index === chips.length - 1 ? 0 : Ux4gSpace.space6,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: labelStyle.fontSize,
                    fontWeight: labelStyle.fontWeight,
                    lineHeight: labelStyle.lineHeight,
                    color: hexWithAlpha(contentColor, 0.7),
                  }}
                >
                  {chip}
                </Text>
              </View>
            );
          }

          // Status chip (plain text separated by `│`)
          return (
            <React.Fragment key={`status-${index}`}>
              {index > 0 && (
                <Text
                  style={{
                    fontSize: labelStyle.fontSize,
                    fontWeight: labelStyle.fontWeight,
                    lineHeight: labelStyle.lineHeight,
                    color: hexWithAlpha(contentColor, 0.3),
                    marginHorizontal: Ux4gSpace.space6,
                  }}
                >
                  │
                </Text>
              )}
              <Text
                style={{
                  fontSize: labelStyle.fontSize,
                  fontWeight: labelStyle.fontWeight,
                  lineHeight: labelStyle.lineHeight,
                  color: hexWithAlpha(contentColor, 0.6),
                }}
              >
                {chip}
              </Text>
            </React.Fragment>
          );
        })}
      </View>
    </ScrollView>
  );
};

// ---------- Footer Row ----------

interface CardFooterRowProps {
  footerType: Ux4gCardFooterType;
  footerAlignment: Ux4gCardFooterAlignment;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryButtonLeadingIcon?: React.ReactNode;
  primaryButtonTrailingIcon?: React.ReactNode;
  secondaryButtonLeadingIcon?: React.ReactNode;
  secondaryButtonTrailingIcon?: React.ReactNode;
}

const CardFooterRow: React.FC<CardFooterRowProps> = ({
  footerType,
  footerAlignment,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonLeadingIcon,
  primaryButtonTrailingIcon,
  secondaryButtonLeadingIcon,
  secondaryButtonTrailingIcon,
}) => {
  const alignmentMap: Record<Ux4gCardFooterAlignment, ViewStyle['justifyContent']> = {
    left: 'flex-start',
    centered: 'center',
    right: 'flex-end',
  };

  const fillWidth =
    footerAlignment === 'centered' && footerType !== 'primaryAndSecondary';

  const showPrimary =
    footerType === 'primaryOnly' || footerType === 'primaryAndSecondary';
  const showSecondary =
    footerType === 'secondaryOnly' || footerType === 'primaryAndSecondary';

  return (
    <View style={[styles.footerRow, { justifyContent: alignmentMap[footerAlignment] }]}>
      {showPrimary && (
        <View style={styles.footerBtnWrapper}>
          <Ux4gButton
            text={primaryButtonText}
            onPress={onPrimaryClick ?? (() => {})}
            paddingHorizontal={Ux4gSpace.space20}
            paddingVertical={Ux4gSpace.space12}
            width={fillWidth ? '100%' : undefined}
            leadingIcon={primaryButtonLeadingIcon as any}
            trailingIcon={primaryButtonTrailingIcon as any}
          />
        </View>
      )}

      {footerType === 'primaryAndSecondary' && (
        <View style={{ width: Ux4gSpace.space12 }} />
      )}

      {showSecondary && (
        <View style={styles.footerBtnWrapper}>
          <Ux4gOutlineButton
            text={secondaryButtonText}
            onPress={onSecondaryClick ?? (() => {})}
            paddingHorizontal={Ux4gSpace.space20}
            paddingVertical={Ux4gSpace.space12}
            width={fillWidth ? '100%' : undefined}
            leadingIcon={secondaryButtonLeadingIcon as any}
            trailingIcon={secondaryButtonTrailingIcon as any}
          />
        </View>
      )}
    </View>
  );
};

// ---------- Content Block ----------

interface CardContentBlockProps {
  avatar?: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerTrailingAction?: React.ReactNode;
  statusChips: (string | React.ReactNode)[];
  body?: string;
  bottomChips: (string | React.ReactNode)[];
  footerType: Ux4gCardFooterType;
  footerAlignment: Ux4gCardFooterAlignment;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryButtonLeadingIcon?: React.ReactNode;
  primaryButtonTrailingIcon?: React.ReactNode;
  secondaryButtonLeadingIcon?: React.ReactNode;
  secondaryButtonTrailingIcon?: React.ReactNode;
  contentColor: string;
}

const CardContentBlock: React.FC<CardContentBlockProps> = ({
  avatar,
  title,
  subtitle,
  headerTrailingAction,
  statusChips,
  body,
  bottomChips,
  footerType,
  footerAlignment,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonLeadingIcon,
  primaryButtonTrailingIcon,
  secondaryButtonLeadingIcon,
  secondaryButtonTrailingIcon,
  contentColor,
}) => {
  const theme = useUx4gTheme();
  const typography = theme.typography;
  const hasHeader = avatar != null || title != null || subtitle != null;

  return (
    <View style={styles.contentBlock}>
      {/* Header: avatar + title/subtitle */}
      {hasHeader && (
        <View style={styles.headerRow}>
          {avatar != null && <View style={styles.avatarContainer}>{avatar}</View>}
          <View style={styles.headerTextCol}>
            {title != null && (
              <Text
                style={{
                  fontSize: typography.tS_strong.fontSize,
                  fontWeight: typography.tS_strong.fontWeight,
                  lineHeight: typography.tS_strong.lineHeight,
                  color: contentColor,
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
            )}
            {subtitle != null && (
              <Text
                style={{
                  fontSize: typography.bS_default.fontSize,
                  fontWeight: typography.bS_default.fontWeight,
                  lineHeight: typography.bS_default.lineHeight,
                  color: hexWithAlpha(contentColor, 0.5),
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {subtitle}
              </Text>
            )}
          </View>
          {headerTrailingAction != null && (
            <View style={styles.headerTrailingActionContainer}>
              {headerTrailingAction}
            </View>
          )}
        </View>
      )}

      {/* Status chips */}
      {statusChips.length > 0 && (
        <View style={{ marginTop: Ux4gSpace.space8 }}>
          <CardChipRow
            chips={statusChips}
            pillStyle={false}
            contentColor={contentColor}
            typography={typography}
          />
        </View>
      )}

      {/* Body */}
      {body != null && (
        <Text
          style={{
            marginTop: Ux4gSpace.space12,
            fontSize: typography.bM_default.fontSize,
            fontWeight: typography.bM_default.fontWeight,
            lineHeight: typography.bM_default.lineHeight,
            color: hexWithAlpha(contentColor, 0.7),
          }}
          numberOfLines={4}
          ellipsizeMode="tail"
        >
          {body}
        </Text>
      )}

      {/* Bottom chips (pills) */}
      {bottomChips.length > 0 && (
        <View style={{ marginTop: Ux4gSpace.space12 }}>
          <CardChipRow
            chips={bottomChips}
            pillStyle={true}
            contentColor={contentColor}
            typography={typography}
          />
        </View>
      )}

      {/* Footer */}
      {footerType !== 'none' && (
        <View style={{ marginTop: Ux4gSpace.space20 }}>
          <CardFooterRow
            footerType={footerType}
            footerAlignment={footerAlignment}
            primaryButtonText={primaryButtonText}
            secondaryButtonText={secondaryButtonText}
            onPrimaryClick={onPrimaryClick}
            onSecondaryClick={onSecondaryClick}
            primaryButtonLeadingIcon={primaryButtonLeadingIcon}
            primaryButtonTrailingIcon={primaryButtonTrailingIcon}
            secondaryButtonLeadingIcon={secondaryButtonLeadingIcon}
            secondaryButtonTrailingIcon={secondaryButtonTrailingIcon}
          />
        </View>
      )}
    </View>
  );
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export const Ux4gCard: React.FC<Ux4gCardProps> = ({
  children,
  cornerRadius = Ux4gRadius.radius12,
  backgroundColor,
  borderColor = 'transparent',
  borderWidth = 0,
  elevation = 0,
  isClickable = false,
  onPress,
  direction = 'vertical',
  mediaImageUrl,
  mediaHeight = 180,
  mediaWidth = 120,
  mediaLabelText,
  mediaTrailingAction,
  avatar,
  title,
  subtitle,
  headerTrailingAction,
  statusChips = [],
  body,
  bottomChips = [],
  footerType = 'none',
  footerAlignment = 'left',
  primaryButtonText = 'Confirm',
  secondaryButtonText = 'Cancel',
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonLeadingIcon,
  primaryButtonTrailingIcon,
  secondaryButtonLeadingIcon,
  secondaryButtonTrailingIcon,
  style,
  testID,
}) => {
  const theme = useUx4gTheme();

  // Resolve background
  const resolvedBg = backgroundColor ?? theme.colors.surface;
  const hasBorder = borderWidth > 0 && borderColor !== 'transparent';

  // Determine content colour based on background brightness
  const dark = isDarkColor(resolvedBg);
  const contentColor = dark ? '#FFFFFF' : theme.colors.onSurface;

  // Shadow / elevation styles
  const elevationStyle: ViewStyle =
    elevation > 0
      ? Platform.select({
          android: { elevation },
          default: {
            shadowColor: UX4GColors.neutral1000black,
            shadowOffset: { width: 0, height: elevation * 0.5 },
            shadowOpacity: 0.15,
            shadowRadius: elevation * 0.8,
          },
        }) ?? {}
      : {};

  // Card container style
  const cardStyle: ViewStyle = {
    backgroundColor: resolvedBg,
    borderRadius: cornerRadius,
    overflow: 'hidden',
    ...(hasBorder
      ? { borderColor, borderWidth }
      : {}),
    ...elevationStyle,
  };

  // Build content
  const richContent =
    children != null ? (
      children
    ) : direction === 'horizontal' ? (
      <View style={styles.horizontalLayout}>
        {mediaImageUrl != null && (
          <View style={{ width: mediaWidth }}>
            <CardMedia
              imageUrl={mediaImageUrl}
              isHorizontal={true}
              mediaHeight={mediaHeight}
              labelText={mediaLabelText}
              trailingAction={mediaTrailingAction}
              onSurfaceColor={theme.colors.onSurface}
              surfaceColor={theme.colors.surface}
            />
          </View>
        )}
        <View style={styles.horizontalContent}>
          <CardContentBlock
            avatar={avatar}
            title={title}
            subtitle={subtitle}
            headerTrailingAction={headerTrailingAction}
            statusChips={statusChips}
            body={body}
            bottomChips={bottomChips}
            footerType={footerType}
            footerAlignment={footerAlignment}
            primaryButtonText={primaryButtonText}
            secondaryButtonText={secondaryButtonText}
            onPrimaryClick={onPrimaryClick}
            onSecondaryClick={onSecondaryClick}
            primaryButtonLeadingIcon={primaryButtonLeadingIcon}
            primaryButtonTrailingIcon={primaryButtonTrailingIcon}
            secondaryButtonLeadingIcon={secondaryButtonLeadingIcon}
            secondaryButtonTrailingIcon={secondaryButtonTrailingIcon}
            contentColor={contentColor}
          />
        </View>
      </View>
    ) : (
      <View>
        {mediaImageUrl != null && (
          <CardMedia
            imageUrl={mediaImageUrl}
            isHorizontal={false}
            mediaHeight={mediaHeight}
            labelText={mediaLabelText}
            trailingAction={mediaTrailingAction}
            onSurfaceColor={theme.colors.onSurface}
            surfaceColor={theme.colors.surface}
          />
        )}
        <View style={styles.verticalContentPadding}>
          <CardContentBlock
            avatar={avatar}
            title={title}
            subtitle={subtitle}
            headerTrailingAction={headerTrailingAction}
            statusChips={statusChips}
            body={body}
            bottomChips={bottomChips}
            footerType={footerType}
            footerAlignment={footerAlignment}
            primaryButtonText={primaryButtonText}
            secondaryButtonText={secondaryButtonText}
            onPrimaryClick={onPrimaryClick}
            onSecondaryClick={onSecondaryClick}
            primaryButtonLeadingIcon={primaryButtonLeadingIcon}
            primaryButtonTrailingIcon={primaryButtonTrailingIcon}
            secondaryButtonLeadingIcon={secondaryButtonLeadingIcon}
            secondaryButtonTrailingIcon={secondaryButtonTrailingIcon}
            contentColor={contentColor}
          />
        </View>
      </View>
    );

  if (isClickable) {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        style={({ pressed }) => [
          cardStyle,
          pressed && Platform.OS !== 'android' ? { opacity: 0.85 } : undefined,
          style,
        ]}
        android_ripple={{ color: hexWithAlpha(contentColor, 0.08), borderless: false }}
        accessibilityRole="button"
      >
        {richContent}
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={[cardStyle, style]}>
      {richContent}
    </View>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  // Media
  mediaContainer: {
    overflow: 'hidden',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  mediaFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaLabel: {
    position: 'absolute',
    top: Ux4gSpace.space8,
    left: Ux4gSpace.space8,
  },
  mediaTrailingAction: {
    position: 'absolute',
    top: Ux4gSpace.space8,
    right: Ux4gSpace.space8,
  },

  // Layout
  verticalContentPadding: {
    paddingLeft: Ux4gSpace.space20,
    paddingRight: Ux4gSpace.space20,
    paddingTop: Ux4gSpace.space20,
    paddingBottom: Ux4gSpace.space24,
  },
  horizontalLayout: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  horizontalContent: {
    flex: 1,
    paddingLeft: Ux4gSpace.space20,
    paddingRight: Ux4gSpace.space20,
    paddingTop: Ux4gSpace.space20,
    paddingBottom: Ux4gSpace.space24,
  },

  // Content block
  contentBlock: {
    flexShrink: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: Ux4gSpace.space12,
  },
  headerTextCol: {
    flex: 1,
  },
  headerTrailingActionContainer: {
    marginLeft: Ux4gSpace.space12,
  },

  // Chips
  chipRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillChip: {
    borderRadius: Ux4gRadius.radius999,
    borderWidth: 1,
    paddingHorizontal: Ux4gSpace.space12,
    paddingVertical: Ux4gSpace.space4,
  },

  // Footer
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerBtnWrapper: {
    flexShrink: 1,
  },
});
