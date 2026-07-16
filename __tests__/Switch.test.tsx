import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Ux4gSwitch } from '../src/components/switch/Switch';
import { Ux4gThemeProvider } from '../src/theme/Ux4gThemeContext';

describe('Ux4gSwitch', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<Ux4gThemeProvider>{ui}</Ux4gThemeProvider>);
  };

  it('renders unchecked switch with label correctly and triggers onCheckedChange on press', () => {
    const onCheckedChange = jest.fn();
    const { getByTestId, getByText } = renderWithTheme(
      <Ux4gSwitch
        testID="switch-toggle"
        checked={false}
        onCheckedChange={onCheckedChange}
        label="Enable Notifications"
      />
    );

    expect(getByText('Enable Notifications')).toBeTruthy();
    fireEvent.press(getByTestId('switch-toggle'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('works with onChanged alias and value prop', () => {
    const onChanged = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Ux4gSwitch
        testID="switch-alias"
        value={true}
        onChanged={onChanged}
      />
    );

    fireEvent.press(getByTestId('switch-alias'));
    expect(onChanged).toHaveBeenCalledWith(false);
  });

  it('does not trigger callback when disabled (`enabled={false}`)', () => {
    const onCheckedChange = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Ux4gSwitch
        testID="switch-disabled"
        checked={false}
        onCheckedChange={onCheckedChange}
        enabled={false}
      />
    );

    fireEvent.press(getByTestId('switch-disabled'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('renders all size variants (`s`, `m`, `l`) without errors', () => {
    const { toJSON: jsonS } = renderWithTheme(<Ux4gSwitch size="s" checked={true} />);
    const { toJSON: jsonM } = renderWithTheme(<Ux4gSwitch size="m" checked={false} />);
    const { toJSON: jsonL } = renderWithTheme(<Ux4gSwitch size="l" checked={true} />);

    expect(jsonS()).toBeTruthy();
    expect(jsonM()).toBeTruthy();
    expect(jsonL()).toBeTruthy();
  });

  it('renders description status variants (`error`, `warning`, `success`) and asterisks (`isRequired`)', () => {
    const { getByText } = renderWithTheme(
      <Ux4gSwitch
        checked={false}
        label="Terms & Conditions"
        isRequired={true}
        description="Must agree before continuing"
        descriptionVariant="error"
      />
    );

    expect(getByText(/Terms & Conditions/)).toBeTruthy();
    expect(getByText('Must agree before continuing')).toBeTruthy();
    expect(getByText(' *')).toBeTruthy();
  });

  it('renders `bothSides` label position correctly with secondaryLabel', () => {
    const { getByText } = renderWithTheme(
      <Ux4gSwitch
        checked={true}
        labelPosition="bothSides"
        label="Left Label"
        secondaryLabel="Right Label"
      />
    );

    expect(getByText('Left Label')).toBeTruthy();
    expect(getByText('Right Label')).toBeTruthy();
  });

  it('renders standalone switch cleanly when `labelPosition="noLabel"` or when label is omitted', () => {
    const onCheckedChange = jest.fn();
    const { getByTestId, queryByText } = renderWithTheme(
      <Ux4gSwitch
        testID="switch-standalone"
        labelPosition="noLabel"
        checked={true}
        onCheckedChange={onCheckedChange}
      />
    );

    expect(getByTestId('switch-standalone')).toBeTruthy();
    fireEvent.press(getByTestId('switch-standalone'));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
    expect(queryByText('Left Label')).toBeNull();
  });
});
