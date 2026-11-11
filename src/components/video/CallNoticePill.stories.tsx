import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../ui/Button';
import { CallNoticePill } from './CallNoticePill';

// The pill sits along the top edge of a call stage; these stories give it a
// stand-in stage of a fixed width so the wrap and the cut are what a call
// widget shows.

const meta = {
  title: 'Video/CallNoticePill',
  component: CallNoticePill,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { show: true, tone: 'warning', message: 'Reconnecting…' },
  decorators: [
    (Story) => (
      <div className="relative h-40 w-[640px] max-w-full overflow-hidden rounded-lg bg-video-stage" data-testid="notice-stage">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CallNoticePill>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A short notice: one line, hugging its text. */
export const Short: Story = {};

/** A host's reason that runs past one line wraps to a second (the default `maxLines` 2). */
export const LongReasonWraps: Story = {
  args: { message: 'The host made you view-only: Too much background noise from the construction next door' },
};

/** Past two lines it ends with an ellipsis; hover or Tab to the message for the full text. */
export const LongerThanTwoLines: Story = {
  args: {
    message:
      'The host made you view-only: Too much background noise from the construction next door, so please stay muted until the drilling stops and then ask the host to let you back on',
  },
  decorators: [(Story) => <div className="relative h-40 w-[360px]"><Story /></div>],
};

/** With an action on the same line. */
export const WithAction: Story = {
  args: {
    tone: 'info',
    message: 'The host let you turn your camera and mic back on',
    actions: <Button variant="primary" size="sm">Turn on camera and mic</Button>,
  },
};

/** `maxLines={1}`: the single truncating line, the full text still on hover and focus. */
export const SingleLine: Story = {
  args: { maxLines: 1, message: 'The host made you view-only: Too much background noise from the construction next door' },
  decorators: [(Story) => <div className="relative h-40 w-[360px]"><Story /></div>],
};
