import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Ux4gCard } from '../components/card/Card';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';
import { UX4GColors } from '../foundation/colors';
import { Ux4gTag } from '../components/tag/Tag';
import { Ux4gAvatar } from '../components/avatar/Avatar';
import { Ux4gIconButton } from '../components/button/IconButton';
import { Ux4gButton } from '../components/button/Button';

export const CardShowcase: React.FC = () => {
  const theme = useUx4gTheme();
  const colors = theme.colors;

  const cardContainerStyle = [
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

  // Dummy shapes icon used in the Figma mockup
  const StatusTag = ({ withSeparator = false }: { withSeparator?: boolean }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ux4gTag
        text="Label"
        style="text"
        size="m"
        leadingContent={<Text style={{ fontSize: 12, color: colors.onSurface }}>⁂</Text>}
      />
      {withSeparator && (
        <Text style={{ color: theme.isDark ? '#52525B' : '#D4D4D8', marginHorizontal: 4 }}>|</Text>
      )}
    </View>
  );

  const BottomTag = () => (
    <Ux4gTag
      text="Label"
      style="tonal"
      size="m"
      colorScheme="neutral"
      leadingContent={<Text style={{ fontSize: 12, color: colors.onSurface }}>⁂</Text>}
    />
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          💳 Card Component
        </Text>
        <Text style={subtitleStyle}>
          All possible variants based on Widgetbook and Figma designs.
        </Text>
      </View>

      {/* 1. Basic Content */}
      <View style={cardContainerStyle}>
        <Text style={titleStyle}>1. Basic Content</Text>
        <Text style={subtitleStyle}>A surface container with optional title, subtitle, and body text.</Text>
        <View style={styles.demoContainer}>
          <Ux4gCard
            title="Card Title"
            subtitle="Card subtitle"
            body="This is the card body."
            elevation={1}
            borderWidth={1}
            borderColor={theme.isDark ? '#333333' : '#E4E4E7'}
          />
        </View>
      </View>

      {/* 2. With Footer Buttons */}
      <View style={cardContainerStyle}>
        <Text style={titleStyle}>2. With Footer Buttons</Text>
        <Text style={subtitleStyle}>Attach primary and/or secondary action buttons to the card footer.</Text>
        <View style={styles.demoContainer}>
          <Ux4gCard
            title="Card with Actions"
            body="This card has primary and secondary action buttons."
            footerType="primaryAndSecondary"
            primaryButtonText="Confirm"
            secondaryButtonText="Cancel"
            elevation={1}
            borderWidth={1}
            borderColor={theme.isDark ? '#333333' : '#E4E4E7'}
          />
        </View>
      </View>

      {/* 3. With Media */}
      <View style={cardContainerStyle}>
        <Text style={titleStyle}>3. With Media</Text>
        <Text style={subtitleStyle}>Provide a mediaImageUrl to display a hero image at the top.</Text>
        <View style={styles.demoContainer}>
          <Ux4gCard
            title="Media Card"
            subtitle="Hero image above content"
            body="This card displays a hero image at the top."
            mediaImageUrl="https://picsum.photos/400/250"
            elevation={2}
          />
        </View>
      </View>

      {/* 4. Horizontal Layout */}
      <View style={cardContainerStyle}>
        <Text style={titleStyle}>4. Horizontal Layout</Text>
        <Text style={subtitleStyle}>Media thumbnail appears on the left side.</Text>
        <View style={styles.demoContainer}>
          <Ux4gCard
            direction="horizontal"
            title="Horizontal Card"
            subtitle="Side-by-side layout"
            body="The media thumbnail appears on the left in horizontal mode."
            mediaImageUrl="https://picsum.photos/300/300"
            elevation={2}
          />
        </View>
      </View>

      {/* 5. Complex Rich Card (Vertical) */}
      <View style={cardContainerStyle}>
        <Text style={titleStyle}>5. Complex Rich Card</Text>
        <Text style={subtitleStyle}>Replicating complex UI layouts matching the Figma designs.</Text>
        <View style={styles.demoContainer}>
          <Ux4gCard
            mediaImageUrl="https://picsum.photos/400/200"
            mediaLabelText="Label"
            mediaTrailingAction={
              <Ux4gIconButton
                icon={() => <Text style={{ color: 'white' }}>⏏</Text>}
                variant="ghost"
                backgroundColor="rgba(0,0,0,0.3)"
                size={32}
              />
            }
            avatar={<Ux4gAvatar initials="JD" size="l" />}
            title="Title"
            subtitle="Subtitle"
            headerTrailingAction={
              <Ux4gIconButton
                icon={() => <Text style={{ color: colors.primary }}>⁂</Text>}
                variant="ghost"
              />
            }
            statusChips={[<StatusTag key="1" withSeparator />, <StatusTag key="2" withSeparator />, <StatusTag key="3" />]}
            body="Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development."
            bottomChips={[<BottomTag key="1" />, <BottomTag key="2" />, <BottomTag key="3" />, <BottomTag key="4" />]}
            footerType="primaryAndSecondary"
            primaryButtonText="Button"
            primaryButtonLeadingIcon={<Text style={{ color: 'white' }}>+</Text>}
            primaryButtonTrailingIcon={<Text style={{ color: 'white' }}>▼</Text>}
            secondaryButtonText="Button"
            secondaryButtonLeadingIcon={<Text style={{ color: colors.primary }}>+</Text>}
            secondaryButtonTrailingIcon={<Text style={{ color: colors.primary }}>▼</Text>}
            elevation={2}
          />
        </View>
      </View>

      {/* 6. Complex Rich Card (Horizontal) */}
      <View style={cardContainerStyle}>
        <Text style={titleStyle}>6. Complex Rich Card (Horizontal)</Text>
        <Text style={subtitleStyle}>Rich card layout in a horizontal orientation.</Text>
        <View style={styles.demoContainer}>
          <Ux4gCard
            direction="horizontal"
            mediaImageUrl="https://picsum.photos/300/400"
            mediaWidth={140}
            mediaLabelText="Label"
            mediaTrailingAction={
              <Ux4gIconButton
                icon={() => <Text style={{ color: 'white' }}>⏏</Text>}
                variant="ghost"
                backgroundColor="rgba(0,0,0,0.3)"
                size={32}
              />
            }
            avatar={<Ux4gAvatar imageUrl="https://picsum.photos/100/100" size="l" />}
            title="Title"
            subtitle="Subtitle"
            headerTrailingAction={
              <Ux4gIconButton
                icon={() => <Text style={{ color: colors.primary }}>⁂</Text>}
                variant="ghost"
              />
            }
            statusChips={[<StatusTag key="1" withSeparator />, <StatusTag key="2" withSeparator />, <StatusTag key="3" />]}
            body="Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development."
            bottomChips={[<BottomTag key="1" />, <BottomTag key="2" />, <BottomTag key="3" />, <BottomTag key="4" />]}
            footerType="primaryAndSecondary"
            primaryButtonText="Button"
            secondaryButtonText="Button"
            elevation={2}
          />
        </View>
      </View>

      {/* 7. Custom Rich Card (Children) */}
      <View style={cardContainerStyle}>
        <Text style={titleStyle}>7. Custom Rich Card (Children)</Text>
        <Text style={subtitleStyle}>Replicating highly custom layouts using the 'children' prop.</Text>
        <View style={styles.demoContainer}>
          <Ux4gCard elevation={2}>
            {/* Custom Media Stack */}
            <View style={{ height: 180, width: '100%' }}>
              <Image source={{ uri: 'https://picsum.photos/400/200' }} style={{ width: '100%', height: '100%' }} />
              <View style={{ position: 'absolute', top: 8, left: 8 }}>
                <Ux4gTag text="Label" size="m" leadingContent={<Text style={{ color: 'white' }}>⁂</Text>} customBackgroundColor="black" customContentColor="white" />
              </View>
              <View style={{ position: 'absolute', top: 8, right: 8 }}>
                <Ux4gIconButton icon={() => <Text style={{ color: 'white' }}>⏏</Text>} variant="ghost" backgroundColor="rgba(0,0,0,0.3)" size={32} />
              </View>
            </View>

            {/* Content Body */}
            <View style={{ padding: 16 }}>
              {/* Special Tag Row from Image 2 */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <Ux4gTag text="Label" style="tonal" size="m" leadingContent={<Text>⁂</Text>} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ marginRight: 4, color: colors.onSurface }}>⁂</Text>
                  <Text style={{ color: colors.onSurface }}>Label</Text>
                </View>
              </View>

              {/* Header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ux4gAvatar imageUrl="https://picsum.photos/100/100" size="l" />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.onSurface }}>Title</Text>
                  <Text style={{ fontSize: 14, color: theme.isDark ? '#A1A1AA' : '#71717A' }}>Subtitle</Text>
                </View>
                <Ux4gIconButton icon={() => <Text style={{ color: colors.primary }}>⁂</Text>} variant="ghost" />
              </View>

              {/* Status Chips */}
              <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                <StatusTag withSeparator />
                <StatusTag withSeparator />
                <StatusTag />
              </View>

              {/* Body */}
              <Text style={{ fontSize: 14, color: colors.onSurface, marginBottom: 12 }}>
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.
              </Text>

              {/* Bottom Chips */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                <BottomTag />
                <BottomTag />
                <BottomTag />
                <BottomTag />
              </View>

              {/* Custom Footer */}
              <Ux4gButton text="Button" width="100%" />
            </View>
          </Ux4gCard>
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
    paddingBottom: 40,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  subText: {
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  demoContainer: {
    marginTop: 12,
  },
});
