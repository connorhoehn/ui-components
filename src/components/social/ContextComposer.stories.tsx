import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextComposer, type ContextComposerProps } from './ContextComposer';
import type { ComposerContext } from './composerContext';
import { CallDock, type CallDockParticipant } from '../video/CallDock';
import { CAST, DEVICES, noop } from '../video/documentCallStoryKit';

const workflows = [
  { id: 'presentation-deck', label: 'Presentation deck', description: 'Draft a deck that cites this page' },
  { id: 'review', label: 'Review for gaps', description: 'List what the page does not answer yet' },
];
const commands = [
  { trigger: '/summarize', label: 'Summarize', hint: 'Condense the page into five bullets' },
];

const CONTEXTS: Record<string, ComposerContext> = {
  conversation: { kind: 'conversation', id: 'dm-hank', title: 'Hank Anderson', dm: true },
  document: { kind: 'document', id: 'doc-adr', title: 'ADR: Aurora over Neptune' },
  workItem: { kind: 'work-item', id: 'w-1', title: 'Tenant-by-tenant cutover' },
  diagram: { kind: 'diagram', id: 'dg-1', title: 'Checkout flow' },
  initiative: { kind: 'initiative', id: 'p-auth', title: 'Auth Migration' },
  search: { kind: 'search', id: 'search', title: '' },
};

/** Everything a host would pass; the context decides which of it renders. */
const wired: Partial<ContextComposerProps> = {
  workflows,
  commands,
  onMakeDeck: noop,
  onShareDocument: noop,
  sendOptions: [{ id: 'later', label: 'Send later' }],
  onSendOption: noop,
  onSearchPeople: () => [{ id: CAST.alice.userId, label: CAST.alice.name }],
  onRemoveContext: noop,
};

function participant(who: 'connor' | 'alice'): CallDockParticipant {
  const c = CAST[who];
  return {
    id: c.userId, userId: c.userId, displayName: c.name,
    cameraOn: false, audioOn: true, screenSharing: false, presenting: false, connection: 'connected',
  };
}

const shelf = (
  <CallDock
    title="ADR review" participantCount={2} elapsedMs={4 * 60_000 + 12_000} phase="active"
    participants={[participant('connor'), participant('alice')]} localParticipantId={CAST.connor.userId}
    mic={{ on: true, onToggle: noop, devices: DEVICES.microphones, selectedDeviceId: 'mbp-mic', onSelectDevice: noop, permission: 'granted' }}
    camera={{ on: false, onToggle: noop, devices: DEVICES.cameras, selectedDeviceId: 'facetime', onSelectDevice: noop, permission: 'granted' }}
    screenShare={{ on: false, onToggle: noop }}
    onOpenPeople={noop} onOpenSettings={noop} onPopOut={noop} onLeave={noop}
  />
);

function Panel({ theme, caption, children }: { theme: 'light' | 'dark'; caption: string; children: ReactNode }) {
  return (
    <section data-theme={theme} className="flex min-h-[14rem] flex-col justify-end gap-2 rounded-lg border border-border bg-workspace p-2 text-text-primary">
      <span className="text-xs font-medium text-text-secondary">{caption}</span>
      {children}
    </section>
  );
}

/** One context in the four states the review asks for: light/dark × idle/expanded. */
function Matrix({ context, dock, ...rest }: { context: ComposerContext; dock?: boolean } & Partial<ContextComposerProps>) {
  return (
    <div className="grid grid-cols-1 gap-4 bg-surface p-4 lg:grid-cols-2">
      {(['light', 'dark'] as const).flatMap((theme) => ([false, true] as const).map((expanded) => (
        <Panel key={`${theme}-${expanded}`} theme={theme} caption={`${theme} · ${expanded ? 'expanded' : 'idle'}`}>
          <ContextComposer
            {...wired}
            {...rest}
            context={context}
            expanded={expanded}
            {...(dock ? { dock: shelf } : {})}
            onSend={() => true}
            data-testid={`composer-${theme}-${expanded ? 'expanded' : 'idle'}`}
          />
        </Panel>
      )))}
    </div>
  );
}

const meta = {
  title: 'Social/ContextComposer', component: ContextComposer, tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { context: CONTEXTS.document!, onSend: () => true },
} satisfies Meta<typeof ContextComposer>;
export default meta;
type Story = StoryObj<typeof meta>;

/** A DM: Chat + Agent, no chip, no Workflow, no page actions; Share a document and send options on the strip. */
export const Conversation: Story = { render: () => <Matrix context={CONTEXTS.conversation!} /> };
export const ConversationWithDock: Story = { name: 'Conversation — with dock', render: () => <Matrix context={CONTEXTS.conversation!} dock /> };

/** A page: Agent ⌄ with Terminal off until a loop is attached, the page chip, Workflow ⌄, Make a deck under Agent ⌄. */
export const Document: Story = { render: () => <Matrix context={CONTEXTS.document!} /> };
export const DocumentWithDock: Story = { name: 'Document — with dock', render: () => <Matrix context={CONTEXTS.document!} dock /> };

/** A work item's brief: as a document, chip "This work item". */
export const WorkItem: Story = { name: 'Work item', render: () => <Matrix context={CONTEXTS.workItem!} /> };
export const WorkItemWithDock: Story = { name: 'Work item — with dock', render: () => <Matrix context={CONTEXTS.workItem!} dock /> };

/** A diagram: Agent off with its reason, starts in Chat. */
export const Diagram: Story = { render: () => <Matrix context={CONTEXTS.diagram!} /> };
export const DiagramWithDock: Story = { name: 'Diagram — with dock', render: () => <Matrix context={CONTEXTS.diagram!} dock /> };

/** An initiative (aws-agentcore): Agent, Chat off unless wired. */
export const Initiative: Story = { render: () => <Matrix context={CONTEXTS.initiative!} presentation="document" /> };
export const InitiativeWithDock: Story = { name: 'Initiative — with dock', render: () => <Matrix context={CONTEXTS.initiative!} presentation="document" dock /> };

/** Search (aws-agentcore): Agent only. */
export const Search: Story = { render: () => <Matrix context={CONTEXTS.search!} presentation="document" /> };
export const SearchWithDock: Story = { name: 'Search — with dock', render: () => <Matrix context={CONTEXTS.search!} presentation="document" dock /> };

/** Host rows: a reply quote, the offline notice, a task strip — each forces the full card. */
export const WithReplyAndTask: Story = {
  name: 'Reply, notice and task strip',
  render: () => (
    <div className="grid grid-cols-1 gap-4 bg-surface p-4 lg:grid-cols-2">
      <Panel theme="light" caption="conversation · reply + offline">
        <ContextComposer {...wired} context={CONTEXTS.conversation!} onSend={() => true}
          reply={{ author: 'Hank Anderson', quote: 'Can you look at the rollout deck before Thursday?', messageId: 'm1', onDismiss: noop }}
          offline="Reconnecting. Anything you send now is held until the connection is back." />
      </Panel>
      <Panel theme="dark" caption="document · task strip + model unavailable">
        <ContextComposer {...wired} context={CONTEXTS.document!} onSend={() => true} working
          modelUnavailable="The model is unreachable — edits will fail fast until it is back."
          task={{ label: 'Creating release-readiness deck', status: 'running', phase: 'Editing slide 4', onDismiss: noop }} />
      </Panel>
    </div>
  ),
};

/** Try it: switch contexts; focus, type and blur to watch the row expand and fold back. */
export const Interactive: Story = {
  render: () => {
    const [kind, setKind] = useState<keyof typeof CONTEXTS>('document');
    return (
      <div className="flex min-h-[24rem] flex-col justify-end gap-3 bg-workspace p-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Context">
          {Object.keys(CONTEXTS).map((k) => (
            <button key={k} type="button" onClick={() => setKind(k)} aria-pressed={k === kind}
              className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary aria-pressed:bg-surface-inset aria-pressed:text-text-primary">
              {k}
            </button>
          ))}
        </div>
        <ContextComposer {...wired} context={CONTEXTS[kind]!} onSend={() => true} />
      </div>
    );
  },
};

/** One mode (a call chat, a document's chat): the mode is a static label — "Chat", no ⌄, no menu. */
export const SingleMode: Story = {
  name: 'Single mode — static label',
  render: () => (
    <div className="grid grid-cols-1 gap-4 bg-surface p-4 lg:grid-cols-2">
      {([false, true] as const).map((expanded) => (
        <Panel key={`call-${expanded}`} theme="light" caption={`call chat · ${expanded ? 'expanded' : 'idle'}`}>
          <ContextComposer context={CONTEXTS.conversation!} modes={['chat']} expanded={expanded} onSend={() => true} />
        </Panel>
      ))}
      {([false, true] as const).map((expanded) => (
        <Panel key={`doc-${expanded}`} theme="dark" caption={`document chat · ${expanded ? 'expanded' : 'idle'}`}>
          <ContextComposer context={CONTEXTS.document!} modes={['chat']} expanded={expanded} onSend={() => true} />
        </Panel>
      ))}
    </div>
  ),
};

const DOCS = [
  { id: 'doc-adr', label: 'ADR: Aurora over Neptune' },
  { id: 'doc-runbook', label: 'Cutover runbook' },
];

/** Private vs shared questions (a transcript's Ask column): the eye toggle on the strip, and `#` to cite a document. */
export const Privacy: Story = {
  name: 'Privacy toggle + # documents',
  render: () => {
    const [privacy, setPrivacy] = useState<'visible' | 'hidden'>('hidden');
    return (
      <div className="flex min-h-[20rem] flex-col justify-end gap-3 bg-workspace p-4">
        <ContextComposer
          context={{ kind: 'conversation', id: 'transcript-ask', title: 'Ask the transcript' }}
          modes={['chat']}
          expanded
          privacy={privacy}
          onPrivacyChange={setPrivacy}
          privacyLabels={{ visible: 'Shared with the call', hidden: 'Only you' }}
          onSearchDocuments={(q) => DOCS.filter((d) => d.label.toLowerCase().includes(q.toLowerCase()))}
          onSend={() => true}
        />
      </div>
    );
  },
};
