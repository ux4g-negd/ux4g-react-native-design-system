import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';
import { UX4GColors } from '../foundation/colors';
import { Ux4gDivider } from '../components/divider/Divider';

export const DividerShowcase: React.FC = () => {
  const theme = useUx4gTheme();

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: theme.isDark ? UX4GColors.neutral800 : UX4GColors.neutral200 },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: theme.isDark ? UX4GColors.white : theme.colors.primary },
          ]}
        >
          Ux4gDivider (`Ux4gDividerProps`)
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
          Complete port of Flutter `divider.dart` supporting orientation, style, thickness, indents & labels.
        </Text>
      </View>

      {/* 1. Basic Horizontal Styles */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          1. Line Styles (`solid`, `dashed`, `dotted`)
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.isDark ? UX4GColors.neutral900 : UX4GColors.neutral50,
              borderColor: theme.isDark ? UX4GColors.neutral800 : UX4GColors.neutral200,
            },
          ]}
        >
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>
            Solid (Default, thickness=1.0)
          </Text>
          <Ux4gDivider style="solid" />

          <Text style={[styles.label, { color: theme.colors.onSurface, marginTop: 16 }]}>
            Dashed (`style="dashed"`, thickness=2.0)
          </Text>
          <Ux4gDivider style="dashed" thickness={2} />

          <Text style={[styles.label, { color: theme.colors.onSurface, marginTop: 16 }]}>
            Dotted (`style="dotted"`, thickness=2.5)
          </Text>
          <Ux4gDivider style="dotted" thickness={2.5} />
        </View>
      </View>

      {/* 2. Indented Dividers */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          2. Indentations (`startIndent` & `endIndent`)
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.isDark ? UX4GColors.neutral900 : UX4GColors.neutral50,
              borderColor: theme.isDark ? UX4GColors.neutral800 : UX4GColors.neutral200,
            },
          ]}
        >
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>
            Leading Indent (`startIndent={32}`)
          </Text>
          <Ux4gDivider startIndent={32} color={UX4GColors.primary500} thickness={2} />

          <Text style={[styles.label, { color: theme.colors.onSurface, marginTop: 16 }]}>
            Trailing Indent (`endIndent={32}`)
          </Text>
          <Ux4gDivider endIndent={32} color={UX4GColors.secondary600} thickness={2} />

          <Text style={[styles.label, { color: theme.colors.onSurface, marginTop: 16 }]}>
            Symmetrical Indent (`startIndent={24}`, `endIndent={24}`)
          </Text>
          <Ux4gDivider startIndent={24} endIndent={24} color={UX4GColors.green500} thickness={2} />
        </View>
      </View>

      {/* 3. Labeled Dividers */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          3. Centered Labels (`label` & `labelSpacing`)
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.isDark ? UX4GColors.neutral900 : UX4GColors.neutral50,
              borderColor: theme.isDark ? UX4GColors.neutral800 : UX4GColors.neutral200,
            },
          ]}
        >
          <Ux4gDivider label="OR" />

          <View style={{ height: 20 }} />

          <Ux4gDivider
            label="Section Divider with Indents"
            style="dashed"
            startIndent={16}
            endIndent={16}
            color={UX4GColors.primary500}
            labelTextStyle={{ color: UX4GColors.primary500, fontWeight: '700' }}
          />

          <View style={{ height: 20 }} />

          <Ux4gDivider
            label="Custom Spacing (20pt)"
            style="dotted"
            thickness={2}
            labelSpacing={20}
            color={UX4GColors.secondary600}
            labelTextStyle={{ color: UX4GColors.secondary600 }}
          />
        </View>
      </View>

      {/* 4. Vertical Dividers */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          4. Vertical Orientation (`orientation="vertical"`)
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.isDark ? UX4GColors.neutral900 : UX4GColors.neutral50,
              borderColor: theme.isDark ? UX4GColors.neutral800 : UX4GColors.neutral200,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 140,
            },
          ]}
        >
          <View style={styles.verticalCol}>
            <Text style={[styles.subLabel, { color: theme.colors.onSurface }]}>Solid</Text>
            <Ux4gDivider orientation="vertical" thickness={2} />
          </View>

          <View style={styles.verticalCol}>
            <Text style={[styles.subLabel, { color: theme.colors.onSurface }]}>Dashed</Text>
            <Ux4gDivider orientation="vertical" style="dashed" thickness={2} />
          </View>

          <View style={styles.verticalCol}>
            <Text style={[styles.subLabel, { color: theme.colors.onSurface }]}>Dotted</Text>
            <Ux4gDivider orientation="vertical" style="dotted" thickness={2.5} />
          </View>

          <View style={styles.verticalCol}>
            <Text style={[styles.subLabel, { color: theme.colors.onSurface }]}>Labeled</Text>
            <Ux4gDivider
              orientation="vertical"
              label="VS"
              thickness={2}
              color={UX4GColors.primary500}
              labelTextStyle={{ color: UX4GColors.primary500, fontSize: 12, fontWeight: '700' }}
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
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  verticalCol: {
    alignItems: 'center',
    height: '100%',
  },
});
