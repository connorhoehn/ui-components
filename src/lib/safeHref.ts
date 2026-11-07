/**
 * Schemes a link may use.
 *
 * `javascript:` is the obvious exclusion; `data:` is the less obvious one —
 * `data:text/html` in an anchor executes in the page's origin on click.
 */
const SAFE_SCHEME = /^(https?:|mailto:)/i;

export function safeHref(raw: string | null): string | null {
  if (!raw) return null;
  const v = raw.trim();
  // Relative links stay in-app and cannot carry a scheme.
  if ((v.startsWith('/') && v[1] !== '/' && v[1] !== '\\') || v.startsWith('#')) return v;
  return SAFE_SCHEME.test(v) ? v : null;
}

