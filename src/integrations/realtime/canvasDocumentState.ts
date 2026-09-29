import type { DocumentSaveState } from '../../components/doc-editor/DocumentSaveStatus';

/**
 * Save-state line for a canvas document. Only a durable backend receipt may
 * select `saved`; `idle` shows nothing.
 */
export function canvasDocumentSaveState(
  state: 'idle' | 'pending' | 'saved' | 'error',
  pending: number,
  online: boolean,
  retry: () => void,
): DocumentSaveState | undefined {
  if (state === 'idle') return undefined;
  return {
    status: !online && pending > 0 ? 'offline' : state,
    ...(state === 'error' || !online ? { onRetry: retry } : {}),
  };
}

/** Auth expiry is independent of whether a socket is open; the app adds its own mode rules. */
export function canEditCanvasGrant(grant: { canEdit: boolean; expiresAt: number }, accessValid: boolean, now = Date.now()): boolean {
  return accessValid && grant.canEdit && grant.expiresAt > now;
}
