export interface ThinkingDotsProps {
    /** sm: 4px dots, md: 6px dots (default md). */
    size?: 'sm' | 'md';
    className?: string;
}
/**
 * Three dots breathing in sequence — "still going".
 *
 * The dots take `currentColor`, so the caller sets them with a text colour the
 * way every other glyph in this library works. There is no `color` prop: it
 * existed, took an arbitrary CSS string, and could only ever be applied as an
 * inline style — which is banned here, and which nothing was using.
 *
 * The keyframes live in `styles.css` with the rest of them. They were an inline
 * `<style>` injected by the component, so every indicator on screen put another
 * copy of the same rule in the DOM, and the CSS text turned up inside the
 * element's own `textContent` — which is how this was found: a typing indicator
 * read as "@keyframes thinkDot { … } Bob Martinez is typing…".
 */
export declare function ThinkingDots({ size, className }: ThinkingDotsProps): import("react").JSX.Element;
export default ThinkingDots;
//# sourceMappingURL=ThinkingDots.d.ts.map