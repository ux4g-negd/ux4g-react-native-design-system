import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ux4gTag, Ux4gUnifiedPillTag } from '../components/tag/Tag';
import { Ux4gButton } from '../components/button/Button';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';

export const TagShowcase: React.FC = () => {
  const theme = useUx4gTheme();
  const colors = theme.colors;

  const [dismissedTags, setDismissedTags] = useState<string[]>([]);

  const handleDismiss = (tagName: string) => {
    setDismissedTags((prev) => [...prev, tagName]);
  };

  const handleResetDismissed = () => {
    setDismissedTags([]);
  };

  const isVisible = (tagName: string) => !dismissedTags.includes(tagName);

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
          🏷️ Tag Component (`Ux4gTag`)
        </Text>
        <Text style={subtitleStyle}>
          Ported from Flutter `tag.dart`. Supports sizes (`m`, `l`), shapes (`circular`, `rectangular`), styles (`tonal`, `filled`, `outline`, `text`), color palettes, leading content, and `onDismiss`.
        </Text>
      </View>

      {/* 1. Color Schemes - Tonal Style */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. Color Schemes (`colorScheme`) - Tonal Style</Text>
        <Text style={subtitleStyle}>
          Default tonal style across all 6 foundational color schemes (`neutral`, `brand`, `success`, `warning`, `error`, `info`).
        </Text>
        <View style={styles.gridRow}>
          <Ux4gTag text="Neutral Tag" colorScheme="neutral" style="tonal" />
          <Ux4gTag text="Brand Tag" colorScheme="brand" style="tonal" />
          <Ux4gTag text="Success Tag" colorScheme="success" style="tonal" />
          <Ux4gTag text="Warning Tag" colorScheme="warning" style="tonal" />
          <Ux4gTag text="Error Tag" colorScheme="error" style="tonal" />
          <Ux4gTag text="Info Tag" colorScheme="info" style="tonal" />
        </View>
      </View>

      {/* 2. Visual Styles */}
      <View style={cardStyle}>
        <Text style={titleStyle}>2. Visual Styles (`style`)</Text>
        <Text style={subtitleStyle}>
          Variations of `brand` tags across `tonal`, `filled`, `outline`, and `text` styles.
        </Text>
        <View style={styles.gridRow}>
          <Ux4gTag text="Tonal Style" style="tonal" colorScheme="brand" />
          <Ux4gTag text="Filled Style" style="filled" colorScheme="brand" />
          <Ux4gTag text="Outline Style" style="outline" colorScheme="brand" />
          <Ux4gTag text="Text Style" style="text" colorScheme="brand" />
        </View>
      </View>

      {/* 3. Sizes and Shapes */}
      <View style={cardStyle}>
        <Text style={titleStyle}>3. Sizes (`size`) & Shapes (`shape`)</Text>
        <Text style={subtitleStyle}>
          Comparison of `m` (20px height) vs `l` (24px height) in both `circular` and `rectangular` shapes.
        </Text>
        <View style={styles.gridRow}>
          <Ux4gTag text="Circular Medium (m)" size="m" shape="circular" colorScheme="success" style="tonal" />
          <Ux4gTag text="Rectangular Medium (m)" size="m" shape="rectangular" colorScheme="success" style="outline" />
        </View>
        <View style={[styles.gridRow, { marginTop: 12 }]}>
          <Ux4gTag text="Circular Large (l)" size="l" shape="circular" colorScheme="brand" style="filled" />
          <Ux4gTag text="Rectangular Large (l)" size="l" shape="rectangular" colorScheme="brand" style="outline" />
        </View>
      </View>

      {/* 4. Leading Indicators & Dismissable Tags */}
      <View style={cardStyle}>
        <Text style={titleStyle}>4. Leading Indicators & Interactive Dismiss (`onDismiss`)</Text>
        <Text style={subtitleStyle}>
          Tap the trailing ✕ icon to dismiss tags interactively!
        </Text>
        <View style={styles.gridRow}>
          {isVisible('react') && (
            <Ux4gTag
              text="React Native"
              colorScheme="info"
              style="tonal"
              leadingContent={<View style={[styles.statusDot, { backgroundColor: '#3B82F6' }]} />}
              onDismiss={() => handleDismiss('react')}
            />
          )}
          {isVisible('flutter') && (
            <Ux4gTag
              text="Flutter Parity"
              colorScheme="brand"
              style="tonal"
              leadingContent={<Text style={{ fontSize: 10 }}>⚡</Text>}
              onDismiss={() => handleDismiss('flutter')}
            />
          )}
          {isVisible('verified') && (
            <Ux4gTag
              text="Verified Build"
              colorScheme="success"
              style="filled"
              leadingContent={<Text style={{ fontSize: 10, color: '#FFF' }}>✓</Text>}
              onDismiss={() => handleDismiss('verified')}
            />
          )}
        </View>
        {dismissedTags.length > 0 && (
          <View style={{ marginTop: 16 }}>
            <Ux4gButton
              text="Reset Dismissed Tags"
              size="small"
              variant="outline"
              onPress={handleResetDismissed}
            />
          </View>
        )}
      </View>

      {/* 5. Unified Pill Tags */}
      <View style={cardStyle}>
        <Text style={titleStyle}>5. Unified Pill Tags (`Ux4gUnifiedPillTag`)</Text>
        <Text style={subtitleStyle}>
          Multi-segment pills separated by vertical divider lines (`Ux4gUnifiedPillTagProps`).
        </Text>
        <View style={styles.gridRow}>
          <Ux4gUnifiedPillTag
            segments={[
              { text: 'STATUS', bold: true, textColor: '#71717A' },
              { text: 'ONLINE 🟢', bold: true, textColor: '#10B981' },
            ]}
          />
        </View>
        <View style={[styles.gridRow, { marginTop: 12 }]}>
          <Ux4gUnifiedPillTag
            height={28}
            segments={[
              { text: 'VERSION', bold: false },
              { text: 'v1.0.0-RN', bold: true, textColor: colors.primary },
              { text: 'STABLE', bold: true, textColor: '#10B981' },
            ]}
          />
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
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
