import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Ux4gRadioButton } from '../src/components/radio-button/RadioButton';
import { Ux4gThemeProvider } from '../src/theme/Ux4gThemeContext';

describe('Ux4gRadioButton', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<Ux4gThemeProvider>{ui}</Ux4gThemeProvider>);
  };

  it('renders correctly and triggers onChanged with the correct value when pressed', () => {
    const onChanged = jest.fn();
    const { getByTestId, getByText } = renderWithTheme(
      <Ux4gRadioButton
        testID="radio-1"
        value="option-a"
        groupValue="option-b"
        label="Select Option A"
        description="Helper text here"
        onChanged={onChanged}
      />
    );

    expect(getByText('Select Option A')).toBeTruthy();
    expect(getByText('Helper text here')).toBeTruthy();

    fireEvent.press(getByTestId('radio-1'));
    expect(onChanged).toHaveBeenCalledWith('option-a');
  });

  it('reflects selected state when value equals groupValue', () => {
    const onChanged = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Ux4gRadioButton
        testID="radio-selected"
        value="option-a"
        groupValue="option-a"
        label="Option A"
        onChanged={onChanged}
      />
    );

    const pressable = getByTestId('radio-selected');
    expect(pressable.props.accessibilityState.checked).toBe(true);
  });

  it('does not trigger onChanged when enabled is false', () => {
    const onChanged = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Ux4gRadioButton
        testID="radio-disabled"
        value="option-a"
        groupValue="option-b"
        label="Disabled Option"
        enabled={false}
        onChanged={onChanged}
      />
    );

    fireEvent.press(getByTestId('radio-disabled'));
    expect(onChanged).not.toHaveBeenCalled();
  });

  it('renders required asterisk when isRequired is true', () => {
    const { getByText } = renderWithTheme(
      <Ux4gRadioButton
        value="1"
        groupValue="1"
        label="Required Field"
        isRequired={true}
      />
    );

    expect(getByText('Required Field')).toBeTruthy();
    expect(getByText(' *')).toBeTruthy();
  });
});
