// frontend/src/components/sidebar/SidebarRow.tsx
//
// SidebarRow — a single clickable row inside a SidebarSection.
// Composes: icon · label · trailing slot · kebab.
//
// Variants:
//   - default (button-like): renders an interactive <div role="button">
//   - link variant when `href` is set: renders an <a> instead
//
// The optional `kebab` slot opens a popover menu — the row itself owns
// only the button; the popover content is provided by the caller via
// the `kebab` ReactNode (typically an <InlinePopover> bound to a local
// `open` state).
//
// Keyboard:
//   - Enter / Space → onClick
//   - ContextMenu key → onContextMenu (synthesizes a fake mouse event
//     so callers can show the kebab popover without re-implementing the
//     handler).

import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useRef,
} from 'react';
import { cn } from '../../lib/cn';
import { safeHref } from '../../lib/safeHref';

export interface SidebarRowProps {
  /** Leading icon. */
  icon?: ReactNode;
  /** Primary label (string or ReactNode). */
  label: ReactNode;
  /** Right-side slot for badges, avatar stacks, etc. */
  trailing?: ReactNode;
  /** Highlighted state. */
  active?: boolean;
  onClick?: () => void;
  onContextMenu?: (e: MouseEvent<HTMLElement>) => void;
  /** When set, the row renders as an <a href>. Click handling still fires. */
  href?: string;
  /** Optional kebab-menu trigger node (typically an IconButton). */
  kebab?: ReactNode;
  /** Disabled state — non-interactive, muted styling. */
  disabled?: boolean;
  /** Accessibility label override (when `label` isn't a string). */
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
  /** Arbitrary `data-*` attributes spread onto the root element.
   *  Used by e2e tooling to expose row-level metadata (e.g.
   *  `data-room-slug`) without bespoke wrapper divs that interfere
   *  with the row layout. */
  dataAttrs?: Record<string, string | number | undefined>;
}

export function SidebarRow({
  icon,
  label,
  trailing,
  active = false,
  onClick,
  onContextMenu,
  href,
  kebab,
  disabled = false,
  'aria-label': ariaLabel,
  className,
  'data-testid': testId = 'sidebar-row',
  dataAttrs,
}: SidebarRowProps) {
  // Filter undefined values so they don't render as `data-foo="undefined"`.
  const extraDataAttrs: Record<string, string | number> = {};
  if (dataAttrs) {
    for (const [k, v] of Object.entries(dataAttrs)) {
      if (v !== undefined && v !== null && v !== '') extraDataAttrs[k] = v;
    }
  }
  const rowRef = useRef<HTMLElement | null>(null);

  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick?.();
  }, [disabled, onClick]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
        return;
      }
      if (e.key === 'ContextMenu' && onContextMenu) {
        e.preventDefault();
        // Synthesize a minimal mouse-event-shaped object so the caller's
        // handler can ignore positioning if it doesn't care.
        onContextMenu(e as unknown as MouseEvent<HTMLElement>);
      }
    },
    [disabled, onClick, onContextMenu],
  );

  const handleContextMenu = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (disabled) return;
      onContextMenu?.(e);
    },
    [disabled, onContextMenu],
  );

  // A row with no `onClick`, no `href` and no `onContextMenu` has nothing to
  // activate, so it must not advertise itself as a button. It used to render
  // `role="button" tabIndex={0}` with the pointer cursor and hover highlight
  // regardless, which put a keyboard stop on a row that swallowed both Enter
  // and click — the "Browse all" row in HangoutRoomsSection is the case that
  // surfaced it. Kebab-only rows stay non-interactive at this level: the
  // kebab is its own button and stops propagation.
  const interactive = !!onClick || !!href || !!onContextMenu;

  const baseClass = cn(
    'group relative flex items-center gap-2 w-full',
    'px-2 py-1.5 rounded-md text-sm leading-tight select-none',
    'transition-colors duration-100',
    !disabled && interactive && 'cursor-pointer hover:bg-surface-hover',
    active && !disabled && 'bg-info-bg text-info-fg hover:bg-info-bg',
    !active && !disabled && 'text-text-primary',
    disabled && 'opacity-50 cursor-not-allowed text-neutral',
    'no-underline',
    className,
  );

  const inner = (
    <>
      {icon && (
        <span className="inline-flex items-center justify-center w-4 h-4 shrink-0 text-text-tertiary group-hover:text-neutral">
          {icon}
        </span>
      )}
      <span className="flex-1 min-w-0 truncate">{label}</span>
      {trailing && <span className="flex items-center gap-1 shrink-0">{trailing}</span>}
      {kebab && (
        <span
          className="shrink-0"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {kebab}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={rowRef as React.RefObject<HTMLAnchorElement>}
        href={safeHref(href) ?? undefined}
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        data-testid={testId}
        data-active={active ? 'true' : 'false'}
        {...extraDataAttrs}
        className={baseClass}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          if (onClick) {
            // Only intercept when caller provided a handler — otherwise
            // allow the browser to navigate normally.
            e.preventDefault();
            onClick();
          }
        }}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      ref={rowRef as React.RefObject<HTMLDivElement>}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? (disabled ? -1 : 0) : undefined}
      aria-pressed={interactive ? active : undefined}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      data-testid={testId}
      data-active={active ? 'true' : 'false'}
      {...extraDataAttrs}
      className={baseClass}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
    >
      {inner}
    </div>
  );
}

export default SidebarRow;
