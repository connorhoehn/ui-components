import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { ConversationRail, type RailSelection } from './ConversationRail';
import { ConversationSurface } from './ConversationSurface';
import { ChannelMentionsPanel } from './ChannelViews';
import { ChatPanel } from './ChatPanel';
import type { ConversationItem } from './ConversationList';

// The left side of a chat app, and — in `WholeApp` — the left side wired to
// the right side. That last story is the point: a rail and a surface, one
// selection between them, is an entire messaging product. An embedder who
// copies it gets a working two-pane app and then replaces the fixtures with
// their own data.

const CONVERSATIONS: ConversationItem[] = [
  {
    channel: 'general',
    kind: 'channel',
    name: 'general',
    peers: [],
    lastMessagePreview: 'Hank: it does, metadata rides the message',
    lastMessageAt: '2026-09-05T07:52:00Z',
    unreadCount: 4,
    mentioned: true,
  },
  {
    channel: 'platform',
    kind: 'channel',
    name: 'platform',
    peers: [],
    lastMessagePreview: 'Nora: the compose gap is 11 of 941',
    lastMessageAt: '2026-09-05T06:20:00Z',
  },
  {
    channel: 'chat:dm:dev-bob:dev-hank',
    kind: 'dm',
    peers: [{ userId: 'dev-hank', displayName: 'Hank Anderson', online: true }],
    lastMessagePreview: 'shipped it',
    lastMessageAt: '2026-09-04T18:02:00Z',
  },
  {
    channel: 'chat:dm:dev-bob:dev-nora',
    kind: 'dm',
    peers: [{ userId: 'dev-nora', displayName: 'Nora DaSilva', online: false }],
    lastMessagePreview: '@bob can you take the compose gap?',
    lastMessageAt: '2026-09-05T06:12:00Z',
    unreadCount: 1,
    mentioned: true,
  },
  {
    channel: 'chat:group:release',
    kind: 'group',
    peers: [
      { userId: 'dev-hank', displayName: 'Hank Anderson' },
      { userId: 'dev-nora', displayName: 'Nora DaSilva' },
      { userId: 'dev-dave', displayName: 'Dave Williams' },
    ],
    lastMessagePreview: 'Dave: cutting the tag at 5',
    lastMessageAt: '2026-09-05T05:40:00Z',
  },
];

const MENTIONS = [
  {
    messageId: 'm7',
    channel: 'chat:dm:dev-bob:dev-nora',
    channelLabel: 'Nora DaSilva',
    author: 'Nora DaSilva',
    excerpt: '@bob can you take the compose gap?',
    at: '2026-09-05T06:12:00Z',
    unread: true,
  },
  {
    messageId: 'm3',
    channel: 'general',
    channelLabel: '#general',
    author: 'Hank Anderson',
    excerpt: '@bob does the descriptor survive a reload?',
    at: '2026-09-05T07:51:00Z',
  },
];

const MESSAGES = [
  { id: 'm1', clientId: 'c-hank', displayName: 'Hank Anderson', content: 'here is the shape of the descriptor we persist', timestamp: '2026-09-05T07:48:00Z' },
  { id: 'm3', clientId: 'c-hank', displayName: 'Hank Anderson', content: '@bob does the descriptor survive a reload?', timestamp: '2026-09-05T07:51:00Z' },
];

const SHELF = [
  { id: 'mentions', label: 'Mentions', icon: '@', count: 2, urgent: true },
  { id: 'threads', label: 'Threads', icon: '🧵', count: 5 },
  { id: 'drafts', label: 'Drafts', icon: '✎' },
];

const meta: Meta<typeof ConversationRail> = {
  title: 'Social/ConversationRail',
  component: ConversationRail,
  decorators: [
    (Story) => (
      <div className="flex h-[560px] overflow-hidden rounded-lg border border-border">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ConversationRail>;

function RailHarness(props: Partial<React.ComponentProps<typeof ConversationRail>>) {
  const [selected, setSelected] = useState<RailSelection | null>({
    kind: 'conversation',
    channel: 'general',
  });
  return (
    <ConversationRail
      shelf={SHELF}
      conversations={CONVERSATIONS}
      selected={selected}
      onSelect={setSelected}
      onNewChat={() => window.alert('open the people picker')}
      {...props}
    />
  );
}

/** The default rail: fixed destinations above, grouped conversations below. */
export const Default: Story = { render: () => <RailHarness /> };

/**
 * A product with no activity feed to point at. The shelf is absent rather
 * than empty — a strip with nothing in it is chrome that explains nothing.
 */
export const NoShelf: Story = { render: () => <RailHarness shelf={[]} /> };

/**
 * One run of rows, for a host that wants the compact behaviour the bare
 * `ConversationList` gives by default.
 */
export const Flat: Story = { render: () => <RailHarness grouped={false} /> };

/** Cold start: signed in, nobody messaged yet. */
export const NothingYet: Story = {
  render: () => (
    <RailHarness
      conversations={[]}
      shelf={[{ id: 'mentions', label: 'Mentions', icon: '@' }]}
      emptyLabel="No conversations yet — start one"
    />
  ),
};

/**
 * Host chrome above and below. The rail owns the middle; the workspace
 * identity and the signed-in row belong to the app around it.
 */
export const WithHeaderAndFooter: Story = {
  render: () => (
    <RailHarness
      header={
        <div className="border-b border-border px-3 py-2.5 text-sm font-semibold text-text-primary">
          Acme workspace
        </div>
      }
      footer={
        <div className="border-t border-border px-3 py-2 text-xs text-text-secondary">
          Signed in as Bob Martinez
        </div>
      }
    />
  ),
};

/**
 * **The assembly.** Rail plus surface under one `RailSelection` — which is
 * the whole reason the selection is a single value: the pane switches between
 * the mentions view and a conversation by reading `selected.kind`, and there
 * is no second piece of state to keep in sync.
 *
 * Copy this story, swap the fixtures for your own channels and messages, and
 * you have a messaging app.
 */
export const WholeApp: StoryObj = {
  decorators: [
    (Story) => (
      <div className="flex h-[560px] w-full overflow-hidden rounded-lg border border-border">
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [selected, setSelected] = useState<RailSelection | null>({
      kind: 'conversation',
      channel: 'general',
    });

    const open = useMemo(
      () =>
        selected?.kind === 'conversation'
          ? CONVERSATIONS.find((c) => c.channel === selected.channel)
          : undefined,
      [selected],
    );

    return (
      <>
        <ConversationRail
          shelf={SHELF}
          conversations={CONVERSATIONS}
          selected={selected}
          onSelect={setSelected}
          onNewChat={() => window.alert('open the people picker')}
        />

        <section className="flex min-w-0 flex-1 flex-col">
          {selected?.kind === 'shelf' ? (
            <ChannelMentionsPanel
              className="min-h-0 flex-1"
              mentions={MENTIONS}
              // Jumping is what makes a mentions list useful: it opens the
              // conversation rather than telling you where to look.
              onJump={(channel) => setSelected({ kind: 'conversation', channel })}
            />
          ) : open ? (
            <ConversationSurface
              className="min-h-0 flex-1"
              name={open.name ? `#${open.name}` : open.peers.map((p) => p.displayName).join(', ')}
              online={open.peers[0]?.online}
              features={['chat', 'calls', 'documents']}
              onStartCall={() => {}}
              onCreateDocument={() => {}}
            >
              <ChatPanel fill showHeader={false} messages={MESSAGES} onSend={() => {}} />
            </ConversationSurface>
          ) : null}
        </section>
      </>
    );
  },
};
