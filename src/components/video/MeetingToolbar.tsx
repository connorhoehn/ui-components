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
// It follows the page theme (surface tokens), like the reference: a light bar
// above the stage, not the always-dark call chrome of MediaControlsBar.

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Badge } from '../shared/Badge';
import { DropdownMenu, type DropdownMenuItem, type DropdownMenuSection } from '../shared/DropdownMenu';
import { useRovingToolbar } from '../shared/RovingToolbar';
import { T } from '../shared/Text';
import { ChevronIcon } from '../ui/Icons';
import { MoreHorizontalIcon, PhoneOffIcon } from './MediaIcons';

export interface MeetingToolbarItem {
  /** Stable id; the button's testid is `meeting-toolbar-<id>`. */
  id: string;
  /** Text under the icon, and the accessible name. */
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  /** The pane this button opens is open (underlined, `aria-expanded`). */
  active?: boolean;
  /** A toggle that is on (hand raised): filled, `aria-pressed`. */
  pressed?: boolean;
  /** A number shown beside the icon — the People count. */
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
  onLeave: () => void;
  /** Default "Leave". */
  leaveLabel?: string;
  /** A split chevron on Leave — e.g. "End meeting for everyone". */
  leaveMenu?: DropdownMenuSection[];
  /** Width (px) below which secondary items fold into More. Default 960. */
  compactBelow?: number;
  /** Force compact (tests, a known-narrow host); otherwise measured. */
  compact?: boolean;
  className?: string;
  'data-testid'?: string;
}

/** The button look, shared by plain buttons, split halves and the More trigger. */
export const MEETING_TOOLBAR_BUTTON =
  'relative inline-flex h-14 min-w-14 flex-col items-center justify-center gap-0.5 rounded-md px-2 ' +
  'text-text-secondary transition-colors duration-100 hover:bg-surface-hover hover:text-text-primary ' +
  'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent cursor-pointer ' +
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent';

function ToolbarButton({ item }: { item: MeetingToolbarItem }) {
  const tip = item.disabled && item.disabledReason ? item.disabledReason : item.title ?? item.label;
  const button = (
    <button
      type="button"
      onClick={item.onClick}
      disabled={item.disabled}
      title={tip}
      aria-label={item.count !== undefined ? `${item.label}, ${item.count}` : item.label}
      aria-pressed={item.pressed === undefined ? undefined : item.pressed}
      aria-expanded={item.active === undefined ? undefined : item.active}
      data-testid={`meeting-toolbar-${item.id}`}
      data-active={item.active ? 'true' : undefined}
      data-pressed={item.pressed ? 'true' : undefined}
      data-tone={item.tone ?? 'default'}
      className={cn(
        MEETING_TOOLBAR_BUTTON,
        item.active && 'text-accent hover:text-accent',
        item.pressed && 'bg-accent-bg text-accent hover:bg-accent-bg hover:text-accent',
        item.tone === 'danger' && 'text-danger hover:bg-danger-bg hover:text-danger',
        item.menu && 'rounded-r-none pr-1',
      )}
    >
      <span className="relative inline-flex items-center gap-1">
        {item.icon}
        {item.count !== undefined && (
          <T size="sm" weight="semibold" tone="inherit" tabular data-testid={`meeting-toolbar-${item.id}-count`}>
            {item.count}
          </T>
        )}
        {!!item.badge && (
          <Badge
            variant="count"
            color="danger"
            value={item.badge}
            className="absolute -right-2.5 -top-1.5"
            data-testid={`meeting-toolbar-${item.id}-badge`}
          />
        )}
      </span>
      <T size="xs" tone="inherit" className="leading-tight whitespace-nowrap">{item.label}</T>
      {item.active && (
        <span aria-hidden className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-accent" data-testid={`meeting-toolbar-${item.id}-active`} />
      )}
    </button>
  );
  if (!item.menu) return button;
  return (
    <span className="inline-flex items-stretch" data-testid={`meeting-toolbar-${item.id}-split`}>
      {button}
      <DropdownMenu
        trigger={<ChevronIcon size={14} />}
        triggerLabel={item.menuLabel ?? `${item.label} options`}
        triggerVariant="link"
        triggerClassName="h-14 w-5 rounded-l-none rounded-r-md px-0 text-text-secondary hover:bg-surface-hover"
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

function useNarrow(ref: React.RefObject<HTMLElement | null>, below: number, forced: boolean | undefined): boolean {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    if (forced !== undefined) return undefined;
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const measure = () => setNarrow(el.getBoundingClientRect().width < below);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, below, forced]);
  return forced ?? narrow;
}

function Divider() {
  return <span aria-hidden className="mx-1 h-8 w-px shrink-0 bg-border" />;
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
  className,
  'data-testid': testId = 'meeting-toolbar',
}: MeetingToolbarProps) {
  // WAI-ARIA toolbar (2.458.2): the bar is ONE tab stop and the arrow keys,
  // Home and End move within it, skipping disabled buttons and open menus.
  const roving = useRovingToolbar();
  const narrow = useNarrow(roving.ref, compactBelow, compact);
  const shown = narrow ? items.filter((i) => i.priority !== 'secondary') : items;
  const folded = narrow ? items.filter((i) => i.priority === 'secondary') : [];
  const more: DropdownMenuSection[] = [
    ...(folded.length ? [{ items: folded.map(asMenuItem), 'data-testid': 'meeting-toolbar-more-folded' }] : []),
    ...moreSections,
  ];

  return (
    <div
      {...roving}
      role="toolbar"
      aria-label="Meeting controls"
      data-testid={testId}
      data-compact={narrow ? 'true' : undefined}
      className={cn('flex min-h-16 items-center gap-1 border-b border-border bg-surface px-3', className)}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">{start}</div>
      <div className="flex shrink-0 items-center gap-0.5" data-testid={`${testId}-items`}>
        {shown.map((item) => <ToolbarButton key={item.id} item={item} />)}
        {more.length > 0 && (
          <DropdownMenu
            trigger={(
              <>
                <MoreHorizontalIcon size={20} />
                <T size="xs" tone="inherit" className="leading-tight">More</T>
              </>
            )}
            triggerLabel="More"
            triggerVariant="link"
            triggerClassName={cn(MEETING_TOOLBAR_BUTTON, 'gap-0.5 font-normal')}
            triggerTestId="meeting-toolbar-more"
            align="end"
            sections={more}
          />
        )}
      </div>
      {media.length > 0 && <Divider />}
      {media.length > 0 && (
        <div className="flex shrink-0 items-center gap-0.5" data-testid={`${testId}-media`}>
          {media.map((item) => <ToolbarButton key={item.id} item={item} />)}
        </div>
      )}
      <Divider />
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
      />
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
