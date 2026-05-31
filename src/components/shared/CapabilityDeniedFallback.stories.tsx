// src/components/shared/CapabilityDeniedFallback.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { CapabilityDeniedFallback } from './CapabilityDeniedFallback';

const meta = {
  title: 'Shared/CapabilityDeniedFallback',
  component: CapabilityDeniedFallback,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Opinionated empty-state for the "capability disabled" case. Drop in as the ' +
          '`fallback` slot of `<CapabilityBoundary>` or render standalone when a feature ' +
          'is gated.',
      },
    },
  },
} satisfies Meta<typeof CapabilityDeniedFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    capabilityName: 'Chat',
  },
};

export const WithSingleAction: Story = {
  args: {
    capabilityName: 'Recording',
    actionLabel: 'Request access',
    onAction: () => alert('Request submitted'),
  },
};

export const WithMultipleActions: Story = {
  args: {
    capabilityName: 'AI Assistant',
    actions: [
      { label: 'Upgrade plan', href: '#', variant: 'primary' },
      { label: 'Read docs', href: '#', variant: 'secondary' },
    ],
  },
};

export const CustomCopy: Story = {
  args: {
    title: 'Pipelines disabled',
    description:
      'Your workspace is on the Starter plan. Upgrade to Team to enable Pipelines.',
    actionLabel: 'See plans',
    onAction: () => {},
  },
};

export const NoIcon: Story = {
  args: {
    capabilityName: 'Recording',
    icon: null,
  },
};
