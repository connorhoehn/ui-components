import { isValidElement, useId, type ReactNode, type DragEvent } from 'react';
import { Avatar } from './Avatar';
import { StatusPill, type StatusPillProps } from './StatusPill';
import { cn } from '../../lib/cn';

/**
 * A card's status as StatusPill props — `{ state: 'warning', label: 'Needs review' }`.
 * `tone` and `state` mean the same thing, as on StatusPill.
 */
export type GalleryAssetStatus = Pick<StatusPillProps, 'state' | 'tone' | 'label' | 'meta'>;

export interface GalleryAsset {
  id: string;
  title: string;
  src?: string;
  subtitle?: string;
  /**
   * Shown on the card, over the thumbnail's top-left corner: StatusPill props
   * (rendered as a md StatusPill, 12px: the sm size is 10px, under the type floor) or any node. The card's button is
   * described by it, so a screen reader hears "Inspect Cup, Needs review".
   */
  status?: GalleryAssetStatus | ReactNode;
}

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

interface AssetCardProps extends Omit<AssetGalleryProps, 'items' | 'label' | 'className'> {
  item: GalleryAsset;
  variant: 'avatars' | 'images';
  actionsVisibility: 'hover' | 'always';
}

function AssetCard({ item, variant, onOpen, actions, actionsVisibility, onDragStart }: AssetCardProps) {
  const statusId = useId();
  const status = item.status;
  const hasStatus = status != null && status !== false && status !== '';
  return (
    <div role="listitem" className="group relative min-w-0">
      <button
        type="button"
        draggable={!!onDragStart}
        onDragStart={(event) => onDragStart?.(item, event)}
        aria-label={`Inspect ${item.title}`}
        aria-describedby={hasStatus ? statusId : undefined}
        onClick={() => onOpen(item)}
        className="block w-full min-w-0 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span data-gallery-thumbnail className={cn('flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-surface-muted transition-colors group-hover:bg-surface-hover', variant === 'images' && 'aspect-[4/3]')}>
          {variant === 'avatars' ? <Avatar name={item.title} src={item.src} size={88} /> : item.src ? <img draggable={false} src={item.src} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" /> : <span className="text-xs text-text-secondary">Image unavailable</span>}
        </span>
        <span className="mt-1 block truncate text-sm font-medium text-text-primary" title={item.title}>{item.title}</span>
        {item.subtitle && <span className="block truncate text-xs text-text-secondary" title={item.subtitle}>{item.subtitle}</span>}
      </button>
      {/* Outside the button: its aria-label would otherwise swallow the
          status text. Pointer events pass through to the card. */}
      {hasStatus && (
        <span id={statusId} data-gallery-status className="pointer-events-none absolute left-2 top-2 max-w-[calc(100%-1rem)]">
          {isStatusProps(status) ? <StatusPill size="md" {...status} /> : status}
        </span>
      )}
      {actions && (
        <div
          data-gallery-actions={actionsVisibility}
          className={cn(
            'flex h-8 items-center justify-end',
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
export function AssetGallery({ items, variant = 'images', label, onOpen, actions, actionsVisibility = 'hover', onDragStart, className }: AssetGalleryProps) {
  return (
    <div role="list" aria-label={label} data-asset-gallery={variant} className={cn('grid gap-3', variant === 'avatars' ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8' : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4', className)}>
      {items.map((item) => (
        <AssetCard
          key={item.id}
          item={item}
          variant={variant}
          onOpen={onOpen}
          actions={actions}
          actionsVisibility={actionsVisibility}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
}
