// frontend/src/components/sidebar/SidebarSection.tsx
//
// SidebarSection — collapsible group inside a left-rail sidebar.
//
// Header is an uppercase / tracked label (matching the CHANNELS /
// ACTIVITY / DOCUMENTS style in the gateway's CollapsibleSidebar) plus
// an optional `actions` slot (typically an IconButton like "+ new").
// Body collapses with a chevron that rotates on toggle. Collapse state
// is persisted to localStorage keyed by the section title so it
// survives reloads.
//
// Accessibility:
//   - Outer wrapper is a <section aria-labelledby>
//   - Toggle button is a real <button aria-expanded>
//   - Body is hidden via `hidden` (not just height:0) so collapsed
//     children are not focusable / read by AT.

import { type ReactNode, useEffect, useId, useState } from 'react';
import { cn } from '../../lib/cn';

export interface SidebarSectionProps {
  /** Visible section label. Used to derive the localStorage key. */
  title: string;
  /** Right-aligned slot in the header (e.g. an IconButton). */
  actions?: ReactNode;
  /** When true (default), header click toggles collapse. */
  collapsible?: boolean;
  /** Initial collapsed state. Defaults to false (open). */
  defaultCollapsed?: boolean;
  /** Optional explicit localStorage key. Defaults to `sidebar-section:${title}`. */
  storageKey?: string;
  /** Section body. */
  children?: ReactNode;
  /** Extra classes for the outer wrapper. */
  className?: string;
  /** Test id (defaults to "sidebar-section"). */
  'data-testid'?: string;
}

function readStoredCollapsed(
  storageKey: string,
  fallback: boolean,
): boolean {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw === null) return fallback;
    return raw === 'true';
  } catch {
    return fallback;
  }
}

export function SidebarSection({
  title,
  actions,
  collapsible = true,
  defaultCollapsed = false,
  storageKey,
  children,
  className,
  'data-testid': testId = 'sidebar-section',
}: SidebarSectionProps) {
  const reactId = useId();
  const labelId = `${reactId}-label`;
  const bodyId = `${reactId}-body`;
  const effectiveKey = storageKey ?? `sidebar-section:${title}`;

  const [collapsed, setCollapsed] = useState<boolean>(() =>
    collapsible ? readStoredCollapsed(effectiveKey, defaultCollapsed) : false,
  );

  useEffect(() => {
    if (!collapsible) return;
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(effectiveKey, String(collapsed));
    } catch {
      // Storage may be disabled — non-fatal.
    }
  }, [collapsed, collapsible, effectiveKey]);

  const expanded = !collapsed;
  const toggle = () => {
    if (collapsible) setCollapsed((v) => !v);
  };

  return (
    <section
      aria-labelledby={labelId}
      data-testid={testId}
      data-collapsed={collapsed ? 'true' : 'false'}
      className={cn('flex flex-col', className)}
    >
      <div className="flex items-center justify-between gap-1 py-2 pr-1">
        <button
          type="button"
          id={labelId}
          aria-expanded={collapsible ? expanded : undefined}
          aria-controls={bodyId}
          onClick={toggle}
          disabled={!collapsible}
          className={cn(
            'flex items-center gap-1.5 min-w-0 flex-1',
            'text-[11px] font-bold uppercase tracking-[0.5px]',
            'text-neutral select-none text-left',
            collapsible && 'cursor-pointer hover:text-text-primary',
            !collapsible && 'cursor-default',
            'bg-transparent border-0 p-0 m-0',
          )}
        >
          {collapsible && (
            <span
              aria-hidden="true"
              className={cn(
                'inline-block text-[10px] leading-none transition-transform duration-150',
                expanded ? 'rotate-90' : 'rotate-0',
              )}
            >
              {'▸'}
            </span>
          )}
          <span className="truncate">{title}</span>
        </button>
        {actions && (
          <div className="flex items-center gap-1 shrink-0">{actions}</div>
        )}
      </div>
      <div
        id={bodyId}
        hidden={!expanded}
        className={cn('flex flex-col gap-0.5', expanded && 'pb-1')}
      >
        {children}
      </div>
    </section>
  );
}

export default SidebarSection;
