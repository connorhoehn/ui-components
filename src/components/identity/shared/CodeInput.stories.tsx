import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeInput } from './CodeInput';

const meta = {
  title: 'Identity/Shared/CodeInput',
  component: CodeInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    onComplete: (code: string) => console.log('complete', code),
  },
} satisfies Meta<typeof CodeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Six digits, the TOTP default. Typing auto-advances, Backspace walks back,
 * and pasting a full code fills every box and fires `onComplete`.
 */
export const Default: Story = {};

/** Error state: every box takes the danger border and the message gets `role="alert"`. */
export const WithError: Story = {
  args: { error: 'That code is not valid.' },
};

/** Disabled while a verification request is in flight. */
export const Disabled: Story = {
  args: { disabled: true },
};

/** A shorter code — `length` drives both the box count and the aria labels. */
export const FourDigit: Story = {
  args: { length: 4 },
};
