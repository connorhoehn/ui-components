// Editing a generated deck.
//
// `PresentationView` (2.342.0) is the reading end of the presentation
// generator. This is the writing end, and it is a real editor rather than a
// JSON box: the thing being edited is a `DeckSpec`, which is the contract the
// server validates and renders to `.pptx`, so every control here writes one
// field of that contract and nothing else.
//
// ## The preview is the generator's, not ours
//
// The centre pane shows the SVG the platform rendered from the same layout
// engine that writes the `.pptx` — `renderSlideSvg(spec, i)` — reached through
// the host's `onRequestPreview`. There is deliberately no second renderer in
// this component. A preview drawn here would be a different picture of the
// same spec, and the whole value of a preview is that it is not.
//
// While a render is in flight the previous slide image stays on screen rather
// than being replaced by a spinner. Typing into a title fires a preview
// request on every keystroke (debounced by the host), and a stage that blanks
// on each one is unusable.
//
// ## Why Save can be off
//
// Every slide cites at least one source. That is the generator's rule, not
// this component's preference — `renderPptx` refuses an uncited slide — so the
// editor shows it where it is broken (the rail row and the slide's own form)
// and disables Save while it holds. The alternative is a Save button that
// posts and comes back 400 with a server message about a slide the person
// cannot see from here.
//
// ## The agent box (`onInstruct`)
//
// With `onInstruct`, the editor is driven by instruction first and by fields
// second. Under the stage sits the chat's own composer, pinned to Agent mode
// (`PresentationAgentComposer`), with a "This slide / Whole deck" scope; the
// host turns the instruction into an edited spec and applies it through the
// ordinary `onChange`, so the preview redraws and Save is still the explicit
// act that writes a revision. The slide's full form folds into a collapsed
// "Edit slide details" disclosure, and the deck's title/subtitle/theme fold
// into one line — nothing on screen is a big form. Citations stay out of the
// fold as a compact chip row, because Save depends on them.
//
// Without `onInstruct` the editor is exactly what it was.
//
// ## Reordering
//
// Drag comes from `@dnd-kit`, the library's existing drag-and-drop primitive,
// loaded lazily — see the header of `SortableSlideList` for why that indirection
// is not optional. Move-up/move-down buttons are on every row regardless, and
// they are the reorder path for keyboards and for consumers without the
// optional peer installed.

import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';
import { Disclosure } from '../../ui/Disclosure';
import { IconButton } from '../../ui/IconButton';
import { InlineEditableText } from '../../forms/InlineEditableText';
import { Input } from '../../forms/Input';
import { Select } from '../../forms/Select';
import DotMeter from '../../shared/DotMeter';
import EmptyState from '../../shared/EmptyState';
import ErrorState from '../../shared/ErrorState';
import FormField from '../../shared/FormField';
import InlineAlert from '../../shared/InlineAlert';
import LoadingState from '../../shared/LoadingState';
import { SectionLabel } from '../../shared/SectionLabel';
import Tabs from '../../shared/Tabs';
import { Text } from '../../shared/Text';
import { PresentationView, type PresentationRevision } from '../PresentationView';
import { nextSlideIndex, slideNavigationIntent } from '../../../lib/slideNavigationKey';
import SlideForm from './SlideForm';
import SlideList from './SlideList';
import type { SlideListItem } from './SlideList';
import SlideSources, { type PresentationSourceOption } from './SlideSources';
import type { PresentationInstructScope } from './PresentationAgentComposer';
import { svgDataUri } from './svgPreview';
import {
  DECK_THEMES,
  MAX_SLIDES,
  MAX_SUBTITLE_CHARS,
  MAX_TITLE_CHARS,
  SLIDE_LAYOUTS,
  SLIDE_LAYOUT_LABELS,
  addSlide,
  duplicateSlide,
  moveSlide,
  nextRevisionLabel,
  removeSlide,
  replaceSlide,
  uncitedSlideIds,
  withLayoutDefaults,
  type DeckSpec,
  type DeckTheme,
  type SlideLayout,
} from './deckSpec';

const SortableSlideList = lazy(() => import('./SortableSlideList'));

/** Rendered when the composer's optional tiptap peers are not installed. */
function AgentComposerUnavailable({ testIdPrefix }: { testIdPrefix: string }) {
  return (
    <InlineAlert tone="warning" data-testid={`${testIdPrefix}-agent-unavailable`}>
      The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below.
    </InlineAlert>
  );
}

// Lazy for the same reason as the sortable list: see the header of
// `PresentationAgentComposer`. A failed import degrades to a notice rather
// than taking the editor down.
const PresentationAgentComposer = lazy(() =>
  import('./PresentationAgentComposer').catch(() => ({ default: AgentComposerUnavailable })),
);

export type { PresentationInstructScope } from './PresentationAgentComposer';

/** What the host's agent says it did. */
export interface PresentationInstructResult {
  /** One line, shown under the composer. */
  summary: string;
  /** Slides the edit touched; the rail marks them until the next instruction. */
  changedSlideIds?: string[];
}

export interface PresentationInstructContext {
  /** Present when `scope` is 'slide': the slide on the stage. */
  slideId?: string;
  scope: PresentationInstructScope;
}

/** One rendered slide image, as `POST /api/deck/preview` returns it. */
export interface PresentationPreviewSlide {
  id: string;
  /** SVG source, rendered by the same layout engine that writes the .pptx. */
  svg: string;
}

/**
 * What the host knows about the preview right now.
 *
 * Three states rather than an optional object: "not rendered yet" and "the
 * render failed" are different things to say, and collapsing them produces a
 * stage that looks the same whether the server is slow or broken.
 */
export type PresentationPreview =
  | { slides: readonly PresentationPreviewSlide[] }
  | 'loading'
  | { error: string };

export interface PresentationEditorRevision {
  id: string;
  /** `v3`, as the generator labelled it. */
  label: string;
  /** Already formatted by the host — this component does no clock maths. */
  createdAt?: string;
}

export interface PresentationEditorProps {
  /** Controlled. The host owns the spec; this component never holds a copy. */
  spec: DeckSpec;
  onChange: (spec: DeckSpec) => void;
  preview: PresentationPreview;
  /** Called whenever the spec changes. DEBOUNCE THIS — it is a render per call. */
  onRequestPreview: (spec: DeckSpec) => void;
  /** Resolves when the revision exists; rejects with the message to show. */
  onSaveRevision: (spec: DeckSpec) => Promise<unknown>;
  revisions: readonly PresentationEditorRevision[];
  activeRevisionId: string;
  onSelectRevision: (revisionId: string) => void;
  /** The deck's own inputs, offered in the source picker before anything is typed. */
  sources: readonly PresentationSourceOption[];
  /** The Documents explorer's search, so a citation names a real document. */
  onSearchSources?: (query: string) => PresentationSourceOption[] | Promise<PresentationSourceOption[]>;
  /** The `.pptx`, through the host's authorized route. No handler, no button. */
  onDownload?: () => void;
  /** Opens the same deck in the read-only presentation surface. */
  onOpenPresentationView?: () => void;
  readOnly?: boolean;
  /**
   * Turns on the agent box under the stage (see the file header). Resolve with
   * the agent's one-line summary once the host has applied the edit through
   * `onChange`; reject with the message to show when it could not.
   */
  onInstruct?: (instruction: string, ctx: PresentationInstructContext) => Promise<PresentationInstructResult | void>;
  /** One-tap instructions shown as chips beside the scope toggle. */
  instructHints?: readonly string[];
  /**
   * Puts an Undo button on the agent's summary line. The host owns the
   * snapshot; pass this only while it holds one.
   */
  onUndoInstruct?: () => void;
  className?: string;
  'data-testid'?: string;
}

function Chevron({ back }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('h-3.5 w-3.5', back && 'rotate-180')} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** True when the keystroke belongs to whatever the person is typing into. */

export function PresentationEditor({
  spec,
  onChange,
  preview,
  onRequestPreview,
  onSaveRevision,
  revisions,
  activeRevisionId,
  onSelectRevision,
  sources,
  onSearchSources,
  onDownload,
  onOpenPresentationView,
  readOnly = false,
  onInstruct,
  instructHints,
  onUndoInstruct,
  className,
  'data-testid': testId = 'presentation-editor',
}: PresentationEditorProps) {
  const [selectedId, setSelectedId] = useState<string>(() => spec.slides[0]?.id ?? '');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const agentMode = !!onInstruct;
  const [scope, setScope] = useState<PresentationInstructScope>('slide');
  const [instructing, setInstructing] = useState(false);
  const [agentSummary, setAgentSummary] = useState<string | null>(null);
  const [agentError, setAgentError] = useState<string | null>(null);
  const [changedIds, setChangedIds] = useState<ReadonlySet<string>>(() => new Set());

  // The last slide images that actually arrived. Held so a re-render in flight
  // does not blank the stage on every keystroke — see the file header.
  const [lastSlides, setLastSlides] = useState<readonly PresentationPreviewSlide[]>([]);
  useEffect(() => {
    if (typeof preview === 'object' && 'slides' in preview) setLastSlides(preview.slides);
  }, [preview]);

  // Ref rather than a dependency: the host commonly passes a fresh closure on
  // every render, and depending on it would fire a preview request per render
  // instead of per spec change.
  const requestPreview = useRef(onRequestPreview);
  requestPreview.current = onRequestPreview;
  const slides = spec.slides;
  const uncited = useMemo(() => new Set(uncitedSlideIds(spec)), [spec]);
  // Only a deck the server will accept is sent for a render. `/api/deck/preview`
  // validates the whole spec and rejects it outright while any slide cites
  // nothing — so asking anyway only produced a "could not be rendered" error
  // for a deck that was never broken, just unfinished (a blank deck starts
  // that way). The stage says what to do instead; see `stage` below.
  const renderable = uncited.size === 0;
  useEffect(() => {
    if (renderable) requestPreview.current(spec);
  }, [spec, renderable]);

  // A deep link, a delete, or a spec swapped underneath can all name a slide
  // that is not here. Falling back to the first beats rendering nothing.
  const selectedIndex = Math.max(slides.findIndex((slide) => slide.id === selectedId), 0);
  const selected = slides[selectedIndex];

  const previewById = useMemo(() => {
    const source =
      typeof preview === 'object' && 'slides' in preview ? preview.slides : lastSlides;
    return new Map(source.map((slide) => [slide.id, slide.svg]));
  }, [preview, lastSlides]);

  const items: SlideListItem[] = slides.map((slide) => ({
    slide,
    thumbnailSvg: previewById.get(slide.id),
    uncited: uncited.has(slide.id),
    changed: changedIds.has(slide.id),
  }));

  const select = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleMove = useCallback(
    (from: number, to: number) => {
      onChange(moveSlide(spec, from, to));
    },
    [onChange, spec],
  );

  const handleAdd = useCallback(() => {
    const next = addSlide(spec, selectedIndex);
    if (next === spec) return;
    onChange(next);
    setSelectedId(next.slides[selectedIndex + 1]!.id);
  }, [onChange, spec, selectedIndex]);

  const handleDuplicate = useCallback(
    (id: string) => {
      const next = duplicateSlide(spec, id);
      if (next === spec) return;
      const index = next.slides.findIndex((slide) => slide.id === id);
      onChange(next);
      setSelectedId(next.slides[index + 1]!.id);
    },
    [onChange, spec],
  );

  const handleDelete = useCallback(
    (id: string) => {
      const index = spec.slides.findIndex((slide) => slide.id === id);
      const next = removeSlide(spec, id);
      if (next === spec) return;
      onChange(next);
      // Land on the slide that took its place, or the new last one.
      setSelectedId(next.slides[Math.min(index, next.slides.length - 1)]!.id);
    },
    [onChange, spec],
  );

  const instruct = useCallback(
    async (instruction: string): Promise<boolean> => {
      if (!onInstruct || instructing) return false;
      const slideId = selected?.id;
      setInstructing(true);
      setAgentError(null);
      try {
        const result = await onInstruct(
          instruction,
          scope === 'slide' && slideId ? { slideId, scope } : { scope: 'deck' },
        );
        const changed = result?.changedSlideIds ?? [];
        setChangedIds(new Set(changed));
        setAgentSummary(result?.summary?.trim() || 'Done.');
        // A deck-wide edit lands the stage on what it changed, unless the
        // slide already there is one of them.
        if (scope === 'deck' && changed.length && (!slideId || !changed.includes(slideId))) {
          setSelectedId(changed[0]!);
        }
        return true;
      } catch (error: unknown) {
        setAgentError(error instanceof Error ? error.message : 'The agent could not make that change.');
        return false;
      } finally {
        setInstructing(false);
      }
    },
    [onInstruct, instructing, scope, selected?.id],
  );

  const undoInstruct = useCallback(() => {
    onUndoInstruct?.();
    setAgentSummary(null);
    setChangedIds(new Set());
  }, [onUndoInstruct]);

  const blockingCount = uncited.size;
  const canSave = !readOnly && slides.length > 0 && blockingCount === 0 && !saving;

  const save = useCallback(() => {
    if (!canSave) return;
    setSaving(true);
    setSaveError(null);
    void Promise.resolve(onSaveRevision(spec))
      .catch((error: unknown) => {
        setSaveError(error instanceof Error ? error.message : 'The revision could not be saved.');
      })
      .finally(() => setSaving(false));
  }, [canSave, onSaveRevision, spec]);

  // ⌘S / Ctrl+S and ←/→. Bound to the window rather than to a wrapper's
  // onKeyDown: the person's focus is normally inside a text field deep in the
  // form, and a save shortcut that only works when the shell has focus is a
  // shortcut nobody's fingers ever find.
  const step = useCallback(
    (delta: number) => {
      const next = slides[selectedIndex + delta];
      if (next) setSelectedId(next.id);
    },
    [slides, selectedIndex],
  );

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        save();
        return;
      }
      // Same intent vocabulary as the reading surface (`PresentationView`),
      // through the same helper, so ←/→/Home/End mean one thing in this
      // component whichever end of it you are on.
      const intent = slideNavigationIntent(event);
      if (!intent) return;
      event.preventDefault();
      const target = nextSlideIndex(intent, selectedIndex + 1, slides.length);
      if (target !== selectedIndex + 1) step(target - (selectedIndex + 1));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [save, step, selectedIndex, slides.length]);

  // -------------------------------------------------------------------------
  // Read-only: the reading surface, not a greyed-out form
  // -------------------------------------------------------------------------

  if (readOnly) {
    const viewRevisions: PresentationRevision[] = (
      revisions.length > 0 ? revisions : [{ id: activeRevisionId, label: 'v1' }]
    ).map((revision) => ({
      id: revision.id,
      label: revision.label,
      ...(revision.createdAt ? { createdAt: revision.createdAt } : {}),
      // Only the active revision's spec is in hand. An older one renders its
      // empty state rather than this one's slides under another version's
      // label, which would be a lie the reader cannot detect.
      slides:
        revision.id === activeRevisionId
          ? slides.map((slide, index) => {
              const uri = svgDataUri(previewById.get(slide.id));
              return {
                id: slide.id,
                index: index + 1,
                title: slide.title || 'Untitled slide',
                ...(uri ? { preview: <img src={uri} alt={slide.title || `Slide ${index + 1}`} /> } : {}),
              };
            })
          : [],
    }));

    return (
      <PresentationView
        title={spec.title}
        revisions={viewRevisions}
        revisionId={activeRevisionId}
        onRevisionChange={onSelectRevision}
        slideIndex={selectedIndex + 1}
        onSlideChange={(index) => {
          const slide = slides[index - 1];
          if (slide) setSelectedId(slide.id);
        }}
        {...(onDownload ? { onDownload } : {})}
        className={className}
        data-testid={`${testId}-readonly`}
      />
    );
  }

  // -------------------------------------------------------------------------
  // Editing
  // -------------------------------------------------------------------------

  const stage = (() => {
    // Checked before any preview state: while a slide cites nothing the host
    // was not asked for a render (see `renderable`), so a loading or error
    // state here would be about an older spec, not this one.
    if (selected && uncited.has(selected.id)) {
      return (
        <EmptyState
          size="sm"
          title="Add a source to preview this slide"
          description="A slide renders once it cites the document or transcript it draws from. Pick one under Sources used."
          testId={`${testId}-preview-needs-source`}
        />
      );
    }
    const uriForSelected = selected ? svgDataUri(previewById.get(selected.id)) : undefined;
    if (!renderable && !uriForSelected) {
      return (
        <EmptyState
          size="sm"
          title="The preview waits for every slide's source"
          description="The deck renders as a whole, so it draws once each slide cites what it draws from."
          testId={`${testId}-preview-needs-source`}
        />
      );
    }
    if (preview === 'loading' && previewById.size === 0) {
      return <LoadingState label="Rendering the deck…" testId={`${testId}-preview-loading`} />;
    }
    if (renderable && typeof preview === 'object' && 'error' in preview) {
      return (
        <ErrorState
          title="This deck could not be rendered"
          description={preview.error}
          actionLabel="Try again"
          onAction={() => onRequestPreview(spec)}
          testId={`${testId}-preview-error`}
        />
      );
    }
    const uri = uriForSelected;
    if (!uri) {
      return (
        <Text className="text-[13px] text-text-tertiary" data-testid={`${testId}-no-preview`}>
          This slide has not been rendered yet.
        </Text>
      );
    }
    return (
      <img
        src={uri}
        alt={selected!.title || `Slide ${selectedIndex + 1}`}
        className="max-h-full max-w-full object-contain"
        data-testid={`${testId}-stage-image`}
      />
    );
  })();

  const revisionItems = revisions.map((revision) => ({ id: revision.id, label: revision.label }));

  const revisionControls = (
    <div className="flex flex-wrap items-center gap-2">
      {revisionItems.length > 0 && (
        <Tabs
          items={revisionItems}
          value={activeRevisionId}
          onValueChange={onSelectRevision}
          variant="segmented"
          size="sm"
          aria-label="Revision"
          idPrefix={`${testId}-revisions`}
        />
      )}
      <Button
        variant="primary"
        size="sm"
        disabled={!canSave}
        onClick={save}
        data-testid={`${testId}-save`}
      >
        {saving ? 'Saving…' : `Save as ${nextRevisionLabel(revisions)}`}
      </Button>
      {onDownload && (
        <Button variant="secondary" size="sm" onClick={onDownload} data-testid={`${testId}-download`}>
          Download .pptx
        </Button>
      )}
      {onOpenPresentationView && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenPresentationView}
          data-testid={`${testId}-open-view`}
        >
          Open in presentation view
        </Button>
      )}
    </div>
  );

  return (
    <div
      className={cn('flex min-h-0 flex-col gap-3 p-4', className)}
      data-testid={testId}
      // Escape-free; the shortcuts are on the window (see above). This handler
      // only stops a form Enter from submitting an ancestor <form> the host may
      // have wrapped the editor in.
      onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && (event.target as HTMLElement).tagName === 'INPUT') {
          event.preventDefault();
        }
      }}
    >
      {agentMode ? (
        // One line: the deck is named and themed here, and edited by asking.
        <div className="flex flex-wrap items-center justify-between gap-2" data-testid={`${testId}-deck-line`}>
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
            <InlineEditableText
              value={spec.title}
              required
              label="Deck title"
              maxLength={MAX_TITLE_CHARS}
              onCommit={(title) => onChange({ ...spec, title })}
              data-testid={`${testId}-deck-title`}
            />
            <InlineEditableText
              value={spec.subtitle ?? ''}
              label="Subtitle"
              placeholder="Add a subtitle"
              tone="muted"
              maxLength={MAX_SUBTITLE_CHARS}
              onCommit={(subtitle) => onChange({ ...spec, subtitle: subtitle || undefined })}
              data-testid={`${testId}-deck-subtitle`}
            />
            <Select
              size="sm"
              variant="pill"
              aria-label="Theme"
              value={spec.theme ?? 'product'}
              options={DECK_THEMES.map((theme) => ({ value: theme, label: `${theme} theme` }))}
              onChange={(event) => onChange({ ...spec, theme: event.target.value as DeckTheme })}
              data-testid={`${testId}-deck-theme`}
            />
          </div>
          {revisionControls}
        </div>
      ) : (
        // Deck-level fields and the revision controls.
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)]">
            <FormField label="Deck title" required>
              {(wiring) => (
                <Input
                  {...wiring}
                  value={spec.title}
                  maxLength={MAX_TITLE_CHARS}
                  onChange={(event) => onChange({ ...spec, title: event.target.value })}
                  data-testid={`${testId}-deck-title`}
                />
              )}
            </FormField>
            <FormField label="Subtitle">
              {(wiring) => (
                <Input
                  {...wiring}
                  value={spec.subtitle ?? ''}
                  maxLength={MAX_SUBTITLE_CHARS}
                  onChange={(event) => onChange({ ...spec, subtitle: event.target.value || undefined })}
                  data-testid={`${testId}-deck-subtitle`}
                />
              )}
            </FormField>
            <FormField label="Theme">
              {(wiring) => (
                <Select
                  {...wiring}
                  value={spec.theme ?? 'product'}
                  options={DECK_THEMES.map((theme) => ({ value: theme, label: theme }))}
                  onChange={(event) => onChange({ ...spec, theme: event.target.value as DeckTheme })}
                  data-testid={`${testId}-deck-theme`}
                />
              )}
            </FormField>
          </div>

          {revisionControls}
        </div>
      )}

      {blockingCount > 0 && (
        <InlineAlert tone="warning" data-testid={`${testId}-uncited-warning`}>
          {blockingCount === 1
            ? '1 slide cites no source. Every slide names at least one — Save is off until it does.'
            : `${blockingCount} slides cite no source. Every slide names at least one — Save is off until they do.`}
        </InlineAlert>
      )}

      {saveError && (
        <InlineAlert tone="error" onDismiss={() => setSaveError(null)} data-testid={`${testId}-save-error`}>
          {saveError}
        </InlineAlert>
      )}

      <div className="flex min-h-0 flex-1 flex-col gap-3 md:flex-row">
        {/* Rail */}
        <div className="flex min-w-0 flex-col gap-2 md:w-72" data-testid={`${testId}-rail`}>
          <div className="flex items-center justify-between gap-2">
            <SectionLabel as="div">Slides</SectionLabel>
            <DotMeter
              value={slides.length / MAX_SLIDES}
              segments={10}
              showPercent={false}
              tone="surface"
              note={`${slides.length} / ${MAX_SLIDES}`}
              data-testid={`${testId}-slide-meter`}
            />
          </div>

          <div className="flex items-end gap-2">
            <FormField label="Layout" className="min-w-0 flex-1">
              {(wiring) => (
                <Select
                  {...wiring}
                  size="sm"
                  value={selected?.layout ?? 'bullets'}
                  disabled={!selected}
                  options={SLIDE_LAYOUTS.map((layout) => ({
                    value: layout,
                    label: SLIDE_LAYOUT_LABELS[layout],
                  }))}
                  onChange={(event) => {
                    if (!selected) return;
                    onChange(
                      replaceSlide(spec, withLayoutDefaults(selected, event.target.value as SlideLayout)),
                    );
                  }}
                  data-testid={`${testId}-layout`}
                />
              )}
            </FormField>
            <Button
              variant="secondary"
              size="sm"
              disabled={slides.length >= MAX_SLIDES}
              onClick={handleAdd}
              data-testid={`${testId}-add-slide`}
            >
              Add slide
            </Button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <Suspense
              fallback={
                <SlideList
                  items={items}
                  selectedId={selected?.id ?? ''}
                  onSelect={select}
                  onMove={handleMove}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                  canDuplicate={slides.length < MAX_SLIDES}
                  testIdPrefix={`${testId}-slide`}
                />
              }
            >
              <SortableSlideList
                items={items}
                selectedId={selected?.id ?? ''}
                onSelect={select}
                onMove={handleMove}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                canDuplicate={slides.length < MAX_SLIDES}
                testIdPrefix={`${testId}-slide`}
              />
            </Suspense>
          </div>
        </div>

        {/* Stage + form */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div
            className="flex min-h-[14rem] items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-hover/40 p-2"
            data-testid={`${testId}-stage`}
          >
            {stage}
          </div>

          <div className="flex items-center justify-center gap-2">
            <IconButton
              aria-label="Previous slide"
              variant="ghost"
              size="sm"
              icon={<Chevron back />}
              disabled={selectedIndex <= 0}
              onClick={() => step(-1)}
              data-testid={`${testId}-previous`}
            />
            <Text className="text-[13px] text-text-secondary" data-testid={`${testId}-position`}>
              {`Slide ${slides.length === 0 ? 0 : selectedIndex + 1} of ${slides.length}`}
            </Text>
            <IconButton
              aria-label="Next slide"
              variant="ghost"
              size="sm"
              icon={<Chevron />}
              disabled={selectedIndex >= slides.length - 1}
              onClick={() => step(1)}
              data-testid={`${testId}-next`}
            />
          </div>

          {agentMode && selected && (
            <>
              <Suspense
                fallback={
                  <Text className="text-[12px] text-text-tertiary" data-testid={`${testId}-agent-loading`}>
                    Loading the agent…
                  </Text>
                }
              >
                <PresentationAgentComposer
                  scope={scope}
                  onScopeChange={setScope}
                  slideLabel={`slide ${selectedIndex + 1}`}
                  busy={instructing}
                  onSubmit={instruct}
                  {...(instructHints?.length ? { suggestions: instructHints } : {})}
                  testIdPrefix={testId}
                />
              </Suspense>

              {agentError && (
                <InlineAlert tone="error" onDismiss={() => setAgentError(null)} data-testid={`${testId}-agent-error`}>
                  {agentError}
                </InlineAlert>
              )}

              {agentSummary && !agentError && (
                <div className="flex min-w-0 flex-wrap items-center gap-2" role="status" data-testid={`${testId}-agent-summary`}>
                  <Text as="span" className="min-w-0 flex-1 truncate text-[12px] text-success-fg" title={agentSummary}>
                    {`✓ ${agentSummary}`}
                  </Text>
                  {changedIds.size > 0 && (
                    <Text as="span" className="text-[11px] text-text-tertiary">
                      {changedIds.size === 1 ? '1 slide marked in the rail' : `${changedIds.size} slides marked in the rail`}
                    </Text>
                  )}
                  {onUndoInstruct && (
                    <Button variant="ghost" size="sm" onClick={undoInstruct} data-testid={`${testId}-agent-undo`}>
                      Undo
                    </Button>
                  )}
                </div>
              )}

              <SlideSources
                compact
                sources={selected.sources}
                onChange={(next) => onChange(replaceSlide(spec, { ...selected, sources: next }))}
                options={sources}
                onSearchSources={onSearchSources}
                testIdPrefix={`${testId}-slide`}
              />

              <Disclosure
                summary="Edit slide details"
                density="compact"
                data-testid={`${testId}-details`}
              >
                <SlideForm
                  slide={selected}
                  onChange={(slide) => onChange(replaceSlide(spec, slide))}
                  sources={sources}
                  onSearchSources={onSearchSources}
                  showSources={false}
                  testIdPrefix={`${testId}-slide`}
                />
              </Disclosure>
            </>
          )}

          {!agentMode && selected && (
            <SlideForm
              slide={selected}
              onChange={(slide) => onChange(replaceSlide(spec, slide))}
              sources={sources}
              onSearchSources={onSearchSources}
              testIdPrefix={`${testId}-slide`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PresentationEditor;
