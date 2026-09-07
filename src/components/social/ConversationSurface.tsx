// ConversationSurface — a conversation and everything that belongs to it.
//
// ## What this is for
//
// The chat pane, the files shared in the thread, the documents written in it,
// the messages pinned to it, the calls recorded from it, the times you were
// named in it — assembled once, so an app that wants a conversation gets all
// of that instead of a message list plus a to-do list.
//
// ## Why features are DATA and not props-per-thing
//
// The whole point is that the same component ships as "chat only" in one
// product and "chat, video and documents" in another. If each view were a
// boolean prop the set could not be handed over at runtime, which is exactly
// what an embedding app needs to do: it declares what it wants, the server
// says what it provisions, and the surface renders the intersection. Passing
// the set as an array is what lets that intersection be computed somewhere
// else and handed in.
//
// A feature that is not listed is not rendered — no greyed tab, no "upgrade"
// affordance. A tab that cannot do anything is worse than a tab that is not
// there.
//
// ## What it deliberately does NOT do
//
//   - no routing. `onOpenDocument` / `onOpenRecording` hand ids back; where
//     those go is the app's business, and a router dependency would make this
//     unembeddable in an app that has its own.
//   - no data fetching, no gateway, no sockets. Every view takes the rows it
//     renders. The integration layer binds them to realtime-modules hooks.
//   - no composer. The chat pane is passed in as `children`, because a
//     product's composer is the piece most likely to be its own.

import { useState, type ReactNode } from 'react';
import { ChannelHeader } from '../shared/ChannelHeader';
import { Tabs, type TabItem } from '../shared/Tabs';
import { IconButton } from '../ui/IconButton';
import {
  ChannelFilesPanel,
  ChannelDocumentsPanel,
  ChannelMentionsPanel,
  ChannelRecordingsPanel,
  PinnedMessagesPanel,
  type ChannelDocumentItem,
  type ChannelFileItem,
  type ChannelMentionItem,
  type ChannelRecordingItem,
  type PinnedMessageItem,
} from './ChannelViews';
import type { ChatAttachment } from './ChatAttachment';
import { cn } from '../../lib/cn';

/** The views a conversation can offer. `chat` is the transcript itself. */
export type ConversationFeature =
  | 'chat'
  | 'files'
  | 'documents'
  | 'pins'
  | 'mentions'
  | 'calls';

export const ALL_CONVERSATION_FEATURES: readonly ConversationFeature[] = [
  'chat',
  'files',
  'documents',
  'pins',
  'mentions',
  'calls',
];

export interface ConversationSurfaceProps {
  /** Channel name, or the people in a DM. */
  name: string;
  /** Sub-line under the name. */
  description?: string;
  online?: boolean;
  avatarUrl?: string;

  /**
   * Which views this deployment offers. Defaults to all of them.
   *
   * Hand in the INTERSECTION of what the product declares and what the server
   * provisions — a view whose backend is not wired renders an empty tab, which
   * reads as a broken feature rather than an absent one.
   */
  features?: readonly ConversationFeature[];

  /** The transcript and its composer. Owned by the caller. */
  children?: ReactNode;

  files?: readonly ChannelFileItem[];
  /** Resolves a displayable image source; the download route is authenticated. */
  thumbnailSrc?: (a: ChatAttachment) => string | undefined;

  documents?: readonly ChannelDocumentItem[];
  onOpenDocument?: (documentId: string) => void;
  /** Omit for a viewer who may not create documents here. */
  onCreateDocument?: () => void;

  pins?: readonly PinnedMessageItem[];
  onUnpin?: (messageId: string) => void;

  mentions?: readonly ChannelMentionItem[];
  onOpenMention?: (channel: string, messageId: string) => void;

  recordings?: readonly ChannelRecordingItem[];
  onOpenRecording?: (recordingId: string) => void;

  /** Scrolls the transcript to a message. Used by pins, files and mentions. */
  onJumpToMessage?: (messageId: string) => void;

  /**
   * Start (or join) a call with the people in this conversation. Omit and no
   * call controls render — which is how a chat-only deployment looks.
   */
  onStartCall?: (audioOnly: boolean) => void;
  /**
   * Watch instead of joining.
   *
   * A conversation that many more people watch than speak in — an all-hands,
   * a demo — should not make every viewer open a peer connection. Joining is
   * realtime and costs one connection per head; watching is near-realtime HLS
   * and a CDN carries it to any audience. Offering both is the difference
   * between a room that seats twelve and one that seats a thousand.
   *
   * Omit when the conversation cannot be watched, rather than rendering a
   * disabled control.
   */
  onWatch?: () => void;
  /** Someone here is already on a call, so the controls say Join. */
  callInProgress?: boolean;
  /**
   * This conversation's call mode is not the clicker's to choose.
   *
   * A room decides whether it is an audio room or a video room, and entering
   * one does not get to redefine it — so the host ignores the `audioOnly`
   * argument entirely. Two buttons then do exactly the same thing, and the
   * one labelled "Audio call" starts a video call: a control that lies about
   * what it does. Set this and a single control renders instead.
   */
  callModeFixed?: boolean;

  /** Extra header controls, to the right of the call buttons. */
  headerActions?: ReactNode;

  /** Controlled view. Omit to let the surface keep its own. */
  view?: ConversationFeature;
  onViewChange?: (view: ConversationFeature) => void;

  className?: string;
  'data-testid'?: string;
}

const LABELS: Record<ConversationFeature, string> = {
  chat: 'Chat',
  files: 'Files',
  documents: 'Documents',
  pins: 'Pinned',
  mentions: 'Mentions',
  calls: 'Calls',
};

export function ConversationSurface({
  name,
  description,
  online,
  avatarUrl,
  features = ALL_CONVERSATION_FEATURES,
  children,
  files = [],
  thumbnailSrc,
  documents = [],
  onOpenDocument,
  onCreateDocument,
  pins = [],
  onUnpin,
  mentions = [],
  onOpenMention,
  recordings = [],
  onOpenRecording,
  onJumpToMessage,
  onStartCall,
  callModeFixed = false,
  onWatch,
  callInProgress = false,
  headerActions,
  view: controlledView,
  onViewChange,
  className,
  'data-testid': testId = 'conversation-surface',
}: ConversationSurfaceProps) {
  const enabled = new Set(features);
  const [uncontrolledView, setUncontrolledView] = useState<ConversationFeature>('chat');
  const requested = controlledView ?? uncontrolledView;
  // A view that was turned off while it was open must not leave a blank pane.
  const view = enabled.has(requested) ? requested : (features[0] ?? 'chat');

  const setView = (next: ConversationFeature) => {
    if (controlledView === undefined) setUncontrolledView(next);
    onViewChange?.(next);
  };

  // Counts, not dots: "Files" says a tab exists, "Files 3" says whether
  // opening it is worth it. Zero is shown as no badge rather than "0".
  const count = (n: number) => n || undefined;
  const items: TabItem[] = features
    .filter((f) => LABELS[f])
    .map((f) => ({
      id: f,
      label: LABELS[f],
      badge:
        f === 'files' ? count(files.length)
        : f === 'documents' ? count(documents.length)
        : f === 'pins' ? count(pins.length)
        : f === 'calls' ? count(recordings.length)
        : f === 'mentions' ? count(mentions.filter((m) => m.unread).length)
        : undefined,
    }));

  const jumpFromAnotherView = (messageId: string) => {
    setView('chat');
    onJumpToMessage?.(messageId);
  };

  return (
    <section className={cn('flex min-w-0 flex-col', className)} data-testid={testId}>
      <ChannelHeader
        name={name}
        description={description}
        online={online}
        avatarUrl={avatarUrl}
        data-testid={`${testId}-header`}
        tabs={
          items.length > 1 ? (
            <Tabs
              variant="underline"
              size="sm"
              aria-label="Views of this conversation"
              value={view}
              onValueChange={(id) => setView(id as ConversationFeature)}
              items={items}
            />
          ) : undefined
        }
        actions={
          onStartCall || onWatch || headerActions ? (
            <>
              {onStartCall && (
                callModeFixed ? (
                  // One control, because there is one outcome. The argument is
                  // passed for the host's signature only — it is ignored where
                  // this flag is set.
                  <IconButton
                    aria-label={callInProgress ? 'Join the call' : 'Start a call'}
                    title={callInProgress ? 'Join the call' : 'Start a call'}
                    data-testid={`${testId}-call`}
                    variant={callInProgress ? 'primary' : 'ghost'}
                    onClick={() => onStartCall(false)}
                  >
                    📞
                  </IconButton>
                ) : (
                <>
                  <IconButton
                    aria-label={callInProgress ? 'Join the call with audio' : 'Start an audio call'}
                    // Distinct from the video control's. Both said "Join the
                    // call", which made two buttons that do different things
                    // indistinguishable to anyone reading the tooltip.
                    title={callInProgress ? 'Join with audio' : 'Audio call'}
                    data-testid={`${testId}-audio-call`}
                    onClick={() => onStartCall(true)}
                  >
                    📞
                  </IconButton>
                  <IconButton
                    aria-label={callInProgress ? 'Join the call with video' : 'Start a video call'}
                    title={callInProgress ? 'Join with video' : 'Video call'}
                    data-testid={`${testId}-video-call`}
                    variant={callInProgress ? 'primary' : 'ghost'}
                    onClick={() => onStartCall(false)}
                  >
                    🎥
                  </IconButton>
                </>
                )
              )}
              {onWatch && (
                <IconButton
                  aria-label="Watch the stream"
                  title="Watch — near-realtime, scales to any audience"
                  data-testid={`${testId}-watch`}
                  onClick={onWatch}
                >
                  👁
                </IconButton>
              )}
              {headerActions}
            </>
          ) : undefined
        }
      />

      {enabled.has('files') && view === 'files' && (
        <ChannelFilesPanel
          className="min-h-0 flex-1"
          files={files}
          thumbnailSrc={thumbnailSrc}
          onJump={onJumpToMessage ? jumpFromAnotherView : undefined}
        />
      )}
      {enabled.has('documents') && view === 'documents' && (
        <ChannelDocumentsPanel
          className="min-h-0 flex-1"
          documents={documents}
          onOpen={onOpenDocument}
          onCreate={onCreateDocument}
        />
      )}
      {enabled.has('pins') && view === 'pins' && (
        <PinnedMessagesPanel
          className="min-h-0 flex-1"
          pins={pins}
          onUnpin={onUnpin}
          onJump={onJumpToMessage ? jumpFromAnotherView : undefined}
        />
      )}
      {enabled.has('mentions') && view === 'mentions' && (
        <ChannelMentionsPanel
          className="min-h-0 flex-1"
          mentions={mentions}
          onJump={
            onOpenMention
              ? (channel, messageId) => {
                  setView('chat');
                  onOpenMention(channel, messageId);
                }
              : undefined
          }
        />
      )}
      {enabled.has('calls') && view === 'calls' && (
        <ChannelRecordingsPanel
          className="min-h-0 flex-1"
          recordings={recordings}
          onOpen={onOpenRecording}
        />
      )}

      {enabled.has('chat') && (
        // Kept MOUNTED behind the other views rather than unmounted:
        // remounting a transcript re-joins its channel, which refetches
        // history and loses the scroll position every time somebody glances
        // at the file list.
        <div className="min-h-0 flex-1" data-testid={`${testId}-chat`} hidden={view !== 'chat'}>
          {children}
        </div>
      )}
    </section>
  );
}

export default ConversationSurface;
