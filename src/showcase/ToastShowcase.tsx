import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';
import { useUx4gToast, Ux4gToast } from '../components/toast/Toast';
import { Ux4gButton } from '../components/button/Button';

/**
 * **ToastShowcase**
 *
 * Demonstrates the `Ux4gToast` component and the `useUx4gToast` hook.
 * Showcases all `category` variants, layouts (`full`, `stacked`), and actions.
 */
export const ToastShowcase: React.FC = () => {
  const { colors, typography, isDark } = useUx4gTheme();
  const { showToast, dismiss } = useUx4gToast();

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

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onBackground }]}>
          🍞 Toast (`Ux4gToast`)
        </Text>
        <Text style={subtitleStyle}>
          Ephemeral animated overlay component. Use `useUx4gToast()` to trigger notifications from anywhere inside a `Ux4gToastProvider`.
        </Text>
      </View>

      {/* ── SECTION 0: Static Variants ─────────────────────────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>0. All Static Variants (Inline)</Text>
        <Text style={subtitleStyle}>
          Statically rendered examples of all layouts, actions, and categories.
        </Text>

        <View style={styles.staticList}>
          {/* Full Layouts */}
          <Text style={[typography.lM_strong, { color: colors.onSurface, marginTop: 8 }]}>Full Layout (Default)</Text>
          <Ux4gToast
            category="info"
            title="Information"
            subtitle="This is an info toast message."
            layout="full"
          />
          <Ux4gToast
            category="success"
            title="Successfully Saved"
            subtitle="Your profile has been updated."
            layout="full"
          />
          <Ux4gToast
            category="warning"
            title="Storage Almost Full"
            subtitle="Please free up some space soon."
            layout="full"
          />
          <Ux4gToast
            category="error"
            title="Connection Lost"
            subtitle="Failed to connect to the server."
            layout="full"
          />
          <Ux4gToast
            category="slot"
            title="Custom Action Required"
            layout="full"
          />

          {/* Stacked Layouts */}
          <Text style={[typography.lM_strong, { color: colors.onSurface, marginTop: 16 }]}>Stacked Layout</Text>
          <Ux4gToast
            category="info"
            title="Update Available"
            subtitle="A new software version is ready to be installed."
            layout="stacked"
          />

          {/* Action & Configuration States */}
          <Text style={[typography.lM_strong, { color: colors.onSurface, marginTop: 16 }]}>With Actions & Configurations</Text>
          <Ux4gToast
            category="warning"
            title="Network Offline"
            subtitle="Please reconnect to the internet."
            actionText="RETRY"
            onActionClick={() => {}}
            layout="full"
          />
          <Ux4gToast
            category="success"
            title="File Uploaded Successfully"
            showCloseButton={false}
            layout="full"
          />
          <Ux4gToast
            category="error"
            title="Critical Error Occurred"
            subtitle="The system failed to start properly."
            actionText="RESTART"
            onActionClick={() => {}}
            showCloseButton={false}
            layout="stacked"
          />
        </View>
      </View>

      {/* ── SECTION 1: Standard Categories (Top Position) ─────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>1. Standard Semantic Categories (Top Position)</Text>
        <Text style={subtitleStyle}>
          Trigger default toasts sliding in from the TOP of the screen (`isBottom: false`).
        </Text>

        <View style={styles.buttonGrid}>
          <Ux4gButton
            text="Show Info"
            onPress={() =>
              showToast({
                category: 'info',
                title: 'Information',
                subtitle: 'This is an info toast message.',
                isBottom: false,
              })
            }
          />
          <Ux4gButton
            text="Show Success"
            backgroundColor={colors.success}
            onPress={() =>
              showToast({
                category: 'success',
                title: 'Successfully Saved',
                subtitle: 'Your profile has been updated.',
                isBottom: false,
              })
            }
          />
        </View>
      </View>

      {/* ── SECTION 2: Standard Categories (Bottom Position) ──────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>2. Semantic Categories (Bottom Position)</Text>
        <Text style={subtitleStyle}>
          Trigger default toasts sliding in from the BOTTOM of the screen (`isBottom: true`).
        </Text>

        <View style={styles.buttonGrid}>
          <Ux4gButton
            text="Show Warning"
            backgroundColor={colors.warning}
            onPress={() =>
              showToast({
                category: 'warning',
                title: 'Storage Almost Full',
                subtitle: 'Please free up some space soon.',
                isBottom: true,
              })
            }
          />
          <Ux4gButton
            text="Show Error"
            backgroundColor={colors.error}
            onPress={() =>
              showToast({
                category: 'error',
                title: 'Connection Lost',
                subtitle: 'Failed to connect to the server.',
                isBottom: true,
              })
            }
          />
          <Ux4gButton
            text="Show Slot (Custom)"
            onPress={() =>
              showToast({
                category: 'slot',
                title: 'Custom Action Required',
                isBottom: true,
              })
            }
          />
        </View>
      </View>

      {/* ── SECTION 3: Layouts & Actions ───────────────────────────────────── */}
      <View style={cardStyle}>
        <Text style={titleStyle}>3. Layouts, Actions & Timing</Text>
        <Text style={subtitleStyle}>
          Toasts can have action buttons and auto-close behaviors.
        </Text>

        <View style={styles.buttonGrid}>
          <Ux4gButton
            text="With Action (Auto-close 5s)"
            onPress={() =>
              showToast({
                category: 'info',
                title: 'New Update Available',
                actionText: 'UPDATE',
                onActionClick: () => {
                   dismiss();
                   console.log('Update clicked!');
                },
                durationMs: 5000,
              })
            }
          />
          <Ux4gButton
            text="Persistent (No Auto-close)"
            onPress={() =>
              showToast({
                category: 'warning',
                title: 'Network Offline',
                subtitle: 'Please reconnect to the internet.',
                autoClose: false,
                actionText: 'RETRY',
                onActionClick: () => dismiss(),
              })
            }
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
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  staticList: {
    flexDirection: 'column',
    gap: 12,
  },
});
