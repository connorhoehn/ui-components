export type LiveRegionPoliteness = 'polite' | 'assertive' | 'off';
export interface LiveRegionProps {
    /**
     * What to announce. Announced whenever the string changes; set it to `''`
     * to say nothing (an empty region is never spoken).
     */
    message: string;
    /** @default 'polite' */
    politeness?: LiveRegionPoliteness;
    /**
     * Announce the whole message rather than only the changed part.
     * @default true — a partial diff of a status line is rarely intelligible.
     */
    atomic?: boolean;
    /**
     * Minimum gap between announcements, in ms. Messages arriving inside the
     * window are coalesced and the latest one is announced when it closes.
     * `0` disables throttling.
     * @default 0
     */
    throttleMs?: number;
    /**
     * Landmark role. `status` (polite) and `alert` (assertive) carry their own
     * implicit live semantics and are what most callers want; `log` suits an
     * append-only feed. `none` renders the bare `aria-live` container — pick it
     * when the page already has a `status`/`alert` element and a second one
     * would make `getByRole` ambiguous.
     * @default 'status'
     */
    role?: 'status' | 'alert' | 'log' | 'none';
    'data-testid'?: string;
}
export default function LiveRegion({ message, politeness, atomic, throttleMs, role, 'data-testid': testId, }: LiveRegionProps): import("react").JSX.Element;
//# sourceMappingURL=LiveRegion.d.ts.map