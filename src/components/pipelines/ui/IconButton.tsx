import React from 'react';
import type { CSSProperties, ButtonHTMLAttributes } from 'react';
import { colors } from '../../../constants/styles';

type IconButtonVariant = 'ghost' | 'secondary';

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: number;
}

const variantStyles: Record<IconButtonVariant, CSSProperties> = {
  ghost: {
    background: 'transparent',
    color: colors.textSecondary,
    border: 'none',
  },
  secondary: {
    background: 'transparent',
    color: colors.textSecondary,
    border: `1px solid ${colors.border}`,
  },
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'ghost', size = 28, style, ...rest }, ref) => {
    const combined: CSSProperties = {
      width: size,
      height: size,
      padding: 0,
      borderRadius: 6,
      cursor: 'pointer',
      fontSize: 16,
      lineHeight: 1,
      fontFamily: 'inherit',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      ...variantStyles[variant],
      ...style,
    };

    return <button ref={ref} type="button" style={combined} {...rest} />;
  },
);

IconButton.displayName = 'IconButton';
export default IconButton;
