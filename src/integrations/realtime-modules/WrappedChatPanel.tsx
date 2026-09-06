// src/integrations/realtime-modules/WrappedChatPanel.tsx
//
// ChatPanel wired directly to a useChat() hook return from realtime-modules.
// Caller passes the `chat` object; this component handles field adaptation.
//
// It also binds useFileUpload when one is supplied, which is what turns the
// presentational attachment/transfer components into a working feature. The
// binding is the whole reason this integration layer exists: ChatPanel must
// not know about a gateway, and the hook must not know about a bubble.

import type { RMUseChatReturn, RMUsePresenceReturn } from './types';
import { adaptChatMessages } from './adapters';
import { ChatPanel } from '../../components/social/ChatPanel';
import type { ChatAttachment, ChatTransfer } from '../../components/social/ChatAttachment';
import { applyNetworkShim, type NetworkShimOptions } from './networkShim';

/**
 * The shape of `useFileUpload(channel)` from realtime-modules, restated
 * structurally so this package keeps zero runtime dependency on it (the same
 * convention the other Wrapped* components follow).
 */
export interface RMUseFileUploadReturn {
  transfers: ChatTransfer[];
  upload: (file: File, opts?: { metadata?: Record<string, unknown> }) => Promise<unknown>;
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
   * The viewer's AUTHENTICATED user id — what makes their own messages theirs.
   *
   * Distinct from `currentActor`, which identifies a transfer's owner. This is
   * the id ChatPanel compares against each message's `userId` to decide "is
   * this mine", which drives own-message treatment. Without it every message
   * in an embedded transcript reads as somebody else's, including yours, and
   * no styling on the host's side can fix that — the panel simply has nothing
   * to compare.
   */
  currentUserId?: string;
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

export function WrappedChatPanel({
  chat,
  presence,
  upload,
  currentActor,
  currentUserId,
  attachmentSrc,
  onOpenAttachment,
  acceptFiles,
  maxFileSize,
  onFileError,
  disabled,
  typingUsers: typingUsersOverride,
  tone,
  fill,
  wrapWithNetworkShim,
}: WrappedChatPanelProps) {
  const messages = adaptChatMessages(chat.messages);

  // Derive typing users from presence roster when available
  const typingUsers: string[] =
    typingUsersOverride ??
    (presence?.roster
      .filter((u) => u.metadata?.isTyping === true)
      .map(
        (u) =>
          (u.metadata?.displayName as string | undefined) ??
          u.clientId.slice(0, 8),
      ) ?? []);

  const panel = (
    <ChatPanel
      messages={messages}
      onSend={chat.sendMessage}
      disabled={disabled}
      typingUsers={typingUsers}
      tone={tone}
      fill={fill}
      {...(upload
        ? {
            onSendFiles: (files: File[]) => {
              // One transfer per file. They are independent — a 4 MB photo
              // must not wait behind a 20 MB one, and one failing must not
              // take the others down with it.
              for (const file of files) void upload.upload(file);
            },
            transfers: upload.transfers,
            onCancelTransfer: upload.cancelTransfer,
          }
        : {})}
      currentActor={currentActor}
      currentUserId={currentUserId}
      attachmentSrc={attachmentSrc}
      onOpenAttachment={onOpenAttachment}
      acceptFiles={acceptFiles}
      maxFileSize={maxFileSize}
      onFileError={onFileError}
    />
  );

  return <>{applyNetworkShim(panel, wrapWithNetworkShim)}</>;
}
