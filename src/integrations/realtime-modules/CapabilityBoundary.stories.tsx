// src/integrations/realtime-modules/CapabilityBoundary.stories.tsx
//
// Shows how CapabilityBoundary gates rendering based on a useCapability()
// hook return from realtime-modules. Three states: enabled, disabled, loading.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { CapabilityBoundary } from './CapabilityBoundary';

const meta = {
  title: 'Integrations/CapabilityBoundary',
  component: CapabilityBoundary,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Conditional render gate driven by a `useCapability()` hook return from realtime-modules. ' +
          'Shows children when `enabled`, fallback when disabled, and an optional loading node while resolving.',
      },
    },
  },
} satisfies Meta<typeof CapabilityBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  args: {
    capability: {
      capability: { name: 'chat', enabled: true },
      enabled: true,
      isLoading: false,
    },
    children: (
      <div className="rounded border border-success bg-success-bg p-4 text-sm text-success-fg">
        Chat feature is <strong>enabled</strong> — this content is rendered.
      </div>
    ),
    fallback: (
      <div className="rounded border border-danger-border bg-danger-bg p-4 text-sm text-danger-fg">
        Fallback — chat disabled.
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    capability: {
      capability: null,
      enabled: false,
      isLoading: false,
    },
    children: (
      <div className="p-4 text-sm">
        Hidden — capability is disabled.
      </div>
    ),
    fallback: (
      <div className="rounded border border-danger-border bg-danger-bg p-4 text-sm text-danger-fg">
        Chat feature is <strong>disabled</strong> — fallback rendered.
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    capability: {
      capability: null,
      enabled: false,
      isLoading: true,
    },
    children: (
      <div className="p-4 text-sm">Hidden during load.</div>
    ),
    fallback: (
      <div className="p-4 text-sm">Won't show during load.</div>
    ),
    loading: (
      <div className="rounded border border-border-emphasis bg-surface-panel p-4 text-sm text-neutral">
        Loading capability...
      </div>
    ),
  },
};

export const LoadingNoSlot: Story = {
  name: 'Loading (no loading slot)',
  args: {
    capability: {
      capability: null,
      enabled: false,
      isLoading: true,
    },
    children: <div className="p-4 text-sm">Hidden.</div>,
    // No loading prop — component renders null while loading.
  },
};
