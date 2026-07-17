import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  Ux4gInputField,
  Ux4gInputFieldSize,
  Ux4gInputFieldStatus,
} from '../input-field/InputField';

const _d: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const _p: number[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

/**
 * Verhoeff algorithm for Aadhaar validation.
 */
class VerhoeffAlgorithm {
  static validate(numStr: string): boolean {
    let c = 0;
    const myArray = numStr
      .split('')
      .map((char) => parseInt(char, 10))
      .reverse();

    for (let i = 0; i < myArray.length; i++) {
       if (isNaN(myArray[i])) return false;
      c = _d[c][_p[i % 8][myArray[i]]];
    }

    return c === 0;
  }
}

/**
 * Static utility to validate Aadhaar number using Verhoeff algorithm and UIDAI rules.
 */
export const validateAadhaar = (aadhaar: string): boolean => {
  const cleanAadhaar = aadhaar.replace(/\s+/g, '');
  if (cleanAadhaar.length !== 12) return false;
  if (/^[01]/.test(cleanAadhaar)) return false; // Aadhaar doesn't start with 0 or 1
  return VerhoeffAlgorithm.validate(cleanAadhaar);
};

export interface Ux4gAadhaarInputFieldProps {
  /**
   * Current formatted Aadhaar string (`XXXX XXXX XXXX`).
   */
  value: string;

  /**
   * Callback triggered when the formatted text inside the field changes.
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
   * @default 'Aadhaar Number'
   */
  label?: string;

  /**
   * Whether the field is required (displays red `*`).
   * @default false
   */
  required?: boolean;

  /**
   * Placeholder hint text inside the input box when empty.
   * @default 'XXXX XXXX XXXX'
   */
  placeholder?: string;

  /**
   * Caption or validation helper text displayed below the input box.
   * @default 'Enter your 12-digit Aadhaar number'
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
 * **Ux4gAadhaarInputField**
 *
 * A specialized input field for Aadhaar numbers (12 digits), mirroring the Flutter
 * `Ux4gAadhaarInputField` (`aadhaar_input_field.dart`).
 *
 * Features:
 * - Auto-formatting (`XXXX XXXX XXXX`) up to 12 digits (14 characters with spaces).
 * - Numeric-only input restriction.
 * - Built-in verification against UIDAI rules (no `0` or `1` leading digit) and Verhoeff checksum algorithm.
 * - Automatically transitions to `success` ("Valid Aadhaar number") or `error` ("Please enter a valid Aadhaar number") when 12 digits are completed if `status === 'defaultStatus'`.
 */
export const Ux4gAadhaarInputField: React.FC<Ux4gAadhaarInputFieldProps> & {
  validateAadhaar: (aadhaar: string) => boolean;
} = ({
  value,
  onValueChange,
  size = 'medium',
  status = 'defaultStatus',
  label = 'Aadhaar Number',
  required = false,
  placeholder = 'XXXX XXXX XXXX',
  caption = 'Enter your 12-digit Aadhaar number',
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

  const cleanValue = value.replace(/\s+/g, '');
  if (cleanValue.length === 12) {
    if (status === 'defaultStatus') {
      if (validateAadhaar(value)) {
        currentStatus = 'success';
        currentCaption = 'Valid Aadhaar number';
      } else {
        currentStatus = 'error';
        currentCaption = 'Please enter a valid Aadhaar number';
      }
    }
  }

  const handleValueChange = (text: string) => {
    // Strip non-digits and cap at 12 digits
    const digitsOnly = text.replace(/\D/g, '').slice(0, 12);
    let formatted = '';
    for (let i = 0; i < digitsOnly.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += digitsOnly[i];
    }
    onValueChange(formatted);
  };

  return (
    <Ux4gInputField
      value={value}
      onValueChange={handleValueChange}
      size={size}
      type="number"
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
      maxLength={14} // 12 digits + 2 spaces
      style={style}
      labelStyle={labelStyle}
      placeholderStyle={placeholderStyle}
      captionStyle={captionStyle}
      containerStyle={containerStyle}
      testID={testID}
    />
  );
};

Ux4gAadhaarInputField.validateAadhaar = validateAadhaar;
