import type { Meta, StoryObj } from '@storybook/react-vite';
import { CallingStatusPill } from './CallingStatusPill';

// Shown above a HangoutLayout while a targeted call is ringing and no callee
// has joined. The parent owns the ringing semantics via `show`.

const meta = {
  title: 'Video/CallingStatusPill',
  component: CallingStatusPill,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="relative w-[420px] h-[200px] rounded-lg bg-video-stage grid place-items-center">
        <span className="text-white/25 text-xs font-mono">call stage</span>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CallingStatusPill>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A 1:1 call. */
export const SingleCallee: Story = {
  args: { show: true, label: 'Alice' },
};

/** The label is free text, so the caller decides how to phrase a group ring. */
export const TwoCallees: Story = {
  args: { show: true, label: 'Alice & Bob' },
};

/** Beyond a couple of names, a count reads better than a list. */
export const ManyCallees: Story = {
  args: { show: true, label: '5 people' },
};

/** An empty label degrades to "Calling user…" rather than "Calling …". */
export const MissingLabel: Story = {
  args: { show: true, label: '' },
};

/** `show: false` renders nothing. */
export const Hidden: Story = {
  args: { show: false, label: 'Alice' },
};
