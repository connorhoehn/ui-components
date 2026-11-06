# Shared document workspace composition

The reference application's header, authenticated image renderer and upload
completion binding are library-owned. Existing paper/ruler/toolbar/zoom remain
`CanvasDocumentView`; this layer does not add another editor.

- `DocumentHeader` without `onModeChange` uses access-derived mode and the reference
  ownership/lifecycle composition. `workflowActions` and `formatActions` are host
  slots. `titleEditable` is explicit; a read mode never renames by default.
- `saveState: {status: 'pending'|'saved'|'error'|'offline', detail?, onRetry?}` is
  optional. Omitted means unknown, not saved. Set saved only from a durable receipt.
- Lifecycle actions come from the server. The header owns confirmation and reason
  input, not the authorization table. Source draft/review/publish stays host-owned.
- `onPrint`, `onExport`, `exportFormats`, `onToggleHistory`, `onClearDocument` are
  capability seams. Omit unimplemented controls. The modern header never clears or
  finalizes through a CRDT metadata write.
- Existing callers with `onModeChange` retain the frozen selectable-mode contract
  through an internal compatibility component. They also lose the inaccurate
  unconditional Auto-saved claim.
- `createAuthenticatedDocumentImage(Image)` decorates the caller's image extension.
  Wrap the editor in `DocumentImageProvider` with an identity-bound
  `loadImage(src, signal): Promise<Blob>`. Only `/api/uploads/` URLs use this loader
  by default; explicit `requiresAuthentication` can scope a different asset API.
  An identity change aborts old requests and revokes object URLs. Credentials never
  become document attributes. Injecting Image avoids a second TipTap instance.
- `/integrations/realtime-modules` exports `useDocumentImageUpload(documentId,
  displayName, useFileUpload)`. Pass the existing runtime hook. The shared binding
  validates size/type, waits for the server asset URL, handles completion-before-PUT
  ordering and rejects insertion when the document changes/unmounts.
- `WrappedCanvasDocument.beforeConvert` can await removal of legacy section writers
  before materialization. Existing live-schema/onEditorReady/provider/gutter slots
  remain available. It does not decide migration or source authority.

Both consumers assemble the rich schema through realtime-modules'
`createCanvasExtensions`. Header migration does not make example permissions or
backend persistence production-ready; use the server grant and receipt contracts.
