import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';

/* ------------------------------------------------------------------ */
/*  Panel                                                             */
/* ------------------------------------------------------------------ */

interface PanelProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  width?: number;
  style?: React.CSSProperties;
  /**
   * Render inline where it is placed, filling its parent, instead of fixed to
   * the right edge of the window — for a panel that IS a view (an editor tab)
   * rather than one that slides over it. `width` is ignored when docked.
   */
  docked?: boolean;
  'data-testid'?: string;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  variant = 'light',
  width = 320,
  style,
  docked = false,
  'data-testid': testId,
}) => {
  if (docked) {
    return (
      <div
        className={cn('relative flex h-full min-h-0 w-full flex-col', variant === 'dark' ? 'bg-call-chrome' : 'bg-surface')}
        data-testid={testId}
        {...(style ? { style } : {})}
      >
        {children}
      </div>
    );
  }
  // Render into document.body so the panel escapes any ancestor stacking
  // context (AppLayout's main content area creates one via `zIndex: 1`,
  // which would otherwise trap Panel's z-index below the sticky header).
  // See frontend/e2e/sidebar-panels.spec.ts for the regression.
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div
      className={cn(
        'fixed right-0 top-0 h-full z-[60] flex flex-col shadow-[-4px_0_12px_rgba(0,0,0,0.08)]',
        // `variant="dark"` means "this panel is permanently dark chrome",
        // not "inverse of the current theme" — its children below are
        // hardcoded `text-white` / `border-white/10`. `bg-surface-inverse`
        // FLIPS to #f8fafc under [data-theme="dark"], which turned this
        // panel white-on-white. `--color-call-chrome` is the theme-invariant
        // family for exactly this (see src/styles.css); it resolves to the
        // same #0f172a `surface-inverse` gave in light, so light is a no-op.
        variant === 'dark' ? 'bg-call-chrome' : 'bg-surface'
      )}
      style={{ width, ...style }}
      data-testid={testId}
    >
      {children}
    </div>,
    document.body,
  );
};

/* ------------------------------------------------------------------ */
/*  PanelHeader                                                       */
/* ------------------------------------------------------------------ */

interface PanelHeaderProps {
  title: string;
  onClose: () => void;
  actions?: React.ReactNode;
  variant?: 'light' | 'dark';
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({
  title,
  onClose,
  actions,
  variant = 'light',
}) => {
  const isDark = variant === 'dark';
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-2',
        isDark ? 'border-b border-white/10' : 'border-b border-border'
      )}
    >
      <span
        className={cn(
          'text-[13px] font-semibold',
          isDark ? 'text-white' : 'text-text-primary'
        )}
      >
        {title}
      </span>

      <div className="flex items-center gap-1">
        {actions}
        <button
          data-ui-part=""
          type="button"
          onClick={onClose}
          className={cn(
            'w-[22px] h-[22px] flex items-center justify-center',
            'bg-transparent border-none rounded-sm cursor-pointer',
            'text-sm p-0 leading-none',
            isDark ? 'text-text-tertiary' : 'text-text-secondary'
          )}
          aria-label="Close panel"
        >
          ×
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  PanelBody                                                         */
/* ------------------------------------------------------------------ */

interface PanelBodyProps {
  children: React.ReactNode;
  padding?: string;
}

export const PanelBody: React.FC<PanelBodyProps> = ({
  children,
  padding,
}) => (
  <div
    className="flex-1 overflow-y-auto"
    style={{ padding: padding ?? '14px 12px' }}
  >
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Button                                                            */
/* ------------------------------------------------------------------ */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger';
  size?: 'sm' | 'md';
}

const btnVariantClasses: Record<string, string> = {
  default: 'bg-surface text-text-primary border border-border',
  primary: 'bg-success text-white border border-success',
  danger: 'bg-danger text-white border border-danger',
};

const btnSizeClasses: Record<string, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-[13px]',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  style,
  type = 'button',
  className,
  ...rest
}) => (
  <button
    data-ui-part=""
    type={type}
    className={cn(
      'rounded-sm cursor-pointer font-medium leading-[1.4]',
      btnVariantClasses[variant],
      btnSizeClasses[size],
      className,
    )}
    style={style}
    {...rest}
  />
);

/* ------------------------------------------------------------------ */
/*  IconButton                                                        */
/* ------------------------------------------------------------------ */

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  activeColor?: string;
  size?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  active = false,
  activeColor = 'rgba(255,255,255,0.1)',
  size = 36,
  style,
  type = 'button',
  className,
  ...rest
}) => (
  <button
    data-ui-part=""
    type={type}
    className={cn(
      'flex items-center justify-center border-none rounded-full cursor-pointer p-0 text-inherit',
      className,
    )}
    style={{
      width: size,
      height: size,
      background: active ? activeColor : 'transparent',
      ...style,
    }}
    {...rest}
  />
);
