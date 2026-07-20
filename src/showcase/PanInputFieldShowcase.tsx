import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ux4gPanInputField, validatePan } from '../components/pan-input-field/PanInputField';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';

/**
 * **PanInputFieldShowcase**
 *
 * Comprehensive demonstration of `Ux4gPanInputField`, showing live auto-uppercase enforcement,
 * Regex validation (`^[A-Z]{5}[0-9]{4}[A-Z]{1}$`), explicit validation statuses, and sizing options.
 */
export const PanInputFieldShowcase: React.FC = () => {
  const { colors, typography, isDark } = useUx4gTheme();

  // Interactive state
  const [panValue, setPanValue] = useState('');

  // Sizing variants state
  const [smallValue, setSmallValue] = useState('ABCDE1234F');
  const [mediumValue, setMediumValue] = useState('ABCDE1234F');
  const [largeValue, setLargeValue] = useState('ABCDE1234F');

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.surface ?? (isDark ? '#18181B' : '#FFFFFF'),
      borderColor: isDark ? '#27272A' : '#E4E4E7',
    },
  ];

  const titleStyle = [styles.cardTitle, { color: colors.onSurface }];
  const subtitleStyle = [
    styles.cardSubtitle,
    { color: isDark ? '#A1A1AA' : '#71717A' },
  ];

  // Quick fill samples for Section 1
  const handleSetValidSample = () => {
    setPanValue('ABCDE1234F');
  };

  const handleSetInvalidSample = () => {
    setPanValue('ABC1234DEF'); // Fails Regex (wrong letter/digit order)
  };

  const isCurrentValid = validatePan(panValue);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          💳 PAN Input Field (`Ux4gPanInputField`)
        </Text>
        <Text style={subtitleStyle}>
          Specialized 10-character PAN field with auto-uppercase enforcement, alphanumeric filtering, and standard Regex validation (`validatePan`).
        </Text>
      </View>

      {/* ── SECTION 1: Interactive Live Checksum & Auto-Formatting ────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. Interactive Live Regex Checksum & Formatting</Text>
        <Text style={subtitleStyle}>
          Type any 10 characters or click the quick fill buttons below. When 10 characters are reached, it automatically checks against the Regex `{'^[A-Z]{5}[0-9]{4}[A-Z]{1}$'}`.
        </Text>

        <View style={styles.quickFillContainer}>
          <TouchableOpacity
            style={[styles.sampleButton, { backgroundColor: colors.success }]}
            onPress={handleSetValidSample}
          >
            <Text style={styles.sampleButtonText}>✓ Fill Valid PAN (ABCDE...)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sampleButton, { backgroundColor: colors.error }]}
            onPress={handleSetInvalidSample}
          >
            <Text style={styles.sampleButtonText}>✕ Fill Invalid PAN (ABC12...)</Text>
          </TouchableOpacity>
        </View>

        <Ux4gPanInputField
          value={panValue}
          onValueChange={setPanValue}
          required={true}
        />

        <View style={[styles.statusBanner, { backgroundColor: isDark ? '#27272A' : '#F4F4F5' }]}>
          <Text style={[typography.bS_default, { color: colors.onSurface }]}>
            Current Value: <Text style={{ fontWeight: '700' }}>{panValue || '(empty)'}</Text>
          </Text>
          <Text style={[typography.bS_default, { color: isCurrentValid ? colors.success : colors.error, marginTop: 4, fontWeight: '700' }]}>
            Regex Validation Result: {isCurrentValid ? '✓ VALID' : panValue.length === 10 ? '✕ INVALID PAN FORMAT' : '(Enter 10 alphanumeric characters)'}
          </Text>
        </View>
      </View>

      {/* ── SECTION 2: All Validation States (`status` prop) ──────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>2. All Validation Status States (`status` prop)</Text>
        <Text style={subtitleStyle}>
          Illustrating explicit validation statuses (`defaultStatus`, `success`, `error`, `warning`).
        </Text>

        <View style={styles.sectionRow}>
          <Ux4gPanInputField
            label="1. Default State (`status = defaultStatus`)"
            value=""
            onValueChange={() => {}}
            status="defaultStatus"
          />
        </View>

        <View style={styles.sectionRow}>
          <Ux4gPanInputField
            label="2. Success State (`status = success`)"
            value="ABCDE1234F"
            onValueChange={() => {}}
            status="success"
            caption="Valid PAN number verified by central database"
          />
        </View>

        <View style={styles.sectionRow}>
          <Ux4gPanInputField
            label="3. Error State (`status = error`)"
            value="ABC1234DEF"
            onValueChange={() => {}}
            status="error"
            caption="Invalid PAN: Expected 5 letters, 4 digits, 1 letter"
          />
        </View>

        <View style={styles.sectionRow}>
          <Ux4gPanInputField
            label="4. Warning State (`status = warning`)"
            value="ABCDE1234F"
            onValueChange={() => {}}
            status="warning"
            caption="PAN is inactive or not linked with Aadhaar"
          />
        </View>
      </View>

      {/* ── SECTION 3: All Sizing Variants (`size` prop) ──────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>3. All Sizing Variants (`size` prop)</Text>
        <Text style={subtitleStyle}>
          Supporting exact heights: `small` (`32px`), `medium` (`40px`), and `large` (`48px`).
        </Text>

        <View style={styles.sectionRow}>
          <Ux4gPanInputField
            size="small"
            label="Small PAN Input (`size = small, 32px`)"
            value={smallValue}
            onValueChange={setSmallValue}
          />
        </View>

        <View style={styles.sectionRow}>
          <Ux4gPanInputField
            size="medium"
            label="Medium PAN Input (`size = medium, 40px - default`)"
            value={mediumValue}
            onValueChange={setMediumValue}
          />
        </View>

        <View style={styles.sectionRow}>
          <Ux4gPanInputField
            size="large"
            label="Large PAN Input (`size = large, 48px`)"
            value={largeValue}
            onValueChange={setLargeValue}
          />
        </View>
      </View>

      {/* ── SECTION 4: Read-Only & Disabled States ─────────────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>4. Read-Only & Disabled States</Text>
        <Text style={subtitleStyle}>
          Locked non-editable states (`readOnly = true` and `enabled = false`).
        </Text>

        <View style={styles.sectionRow}>
          <Ux4gPanInputField
            label="Verified PAN Record (`readOnly = true`)"
            value="ABCDE1234F"
            onValueChange={() => {}}
            readOnly={true}
            status="success"
            caption="Input locked: value is selectable/copyable but cannot be modified"
          />
        </View>

        <View style={styles.sectionRow}>
          <Ux4gPanInputField
            label="Archived PAN File (`enabled = false`)"
            value="XYZAQ9876R"
            onValueChange={() => {}}
            enabled={false}
            caption="Input disabled: opacities dimmed to 0.38 (`disabledTitleColor`)"
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
  quickFillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  sampleButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  sampleButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  statusBanner: {
    marginTop: 14,
    padding: 12,
    borderRadius: 8,
  },
  sectionRow: {
    marginBottom: 16,
  },
});
