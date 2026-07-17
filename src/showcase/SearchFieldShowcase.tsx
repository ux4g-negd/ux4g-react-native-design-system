import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ux4gSearchField } from '../components/search-field/SearchField';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';

const SAMPLE_COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Australia',
  'Canada',
  'Germany',
  'France',
  'Japan',
  'Brazil',
  'South Africa',
  'Singapore',
  'United Arab Emirates',
  'Indonesia',
  'Italy',
  'Spain',
];

export const SearchFieldShowcase: React.FC = () => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const isDark = theme.isDark;

  // Section 1: Basic Search
  const [basicVal, setBasicVal] = useState<string>('');
  const [noVoiceVal, setNoVoiceVal] = useState<string>('');

  // Section 2: Search with Submit Button
  const [submitFilledVal, setSubmitFilledVal] = useState<string>('Delhi');
  const [submitTonalVal, setSubmitTonalVal] = useState<string>('');
  const [lastSubmitted, setLastSubmitted] = useState<string>('None');

  // Section 3: Autocomplete Variants
  const [autoContainsVal, setAutoContainsVal] = useState<string>('');
  const [autoStartsWithVal, setAutoStartsWithVal] = useState<string>('');
  const [autoLoadingVal, setAutoLoadingVal] = useState<string>('New ');

  // Section 4: Sizes
  const [smallVal, setSmallVal] = useState<string>('Small search');
  const [mediumVal, setMediumVal] = useState<string>('Medium default');
  const [largeVal, setLargeVal] = useState<string>('Large search');
  const [xlVal, setXlVal] = useState<string>('Extra Large search');

  // Section 5: Validation Statuses
  const [defaultStatusVal, setDefaultStatusVal] = useState<string>('Regular query');
  const [errorStatusVal, setErrorStatusVal] = useState<string>('Invalid character @#$');
  const [warningStatusVal, setWarningStatusVal] = useState<string>('Slow server connection');
  const [successStatusVal, setSuccessStatusVal] = useState<string>('Valid tracking number');

  // Section 6: Disabled
  const [disabledVal] = useState<string>('GOV/2026/SEARCH-LOCK');

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.surface ?? (isDark ? '#18181B' : '#FFFFFF'),
      borderColor: isDark ? '#27272A' : '#E4E4E7',
    },
  ];

  const titleStyle = [styles.cardTitle, { color: colors.onSurface }];
  const subtitleStyle = [styles.cardSubtitle, { color: isDark ? '#A1A1AA' : '#71717A' }];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          🔍 Search Field Variants (`Ux4gSearchField`)
        </Text>
        <Text style={subtitleStyle}>
          Complete demonstration of all search field variants (`basicSearch`, `searchWithSubmit`, `autocomplete`), sizes, statuses, and interactive option lists.
        </Text>
      </View>

      {/* ── SECTION 1: Basic Search ─────────────────────────────────────────── */}
      <View style={[cardStyle, { zIndex: 100 }]}>
        <Text style={titleStyle}>1. Basic Search (`basicSearch`)</Text>
        <Text style={subtitleStyle}>
          Standard input with search leading icon, optional voice search (`mic`), and clear (`close`) icon when text is entered.
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Search Directory"
            placeholder="Search documents, people, or tags..."
            value={basicVal}
            onValueChange={setBasicVal}
            variant="basicSearch"
            showVoiceIcon={true}
            showClearIcon={true}
            options={['Recent: Aadhaar Portal', 'Recent: PAN Verification', 'Recent: Digital Locker', 'Recent: e-Sign Document']}
            caption="Try typing or focusing to see suggestions appear immediately."
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Without Voice Icon"
            placeholder="Search ID number..."
            value={noVoiceVal}
            onValueChange={setNoVoiceVal}
            variant="basicSearch"
            showVoiceIcon={false}
          />
        </View>
      </View>

      {/* ── SECTION 2: Search with Submit Button ────────────────────────────── */}
      <View style={[cardStyle, { zIndex: 90 }]}>
        <Text style={titleStyle}>2. Search with Submit Button (`searchWithSubmit`)</Text>
        <Text style={subtitleStyle}>
          Displays an attached action button on the right edge with `filled` or `tonal` style.
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Filled Button Style"
            placeholder="Search city or district..."
            value={submitFilledVal}
            onValueChange={setSubmitFilledVal}
            variant="searchWithSubmit"
            buttonStyle="filled"
            options={['Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune']}
            onSubmitClick={(val) => setLastSubmitted(`Filled: "${val}"`)}
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Tonal Button Style"
            placeholder="Search postal code..."
            value={submitTonalVal}
            onValueChange={setSubmitTonalVal}
            variant="searchWithSubmit"
            buttonStyle="tonal"
            onSubmitClick={(val) => setLastSubmitted(`Tonal: "${val}"`)}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={[styles.infoText, { color: colors.primary }]}>
            Last Submitted: <Text style={{ fontWeight: '700' }}>{lastSubmitted}</Text>
          </Text>
        </View>
      </View>

      {/* ── SECTION 3: Autocomplete / Options Filtering ──────────────────────── */}
      <View style={[cardStyle, { zIndex: 80 }]}>
        <Text style={titleStyle}>3. Autocomplete & Option Filtering (`autocomplete`)</Text>
        <Text style={subtitleStyle}>
          Focus on the input and type to filter the dropdown menu list (`contains`, `startsWith`, or `isLoading`).
        </Text>

        <View style={[styles.rowSpacing, { zIndex: 30 }]}>
          <Ux4gSearchField
            label="Country Autocomplete (Contains Filter)"
            placeholder="Start typing country name (e.g. 'un', 'in')..."
            value={autoContainsVal}
            onValueChange={setAutoContainsVal}
            variant="autocomplete"
            filterType="contains"
            options={SAMPLE_COUNTRIES}
            caption="Dropdown list shows when input has focus and text."
          />
        </View>

        <View style={[styles.rowSpacing, { zIndex: 20 }]}>
          <Ux4gSearchField
            label="Country Autocomplete (Starts With Filter)"
            placeholder="Start typing (e.g. 'Uni', 'Can')..."
            value={autoStartsWithVal}
            onValueChange={setAutoStartsWithVal}
            variant="autocomplete"
            filterType="startsWith"
            options={SAMPLE_COUNTRIES}
          />
        </View>

        <View style={[styles.rowSpacing, { zIndex: 10 }]}>
          <Ux4gSearchField
            label="Async Loading State (`isLoading = true`)"
            placeholder="Searching remote database..."
            value={autoLoadingVal}
            onValueChange={setAutoLoadingVal}
            variant="autocomplete"
            isLoading={true}
            options={SAMPLE_COUNTRIES}
            caption="Shows spinner right inside the dropdown card or trailing area."
          />
        </View>
      </View>

      {/* ── SECTION 4: Sizing Options ────────────────────────────────────────── */}
      <View style={[cardStyle, { zIndex: 70 }]}>
        <Text style={titleStyle}>4. Sizing Variants (`small`, `medium`, `large`, `xl`)</Text>
        <Text style={subtitleStyle}>
          Pixel-perfect height scaling across all form sizes (`32px`, `40px`, `48px`, `56px`).
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Small (32px)"
            size="small"
            value={smallVal}
            onValueChange={setSmallVal}
            variant="searchWithSubmit"
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Medium (40px Default)"
            size="medium"
            value={mediumVal}
            onValueChange={setMediumVal}
            variant="searchWithSubmit"
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Large (48px)"
            size="large"
            value={largeVal}
            onValueChange={setLargeVal}
            variant="searchWithSubmit"
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Extra Large (56px)"
            size="xl"
            value={xlVal}
            onValueChange={setXlVal}
            variant="searchWithSubmit"
          />
        </View>
      </View>

      {/* ── SECTION 5: Validation Statuses ──────────────────────────────────── */}
      <View style={[cardStyle, { zIndex: 60 }]}>
        <Text style={titleStyle}>5. Validation Statuses</Text>
        <Text style={subtitleStyle}>
          Semantic status borders, colored labels, status icons, and helper text messages.
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Default Status"
            status="defaultStatus"
            value={defaultStatusVal}
            onValueChange={setDefaultStatusVal}
            caption="Normal search behavior without alerts."
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Error Status"
            status="error"
            value={errorStatusVal}
            onValueChange={setErrorStatusVal}
            caption="Please remove unsupported special characters."
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Warning Status"
            status="warning"
            value={warningStatusVal}
            onValueChange={setWarningStatusVal}
            caption="Search index is currently rebuilding. Results may be delayed."
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Success Status"
            status="success"
            value={successStatusVal}
            onValueChange={setSuccessStatusVal}
            caption="Tracking number verified in registry."
          />
        </View>
      </View>

      {/* ── SECTION 6: Disabled vs Enabled ──────────────────────────────────── */}
      <View style={[cardStyle, { zIndex: 50 }]}>
        <Text style={titleStyle}>6. Disabled State (`enabled = false`)</Text>
        <Text style={subtitleStyle}>
          Read-only display when search permissions or inputs are locked.
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gSearchField
            label="Locked Search Reference"
            value={disabledVal}
            onValueChange={() => {}}
            enabled={false}
            variant="searchWithSubmit"
            caption="You do not have permission to modify this search filter."
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
    fontWeight: '800',
    marginBottom: 6,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    overflow: 'visible',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 18,
  },
  rowSpacing: {
    marginBottom: 16,
  },
  infoBox: {
    marginTop: 4,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: 'rgba(50, 113, 234, 0.08)',
  },
  infoText: {
    fontSize: 14,
  },
});
