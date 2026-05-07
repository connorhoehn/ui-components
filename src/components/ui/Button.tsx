// frontend/src/components/ui/Button.tsx
//
// Shared button component with consistent variants.

import { type CSSProperties, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
  className?: string;
}

const colors = {
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  secondary: '#6b7280',
  secondaryHover: '#4b5563',
  danger: '#ef4444',
  dangerHover: '#dc2626',
  ghost: 'transparent',
  ghostHover: '#f3f4f6',
};

function getVariantStyles(variant: ButtonVariant): CSSProperties {
  switch (variant) {
    case 'primary':
      return {
        background: colors.primary,
        color: '#fff',
        border: 'none',
      };
    case 'secondary':
      return {
        background: colors.secondary,
        color: '#fff',
        border: 'none',
      };
    case 'ghost':
      return {
        background: colors.ghost,
        color: '#374151',
        border: '1px solid #d1d5db',
      };
    case 'danger':
      return {
        background: colors.danger,
        color: '#fff',
        border: 'none',
      };
  }
}

function getSizeStyles(size: ButtonSize): CSSProperties {
  switch (size) {
    case 'sm':
      return { padding: '4px 10px', fontSize: 12 };
    case 'md':
      return { padding: '6px 14px', fontSize: 13 };
    case 'lg':
      return { padding: '8px 18px', fontSize: 14 };
  }
}

function getHoverColor(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return colors.primaryHover;
    case 'secondary':
      return colors.secondaryHover;
    case 'danger':
      return colors.dangerHover;
    case 'ghost':
      return colors.ghostHover;
  }
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  style,
  className,
}: ButtonProps) {
  const baseStyles: CSSProperties = {
    fontWeight: 600,
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
    opacity: disabled ? 0.5 : 1,
    transition: 'background 0.15s ease',
    width: fullWidth ? '100%' : undefined,
    ...getVariantStyles(variant),
    ...getSizeStyles(size),
    ...style,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={baseStyles}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = getHoverColor(variant);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background =
            (getVariantStyles(variant).background as string | undefined) || colors.ghost;
        }
      }}
    >
      {children}
    </button>
  );
}
