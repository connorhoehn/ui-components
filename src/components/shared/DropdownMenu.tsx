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

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { InlinePopover } from './InlinePopover';
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
  /** Fires on click / Enter; the menu closes afterwards. */
  onSelect: () => void;
}

export interface DropdownMenuSection {
  /** Optional uppercase section heading. */
  label?: string;
  items: DropdownMenuItem[];
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
          className="py-1"
        >
          {sections.map((section, sIdx) => (
            <div key={sIdx} role="group" aria-label={section.label}>
              {sIdx > 0 && (
                <div role="separator" className="my-1 border-t border-[var(--color-border)]" />
              )}
              {section.label && (
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                  {section.label}
                </div>
              )}
              {section.items.map((item, iIdx) => (
                <button
                  key={iIdx}
                  type="button"
                  role="menuitem"
                  aria-current={item.active || undefined}
                  onClick={() => {
                    item.onSelect();
                    close();
                  }}
                  className={cn(
                    'flex items-center gap-2.5 w-full text-left px-3.5 py-2',
                    'text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100',
                    item.danger
                      ? 'text-[#dc2626] bg-transparent hover:bg-[#fef2f2]'
                      : item.active
                        ? 'font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]'
                        : 'font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]',
                  )}
                >
                  {item.icon && (
                    <span className="shrink-0 text-base leading-none" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </InlinePopover>
    </>
  );
}

export default DropdownMenu;
