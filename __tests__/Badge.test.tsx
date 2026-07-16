import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import { Ux4gBadge, Ux4gThemeProvider } from '../src';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<Ux4gThemeProvider>{ui}</Ux4gThemeProvider>);
};

describe('Ux4gBadge Component', () => {
  it('should render a dot badge when variant is dot or no props passed', () => {
    const { getByTestId } = renderWithTheme(<Ux4gBadge testID="my-dot" />);
    const badgeEl = getByTestId('my-dot-badge');
    expect(badgeEl).toBeTruthy();
    expect(badgeEl.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: 8, height: 8, borderRadius: 4 }),
      ])
    );
  });

  it('should format numeric count according to limit (singleDigit vs doubleDigit)', () => {
    // singleDigit: 9+ limit
    const { getByText: getByText1 } = renderWithTheme(
      <Ux4gBadge variant="count" count={12} limit="singleDigit" />
    );
    expect(getByText1('9+')).toBeTruthy();

    // doubleDigit: 99+ limit
    const { getByText: getByText2 } = renderWithTheme(
      <Ux4gBadge variant="count" count={45} limit="doubleDigit" />
    );
    expect(getByText2('45')).toBeTruthy();

    const { getByText: getByText3 } = renderWithTheme(
      <Ux4gBadge variant="count" count={150} limit="doubleDigit" />
    );
    expect(getByText3('99+')).toBeTruthy();
  });

  it('should render label string when variant is label', () => {
    const { getByText } = renderWithTheme(<Ux4gBadge variant="label" label="NEW" />);
    expect(getByText('NEW')).toBeTruthy();
  });

  it('should render custom icon when variant is icon', () => {
    const { getByText } = renderWithTheme(
      <Ux4gBadge variant="icon" icon={<Text>🔥</Text>} />
    );
    expect(getByText('🔥')).toBeTruthy();
  });

  it('should overlay badge around a child widget with correct alignment and borders', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <Ux4gBadge
        testID="overlay-badge"
        variant="count"
        count={5}
        alignment="topLeft"
        showBorder={true}
      >
        <View><Text>Avatar Item</Text></View>
      </Ux4gBadge>
    );

    expect(getByText('Avatar Item')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();

    const badgeEl = getByTestId('overlay-badge-badge');
    expect(badgeEl.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderWidth: 1.5 }),
      ])
    );
  });

  it('should support Flutter compound constructors (Ux4gBadge.dot, Ux4gBadge.count, Ux4gBadge.label, Ux4gBadge.icon)', () => {
    const { getByText } = renderWithTheme(
      <>
        <Ux4gBadge.dot testID="compound-dot" child={<Text>Dot Anchored</Text>} />
        {Ux4gBadge.count(42, { testID: 'compound-count', limit: 'singleDigit' })}
        {Ux4gBadge.label('SALE', { testID: 'compound-label' })}
      </>
    );

    expect(getByText('Dot Anchored')).toBeTruthy();
    expect(getByText('9+')).toBeTruthy();
    expect(getByText('SALE')).toBeTruthy();
  });
});
