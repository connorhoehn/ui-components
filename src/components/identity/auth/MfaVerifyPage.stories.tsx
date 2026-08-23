import type { Meta, StoryObj } from '@storybook/react-vite';
import { MfaVerifyPage } from './MfaVerifyPage';

const meta = {
  title: 'Identity/Auth/MfaVerifyPage',
  component: MfaVerifyPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    onVerify: () => Promise.resolve(),
    onVerifyBackup: () => Promise.resolve(),
  },
} satisfies Meta<typeof MfaVerifyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The TOTP challenge — where the page lands when `defaultMode` is omitted.
 * "Use a backup code instead" flips to the backup form.
 */
export const Default: Story = {};

/**
 * The backup-code form, opened directly via `defaultMode` — what a host
 * renders for a user who has already told it they lost their authenticator.
 * The prop is initial-only, so the "use authenticator code instead" link
 * still flips back.
 */
export const BackupCodeMode: Story = {
  args: { defaultMode: 'backup' },
};

/** The backup form carrying a server error from a previous attempt. */
export const BackupCodeModeWithError: Story = {
  args: {
    defaultMode: 'backup',
    error: 'That backup code has already been used.',
  },
};

/** A server-supplied error, e.g. after a failed POST round-trip. */
export const WithServerError: Story = {
  args: { error: 'That code has expired. Try the next one.' },
};

/**
 * Both verifiers reject, so entering a code surfaces the thrown message as
 * the page's local error.
 */
export const RejectsCode: Story = {
  args: {
    onVerify: () => Promise.reject(new Error('Invalid code. 2 attempts remaining.')),
    onVerifyBackup: () =>
      Promise.reject(new Error('That backup code has already been used.')),
  },
};
