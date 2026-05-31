// src/integrations/realtime-modules/WrappedHangoutLayout.stories.tsx
//
// Demonstrates WrappedHangoutLayout wired to a mocked useVideoHangout()
// hook return from realtime-modules. Shows host/participant/viewer roles
// across grid + spotlight modes, plus an active-speaker hand-off.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { WrappedHangoutLayout } from './WrappedHangoutLayout';
import type {
  RMHangoutParticipant,
  RMHangoutSession,
  RMUseVideoHangoutReturn,
} from './types';

const noop = () => {};
const noopAsync = async () => {};

const session: RMHangoutSession = {
  id: 'session-001',
  type: 'hangout',
  createdAt: new Date().toISOString(),
};

const participants: RMHangoutParticipant[] = [
  {
    clientId: 'client-alice',
    displayName: 'Alice',
    role: 'host',
    videoOn: true,
    audioOn: true,
    joinedAt: new Date(Date.now() - 5 * 60_000).toISOString(),
  },
  {
    clientId: 'client-bob',
    displayName: 'Bob',
    role: 'participant',
    videoOn: true,
    audioOn: false,
    joinedAt: new Date(Date.now() - 3 * 60_000).toISOString(),
  },
  {
    clientId: 'client-carol',
    displayName: 'Carol',
    role: 'participant',
    videoOn: false,
    audioOn: true,
    joinedAt: new Date(Date.now() - 2 * 60_000).toISOString(),
  },
  {
    clientId: 'client-dave',
    displayName: 'Dave',
    role: 'viewer',
    videoOn: false,
    audioOn: false,
    joinedAt: new Date(Date.now() - 1 * 60_000).toISOString(),
  },
];

function makeHangout(
  ps: RMHangoutParticipant[],
): RMUseVideoHangoutReturn {
  return {
    session,
    participants: ps,
    joinToken: 'tok-xyz',
    start: noopAsync,
    join: noopAsync,
    leave: noopAsync,
    end: noopAsync,
    toggleVideo: noop,
    toggleAudio: noop,
  };
}

const meta = {
  title: 'Integrations/WrappedHangoutLayout',
  component: WrappedHangoutLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'HangoutLayout pre-wired to a `useVideoHangout()` hook return from realtime-modules. ' +
          'Splits the `participants` roster into local-vs-remote based on `localClientId`, ' +
          'and lets the caller inject real `<video>` elements through `videoElements`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '24rem', background: '#0f172a' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WrappedHangoutLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  name: 'Auto mode (4 participants)',
  args: {
    hangout: makeHangout(participants),
    localClientId: 'client-alice',
    mode: 'auto',
  },
};

export const Spotlight: Story = {
  name: 'Spotlight mode (active speaker = Bob)',
  args: {
    hangout: makeHangout(participants),
    localClientId: 'client-alice',
    mode: 'spotlight',
    activeSpeakerId: 'client-bob',
  },
};

export const JustLocal: Story = {
  name: 'Just local (no remote participants yet)',
  args: {
    hangout: makeHangout(participants.slice(0, 1)),
    localClientId: 'client-alice',
    mode: 'auto',
  },
};

export const ObserverView: Story = {
  name: 'Observer view (no localClientId)',
  args: {
    hangout: makeHangout(participants),
    localClientId: null,
    mode: 'auto',
  },
};

export const Empty: Story = {
  name: 'Empty (session ended)',
  args: {
    hangout: {
      ...makeHangout([]),
      session: null,
      joinToken: null,
    },
    localClientId: null,
    mode: 'auto',
  },
};
