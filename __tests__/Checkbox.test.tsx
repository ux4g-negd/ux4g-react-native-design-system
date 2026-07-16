import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Ux4gCheckbox } from '../src/components/checkbox/Checkbox';
import { Ux4gThemeProvider } from '../src/theme/Ux4gThemeContext';

describe('Ux4gCheckbox', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<Ux4gThemeProvider>{ui}</Ux4gThemeProvider>);
  };

  it('renders unchecked correctly and triggers onChanged on press', () => {
    const onChanged = jest.fn();
    const { getByTestId, getByText } = renderWithTheme(
      <Ux4gCheckbox
        testID="checkbox"
        label="Accept Terms"
        value={false}
        onChanged={onChanged}
      />
    );

    expect(getByText('Accept Terms')).toBeTruthy();
    fireEvent.press(getByTestId('checkbox'));
    expect(onChanged).toHaveBeenCalledWith(true);
  });

  it('triggers onChanged from tristate (null) to true', () => {
    const onChanged = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Ux4gCheckbox
        testID="checkbox-null"
        value={null}
        onChanged={onChanged}
      />
    );

    fireEvent.press(getByTestId('checkbox-null'));
    expect(onChanged).toHaveBeenCalledWith(true);
  });

  it('triggers onChanged from true to false', () => {
    const onChanged = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Ux4gCheckbox
        testID="checkbox-checked"
        value={true}
        onChanged={onChanged}
      />
    );

    fireEvent.press(getByTestId('checkbox-checked'));
    expect(onChanged).toHaveBeenCalledWith(false);
  });
});
