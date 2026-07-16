/**
 * Internal Test Host App for UX4G React Native Design System (`ux4g-react-native-design-system`).
 * Renders a Component Showcase Hub with tabs to easily toggle between `<SpinnerShowcase />` and `<ButtonShowcase />`.
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ButtonShowcase } from '../src/showcase/ButtonShowcase';
import { SpinnerShowcase } from '../src/showcase/SpinnerShowcase';
import { CheckboxShowcase } from '../src/showcase/CheckboxShowcase';
import { RadioButtonShowcase } from '../src/showcase/RadioButtonShowcase';
import { DividerShowcase } from '../src/showcase/DividerShowcase';
import { SwitchShowcase } from '../src/showcase/SwitchShowcase';
import { TagShowcase } from '../src/showcase/TagShowcase';
import { BadgeShowcase } from '../src/showcase/BadgeShowcase';
import { SocialLinksShowcase } from '../src/showcase/SocialLinksShowcase';
import { Ux4gThemeProvider, useUx4gTheme } from '../src/index';

type ActiveTab =
  | 'spinners'
  | 'buttons'
  | 'checkboxes'
  | 'radios'
  | 'dividers'
  | 'switches'
  | 'tags'
  | 'badges'
  | 'social-links';

const ShowcaseHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('badges');
  const theme = useUx4gTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Navigation Switcher Bar */}
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: theme.isDark ? '#1F1F1F' : '#F4F4F5',
            borderColor: theme.isDark ? '#333333' : '#E4E4E7',
          },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContainer}
        >
          <Pressable
            onPress={() => setActiveTab('spinners')}
            style={[
              styles.tabItem,
              activeTab === 'spinners' && [
                styles.activeTabItem,
                { backgroundColor: theme.colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'spinners'
                      ? theme.colors.onPrimary
                      : theme.isDark
                      ? '#A1A1AA'
                      : '#52525B',
                },
              ]}
            >
              🔄 Spinners
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('buttons')}
            style={[
              styles.tabItem,
              activeTab === 'buttons' && [
                styles.activeTabItem,
                { backgroundColor: theme.colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'buttons'
                      ? theme.colors.onPrimary
                      : theme.isDark
                      ? '#A1A1AA'
                      : '#52525B',
                },
              ]}
            >
              🔘 Buttons
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('checkboxes')}
            style={[
              styles.tabItem,
              activeTab === 'checkboxes' && [
                styles.activeTabItem,
                { backgroundColor: theme.colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'checkboxes'
                      ? theme.colors.onPrimary
                      : theme.isDark
                      ? '#A1A1AA'
                      : '#52525B',
                },
              ]}
            >
              ☑️ Checkboxes
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('radios')}
            style={[
              styles.tabItem,
              activeTab === 'radios' && [
                styles.activeTabItem,
                { backgroundColor: theme.colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'radios'
                      ? theme.colors.onPrimary
                      : theme.isDark
                      ? '#A1A1AA'
                      : '#52525B',
                },
              ]}
            >
              🟢 Radios
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('dividers')}
            style={[
              styles.tabItem,
              activeTab === 'dividers' && [
                styles.activeTabItem,
                { backgroundColor: theme.colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'dividers'
                      ? theme.colors.onPrimary
                      : theme.isDark
                      ? '#A1A1AA'
                      : '#52525B',
                },
              ]}
            >
              ➖ Dividers
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('switches')}
            style={[
              styles.tabItem,
              activeTab === 'switches' && [
                styles.activeTabItem,
                { backgroundColor: theme.colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'switches'
                      ? theme.colors.onPrimary
                      : theme.isDark
                      ? '#A1A1AA'
                      : '#52525B',
                },
              ]}
            >
              🎚️ Switches
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('tags')}
            style={[
              styles.tabItem,
              activeTab === 'tags' && [
                styles.activeTabItem,
                { backgroundColor: theme.colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'tags'
                      ? theme.colors.onPrimary
                      : theme.isDark
                      ? '#A1A1AA'
                      : '#52525B',
                },
              ]}
            >
              🏷️ Tags
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('badges')}
            style={[
              styles.tabItem,
              activeTab === 'badges' && [
                styles.activeTabItem,
                { backgroundColor: theme.colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'badges'
                      ? theme.colors.onPrimary
                      : theme.isDark
                      ? '#A1A1AA'
                      : '#52525B',
                },
              ]}
            >
              🔴 Badges
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('social-links')}
            style={[
              styles.tabItem,
              activeTab === 'social-links' && [
                styles.activeTabItem,
                { backgroundColor: theme.colors.primary },
              ],
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'social-links'
                      ? theme.colors.onPrimary
                      : theme.isDark
                      ? '#A1A1AA'
                      : '#52525B',
                },
              ]}
            >
              🔗 Social
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Active Component Showcase */}
      <View style={styles.content}>
        {activeTab === 'spinners' ? (
          <SpinnerShowcase />
        ) : activeTab === 'buttons' ? (
          <ButtonShowcase />
        ) : activeTab === 'checkboxes' ? (
          <CheckboxShowcase />
        ) : activeTab === 'radios' ? (
          <RadioButtonShowcase />
        ) : activeTab === 'dividers' ? (
          <DividerShowcase />
        ) : activeTab === 'switches' ? (
          <SwitchShowcase />
        ) : activeTab === 'tags' ? (
          <TagShowcase />
        ) : activeTab === 'badges' ? (
          <BadgeShowcase />
        ) : (
          <SocialLinksShowcase />
        )}
      </View>
    </SafeAreaView>
  );
};

export default function App(): React.JSX.Element {
  return (
    <Ux4gThemeProvider>
      <ShowcaseHub />
    </Ux4gThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    margin: 16,
    marginBottom: 4,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    zIndex: 10,
  },
  tabScrollContainer: {
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabItem: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
});
