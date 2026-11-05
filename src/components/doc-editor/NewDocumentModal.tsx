// ui-components/src/components/doc-editor/NewDocumentModal.tsx
//
// Modal for creating a new document.
//
// ## What this dialog asks, and what it used to ask
//
// It used to ask you to answer a schema question first: pick a SHAPE, then pick
// a document TYPE — and if you had no types, go define one field by field on
// another page and come back. That is the Drupal bargain, and the fourteen
// ready-made types that would have answered the question for you were parked
// behind a "Cookbooks" button on that other page.
//
// Now the first thing in the dialog is a search box over every known starting
// point: fourteen prebuilt types, whatever types you have of your own, and the
// three blanks. Type "retro", press Enter, and you are writing a Sprint
// Retrospective with its sections already there. Nobody is asked to define a
// content type before writing anything.
//
// A type picked here is a STARTING POINT, not a schema: it seeds sections and
// sets the icon, and everything in the document stays editable afterwards.
//
// ## Why there is still a shape question
//
// There are two authoring surfaces and both are wanted. A `page` is one
// continuous document — the Google-Docs/Confluence shape the canvas editor
// renders. `sections` is an ordered list of section forms, which is what makes
// the product usable as a todo creator or a notepad. `diagram` is a whiteboard.
// Neither is being phased out, so all three are ordinary options in the
// gallery rather than a separate question asked before it.
//
// The word `schemaVersion` deliberately does not appear in the UI. It is the
// implementation of the choice, not the choice.
//
// ## The shape and the starting point are two ORTHOGONAL questions
//
// They did not used to be. Picking any of the fourteen silently forced the
// shape to `sections`:
//
//     // A cookbook's fields ARE sections; on a page they would materialise
//     // into nothing, so picking one picks the shape that shows them.
//     setShape('sections');
//
// The reasoning was honest and was true when it was written. It has expired.
// `macro:field` ships now, so a cookbook's fields DO have a page
// representation — a run of field blocks that draws as a small property list —
// and the host seeds exactly that when it is handed `{ shape: 'page',
// documentTypeId }`. See `documentTypeCanvasModel.ts` in the app.
//
// Even while it was true it was the wrong interaction. It made a control move
// under the user with no explanation: you chose Page, you chose Bug Report, and
// all three shape cards went unpressed without a word about why. So the two
// questions are now genuinely independent — picking a type never changes your
// shape, and picking Page or Sections never discards your type.
//
// The one coupling left is `diagram`, and it is a real one rather than an
// implementation detail: a whiteboard has no document type at all, so the two
// choices cannot both stand. Picking a type moves off Diagram, and picking
// Diagram drops the type. Nothing else does either.

import { useState, useEffect, useId, useRef, useMemo } from 'react';
import { loadTypes, persistTypes, refreshTypesFromServer } from '../../hooks/useDocumentTypes';
import type { DocumentType } from '../../types/documentType';
import {
  documentTypeCookbooks,
  matchesCookbookQuery,
  type DocumentTypeCookbook,
} from '../doc-types/cookbooks';
import Modal from '../shared/Modal';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { Textarea } from '../forms/Textarea';
import { SelectableCard } from '../ui/SelectableCard';
import Chip from '../shared/Chip';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/**
 * Which authoring surface a new document opens in.
 *
 * `page` becomes `meta.schemaVersion = 2` on the document's CRDT — the one
 * gate the editor branches on. Doing that translation is the host's job, not
 * this modal's; the modal only reports which shape the person chose.
 */
export type DocumentShape = 'page' | 'sections' | 'diagram' | 'presentation';
// `'sections'` stays in the union so hosts that still READ a legacy document's
// shape keep compiling, but this modal no longer offers it (see SHAPES).
// @deprecated-value 'sections' — the sectioned editor is deprecated; create a
// `page` (or `diagram` / `presentation`). See realtime-examples
// docs/design/documents-editor-handoff/DEPRECATION-sectioned-documents.md.

/**
 * Shapes that have no document type at all.
 *
 * A whiteboard has no sections and no fields; a presentation's structure is a
 * `DeckSpec`, which the generator owns. Picking either moves off whatever type
 * was selected, and picking a type moves off either of them — the one coupling
 * in this dialog that is a real constraint rather than an implementation
 * detail.
 */
const TYPELESS_SHAPES: ReadonlySet<DocumentShape> = new Set<DocumentShape>(['diagram', 'presentation']);

/** A thing a presentation can be generated FROM. */
export interface NewPresentationSource {
  id: string;
  title: string;
  kind?: 'document' | 'transcript';
  /** A date, a length — whatever tells two similar rows apart. */
  subtitle?: string;
}

export type NewPresentationOrigin = 'blank' | 'transcript' | 'document';

/**
 * What "New document → Presentation" asks the host for.
 *
 * `from` and `sourceId` are the generator's half of the contract: the host
 * posts them to `/api/deck/fixture`, which drafts a real `DeckSpec` from the
 * named transcript or document. `title` and `description` come along because
 * the host still has to create a document row, and asking for the title twice
 * — once here, once in a second dialog — is the flow this modal replaced.
 */
export interface NewPresentationFixtureRequest {
  from: NewPresentationOrigin;
  /** The transcript or document it is derived from. Absent for `blank`. */
  sourceId?: string;
  title: string;
  description?: string;
}

export interface NewDocumentModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (meta: {
    title: string;
    type: string;
    description?: string;
    icon: string;
    /**
     * Absent for a diagram: a whiteboard has no document type, so there is no id
     * to send. Optional rather than a sentinel — a fake id would be looked up
     * somewhere eventually and found missing.
     */
    documentTypeId?: string;
    shape: DocumentShape;
  }) => void;
  /**
   * Presentation only. Given this, "Create Document" hands over the deck's
   * starting point instead of calling `onCreate` — the host creates the row
   * AND asks the generator for a v1 in one step. Without it a presentation
   * falls back to an ordinary `onCreate` with `shape: 'presentation'`, which
   * makes an empty deck the person then fills by hand.
   */
  onCreateFromFixture?: (request: NewPresentationFixtureRequest) => void;
  /**
   * The Documents explorer's search, for "From a project document". The same
   * search the deck editor's source picker uses, so what is offered here is
   * what the generator can actually cite.
   */
  onSearchDocuments?: (query: string) => NewPresentationSource[] | Promise<NewPresentationSource[]>;
  /** Transcripts available to this person, for "From a transcript". */
  recordings?: readonly NewPresentationSource[];
  /** The blank picked when the modal opens (a "New ▾ → Diagram" menu). Default `page`. Since 2.389.7. */
  initialShape?: DocumentShape;
}

/** The blanks on offer, with the words a person picking between them needs. */
const SHAPES: ReadonlyArray<{
  id: DocumentShape;
  icon: string;
  name: string;
  description: string;
  /** Extra words the search box should match on. */
  keywords: string[];
}> = [
  {
    id: 'page',
    icon: '📄',
    name: 'Page',
    description:
      'One continuous document. Headings, paragraphs, lists and tables flow down a single sheet — like Google Docs or Confluence.',
    keywords: ['blank', 'empty', 'doc', 'document', 'write'],
  },
  // `sections` is no longer offered. The sectioned editor (section cards,
  // per-section toolbars) is deprecated in favour of the page; a type or
  // cookbook picked here now lays its fields out on a page as field macros.
  // Existing sectioned documents still open, with a Convert to page notice.
  {
    id: 'diagram',
    icon: '🖉',
    name: 'Diagram',
    description:
      'A whiteboard. Shapes, arrows and text on an infinite canvas, drawn with others in real time — opens full width with the sidebar out of the way.',
    keywords: ['blank', 'whiteboard', 'canvas', 'draw', 'sketch'],
  },
  {
    id: 'presentation',
    icon: '📊',
    name: 'Presentation',
    description:
      'A slide deck, grounded in documents you already have. Edits as slides and downloads as a real .pptx — every slide cites its source.',
    keywords: ['deck', 'slides', 'slide', 'ppt', 'pptx', 'powerpoint', 'keynote'],
  },
];

/** Where a new deck's first draft comes from. */
const PRESENTATION_ORIGINS: ReadonlyArray<{ value: NewPresentationOrigin; label: string }> = [
  { value: 'blank', label: 'Blank — one empty slide' },
  { value: 'transcript', label: 'From a transcript' },
  { value: 'document', label: 'From a project document' },
];

// ---------------------------------------------------------------------------
// Starting points
// ---------------------------------------------------------------------------

/**
 * One thing a new document can start from. A blank is a bare shape, a `type` is
 * one of the user's own document types, a `cookbook` is one of the fourteen
 * that ship with the product.
 */
type Starter =
  | { kind: 'blank'; shape: DocumentShape }
  | { kind: 'type'; type: DocumentType }
  | { kind: 'cookbook'; cookbook: DocumentTypeCookbook };

function matchesBlank(shape: (typeof SHAPES)[number], query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    shape.name.toLowerCase().includes(q) ||
    shape.description.toLowerCase().includes(q) ||
    shape.keywords.some((k) => k.includes(q))
  );
}

function matchesType(type: DocumentType, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    type.name.toLowerCase().includes(q) ||
    (type.description ?? '').toLowerCase().includes(q)
  );
}

/**
 * Make sure a cookbook exists as a real document type, and return it.
 *
 * ## Why this writes to the cache and not to the server
 *
 * The editor populates a new document's sections by looking the type up BY NAME
 * (`DocumentEditorPage`'s template effect), cache first. So the one thing that
 * must have happened by the time we hand the document off is a cache entry —
 * anything slower and the document opens empty, which is the whole failure this
 * flow exists to avoid.
 *
 * The upload is not skipped, it is delegated: `refreshTypesFromServer` already
 * uploads every unmarked cache-only type it finds (that is the remote-first
 * migration), and this modal calls it on every open. So the type syncs on its
 * own, idempotently, without a second write path here that could disagree with
 * the hook's.
 *
 * Matched by name so picking "Meeting Notes" twice does not install it twice.
 */
export function ensureCookbookType(cookbook: DocumentTypeCookbook): DocumentType {
  const built = cookbook.build();
  const cached = loadTypes();
  const existing = cached.find((t) => t.name.toLowerCase() === built.name.toLowerCase());
  if (existing) return existing;
  const now = new Date().toISOString();
  const created: DocumentType = {
    ...built,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  persistTypes([...cached, created]);
  return created;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NewDocumentModal({
  open,
  onClose,
  onCreate,
  onCreateFromFixture,
  onSearchDocuments,
  recordings,
  initialShape,
}: NewDocumentModalProps) {
  const [types, setTypes] = useState<DocumentType[]>([]);
  /**
   * True until we know what the SERVER has.
   *
   * Without it a cold cache renders "No document types defined yet — create one
   * first", which is not merely unhelpful, it is WRONG: the types exist, and
   * following that advice creates duplicates of them. Any fresh browser,
   * incognito window or cleared profile hit it, and so did every client after a
   * server-side wipe, because `refreshTypesFromServer` treats a marked type the
   * server no longer lists as deleted and drops it from the cache.
   */
  const [probing, setProbing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  /** Which of the fourteen is picked, if any. Wins over `selectedId`. */
  const [cookbookId, setCookbookId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
  /**
   * Once someone types a title, picking a different starting point must not
   * overwrite it. Without this the gallery silently ate the title people had
   * already written.
   */
  const [titleTouched, setTitleTouched] = useState(false);
  const [description, setDescription] = useState('');
  // Page preselected — see the file header.
  const [shape, setShape] = useState<DocumentShape>('page');
  /** Presentation only: where the first draft comes from, and what from. */
  const [deckFrom, setDeckFrom] = useState<NewPresentationOrigin>('blank');
  const [deckSourceId, setDeckSourceId] = useState<string>('');
  const [deckQuery, setDeckQuery] = useState('');
  const [deckResults, setDeckResults] = useState<readonly NewPresentationSource[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  // Ids that tie each visible label to the control it names. Before these,
  // the association was purely visual: focusing the title field announced
  // only its placeholder.
  const uid = useId();
  const blankGroupLabelId = `${uid}-blank-label`;
  const typeGroupLabelId = `${uid}-type-label`;
  const cookbookGroupLabelId = `${uid}-cookbook-label`;
  const titleFieldId = `${uid}-title`;
  const descriptionFieldId = `${uid}-description`;
  const deckFromFieldId = `${uid}-deck-from`;
  const deckSourceFieldId = `${uid}-deck-source`;

  useEffect(() => {
    if (!open) return;
    // Cache first so the form paints immediately, then reconcile with the
    // server. The cache is a speed-up, not the source of truth — it used to be
    // the only thing consulted, so a client that had never opened the Document
    // Types page believed none existed.
    const loaded = loadTypes();
    setTypes(loaded);
    // NOT `loaded[0]?.id`. Auto-selecting the first installed type made every
    // document a Bug Report: the tile for `Page (Default)` and the tile for
    // whichever type happened to sort first were BOTH `aria-pressed="true"`
    // from first render, and a type beats a bare shape on submit. So a person
    // who opened the dialog, typed a title and pressed Create got a Bug Report
    // they never asked for — and clicking "Page" did not clear it, because a
    // shape and a type are independent choices. Measured on a 173-document
    // list: all 25 rows of page one read "Bug Report".
    //
    // No type is the honest default. It is what "Page (Default)" promises, and
    // it is the only way to make a plain page at all.
    setSelectedId(null);
    setCookbookId(null);
    setQuery('');
    setTitle('');
    setTitleTouched(false);
    setDescription('');
    setShape(initialShape ?? 'page');
    setDeckFrom('blank');
    setDeckSourceId('');
    setDeckQuery('');
    setDeckResults([]);

    let cancelled = false;
    setProbing(true);
    void refreshTypesFromServer()
      .then((res) => {
        if (cancelled) return;
        // On failure keep whatever the cache had: offline with a warm cache is
        // still a usable form, and blanking it would be a worse answer than a
        // stale one.
        const next = res.ok ? res.types : res.cached;
        setTypes(next);
        // Keep a choice the person made, drop one that no longer exists, and
        // never invent one — the same reason as above, applied to the async
        // reconcile that would otherwise re-select the first type a beat after
        // the dialog painted.
        setSelectedId((cur) => (cur && next.some((t) => t.id === cur) ? cur : null));
      })
      .finally(() => { if (!cancelled) setProbing(false); });
    // Cleared on close: an uncancelled focus lands on a hidden input and
    // steals focus back from whatever the user moved to.
    const t = setTimeout(() => searchRef.current?.focus(), 50);
    return () => { cancelled = true; clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset on open only
  }, [open]);

  const visibleBlanks = useMemo(
    () => SHAPES.filter((s) => matchesBlank(s, query)),
    [query],
  );
  const visibleTypes = useMemo(
    () => types.filter((t) => matchesType(t, query)),
    [types, query],
  );
  const visibleCookbooks = useMemo(
    () => documentTypeCookbooks.filter((c) => matchesCookbookQuery(c, query)),
    [query],
  );

  /**
   * The rows the deck's source picker offers.
   *
   * Transcripts are filtered in the browser from the `recordings` the host
   * already handed over; documents go through the host's search, because the
   * Documents explorer is server-side and a client-side filter over a page of
   * it would silently hide everything past the first page.
   */
  useEffect(() => {
    if (!open || shape !== 'presentation') return;
    if (deckFrom === 'blank') { setDeckResults([]); return; }
    const q = deckQuery.trim().toLowerCase();
    if (deckFrom === 'transcript') {
      const all = recordings ?? [];
      setDeckResults(q ? all.filter((row) => row.title.toLowerCase().includes(q)) : all);
      return;
    }
    if (!onSearchDocuments) { setDeckResults([]); return; }
    let cancelled = false;
    void Promise.resolve(onSearchDocuments(deckQuery.trim()))
      .then((rows) => { if (!cancelled) setDeckResults(rows); })
      // An empty list after a failed search would read as "you have no
      // documents", which is a confident wrong answer. Leave what was there.
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [open, shape, deckFrom, deckQuery, recordings, onSearchDocuments]);

  if (!open) return null;

  const selected = types.find(t => t.id === selectedId);
  const pickedCookbook = cookbookId
    ? documentTypeCookbooks.find((c) => c.id === cookbookId)
    : undefined;

  /**
   * Which shapes a document type is REQUIRED for.
   *
   * Only `sections`: a type is what defines the sections a document starts
   * with, so that shape cannot be made without one. A diagram is a whiteboard
   * and has no type at all; a page is one continuous document, and a type only
   * decorates it — supplying the icon and the chip the document list shows.
   *
   * This used to be `shape !== 'diagram'`, and the modal refused to open at all
   * with zero types — a whole "Create New Document" dialog whose only control
   * was Close, telling you to go define a type somewhere else first. Meanwhile
   * the conversation surface has always created untyped documents happily, so
   * the requirement was not even true of the product.
   *
   * A cookbook counts: it becomes a real type the moment it is used.
   */
  const needsType = shape === 'sections';
  const hasStarterType = !!pickedCookbook || !!selected;
  const noTypesYet = types.length === 0 && !probing;
  /**
   * Say "you have no types" only when it still MATTERS. With a known type
   * picked, the sections requirement is already met, and repeating the
   * prerequisite under a satisfied choice reads as a refusal.
   */
  const showNoTypesNote = noTypesYet && !pickedCookbook;
  const nothingMatches =
    visibleBlanks.length === 0 && visibleTypes.length === 0 && visibleCookbooks.length === 0;

  /**
   * The starting point currently in force.
   *
   * A cookbook wins outright. Otherwise a type still only DECORATES the chosen
   * shape, which is why it does not displace the blank — that orthogonality is
   * load-bearing for the "typed page" the document list renders with an icon.
   */
  const currentStarter: Starter = pickedCookbook
    ? { kind: 'cookbook', cookbook: pickedCookbook }
    : selected && !TYPELESS_SHAPES.has(shape)
      ? { kind: 'type', type: selected }
      : { kind: 'blank', shape };

  const applyStarter = (s: Starter) => {
    if (s.kind === 'cookbook') {
      setCookbookId(s.cookbook.id);
      // The shape is NOT touched. Both surfaces can show a type's fields now —
      // sections materialise them as section forms, a page as field macros —
      // so there is nothing left to decide on the user's behalf. The single
      // exception is a whiteboard, which has no document type at all: a type
      // picked while Diagram is selected moves to Page, the default.
      if (TYPELESS_SHAPES.has(shape)) setShape('page');
      if (!titleTouched) setTitle(s.cookbook.name);
      return;
    }
    if (s.kind === 'blank') {
      setShape(s.shape);
      // Picking a SHAPE keeps your type — that is the whole point of the two
      // questions being separate. Diagram is the exception, for the reason
      // above.
      if (TYPELESS_SHAPES.has(s.shape)) {
        setCookbookId(null);
        if (!titleTouched) setTitle('');
      }
      return;
    }
    setCookbookId(null);
    setSelectedId(s.type.id);
    // Clear a title we ourselves put there, so switching away from a cookbook
    // does not leave its name behind on an unrelated document.
    if (!titleTouched) setTitle('');
  };

  /**
   * Shape a starter creates, independent of React state settling.
   *
   * A cookbook no longer names a shape of its own: it inherits whatever is
   * selected, except on a whiteboard, where `applyStarter` has just moved to
   * Page and this has to agree without waiting for the re-render.
   */
  const shapeFor = (s: Starter): DocumentShape =>
    s.kind === 'blank'
      ? s.shape
      : TYPELESS_SHAPES.has(shape)
        ? 'page'
        : shape;

  /**
   * Hand the finished meta to the host.
   *
   * Takes the starter and title as ARGUMENTS rather than reading state: the
   * Enter-in-search path selects and submits in one keystroke, and a state read
   * there would see the previous render's values.
   */
  const emit = (starter: Starter, rawTitle: string, shapeIn: DocumentShape) => {
    const trimmed = rawTitle.trim();
    if (!trimmed) return;
    const desc = description.trim() || undefined;

    // A presentation is neither typed nor hand-seeded: its v1 comes from the
    // generator, so the host is handed the starting point rather than a
    // document shell it would have to fill itself.
    if (shapeIn === 'presentation') {
      if (onCreateFromFixture) {
        onCreateFromFixture({
          from: deckFrom,
          ...(deckFrom !== 'blank' && deckSourceId ? { sourceId: deckSourceId } : {}),
          title: trimmed,
          ...(desc ? { description: desc } : {}),
        });
      } else {
        onCreate({
          title: trimmed,
          type: 'Presentation',
          description: desc,
          icon: '📊',
          shape: 'presentation',
        });
      }
      onClose();
      return;
    }

    if (starter.kind === 'cookbook') {
      const dt = ensureCookbookType(starter.cookbook);
      onCreate({
        title: trimmed,
        type: dt.name,
        description: desc,
        icon: dt.icon,
        documentTypeId: dt.id,
        // Whatever shape the person actually chose. This used to be a hardcoded
        // `'sections'` — the other half of the silent override described in the
        // file header. On `page` the host reads `documentTypeId` and seeds the
        // fields as blocks; on `sections` it materialises them as section forms
        // exactly as before, so no legacy behaviour moves.
        shape: shapeIn,
      });
    } else if (starter.kind === 'type' && shapeIn !== 'diagram') {
      onCreate({
        // A stable label rather than a real type id: the document list renders
        // this as the row's chip, and the editor resolves the template by it.
        title: trimmed,
        type: starter.type.name,
        description: desc,
        icon: starter.type.icon,
        documentTypeId: starter.type.id,
        shape: shapeIn,
      });
    } else {
      // Untyped. The chip still has to say something TRUE — a page with no type
      // is a document, and the old code called it a "Diagram" because the only
      // untyped shape used to be a whiteboard.
      onCreate({
        title: trimmed,
        type: shapeIn === 'diagram' ? 'Diagram' : 'Document',
        description: desc,
        icon: shapeIn === 'diagram' ? '🖉' : '📄',
        shape: shapeIn,
      });
    }
    onClose();
  };

  // `selected` unconditionally would keep the button dead on exactly the
  // shapes that never needed a type.
  /**
   * A deck derived from something has to name the something. Without this the
   * Create button posts `{ from: 'transcript' }` with no id, and the generator
   * has nothing to ground the slides in.
   */
  const deckSourceMissing =
    shape === 'presentation' && deckFrom !== 'blank' && !deckSourceId;

  const canSubmit = !!title.trim() && (!needsType || hasStarterType) && !deckSourceMissing;

  const handleSubmit = () => {
    if (!canSubmit) return;
    emit(currentStarter, title, shapeFor(currentStarter));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && canSubmit) handleSubmit();
  };

  /**
   * Enter in the search box: take the top match and go.
   *
   * "Type retro, press Enter, be writing" is the whole point of the box. When
   * the top match supplies a title of its own (a cookbook does; a blank does
   * not) the document is created on the spot; otherwise the match is selected
   * and focus moves to the one field still missing.
   */
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.shiftKey) return;
    e.preventDefault();
    // The dialog body submits on Enter too; without this the same keystroke
    // would be handled twice.
    e.stopPropagation();

    const top: Starter | undefined =
      visibleCookbooks.length > 0 && query.trim()
        ? { kind: 'cookbook', cookbook: visibleCookbooks[0] }
        : visibleBlanks.length > 0
          ? { kind: 'blank', shape: visibleBlanks[0].id }
          : visibleTypes.length > 0
            ? { kind: 'type', type: visibleTypes[0] }
            : undefined;
    if (!top) return;

    applyStarter(top);
    const nextTitle = title.trim() || (top.kind === 'cookbook' ? top.cookbook.name : '');
    if (!nextTitle) {
      titleRef.current?.focus();
      return;
    }
    emit(top, nextTitle, shapeFor(top));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel="Create New Document"
      maxWidth={720}
      zIndex={10000}
      rawChildren
      backdropStyle={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
      cardStyle={{
        border: '1px solid #e2e8f0', borderRadius: 8,
        maxHeight: '90vh', width: '90vw',
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        padding: 0,
      }}
    >
      <div onKeyDown={handleKeyDown} className="contents">
        {/* Header */}
        <h2 className={cn('m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0')}>
          Create New Document
        </h2>

        {/* Search over every starting point. First control in the dialog and
            the one that gets focus, because typing three letters is faster
            than reading seventeen cards. */}
        <div className={cn('px-6 pb-3 shrink-0')}>
          <Input
            ref={searchRef}
            type="search"
            data-testid="new-doc-search"
            aria-label="Search document types"
            placeholder="What are you writing? Try “retro”, “bug”, “invoice”…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <div className={cn('mt-1.5 text-[11px] text-text-tertiary')}>
            Start from a ready-made type — Enter takes the first match. Everything in it
            stays editable afterwards.
          </div>
        </div>

        {/* Scrollable gallery */}
        <div className={cn('flex-1 overflow-y-auto px-6 min-h-0')} data-testid="new-doc-starters">

          {/* Blanks */}
          {visibleBlanks.length > 0 && (
            <div className={cn('mb-5')}>
              {/* "Start blank" was only ever true when nothing else was
                  picked, and it is now routinely false: this row is the SHAPE,
                  and a type below can fill any of the first two. */}
              <div
                id={blankGroupLabelId}
                className={cn('block text-[13px] font-semibold text-text-secondary mb-2')}
              >
                Shape
              </div>
              <div
                role="group"
                aria-labelledby={blankGroupLabelId}
                className={cn('grid grid-cols-2 gap-2 md:grid-cols-4')}
              >
                {visibleBlanks.map((s) => (
                  <SelectableCard
                    key={s.id}
                    padding="md"
                    // The shape stays pressed with a type picked. It used to go
                    // unpressed the moment a cookbook was chosen, which left
                    // all three cards reading `aria-pressed="false"` — a shape
                    // question with no visible answer.
                    selected={shape === s.id}
                    onSelect={() => applyStarter({ kind: 'blank', shape: s.id })}
                    data-testid={`doc-shape-${s.id}`}
                  >
                    <div className={cn('flex items-center gap-2')}>
                      <span className={cn('text-xl shrink-0')} aria-hidden="true">
                        {s.icon}
                      </span>
                      <span className={cn('text-sm font-semibold text-text-primary')}>
                        {s.name}
                      </span>
                      {s.id === 'page' && (
                        <Chip tone="info" size="xs">
                          Default
                        </Chip>
                      )}
                    </div>
                    <div className={cn('mt-1 text-[11px] leading-snug text-neutral')}>
                      {s.description}
                    </div>
                  </SelectableCard>
                ))}
              </div>
            </div>
          )}

          {/* Where a deck's first draft comes from.

              Only shown for a presentation, and shown INSIDE the gallery
              rather than beside the title, because it is a second half of the
              same question the shape cards ask: "what am I making, and out of
              what?". A deck made from nothing is a deck someone has to fill by
              hand, which is the work the generator exists to do. */}
          {shape === 'presentation' && (
            <div className={cn('mb-5')} data-testid="presentation-start-from">
              <label
                htmlFor={deckFromFieldId}
                className={cn('block text-[13px] font-semibold text-text-secondary mb-1')}
              >
                Start from
              </label>
              <Select
                id={deckFromFieldId}
                value={deckFrom}
                options={PRESENTATION_ORIGINS.map((origin) => ({ value: origin.value, label: origin.label }))}
                onChange={(e) => {
                  setDeckFrom(e.target.value as NewPresentationOrigin);
                  // The chosen source belongs to the origin it was chosen
                  // under; keeping it across a switch would post a transcript
                  // id as a document id.
                  setDeckSourceId('');
                  setDeckQuery('');
                }}
                data-testid="presentation-from"
              />
              <div className={cn('mt-1 text-[11px] text-text-tertiary')}>
                {deckFrom === 'blank'
                  ? 'One empty slide. You add the slides and their sources as you write.'
                  : 'The generator drafts the slides from it, and every slide cites what it came from.'}
              </div>

              {deckFrom !== 'blank' && (
                <div className={cn('mt-2 flex flex-col gap-1.5')}>
                  <Input
                    type="search"
                    value={deckQuery}
                    onChange={(e) => setDeckQuery(e.target.value)}
                    aria-label={deckFrom === 'transcript' ? 'Search transcripts' : 'Search documents'}
                    placeholder={deckFrom === 'transcript' ? 'Search transcripts…' : 'Search documents…'}
                    data-testid="presentation-source-search"
                  />
                  {deckResults.length === 0 ? (
                    <div
                      data-testid="presentation-no-sources"
                      className={cn('px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary')}
                    >
                      {deckFrom === 'transcript'
                        ? 'No transcripts to draw on. A recording with a transcript can seed a deck.'
                        : onSearchDocuments
                          ? 'Nothing matches that. Sources come from the Documents explorer.'
                          : 'Document search is not available here — start blank and add sources per slide.'}
                    </div>
                  ) : (
                    <>
                      <label
                        htmlFor={deckSourceFieldId}
                        className={cn('block text-[13px] font-semibold text-text-secondary')}
                      >
                        {deckFrom === 'transcript' ? 'Transcript' : 'Document'}{' '}
                        <span className={cn('text-danger-fg')} aria-hidden="true">*</span>
                      </label>
                      <Select
                        id={deckSourceFieldId}
                        required
                        aria-required="true"
                        value={deckSourceId}
                        placeholder="Choose one…"
                        options={deckResults.map((row) => ({
                          value: row.id,
                          label: row.subtitle ? `${row.title} · ${row.subtitle}` : row.title,
                        }))}
                        onChange={(e) => setDeckSourceId(e.target.value)}
                        data-testid="presentation-source"
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* The fourteen. This is the front door: a person who has never seen
              the app can pick one and be writing something structured without
              defining a single field. */}
          {visibleCookbooks.length > 0 && (
            <div className={cn('mb-5')}>
              <div className={cn('mb-2')}>
                <div
                  id={cookbookGroupLabelId}
                  className={cn('block text-[13px] font-semibold text-text-secondary')}
                >
                  Known types
                </div>
                {/* Says what the chosen shape will DO with the type, because
                    the shape no longer changes when you pick one — so the
                    answer has to be readable rather than inferred from a
                    control moving. */}
                <div className={cn('text-[11px] text-text-tertiary')} data-testid="starter-shape-note">
                  {shape === 'diagram'
                    ? 'Picking one switches to Page — a whiteboard has no document type.'
                    : shape === 'presentation'
                      ? 'Picking one switches to Page — a deck’s structure is the slide spec, not a document type.'
                    : shape === 'sections'
                      ? 'Its fields become sections, one form each.'
                      : 'Its fields become blocks on the page — typed values, headings and checklists.'}
                </div>
              </div>
              <div
                role="group"
                aria-labelledby={cookbookGroupLabelId}
                className={cn('grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2')}
              >
                {visibleCookbooks.map((c) => {
                  const isSelected = cookbookId === c.id;
                  return (
                    <SelectableCard
                      key={c.id}
                      padding="md"
                      selected={isSelected}
                      onSelect={() => applyStarter({ kind: 'cookbook', cookbook: c })}
                      data-testid={`starter-cookbook-${c.id}`}
                    >
                      <div className={cn('flex items-center gap-2')}>
                        <span className={cn('text-xl shrink-0')} aria-hidden="true">{c.icon}</span>
                        <span className={cn('text-sm font-semibold text-text-primary')}>
                          {c.name}
                        </span>
                      </div>
                      <div className={cn('mt-1 text-[11px] leading-snug text-neutral line-clamp-2')}>
                        {c.description}
                      </div>
                      <div className={cn('mt-1 text-[11px] text-text-tertiary')}>
                        {c.category}
                      </div>
                    </SelectableCard>
                  );
                })}
              </div>
            </div>
          )}

          {/* The user's own types — NOT offered for a diagram.

              A document type defines the sections and structure a document
              starts with. A whiteboard has neither, so asking is offering a
              choice that does not apply to what is being made. */}
          {!TYPELESS_SHAPES.has(shape) && (visibleTypes.length > 0 || showNoTypesNote || (types.length === 0 && probing)) && (
            <div className={cn('mb-5')}>
              <div className={cn('mb-2 flex items-baseline gap-1.5')}>
                <span
                  id={typeGroupLabelId}
                  className={cn('block text-[13px] font-semibold text-text-secondary')}
                >
                  Your document types
                </span>
                {!needsType && (
                  <span className={cn('text-[13px] font-normal text-text-tertiary')}>optional</span>
                )}
              </div>

              {/* Still asking the server. NOT the empty state: claiming no
                  types exist while the request is in flight is a confident
                  wrong answer, and its call to action creates duplicates of
                  types the user already has. */}
              {types.length === 0 && probing && (
                <div className={cn('px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary')}>
                  Loading document types…
                </div>
              )}

              {/* Scoped to the control it is about. This used to replace the
                  ENTIRE dialog, so a prerequisite for ONE shape locked out
                  the other two — and the only button was Close. */}
              {showNoTypesNote && (
                <div
                  data-testid="no-document-types"
                  className={cn('px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary')}
                >
                  {needsType
                    ? 'Sections come from a document type. Pick a known type above, or make a page instead — it needs no type.'
                    : 'None of your own yet. Pick a known type above, or define one in ☰ → Document Types.'}
                </div>
              )}

              {visibleTypes.length > 0 && (
                <div
                  role="group"
                  aria-labelledby={typeGroupLabelId}
                  className={cn('grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2')}
                >
                  {visibleTypes.map((t) => {
                    const isSelected = !pickedCookbook && selectedId === t.id;
                    return (
                      <button
                        data-ui-part=""
                        key={t.id}
                        type="button"
                        data-testid={`type-option-${t.id}`}
                        // Selection was signalled only by colour and a "✓"
                        // glyph; aria-pressed exposes it to screen readers.
                        aria-pressed={isSelected}
                        onClick={() => applyStarter({ kind: 'type', type: t })}
                        className={cn(
                          'flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]',
                          isSelected ? 'bg-info-bg border-2 border-info' : 'bg-surface border-2 border-border hover:bg-surface-panel',
                        )}
                      >
                        <span className={cn('text-2xl shrink-0')}>{t.icon}</span>
                        <div className={cn('min-w-0')}>
                          <div className={cn('text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap')}>
                            {t.name}
                          </div>
                          {t.description && (
                            <div className={cn('text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2')}>
                              {t.description}
                            </div>
                          )}
                          {/* The same fields, counted in whatever the chosen
                              shape will actually call them. A page used to say
                              "Sets the icon and type", because a page really
                              did start as a blank sheet; it now opens with one
                              block per field, so promising the count is a
                              promise this flow keeps. A diagram has no type at
                              all, and this branch is not rendered for one. */}
                          <div className={cn('text-[11px] text-text-tertiary mt-0.5')}>
                            {shape === 'sections'
                              ? `${t.fields.length} section${t.fields.length !== 1 ? 's' : ''}`
                              : `${t.fields.length} block${t.fields.length !== 1 ? 's' : ''}`}
                          </div>
                        </div>
                        {isSelected && (
                          <span
                            aria-hidden="true"
                            className={cn('absolute top-1.5 right-2 text-sm text-info-fg font-bold')}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {nothingMatches && (
            <div
              data-testid="new-doc-no-matches"
              className={cn('text-center py-8 text-[13px] text-text-tertiary')}
            >
              Nothing matches “{query}”. Clear the search to see every starting point.
            </div>
          )}
        </div>

        {/* Title + description live BELOW the gallery and outside its scroll
            box: the gallery is seventeen cards tall, and a title field that
            scrolls away is a title field people cannot find. */}
        <div className={cn('shrink-0 border-t border-border px-6 pt-4 pb-3')}>
          <div className={cn('mb-3')}>
            <label
              htmlFor={titleFieldId}
              className={cn('block text-[13px] font-semibold text-text-secondary mb-1')}
            >
              Title <span className={cn('text-danger-fg')} aria-hidden="true">*</span>
            </label>
            <Input
              ref={titleRef}
              id={titleFieldId}
              required
              aria-required="true"
              data-testid="new-doc-title"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setTitleTouched(true); }}
              placeholder={
                pickedCookbook
                  ? `e.g. ${pickedCookbook.name}`
                  : selected
                    ? `e.g. Q2 ${selected.name}`
                    : 'Document title…'
              }
            />
          </div>

          <div>
            <label
              htmlFor={descriptionFieldId}
              className={cn('block text-[13px] font-semibold text-text-secondary mb-1')}
            >
              Description <span className={cn('text-text-tertiary font-normal')}>(optional)</span>
            </label>
            <Textarea
              id={descriptionFieldId}
              data-testid="new-doc-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this document…"
              rows={2}
              className={cn('resize-y')}
            />
          </div>
        </div>

        {/* Footer. Always present — the actions belong to the form, not to
            whether any document types happen to exist. Hiding them on zero
            types is what left the dialog with nothing but a Close button. */}
        <div className={cn('flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0')}>
          <button
            data-ui-part=""
            data-testid="new-doc-cancel"
            onClick={onClose}
            className={cn('px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]')}
          >
            Cancel
          </button>
          <button
            data-ui-part=""
            data-testid="new-doc-submit"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn(
              'px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]',
              canSubmit ? 'bg-info cursor-pointer' : 'bg-neutral cursor-not-allowed',
            )}
          >
            Create Document
          </button>
        </div>
      </div>
    </Modal>
  );
}
