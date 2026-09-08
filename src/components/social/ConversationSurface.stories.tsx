import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ConversationSurface, type ConversationFeature } from './ConversationSurface';
import { ChatPanel } from './ChatPanel';

// A conversation and everything that belongs to it. The stories below are the
// SHAPES an embedder actually ships — chat pasted into an existing product,
// chat plus calls, and the full surface — because the difference between them
// is one array, and that is the whole point of the component.

const MESSAGES = [
  { id: 'm1', clientId: 'c-hank', displayName: 'Hank Anderson', content: 'here is the shape of the descriptor we persist', timestamp: '2026-09-05T07:48:00Z' },
  { id: 'm2', clientId: 'c-bob', displayName: 'Bob Martinez', content: 'nice — does it survive a reload?', timestamp: '2026-09-05T07:51:00Z' },
  { id: 'm3', clientId: 'c-hank', displayName: 'Hank Anderson', content: 'it does, metadata rides the message so history replays it', timestamp: '2026-09-05T07:52:00Z' },
];

const FILES = [
  {
    messageId: 'm1',
    author: 'Hank Anderson',
    sentAt: '2026-09-05T07:48:00Z',
    attachment: {
      id: 'a1',
      name: 'attachment-shape.png',
      size: 184_320,
      contentType: 'image/png',
      url: 'https://gateway.invalid/files/a1',
    },
  },
  {
    messageId: 'm2',
    author: 'Bob Martinez',
    sentAt: '2026-09-05T07:51:00Z',
    attachment: {
      id: 'a2',
      name: 'retention-policy.pdf',
      size: 42_000,
      contentType: 'application/pdf',
      url: 'https://gateway.invalid/files/a2',
    },
  },
];

const DOCUMENTS = [
  { documentId: 'd1', title: 'Upload path RFC', icon: '📘', createdBy: 'Hank Anderson', updatedAt: '2026-09-05T07:40:00Z', activeEditors: 2 },
  { documentId: 'd2', title: 'Retention notes', createdBy: 'you', updatedAt: '2026-09-04T16:10:00Z' },
];

const PINS = [
  { messageId: 'm1', author: 'Hank Anderson', preview: 'here is the shape of the descriptor we persist', pinnedAt: '2026-09-05T08:00:00Z', pinnedBy: 'you' },
];

const MENTIONS = [
  { messageId: 'm7', channel: 'chat:dm:dev-bob:dev-nora', channelLabel: 'Nora DaSilva', author: 'Nora DaSilva', excerpt: '@bob can you take the compose gap?', at: '2026-09-05T06:12:00Z', unread: true },
  { messageId: 'm8', channel: 'chat:dm:dev-bob:dev-hank', channelLabel: 'Hank Anderson', author: 'Hank Anderson', excerpt: '@bob shipped it', at: '2026-09-04T18:02:00Z' },
];

const RECORDINGS = [
  {
    recordingId: 'rec-1',
    startedAt: '2026-09-04T15:00:00Z',
    durationMs: 12 * 60_000 + 4_000,
    participants: [{ userId: 'dev-bob', displayName: 'Bob Martinez' }, { userId: 'dev-hank', displayName: 'Hank Anderson' }],
    playable: true,
  },
  // The one the product usually gets wrong: a recording that never composed.
  { recordingId: 'rec-2', startedAt: '2026-09-03T09:30:00Z', durationMs: 95_000, participantCount: 1, playable: false },
];

const meta: Meta<typeof ConversationSurface> = {
  title: 'Social/ConversationSurface',
  component: ConversationSurface,
  decorators: [
    (Story) => (
      <div style={{ height: 560, display: 'flex', border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ConversationSurface>;

function Harness({
  features,
  withCalls = true,
}: {
  features?: readonly ConversationFeature[];
  withCalls?: boolean;
}) {
  const [view, setView] = useState<ConversationFeature>('chat');
  const [pins, setPins] = useState(PINS);
  const [inCall, setInCall] = useState(false);

  return (
    <ConversationSurface
      className="flex-1"
      name="Hank Anderson"
      online
      features={features}
      view={view}
      onViewChange={setView}
      files={FILES}
      documents={DOCUMENTS}
      onOpenDocument={(id) => window.alert(`open document ${id}`)}
      onCreateDocument={() => window.alert('create a document in this conversation')}
      pins={pins}
      onUnpin={(messageId) => setPins((prev) => prev.filter((p) => p.messageId !== messageId))}
      mentions={MENTIONS}
      onOpenMention={(channel, messageId) => window.alert(`go to ${messageId} in ${channel}`)}
      recordings={RECORDINGS}
      onOpenRecording={(id) => window.alert(`play ${id}`)}
      onJumpToMessage={(id) => window.alert(`scroll to ${id}`)}
      onStartCall={withCalls ? () => setInCall(true) : undefined}
      callInProgress={inCall}
    >
      <ChatPanel fill showHeader={false} messages={MESSAGES} onSend={() => {}} />
    </ConversationSurface>
  );
}

/** Everything the surface can offer. */
export const Everything: Story = { render: () => <Harness /> };

/**
 * What a product that ships only messaging looks like. Not a greyed tab and
 * not an upsell — no tab bar at all, because a tab that cannot do anything is
 * worse than a tab that is not there.
 */
export const ChatOnly: Story = {
  render: () => <Harness features={['chat']} withCalls={false} />,
};

/** Chat plus calling: the shape most existing products want to paste in. */
export const ChatAndCalls: Story = {
  render: () => <Harness features={['chat', 'calls']} />,
};

/**
 * A deployment with documents but no telephony — the conversation is a place
 * to write together, and the call buttons never render because no handler was
 * supplied.
 */
export const ChatAndDocuments: Story = {
  render: () => <Harness features={['chat', 'documents', 'files']} withCalls={false} />,
};

/** Someone is already on a call: the controls say Join, not Call. */
export const CallInProgress: Story = {
  render: () => (
    <ConversationSurface
      className="flex-1"
      name="Hank Anderson"
      online
      features={['chat', 'calls']}
      recordings={RECORDINGS}
      onStartCall={() => {}}
      callInProgress
    >
      <ChatPanel fill showHeader={false} messages={MESSAGES} onSend={() => {}} />
    </ConversationSurface>
  ),
};

/**
 * The mass-audience option, said out loud.
 *
 * Watching and joining are different products of the same room: joining costs
 * a peer connection per head, watching is near-realtime and a CDN carries it
 * to any audience. That choice used to be offered as a bare 👁 with its whole
 * explanation in a `title` — invisible on touch, unannounced by plenty of
 * screen readers, and ambiguous even to someone hovering it.
 */
export const Watchable: Story = {
  render: () => (
    <ConversationSurface
      className="flex-1"
      name="#all-hands"
      description="Quarterly review"
      features={['chat', 'calls']}
      onStartCall={() => {}}
      onWatch={() => {}}
    >
      <ChatPanel fill showHeader={false} messages={MESSAGES} onSend={() => {}} />
    </ConversationSurface>
  ),
};

/**
 * With an audience already measured, and the product's own word for it.
 *
 * The count follows the same rule as everywhere else on this path: a numeric
 * 0 is a measured empty house and renders; `null`/omitted is "nobody measured"
 * and renders nothing, because a channel that has never been counted must not
 * claim an audience.
 */
export const WatchableWithAudience: Story = {
  render: () => (
    <ConversationSurface
      className="flex-1"
      name="#all-hands"
      description="Quarterly review"
      features={['chat', 'calls']}
      onStartCall={() => {}}
      onWatch={() => {}}
      watchLabel="Watch live"
      watchViewerCount={128}
    >
      <ChatPanel fill showHeader={false} messages={MESSAGES} onSend={() => {}} />
    </ConversationSurface>
  ),
};

/** Every view, with nothing in it yet — what a brand-new channel looks like. */
export const NothingYet: Story = {
  render: () => {
    return (
      <ConversationSurface
        className="flex-1"
        name="#general"
        description="A channel nobody has used yet"
        onCreateDocument={() => {}}
        onStartCall={() => {}}
      >
        <ChatPanel fill showHeader={false} messages={[]} onSend={() => {}} />
      </ConversationSurface>
    );
  },
};
