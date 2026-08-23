import type { Meta, StoryObj } from '@storybook/react-vite';
import { MuteWhileTalkingToast } from './MuteWhileTalkingToast';

// Pairs with the `useMuteWhileTalking` hook (also exported from …/video),
// which flips `show` once the local user has been speaking for >1.5s while
// muted. This component is the passive nag itself.

const meta = {
  title: 'Video/MuteWhileTalkingToast',
  component: MuteWhileTalkingToast,
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
} satisfies Meta<typeof MuteWhileTalkingToast>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default nag. `role="alert"` and `pointer-events-none`: it announces
 *  itself to screen readers but never intercepts a click on the mic button
 *  it is telling you to press. */
export const Nagging: Story = {
  args: { show: true },
};

/** Custom copy — e.g. naming the keyboard shortcut instead of the button. */
export const CustomLabel: Story = {
  args: { show: true, label: "You're muted — hold Space to talk" },
};

/** `show: false` renders nothing. */
export const Hidden: Story = {
  args: { show: false },
};
