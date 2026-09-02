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
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <RichChatComposer
        onSend={setSent}
        onSearchPeople={(q) =>
          PEOPLE.filter((p) => p.label.toLowerCase().includes(q.toLowerCase())).slice(0, 5)
        }
        {...props}
        onSendFiles={props.onSendFiles === null ? undefined : (f) => setFiles(f.map((x) => x.name))}
      />
      {sent && (
        <pre style={{ fontSize: 12, background: 'var(--color-surface-inset)', padding: 8, borderRadius: 6 }}>
          {JSON.stringify({ text: sent.text, mentions: sent.mentions.map((m) => m.label) }, null, 1)}
        </pre>
      )}
      {files.length > 0 && <div style={{ fontSize: 12 }}>attached: {files.join(', ')}</div>}
    </div>
  );
}

export const Default: Story = {
  name: 'Formatting, mentions and attachments',
  render: () => <Harness />,
};

/** No file capability: the paperclip and the drop overlay are absent, not greyed. */
export const ChatOnly: Story = {
  render: () => <Harness onSendFiles={null as never} />,
};

/** No directory wired: typing "@" is just an @ character. */
export const WithoutMentions: Story = {
  render: () => <Harness onSearchPeople={undefined} />,
};
