import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';
import { UX4GColors } from '../foundation/colors';
import { Ux4gCheckbox } from '../components/checkbox/Checkbox';
import { Ux4gButton } from '../components/button/Button';

export const CheckboxShowcase: React.FC = () => {
  const theme = useUx4gTheme();

  // Basic Interactive State
  const [basicState, setBasicState] = useState<boolean | null>(false);

  // Tristate / Indeterminate State
  const [tristate, setTristate] = useState<boolean | null>(null);

  // Checklist states
  const [chk1, setChk1] = useState<boolean | null>(true);
  const [chk2, setChk2] = useState<boolean | null>(false);
  const [chk3, setChk3] = useState<boolean | null>(true);

  // Sizes state
  const [sizeSm, setSizeSm] = useState<boolean | null>(true);
  const [sizeMd, setSizeMd] = useState<boolean | null>(true);
  const [sizeLg, setSizeLg] = useState<boolean | null>(true);

  // Horizontal status grid state
  const [stateHelper, setStateHelper] = useState<boolean | null>(true);
  const [stateError, setStateError] = useState<boolean | null>(false);
  const [stateWarning, setStateWarning] = useState<boolean | null>(true);
  const [stateSuccess, setStateSuccess] = useState<boolean | null>(true);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          UX4G Checkbox Showcase
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
          Direct port of `checkbox.dart` (`Ux4gCheckbox`) featuring checked,
          unchecked, tristate (`null`), sizes, required mark (`*`), and description variants.
        </Text>
      </View>

      {/* 1. Basic & Interactive States */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          1. Basic & Interactive Tristate Toggle
        </Text>
        <Text
          style={[
            styles.sectionDesc,
            { color: theme.isDark ? UX4GColors.neutral300 : UX4GColors.neutral600 },
          ]}
        >
          Taps automatically cycle across state: if Indeterminate (`null`) → `true` → `false` → `true`.
        </Text>

        <View style={styles.card}>
          <Ux4gCheckbox
            value={basicState}
            onChanged={(val) => setBasicState(val)}
            label={`Standard Interactive Checkbox (${
              basicState === true
                ? 'Checked ✓'
                : basicState === false
                ? 'Unchecked'
                : 'Indeterminate —'
            })`}
            description="Tap anywhere on this row to toggle the checkbox state smoothly."
          />
          <View style={styles.divider} />
          <Ux4gCheckbox
            value={tristate}
            onChanged={(val) => setTristate(val)}
            label="Tristate / Indeterminate Preset (`value = null`)"
            description="Displays the horizontal dash vector icon when null. Tap to toggle!"
          />
          <View style={styles.rowActions}>
            <Ux4gButton
              variant="outline"
              size="small"
              text="Reset to Indeterminate"
              onPress={() => setTristate(null)}
            />
          </View>
        </View>
      </View>

      {/* 2. Sizes */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          2. Sizes (`Ux4gCheckboxSize`)
        </Text>
        <Text
          style={[
            styles.sectionDesc,
            { color: theme.isDark ? UX4GColors.neutral300 : UX4GColors.neutral600 },
          ]}
        >
          Supports `small` (16pt box), `medium` (20pt box, default), and `large` (24pt box).
        </Text>

        <View style={styles.card}>
          <Ux4gCheckbox
            size="small"
            value={sizeSm}
            onChanged={(val) => setSizeSm(val)}
            label="Small Checkbox (16pt box, lM_default typography)"
            description="Ideal for dense lists and compact tables."
          />
          <View style={styles.divider} />
          <Ux4gCheckbox
            size="medium"
            value={sizeMd}
            onChanged={(val) => setSizeMd(val)}
            label="Medium Checkbox (20pt box, lL_default typography)"
            description="Standard default size across most UX4G forms."
          />
          <View style={styles.divider} />
          <Ux4gCheckbox
            size="large"
            value={sizeLg}
            onChanged={(val) => setSizeLg(val)}
            label="Large Checkbox (24pt box, lXL_default typography)"
            description="Ideal for touch-heavy mobile screens or prominent selection."
          />
        </View>
      </View>

      {/* 3. Description Variants & Required Asterisk */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          3. Description Variants (`Ux4gCheckboxDescriptionVariant`) & Required (`*`)
        </Text>
        <Text
          style={[
            styles.sectionDesc,
            { color: theme.isDark ? UX4GColors.neutral300 : UX4GColors.neutral600 },
          ]}
        >
          Dynamic color support for `helper`, `error`, `warning`, and `success` descriptions.
        </Text>

        <View style={styles.card}>
          <Ux4gCheckbox
            value={true}
            onChanged={() => {}}
            label="Required Terms & Conditions"
            isRequired={true}
            description="Helper variant (70% alpha). Notice the red asterisk (*) on the label."
            descriptionVariant="helper"
          />
          <View style={styles.divider} />
          <Ux4gCheckbox
            value={false}
            onChanged={() => {}}
            label="Accept Privacy Policy"
            isRequired={true}
            hasError={true}
            description="Error variant (`theme.colors.error`). Highlights border and description."
            descriptionVariant="error"
          />
          <View style={styles.divider} />
          <Ux4gCheckbox
            value={true}
            onChanged={() => {}}
            label="Enable Experimental Beta Features"
            description="Warning variant (`theme.colors.warning`). Please proceed with care."
            descriptionVariant="warning"
          />
          <View style={styles.divider} />
          <Ux4gCheckbox
            value={true}
            onChanged={() => {}}
            label="Aadhaar Verification Complete"
            description="Success variant (`theme.colors.success`). Document verified successfully."
            descriptionVariant="success"
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
          Clean side-by-side comparison of all 4 description variant status icons with check and error rings.
        </Text>

        <View style={styles.card}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalRowContainer}
          >
            <View style={styles.horizontalGridItem}>
              <Ux4gCheckbox
                value={stateHelper}
                onChanged={(val) => setStateHelper(val)}
                label="Label"
                description="Default description"
                descriptionVariant="helper"
              />
            </View>
            <View style={styles.horizontalGridItem}>
              <Ux4gCheckbox
                value={stateError}
                onChanged={(val) => setStateError(val)}
                label="Label"
                hasError={true}
                description="Error text"
                descriptionVariant="error"
              />
            </View>
            <View style={styles.horizontalGridItem}>
              <Ux4gCheckbox
                value={stateWarning}
                onChanged={(val) => setStateWarning(val)}
                label="Label"
                description="Warning text"
                descriptionVariant="warning"
              />
            </View>
            <View style={styles.horizontalGridItem}>
              <Ux4gCheckbox
                value={stateSuccess}
                onChanged={(val) => setStateSuccess(val)}
                label="Label"
                description="Success text"
                descriptionVariant="success"
              />
            </View>
          </ScrollView>
        </View>
      </View>

      {/* 4. Disabled States */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          4. Disabled States (`enabled = false`)
        </Text>
        <Text
          style={[
            styles.sectionDesc,
            { color: theme.isDark ? UX4GColors.neutral300 : UX4GColors.neutral600 },
          ]}
        >
          Applies 12% opacity (`1F`) box fill/border and 38% (`61`) text opacity per design specs.
        </Text>

        <View style={styles.card}>
          <Ux4gCheckbox
            enabled={false}
            value={true}
            onChanged={() => {}}
            label="Disabled Checked Option"
            description="Cannot be toggled by user interaction."
          />
          <View style={styles.divider} />
          <Ux4gCheckbox
            enabled={false}
            value={false}
            onChanged={() => {}}
            label="Disabled Unchecked Option"
            description="Maintains exact border spacing with disabled opacity."
          />
          <View style={styles.divider} />
          <Ux4gCheckbox
            enabled={false}
            value={null}
            onChanged={() => {}}
            label="Disabled Indeterminate Option"
            description="Tristate dash icon rendered in semi-transparent disabled state."
          />
        </View>
      </View>

      {/* 5. Interactive Checklist Example */}
      <View style={[styles.section, { marginBottom: 40 }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          5. Interactive Checklist Demo
        </Text>
        <Text
          style={[
            styles.sectionDesc,
            { color: theme.isDark ? UX4GColors.neutral300 : UX4GColors.neutral600 },
          ]}
        >
          Combine checkboxes with live form validation and state updates.
        </Text>

        <View style={styles.card}>
          <Ux4gCheckbox
            value={chk1}
            onChanged={(val) => setChk1(val)}
            label="Send SMS Notifications"
            description="Receive real-time OTP and application updates on your registered mobile number."
            activeColor={theme.colors.success}
          />
          <View style={styles.divider} />
          <Ux4gCheckbox
            value={chk2}
            onChanged={(val) => setChk2(val)}
            label="Subscribe to UX4G Newsletter"
            description="Monthly design system updates, new Figma tokens, and framework releases."
          />
          <View style={styles.divider} />
          <Ux4gCheckbox
            value={chk3}
            onChanged={(val) => setChk3(val)}
            label="Enable Two-Factor Authentication (2FA)"
            description="Add an extra layer of biometric/OTP security upon login."
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
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  card: {
    backgroundColor: 'rgba(150, 150, 150, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.15)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.15)',
    marginVertical: 6,
  },
  rowActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
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
