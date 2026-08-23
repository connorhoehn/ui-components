import type { Meta, StoryObj } from '@storybook/react-vite';
import { QrCodeDisplay } from './QrCodeDisplay';

// Stand-in for the base64 data URL the identity server's MFA setup endpoint
// returns. Named CSS colours only — no hex, per the branding guard.
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

const meta = {
  title: 'Identity/Shared/QrCodeDisplay',
  component: QrCodeDisplay,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { value: fakeQr(7) },
} satisfies Meta<typeof QrCodeDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No label: the image falls back to `alt="QR Code"` and no caption renders. */
export const Default: Story = {};

/** With a caption — the same string is also the image's alt text. */
export const Labelled: Story = {
  args: { label: 'Device: Pixel 8 — Authenticator' },
};

/** Compact, for a side panel rather than a full enrolment page. */
export const Small: Story = {
  args: { size: 120, label: 'Scan to enrol' },
};

/** Oversized, for print or a projected setup walkthrough. */
export const Large: Story = {
  args: { size: 320, label: 'northwind.example — TOTP' },
};
