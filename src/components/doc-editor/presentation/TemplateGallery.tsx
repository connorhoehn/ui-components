// TemplateGallery — a grid of starting decks, for choosing one.
//
// Each tile is a `SelectableCard` (a real button; `aria-pressed` marks
// `selectedId`) showing the template's first slide large, up to three of the
// next slides small under it, then the title, the description, and the slide
// count with the audience. The previews are SVG SOURCE the host rendered on
// its server, shown as `data:` URIs in `<img>` (`svgDataUri`) like every
// other slide preview in the editor, never as injected markup.
//
// The existing image strips (`ImageFilmstrip`, `AssetGallery`) were looked at
// and not used: `ImageFilmstrip` is a viewer with its own selection (pressing
// a small frame changes the large one), where here the whole tile is ONE
// choice; and `AssetGallery` captions square or 4:3 thumbnails, not a 16:9
// slide with a strip under it. The tile reuses `LayoutPreviewFrame`, the
// frame `LayoutGallery` uses, so a missing preview reads the same in both.
//
// Compact, not table-first: the grid answers to its own width (a container
// query), one column below 28rem, two from 28rem, three from 42rem and four
// from 64rem — three to four a row in a desktop page, one at phone width,
// never a sideways scroll.

import { cn } from '../../../lib/cn';
import { SelectableCard } from '../../ui/SelectableCard';
import EmptyState from '../../shared/EmptyState';
import SkeletonCard from '../../shared/SkeletonCard';
import { Text } from '../../shared/Text';
import { LayoutPreviewFrame } from './LayoutGallery';

export interface DeckTemplate {
  id: string;
  title: string;
  description: string;
  slideCount: number;
  /** Who the deck is for ("Leadership", "A customer"), shown beside the count. */
  audience?: string;
  /** SVG source of the first few slides, first slide first. Up to four are shown. */
  previews: readonly string[];
}

export interface TemplateGalleryProps {
  templates: readonly DeckTemplate[];
  onSelect: (id: string) => void;
  /** Marks that template's tile selected. */
  selectedId?: string;
  /** Shows placeholder tiles instead of the templates. */
  loading?: boolean;
  /** How many placeholder tiles while loading. Default 4. */
  loadingCount?: number;
  /** The empty state's title. Default "No templates yet". */
  emptyTitle?: string;
  /** The empty state's line under the title. */
  emptyDescription?: string;
  /** The list's accessible name. Default "Deck templates". */
  label?: string;
  className?: string;
  /** Test-id prefix. Default `template-gallery`; tiles are `<prefix>-<id>`. */
  testIdPrefix?: string;
}

/** Small frames under the first slide. */
const MAX_SMALL_PREVIEWS = 3;

function slideCountLabel(count: number): string {
  return `${count} slide${count === 1 ? '' : 's'}`;
}

export function TemplateGallery({
  templates,
  onSelect,
  selectedId,
  loading = false,
  loadingCount = 4,
  emptyTitle = 'No templates yet',
  emptyDescription,
  label = 'Deck templates',
  className,
  testIdPrefix = 'template-gallery',
}: TemplateGalleryProps) {
  const grid = 'm-0 grid list-none grid-cols-1 gap-4 p-0 @md:grid-cols-2 @2xl:grid-cols-3 @5xl:grid-cols-4';

  if (loading) {
    return (
      <div className={cn('@container min-w-0', className)} data-testid={testIdPrefix} data-state="loading" aria-busy="true">
        <ul aria-label={`${label}, loading`} className={grid}>
          {Array.from({ length: loadingCount }, (_, i) => (
            <li key={i} className="flex min-w-0 flex-col gap-2" data-testid={`${testIdPrefix}-placeholder`}>
              <span className="block aspect-video w-full overflow-hidden rounded-md"><SkeletonCard height="100%" rounded="md" /></span>
              <SkeletonCard height={14} rounded="md" />
              <SkeletonCard height={12} rounded="md" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!templates.length) {
    return (
      <div className={cn('min-w-0', className)} data-testid={testIdPrefix} data-state="empty">
        <EmptyState title={emptyTitle} description={emptyDescription} testId={`${testIdPrefix}-empty`} />
      </div>
    );
  }

  return (
    <div className={cn('@container min-w-0', className)} data-testid={testIdPrefix}>
      <ul aria-label={label} className={grid}>
        {templates.map((template) => {
          const [first, ...rest] = template.previews;
          const small = rest.slice(0, MAX_SMALL_PREVIEWS);
          const facts = [slideCountLabel(template.slideCount), template.audience].filter(Boolean).join(' · ');
          return (
            <li key={template.id} className="min-w-0">
              <SelectableCard
                selected={selectedId === template.id}
                onSelect={() => onSelect(template.id)}
                className="flex h-full flex-col gap-2"
                data-testid={`${testIdPrefix}-${template.id}`}
                data-template={template.id}
              >
                <LayoutPreviewFrame svg={first} />
                {small.length > 0 && (
                  <span className="grid grid-cols-3 gap-1.5" data-testid={`${testIdPrefix}-${template.id}-strip`}>
                    {small.map((svg, i) => <LayoutPreviewFrame key={i} svg={svg} className="rounded-sm" />)}
                  </span>
                )}
                <span className="flex min-w-0 flex-col gap-0.5">
                  <Text as="span" size="sm" weight="medium" className="block" truncate title={template.title}>{template.title}</Text>
                  <Text as="span" size="xs" tone="secondary" className="block" clamp={2}>{template.description}</Text>
                  <Text as="span" size="xs" tone="tertiary" className="block" data-testid={`${testIdPrefix}-${template.id}-facts`}>{facts}</Text>
                </span>
              </SelectableCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TemplateGallery;
