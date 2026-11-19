import type { Meta, StoryObj } from '@storybook/react';
import { HoldToTalkButton } from './HoldToTalkButton';

/** Press and hold to talk, tap to latch, Esc to cancel. */
const meta: Meta<typeof HoldToTalkButton> = {
  title: 'Video/HoldToTalkButton',
  component: HoldToTalkButton,
  args: { spaceToTalk: false },
};
export default meta;

type Story = StoryObj<typeof HoldToTalkButton>;

export const Idle: Story = {};
export const SpaceToTalk: Story = { args: { spaceToTalk: true } };
export const Large: Story = { args: { size: 'lg' } };
/** Someone else holds the floor. */
export const Busy: Story = { args: { busy: { label: 'Mateo is talking' } } };
export const Disabled: Story = { args: { disabled: true } };
