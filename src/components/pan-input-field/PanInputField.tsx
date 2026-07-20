import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  Ux4gInputField,
  Ux4gInputFieldSize,
  Ux4gInputFieldStatus,
} from '../input-field/InputField';

/**
 * Static utility to validate PAN number using Regex.
 * Format: 5 Letters, 4 Digits, 1 Letter (e.g., ABCDE1234F)
 */
export const validatePan = (pan: string): boolean => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.toUpperCase());
};

export interface Ux4gPanInputFieldProps {
  /**
   * Current PAN string (automatically converted to uppercase).
   */
  value: string;

  /**
   * Callback triggered when the uppercase text inside the field changes.
   */
  onValueChange: (value: string) => void;

  /**
   * Size of the input field (`small`, `medium`, `large`).
   * @default 'medium'
   */
  size?: Ux4gInputFieldSize;

  /**
   * Validation status (`defaultStatus`, `error`, `warning`, `success`).
   * @default 'defaultStatus'
   */
  status?: Ux4gInputFieldStatus;

  /**
   * Optional label displayed above the input box.
   * @default 'PAN Card Number'
   */
  label?: string;

  /**
   * Whether the field is required (displays red `*`).
   * @default false
   */
  required?: boolean;

  /**
   * Placeholder hint text inside the input box when empty.
   * @default 'ABCDE1234F'
   */
  placeholder?: string;

  /**
   * Caption or validation helper text displayed below the input box.
   * @default 'Enter your 10-character PAN number'
   */
  caption?: string;

  /**
   * Optional leading widget/icon inside the left side of the input box.
   */
  leadingIcon?: React.ReactNode;

  /**
   * Optional trailing widget/icon inside the right side of the input box.
   */
  trailingIcon?: React.ReactNode;

  /**
   * Callback triggered when `trailingIcon` is pressed.
   */
  onTrailingIconPressed?: () => void;

  /**
   * Whether the input field is interactive (`true`) or disabled (`false`).
   * @default true
   */
  enabled?: boolean;

  /**
   * Whether the input field is read-only (`true`) or editable (`false`).
   * @default false
   */
  readOnly?: boolean;

  /**
   * Optional override for the input value text style.
   */
  style?: StyleProp<TextStyle>;

  /**
   * Optional override for the label text style.
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Optional override for the placeholder text style.
   */
  placeholderStyle?: StyleProp<TextStyle>;

  /**
   * Optional override for the caption text style.
   */
  captionStyle?: StyleProp<TextStyle>;

  /**
   * Optional style for the outermost container wrapper.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Test identifier.
   */
  testID?: string;
}

/**
 * **Ux4gPanInputField**
 *
 * A specialized input field for Permanent Account Number (PAN) cards, mirroring the Flutter
 * `Ux4gPanInputField` (`pan_input_field.dart`).
 *
 * Features:
 * - Auto-uppercase enforcement.
 * - Alphanumeric input restriction.
 * - Built-in Regex verification (`^[A-Z]{5}[0-9]{4}[A-Z]{1}$`).
 * - Automatically transitions to `success` ("Valid PAN number") or `error` ("Please enter a valid PAN number") when 10 characters are completed if `status === 'defaultStatus'`.
 */
export const Ux4gPanInputField: React.FC<Ux4gPanInputFieldProps> & {
  validatePan: (pan: string) => boolean;
} = ({
  value,
  onValueChange,
  size = 'medium',
  status = 'defaultStatus',
  label = 'PAN Card Number',
  required = false,
  placeholder = 'ABCDE1234F',
  caption = 'Enter your 10-character PAN number',
  leadingIcon,
  trailingIcon,
  onTrailingIconPressed,
  enabled = true,
  readOnly = false,
  style,
  labelStyle,
  placeholderStyle,
  captionStyle,
  containerStyle,
  testID,
}) => {
  let currentStatus: Ux4gInputFieldStatus = status;
  let currentCaption: string | undefined = caption;

  if (value.length === 10) {
    if (status === 'defaultStatus') {
      if (validatePan(value)) {
        currentStatus = 'success';
        currentCaption = 'Valid PAN number';
      } else {
        currentStatus = 'error';
        currentCaption = 'Please enter a valid PAN number';
      }
    }
  }

  const handleValueChange = (text: string) => {
    // Strip non-alphanumeric and force uppercase
    const alphanumericOnly = text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    onValueChange(alphanumericOnly);
  };

  return (
    <Ux4gInputField
      value={value}
      onValueChange={handleValueChange}
      size={size}
      type="text"
      status={currentStatus}
      label={label}
      required={required}
      placeholder={placeholder}
      caption={currentCaption}
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
      onTrailingIconPressed={onTrailingIconPressed}
      enabled={enabled}
      readOnly={readOnly}
      maxLength={10}
      style={style}
      labelStyle={labelStyle}
      placeholderStyle={placeholderStyle}
      captionStyle={captionStyle}
      containerStyle={containerStyle}
      testID={testID}
    />
  );
};

Ux4gPanInputField.validatePan = validatePan;
