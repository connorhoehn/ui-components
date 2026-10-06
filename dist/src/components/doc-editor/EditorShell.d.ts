import { type ReactNode } from 'react';
import { type BreadcrumbItem } from '../shared/Breadcrumbs';
import { type PresenceUser } from '../shared/PresenceAvatars';
import { type FileKind } from '../shared/FileKindMark';
import { type DocumentSaveState } from './DocumentSaveStatus';
export interface EditorShellTab {
    id: string;
    label: string;
    /** A count on the tab — open comments. Zero or absent shows none. */
    count?: number;
    disabled?: boolean;
}
/** The handoff's four tabs, for a host that has all of them. */
export declare const DEFAULT_EDITOR_SHELL_TABS: readonly EditorShellTab[];
export interface EditorShellProps {
    /** The trail above the title — "Sprint planning / Sprint review". */
    breadcrumbs?: BreadcrumbItem[];
    title: string;
    /** Makes the title editable in place. Omit for a read-only title. */
    onTitleChange?: (title: string) => void;
    /** Accessible name of the title editor. Default "File name". */
    titleLabel?: string;
    /** Draws a `FileKindMark` before the title. */
    kind?: FileKind;
    /** Renders a star toggle when `onStarredChange` is passed. */
    starred?: boolean;
    onStarredChange?: (starred: boolean) => void;
    /** After the title — normally a `StatusPill` ("Draft", "v4"). */
    statusPill?: ReactNode;
    /**
     * Where the file lives, INLINE after the status pill on the title row
     * ("Release plan  Draft | Sprint planning / Release assets"), each segment
     * clickable. The alternative to `breadcrumbs` above the title for a header
     * that wants one row. With it, the title takes only the width it needs.
     * Since 2.385.0.
     */
    path?: BreadcrumbItem[];
    /**
     * Beside the crumb trail on its row — a type `Chip` and the document id in
     * mono ("› OpenTelemetry everywhere / Story wi-obs-e1-s4"). Since 2.385.0.
     */
    crumbsTrailing?: ReactNode;
    /** A line under the title — the document's description. Since 2.385.0. */
    subtitle?: ReactNode;
    /**
     * A row between the title block and the tabs — a `WorkItemMetaBar`
     * (status · points · owner · priority). Since 2.385.0.
     */
    metaBar?: ReactNode;
    /** Who is here. Rendered with `PresenceAvatars`. */
    participants?: PresenceUser[];
    /** Jump to where a participant is (their cursor, their slide). Since 2.367.0. */
    onParticipantClick?: (id: string) => void;
    /** Follow a participant's view; `followingParticipantId` marks who is followed. Since 2.367.0. */
    onFollowParticipant?: (id: string) => void;
    followingParticipantId?: string | null;
    /** Beside the collaborators — "Owned by Connor Hoehn". */
    meta?: ReactNode;
    saveState?: DocumentSaveState;
    /** Right of the title row — Share, the ⋯ menu, "Open presentation". */
    headActions?: ReactNode;
    /** Omit for no tab row. `DEFAULT_EDITOR_SHELL_TABS` is the handoff's set. */
    tabs?: readonly EditorShellTab[];
    activeTab?: string;
    onTabChange?: (id: string) => void;
    /** Under the tabs — `DocumentToolbar`, a slides toolbar. */
    toolbar?: ReactNode;
    /** The editing surface. */
    children: ReactNode;
    /**
     * The composer row — normally a `FloatingComposerDock`. Always the LAST row
     * of the editor column, flush with its bottom, never scrolling and never
     * overlaid: the surface's scroll box ends at its top edge (a
     * `FloatingComposerDock` inside the shell is pinned, not floated). Nothing
     * renders below it. Since 2.365.0.
     */
    footer?: ReactNode;
    /**
     * An agent's pending edits — normally a `ProposedEditStrip`. Drawn between
     * the scrolling surface and the `footer` dock, in the dock's gutter
     * (`--dock-inset`), never scrolling and never inside the composer (which
     * collapses when idle): a pending edit stays in view while the page it
     * would change scrolls above it. Its own height is capped at 40% of the
     * surface and scrolls past that, and it shrinks (to 4rem) before the page above
     * it drops below 7rem, so a short window keeps some of the document. Since 2.408.0.
     */
    proposal?: ReactNode;
    /**
     * `workspace` (default) paints the surface the neutral grey a page or a
     * slide floats on; `plain` leaves it the panel colour, for a list or a
     * history tab.
     */
    surface?: 'workspace' | 'plain';
    /** Optional left column — the project explorer. */
    explorer?: ReactNode;
    /** Optional right column — normally a `Workbench`. */
    workbench?: ReactNode;
    /** Accessible name of the editor pane. Default "Editor". */
    label?: string;
    /**
     * `document` (default): a file's head — kind mark, title with its pill and
     * folder path, save line, and the head actions on the title row.
     * `work-item` (since 2.386.15): the Work mockup's head — a crumb line
     * ("› OpenTelemetry everywhere / Story wi-obs-e1-s4", from `breadcrumbs` +
     * `crumbsTrailing`) that carries `headActions` (normally just ⋯) at its
     * right, then a 22px title with no kind mark, then the subtitle. The crumb
     * line stays on a short window, since it holds the actions.
     */
    variant?: 'document' | 'work-item';
    /** work-item: the item's type as a soft chip on the crumb line ("Story"). Since 2.386.15. */
    itemType?: string;
    /** work-item: the item's key in mono after the chip ("wi-obs-e1-s4"). Since 2.386.15. */
    itemKey?: string;
    /**
     * The title's size. `md` (default) is today's 20px bold document title (22px
     * in `work-item`). `lg` is a record's headline — 26px semibold — for a page
     * where the title IS the page heading and nothing sits above it but a crumb
     * band. Hosts must not style the title themselves. Since 2.389.0.
     */
    titleSize?: 'md' | 'lg';
    /**
     * A read-only heading may wrap onto multiple lines. `truncate` (default)
     * keeps the existing single-line title. Editing still uses the fitted
     * single-line title editor. Since 2.409.0.
     */
    titleOverflow?: 'truncate' | 'wrap';
    /**
     * At the right end of the tab row, above the tabs' underline — "Sources 4",
     * "Open in Library ↗". Hangs from the same baseline as the tabs, so it
     * reads as belonging to the row, not the title. Since 2.389.0.
     */
    tabsTrailing?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function EditorShell({ breadcrumbs, title, onTitleChange, titleLabel, kind, starred, onStarredChange, statusPill, path, crumbsTrailing, subtitle, metaBar, participants, onParticipantClick, onFollowParticipant, followingParticipantId, meta, saveState, headActions, tabs, activeTab, onTabChange, toolbar, children, footer, proposal, surface, explorer, workbench, label, variant, itemType, itemKey, titleSize, titleOverflow, tabsTrailing, className, 'data-testid': testId, }: EditorShellProps): import("react").JSX.Element;
export default EditorShell;
//# sourceMappingURL=EditorShell.d.ts.map