import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Ux4gTag, Ux4gUnifiedPillTag, Ux4gThemeProvider } from '../src';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<Ux4gThemeProvider>{ui}</Ux4gThemeProvider>);
};

describe('Ux4gTag Component', () => {
  it('should render standard tag with text', () => {
    const { getByText } = renderWithTheme(<Ux4gTag text="Parity Tag" />);
    expect(getByText('Parity Tag')).toBeTruthy();
  });

  it('should support all color schemes (`neutral`, `brand`, `success`, `warning`, `error`, `info`) without throwing', () => {
    const schemes = ['neutral', 'brand', 'success', 'warning', 'error', 'info'] as const;
    schemes.forEach((scheme) => {
      const { getByText } = renderWithTheme(<Ux4gTag text={scheme} colorScheme={scheme} />);
      expect(getByText(scheme)).toBeTruthy();
    });
  });

  it('should support all styles (`tonal`, `filled`, `outline`, `text`) and shapes (`circular`, `rectangular`)', () => {
    const { getByText: getByText1 } = renderWithTheme(
      <Ux4gTag text="Outline Rect" style="outline" shape="rectangular" size="l" />
    );
    expect(getByText1('Outline Rect')).toBeTruthy();

    const { getByText: getByText2 } = renderWithTheme(
      <Ux4gTag text="Filled Circ" style="filled" shape="circular" size="m" />
    );
    expect(getByText2('Filled Circ')).toBeTruthy();
  });

  it('should render leading content when provided', () => {
    const { getByText } = renderWithTheme(
      <Ux4gTag text="With Icon" leadingContent={<Text>⚡</Text>} />
    );
    expect(getByText('⚡')).toBeTruthy();
    expect(getByText('With Icon')).toBeTruthy();
  });

  it('should fire onDismiss callback when dismiss button pressed', () => {
    const onDismissMock = jest.fn();
    const { getByText, getByTestId } = renderWithTheme(
      <Ux4gTag testID="dismiss-tag" text="Dismissable" onDismiss={onDismissMock} />
    );

    expect(getByText('Dismissable')).toBeTruthy();
    const dismissBtn = getByTestId('dismiss-tag-dismiss');
    fireEvent.press(dismissBtn);
    expect(onDismissMock).toHaveBeenCalledTimes(1);
  });

  it('should render Ux4gUnifiedPillTag with multiple segments', () => {
    const { getByText } = renderWithTheme(
      <Ux4gUnifiedPillTag
        segments={[
          { text: 'SEGMENT 1', bold: true },
          { text: 'SEGMENT 2', textColor: '#10B981' },
        ]}
      />
    );
    expect(getByText('SEGMENT 1')).toBeTruthy();
    expect(getByText('SEGMENT 2')).toBeTruthy();
  });
});
