import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { UX4GColors } from '../../foundation/colors';
import { Ux4gSpace, Ux4gRadius } from '../../foundation/dimensions';
import { Ux4gIcons } from '../../foundation/icons';
import { Ux4gInputChip } from '../chips/Chips';

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

export type Ux4gDropdownFilterType = 'contains' | 'startsWith' | 'startsWithPerTerm';

export type Ux4gDropdownSize = 's' | 'm' | 'l';

export type Ux4gDropdownMode = 'single' | 'multi';

export type Ux4gDropdownStatus = 'defaultStatus' | 'error' | 'disabled';

export interface Ux4gDropdownOption {
  id: string;
  label: string;
  leadingIcon?: React.ReactNode;
}

export interface Ux4gActionDropdownOption {
  id: string;
  label: string;
  showTrailingArrow?: boolean;
}

export type Ux4gDropdownTriggerBuilder = (
  toggleDropdown: () => void
) => React.ReactNode;

// ── ACTION DROPDOWN ──────────────────────────────────────────────────────────

export interface Ux4gActionDropdownProps {
  /**
   * List of action options available inside the dropdown overlay menu.
   */
  options: Ux4gActionDropdownOption[];
  /**
   * Callback triggered when an action option is selected (`onOptionClick` matching Flutter exact name).
   */
  onOptionClick: (option: Ux4gActionDropdownOption) => void;
  /**
   * Callback triggered when an action option is selected (React Native standard alias for `onOptionClick`).
   */
  onOptionPress?: (option: Ux4gActionDropdownOption) => void;
  /**
   * Builder function to render the trigger element (e.g. icon or button) that toggles the dropdown overlay menu.
   */
  triggerBuilder: Ux4gDropdownTriggerBuilder;
  /**
   * Optional ID of the currently active/selected action option.
   */
  selectedOptionId?: string;
  /**
   * Custom container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gActionDropdown** (`ActionDropdown`)
 *
 * Direct React Native port of Flutter `dropdown.dart` (`Ux4gActionDropdown`).
 * Wraps any trigger element created by `triggerBuilder` and displays a floating overlay action menu when toggled.
 */
export const Ux4gActionDropdown: React.FC<Ux4gActionDropdownProps> = ({
  options,
  onOptionClick,
  onOptionPress,
  triggerBuilder,
  selectedOptionId,
  containerStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const typography = theme.typography;
  const isDark = theme.isDark;

  const [isExpanded, setIsExpanded] = useState(false);
  const triggerRef = useRef<View>(null);
  const [menuCoords, setMenuCoords] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
    maxHeight: number;
  }>({
    top: 0,
    bottom: undefined,
    left: 0,
    width: 230,
    maxHeight: 300,
  });

  const toggleDropdown = () => {
    if (isExpanded) {
      closeDropdown();
    } else {
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        const spaceBelow = windowHeight - (y + height);
        const spaceAbove = y;

        let top: number | undefined = y + height + 4;
        let bottom: number | undefined = undefined;
        let maxHeight = Math.min(300, Math.max(160, spaceBelow - 16));

        if (spaceBelow < 220 && spaceAbove > spaceBelow) {
          top = undefined;
          bottom = windowHeight - y + 4;
          maxHeight = Math.min(300, Math.max(160, spaceAbove - 16));
        }

        const menuWidth = Math.max(230, width);
        let left = x;
        if (left + menuWidth > windowWidth - 16) {
          left = Math.max(16, windowWidth - menuWidth - 16);
        }

        setMenuCoords({ top, bottom, left, width: menuWidth, maxHeight });
        setIsExpanded(true);
      });
    }
  };

  const closeDropdown = () => {
    setIsExpanded(false);
  };

  const handleOptionSelect = (option: Ux4gActionDropdownOption) => {
    closeDropdown();
    onOptionClick(option);
    onOptionPress?.(option);
  };

  return (
    <View ref={triggerRef} testID={testID} style={[styles.actionWrapper, containerStyle]}>
      {triggerBuilder(toggleDropdown)}

      <Modal
        visible={isExpanded}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <Pressable style={styles.modalOverlayTransparent} onPress={closeDropdown}>
          <Pressable
            style={[
              styles.actionMenuCard,
              {
                position: 'absolute',
                top: menuCoords.top,
                bottom: menuCoords.bottom,
                left: menuCoords.left,
                width: menuCoords.width,
                maxHeight: menuCoords.maxHeight,
                backgroundColor: colors.surface ?? (isDark ? UX4GColors.neutral800 : UX4GColors.neutral0),
                borderColor: isDark ? UX4GColors.neutral700 : UX4GColors.neutral200,
              },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <ScrollView style={{ maxHeight: menuCoords.maxHeight }} bounces={false}>
              {options.map((option) => {
                const isSelected =
                  selectedOptionId !== undefined && selectedOptionId === option.id;
                const primaryColor = colors.primary ?? UX4GColors.primary600;

                return (
                  <TouchableOpacity
                    key={option.id}
                    activeOpacity={0.7}
                    onPress={() => handleOptionSelect(option)}
                    style={[
                      styles.actionMenuItem,
                      isSelected && {
                        backgroundColor: addOpacityToHex(primaryColor, 0.08),
                      },
                    ]}
                  >
                    <Text
                      style={[
                        typography.lL_default,
                        {
                          color: isSelected
                            ? primaryColor
                            : colors.onSurface ?? (isDark ? UX4GColors.neutral0 : UX4GColors.neutral1000black),
                          fontWeight: isSelected ? '600' : '400',
                          flex: 1,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {option.label}
                    </Text>
                    {option.showTrailingArrow !== false ? (
                      Ux4gIcons.chevronRight({
                        size: 20,
                        color: isSelected
                          ? primaryColor
                          : addOpacityToHex(
                              colors.onSurface ?? (isDark ? UX4GColors.neutral0 : UX4GColors.neutral1000black),
                              0.6
                            ),
                      })
                    ) : isSelected ? (
                      Ux4gIcons.check({ size: 20, color: primaryColor })
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

// ── SELECTION DROPDOWN ────────────────────────────────────────────────────────

export interface Ux4gSelectionDropdownProps {
  /**
   * List of selectable options inside the dropdown list.
   */
  options: Ux4gDropdownOption[];
  /**
   * Array of currently selected option IDs. Pass `[singleId]` for single mode, or multiple IDs for `multi` mode.
   */
  selectedOptionIds: string[];
  /**
   * Callback triggered whenever selection changes (`onSelectionChange`).
   */
  onSelectionChange: (selectedOptionIds: string[]) => void;
  /**
   * Optional label text displayed above the selection box.
   */
  label?: string;
  /**
   * Optional helper or error description text displayed below the selection box.
   */
  description?: string;
  /**
   * Placeholder string displayed inside the selection box when no items are selected.
   * @default "Please select.."
   */
  placeholder?: string;
  /**
   * Size of the selection dropdown box (`s` 32px height, `m` 40px height, or `l` 48px height).
   * @default 'm'
   */
  size?: Ux4gDropdownSize;
  /**
   * Selection mode (`single` selection or `multi` chip selection).
   * @default 'single'
   */
  mode?: Ux4gDropdownMode;
  /**
   * Status state (`defaultStatus`, `error`, or `disabled`).
   * @default 'defaultStatus'
   */
  status?: Ux4gDropdownStatus;
  /**
   * Whether to display an interactive search/filter field at the top of the dropdown menu overlay.
   * @default false
   */
  searchEnabled?: boolean;
  /**
   * Filtering mode when `searchEnabled = true` (`contains`, `startsWith`, or `startsWithPerTerm`).
   * @default 'contains'
   */
  filterType?: Ux4gDropdownFilterType;
  /**
   * Custom style for the label text.
   */
  labelTextStyle?: StyleProp<TextStyle>;
  /**
   * Custom style for the selected value text.
   */
  valueTextStyle?: StyleProp<TextStyle>;
  /**
   * Optional leading icon/widget rendered inside the selection box before the text/placeholder.
   */
  leadingIcon?: React.ReactNode;
  /**
   * Custom container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gSelectionDropdown** (`SelectionDropdown`)
 *
 * Direct React Native port of Flutter `dropdown.dart` (`Ux4gSelectionDropdown`).
 * Full-featured form selection component supporting sizes (`s`, `m`, `l`), selection modes (`single`, `multi` with chips),
 * status validation (`defaultStatus`, `error`, `disabled`), search query filtering, labels, and helper descriptions.
 */
export const Ux4gSelectionDropdown: React.FC<Ux4gSelectionDropdownProps> = ({
  options,
  selectedOptionIds,
  onSelectionChange,
  label,
  description,
  placeholder = 'Please select..',
  size = 'm',
  mode = 'single',
  status = 'defaultStatus',
  searchEnabled = false,
  filterType = 'contains',
  labelTextStyle,
  valueTextStyle,
  leadingIcon,
  containerStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const typography = theme.typography;
  const isDark = theme.isDark;

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const triggerRef = useRef<View>(null);
  const [menuCoords, setMenuCoords] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
    maxHeight: number;
  }>({
    top: 0,
    bottom: undefined,
    left: 0,
    width: 300,
    maxHeight: 300,
  });

  const toggleDropdown = () => {
    if (status === 'disabled') return;
    if (isExpanded) {
      closeDropdown();
    } else {
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        const windowHeight = Dimensions.get('window').height;
        const spaceBelow = windowHeight - (y + height);
        const spaceAbove = y;

        let top: number | undefined = y + height + 4;
        let bottom: number | undefined = undefined;
        let maxHeight = Math.min(300, Math.max(160, spaceBelow - 16));

        if (spaceBelow < 220 && spaceAbove > spaceBelow) {
          top = undefined;
          bottom = windowHeight - y + 4;
          maxHeight = Math.min(300, Math.max(160, spaceAbove - 16));
        }

        setMenuCoords({ top, bottom, left: x, width, maxHeight });
        setIsExpanded(true);
      });
    }
  };

  const closeDropdown = () => {
    setIsExpanded(false);
    setSearchQuery('');
  };

  const handleSelection = (id: string) => {
    if (mode === 'single') {
      onSelectionChange([id]);
      closeDropdown();
    } else {
      const newSelection = [...selectedOptionIds];
      const index = newSelection.indexOf(id);
      if (index !== -1) {
        newSelection.splice(index, 1);
      } else {
        newSelection.push(id);
      }
      onSelectionChange(newSelection);
    }
  };

  const minHeight = size === 's' ? 32 : size === 'm' ? 40 : 48;
  const verticalPadding = size === 's' ? 6 : size === 'm' ? 8 : 12;
  const textStyle =
    size === 's'
      ? typography.lM_default
      : size === 'm'
        ? typography.lL_default
        : typography.lXL_default;

  const defaultBgColor = isDark ? UX4GColors.neutral950 : UX4GColors.neutral0;
  const defaultBorderColor = isDark ? UX4GColors.neutral700 : UX4GColors.neutral200;

  const primaryColor = colors.primary ?? UX4GColors.primary600;
  const onSurfaceColor = colors.onSurface ?? (isDark ? UX4GColors.neutral0 : UX4GColors.neutral1000black);
  const errorColor = colors.error ?? UX4GColors.red600;

  let borderColor: string = defaultBorderColor;
  let bgColor: string = defaultBgColor;


  if (status === 'disabled') {
    borderColor = addOpacityToHex(onSurfaceColor, 0.2);
    bgColor = addOpacityToHex(onSurfaceColor, 0.04);
  } else if (status === 'error') {
    borderColor = errorColor;
  } else if (isExpanded) {
    borderColor = primaryColor;
  }

  const descriptionColor = status === 'error' ? errorColor : addOpacityToHex(onSurfaceColor, 0.7);

  // Filter options based on query
  const filteredOptions = options.filter((option) => {
    if (!searchEnabled || !searchQuery.trim()) return true;
    const query = searchQuery.trim().toLowerCase();
    const labelLower = option.label.toLowerCase();

    if (filterType === 'contains') {
      return labelLower.includes(query);
    }
    if (filterType === 'startsWith') {
      const cleanedLabel = labelLower.replace(/^[^a-z0-9]+/i, '');
      return labelLower.startsWith(query) || cleanedLabel.startsWith(query);
    }
    if (filterType === 'startsWithPerTerm') {
      const queryTerms = query.split(' ').filter(Boolean);
      const labelTerms = labelLower.split(' ').filter(Boolean);
      return queryTerms.every((qTerm) =>
        labelTerms.some((lTerm) => {
          const cleanedTerm = lTerm.replace(/^[^a-z0-9]+/i, '');
          return lTerm.startsWith(qTerm) || cleanedTerm.startsWith(qTerm);
        })
      );
    }
    return true;
  });

  return (
    <View testID={testID} style={[styles.containerOuter, containerStyle]}>
      {label && (
        <Text
          style={[
            labelTextStyle ?? typography.lL_default,
            {
              color:
                status === 'disabled'
                  ? addOpacityToHex(onSurfaceColor, 0.38)
                  : onSurfaceColor,
              marginBottom: Ux4gSpace.space4,
            },
          ]}
        >
          {label}
        </Text>
      )}

      <Pressable
        ref={triggerRef}
        onPress={toggleDropdown}
        disabled={status === 'disabled'}
        style={[
          styles.triggerBox,
          {
            minHeight,
            paddingVertical: verticalPadding,
            backgroundColor: bgColor,
            borderColor,
            opacity: status === 'disabled' ? 0.6 : 1.0,
          },
        ]}
      >
        {leadingIcon && <View style={styles.leadingBox}>{leadingIcon}</View>}

        <View style={styles.valueBox}>
          {selectedOptionIds.length === 0 ? (
            <Text
              style={[
                textStyle,
                { color: isDark ? UX4GColors.neutral300 : UX4GColors.neutral500 },
              ]}
              numberOfLines={1}
            >
              {placeholder}
            </Text>
          ) : mode === 'single' ? (
            <Text
              style={[
                valueTextStyle ?? textStyle,
                { color: onSurfaceColor },
              ]}
              numberOfLines={1}
            >
              {options.find((o) => o.id === selectedOptionIds[0])?.label ?? ''}
            </Text>
          ) : (
            <View style={styles.multiWrap}>
              {selectedOptionIds.map((id) => {
                const opt = options.find((o) => o.id === id);
                if (!opt) return null;
                return (
                  <View key={id} style={styles.chipItem}>
                    <Ux4gInputChip
                      text={opt.label}
                      onDismiss={() => handleSelection(id)}
                      leadingContent={opt.leadingIcon}
                      size={size === 's' ? 's' : 'm'}
                    />
                  </View>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.arrowBox}>
          {isExpanded
            ? Ux4gIcons.arrowUp({ size: 20, color: addOpacityToHex(onSurfaceColor, 0.6) })
            : Ux4gIcons.arrowDropDown({ size: 20, color: addOpacityToHex(onSurfaceColor, 0.6) })}
        </View>
      </Pressable>

      {description && (
        <View style={styles.descriptionRow}>
          {status === 'error'
            ? Ux4gIcons.error({ size: 16, color: descriptionColor })
            : Ux4gIcons.info({ size: 16, color: descriptionColor })}
          <Text
            style={[
              typography.lS_default,
              { color: descriptionColor, marginLeft: 6, flex: 1 },
            ]}
          >
            {description}
          </Text>
        </View>
      )}

      {/* Dropdown Menu Modal */}
      <Modal
        visible={isExpanded}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <Pressable style={styles.modalOverlayTransparent} onPress={closeDropdown}>
          <Pressable
            style={[
              styles.selectionMenuCard,
              {
                position: 'absolute',
                top: menuCoords.top,
                bottom: menuCoords.bottom,
                left: menuCoords.left,
                width: menuCoords.width,
                maxHeight: menuCoords.maxHeight,
                backgroundColor: colors.surface ?? (isDark ? UX4GColors.neutral800 : UX4GColors.neutral0),
                borderColor: isDark ? UX4GColors.neutral700 : UX4GColors.neutral200,
              },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            {searchEnabled && (
              <View style={styles.searchContainer}>
                <View
                  style={[
                    styles.searchInputBox,
                    {
                      backgroundColor: isDark ? UX4GColors.neutral900 : UX4GColors.neutral100,
                      borderColor: isDark ? UX4GColors.neutral700 : UX4GColors.neutral200,
                    },
                  ]}
                >
                  <View style={styles.searchIconBox}>
                    {Ux4gIcons.search({ size: 18, color: addOpacityToHex(onSurfaceColor, 0.6) })}
                  </View>
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Start typing.."
                    placeholderTextColor={addOpacityToHex(onSurfaceColor, 0.4)}
                    style={[styles.searchInputText, typography.lM_default, { color: onSurfaceColor }]}
                    autoFocus
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={8}>
                      {Ux4gIcons.close({ size: 14, color: addOpacityToHex(onSurfaceColor, 0.6) })}
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            <ScrollView style={{ maxHeight: menuCoords.maxHeight }} bounces={false}>
              {filteredOptions.length === 0 ? (
                <View style={styles.emptyBox}>
                  <Text style={[typography.lM_default, { color: addOpacityToHex(onSurfaceColor, 0.5) }]}>
                    No options found
                  </Text>
                </View>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = selectedOptionIds.includes(option.id);

                  return (
                    <TouchableOpacity
                      key={option.id}
                      activeOpacity={0.7}
                      onPress={() => handleSelection(option.id)}
                      style={[
                        styles.selectionOptionRow,
                        mode === 'single' &&
                          isSelected && {
                            backgroundColor: addOpacityToHex(primaryColor, 0.06),
                          },
                      ]}
                    >
                      {mode === 'multi' && (
                        <View
                          style={[
                            styles.checkboxIndicator,
                            {
                              borderColor: isSelected
                                ? primaryColor
                                : addOpacityToHex(onSurfaceColor, 0.4),
                              backgroundColor: isSelected ? primaryColor : 'transparent',
                            },
                          ]}
                        >
                          {isSelected &&
                            Ux4gIcons.check({ size: 14, color: UX4GColors.neutral0 })}
                        </View>
                      )}

                      {mode === 'single' && option.leadingIcon && (
                        <View style={styles.optionLeading}>{option.leadingIcon}</View>
                      )}

                      <Text
                        style={[
                          typography.lL_default,
                          {
                            color: isSelected ? primaryColor : onSurfaceColor,
                            fontWeight: isSelected ? '600' : '400',
                            flex: 1,
                          },
                        ]}
                      >
                        {option.label}
                      </Text>

                      {mode === 'single' && isSelected && (
                        <View style={styles.checkTrailing}>
                          {Ux4gIcons.check({ size: 20, color: primaryColor })}
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  actionWrapper: {
    alignSelf: 'flex-start',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalOverlayTransparent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  actionMenuCard: {
    width: 230,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: UX4GColors.neutral1000black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    paddingVertical: 4,
  },
  actionMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  containerOuter: {
    width: '100%',
  },
  triggerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  leadingBox: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueBox: {
    flex: 1,
    justifyContent: 'center',
  },
  multiWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -2,
    marginVertical: -2,
  },
  chipItem: {
    marginHorizontal: 2,
    marginVertical: 2,
  },
  arrowBox: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  selectionMenuCard: {
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: UX4GColors.neutral1000black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    paddingVertical: 4,
  },
  searchContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.15)',
  },
  searchInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 36,
  },
  searchIconBox: {
    marginRight: 8,
  },
  searchInputText: {
    flex: 1,
    paddingVertical: 0,
    includeFontPadding: false,
  },
  selectionOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  checkboxIndicator: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLeading: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkTrailing: {
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBox: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
