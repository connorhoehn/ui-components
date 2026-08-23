import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from './StatusBadge';

const KNOWN_STATUSES = [
  'CONFIRMED',
  'ACTIVE',
  'ENABLED',
  'UNCONFIRMED',
  'PENDING',
  'FORCE_CHANGE_PASSWORD',
  'DISABLED',
  'COMPROMISED',
  'ARCHIVED',
  'UNKNOWN',
];

const meta = {
  title: 'Identity/Shared/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { status: 'CONFIRMED' },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single badge; the tone is derived from the status string. */
export const Default: Story = {};

/**
 * Every status the built-in map recognises, so the tone assignments can be
 * compared side by side.
 */
export const AllKnownStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {KNOWN_STATUSES.map((status) => (
        <StatusBadge key={status} status={status} />
      ))}
    </div>
  ),
};

/** An unmapped status falls through to the neutral tone. */
export const UnmappedStatus: Story = {
  args: { status: 'MIGRATING' },
};

/**
 * `variant` overrides the status→tone lookup — use it when the same word
 * means different things in different contexts.
 */
export const VariantOverride: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="DISABLED" />
      <StatusBadge status="DISABLED" variant="neutral" />
      <StatusBadge status="MIGRATING" variant="info" />
      <StatusBadge status="MIGRATING" variant="warning" />
    </div>
  ),
};
