// Adapter between the doc-editor's section-based `DocumentType` shape and the
// platform-api `/api/document-types` resource (field-based `fieldType` +
// `widget` + `cardinality`).
//
// Phase 51 Phase A.5 shipped the lossy half of this: the wizard's
// `sectionType` (a renderer id) was squeezed into the server's fixed field
// enum and everything else (pages, per-mode visibility, renderer overrides,
// placeholders, the local id) was dropped on the floor. That was survivable
// while localStorage was the source of truth — the server copy was just a
// best-effort shadow.
//
// Remote-first (2026-08) inverts that: the SERVER is the source of truth, so
// the round-trip must be lossless. Every write now also carries the full
// local `DocumentType` as an opaque `editorSchema` payload (persisted
// verbatim by platform-api); reads prefer `editorSchema` when present and
// fall back to deriving a section shape from the server fields (covers types
// created outside the wizard, e.g. scripts/seed-document-types.mjs and
// pipeline-template scaffolds).

import type { DocumentType, DocumentTypeField } from '../types/documentType';
import type {
  ApiFieldKind,
  ApiFieldWidget,
  ApiFieldCardinality,
} from '../hooks/useTypedDocuments';

export interface ApiDocumentTypeFieldCreatePayload {
  name: string;
  fieldType: ApiFieldKind;
  widget: ApiFieldWidget;
  cardinality: ApiFieldCardinality;
  required: boolean;
  helpText: string;
}

export interface ApiDocumentTypeCreatePayload {
  name: string;
  description: string;
  icon: string;
  fields: ApiDocumentTypeFieldCreatePayload[];
  /** Full local `DocumentType` — persisted verbatim so reads round-trip losslessly. */
  editorSchema: DocumentType;
}

/** Server-side list/item shape (subset the client reads). */
export interface ApiDocumentTypeItem {
  typeId: string;
  name: string;
  description: string;
  icon: string;
  fields: Array<{
    fieldId: string;
    name: string;
    fieldType: string;
    required?: boolean;
    helpText?: string;
  }>;
  editorSchema?: unknown;
  createdAt: string;
  updatedAt: string;
}

// Map a wizard sectionType (renderer ID) to the Phase A backend field shape.
// Update as new renderers gain Phase B/C/D backend equivalents.
function translateField(field: DocumentTypeField): ApiDocumentTypeFieldCreatePayload {
  let fieldType: ApiFieldKind;
  let widget: ApiFieldWidget;

  switch (field.sectionType) {
    case 'rich-text':
    case 'long-text':
    case 'long_text':
      fieldType = 'long_text';
      widget = 'textarea';
      break;
    case 'number':
      fieldType = 'number';
      widget = 'number_input';
      break;
    case 'date':
      fieldType = 'date';
      widget = 'date_picker';
      break;
    case 'boolean':
    case 'checkbox':
      fieldType = 'boolean';
      widget = 'checkbox';
      break;
    case 'text':
    default:
      // Unknown renderer falls back to plain text. The wizard will still
      // edit the section using its renderer locally; the server-side API
      // representation simplifies to text for now. The lossless copy rides
      // along in `editorSchema`.
      fieldType = 'text';
      widget = 'text_field';
      break;
  }

  return {
    name: field.name,
    fieldType,
    widget,
    cardinality: 1,
    required: field.required,
    helpText: field.placeholder ?? '',
  };
}

export function translateForApi(local: DocumentType): ApiDocumentTypeCreatePayload {
  return {
    name: local.name,
    description: local.description,
    icon: local.icon,
    fields: local.fields.map(translateField),
    editorSchema: local,
  };
}

// ---------------------------------------------------------------------------
// Server → editor hydration
// ---------------------------------------------------------------------------

// Reverse of translateField for types that have no editorSchema (created by
// the seed script / template scaffolds). Unregistered sectionTypes render via
// the DefaultRenderer wildcard, so this only needs to be sensible, not exact.
function fieldKindToSectionType(fieldType: string): string {
  switch (fieldType) {
    case 'long_text': return 'rich-text';
    case 'number':    return 'number';
    case 'date':      return 'date';
    case 'boolean':   return 'checkbox';
    default:          return 'text'; // text / enum / reference
  }
}

// Duplicated shape-check (rather than importing from useDocumentTypes) to
// avoid a lib → hooks import cycle; useDocumentTypes imports this module.
function looksLikeDocumentType(x: unknown): x is DocumentType {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' && o.id.length > 0 &&
    typeof o.name === 'string' && o.name.length > 0 &&
    typeof o.description === 'string' &&
    typeof o.icon === 'string' &&
    Array.isArray(o.fields) &&
    typeof o.createdAt === 'string' &&
    typeof o.updatedAt === 'string'
  );
}

/**
 * Convert one server item into the editor's `DocumentType`.
 *
 * - `editorSchema` present and valid → use it verbatim (the id is the
 *   ORIGINAL local id, so documents referencing `documentTypeId` and e2e
 *   testids stay stable across the upload → re-download round-trip), with
 *   server-side name/description/icon winning (they may have been edited via
 *   the API after the schema was uploaded).
 * - otherwise → derive a section per server field; the server `typeId`
 *   becomes the editor id.
 *
 * Either way the (editor id → server typeId) mapping is registered so later
 * PUT/DELETE calls target the right server resource.
 */
export function hydrateServerDocumentType(item: ApiDocumentTypeItem): DocumentType {
  if (looksLikeDocumentType(item.editorSchema)) {
    const local: DocumentType = {
      ...item.editorSchema,
      name: item.name,
      description: item.description ?? item.editorSchema.description,
      icon: item.icon ?? item.editorSchema.icon,
      updatedAt: item.updatedAt ?? item.editorSchema.updatedAt,
      serverTypeId: item.typeId,
    };
    localToServerId.set(local.id, item.typeId);
    return local;
  }

  const derived: DocumentType = {
    id: item.typeId,
    serverTypeId: item.typeId,
    name: item.name,
    description: item.description ?? '',
    icon: item.icon ?? '📄',
    fields: (item.fields ?? []).map((f) => ({
      id: f.fieldId,
      name: f.name,
      sectionType: fieldKindToSectionType(f.fieldType),
      required: f.required === true,
      defaultCollapsed: false,
      placeholder: f.helpText ?? '',
      hiddenInModes: [],
      rendererOverrides: {},
    })),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
  localToServerId.set(derived.id, item.typeId);
  return derived;
}

// ---------------------------------------------------------------------------
// Fetch — the remote-first read path
// ---------------------------------------------------------------------------

// Host apps disagree on what they call this origin: the library's own
// surfaces read VITE_SOCIAL_API_URL, the realtime-examples app renamed it
// VITE_PLATFORM_API_URL, and hardcoding either one is precisely the kind of
// single-string mismatch that motivated a forked copy of this file. Accept
// both, library name first.
function getBaseUrl(): string {
  const env = (import.meta.env ?? {}) as Record<string, string | undefined>;
  return env.VITE_SOCIAL_API_URL ?? env.VITE_PLATFORM_API_URL ?? '';
}

function authHeaders(idToken?: string | null): Record<string, string> {
  return idToken ? { Authorization: `Bearer ${idToken}` } : {};
}

export type FetchTypesResult =
  | { ok: true; types: DocumentType[] }
  | { ok: false; error: string };

/**
 * GET /api/document-types → editor-shaped `DocumentType[]`.
 * Never throws; a network/HTTP failure comes back as `{ ok: false }` so the
 * caller can fall back to its offline cache.
 */
export async function fetchDocumentTypesFromServer(
  idToken?: string | null,
): Promise<FetchTypesResult> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/document-types`, {
      headers: authHeaders(idToken),
    });
    if (!res.ok) return { ok: false, error: `GET failed: ${res.status}` };
    const body = await res.json() as { items?: ApiDocumentTypeItem[] };
    const items = Array.isArray(body.items) ? body.items : [];
    return { ok: true, types: items.map(hydrateServerDocumentType) };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

// ---------------------------------------------------------------------------
// Write-through helpers — never throw into the caller.
// ---------------------------------------------------------------------------

/**
 * Map of editor-side type id → server-side typeId. Populated by
 * `hydrateServerDocumentType` on every read and by successful creates, so
 * update/delete can target the right server resource without an extra
 * round-trip lookup.
 */
const localToServerId = new Map<string, string>();

export function _resetLocalToServerIdForTests(): void {
  localToServerId.clear();
}

export interface SyncResult {
  ok: boolean;
  serverTypeId?: string;
  /** HTTP status when the server answered; absent on network failure. */
  status?: number;
  error?: string;
}

/** True when the server itself REJECTED the write (4xx) — do not save locally. */
export function isRejection(r: SyncResult): boolean {
  return !r.ok && r.status !== undefined && r.status >= 400 && r.status < 500;
}

export async function syncDocumentTypeCreate(
  local: DocumentType,
  idToken?: string | null,
): Promise<SyncResult> {
  try {
    const payload = translateForApi(local);
    const res = await fetch(`${getBaseUrl()}/api/document-types`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders(idToken) },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, status: res.status, error: `POST failed: ${res.status}` };
    const created = await res.json() as { typeId: string };
    localToServerId.set(local.id, created.typeId);
    return { ok: true, serverTypeId: created.typeId };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export async function syncDocumentTypeUpdate(
  local: DocumentType,
  idToken?: string | null,
): Promise<SyncResult> {
  // In-memory map first (same-session create), then the persisted marker
  // (hydrated in an earlier session / another hook instance).
  const serverTypeId = localToServerId.get(local.id) ?? local.serverTypeId;
  if (!serverTypeId) {
    // We never synced this type; treat the update as a fresh create.
    return syncDocumentTypeCreate(local, idToken);
  }
  try {
    const payload = translateForApi(local);
    const res = await fetch(`${getBaseUrl()}/api/document-types/${serverTypeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders(idToken) },
      body: JSON.stringify(payload),
    });
    if (res.status === 404) {
      // Server-side row vanished — re-create it.
      localToServerId.delete(local.id);
      return syncDocumentTypeCreate(local, idToken);
    }
    if (!res.ok) return { ok: false, status: res.status, error: `PUT failed: ${res.status}` };
    return { ok: true, serverTypeId };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export async function syncDocumentTypeDelete(
  localId: string,
  idToken?: string | null,
  serverTypeIdHint?: string,
): Promise<SyncResult> {
  const serverTypeId = localToServerId.get(localId) ?? serverTypeIdHint;
  if (!serverTypeId) return { ok: true }; // never synced; nothing to do
  try {
    const res = await fetch(`${getBaseUrl()}/api/document-types/${serverTypeId}`, {
      method: 'DELETE',
      headers: authHeaders(idToken),
    });
    if (!res.ok && res.status !== 404) {
      return { ok: false, status: res.status, error: `DELETE failed: ${res.status}` };
    }
    localToServerId.delete(localId);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
