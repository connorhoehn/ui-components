import type { ReactNode, DragEvent } from 'react';
import { Avatar } from './Avatar';
import { cn } from '../../lib/cn';
export interface GalleryAsset { id: string; title: string; src?: string; subtitle?: string; }
export interface AssetGalleryProps {
  items: readonly GalleryAsset[];
  variant?: 'avatars' | 'images';
  label: string;
  onOpen: (item: GalleryAsset) => void;
  actions?: (item: GalleryAsset) => ReactNode;
  /** Host-owned typed drag payload; never infer identity from an image URL. */
  onDragStart?: (item: GalleryAsset, event: DragEvent<HTMLButtonElement>) => void;
  className?: string;
}
/** Borderless collection: fixed thumbnail ratio, concise captions, shared
 * Avatar identity. Full source metadata belongs in the host's inspection view. */
export function AssetGallery({ items, variant = 'images', label, onOpen, actions, onDragStart, className }: AssetGalleryProps) {
  return <div role="list" aria-label={label} data-asset-gallery={variant} className={cn('grid gap-3', variant === 'avatars' ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8' : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4', className)}>
    {items.map(item => <div role="listitem" key={item.id} className="group min-w-0">
      <button type="button" draggable={!!onDragStart} onDragStart={event => onDragStart?.(item, event)} aria-label={`Inspect ${item.title}`} onClick={() => onOpen(item)} className="block w-full min-w-0 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span data-gallery-thumbnail className={cn('flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-surface-muted transition-colors group-hover:bg-surface-hover', variant === 'images' && 'aspect-[4/3]')}>
          {variant === 'avatars' ? <Avatar name={item.title} src={item.src} size={88} /> : item.src ? <img draggable={false} src={item.src} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" /> : <span className="text-xs text-text-secondary">Image unavailable</span>}
        </span>
        <span className="mt-1 block truncate text-sm font-medium text-text-primary" title={item.title}>{item.title}</span>
        {item.subtitle && <span className="block truncate text-xs text-text-secondary" title={item.subtitle}>{item.subtitle}</span>}
      </button>
      {actions && <div className="flex h-8 items-center justify-end opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">{actions(item)}</div>}
    </div>)}
  </div>;
}
