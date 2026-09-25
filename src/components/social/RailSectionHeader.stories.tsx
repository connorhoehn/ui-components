import type { Meta, StoryObj } from '@storybook/react-vite';
import { RailSectionHeader } from './RailSectionHeader';

const meta: Meta<typeof RailSectionHeader> = {
  title: 'Social/RailSectionHeader',
  component: RailSectionHeader,
  decorators: [
    (Story) => (
      <div className="w-[320px] bg-surface p-2">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof RailSectionHeader>;

export const Plain: Story = {
  args: { label: 'Channels', actions: [{ label: 'Create a channel', onClick: () => {} }] },
};

/** 2.389.0 — a scope label with its size: "GUIDES & FINDINGS  11". */
export const WithCount: Story = {
  args: { label: 'Guides & findings', count: 11 },
};
