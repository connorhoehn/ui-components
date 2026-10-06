import { type HTMLAttributes, type ReactNode } from 'react';
import { type ChipTone } from '../shared/Chip';
export interface InboxSectionEmpty {
    /** A small glyph above the title. An emoji string is fine. */
    icon?: ReactNode;
    /** One line: "No decisions waiting". */
    title: string;
    /** The hint under it: what would appear here, and when. */
    body?: string;
    /** Lands on the empty-state container. Default `<section testid>-empty`. */
    testId?: string;
}
export interface InboxSectionProps {
    title: string;
    /** How many rows the lane holds. Drawn in the header beside the title. */
    count: number;
    /** Tone of the count chip. `warning` for a lane whose rows block something. */
    countTone?: ChipTone;
    /** Quiet qualifier after the count — "newest blockage first". */
    hint?: ReactNode;
    /** Right-aligned control in the header. */
    action?: ReactNode;
    /** What the lane says instead of rows when `count` is 0. */
    empty?: InboxSectionEmpty;
    /** A note under the rows — a horizon, a caveat. Not drawn when empty. */
    footer?: ReactNode;
    /** Heading level of the title. Default `2`: one lane, one landmark heading. */
    headingLevel?: 2 | 3;
    /** The rows, as `InboxSectionRow`s. */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function InboxSection({ title, count, countTone, hint, action, empty, footer, headingLevel, children, className, 'data-testid': testId, }: InboxSectionProps): import("react").JSX.Element;
export interface InboxSectionRowProps extends HTMLAttributes<HTMLLIElement> {
    children: ReactNode;
    'data-testid'?: string;
}
/** One row of an `InboxSection`. The group draws the frame and the rule. */
export declare function InboxSectionRow({ children, className, ...rest }: InboxSectionRowProps): import("react").JSX.Element;
export default InboxSection;
//# sourceMappingURL=InboxSection.d.ts.map