import type { ReactNode, CSSProperties } from 'react';
export type BannerVariant = 'error' | 'warning' | 'info' | 'success';
export interface BannerProps {
    variant?: BannerVariant;
    /** Bold prefix label shown before children. */
    title?: string;
    /**
     * How the title sits against the body.
     *
     * `inline` (default) is right across a page: a short title and a short
     * message read as one line. It is wrong in a narrow column — in a 280px
     * comment gutter the two children split the width and the body was left
     * with 68px, about six characters per line, wrapping into a ragged tower.
     * `stacked` puts the title above the body and gives each the full width.
     *
     * `callout` (since 2.389.0) is a full-width notice in a document body:
     * icon · title over body · trailing action, all vertically centred. The
     * surface is the tone's pale `--color-{tone}-callout` fill and
     * `-callout-border` (since 2.389.4; the soft `-bg` before), the title reads in
     * primary ink and the body in secondary ink so a paragraph of advice stays
     * legible — only the icon carries the tone colour.
     */
    layout?: 'inline' | 'stacked' | 'callout';
    /**
     * A leading glyph. `true` draws the tone's default (a warning triangle for
     * `warning`/`error`, an info circle for `info`, a check for `success`); a
     * node is drawn as given. Omitted (default) draws none — existing banners
     * are unchanged. Since 2.389.0.
     */
    icon?: ReactNode | true;
    onDismiss?: () => void;
    /**
     * A control that resolves what the banner is about — "Convert to page" on a
     * deprecation notice, "Retry" on a failure. Sits at the trailing edge,
     * before the dismiss button, and never shrinks under a long message.
     */
    action?: ReactNode;
    /**
     * `callout` only: a 3px solid tone bar down the left edge — the notice
     * reads as a pull-quote in a document body ("What needs attention").
     * Default `none`. Since 2.390.0.
     */
    accent?: 'none' | 'bar';
    /**
     * `callout` only: a third line under the body — facts about the thing the
     * notice is about ("Blocked · Eli Garcia · 2 points"), already worded and
     * toned by the host. Since 2.390.0.
     */
    meta?: ReactNode;
    /**
     * `callout` only: `md` (default) is the 14px title over a 13px body; `lg`
     * is a 17px title over a 15px body with roomier padding — a callout that is
     * a section's content, not a note beside it — and its `action` sits level
     * with the title rather than centred on the block. Since 2.390.0.
     */
    size?: 'md' | 'lg';
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
export default function Banner({ variant, title, layout, icon, onDismiss, action, accent, meta, size, children, className, style, 'data-testid': testId, }: BannerProps): import("react").JSX.Element;
//# sourceMappingURL=Banner.d.ts.map