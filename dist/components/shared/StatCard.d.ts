import type { CSSProperties, ElementType, ReactNode } from 'react';
export interface StatCardDelta {
    /** Magnitude of the change. Rendered with a sign derived from `direction`. */
    value: number;
    /** Trend direction. Drives the arrow glyph (▲/▼) and default sign. */
    direction: 'up' | 'down';
    /**
     * Color tone for the delta line. Defaults:
     *   - up   → positive (success/green)
     *   - down → negative (danger/red)
     *
     * Pass explicitly to override — e.g. on a "Failed events" KPI, a
     * downward trend is actually positive, so `tone: 'positive'`.
     */
    tone?: 'positive' | 'negative' | 'neutral';
    /**
     * Suffix appended to the numeric value. Default `'%'`. Pass `''` for raw
     * counts (e.g. `+12` errors), or `' ms'` etc. for units.
     */
    suffix?: string;
    /** Optional aria-label override for the delta line. */
    'aria-label'?: string;
}
export interface StatCardProps {
    label: ReactNode;
    value: ReactNode;
    accent?: boolean;
    danger?: boolean;
    hint?: ReactNode;
    /**
     * Native tooltip on the whole card — for provenance a reader only needs on
     * demand ("unknown, not zero" behind a $0.00).
     *
     * `hint` is the visible slot and stays the default; this is for text that
     * would crowd the tile. Deliberately the native `title` rather than a new
     * Tooltip component: several shared components already use `title` this way,
     * and one hover mechanism that works everywhere beats two that disagree.
     *
     * It exists because ProjectDetailPage needed exactly this and had to smuggle a
     * bare `<span title>` inside the `label` ReactNode — which put the tooltip on
     * the caption rather than the card, so it only appeared over four words of
     * uppercase text.
     */
    title?: string;
    /**
     * Trend delta rendered below the value (▲ +12% / ▼ -4%, colored by tone).
     * Pass `null` or omit to hide.
     */
    delta?: StatCardDelta | null;
    /**
     * Inline sparkline drawn to the right of the value. Pass the raw number
     * series — the card sizes it at 80×20 by default. Omit to hide.
     */
    sparklineData?: number[];
    /** Destination URL / path. When provided the card renders as a link. */
    to?: string;
    /**
     * Override the link element. Defaults to a plain `<a>` (passes `href`).
     * Pass your router's Link component to get client-side navigation — the `to`
     * prop is forwarded directly so it matches React Router's `<Link to>` API.
     *
     * @example
     * import { Link } from 'react-router';
     * <StatCard to="/admin/capabilities" as={Link} label="…" value={0} />
     */
    as?: ElementType<any>;
    /** Click handler — renders a <button> wrapper if no `to` is given. */
    onClick?: () => void;
    mono?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export declare function StatCard({ label, value, accent, danger, hint, title, delta, sparklineData, to, as: As, onClick, mono, className, style, 'data-testid': testId, }: StatCardProps): import("react").JSX.Element;
export default StatCard;
//# sourceMappingURL=StatCard.d.ts.map