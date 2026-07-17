import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ux4gInputField, Ux4gInputFieldSize, Ux4gInputFieldStatus } from '../components/input-field/InputField';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';
import { Ux4gIcons } from '../foundation/icons';

export const InputFieldShowcase: React.FC = () => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const isDark = theme.isDark;

  // Section 1: Required Email with Helper text (Image 1)
  const [emailImgVal, setEmailImgVal] = useState<string>('');

  // Section 2: Validation Statuses (Image 2)
  const [errImgVal, setErrImgVal] = useState<string>('');
  const [descImgVal, setDescImgVal] = useState<string>('');
  const [succImgVal, setSuccImgVal] = useState<string>('');
  const [warnImgVal, setWarnImgVal] = useState<string>('');

  // Section 3: Leading icon, Trailing icon, Both icons (Image 3)
  const [leadingSearchVal, setLeadingSearchVal] = useState<string>('');
  const [trailingAmountVal, setTrailingAmountVal] = useState<string>('');
  const [bothLocationVal, setBothLocationVal] = useState<string>('');

  // Section 4: Prefix & Postfix (Image 4)
  const [amountPrefixVal, setAmountPrefixVal] = useState<string>('');
  const [websitePrefixVal, setWebsitePrefixVal] = useState<string>('');

  // Section 5: Disabled vs Normal (Image 5)
  const [appIdVal] = useState<string>('GOV/2025/001');
  const [fullNameVal, setFullNameVal] = useState<string>('');

  // Section 6 & 7: Extra configurations (Sizes, Password toggle, Multi-line)
  const [sizeSmall, setSizeSmall] = useState<string>('Small (32px)');
  const [sizeMedium, setSizeMedium] = useState<string>('Medium (40px default)');
  const [sizeLarge, setSizeLarge] = useState<string>('Large (48px)');
  const [sizeXl, setSizeXl] = useState<string>('Extra Large (56px)');
  const [passwordText, setPasswordText] = useState<string>('SecretPass123!');
  const [multiLineVal, setMultiLineVal] = useState<string>(
    'Standardized, accessible, and high-performance UI components across web, mobile, and desktop.'
  );

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.surface ?? (isDark ? '#18181B' : '#FFFFFF'),
      borderColor: isDark ? '#27272A' : '#E4E4E7',
    },
  ];

  const titleStyle = [styles.cardTitle, { color: colors.onSurface }];
  const subtitleStyle = [styles.cardSubtitle, { color: isDark ? '#A1A1AA' : '#71717A' }];
  const neutralIconColor = isDark ? '#A1A1AA' : '#71717A';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          📝 Input Field Variants (`Ux4gInputField`)
        </Text>
        <Text style={subtitleStyle}>
          Comprehensive demonstration of all input field variants exactly matching every state, icon layout, prefix/postfix format, and status badge.
        </Text>
      </View>

      {/* ── SECTION 1: Required Field & Helper Text (Image 1) ─────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. Required Field with Helper Text</Text>
        <Text style={subtitleStyle}>
          Shows red `*` indicator next to `Email` and info helper text below.
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Email"
            required={true}
            placeholder="Enter your email"
            value={emailImgVal}
            onValueChange={setEmailImgVal}
            caption="Helper text description"
            status="defaultStatus"
          />
        </View>
      </View>

      {/* ── SECTION 2: All Validation Statuses (Image 2) ───────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>2. Validation Statuses (`error`, `default`, `success`, `warning`)</Text>
        <Text style={subtitleStyle}>
          Semantic borders, status icons, and matching helper message colors.
        </Text>

        {/* Error State */}
        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Label"
            placeholder="Placeholder"
            value={errImgVal}
            onValueChange={setErrImgVal}
            status="error"
            caption="Error message"
          />
        </View>

        {/* Default Description State */}
        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Label"
            placeholder="Placeholder"
            value={descImgVal}
            onValueChange={setDescImgVal}
            status="defaultStatus"
            caption="Description"
          />
        </View>

        {/* Success State */}
        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Label"
            placeholder="Placeholder"
            value={succImgVal}
            onValueChange={setSuccImgVal}
            status="success"
            caption="Success message"
          />
        </View>

        {/* Warning State */}
        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Label"
            placeholder="Placeholder"
            value={warnImgVal}
            onValueChange={setWarnImgVal}
            status="warning"
            caption="Warning message"
          />
        </View>
      </View>

      {/* ── SECTION 3: Leading, Trailing & Both Icons (Image 3) ────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>3. Icon Configurations (`leadingIcon` & `trailingIcon`)</Text>
        <Text style={subtitleStyle}>
          Supporting search icons, currency trailing symbols, and combined location pins.
        </Text>

        {/* Leading icon */}
        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Leading icon"
            placeholder="Search..."
            value={leadingSearchVal}
            onValueChange={setLeadingSearchVal}
            leadingIcon={Ux4gIcons.search({ size: 18, color: neutralIconColor })}
          />
        </View>

        {/* Trailing icon */}
        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Trailing icon"
            placeholder="Enter amount"
            value={trailingAmountVal}
            onValueChange={setTrailingAmountVal}
            trailingIcon={
              <Text style={{ fontSize: 18, fontWeight: '600', color: neutralIconColor }}>
                ₹
              </Text>
            }
          />
        </View>

        {/* Both icons */}
        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Both icons"
            placeholder="Location"
            value={bothLocationVal}
            onValueChange={setBothLocationVal}
            leadingIcon={<Text style={{ fontSize: 16 }}>📍</Text>}
            trailingIcon={<Text style={{ fontSize: 16 }}>🎯</Text>}
          />
        </View>
      </View>

      {/* ── SECTION 4: Prefix & Postfix Formatting (Image 4) ──────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>4. Prefix Text & Postfix Text Formatting</Text>
        <Text style={subtitleStyle}>
          Embeds static currency prefixes (`₹ 0`), decimal postfixes (`.00`), and protocol URLs (`https:// `).
        </Text>

        {/* Amount with prefix & postfix */}
        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Amount"
            value={amountPrefixVal}
            onValueChange={setAmountPrefixVal}
            prefixText="₹ 0"
            postfixText=".00"
            type="number"
          />
        </View>

        {/* Website with prefix */}
        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Website"
            placeholder="example.com"
            value={websitePrefixVal}
            onValueChange={setWebsitePrefixVal}
            prefixText="https:// "
          />
        </View>
      </View>

      {/* ── SECTION 5: Disabled vs Normal States (Image 5) ─────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>5. Disabled (`enabled = false`) vs Normal State</Text>
        <Text style={subtitleStyle}>
          Disabled fields automatically remove border contrast and apply a subtle neutral grey background.
        </Text>

        {/* Application ID (Disabled) */}
        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Application ID"
            value={appIdVal}
            onValueChange={() => {}}
            enabled={false}
          />
        </View>

        {/* Full Name (Normal Required) */}
        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Full Name"
            required={true}
            placeholder="Enter full name"
            value={fullNameVal}
            onValueChange={setFullNameVal}
          />
        </View>
      </View>

      {/* ── SECTION 6: Sizes Comparison (`small`, `medium`, `large`, `xl`) ──── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>6. Field Sizes (`small`, `medium`, `large`, `xl`)</Text>
        <Text style={subtitleStyle}>
          Exact height constraints (`small`: 32px, `medium`: 40px default, `large`: 48px, `xl`: 56px).
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Small Size (`size = 'small'`, 32px height)"
            size="small"
            value={sizeSmall}
            onValueChange={setSizeSmall}
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Medium Size (`size = 'medium'`, 40px height default)"
            size="medium"
            value={sizeMedium}
            onValueChange={setSizeMedium}
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Large Size (`size = 'large'`, 48px height)"
            size="large"
            value={sizeLarge}
            onValueChange={setSizeLarge}
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Extra Large (`size = 'xl'`, 56px height)"
            size="xl"
            value={sizeXl}
            onValueChange={setSizeXl}
          />
        </View>
      </View>

      {/* ── SECTION 7: Password Toggle & Multi-Line Text Area ─────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>7. Secure Password Toggle & Multi-line Text Area</Text>
        <Text style={subtitleStyle}>
          Interactive eye icon (`type = 'password'`) and auto-expanding multi-line (`singleLine = false`).
        </Text>

        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Secure Password (`type = 'password'`)"
            required={true}
            type="password"
            placeholder="Enter your password..."
            value={passwordText}
            onValueChange={setPasswordText}
            caption="Click the eye icon on the right to toggle password visibility!"
          />
        </View>

        <View style={styles.rowSpacing}>
          <Ux4gInputField
            label="Project Description (`singleLine = false`, `maxLines = 4`)"
            singleLine={false}
            maxLines={4}
            value={multiLineVal}
            onValueChange={setMultiLineVal}
            caption="Multi-line scrollable text entry box (`minHeight: 100`)."
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
    paddingBottom: 48,
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
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    marginBottom: 12,
  },
  rowSpacing: {
    marginTop: 14,
  },
});
