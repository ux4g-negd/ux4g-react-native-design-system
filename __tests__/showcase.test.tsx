import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ButtonShowcase, DividerShowcase, SwitchShowcase, TagShowcase, BadgeShowcase } from '../src';

describe('Ux4gButton Showcase Screen', () => {
  it('should render the full interactive ButtonShowcase without errors', () => {
    const { getByText, getAllByRole } = render(<ButtonShowcase />);

    expect(getByText('Ux4gButton Showcase')).toBeTruthy();
    expect(getByText('1. Variants (`Ux4gButtonVariant`)')).toBeTruthy();
    expect(getByText('2. Sizes (`Ux4gButtonSize`)')).toBeTruthy();
    expect(getByText('Primary Action')).toBeTruthy();
    expect(getByText('Secondary Action')).toBeTruthy();
    expect(getByText('Custom Pill Action')).toBeTruthy();

    const buttons = getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(10);
  });

  it('should toggle theme from Light to Dark inside ButtonShowcase when switcher button pressed', () => {
    const { getByText, queryByText } = render(<ButtonShowcase />);

    expect(getByText('Light Theme Active')).toBeTruthy();
    const toggleBtn = getByText('🌙 Dark');
    fireEvent.press(toggleBtn);

    expect(getByText('Dark Theme Active')).toBeTruthy();
    expect(getByText('☀️ Light')).toBeTruthy();
  });
});

describe('DividerShowcase Screen', () => {
  it('should render DividerShowcase without errors', () => {
    const { getByText } = render(<DividerShowcase />);
    expect(getByText('Ux4gDivider (`Ux4gDividerProps`)')).toBeTruthy();
    expect(getByText('1. Line Styles (`solid`, `dashed`, `dotted`)')).toBeTruthy();
  });
});

describe('SwitchShowcase Screen', () => {
  it('should render SwitchShowcase without errors', () => {
    const { getByText } = render(<SwitchShowcase />);
    expect(getByText('Ux4gSwitch (`Ux4gSwitchProps`)')).toBeTruthy();
    expect(getByText('1. Basic Toggle States (`checked`, `unchecked`, `disabled`)')).toBeTruthy();
  });
});

describe('TagShowcase Screen', () => {
  it('should render TagShowcase without errors', () => {
    const { getByText } = render(<TagShowcase />);
    expect(getByText('🏷️ Tag Component (`Ux4gTag`)')).toBeTruthy();
    expect(getByText('1. Color Schemes (`colorScheme`) - Tonal Style')).toBeTruthy();
  });
});

describe('BadgeShowcase Screen', () => {
  it('should render BadgeShowcase without errors', () => {
    const { getByText } = render(<BadgeShowcase />);
    expect(getByText('🔴 Badge Component (`Ux4gBadge`)')).toBeTruthy();
    expect(getByText('1. Dot (`Ux4gBadge.dot`)')).toBeTruthy();
    expect(getByText('2. Count (`Ux4gBadge.count`)')).toBeTruthy();
  });
});
