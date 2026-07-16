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
  Ux4gAvatar,
  Ux4gAvatarGroup,
  Ux4gProfileAvatar,
  Ux4gStatusAvatar,
  Ux4gAvatarSize,
  Ux4gAvatarShape,
  Ux4gStatusVariant,
  Ux4gProfileBadge,
  Ux4gProfileAction,
  Ux4gAvatarGroupItem,
} from '../components/avatar/Avatar';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';

const ALL_SIZES: Ux4gAvatarSize[] = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];

const ALL_STATUSES: Ux4gStatusVariant[] = ['online', 'offline', 'busy', 'success', 'error', 'warning'];

const PLACEHOLDER_AVATAR = 'https://i.pravatar.cc/150?u=ux4g';

const GROUP_ITEMS: Ux4gAvatarGroupItem[] = [
  { imageUrl: 'https://i.pravatar.cc/150?u=user1', onPress: () => Alert.alert('User 1') },
  { imageUrl: 'https://i.pravatar.cc/150?u=user2', onPress: () => Alert.alert('User 2') },
  { imageUrl: 'https://i.pravatar.cc/150?u=user3', onPress: () => Alert.alert('User 3') },
  { initials: 'JD', onPress: () => Alert.alert('John Doe') },
  { initials: 'AS', onPress: () => Alert.alert('Alice Smith') },
  { initials: 'MK', onPress: () => Alert.alert('Mike Kim') },
];

export const AvatarShowcase: React.FC = () => {
  const theme = useUx4gTheme();
  const colors = theme.colors;

  const [activeSize, setActiveSize] = useState<Ux4gAvatarSize>('m');
  const [activeShape, setActiveShape] = useState<Ux4gAvatarShape>('circle');
  const [showImage, setShowImage] = useState(false);

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

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          👤 Avatar Component
        </Text>
        <Text style={subtitleStyle}>
          React Native port of Flutter `avatar.dart`. Supports 7 sizes (xs–xxxl),
          image/initials/icon content, circular/rounded/square shapes, profile
          badges, status indicators, and grouped avatars.
        </Text>
      </View>

      {/* 1. All Sizes */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. All Sizes (initials)</Text>
        <Text style={subtitleStyle}>
          `Ux4gAvatar` at each size (xs=24, s=32, m=40, l=48, xl=64, xxl=80, xxxl=120).
        </Text>
        <View style={styles.sizeRow}>
          {ALL_SIZES.map((sz) => (
            <View key={sz} style={styles.sizeItem}>
              <Ux4gAvatar size={sz} initials="U4" />
              <Text style={[styles.sizeLabel, { color: theme.isDark ? '#A1A1AA' : '#71717A' }]}>
                {sz}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 2. Content Priority */}
      <View style={cardStyle}>
        <Text style={titleStyle}>2. Content Priority</Text>
        <Text style={subtitleStyle}>
          Priority: image → initials → icon fallback.
        </Text>
        <View style={styles.contentRow}>
          <View style={styles.contentItem}>
            <Ux4gAvatar size="xl" imageUrl={PLACEHOLDER_AVATAR} initials="U4" />
            <Text style={[styles.caption, { color: theme.isDark ? '#A1A1AA' : '#71717A' }]}>
              Image
            </Text>
          </View>
          <View style={styles.contentItem}>
            <Ux4gAvatar size="xl" initials="U4" />
            <Text style={[styles.caption, { color: theme.isDark ? '#A1A1AA' : '#71717A' }]}>
              Initials
            </Text>
          </View>
          <View style={styles.contentItem}>
            <Ux4gAvatar size="xl" />
            <Text style={[styles.caption, { color: theme.isDark ? '#A1A1AA' : '#71717A' }]}>
              Icon (default)
            </Text>
          </View>
        </View>
      </View>

      {/* 3. Shapes */}
      <View style={cardStyle}>
        <Text style={titleStyle}>3. Shapes</Text>
        <Text style={subtitleStyle}>
          `shape` prop: `circle` (default), `rounded`, `square`.
        </Text>
        <View style={styles.contentRow}>
          {(['circle', 'rounded', 'square'] as Ux4gAvatarShape[]).map((sh) => (
            <View key={sh} style={styles.contentItem}>
              <Ux4gAvatar size="xl" initials="U4" shape={sh} />
              <Text style={[styles.caption, { color: theme.isDark ? '#A1A1AA' : '#71717A' }]}>
                {sh}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 4. ProfileAvatar — Badges */}
      <View style={cardStyle}>
        <Text style={titleStyle}>4. ProfileAvatar — Badges</Text>
        <Text style={subtitleStyle}>
          `Ux4gProfileAvatar` with `variant` badges: verified, star, admin.
        </Text>
        <View style={styles.contentRow}>
          {(['verified', 'star', 'admin'] as Ux4gProfileBadge[]).map((badge) => (
            <View key={badge} style={styles.contentItem}>
              <Ux4gProfileAvatar
                size="xl"
                initials="U4"
                variant={badge}
                onVariantPress={() => Alert.alert('Badge', badge)}
              />
              <Text style={[styles.caption, { color: theme.isDark ? '#A1A1AA' : '#71717A' }]}>
                {badge}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 5. ProfileAvatar — Actions */}
      <View style={cardStyle}>
        <Text style={titleStyle}>5. ProfileAvatar — Actions</Text>
        <Text style={subtitleStyle}>
          `Ux4gProfileAvatar` with `variant` actions: edit, camera, remove.
        </Text>
        <View style={styles.contentRow}>
          {(['edit', 'camera', 'remove'] as Ux4gProfileAction[]).map((action) => (
            <View key={action} style={styles.contentItem}>
              <Ux4gProfileAvatar
                size="xl"
                initials="U4"
                variant={action}
                onVariantPress={() => Alert.alert('Action', action)}
              />
              <Text style={[styles.caption, { color: theme.isDark ? '#A1A1AA' : '#71717A' }]}>
                {action}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 6. ProfileAvatar — with Image */}
      <View style={cardStyle}>
        <Text style={titleStyle}>6. ProfileAvatar — with Image</Text>
        <Text style={subtitleStyle}>
          ProfileAvatar combining a network image with an edit badge.
        </Text>
        <View style={styles.contentRow}>
          <Ux4gProfileAvatar
            size="xxl"
            imageUrl={PLACEHOLDER_AVATAR}
            variant="edit"
            onVariantPress={() => Alert.alert('Edit photo')}
          />
          <Ux4gProfileAvatar
            size="xxl"
            imageUrl={PLACEHOLDER_AVATAR}
            variant="verified"
          />
          <Ux4gProfileAvatar
            size="xxl"
            imageUrl={PLACEHOLDER_AVATAR}
            variant="camera"
            onVariantPress={() => Alert.alert('Take photo')}
          />
        </View>
      </View>

      {/* 7. StatusAvatar */}
      <View style={cardStyle}>
        <Text style={titleStyle}>7. StatusAvatar</Text>
        <Text style={subtitleStyle}>
          `Ux4gStatusAvatar` with status variants: online, offline, busy, success, error, warning.
        </Text>
        <View style={styles.statusGrid}>
          {ALL_STATUSES.map((status) => (
            <View key={status} style={styles.statusItem}>
              <Ux4gStatusAvatar
                size="xl"
                initials="U4"
                variant={status}
              />
              <Text style={[styles.caption, { color: theme.isDark ? '#A1A1AA' : '#71717A' }]}>
                {status}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 8. StatusAvatar — with Image */}
      <View style={cardStyle}>
        <Text style={titleStyle}>8. StatusAvatar — with Image</Text>
        <Text style={subtitleStyle}>
          Status indicator overlaid on network image avatars.
        </Text>
        <View style={styles.contentRow}>
          <Ux4gStatusAvatar size="xl" imageUrl={PLACEHOLDER_AVATAR} variant="online" />
          <Ux4gStatusAvatar size="xl" imageUrl={PLACEHOLDER_AVATAR} variant="busy" />
          <Ux4gStatusAvatar size="xl" imageUrl={PLACEHOLDER_AVATAR} variant="warning" />
        </View>
      </View>

      {/* 9. AvatarGroup — Overlapping */}
      <View style={cardStyle}>
        <Text style={titleStyle}>9. AvatarGroup — Overlapping</Text>
        <Text style={subtitleStyle}>
          `Ux4gAvatarGroup` with `collapsed: true` — avatars overlap with a negative gap.
        </Text>
        <View style={[styles.previewBox, { backgroundColor: theme.isDark ? '#27272A' : '#F4F4F5' }]}>
          <Ux4gAvatarGroup
            items={GROUP_ITEMS}
            size="l"
            collapsed
            onRemainingPress={() => Alert.alert('Show all')}
          />
        </View>
      </View>

      {/* 10. AvatarGroup — Max Limit */}
      <View style={cardStyle}>
        <Text style={titleStyle}>10. AvatarGroup — Max Limit</Text>
        <Text style={subtitleStyle}>
          `maxLimit` limits visible avatars; remaining shown as `+N` indicator.
        </Text>
        <View style={[styles.previewBox, { backgroundColor: theme.isDark ? '#27272A' : '#F4F4F5' }]}>
          <Ux4gAvatarGroup
            items={GROUP_ITEMS}
            size="l"
            collapsed
            maxLimit={4}
            onRemainingPress={() => Alert.alert('Show 3 more')}
          />
        </View>
      </View>

      {/* 11. AvatarGroup — Non-collapsed */}
      <View style={cardStyle}>
        <Text style={titleStyle}>11. AvatarGroup — Non-collapsed</Text>
        <Text style={subtitleStyle}>
          `collapsed: false` — avatars are spaced with 8px gaps instead of overlapping.
        </Text>
        <View style={[styles.previewBox, { backgroundColor: theme.isDark ? '#27272A' : '#F4F4F5' }]}>
          <Ux4gAvatarGroup
            items={GROUP_ITEMS.slice(0, 4)}
            size="l"
            collapsed={false}
          />
        </View>
      </View>

      {/* 12. Interactive Controls */}
      <View style={cardStyle}>
        <Text style={titleStyle}>12. Interactive Controls</Text>
        <Text style={subtitleStyle}>
          Toggle size, shape, and image vs initials using the controls below.
        </Text>

        <View style={styles.controlRow}>
          <Text style={[styles.controlLabel, { color: colors.onBackground }]}>Size:</Text>
          <View style={styles.pillRow}>
            {ALL_SIZES.map((sz) => (
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
                    fontSize: 11,
                  }}
                >
                  {sz}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.controlRow}>
          <Text style={[styles.controlLabel, { color: colors.onBackground }]}>Shape:</Text>
          <View style={styles.pillRow}>
            {(['circle', 'rounded', 'square'] as Ux4gAvatarShape[]).map((sh) => (
              <Pressable
                key={sh}
                onPress={() => setActiveShape(sh)}
                style={[
                  styles.pill,
                  {
                    borderColor: colors.primary,
                    backgroundColor: activeShape === sh ? colors.primary : 'transparent',
                  },
                ]}
              >
                <Text
                  style={{
                    color: activeShape === sh ? colors.onPrimary : colors.primary,
                    fontWeight: '600',
                    fontSize: 11,
                  }}
                >
                  {sh}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.controlRow}>
          <Pressable
            onPress={() => setShowImage(!showImage)}
            style={[styles.togglePill, { borderColor: colors.primary }]}
          >
            <Text style={{ color: colors.primary, fontWeight: '600' }}>
              Image: {showImage ? 'ON' : 'OFF'}
            </Text>
          </Pressable>
        </View>

        <View style={[styles.previewBox, { backgroundColor: theme.isDark ? '#27272A' : '#F4F4F5' }]}>
          <View style={styles.contentRow}>
            <Ux4gAvatar
              size={activeSize}
              shape={activeShape}
              imageUrl={showImage ? PLACEHOLDER_AVATAR : undefined}
              initials="U4"
            />
            <Ux4gProfileAvatar
              size={activeSize}
              shape={activeShape}
              imageUrl={showImage ? PLACEHOLDER_AVATAR : undefined}
              initials="U4"
              variant="verified"
            />
            <Ux4gStatusAvatar
              size={activeSize}
              shape={activeShape}
              imageUrl={showImage ? PLACEHOLDER_AVATAR : undefined}
              initials="U4"
              variant="online"
            />
          </View>
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
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
    gap: 12,
  },
  contentItem: {
    alignItems: 'center',
    gap: 8,
  },
  caption: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
  },
  statusItem: {
    alignItems: 'center',
    gap: 6,
  },
  previewBox: {
    padding: 20,
    borderRadius: 12,
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
    flexWrap: 'wrap',
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
});
