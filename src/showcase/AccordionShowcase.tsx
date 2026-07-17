import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  Ux4gAccordion,
  Ux4gAccordionGroup,
  Ux4gAccordionItem,
} from '../components/accordion/Accordion';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';
import { Ux4gIcons } from '../foundation/icons';
import { Ux4gSpace } from '../foundation/dimensions';

/**
 * **AccordionShowcase**
 *
 * Comprehensive demonstration of `Ux4gAccordion` and `Ux4gAccordionGroup`,
 * illustrating single panels, chevron positioning (`leading` vs `trailing`),
 * custom border/content colors, mutually exclusive group expansion, and disabled states.
 */
export const AccordionShowcase: React.FC = () => {
  const { colors, typography, isDark } = useUx4gTheme();

  // Single accordions state
  const [basicExpanded, setBasicExpanded] = useState(false);
  const [leadingExpanded, setLeadingExpanded] = useState(true);
  const [coloredExpanded, setColoredExpanded] = useState(false);

  // Group accordion state
  const [expandedGroupIndex, setExpandedGroupIndex] = useState<number | null>(0);

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
  const bodyText = [
    typography.bM_default,
    { color: colors.onBackground ?? colors.onSurface, lineHeight: 22 },
  ];

  const groupItems: Ux4gAccordionItem[] = [
    {
      title: '1. What is the Digital Personal Data Protection (DPDP) Act?',
      leadingIcon: typeof Ux4gIcons.info === 'function' ? Ux4gIcons.info({ size: 16, color: colors.primary }) : undefined,
      content: (
        <Text style={bodyText}>
          The DPDP Act establishes a comprehensive legal framework for governing the processing of digital personal data in India, ensuring citizen privacy rights and lawful data handling obligations.
        </Text>
      ),
    },
    {
      title: '2. How does Aadhaar e-KYC Verification function securely?',
      leadingIcon: typeof Ux4gIcons.shield === 'function' ? Ux4gIcons.shield({ size: 16, color: colors.success }) : undefined,
      content: (
        <Text style={bodyText}>
          Aadhaar e-KYC allows authorized agencies to instantly and digitally verify identity details (name, address, gender, date of birth) from UIDAI servers upon explicit biometric or OTP consent from the resident.
        </Text>
      ),
    },
    {
      title: '3. Can I link multiple bank accounts to DigiLocker?',
      leadingIcon: typeof Ux4gIcons.check === 'function' ? Ux4gIcons.check({ size: 16, color: colors.warning }) : undefined,
      content: (
        <Text style={bodyText}>
          Yes, you can access verified financial records and passbooks from partnered public and private sector banks directly inside your secure DigiLocker dashboard.
        </Text>
      ),
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          🪗 Accordion Component (`Ux4gAccordion`)
        </Text>
        <Text style={subtitleStyle}>
          Complete demonstration of `Ux4gAccordion` and `Ux4gAccordionGroup` with animated 220ms chevron rotation, custom tokens, and group state management.
        </Text>
      </View>

      {/* ── SECTION 1: Single Collapsible Panels ───────────────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. Single Accordion Panels (`chevronPosition`)</Text>
        <Text style={subtitleStyle}>
          Standalone expandable panels with `trailing` (default) and `leading` chevron alignment.
        </Text>

        <View style={styles.sectionRow}>
          <Ux4gAccordion
            title="General System Guidelines (`chevronPosition = trailing`)"
            expanded={basicExpanded}
            onExpandedChange={setBasicExpanded}
          >
            <Text style={bodyText}>
              All UI elements across central government portals must maintain consistent spacing (`Ux4gSpace`), typography hierarchies (`Ux4gTypography`), and accessible contrast ratios.
            </Text>
          </Ux4gAccordion>
        </View>

        <View style={styles.sectionRow}>
          <Ux4gAccordion
            title="Security & Compliance Overview (`chevronPosition = leading`)"
            chevronPosition="leading"
            leadingIcon={
              typeof Ux4gIcons.shield === 'function'
                ? Ux4gIcons.shield({ size: 16, color: colors.primary })
                : undefined
            }
            expanded={leadingExpanded}
            onExpandedChange={setLeadingExpanded}
          >
            <Text style={bodyText}>
              All data transmitted through API gateways undergoes end-to-end TLS 1.3 encryption and complies with Level-4 security auditing requirements.
            </Text>
          </Ux4gAccordion>
        </View>
      </View>

      {/* ── SECTION 2: Custom Colors & Borders ─────────────────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>2. Custom Border & Content Background Colors</Text>
        <Text style={subtitleStyle}>
          Styling borders when expanded (`expandedBorderColor`) and custom tinted content boxes (`contentBackgroundColor`).
        </Text>

        <View style={styles.sectionRow}>
          <Ux4gAccordion
            title="Highlighted Notification Panel"
            expanded={coloredExpanded}
            onExpandedChange={setColoredExpanded}
            expandedBorderColor={colors.primary}
            contentBackgroundColor={
              isDark ? 'rgba(96, 165, 250, 0.08)' : 'rgba(50, 113, 234, 0.06)'
            }
          >
            <Text style={bodyText}>
              This panel features a highlighted primary border upon expansion along with a subtle primary-tinted background inside the content section.
            </Text>
          </Ux4gAccordion>
        </View>
      </View>

      {/* ── SECTION 3: Accordion Group (`Ux4gAccordionGroup`) ──────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>3. Accordion Group (`Ux4gAccordionGroup`)</Text>
        <Text style={subtitleStyle}>
          Mutually exclusive single-item expansion (`expandedIndex`) across a list of structured items (`items`).
        </Text>

        <Ux4gAccordionGroup
          items={groupItems}
          expandedIndex={expandedGroupIndex}
          onExpandedIndexChange={setExpandedGroupIndex}
          itemSpacing={Ux4gSpace.space12}
        />
      </View>

      {/* ── SECTION 4: Disabled State (`enabled = false`) ─────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>4. Disabled Accordion Item (`enabled = false`)</Text>
        <Text style={subtitleStyle}>
          Non-interactive state (`opacity: 0.38` title/chevron, transparent border).
        </Text>

        <View style={styles.sectionRow}>
          <Ux4gAccordion
            title="Archived Regulation Directives (Restricted Access)"
            enabled={false}
            expanded={false}
          >
            <Text style={bodyText}>
              This content is hidden and cannot be accessed.
            </Text>
          </Ux4gAccordion>
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
  sectionRow: {
    marginBottom: 14,
  },
});
