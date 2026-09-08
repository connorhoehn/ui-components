// Phase 51 / hub#80 — best-effort sync from the decisions renderer to
// the server-side approval log (POST /api/approvals, hub#62).
//
// Called from DecisionsEditorRenderer when an entry's status transitions
// to a terminal value. Errors are swallowed and logged — the CRDT layer
// stays the source of truth for live editing; this server-side mirror
// is the audit/query surface and must not block the UX.

const TERMINAL_DECISIONS = {
  acked: 'approved',
  done: 'approved',
  rejected: 'rejected',
} as const;

export type TerminalRendererStatus = keyof typeof TERMINAL_DECISIONS;
export type ApprovalDecision = typeof TERMINAL_DECISIONS[TerminalRendererStatus];

// ---------------------------------------------------------------------------
// Where the approvals API lives
// ---------------------------------------------------------------------------
//
// This used to read one hardcoded Vite variable, `VITE_SOCIAL_API_URL`. That
// is the library author's deployment naming, not a contract, and a host that
// calls its backend anything else — `VITE_PLATFORM_API_URL`, say — got an
// empty base and posted every approval at its OWN origin, where nothing
// answers. Silently: `postApproval` swallows the failure by design, so the
// only symptom is an audit log that stays empty.
//
// Resolution order, first non-empty wins:
//   1. an explicit override from `setApprovalApiBase()` (or a per-call
//      `baseUrl`), which is the supported way for a host to say this outright;
//   2. `VITE_PLATFORM_API_URL`, then `VITE_SOCIAL_API_URL`, so both existing
//      deployments keep working with no configuration at all;
//   3. `''` — same-origin, the old default.

/** A string, or a getter for a host that resolves its base URL lazily. */
export type ApprovalApiBase = string | (() => string);

const ENV_KEYS = ['VITE_PLATFORM_API_URL', 'VITE_SOCIAL_API_URL'] as const;

let _override: ApprovalApiBase | null = null;

/**
 * Point the approvals sync at a host's own API. Pass `null` to fall back to
 * the environment. Call once at startup, before any decision is finalized.
 */
export function setApprovalApiBase(base: ApprovalApiBase | null): void {
  _override = base;
}

function envBase(): string {
  // `import.meta.env` is absent under a plain Node/Jest host; the renderers
  // are public exports, so this must not throw there.
  const env = (import.meta as { env?: Record<string, string | undefined> }).env ?? {};
  for (const key of ENV_KEYS) {
    const value = env[key];
    if (value) return value;
  }
  return '';
}

export function getApprovalApiBase(): string {
  if (_override != null) {
    const resolved = typeof _override === 'function' ? _override() : _override;
    if (resolved) return resolved;
  }
  return envBase();
}

// Parses `/documents/<id>` from the current URL. Returns null when the
// path doesn't match — caller treats that as "not in a doc context,
// skip the sync."
export function readDocumentIdFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const m = window.location.pathname.match(/\/documents\/([^/?#]+)/);
  return m ? m[1] : null;
}

export function mapStatusToDecision(status: string): ApprovalDecision | null {
  return (TERMINAL_DECISIONS as Record<string, ApprovalDecision>)[status] ?? null;
}

export interface PostApprovalArgs {
  sectionId: string;
  decision: ApprovalDecision;
  reviewerName?: string;
  comment?: string;
  /** Override for tests; production reads from window.location. */
  documentId?: string | null;
  /** Optional bearer token. Dev (SKIP_AUTH=true) accepts unauthenticated. */
  idToken?: string | null;
  /** Per-call override of the API base; falls back to `getApprovalApiBase()`. */
  baseUrl?: string;
}

export async function postApproval(args: PostApprovalArgs): Promise<{ ok: boolean; error?: string }> {
  const documentId = args.documentId ?? readDocumentIdFromUrl();
  if (!documentId) return { ok: false, error: 'no documentId in URL' };
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (args.idToken) headers.Authorization = `Bearer ${args.idToken}`;
    const base = args.baseUrl ?? getApprovalApiBase();
    const res = await fetch(`${base}/api/approvals`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        documentId,
        sectionId: args.sectionId,
        decision: args.decision,
        ...(args.reviewerName ? { reviewerName: args.reviewerName } : {}),
        ...(args.comment ? { comment: args.comment } : {}),
      }),
    });
    if (!res.ok) return { ok: false, error: `POST failed: ${res.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
