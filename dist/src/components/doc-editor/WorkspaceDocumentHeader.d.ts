import { type ReactNode } from 'react';
import { type DocumentPerson } from './DocumentOwnership';
import type { ViewMode, DocumentMeta, Participant } from '../../types/document';
import type { DocumentLifecycleStatus, LegacyFinalClaim, LifecycleAction, LifecycleFailureKind } from './documentLifecycleTypes';
import { type DocumentSaveState } from './DocumentSaveStatus';
export interface LifecycleErrorView {
    kind: LifecycleFailureKind;
    message: string;
    /**
     * The bold lead, when the kind's default does not fit — a failed READ is
     * not "nothing was changed". Since 2.390.3.
     */
    lead?: string;
}
/**
 * One file action in the ⋯ menu. A `disabledReason` shows the row greyed with
 * that reason as its tooltip (the viewer may not do it); leave the action out
 * entirely when it does not apply to this document at all. Since 2.390.3.
 */
export interface DocumentFileAction {
    onSelect: () => void;
    disabledReason?: string;
}
/**
 * The file menu of a document head (the Documents mockup's ⋯): five groups —
 * Rename / Move to / Make a copy · Copy link · Create from this › / Run
 * workflow / Save as template · Download as › / Print ⌘P · Move to trash.
 * Passing it switches the `menu` layout's ⋯ to this structure; the host's
 * `extraMenuItems`, history, lifecycle and toggles fold into those groups.
 * Since 2.390.3.
 */
export interface DocumentFileActions {
    rename?: DocumentFileAction;
    move?: DocumentFileAction;
    copy?: DocumentFileAction;
    copyLink?: DocumentFileAction;
    createFrom?: {
        presentation?: DocumentFileAction;
        summary?: DocumentFileAction;
        actionList?: DocumentFileAction;
        chooseTemplate?: DocumentFileAction;
        /** The flyout's footer. Default 'Creates a new document.' */
        caption?: string;
        /** When every entry is disabled for one reason, the parent row says it. */
        disabledReason?: string;
    };
    runWorkflow?: DocumentFileAction;
    saveAsTemplate?: DocumentFileAction;
    /** Each a real export ("Markdown (.md)"). Empty or absent: no Download row. */
    downloads?: ReadonlyArray<DocumentFileAction & {
        id: string;
        label: string;
    }>;
    print?: DocumentFileAction;
    trash?: DocumentFileAction;
}
/** Where a host's extra ⋯ item lands when `fileActions` shapes the menu. */
export type DocumentMenuGroup = 'file' | 'share' | 'create' | 'view';
export interface WorkspaceDocumentHeaderProps {
    /**
     * `bar` (default) is the whole two-row header: back link, title, status,
     * save state, then the mode pill and the actions. `actions` is only the
     * right-hand cluster — ownership, comment count, who is here, the mode pill,
     * the room pill, lifecycle actions and the ⋯ menu, with their dialogs — for
     * a host that puts the title, status and save state in `EditorShell`'s own
     * title row and hands this over as `headActions`. The two banners are not
     * part of it; render `WorkspaceDocumentHeaderNotices` where a sentence fits.
     */
    variant?: 'bar' | 'actions';
    /**
     * `variant="actions"` only. `cluster` (default) lays every control out in the
     * row. `menu` is the editor head of the Documents mockups ("Share · (i) · ⋯"):
     * the owner line, the mode ("Editing" and why), My Items and the lifecycle
     * actions move into the ⋯ menu as its first sections, and the row keeps only
     * the room / call pill, the share status and ⋯. The comment chip is dropped
     * (the shell's Comments tab carries the count). Since 2.385.1.
     */
    actionsLayout?: 'cluster' | 'menu';
    /**
     * The menu layout's ⋯ trigger: `boxed` (default) is the 40px bordered square
     * of a file's head; `ghost` is a borderless 28px glyph, for the work-item
     * head's crumb line. Since 2.386.15.
     */
    menuTrigger?: 'boxed' | 'ghost';
    /** Host-controlled durable persistence receipt; omitted means unknown. */
    saveState?: DocumentSaveState;
    /** Actions scoped to the current source, such as draft/review/publish. */
    workflowActions?: ReactNode;
    formatActions?: ReactNode;
    className?: string;
    titleEditable?: boolean;
    onPrint?: () => void;
    extraMenuItems?: ReadonlyArray<{
        id: string;
        label: string;
        onSelect: () => void;
        group?: DocumentMenuGroup;
    }>;
    /** The file menu (see DocumentFileActions). `actionsLayout="menu"` only. Since 2.390.3. */
    fileActions?: DocumentFileActions;
    meta: DocumentMeta;
    mode: ViewMode;
    suggesting?: boolean;
    modeReason?: string;
    participants: Participant[];
    onUpdateMeta?: (patch: Partial<DocumentMeta>) => void;
    onExport?: (format: 'markdown' | 'pdf' | 'json') => void;
    exportFormats?: readonly ('markdown' | 'pdf' | 'json')[];
    onToggleHistory?: () => void;
    onToggleVideoCall?: () => void;
    onToggleVideoHistory?: () => void;
    isCallActive?: boolean;
    callVariant?: 'idle' | 'available' | 'active';
    callLabel?: string;
    onClearDocument?: () => void;
    onJumpToUser?: (participant: Participant) => void;
    sections?: {
        id: string;
        title: string;
    }[];
    onToggleMyItems?: () => void;
    onToggleChat?: () => void;
    chatRoomName?: string | null;
    chatUnreadCount?: number;
    formatActionsRef?: (el: HTMLDivElement | null) => void;
    myItemCount?: number;
    commentCount?: number;
    onBack?: () => void;
    onFollowUser?: (participant: Participant) => void;
    followingUserId?: string | null;
    onFinalize?: () => void;
    onUnlock?: () => void;
    pastCallsCount?: number;
    lifecycleStatus?: DocumentLifecycleStatus;
    owner?: DocumentPerson | null;
    collaborators?: readonly DocumentPerson[];
    onShare?: () => void;
    lifecycleTerminal?: boolean;
    lifecycleLegacyClaim?: LegacyFinalClaim | null;
    lifecycleActions?: LifecycleAction[];
    lifecycleLoading?: boolean;
    /**
     * The document has no review status this caller can read (the platform
     * answered "not found" for its lifecycle). Not an error: no status pill, and
     * the review actions show as ONE disabled "Submit for review" row whose
     * tooltip is this text, so the reader learns why rather than finding the
     * Review group missing. Ignored while the server offers actions. Since 2.407.13.
     */
    lifecycleUnavailableReason?: string;
    lifecycleBusy?: boolean;
    lifecycleError?: LifecycleErrorView | null;
    onDismissLifecycleError?: () => void;
    onLifecycleAction?: (action: LifecycleAction, reason?: string) => void;
    onClaimOwnership?: () => void;
    onShareToRoom?: () => void;
    shareRoomName?: string | null;
    sharingToRoom?: boolean;
    shareStatus?: {
        tone: 'success' | 'error';
        text: string;
    } | null;
    onDismissShareStatus?: () => void;
}
export default function WorkspaceDocumentHeader({ variant, actionsLayout, menuTrigger, saveState, workflowActions, formatActions, className, titleEditable, onPrint, exportFormats, meta, mode, suggesting, modeReason, participants, onUpdateMeta, onExport, extraMenuItems, fileActions, onToggleHistory, onToggleVideoCall, onToggleVideoHistory, callVariant, callLabel, onClearDocument, onJumpToUser, sections, onToggleMyItems, onToggleChat, chatRoomName, chatUnreadCount, formatActionsRef, myItemCount, commentCount, onBack, onFollowUser, followingUserId, pastCallsCount, onShareToRoom, shareRoomName, sharingToRoom, shareStatus, onDismissShareStatus, lifecycleStatus, owner, collaborators, onShare, lifecycleTerminal, lifecycleLegacyClaim, lifecycleActions, lifecycleLoading, lifecycleUnavailableReason, lifecycleBusy, lifecycleError, onDismissLifecycleError, onLifecycleAction, onClaimOwnership, }: WorkspaceDocumentHeaderProps): import("react").JSX.Element;
export interface WorkspaceDocumentHeaderNoticesProps {
    lifecycleError?: LifecycleErrorView | null;
    onDismissLifecycleError?: () => void;
    lifecycleLegacyClaim?: LegacyFinalClaim | null;
    /** Whether the header offers "Take ownership" — changes what the ownerless note says. */
    canClaimOwnership?: boolean;
}
/**
 * The header's two banners — a refused lifecycle change, and a legacy "final"
 * claim the server never recorded. Exported on their own so a host that shows
 * the header as `variant="actions"` inside `EditorShell` (where the head
 * actions are one short row) can put them at the top of the surface instead,
 * full width, where a sentence fits.
 */
export declare function WorkspaceDocumentHeaderNotices({ lifecycleError, onDismissLifecycleError, lifecycleLegacyClaim, canClaimOwnership, }: WorkspaceDocumentHeaderNoticesProps): import("react").JSX.Element | null;
/** The lifecycle status as the header prints it — "Draft", "In review" — for a host's own title row. */
/** `variant="tag"` (since 2.386.5): the soft label an editor head puts beside the title. */
export declare function DocumentLifecyclePill({ status, variant }: {
    status: DocumentLifecycleStatus;
    variant?: 'pill' | 'tag';
}): import("react").JSX.Element;
//# sourceMappingURL=WorkspaceDocumentHeader.d.ts.map