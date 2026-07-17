import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ux4gTextArea } from '../components/text-area/TextArea';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';
import { Ux4gIcons } from '../foundation/icons';

/**
 * **TextAreaShowcase**
 *
 * Comprehensive interactive demonstration of the `Ux4gTextArea` component,
 * covering all configurations (`minHeight`, sizes, statuses, character counters,
 * and read-only/disabled states).
 */
export const TextAreaShowcase: React.FC = () => {
  const { colors, isDark } = useUx4gTheme();

  // State values for various text area configurations
  const [basicVal, setBasicVal] = useState('');
  const [maxLengthVal, setMaxLengthVal] = useState(
    'This is a sample bio explaining user history and background details.'
  );
  const [smallSizeVal, setSmallSizeVal] = useState('Compact text area entry.');
  const [largeSizeVal, setLargeSizeVal] = useState('Spacious text area with large minHeight.');

  // Status values
  const [defaultVal, setDefaultVal] = useState('Standard input behavior.');
  const [errorVal, setErrorVal] = useState('Description exceeds allowed limit or contains invalid symbols.');
  const [warningVal, setWarningVal] = useState('Please ensure no sensitive personal identification numbers are entered.');
  const [successVal, setSuccessVal] = useState('Comments verified and ready for submission.');

  // Disabled and ReadOnly
  const [disabledVal] = useState('This field is locked by administrative permissions.');
  const [readOnlyVal] = useState('Read-only terms and conditions review section.');

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

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          📝 Text Area Component (`Ux4gTextArea`)
        </Text>
        <Text style={subtitleStyle}>
          Complete demonstration of multiline text areas (`Ux4gTextArea`) with exact token heights, semantic statuses, character counting, and resize indicators.
        </Text>
      </View>

      {/* ── SECTION 1: Basic & Character Counter ────────────────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. Basic & Character Counting (`maxLength`)</Text>
        <Text style={subtitleStyle}>
          Standard text area with required asterisk (`*`), label icons, and built-in character limit counter.
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gTextArea
            label="User Biography"
            required={true}
            placeholder="Tell us about yourself, your hobbies, and background..."
            value={basicVal}
            onValueChange={setBasicVal}
            caption="Please keep it friendly and professional."
            trailingIconLabel={Ux4gIcons.info({
              size: 16,
              color: isDark ? '#A1A1AA' : '#71717A',
            })}
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gTextArea
            label="Feedback Summary (`maxLength = 150`)"
            placeholder="Type your feedback here..."
            value={maxLengthVal}
            onValueChange={setMaxLengthVal}
            maxLength={150}
            minHeight="small"
            caption="Character counter updates live at the bottom-right corner."
          />
        </View>
      </View>

      {/* ── SECTION 2: Heights & Sizes ──────────────────────────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>2. Sizing (`small`, `large`) & Heights (`small`, `medium`, `large`)</Text>
        <Text style={subtitleStyle}>
          Scalable content padding (`size`) and minimum container heights (`minHeight`).
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gTextArea
            label="Small Height (`minHeight = small` / 80px)"
            size="small"
            minHeight="small"
            placeholder="Compact notes..."
            value={smallSizeVal}
            onValueChange={setSmallSizeVal}
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gTextArea
            label="Large Height (`minHeight = large` / 160px)"
            size="large"
            minHeight="large"
            placeholder="Detailed description..."
            value={largeSizeVal}
            onValueChange={setLargeSizeVal}
            caption="Provides ample vertical space for long-form entries."
          />
        </View>
      </View>

      {/* ── SECTION 3: Validation Statuses ──────────────────────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>3. Validation Statuses</Text>
        <Text style={subtitleStyle}>
          Semantic borders, status icons, and colored captions (`defaultStatus`, `error`, `warning`, `success`).
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gTextArea
            label="Default Status"
            status="defaultStatus"
            value={defaultVal}
            onValueChange={setDefaultVal}
            caption="Normal state without validation alerts."
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gTextArea
            label="Error Status"
            status="error"
            value={errorVal}
            onValueChange={setErrorVal}
            caption="Your submission contains prohibited content or exceeds limits."
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gTextArea
            label="Warning Status"
            status="warning"
            value={warningVal}
            onValueChange={setWarningVal}
            caption="Double-check accuracy before submitting public remarks."
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gTextArea
            label="Success Status"
            status="success"
            value={successVal}
            onValueChange={setSuccessVal}
            caption="Bio validation successful. Ready for publishing."
          />
        </View>
      </View>

      {/* ── SECTION 4: Read-Only & Disabled States ──────────────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>4. Read-Only (`readOnly`) & Disabled (`enabled = false`)</Text>
        <Text style={subtitleStyle}>
          Non-editable modes for locked fields or static document review.
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gTextArea
            label="Disabled Text Area (`enabled = false`)"
            value={disabledVal}
            onValueChange={() => {}}
            enabled={false}
            caption="You do not have permission to modify these notes."
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gTextArea
            label="Read-Only Text Area (`readOnly = true`)"
            value={readOnlyVal}
            onValueChange={() => {}}
            readOnly={true}
            caption="Text can be highlighted/copied but cannot be edited."
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
  rowSpacing: {
    marginBottom: 16,
  },
});
