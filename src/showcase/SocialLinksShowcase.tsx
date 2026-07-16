import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {
  Ux4gSocialLink,
  Ux4gSocialLinkGroup,
  Ux4gSocialLinkList,
  SocialMediaIcon,
  SocialLinkSize,
} from '../components/social-links/SocialLinks';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';

const ALL_ICONS: SocialMediaIcon[] = [
  'github',
  'google',
  'twitter',
  'instagram',
  'youtube',
  'whatsapp',
  'slack',
  'figma',
  'dribbble',
  'behance',
  'gmail',
  'medium',
  'reddit',
  'skype',
  'notion',
  'stackoverflow',
  'apple',
  'android',
  'zoom',
  'microsoftTeams',
  'googleMeet',
  'googlePlay',
  'social',
  'vector',
];

const SIZE_OPTIONS: SocialLinkSize[] = ['xs', 's', 'm', 'l', 'xl', 'xxl'];

export const SocialLinksShowcase: React.FC = () => {
  const theme = useUx4gTheme();
  const colors = theme.colors;

  const [activeSize, setActiveSize] = useState<SocialLinkSize>('m');
  const [enableBg, setEnableBg] = useState<boolean>(false);
  const [useColored, setUseColored] = useState<boolean>(false);

  const cardStyle = [
    styles.card,
    {
      backgroundColor: theme.isDark ? '#1F1F1F' : '#FFFFFF',
      borderColor: theme.isDark ? '#333333' : '#E4E4E7',
    },
  ];

  const titleStyle = [
    styles.sectionTitle,
    { color: theme.isDark ? '#F4F4F5' : '#18181B' },
  ];

  const subtitleStyle = [
    styles.subText,
    { color: theme.isDark ? '#A1A1AA' : '#71717A' },
  ];

  const handleIconPress = (icon: SocialMediaIcon) => () => {
    Alert.alert('Social Link Pressed', `You tapped: ${icon}`);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          🔗 Social Links Component
        </Text>
        <Text style={subtitleStyle}>
          React Native port of Flutter `social_links.dart`. Supports 24 social media icons, 6 sizes (xs–xxl), white/colored variants, optional circular backgrounds, and interactive press callbacks.
        </Text>
      </View>

      {/* 1. Single Icon — All Sizes */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. Single Icon — All Sizes</Text>
        <Text style={subtitleStyle}>
          `Ux4gSocialLink` rendered at each size (xs=16, s=20, m=24, l=32, xl=40, xxl=48).
        </Text>
        <View style={styles.sizeRow}>
          {SIZE_OPTIONS.map((sz) => (
            <View key={sz} style={styles.sizeItem}>
              <Ux4gSocialLink
                icon="github"
                size={sz}
                onPress={() => Alert.alert('Size', `GitHub at size "${sz}"`)}
              />
              <Text style={[styles.sizeLabel, { color: theme.isDark ? '#A1A1AA' : '#71717A' }]}>
                {sz}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 2. White vs Colored Variants */}
      <View style={cardStyle}>
        <Text style={titleStyle}>2. White vs Colored Variants</Text>
        <Text style={subtitleStyle}>
          Left: white/mono (tinted with `onSurface`). Right: branded color (`useColoredIcon: true`).
        </Text>
        <View style={styles.variantRow}>
          <View style={styles.variantColumn}>
            <Text style={[styles.variantLabel, { color: colors.onBackground }]}>White (tinted)</Text>
            <View style={styles.iconGrid}>
              {['github', 'google', 'twitter', 'instagram', 'youtube', 'whatsapp'].map((icon) => (
                <Ux4gSocialLink
                  key={icon}
                  icon={icon as SocialMediaIcon}
                  size="l"
                  useColoredIcon={false}
                />
              ))}
            </View>
          </View>
          <View style={[styles.variantDivider, { backgroundColor: theme.isDark ? '#333' : '#E4E4E7' }]} />
          <View style={styles.variantColumn}>
            <Text style={[styles.variantLabel, { color: colors.onBackground }]}>Colored</Text>
            <View style={styles.iconGrid}>
              {['github', 'google', 'twitter', 'instagram', 'youtube', 'whatsapp'].map((icon) => (
                <Ux4gSocialLink
                  key={icon}
                  icon={icon as SocialMediaIcon}
                  size="l"
                  useColoredIcon={true}
                />
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* 3. With Circular Background */}
      <View style={cardStyle}>
        <Text style={titleStyle}>3. With Circular Background</Text>
        <Text style={subtitleStyle}>
          `enableBackground: true` wraps each icon in a tinted circular container (default: primary @ 10% alpha).
        </Text>
        <View style={styles.bgRow}>
          {['figma', 'slack', 'dribbble', 'behance', 'gmail', 'notion'].map((icon) => (
            <Ux4gSocialLink
              key={icon}
              icon={icon as SocialMediaIcon}
              size="l"
              enableBackground={true}
              useColoredIcon={true}
              onPress={() => Alert.alert('Background', `${icon} pressed`)}
            />
          ))}
        </View>
        <View style={[styles.bgRow, { marginTop: 12 }]}>
          {['figma', 'slack', 'dribbble', 'behance', 'gmail', 'notion'].map((icon) => (
            <Ux4gSocialLink
              key={icon}
              icon={icon as SocialMediaIcon}
              size="l"
              enableBackground={true}
              containerColor={theme.isDark ? '#27272A' : '#F4F4F5'}
              useColoredIcon={false}
            />
          ))}
        </View>
      </View>

      {/* 4. Custom Container Size */}
      <View style={cardStyle}>
        <Text style={titleStyle}>4. Custom Container Size</Text>
        <Text style={subtitleStyle}>
          `containerSize` overrides the auto-calculated background circle size.
        </Text>
        <View style={styles.bgRow}>
          <Ux4gSocialLink icon="github" size="m" enableBackground containerSize={56} useColoredIcon />
          <Ux4gSocialLink icon="google" size="m" enableBackground containerSize={56} useColoredIcon />
          <Ux4gSocialLink icon="twitter" size="m" enableBackground containerSize={56} useColoredIcon />
          <Ux4gSocialLink icon="youtube" size="m" enableBackground containerSize={56} containerColor="#FF000020" useColoredIcon />
        </View>
      </View>

      {/* 5. Interactive Controls */}
      <View style={cardStyle}>
        <Text style={titleStyle}>5. Interactive Controls</Text>
        <Text style={subtitleStyle}>
          Toggle size, background, and color variant using the controls below.
        </Text>

        {/* Size selector */}
        <View style={styles.controlRow}>
          <Text style={[styles.controlLabel, { color: colors.onBackground }]}>Size:</Text>
          <View style={styles.pillRow}>
            {SIZE_OPTIONS.map((sz) => (
              <Pressable
                key={sz}
                onPress={() => setActiveSize(sz)}
                style={[
                  styles.pill,
                  {
                    borderColor: colors.primary,
                    backgroundColor: activeSize === sz ? colors.primary : 'transparent',
                  },
                ]}
              >
                <Text
                  style={{
                    color: activeSize === sz ? colors.onPrimary : colors.primary,
                    fontWeight: '600',
                    fontSize: 13,
                  }}
                >
                  {sz}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Toggles */}
        <View style={styles.controlRow}>
          <Pressable
            onPress={() => setEnableBg(!enableBg)}
            style={[styles.togglePill, { borderColor: colors.primary }]}
          >
            <Text style={{ color: colors.primary, fontWeight: '600' }}>
              Background: {enableBg ? 'ON' : 'OFF'}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setUseColored(!useColored)}
            style={[styles.togglePill, { borderColor: colors.primary }]}
          >
            <Text style={{ color: colors.primary, fontWeight: '600' }}>
              Colored: {useColored ? 'ON' : 'OFF'}
            </Text>
          </Pressable>
        </View>

        {/* Preview */}
        <View style={[styles.previewBox, { backgroundColor: theme.isDark ? '#27272A' : '#F4F4F5' }]}>
          <View style={styles.iconGrid}>
            {['github', 'google', 'twitter', 'instagram', 'youtube', 'whatsapp', 'slack', 'figma'].map(
              (icon) => (
                <Ux4gSocialLink
                  key={icon}
                  icon={icon as SocialMediaIcon}
                  size={activeSize}
                  enableBackground={enableBg}
                  useColoredIcon={useColored}
                  onPress={() => Alert.alert('Pressed', icon)}
                />
              )
            )}
          </View>
        </View>
      </View>

      {/* 6. SocialLinkGroup (Wrap layout) */}
      <View style={cardStyle}>
        <Text style={titleStyle}>6. SocialLinkGroup (`Ux4gSocialLinkGroup`)</Text>
        <Text style={subtitleStyle}>
          Wrapping row of icons with configurable `spacing`. Matches Flutter `Ux4gSocialLinkGroup` Wrap widget.
        </Text>
        <View style={[styles.previewBox, { backgroundColor: theme.isDark ? '#27272A' : '#F4F4F5' }]}>
          <Ux4gSocialLinkGroup
            icons={ALL_ICONS}
            size="m"
            onIconPressed={handleIconPress}
            spacing={8}
            enableBackground={true}
          />
        </View>
      </View>

      {/* 7. SocialLinkGroup — Colored */}
      <View style={cardStyle}>
        <Text style={titleStyle}>7. SocialLinkGroup — Colored Icons</Text>
        <Text style={subtitleStyle}>
          All 24 icons rendered with branded colors (`useColoredIcon` via individual `Ux4gSocialLink`).
        </Text>
        <View style={[styles.previewBox, { backgroundColor: theme.isDark ? '#27272A' : '#F4F4F5' }]}>
          <View style={styles.iconGrid}>
            {ALL_ICONS.map((icon) => (
              <Ux4gSocialLink
                key={icon}
                icon={icon}
                size="l"
                useColoredIcon={true}
                onPress={() => Alert.alert('Colored', icon)}
              />
            ))}
          </View>
        </View>
      </View>

      {/* 8. SocialLinkList — Horizontal */}
      <View style={cardStyle}>
        <Text style={titleStyle}>8. SocialLinkList — Horizontal</Text>
        <Text style={subtitleStyle}>
          `Ux4gSocialLinkList` with `direction: horizontal` and various `alignment` values.
        </Text>
        {(['flex-start', 'center', 'flex-end', 'space-between'] as const).map((align) => (
          <View key={align} style={{ marginTop: 12 }}>
            <Text style={[styles.alignLabel, { color: theme.isDark ? '#A1A1AA' : '#71717A' }]}>
              alignment: {align}
            </Text>
            <View
              style={[
                styles.listBox,
                { backgroundColor: theme.isDark ? '#27272A' : '#F4F4F5' },
              ]}
            >
              <Ux4gSocialLinkList
                icons={['github', 'google', 'twitter', 'instagram', 'youtube']}
                size="m"
                alignment={align}
                direction="horizontal"
                enableBackground
                onIconPressed={handleIconPress}
              />
            </View>
          </View>
        ))}
      </View>

      {/* 9. SocialLinkList — Vertical */}
      <View style={cardStyle}>
        <Text style={titleStyle}>9. SocialLinkList — Vertical</Text>
        <Text style={subtitleStyle}>
          `direction: vertical` layout for stacked social link menus.
        </Text>
        <View style={[styles.verticalBox, { backgroundColor: theme.isDark ? '#27272A' : '#F4F4F5' }]}>
          <Ux4gSocialLinkList
            icons={['github', 'google', 'twitter', 'instagram', 'youtube', 'slack']}
            size="l"
            direction="vertical"
            alignment="center"
            enableBackground
            onIconPressed={handleIconPress}
          />
        </View>
      </View>

      {/* 10. Custom Color Tint */}
      <View style={cardStyle}>
        <Text style={titleStyle}>10. Custom Color Tint</Text>
        <Text style={subtitleStyle}>
          Using the `color` prop to override icon tint with custom colors.
        </Text>
        <View style={styles.bgRow}>
          <Ux4gSocialLink icon="github" size="xl" color="#FF6B6B" enableBackground containerColor="#FF6B6B20" />
          <Ux4gSocialLink icon="twitter" size="xl" color="#4ECDC4" enableBackground containerColor="#4ECDC420" />
          <Ux4gSocialLink icon="instagram" size="xl" color="#FFE66D" enableBackground containerColor="#FFE66D20" />
          <Ux4gSocialLink icon="youtube" size="xl" color="#A78BFA" enableBackground containerColor="#A78BFA20" />
          <Ux4gSocialLink icon="slack" size="xl" color="#34D399" enableBackground containerColor="#34D39920" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  subText: {
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    overflow: 'visible',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 12,
  },
  sizeItem: {
    alignItems: 'center',
    gap: 8,
  },
  sizeLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  variantRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  variantColumn: {
    flex: 1,
    alignItems: 'center',
  },
  variantDivider: {
    width: 1,
    alignSelf: 'stretch',
  },
  variantLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 12,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  controlRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  pillRow: {
    flexDirection: 'row',
    gap: 6,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 999,
  },
  togglePill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 999,
  },
  previewBox: {
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
  },
  listBox: {
    padding: 12,
    borderRadius: 10,
  },
  alignLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  verticalBox: {
    padding: 20,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  },
});
