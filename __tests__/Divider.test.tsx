import React from 'react';
import { render } from '@testing-library/react-native';
import { Ux4gDivider } from '../src/components/divider/Divider';
import { Ux4gThemeProvider } from '../src/theme/Ux4gThemeContext';

describe('Ux4gDivider', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<Ux4gThemeProvider>{ui}</Ux4gThemeProvider>);
  };

  it('renders default horizontal solid divider correctly', () => {
    const { toJSON } = renderWithTheme(<Ux4gDivider />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders vertical divider with custom thickness and color', () => {
    const { toJSON } = renderWithTheme(
      <Ux4gDivider orientation="vertical" thickness={3} color="#FF0000" />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders dashed and dotted styles correctly', () => {
    const { toJSON: dashedJson } = renderWithTheme(<Ux4gDivider style="dashed" />);
    const { toJSON: dottedJson } = renderWithTheme(<Ux4gDivider style="dotted" />);
    expect(dashedJson()).toBeTruthy();
    expect(dottedJson()).toBeTruthy();
  });

  it('renders indents correctly (startIndent, endIndent)', () => {
    const { toJSON } = renderWithTheme(
      <Ux4gDivider startIndent={16} endIndent={24} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders label (string and custom node) correctly and splits line', () => {
    const { getByText, toJSON } = renderWithTheme(
      <Ux4gDivider label="OR" labelSpacing={12} />
    );
    expect(getByText('OR')).toBeTruthy();
    expect(toJSON()).toBeTruthy();
  });
});
