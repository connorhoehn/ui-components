// src/integrations/realtime-modules/WrappedReactionsOverlay.stories.tsx
//
// Demonstrates WrappedReactionsOverlay wired to a mocked useReactions()
// hook return from realtime-modules. Shows idle + a single drift +
// rapid-fire bursts via a story-local "react" button.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { WrappedReactionsOverlay } from './WrappedReactionsOverlay';
import type { RMReaction, RMUseReactionsReturn } from './types';

const noop = () => {};

const baseReactions: RMUseReactionsReturn = {
  reactions: [],
  react: noop,
};

const seededReactions: RMReaction[] = [
  {
    id: 'r1',
    clientId: 'client-alice',
    channel: 'general',
    emoji: '👍',
    effect: 'drift-up',
    position: { x: 0.3, y: 0.6 },
    metadata: {},
    timestamp: new Date().toISOString(),
  },
];

const meta = {
  title: 'Integrations/WrappedReactionsOverlay',
  component: WrappedReactionsOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'ReactionsOverlay pre-wired to a `useReactions()` hook return from realtime-modules. ' +
          'Adapts the incoming `RMReaction` stream into the ephemeral `EphemeralReaction` ' +
          'shape expected by `<ReactionsOverlay>`, auto-expiring each one after `ttlMs`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          height: '24rem',
          background: '#f1f5f9',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WrappedReactionsOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  name: 'Idle (no reactions)',
  args: {
    reactions: baseReactions,
  },
};

export const SingleDrift: Story = {
  name: 'Single drift (one seeded reaction)',
  args: {
    reactions: { ...baseReactions, reactions: seededReactions },
    ttlMs: 2500,
  },
};

export const RapidFire: Story = {
  name: 'Rapid-fire (live append button)',
  args: {
    reactions: baseReactions,
  },
  render: () => {
    const [items, setItems] = useState<RMReaction[]>([]);
    const fire = useCallback((emoji: string) => {
      setItems((prev) => [
        ...prev,
        {
          id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          clientId: 'client-local',
          channel: 'general',
          emoji,
          effect: 'drift-up',
          position: { x: 0.2 + Math.random() * 0.6, y: 0.7 + Math.random() * 0.2 },
          metadata: {},
          timestamp: new Date().toISOString(),
        },
      ]);
    }, []);

    return (
      <>
        <WrappedReactionsOverlay
          reactions={{ reactions: items, react: noop }}
          ttlMs={1800}
        />
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'flex',
            gap: 8,
          }}
        >
          {['👍', '❤️', '🔥', '🎉', '😂'].map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => fire(emoji)}
              style={{
                fontSize: 20,
                padding: '4px 8px',
                borderRadius: 6,
                border: '1px solid #cbd5e1',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      </>
    );
  },
};
