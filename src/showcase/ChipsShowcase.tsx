import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Ux4gChoiceChip,
  Ux4gFilterChip,
  Ux4gInputChip,
  Ux4gChipGroup,
  Ux4gInputChipField,
  Ux4gInputChipSize,
} from '../components/chips/Chips';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';

export const ChipsShowcase: React.FC = () => {
  const theme = useUx4gTheme();
  const colors = theme.colors;

  // 1. Choice Chips state
  const [selectedChoice, setSelectedChoice] = useState<string>('Flight');
  const [selectedChoiceSmall, setSelectedChoiceSmall] = useState<string>('Economy');
  const [selectedPill, setSelectedPill] = useState<string>('Standard Radius (8px)');
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('Under Review');

  // 2. Filter Chips state
  const [filters, setFilters] = useState<Record<string, boolean>>({
    'Free Wi-Fi': true,
    'Pool': false,
    'Gym': true,
    'Pet Friendly': false,
    'Breakfast Included': true,
  });

  const [smallFilters, setSmallFilters] = useState<Record<string, boolean>>({
    '4+ Stars': true,
    'Superhost': false,
    'Instant Book': true,
    'Self Check-in': false,
  });

  // 3. Input Chips state
  const defaultInputChips = [
    'react-native',
    'ux4g-design-system',
    'typescript',
    'figma-tokens',
  ];
  const [inputChips, setInputChips] = useState<string[]>(defaultInputChips);

  const defaultSizeComparison: Array<{ id: string; text: string; size: Ux4gInputChipSize }> = [
    { id: 'xs', text: 'Size XS (20px)', size: 'xs' },
    { id: 's', text: 'Size S (28px)', size: 's' },
    { id: 'm', text: 'Size M (32px)', size: 'm' },
  ];
  const [sizeChips, setSizeChips] = useState(defaultSizeComparison);

  const handleDismissChip = (chipText: string) => {
    setInputChips((prev) => prev.filter((item) => item !== chipText));
  };

  const handleDismissSizeChip = (id: string) => {
    setSizeChips((prev) => prev.filter((item) => item.id !== id));
  };

  // 4. Chip Group Arrangements states
  const [selectedHorizontalTag, setSelectedHorizontalTag] = useState<string>('Tag #3');
  const [selectedWrapTag, setSelectedWrapTag] = useState<string>('Tokens');

  // 5. Input Chip Field state (free text)
  const [fieldValue, setFieldValue] = useState('');
  const [fieldChips, setFieldChips] = useState<string[]>(['flutter', 'react-native']);

  const handleAddFieldChip = (val: string) => {
    if (!fieldChips.includes(val)) {
      setFieldChips((prev) => [...prev, val]);
    }
  };

  // 6. Input Chip Field state (dropdown)
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

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;
  const activeSmallFiltersCount = Object.values(smallFilters).filter(Boolean).length;

  const renderTrailingBadge = (count: number | string, isSelected: boolean) => (
    <View
      style={[
        styles.badgeBox,
        {
          backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.22)' : (colors.primary ?? '#4F46E5'),
        },
      ]}
    >
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          🍟 Chips Component Suite (`Ux4gChoiceChip`, `Ux4gFilterChip`, `Ux4gInputChip`)
        </Text>
        <Text style={subtitleStyle}>
          100% complete interactive working functionality for all chip cases! Test single choice selections, multi-filter toggling, dynamic tag removal, custom radii, sizes (`xs`, `s`, `m`), and input fields.
        </Text>
      </View>

      {/* 1. Choice Chips */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. Choice Chips (`Ux4gChoiceChip`)</Text>
        <Text style={subtitleStyle}>
          Allows single selection from a set of options. Supports `size = 'm'`, `size = 's'`, custom border radii, and leading/trailing icons.
        </Text>

        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Choice Chips with Trailing Status Badges (`trailingContent`):
          </Text>
          <Ux4gChipGroup
            chips={[
              { text: 'All', count: 62 },
              { text: 'Pending', count: 3 },
              { text: 'Under Review', count: 12 },
              { text: 'Approved', count: 41 },
              { text: 'Rejected', count: 6 },
            ].map((item) => {
              const isSel = selectedStatusTab === item.text;
              return (
                <Ux4gChoiceChip
                  key={item.text}
                  text={item.text}
                  selected={isSel}
                  onClick={() => setSelectedStatusTab(item.text)}
                  size="m"
                  trailingContent={renderTrailingBadge(item.count, isSel)}
                />
              );
            })}
            arrangement="wrap"
          />
          <Text style={[styles.stateMonitorText, { color: colors.onSurface }]}>
            Active Status Filter: <Text style={{ fontWeight: '700', color: colors.primary }}>{selectedStatusTab}</Text>
          </Text>
        </View>

        <View style={[styles.rowSpacing, { marginTop: 18 }]}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Medium Size (`size = 'm'`, 32px height) with Leading Emojis:
          </Text>
          <Ux4gChipGroup
            chips={[
              { text: 'Flight', icon: '✈️' },
              { text: 'Train', icon: '🚆' },
              { text: 'Bus', icon: '🚌' },
              { text: 'Cab', icon: '🚖' },
            ].map((item) => (
              <Ux4gChoiceChip
                key={item.text}
                text={item.text}
                selected={selectedChoice === item.text}
                onClick={() => setSelectedChoice(item.text)}
                size="m"
                leadingContent={<Text style={{ fontSize: 13 }}>{item.icon}</Text>}
              />
            ))}
            arrangement="wrap"
          />
          <Text style={[styles.stateMonitorText, { color: colors.onSurface }]}>
            Active Choice: <Text style={{ fontWeight: '700', color: colors.primary }}>{selectedChoice}</Text>
          </Text>
        </View>

        <View style={[styles.rowSpacing, { marginTop: 18 }]}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Small Size (`size = 's'`, 28px height):
          </Text>
          <Ux4gChipGroup
            chips={['Economy', 'Business', 'First Class', 'Private Jet'].map((item) => (
              <Ux4gChoiceChip
                key={item}
                text={item}
                selected={selectedChoiceSmall === item}
                onClick={() => setSelectedChoiceSmall(item)}
                size="s"
              />
            ))}
            arrangement="wrap"
          />
          <Text style={[styles.stateMonitorText, { color: colors.onSurface }]}>
            Active Tier: <Text style={{ fontWeight: '700', color: colors.primary }}>{selectedChoiceSmall}</Text>
          </Text>
        </View>

        <View style={[styles.rowSpacing, { marginTop: 18 }]}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Custom Border Radius (`borderRadius = 24` Full Pill vs Default):
          </Text>
          <Ux4gChipGroup
            chips={['Standard Radius (8px)', 'Full Pill Radius (24px)'].map((item, idx) => (
              <Ux4gChoiceChip
                key={item}
                text={item}
                selected={selectedPill === item}
                onClick={() => setSelectedPill(item)}
                size="m"
                borderRadius={idx === 1 ? 24 : undefined}
              />
            ))}
            arrangement="wrap"
          />
        </View>

        <View style={[styles.rowSpacing, { marginTop: 18 }]}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Disabled State (`enabled = false`):
          </Text>
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
          Used to filter content by attributes. Selected chips highlight with primary background opacity (`0.08`) and primary border.
        </Text>

        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Medium Filter Chips (`size = 'm'`) with Leading Checkmark Indicator:
          </Text>
          <Ux4gChipGroup
            chips={Object.entries(filters).map(([name, isSelected]) => (
              <Ux4gFilterChip
                key={name}
                text={name}
                selected={isSelected}
                leadingContent={
                  isSelected ? (
                    <Text style={{ fontSize: 13, fontWeight: '700', color: colors.primary }}>✓</Text>
                  ) : undefined
                }
                onClick={() =>
                  setFilters((prev) => ({ ...prev, [name]: !prev[name] }))
                }
              />
            ))}
            arrangement="wrap"
          />
          <Text style={[styles.stateMonitorText, { color: colors.onSurface }]}>
            Active Filters ({activeFiltersCount}):{' '}
            <Text style={{ fontWeight: '700', color: colors.primary }}>
              {Object.entries(filters)
                .filter(([_, sel]) => sel)
                .map(([k]) => k)
                .join(', ') || 'None'}
            </Text>
          </Text>
        </View>

        <View style={[styles.rowSpacing, { marginTop: 18 }]}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Small Filter Chips (`size = 's'`) Independent State:
          </Text>
          <Ux4gChipGroup
            chips={Object.entries(smallFilters).map(([name, isSelected]) => (
              <Ux4gFilterChip
                key={name}
                text={name}
                selected={isSelected}
                size="s"
                onClick={() =>
                  setSmallFilters((prev) => ({ ...prev, [name]: !prev[name] }))
                }
              />
            ))}
            arrangement="wrap"
          />
          <Text style={[styles.stateMonitorText, { color: colors.onSurface }]}>
            Small Active ({activeSmallFiltersCount}):{' '}
            <Text style={{ fontWeight: '700', color: colors.primary }}>
              {Object.entries(smallFilters)
                .filter(([_, sel]) => sel)
                .map(([k]) => k)
                .join(', ') || 'None'}
            </Text>
          </Text>
        </View>
      </View>

      {/* 3. Input Chips */}
      <View style={cardStyle}>
        <View style={styles.titleRow}>
          <Text style={titleStyle}>3. Input Chips (`Ux4gInputChip`)</Text>
          {inputChips.length < defaultInputChips.length && (
            <TouchableOpacity
              onPress={() => setInputChips(defaultInputChips)}
              style={[styles.resetBtn, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.resetBtnText}>↺ Reset Tags</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={subtitleStyle}>
          Compact tags representing user input with trailing close/dismiss (`✕`) action. Try dismissing them!
        </Text>

        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Interactive Dismissible Input Chips (`size = 'm'`):
          </Text>
          {inputChips.length === 0 ? (
            <View style={styles.emptyAlertBox}>
              <Text style={{ color: colors.error, fontWeight: '600' }}>
                All tags dismissed! Click "↺ Reset Tags" above to restore.
              </Text>
            </View>
          ) : (
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
          )}
        </View>

        <View style={[styles.rowSpacing, { marginTop: 22 }]}>
          <View style={styles.titleRow}>
            <Text style={[styles.label, { color: colors.onSurface, marginBottom: 0 }]}>
              All Sizes Comparison (`xs` 20px, `s` 28px, `m` 32px):
            </Text>
            {sizeChips.length < defaultSizeComparison.length && (
              <TouchableOpacity
                onPress={() => setSizeChips(defaultSizeComparison)}
                style={[styles.resetBtnSmall, { borderColor: colors.primary }]}
              >
                <Text style={{ fontSize: 11, color: colors.primary, fontWeight: '600' }}>↺ Restore Sizes</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginTop: 8 }}>
            {sizeChips.length === 0 ? (
              <Text style={{ fontStyle: 'italic', color: theme.isDark ? '#A1A1AA' : '#71717A' }}>
                All size comparison chips dismissed.
              </Text>
            ) : (
              <Ux4gChipGroup
                chips={sizeChips.map((item) => (
                  <Ux4gInputChip
                    key={item.id}
                    text={item.text}
                    size={item.size}
                    onDismiss={() => handleDismissSizeChip(item.id)}
                  />
                ))}
              />
            )}
          </View>
        </View>
      </View>

      {/* 4. Chip Group Arrangements */}
      <View style={cardStyle}>
        <Text style={titleStyle}>4. Chip Group Arrangements (`Ux4gChipGroup`)</Text>
        <Text style={subtitleStyle}>
          Arranges multiple chips inside either a horizontal touch/mouse drag `ScrollView` (`horizontal`) or wrapping multi-line grid (`wrap`).
        </Text>

        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Arrangement: `horizontal` (Scroll horizontally across 10 tags):
          </Text>
          <Ux4gChipGroup
            arrangement="horizontal"
            spacing={10}
            chips={Array.from({ length: 10 }, (_, i) => `Tag #${i + 1}`).map((t) => (
              <Ux4gChoiceChip
                key={t}
                text={t}
                selected={selectedHorizontalTag === t}
                onClick={() => setSelectedHorizontalTag(t)}
              />
            ))}
          />
          <Text style={[styles.stateMonitorText, { color: colors.onSurface }]}>
            Selected Horizontal: <Text style={{ fontWeight: '700', color: colors.primary }}>{selectedHorizontalTag}</Text>
          </Text>
        </View>

        <View style={[styles.rowSpacing, { marginTop: 18 }]}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Arrangement: `wrap` (Multi-line grid with `spacing = 10`, `runSpacing = 10`):
          </Text>
          <Ux4gChipGroup
            arrangement="wrap"
            spacing={10}
            runSpacing={10}
            chips={[
              'Accessibility',
              'Performance',
              'Animation',
              'Tokens',
              'Components',
              'Testing',
              'Responsive Design',
              'State Management',
            ].map((t) => (
              <Ux4gFilterChip
                key={t}
                text={t}
                selected={selectedWrapTag === t}
                onClick={() => setSelectedWrapTag(t)}
              />
            ))}
          />
          <Text style={[styles.stateMonitorText, { color: colors.onSurface }]}>
            Selected Wrap Filter: <Text style={{ fontWeight: '700', color: colors.primary }}>{selectedWrapTag}</Text>
          </Text>
        </View>
      </View>

      {/* 5. Input Chip Field (Free Text Entry) */}
      <View style={cardStyle}>
        <Text style={titleStyle}>5. Input Chip Field (`Ux4gInputChipField` - Free Text Mode)</Text>
        <Text style={subtitleStyle}>
          Type text inside the field below and tap the `+` icon (or press Return on keyboard) to dynamically append a new chip tag below!
        </Text>
        <View style={styles.rowSpacing}>
          <Ux4gInputChipField
            value={fieldValue}
            onValueChange={setFieldValue}
            onAddChip={handleAddFieldChip}
            placeholder="Type tag & press + icon or Return..."
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
        <Text style={[styles.stateMonitorText, { color: colors.onSurface }]}>
          Field Tags Count: <Text style={{ fontWeight: '700', color: colors.primary }}>{fieldChips.length}</Text> ({fieldChips.join(', ') || 'None'})
        </Text>
      </View>

      {/* 6. Input Chip Field (Dropdown Mode) */}
      <View style={cardStyle}>
        <Text style={titleStyle}>6. Input Chip Field (`Ux4gInputChipField` - Dropdown Mode)</Text>
        <Text style={subtitleStyle}>
          When `isDropdown = true`, tapping the trigger box pops open a selectable dropdown options menu. Selecting an item adds it to the active chips below.
        </Text>
        <View style={styles.rowSpacing}>
          <Ux4gInputChipField
            value={dropdownValue}
            onValueChange={setDropdownValue}
            onAddChip={handleAddDropdownChip}
            isDropdown={true}
            placeholder="Tap to open selection dropdown..."
            dropdownOptions={[
              'Design Systems',
              'React Native',
              'Flutter',
              'UI/UX Engineering',
              'Component Libraries',
              'State Management',
              'Figma Token Studio',
            ]}
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
        <Text style={[styles.stateMonitorText, { color: colors.onSurface }]}>
          Dropdown Tags Count: <Text style={{ fontWeight: '700', color: colors.primary }}>{dropdownChips.length}</Text> ({dropdownChips.join(', ') || 'None'})
        </Text>
      </View>

      {/* 7. Status Tabs / Choice Chips with Trailing Badges */}
      <View style={cardStyle}>
        <Text style={titleStyle}>7. Choice Chips with Trailing Status Badges (`trailingContent`)</Text>
        <Text style={subtitleStyle}>
          Replicates status filter tabs with circular/pill count badges (`All 62`, `Pending 3`, `Under Review 12`, `Approved 41`, `Rejected 6`).
        </Text>
        <View style={styles.rowSpacing}>
          <Ux4gChipGroup
            chips={[
              { text: 'All', count: 62 },
              { text: 'Pending', count: 3 },
              { text: 'Under Review', count: 12 },
              { text: 'Approved', count: 41 },
              { text: 'Rejected', count: 6 },
            ].map((item) => {
              const isSel = selectedStatusTab === item.text;
              return (
                <Ux4gChoiceChip
                  key={`bottom-${item.text}`}
                  text={item.text}
                  selected={isSel}
                  onClick={() => setSelectedStatusTab(item.text)}
                  size="m"
                  trailingContent={renderTrailingBadge(item.count, isSel)}
                />
              );
            })}
            arrangement="wrap"
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
    paddingBottom: 64,
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
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  resetBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  resetBtnSmall: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  rowSpacing: {
    marginTop: 14,
  },
  stateMonitorText: {
    fontSize: 13,
    marginTop: 10,
    fontStyle: 'italic',
  },
  emptyAlertBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  badgeBox: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 22,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
