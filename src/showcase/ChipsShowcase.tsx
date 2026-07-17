import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Ux4gChoiceChip,
  Ux4gFilterChip,
  Ux4gInputChip,
  Ux4gChipGroup,
  Ux4gInputChipField,
} from '../components/chips/Chips';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';

export const ChipsShowcase: React.FC = () => {
  const theme = useUx4gTheme();
  const colors = theme.colors;

  // Choice Chips state
  const [selectedChoice, setSelectedChoice] = useState<string>('Flight');
  const [selectedChoiceSmall, setSelectedChoiceSmall] = useState<string>('Economy');

  // Filter Chips state
  const [filters, setFilters] = useState<Record<string, boolean>>({
    'Free Wi-Fi': true,
    'Pool': false,
    'Gym': true,
    'Pet Friendly': false,
  });

  // Input Chips state
  const [inputChips, setInputChips] = useState<string[]>([
    'react-native',
    'ux4g-design-system',
    'typescript',
  ]);

  const handleDismissChip = (chipText: string) => {
    setInputChips((prev) => prev.filter((item) => item !== chipText));
  };

  // Input Chip Field state (free text)
  const [fieldValue, setFieldValue] = useState('');
  const [fieldChips, setFieldChips] = useState<string[]>(['flutter', 'react-native']);

  const handleAddFieldChip = (val: string) => {
    if (!fieldChips.includes(val)) {
      setFieldChips((prev) => [...prev, val]);
    }
  };

  // Input Chip Field state (dropdown)
  const [dropdownValue, setDropdownValue] = useState('');
  const [dropdownChips, setDropdownChips] = useState<string[]>(['Design Systems']);

  const handleAddDropdownChip = (val: string) => {
    if (!dropdownChips.includes(val)) {
      setDropdownChips((prev) => [...prev, val]);
    }
  };

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
          🍟 Chips Component (`Ux4gChoiceChip`, `Ux4gFilterChip`, `Ux4gInputChip`, etc.)
        </Text>
        <Text style={subtitleStyle}>
          Ported from Flutter `chips.dart`. Demonstrates choice selection, filter toggling, input tag management, chip groups (`horizontal` and `wrap`), and full input field integration.
        </Text>
      </View>

      {/* 1. Choice Chips */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. Choice Chips (`Ux4gChoiceChip`)</Text>
        <Text style={subtitleStyle}>
          Allows single selection from a set of options. Supports `size = 'm'` and `size = 's'`.
        </Text>
        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>Medium Size (`size = 'm'`):</Text>
          <Ux4gChipGroup
            chips={['Flight', 'Train', 'Bus', 'Cab'].map((item) => (
              <Ux4gChoiceChip
                key={item}
                text={item}
                selected={selectedChoice === item}
                onClick={() => setSelectedChoice(item)}
                size="m"
              />
            ))}
            arrangement="wrap"
          />
        </View>

        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>Small Size (`size = 's'`):</Text>
          <Ux4gChipGroup
            chips={['Economy', 'Business', 'First Class'].map((item) => (
              <Ux4gChoiceChip
                key={item}
                text={item}
                selected={selectedChoiceSmall === item}
                onClick={() => setSelectedChoiceSmall(item)}
                size="s"
              />
            ))}
            arrangement="horizontal"
          />
        </View>

        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>Disabled State (`enabled = false`):</Text>
          <Ux4gChipGroup
            chips={[
              <Ux4gChoiceChip
                key="dis-1"
                text="Disabled Selected"
                selected={true}
                onClick={() => {}}
                enabled={false}
              />,
              <Ux4gChoiceChip
                key="dis-2"
                text="Disabled Unselected"
                selected={false}
                onClick={() => {}}
                enabled={false}
              />,
            ]}
          />
        </View>
      </View>

      {/* 2. Filter Chips */}
      <View style={cardStyle}>
        <Text style={titleStyle}>2. Filter Chips (`Ux4gFilterChip`)</Text>
        <Text style={subtitleStyle}>
          Used to filter content by attributes. Selected chips highlight with primary opacity (0.08) and primary border/text.
        </Text>
        <View style={styles.rowSpacing}>
          <Ux4gChipGroup
            chips={Object.entries(filters).map(([name, isSelected]) => (
              <Ux4gFilterChip
                key={name}
                text={name}
                selected={isSelected}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, [name]: !prev[name] }))
                }
              />
            ))}
            arrangement="wrap"
          />
        </View>
        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>Small Filter Chips (`size = 's'`):</Text>
          <Ux4gChipGroup
            chips={['4+ Stars', 'Superhost', 'Instant Book'].map((item, idx) => (
              <Ux4gFilterChip
                key={item}
                text={item}
                selected={idx === 0}
                size="s"
                onClick={() => {}}
              />
            ))}
          />
        </View>
      </View>

      {/* 3. Input Chips */}
      <View style={cardStyle}>
        <Text style={titleStyle}>3. Input Chips (`Ux4gInputChip`)</Text>
        <Text style={subtitleStyle}>
          Compact tags representing user input with trailing close/dismiss (`✕`) action. Supports `xs`, `s`, and `m` sizes.
        </Text>
        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>Interactive Input Chips (`size = 'm'`):</Text>
          <Ux4gChipGroup
            chips={inputChips.map((chipText) => (
              <Ux4gInputChip
                key={chipText}
                text={chipText}
                onDismiss={() => handleDismissChip(chipText)}
              />
            ))}
            arrangement="wrap"
          />
        </View>

        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>All Sizes Comparison (`xs`, `s`, `m`):</Text>
          <Ux4gChipGroup
            chips={[
              <Ux4gInputChip key="xs" text="Size XS" size="xs" onDismiss={() => {}} />,
              <Ux4gInputChip key="s" text="Size S" size="s" onDismiss={() => {}} />,
              <Ux4gInputChip key="m" text="Size M" size="m" onDismiss={() => {}} />,
            ]}
          />
        </View>
      </View>

      {/* 4. Chip Group Arrangements */}
      <View style={cardStyle}>
        <Text style={titleStyle}>4. Chip Group (`Ux4gChipGroup`)</Text>
        <Text style={subtitleStyle}>
          Arranges multiple chips inside either a horizontal touch/mouse drag `ScrollView` (`horizontal`) or wrapping multi-line grid (`wrap`).
        </Text>
        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>Arrangement: `horizontal` (Scrollable):</Text>
          <Ux4gChipGroup
            arrangement="horizontal"
            spacing={10}
            chips={['Tag #1', 'Tag #2', 'Tag #3', 'Tag #4', 'Tag #5', 'Tag #6', 'Tag #7'].map((t) => (
              <Ux4gChoiceChip key={t} text={t} selected={t === 'Tag #2'} onClick={() => {}} />
            ))}
          />
        </View>
        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>Arrangement: `wrap` (Multi-line grid):</Text>
          <Ux4gChipGroup
            arrangement="wrap"
            spacing={8}
            runSpacing={8}
            chips={['Accessibility', 'Performance', 'Animation', 'Tokens', 'Components', 'Testing'].map((t) => (
              <Ux4gFilterChip key={t} text={t} selected={t === 'Tokens'} onClick={() => {}} />
            ))}
          />
        </View>
      </View>

      {/* 5. Input Chip Field (Free Text Entry) */}
      <View style={cardStyle}>
        <Text style={titleStyle}>5. Input Chip Field (`Ux4gInputChipField` - Free Text)</Text>
        <Text style={subtitleStyle}>
          Enter text and tap the `+` icon or press Enter on keyboard to append a new chip below.
        </Text>
        <Ux4gInputChipField
          value={fieldValue}
          onValueChange={setFieldValue}
          onAddChip={handleAddFieldChip}
          placeholder="Type tag & press + icon..."
          arrangement="wrap"
          chips={fieldChips.map((t) => (
            <Ux4gInputChip
              key={t}
              text={t}
              onDismiss={() => setFieldChips((prev) => prev.filter((i) => i !== t))}
            />
          ))}
        />
      </View>

      {/* 6. Input Chip Field (Dropdown Mode) */}
      <View style={cardStyle}>
        <Text style={titleStyle}>6. Input Chip Field (`Ux4gInputChipField` - Dropdown Mode)</Text>
        <Text style={subtitleStyle}>
          When `isDropdown = true`, tapping the field opens a popup selection menu.
        </Text>
        <Ux4gInputChipField
          value={dropdownValue}
          onValueChange={setDropdownValue}
          onAddChip={handleAddDropdownChip}
          isDropdown={true}
          placeholder="Choose category from dropdown..."
          dropdownOptions={['Design Systems', 'React Native', 'Flutter', 'UI/UX Engineering', 'Component Libraries']}
          arrangement="wrap"
          chips={dropdownChips.map((t) => (
            <Ux4gInputChip
              key={t}
              text={t}
              onDismiss={() => setDropdownChips((prev) => prev.filter((i) => i !== t))}
            />
          ))}
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
    padding: 16,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  subText: {
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  rowSpacing: {
    marginTop: 14,
  },
});
