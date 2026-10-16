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

import { useCallback, useRef, useState, type KeyboardEvent, type ReactNode, useEffect, useId } from 'react';
import { BUTTON_WEIGHT } from '../ui/Button';
import { InlinePopover } from './InlinePopover';
import { ChevronIcon } from '../ui/Icons';
import { useDensity } from './Density';
import { CONTROL_HEIGHT } from './controlMetrics';
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
  /**
   * Shown but not actionable: muted, `aria-disabled="true"` yet still
   * focusable (WAI-ARIA menu practice, so a screen reader can reach it and
   * hear why), and click / Enter / Space never run `onSelect` — the menu
   * stays open. A disabled row with a `submenu` does not open it. Since 2.390.3.
   */
  disabled?: boolean;
  /**
   * Why it is disabled — shown as the row's secondary line (in place of
   * `description`), its hover tooltip, and its `aria-describedby`.
   * Since 2.390.3; the visible line since 2.390.4.
   */
  disabledReason?: string;
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
  /**
   * A quiet line under the group's rows — what the group does as a whole
   * ("Creates a new document."). Since 2.390.3.
   */
  caption?: string;
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
   * The trigger's look. `default` is the small bordered menu button;
   * `primary` is a 36px brand button ("New ▾"), `secondary` a 36px bordered
   * one, `link` bare secondary text ("Relevance ▾"). Since 2.389.6.
   */
  triggerVariant?: 'default' | 'primary' | 'secondary' | 'link';
  /**
   * Tab order of the trigger. Default undefined (a normal tab stop).
   *
   * `-1` is for a menu that lives inside a ROVING-FOCUS list — one trigger per
   * row, forty rows: leaving them all tabbable puts forty stops back in front
   * of everything after the list, which is the cost the roving cursor exists
   * to avoid. The host makes only the cursor row's trigger tabbable.
   */
  triggerTabIndex?: number;
  /**
   * The trigger is off: a real `disabled` button in muted ink that never
   * opens the panel (a read-only composer's Workflow ⌄). Since 2.450.0.
   */
  disabled?: boolean;
  /** Test hook for the trigger itself; `data-testid` addresses the panel. */
  triggerTestId?: string;
  /**
   * `data-*` attributes for the trigger itself (since 2.479.0), e.g. a
   * read-only composer's mode menu declaring `data-composer-readonly-allow`
   * as the way out. Only data attributes: everything else has a prop.
   */
  triggerAttributes?: Readonly<Record<`data-${string}`, string>>;
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

const TRIGGER_VARIANT: Record<NonNullable<DropdownMenuProps['triggerVariant']>, string> = {
  // `h-6.5`: the default trigger is the box of a `Button size="sm"` (26px),
  // so a menu in a toolbar row is as tall as the buttons beside it. It grew
  // from padding + content until 2.407.18 (22px with a 14px label, 26px
  // with an 18px glyph).
  default: ' rounded-md border border-[var(--color-border)] px-2 text-xs leading-none text-[var(--color-text-secondary)] bg-transparent hover:bg-[var(--color-surface-hover)]',
  primary: ' rounded-lg border-none px-3.5 text-sm leading-none bg-primary text-on-primary hover:bg-primary-hover',
  secondary: ' rounded-lg border border-border px-3.5 text-sm leading-none bg-surface text-text-primary hover:bg-surface-hover',
  link: 'rounded px-1 py-0.5 border-none text-sm leading-none bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover',
};

const TRIGGER_OPEN: Record<NonNullable<DropdownMenuProps['triggerVariant']>, string> = {
  default: 'bg-[var(--color-surface-hover)]',
  primary: 'bg-primary-hover',
  secondary: 'bg-surface-hover',
  link: 'text-text-primary',
};

export function DropdownMenu({
  trigger,
  triggerLabel = 'Open menu',
  triggerTitle,
  triggerClassName,
  triggerVariant = 'default',
  triggerTabIndex,
  disabled = false,
  triggerTestId,
  triggerAttributes,
  align = 'start',
  sections,
  className,
  'data-testid': testId = 'dropdown-menu',
}: DropdownMenuProps) {
  const controlSize = useDensity() === 'compact' ? 'sm' : 'md';
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
    // Disabled rows stay in the cycle (aria-disabled, not skipped), and so
    // do checkbox rows — the old role="menuitem"-only query stepped over them.
    const items = Array.from(
      menu.querySelectorAll<HTMLElement>('[role="menuitem"],[role="menuitemcheckbox"]'),
    ).filter((el) => el.closest('[role="menu"]') === menu);
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
        tabIndex={triggerTabIndex}
        {...triggerAttributes}
        data-testid={triggerTestId}
        disabled={disabled || undefined}
        aria-disabled={disabled ? 'true' : undefined}
        onClick={() => { if (!disabled) setOpen((v) => !v); }}
        data-variant={triggerVariant}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors duration-100',
          'disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[var(--color-text-disabled)] disabled:opacity-70',
          BUTTON_WEIGHT,
          TRIGGER_VARIANT[triggerVariant],
          triggerVariant !== 'link' && CONTROL_HEIGHT[controlSize],
          open && TRIGGER_OPEN[triggerVariant],
          triggerClassName,
        )}
      >
        {trigger}
      </button>
      <InlinePopover
        trigger={triggerRef}
        open={open && !disabled}
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
                <div className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                  {section.label}
                </div>
              )}
              {section.items.map((item, iIdx) => (
                <MenuRow key={iIdx} item={item} close={close} testId={testId} />
              ))}
              {section.caption && <SectionCaption text={section.caption} />}
            </div>
          ))}
        </div>
      </InlinePopover>
    </>
  );
}


const ROW_CLASS = 'flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-sm border-none cursor-pointer font-[inherit] transition-colors duration-100';

function SectionCaption({ text }: { text: string }) {
  return (
    <div className="mt-1 border-t border-[var(--color-border)] px-3.5 pb-1 pt-2 text-xs text-[var(--color-text-tertiary)]" data-menu-caption="">
      {text}
    </div>
  );
}

function rowTone(item: DropdownMenuItem, open = false): string {
  if (item.disabled) return 'cursor-not-allowed text-[var(--color-text-tertiary)] bg-transparent';
  if (item.danger) return 'text-danger-fg bg-transparent hover:bg-danger-bg';
  // The row whose flyout is open wears the accent, so the eye can follow it
  // across into the flyout.
  if (open) return 'font-normal text-primary-fg bg-primary-bg';
  if (item.active) return 'font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface-hover)]';
  return 'font-normal text-[var(--color-text-primary)] bg-transparent hover:bg-[var(--color-surface-hover)]';
}

function RowBody({ item, open = false, labelId, reasonId }: { item: DropdownMenuItem; open?: boolean; labelId?: string; reasonId?: string }) {
  const reason = item.disabled && item.disabledReason ? item.disabledReason : undefined;
  const secondary = reason ?? item.description;
  return (
    <>
      {item.checked !== undefined ? (
        <span className={cn('flex w-4 shrink-0 items-center justify-center text-[var(--color-text-secondary)]', item.disabled && 'opacity-60')} aria-hidden="true">
          {item.checked ? '✓' : ''}
        </span>
      ) : item.icon ? (
        <span className={cn('flex w-4 shrink-0 items-center justify-center text-base leading-none', item.danger || open ? 'text-current' : 'text-[var(--color-text-secondary)]', item.disabled && 'opacity-60')} aria-hidden="true">
          {item.icon}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col">
        <span id={labelId} className="truncate">{item.label}</span>
        {secondary && (
          <span id={reason ? reasonId : undefined} data-menu-disabled-reason={reason ? '' : undefined} className="truncate text-xs font-normal text-[var(--color-text-tertiary)]">{secondary}</span>
        )}
      </span>
      {item.trailing !== undefined && (
        <span className="shrink-0 text-xs text-[var(--color-text-tertiary)]" aria-hidden="true">{item.trailing}</span>
      )}
      {item.submenu && <ChevronIcon dir="right" size={14} className={cn('shrink-0', open ? 'text-current' : 'text-[var(--color-text-tertiary)]')} />}
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
  const baseId = useId();
  const reasonShown = !!(item.disabled && item.disabledReason);

  if (!item.submenu || item.disabled) {
    return (
      <button
        type="button"
        role={item.checked !== undefined ? 'menuitemcheckbox' : 'menuitem'}
        aria-checked={item.checked !== undefined ? item.checked : undefined}
        aria-current={item.active || undefined}
        aria-disabled={item.disabled ? 'true' : undefined}
        // The reason is visible text inside the row; keep it out of the
        // accessible name (the label) and hand it over as the description.
        aria-labelledby={reasonShown ? `${baseId}-label` : undefined}
        aria-describedby={reasonShown ? `${baseId}-reason` : undefined}
        title={item.disabled ? item.disabledReason : undefined}
        onClick={() => { if (item.disabled) return; item.onSelect?.(); close(); }}
        data-testid={item['data-testid']}
        data-disabled={item.disabled ? '' : undefined}
        className={cn(ROW_CLASS, rowTone(item))}
      >
        <RowBody item={item} labelId={reasonShown ? `${baseId}-label` : undefined} reasonId={reasonShown ? `${baseId}-reason` : undefined} />
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
        // Open, never toggle: a pointer click arrives after the hover that
        // already opened the flyout, and a toggle shut it again on the click.
        onClick={() => setOpen(true)}
        onKeyDown={onKeyDown}
        data-testid={item['data-testid']}
        className={cn(ROW_CLASS, rowTone(item, open))}
      >
        <RowBody item={item} open={open} />
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
                <div className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">{section.label}</div>
              )}
              {section.items.map((sub, i) => (
                <MenuRow key={i} item={sub} close={close} testId={testId} />
              ))}
              {section.caption && <SectionCaption text={section.caption} />}
            </div>
          ))}
        </div>
      </InlinePopover>
    </>
  );
}

export default DropdownMenu;
