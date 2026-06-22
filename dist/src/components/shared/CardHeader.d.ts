import { default as React } from 'react';
export interface CardHeaderProps {
    title: string;
    /** Small text below the title. */
    subtitle?: string;
    /** Extra content rendered immediately to the right of the title (badges/chips). */
    meta?: React.ReactNode;
    /** Right-aligned action area (buttons, menus). */
    action?: React.ReactNode;
    className?: string;
}
declare function CardHeader({ title, subtitle, meta, action, className }: CardHeaderProps): React.JSX.Element;
export { CardHeader };
export default CardHeader;
//# sourceMappingURL=CardHeader.d.ts.map