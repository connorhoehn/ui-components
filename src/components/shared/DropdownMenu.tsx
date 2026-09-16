// DropdownMenu — generic trigger + dropdown menu composite.
//
// UserMenu's dropdown surface minus the identity coupling: any trigger
// content, sectioned items with optional uppercase headings, active-item
// highlighting, and start/end alignment. `align="end"` anchors the panel's
// top-right corner to the trigger's bottom-right, so menus whose trigger
// sits at the viewport's right edge (app-level hamburger menus) don't
// overflow the viewport.
//
// Built on InlinePopover (portal positioning, outside-click + Escape
// dismiss, focus capture/restore, Tab cycling); adds menu semantics
// (role="menu"/"menuitem") and ArrowUp/ArrowDown/Home/End focus movement.

import { useCallback, useRef, useState, type KeyboardEvent, type ReactNode, useEffect } from 'react';
import { InlinePopover } from './InlinePopover';
import { ChevronIcon } from '../ui/Icons';
import { cn } from '../../lib/cn';

export interface DropdownMenuItem {
  /** Visible item label. */
  label: string;
  /** Optional leading icon / glyph. */
  icon?: ReactNode;
  /** Highlight this item as the currently-active selection. */
  active?: boolean;
  /** Style this item as destructive. */
  danger?: boolean;
  /** Fires on click / Enter; the menu closes afterwards. Not needed on a row with a `submenu`. */
  onSelect?: () => void;
  /** Right-aligned hint after the label — a shortcut (`⌘P`), a count. */
  trailing?: ReactNode;
  /** A second, quieter line under the label. */
  description?: string;
  /** A setting that is on: a check leads the row (menuitemcheckbox). */
  checked?: boolean;
  /**
   * A flyout of further choices, opened from this row — "Share to ›",
   * "Download as ›". Opens on hover, click or ArrowRight; the row itself
   * runs no `onSelect`.
   */
  submenu?: DropdownMenuSection[];
  /** A hook for the spec that addresses this row. Without one the row is reachable by its label. */
  'data-testid'?: string;
}

export interface DropdownMenuSection {
  /** Optional uppercase section heading. */
  label?: string;
  items: DropdownMenuItem[];
  /**
   * The group scrolls in place (`uic-menu-group-scroll`) so the sections
   * after it stay put. For a generated list — one row per room — that would
   * otherwise push the fixed actions below the fold.
   */
  scroll?: boolean;
  'data-testid'?: string;
}

export interface DropdownMenuProps {
  /** Content of the built-in trigger button (icon, glyph, text…). */
  trigger: ReactNode;
  /** Accessible label for the trigger button. Default 'Open menu'. */
  triggerLabel?: string;
  /** Optional title attribute (hover tooltip) for the trigger button. */
  triggerTitle?: string;
  /** Optional className for the trigger button. */
  triggerClassName?: string;
  /**
   * Panel alignment relative to the trigger. 'start' (default) anchors the
   * panel's left edge to the trigger's left edge; 'end' anchors the panel's
   * RIGHT edge to the trigger's right edge.
   */
  align?: 'start' | 'end';
  sections: DropdownMenuSection[];
  /** Optional className for the dropdown panel. */
  className?: string;
  /** Optional testid for the panel. Default 'dropdown-menu'. */
  'data-testid'?: string;
}

export function DropdownMenu({
  trigger,
  triggerLabel = 'Open menu',
  triggerTitle,
  triggerClassName,
  align = 'start',
  sections,
  className,
  'data-testid': testId = 'dropdown-menu',
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  // ArrowUp/ArrowDown/Home/End move focus across menu items.
  // (Escape, Tab cycling, and outside-click come from InlinePopover.)
  const onMenuKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const menu = menuRef.current;
    if (!menu) return;
    const items = Array.from(
      menu.querySelectorAll<HTMLElement>('[role="menuitem"]'),
    );
    if (items.length === 0) return;
    e.preventDefault();
    const current = items.indexOf(document.activeElement as HTMLElement);
    let next: number;
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else if (e.key === 'ArrowDown') next = current < 0 ? 0 : (current + 1) % items.length;
    else next = current <= 0 ? items.length - 1 : current - 1;
    items[next].focus();
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={triggerLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        title={triggerTitle}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 cursor-pointer',
          'rounded-md border border-[var(--color-border)] px-2 py-1',
          'text-base leading-none text-[var(--color-text-secondary)]',
          'bg-transparent hover:bg-[var(--color-surface-hover)] transition-colors duration-100',
          open && 'bg-[var(--color-surface-hover)]',
          triggerClassName,
        )}
      >
        {trigger}
      </button>
      <InlinePopover
        trigger={triggerRef}
        open={open}
        onClose={close}
        placement={align === 'end' ? 'bottom-end' : 'bottom-start'}
        className={cn('min-w-[180px] p-0 overflow-hidden rounded-lg', className)}
        data-testid={testId}
      >
        <div
          ref={menuRef}
          role="menu"
          aria-label={triggerLabel}
          onKeyDown={onMenuKeyDown}
          // Bounded by the viewport and scrolling, never clipped: a menu taller
          // than the window used to lose everything past the fold with no
          // scrollbar to say it existed.
          className="py-1 uic-menu-scroll"
        >
          {sections.map((section, sIdx) => (
            <div
              key={sIdx}
              role="group"
              aria-label={section.label}
              className={section.scroll ? 'uic-menu-group-scroll' : undefined}
              data-testid={section['data-testid']}
            >
              {sIdx > 0 && (
                <div role="separator" className="my-1 border-t border-[var(--color-border)]" />
              )}
              {section.label && (
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                  {section.label}
                </div>
              )}
              {section.items.map((item, iIdx) => (
                <MenuRow key={iIdx} item={item} close={close} testId={testId} />
              ))}
            </div>
          ))}
        </div>
      </InlinePopover>
    </>
  );
}


const ROW_CLASS = 'flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100';

function rowTone(item: DropdownMenuItem, open = false): string {
  if (item.danger) return 'text-danger-fg bg-transparent hover:bg-danger-bg';
  if (item.active || open) return 'font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]';
  return 'font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]';
}

function RowBody({ item }: { item: DropdownMenuItem }) {
  return (
    <>
      {item.checked !== undefined ? (
        <span className="flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]" aria-hidden="true">
          {item.checked ? '✓' : ''}
        </span>
      ) : item.icon ? (
        <span className="flex w-4 shrink-0 items-center justify-center text-base leading-none text-[var(--color-text-secondary)]" aria-hidden="true">
          {item.icon}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate">{item.label}</span>
        {item.description && (
          <span className="truncate text-xs font-normal text-[var(--color-text-tertiary)]">{item.description}</span>
        )}
      </span>
      {item.trailing !== undefined && (
        <span className="shrink-0 text-xs text-[var(--color-text-tertiary)]" aria-hidden="true">{item.trailing}</span>
      )}
      {item.submenu && <ChevronIcon dir="right" size={14} className="shrink-0 text-[var(--color-text-tertiary)]" />}
    </>
  );
}

/** One row; a row with a `submenu` opens a flyout beside itself. */
function MenuRow({ item, close, testId }: { item: DropdownMenuItem; close: () => void; testId: string }) {
  const [open, setOpen] = useState(false);
  const rowRef = useRef<HTMLButtonElement | null>(null);
  const flyRef = useRef<HTMLDivElement | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hold = () => { if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; } };
  const leave = () => { hold(); leaveTimer.current = setTimeout(() => setOpen(false), 180); };
  useEffect(() => () => hold(), []);

  if (!item.submenu) {
    return (
      <button
        type="button"
        role={item.checked !== undefined ? 'menuitemcheckbox' : 'menuitem'}
        aria-checked={item.checked !== undefined ? item.checked : undefined}
        aria-current={item.active || undefined}
        onClick={() => { item.onSelect?.(); close(); }}
        data-testid={item['data-testid']}
        className={cn(ROW_CLASS, rowTone(item))}
      >
        <RowBody item={item} />
      </button>
    );
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
      setTimeout(() => flyRef.current?.querySelector<HTMLElement>('[role="menuitem"],[role="menuitemcheckbox"]')?.focus(), 0);
    }
  };
  return (
    <>
      <button
        ref={rowRef}
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
        onMouseEnter={() => { hold(); setOpen(true); }}
        onMouseLeave={leave}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        data-testid={item['data-testid']}
        className={cn(ROW_CLASS, rowTone(item, open))}
      >
        <RowBody item={item} />
      </button>
      <InlinePopover
        trigger={rowRef}
        open={open}
        onClose={() => setOpen(false)}
        placement="right"
        offset={2}
        className="min-w-[200px] p-0 overflow-hidden rounded-lg"
        data-testid={`${testId}-submenu`}
      >
        <div
          ref={flyRef}
          role="menu"
          aria-label={item.label}
          className="py-1 uic-menu-scroll"
          onMouseEnter={hold}
          onMouseLeave={leave}
          onKeyDown={(e) => { if (e.key === 'ArrowLeft') { e.preventDefault(); setOpen(false); rowRef.current?.focus(); } }}
        >
          {item.submenu.map((section, sIdx) => (
            <div key={sIdx} role="group" aria-label={section.label} className={section.scroll ? 'uic-menu-group-scroll' : undefined} data-testid={section['data-testid']}>
              {sIdx > 0 && <div role="separator" className="my-1 border-t border-[var(--color-border)]" />}
              {section.label && (
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">{section.label}</div>
              )}
              {section.items.map((sub, i) => (
                <MenuRow key={i} item={sub} close={close} testId={testId} />
              ))}
            </div>
          ))}
        </div>
      </InlinePopover>
    </>
  );
}

export default DropdownMenu;
