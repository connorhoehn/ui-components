import type { ReactNode } from 'react';
export interface ConversationShelfItem {
    id: string;
    label: string;
    /**
     * A glyph component from `ui/Icons` (e.g. `<ActivityIcon />`), rendered in a
     * fixed-size box so every row's label starts at the same x. Avoid emoji —
     * they render as a fixed system glyph and do not take the theme's colour,
     * so an urgent shelf item and a quiet one end up looking the same.
     */
    icon?: ReactNode;
    /** Unread/waiting count. Zero renders no badge rather than a "0". */
    count?: number;
    /**
     * Draws the count in the alert colour. An @-mention is not the same kind of
     * pending as "there is traffic"; the rail should not make you open it to
     * find out which one this is.
     */
    urgent?: boolean;
}
export interface ConversationShelfProps {
    items: readonly ConversationShelfItem[];
    activeId?: string | null;
    onSelect: (id: string) => void;
    compact?: boolean;
    iconOnly?: boolean;
    /**
     * `sm` (default) is the 13px shelf. `md` (2.386.0) is the Documents
     * explorer's quick views: 15px labels and 18px icons on 36px rows, the
     * scale of the Folders tree under them. `rail` (2.407.13) is `md` on the
     * shared rail scale (../shared/railType): 13px/500 labels on the 36px rail
     * pitch, the scale of a `TreeView size="rail"` under them and of the
     * Workspace `NavRail` beside them.
     */
    size?: 'sm' | 'md' | 'rail';
    /**
     * Labels only — no icon slot. The selected row takes the folder tree's
     * selection (primary tint, primary left accent), so the views above a
     * `TreeView size="md"` and the tree read as one list. The All documents
     * mockup's All documents / Recent / Shared with me. Since 2.389.2.
     */
    plain?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function ConversationShelf({ items, activeId, onSelect, compact, iconOnly, size, plain, className, 'data-testid': testId, }: ConversationShelfProps): import("react").JSX.Element | null;
export default ConversationShelf;
//# sourceMappingURL=ConversationShelf.d.ts.map