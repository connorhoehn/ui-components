// The presentation document type's editing surface.
//
// `SortableSlideList` is deliberately NOT re-exported: it is reached only
// through `React.lazy` inside `PresentationEditor`, and naming it here would
// make `@dnd-kit` a static import of every entry that touches this barrel.

export { PresentationEditor } from './PresentationEditor';
export type {
  PresentationEditorProps,
  PresentationEditorRevision,
  PresentationPreview,
  PresentationPreviewSlide,
  PresentationGeneratedSlide,
  PresentationInstructContext,
  PresentationInstructResult,
  PresentationInstructScope,
  PresentationFooterContext,
  PresentationEditorFrame,
} from './PresentationEditor';

// The editor's pieces (2.363.0), for a host that composes its own surface.
export { Filmstrip, FilmstripThumb } from './Filmstrip';
export type { FilmstripProps, FilmstripGeneratedItem } from './Filmstrip';
export { SlideStage } from './SlideStage';
export type { SlideStageProps, SlideStageWidth } from './SlideStage';
export { SpeakerNotes } from './SpeakerNotes';
export type { SpeakerNotesProps } from './SpeakerNotes';
export { SlidesToolbar, SLIDE_INSERTS, SLIDES_TOOLBAR_BREAKPOINTS, slidesToolbarSize } from './SlidesToolbar';
export type { SlidesToolbarProps, SlidesToolbarSize } from './SlidesToolbar';

export { SlideForm } from './SlideForm';
export type { SlideFormProps } from './SlideForm';
export { SlideList } from './SlideList';
export type { SlideListProps, SlideListItem } from './SlideList';
export { SlideRow } from './SlideRow';
export type { SlideRowProps } from './SlideRow';
export { SlideSources } from './SlideSources';
export type { SlideSourcesProps, PresentationSourceOption } from './SlideSources';
export { svgDataUri } from './svgPreview';

// The reading end, composed from the pieces above (2.441.0): a saved deck,
// read-only, and its full-window presentation.
export { DeckReader } from './DeckReader';
export type { DeckReaderProps } from './DeckReader';
export { DeckPresentationDialog } from './DeckPresentationDialog';
export type { DeckPresentationDialogProps } from './DeckPresentationDialog';

export {
  DECK_THEMES,
  MAX_BULLETS_PER_SLIDE,
  MAX_BULLET_CHARS,
  MAX_CHART_LABELS,
  MAX_CHART_SERIES,
  MAX_EYEBROW_CHARS,
  MAX_NOTES_CHARS,
  MAX_QUOTE_CHARS,
  MAX_SLIDES,
  MAX_SOURCES_PER_SLIDE,
  MAX_SUBTITLE_CHARS,
  MAX_TITLE_CHARS,
  SLIDE_ID_PATTERN,
  SLIDE_LAYOUTS,
  SLIDE_LAYOUT_LABELS,
  addSlide,
  canSaveDeck,
  duplicateSlide,
  makeSlide,
  moveSlide,
  nextRevisionLabel,
  nextSlideId,
  removeSlide,
  replaceSlide,
  uncitedSlideIds,
  withLayoutDefaults,
} from './deckSpec';
export type {
  DeckChart,
  DeckImage,
  DeckQuote,
  DeckSlide,
  DeckSource,
  DeckSpec,
  DeckTheme,
  SlideLayout,
} from './deckSpec';
