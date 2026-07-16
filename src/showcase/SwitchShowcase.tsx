import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUx4gTheme } from '../theme/Ux4gThemeContext';
import { UX4GColors } from '../foundation/colors';
import { Ux4gSwitch, Ux4gSwitchSize } from '../components/switch/Switch';

export const SwitchShowcase: React.FC = () => {
  const theme = useUx4gTheme();

  // Basic toggles state
  const [wifiChecked, setWifiChecked] = useState(true);
  const [bluetoothChecked, setBluetoothChecked] = useState(false);
  const [airplaneChecked, setAirplaneChecked] = useState(false);

  // Sizes state
  const [sizeChecked, setSizeChecked] = useState(true);

  // Label positions state
  const [leftLabelChecked, setLeftLabelChecked] = useState(false);
  const [bothSidesChecked, setBothSidesChecked] = useState(true);
  const [noLabelChecked, setNoLabelChecked] = useState(true);

  // Description Status Variants state
  const [helperChecked, setHelperChecked] = useState(true);
  const [errorChecked, setErrorChecked] = useState(false);
  const [warningChecked, setWarningChecked] = useState(true);
  const [successChecked, setSuccessChecked] = useState(true);

  // Standalone No-Label Switches state
  const [noLabelS, setNoLabelS] = useState(false);
  const [noLabelM, setNoLabelM] = useState(true);
  const [noLabelL, setNoLabelL] = useState(true);
  const [standaloneRow1, setStandaloneRow1] = useState(true);
  const [standaloneRow2, setStandaloneRow2] = useState(false);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: theme.isDark ? UX4GColors.neutral800 : UX4GColors.neutral200 },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: theme.isDark ? UX4GColors.white : theme.colors.primary },
          ]}
        >
          Ux4gSwitch (`Ux4gSwitchProps`)
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
          Complete React Native port of Flutter `toggle.dart` (`Ux4gSwitch`), supporting exact sizes, label positioning, secondary labels, and status variants (`helper`, `error`, `warning`, `success`).
        </Text>
      </View>

      {/* 1. Basic Switch & States (`checked`, `unchecked`, `disabled`) */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          1. Basic Toggle States (`checked`, `unchecked`, `disabled`)
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.isDark ? UX4GColors.neutral900 : UX4GColors.neutral50,
              borderColor: theme.isDark ? UX4GColors.neutral800 : UX4GColors.neutral200,
            },
          ]}
        >
          <Ux4gSwitch
            checked={wifiChecked}
            onCheckedChange={setWifiChecked}
            label="Wi-Fi Connectivity"
            description="Automatically connect to known Wi-Fi networks"
          />

          <View style={styles.spacer} />

          <Ux4gSwitch
            checked={bluetoothChecked}
            onCheckedChange={setBluetoothChecked}
            label="Bluetooth"
            description="Allow nearby Bluetooth devices to connect"
          />

          <View style={styles.spacer} />

          <Ux4gSwitch
            checked={true}
            enabled={false}
            label="Cellular Data (Disabled - Checked)"
            description="Cellular network connection is locked by administrator"
          />

          <View style={styles.spacer} />

          <Ux4gSwitch
            checked={false}
            enabled={false}
            label="Data Roaming (Disabled - Unchecked)"
            description="International data roaming is turned off"
          />
        </View>
      </View>

      {/* 2. Switch Sizes (`Ux4gSwitchSize`) */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          2. Sizes (`s`/`small`, `m`/`medium`, `l`/`large`)
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.isDark ? UX4GColors.neutral900 : UX4GColors.neutral50,
              borderColor: theme.isDark ? UX4GColors.neutral800 : UX4GColors.neutral200,
            },
          ]}
        >
          <Ux4gSwitch
            size="s"
            checked={sizeChecked}
            onCheckedChange={setSizeChecked}
            label="Small Size (`size='s'` / 32x18px)"
            description="Compact switch suitable for dense table rows or toolbars"
          />

          <View style={styles.spacer} />

          <Ux4gSwitch
            size="m"
            checked={sizeChecked}
            onCheckedChange={setSizeChecked}
            label="Medium Size (`size='m'` / 40x22px - Default)"
            description="Standard form control switch size"
          />

          <View style={styles.spacer} />

          <Ux4gSwitch
            size="l"
            checked={sizeChecked}
            onCheckedChange={setSizeChecked}
            label="Large Size (`size='l'` / 48x28px)"
            description="Prominent switch control for primary settings panels"
          />
        </View>
      </View>

      {/* 3. Label Positioning (`Ux4gSwitchLabelPosition`) */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          3. Label Positioning (`right`, `left`, `bothSides`, `noLabel`)
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.isDark ? UX4GColors.neutral900 : UX4GColors.neutral50,
              borderColor: theme.isDark ? UX4GColors.neutral800 : UX4GColors.neutral200,
            },
          ]}
        >
          <Ux4gSwitch
            labelPosition="right"
            checked={airplaneChecked}
            onCheckedChange={setAirplaneChecked}
            label="Right Label (`labelPosition='right'` - Default)"
            description="Label text placed to the right of the switch control"
          />

          <View style={styles.spacer} />

          <Ux4gSwitch
            labelPosition="left"
            checked={leftLabelChecked}
            onCheckedChange={setLeftLabelChecked}
            label="Left Label (`labelPosition='left'`)"
            description="Label text placed to the left of the switch control"
          />

          <View style={styles.spacer} />

          <Ux4gSwitch
            labelPosition="bothSides"
            checked={bothSidesChecked}
            onCheckedChange={setBothSidesChecked}
            label="Primary Side"
            secondaryLabel="Secondary Side"
            description="Toggle control centered between two distinct label blocks"
          />

          <View style={styles.spacer} />

          <Text style={[styles.cardSubheading, { color: theme.colors.onSurface }]}>
            No Label (`labelPosition='noLabel'`)
          </Text>
          <View style={styles.noLabelRow}>
            <Ux4gSwitch
              labelPosition="noLabel"
              checked={noLabelChecked}
              onCheckedChange={setNoLabelChecked}
            />
            <Text style={{ color: theme.colors.secondary, marginLeft: 16 }}>
              Only renders the interactive switch box without any text column wrapper.
            </Text>
          </View>
        </View>
      </View>

      {/* 4. Description Status Variants (`helper`, `error`, `warning`, `success`) */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          4. Description Status Variants (`descriptionVariant`)
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.isDark ? UX4GColors.neutral900 : UX4GColors.neutral50,
              borderColor: theme.isDark ? UX4GColors.neutral800 : UX4GColors.neutral200,
            },
          ]}
        >
          <Ux4gSwitch
            checked={helperChecked}
            onCheckedChange={setHelperChecked}
            label="Helper Information (`helper` variant)"
            description="Standard guidance text assisting the user with configuration options."
            descriptionVariant="helper"
          />

          <View style={styles.spacer} />

          <Ux4gSwitch
            checked={errorChecked}
            onCheckedChange={setErrorChecked}
            label="Required Security Agreement (`error` variant)"
            isRequired={true}
            description="You must turn on encryption before saving this configuration."
            descriptionVariant="error"
          />

          <View style={styles.spacer} />

          <Ux4gSwitch
            checked={warningChecked}
            onCheckedChange={setWarningChecked}
            label="Experimental Mode (`warning` variant)"
            description="Enabling this option may increase battery consumption and data usage."
            descriptionVariant="warning"
          />

          <View style={styles.spacer} />

          <Ux4gSwitch
            checked={successChecked}
            onCheckedChange={setSuccessChecked}
            label="Synchronized Profile (`success` variant)"
            description="All local changes have been successfully synced across your devices."
            descriptionVariant="success"
          />
        </View>
      </View>

      {/* 5. Standalone Switches Without Any Label (`labelPosition='noLabel'` / No Label Prop) */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          5. Standalone Switches Without Any Label (`noLabel`)
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.isDark ? UX4GColors.neutral900 : UX4GColors.neutral50,
              borderColor: theme.isDark ? UX4GColors.neutral800 : UX4GColors.neutral200,
            },
          ]}
        >
          <Text style={[styles.cardSubheading, { color: theme.colors.onSurface }]}>
            All Sizes Without Label (`s`, `m`, `l`)
          </Text>
          <Text style={{ color: theme.colors.secondary, fontSize: 13, marginBottom: 16 }}>
            When `labelPosition='noLabel'` or when `label` and `description` props are omitted, the component renders only the standalone switch box cleanly without any text wrapper or extra margins.
          </Text>

          <View style={styles.standaloneGridRow}>
            <View style={styles.standaloneGridItem}>
              <Ux4gSwitch
                size="s"
                labelPosition="noLabel"
                checked={noLabelS}
                onCheckedChange={setNoLabelS}
              />
              <Text style={[styles.standaloneLabelText, { color: theme.colors.onSurface }]}>
                Small (`s` / 32x18px)
              </Text>
            </View>

            <View style={styles.standaloneGridItem}>
              <Ux4gSwitch
                size="m"
                labelPosition="noLabel"
                checked={noLabelM}
                onCheckedChange={setNoLabelM}
              />
              <Text style={[styles.standaloneLabelText, { color: theme.colors.onSurface }]}>
                Medium (`m` / 40x22px)
              </Text>
            </View>

            <View style={styles.standaloneGridItem}>
              <Ux4gSwitch
                size="l"
                labelPosition="noLabel"
                checked={noLabelL}
                onCheckedChange={setNoLabelL}
              />
              <Text style={[styles.standaloneLabelText, { color: theme.colors.onSurface }]}>
                Large (`l` / 48x28px)
              </Text>
            </View>
          </View>

          <View style={[styles.spacer, { height: 24 }]} />

          <Text style={[styles.cardSubheading, { color: theme.colors.onSurface }]}>
            Standalone Switch Toolbar Row (Checked vs Unchecked vs Disabled)
          </Text>
          <Text style={{ color: theme.colors.secondary, fontSize: 13, marginBottom: 16 }}>
            Compact standalone toggles placed side-by-side in custom horizontal toolbar layouts:
          </Text>

          <View style={styles.standaloneToolbarRow}>
            <View style={styles.toolbarToggleWrapper}>
              <Ux4gSwitch
                checked={standaloneRow1}
                onCheckedChange={setStandaloneRow1}
              />
              <Text style={[styles.toolbarText, { color: theme.colors.secondary }]}>Active On</Text>
            </View>

            <View style={styles.toolbarToggleWrapper}>
              <Ux4gSwitch
                checked={standaloneRow2}
                onCheckedChange={setStandaloneRow2}
              />
              <Text style={[styles.toolbarText, { color: theme.colors.secondary }]}>Active Off</Text>
            </View>

            <View style={styles.toolbarToggleWrapper}>
              <Ux4gSwitch
                checked={true}
                enabled={false}
              />
              <Text style={[styles.toolbarText, { color: theme.colors.secondary }]}>Disabled On</Text>
            </View>

            <View style={styles.toolbarToggleWrapper}>
              <Ux4gSwitch
                checked={false}
                enabled={false}
              />
              <Text style={[styles.toolbarText, { color: theme.colors.secondary }]}>Disabled Off</Text>
            </View>
          </View>
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
    paddingBottom: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  spacer: {
    height: 20,
  },
  cardSubheading: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  noLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  standaloneGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
  },
  standaloneGridItem: {
    alignItems: 'center',
  },
  standaloneLabelText: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 8,
  },
  standaloneToolbarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  toolbarToggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
  },
  toolbarText: {
    fontSize: 12,
    marginLeft: 8,
  },
});
