import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ux4gBadge, Ux4gBadgeLimit, Ux4gBadgeAlignment } from '../components/badge/Badge';
import { Ux4gButton } from '../components/button/Button';
import { Ux4gIcons } from '../foundation/icons';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';

export const BadgeShowcase: React.FC = () => {
  const theme = useUx4gTheme();
  const colors = theme.colors;

  const [count, setCount] = useState<number>(5);
  const [limit, setLimit] = useState<Ux4gBadgeLimit>('singleDigit');
  const [label, setLabel] = useState<string>('NEW');
  const [showBorder, setShowBorder] = useState<boolean>(false);

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

  const semanticColors = theme.isDark
    ? ['#93C5FD', '#22C55E', '#F97316', '#FCA5A5', '#71717A', '#06B6D4']
    : ['#2563EB', '#16A34A', '#EA580C', '#DC2626', '#D4D4D8', '#0891B2'];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          🔴 Badge Component (`Ux4gBadge`)
        </Text>
        <Text style={subtitleStyle}>
          100% exact parity with Flutter `badge.dart` & `badge_stories.dart`. Supports compound named constructors (`Ux4gBadge.dot()`, `Ux4gBadge.count()`, `Ux4gBadge.label()`, `Ux4gBadge.icon()`) and limit formatting (`9+` / `99+`).
        </Text>
      </View>

      {/* 1. Dot Use Case */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. Dot (`Ux4gBadge.dot`)</Text>
        <Text style={subtitleStyle}>
          Simple presence indicator anchored to an icon or widget.
        </Text>
        <View style={styles.showcaseItemBox}>
          <Ux4gBadge.dot
            showBorder={showBorder}
            child={
              <View style={[styles.dummyIconBox, { backgroundColor: theme.isDark ? '#333333' : '#F4F4F5' }]}>
                <Text style={{ fontSize: 24 }}>🔔</Text>
              </View>
            }
          />
        </View>
      </View>

      {/* 2. Count Use Case */}
      <View style={cardStyle}>
        <Text style={titleStyle}>2. Count (`Ux4gBadge.count`)</Text>
        <Text style={subtitleStyle}>
          Shows a numeric count (`{count}`) with active limit (`{limit}`).
        </Text>
        <View style={styles.showcaseItemBox}>
          <Ux4gBadge.count
            count={count}
            limit={limit}
            showBorder={showBorder}
            child={
              <View style={[styles.dummyIconBox, { backgroundColor: theme.isDark ? '#333333' : '#F4F4F5' }]}>
                <Text style={{ fontSize: 24 }}>✉️</Text>
              </View>
            }
          />
        </View>

        <View style={styles.rowControls}>
          <Ux4gButton text="+1" size="small" onPress={() => setCount((c) => c + 1)} style={styles.controlBtn} />
          <Ux4gButton text="+10" size="small" onPress={() => setCount((c) => c + 10)} style={styles.controlBtn} />
          <Ux4gButton text="Reset (5)" size="small" variant="outline" onPress={() => setCount(5)} style={styles.controlBtn} />
        </View>
        <View style={styles.rowControls}>
          <Pressable
            onPress={() => setLimit(limit === 'singleDigit' ? 'doubleDigit' : 'singleDigit')}
            style={[styles.togglePill, { borderColor: colors.primary }]}
          >
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Limit: {limit}</Text>
          </Pressable>
          <Pressable
            onPress={() => setShowBorder(!showBorder)}
            style={[styles.togglePill, { borderColor: colors.primary }]}
          >
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Border: {showBorder ? 'ON' : 'OFF'}</Text>
          </Pressable>
        </View>
      </View>

      {/* 3. Label Use Case */}
      <View style={cardStyle}>
        <Text style={titleStyle}>3. Label (`Ux4gBadge.label`)</Text>
        <Text style={subtitleStyle}>
          Displays a short text string as a badge.
        </Text>
        <View style={styles.showcaseItemBox}>
          <Ux4gBadge.label
            label={label}
            showBorder={showBorder}
            child={
              <View style={[styles.dummyIconBox, { backgroundColor: theme.isDark ? '#333333' : '#F4F4F5' }]}>
                <Text style={{ fontSize: 24 }}>⭐</Text>
              </View>
            }
          />
        </View>
        <View style={styles.rowControls}>
          <Ux4gButton text="NEW" size="small" onPress={() => setLabel('NEW')} style={styles.controlBtn} />
          <Ux4gButton text="PRO" size="small" onPress={() => setLabel('PRO')} style={styles.controlBtn} />
          <Ux4gButton text="BETA" size="small" onPress={() => setLabel('BETA')} style={styles.controlBtn} />
        </View>
      </View>

      {/* 4. Standalone variants */}
      <View style={cardStyle}>
        <Text style={titleStyle}>4. Standalone Variants (`Badge — Standalone`)</Text>
        <Text style={subtitleStyle}>
          Badges rendered without a child widget exactly matching `badge_stories.dart` (`verification`, `star`, and `shield` icons with `showBorder: true`).
        </Text>
        <View style={styles.standaloneWrap}>
          <Ux4gBadge.readyToUse assetPath={Ux4gIcons.verification({ size: 18 })} showBorder={true} />
          <Ux4gBadge.readyToUse assetPath={Ux4gIcons.star({ size: 18 })} showBorder={true} />
          <Ux4gBadge.icon icon={Ux4gIcons.shield({ size: 12, color: '#FFFFFF' })} showBorder={true} containerColor={colors.primary} />
          <Ux4gBadge.dot />
          <Ux4gBadge.count count={7} />
          <Ux4gBadge.count count={99} />
          <Ux4gBadge.count count={150} limit="doubleDigit" />
          <Ux4gBadge.label label="BETA" />
          <Ux4gBadge.label label="NEW" />
        </View>
      </View>

      {/* 5. Semantic Colors & Border */}
      <View style={cardStyle}>
        <Text style={titleStyle}>5. Semantic Colors & Border (`showBorder: true`)</Text>
        <Text style={subtitleStyle}>
          Showcasing the border stroke across semantic colors matching Flutter use case.
        </Text>
        <View style={[styles.semanticBox, { backgroundColor: theme.isDark ? '#27272A' : '#F4F4F5' }]}>
          <View style={styles.semanticRow}>
            {semanticColors.map((color, idx) => (
              <Ux4gBadge.dot key={`dot-${idx}`} containerColor={color} showBorder={true} />
            ))}
          </View>

          <View style={styles.semanticRow}>
            {semanticColors.map((color, idx) => (
              <Ux4gBadge.icon
                key={`icon-${idx}`}
                containerColor={color}
                showBorder={true}
                icon={<Text style={{ fontSize: 10, color: '#FFF' }}>✓</Text>}
              />
            ))}
          </View>

          <View style={styles.semanticRow}>
            {semanticColors.map((color, idx) => (
              <Ux4gBadge.count key={`count-${idx}`} count={3} containerColor={color} showBorder={true} />
            ))}
          </View>

          <View style={styles.semanticRow}>
            <Ux4gBadge.readyToUse assetPath={Ux4gIcons.verification({ size: 18 })} showBorder={true} />
            <Ux4gBadge.readyToUse assetPath={Ux4gIcons.star({ size: 18 })} showBorder={true} />
            <Ux4gBadge.icon
              icon={Ux4gIcons.shield({ size: 12, color: '#FFFFFF' })}
              containerColor={theme.isDark ? '#93C5FD' : '#2563EB'}
              showBorder={true}
            />
            <Ux4gBadge.readyToUse assetPath={Ux4gIcons.verification({ size: 18 })} showBorder={true} />
            <Ux4gBadge.readyToUse assetPath={Ux4gIcons.star({ size: 18 })} showBorder={true} />
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
  showcaseItemBox: {
    alignItems: 'center',
    marginVertical: 20,
    overflow: 'visible',
  },
  dummyIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowControls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  controlBtn: {
    marginHorizontal: 4,
  },
  togglePill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 999,
    marginHorizontal: 4,
  },
  standaloneWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  semanticBox: {
    padding: 20,
    borderRadius: 12,
    marginTop: 12,
    gap: 24,
  },
  semanticRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
