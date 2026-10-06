import React from 'react';
export interface CardHeaderProps {
    title: string;
    /** Small text below the title. */
    subtitle?: string;
    /** Extra content rendered immediately to the right of the title (badges/chips). */
    meta?: React.ReactNode;
    /** Right-aligned action area (buttons, menus). */
    action?: React.ReactNode;
    /**
     * The header owns its own gutter and bottom rule. For a `Card padding="none"`
     * host — one with a full-bleed footer or edge-to-edge rows — where the card
     * is not padding the header for it; without this the title hangs on the
     * card's top-left edge.
     */
    inset?: boolean;
    className?: string;
}
declare function CardHeader({ title, subtitle, meta, action, inset, className }: CardHeaderProps): React.JSX.Element;
export { CardHeader };
export default CardHeader;
//# sourceMappingURL=CardHeader.d.ts.map