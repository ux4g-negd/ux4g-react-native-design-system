import React from 'react';
import { Ux4gButton, Ux4gButtonProps } from './Button';

export interface Ux4gOutlineButtonProps extends Ux4gButtonProps {
  /** Convenience prop overriding text, icon, and border color simultaneously */
  color?: string;
}

export const Ux4gOutlineButton: React.FC<Ux4gOutlineButtonProps> = ({
  color,
  contentColor,
  borderColor,
  ...restProps
}) => {
  return (
    <Ux4gButton
      variant="outline"
      contentColor={contentColor ?? color}
      borderColor={borderColor ?? color}
      {...restProps}
    />
  );
};
