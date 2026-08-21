import type { ReactNode, CSSProperties } from 'react';
import { cn } from '../../lib/cn';

export type BannerVariant = 'error' | 'warning' | 'info' | 'success';

const VARIANT_CLASSES: Record<BannerVariant, string> = {
  error:   'bg-danger-bg border-danger-border text-danger-fg',
  warning: 'bg-warning-bg border-warning-border text-warning-fg',
  info:    'bg-info-bg border-info-border text-info-fg',
  success: 'bg-success-bg border-success-border text-success-fg',
};

export interface BannerProps {
  variant?: BannerVariant;
  /** Bold prefix label shown before children. */
  title?: string;
  onDismiss?: () => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

export default function Banner({
  variant = 'error', title, onDismiss, children, className, style,
  'data-testid': testId,
}: BannerProps) {
  return (
    <div
      role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
      aria-live={variant === 'error' || variant === 'warning' ? 'assertive' : 'polite'}
      data-testid={testId}
      className={cn(
        'px-3.5 py-2.5 rounded-lg text-[13px] flex items-center gap-2 border',
        VARIANT_CLASSES[variant],
        className,
      )}
      style={style}
    >
      {title && <strong>{title}</strong>}
      <span className="flex-1">{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="bg-transparent border-none text-current cursor-pointer text-base p-0 leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
}
