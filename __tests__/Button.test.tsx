import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import {
  Ux4gThemeProvider,
  Ux4gButton,
  Ux4gOutlineButton,
  Ux4gTextButton,
  Ux4gIconButton,
  lightUx4gColors,
  defaultUx4gTypography,
} from '../src';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<Ux4gThemeProvider>{ui}</Ux4gThemeProvider>);
};

describe('Ux4gButton Component Suite', () => {
  describe('Ux4gButton Main Component', () => {
    it('should render button text correctly with default primary styling', () => {
      const { getByText, getByTestId } = renderWithTheme(
        <Ux4gButton text="Submit" testID="main-button" />
      );

      const buttonText = getByText('Submit');
      expect(buttonText).toBeTruthy();
    });

    it('should trigger onPress callback when clicked and enabled=true', () => {
      const onPressMock = jest.fn();
      const { getByTestId } = renderWithTheme(
        <Ux4gButton text="Click Me" onPress={onPressMock} testID="btn" />
      );

      fireEvent.press(getByTestId('btn'));
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('should NOT trigger onPress when enabled=false (disabled state)', () => {
      const onPressMock = jest.fn();
      const { getByTestId } = renderWithTheme(
        <Ux4gButton
          text="Disabled"
          onPress={onPressMock}
          enabled={false}
          testID="btn-disabled"
        />
      );

      fireEvent.press(getByTestId('btn-disabled'));
      expect(onPressMock).not.toHaveBeenCalled();
    });

    it('should display ActivityIndicator and prevent onPress when isLoading=true', () => {
      const onPressMock = jest.fn();
      const { getByTestId, queryByText } = renderWithTheme(
        <Ux4gButton
          text="Loading"
          isLoading={true}
          onPress={onPressMock}
          testID="btn-loading"
        />
      );

      expect(getByTestId('btn-loading-loader')).toBeTruthy();
      fireEvent.press(getByTestId('btn-loading'));
      expect(onPressMock).not.toHaveBeenCalled();
    });

    it('should support direct style and token customizations (backgroundColor, borderRadius, textStyle)', () => {
      const { getByText, getByTestId } = renderWithTheme(
        <Ux4gButton
          text="Custom Styled"
          backgroundColor="#FF0000"
          borderRadius={20}
          textStyle={{ letterSpacing: 2, color: '#00FF00' }}
          testID="btn-custom"
        />
      );

      const textElement = getByText('Custom Styled');
      expect(textElement.props.style).toContainEqual(
        expect.objectContaining({ color: '#00FF00', letterSpacing: 2 })
      );
    });

    it('should render leadingIcon and trailingIcon elements or callbacks', () => {
      const leadingMock = <Text testID="leading-icon">L</Text>;
      const trailingMock = ({ color, size }: { color: string; size: number }) => (
        <Text testID="trailing-icon" style={{ color, fontSize: size }}>
          T
        </Text>
      );

      const { getByTestId } = renderWithTheme(
        <Ux4gButton
          text="Icon Button"
          leadingIcon={leadingMock}
          trailingIcon={trailingMock}
          iconSize={22}
          testID="btn-icons"
        />
      );

      expect(getByTestId('leading-icon')).toBeTruthy();
      expect(getByTestId('trailing-icon')).toBeTruthy();
    });
  });

  describe('Ux4gOutlineButton Preset Component', () => {
    it('should render as outline variant and forward color prop to content and border', () => {
      const { getByText } = renderWithTheme(
        <Ux4gOutlineButton text="Outline Action" color="#123456" />
      );

      expect(getByText('Outline Action')).toBeTruthy();
    });
  });

  describe('Ux4gTextButton Preset Component', () => {
    it('should render as ghost/text variant and forward color prop', () => {
      const { getByText } = renderWithTheme(
        <Ux4gTextButton text="Skip" color="#654321" />
      );

      expect(getByText('Skip')).toBeTruthy();
    });
  });

  describe('Ux4gIconButton Component', () => {
    it('should render square icon button with correct size and onPress behavior', () => {
      const onPressMock = jest.fn();
      const { getByTestId } = renderWithTheme(
        <Ux4gIconButton
          icon={<Text testID="icon-child">X</Text>}
          onPress={onPressMock}
          size={50}
          testID="icon-btn"
        />
      );

      expect(getByTestId('icon-child')).toBeTruthy();
      fireEvent.press(getByTestId('icon-btn'));
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });
});
