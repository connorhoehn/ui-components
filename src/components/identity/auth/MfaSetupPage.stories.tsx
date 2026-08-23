import type { Meta, StoryObj } from '@storybook/react-vite';
import { MfaSetupPage } from './MfaSetupPage';

// A deterministic stand-in for the base64 PNG the identity server returns.
// Named CSS colours only — no hex, per the branding guard.
const fakeQr = (seed: number): string => {
  const cells: string[] = [];
  let state = seed;
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      state = (state * 1103515245 + 12345) % 2147483648;
      if (state % 2 === 0) cells.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
    }
  }
  return (
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" shape-rendering="crispEdges">` +
        `<rect width="21" height="21" fill="white"/><g fill="black">${cells.join('')}</g></svg>`,
    )
  );
};

const BACKUP_CODES = [
  'A3F2-9K1L', 'Q7X4-2M8P', 'ZR51-8T3W', 'B9C6-4V2N',
  'L2H8-7J5D', 'M4K9-1S6R', 'T8N3-5G7Y', 'W6P1-3B9F',
];

// Annotated so `satisfies Meta<…>` widens the default rather than narrowing
// `success` to `true` — otherwise the rejected-verification story won't type.
const verifyOk = (): Promise<{ success: boolean; backupCodes?: string[] }> =>
  Promise.resolve({ success: true, backupCodes: BACKUP_CODES });

const SETUP_RESULT = {
  deviceId: 'dev-8f21ac',
  qrCode: fakeQr(42),
  secret: 'JBSWY3DPEHPK3PXPJBSWY3DPEHPK3PXP',
  backupCodes: BACKUP_CODES,
};

const meta = {
  title: 'Identity/Auth/MfaSetupPage',
  component: MfaSetupPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    userEmail: 'dana@northwind.example',
    onSetup: () => Promise.resolve(SETUP_RESULT),
    onVerify: verifyOk,
    onComplete: () => console.log('setup complete'),
  },
} satisfies Meta<typeof MfaSetupPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The happy path. The page owns its own step state, so walk it: name the
 * device → scan/secret → enter any 6 digits → backup codes.
 */
export const HappyPath: Story = {};

/**
 * Verification always fails, so step 3 stays put and shows the inline error.
 * (The step is internal state — enter 6 digits to reach it.)
 */
export const VerificationRejected: Story = {
  args: {
    onVerify: () => Promise.resolve({ success: false }),
  },
};

/** The enrolment call itself fails, so step 1 never advances. */
export const EnrolmentFails: Story = {
  args: {
    onSetup: () => Promise.reject(new Error('MFA is not enabled for this pool.')),
  },
};

/** Anonymous enrolment — no email subtitle under the heading. */
export const WithoutEmail: Story = {
  args: { userEmail: undefined },
};
