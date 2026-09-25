// src/components/photo-editor/PhotoFilmstrip.tsx
//
// The set, one thumbnail per photo, along the bottom of the editor. The
// current photo is outlined; a photo with kept edits carries "⧉ n"; a pick
// carries a heart. Arrow keys move between photos (roving focus), and the
// current one scrolls into view when it changes.

import { useEffect, useRef, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { EditStackIcon, HeartIcon } from './icons';
import type { PhotoPick } from './model';

export interface PhotoFilmstripItem {
  id: string;
  /** A loadable thumbnail URL; null / undefined shows a blank tile. */
  thumbnailSrc: string | null | undefined;
  label: string;
  /** Ops in the kept version — the "⧉ n" badge. 0 hides it. */
  editCount?: number;
  pick?: PhotoPick;
}

export interface PhotoFilmstripProps {
  items: readonly PhotoFilmstripItem[];
  currentId: string | null;
  onSelect: (id: string) => void;
  className?: string;
  'data-testid'?: string;
}

const BADGE = 'pointer-events-none absolute rounded-md bg-black/65 text-white backdrop-blur-sm';

export function PhotoFilmstrip({ items, currentId, onSelect, className, 'data-testid': testId = 'photo-filmstrip' }: PhotoFilmstripProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[aria-current="true"]');
    el?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
  }, [currentId]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const i = items.findIndex((it) => it.id === currentId);
    const next = items[Math.min(items.length - 1, Math.max(0, i + (e.key === 'ArrowRight' ? 1 : -1)))];
    if (next && next.id !== currentId) {
      e.preventDefault();
      onSelect(next.id);
      requestAnimationFrame(() => listRef.current?.querySelector<HTMLElement>('[aria-current="true"]')?.focus());
    }
  };

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label="Photos in this set"
      aria-orientation="horizontal"
      onKeyDown={onKey}
      data-testid={testId}
      className={cn('flex h-[74px] shrink-0 items-center gap-1.5 overflow-x-auto bg-surface-panel px-2 py-1.5', className)}
    >
      {items.map((it) => {
        const current = it.id === currentId;
        return (
          <button
            key={it.id}
            type="button"
            role="option"
            aria-selected={current}
            aria-current={current ? 'true' : undefined}
            aria-label={`${it.label}${it.editCount ? `, ${it.editCount} edits` : ''}${it.pick === 'pick' ? ', picked' : ''}`}
            tabIndex={current ? 0 : -1}
            onClick={() => onSelect(it.id)}
            data-testid={`${testId}-item-${it.id.slice(0, 12)}`}
            className={cn(
              'relative h-[60px] w-24 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 border-solid bg-video-stage p-0',
              current ? 'border-accent' : 'border-transparent hover:border-border-emphasis',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent',
            )}
          >
            {it.thumbnailSrc && <img src={it.thumbnailSrc} alt="" loading="lazy" draggable={false} className="block h-full w-full object-cover" />}
            {!!it.editCount && (
              <span className={cn(BADGE, 'right-1 top-1 inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-semibold leading-none')} data-testid="photo-filmstrip-edit-badge">
                <EditStackIcon size={11} />
                {it.editCount}
              </span>
            )}
            {it.pick === 'pick' && (
              <span className={cn(BADGE, 'bottom-1 left-1 inline-flex h-5 w-5 items-center justify-center rounded-full')} data-testid="photo-filmstrip-pick">
                <HeartIcon size={12} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
