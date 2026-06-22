import { ViewMode, DocumentMeta, Participant } from '../../types/document';
interface DocumentHeaderProps {
    meta: DocumentMeta;
    mode: ViewMode;
    onModeChange: (mode: ViewMode) => void;
    participants: Participant[];
    onUpdateMeta: (patch: Partial<DocumentMeta>) => void;
    onExport: (format: 'markdown' | 'pdf' | 'json') => void;
    onToggleHistory: () => void;
    onToggleVideoCall?: () => void;
    onToggleVideoHistory?: () => void;
    isCallActive?: boolean;
    onClearDocument: () => void;
    onJumpToUser?: (participant: Participant) => void;
    sections?: {
        id: string;
        title: string;
    }[];
    onToggleMyItems?: () => void;
    myItemCount?: number;
    commentCount?: number;
    onBack?: () => void;
    onFollowUser?: (participant: Participant) => void;
    followingUserId?: string | null;
    onFinalize?: () => void;
    onUnlock?: () => void;
    pastCallsCount?: number;
}
export default function DocumentHeader({ meta, mode, onModeChange, participants, onUpdateMeta, onExport, onToggleHistory, onToggleVideoCall, onToggleVideoHistory, isCallActive, onClearDocument, onJumpToUser, sections, onToggleMyItems, myItemCount, commentCount, onBack, onFollowUser, followingUserId, onFinalize, onUnlock, pastCallsCount, }: DocumentHeaderProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=DocumentHeader.d.ts.map