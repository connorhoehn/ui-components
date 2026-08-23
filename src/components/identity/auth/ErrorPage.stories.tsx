import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorPage } from './ErrorPage';

const meta = {
  title: 'Identity/Auth/ErrorPage',
  component: ErrorPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    message: 'We could not complete your sign-in. Please try again.',
  },
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Message only — no actions, so the button row is omitted entirely. */
export const Default: Story = {};

/** The OIDC error code is shown verbatim in a monospace block for support. */
export const WithErrorCode: Story = {
  args: {
    title: 'Authorization failed',
    message: 'The authorization request could not be processed.',
    error: 'invalid_request: redirect_uri did not match a registered value',
  },
};

/** Both recovery paths offered. */
export const Recoverable: Story = {
  args: {
    title: 'Session expired',
    message: 'Your sign-in session timed out before it could complete.',
    error: 'interaction_expired',
    onRetry: () => console.log('retry'),
    onBack: () => console.log('back'),
  },
};

/** A terminal error where retrying cannot help — only "Go Back" is offered. */
export const AccessDenied: Story = {
  args: {
    title: 'Access denied',
    message:
      'Your account is not permitted to use this application. Ask an administrator to grant access.',
    error: 'access_denied',
    onBack: () => console.log('back'),
  },
};
