import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';
import { Ux4gButton } from '../components/button';
import { Ux4gModal } from '../components/modal';
import { Ux4gIcons } from '../foundation/icons';

export const ModalShowcase: React.FC = () => {
  const theme = useUx4gTheme();
  
  // States for all modal variants
  const [showDefault, setShowDefault] = useState(false);
  const [showDestructive, setShowDestructive] = useState(false);
  const [showMinimal, setShowMinimal] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showFullBleed, setShowFullBleed] = useState(false);
  const [showIconCentered, setShowIconCentered] = useState(false);
  const [showHeroLeftGradient, setShowHeroLeftGradient] = useState(false);
  const [showHeroLeftDestructive, setShowHeroLeftDestructive] = useState(false);
  const [showHeroCenterImage, setShowHeroCenterImage] = useState(false);
  const [showHeroCenterGradient, setShowHeroCenterGradient] = useState(false);

  // Helper for gradient background placeholder since we might not have expo-linear-gradient
  const gradientPlaceholder = (
    <View
      style={{
        flex: 1,
        backgroundColor: '#8E2DE2', // Solid fallback for gradient
      }}
    />
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.header, { color: theme.colors.onBackground }]}>
        Ux4gModal
      </Text>
      
      <Text style={[styles.description, { color: theme.colors.onBackground }]}>
        Common modal patterns used in the design system.
      </Text>

      <View style={styles.section}>
        <Text style={[styles.subHeader, { color: theme.colors.onBackground }]}>Basic Variants</Text>
        <View style={styles.buttonGrid}>
          <Ux4gButton text="1. Default (Left Aligned)" onPress={() => setShowDefault(true)} style={styles.button} />
          <Ux4gButton text="2. Destructive (Centered)" variant="secondary" onPress={() => setShowDestructive(true)} style={styles.button} />
          <Ux4gButton text="3. Minimal (No Header)" onPress={() => setShowMinimal(true)} style={styles.button} />
          <Ux4gButton text="4. Avatar (Padded Image)" onPress={() => setShowAvatar(true)} style={styles.button} />
          <Ux4gButton text="5. Full-Bleed Image" onPress={() => setShowFullBleed(true)} style={styles.button} />
          <Ux4gButton text="6. Icon Centered" onPress={() => setShowIconCentered(true)} style={styles.button} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subHeader, { color: theme.colors.onBackground }]}>Hero Image Variants</Text>
        <View style={styles.buttonGrid}>
          <Ux4gButton text="7. Hero Left Gradient" onPress={() => setShowHeroLeftGradient(true)} style={styles.button} />
          <Ux4gButton text="8. Hero Left Destructive" variant="secondary" onPress={() => setShowHeroLeftDestructive(true)} style={styles.button} />
          <Ux4gButton text="9. Hero Center Image" onPress={() => setShowHeroCenterImage(true)} style={styles.button} />
          <Ux4gButton text="10. Hero Center Gradient (Destructive)" variant="secondary" onPress={() => setShowHeroCenterGradient(true)} style={styles.button} />
        </View>
      </View>

      {/* 1. Default (Left Aligned) */}
      <Ux4gModal
        visible={showDefault}
        onDismiss={() => setShowDefault(false)}
        headerTitle="Default Modal"
        bodyText="This is the standard left-aligned modal with two footer buttons."
        footerButtons="twoButtons"
        footerAlign="right"
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        onPrimaryClick={() => setShowDefault(false)}
        onSecondaryClick={() => setShowDefault(false)}
      />

      {/* 2. Destructive (Centered) */}
      <Ux4gModal
        visible={showDestructive}
        onDismiss={() => setShowDestructive(false)}
        headerTitle="Warning"
        subtitleText="Delete Item?"
        showSubtitle={true}
        bodyText="Are you sure you want to permanently delete this item?"
        alignment="centered"
        footerAlign="center"
        isDestructive={true}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onPrimaryClick={() => setShowDestructive(false)}
        onSecondaryClick={() => setShowDestructive(false)}
      />

      {/* 3. Minimal (No Image, No Header) */}
      <Ux4gModal
        visible={showMinimal}
        onDismiss={() => setShowMinimal(false)}
        headerImageStyle="none"
        showHeader={false}
        subtitleText="Confirm Action"
        showSubtitle={true}
        bodyText="This will permanently remove the selected items. Continue?"
        footerAlign="split"
        showCloseButton={false}
        primaryButtonText="Continue"
        secondaryButtonText="Cancel"
        onPrimaryClick={() => setShowMinimal(false)}
        onSecondaryClick={() => setShowMinimal(false)}
      />

      {/* 4. Avatar (Padded Image) */}
      <Ux4gModal
        visible={showAvatar}
        onDismiss={() => setShowAvatar(false)}
        headerImageContent={
          <View style={{ flex: 1, backgroundColor: 'rgba(106, 78, 255, 0.1)' }} />
        }
        headerImageStyle="padded"
        leadingItem="avatar"
        avatarInitials="JD"
        alignment="centered"
        headerTitle="John Doe"
        descriptionText="Administrator"
        showDescription={true}
        primaryButtonText="Confirm"
        onPrimaryClick={() => setShowAvatar(false)}
      />

      {/* 5. Full-Bleed Image Header */}
      <Ux4gModal
        visible={showFullBleed}
        onDismiss={() => setShowFullBleed(false)}
        headerImageUrl="https://picsum.photos/seed/modal/600/300"
        headerImageStyle="fullBleed"
        headerTitle="Image Header"
        descriptionText="Optional description below header"
        showDescription={true}
        bodyText="Modals with full-bleed images are great for onboarding or marketing content."
        footerButtons="twoButtons"
        primaryButtonText="Continue"
        secondaryButtonText="Back"
        onPrimaryClick={() => setShowFullBleed(false)}
        onSecondaryClick={() => setShowFullBleed(false)}
      />

      {/* 6. Icon Centered */}
      <Ux4gModal
        visible={showIconCentered}
        onDismiss={() => setShowIconCentered(false)}
        leadingItem="icon"
        leadingIcon={Ux4gIcons.info({ size: 24, color: theme.colors.onSurface })}
        alignment="centered"
        headerTitle="Header"
        showDescription={true}
        descriptionText="Write description here"
        showSubtitle={true}
        subtitleText="Subtitle"
        bodyText="A modal is a design element that pops up over the main content of a webpage. It demands the user's attention by temporarily disabling interaction with the rest of the page until the user addresses the content within the modal."
        primaryButtonText="Save"
        secondaryButtonText="Close"
        onPrimaryClick={() => setShowIconCentered(false)}
        onSecondaryClick={() => setShowIconCentered(false)}
      />

      {/* 7. Hero Left Gradient */}
      <Ux4gModal
        visible={showHeroLeftGradient}
        onDismiss={() => setShowHeroLeftGradient(false)}
        headerImageContent={gradientPlaceholder}
        headerImageStyle="fullBleed"
        leadingItem="icon"
        leadingIcon={Ux4gIcons.search({ size: 24, color: theme.colors.onSurface })}
        alignment="leftAligned"
        headerTitle="Header"
        showDescription={true}
        descriptionText="Write description here"
        showSubtitle={true}
        subtitleText="Subtitle"
        bodyText="A modal is a design element that appears over the main content of a webpage, capturing the user's attention by disabling interaction with the rest of the page until the modal is addressed."
        footerButtons="twoButtons"
        footerAlign="right"
        primaryButtonText="Button"
        secondaryButtonText="Button"
        onPrimaryClick={() => setShowHeroLeftGradient(false)}
        onSecondaryClick={() => setShowHeroLeftGradient(false)}
      />

      {/* 8. Hero Left Destructive */}
      <Ux4gModal
        visible={showHeroLeftDestructive}
        onDismiss={() => setShowHeroLeftDestructive(false)}
        headerImageUrl="https://picsum.photos/seed/promo1/600/300"
        headerImageStyle="fullBleed"
        leadingItem="icon"
        leadingIcon={Ux4gIcons.warning({ size: 24, color: '#D32F2F' })}
        alignment="leftAligned"
        headerTitle="Header"
        showDescription={true}
        descriptionText="Write description here"
        showSubtitle={true}
        subtitleText="Subtitle"
        bodyText="A modal is a design element that appears over the main content of a webpage, capturing the user's attention by disabling interaction with the rest of the page until the modal is addressed."
        footerButtons="twoButtons"
        footerAlign="right"
        isDestructive={true}
        primaryButtonText="Button"
        secondaryButtonText="Button"
        onPrimaryClick={() => setShowHeroLeftDestructive(false)}
        onSecondaryClick={() => setShowHeroLeftDestructive(false)}
      />

      {/* 9. Hero Center Image */}
      <Ux4gModal
        visible={showHeroCenterImage}
        onDismiss={() => setShowHeroCenterImage(false)}
        headerImageUrl="https://picsum.photos/seed/promo2/600/300"
        headerImageStyle="fullBleed"
        leadingItem="icon"
        leadingIcon={Ux4gIcons.success({ size: 24, color: theme.colors.onSurface })}
        alignment="centered"
        headerTitle="Header"
        showDescription={true}
        descriptionText="Write description here"
        showSubtitle={true}
        subtitleText="Subtitle"
        bodyText="A modal is a design element that appears over the main content of a webpage, capturing the user's attention by disabling interaction with the rest of the page until the modal is addressed."
        footerButtons="twoButtons"
        footerAlign="center"
        primaryButtonText="Button"
        secondaryButtonText="Button"
        onPrimaryClick={() => setShowHeroCenterImage(false)}
        onSecondaryClick={() => setShowHeroCenterImage(false)}
      />

      {/* 10. Hero Center Gradient (Destructive) */}
      <Ux4gModal
        visible={showHeroCenterGradient}
        onDismiss={() => setShowHeroCenterGradient(false)}
        headerImageContent={gradientPlaceholder}
        headerImageStyle="fullBleed"
        leadingItem="icon"
        leadingIcon={Ux4gIcons.warning({ size: 24, color: '#D32F2F' })}
        alignment="centered"
        headerTitle="Header"
        showDescription={true}
        descriptionText="Write description here"
        showSubtitle={true}
        subtitleText="Subtitle"
        bodyText="A modal is a design element that appears over the main content of a webpage, capturing the user's attention by disabling interaction with the rest of the page until the modal is addressed."
        footerButtons="twoButtons"
        footerAlign="center"
        isDestructive={true}
        primaryButtonText="Button"
        secondaryButtonText="Button"
        onPrimaryClick={() => setShowHeroCenterGradient(false)}
        onSecondaryClick={() => setShowHeroCenterGradient(false)}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 24,
    opacity: 0.8,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  section: {
    marginBottom: 32,
  },
  buttonGrid: {
    flexDirection: 'column',
    gap: 12,
  },
  button: {
    width: '100%',
  }
});
