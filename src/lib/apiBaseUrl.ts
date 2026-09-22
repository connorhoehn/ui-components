// Shared runtime resolver for every "which origin do our fetches go to"
// question across the library — document types, ingest, pipelines,
// observability, and any future surface that needs one.
//
// The problem this solves: `import.meta.env.VITE_*` is STATICALLY REPLACED
// at build time, and the build that matters is THIS library's, not a
// consumer's. A component built into `dist/` carries the literal value this
// library's own `.env` had at publish time — nothing, for every VITE_SOCIAL_API_URL
// / VITE_PLATFORM_API_URL read in this codebase — so a consumer's `.env`
// can never reach it, no matter what they set.
//
// Resolution order, checked fresh on every call (nothing is cached beyond
// the override itself):
//   1. `setApiBaseUrl(url)` override — a host calls this once at boot, or a
//      component's own `baseUrl` prop calls it implicitly by being passed
//      straight through. Wins unconditionally, including `''` (a deliberate
//      same-origin choice) — only `null`/`undefined` falls through.
//   2. A RUNTIME env object on `globalThis` — `globalThis.__UI_COMPONENTS_ENV__`.
//      This is NOT `import.meta.env`; it is an ordinary object a consumer can
//      populate at runtime (e.g. a small inline `<script>` its own server
//      writes per-request, or `window.__UI_COMPONENTS_ENV__ = {...}` before
//      the bundle loads) — read here, so changing it never requires
//      rebuilding this library. Absent by default; every existing consumer
//      that sets nothing here is unaffected.
//   3. This library's own build-time `import.meta.env.VITE_SOCIAL_API_URL` /
//      `VITE_PLATFORM_API_URL` — last resort, effectively always `''` in a
//      published build. Kept so the function still does something sane when
//      run inside this library's own dev server / Storybook.
let baseUrlOverride: string | null = null;

/**
 * Point every request that uses this resolver at `url`. Call once during
 * app start-up, before the first request. Pass `null` to fall back to the
 * runtime-env / build-time-env chain again (also how a test suite resets
 * it).
 */
export function setApiBaseUrl(url: string | null): void {
  baseUrlOverride = url;
}

/** The origin requests currently resolve to — see the resolution order above. */
export function getApiBaseUrl(): string {
  if (baseUrlOverride !== null) return baseUrlOverride;

  const runtimeEnv = (globalThis as { __UI_COMPONENTS_ENV__?: Record<string, string | undefined> })
    .__UI_COMPONENTS_ENV__;
  const runtimeValue = runtimeEnv?.VITE_SOCIAL_API_URL ?? runtimeEnv?.VITE_PLATFORM_API_URL;
  if (runtimeValue) return runtimeValue;

  const buildEnv = (import.meta.env ?? {}) as Record<string, string | undefined>;
  return buildEnv.VITE_SOCIAL_API_URL ?? buildEnv.VITE_PLATFORM_API_URL ?? '';
}

// ---------------------------------------------------------------------------
// Back-compat aliases
// ---------------------------------------------------------------------------

/**
 * @deprecated Alias for `setApiBaseUrl`, kept for existing callers. The
 * document-type adapter was the first surface to get an override setter
 * (2.352.0); every other surface reading `VITE_SOCIAL_API_URL` shares the
 * same resolver as of 2.357.0, so the name no longer implies anything
 * document-type-specific. New code should call `setApiBaseUrl`.
 */
export const setDocumentTypeApiBaseUrl = setApiBaseUrl;

/** @deprecated Alias for `getApiBaseUrl` — see `setDocumentTypeApiBaseUrl`. */
export const getDocumentTypeApiBaseUrl = getApiBaseUrl;
