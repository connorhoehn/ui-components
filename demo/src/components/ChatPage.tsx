import React from 'react';
import {
  ExampleBlock,
  PropsTable,
  PageHeader,
  useRegisterToc,
} from '../shared';
import type { TocItem } from '../shared';
import {
  ThinkingDots,
  ChatComposer,
  MessageBubble,
  ToolCallStrip,
  ToolCallPill,
  ThinkingBlock,
  QuickPromptGrid,
  FollowUpChips,
  Avatar,
} from '@connorhoehnslalom/ui-components/shared';

const tocItems: TocItem[] = [
  { id: 'thinking-dots', label: 'ThinkingDots', level: 2 },
  { id: 'chat-composer', label: 'ChatComposer', level: 2 },
  { id: 'message-bubble', label: 'MessageBubble', level: 2 },
  { id: 'tool-call-strip', label: 'ToolCallStrip / ToolCallPill', level: 2 },
  { id: 'thinking-block', label: 'ThinkingBlock', level: 2 },
  { id: 'quick-prompt-grid', label: 'QuickPromptGrid', level: 2 },
  { id: 'follow-up-chips', label: 'FollowUpChips', level: 2 },
  { id: 'composition', label: 'Composition: mini chat', level: 2 },
  { id: 'props', label: 'API Reference', level: 2 },
];

const QUICK_PROMPTS = [
  { label: 'Who owns the billing service?', hint: 'Lookup an OrgIQ owner' },
  { label: 'Summarize last week’s incidents', hint: 'Pulls from postmortem corpus' },
  { label: 'Find Kubernetes experts', hint: 'Expertise scoring' },
  { label: 'Draft a roadmap update', hint: 'Newsroom · headline' },
];

const FOLLOW_UPS = [
  'Show their latest projects',
  'Which teams overlap?',
  'Find a backup on-call',
];

const COMPOSER_FRAME =
  'border border-border rounded-lg overflow-hidden bg-white';
const COMPOSER_LABEL =
  'px-3 py-2 text-[11px] font-semibold text-neutral';
const SUBTLE_SEP = 'border-t border-border-subtle';
const COL = 'flex flex-col items-center gap-1.5';
const CAPTION = 'text-[11px] text-neutral';

interface MockMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: { id: string; name: string; done: boolean }[];
  streaming?: boolean;
}

export default function ChatPage() {
  useRegisterToc(tocItems);

  const [draft, setDraft] = React.useState('');
  const [longDraft, setLongDraft] = React.useState('');

  const [composeDraft, setComposeDraft] = React.useState('');
  const [messages, setMessages] = React.useState<MockMessage[]>([
    { id: 'm1', role: 'user', content: 'Who knows the most about our auth service?' },
    {
      id: 'm2',
      role: 'assistant',
      content:
        'Based on commit history and on-call rotations, the top three experts on the auth service are Alice Chen, Devon Lee, and Erin Pope. Alice has the highest expertise score (0.92) thanks to her recent OIDC refactor.',
      toolCalls: [
        { id: 't1', name: 'graph.search_people', done: true },
        { id: 't2', name: 'scoring.expertise', done: true },
      ],
    },
  ]);

  const handleSendMini = () => {
    if (!composeDraft.trim()) return;
    const userMsg: MockMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: composeDraft,
    };
    const assistantStub: MockMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: '',
      streaming: true,
    };
    setMessages((prev) => [...prev, userMsg, assistantStub]);
    setComposeDraft('');
    window.setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantStub.id
            ? {
                ...m,
                content:
                  'Thanks — I\'d look at Alice Chen first. She owns 4 of the last 6 PRs against the auth service and is currently primary on-call.',
                streaming: false,
              }
            : m,
        ),
      );
    }, 900);
  };

  return (
    <div className="max-w-[960px] mx-auto">
      <PageHeader
        title="Chat & Thread"
        description="Components for building agent chat UIs: message bubbles, composer, tool-call strips, thinking indicators, quick prompts, and follow-up chips."
        importPath="import { MessageBubble, ChatComposer, ToolCallStrip, ThinkingDots } from '@connorhoehnslalom/ui-components/shared'"
      />

      {/* ─── ThinkingDots ─────────────────────────────────────────────── */}
      <ExampleBlock
        id="thinking-dots"
        title="ThinkingDots"
        description="Three-dot typing/thinking animation. Use inside MessageBubble while content is streaming, or as a standalone presence indicator."
        code={`<ThinkingDots size="sm" />
<ThinkingDots size="md" />
<ThinkingDots color="#16a34a" />`}
      >
        <div className="flex gap-7 items-center">
          <div className={COL}>
            <ThinkingDots size="sm" />
            <span className={CAPTION}>sm</span>
          </div>
          <div className={COL}>
            <ThinkingDots size="md" />
            <span className={CAPTION}>md (default)</span>
          </div>
          <div className={COL}>
            <ThinkingDots color="#16a34a" />
            <span className={CAPTION}>custom color</span>
          </div>
        </div>
      </ExampleBlock>

      {/* ─── ChatComposer ─────────────────────────────────────────────── */}
      <ExampleBlock
        id="chat-composer"
        title="ChatComposer"
        description="Chat input with a send button. Stateless — value/onChange controlled by the parent. Enter submits; Shift+Enter inserts a newline in multiline mode. Submit disables when value is empty or whitespace."
        code={`const [draft, setDraft] = useState('');

// Single-line
<ChatComposer
  value={draft}
  onChange={setDraft}
  onSubmit={() => send(draft)}
  placeholder="Ask anything…"
/>

// Multiline
<ChatComposer
  value={draft}
  onChange={setDraft}
  onSubmit={() => send(draft)}
  multiline
  maxRows={6}
  placeholder="Long message…"
/>`}
      >
        <div className="flex flex-col gap-4">
          <div className={COMPOSER_FRAME}>
            <div className={COMPOSER_LABEL}>Single-line</div>
            <ChatComposer
              value={draft}
              onChange={setDraft}
              onSubmit={() => setDraft('')}
              placeholder="Ask anything…"
            />
          </div>
          <div className={COMPOSER_FRAME}>
            <div className={COMPOSER_LABEL}>Multiline (Shift+Enter for newline)</div>
            <ChatComposer
              value={longDraft}
              onChange={setLongDraft}
              onSubmit={() => setLongDraft('')}
              multiline
              maxRows={6}
              placeholder="Long message…"
            />
          </div>
        </div>
      </ExampleBlock>

      {/* ─── MessageBubble ────────────────────────────────────────────── */}
      <ExampleBlock
        id="message-bubble"
        title="MessageBubble"
        description="Single chat message. Renders a role label, an optional tool-call strip, and the message body. When role=assistant and streaming with empty content, shows ThinkingDots automatically."
        code={`<MessageBubble role="user" content="Who knows auth best?" />

<MessageBubble
  role="assistant"
  content="Alice, Devon, and Erin are the top three."
  toolCalls={[
    { id: 't1', name: 'graph.search_people', done: true },
    { id: 't2', name: 'scoring.expertise', done: true },
  ]}
/>

<MessageBubble role="assistant" content="" streaming />`}
      >
        <div className="border border-border rounded-lg px-4 bg-white flex flex-col">
          <MessageBubble role="user" content="Who knows auth best?" />
          <div className={SUBTLE_SEP} />
          <MessageBubble
            role="assistant"
            content="Alice, Devon, and Erin are the top three experts on our auth service based on recent contributions and on-call rotations."
            toolCalls={[
              { id: 't1', name: 'graph.search_people', done: true },
              { id: 't2', name: 'scoring.expertise', done: true },
            ]}
          />
          <div className={SUBTLE_SEP} />
          <MessageBubble role="assistant" content="" streaming />
        </div>
      </ExampleBlock>

      {/* ─── ToolCallStrip ────────────────────────────────────────────── */}
      <ExampleBlock
        id="tool-call-strip"
        title="ToolCallStrip / ToolCallPill"
        description="A compact strip of tool-call pills shown above an assistant message. Each pill displays the tool name and a done (green ✓) or in-progress (blue …) state."
        code={`<ToolCallStrip
  toolCalls={[
    { id: '1', name: 'graph.search_people', done: true },
    { id: '2', name: 'scoring.expertise', done: true },
    { id: '3', name: 'rag.lookup', done: false },
  ]}
/>

// Or render individual pills
<ToolCallPill name="kb.query" done={true} />
<ToolCallPill name="aurora.execute" done={false} />`}
      >
        <div className="flex flex-col gap-3.5">
          <ToolCallStrip
            toolCalls={[
              { id: '1', name: 'graph.search_people', done: true },
              { id: '2', name: 'scoring.expertise', done: true },
              { id: '3', name: 'rag.lookup', done: false },
            ]}
          />
          <div className="flex gap-2">
            <ToolCallPill name="kb.query" done />
            <ToolCallPill name="aurora.execute" done={false} />
            <ToolCallPill name="guardrail.check" done />
          </div>
        </div>
      </ExampleBlock>

      {/* ─── ThinkingBlock ────────────────────────────────────────────── */}
      <ExampleBlock
        id="thinking-block"
        title="ThinkingBlock"
        description="Collapsible details block for showing chain-of-thought reasoning. Pair with a parser that strips <thinking> tags from the assistant message."
        code={`<ThinkingBlock content="Let me search the graph first…" defaultOpen={false} />

<ThinkingBlock
  content="Step 1: Query people by skill='auth'\\nStep 2: Score by expertise\\nStep 3: Filter by on-call status"
  defaultOpen
/>`}
      >
        <div className="flex flex-col gap-3">
          <ThinkingBlock content="Let me search the graph first to find people associated with the auth service." defaultOpen={false} />
          <ThinkingBlock
            content={`Step 1: Query people by skill='auth'
Step 2: Score by expertise (commit count × recency)
Step 3: Filter by current on-call status
Step 4: Rank and return top 3`}
            defaultOpen
          />
        </div>
      </ExampleBlock>

      {/* ─── QuickPromptGrid ──────────────────────────────────────────── */}
      <ExampleBlock
        id="quick-prompt-grid"
        title="QuickPromptGrid"
        description="Empty-state grid of suggested prompts. Each tile is a button that calls onSelect(label). Responsive by default; pass columns to force a fixed grid."
        code={`<QuickPromptGrid
  title="Try asking:"
  prompts={[
    { label: 'Who owns the billing service?', hint: 'Lookup an OrgIQ owner' },
    { label: 'Summarize last week’s incidents', hint: 'Pulls from postmortems' },
    { label: 'Find Kubernetes experts', hint: 'Expertise scoring' },
    { label: 'Draft a roadmap update', hint: 'Newsroom · headline' },
  ]}
  onSelect={(label) => sendPrompt(label)}
/>`}
      >
        <QuickPromptGrid
          title="Try asking:"
          prompts={QUICK_PROMPTS}
          onSelect={() => undefined}
          columns={2}
        />
      </ExampleBlock>

      {/* ─── FollowUpChips ────────────────────────────────────────────── */}
      <ExampleBlock
        id="follow-up-chips"
        title="FollowUpChips"
        description="Strip of clickable follow-up suggestion chips, typically shown beneath the latest assistant message. Optional refresh button regenerates suggestions."
        code={`<FollowUpChips
  label="Follow up:"
  suggestions={[
    'Show their latest projects',
    'Which teams overlap?',
    'Find a backup on-call',
  ]}
  onSelect={(s) => sendPrompt(s)}
  onRefresh={() => regenerate()}
/>`}
      >
        <FollowUpChips
          label="Follow up:"
          suggestions={FOLLOW_UPS}
          onSelect={() => undefined}
          onRefresh={() => undefined}
        />
      </ExampleBlock>

      {/* ─── Composition ──────────────────────────────────────────────── */}
      <ExampleBlock
        id="composition"
        title="Composition: mini chat"
        description="A realistic chat layout assembled from the primitives above — sidebar with sessions, scrolling message list, and the composer pinned at the bottom. Try sending a message to see the streaming flow."
        code={`<div style={{ display: 'flex', height: 700, border: '1px solid #e2e8f0', borderRadius: 12 }}>
  <SessionSidebar sessions={...} />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
      {messages.map((m) => (
        <MessageBubble key={m.id} {...m} />
      ))}
    </div>
    <ChatComposer value={draft} onChange={setDraft} onSubmit={send} />
  </div>
</div>`}
      >
        <div className="flex h-[700px] border border-border rounded-xl overflow-hidden bg-white">
          <aside className="w-[220px] border-r border-border bg-surface-panel flex flex-col">
            <div className="px-4 py-3.5 border-b border-border text-[13px] font-semibold text-text-primary">
              Sessions
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {[
                { id: 's1', name: 'Auth expertise lookup', selected: true, user: 'You' },
                { id: 's2', name: 'Q3 roadmap update', selected: false, user: 'You' },
                { id: 's3', name: 'Incident triage', selected: false, user: 'You' },
                { id: 's4', name: 'Pricing committee', selected: false, user: 'You' },
              ].map((s) => (
                <div
                  key={s.id}
                  className={`px-2.5 py-2 rounded-md mb-0.5 cursor-pointer flex gap-2 items-center ${
                    s.selected ? 'bg-surface-emphasis' : 'bg-transparent'
                  }`}
                >
                  <Avatar name={s.name} size={22} />
                  <span className="text-xs text-text-primary overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-5 py-3 border-b border-border text-[13px] font-semibold text-text-primary bg-white">
              Auth expertise lookup
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              {messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  role={m.role}
                  content={m.content}
                  toolCalls={m.toolCalls}
                  streaming={m.streaming}
                />
              ))}
              {!messages.some((m) => m.streaming) && (
                <FollowUpChips
                  label="Follow up:"
                  suggestions={FOLLOW_UPS}
                  onSelect={(s) => setComposeDraft(s)}
                  onRefresh={() => undefined}
                />
              )}
            </div>
            <ChatComposer
              value={composeDraft}
              onChange={setComposeDraft}
              onSubmit={handleSendMini}
              placeholder="Reply…"
            />
          </div>
        </div>
      </ExampleBlock>

      {/* ─── Props ────────────────────────────────────────────────────── */}
      <div id="props" className="mt-12">
        <h2 className="text-[22px] font-bold text-text-primary mb-6">
          API Reference
        </h2>

        <PropsTable
          componentName="ThinkingDots"
          props={[
            { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Dot size. sm = 4px, md = 6px.' },
            { name: 'color', type: 'string', description: 'Dot color. Defaults to var(--color-text-tertiary).' },
          ]}
        />

        <PropsTable
          componentName="ChatComposer"
          props={[
            { name: 'value', type: 'string', required: true, description: 'Controlled input value.' },
            { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called on every keystroke.' },
            { name: 'onSubmit', type: '() => void', required: true, description: 'Called when Enter is pressed or the send button is clicked.' },
            { name: 'multiline', type: 'boolean', default: 'false', description: 'Use a textarea instead of a single-line input. Shift+Enter inserts a newline.' },
            { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
            { name: 'submitLabel', type: 'string | ReactNode', default: "'→'", description: 'Content of the send button.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input and send button.' },
            { name: 'maxRows', type: 'number', default: '4', description: 'For multiline only — maximum rows before scrolling.' },
          ]}
        />

        <PropsTable
          componentName="MessageBubble"
          props={[
            { name: 'role', type: "'user' | 'assistant'", required: true, description: 'Speaker role; controls the rendered label.' },
            { name: 'content', type: 'string', required: true, description: 'Message body. Pass empty string + streaming=true for the typing indicator.' },
            { name: 'toolCalls', type: 'ToolCallItem[]', description: 'Optional list of tool calls rendered as a strip above the content.' },
            { name: 'streaming', type: 'boolean', default: 'false', description: 'When true and content is empty, shows ThinkingDots.' },
            { name: 'agentName', type: 'string', default: "'Assistant'", description: 'Label text for assistant messages.' },
            { name: 'userName', type: 'string', default: "'You'", description: 'Label text for user messages.' },
            { name: 'renderMarkdown', type: '(content: string) => ReactNode', description: 'Inject a markdown renderer for assistant content.' },
          ]}
        />

        <PropsTable
          componentName="ToolCallStrip"
          props={[
            { name: 'toolCalls', type: '{ id: string; name: string; done: boolean; args?: string }[]', required: true, description: 'Tool calls to render as pills.' },
          ]}
        />

        <PropsTable
          componentName="ToolCallPill"
          props={[
            { name: 'name', type: 'string', required: true, description: 'Tool name shown inside the pill.' },
            { name: 'done', type: 'boolean', required: true, description: 'When true: green ✓; when false: blue …' },
          ]}
        />

        <PropsTable
          componentName="ThinkingBlock"
          props={[
            { name: 'content', type: 'string', required: true, description: 'The thinking/reasoning text.' },
            { name: 'streaming', type: 'boolean', default: 'false', description: 'Show "Thinking…" + ThinkingDots when content is empty.' },
            { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Whether the block starts expanded.' },
          ]}
        />

        <PropsTable
          componentName="QuickPromptGrid"
          props={[
            { name: 'prompts', type: '{ label: string; hint?: string }[]', required: true, description: 'Prompts to render as suggestion cards.' },
            { name: 'onSelect', type: '(label: string) => void', required: true, description: 'Called when a prompt card is clicked.' },
            { name: 'columns', type: 'number', description: 'Force a fixed grid column count. Defaults to responsive auto-fit.' },
            { name: 'title', type: 'string', description: 'Optional heading above the grid.' },
          ]}
        />

        <PropsTable
          componentName="FollowUpChips"
          props={[
            { name: 'suggestions', type: 'string[]', required: true, description: 'Suggestion strings to render as chips.' },
            { name: 'onSelect', type: '(suggestion: string) => void', required: true, description: 'Called when a chip is clicked.' },
            { name: 'onRefresh', type: '() => void', description: 'If provided, shows a ↻ refresh button at the end.' },
            { name: 'label', type: 'string', description: 'Optional label before the chips.' },
          ]}
        />
      </div>
    </div>
  );
}
