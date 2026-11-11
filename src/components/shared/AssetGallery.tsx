import { isValidElement, useId, useRef, useState, type CSSProperties, type ReactNode, type DragEvent, type KeyboardEvent } from 'react';
import { Avatar } from './Avatar';
import { StatusPill, type StatusPillProps, type StatusPillTone } from './StatusPill';
import { InlinePopover } from './InlinePopover';
import { MessageActionBar, type MessageAction } from '../social/MessageActionBar';
import { Button } from '../ui/Button';
import { ImageIcon } from '../ui/Icons';
import type { ToneOrAlias } from './tones';
import { cn } from '../../lib/cn';

/**
 * A card's status as StatusPill props — `{ state: 'warning', label: 'Needs review' }`.
 * `tone` and `state` mean the same thing, as on StatusPill. `tone` also takes
 * any library tone (the 2.504–2.506 shape, `{ label, tone }`): `caution`
 * draws as `warning`, `accent` as `info`.
 */
export type GalleryAssetStatus =
  | Pick<StatusPillProps, 'state' | 'tone' | 'label' | 'meta'>
  | { label: string; tone?: ToneOrAlias; meta?: string };

export interface GalleryAsset {
  id: string;
  title: string;
  src?: string;
  /**
   * Where the picture sits in its tile (CSS `object-position`): the Avatar's
   * `imagePosition` in `avatars`, the cropped img's in `images` with
   * `fit="cover"`. A full-length character wants `"50% 12%"` (its face).
   * Since 2.520.0 (G150-1).
   */
  imagePosition?: string;
  subtitle?: string;
  /**
   * Shown on the card: StatusPill props (rendered at md, 12px: the sm size is
   * 10px, under the type floor) or any node. `images`: a pill over the
   * thumbnail's top-left corner. `avatars` (2.512.0): the caption's first
   * line under the tile — a tone dot and the full label, never truncated
   * (an 88px tile cut "Candidate" to "C."). The card's button is described
   * by it, so a screen reader hears "Inspect Cup, Needs review".
   */
  status?: GalleryAssetStatus | ReactNode;
  /**
   * With no `src` (2.512.0): the tile shows a library empty tile — the muted
   * surface, an image glyph and this text ("No picture yet") — instead of the
   * Avatar's initials or the "No image yet" line. Both variants.
   */
  placeholder?: string;
}

/** One icon action on a tile — the chat hover toolbar's action shape. Since 2.504.0. */
export type GalleryTileAction = MessageAction;

export interface AssetGalleryProps {
  items: readonly GalleryAsset[];
  variant?: 'avatars' | 'images';
  label: string;
  onOpen: (item: GalleryAsset) => void;
  actions?: (item: GalleryAsset) => ReactNode;
  /**
   * When the `actions` row is visible. `'hover'` (default, the pre-2.503
   * behaviour) reveals it on pointer hover or keyboard focus within the card,
   * and always on touch screens. `'always'` shows it at rest — use it when an
   * action is the main thing a person does with the card (approve, use,
   * regenerate): an action nobody can see is an action nobody finds.
   */
  actionsVisibility?: 'hover' | 'always';
  /**
   * Icon actions for a tile (since 2.504.0): a compact toolbar over the
   * thumbnail's top-right corner, revealed on hover or keyboard focus (always
   * shown on touch), with the chat message bar's roving keys. The same
   * actions are the tile's context menu (right-click, the Menu key or
   * Shift+F10).
   */
  tileActions?: (item: GalleryAsset) => readonly GalleryTileAction[];
  /**
   * With `tileActions`: selecting a tile opens its action menu — "Open"
   * (`onOpen`) first, then the tile's actions — instead of opening it
   * directly. Since 2.504.0.
   */
  menuOnSelect?: boolean;
  /**
   * Minimum tile width in px (2.515.0). Given, the grid is `auto-fill`
   * columns of at least this width (never wider than the gallery) instead
   * of the fixed 2/4/8 (avatars) or 2/3/4 (images) columns, and an avatar
   * is drawn at 80% of it, so the tile and its picture scale together. Use
   * it whenever tiles carry `actions`: eight fixed columns left a 120px tile
   * for "Approve for mesh · uses credits".
   */
  minTileWidth?: number;
  /**
   * How an image tile fits its picture (2.515.0). `cover` (default,
   * unchanged) fills the tile and may crop; `contain` letterboxes so the
   * subject is shown whole, as a record's picture must be (audit
   * `subject.frame`). The thumbnail carries `data-gallery-fit`.
   */
  fit?: 'cover' | 'contain';
  /**
   * An image tile's frame (G150-5): `landscape` (4:3, default), `portrait`
   * (3:4: a standing character shown whole and large) or `square`. The
   * thumbnail carries `data-gallery-aspect`. Since 2.520.0.
   */
  aspect?: 'landscape' | 'portrait' | 'square';
  /**
   * Where an image tile's `status` is drawn (G150-4): `overlay` (default, a
   * pill over the thumbnail's top-left corner) or `caption`, a line of its own
   * under the title and subtitle (a dot and the whole label), where it covers
   * nothing; avatars always draw it as a caption. Since 2.520.0.
   */
  statusPlacement?: 'overlay' | 'caption';
  /**
   * The `actions` row's layout (G150-3): `wrap` (default) wraps, right-aligned;
   * `row` keeps every card's row one shape: one line, the first action fills
   * the row's width, the rest (More) keep their own width at its end, and a
   * label never wraps (the host passes a label that fits: a card's short form).
   * Since 2.520.0.
   */
  actionsLayout?: 'wrap' | 'row';
  /** Host-owned typed drag payload; never infer identity from an image URL. */
  onDragStart?: (item: GalleryAsset, event: DragEvent<HTMLButtonElement>) => void;
  className?: string;
}

function isStatusProps(status: unknown): status is GalleryAssetStatus {
  return (
    typeof status === 'object' &&
    status !== null &&
    !isValidElement(status) &&
    !Array.isArray(status) &&
    typeof (status as { label?: unknown }).label === 'string'
  );
}

/** Library tones StatusPill has no spelling for, folded onto the nearest pill tone. */
const PILL_TONE: Partial<Record<string, StatusPillTone>> = { caution: 'warning', accent: 'info', purple: 'info' };

function StatusPillFor({ status, caption = false }: { status: GalleryAssetStatus; caption?: boolean }) {
  const { tone, ...rest } = status as { tone?: string; state?: StatusPillTone; label: string; meta?: string };
  const pillTone = tone == null ? undefined : (PILL_TONE[tone] ?? (tone as StatusPillTone));
  // Under an avatar tile the status is a caption line: dot + the whole label.
  return <StatusPill size="md" {...rest} {...(pillTone ? { tone: pillTone } : {})} {...(caption ? { variant: 'text' as const, truncate: false } : {})} />;
}

/** A tile with no picture yet: the muted surface, an image glyph and the host's words. */
function EmptyTile({ text, variant }: { text: string; variant: 'avatars' | 'images' }) {
  return (
    <span data-gallery-placeholder="" className="flex h-full w-full flex-col items-center justify-center gap-1 px-2 text-center text-xs text-text-tertiary">
      <ImageIcon size={variant === 'avatars' ? 20 : 24} aria-hidden />
      <span className="leading-tight">{text}</span>
    </span>
  );
}

const ASPECT = { landscape: 'aspect-[4/3]', portrait: 'aspect-[3/4]', square: 'aspect-square' } as const;

interface AssetCardProps extends Omit<AssetGalleryProps, 'items' | 'label' | 'className' | 'tileActions'> {
  item: GalleryAsset;
  variant: 'avatars' | 'images';
  actionsVisibility: 'hover' | 'always';
  tileActions?: readonly GalleryTileAction[];
}

function AssetCard({ item, variant, onOpen, actions, actionsVisibility, tileActions, menuOnSelect, onDragStart, minTileWidth, fit = 'cover', aspect = 'landscape', statusPlacement = 'overlay', actionsLayout = 'wrap' }: AssetCardProps) {
  const avatarSize = minTileWidth ? Math.round(minTileWidth * 0.8) : 88;
  const statusId = useId();
  const tile = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const status = item.status;
  const hasStatus = status != null && status !== false && status !== '';
  const hasActions = !!tileActions && tileActions.length > 0;
  const captionStatus = hasStatus && variant === 'avatars';
  const lineStatus = hasStatus && variant === 'images' && statusPlacement === 'caption';
  const statusNode = hasStatus ? (isStatusProps(status) ? <StatusPillFor status={status} caption={captionStatus || lineStatus} /> : status) : null;
  const empty = !item.src && item.placeholder ? <EmptyTile text={item.placeholder} variant={variant} /> : null;
  const menu = hasActions && !!menuOnSelect;
  const openMenu = () => { if (hasActions) setMenuOpen(true); };
  const run = (action: GalleryTileAction) => { setMenuOpen(false); action.onClick(tile.current ?? document.body); tile.current?.focus(); };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (hasActions && (event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey))) { event.preventDefault(); openMenu(); }
  };
  return (
    <div role="listitem" className="group relative min-w-0" data-gallery-tile={item.id}>
      <button
        data-ui-part=""
        ref={tile}
        type="button"
        draggable={!!onDragStart}
        onDragStart={(event) => onDragStart?.(item, event)}
        aria-label={menu ? `${item.title}: actions` : `Inspect ${item.title}`}
        aria-describedby={hasStatus ? statusId : undefined}
        aria-haspopup={hasActions ? 'dialog' : undefined}
        aria-expanded={hasActions ? menuOpen : undefined}
        onClick={() => (menu ? openMenu() : onOpen(item))}
        onKeyDown={onKeyDown}
        onContextMenu={hasActions ? (event) => { event.preventDefault(); openMenu(); } : undefined}
        className="block w-full min-w-0 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span data-gallery-thumbnail data-gallery-fit={variant === 'images' ? fit : undefined} data-gallery-aspect={variant === 'images' ? aspect : undefined} className={cn('flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-surface-muted transition-colors group-hover:bg-surface-hover', variant === 'images' && ASPECT[aspect])}>
          {empty ?? (variant === 'avatars' ? <Avatar name={item.title} src={item.src} imagePosition={item.imagePosition} size={avatarSize} className="max-h-full max-w-full" /> : item.src ? <img draggable={false} src={item.src} alt={item.title} loading="lazy" className={cn('h-full w-full transition-transform', fit === 'contain' ? 'object-contain' : 'object-cover group-hover:scale-105')} {...(item.imagePosition ? { style: { objectPosition: item.imagePosition } } : {})} /> : <span className="text-xs text-text-secondary">{hasStatus ? 'No image yet' : 'Image unavailable'}</span>)}
        </span>
        {/* Avatars: the status is the caption's first line, whole. Inside the
            button only so it sits between the tile and the title; the button's
            aria-label still names it and aria-describedby reads the status. */}
        {captionStatus && (
          <span id={statusId} data-gallery-status="caption" className="mt-1 flex min-w-0">{statusNode}</span>
        )}
        <span className="mt-1 block truncate text-sm font-medium text-text-primary" title={item.title}>{item.title}</span>
        {item.subtitle && <span className="block truncate text-xs text-text-secondary" title={item.subtitle}>{item.subtitle}</span>}
        {/* G150-4: the status as its own line under the caption, covering nothing. */}
        {lineStatus && (
          <span id={statusId} data-gallery-status="line" className="mt-1 flex min-h-5 min-w-0">{statusNode}</span>
        )}
      </button>
      {/* Outside the button: its aria-label would otherwise swallow the
          status text. Pointer events pass through to the card. */}
      {hasStatus && !captionStatus && !lineStatus && (
        <span id={statusId} data-gallery-status="" className="pointer-events-none absolute left-2 top-2 max-w-[calc(100%-1rem)]">
          {statusNode}
        </span>
      )}
      {hasActions && (
        <MessageActionBar
          label={`${item.title} actions`}
          actions={tileActions}
          data-testid={`gallery-tile-actions-${item.id}`}
          className="absolute right-1.5 top-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"
        />
      )}
      {hasActions && (
        <InlinePopover open={menuOpen} onClose={() => setMenuOpen(false)} trigger={tile} placement="bottom-start" aria-label={`${item.title} actions`} className="flex min-w-44 flex-col p-1" data-testid={`gallery-tile-menu-${item.id}`}>
          {menuOnSelect && <Button variant="ghost" size="sm" className="justify-start" autoFocus onClick={() => { setMenuOpen(false); onOpen(item); }}>Open</Button>}
          {tileActions!.map((action, index) => (
            <Button key={action.id} variant="ghost" size="sm" className="justify-start gap-2" disabled={action.disabled} autoFocus={!menuOnSelect && index === 0} onClick={() => run(action)}>
              <span aria-hidden className="inline-flex shrink-0 [&_svg]:size-4">{action.icon}</span>{action.label}
            </Button>
          ))}
        </InlinePopover>
      )}
      {actions && (
        // The tile's own actions stay inside the tile (2.515.0): the row
        // wraps, each action is at most the tile's width, and a label longer
        // than that wraps onto a second line inside its button (which grows
        // from the sm control height) instead of running into the next tile
        // or being cut (the 8-column cast grid's "Approve for mesh · uses
        // credits"). One row at the control height when the labels fit.
        <div
          data-gallery-actions={actionsVisibility}
          data-gallery-actions-layout={actionsLayout}
          data-ui-part="tile-actions"
          className={cn(
            actionsLayout === 'row'
              ? // G150-3: one row in every card: the first action fills it, the rest keep their width; labels stay on one line.
                'mt-2 flex min-h-8 min-w-0 max-w-full flex-nowrap items-center gap-2 [&>*:first-child]:min-w-0 [&>*:first-child]:flex-1 [&>*:first-child>button]:w-full [&>*:not(:first-child)]:shrink-0 [&_button]:whitespace-nowrap'
              : 'mt-1 flex min-h-8 min-w-0 max-w-full flex-wrap items-center justify-end gap-1 [&>*]:min-w-0 [&>*]:max-w-full [&_button]:h-auto [&_button]:min-h-[var(--ui-control-sm,1.75rem)] [&_button]:min-w-0 [&_button]:max-w-full [&_button]:shrink [&_button]:whitespace-normal [&_button]:break-words [&_button]:py-1 [&_button]:text-center [&_button]:leading-4',
            actionsVisibility === 'hover' && 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100',
          )}
        >
          {actions(item)}
        </div>
      )}
    </div>
  );
}

/** Borderless collection: fixed thumbnail ratio, concise captions, shared
 * Avatar identity. Full source metadata belongs in the host's inspection view. */
export function AssetGallery({ items, variant = 'images', label, onOpen, actions, actionsVisibility = 'hover', tileActions, menuOnSelect = false, onDragStart, minTileWidth, fit = 'cover', aspect = 'landscape', statusPlacement = 'overlay', actionsLayout = 'wrap', className }: AssetGalleryProps) {
  // The one dynamic value (the host's minimum) goes in as a custom property;
  // the column rule itself is a class.
  const fluid = minTileWidth != null && minTileWidth > 0;
  const vars = fluid ? ({ '--gallery-min-tile': `${minTileWidth}px` } as CSSProperties) : undefined;
  return (
    <div role="list" aria-label={label} data-asset-gallery={variant} data-gallery-columns={fluid ? 'auto-fill' : 'fixed'}
      className={cn('grid gap-3', fluid ? 'grid-cols-[repeat(auto-fill,minmax(min(var(--gallery-min-tile),100%),1fr))]' : variant === 'avatars' ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8' : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4', className)}
      style={vars}>
      {items.map((item) => (
        <AssetCard
          key={item.id}
          item={item}
          variant={variant}
          onOpen={onOpen}
          actions={actions}
          actionsVisibility={actionsVisibility}
          tileActions={tileActions?.(item)}
          menuOnSelect={menuOnSelect}
          onDragStart={onDragStart}
          fit={fit}
          aspect={aspect}
          statusPlacement={statusPlacement}
          actionsLayout={actionsLayout}
          {...(fluid ? { minTileWidth } : {})}
        />
      ))}
    </div>
  );
}
