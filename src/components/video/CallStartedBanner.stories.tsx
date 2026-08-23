import type { Meta, StoryObj } from '@storybook/react-vite';
import { CallStartedBanner } from './CallStartedBanner';

// The banner self-hides after `autoExpireSec`. Stories pass 0 to disable the
// timer, otherwise they would vanish while you are reading them.

const meta = {
  title: 'Video/CallStartedBanner',
  component: CallStartedBanner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-96 max-w-full">
        <Story />
      </div>
    ),
  ],
  args: { autoExpireSec: 0 },
} satisfies Meta<typeof CallStartedBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Broadcast framing — use for ambient hangouts where several people are
 *  invited at once. */
export const Started: Story = {
  args: {
    callerName: 'Alice Johnson',
    context: 'in #product-design',
    onJoin: () => console.log('join'),
    onDismiss: () => console.log('dismiss'),
  },
};

/** Direct framing — use when the recipient is specifically the callee. */
export const Calling: Story = {
  args: {
    callerName: 'Bob Smith',
    mode: 'calling',
    onJoin: () => console.log('join'),
    onDismiss: () => console.log('dismiss'),
  },
};

/** Without `context` the banner is a single line. */
export const NoContext: Story = {
  args: { callerName: 'Cai Lund', onJoin: () => {}, onDismiss: () => {} },
};

/** Join-only: omitting `onDismiss` removes the dismiss action, so the banner
 *  can only be resolved by joining (or by the auto-expire timer). */
export const JoinOnly: Story = {
  args: { callerName: 'Dee Okafor', context: 'in this document', onJoin: () => {} },
};

/** Long names truncate rather than wrapping the action buttons off the edge. */
export const LongName: Story = {
  args: {
    callerName: 'Bartholomew Featherstonehaugh-Vandermeer',
    context: 'in #engineering-all-hands-quarterly-sync',
    onJoin: () => {},
    onDismiss: () => {},
  },
};

/** With the real 30s auto-expire behaviour — the banner disappears on its own.
 *  Reload the story to see it again. */
export const AutoExpiring: Story = {
  args: {
    callerName: 'Eli Marsh',
    autoExpireSec: 30,
    onJoin: () => {},
    onDismiss: () => console.log('expired or dismissed'),
  },
};
