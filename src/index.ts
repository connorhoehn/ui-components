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
export * from './styles';
export * from './theme';
export * from './api';
export * from './renderers';

// ── Form primitives (Phase 5 + Phase 6) ──
export { Input } from './components/forms/Input';
export type { InputProps, InputSize, InputType } from './components/forms/Input';
export { Select } from './components/forms/Select';
export type { SelectProps, SelectSize, SelectOption, SelectOptionGroup } from './components/forms/Select';
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
export { PopOutIcon, EditIcon, FolderIcon, TrashIcon, PinIcon, BellMutedIcon, LockIcon, ActivityIcon, AtIcon, EyeIcon, ForwardIcon, PhoneIcon, VideoCallIcon, MoonIcon, SunIcon, MenuIcon, TranscribeIcon, BranchIcon, ChartIcon, CodeIcon, PuzzleIcon, RepeatIcon, PaperclipIcon, LinkIcon, QuoteIcon, SmileyIcon, ReplyIcon, WhiteboardIcon } from './components/ui/Icons';
