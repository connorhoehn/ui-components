// src/integrations/realtime-modules/NetworkErrorBoundary.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { NetworkErrorBoundary } from './NetworkErrorBoundary';

function Boom({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('useChat() lost gateway: code=GATEWAY_DISCONNECT');
  return (
    <div className="rounded border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
      Hook is healthy ✓
    </div>
  );
}

function ToggleHarness() {
  const [shouldThrow, setShouldThrow] = useState(true);
  return (
    <NetworkErrorBoundary onRetry={() => setShouldThrow(false)}>
      <Boom shouldThrow={shouldThrow} />
    </NetworkErrorBoundary>
  );
}

const meta = {
  title: 'Integrations/NetworkErrorBoundary',
  component: NetworkErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Error boundary specialised for real-time hook surfaces. Catches ' +
          'errors thrown during render (schema mismatch, gateway disconnect, ' +
          'adapter type errors) and renders a recoverable card with retry. ' +
          'Pair with `ReconnectingShim` for the lifecycle-state coverage.',
      },
    },
  },
} satisfies Meta<typeof NetworkErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Healthy: Story = {
  name: 'Healthy (no throw)',
  args: {
    children: <Boom shouldThrow={false} />,
  },
};

export const CaughtError: Story = {
  name: 'Caught error (default fallback)',
  args: {
    children: <Boom shouldThrow />,
  },
};

export const CustomFallback: Story = {
  args: {
    children: <Boom shouldThrow />,
    fallback: (err, reset) => (
      <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-800">
        <div className="mb-2 font-semibold">Inline error: {err.message}</div>
        <button
          type="button"
          onClick={reset}
          className="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white"
        >
          Reset
        </button>
      </div>
    ),
  },
};

export const RetryClearsError: Story = {
  name: 'Retry clears the error',
  args: {
    children: null,
  },
  render: () => <ToggleHarness />,
};
