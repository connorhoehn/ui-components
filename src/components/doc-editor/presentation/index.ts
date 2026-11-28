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
  PresentationEditorHandle,
} from './PresentationEditor';

// The editor's pieces (2.363.0), for a host that composes its own surface.
export { Filmstrip, FilmstripThumb } from './Filmstrip';
export type { FilmstripProps, FilmstripGeneratedItem } from './Filmstrip';
export { SlideStage } from './SlideStage';
export type { SlideStageProps, SlideStageWidth } from './SlideStage';
export { SpeakerNotes } from './SpeakerNotes';
export type { SpeakerNotesProps } from './SpeakerNotes';
export { SlidesToolbar, SLIDE_INSERTS, SLIDES_TOOLBAR_BREAKPOINTS, slidesToolbarSize } from './SlidesToolbar';
export type { SlidesToolbarProps, SlidesToolbarSize, SlidesToolbarTheme } from './SlidesToolbar';

// Choosing a layout and a starting deck (2.547.0).
export { LayoutGallery, SlideLayoutSchematic } from './LayoutGallery';
export type { LayoutGalleryProps } from './LayoutGallery';
export { TemplateGallery } from './TemplateGallery';
export type { TemplateGalleryProps, DeckTemplate } from './TemplateGallery';

export { SlideForm } from './SlideForm';
export type { SlideFormProps } from './SlideForm';
export { SlideList } from './SlideList';
export type { SlideListProps, SlideListItem } from './SlideList';
export { SlideRow } from './SlideRow';
export type { SlideRowProps, SlideFinding } from './SlideRow';
export { SlideSources } from './SlideSources';
export type { SlideSourcesProps, PresentationSourceOption } from './SlideSources';
export { svgDataUri } from './svgPreview';

// The reading end, composed from the pieces above (2.441.0): a saved deck,
// read-only, and its full-window presentation.
export { DeckReader } from './DeckReader';
export type { DeckReaderProps } from './DeckReader';
/** @deprecated since 2.548.0 — the editor and reader present in place (`DeckPresentMode`). */
export { DeckPresentationDialog } from './DeckPresentationDialog';
export type { DeckPresentationDialogProps } from './DeckPresentationDialog';
export { DeckPresentMode } from './DeckPresentMode';
export type { DeckPresentModeProps, DeckPresentModeSlide } from './DeckPresentMode';

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
  // The 0.152.0 format (2.547.0).
  MAX_PIE_SLICES,
  MIN_FIGURES,
  MAX_FIGURES,
  MAX_FIGURE_VALUE_CHARS,
  MAX_FIGURE_LABEL_CHARS,
  MAX_FIGURE_DELTA_CHARS,
  MAX_TABLE_ROWS,
  MAX_TABLE_COLUMNS,
  MAX_TABLE_CELL_CHARS,
  MAX_COMPARISON_POINTS,
  MAX_COMPARISON_POINT_CHARS,
  MAX_COMPARISON_TITLE_CHARS,
  MAX_VERDICT_CHARS,
  MIN_TIMELINE_STEPS,
  MAX_TIMELINE_STEPS,
  MAX_TIMELINE_DATE_CHARS,
  MAX_TIMELINE_LABEL_CHARS,
  MAX_TIMELINE_DETAIL_CHARS,
  MAX_AGENDA_ITEMS,
  MAX_AGENDA_ITEM_CHARS,
  MAX_CLOSING_LINE_CHARS,
  MAX_NEXT_STEPS,
  MAX_NEXT_STEP_CHARS,
  MAX_CONTACT_CHARS,
  THEME_REF_PATTERN,
  DECK_CHART_KINDS,
  DECK_CHART_KIND_LABELS,
  SLIDE_LAYOUT_DESCRIPTIONS,
  deckForEngine,
  isDeckThemeRef,
  slideForEngine,
  validateDeckSpec,
  // The 0.153.0 format (2.550.0).
  MAX_ITEM_TITLE_CHARS,
  MAX_ITEM_TEXT_CHARS,
  MIN_CARDS,
  MAX_CARDS,
  MIN_PROCESS_STEPS,
  MAX_PROCESS_STEPS,
  MAX_MATRIX_AXIS_CHARS,
  MIN_PEOPLE,
  MAX_PEOPLE,
  MAX_PERSON_NAME_CHARS,
  MAX_PERSON_ROLE_CHARS,
  MAX_PERSON_DETAIL_CHARS,
  MIN_FUNNEL_STAGES,
  MAX_FUNNEL_STAGES,
  MAX_FUNNEL_LABEL_CHARS,
  MAX_FUNNEL_DETAIL_CHARS,
  MAX_IMAGE_URL_CHARS,
  MAX_ASSET_ID_CHARS,
  MAX_STORY_BULLETS,
  DECK_EMPHASES,
  DECK_DECORATION_PLACEMENTS,
  DECK_DECORATION_PLACEMENT_LABELS,
  DECK_STYLES,
  DECK_STYLE_LABELS,
  DECK_STYLE_DESCRIPTIONS,
  IMAGE_LAYOUTS,
  SLIDE_LAYOUT_GROUPS,
  LAYOUT_PAYLOADS,
  layoutRowBounds,
  plainText,
  textRuns,
  plainSlide,
  setSlidePath,
  addSlideRow,
  removeSlideRow,
  moveSlideRow,
  slideRowBounds,
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
  DeckAgenda,
  DeckClosing,
  DeckComparison,
  DeckComparisonSide,
  DeckFigure,
  DeckSpecValidation,
  DeckTable,
  DeckThemeRef,
  DeckTimelineStep,
  DeckItem,
  DeckMatrix,
  DeckPerson,
  DeckFunnelStage,
  DeckEmphasis,
  DeckRun,
  DeckText,
  DeckDecoration,
  DeckDecorationPlacement,
  DeckStyle,
  DeckSpecValidateOptions,
  PlainSlide,
} from './deckSpec';

// Rich decks (2.550.0): text runs, icons, graphics, styles, editing in place.
export { applyEmphasis, editDeckText, emphasisAt, deckTextValue } from './deckText';
export { DeckTextField, EmphasisToolbar, DeckTextPreview, DECK_EMPHASIS_LABELS } from './DeckTextField';
export type { DeckTextFieldProps, EmphasisToolbarProps } from './DeckTextField';
export { DeckIconPicker, DeckIconGlyph, catalogueMatches } from './IconPicker';
export type { DeckIconPickerProps, DeckCatalogueItem, DeckIconPaths, DeckIconSource } from './IconPicker';
export { GraphicPicker } from './GraphicPicker';
export type { GraphicPickerProps, DeckGraphicSource } from './GraphicPicker';
export { DeckStylePicker, DeckStyleSwatch } from './DeckStylePicker';
export type { DeckStylePickerProps } from './DeckStylePicker';
export { SlideRegionsOverlay, regionLabel, regionRow, normalizeRegionPath, readingOrder, DEFAULT_SLIDE_SIZE } from './SlideRegionsOverlay';
export type { SlideRegionsOverlayProps, SlideRegion, SlideRegionKind, SlideRegionBox, SlideRegionRow, SlideSize } from './SlideRegionsOverlay';
export { ItemsEditor, MatrixEditor, PeopleEditor, FunnelEditor, ImageEditor, DecorationField } from './SlideRichForms';
