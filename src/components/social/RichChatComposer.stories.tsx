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
