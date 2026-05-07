// frontend/src/components/ui/IconButton.tsx
//
// Icon-only button with proper aria-label for accessibility.

import { type CSSProperties, type ReactNode } from 'react';

export interface IconButtonProps {
  /** Accessible label for screen readers (required) */
  'aria-label': string;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'ghost' | 'primary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  className?: string;
}

const colors = {
  ghost: 'transparent',
  ghostHover: '#f3f4f6',
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  danger: '#ef4444',
  dangerHover: '#dc2626',
};

function getVariantStyles(variant: 'ghost' | 'primary' | 'danger'): CSSProperties {
  switch (variant) {
    case 'ghost':
      return { background: colors.ghost, color: '#374151' };
    case 'primary':
      return { background: colors.primary, color: '#fff' };
    case 'danger':
      return { background: colors.danger, color: '#fff' };
  }
}

function getSizeStyles(size: 'sm' | 'md' | 'lg'): CSSProperties {
  switch (size) {
    case 'sm':
      return { width: 24, height: 24, fontSize: 14 };
    case 'md':
      return { width: 32, height: 32, fontSize: 16 };
    case 'lg':
      return { width: 40, height: 40, fontSize: 18 };
  }
}

function getHoverColor(variant: 'ghost' | 'primary' | 'danger'): string {
  switch (variant) {
    case 'ghost':
      return colors.ghostHover;
    case 'primary':
      return colors.primaryHover;
    case 'danger':
      return colors.dangerHover;
  }
}

export function IconButton({
  'aria-label': ariaLabel,
  icon,
  onClick,
  disabled = false,
  variant = 'ghost',
  size = 'md',
  style,
  className,
}: IconButtonProps) {
  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background 0.15s ease',
    ...getVariantStyles(variant),
    ...getSizeStyles(size),
    ...style,
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
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
      {icon}
    </button>
  );
}
