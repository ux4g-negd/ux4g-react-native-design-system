import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Ux4gThemeProvider,
  useUx4gTheme,
  useUx4gStyleSheet,
  Ux4gSpinner,
  Ux4gButton,
  Ux4gPalette,
} from '../index';

const ShowcaseContent: React.FC = () => {
  const theme = useUx4gTheme();
  const [speed, setSpeed] = useState<number>(1200);

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
      gap: t.space.space24,
      alignItems: 'center',
      marginBottom: t.space.space16,
    },
    itemCol: {
      alignItems: 'center',
      gap: t.space.space8,
    },
    label: {
      fontSize: 12,
      color: t.isDark ? Ux4gPalette.neutral300 : Ux4gPalette.neutral700,
      fontWeight: '500',
    },
    card: {
      padding: t.space.space16,
      borderRadius: t.radius.radius12,
      borderWidth: 1,
      borderColor: t.isDark ? Ux4gPalette.neutral800 : Ux4gPalette.neutral200,
      backgroundColor: t.isDark ? Ux4gPalette.neutral900 : Ux4gPalette.neutral50,
      marginBottom: t.space.space16,
    },
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.isDark ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with Theme Switcher */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Ux4gSpinner Showcase</Text>
            <Text style={styles.subtitle}>
              Ported from Flutter `Ux4gLoader` (`loader.dart`)
            </Text>
          </View>
          <Ux4gButton
            size="small"
            variant="outline"
            text={theme.isDark ? '☀️ Light' : '🌙 Dark'}
            onPress={theme.toggleTheme}
          />
        </View>

        {/* 1. Sizes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Sizes (`size`)</Text>
          <Text style={styles.sectionDescription}>
            Consistent scaling across small (`24`), default (`40`), and large (`64`) diameters.
          </Text>
          <View style={styles.row}>
            <View style={styles.itemCol}>
              <Ux4gSpinner size={24} strokeWidth={2.5} />
              <Text style={styles.label}>Small (24pt)</Text>
            </View>
            <View style={styles.itemCol}>
              <Ux4gSpinner size={40} strokeWidth={4} />
              <Text style={styles.label}>Default (40pt)</Text>
            </View>
            <View style={styles.itemCol}>
              <Ux4gSpinner size={64} strokeWidth={6} />
              <Text style={styles.label}>Large (64pt)</Text>
            </View>
          </View>
        </View>

        {/* 2. Colors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Color Overrides (`color`)</Text>
          <Text style={styles.sectionDescription}>
            Defaults to `theme.colors.primary`, but supports any hex, RGB, or theme color.
          </Text>
          <View style={styles.row}>
            <View style={styles.itemCol}>
              <Ux4gSpinner color={theme.colors.primary} />
              <Text style={styles.label}>Primary</Text>
            </View>
            <View style={styles.itemCol}>
              <Ux4gSpinner color={theme.colors.secondary} />
              <Text style={styles.label}>Secondary</Text>
            </View>
            <View style={styles.itemCol}>
              <Ux4gSpinner color={Ux4gPalette.green500} />
              <Text style={styles.label}>Success ({Ux4gPalette.green500})</Text>
            </View>
            <View style={styles.itemCol}>
              <Ux4gSpinner color={Ux4gPalette.pink500} />
              <Text style={styles.label}>Pink ({Ux4gPalette.pink500})</Text>
            </View>
          </View>
        </View>

        {/* 3. Stroke Thickness */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Stroke Thickness (`strokeWidth`)</Text>
          <Text style={styles.sectionDescription}>
            Customizable ring thickness from delicate thin lines to bold prominent indicators.
          </Text>
          <View style={styles.row}>
            <View style={styles.itemCol}>
              <Ux4gSpinner size={48} strokeWidth={2} />
              <Text style={styles.label}>Thin (2pt)</Text>
            </View>
            <View style={styles.itemCol}>
              <Ux4gSpinner size={48} strokeWidth={4} />
              <Text style={styles.label}>Default (4pt)</Text>
            </View>
            <View style={styles.itemCol}>
              <Ux4gSpinner size={48} strokeWidth={8} />
              <Text style={styles.label}>Thick (8pt)</Text>
            </View>
          </View>
        </View>

        {/* 4. Multi-Tone / Gradient Segments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Gradient / Multi-Tone Rings (`gradientColors`)</Text>
          <Text style={styles.sectionDescription}>
            Pass an array of colors (`gradientColors`) for multi-colored spinner segments.
          </Text>
          <View style={styles.row}>
            <View style={styles.itemCol}>
              <Ux4gSpinner
                size={52}
                strokeWidth={5}
                gradientColors={[Ux4gPalette.primary500, Ux4gPalette.pink500, Ux4gPalette.gold500, 'transparent']}
              />
              <Text style={styles.label}>Primary / Pink / Gold</Text>
            </View>
            <View style={styles.itemCol}>
              <Ux4gSpinner
                size={52}
                strokeWidth={5}
                gradientColors={[Ux4gPalette.green500, Ux4gPalette.blue500, 'transparent', 'transparent']}
              />
              <Text style={styles.label}>Green / Blue</Text>
            </View>
          </View>
        </View>

        {/* 5. Arc Percentages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Arc Percentages (`percentage`)</Text>
          <Text style={styles.sectionDescription}>
            Control the filled fraction of the rotating circle from `0` to `100`.
          </Text>
          <View style={styles.row}>
            <View style={styles.itemCol}>
              <Ux4gSpinner percentage={25} />
              <Text style={styles.label}>25% Arc</Text>
            </View>
            <View style={styles.itemCol}>
              <Ux4gSpinner percentage={50} />
              <Text style={styles.label}>50% Arc</Text>
            </View>
            <View style={styles.itemCol}>
              <Ux4gSpinner percentage={75} />
              <Text style={styles.label}>75% Arc</Text>
            </View>
            <View style={styles.itemCol}>
              <Ux4gSpinner percentage={100} />
              <Text style={styles.label}>100% Arc</Text>
            </View>
          </View>
        </View>

        {/* 6. Rotation Speeds */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Rotation Speeds (`rotationDurationMillis`)</Text>
          <Text style={styles.sectionDescription}>
            Change the speed of the 360° loop animation (`fast: 600ms`, `default: 1200ms`, `slow: 2400ms`).
          </Text>
          <View style={styles.card}>
            <View style={[styles.row, { justifyContent: 'center', marginBottom: 20 }]}>
              <Ux4gSpinner size={56} strokeWidth={5} rotationDurationMillis={speed} />
            </View>
            <View style={styles.row}>
              <Ux4gButton
                size="small"
                variant={speed === 600 ? 'primary' : 'outline'}
                text="Fast (600ms)"
                onPress={() => setSpeed(600)}
              />
              <Ux4gButton
                size="small"
                variant={speed === 1200 ? 'primary' : 'outline'}
                text="Default (1200ms)"
                onPress={() => setSpeed(1200)}
              />
              <Ux4gButton
                size="small"
                variant={speed === 2400 ? 'primary' : 'outline'}
                text="Slow (2400ms)"
                onPress={() => setSpeed(2400)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const SpinnerShowcase: React.FC = () => {
  return (
    <Ux4gThemeProvider>
      <ShowcaseContent />
    </Ux4gThemeProvider>
  );
};

export default SpinnerShowcase;
