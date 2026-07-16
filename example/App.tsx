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
} from 'react-native';
import { ButtonShowcase } from '../src/showcase/ButtonShowcase';
import { SpinnerShowcase } from '../src/showcase/SpinnerShowcase';
import { CheckboxShowcase } from '../src/showcase/CheckboxShowcase';
import { RadioButtonShowcase } from '../src/showcase/RadioButtonShowcase';
import { Ux4gThemeProvider, useUx4gTheme } from '../src/index';

type ActiveTab = 'spinners' | 'buttons' | 'checkboxes' | 'radios';

const ShowcaseHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('radios');
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
            🔘 Radios
          </Text>
        </Pressable>
      </View>

      {/* Active Component Showcase */}
      <View style={styles.content}>
        {activeTab === 'spinners' ? (
          <SpinnerShowcase />
        ) : activeTab === 'buttons' ? (
          <ButtonShowcase />
        ) : activeTab === 'checkboxes' ? (
          <CheckboxShowcase />
        ) : (
          <RadioButtonShowcase />
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
    flexDirection: 'row',
    margin: 16,
    marginBottom: 4,
    padding: 4,
    borderRadius: 12,
    borderWidth: 1,
    zIndex: 10,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
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
