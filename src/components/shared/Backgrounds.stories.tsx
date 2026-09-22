import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ParticlesBackground } from './ParticlesBackground';
import { ACTIVITY_RIPPLE_GRID, RippleGridBackground } from './RippleGridBackground';
import { Tabs } from './Tabs';

/**
 * The two WebGL backdrops, knocked off from ReactBits and ported onto raw
 * WebGL. Both need a real GPU to show anything — in a headless snapshot the
 * particle field falls through to its CSS twin and the ripple grid renders
 * nothing at all, which is the intended behaviour and not a broken story.
 */
const meta = {
  title: 'Shared/Backgrounds',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The defaults: a couple of hundred white points over the near-black gradient. */
export const Particles: Story = {
  render: () => (
    <ParticlesBackground active className="flex h-96 items-center justify-center">
      <p className="text-sm text-code-text">Two hundred points, drifting.</p>
    </ParticlesBackground>
  ),
};

/** What an agent shell wears mid-turn: indigo-tinted, soft-edged, pointer-aware. */
export const WorkingSurface: Story = {
  render: () => (
    <ParticlesBackground
      active
      particleCount={260}
      speed={0.16}
      alphaParticles
      moveParticlesOnHover
      particleHoverFactor={0.6}
      particleColors={['#ffffff', '#c7d2fe', '#a5b4fc']}
      className="flex h-96 flex-col justify-end gap-1 p-4 font-mono text-[11px] text-code-subtle"
    >
      <p>▶ npm test — 214 passed</p>
      <p>▶ writing notes.md</p>
      <p className="text-code-green">▌</p>
    </ParticlesBackground>
  ),
};

/** The activity-canvas preset: grey lines on near-white, subtle enough to put nodes on. */
export const ActivityGrid: Story = {
  render: () => (
    <div className="relative isolate h-96 bg-surface">
      <RippleGridBackground {...ACTIVITY_RIPPLE_GRID} className="absolute inset-0 -z-10" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface px-4 py-3 text-sm shadow-sm">
        A node, on the grid
      </div>
    </div>
  ),
};

/** ReactBits' own default: glowing white lines on a dark ground. */
export const RippleGridDark: Story = {
  render: () => (
    <div className="h-96 bg-code-bg">
      <RippleGridBackground className="h-full w-full" />
    </div>
  ),
};

/** The switch itself — flip to Agent and the surface answers. */
export const ConsoleSwitch: Story = {
  render: function ConsoleSwitchStory() {
    const [mode, setMode] = useState('chat');
    const console_ = mode !== 'chat';
    return (
      <div
        {...(console_ ? { 'data-theme': 'dark' } : {})}
        className={`flex h-96 flex-col transition-colors duration-300 ${console_ ? 'uic-chat-console' : ''}`}
      >
        <ParticlesBackground
          active={console_}
          particleCount={170}
          speed={0.07}
          alphaParticles
          particleColors={['#ffffff', '#c7d2fe', '#a5b4fc']}
          className="flex flex-1 flex-col justify-between bg-surface p-4"
        >
          <p className="text-sm text-text-primary">The column keeps its layout; only the ground changes.</p>
          <Tabs
            items={[{ id: 'chat', label: 'Chat' }, { id: 'agent', label: 'Agent' }, { id: 'terminal', label: 'Terminal' }]}
            value={mode}
            onValueChange={setMode}
            variant="segmented"
            size="sm"
            aria-label="Composer mode"
          />
        </ParticlesBackground>
      </div>
    );
  },
};
