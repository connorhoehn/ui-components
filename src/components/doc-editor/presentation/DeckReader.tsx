// DeckReader — a saved deck, read-only: a viewing toolbar (Slides/Outline,
// previous/next with "Slide n of m", zoom, notes, Present), a rail of slide
// thumbnails or an outline, a keyboard-navigable 16:9 viewport, and the
// current slide's speaker notes.
//
// `PresentationEditor` in read-only mode returns before its frame/footer, so a
// reading host composed these viewing primitives itself; the aws-agentcore
// portal did, with a sibling stylesheet. Ported here in 2.441.0 with the same
// DOM contract: every `data-testid` (`<testId>`, `-position`, `-viewport`,
// `-stage`, `-notes`, `-preview-loading`, `-filmstrip-*`, `-present*`), the
// accessible names ("Presentation viewing tools", "Slide zoom", "Slide
// thumbnails" / "Presentation outline", "Slide canvas. Use arrow keys to
// change slides.") and the class hooks `deck-reader-*` stay put; styling is
// Tailwind token classes and needs no host CSS.
//
// The reader receives no mutation, save or agent-revise callback. The host
// owns the spec, the preview rendering (`onRequestPreview` / `preview`), and
// the frame it is drawn in (`renderFrame`, the same parts PresentationEditor
// hands its host).

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';
import { Inline } from '../../ui/Stack';
import { Select } from '../../forms/Select';
import { Textarea } from '../../forms/Textarea';
import { DropdownMenu } from '../../shared/DropdownMenu';
import EmptyState from '../../shared/EmptyState';
import LoadingState from '../../shared/LoadingState';
import { Text } from '../../shared/Text';
import { Filmstrip } from './Filmstrip';
import { SlideStage } from './SlideStage';
import { canSaveDeck, type DeckSlide, type DeckSpec } from './deckSpec';
import type {
  PresentationEditorFrame,
  PresentationEditorProps,
  PresentationFooterContext,
  PresentationPreview,
} from './PresentationEditor';
import type { SlideListItem } from './SlideList';
import { svgDataUri } from './svgPreview';
import { DeckPresentationDialog } from './DeckPresentationDialog';
import { useComposerFocus } from '../../social/ConversationInputs';

export interface DeckReaderProps {
  /** The saved deck. Never mutated. */
  spec: DeckSpec;
  /** An active call's review: one toolbar row (a View menu) and notes closed by default. */
  compactReview?: boolean;
  /** File actions at the toolbar's end (Download, Open in editor…). */
  fileActions?: ReactNode;
  /** The rendered slides for `spec`, `'loading'`, or `{ error }`. */
  preview: PresentationPreview;
  /** The supplied images were rendered from this exact saved spec. Default true. */
  previewCurrent?: boolean;
  /** Asked once per renderable spec (and on Retry). */
  onRequestPreview: (spec: DeckSpec) => void;
  /** Who is looking at which slide — faces on the filmstrip thumbnails. */
  slideViewers?: PresentationEditorProps['slideViewers'];
  /** A follow request: select this slide without reporting it as navigation. */
  selectSlideRequest?: PresentationEditorProps['selectSlideRequest'];
  /** Every selection change, followed or explicit. */
  onSelectedSlideChange?: (slideId: string) => void;
  /** Explicit viewer navigation only (clicks, keys, filmstrip, outline). */
  onNavigateSlide?: (slideId: string) => void;
  /** Draw the parts — `{ toolbar, actions: null, surface, footer }`. */
  renderFrame: (frame: PresentationEditorFrame) => ReactNode;
  footer?: (context: PresentationFooterContext) => ReactNode;
  /**
   * Hand the reader to the page's conversation ("Chat & agent", in the
   * toolbar and while presenting). Absent (the default), the reader asks the
   * conversation-input registry (`useComposerFocus`, the same one the rich
   * composer registers with) for the agent composer, exactly as the portal's
   * reader did: enabled only while a composer is mounted to take the focus.
   * Pass it to route the handoff somewhere else.
   */
  onFocusConversation?: () => void;
  'data-testid'?: string;
}

interface ReaderSlide {
  id: string;
  title: string;
  svg?: string;
  slide?: DeckSlide;
  generated: boolean;
}

type Zoom = 'fit' | '75' | '100' | '125';
const ZOOM_OPTIONS: { value: Zoom; label: string }[] = [
  { value: 'fit', label: 'Fit' },
  { value: '75', label: '75%' },
  { value: '100', label: '100%' },
  { value: '125', label: '125%' },
];

const noop = () => {};

export function DeckReader({
  spec,
  compactReview = false,
  fileActions,
  preview,
  previewCurrent = true,
  onRequestPreview,
  slideViewers,
  selectSlideRequest,
  onSelectedSlideChange,
  onNavigateSlide,
  renderFrame,
  footer,
  onFocusConversation,
  'data-testid': testId = 'deck-reader',
}: DeckReaderProps) {
  const [selectedId, setSelectedId] = useState(spec.slides[0]?.id ?? '');
  const [outline, setOutline] = useState(false);
  const [notesChoice, setNotesChoice] = useState<boolean | null>(null);
  const notes = notesChoice ?? !compactReview;
  const [zoom, setZoom] = useState<Zoom>('fit');
  const [presenting, setPresenting] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState({ width: 800, height: 420 });
  const notesLabel = useId();
  const request = useRef(onRequestPreview);
  request.current = onRequestPreview;
  const reportSelection = useRef(onSelectedSlideChange);
  reportSelection.current = onSelectedSlideChange;
  const renderable = canSaveDeck(spec);
  const composerFocus = useComposerFocus();
  const focusConversation = onFocusConversation
    ?? (composerFocus.present ? () => { composerFocus.request({ mode: 'agent' }); } : undefined);

  useEffect(() => {
    if (renderable) request.current(spec);
  }, [spec, renderable]);

  const previewError = typeof preview === 'object' && 'error' in preview ? preview.error : undefined;
  const previewLoading = (!previewCurrent || preview === 'loading') && !previewError;
  const images = useMemo(
    () => (previewCurrent && typeof preview === 'object' && 'slides' in preview ? preview.slides : []),
    [preview, previewCurrent],
  );
  const slides = useMemo<ReaderSlide[]>(() => {
    const rendered = new Map(images.map((slide) => [slide.id, slide]));
    const own = new Set(spec.slides.map((slide) => slide.id));
    return [
      ...spec.slides.map((slide) => ({
        id: slide.id,
        title: slide.title || 'Untitled slide',
        slide,
        svg: rendered.get(slide.id)?.svg,
        generated: false,
      })),
      ...images
        .filter((slide) => slide.generated && !own.has(slide.id))
        .map((slide) => ({ id: slide.id, title: slide.title || 'Sources', svg: slide.svg, generated: true })),
    ];
  }, [spec.slides, images]);

  const index = Math.max(0, slides.findIndex((slide) => slide.id === selectedId));
  const current = slides[index];
  const select = (id: string) => {
    if (!slides.some((slide) => slide.id === id)) return;
    setSelectedId(id);
    onNavigateSlide?.(id);
  };

  useEffect(() => {
    if (current) reportSelection.current?.(current.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);
  useEffect(() => {
    if (selectSlideRequest && slides.some((slide) => slide.id === selectSlideRequest.slideId)) setSelectedId(selectSlideRequest.slideId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectSlideRequest?.key, slides]);
  useEffect(() => {
    const element = viewport.current;
    if (!element || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setAvailable({ width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const step = (next: number) => {
    const slide = slides[Math.min(slides.length - 1, Math.max(0, next))];
    if (slide) select(slide.id);
  };
  const navigateKeys = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]')) return;
    const next = event.key === 'ArrowRight' || event.key === 'PageDown' ? index + 1
      : event.key === 'ArrowLeft' || event.key === 'PageUp' ? index - 1
        : event.key === 'Home' ? 0
          : event.key === 'End' ? slides.length - 1
            : null;
    if (next !== null) {
      event.preventDefault();
      step(next);
    }
  };

  // Fit: the largest 16:9 frame the viewport holds (capped at 1024px).
  // A percentage: of the 960px design width.
  const stageWidth = zoom === 'fit'
    ? Math.max(120, Math.min(1024, available.width, (available.height * 16) / 9))
    : (960 * Number(zoom)) / 100;

  const toolbar = (
    <Inline
      gap="xs"
      align="center"
      wrap
      className="deck-reader-toolbar min-h-9 gap-1.5 text-xs max-[700px]:gap-1"
      role="toolbar"
      aria-label="Presentation viewing tools"
      data-testid={`${testId}-toolbar`}
    >
      {!compactReview && (
        <>
          <Button size="sm" variant={outline ? 'secondary' : 'primary'} onClick={() => setOutline(false)} aria-pressed={!outline}>Slides</Button>
          <Button size="sm" variant={outline ? 'primary' : 'secondary'} onClick={() => setOutline(true)} aria-pressed={outline}>Outline</Button>
          <span className="deck-reader-toolbar-divider mx-0.5 h-[18px] border-l border-border" aria-hidden="true" />
        </>
      )}
      <Button size="sm" variant="ghost" aria-label="Previous slide" disabled={index === 0} onClick={() => step(index - 1)}>←</Button>
      <Text size="xs" tabular className="deck-reader-position whitespace-nowrap" data-testid={`${testId}-position`}>
        Slide {current ? index + 1 : 0} of {slides.length}
      </Text>
      <Button size="sm" variant="ghost" aria-label="Next slide" disabled={index >= slides.length - 1} onClick={() => step(index + 1)}>→</Button>
      {!compactReview && (
        <>
          <Select
            size="sm"
            aria-label="Slide zoom"
            value={zoom}
            onChange={(event) => setZoom(event.target.value as Zoom)}
            options={ZOOM_OPTIONS}
            className="deck-reader-zoom w-auto"
          />
          <Button size="sm" variant="secondary" aria-pressed={notes} onClick={() => setNotesChoice(!notes)}>Notes</Button>
        </>
      )}
      <span className="deck-reader-toolbar-spacer flex-1" />
      {!compactReview && (
        <Button size="sm" variant="ghost" disabled={!focusConversation} onClick={() => focusConversation?.()} title="Focus the presentation conversation">
          Chat &amp; agent
        </Button>
      )}
      {compactReview && (
        <DropdownMenu
          trigger="View"
          triggerLabel="Presentation view options"
          triggerVariant="default"
          sections={[{
            items: [
              { label: 'Slide thumbnails', active: !outline, onSelect: () => setOutline(false) },
              { label: 'Outline', active: outline, onSelect: () => setOutline(true) },
              { label: 'Speaker notes', active: notes, onSelect: () => setNotesChoice(!notes) },
              { label: 'Fit slide', active: zoom === 'fit', onSelect: () => setZoom('fit') },
              { label: 'Actual size', active: zoom === '100', onSelect: () => setZoom('100') },
              { label: 'Chat & agent', disabled: !focusConversation, onSelect: () => focusConversation?.() },
            ],
          }]}
        />
      )}
      <Button size="sm" variant="primary" disabled={!current?.svg} onClick={() => setPresenting(true)}>Present</Button>
      {fileActions}
    </Inline>
  );

  const items: SlideListItem[] = spec.slides.map((slide) => ({
    slide,
    thumbnailSvg: slides.find((item) => item.id === slide.id)?.svg,
    uncited: false,
  }));
  const src = svgDataUri(current?.svg);

  const surface = (
    <div
      className="deck-reader-surface flex h-full min-h-[220px] gap-3 overflow-hidden px-3 py-2 max-[1199px]:px-2 max-[1199px]:py-1 max-[700px]:gap-1.5 max-[700px]:px-1"
      data-testid={testId}
    >
      <nav
        className="deck-reader-rail min-h-0 shrink-0 grow-0 basis-[172px] overflow-y-auto p-1 *:w-full max-[700px]:basis-32"
        aria-label={outline ? 'Presentation outline' : 'Slide thumbnails'}
      >
        {outline ? (
          <ol className="deck-reader-outline m-0 flex list-none flex-col gap-1 p-0">
            {slides.map((slide, at) => (
              <li key={slide.id}>
                <button
                  data-ui-part=""
                  type="button"
                  onClick={() => select(slide.id)}
                  aria-current={current?.id === slide.id ? 'true' : undefined}
                  className={cn(
                    'flex w-full cursor-pointer gap-2 rounded-md border border-solid border-transparent bg-transparent p-2 text-left font-[inherit] text-xs text-text-primary',
                    'hover:bg-surface-hover aria-[current=true]:border-primary aria-[current=true]:bg-primary/7',
                    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
                  )}
                >
                  <span className="deck-reader-outline-number shrink-0 tabular-nums text-text-tertiary">{at + 1}</span>
                  <span className="min-w-0">
                    <strong>{slide.title}</strong>
                    {slide.slide?.bullets && (
                      <span className="deck-reader-outline-detail mt-1 line-clamp-3 leading-[1.45] text-text-secondary">{slide.slide.bullets.join(' · ')}</span>
                    )}
                    {slide.generated && (
                      <span className="deck-reader-outline-detail mt-1 line-clamp-3 leading-[1.45] text-text-secondary">Generated from citations</span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <Filmstrip
            items={items}
            selectedId={current?.id ?? ''}
            onSelect={select}
            onMove={noop}
            onDuplicate={noop}
            onDelete={noop}
            readOnly
            canAdd={false}
            generatedItems={slides.filter((slide) => slide.generated).map((slide) => ({ id: slide.id, title: slide.title, thumbnailSvg: slide.svg }))}
            slideViewers={slideViewers}
            testIdPrefix={`${testId}-filmstrip`}
          />
        )}
      </nav>
      <main className="deck-reader-main flex min-h-0 min-w-0 flex-1 flex-col" onKeyDown={navigateKeys}>
        <div
          className={cn(
            'deck-reader-viewport flex min-h-[140px] flex-1 overflow-auto px-4 py-3 max-[1199px]:p-2 max-[700px]:px-2',
            'focus-visible:rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
          )}
          ref={viewport}
          tabIndex={0}
          aria-label="Slide canvas. Use arrow keys to change slides."
          data-testid={`${testId}-viewport`}
        >
          {current ? (
            // Runtime width: the fitted (or zoomed) frame, measured from the viewport.
            <div className="deck-reader-slide-frame m-auto shrink-0" style={{ width: stageWidth }}>
              <SlideStage
                className="deck-reader-stage [&>[role=figure]]:max-w-none"
                label={`Slide ${index + 1} of ${slides.length}: ${current.title}`}
                data-testid={`${testId}-stage`}
              >
                {src ? (
                  <img src={src} alt={current.title} className="h-full w-full object-contain" />
                ) : previewLoading ? (
                  <div data-testid={`${testId}-preview-loading`}>
                    <LoadingState label="Rendering the current version…" />
                  </div>
                ) : (
                  <div className="deck-reader-no-preview flex flex-col items-center gap-2 p-6">
                    <Text size="sm">{previewError ?? 'This slide’s preview is unavailable.'}</Text>
                    {renderable && <Button size="sm" variant="secondary" onClick={() => request.current(spec)}>Retry preview</Button>}
                  </div>
                )}
              </SlideStage>
            </div>
          ) : (
            <EmptyState title="No slides yet" body="This saved version contains no slides." />
          )}
        </div>
        {notes && (
          <div className="deck-reader-notes max-h-[120px] shrink-0 overflow-y-auto px-4 pt-1.5 max-[1199px]:px-2 max-[1199px]:pt-0.5">
            {current?.slide ? (
              <section
                data-ui-part=""
                className="deck-reader-note-panel flex flex-col gap-1 rounded-lg border border-solid border-border bg-surface px-3 py-2 max-[1199px]:gap-0.5 max-[1199px]:px-2 max-[1199px]:py-1"
                aria-labelledby={notesLabel}
              >
                <label htmlFor={`${notesLabel}-text`} id={notesLabel} className="max-[1199px]:leading-4">
                  <Text size="xs" weight="semibold" className="max-[1199px]:leading-4">Speaker notes</Text>
                </label>
                <Textarea
                  id={`${notesLabel}-text`}
                  value={current.slide.notes ?? ''}
                  readOnly
                  autoResize
                  minRows={2}
                  maxRows={4}
                  placeholder="No speaker notes on this slide."
                  aria-labelledby={notesLabel}
                  data-testid={`${testId}-notes`}
                  className={cn(
                    'min-h-[42px] border-transparent bg-transparent p-0 text-sm text-text-secondary',
                    // Narrow windows keep two readable lines; longer notes
                    // scroll and keep their whole value for selection/copy.
                    // `!`: autoResize writes the height inline.
                    'max-[1199px]:h-10! max-[1199px]:max-h-10! max-[1199px]:min-h-10 max-[1199px]:overflow-y-auto! max-[1199px]:leading-[18px]',
                  )}
                />
              </section>
            ) : current?.generated ? (
              <Text size="xs" tone="secondary">This generated Sources slide has no speaker notes.</Text>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );

  const context: PresentationFooterContext = {
    selectedSlide: current?.slide,
    selectedIndex: index,
    slideCount: slides.length,
    ...(current?.generated ? { selectedGeneratedSlide: { id: current.id, title: current.title, svg: current.svg } } : {}),
    selectSlide: select,
    markChanged: noop,
  };

  return (
    <>
      {renderFrame({ toolbar, actions: null, surface, footer: footer?.(context) ?? null })}
      <DeckPresentationDialog
        title={spec.title}
        slides={slides.map((slide) => ({ id: slide.id, title: slide.title, svg: slide.svg ?? '', generated: slide.generated }))}
        open={presenting}
        onClose={() => setPresenting(false)}
        slideIndex={index}
        onSlideChange={step}
        loading={previewLoading}
        error={previewError}
        onRetry={renderable ? () => request.current(spec) : undefined}
        onFocusConversation={focusConversation}
        testId={`${testId}-present`}
      />
    </>
  );
}

export default DeckReader;
