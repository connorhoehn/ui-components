import type { ReactNode } from 'react';
import { type FileKind } from '../shared/FileKindMark';
export interface SourceCardProps {
    id: string;
    title: string;
    /** The mark's kind. Default `page`. */
    kind?: FileKind;
    /** When the source was written. ISO string, epoch ms or Date. */
    timestamp?: string | number | Date | null;
    /** A line or two of what the source says. Clamped to two lines. */
    excerpt?: ReactNode;
    onOpen?: (id: string) => void;
    href?: string;
    /** This is the source being viewed. */
    current?: boolean;
    /**
     * A quiet line under the title that REPLACES the age — "Source pattern ·
     * auth-service". Since 2.389.0.
     */
    meta?: string;
    /**
     * `card` (default): the mark, a title that is the control, the age, the
     * excerpt. `row` (since 2.389.0): a "based on" row — the WHOLE row is one
     * control (a button with `onOpen`, a link with `href`), the mark in a 32px
     * bordered tile, a 13px medium title, a 12px tertiary meta line, and a
     * trailing chevron. No excerpt. The accessible name is the title.
     */
    layout?: 'card' | 'row';
    /** Clock for the age (tests, server-rendered snapshots). Default `Date.now()`. */
    now?: number;
    className?: string;
    'data-testid'?: string;
}
/** "9h ago", "just now", "Sep 3" — `formatCompactAge` read as a sentence. */
export declare function formatSourceAge(value: string | number | Date | null | undefined, now?: number): string | undefined;
export declare function SourceCard({ id, title, kind, timestamp, excerpt, onOpen, href, current, meta, layout, now, className, 'data-testid': testId, }: SourceCardProps): import("react").JSX.Element;
export type SourceListItem = Omit<SourceCardProps, 'now' | 'className' | 'data-testid' | 'layout'>;
export interface SourceListProps {
    items: SourceListItem[];
    /** Shown when `items` is empty. Default "No sources recorded". */
    emptyLabel?: string;
    /** Applied to every card that has no handler of its own. */
    onOpen?: (id: string) => void;
    now?: number;
    /** Forwarded to every card — `row` for a "Based on" list. Since 2.389.0. */
    layout?: 'card' | 'row';
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}
export declare function SourceList({ items, emptyLabel, onOpen, now, layout, className, 'aria-label': ariaLabel, 'data-testid': testId, }: SourceListProps): import("react").JSX.Element;
export default SourceCard;
//# sourceMappingURL=SourceCard.d.ts.map