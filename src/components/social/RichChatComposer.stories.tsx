import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RichChatComposer, type ComposedMessage } from './RichChatComposer';

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
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 640 }}><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof RichChatComposer>;

function Harness(props: Partial<React.ComponentProps<typeof RichChatComposer>>) {
  const [sent, setSent] = useState<ComposedMessage | null>(null);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <RichChatComposer
        allowAttachments
        allowEmoji
        onSend={setSent}
        onSearchPeople={(q) =>
          PEOPLE.filter((p) => p.label.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
        }
        {...props}
      />
      {sent && (
        <div style={{ display: 'grid', gap: 6 }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>last sent</div>
          {/* The HTML is rendered, not printed: that is the only way to see
              whether bold, lists and mention chips actually survived. */}
          <div
            className="ProseMirror"
            style={{ border: '1px solid var(--color-border)', borderRadius: 6, padding: 8, minHeight: 0 }}
            dangerouslySetInnerHTML={{ __html: sent.html || '<em>(no text)</em>' }}
          />
          <pre style={{ fontSize: 11, background: 'var(--color-surface-inset)', padding: 8, borderRadius: 6, margin: 0 }}>
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
