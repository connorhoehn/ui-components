import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import FollowModeBar from './FollowModeBar';
import { Button } from '../ui/Button';
import type { Participant } from '../../types/document';

// The editor's follow bar. `appearance="bar"` + `location` (2.391.0) is the
// in-call look: "**Following Alice** · Session flow" … "Stop following".

const participants = [{ clientId: 'c-alice', userId: 'dev-alice', displayName: 'Alice' }] as unknown as Participant[];

const meta = {
  title: 'Doc editor/FollowModeBar',
  component: FollowModeBar,
  parameters: { layout: 'padded' },
  args: { followingUserId: 'dev-alice', participants, onStopFollow: () => {} },
  decorators: [(S) => <div className="w-[820px]"><S /></div>],
} satisfies Meta<typeof FollowModeBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Banner: Story = {};
export const InCallBar: Story = { args: { appearance: 'bar', location: 'Session flow' } };
export const InCallBarDark: Story = {
  args: { appearance: 'bar', location: 'Session flow' },
  decorators: [(S) => <div data-theme="dark" className="w-[820px] bg-surface p-4"><S /></div>],
};

// ── autoStopScope (2.393.0) ─────────────────────────────────────────────────


function ScopedScene() {
  const editor = useRef<HTMLDivElement | null>(null);
  const [following, setFollowing] = useState<string | null>('dev-alice');
  const [clicks, setClicks] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <FollowModeBar
        followingUserId={following}
        participants={participants}
        onStopFollow={() => setFollowing(null)}
        appearance="bar"
        location="Session flow"
        autoStopScope={editor}
      />
      {!following && (
        <Button variant="ghost" size="sm" onClick={() => setFollowing('dev-alice')} className="self-start">
          Follow Alice again
        </Button>
      )}
      <div
        ref={editor}
        tabIndex={0}
        data-testid="scoped-editor"
        className="h-40 overflow-y-auto rounded-md border border-border bg-surface p-4 text-sm text-text-secondary"
      >
        The editor (the scope). Scroll or type in here and following stops.
        <div className="h-64" />
      </div>
      <div className="flex items-center gap-3 rounded-md border border-border bg-surface-panel p-3 text-sm text-text-secondary">
        A call dock outside the scope —
        <Button size="sm" variant="ghost" onClick={() => setClicks((n) => n + 1)} data-testid="outside-click">
          Click me ({clicks})
        </Button>
        the bar stays.
      </div>
    </div>
  );
}

/** Clicks outside the editor (the dock here) keep following; scrolling or typing in the editor stops it. */
export const ScopedAutoStop: Story = { render: () => <ScopedScene /> };
export const ScopedAutoStopDark: Story = {
  render: () => (
    <div data-theme="dark" className="w-[820px] bg-surface p-4">
      <ScopedScene />
    </div>
  ),
};
