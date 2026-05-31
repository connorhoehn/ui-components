import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import IconPicker from './IconPicker';

const meta = {
  title: 'Shared/IconPicker',
  component: IconPicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof IconPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

function Harness({ initial }: { initial: string }) {
  const [emoji, setEmoji] = useState(initial);
  return (
    <div className="flex flex-col gap-2 items-start">
      <IconPicker value={emoji} onChange={setEmoji} />
      <span className="text-xs text-slate-500">selected: {emoji}</span>
    </div>
  );
}

export const Default: Story = {
  args: { value: '🚀', onChange: () => {} },
  render: () => <Harness initial="🚀" />,
};

export const StartingWithCog: Story = {
  args: { value: '⚙️', onChange: () => {} },
  render: () => <Harness initial="⚙️" />,
};

export const CuratedSubset: Story = {
  args: { value: '🎯', onChange: () => {}, curated: ['🎯', '🔍', '📌', '🏷', '⏱', '🔒'] },
};
