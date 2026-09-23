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
  /**
   * How the title sits against the body.
   *
   * `inline` (default) is right across a page: a short title and a short
   * message read as one line. It is wrong in a narrow column — in a 280px
   * comment gutter the two children split the width and the body was left
   * with 68px, about six characters per line, wrapping into a ragged tower.
   * `stacked` puts the title above the body and gives each the full width.
   */
  layout?: 'inline' | 'stacked';
  onDismiss?: () => void;
  /**
   * A control that resolves what the banner is about — "Convert to page" on a
   * deprecation notice, "Retry" on a failure. Sits at the trailing edge,
   * before the dismiss button, and never shrinks under a long message.
   */
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

export default function Banner({
  variant = 'error', title, layout = 'inline', onDismiss, action, children, className, style,
  'data-testid': testId,
}: BannerProps) {
  return (
    <div
      role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
      aria-live={variant === 'error' || variant === 'warning' ? 'assertive' : 'polite'}
      data-testid={testId}
      className={cn(
        'px-3.5 py-2.5 rounded-lg text-[13px] flex gap-2 border',
        layout === 'stacked' ? 'flex-col items-start gap-1' : 'items-center',
        VARIANT_CLASSES[variant],
        className,
      )}
      style={style}
    >
      {title && <strong>{title}</strong>}
      <span className={layout === 'stacked' ? 'w-full' : 'flex-1'}>{children}</span>
      {action && <span className="shrink-0 flex items-center gap-2">{action}</span>}
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
