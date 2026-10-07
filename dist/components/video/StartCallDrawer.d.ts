import { type ReviewDocumentListProps } from './ReviewDocumentList';
import { type CollaboratorCheckListProps } from './CollaboratorCheckList';
import { type MediaPrecheckRowProps } from './MediaPrecheckRow';
export interface StartCallPeople {
    /** The search box. Typing filters `collaborators.rows` (the host's job). */
    query: string;
    onQueryChange: (q: string) => void;
    placeholder?: string;
    /** One chip per selected person, in selection order. */
    chips: {
        userId: string;
        name: string;
    }[];
    onRemoveChip: (userId: string) => void;
    collaborators: CollaboratorCheckListProps;
}
export interface StartCallDrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    onTitleChange: (t: string) => void;
    media: 'video' | 'audio';
    onMediaChange: (m: 'video' | 'audio') => void;
    documents: Omit<ReviewDocumentListProps, 'trailing'> & {
        onAdd: () => void;
    };
    onManageAccess: () => void;
    people: StartCallPeople;
    message: string;
    onMessageChange: (m: string) => void;
    /** Max message length. Default 280. */
    messageMaxLength?: number;
    ring: boolean;
    onRingChange: (r: boolean) => void;
    /** `showCamera` is derived from `media` unless given. */
    precheck: Omit<MediaPrecheckRowProps, 'showCamera'> & {
        showCamera?: boolean;
    };
    selectedCount: number;
    onCopyLink: () => void;
    onStart: () => void;
    starting?: boolean;
    /** Disables Start call with this as the button's title. */
    startDisabledReason?: string;
    error?: {
        message: string;
        onRetry: () => void;
    };
    /** Floating width in px. Docked (default), the drawer fills its column. */
    width?: number;
    docked?: boolean;
    className?: string;
    'data-testid'?: string;
}
export declare function StartCallDrawer({ open, onClose, title, onTitleChange, media, onMediaChange, documents, onManageAccess, people, message, onMessageChange, messageMaxLength, ring, onRingChange, precheck, selectedCount, onCopyLink, onStart, starting, startDisabledReason, error, width, docked, className, 'data-testid': testId, }: StartCallDrawerProps): import("react").JSX.Element;
export default StartCallDrawer;
//# sourceMappingURL=StartCallDrawer.d.ts.map