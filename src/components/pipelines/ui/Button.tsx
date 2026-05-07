import React from 'react';
import type { CSSProperties, ButtonHTMLAttributes } from 'react';
import { colors } from '../../../constants/styles';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyle: CSSProperties = {
  fontFamily: 'inherit',
  fontWeight: 600,
  fontSize: 13,
  borderRadius: 6,
  cursor: 'pointer',
  flexShrink: 0,
  lineHeight: 1.4,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
};

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  md: { padding: '6px 14px' },
  sm: { padding: '4px 10px', fontSize: 12 },
};

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: colors.primary,
    color: '#ffffff',
    border: 'none',
  },
  secondary: {
    background: 'transparent',
    color: colors.textSecondary,
    border: `1px solid ${colors.border}`,
  },
  danger: {
    background: '#dc2626',
    color: '#ffffff',
    border: 'none',
  },
  ghost: {
    background: 'transparent',
    color: colors.textSecondary,
    border: 'none',
  },
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', disabled, style, ...rest }, ref) => {
    const combined: CSSProperties = {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : undefined),
      ...style,
    };

    return <button ref={ref} disabled={disabled} style={combined} {...rest} />;
  },
);

Button.displayName = 'Button';
export default Button;
