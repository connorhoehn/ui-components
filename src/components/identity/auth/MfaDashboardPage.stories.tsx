import type { Meta, StoryObj } from '@storybook/react-vite';
import { MfaDashboardPage, type MfaDevice } from './MfaDashboardPage';

const DEVICES: MfaDevice[] = [
  {
    deviceId: 'dev-8f21ac',
    deviceName: 'Pixel 8 — Authenticator',
    deviceType: 'TOTP',
    isVerified: true,
    createdAt: '2026-03-14T09:12:00Z',
    lastUsed: '2026-08-19T07:44:00Z',
  },
  {
    deviceId: 'dev-3b7e10',
    deviceName: 'YubiKey 5C',
    deviceType: 'WEBAUTHN',
    isVerified: true,
    createdAt: '2026-01-06T15:30:00Z',
  },
  {
    deviceId: 'dev-c04d99',
    deviceName: 'Work laptop (pending)',
    deviceType: 'TOTP',
    isVerified: false,
    createdAt: '2026-08-20T11:02:00Z',
  },
];

const meta = {
  title: 'Identity/Auth/MfaDashboardPage',
  component: MfaDashboardPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    devices: DEVICES,
    userEmail: 'dana@northwind.example',
    mfaEnabled: true,
    onAddDevice: () => console.log('add device'),
    onRenameDevice: () => Promise.resolve(),
    onRemoveDevice: () => Promise.resolve(),
  },
} satisfies Meta<typeof MfaDashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Verified and unverified devices side by side — `StatusBadge` maps the
 * boolean onto CONFIRMED / UNCONFIRMED. "Remove" opens a ConfirmDialog.
 */
export const WithDevices: Story = {};

/** No devices enrolled: the EmptyState carries the primary call to action. */
export const NoDevices: Story = {
  args: { devices: [], mfaEnabled: false },
};

/**
 * Enforcement is off at the pool level even though a device exists — the
 * header chip and the device list disagree on purpose.
 */
export const EnforcementDisabled: Story = {
  args: { devices: [DEVICES[0]], mfaEnabled: false },
};

/** Fetch in flight — the list area is replaced by a loading line. */
export const Loading: Story = {
  args: { devices: [], loading: true },
};
