import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { UX4GColors } from '../../foundation/colors';
import { Ux4gSpace, Ux4gRadius } from '../../foundation/dimensions';
import { Ux4gIcons } from '../../foundation/icons';
import { Ux4gActionDropdown } from '../dropdown/Dropdown';

/**
 * Helper to compute hex with alpha or rgba color string.
 */
const addOpacityToHex = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    let hex = color.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    if (hex.length === 8) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }
  return color;
};

// ── CHOICE CHIP SIZE ────────────────────────────────────────────────────────
export type Ux4gChoiceChipSize = 's' | 'm';

export interface Ux4gChoiceChipProps {
  /**
   * The text label displayed inside the chip.
   */
  text: string;
  /**
   * Whether the choice chip is currently selected (`true`) or unselected (`false`).
   */
  selected: boolean;
  /**
   * Callback triggered when the choice chip is clicked (`onClick` matching Flutter exact name).
   */
  onClick: () => void;
  /**
   * Callback triggered when the choice chip is pressed (React Native standard alias for `onClick`).
   */
  onPress?: () => void;
  /**
   * Whether the choice chip is interactive (`true`) or disabled (`false`).
   * @default true
   */
  enabled?: boolean;
  /**
   * Optional leading widget/icon displayed before the text label.
   */
  leadingContent?: React.ReactNode;
  /**
   * Optional trailing widget/icon displayed after the text label.
   */
  trailingContent?: React.ReactNode;
  /**
   * Size of the choice chip (`s` with 12px horizontal padding, `m` with 16px horizontal padding).
   * @default 'm'
   */
  size?: Ux4gChoiceChipSize;
  /**
   * Custom border radius override.
   */
  borderRadius?: number;
  /**
   * Custom container styles.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Custom text styles.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gChoiceChip** (`ChoiceChip`)
 *
 * Direct React Native port of Flutter `chips.dart` (`Ux4gChoiceChip`).
 * Allows single selection from a set of options. Supports sizes (`s` & `m`), custom border radii, leading/trailing elements, and stateful styling.
 */
export const Ux4gChoiceChip: React.FC<Ux4gChoiceChipProps> = ({
  text,
  selected,
  onClick,
  onPress,
  enabled = true,
  leadingContent,
  trailingContent,
  size = 'm',
  borderRadius,
  containerStyle,
  textStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const typography = theme.typography;
  const isDark = theme.isDark;

  const handlePress = () => {
    if (!enabled) return;
    onClick();
    onPress?.();
  };

  const isMedium = size === 'm';
  const typoStyle = isMedium ? typography.lL_default : typography.lM_default;
  const horizontalPadding = isMedium ? 16 : 12;
  const verticalPadding = isMedium ? 8 : 6;
  const defaultRadius = isMedium ? Ux4gRadius.radius8 : Ux4gRadius.radius4;
  const computedRadius = borderRadius ?? defaultRadius;

  const defaultBgColor = isDark ? UX4GColors.neutral900 : UX4GColors.neutral0;
  const defaultBorderColor = isDark ? UX4GColors.neutral700 : UX4GColors.neutral200;

  const primaryColor = colors.primary ?? UX4GColors.primary600;
  const onSurfaceColor = colors.onSurface ?? (isDark ? UX4GColors.neutral0 : UX4GColors.neutral1000black);

  let bgColor: string = defaultBgColor;
  let borderColor: string = defaultBorderColor;
  let textColor: string = onSurfaceColor;

  if (!enabled && selected) {
    bgColor = addOpacityToHex(primaryColor, 0.38);
    borderColor = 'transparent';
    textColor = colors.onPrimary ?? UX4GColors.neutral0;
  } else if (!enabled && !selected) {
    bgColor = addOpacityToHex(onSurfaceColor, 0.04);
    borderColor = addOpacityToHex(onSurfaceColor, 0.2);
    textColor = addOpacityToHex(onSurfaceColor, 0.38);
  } else if (selected) {
    bgColor = primaryColor;
    borderColor = primaryColor;
    textColor = colors.onPrimary ?? UX4GColors.neutral0;
  }

  return (
    <Pressable
      testID={testID}
      disabled={!enabled}
      onPress={handlePress}
      style={[
        styles.choiceChipBox,
        {
          paddingHorizontal: horizontalPadding,
          paddingVertical: verticalPadding,
          backgroundColor: bgColor,
          borderColor,
          borderRadius: computedRadius,
          opacity: enabled ? 1 : 0.7,
        },
        containerStyle,
      ]}
    >
      {leadingContent && <View style={styles.leadingContainer}>{leadingContent}</View>}
      <Text style={[typoStyle, { color: textColor }, textStyle]}>{text}</Text>
      {trailingContent && <View style={styles.trailingContainer}>{trailingContent}</View>}
    </Pressable>
  );
};

// ── FILTER CHIP SIZE ────────────────────────────────────────────────────────
export type Ux4gFilterChipSize = 's' | 'm';

export interface Ux4gFilterChipProps {
  /**
   * The text label displayed inside the filter chip.
   */
  text: string;
  /**
   * Whether the filter chip is currently active/selected.
   */
  selected: boolean;
  /**
   * Callback triggered when the filter chip is clicked (`onClick` matching Flutter exact name).
   */
  onClick: () => void;
  /**
   * Callback triggered when the filter chip is pressed (React Native standard alias for `onClick`).
   */
  onPress?: () => void;
  /**
   * Whether the filter chip is interactive (`true`) or disabled (`false`).
   * @default true
   */
  enabled?: boolean;
  /**
   * Optional leading widget/icon displayed before the text label.
   */
  leadingContent?: React.ReactNode;
  /**
   * Optional trailing widget/icon displayed after the text label.
   */
  trailingContent?: React.ReactNode;
  /**
   * Size of the filter chip (`s` 28px height, `m` 32px height).
   * @default 'm'
   */
  size?: Ux4gFilterChipSize;
  /**
   * Custom container styles.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Custom text styles.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gFilterChip** (`FilterChip`)
 *
 * Direct React Native port of Flutter `chips.dart` (`Ux4gFilterChip`).
 * Used to filter content by attributes. Highlights with primary color `0.08` opacity background and `1.0` border when selected.
 */
export const Ux4gFilterChip: React.FC<Ux4gFilterChipProps> = ({
  text,
  selected,
  onClick,
  onPress,
  enabled = true,
  leadingContent,
  trailingContent,
  size = 'm',
  containerStyle,
  textStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const typography = theme.typography;
  const isDark = theme.isDark;

  const handlePress = () => {
    if (!enabled) return;
    onClick();
    onPress?.();
  };

  const isMedium = size === 'm';
  const height = isMedium ? 32 : 28;
  const typoStyle = isMedium ? typography.lM_default : typography.lS_default;

  const defaultBgColor = isDark ? UX4GColors.neutral900 : UX4GColors.neutral0;
  const defaultBorderColor = isDark ? UX4GColors.neutral700 : UX4GColors.neutral200;

  const primaryColor = colors.primary ?? UX4GColors.primary600;
  const onSurfaceColor = colors.onSurface ?? (isDark ? UX4GColors.neutral0 : UX4GColors.neutral1000black);

  let bgColor: string = defaultBgColor;
  let borderColor: string = defaultBorderColor;
  let textColor: string = onSurfaceColor;

  if (!enabled && selected) {
    bgColor = addOpacityToHex(primaryColor, 0.08);
    borderColor = addOpacityToHex(primaryColor, 0.2);
    textColor = addOpacityToHex(primaryColor, 0.38);
  } else if (!enabled && !selected) {
    bgColor = addOpacityToHex(onSurfaceColor, 0.04);
    borderColor = addOpacityToHex(onSurfaceColor, 0.2);
    textColor = addOpacityToHex(onSurfaceColor, 0.38);
  } else if (selected) {
    bgColor = addOpacityToHex(primaryColor, 0.08);
    borderColor = primaryColor;
    textColor = primaryColor;
  }

  return (
    <Pressable
      testID={testID}
      disabled={!enabled}
      onPress={handlePress}
      style={[
        styles.filterChipBox,
        {
          height,
          backgroundColor: bgColor,
          borderColor,
          borderRadius: Ux4gRadius.radius8,
          opacity: enabled ? 1 : 0.7,
        },
        containerStyle,
      ]}
    >
      {leadingContent && <View style={styles.leadingContainer}>{leadingContent}</View>}
      <Text style={[typoStyle, { color: textColor }, textStyle]}>{text}</Text>
      {trailingContent && <View style={styles.trailingContainer}>{trailingContent}</View>}
    </Pressable>
  );
};

// ── INPUT CHIP SIZE ─────────────────────────────────────────────────────────
export type Ux4gInputChipSize = 'xs' | 's' | 'm';

export interface Ux4gInputChipProps {
  /**
   * The text label displayed inside the input chip.
   */
  text: string;
  /**
   * Callback triggered when the user taps the trailing close/dismiss icon (`✕`).
   */
  onDismiss?: () => void;
  /**
   * Whether the input chip is interactive (`true`) or disabled (`false`).
   * @default true
   */
  enabled?: boolean;
  /**
   * Optional leading widget/icon displayed before the text label.
   */
  leadingContent?: React.ReactNode;
  /**
   * Size of the input chip (`xs` 20px, `s` 28px, `m` 32px height).
   * @default 'm'
   */
  size?: Ux4gInputChipSize;
  /**
   * Custom container styles.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Custom text styles.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gInputChip** (`InputChip`)
 *
 * Direct React Native port of Flutter `chips.dart` (`Ux4gInputChip`).
 * Compact tags representing user input with trailing close/dismiss (`✕`) action. Supports sizes (`xs`, `s`, `m`).
 */
export const Ux4gInputChip: React.FC<Ux4gInputChipProps> = ({
  text,
  onDismiss,
  enabled = true,
  leadingContent,
  size = 'm',
  containerStyle,
  textStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const typography = theme.typography;
  const isDark = theme.isDark;

  const height = size === 'xs' ? 20 : size === 's' ? 28 : 32;
  const typoStyle = size === 'xs' ? typography.lS_default : typography.lM_default;
  const horizontalPadding = size === 'xs' ? 6 : 8;
  const iconSize = size === 'xs' ? 12 : 16;

  const defaultBgColor = isDark ? UX4GColors.neutral900 : UX4GColors.neutral0;
  const defaultBorderColor = isDark ? UX4GColors.neutral700 : UX4GColors.neutral200;
  const onSurfaceColor = colors.onSurface ?? (isDark ? UX4GColors.neutral0 : UX4GColors.neutral1000black);

  const bgColor: string = !enabled ? addOpacityToHex(onSurfaceColor, 0.04) : defaultBgColor;
  const borderColor: string = !enabled ? addOpacityToHex(onSurfaceColor, 0.2) : defaultBorderColor;
  const textColor: string = !enabled ? addOpacityToHex(onSurfaceColor, 0.38) : onSurfaceColor;

  return (
    <View
      testID={testID}
      style={[
        styles.inputChipBox,
        {
          height,
          paddingHorizontal: horizontalPadding,
          backgroundColor: bgColor,
          borderColor,
          borderRadius: Ux4gRadius.radius4,
          opacity: enabled ? 1 : 0.7,
        },
        containerStyle,
      ]}
    >
      {leadingContent && <View style={styles.leadingContainer}>{leadingContent}</View>}
      <Text style={[typoStyle, { color: textColor }, textStyle]}>{text}</Text>
      {onDismiss && (
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={!enabled}
          onPress={onDismiss}
          hitSlop={6}
          style={styles.dismissButton}
        >
          {Ux4gIcons.close({
            size: iconSize,
            color: textColor,
          })}
        </TouchableOpacity>
      )}
    </View>
  );
};

// ── CHIP GROUP ARRANGEMENT ──────────────────────────────────────────────────
export type Ux4gChipGroupArrangement = 'horizontal' | 'wrap';

export interface Ux4gChipGroupProps {
  /**
   * List of chip components (`Ux4gChoiceChip`, `Ux4gFilterChip`, or `Ux4gInputChip`) to render.
   */
  chips: React.ReactNode[];
  /**
   * Layout arrangement (`horizontal` inside horizontal `ScrollView`, or `wrap` grid).
   * @default 'wrap'
   */
  arrangement?: Ux4gChipGroupArrangement;
  /**
   * Horizontal gap spacing between chips.
   * @default 8
   */
  spacing?: number;
  /**
   * Vertical gap spacing between rows when `arrangement = 'wrap'`.
   * @default 8
   */
  runSpacing?: number;
  /**
   * Custom container styles.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gChipGroup** (`ChipGroup`)
 *
 * Direct React Native port of Flutter `chips.dart` (`Ux4gChipGroup`).
 * Arranges a collection of chips inside either a horizontal `ScrollView` or a multi-line wrapping grid.
 */
export const Ux4gChipGroup: React.FC<Ux4gChipGroupProps> = ({
  chips,
  arrangement = 'wrap',
  spacing = 8,
  runSpacing = 8,
  containerStyle,
  testID,
}) => {
  if (arrangement === 'horizontal') {
    return (
      <ScrollView
        testID={testID}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.horizontalGroupContainer,
          { gap: spacing },
          containerStyle,
        ]}
      >
        {chips.map((chip, idx) => (
          <View key={`chip-${idx}`}>{chip}</View>
        ))}
      </ScrollView>
    );
  }

  return (
    <View
      testID={testID}
      style={[
        styles.wrapGroupContainer,
        {
          marginHorizontal: -(spacing / 2),
          marginVertical: -(runSpacing / 2),
        },
        containerStyle,
      ]}
    >
      {chips.map((chip, idx) => (
        <View
          key={`chip-${idx}`}
          style={{
            marginHorizontal: spacing / 2,
            marginVertical: runSpacing / 2,
          }}
        >
          {chip}
        </View>
      ))}
    </View>
  );
};

// ── INPUT CHIP FIELD ────────────────────────────────────────────────────────
export interface Ux4gInputChipFieldProps {
  /**
   * Current text string inside the input box (when `isDropdown = false`).
   */
  value: string;
  /**
   * Callback triggered when text inside the input box changes.
   */
  onValueChange: (value: string) => void;
  /**
   * Callback triggered when a new tag is added (`onAddChip`).
   */
  onAddChip: (chipText: string) => void;
  /**
   * Array of chip elements (`Ux4gInputChip`) to render directly below or inside the field container.
   */
  chips: React.ReactNode[];
  /**
   * Arrangement of the attached chips below (`horizontal` or `wrap`).
   * @default 'wrap'
   */
  arrangement?: Ux4gChipGroupArrangement;
  /**
   * Whether this input field behaves as a selection dropdown (`isDropdown = true`) or a free-text input field (`false`).
   * @default false
   */
  isDropdown?: boolean;
  /**
   * List of available option strings when `isDropdown = true`.
   */
  dropdownOptions?: string[];
  /**
   * Placeholder text inside the input field.
   * @default "Add chip..."
   */
  placeholder?: string;
  /**
   * Whether the input field is enabled (`true`) or disabled (`false`).
   * @default true
   */
  enabled?: boolean;
  /**
   * Custom container styles.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gInputChipField** (`InputChipField`)
 *
 * Direct React Native port of Flutter `chips.dart` (`Ux4gInputChipField`).
 * Combines an input entry box (either free text with trailing `+` action or popover dropdown selection menu)
 * with an attached `Ux4gChipGroup` rendering all active input chips directly below.
 */
export const Ux4gInputChipField: React.FC<Ux4gInputChipFieldProps> = ({
  value,
  onValueChange,
  onAddChip,
  chips,
  arrangement = 'wrap',
  isDropdown = false,
  dropdownOptions = [],
  placeholder = 'Add chip...',
  enabled = true,
  containerStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const typography = theme.typography;
  const isDark = theme.isDark;

  const [modalVisible, setModalVisible] = useState(false);

  const handleAddAction = () => {
    if (!enabled) return;
    if (isDropdown) {
      setModalVisible(true);
    } else if (value.trim()) {
      onAddChip(value.trim());
      onValueChange('');
    }
  };

  const handleSelectDropdownOption = (option: string) => {
    onAddChip(option);
    setModalVisible(false);
  };

  const defaultBgColor = isDark ? UX4GColors.neutral900 : UX4GColors.neutral0;
  const defaultBorderColor = isDark ? UX4GColors.neutral700 : UX4GColors.neutral200;
  const onSurfaceColor = colors.onSurface ?? (isDark ? UX4GColors.neutral0 : UX4GColors.neutral1000black);
  const primaryColor = colors.primary ?? UX4GColors.primary600;

  const bgColor: string = !enabled ? addOpacityToHex(onSurfaceColor, 0.04) : defaultBgColor;
  const borderColor: string = !enabled ? addOpacityToHex(onSurfaceColor, 0.2) : defaultBorderColor;

  return (
    <View testID={testID} style={[styles.fieldOuterContainer, containerStyle]}>
      <View
        style={[
          styles.fieldInputBox,
          {
            backgroundColor: bgColor,
            borderColor,
            borderRadius: Ux4gRadius.radius8,
            opacity: enabled ? 1 : 0.7,
          },
        ]}
      >
        {isDropdown ? (
          <Ux4gActionDropdown
            options={dropdownOptions.map((opt) => ({
              id: opt,
              label: opt,
              showTrailingArrow: false,
            }))}
            onOptionClick={(opt) => handleSelectDropdownOption(opt.label)}
            containerStyle={{ flex: 1 }}
            triggerBuilder={(toggle) => (
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!enabled}
                onPress={toggle}
                style={[
                  styles.dropdownTriggerBox,
                  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
                ]}
              >
                <Text
                  style={[
                    typography.lM_default,
                    { color: addOpacityToHex(onSurfaceColor, 0.6) },
                  ]}
                >
                  {placeholder}
                </Text>
                {Ux4gIcons.arrowDropDown({ size: 20, color: onSurfaceColor })}
              </TouchableOpacity>
            )}
          />
        ) : (
          <>
            <TextInput
              value={value}
              onChangeText={onValueChange}
              editable={enabled}
              placeholder={placeholder}
              placeholderTextColor={addOpacityToHex(onSurfaceColor, 0.4)}
              onSubmitEditing={handleAddAction}
              style={[
                styles.textInput,
                typography.lM_default,
                { color: onSurfaceColor },
              ]}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!enabled}
              onPress={handleAddAction}
              hitSlop={6}
              style={styles.trailingActionBox}
            >
              {Ux4gIcons.add({ size: 20, color: primaryColor })}
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Chips Area Below */}
      {chips.length > 0 && (
        <View style={styles.chipsBelowContainer}>
          <Ux4gChipGroup chips={chips} arrangement={arrangement} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  choiceChipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  filterChipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  inputChipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  leadingContainer: {
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trailingContainer: {
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissButton: {
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  fieldOuterContainer: {
    width: '100%',
  },
  fieldInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    includeFontPadding: false,
  },
  dropdownTriggerBox: {
    flex: 1,
    justifyContent: 'center',
  },
  trailingActionBox: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsBelowContainer: {
    marginTop: Ux4gSpace.space8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dropdownMenuContainer: {
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  dropdownOptionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
