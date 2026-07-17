import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ScrollView,
  Modal,
  Pressable,
  Dimensions,
  Platform,
  Keyboard,
} from 'react-native';
import { useUx4gTheme } from '../../theme/Ux4gThemeContext';
import { UX4GColors } from '../../foundation/colors';
import { Ux4gRadius } from '../../foundation/dimensions';
import { Ux4gIcons } from '../../foundation/icons';
import { Ux4gSpinner } from '../spinner/Spinner';

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

export type Ux4gSearchFilterType = 'contains' | 'startsWith' | 'startsWithPerTerm';

export type Ux4gSearchFieldVariant = 'basicSearch' | 'searchWithSubmit' | 'autocomplete';

export type Ux4gSearchFieldSize = 'small' | 'medium' | 'large' | 'xl';

export const Ux4gSearchFieldSizeMap: Record<Ux4gSearchFieldSize, number> = {
  small: 32,
  medium: 40,
  large: 48,
  xl: 56,
};

export type Ux4gSearchFieldStatus = 'defaultStatus' | 'error' | 'warning' | 'success';

export type Ux4gSearchFieldButtonStyle = 'filled' | 'tonal';

export interface Ux4gSearchFieldProps {
  /**
   * Current text string inside the search field.
   */
  value: string;
  /**
   * Callback triggered when text inside the search field changes.
   */
  onValueChange: (value: string) => void;
  /**
   * Filtering mode when searching options (`contains`, `startsWith`, `startsWithPerTerm`).
   * @default 'contains'
   */
  filterType?: Ux4gSearchFilterType;
  /**
   * Search field variant (`basicSearch`, `searchWithSubmit`, `autocomplete`).
   * @default 'basicSearch'
   */
  variant?: Ux4gSearchFieldVariant;
  /**
   * Size of the search field (`small` 32px, `medium` 40px, `large` 48px, `xl` 56px).
   * @default 'medium'
   */
  size?: Ux4gSearchFieldSize;
  /**
   * Validation status (`defaultStatus`, `error`, `warning`, `success`).
   * @default 'defaultStatus'
   */
  status?: Ux4gSearchFieldStatus;
  /**
   * Submit button style (`filled` or `tonal`).
   * @default 'filled'
   */
  buttonStyle?: Ux4gSearchFieldButtonStyle;
  /**
   * Optional label displayed above the search box.
   */
  label?: string;
  /**
   * Placeholder hint text displayed inside the search box when empty.
   */
  placeholder?: string;
  /**
   * Optional caption or validation message displayed below the search box.
   */
  caption?: string;
  /**
   * List of autocomplete options available for search/filtering.
   * @default []
   */
  options?: string[];
  /**
   * Whether to display the microphone voice search icon.
   * @default true
   */
  showVoiceIcon?: boolean;
  /**
   * Whether to display the clear (`close`) icon when text is entered.
   * @default true
   */
  showClearIcon?: boolean;
  /**
   * Whether the search query is currently loading (`true` displays spinner).
   * @default false
   */
  isLoading?: boolean;
  /**
   * Callback triggered when the voice search (`mic`) icon is pressed.
   */
  onVoiceClick?: () => void;
  /**
   * Alias for `onVoiceClick`.
   */
  onVoicePress?: () => void;
  /**
   * Callback triggered when the clear (`close`) icon is pressed.
   */
  onClearClick?: () => void;
  /**
   * Alias for `onClearClick`.
   */
  onClearPress?: () => void;
  /**
   * Callback triggered when the submit button is pressed or search is submitted via keyboard.
   */
  onSubmitClick?: (value: string) => void;
  /**
   * Alias for `onSubmitClick`.
   */
  onSubmitPress?: (value: string) => void;
  /**
   * Alias for `onSubmitClick`.
   */
  onSubmitEditing?: (value: string) => void;
  /**
   * Callback triggered when an option from the autocomplete list is selected.
   */
  onOptionSelected?: (option: string) => void;
  /**
   * Whether the search field is interactive (`true`) or disabled (`false`).
   * @default true
   */
  enabled?: boolean;
  /**
   * Whether the search field is read-only (`true`) or editable (`false`).
   * @default false
   */
  readOnly?: boolean;
  /**
   * Minimum height constraint for the autocomplete dropdown list.
   * @default 0
   */
  dropdownMinHeight?: number;
  /**
   * Maximum height constraint for the autocomplete dropdown list.
   * @default 350
   */
  dropdownMaxHeight?: number;
  /**
   * Whether to render the dropdown inside a top-level Modal (`true`) or inline absolute positioned (`false`).
   * Inline (`false`) preserves keyboard focus seamlessly while typing.
   * @default false
   */
  useModalOverlay?: boolean;
  /**
   * Custom style for search input text (`style`).
   */
  style?: StyleProp<TextStyle>;
  /**
   * Custom style for placeholder text (`placeholderStyle`).
   */
  placeholderStyle?: StyleProp<TextStyle>;
  /**
   * Custom style for top label (`labelStyle`).
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Custom style for bottom caption text (`captionStyle`).
   */
  captionStyle?: StyleProp<TextStyle>;
  /**
   * Custom background color override (`backgroundColor`).
   */
  backgroundColor?: string;
  /**
   * Custom border color override (`borderColor`).
   */
  borderColor?: string;
  /**
   * Custom outer container style.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional testID for automated testing.
   */
  testID?: string;
}

/**
 * **Ux4gSearchField** (`SearchField`)
 *
 * Direct React Native port of Flutter `search_field.dart` (`Ux4gSearchField`).
 * Complete feature parity across sizes (`small`, `medium`, `large`, `xl`), variants (`basicSearch`, `searchWithSubmit`, `autocomplete`),
 * filter types (`contains`, `startsWith`, `startsWithPerTerm`), statuses (`defaultStatus`, `error`, `warning`, `success`),
 * filled/tonal submit buttons, voice/clear icons, loading spinner, and autocomplete option list overlays.
 */
export const Ux4gSearchField: React.FC<Ux4gSearchFieldProps> = ({
  value,
  onValueChange,
  filterType = 'contains',
  variant = 'basicSearch',
  size = 'medium',
  status = 'defaultStatus',
  buttonStyle = 'filled',
  label,
  placeholder,
  caption,
  options = [],
  showVoiceIcon = true,
  showClearIcon = true,
  isLoading = false,
  onVoiceClick,
  onVoicePress,
  onClearClick,
  onClearPress,
  onSubmitClick,
  onSubmitPress,
  onSubmitEditing,
  onOptionSelected,
  enabled = true,
  readOnly = false,
  dropdownMinHeight = 0,
  dropdownMaxHeight = 350,
  useModalOverlay = false,
  style,
  placeholderStyle,
  labelStyle,
  captionStyle,
  backgroundColor,
  borderColor: customBorderColor,
  containerStyle,
  testID,
}) => {
  const theme = useUx4gTheme();
  const colors = theme.colors;
  const typography = theme.typography;
  const isDark = theme.isDark;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const triggerRef = useRef<View>(null);
  const [menuCoords, setMenuCoords] = useState<{
    top: number;
    left: number;
    width: number;
  }>({
    top: 0,
    left: 0,
    width: 300,
  });

  const primaryColor = colors.primary ?? UX4GColors.primary600;
  const onPrimaryColor = colors.onPrimary ?? UX4GColors.neutral0;
  const onSurfaceColor = colors.onSurface ?? (isDark ? UX4GColors.neutral0 : UX4GColors.neutral1000black);
  const errorColor = colors.error ?? (isDark ? UX4GColors.red300 : UX4GColors.red600);
  const warningColor = colors.warning ?? UX4GColors.orange600;
  const successColor = colors.success ?? UX4GColors.green600;

  const computedHeight = Ux4gSearchFieldSizeMap[size];

  const getBorderColor = (): string => {
    if (!enabled) return addOpacityToHex(onSurfaceColor, 0.3);
    if (isFocused && (options.length > 0 || variant === 'autocomplete')) {
      return primaryColor;
    }
    switch (status) {
      case 'error':
        return errorColor;
      case 'warning':
        return warningColor;
      case 'success':
        return successColor;
      case 'defaultStatus':
      default:
        if (isFocused) return primaryColor;
        return customBorderColor ?? (isDark ? UX4GColors.neutral700 : UX4GColors.neutral200);
    }
  };

  const getLabelColor = (): string => {
    if (!enabled) return addOpacityToHex(onSurfaceColor, 0.4);
    switch (status) {
      case 'error':
        return errorColor;
      case 'warning':
        return warningColor;
      case 'success':
        return successColor;
      case 'defaultStatus':
      default:
        return isFocused ? primaryColor : (isDark ? UX4GColors.neutral200 : UX4GColors.neutral700);
    }
  };

  const getCaptionColor = (): string => {
    if (!enabled) return addOpacityToHex(onSurfaceColor, 0.4);
    switch (status) {
      case 'error':
        return errorColor;
      case 'warning':
        return warningColor;
      case 'success':
        return successColor;
      case 'defaultStatus':
      default:
        return addOpacityToHex(onSurfaceColor, 0.6);
    }
  };

  const renderStatusIcon = (): React.ReactElement | null => {
    const iconColor = getCaptionColor();
    switch (status) {
      case 'error':
        return Ux4gIcons.error({ size: 14, color: iconColor });
      case 'warning':
        return Ux4gIcons.warning({ size: 14, color: iconColor });
      case 'success':
        return Ux4gIcons.success({ size: 14, color: iconColor });
      case 'defaultStatus':
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    const fn = onSubmitClick ?? onSubmitPress ?? onSubmitEditing;
    fn?.(value);
  };

  const handleClear = () => {
    if (onClearClick) onClearClick();
    else if (onClearPress) onClearPress();
    else onValueChange('');
  };

  const handleVoice = () => {
    if (onVoiceClick) onVoiceClick();
    else if (onVoicePress) onVoicePress();
  };

  const isSubmitVariant = variant === 'searchWithSubmit';
  const showSubmitButton =
    isSubmitVariant ||
    (variant === 'autocomplete' && (onSubmitClick !== undefined || onSubmitPress !== undefined || onSubmitEditing !== undefined));

  const shouldShowDropdown =
    isFocused &&
    value.trim().length > 0 &&
    (options.length > 0 || variant === 'autocomplete' || isLoading);

  useEffect(() => {
    if (shouldShowDropdown && useModalOverlay && triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setMenuCoords({
          top: y + height + 4,
          left: x,
          width,
        });
      });
    }
  }, [shouldShowDropdown, useModalOverlay, value, isFocused]);

  const defaultBgColor = isDark ? UX4GColors.neutral950 : UX4GColors.neutral0;
  const bgColor =
    backgroundColor ??
    (enabled ? defaultBgColor : addOpacityToHex(onSurfaceColor, 0.05));

  const query = value.toLowerCase().trim();
  const isExactSelection = options.some((opt) => opt.toLowerCase().trim() === query);

  const filteredOptions = isExactSelection || query.length === 0
    ? options
    : options.filter((option) => {
        const lowerOpt = option.toLowerCase();
        switch (filterType) {
          case 'contains':
            return lowerOpt.includes(query);
          case 'startsWith':
            return lowerOpt.startsWith(query);
          case 'startsWithPerTerm': {
            const queryTerms = query.split(' ').filter(Boolean);
            const labelTerms = lowerOpt.split(' ').filter(Boolean);
            return queryTerms.every((qTerm) =>
              labelTerms.some((lTerm) => lTerm.startsWith(qTerm))
            );
          }
          default:
            return true;
        }
      });

  const handleOptionTap = (option: string) => {
    onOptionSelected?.(option);
    onValueChange(option);
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const renderAutocompleteList = () => {
    const dropdownSurface = colors.surface ?? (isDark ? UX4GColors.neutral900 : UX4GColors.neutral0);
    const dropdownBorder = isDark ? UX4GColors.neutral700 : UX4GColors.neutral200;

    return (
      <View
        style={[
          styles.autocompleteCard,
          {
            minHeight: dropdownMinHeight,
            maxHeight: dropdownMaxHeight,
            backgroundColor: dropdownSurface,
            borderColor: dropdownBorder,
          },
        ]}
      >
        {isLoading ? (
          <View style={styles.centerSpinnerBox}>
            <Ux4gSpinner size={24} />
          </View>
        ) : options.length === 0 || filteredOptions.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text
              style={[
                typography.bM_default,
                { fontSize: 14, color: addOpacityToHex(onSurfaceColor, 0.5) },
              ]}
            >
              No results found
            </Text>
          </View>
        ) : (
          <View style={{ flexShrink: 1 }}>
            {value.trim().length > 0 && (
              <View style={styles.searchingForBox}>
                <Text style={[typography.bM_default, { fontSize: 13, color: addOpacityToHex(onSurfaceColor, 0.6) }]}>
                  Searching for{' '}
                  <Text style={{ fontWeight: '700', color: onSurfaceColor }}>
                    '{value.trim()}'
                  </Text>
                </Text>
              </View>
            )}
            <ScrollView
              style={{ maxHeight: dropdownMaxHeight - 45 }}
              contentContainerStyle={{ paddingBottom: 6 }}
              keyboardShouldPersistTaps="handled"
              bounces={false}
            >
              {filteredOptions.map((option, index) => (
                <TouchableOpacity
                  key={`${option}-${index}`}
                  activeOpacity={0.7}
                  onPress={() => handleOptionTap(option)}
                  style={[styles.optionRow, { backgroundColor: 'transparent' }]}
                >
                  <Text
                    style={[
                      typography.bM_default,
                      { fontSize: 14, color: onSurfaceColor, flex: 1 },
                    ]}
                    numberOfLines={1}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      testID={testID}
      style={[
        styles.outerContainer,
        {
          zIndex: isFocused && shouldShowDropdown ? 99999 : 1,
          ...Platform.select({
            android: {
              elevation: isFocused && shouldShowDropdown ? 99999 : 0,
            },
          }),
        },
        containerStyle,
      ]}
    >
      {/* Label Section */}
      {label !== undefined && label !== null && (
        <Text
          style={[
            typography.lL_default,
            { color: getLabelColor(), fontWeight: '700', marginBottom: 8 },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}

      {/* Input Row with Optional Submit Button & Inline Dropdown */}
      <View
        style={{
          position: 'relative',
          width: '100%',
          zIndex: isFocused && shouldShowDropdown ? 99999 : 1,
        }}
      >
        <View style={styles.mainRow}>
          <View
            ref={triggerRef}
            style={[
              styles.inputContainer,
              {
                height: computedHeight,
                backgroundColor: bgColor,
                borderColor: getBorderColor(),
                borderWidth: isFocused ? 2 : 1,
                borderTopLeftRadius: Ux4gRadius.radius8,
                borderBottomLeftRadius: Ux4gRadius.radius8,
                borderTopRightRadius: showSubmitButton ? 0 : Ux4gRadius.radius8,
                borderBottomRightRadius: showSubmitButton ? 0 : Ux4gRadius.radius8,
                borderRightWidth: showSubmitButton ? 0 : isFocused ? 2 : 1,
              },
            ]}
          >
            {/* Leading Search Icon */}
            <View style={styles.leadingIconBox}>
              {Ux4gIcons.search({
                size: 20,
                color: addOpacityToHex(onSurfaceColor, 0.5),
              })}
            </View>

            {/* Text Input */}
            <TextInput
              value={value}
              onChangeText={onValueChange}
              editable={enabled && !readOnly}
              returnKeyType="search"
              onSubmitEditing={handleSubmit}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                // Delay slightly so inline option clicks can register before blur hides dropdown
                setTimeout(() => setIsFocused(false), 220);
              }}
              placeholder={placeholder}
              placeholderTextColor={
                (placeholderStyle as any)?.color ?? addOpacityToHex(onSurfaceColor, 0.4)
              }
              style={[
                styles.textInput,
                typography.bM_default,
                {
                  color: enabled ? onSurfaceColor : addOpacityToHex(onSurfaceColor, 0.4),
                },
                style,
              ]}
            />

            {/* Optional Loading Spinner */}
            {isLoading && variant !== 'autocomplete' && (
              <View style={styles.trailingActionBox}>
                <Ux4gSpinner size={16} />
              </View>
            )}

            {/* Optional Voice Icon */}
            {showVoiceIcon && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleVoice}
                style={styles.trailingActionBox}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                {Ux4gIcons.mic({
                  size: 20,
                  color: addOpacityToHex(onSurfaceColor, 0.5),
                })}
              </TouchableOpacity>
            )}

            {/* Optional Clear Icon */}
            {showClearIcon && value.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleClear}
                style={styles.trailingActionBox}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                {Ux4gIcons.close({
                  size: 20,
                  color: addOpacityToHex(onSurfaceColor, 0.5),
                })}
              </TouchableOpacity>
            )}
          </View>

          {/* Optional Submit Button Attached on Right */}
          {showSubmitButton && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubmit}
              style={[
                styles.submitButton,
                {
                  height: computedHeight,
                  width: computedHeight,
                  backgroundColor:
                    buttonStyle === 'filled'
                      ? primaryColor
                      : addOpacityToHex(primaryColor, 0.1),
                },
              ]}
            >
              {Ux4gIcons.search({
                size: 20,
                color: buttonStyle === 'filled' ? onPrimaryColor : primaryColor,
              })}
            </TouchableOpacity>
          )}
        </View>

        {/* Autocomplete Dropdown List */}
        {shouldShowDropdown && (
          useModalOverlay ? (
            <Modal
              visible={shouldShowDropdown}
              transparent
              animationType="fade"
              onRequestClose={() => setIsFocused(false)}
            >
              <Pressable
                style={styles.modalOverlayTransparent}
                onPress={() => setIsFocused(false)}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: menuCoords.top,
                    left: menuCoords.left,
                    width: menuCoords.width,
                  }}
                  onStartShouldSetResponder={() => true}
                >
                  {renderAutocompleteList()}
                </View>
              </Pressable>
            </Modal>
          ) : (
            <View
              style={[
                styles.inlineDropdownContainer,
                { top: computedHeight + 4 },
              ]}
            >
              {renderAutocompleteList()}
            </View>
          )
        )}
      </View>

      {/* Caption Section */}
      {caption !== undefined && caption !== null && caption.trim().length > 0 && (
        <View style={styles.captionRow}>
          {renderStatusIcon()}
          <Text
            style={[
              typography.bXS_default,
              {
                color: getCaptionColor(),
                marginLeft: renderStatusIcon() !== null ? 6 : 0,
                flex: 1,
              },
              captionStyle,
            ]}
          >
            {caption}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  leadingIconBox: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  trailingActionBox: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    borderTopRightRadius: Ux4gRadius.radius8,
    borderBottomRightRadius: Ux4gRadius.radius8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  inlineDropdownContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10000,
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  autocompleteCard: {
    width: '100%',
    borderWidth: 1,
    borderRadius: Ux4gRadius.radius8,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 6,
      },
    }),
  },
  centerSpinnerBox: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBox: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchingForBox: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  modalOverlayTransparent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
