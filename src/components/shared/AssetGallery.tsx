import { useRef, useState, type ReactNode, type DragEvent, type KeyboardEvent } from 'react';
import { Avatar } from './Avatar';
import Chip from './Chip';
import { InlinePopover } from './InlinePopover';
import { MessageActionBar, type MessageAction } from '../social/MessageActionBar';
import { Button } from '../ui/Button';
import type { ToneOrAlias } from './tones';
import { cn } from '../../lib/cn';

/** A tile's live state ("Running · Generate", "Waiting for review"), drawn over its thumbnail. Since 2.503.0. */
export interface GalleryAssetStatus { label: string; tone?: ToneOrAlias }
export interface GalleryAsset { id: string; title: string; src?: string; subtitle?: string; status?: GalleryAssetStatus }
/** One icon action on a tile — the chat hover toolbar's action shape. Since 2.503.0. */
export type GalleryTileAction = MessageAction;
export interface AssetGalleryProps {
  items: readonly GalleryAsset[];
  variant?: 'avatars' | 'images';
  label: string;
  onOpen: (item: GalleryAsset) => void;
  actions?: (item: GalleryAsset) => ReactNode;
  /**
   * Icon actions for a tile (since 2.503.0): a compact toolbar over the
   * thumbnail's corner, revealed on hover or keyboard focus (always shown on
   * touch), with the chat message bar's roving keys. The same actions are
   * the tile's context menu (right-click, the Menu key or Shift+F10).
   */
  tileActions?: (item: GalleryAsset) => readonly GalleryTileAction[];
  /**
   * With `tileActions`: selecting a tile opens its action menu — "Open"
   * (`onOpen`) first, then the tile's actions — instead of opening it
   * directly. Since 2.503.0.
   */
  menuOnSelect?: boolean;
  /** Host-owned typed drag payload; never infer identity from an image URL. */
  onDragStart?: (item: GalleryAsset, event: DragEvent<HTMLButtonElement>) => void;
  className?: string;
}

function GalleryTile({ item, variant, onOpen, actions, tileActions, menuOnSelect, onDragStart }: Omit<AssetGalleryProps, 'items' | 'label' | 'className' | 'tileActions'> & { item: GalleryAsset; variant: 'avatars' | 'images'; tileActions?: readonly GalleryTileAction[] }) {
  const tile = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const hasActions = !!tileActions && tileActions.length > 0;
  const menu = hasActions && menuOnSelect;
  const openMenu = () => { if (hasActions) setMenuOpen(true); };
  const run = (action: GalleryTileAction) => { setMenuOpen(false); action.onClick(tile.current ?? document.body); tile.current?.focus(); };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (hasActions && (event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey))) { event.preventDefault(); openMenu(); }
  };
  return <div role="listitem" className="group relative min-w-0" data-gallery-tile={item.id}>
    <button data-ui-part="" ref={tile} type="button" draggable={!!onDragStart} onDragStart={event => onDragStart?.(item, event)}
      aria-label={menu ? `${item.title}: actions` : `Inspect ${item.title}`} aria-haspopup={hasActions ? 'dialog' : undefined} aria-expanded={hasActions ? menuOpen : undefined}
      onClick={() => (menu ? openMenu() : onOpen(item))} onKeyDown={onKeyDown}
      onContextMenu={hasActions ? event => { event.preventDefault(); openMenu(); } : undefined}
      className="block w-full min-w-0 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <span data-gallery-thumbnail className={cn('relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-surface-muted transition-colors group-hover:bg-surface-hover', variant === 'images' && 'aspect-[4/3]')}>
        {variant === 'avatars' ? <Avatar name={item.title} src={item.src} size={88} /> : item.src ? <img draggable={false} src={item.src} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" /> : <span className="text-xs text-text-secondary">{item.status ? 'No image yet' : 'Image unavailable'}</span>}
        {item.status && <span className="absolute bottom-1.5 left-1.5 max-w-[calc(100%-0.75rem)]" data-gallery-status><Chip size="xs" tone={item.status.tone ?? 'neutral'}>{item.status.label}</Chip></span>}
      </span>
      <span className="mt-1 block truncate text-sm font-medium text-text-primary" title={item.title}>{item.title}</span>
      {item.subtitle && <span className="block truncate text-xs text-text-secondary" title={item.subtitle}>{item.subtitle}</span>}
    </button>
    {hasActions && <MessageActionBar label={`${item.title} actions`} actions={tileActions} data-testid={`gallery-tile-actions-${item.id}`}
      className="absolute right-1.5 top-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100" />}
    {hasActions && <InlinePopover open={menuOpen} onClose={() => setMenuOpen(false)} trigger={tile} placement="bottom-start" aria-label={`${item.title} actions`} className="flex min-w-44 flex-col p-1" data-testid={`gallery-tile-menu-${item.id}`}>
      {menuOnSelect && <Button variant="ghost" size="sm" className="justify-start" autoFocus onClick={() => { setMenuOpen(false); onOpen(item); }}>Open</Button>}
      {tileActions!.map((action, index) => <Button key={action.id} variant="ghost" size="sm" className="justify-start gap-2" disabled={action.disabled} autoFocus={!menuOnSelect && index === 0} onClick={() => run(action)}><span aria-hidden className="inline-flex shrink-0 [&_svg]:size-4">{action.icon}</span>{action.label}</Button>)}
    </InlinePopover>}
    {actions && <div className="flex h-8 items-center justify-end opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">{actions(item)}</div>}
  </div>;
}

/** Borderless collection: fixed thumbnail ratio, concise captions, shared
 * Avatar identity. Full source metadata belongs in the host's inspection view. */
export function AssetGallery({ items, variant = 'images', label, onOpen, actions, tileActions, menuOnSelect = false, onDragStart, className }: AssetGalleryProps) {
  return <div role="list" aria-label={label} data-asset-gallery={variant} className={cn('grid gap-3', variant === 'avatars' ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8' : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4', className)}>
    {items.map(item => <GalleryTile key={item.id} item={item} variant={variant} onOpen={onOpen} actions={actions} tileActions={tileActions?.(item)} menuOnSelect={menuOnSelect} onDragStart={onDragStart} />)}
  </div>;
}
