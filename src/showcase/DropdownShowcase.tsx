import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Ux4gSelectionDropdown,
  Ux4gActionDropdown,
  Ux4gDropdownOption,
  Ux4gActionDropdownOption,
} from '../components/dropdown/Dropdown';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';
import { Ux4gIcons } from '../foundation/icons';

export const DropdownShowcase: React.FC = () => {
  const theme = useUx4gTheme();
  const colors = theme.colors;

  // 1. Single Selection State
  const [singleSelected, setSingleSelected] = useState<string[]>(['flight']);

  const singleOptions: Ux4gDropdownOption[] = [
    { id: 'flight', label: '✈️ Flight Booking' },
    { id: 'hotel', label: '🏨 Hotel Reservation' },
    { id: 'cab', label: '🚖 Cab Service' },
    { id: 'train', label: '🚆 Train Ticket' },
    { id: 'cruise', label: '🚢 Cruise Vacation' },
  ];

  // 2. Multi Selection with Search State
  const [multiSelected, setMultiSelected] = useState<string[]>(['react-native', 'typescript']);

  const multiOptions: Ux4gDropdownOption[] = [
    { id: 'react-native', label: 'React Native' },
    { id: 'flutter', label: 'Flutter' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'swift', label: 'Swift / iOS' },
    { id: 'kotlin', label: 'Kotlin / Android' },
    { id: 'design-systems', label: 'Design Systems Architecture' },
    { id: 'figma-tokens', label: 'Figma Token Studio' },
    { id: 'redux', label: 'Redux State Management' },
    { id: 'graphql', label: 'GraphQL API' },
  ];

  // 3. Size Variations States
  const [smallSelected, setSmallSelected] = useState<string[]>(['hotel']);
  const [mediumSelected, setMediumSelected] = useState<string[]>(['flight']);
  const [largeSelected, setLargeSelected] = useState<string[]>(['cab']);

  // 4. Status Verification States (Interactive Error & Disabled)
  const [errorSelected, setErrorSelected] = useState<string[]>([]);
  const [disabledSelected, setDisabledSelected] = useState<string[]>(['flight']);

  // 5. Action Dropdown State
  const [lastAction, setLastAction] = useState<string>('None selected');
  const [activeActionId, setActiveActionId] = useState<string>('edit');

  const actionOptions: Ux4gActionDropdownOption[] = [
    { id: 'edit', label: 'Edit Document', showTrailingArrow: false },
    { id: 'duplicate', label: 'Duplicate File', showTrailingArrow: false },
    { id: 'share', label: 'Share via Email...', showTrailingArrow: true },
    { id: 'archive', label: 'Archive Project', showTrailingArrow: false },
    { id: 'delete', label: 'Delete Item', showTrailingArrow: false },
  ];

  // 6. Search Filter Types Comparison States
  const [startsWithSelected, setStartsWithSelected] = useState<string[]>([]);
  const [containsSelected, setContainsSelected] = useState<string[]>([]);

  const countryOptions: Ux4gDropdownOption[] = [
    { id: 'ind', label: '🇮🇳 India' },
    { id: 'ina', label: '🇮🇩 Indonesia' },
    { id: 'irl', label: '🇮🇪 Ireland' },
    { id: 'isl', label: '🇮🇸 Iceland' },
    { id: 'usa', label: '🇺🇸 United States' },
    { id: 'uk', label: '🇬🇧 United Kingdom' },
    { id: 'uae', label: '🇦🇪 United Arab Emirates' },
    { id: 'aus', label: '🇦🇺 Australia' },
    { id: 'can', label: '🇨🇦 Canada' },
  ];

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

  const isErrorState = errorSelected.length === 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          🔽 Dropdown Component (`Ux4gSelectionDropdown` & `Ux4gActionDropdown`)
        </Text>
        <Text style={subtitleStyle}>
          All dropdown examples below are 100% interactive with complete working state! Try selecting options, searching inside overlay menus, adding/removing multi-select chips, and testing dynamic form validation.
        </Text>
      </View>

      {/* 1. Selection Dropdown - Single Mode */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. Single Selection (`mode = 'single'`) </Text>
        <Text style={subtitleStyle}>
          Standard single choice selection box (`size = 'm'`). Tapping an option automatically updates state and closes the anchored overlay menu.
        </Text>
        <View style={styles.rowSpacing}>
          <Ux4gSelectionDropdown
            label="Travel Service Category"
            description="Choose your primary booking preference."
            placeholder="Please choose service..."
            options={singleOptions}
            selectedOptionIds={singleSelected}
            onSelectionChange={setSingleSelected}
            size="m"
            mode="single"
            status="defaultStatus"
          />
        </View>
        <Text style={[styles.stateMonitorText, { color: colors.onSurface }]}>
          Current State: <Text style={{ fontWeight: '700', color: colors.primary }}>{singleSelected[0] || 'None'}</Text>
        </Text>
      </View>

      {/* 2. Selection Dropdown - Multi Mode + Search Enabled */}
      <View style={cardStyle}>
        <Text style={titleStyle}>2. Multi Selection + Interactive Search (`searchEnabled = true`)</Text>
        <Text style={subtitleStyle}>
          Allows selecting multiple items (`mode = 'multi'`) and displays selected tags via `Ux4gInputChip` in the trigger box. Includes real-time search filtering in the overlay.
        </Text>
        <View style={styles.rowSpacing}>
          <Ux4gSelectionDropdown
            label="Tech Stack & Competencies"
            description="Tap chips to dismiss or open menu to search and add tags."
            placeholder="Choose competencies..."
            options={multiOptions}
            selectedOptionIds={multiSelected}
            onSelectionChange={setMultiSelected}
            size="m"
            mode="multi"
            searchEnabled={true}
            filterType="contains"
          />
        </View>
        <Text style={[styles.stateMonitorText, { color: colors.onSurface }]}>
          Selected Tags Count: <Text style={{ fontWeight: '700', color: colors.primary }}>{multiSelected.length}</Text> ({multiSelected.join(', ')})
        </Text>
      </View>

      {/* 3. Dropdown Sizes Comparison */}
      <View style={cardStyle}>
        <Text style={titleStyle}>3. Sizes Comparison (`s`, `m`, `l`)</Text>
        <Text style={subtitleStyle}>
          Fully interactive size variations matching Figma / Flutter dimension tokens.
        </Text>

        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>Small Size (`size = 's'`, 32px height):</Text>
          <Ux4gSelectionDropdown
            placeholder="Small dropdown..."
            options={singleOptions}
            selectedOptionIds={smallSelected}
            onSelectionChange={setSmallSelected}
            size="s"
          />
        </View>

        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>Medium Size (`size = 'm'`, 40px height):</Text>
          <Ux4gSelectionDropdown
            placeholder="Medium dropdown..."
            options={singleOptions}
            selectedOptionIds={mediumSelected}
            onSelectionChange={setMediumSelected}
            size="m"
          />
        </View>

        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>Large Size (`size = 'l'`, 48px height):</Text>
          <Ux4gSelectionDropdown
            placeholder="Large dropdown..."
            options={singleOptions}
            selectedOptionIds={largeSelected}
            onSelectionChange={setLargeSelected}
            size="l"
          />
        </View>
      </View>

      {/* 4. Status Verification (Dynamic Error & Disabled States) */}
      <View style={cardStyle}>
        <Text style={titleStyle}>4. Interactive Status Validation (`error` vs `disabled`)</Text>
        <Text style={subtitleStyle}>
          Notice how the error dropdown dynamically turns valid (`defaultStatus`) right after you pick an option!
        </Text>

        <View style={styles.rowSpacing}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Dynamic Validation State (`status = '{isErrorState ? 'error' : 'defaultStatus'}'`):
          </Text>
          <Ux4gSelectionDropdown
            label="Required Destination Field"
            description={
              isErrorState
                ? '⚠️ Required: Please pick a service to clear this validation error.'
                : '✅ Excellent! Field requirement satisfied.'
            }
            placeholder="Click to select & clear error..."
            options={singleOptions}
            selectedOptionIds={errorSelected}
            onSelectionChange={setErrorSelected}
            status={isErrorState ? 'error' : 'defaultStatus'}
          />
        </View>

        <View style={[styles.rowSpacing, { marginTop: 22 }]}>
          <Text style={[styles.label, { color: colors.onSurface }]}>
            Disabled / Locked State (`status = 'disabled'`):
          </Text>
          <Ux4gSelectionDropdown
            label="Locked Tier Selection"
            description="🔒 This dropdown is read-only and cannot be modified."
            placeholder="Disabled dropdown..."
            options={singleOptions}
            selectedOptionIds={disabledSelected}
            onSelectionChange={setDisabledSelected}
            status="disabled"
          />
        </View>
      </View>

      {/* 5. Action Dropdown (Floating Action Menu) */}
      <View style={cardStyle}>
        <Text style={titleStyle}>5. Action Dropdown (`Ux4gActionDropdown`)</Text>
        <Text style={subtitleStyle}>
          Trigger a floating action menu attached to any custom button. Tracks active item (`selectedOptionId`).
        </Text>
        <View style={[styles.rowSpacing, styles.actionRow]}>
          <Ux4gActionDropdown
            options={actionOptions}
            selectedOptionId={activeActionId}
            onOptionClick={(opt) => {
              setLastAction(opt.label);
              setActiveActionId(opt.id);
            }}
            triggerBuilder={(toggle) => (
              <TouchableOpacity
                onPress={toggle}
                activeOpacity={0.8}
                style={[
                  styles.actionButton,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={styles.actionButtonText}>⚙️ Actions Menu</Text>
                {Ux4gIcons.arrowDropDown({ size: 18, color: '#FFFFFF' })}
              </TouchableOpacity>
            )}
          />
          <View style={styles.actionLogBox}>
            <Text style={[styles.actionResult, { color: colors.onSurface }]}>
              Last Action: <Text style={{ fontWeight: '700', color: colors.primary }}>{lastAction}</Text>
            </Text>
            <Text style={[styles.actionResultSmall, { color: theme.isDark ? '#A1A1AA' : '#71717A' }]}>
              Active Option ID: `{activeActionId}`
            </Text>
          </View>
        </View>
      </View>

      {/* 6. Search Filter Types Comparison */}
      <View style={cardStyle}>
        <Text style={titleStyle}>6. Search Filter Modes (`filterType` Comparison)</Text>
        <Text style={subtitleStyle}>
          Explore the difference between `startsWith` vs `contains` search query algorithms.
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gSelectionDropdown
            label="Filter Type: `startsWith` (Match beginning of label)"
            description="Try typing 'in' in search box -> matches India, Indonesia, Ireland, Iceland."
            placeholder="Search with startsWith..."
            options={countryOptions}
            selectedOptionIds={startsWithSelected}
            onSelectionChange={setStartsWithSelected}
            searchEnabled={true}
            filterType="startsWith"
          />
        </View>

        <View style={[styles.rowSpacing, { marginTop: 18 }]}>
          <Ux4gSelectionDropdown
            label="Filter Type: `contains` (Match substring anywhere)"
            description="Try typing 'land' -> matches Ireland and Iceland."
            placeholder="Search with contains..."
            options={countryOptions}
            selectedOptionIds={containsSelected}
            onSelectionChange={setContainsSelected}
            searchEnabled={true}
            filterType="contains"
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
  stateMonitorText: {
    fontSize: 13,
    marginTop: 10,
    fontStyle: 'italic',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: 6,
  },
  actionLogBox: {
    marginLeft: 16,
  },
  actionResult: {
    fontSize: 14,
  },
  actionResultSmall: {
    fontSize: 12,
    marginTop: 2,
  },
});
