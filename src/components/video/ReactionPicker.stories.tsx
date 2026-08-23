import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ReactionPicker } from './ReactionOverlay';

const meta = {
  title: 'Video/ReactionPicker',
  component: ReactionPicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ReactionPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default eight-emoji set. */
export const Default: Story = {
  args: { onReact: (emoji) => console.log('reacted', emoji) },
};

/** A trimmed set — pass `emojis` to match your product's reaction vocabulary. */
export const CustomEmojis: Story = {
  args: { onReact: () => {}, emojis: ['👍', '👎', '✋'] },
};

/** Wired up, so you can see what the caller actually receives. */
export const WithLastPick: Story = {
  args: { onReact: () => {} },
  render: () => {
    const [last, setLast] = useState<string | null>(null);
    return (
      <div className="flex flex-col items-center gap-3">
        <ReactionPicker onReact={setLast} />
        <p className="text-xs text-text-secondary">
          {last ? `onReact fired with ${last}` : 'Pick a reaction'}
        </p>
      </div>
    );
  },
};
