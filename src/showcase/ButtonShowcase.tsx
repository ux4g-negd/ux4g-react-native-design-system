import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Ux4gThemeProvider,
  useUx4gTheme,
  useUx4gStyleSheet,
  Ux4gButton,
  Ux4gOutlineButton,
  Ux4gTextButton,
  Ux4gIconButton,
  Ux4gPalette,
} from '../index';

const ShowcaseContent: React.FC = () => {
  const theme = useUx4gTheme();
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const styles = useUx4gStyleSheet((t) => ({
    container: {
      flex: 1,
      backgroundColor: t.colors.background,
    },
    scrollContent: {
      padding: t.space.space20,
      paddingBottom: t.space.space64,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: t.space.space24,
      paddingBottom: t.space.space16,
      borderBottomWidth: 1,
      borderBottomColor: t.isDark ? Ux4gPalette.neutral800 : Ux4gPalette.neutral200,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: t.isDark ? Ux4gPalette.white : t.colors.primary,
    },
    subtitle: {
      fontSize: 14,
      color: t.colors.secondary,
      marginTop: t.space.space4,
    },
    section: {
      marginBottom: t.space.space32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: t.colors.primary,
      marginBottom: t.space.space12,
    },
    sectionDescription: {
      fontSize: 13,
      color: t.isDark ? Ux4gPalette.neutral400 : Ux4gPalette.neutral600,
      marginBottom: t.space.space16,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: t.space.space12,
      alignItems: 'center',
      marginBottom: t.space.space12,
    },
    column: {
      gap: t.space.space12,
    },
    card: {
      padding: t.space.space16,
      borderRadius: t.radius.radius12,
      borderWidth: 1,
      borderColor: t.isDark ? Ux4gPalette.neutral800 : Ux4gPalette.neutral200,
      backgroundColor: t.isDark ? Ux4gPalette.neutral900 : Ux4gPalette.neutral50,
      marginBottom: t.space.space16,
    },
    iconText: {
      fontSize: 18,
      fontWeight: '700',
      textAlignVertical: 'center',
      includeFontPadding: false,
    },
  }));

  const renderIcon = (label: string) => ({ color, size }: { color: string; size?: number }) => (
    <Text
      style={[
        styles.iconText,
        {
          color,
          fontSize: size ?? 18,
          lineHeight: size ?? 18,
        },
      ]}
    >
      {label}
    </Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.isDark ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with Theme Switcher */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Ux4gButton Showcase</Text>
            <Text style={styles.subtitle}>
              {theme.isDark ? 'Dark Theme Active' : 'Light Theme Active'}
            </Text>
          </View>
          <Ux4gButton
            size="small"
            variant="outline"
            text={theme.isDark ? '☀️ Light' : '🌙 Dark'}
            onPress={theme.toggleTheme}
          />
        </View>

        {/* 1. Variants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Variants (`Ux4gButtonVariant`)</Text>
          <Text style={styles.sectionDescription}>
            All 4 standard visual variants ported from the Flutter design system (`buttons.dart`).
          </Text>
          <View style={styles.column}>
            <Ux4gButton variant="primary" text="Primary Action" />
            <Ux4gButton variant="secondary" text="Secondary Action" />
            <Ux4gOutlineButton text="Outline Button Preset" />
            <Ux4gOutlineButton text="Red Outline Action" color={theme.colors.error} />
            <Ux4gTextButton text="Ghost / Text Button Preset" />
          </View>
        </View>

        {/* 2. Sizes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Sizes (`Ux4gButtonSize`)</Text>
          <Text style={styles.sectionDescription}>
            Consistent padding and height scaling across `small` (32pt), `medium` (40pt), and `large` (48pt).
          </Text>
          <View style={styles.row}>
            <Ux4gButton size="small" text="Small (32pt)" />
            <Ux4gButton size="medium" text="Medium (40pt)" />
          </View>
          <View style={styles.row}>
            <Ux4gButton size="large" text="Large (48pt)" />
          </View>
        </View>

        {/* 3. Interactive States (Loading & Disabled) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Interactive States</Text>
          <Text style={styles.sectionDescription}>
            Disabled opacity matching UX4G guidelines and loading indicator state.
          </Text>
          <View style={styles.row}>
            <Ux4gButton
              text="Disabled Primary"
              enabled={false}
            />
            <Ux4gOutlineButton
              text="Disabled Outline"
              enabled={false}
            />
          </View>
          <View style={styles.row}>
            <Ux4gButton
              text={loadingState ? 'Submitting...' : 'Click to Load (3s)'}
              isLoading={loadingState}
              onPress={() => {
                setLoadingState(true);
                setTimeout(() => setLoadingState(false), 3000);
              }}
            />
            <Ux4gIconButton
              variant="secondary"
              size={40}
              icon={renderIcon('⚙️')}
              isLoading={loadingState}
              onPress={() => {
                setLoadingState(true);
                setTimeout(() => setLoadingState(false), 3000);
              }}
            />
          </View>
        </View>

        {/* 4. Icons Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Icons & Asset Support</Text>
          <Text style={styles.sectionDescription}>
            Seamless integration with `leadingIcon`, `trailingIcon`, and dedicated `Ux4gIconButton`.
          </Text>
          <View style={styles.row}>
            <Ux4gButton
              text="Leading Icon"
              leadingIcon={renderIcon('★')}
            />
            <Ux4gButton
              variant="secondary"
              text="Trailing Icon"
              trailingIcon={renderIcon('→')}
            />
          </View>
          <View style={styles.row}>
            <Ux4gIconButton
              variant="primary"
              size={44}
              icon={renderIcon('♥')}
              onPress={() => {}}
            />
            <Ux4gIconButton
              variant="outline"
              size={44}
              icon={renderIcon('🔍')}
              onPress={() => {}}
            />
            <Ux4gIconButton
              variant="secondary"
              size={44}
              icon={renderIcon('⚙️')}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* 5. User Customization API (React Native Best Approach) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Complete Style Customization</Text>
          <Text style={styles.sectionDescription}>
            Demonstrating how developers can fully customize colors, radius, borders, and press animations.
          </Text>
          <View style={styles.card}>
            <Text style={[styles.sectionDescription, { marginBottom: 12 }]}>
              • Custom Pill Button (Green override + radius 999):
            </Text>
            <Ux4gButton
              text="Custom Pill Action"
              backgroundColor={Ux4gPalette.green500}
              borderRadius={999}
              contentColor={Ux4gPalette.white}
            />
          </View>

          <View style={styles.card}>
            <Text style={[styles.sectionDescription, { marginBottom: 12 }]}>
              • Custom Border + Letter Spacing Override:
            </Text>
            <Ux4gButton
              variant="outline"
              text="High-Contrast Outline"
              borderColor={Ux4gPalette.primary500}
              borderWidth={2}
              contentColor={Ux4gPalette.primary500}
              textStyle={{ fontWeight: '700', letterSpacing: 1.5 }}
            />
          </View>

          <View style={styles.card}>
            <Text style={[styles.sectionDescription, { marginBottom: 12 }]}>
              {'• Dynamic Scale on Press (({ pressed }) => style):'}
            </Text>
            <Ux4gButton
              text="Press & Hold for Scale Effect"
              backgroundColor={Ux4gPalette.gold500}
              contentColor={Ux4gPalette.neutral1000black}
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.95 : 1 }],
                shadowColor: Ux4gPalette.gold500,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: pressed ? 0.4 : 0.2,
                shadowRadius: 8,
              })}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const ButtonShowcase: React.FC = () => {
  return (
    <Ux4gThemeProvider>
      <ShowcaseContent />
    </Ux4gThemeProvider>
  );
};

export default ButtonShowcase;
