import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AgentComposerDock } from './AgentComposerDock';
import type { ComposerReference } from './ComposerReferences';
import type { DocumentCandidate } from './RichChatComposer';
import { CallDock, type CallDockParticipant } from '../video/CallDock';
import { CAST, DEVICES, noop } from '../video/documentCallStoryKit';

const workflows = [
  { id: 'prioritize', label: 'Prioritize next work', description: 'Rank the open work and explain the tradeoffs' },
  { id: 'criteria', label: 'Define acceptance criteria', disabled: true, disabledReason: 'Open a work item first' },
  { id: 'unblock', label: 'Unblock this item', disabled: true, disabledReason: 'Open a work item first' },
];
const commands = [
  { trigger: '/prioritize', label: 'Prioritize next work', hint: 'Rank the open work and explain the tradeoffs' },
  { trigger: '/criteria', label: 'Define acceptance criteria', hint: 'Open a work item first', disabled: true },
  { trigger: '/unblock', label: 'Unblock this item', hint: 'Open a work item first', disabled: true },
];

const meta = {
  title: 'Social/AgentComposerDock', component: AgentComposerDock, tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="flex min-h-[20rem] flex-col justify-end bg-workspace"><Story /></div>],
  args: { onSend: () => true },
} satisfies Meta<typeof AgentComposerDock>;
export default meta;
type Story = StoryObj<typeof meta>;

/** The Initiative Work page: document toolbar, the initiative chip, a prefill and the Workflow ⌄ menu. */
export const DocumentWithWorkflows: Story = {
  render: (args) => {
    const [chip, setChip] = useState(true);
    const references: ComposerReference[] = chip ? [{ id: 'p-auth', label: 'Auth Migration', marker: 'dot' }] : [];
    return <AgentComposerDock {...args} presentation="document" draftKey="initiative:p-auth"
      defaultDraft="Help me prioritize the next changes and explain the tradeoffs."
      placeholder="Ask about this initiative…" references={references} onRemoveReference={() => setChip(false)}
      workflows={workflows} commands={commands} />;
  },
};

/** The initiatives list's lighter card: compact toolbar and density. */
export const Compact: Story = {
  args: {
    presentation: 'compact',
    placeholder: "Ask about the team's initiatives or how to get involved…",
    references: [{ id: 'initiatives', label: 'Initiatives', marker: 'dot' }],
    workflows: workflows.map((w) => ({ ...w, disabled: true, disabledReason: 'Still loading' })),
  },
};

/** Chat is off with the host's reason (open the Agent ⌄ menu to read it). */
export const ChatDisabledWithReason: Story = {
  args: {
    presentation: 'document',
    placeholder: 'Ask about this work item…',
    references: [{ id: 'w-1', label: 'This work item', title: 'Tenant-by-tenant cutover', marker: 'dot' }],
    modeUnavailableReasons: { chat: 'Only the owner and SMEs can post to this discussion' },
  },
};

const records: DocumentCandidate[] = [
  { id: 'initiative:p-auth', label: 'Auth Migration', hint: 'Initiative', group: 'Initiatives' },
  { id: 'person:p-001', label: 'Vera Green', hint: 'Person', group: 'People' },
  { id: 'work:w-1', label: 'Tenant-by-tenant cutover', hint: 'Work', group: 'Work' },
];

/** Search: `#` opens an "Add context" card over the host's records; chips are the selection. */
export const SearchLike: Story = {
  render: (args) => {
    const [refs, setRefs] = useState<ComposerReference[]>([{ id: 'initiative:p-auth', label: 'Auth Migration' }, { id: 'sources', label: '3 sources' }]);
    return <AgentComposerDock {...args} presentation="document" label="Search composer"
      placeholder="Ask a follow-up, or use # to add context…"
      references={refs} onRemoveReference={(id) => setRefs((r) => r.filter((x) => x.id !== id))}
      onSearchDocuments={(q) => records.filter((r) => r.label.toLowerCase().includes(q.toLowerCase()))}
      documentMenu={{ title: 'Add context', emptyLabel: 'No matching records' }}
      workflows={[{ id: 'summarize', label: 'Summarize the selection', description: 'What these records say together' }]}
      commands={[{ trigger: '/summarize', label: 'Summarize the selection' }]} />;
  },
};

function participant(who: 'connor' | 'alice'): CallDockParticipant {
  const c = CAST[who];
  return {
    id: c.userId, userId: c.userId, displayName: c.name,
    cameraOn: false, audioOn: true, screenSharing: false, presenting: false, connection: 'connected',
  };
}

/** A document page on a call: the live `CallDock` (two people) pinned above the document-preset composer via `dock`. */
export const WithADockedCallShelf: Story = {
  name: 'With a docked call shelf',
  render: (args) => (
    <AgentComposerDock {...args} presentation="document" placeholder="Ask about this document…"
      modes={['agent', 'chat']}
      references={[{ id: 'doc-adr', label: 'ADR: Aurora over Neptune', marker: 'dot' }]}
      dock={(
        <CallDock
          title="ADR review" participantCount={2} elapsedMs={4 * 60_000 + 12_000} phase="active"
          participants={[participant('connor'), participant('alice')]} localParticipantId={CAST.connor.userId}
          mic={{ on: true, onToggle: noop, devices: DEVICES.microphones, selectedDeviceId: 'mbp-mic', onSelectDevice: noop, permission: 'granted' }}
          camera={{ on: false, onToggle: noop, devices: DEVICES.cameras, selectedDeviceId: 'facetime', onSelectDevice: noop, permission: 'granted' }}
          screenShare={{ on: false, onToggle: noop }}
          onOpenPeople={noop} onOpenSettings={noop} onPopOut={noop} onLeave={noop}
        />
      )} />
  ),
};

/** A devbox terminal: `modes={['terminal']}` offers Terminal alone (no Chat/Agent rows, no default disable). */
export const TerminalOnly: Story = {
  name: 'Terminal only',
  args: {
    presentation: 'document',
    modes: ['terminal'],
    defaultMode: 'terminal',
    modePlaceholders: { terminal: 'Run a command on the box…' },
    references: [{ id: 'box-1', label: 'devbox-7f2c', marker: 'dot' }],
  },
};
