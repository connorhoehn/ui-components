import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ReactionsBar, type ReactionSummary } from './ReactionsBar';

const meta = {
  title: 'Social/ReactionsBar',
  component: ReactionsBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="min-h-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReactionsBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    reactions: [],
    onReact: () => {},
  },
};

export const Populated: Story = {
  args: {
    reactions: [
      { emoji: '👍', count: 3 },
      { emoji: '❤️', count: 1, mine: true },
      { emoji: '🔥', count: 12 },
    ],
    onReact: () => {},
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [reactions, setReactions] = useState<ReactionSummary[]>([
      { emoji: '👍', count: 2 },
      { emoji: '❤️', count: 1, mine: true },
    ]);
    const onReact = (emoji: string) => {
      setReactions((prev) => {
        const idx = prev.findIndex((r) => r.emoji === emoji);
        if (idx === -1) return [...prev, { emoji, count: 1, mine: true }];
        const next = [...prev];
        const cur = next[idx]!;
        if (cur.mine) {
          if (cur.count <= 1) next.splice(idx, 1);
          else next[idx] = { ...cur, count: cur.count - 1, mine: false };
        } else {
          next[idx] = { ...cur, count: cur.count + 1, mine: true };
        }
        return next;
      });
    };
    return <ReactionsBar {...args} reactions={reactions} onReact={onReact} />;
  },
  args: {
    reactions: [],
    onReact: () => {},
  },
};

export const ReadOnly: Story = {
  args: {
    reactions: [
      { emoji: '👍', count: 3 },
      { emoji: '🔥', count: 12 },
    ],
    onReact: () => {},
    hideAddTrigger: true,
  },
};

export const Disabled: Story = {
  args: {
    reactions: [
      { emoji: '👍', count: 3 },
      { emoji: '❤️', count: 1, mine: true },
    ],
    onReact: () => {},
    disabled: true,
  },
};

export const CustomPickerSet: Story = {
  args: {
    reactions: [{ emoji: '🚀', count: 1 }],
    onReact: () => {},
    pickerEmojis: ['🚀', '🛰️', '🌍', '🌙', '⭐', '☄️', '🌌', '🪐'],
  },
};
