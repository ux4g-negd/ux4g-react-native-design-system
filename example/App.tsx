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
import { AvatarShowcase, ChipsShowcase, DropdownShowcase, InputFieldShowcase, SearchFieldShowcase, TextAreaShowcase, AccordionShowcase, AadhaarInputFieldShowcase, PanInputFieldShowcase, ToastShowcase, ModalShowcase, Ux4gThemeProvider, useUx4gTheme, Ux4gToastProvider } from '../src/index';

type ActiveTab =
  | 'spinners'
  | 'buttons'
  | 'checkboxes'
  | 'radios'
  | 'dividers'
  | 'switches'
  | 'tags'
  | 'badges'
  | 'social-links'
  | 'avatar'
  | 'chips'
  | 'dropdown'
  | 'input-field'
  | 'search-field'
  | 'text-area'
  | 'accordion'
  | 'aadhaar-input-field'
  | 'pan-input-field'
  | 'toast'
  | 'modal';

const ShowcaseHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('toast');
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

          <Pressable
            onPress={() => setActiveTab('avatar')}
            style={[
              styles.tabItem,
              activeTab === 'avatar' && [
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
                    activeTab === 'avatar'
                      ? theme.colors.onPrimary
                      : theme.isDark
                        ? '#A1A1AA'
                        : '#52525B',
                },
              ]}
            >
              👤 Avatar
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('chips')}
            style={[
              styles.tabItem,
              activeTab === 'chips' && [
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
                    activeTab === 'chips'
                      ? theme.colors.onPrimary
                      : theme.isDark
                        ? '#A1A1AA'
                        : '#52525B',
                },
              ]}
            >
              🍟 Chips
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('dropdown')}
            style={[
              styles.tabItem,
              activeTab === 'dropdown' && [
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
                    activeTab === 'dropdown'
                      ? theme.colors.onPrimary
                      : theme.isDark
                        ? '#A1A1AA'
                        : '#52525B',
                },
              ]}
            >
              🔽 Dropdown
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('input-field')}
            style={[
              styles.tabItem,
              activeTab === 'input-field' && [
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
                    activeTab === 'input-field'
                      ? theme.colors.onPrimary
                      : theme.isDark
                        ? '#A1A1AA'
                        : '#52525B',
                },
              ]}
            >
              📝 Input Field
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('search-field')}
            style={[
              styles.tabItem,
              activeTab === 'search-field' && [
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
                    activeTab === 'search-field'
                      ? theme.colors.onPrimary
                      : theme.isDark
                        ? '#A1A1AA'
                        : '#52525B',
                },
              ]}
            >
              🔍 Search Field
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('text-area')}
            style={[
              styles.tabItem,
              activeTab === 'text-area' && [
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
                    activeTab === 'text-area'
                      ? theme.colors.onPrimary
                      : theme.isDark
                        ? '#A1A1AA'
                        : '#52525B',
                },
              ]}
            >
              📄 Text Area
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('accordion')}
            style={[
              styles.tabItem,
              activeTab === 'accordion' && [
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
                    activeTab === 'accordion'
                      ? theme.colors.onPrimary
                      : theme.isDark
                        ? '#A1A1AA'
                        : '#52525B',
                },
              ]}
            >
              🪗 Accordion
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('aadhaar-input-field')}
            style={[
              styles.tabItem,
              activeTab === 'aadhaar-input-field' && [
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
                    activeTab === 'aadhaar-input-field'
                      ? theme.colors.onPrimary
                      : theme.isDark
                        ? '#A1A1AA'
                        : '#52525B',
                },
              ]}
            >
              🆔 Aadhaar Input
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('pan-input-field')}
            style={[
              styles.tabItem,
              activeTab === 'pan-input-field' && [
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
                    activeTab === 'pan-input-field'
                      ? theme.colors.onPrimary
                      : theme.isDark
                        ? '#A1A1AA'
                        : '#52525B',
                },
              ]}
            >
              💳 PAN Input
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('toast')}
            style={[
              styles.tabItem,
              activeTab === 'toast' && [
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
                    activeTab === 'toast'
                      ? theme.colors.onPrimary
                      : theme.isDark
                        ? '#A1A1AA'
                        : '#52525B',
                },
              ]}
            >
              🍞 Toast
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('modal')}
            style={[
              styles.tabItem,
              activeTab === 'modal' && [
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
                    activeTab === 'modal'
                      ? theme.colors.onPrimary
                      : theme.isDark
                        ? '#A1A1AA'
                        : '#52525B',
                },
              ]}
            >
              🪟 Modal
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
        ) : activeTab === 'avatar' ? (
          <AvatarShowcase />
        ) : activeTab === 'chips' ? (
          <ChipsShowcase />
        ) : activeTab === 'dropdown' ? (
          <DropdownShowcase />
        ) : activeTab === 'input-field' ? (
          <InputFieldShowcase />
        ) : activeTab === 'search-field' ? (
          <SearchFieldShowcase />
        ) : activeTab === 'text-area' ? (
          <TextAreaShowcase />
        ) : activeTab === 'accordion' ? (
          <AccordionShowcase />
        ) : activeTab === 'aadhaar-input-field' ? (
          <AadhaarInputFieldShowcase />
        ) : activeTab === 'pan-input-field' ? (
          <PanInputFieldShowcase />
        ) : activeTab === 'toast' ? (
          <ToastShowcase />
        ) : activeTab === 'modal' ? (
          <ModalShowcase />
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
      <Ux4gToastProvider isBottom={true}>
        <ShowcaseHub />
      </Ux4gToastProvider>
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
