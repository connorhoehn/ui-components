import type { Meta, StoryObj } from '@storybook/react-vite';
import { TenantSwitcher } from './TenantSwitcher';

const meta = {
  title: 'Shared/TenantSwitcher',
  component: TenantSwitcher,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    label: 'Work',
    healthy: true,
    live: true,
    destinations: [
      { id: 'assessment', label: 'Assessment', unread: 2 },
      { id: 'social', label: 'Social' },
    ],
    onSelect: () => new Promise((resolve) => setTimeout(resolve, 600)),
  },
} satisfies Meta<typeof TenantSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover (after a beat) or click the brand to open the switcher. */
export const Default: Story = {};

/** Live updates unavailable: each activity hint says so. */
export const Offline: Story = { args: { live: false, healthy: false } };

/** A huddle in progress blocks every switch and says why. */
export const Blocked: Story = { args: { blockedReason: 'Finish your huddle before switching workspaces.' } };

/** No other workspace granted. */
export const Empty: Story = { args: { destinations: [] } };

/** The host refuses the switch; the panel shows why and stays usable. */
export const Refused: Story = {
  args: { onSelect: () => Promise.reject(new Error('This tenant is no longer available.')) },
};

/** Ambient motion off: the moon is drawn but still. */
export const Still: Story = { args: { motion: false } };

export const Projects: Story = { args: { label: 'Spike Cartoon', triggerLabel: 'Switch project', dialogLabel: 'Projects', showActivity: false, motion: false, healthy: false, destinations: [{id:'demo',label:'Workshop demo'}] } };
