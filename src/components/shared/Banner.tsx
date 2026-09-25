import type { ReactNode, CSSProperties } from 'react';
import { cn } from '../../lib/cn';
import { WarningIcon, InfoIcon, ChecklistIcon } from '../ui/Icons';

export type BannerVariant = 'error' | 'warning' | 'info' | 'success';

/** The glyph `icon={true}` resolves to, per tone. */
const DEFAULT_ICON: Record<BannerVariant, () => ReactNode> = {
  error:   () => <WarningIcon size={20} />,
  warning: () => <WarningIcon size={20} />,
  info:    () => <InfoIcon size={20} />,
  success: () => <ChecklistIcon size={20} />,
};

/** Icon ink per tone — the solid tone colour, not the soft `-fg`. */
const ICON_CLASSES: Record<BannerVariant, string> = {
  error:   'text-danger',
  warning: 'text-warning',
  info:    'text-info',
  success: 'text-success',
};

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
   *
   * `callout` (since 2.389.0) is a full-width notice in a document body:
   * icon · title over body · trailing action, all vertically centred. The
   * surface keeps the tone's soft fill and border, but the title reads in
   * primary ink and the body in secondary ink so a paragraph of advice stays
   * legible — only the icon carries the tone colour.
   */
  layout?: 'inline' | 'stacked' | 'callout';
  /**
   * A leading glyph. `true` draws the tone's default (a warning triangle for
   * `warning`/`error`, an info circle for `info`, a check for `success`); a
   * node is drawn as given. Omitted (default) draws none — existing banners
   * are unchanged. Since 2.389.0.
   */
  icon?: ReactNode | true;
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
  variant = 'error', title, layout = 'inline', icon, onDismiss, action, children, className, style,
  'data-testid': testId,
}: BannerProps) {
  const glyph = icon === true ? DEFAULT_ICON[variant]() : icon;
  const iconNode = glyph ? (
    <span
      aria-hidden="true"
      data-testid={testId ? `${testId}-icon` : undefined}
      className={cn('shrink-0 flex items-center', ICON_CLASSES[variant])}
    >
      {glyph}
    </span>
  ) : null;
  const dismiss = onDismiss && (
    <button
      type="button"
      onClick={onDismiss}
      aria-label="Dismiss"
      className="bg-transparent border-none text-current cursor-pointer text-base p-0 leading-none"
    >
      ×
    </button>
  );

  if (layout === 'callout') {
    return (
      <div
        role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
        aria-live={variant === 'error' || variant === 'warning' ? 'assertive' : 'polite'}
        data-testid={testId}
        data-layout="callout"
        className={cn(
          'px-5 py-3 rounded-md text-[13px] flex items-center gap-4 border',
          VARIANT_CLASSES[variant],
          className,
        )}
        style={style}
      >
        {iconNode}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          {title && <strong className="text-sm font-semibold leading-5 text-text-primary">{title}</strong>}
          {children != null && <span className="text-[13px] leading-5 text-text-secondary">{children}</span>}
        </div>
        {action && <span className="shrink-0 flex items-center gap-2 whitespace-nowrap">{action}</span>}
        {dismiss}
      </div>
    );
  }

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
      {iconNode}
      {title && <strong>{title}</strong>}
      <span className={layout === 'stacked' ? 'w-full' : 'flex-1'}>{children}</span>
      {action && <span className="shrink-0 flex items-center gap-2">{action}</span>}
      {dismiss}
    </div>
  );
}
