import type { RMUseChatReturn, RMUsePresenceReturn } from './types';
import type { ChatAttachment, ChatTransfer } from '../../components/social/ChatAttachment';
import { type NetworkShimOptions } from './networkShim';
/**
 * The shape of `useFileUpload(channel)` from realtime-modules, restated
 * structurally so this package keeps zero runtime dependency on it (the same
 * convention the other Wrapped* components follow).
 */
export interface RMUseFileUploadReturn {
    transfers: ChatTransfer[];
    upload: (file: File, opts?: {
        metadata?: Record<string, unknown>;
    }) => Promise<unknown>;
    cancelTransfer: (transferId: string) => void;
}
export interface WrappedChatPanelProps {
    /** Return value of useChat(channel) from realtime-modules */
    chat: RMUseChatReturn;
    /** Optional presence hook return — used to derive typingUsers */
    presence?: RMUsePresenceReturn;
    /**
     * Return value of useFileUpload(channel). Supplying it enables drag-drop,
     * paste and the paperclip, and renders every in-flight transfer in the
     * channel — including other participants'. Omit it and the panel shows no
     * attachment affordances at all.
     */
    upload?: RMUseFileUploadReturn;
    /** Identifies the viewer so their own transfers get a cancel button. */
    currentActor?: string;
    /**
     * Resolves an attachment to a renderable image src. The gateway's download
     * route is bearer-authenticated, so an `<img>` pointed at the raw URL 401s;
     * the host supplies an object URL (see useAttachmentSrc).
     */
    attachmentSrc?: (attachment: ChatAttachment) => string | undefined;
    onOpenAttachment?: (attachment: ChatAttachment) => void;
    acceptFiles?: string;
    maxFileSize?: number;
    onFileError?: (message: string) => void;
    /** Forwarded to ChatPanel */
    disabled?: boolean;
    /** Override typing banner (supersedes presence-derived list) */
    typingUsers?: string[];
    /** Forwarded to ChatPanel — 'dark' for call chrome surfaces. */
    tone?: 'light' | 'dark';
    /** Forwarded to ChatPanel — fill the parent's height. */
    fill?: boolean;
    /**
     * Opt-in: wrap the rendered ChatPanel in a NetworkErrorBoundary +
     * ReconnectingShim using the supplied connection state and retry
     * callback. Omit for no wrapping (default).
     */
    wrapWithNetworkShim?: NetworkShimOptions;
}
export declare function WrappedChatPanel({ chat, presence, upload, currentActor, attachmentSrc, onOpenAttachment, acceptFiles, maxFileSize, onFileError, disabled, typingUsers: typingUsersOverride, tone, fill, wrapWithNetworkShim, }: WrappedChatPanelProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedChatPanel.d.ts.map