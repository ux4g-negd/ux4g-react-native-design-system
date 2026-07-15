import React from 'react';
import { Ux4gButton, Ux4gButtonProps } from './Button';

export interface Ux4gTextButtonProps extends Ux4gButtonProps {
  /** Convenience prop overriding text and icon foreground color */
  color?: string;
}

export const Ux4gTextButton: React.FC<Ux4gTextButtonProps> = ({
  color,
  contentColor,
  ...restProps
}) => {
  return (
    <Ux4gButton
      variant="ghost"
      contentColor={contentColor ?? color}
      {...restProps}
    />
  );
};
