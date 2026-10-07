import type { CSSProperties } from 'react';
export type DataAccentSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
/** A slot number, or any CSS colour value (`var(--color-x)`, `#2563eb`, `teal`). */
export type DataAccent = DataAccentSlot | (string & {});
export declare const DATA_ACCENT_SLOTS: readonly DataAccentSlot[];
/** Spread onto an element; children paint with `bg-[var(--data-accent)]` etc. */
export declare function dataAccentProps(accent: DataAccent | undefined): {
    'data-accent'?: string;
    style?: CSSProperties;
};
export interface AccentStripeProps {
    accent?: DataAccent;
    /** Stripe thickness in px class terms; default the 5px card edge. */
    className?: string;
    'data-testid'?: string;
}
/** The full-height coloured edge of a card (`<Card className="flex overflow-hidden">`). */
export declare function AccentStripe({ accent, className, 'data-testid': testId }: AccentStripeProps): import("react").JSX.Element;
//# sourceMappingURL=dataAccent.d.ts.map