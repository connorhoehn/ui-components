import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DocumentCallPanel, type DocumentCallPanelProps } from './DocumentCallPanel';
import type { CallPerson } from './CallPeopleList';
import { InlineAlert } from '../shared/InlineAlert';
import { CAST, REVIEW_DOCS, noop, themed } from './documentCallStoryKit';

// The call side panel (mockup 06), in the 380px right column.

function p(who: keyof typeof CAST, over: Partial<CallPerson> = {}): CallPerson {
  const c = CAST[who];
  return {
    userId: c.userId,
    name: c.name,
    isLocal: false,
    isHost: false,
    presence: 'online',
    state: 'in-call',
    audioOn: true,
    cameraOn: true,
    screenSharing: false,
    presenting: false,
    ...over,
  };
}

const PEOPLE: CallPerson[] = [
  p('connor', { isLocal: true, isHost: true }),
  p('alice', { presenting: true }),
  p('frank'),
  p('bob', { cameraOn: false, audioOn: false }),
];

function Scene({
  people = PEOPLE,
  presenter = 'alice',
  loading = false,
  notice,
}: {
  people?: CallPerson[];
  presenter?: keyof typeof CAST | null;
  loading?: boolean;
  notice?: DocumentCallPanelProps['notice'];
}) {
  const [following, setFollowing] = useState<string | null>(CAST.alice.userId);
  const [presenting, setPresenting] = useState(
    presenter ? { documentId: 'doc-auth', userId: CAST[presenter].userId, name: CAST[presenter].name.split(' ')[0]! } : null,
  );
  const items = REVIEW_DOCS.map((d, i) => {
    const isPresented = presenting?.documentId === d.id;
    const presentedIndex = REVIEW_DOCS.findIndex((x) => x.id === presenting?.documentId);
    return {
      ...d,
      selected: isPresented,
      subline: isPresented ? `Presenting · ${presenting!.name}` : presentedIndex >= 0 && i === presentedIndex + 1 ? 'Up next' : undefined,
      sublineTone: (isPresented ? 'accent' : 'muted') as 'accent' | 'muted',
    };
  });
  const inCall = people.filter((x) => x.state === 'in-call' || x.state === 'reconnecting').length;
  // Connor is the host: he may take over from whoever presents (mockup 06).
  const someoneElse = false;
  return (
    <div className="h-[892px] w-[380px] overflow-hidden border border-border">
      <DocumentCallPanel
        title="Auth architecture review"
        participantCount={inCall}
        elapsedMs={9 * 60_000 + 41_000}
        people={{
          people: people.map((x) => ({ ...x, presenting: presenting?.userId === x.userId })),
          count: inCall,
          followingUserId: following,
          canModerate: true,
          onInvite: noop,
          onFollow: setFollowing,
          onMuteForMe: noop,
          onMute: noop,
          onRemove: noop,
          onMakeHost: noop,
          onRingAgain: noop,
          onOpenSelfSettings: noop,
          onLeave: noop,
        }}
        documents={{ items, count: items.length, onAdd: noop, onOpen: noop }}
        presenting={presenting}
        currentDocumentId="doc-auth"
        canPresent={!someoneElse}
        {...(someoneElse ? { presentDisabledReason: `${presenting!.name} is presenting` } : {})}
        onPresent={(id) =>
          setPresenting(id ? { documentId: id, userId: CAST.connor.userId, name: 'Connor' } : null)
        }
        onCopyLink={noop}
        onManageAccess={noop}
        onPopOut={noop}
        onClose={noop}
        loading={loading}
        notice={notice}
      />
    </div>
  );
}

function BlockedScene() {
  const base = { isLocal: false, isHost: false, presence: 'online' as const, state: 'in-call' as const, audioOn: true, cameraOn: true, screenSharing: false };
  return (
    <div className="h-[892px] w-[380px] overflow-hidden border border-border">
      <DocumentCallPanel
        title="Auth architecture review"
        participantCount={2}
        elapsedMs={9 * 60_000 + 41_000}
        people={{
          people: [
            { ...base, userId: 'f', name: CAST.frank.name, isLocal: true, presenting: false },
            { ...base, userId: 'a', name: CAST.alice.name, isHost: true, presenting: true },
          ],
          count: 2,
          canModerate: false,
          onInvite: noop,
          onFollow: noop,
          onMuteForMe: noop,
        }}
        documents={{ items: [{ ...REVIEW_DOCS[0]!, selected: true, subline: 'Presenting · Alice' }], count: 1, onAdd: noop, onOpen: noop }}
        presenting={{ documentId: 'doc-auth', userId: 'a', name: 'Alice' }}
        currentDocumentId="doc-auth"
        canPresent={false}
        presentDisabledReason="Alice is presenting"
        onPresent={noop}
        onCopyLink={noop}
        onManageAccess={noop}
        onPopOut={noop}
        onClose={noop}
      />
    </div>
  );
}

const meta = {
  title: 'Video/Document calls/DocumentCallPanel',
  component: DocumentCallPanel,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DocumentCallPanel>;
export default meta;
type Story = StoryObj<typeof meta>;
const args = {} as DocumentCallPanelProps;

/** Mockup 06: Alice presents Auth architecture; Migration brief is up next. */
export const Default: Story = { args, render: () => <Scene />, decorators: [themed('light')] };
export const DefaultDark: Story = { args, render: () => <Scene />, decorators: [themed('dark')] };
/** A participant who is not the host, while Alice presents: Present is disabled with the reason. */
export const PresentBlocked: Story = {
  args,
  render: () => <BlockedScene />,
  decorators: [themed('light')],
};

/** Nobody presenting — Present this document is live. */
export const NobodyPresenting: Story = { args, render: () => <Scene presenter={null} />, decorators: [themed('light')] };
/** Alone, two people still ringing, one who did not answer. */
export const WaitingForOthers: Story = {
  args,
  render: () => (
    <Scene
      presenter={null}
      people={[
        p('connor', { isLocal: true, isHost: true }),
        p('alice', { state: 'ringing' }),
        p('frank', { state: 'ringing', presence: 'offline' }),
        p('bob', { state: 'missed' }),
        p('carol', { state: 'declined' }),
      ]}
    />
  ),
  decorators: [themed('light')],
};
export const WaitingForOthersDark: Story = { ...WaitingForOthers, decorators: [themed('dark')] };
export const Loading: Story = { args, render: () => <Scene loading />, decorators: [themed('light')] };
/** The call-state feed dropped: the lists stay, a warning says so. */
export const Reconnecting: Story = {
  args,
  render: () => (
    <Scene
      people={[...PEOPLE.slice(0, 3), p('bob', { state: 'reconnecting', cameraOn: false })]}
      notice={<InlineAlert tone="warning">Reconnecting to the call…</InlineAlert>}
    />
  ),
  decorators: [themed('light')],
};
