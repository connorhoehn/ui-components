export * from './types';
export * from './hooks';
export * from './contexts';
export * from './components/shared';
export * from './components/sidebar';
export * from './components/hangout';
export * from './components/layout';
export * from './components/social';
export * from './components/video';
export * from './components/identity';
export * from './components/change-review';
export * from './components/inbox';
export * from './components/graph';
export * from './components/work';
export * from './components/search';
export * from './styles';
export * from './theme';
export * from './api';
export * from './renderers';

// The agent composer dock (2.403.0), LAZY here: it is a RichChatComposer, whose
// tiptap mention stack the root entry must not need statically. The real
// (static) component is on `…/social/rich-composer`. See AgentComposerDockLazy.tsx.
export { AgentComposerDock } from './components/social/AgentComposerDockLazy';
export type { AgentComposerDockProps, AgentComposerWorkflow, AgentComposerSendContext } from './components/social/AgentComposerDock';
export { composerDraftOf } from './components/social/agentComposerDraft';

// ContextComposer (2.407.0): one composer for a conversation, a document, a
// work item, a diagram, an initiative or a search — LAZY here for the same
// reason as AgentComposerDock; the static component is on
// `…/social/rich-composer`. The context table is pure and static.
export { ContextComposer } from './components/social/ContextComposerLazy';
export type {
  ContextComposerProps,
  ContextComposerSendContext,
  ComposerWorkflow,
  ComposerReply,
  ComposerTaskReport,
} from './components/social/ContextComposer';
export { composerContextPreset, identityDisplayName, COMPOSER_CONTEXT_KINDS, COMPOSER_CONTEXT_REASONS } from './components/social/composerContext';
export type {
  ComposerContext,
  ComposerContextKind,
  ComposerContextFeatures,
  ComposerContextPreset,
  ComposerContextWiring,
  ComposerIdentity,
} from './components/social/composerContext';

// ── Form primitives (Phase 5 + Phase 6) ──
export { Input } from './components/forms/Input';
export type { InputProps, InputSize, InputType } from './components/forms/Input';
export { Select } from './components/forms/Select';
export type { SelectProps, SelectSize, SelectOption, SelectOptionGroup } from './components/forms/Select';
export { InlineEditableText } from './components/forms/InlineEditableText';
export type { InlineEditableTextProps } from './components/forms/InlineEditableText';
export { Textarea } from './components/forms/Textarea';
export type { TextareaProps } from './components/forms/Textarea';
export { FileInput } from './components/forms/FileInput';
export type { FileInputProps } from './components/forms/FileInput';
export { JsonPathInput } from './components/forms/JsonPathInput';
export type { JsonPathInputProps, JsonPathSample } from './components/forms/JsonPathInput';
export { NumberInput } from './components/forms/NumberInput';
export type { NumberInputProps } from './components/forms/NumberInput';
export { RadioGroup } from './components/forms/RadioGroup';
export type { RadioGroupProps, RadioOption } from './components/forms/RadioGroup';
export { Checkbox } from './components/forms/Checkbox';
export type { CheckboxProps } from './components/forms/Checkbox';
export { ColorInput } from './components/forms/ColorInput';
export type { ColorInputProps } from './components/forms/ColorInput';
export { Slider } from './components/forms/Slider';
export { RangeSlider } from './components/forms/RangeSlider';
export type { RangeSliderProps } from './components/forms/RangeSlider';
export type { SliderProps } from './components/forms/Slider';

// ── Image primitives (Phase 5) ──
export { ImageThumbnail } from './components/image/ImageThumbnail';
export type { ImageThumbnailProps, ImageThumbnailSize, ImageThumbnailAspect } from './components/image/ImageThumbnail';
export { GenerativeImagePreview } from './components/image/GenerativeImagePreview';
export type { GenerativeImagePreviewProps, GenerativeImagePreviewStatus } from './components/image/GenerativeImagePreview';

// ── Pipeline node composites (Phase 5) ──
export { NodeCard } from './components/pipelines/nodes/NodeCard';
export type { NodeCardProps } from './components/pipelines/nodes/NodeCard';

// ── Pipeline editor services seam ──
export {
  PipelineEditorServicesProvider,
  useImageUrl,
  usePipelineEditorServices,
} from './components/pipelines/services';
export type {
  PipelineEditorServices,
} from './components/pipelines/services';
export type { UploadedImage as PipelineUploadedImage } from './components/pipelines/services';

// Disambiguators for names that collide between domains.
// Each line below resolves a TS2308 by picking the pre-existing canonical
// source at root (so existing consumers see no change). New-domain
// counterparts remain reachable via their subpath import (e.g.
// `@connorhoehnslalom/ui-components/social`), and are also re-exported here under
// disambiguated aliases for root-import convenience.
export type { CommentThread } from './types';
export type { Participant } from './types';
export type { MfaDevice } from './types';
export { FormField } from './components/shared';
export type { FormFieldProps } from './components/shared';
export type { AuditPage } from './api/pipelineAudit';

// Aliases for new-domain symbols whose original name collides with a pre-existing root export.
// Consumers wanting the unaliased name should use the subpath import.
export { CommentThread as CommentThreadPanel } from './components/social';
export type { Participant as VideoParticipant } from './components/video';
export { FormField as IdentityFormField } from './components/identity';
export type { FormFieldProps as IdentityFormFieldProps } from './components/identity';
export { AuditPage as IdentityAuditPage } from './components/identity';

// ---------------------------------------------------------------------------
// Error boundary
// ---------------------------------------------------------------------------

// `ErrorBoundary` lives in `components/misc/`, which is neither re-exported
// here nor an `exports` subpath — so until now it had NO consumer-reachable
// import path at all. It reached `dist` only through
// `integrations/realtime-modules`, which resolves to an unpublished peer
// (#1493), i.e. nowhere a consumer can get to.
//
// That is the same reachability gap #1021 closed for layout/social/video/
// identity, left open on the one component whose entire job is to stop a bad
// row from blanking a page. A consumer importing `PipelineEditorPage` or
// `DocumentEditorPage` directly — which is exactly what event-catalog and
// websocket-gateway do — had no way to wrap it in the library's own boundary.
//
// Additive export; no existing symbol changes. `misc/` deliberately stays
// otherwise unexported — the rest of it is dev/debug surface, not API.
export { ErrorBoundary } from './components/misc/ErrorBoundary';

// Explicit: both the shared barrel and the ui barrel star-export Icons, and TS refuses an ambiguous name.
export { PopOutIcon, EditIcon, FolderIcon, TrashIcon, PinIcon, BellIcon, BellMutedIcon, LockIcon, ActivityIcon, AtIcon, EyeIcon, ForwardIcon, PhoneIcon, VideoCallIcon, MoonIcon, SunIcon, MenuIcon, TranscribeIcon, BranchIcon, ChartIcon, CodeIcon, PuzzleIcon, RepeatIcon, PaperclipIcon, LinkIcon, QuoteIcon, SmileyIcon, ReplyIcon, WhiteboardIcon, CommentIcon, InfoIcon, ArrowRightIcon, PeopleIcon, GripIcon, FilterIcon, ListIcon, SparkleIcon, ChevronIcon, UndoIcon, RedoIcon, ImageIcon, BulletListIcon, NumberedListIcon, ListStyleIcon, ChecklistIcon, HighlighterIcon, MoreIcon, WarningIcon, UploadIcon, CheckIcon, PlusCircleIcon, SlidersIcon, PersonIcon, ArrowUpIcon, ExternalLinkIcon, SendIcon, DownloadIcon, PrinterIcon, PlayCircleIcon, CopyIcon, DocumentAddIcon, TemplateIcon, DesktopIcon, LaptopIcon, SplitViewIcon, MaximizeIcon, KeyboardIcon, BotIcon, CloudIcon } from './components/ui/Icons';

// A sidebar-filling counterpart to `Panel`'s outer chrome — fills its
// parent in normal flow (no portal, no fixed width, no floating chrome).
// Pair with the existing `PanelHeader` / `PanelBody`. See InlinePanel.tsx
// for why this is a separate component rather than a `Panel` variant.
export { InlinePanel } from './components/ui/InlinePanel';
export type { InlinePanelProps } from './components/ui/InlinePanel';

// A native `<details>/<summary>` collapsible with a real controlled /
// uncontrolled `open` contract and an optional semantic `tone`.
export { Disclosure } from './components/ui/Disclosure';
export type { DisclosureProps } from './components/ui/Disclosure';

// ---------------------------------------------------------------------------
// Presentation editing
// ---------------------------------------------------------------------------

// The `presentation` document type's editing surface, named explicitly rather
// than by star-exporting the doc-editor barrel — that barrel carries the whole
// document editor, and pulling it into the root entry would change what every
// consumer of `@connorhoehnslalom/ui-components` downloads.
//
// The DeckSpec types come along because a host that renders this component has
// to hold the spec, and importing the contract from a second path would be the
// kind of split that lets the two drift.
export { PresentationEditor } from './components/doc-editor/presentation/PresentationEditor';
export type {
  PresentationEditorProps,
  PresentationEditorRevision,
  PresentationPreview,
  PresentationPreviewSlide,
  PresentationInstructContext,
  PresentationInstructResult,
  PresentationInstructScope,
} from './components/doc-editor/presentation/PresentationEditor';
export type { PresentationSourceOption } from './components/doc-editor/presentation/SlideSources';
export {
  MAX_SLIDES as MAX_DECK_SLIDES,
  SLIDE_LAYOUTS,
  SLIDE_LAYOUT_LABELS,
  DECK_THEMES,
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
} from './components/doc-editor/presentation/deckSpec';
export type {
  DeckChart,
  DeckImage,
  DeckQuote,
  DeckSlide,
  DeckSource,
  DeckSpec,
  DeckTheme,
  SlideLayout,
} from './components/doc-editor/presentation/deckSpec';

// An agent's pending edits to an open document (2.408.0). Named explicitly,
// like PresentationEditor above: the strip imports only shared primitives, so
// the root entry gains no editor dependency.
export { ProposedEditStrip, proposedEditPreview, proposedEditPlacement } from './components/doc-editor/ProposedEditStrip';
export type { ProposedEdit, ProposedEditStatus, ProposedEditStripProps } from './components/doc-editor/ProposedEditStrip';

// ---------------------------------------------------------------------------
// REST origin overrides
// ---------------------------------------------------------------------------

// `import.meta.env.VITE_*` is replaced when a bundle is BUILT, and the bundle
// that ships is this library's — so the env names every REST-backed surface
// falls back to are baked in as `''` for every consumer, and requests went
// same-origin to a path that is not there, silently. A host calls
// `setApiBaseUrl` once at start-up with its own origin and it wins over both
// the build-time env and a small runtime-env escape hatch — see
// `./lib/apiBaseUrl`'s own doc comment for the full resolution order. Same
// gap, same shape, as `ActivityPanel`'s `baseUrl` prop and
// `useTypedDocuments`' `baseUrl` option.
export {
  setApiBaseUrl,
  getApiBaseUrl,
  /** @deprecated Aliases of `setApiBaseUrl`/`getApiBaseUrl` — see `./lib/apiBaseUrl`. */
  setDocumentTypeApiBaseUrl,
  getDocumentTypeApiBaseUrl,
} from './lib/apiBaseUrl';
