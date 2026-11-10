/**
 * Schemes a link may use.
 *
 * `javascript:` is the obvious exclusion; `data:` is the less obvious one —
 * `data:text/html` in an anchor executes in the page's origin on click.
 */
const SAFE_SCHEME = /^(https?:|mailto:)/i;

export function safeHref(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const v = raw.trim();
  // Relative links stay in-app and cannot carry a scheme.
  if ((v.startsWith('/') && v[1] !== '/' && v[1] !== '\\') || v.startsWith('#')) return v;
  if (SAFE_SCHEME.test(v)) return v;
  // Scheme-less relative references (`docs/a`, `../a`, `?tab=x`) stay in-app.
  // No `:` before the first `/`, `?` or `#` means no scheme; control characters
  // are refused because browsers strip them, which can reassemble `java\tscript:`.
  if (/[\u0000-\u001f\\]/.test(v) || v.startsWith('//')) return null;
  const firstDelim = v.search(/[/?#]/);
  const head = firstDelim === -1 ? v : v.slice(0, firstDelim);
  return head.includes(':') ? null : v;
}


/**
 * Mime types a `data:` download may carry. Active content (html, svg, xml,
 * javascript) is deliberately absent: it runs in-origin if opened.
 */
const SAFE_DATA_URL = /^data:(image\/(png|jpe?g|gif|webp|avif|bmp)|audio\/[\w.+-]+|video\/[\w.+-]+|application\/(pdf|octet-stream|zip|json)|text\/(plain|csv))[;,]/i;

/**
 * For a link that downloads a user's own file (`<a download>`): everything
 * `safeHref` allows, plus `blob:` object URLs and `data:` URLs of passive
 * types. `data:text/html`, `javascript:` and `vbscript:` stay rejected.
 */
export function safeDownloadHref(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const v = raw.trim();
  if (/^blob:/i.test(v) || SAFE_DATA_URL.test(v)) return v;
  return safeHref(v);
}
