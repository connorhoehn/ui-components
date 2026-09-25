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

/** The callout's `accent="bar"` edge — the solid tone, 3px, on the left. */
const ACCENT_BAR_CLASSES: Record<BannerVariant, string> = {
  error:   'border-l-danger',
  warning: 'border-l-warning',
  info:    'border-l-info',
  success: 'border-l-success',
};

const VARIANT_CLASSES: Record<BannerVariant, string> = {
  error:   'bg-danger-bg border-danger-border text-danger-fg',
  warning: 'bg-warning-bg border-warning-border text-warning-fg',
  info:    'bg-info-bg border-info-border text-info-fg',
  success: 'bg-success-bg border-success-border text-success-fg',
};

/**
 * The callout's surface (2.389.4): the paler `-callout` fill and border, not
 * the tone's `-bg`/`-border` a pill uses — a paragraph-wide notice in the
 * badge ink read as a saturated slab once a host pushed `-bg` darker.
 */
const CALLOUT_CLASSES: Record<BannerVariant, string> = {
  error:   'bg-danger-callout border-danger-callout-border',
  warning: 'bg-warning-callout border-warning-callout-border',
  info:    'bg-info-callout border-info-callout-border',
  success: 'bg-success-callout border-success-callout-border',
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
   * surface is the tone's pale `--color-{tone}-callout` fill and
   * `-callout-border` (since 2.389.4; the soft `-bg` before), the title reads in
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
  /**
   * `callout` only: a 3px solid tone bar down the left edge — the notice
   * reads as a pull-quote in a document body ("What needs attention").
   * Default `none`. Since 2.390.0.
   */
  accent?: 'none' | 'bar';
  /**
   * `callout` only: a third line under the body — facts about the thing the
   * notice is about ("Blocked · Eli Garcia · 2 points"), already worded and
   * toned by the host. Since 2.390.0.
   */
  meta?: ReactNode;
  /**
   * `callout` only: `md` (default) is the 14px title over a 13px body; `lg`
   * is a 17px title over a 15px body with roomier padding — a callout that is
   * a section's content, not a note beside it — and its `action` sits level
   * with the title rather than centred on the block. Since 2.390.0.
   */
  size?: 'md' | 'lg';
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

export default function Banner({
  variant = 'error', title, layout = 'inline', icon, onDismiss, action, accent = 'none', meta, size = 'md', children, className, style,
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

  const lg = size === 'lg';
  if (layout === 'callout') {
    return (
      <div
        role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
        aria-live={variant === 'error' || variant === 'warning' ? 'assertive' : 'polite'}
        data-testid={testId}
        data-layout="callout"
        data-accent={accent}
        data-size={size}
        className={cn(
          // lg hangs the action off the title line, not the block's middle.
          'rounded-md flex gap-4 border text-text-primary',
          lg ? 'items-start' : 'items-center',
          lg ? 'px-6 py-3 text-[15px]' : 'px-5 py-3 text-[13px]',
          CALLOUT_CLASSES[variant],
          accent === 'bar' && cn('border-l-[3px]', ACCENT_BAR_CLASSES[variant]),
          className,
        )}
        style={style}
      >
        {iconNode}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          {title && <strong className={cn('font-semibold text-text-primary', lg ? 'text-[17px] leading-[22px]' : 'text-sm leading-5')}>{title}</strong>}
          {children != null && <span className={cn(lg ? 'text-[15px] leading-[22px] text-text-primary' : 'text-[13px] leading-5 text-text-secondary')}>{children}</span>}
          {meta != null && (
            <span className={cn('text-text-secondary', lg ? 'text-sm leading-5' : 'text-[12px] leading-4')} data-testid={testId ? `${testId}-meta` : undefined}>
              {meta}
            </span>
          )}
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
