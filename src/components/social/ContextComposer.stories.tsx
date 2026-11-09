import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextComposer, type ContextComposerProps } from './ContextComposer';
import { ComposerPromptDeck } from './ComposerPromptDeck';
import type { ComposerContext } from './composerContext';
import type { ComposerMode, RichChatDraft } from './RichChatComposer';
import { CallDock, type CallDockParticipant } from '../video/CallDock';
import { CAST, DEVICES, noop } from '../video/documentCallStoryKit';
import { EditorShell } from '../doc-editor/EditorShell';
import EmptyState from '../shared/EmptyState';

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

/**
 * `presentation="prompt"` (2.510.0): the quiet prompt box — the record and
 * its references in one header row, suggestion chips, the text box and one
 * button that reads `submitLabel`. No mode label, no `/ commands` hint; a
 * command with nothing to ask runs on the pick. The second panel adds a
 * reference: same rows, same height.
 */
export const PromptPresentation: Story = {
  name: 'Prompt presentation',
  render: () => (
    <div className="grid grid-cols-1 gap-4 bg-surface p-4 lg:grid-cols-2">
      {([[], [{ id: 'guide', label: 'Guide' }]] as const).map((references) => (
        <Panel key={references.length} theme="light" caption={references.length ? 'with a reference' : 'record only'}>
          <ContextComposer context={CONTEXTS.initiative!} presentation="prompt" modes={['agent']} defaultMode="agent" expanded
            submitLabel="Plan" commands={commands} suggestions={['Create a new episode', 'Add a character']} onSuggestion={noop}
            suggestionsVisible="empty" references={references} onRemoveReference={noop} onSend={() => true} />
        </Panel>
      ))}
    </div>
  ),
};

/**
 * Prompt presentation with an open card (2.512.0): a deck in the quiet box's
 * `header` reads the composer's presentation — plain answer buttons, no key
 * hints, one fact per line — and the text box stays under it. In a
 * `ConversationComposer` with `prompts` the box answers a text card and hands
 * words typed under a confirm card to its `onDirection`.
 */
export const PromptPresentationWithCard: Story = {
  name: 'Prompt presentation with a card',
  render: () => (
    <Panel theme="light" caption="confirm card over the prompt box">
      <ContextComposer context={CONTEXTS.initiative!} presentation="prompt" modes={['agent']} defaultMode="agent" expanded
        submitLabel="Plan" onSend={() => true}
        header={<ComposerPromptDeck variant="inset" prompts={[{
          id: 'generate', eyebrow: 'Add a character', title: 'Generate Mina', kind: 'confirm',
          question: 'Generate Mina with these answers?',
          fields: [{ label: 'Name', value: 'Mina' }, { label: 'Role', value: 'Supporting' }, { label: 'Height', value: 'Short' }],
          options: [{ id: 'generate', label: 'Generate', emphasis: 'primary' }, { id: 'change', label: 'Change answers' }],
          onDirection: () => undefined,
          onAnswer: () => undefined,
        }]} />} />
    </Panel>
  ),
};

/**
 * Read-only (2.450.0): a reader on a discussion. The note takes the
 * placeholder's place; format buttons, Workflow ⌄, `/ commands` and Send are
 * off in muted ink. With only Chat the mode label is off too; with Agent on,
 * the mode menu stays the way out. Beside it, the same composer for a writer.
 */
export const ReadOnly: Story = {
  name: 'Read-only — a reader',
  render: () => (
    <div className="grid grid-cols-1 gap-4 bg-surface p-4 lg:grid-cols-2">
      {(['light', 'dark'] as const).map((theme) => (
        <Panel key={`ro-${theme}`} theme={theme} caption={`reader · chat only · ${theme}`}>
          <ContextComposer {...wired} context={CONTEXTS.initiative!} modes={['chat']} expanded onSend={() => true}
            readOnly="You can read messages. Your current role cannot post to this discussion." />
        </Panel>
      ))}
      <Panel theme="light" caption="reader · Agent on (the mode menu stays live)">
        <ContextComposer {...wired} context={CONTEXTS.initiative!} modes={['chat', 'agent']} mode="chat" expanded onSend={() => true}
          readOnly="You can read messages. Your current role cannot post to this discussion." />
      </Panel>
      <Panel theme="light" caption="writer · fully live">
        <ContextComposer {...wired} context={CONTEXTS.initiative!} modes={['chat', 'agent']} mode="chat" expanded onSend={() => true} />
      </Panel>
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

/**
 * One Send, one compact size (2.407.9): a conversation (split Send with its
 * caret) and a document (plain Send) side by side, idle and expanded. Both idle
 * rows are the small social row (42px) and both cards carry the same compact
 * Send, with the arrow (and the conversation's caret).
 */
export const SendOneSize: Story = {
  name: 'Send — one size on every context',
  render: () => (
    <div className="grid grid-cols-1 gap-4 bg-surface p-4 lg:grid-cols-2">
      {([false, true] as const).flatMap((expanded) => (['conversation', 'document'] as const).map((kind) => (
        <Panel key={`${kind}-${expanded}`} theme="light" caption={`${kind} · ${expanded ? 'expanded' : 'idle'}`}>
          <ContextComposer
            {...wired}
            {...(kind === 'document' ? { sendOptions: undefined, onSendOption: undefined } : {})}
            context={CONTEXTS[kind]!}
            expanded={expanded}
            onSend={() => true}
            data-testid={`send-${kind}-${expanded ? 'expanded' : 'idle'}`}
          />
        </Panel>
      )))}
    </div>
  ),
};

/**
 * A page with a call docked above its expanded composer, in EditorShell's
 * footer, at 1280×720 (the viewport the composer check caught it at). The
 * footer row used to cap at half the surface, so the call dock kept its height
 * and the composer card was cut off below its input; now the row never caps
 * below what cannot scroll and the editor above gives up the height.
 */
export const PageUnderCallDock: Story = {
  name: 'Page — expanded under a call dock (1280×720)',
  render: () => (
    // 608px is the page's shell at a 1280×720 window once the app's own bar
    // is taken: a 543px surface, so a 272px half-surface cap — the numbers
    // the composer check measured.
    <div className="flex h-[608px] min-h-0 flex-col" data-testid="page-under-call-dock">
      <EditorShell
        title="Composer verify page"
        kind="page"
        footer={(
          <>
            {shelf}
            <ContextComposer
              {...wired}
              context={{ kind: 'document', id: 'doc-verify', title: 'Composer verify page' }}
              expanded
              onSend={() => true}
              data-testid="page-composer"
            />
          </>
        )}
      >
        <EmptyState title="Start writing…" body="The page's editor; it shrinks to make room for the call and the composer." />
      </EditorShell>
    </div>
  ),
};

/**
 * Stands in for the rest of a document page, which re-renders on every
 * keystroke of a controlled draft (the draft is page state). Heavy on purpose:
 * its commits outlast the gap between synthetic keys.
 */
function PageBody({ draft }: { draft: RichChatDraft | undefined }) {
  const length = draft?.html.length ?? 0;
  return (
    <ol className="sr-only" aria-hidden>
      {Array.from({ length: 4000 }, (_, i) => <li key={i}>{`${i}:${length}`}</li>)}
    </ol>
  );
}

/**
 * A document page's composer as a host wires it: the draft and the mode are
 * the host's state (`draft` + `onDraftChange`, `mode` + `onModeChange`), Agent
 * first, and the page re-renders with every keystroke. The fast-typing
 * Storybook spec types into this one at delay 0.
 */
export const ControlledAgent: Story = {
  name: 'Document — controlled draft, Agent',
  render: () => {
    const [draft, setDraft] = useState<RichChatDraft | undefined>(undefined);
    const [mode, setMode] = useState<ComposerMode>('agent');
    return (
      <div className="flex min-h-[20rem] flex-col justify-end gap-3 bg-workspace p-4">
        <PageBody draft={draft} />
        <ContextComposer
          {...wired}
          context={CONTEXTS.document!}
          mode={mode}
          onModeChange={setMode}
          draft={draft}
          onDraftChange={setDraft}
          onSend={() => true}
          data-testid="controlled-agent"
        />
        <output data-testid="controlled-agent-draft" className="text-xs text-text-secondary">{draft?.html ?? ''}</output>
      </div>
    );
  },
};


/** Explicit folding keeps the destination, text and staged files intact. */
export const CollapsibleDraft: StoryObj<typeof ContextComposer> = {
  args: { context: CONTEXTS.initiative, collapsible: true, expanded: true,
    collapsedLabel: 'Initiative discussion', above: <span>To: Initiative discussion</span>,
    defaultDraft: { html: '<p>Review the rollout plan with the team.</p>', files: [] },
    defaultMode: 'chat', onSend: () => false },
};
