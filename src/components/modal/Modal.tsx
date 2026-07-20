import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { Ux4gButton } from '../button';
import { Ux4gAvatar, Ux4gAvatarSize } from '../avatar';
import { Ux4gDivider } from '../divider';
import { Ux4gIcons } from '../../foundation/icons';

export type Ux4gModalAlignment = 'leftAligned' | 'centered';
export type Ux4gModalLeadingItem = 'none' | 'icon' | 'avatar' | 'image';
export type Ux4gModalHeaderImage = 'fullBleed' | 'padded' | 'none';
export type Ux4gModalFooterButtons =
  | 'oneButton'
  | 'twoButtons'
  | 'oneButtonWithIcon'
  | 'twoButtonsWithIcon';
export type Ux4gModalFooterAlign = 'left' | 'right' | 'center' | 'split';

export interface Ux4gModalProps {
  visible: boolean;
  onDismiss: () => void;
  headerImageContent?: React.ReactNode;
  headerImageUrl?: string;
  headerImageHeight?: number;
  headerImageStyle?: Ux4gModalHeaderImage;
  leadingItem?: Ux4gModalLeadingItem;
  leadingIcon?: React.ReactNode;
  leadingIconTint?: string;
  avatarInitials?: string;
  avatarImageUrl?: string;
  avatarIcon?: React.ReactNode;
  avatarSize?: Ux4gAvatarSize;
  avatarInlineSize?: Ux4gAvatarSize;
  avatarContainerColor?: string;
  avatarContentColor?: string;
  leadingImageUrl?: string;
  leadingImageContent?: React.ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
  showDescription?: boolean;
  descriptionText?: string;
  showDividers?: boolean;
  showSubtitle?: boolean;
  subtitleText?: string;
  showBody?: boolean;
  bodyText?: string;
  bodyContent?: React.ReactNode;
  showFooter?: boolean;
  footerButtons?: Ux4gModalFooterButtons;
  footerAlign?: Ux4gModalFooterAlign;
  isDestructive?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  leadingActionIcon?: React.ReactNode;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onLeadingIconPressed?: () => void;
  alignment?: Ux4gModalAlignment;
  showCloseButton?: boolean;
  backgroundColor?: string;
  cornerRadius?: number;
}

const getHexWithAlpha = (baseHex: string, alphaHex: string): string => {
  if (baseHex && baseHex.startsWith('#') && baseHex.length === 7) {
    return `${baseHex}${alphaHex}`;
  }
  return baseHex;
};

export const Ux4gModal: React.FC<Ux4gModalProps> = ({
  visible,
  onDismiss,
  headerImageContent,
  headerImageUrl,
  headerImageHeight = 160,
  headerImageStyle = 'fullBleed',
  leadingItem = 'none',
  leadingIcon,
  leadingIconTint,
  avatarInitials,
  avatarImageUrl,
  avatarIcon,
  avatarSize = 'l',
  avatarInlineSize = 's',
  avatarContainerColor,
  avatarContentColor,
  leadingImageUrl,
  leadingImageContent,
  showHeader = true,
  headerTitle = 'Header',
  showDescription = false,
  descriptionText = 'Write description here',
  showDividers = true,
  showSubtitle = true,
  subtitleText = 'Subtitle',
  showBody = true,
  bodyText = 'A modal is a design element that pops up over the main content of a webpage. It demands the user\'s attention by temporarily disabling interaction with the rest of the page until the user addresses the content within the modal.',
  bodyContent,
  showFooter = true,
  footerButtons = 'twoButtons',
  footerAlign = 'right',
  isDestructive = false,
  primaryButtonText = 'Button',
  secondaryButtonText = 'Button',
  leadingActionIcon,
  onPrimaryClick,
  onSecondaryClick,
  onLeadingIconPressed,
  alignment = 'leftAligned',
  showCloseButton = true,
  backgroundColor,
  cornerRadius,
}) => {
  const theme = useUx4gTheme();
  const surface = backgroundColor ?? theme.colors.surface;
  const onSurface = theme.colors.onSurface;
  const primary = isDestructive ? theme.colors.error : theme.colors.primary;
  const onPrimary = isDestructive ? theme.colors.onError : theme.colors.onPrimary;
  const effCornerRadius = cornerRadius ?? theme.radius.radius16;

  const isCentered = alignment === 'centered';
  const hasImage =
    headerImageStyle !== 'none' && (headerImageContent != null || headerImageUrl != null);

  const windowHeight = Dimensions.get('window').height;
  const maxModalHeight = windowHeight * 0.85;

  const handleDismiss = () => {
    onDismiss();
  };

  const renderHeaderImage = () => {
    if (!hasImage) return null;

    let content = null;
    if (headerImageContent) {
      content = headerImageContent;
    } else if (headerImageUrl) {
      content = (
        <Image
          source={{ uri: headerImageUrl }}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
      );
    }

    if (headerImageStyle === 'padded') {
      return (
        <View style={{ padding: theme.space.space12 }}>
          <View
            style={{
              width: '100%',
              height: headerImageHeight,
              borderRadius: theme.radius.radius12,
              overflow: 'hidden',
            }}
          >
            {content}
          </View>
        </View>
      );
    }

    return (
      <View style={{ width: '100%', height: headerImageHeight }}>
        {content}
      </View>
    );
  };

  const renderAvatar = (centered: boolean) => (
    <Ux4gAvatar
      size={centered ? avatarSize : avatarInlineSize}
      initials={avatarInitials}
      imageUrl={avatarImageUrl}
      icon={avatarIcon}
      containerColor={avatarContainerColor}
      contentColor={avatarContentColor}
    />
  );

  const renderLeadingImage = () => {
    if (leadingImageContent) {
      return (
        <View style={styles.leadingImageContainer}>
          {leadingImageContent}
        </View>
      );
    }
    if (leadingImageUrl) {
      return (
        <Image
          source={{ uri: leadingImageUrl }}
          style={styles.leadingImageContainer}
          resizeMode="cover"
        />
      );
    }
    return null;
  };

  const renderHeaderSection = () => {
    return (
      <View>
        <View
          style={{
            padding: theme.space.space16,
            paddingRight: showCloseButton && headerImageStyle !== 'padded' ? theme.space.space16 + 36 : theme.space.space16,
            alignItems: isCentered ? 'center' : 'flex-start',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: isCentered ? 'center' : 'flex-start',
              width: '100%',
            }}
          >
            {leadingItem === 'icon' && (
              <View style={{ marginRight: theme.space.space8 }}>
                {leadingIcon ?? Ux4gIcons.info({ size: 24, color: leadingIconTint ?? onSurface })}
              </View>
            )}
            {leadingItem === 'avatar' && !isCentered && (
              <View style={{ marginRight: theme.space.space8 }}>
                {renderAvatar(false)}
              </View>
            )}
            {leadingItem === 'image' && (leadingImageContent || leadingImageUrl) && (
              <View style={{ marginRight: theme.space.space8 }}>
                {renderLeadingImage()}
              </View>
            )}
            <Text
              style={[
                theme.typography.tS_strong,
                {
                  color: onSurface,
                  flex: 1,
                  textAlign: isCentered ? 'center' : 'left',
                },
              ]}
            >
              {headerTitle}
            </Text>
          </View>
          {showDescription && (
            <Text
              style={[
                theme.typography.bS_default,
                {
                  color: getHexWithAlpha(onSurface, '80'), // 0.5 alpha = ~128/255 -> 80 in hex. Actually 80 is 50%
                  marginTop: theme.space.space4,
                  textAlign: isCentered ? 'center' : 'left',
                },
              ]}
            >
              {descriptionText}
            </Text>
          )}
        </View>
        {showDividers && (
          <Ux4gDivider color={getHexWithAlpha(onSurface, '33')} /> // 0.2 alpha -> 33
        )}
      </View>
    );
  };

  const renderFooter = () => {
    const hasLeadingIcon =
      footerButtons === 'oneButtonWithIcon' || footerButtons === 'twoButtonsWithIcon';
    const hasSecondary =
      footerButtons === 'twoButtons' || footerButtons === 'twoButtonsWithIcon';

    let justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' = 'flex-end';
    if (footerAlign === 'left') justifyContent = 'flex-start';
    else if (footerAlign === 'center') justifyContent = 'center';
    else if (footerAlign === 'split') justifyContent = 'space-between';

    return (
      <View>
        {showDividers && (
          <Ux4gDivider color={getHexWithAlpha(onSurface, '33')} />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent,
            paddingHorizontal: theme.space.space16,
            paddingVertical: theme.space.space12,
          }}
        >
          {hasLeadingIcon && (
            <>
              <Pressable
                onPress={onLeadingIconPressed ?? (() => {})}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: getHexWithAlpha(theme.colors.primary, '14'), // 0.08 alpha -> ~13/14
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {leadingActionIcon ?? Ux4gIcons.info({ size: 20, color: theme.colors.primary })}
              </Pressable>
              {footerAlign !== 'split' && <View style={{ width: theme.space.space8 }} />}
            </>
          )}

          {hasSecondary && (
            <>
              {footerAlign === 'split' ? (
                <View style={{ flex: 1 }}>
                  <Ux4gButton
                    variant="outline"
                    width="100%"
                    borderRadius={theme.radius.radius8}
                    text={secondaryButtonText}
                    onPress={onSecondaryClick ?? onDismiss}
                  />
                </View>
              ) : (
                <Ux4gButton
                  variant="outline"
                  borderRadius={theme.radius.radius8}
                  text={secondaryButtonText}
                  onPress={onSecondaryClick ?? onDismiss}
                />
              )}
              <View style={{ width: theme.space.space8 }} />
            </>
          )}

          {footerAlign === 'split' && hasSecondary ? (
            <View style={{ flex: 1 }}>
              <Ux4gButton
                variant="primary"
                width="100%"
                backgroundColor={primary}
                contentColor={onPrimary}
                borderRadius={theme.radius.radius8}
                text={primaryButtonText}
                onPress={onPrimaryClick ?? onDismiss}
              />
            </View>
          ) : (
            <Ux4gButton
              variant="primary"
              backgroundColor={primary}
              contentColor={onPrimary}
              borderRadius={theme.radius.radius8}
              text={primaryButtonText}
              onPress={onPrimaryClick ?? onDismiss}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleDismiss}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleDismiss} />
        
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: surface,
              borderRadius: effCornerRadius,
              maxHeight: maxModalHeight,
            },
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {renderHeaderImage()}
            
            {leadingItem === 'avatar' && isCentered && showHeader && (
              <View style={{ marginTop: theme.space.space16, alignItems: 'center' }}>
                {renderAvatar(true)}
              </View>
            )}

            {showHeader && renderHeaderSection()}

            {(showSubtitle || showBody || bodyContent != null) && (
              <View style={{ padding: theme.space.space16 }}>
                {showSubtitle && (
                  <Text
                    style={[
                      theme.typography.tS_strong,
                      {
                        color: onSurface,
                        textAlign: isCentered ? 'center' : 'left',
                      },
                    ]}
                  >
                    {subtitleText}
                  </Text>
                )}

                {showBody && (
                  <View style={{ marginTop: theme.space.space8 }}>
                    {bodyContent ? (
                      bodyContent
                    ) : (
                      <Text
                        style={[
                          theme.typography.bM_default,
                          {
                            color: getHexWithAlpha(onSurface, '99'), // 0.6 alpha
                            textAlign: isCentered ? 'center' : 'left',
                          },
                        ]}
                      >
                        {bodyText}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            )}

            {showFooter && renderFooter()}
          </ScrollView>

          {showCloseButton && headerImageStyle !== 'padded' && (
            <View style={[styles.closeButtonWrapper, { top: theme.space.space16, right: theme.space.space16 }]}>
              {hasImage ? (
                <Pressable
                  onPress={handleDismiss}
                  style={[
                    styles.closeButtonImageMode,
                    { backgroundColor: getHexWithAlpha(onSurface, 'A6') }, // 0.65 alpha
                  ]}
                >
                  {Ux4gIcons.close({ size: 16, color: surface })}
                </Pressable>
              ) : (
                <Pressable
                  onPress={handleDismiss}
                  style={styles.closeButtonNormalMode}
                >
                  {Ux4gIcons.close({ size: 20, color: onSurface })}
                </Pressable>
              )}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 560,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  leadingImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
  },
  closeButtonWrapper: {
    position: 'absolute',
    zIndex: 10,
  },
  closeButtonImageMode: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonNormalMode: {
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
