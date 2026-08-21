import type { Meta, StoryObj } from '@storybook/react-vite';
import { MessageBubble } from './MessageBubble';

const meta = {
  title: 'Shared/MessageBubble',
  component: MessageBubble,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Conversation: Story = {
  args: { role: 'user', content: '' },
  render: () => (
    <div className="max-w-lg">
      <MessageBubble role="user" content="Why did the nightly run fail?" />
      <MessageBubble
        role="assistant"
        agentName="Ops Agent"
        content="Step 3 (transform) threw a schema mismatch — the source added a new column."
        toolCalls={[
          { id: '1', name: 'get_run', done: true },
          { id: '2', name: 'read_logs', done: true },
        ]}
      />
    </div>
  ),
};

export const Streaming: Story = {
  args: { role: 'assistant', content: '', streaming: true },
};
