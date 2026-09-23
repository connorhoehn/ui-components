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
// ## Layout (2.363.0)
//
// Toolbar (`SlidesToolbar`) on top; a filmstrip of numbered 16:9 thumbnails
// (`Filmstrip`) on the left; the selected slide on a centred 16:9 frame
// (`SlideStage`); its speaker notes directly under it (`SpeakerNotes`); then
// the agent box, the citation chips and the folded slide form. `renderFrame`
// hands the toolbar, the Save controls, the surface and the footer to a
// frame such as `EditorShell` instead of stacking them here, and `footer`
// replaces the built-in agent box with the host's own composer dock.
//
// ## Reordering
//
// Drag comes from `@dnd-kit`, the library's existing drag-and-drop primitive,
// loaded lazily — see the header of `SortableSlideList` for why that indirection
// is not optional. Each thumbnail's ⋯ menu has Move up / Move down, and
// Alt+↑/↓ on a focused thumbnail moves it: the reorder paths for keyboards and
// for consumers without the optional peer installed.

import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
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
import Tabs from '../../shared/Tabs';
import { Text } from '../../shared/Text';
import { PresentationView, type PresentationRevision } from '../PresentationView';
import { ComposerDockPlacementContext, FloatingComposerDock } from '../FloatingComposerDock';
import { isTextEntryTarget, nextSlideIndex, slideNavigationIntent } from '../../../lib/slideNavigationKey';
import { Filmstrip } from './Filmstrip';
import type { PresenceUser } from '../../shared/PresenceAvatars';
import SlideForm from './SlideForm';
import type { SlideListItem } from './SlideList';
import SlideSources, { type PresentationSourceOption } from './SlideSources';
import { SlideStage } from './SlideStage';
import { SlidesToolbar } from './SlidesToolbar';
import { SpeakerNotes } from './SpeakerNotes';
import type { PresentationInstructScope } from './PresentationAgentComposer';
import { svgDataUri } from './svgPreview';
import {
  MAX_SLIDES,
  MAX_SUBTITLE_CHARS,
  MAX_TITLE_CHARS,
  addSlide,
  duplicateSlide,
  moveSlide,
  nextRevisionLabel,
  removeSlide,
  replaceSlide,
  uncitedSlideIds,
  withLayoutDefaults,
  type DeckSlide,
  type DeckSpec,
  type SlideLayout,
} from './deckSpec';

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
  /** The slide's title as the renderer named it. Used for a `generated` slide, which has no spec entry. */
  title?: string;
  /**
   * A slide the renderer APPENDS to the deck — the Sources slide it builds
   * from every citation — rather than one the spec holds. Since 2.384.1 it is
   * a real slide of the deck: it is in the filmstrip (locked, numbered after
   * the deck's own), on the stage, in the pager's count and in Present, and it
   * is what the revision's `slideCount` and the `.pptx` already contained. The
   * editor cannot change it: it changes as the slides' citations do.
   */
  generated?: boolean;
}

/** A `generated` preview slide, resolved: the renderer's title and image, in deck order after the spec's slides. */
export interface PresentationGeneratedSlide {
  id: string;
  title: string;
  svg?: string;
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

/** What a `footer` render function is told. */
export interface PresentationFooterContext {
  /** The slide on the stage — one of the spec's. Undefined while a generated slide is on the stage. */
  selectedSlide: DeckSlide | undefined;
  /** The generated slide on the stage (the Sources slide), when that is what is selected. Since 2.384.1. */
  selectedGeneratedSlide?: PresentationGeneratedSlide;
  /** 0-based, over the whole deck: the spec's slides, then the generated ones. */
  selectedIndex: number;
  /** The whole deck — the spec's slides plus the generated ones — the number every other surface shows. */
  slideCount: number;
  selectSlide: (slideId: string) => void;
  /** Marks slides "Edited by agent" in the filmstrip until the next call. */
  markChanged: (slideIds: string[]) => void;
}

/** The parts `renderFrame` receives. */
export interface PresentationEditorFrame {
  /** `SlidesToolbar` — New slide, Layout, Insert, Theme, Undo/Redo, Present. */
  toolbar: ReactNode;
  /** Revision tabs, Save as vN (gated on citations), Download .pptx. */
  actions: ReactNode;
  /** Deck title line, warnings, filmstrip, 16:9 stage, speaker notes, sources. */
  surface: ReactNode;
  /** The host's `footer`, or the built-in agent box in a dock, or null. */
  footer: ReactNode;
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
  /**
   * Opens the same deck in the read-only presentation surface — the toolbar's
   * Present. Called with the slide on the stage so the view can start there.
   */
  onOpenPresentationView?: (at?: { slideId: string; slideIndex: number }) => void;
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
  /**
   * Slides the agent is working on right now — `useDeckReviseStatus(documentId)
   * .generatingSlideIds`. Their thumbnails and the stage say `Generating…`; an
   * id not in the deck is a slide being created and shows as a placeholder at
   * the end of the filmstrip.
   */
  generatingSlideIds?: readonly string[];
  /**
   * Slide id → the other people whose selected slide it is (the host's live
   * presence). Shown as small avatars on the filmstrip thumbnails. Since 2.371.0.
   */
  slideViewers?: Readonly<Record<string, readonly PresenceUser[]>>;
  /**
   * Put this slide on the stage — jump to or follow someone. Acted on when
   * `key` changes (so jumping to the same slide twice works); an id not in the
   * deck is ignored. Since 2.371.0.
   */
  selectSlideRequest?: { slideId: string; key: string | number } | null;
  /**
   * The foot of the editor — the host's composer dock, normally a
   * `FloatingComposerDock`. It is pinned as the editor column's last row
   * (normal flow, `ComposerDockPlacementContext` = `pinned`) while only the
   * content above it scrolls. Replaces the built-in
   * agent box (`onInstruct`) when given. A function receives the slide on the
   * stage and a way to mark the slides an edit changed.
   */
  footer?: ReactNode | ((ctx: PresentationFooterContext) => ReactNode);
  /**
   * Hand the editor's parts to a frame — normally `EditorShell` — instead of
   * stacking them: `toolbar` for its toolbar row, `actions` (revisions, Save,
   * Download) for its head, `surface` as its child, `footer` for its floating
   * dock slot. Without `footer`, the built-in agent box arrives in `footer`
   * already wrapped in a `FloatingComposerDock`.
   */
  renderFrame?: (frame: PresentationEditorFrame) => ReactNode;
  /** The slide on the stage changed (selection, delete, an agent edit landing). */
  onSelectedSlideChange?: (slideId: string, index: number) => void;
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

/**
 * Undo/redo over the edits THIS editor made.
 *
 * The spec is controlled, so the history is a stack of specs the editor
 * handed to `onChange`. A spec that arrives from anywhere else — a revision
 * switch, the agent's edit (it has its own Undo), a reload — is not one of
 * ours, and the stack is dropped rather than letting Undo jump back across it.
 * Keystrokes within 800ms fold into one step, so Undo takes back a word, not
 * a letter.
 */
function useSpecHistory(spec: DeckSpec, onChange: (spec: DeckSpec) => void) {
  const [history, setHistory] = useState<{ past: DeckSpec[]; future: DeckSpec[] }>({ past: [], future: [] });
  const expected = useRef<DeckSpec | null>(null);
  const lastEditAt = useRef(0);

  useEffect(() => {
    if (expected.current === spec) {
      expected.current = null;
      return;
    }
    expected.current = null;
    setHistory((current) => (current.past.length || current.future.length ? { past: [], future: [] } : current));
  }, [spec]);

  const edit = useCallback(
    (next: DeckSpec) => {
      if (next === spec) return;
      const now = Date.now();
      const fold = now - lastEditAt.current < 800;
      lastEditAt.current = now;
      setHistory((current) => ({
        past: fold && current.past.length ? current.past : [...current.past.slice(-49), spec],
        future: [],
      }));
      expected.current = next;
      onChange(next);
    },
    [spec, onChange],
  );

  const undo = useCallback(() => {
    const previous = history.past[history.past.length - 1];
    if (!previous) return;
    setHistory({ past: history.past.slice(0, -1), future: [spec, ...history.future] });
    lastEditAt.current = 0;
    expected.current = previous;
    onChange(previous);
  }, [history, spec, onChange]);

  const redo = useCallback(() => {
    const next = history.future[0];
    if (!next) return;
    setHistory({ past: [...history.past, spec], future: history.future.slice(1) });
    lastEditAt.current = 0;
    expected.current = next;
    onChange(next);
  }, [history, spec, onChange]);

  return { edit, undo, redo, canUndo: history.past.length > 0, canRedo: history.future.length > 0 };
}

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
  generatingSlideIds,
  slideViewers,
  selectSlideRequest,
  footer,
  renderFrame,
  onSelectedSlideChange,
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
  const { edit, undo, redo, canUndo, canRedo } = useSpecHistory(spec, onChange);

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

  const previewSlides = typeof preview === 'object' && 'slides' in preview ? preview.slides : lastSlides;
  const previewById = useMemo(
    () => new Map(previewSlides.map((slide) => [slide.id, slide.svg])),
    [previewSlides],
  );
  // The slides the renderer appended (the Sources slide): real slides of the
  // deck, after the spec's own, that the editor shows and counts but cannot
  // change. Only what the host MARKED as generated — a stale render of a
  // deleted slide is not one, and never becomes a locked thumb.
  const generatedSlides = useMemo<PresentationGeneratedSlide[]>(() => {
    const own = new Set(slides.map((slide) => slide.id));
    return previewSlides
      .filter((slide) => slide.generated && !own.has(slide.id))
      .map((slide, index) => ({ id: slide.id, title: slide.title || `Generated slide ${index + 1}`, svg: slide.svg }));
  }, [previewSlides, slides]);
  const totalSlides = slides.length + generatedSlides.length;

  // A deep link, a delete, or a spec swapped underneath can all name a slide
  // that is not here. Falling back to the first beats rendering nothing.
  const ownIndex = slides.findIndex((slide) => slide.id === selectedId);
  const generatedIndex = ownIndex === -1 ? generatedSlides.findIndex((slide) => slide.id === selectedId) : -1;
  const selectedIndex = ownIndex !== -1 ? ownIndex : generatedIndex !== -1 ? slides.length + generatedIndex : 0;
  const selected = ownIndex !== -1 || generatedIndex === -1 ? slides[selectedIndex] : undefined;
  const selectedGenerated = generatedIndex !== -1 ? generatedSlides[generatedIndex] : undefined;
  const currentId = selected?.id ?? selectedGenerated?.id;
  const currentTitle = selected ? selected.title || 'Untitled slide' : selectedGenerated?.title;
  /** Every slide's id in deck order — what ←/→, the pager and Present step through. */
  const orderedIds = useMemo(
    () => [...slides.map((slide) => slide.id), ...generatedSlides.map((slide) => slide.id)],
    [slides, generatedSlides],
  );
  // Where an inserted slide goes: after the selected one, or after the last of
  // the deck's own when a generated slide is on the stage (nothing goes after those).
  const insertAfter = Math.min(selectedIndex, slides.length - 1);

  const selectedChanged = useRef(onSelectedSlideChange);
  selectedChanged.current = onSelectedSlideChange;
  useEffect(() => {
    if (currentId) selectedChanged.current?.(currentId, selectedIndex);
  }, [currentId, selectedIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // What the agent is rewriting: the host's live ids (`useDeckReviseStatus`)
  // plus the slide the built-in agent box is working on right now.
  const generating = useMemo(() => {
    const ids = new Set(generatingSlideIds ?? []);
    if (instructing && scope === 'slide' && selected) ids.add(selected.id);
    return [...ids];
  }, [generatingSlideIds, instructing, scope, selected]);
  const selectedGenerating = !!selected && generating.includes(selected.id);

  const items: SlideListItem[] = slides.map((slide) => ({
    slide,
    thumbnailSvg: previewById.get(slide.id),
    uncited: uncited.has(slide.id),
    changed: changedIds.has(slide.id),
  }));

  const select = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  // The host asks for a slide (jump / follow): honoured once per `key`.
  const requestKey = selectSlideRequest?.key;
  const requestSlideId = selectSlideRequest?.slideId;
  useEffect(() => {
    if (requestSlideId && spec.slides.some((slide) => slide.id === requestSlideId)) setSelectedId(requestSlideId);
  }, [requestKey, requestSlideId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMove = useCallback(
    (from: number, to: number) => {
      edit(moveSlide(spec, from, to));
    },
    [edit, spec],
  );

  const handleAdd = useCallback(
    (layout?: SlideLayout) => {
      const next = addSlide(spec, insertAfter, layout);
      if (next === spec) return;
      edit(next);
      setSelectedId(next.slides[insertAfter + 1]!.id);
    },
    [edit, spec, insertAfter],
  );

  const handleDuplicate = useCallback(
    (id: string) => {
      const next = duplicateSlide(spec, id);
      if (next === spec) return;
      const index = next.slides.findIndex((slide) => slide.id === id);
      edit(next);
      setSelectedId(next.slides[index + 1]!.id);
    },
    [edit, spec],
  );

  const handleDelete = useCallback(
    (id: string) => {
      const index = spec.slides.findIndex((slide) => slide.id === id);
      const next = removeSlide(spec, id);
      if (next === spec) return;
      edit(next);
      // Land on the slide that took its place, or the new last one.
      setSelectedId(next.slides[Math.min(index, next.slides.length - 1)]!.id);
    },
    [edit, spec],
  );

  const editSlide = useCallback((slide: DeckSlide) => edit(replaceSlide(spec, slide)), [edit, spec]);

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

  // ⌘S / Ctrl+S, ⌘Z / ⇧⌘Z and ←/→. Bound to the window rather than to a
  // wrapper's onKeyDown: the person's focus is normally inside a text field
  // deep in the form, and a save shortcut that only works when the shell has
  // focus is a shortcut nobody's fingers ever find. Undo is the exception — in
  // a text field ⌘Z belongs to the field.
  const step = useCallback(
    (delta: number) => {
      const next = orderedIds[selectedIndex + delta];
      if (next) setSelectedId(next);
    },
    [orderedIds, selectedIndex],
  );

  useEffect(() => {
    if (readOnly) return undefined;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey;
      if (mod && event.key.toLowerCase() === 's') {
        event.preventDefault();
        save();
        return;
      }
      if (mod && event.key.toLowerCase() === 'z' && !isTextEntryTarget(event.target)) {
        event.preventDefault();
        if (event.shiftKey) redo();
        else undo();
        return;
      }
      // Same intent vocabulary as the reading surface (`PresentationView`),
      // through the same helper, so ←/→/Home/End mean one thing in this
      // component whichever end of it you are on.
      const intent = slideNavigationIntent(event);
      if (!intent) return;
      event.preventDefault();
      const target = nextSlideIndex(intent, selectedIndex + 1, totalSlides);
      if (target !== selectedIndex + 1) step(target - (selectedIndex + 1));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [readOnly, save, undo, redo, step, selectedIndex, totalSlides]);

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
          ? [
              ...slides.map((slide, index) => {
                const uri = svgDataUri(previewById.get(slide.id));
                return {
                  id: slide.id,
                  index: index + 1,
                  title: slide.title || 'Untitled slide',
                  ...(uri ? { preview: <img src={uri} alt={slide.title || `Slide ${index + 1}`} /> } : {}),
                };
              }),
              // The generated slides read the same as they present: after the
              // deck's own, numbered on.
              ...generatedSlides.map((slide, index) => {
                const uri = svgDataUri(slide.svg);
                return {
                  id: slide.id,
                  index: slides.length + index + 1,
                  title: slide.title,
                  ...(uri ? { preview: <img src={uri} alt={slide.title} /> } : {}),
                };
              }),
            ]
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
          const id = orderedIds[index - 1];
          if (id) setSelectedId(id);
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

  const stageContent = (() => {
    // A generated slide has exactly one picture — the renderer's — and no form
    // behind it; the stage shows that or says it is not drawn yet.
    if (selectedGenerated) {
      const uri = svgDataUri(selectedGenerated.svg);
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
          alt={selectedGenerated.title}
          className="h-full w-full object-contain"
          data-testid={`${testId}-stage-image`}
        />
      );
    }
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
        className="h-full w-full object-contain"
        data-testid={`${testId}-stage-image`}
      />
    );
  })();

  const revisionItems = revisions.map((revision) => ({ id: revision.id, label: revision.label }));

  const REVISION_TABS_MAX = 5;
  const revisionControls = (
    <div className="flex flex-wrap items-center gap-2" data-testid={`${testId}-revision-controls`}>
      {revisionItems.length > REVISION_TABS_MAX ? (
        // Past a handful, one segmented tab per revision is a row of v1…v15
        // that crowds the title into a column; a picker holds any number.
        <Select
          size="sm"
          aria-label="Revision"
          value={activeRevisionId}
          onChange={(event) => onSelectRevision?.(event.target.value)}
          options={[...revisionItems].reverse().map((item, index) => ({ value: item.id, label: index === 0 ? `${item.label} · latest` : item.label }))}
          className="w-auto"
          data-testid={`${testId}-revision-select`}
        />
      ) : revisionItems.length > 0 && (
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
    </div>
  );

  // Framed (inside EditorShell) the fields are inline too: labelled boxes cost
  // the stage a row it needs at 720 px tall.
  const deckFields = agentMode || renderFrame ? (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
      <InlineEditableText
        value={spec.title}
        required
        label="Deck title"
        maxLength={MAX_TITLE_CHARS}
        onCommit={(title) => edit({ ...spec, title })}
        data-testid={`${testId}-deck-title`}
      />
      <InlineEditableText
        value={spec.subtitle ?? ''}
        label="Subtitle"
        placeholder="Add a subtitle"
        tone="muted"
        maxLength={MAX_SUBTITLE_CHARS}
        onCommit={(subtitle) => edit({ ...spec, subtitle: subtitle || undefined })}
        data-testid={`${testId}-deck-subtitle`}
      />
    </div>
  ) : (
    <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
      <FormField label="Deck title" required>
        {(wiring) => (
          <Input
            {...wiring}
            value={spec.title}
            maxLength={MAX_TITLE_CHARS}
            onChange={(event) => edit({ ...spec, title: event.target.value })}
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
            onChange={(event) => edit({ ...spec, subtitle: event.target.value || undefined })}
            data-testid={`${testId}-deck-subtitle`}
          />
        )}
      </FormField>
    </div>
  );

  const openView = onOpenPresentationView
    ? () => onOpenPresentationView(currentId ? { slideId: currentId, slideIndex: selectedIndex + 1 } : undefined)
    : undefined;

  const toolbar = (
    <SlidesToolbar
      slide={selected}
      theme={spec.theme ?? 'product'}
      onAddSlide={handleAdd}
      canAddSlide={slides.length < MAX_SLIDES}
      onLayoutChange={(layout) => {
        if (selected) edit(replaceSlide(spec, withLayoutDefaults(selected, layout)));
      }}
      onThemeChange={(theme) => edit({ ...spec, theme })}
      onChartKindChange={(kind) => {
        if (selected?.chart) edit(replaceSlide(spec, { ...selected, chart: { ...selected.chart, kind } }));
      }}
      onUndo={undo}
      onRedo={redo}
      canUndo={canUndo}
      canRedo={canRedo}
      {...(openView ? { onPresent: openView } : {})}
      testIdPrefix={`${testId}-toolbar`}
    />
  );

  const alerts = (
    <>
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
    </>
  );

  // The agent's answer. Wraps rather than truncating: a summary can carry the
  // server's warnings after it ("…; the new line restates one already on the
  // slide"), and those are exactly the words a one-line ellipsis cut off.
  const agentResult = agentMode && (
    <>
      {agentError && (
        <InlineAlert tone="error" onDismiss={() => setAgentError(null)} data-testid={`${testId}-agent-error`}>
          {agentError}
        </InlineAlert>
      )}

      {agentSummary && !agentError && (
        <div className="flex min-w-0 flex-wrap items-start gap-2" role="status" data-testid={`${testId}-agent-summary`}>
          <Text as="span" className="min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg">
            {`✓ ${agentSummary}`}
          </Text>
          {changedIds.size > 0 && (
            <Text as="span" className="text-[11px] text-text-tertiary">
              {changedIds.size === 1 ? '1 slide marked in the filmstrip' : `${changedIds.size} slides marked in the filmstrip`}
            </Text>
          )}
          {onUndoInstruct && (
            <Button variant="ghost" size="sm" onClick={undoInstruct} data-testid={`${testId}-agent-undo`}>
              Undo
            </Button>
          )}
        </div>
      )}
    </>
  );

  const agentComposer = agentMode && selected && (
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
  );

  const footerContext: PresentationFooterContext = {
    selectedSlide: selected,
    ...(selectedGenerated ? { selectedGeneratedSlide: selectedGenerated } : {}),
    selectedIndex,
    slideCount: totalSlides,
    selectSlide: select,
    markChanged: (ids) => setChangedIds(new Set(ids)),
  };
  const customFooter = typeof footer === 'function' ? footer(footerContext) : footer;
  const hasCustomFooter = customFooter != null && customFooter !== false;

  // What is pinned at the foot of the editing column. A host footer replaces
  // the built-in agent box; without one, the agent box (when `onInstruct` is
  // set), docked. Either way it is the column's last row in normal flow (the
  // frame's footer slot, or this editor's own root, both with the dock's
  // `pinned` placement): only the content above it scrolls.
  const footerContent: ReactNode = hasCustomFooter
    ? customFooter
    : agentComposer
      ? (
          <FloatingComposerDock
            maxWidth="4xl"
            label="Deck agent"
            // One opaque card: the agent's answer, the scope and chips, the
            // input. Nothing from the page shows through or sits on top of it.
            composer={(
              <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2" data-testid={`${testId}-dock-card`}>
                {agentResult}
                {agentComposer}
              </div>
            )}
            data-testid={`${testId}-dock`}
          />
        )
      : null;

  const slideExtras = selected && (
    <>
      {agentMode ? (
        <>
          <SlideSources
            compact
            sources={selected.sources}
            onChange={(next) => editSlide({ ...selected, sources: next })}
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
              onChange={editSlide}
              sources={sources}
              onSearchSources={onSearchSources}
              showSources={false}
              showNotes={false}
              testIdPrefix={`${testId}-slide`}
            />
          </Disclosure>
        </>
      ) : (
        <SlideForm
          slide={selected}
          onChange={editSlide}
          sources={sources}
          onSearchSources={onSearchSources}
          showNotes={false}
          testIdPrefix={`${testId}-slide`}
        />
      )}
    </>
  );

  // Previous / position / next. Framed (inside EditorShell), it rides the deck
  // line so the stage gets that row's height; unframed, it sits under the stage.
  const slideNav = (
    <div className={cn('flex items-center justify-center gap-2', renderFrame && 'ml-auto shrink-0')} data-testid={`${testId}-slide-nav`}>
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
        {`Slide ${totalSlides === 0 ? 0 : selectedIndex + 1} of ${totalSlides}`}
      </Text>
      <IconButton
        aria-label="Next slide"
        variant="ghost"
        size="sm"
        icon={<Chevron />}
        disabled={selectedIndex >= totalSlides - 1}
        onClick={() => step(1)}
        data-testid={`${testId}-next`}
      />
      <DotMeter
        value={slides.length / MAX_SLIDES}
        segments={10}
        showPercent={false}
        tone="surface"
        note={`${slides.length} / ${MAX_SLIDES}`}
        className="ml-2"
        data-testid={`${testId}-slide-meter`}
      />
    </div>
  );

  const body = (
    <div className="flex min-h-0 flex-1 flex-col gap-4 md:flex-row" data-testid={`${testId}-body`}>
      <Filmstrip
        items={items}
        selectedId={selected?.id ?? ''}
        onSelect={select}
        onMove={handleMove}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onAdd={() => handleAdd()}
        canAdd={slides.length < MAX_SLIDES}
        generatingSlideIds={generating}
        generatedItems={generatedSlides.map((slide) => ({ id: slide.id, title: slide.title, ...(slide.svg ? { thumbnailSvg: slide.svg } : {}) }))}
        {...(slideViewers ? { slideViewers } : {})}
        className="md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto"
        testIdPrefix={`${testId}-slide`}
      />

      {/* From md up the column is a size container: the stage is as wide as
          the column allows AND no taller than the column (100cqh), so a short
          window keeps a whole 16:9 slide in view. Notes and the rest scroll
          under it inside this column, never squeezing it. The floor (20rem)
          keeps the slide legible in a very short box; the column scrolls then. */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]" data-testid={`${testId}-main`}>
        <div className="mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]" data-testid={`${testId}-stage-frame`}>
        <SlideStage
          generating={selectedGenerating}
          label={currentTitle ? `Slide ${selectedIndex + 1} of ${totalSlides}: ${currentTitle}` : 'No slide'}
          data-testid={`${testId}-stage`}
        >
          {stageContent}
        </SlideStage>
        </div>

        {!renderFrame && slideNav}

        {selectedGenerated && (
          <Text className="mx-auto w-full max-w-4xl text-[12px] text-text-tertiary" data-testid={`${testId}-generated-note`}>
            {`${selectedGenerated.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`}
          </Text>
        )}

        {selected && (
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-3">
            <SpeakerNotes
              value={selected.notes}
              onChange={(notes) => editSlide({ ...selected, notes })}
              data-testid={`${testId}-slide-notes`}
            />
            {slideExtras}
          </div>
        )}
      </div>
    </div>
  );

  const editorKeyGuard = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    // The shortcuts are on the window (see above). This handler only stops a
    // form Enter from submitting an ancestor <form> the host may have wrapped
    // the editor in.
    if (event.key === 'Enter' && (event.target as HTMLElement).tagName === 'INPUT') {
      event.preventDefault();
    }
  };

  if (renderFrame) {
    const surface = (
      <div
        // `md:h-full`: the surface is exactly the scroller's height, so the
        // body below the deck line has a definite height to fit the stage to.
        // The min-height is the point past which the scroller scrolls instead.
        className={cn('flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]', className)}
        data-testid={testId}
        onKeyDown={editorKeyGuard}
      >
        <div className="flex shrink-0 flex-wrap items-center gap-2" data-testid={`${testId}-deck-line`}>
          {deckFields}
          {slideNav}
        </div>
        {alerts}
        {body}
      </div>
    );
    return <>{renderFrame({ toolbar, actions: revisionControls, surface, footer: footerContent })}</>;
  }

  // Unframed: the editor is its own frame. Deck line and toolbar stay at the
  // top, the footer is pinned at the bottom, and only what is between them
  // scrolls — so the composer is always on screen, whatever the deck's length.
  return (
    <div
      className={cn('relative flex h-full min-h-0 flex-col', className)}
      data-testid={testId}
      onKeyDown={editorKeyGuard}
    >
      <div className="flex shrink-0 flex-col gap-3 px-4 pt-4">
        <div
          className={cn('flex flex-wrap justify-between gap-2', agentMode ? 'items-center' : 'items-end')}
          {...(agentMode ? { 'data-testid': `${testId}-deck-line` } : {})}
        >
          {deckFields}
          {revisionControls}
        </div>
        <div className="rounded-lg border border-border bg-surface px-2 py-1.5">{toolbar}</div>
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4"
        data-testid={`${testId}-scroller`}
      >
        {alerts}
        {body}
      </div>

      {/* The footer is this column's last row, in normal flow — the same
          placement EditorShell gives it — so nothing scrolls under or over it. */}
      <div className="flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col" data-testid={`${testId}-dock-row`}>
        <ComposerDockPlacementContext.Provider value="pinned">{footerContent}</ComposerDockPlacementContext.Provider>
      </div>
    </div>
  );
}

export default PresentationEditor;
