// MeetingToolbar — the Teams-style meeting bar: a status cluster on the left,
// then labelled icon buttons (Chat, People 15, Raise, React, View, Notes,
// Rooms, Apps, More), the media group (Camera ▾, Mic ▾, Share) and Leave.
//
// The bar is DATA: each button is a `MeetingToolbarItem`, so a product shows
// the buttons it has wired and nothing else (a control that does nothing is
// a regression, not a placeholder). Items marked `priority: 'secondary'` fold
// into More when the bar is narrower than `compactBelow`, so nothing a caller
// wired becomes unreachable at small widths.
//
// An item with a `popover` (React → the reaction picker) opens an anchored
// panel instead of firing `onClick` (2.463.0). The panel is portalled, so the
// bar's overflow never clips it; Escape, an outside click or `close()` shut it
// and focus returns to the button. Such an item never folds into More, which
// is a plain menu and has nowhere to put the panel.
//
// Below `phoneBelow` (default 820px, 2.472.0) the bar switches to a phone
// layout: icon-only buttons (the label stays the accessible name), every item
// folds into More except popover items (More cannot host a panel), media
// stays as plain toggles unless marked `secondary`, and the split chevrons'
// menus (device lists, Leave options) move into More.
//
// It follows the page theme (surface tokens), like the reference: a light bar
// above the stage, not the always-dark call chrome of MediaControlsBar.
//
// Compact by default (2.480.0): small icon buttons the size of the call dock's
// media toggles (32px, 18px icons), the label is the accessible name and a
// hover/focus `Tooltip`, counts and unread numbers are inline badges beside the
// icon, and the active pane keeps its underline. `labels="visible"` restores
// the earlier 56px buttons with the label under the icon.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Badge } from '../shared/Badge';
import { DropdownMenu, type DropdownMenuItem, type DropdownMenuSection } from '../shared/DropdownMenu';
import { InlinePopover, type InlinePopoverPlacement } from '../shared/InlinePopover';
import { useRovingToolbar } from '../shared/RovingToolbar';
import { T } from '../shared/Text';
import { Tooltip } from '../shared/Tooltip';
import { ChevronIcon } from '../ui/Icons';
import { MoreHorizontalIcon, PhoneOffIcon } from './MediaIcons';

export interface MeetingToolbarItem {
  /** Stable id; the button's testid is `meeting-toolbar-<id>`. */
  id: string;
  /** The accessible name and the hover tooltip (text under the icon with `labels="visible"`). */
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  /** The pane this button opens is open (underlined, `aria-expanded`). */
  active?: boolean;
  /** A toggle that is on (hand raised): filled, `aria-pressed`. */
  pressed?: boolean;
  /** A number on the icon — the People count, your place in the hand queue. An inline badge by default; plain text with `labels="visible"`. */
  count?: number;
  /** An unread/attention badge on the icon — new chat messages. */
  badge?: number;
  disabled?: boolean;
  /** Why it is disabled; becomes the tooltip. */
  disabledReason?: string;
  /** `off` (camera/mic off) dims nothing but marks state for tests; `danger` reds the button. */
  tone?: 'default' | 'off' | 'danger';
  /** A split chevron with this menu (Camera ▾ devices). */
  menu?: DropdownMenuSection[];
  /** Accessible name of the chevron. Default `"<label> options"`. */
  menuLabel?: string;
  /** `secondary` folds into More when the bar is compact. Default `primary`. */
  priority?: 'primary' | 'secondary';
  /** Tooltip; defaults to the label. */
  title?: string;
  /**
   * An anchored panel this button opens, e.g. the reaction picker:
   * `popover: (close) => <ReactionPicker onReact={(e) => { send(e); close(); }} />`.
   * The button toggles it (`aria-haspopup="dialog"`, `aria-expanded`) and
   * `onClick` is not called. Since 2.463.0.
   */
  popover?: (close: () => void) => ReactNode;
  /** Accessible name of the panel. Default the label. */
  popoverLabel?: string;
  /** Default `bottom-start`; `bottom-end` for a button near the bar's right edge. */
  popoverPlacement?: InlinePopoverPlacement;
}

export interface MeetingToolbarProps {
  /** The status cluster: recording, elapsed time, meeting options. */
  start?: ReactNode;
  /** The meeting buttons, left to right. */
  items: MeetingToolbarItem[];
  /** Camera, Mic, Share — set apart by a divider. */
  media?: MeetingToolbarItem[];
  /** Extra More-menu sections (Settings, Record, Captions…). More appears when this or folded items exist. */
  moreSections?: DropdownMenuSection[];
  /**
   * Leave the call. Omit it when the bar sits above a call dock that already
   * has Leave (one Leave per screen): no Leave button, no divider before it,
   * and `leaveMenu` is ignored. Optional since 2.478.0.
   */
  onLeave?: () => void;
  /** Default "Leave". */
  leaveLabel?: string;
  /** A split chevron on Leave — e.g. "End meeting for everyone". */
  leaveMenu?: DropdownMenuSection[];
  /** Width (px) below which secondary items fold into More. Default 960. */
  compactBelow?: number;
  /** Force compact (tests, a known-narrow host); otherwise measured. */
  compact?: boolean;
  /** Width (px) below which the phone layout applies (phones and tablets in portrait). Default 820. Since 2.472.0. */
  phoneBelow?: number;
  /** Force the phone layout (tests, a known phone host); otherwise measured. */
  phone?: boolean;
  /**
   * `tooltip` (default since 2.480.0): small icon-only buttons, the label shown
   * as a tooltip on hover or focus and kept as the accessible name. `visible`:
   * the earlier 56px buttons with the label under the icon.
   */
  labels?: 'tooltip' | 'visible';
  className?: string;
  'data-testid'?: string;
}

/** The button look shared by plain buttons, split halves and the More trigger (no size). */
const MEETING_TOOLBAR_BUTTON_BASE =
  'relative inline-flex flex-col items-center justify-center rounded-md ' +
  'text-text-secondary transition-colors duration-100 hover:bg-surface-hover hover:text-text-primary ' +
  'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary cursor-pointer ' +
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent';

/** The labelled (`labels="visible"`) button: 56px, label under the icon. */
export const MEETING_TOOLBAR_BUTTON = `${MEETING_TOOLBAR_BUTTON_BASE} h-14 min-w-14 gap-0.5 px-2`;

/** The default compact button: 32px square like the call dock's media toggles, 18px icons. Since 2.480.0. */
const MEETING_TOOLBAR_BUTTON_COMPACT = `${MEETING_TOOLBAR_BUTTON_BASE} h-8 min-w-8 px-1.5 [&_svg]:size-[18px]`;

/** Phone: icon-only, but a 40px touch target. */
const MEETING_TOOLBAR_BUTTON_PHONE = `${MEETING_TOOLBAR_BUTTON_BASE} h-10 min-w-10 px-1.5 [&_svg]:size-5`;

type ButtonLook = 'labelled' | 'compact' | 'phone';

const LOOK_CLASS: Record<ButtonLook, string> = {
  labelled: MEETING_TOOLBAR_BUTTON,
  compact: MEETING_TOOLBAR_BUTTON_COMPACT,
  phone: MEETING_TOOLBAR_BUTTON_PHONE,
};

function ToolbarButton({ item, look = 'compact' }: { item: MeetingToolbarItem; look?: ButtonLook }) {
  const iconOnly = look !== 'labelled';
  const tip = item.disabled && item.disabledReason ? item.disabledReason : item.title ?? item.label;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const hasPanel = !!item.popover;
  const open = hasPanel && panelOpen && !item.disabled;
  const active = hasPanel ? open || !!item.active : item.active;
  const button = (
    <button
      data-ui-part=""
      ref={buttonRef}
      type="button"
      onClick={hasPanel ? () => setPanelOpen((v) => !v) : item.onClick}
      disabled={item.disabled}
      // Icon-only buttons get a Tooltip instead; a disabled button fires no
      // pointer events for it, so its reason stays the native title.
      title={!iconOnly || item.disabled ? tip : undefined}
      aria-label={item.count !== undefined ? `${item.label}, ${item.count}` : item.label}
      aria-pressed={item.pressed === undefined ? undefined : item.pressed}
      aria-haspopup={hasPanel ? 'dialog' : undefined}
      aria-expanded={hasPanel ? open : item.active === undefined ? undefined : item.active}
      data-testid={`meeting-toolbar-${item.id}`}
      data-active={active ? 'true' : undefined}
      data-pressed={item.pressed ? 'true' : undefined}
      data-tone={item.tone ?? 'default'}
      className={cn(
        LOOK_CLASS[look],
        // primary-fg is the readable ink of the brand: brand fills (teal) are ~3.7:1 as text.
        active && 'text-primary-fg hover:text-primary-fg',
        item.pressed && 'bg-primary-bg text-primary-fg hover:bg-primary-bg hover:text-primary-fg',
        item.tone === 'danger' && 'text-danger hover:bg-danger-bg hover:text-danger',
        item.menu && look !== 'phone' && 'rounded-r-none pr-1',
        item.menu && look === 'compact' && 'pr-0.5',
      )}
    >
      <span className="relative inline-flex items-center gap-1.5">
        {item.icon}
        {item.count !== undefined && (iconOnly ? (
          <Badge
            variant="count"
            color="muted"
            value={item.count}
            aria-label={String(item.count)}
            className="shrink-0"
            data-testid={`meeting-toolbar-${item.id}-count`}
          />
        ) : (
          <T size="sm" weight="semibold" tone="inherit" tabular data-testid={`meeting-toolbar-${item.id}-count`}>
            {item.count}
          </T>
        ))}
        {!!item.badge && (
          <Badge
            variant="count"
            color="danger"
            value={item.badge}
            className="shrink-0"
            data-testid={`meeting-toolbar-${item.id}-badge`}
          />
        )}
      </span>
      {!iconOnly && <T size="xs" tone="inherit" className="leading-tight whitespace-nowrap">{item.label}</T>}
      {active && (
        <span aria-hidden className={cn('absolute bottom-0 h-0.5 rounded-full bg-primary', iconOnly ? 'inset-x-1.5' : 'inset-x-2')} data-testid={`meeting-toolbar-${item.id}-active`} />
      )}
    </button>
  );
  // Icon-only: the label (or the item's title) is a hover/focus tooltip.
  const shown = iconOnly && !item.disabled
    ? <Tooltip content={tip} placement="bottom" data-testid={`meeting-toolbar-${item.id}-tooltip`}>{button}</Tooltip>
    : button;
  if (hasPanel) {
    const close = () => setPanelOpen(false);
    return (
      <>
        {shown}
        <InlinePopover
          trigger={buttonRef}
          open={open}
          onClose={close}
          placement={item.popoverPlacement ?? 'bottom-start'}
          aria-label={item.popoverLabel ?? item.label}
          kind="meeting-toolbar-popover"
          data-testid={`meeting-toolbar-${item.id}-popover`}
        >
          {open && item.popover!(close)}
        </InlinePopover>
      </>
    );
  }
  if (!item.menu || look === 'phone') return shown;
  return (
    <span className="inline-flex items-stretch" data-testid={`meeting-toolbar-${item.id}-split`}>
      {shown}
      <DropdownMenu
        trigger={<ChevronIcon size={look === 'compact' ? 12 : 14} />}
        triggerLabel={item.menuLabel ?? `${item.label} options`}
        triggerVariant="link"
        triggerClassName={cn('rounded-l-none rounded-r-md px-0 text-text-secondary hover:bg-surface-hover', look === 'compact' ? 'h-8 w-4' : 'h-14 w-5')}
        triggerTestId={`meeting-toolbar-${item.id}-menu`}
        disabled={item.disabled}
        align="end"
        sections={item.menu}
      />
    </span>
  );
}

function asMenuItem(item: MeetingToolbarItem): DropdownMenuItem {
  return {
    label: item.count !== undefined ? `${item.label} (${item.count})` : item.label,
    icon: item.icon,
    onSelect: item.onClick,
    active: item.active,
    checked: item.pressed,
    disabled: item.disabled,
    disabledReason: item.disabledReason,
    'data-testid': `meeting-toolbar-more-${item.id}`,
  };
}

/** The bar's measured width; Infinity until measured (or without ResizeObserver). */
function useWidth(ref: React.RefObject<HTMLElement | null>, skip: boolean): number {
  const [width, setWidth] = useState(Infinity);
  useEffect(() => {
    if (skip) return undefined;
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    // Zero means not laid out (hidden, or jsdom): treat as unmeasured, not as a phone.
    const measure = () => { const w = el.getBoundingClientRect().width; setWidth(w > 0 ? w : Infinity); };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, skip]);
  return width;
}

function Divider({ compact }: { compact: boolean }) {
  return <span aria-hidden className={cn('w-px shrink-0 bg-border', compact ? 'mx-0.5 h-5' : 'mx-1 h-8')} />;
}

export function MeetingToolbar({
  start,
  items,
  media = [],
  moreSections = [],
  onLeave,
  leaveLabel = 'Leave',
  leaveMenu,
  compactBelow = 960,
  compact,
  phoneBelow = 820,
  phone: forcedPhone,
  labels = 'tooltip',
  className,
  'data-testid': testId = 'meeting-toolbar',
}: MeetingToolbarProps) {
  // WAI-ARIA toolbar (2.458.2): the bar is ONE tab stop and the arrow keys,
  // Home and End move within it, skipping disabled buttons and open menus.
  const roving = useRovingToolbar();
  const width = useWidth(roving.ref, compact !== undefined && forcedPhone !== undefined);
  const phone = forcedPhone ?? width < phoneBelow;
  const narrow = phone || (compact ?? width < compactBelow);
  // Popover items never fold: More is a plain menu with nowhere to put a panel.
  const folds = (i: MeetingToolbarItem) => !i.popover && (phone || i.priority === 'secondary');
  const shown = narrow ? items.filter((i) => !folds(i)) : items;
  const folded = narrow ? items.filter(folds) : [];
  // Secondary media (Share) folds whenever the bar is compact, not only on a phone.
  const mediaShown = narrow ? media.filter((m) => m.priority !== 'secondary') : media;
  const mediaFolded = narrow ? media.filter((m) => m.priority === 'secondary') : [];
  // On a phone the split chevrons go; their menus (device lists, Leave options) move into More.
  const movedMenus: DropdownMenuSection[] = phone
    ? [...mediaShown.flatMap((m) => m.menu ?? []), ...(onLeave ? leaveMenu ?? [] : [])]
    : [];
  const allFolded = [...folded, ...mediaFolded];
  const look: ButtonLook = phone ? 'phone' : labels === 'visible' ? 'labelled' : 'compact';
  const small = look !== 'labelled';
  const more: DropdownMenuSection[] = [
    ...(allFolded.length ? [{ items: allFolded.map(asMenuItem), 'data-testid': 'meeting-toolbar-more-folded' }] : []),
    ...movedMenus,
    ...moreSections,
  ];

  return (
    <div
      {...roving}
      role="toolbar"
      aria-label="Meeting controls"
      data-ui-meeting-toolbar
      data-testid={testId}
      data-compact={narrow ? 'true' : undefined}
      data-layout={phone ? 'phone' : undefined}
      data-labels={labels}
      className={cn(
        'flex items-center border-b border-border bg-surface',
        phone ? 'flex-wrap gap-0.5 px-2 pt-1' : look === 'compact' ? 'min-h-10 gap-0.5 px-2 py-1' : 'min-h-16 gap-1 px-3',
        className,
      )}
    >
      {/* On a phone the status cluster gets its own row above the buttons, as Teams mobile shows the time. */}
      {/* overflow-hidden: a cramped bar clips the cluster rather than drawing buttons over it. */}
      <div className={cn('flex min-w-0 items-center overflow-hidden', small ? 'gap-2' : 'gap-3', phone ? 'basis-full' : 'flex-1')}>{start}</div>
      {phone && <span aria-hidden className="flex-1" />}
      <div className="flex shrink-0 items-center gap-0.5" data-testid={`${testId}-items`}>
        {shown.map((item) => <ToolbarButton key={item.id} item={item} look={look} />)}
        {more.length > 0 && (
          <DropdownMenu
            trigger={(
              <>
                <MoreHorizontalIcon size={20} />
                {!small && <T size="xs" tone="inherit" className="leading-tight">More</T>}
              </>
            )}
            triggerLabel="More"
            triggerVariant="link"
            // font-normal undoes DropdownMenu's link-trigger weight so More matches its siblings. ratchet-ok
            triggerClassName={cn(LOOK_CLASS[look], 'gap-0.5 font-normal')} // ratchet-ok: overrides a shared trigger's default weight
            triggerTestId="meeting-toolbar-more"
            align="end"
            sections={more}
          />
        )}
      </div>
      {mediaShown.length > 0 && <Divider compact={small} />}
      {mediaShown.length > 0 && (
        <div className="flex shrink-0 items-center gap-0.5" data-testid={`${testId}-media`}>
          {mediaShown.map((item) => <ToolbarButton key={item.id} item={item} look={look} />)}
        </div>
      )}
      {onLeave && <Divider compact={small} />}
      {onLeave && (
        <ToolbarButton
          item={{
            id: 'leave',
            label: leaveLabel,
            icon: <PhoneOffIcon size={20} />,
            onClick: onLeave,
            tone: 'danger',
            menu: leaveMenu,
            menuLabel: 'Leave options',
          }}
          look={look}
        />
      )}
    </div>
  );
}

/** Device choices for a Camera/Mic split chevron. */
export function deviceMenuSections(
  heading: string,
  devices: ReadonlyArray<{ deviceId: string; label: string }>,
  selectedDeviceId: string | undefined,
  onSelect: (deviceId: string) => void,
  extra: DropdownMenuItem[] = [],
): DropdownMenuSection[] {
  const list: DropdownMenuSection = {
    label: heading,
    items: devices.length
      ? devices.map((d, i) => ({
          label: d.label || `${heading} ${i + 1}`,
          checked: d.deviceId === selectedDeviceId,
          onSelect: () => onSelect(d.deviceId),
          'data-testid': `device-${d.deviceId}`,
        }))
      : [{ label: `No ${heading.toLowerCase()} found`, disabled: true }],
  };
  return extra.length ? [list, { items: extra }] : [list];
}
