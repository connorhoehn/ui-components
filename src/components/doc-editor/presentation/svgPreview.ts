// Turning the generator's SVG string into something an <img> can show.
//
// The preview arrives as SVG SOURCE, not as a URL — `POST /api/deck/preview`
// renders it in the request and persists nothing, so there is no address to
// point at. That leaves two ways to put it on screen, and only one of them is
// safe.
//
// `dangerouslySetInnerHTML` would inline the markup into the document, where
// any `<script>` or `onload=` the generator emitted runs with the app's
// origin. The deck's text comes from a model reading user documents, so that
// is a script-injection path with a language model on the writing end of it.
//
// A `data:` URI in an `<img src>` cannot do that: images are rendered in a
// non-scripting context by every browser, so script elements, event handlers
// and external references inside the SVG are all inert. The cost is that the
// SVG cannot be styled by the page or made interactive, neither of which a
// slide thumbnail wants.

/** `data:` URI for an `<img src>`, or `undefined` for an empty/absent source. */
export function svgDataUri(svg: string | undefined): string | undefined {
  if (!svg) return undefined;
  const trimmed = svg.trim();
  if (!trimmed) return undefined;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(trimmed)}`;
}
