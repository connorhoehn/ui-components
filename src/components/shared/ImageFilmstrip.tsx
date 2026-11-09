// src/components/shared/ImageFilmstrip.tsx
//
// One image shown whole and large, with a strip of its sibling views under it
// (Storymaker concepts §4/§5: the approved concept beside "Full · front ·
// side · back · ¾ · +2"). Choosing a thumbnail puts that view in the large
// frame. The large frame is an `ImageCompare` pane (`fit="contain"`, a click
// opens the lightbox), so the picture is never cropped; each thumbnail is a
// small contained frame too.
//
// Not the slide editor's `Filmstrip` (numbered 16:9 slides down a rail) and
// not `FrameStrip` (a scrubbable animation sequence): this is a set of views
// of one subject.
//
// Markers: `data-image-filmstrip`, each thumbnail `data-filmstrip-thumb` with
// `aria-pressed` on the one shown; every frame `data-image-fit="contain"`.

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Stack, Inline } from '../ui/Stack';
import { Button } from '../ui/Button';
import Chip from './Chip';
import { ImageCompare, type ImageCompareAspect } from './ImageCompare';

export interface ImageFilmstripItem {
  id: string;
  src: string;
  /** "Full", "Front", "Side". The thumbnail's name and the large frame's caption. */
  label: string;
  alt?: string;
  /** A quieter caption line in the large frame ("v2 · approved 9:05"). */
  description?: string;
}

export interface ImageFilmstripProps {
  items: readonly ImageFilmstripItem[];
  /** The view in the large frame (controlled). */
  value?: string;
  /** The first view shown (uncontrolled). Default: the first item. */
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** A chip over the strip naming what this is: "Approved concept · v2". */
  caption?: ReactNode;
  /** The large frame's aspect. Default `landscape`. */
  aspect?: ImageCompareAspect;
  /** Thumbnails shown before "+N more". Default 6. */
  maxThumbs?: number;
  /** "+N more": open the full set (a versions tab, a lightbox). Without it the extra views are not reachable from the strip. */
  onMore?: () => void;
  /** Names the thumbnail group. Default "Views". */
  label?: string;
  className?: string;
  'data-testid'?: string;
}

export function ImageFilmstrip({
  items,
  value,
  defaultValue,
  onValueChange,
  caption,
  aspect = 'landscape',
  maxThumbs = 6,
  onMore,
  label = 'Views',
  className,
  'data-testid': testId = 'image-filmstrip',
}: ImageFilmstripProps) {
  const [own, setOwn] = useState<string | undefined>(defaultValue);
  if (items.length === 0) return null;
  const currentId = value ?? own ?? items[0].id;
  const current = items.find((i) => i.id === currentId) ?? items[0];
  const thumbs = items.slice(0, Math.max(1, maxThumbs));
  const hidden = items.length - thumbs.length;
  const choose = (id: string) => {
    if (value === undefined) setOwn(id);
    onValueChange?.(id);
  };
  return (
    <Stack gap="sm" data-image-filmstrip="" data-testid={testId} className={cn('min-w-0', className)}>
      {caption != null && <Inline gap="xs" align="center"><Chip size="sm" tone="neutral">{caption}</Chip></Inline>}
      <ImageCompare
        images={[{ src: current.src, alt: current.alt, label: current.label, description: current.description }]}
        aspect={aspect}
        fit="contain"
        data-testid={`${testId}-current`}
      />
      {items.length > 1 && (
        <Inline gap="xs" align="center" wrap role="group" aria-label={label} data-testid={`${testId}-thumbs`}>
          {thumbs.map((item) => {
            const on = item.id === current.id;
            return (
              <button
                key={item.id}
                type="button"
                data-ui-part=""
                data-filmstrip-thumb={item.id}
                aria-pressed={on}
                aria-label={item.label}
                title={item.label}
                onClick={() => choose(item.id)}
                className={cn(
                  'block h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-md border bg-surface-inset p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  on ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-border-emphasis',
                )}
              >
                <span data-ui-part="" data-image-fit="contain" className="block h-full w-full">
                  <img data-ui-part="" src={item.src} alt="" loading="lazy" draggable={false} className="block h-full w-full object-contain" />
                </span>
              </button>
            );
          })}
          {hidden > 0 && onMore && (
            <Button variant="ghost" size="sm" onClick={onMore} data-testid={`${testId}-more`}>+{hidden} more</Button>
          )}
        </Inline>
      )}
    </Stack>
  );
}

export default ImageFilmstrip;
