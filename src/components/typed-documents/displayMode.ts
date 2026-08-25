// Phase 51 Phase E — display-mode visibility helpers.
//
// A field's `displayModes` is an opt-in object. Defaults:
//   - `full`   ⇒ true   (every field is visible in detail view by default)
//   - `teaser` ⇒ false  (compact summary card; admin opts in)
//   - `list`   ⇒ false  (dense one-line list; admin opts in)
//
// A field with no `displayModes` at all behaves as { full: true }.

import type {
  ApiDisplayMode,
  ApiDocumentType,
  ApiDocumentTypeField,
  ApiFieldDisplayModes,
} from '../../hooks/useTypedDocuments';

const DEFAULT_VISIBILITY: Record<ApiDisplayMode, boolean> = {
  full: true,
  teaser: false,
  list: false,
};

export function isFieldVisibleInMode(field: ApiDocumentTypeField, mode: ApiDisplayMode): boolean {
  const dm: ApiFieldDisplayModes | undefined = field?.displayModes;
  // Both of these are public exports, so `mode` is host-supplied. An unknown
  // mode made `DEFAULT_VISIBILITY[mode]` undefined — falsy — so every field was
  // filtered out and `visibleFieldsForMode` returned `[]` with nothing to
  // signal it: a host passing `mode="card"` saw every document render as an
  // empty card and no error anywhere. Default to visible, so an unrecognised
  // mode over-shows rather than silently hiding the document's contents.
  const fallback = DEFAULT_VISIBILITY[mode] ?? true;
  if (!dm || dm[mode] === undefined) return fallback;
  return dm[mode] === true;
}

export function visibleFieldsForMode(type: ApiDocumentType, mode: ApiDisplayMode): ApiDocumentTypeField[] {
  // `fields` is typed required but arrives from `GET /api/document-types`,
  // where a summary projection or a type mid-creation can omit it.
  const fields = Array.isArray(type?.fields) ? type.fields : [];
  return fields.filter((f) => f != null && isFieldVisibleInMode(f, mode));
}

export const ALL_DISPLAY_MODES: ApiDisplayMode[] = ['full', 'teaser', 'list'];
