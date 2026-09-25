import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RichChatComposer, type ComposedMessage } from './RichChatComposer';
import { Checkbox } from '../forms/Checkbox';

// Type "@" to open the people menu — arrow keys move, Enter or Tab commits.
// Enter alone sends the message; Shift+Enter is a newline.

const PEOPLE = [
  { id: 'u1', label: 'Nora DaSilva', hint: 'Staff Engineer' },
  { id: 'u2', label: 'Noah Kim', hint: 'Design' },
  { id: 'u3', label: 'Nadia Rossi', hint: 'Platform' },
  { id: 'u4', label: 'Sam Ruiz', hint: 'Support' },
  { id: 'u5', label: 'Bea Okonjo', hint: 'Realtime' },
];

const meta: Meta<typeof RichChatComposer> = {
  title: 'Social/RichChatComposer',
  component: RichChatComposer,
  decorators: [(Story) => <div className="max-w-[640px] p-6"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof RichChatComposer>;

function Harness(props: Partial<React.ComponentProps<typeof RichChatComposer>>) {
  const [sent, setSent] = useState<ComposedMessage | null>(null);
  return (
    <div className="grid gap-3">
      <RichChatComposer
        allowAttachments
        allowEmoji
        // A real host would open its own dialog; the story uses prompt() only
        // because it is the shortest thing that proves the callback shape.
        onRequestLink={(selected) =>
          window.prompt(selected ? `Link for "${selected}"` : 'URL', 'https://') || undefined
        }
        onSend={setSent}
        onSearchPeople={(q) =>
          PEOPLE.filter((p) => p.label.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
        }
        {...props}
      />
      {sent && (
        <div className="grid gap-1.5">
          <div className="text-[11px] text-text-tertiary">last sent</div>
          {/* The HTML is rendered, not printed: that is the only way to see
              whether bold, lists and mention chips actually survived. */}
          <div
            className="ProseMirror min-h-0 rounded-md border border-border p-2"
            dangerouslySetInnerHTML={{ __html: sent.html || '<em>(no text)</em>' }}
          />
          <pre className="m-0 rounded-md bg-surface-inset p-2 text-[11px]">
            {JSON.stringify(
              {
                mentions: sent.mentions.map((m) => `${m.label} <${m.id}>`),
                files: sent.files.map((f) => `${f.name} (${f.size}B)`),
              },
              null,
              1,
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

export const Default: Story = {
  name: 'Everything on',
  render: () => <Harness />,
};

/**
 * Mentions, on their own.
 *
 * Type `@` then a letter — `n` matches four of these people. Arrow keys move,
 * Enter or Tab commits, Escape dismisses. The committed chip is a NODE carrying
 * the userId, which is why the panel below reports an id and not just a name:
 * that is the difference between a real mention and the text "@Nora".
 */
export const Mentions: Story = {
  name: 'Mentions — type @n',
  render: () => <Harness allowAttachments={false} allowEmoji={false} />,
};

/** No file capability: the paperclip and the drop overlay are absent, not greyed. */
export const ChatOnly: Story = {
  render: () => <Harness allowAttachments={false} allowEmoji={false} onSearchPeople={undefined} />,
};

/** Drag an image in — it stages as a chip with a thumbnail and travels on send. */
export const Attachments: Story = {
  name: 'Attachments — drag files in',
  render: () => <Harness onSearchPeople={undefined} allowEmoji={false} />,
};

/** No directory wired: typing "@" is just an @ character. */
export const WithoutMentions: Story = {
  render: () => <Harness onSearchPeople={undefined} />,
};

/**
 * The Documents editor's composer: a compact mode row (label, `1 2 3`,
 * `⌥n`) instead of three large tabs. Option-1/2/3 switch while focus is in
 * the composer; typing `>` alone switches to Terminal and `/run ` to Agent.
 * Terminal is refused here with a reason, as it is when no run is attached.
 */
export const CompactModes: Story = {
  render: () => {
    const [mode, setMode] = useState<'chat' | 'agent' | 'terminal'>('chat');
    const [terminalReady, setTerminalReady] = useState(false);
    return (
      <div className="grid gap-3">
        <RichChatComposer
          onSend={() => {}}
          onShellCommand={() => {}}
          mode={mode}
          onModeChange={setMode}
          modeControl="compact"
          modeShortcuts
          modeTriggers
          disabledModes={terminalReady ? [] : ['terminal']}
          modeUnavailableReasons={{ terminal: 'Start an agent task first' }}
          modeHints={{
            chat: [{ key: '/', label: 'for commands' }, { key: '>_', label: 'for shell' }, { key: '⌘K', label: 'quickly open' }],
            agent: [{ key: '/run', label: 'start work' }, { key: '@', label: 'add context' }, { key: '⌘K', label: 'choose a skill' }],
            terminal: [{ key: '⌘↵', label: 'run command' }, { key: '@', label: 'attach project' }, { key: '/', label: 'insert task' }],
          }}
          submitLabel={{ agent: 'Start', terminal: 'Run' }}
          submitLead={<span className="text-xs text-text-secondary">Presentation skill</span>}
        />
        <label className="flex items-center gap-2 text-xs text-text-secondary">
          <Checkbox checked={terminalReady} onChange={(checked) => setTerminalReady(checked)} />
          An instructable run is attached (enables Terminal)
        </label>
      </div>
    );
  },
};

/* ── Adaptive layout, shape and console tone ──────────────────────────────
   Each cell is a real width the composer measures for itself: 640 (wide),
   460 (medium — `?` hints, `⋯` formatting) and 320 (narrow — one row, `Aa`
   toggle, compact mode pill). Rows are the page theme × the console tone. */
const WIDTHS = [
  { id: 'wide', className: 'w-[640px]' },
  { id: 'medium', className: 'w-[460px]' },
  { id: 'narrow', className: 'w-[320px]' },
] as const;

function AdaptiveRow({ theme, tone }: { theme: 'light' | 'dark'; tone: 'auto' | 'night' | 'graphite' }) {
  const [mode, setMode] = useState<'chat' | 'agent' | 'terminal'>('agent');
  return (
    <div data-theme={theme} className="grid gap-2 bg-surface p-4">
      <p className="m-0 text-xs font-semibold text-text-secondary">{theme} page · backdropTone="{tone}"</p>
      <div className="flex flex-wrap items-start gap-4">
        {WIDTHS.map((w) => (
          <div key={w.id} className={w.className}>
            <RichChatComposer
              onSend={() => {}}
              mode={mode}
              onModeChange={setMode}
              modeShortcuts
              backdropTone={tone}
              allowEmoji
              allowAttachments
              placeholder="Ask the agent…"
              data-testid={`composer-${theme}-${tone}-${w.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const AdaptiveMatrix: Story = {
  decorators: [(Story) => <div className="p-0"><Story /></div>],
  render: () => (
    <div className="grid gap-0">
      {(['light', 'dark'] as const).flatMap((theme) =>
        (['auto', 'night', 'graphite'] as const).map((tone) => <AdaptiveRow key={`${theme}-${tone}`} theme={theme} tone={tone} />),
      )}
    </div>
  ),
};

/** A host whose design tokens have no radius at all still gets a rounded composer; `radius` / `--composer-radius` override. */
export const RadiusOnASquareHost: Story = {
  render: () => (
    <div className="grid gap-4 [--radius-lg:0px] [--radius-md:0px]">
      <Harness />
      <Harness radius="none" />
      <Harness radius="sm" />
    </div>
  ),
};

/** The input grows with its content to `maxInputHeight`, then scrolls inside itself. */
export const AutoGrowCap: Story = {
  render: () => <Harness maxInputHeight={120} placeholder="Paste a few paragraphs — it stops growing at 120px" />,
};

/**
 * The editor's docked card (2.383.0): `toolbar="compact"` — B, I, link,
 * bulleted list, attach, then the muted `/ commands`; strikethrough, code,
 * numbered list and quote under `?` → Formatting. The chat column keeps the
 * default `full` strip above it for comparison.
 */
export const CompactStrip: Story = {
  render: () => (
    <div className="grid gap-4">
      <Harness modeControl="menu" mode="agent" modeShortcuts onModeChange={() => {}} allowAttachments commands={[{ trigger: '/summarise', label: 'Summarise', description: 'Summarise the page' }]} submitLabel="Run agent →" />
      <Harness modeControl="menu" mode="agent" modeShortcuts onModeChange={() => {}} allowAttachments toolbar="compact" commands={[{ trigger: '/summarise', label: 'Summarise', description: 'Summarise the page' }]} submitLabel="Run agent →" />
    </div>
  ),
};

/**
 * 2.389.0 — a light composer whose context is a menu, not a removable chip:
 * `Agent ▾` at the left, `This guide ▾` at the right of the mode row.
 */
export const ReferenceMenu: Story = {
  render: function ReferenceMenuStory() {
    const [ctx, setCtx] = useState<'guide' | 'guide+sources' | 'none'>('guide');
    const labels = { guide: 'This guide', 'guide+sources': 'This guide + sources', none: 'No context' } as const;
    return (
      <div className="w-[592px]">
        <RichChatComposer
          onSend={() => {}}
          modeControl="menu"
          mode="agent"
          onModeChange={() => {}}
          disabledModes={['chat', 'terminal']}
          toolbar="compact"
          backdropTone="none"
          modePlaceholders={{ agent: 'Describe your project or ask about this guide…' }}
          submitLabel={{ agent: 'Ask' }}
          references={[{
            id: 'guide',
            label: labels[ctx],
            menu: [{ items: (Object.keys(labels) as Array<keyof typeof labels>).map((k) => ({ label: labels[k], active: k === ctx, onSelect: () => setCtx(k) })) }],
          }]}
        />
      </div>
    );
  },
};

/**
 * 2.389.1 — the composer in a box whose width comes from its children: an
 * `auto` grid column and an inline-block. The composer's size class keys off
 * its own width, and in a box like this that width depends on which controls
 * the size class shows — the loop that used to end in "Maximum update depth
 * exceeded". It now settles on one layout.
 */
export const ContentSizedContainer: Story = {
  render: () => (
    <div className="grid gap-6">
      <div className="grid grid-cols-[auto_1fr] gap-3" data-testid="content-sized-grid">
        <RichChatComposer
          onSend={() => {}}
          modeControl="menu"
          mode="agent"
          onModeChange={() => {}}
          disabledModes={['chat', 'terminal']}
          toolbar="compact"
          backdropTone="none"
          modePlaceholders={{ agent: 'Describe your project or ask about this guide…' }}
          submitLabel={{ agent: 'Ask' }}
          data-testid="composer-grid"
        />
        <div className="text-xs text-text-tertiary">auto grid column</div>
      </div>
      <div className="inline-block" data-testid="content-sized-inline">
        <RichChatComposer
          onSend={() => {}}
          placeholder="Describe your project or ask about this guide…"
          data-testid="composer-inline"
        />
      </div>
    </div>
  ),
};
