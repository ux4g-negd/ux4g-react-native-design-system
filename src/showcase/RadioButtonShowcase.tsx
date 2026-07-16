import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';
import { UX4GColors } from '../foundation/colors';
import { Ux4gRadioButton } from '../components/radio-button/RadioButton';
import { Ux4gButton } from '../components/button/Button';

export const RadioButtonShowcase: React.FC = () => {
  const theme = useUx4gTheme();

  // Basic Group State
  const [basicSelection, setBasicSelection] = useState<string>('option-1');

  // Sizes State
  const [sizeSelection, setSizeSelection] = useState<string>('medium');

  // Status Group State
  const [statusSelection, setStatusSelection] = useState<string>('error');

  // Description Variants State
  const [descSelection, setDescSelection] = useState<string>('helper');

  // Horizontal Grid State
  const [horizontalSelection, setHorizontalSelection] = useState<string>('helper');

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          UX4G RadioButton Showcase
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: theme.isDark
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(0, 0, 0, 0.6)',
            },
          ]}
        >
          Direct port of `radioButton.dart` (`Ux4gRadioButton`) featuring
          radio groups, sizes, status rings, required mark (`*`), and description variants.
        </Text>
      </View>

      {/* 1. Basic Radio Group & Interactive States */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          1. Basic Radio Group Selection
        </Text>
        <Text
          style={[
            styles.sectionDesc,
            { color: theme.isDark ? UX4GColors.neutral300 : UX4GColors.neutral600 },
          ]}
        >
          Select an option below. Selected: {basicSelection}
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
          <Ux4gRadioButton
            value="option-1"
            groupValue={basicSelection}
            onChanged={(val) => setBasicSelection(val)}
            label="Option 1: Individual Plan"
            description="Access for a single user with standard features"
            isRequired
          />
          <View style={styles.divider} />
          <Ux4gRadioButton
            value="option-2"
            groupValue={basicSelection}
            onChanged={(val) => setBasicSelection(val)}
            label="Option 2: Team Plan"
            description="Up to 10 users with shared cloud workspaces"
          />
          <View style={styles.divider} />
          <Ux4gRadioButton
            value="option-3"
            groupValue={basicSelection}
            onChanged={(val) => setBasicSelection(val)}
            label="Option 3: Enterprise Plan"
            description="Unlimited users, dedicated support, and SSO"
          />
        </View>
      </View>

      {/* 2. Sizes */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          2. Sizes (`small`, `medium`, `large`)
        </Text>
        <Text
          style={[
            styles.sectionDesc,
            { color: theme.isDark ? UX4GColors.neutral300 : UX4GColors.neutral600 },
          ]}
        >
          Supports small (16pt), medium (20pt), and large (24pt) dimensions.
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
          <Ux4gRadioButton
            size="small"
            value="small"
            groupValue={sizeSelection}
            onChanged={(val) => setSizeSelection(val)}
            label="Small Radio (16pt)"
            description="Compact spacing and small typography"
          />
          <View style={styles.divider} />
          <Ux4gRadioButton
            size="medium"
            value="medium"
            groupValue={sizeSelection}
            onChanged={(val) => setSizeSelection(val)}
            label="Medium Radio (20pt - Default)"
            description="Standard sizing for general UI forms"
          />
          <View style={styles.divider} />
          <Ux4gRadioButton
            size="large"
            value="large"
            groupValue={sizeSelection}
            onChanged={(val) => setSizeSelection(val)}
            label="Large Radio (24pt)"
            description="Generous touch target and prominent label"
          />
        </View>
      </View>

      {/* 3. Status Rings & Colors */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          3. Visual Status Rings (`error`, `warning`, `success`)
        </Text>
        <Text
          style={[
            styles.sectionDesc,
            { color: theme.isDark ? UX4GColors.neutral300 : UX4GColors.neutral600 },
          ]}
        >
          Ring color driven independently or synced with form status.
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
          <Ux4gRadioButton
            status="error"
            value="error"
            groupValue={statusSelection}
            onChanged={(val) => setStatusSelection(val)}
            label="Error Status Radio"
            description="Ring styled with error color palette"
          />
          <View style={styles.divider} />
          <Ux4gRadioButton
            status="warning"
            value="warning"
            groupValue={statusSelection}
            onChanged={(val) => setStatusSelection(val)}
            label="Warning Status Radio"
            description="Ring styled with warning color palette"
          />
          <View style={styles.divider} />
          <Ux4gRadioButton
            status="success"
            value="success"
            groupValue={statusSelection}
            onChanged={(val) => setStatusSelection(val)}
            label="Success Status Radio"
            description="Ring styled with success color palette"
          />
          <View style={styles.divider} />
          <Ux4gRadioButton
            color={UX4GColors.secondary600}
            value="custom"
            groupValue={statusSelection}
            onChanged={(val) => setStatusSelection(val)}
            label="Custom Direct Color Override"
            description="Using explicit foundation color (UX4GColors.secondary600)"
          />
        </View>
      </View>

      {/* 4. Description Variants */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          4. Description Variants with Icons
        </Text>
        <Text
          style={[
            styles.sectionDesc,
            { color: theme.isDark ? UX4GColors.neutral300 : UX4GColors.neutral600 },
          ]}
        >
          Helper, Error, Warning, and Success descriptions with status icons.
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
          <Ux4gRadioButton
            descriptionVariant="helper"
            value="helper"
            groupValue={descSelection}
            onChanged={(val) => setDescSelection(val)}
            label="Helper Description"
            description="This is standard informational text below the label."
          />
          <View style={styles.divider} />
          <Ux4gRadioButton
            descriptionVariant="error"
            value="error"
            groupValue={descSelection}
            onChanged={(val) => setDescSelection(val)}
            label="Error Description"
            description="This selection has a validation conflict that must be fixed."
          />
          <View style={styles.divider} />
          <Ux4gRadioButton
            descriptionVariant="warning"
            value="warning"
            groupValue={descSelection}
            onChanged={(val) => setDescSelection(val)}
            label="Warning Description"
            description="Proceed with caution if choosing this configuration."
          />
          <View style={styles.divider} />
          <Ux4gRadioButton
            descriptionVariant="success"
            value="success"
            groupValue={descSelection}
            onChanged={(val) => setDescSelection(val)}
            label="Success Description"
            description="Configuration verified and ready for deployment."
          />
        </View>

        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.onBackground, marginTop: 20 },
          ]}
        >
          Horizontal Status States (`helper`, `error`, `warning`, `success`)
        </Text>
        <Text
          style={[
            styles.sectionDesc,
            { color: theme.isDark ? UX4GColors.neutral300 : UX4GColors.neutral600 },
          ]}
        >
          Clean side-by-side comparison of all 4 description variant status icons with check/radio and status rings.
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalRowContainer}
          >
            <View style={styles.horizontalGridItem}>
              <Ux4gRadioButton
                value="helper"
                groupValue={horizontalSelection}
                onChanged={(val) => setHorizontalSelection(val)}
                label="Label"
                description="Default description"
                descriptionVariant="helper"
              />
            </View>
            <View style={styles.horizontalGridItem}>
              <Ux4gRadioButton
                status="error"
                value="error"
                groupValue={horizontalSelection}
                onChanged={(val) => setHorizontalSelection(val)}
                label="Label"
                description="Error text"
                descriptionVariant="error"
              />
            </View>
            <View style={styles.horizontalGridItem}>
              <Ux4gRadioButton
                status="warning"
                value="warning"
                groupValue={horizontalSelection}
                onChanged={(val) => setHorizontalSelection(val)}
                label="Label"
                description="Warning text"
                descriptionVariant="warning"
              />
            </View>
            <View style={styles.horizontalGridItem}>
              <Ux4gRadioButton
                status="success"
                value="success"
                groupValue={horizontalSelection}
                onChanged={(val) => setHorizontalSelection(val)}
                label="Label"
                description="Success text"
                descriptionVariant="success"
              />
            </View>
          </ScrollView>
        </View>
      </View>

      {/* 5. Disabled State */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          5. Disabled States (`enabled={false}`)
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
          <Ux4gRadioButton
            enabled={false}
            value="selected-disabled"
            groupValue="selected-disabled"
            label="Disabled Selected Option"
            description="Shows 38% opacity ring and inner dot with 10% fill background"
          />
          <View style={styles.divider} />
          <Ux4gRadioButton
            enabled={false}
            value="unselected-disabled"
            groupValue="selected-disabled"
            label="Disabled Unselected Option"
            description="Shows muted 10% background fill with transparent border"
          />
        </View>
      </View>

      <View style={styles.footerActions}>
        <Ux4gButton
          text="Reset Selections"
          variant="outline"
          onPress={() => {
            setBasicSelection('option-1');
            setSizeSelection('medium');
            setStatusSelection('error');
            setDescSelection('helper');
          }}
        />
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
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 14,
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  divider: {
    height: 12,
  },
  footerActions: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
  horizontalRowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  horizontalGridItem: {
    marginRight: 28,
    minWidth: 170,
  },
});
