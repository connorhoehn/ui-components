import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { ReactionOverlay, ReactionPicker, ReactionPickerButton, type Reaction } from './ReactionOverlay';

// ReactionOverlay animates the LAST item of `reactions` whenever that array
// changes, then garbage-collects each floater after 3s. A static snapshot is
// therefore always empty — the honest way to story it is to drive it.

const meta = {
  title: 'Video/ReactionOverlay',
  component: ReactionOverlay,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ReactionOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[420px] h-[260px] rounded-lg bg-video-stage overflow-hidden grid place-items-center">
      <span className="text-white/25 text-xs font-mono">call stage</span>
      {children}
    </div>
  );
}

/** The real pairing: a ReactionPicker feeding the overlay. Click an emoji and
 *  it floats up from a random horizontal offset, fading out over 3s. */
export const Interactive: Story = {
  args: { reactions: [] },
  render: () => {
    const [reactions, setReactions] = useState<Reaction[]>([]);
    return (
      <div className="flex flex-col items-center gap-3">
        <Stage>
          <ReactionOverlay reactions={reactions} />
        </Stage>
        <ReactionPicker
          onReact={(emoji) =>
            setReactions((prev) => [
              ...prev,
              { id: `${emoji}-${prev.length}`, emoji, displayName: 'Morgan Reyes' },
            ])
          }
        />
      </div>
    );
  },
};

/** A burst driven programmatically, the way an incoming websocket feed would:
 *  each push animates exactly one floater, so rapid pushes stack up. */
export const IncomingBurst: Story = {
  args: { reactions: [] },
  render: () => {
    const [reactions, setReactions] = useState<Reaction[]>([]);
    const emojis = ['👍', '🎉', '🔥', '❤️', '😂'];
    return (
      <div className="flex flex-col items-center gap-3">
        <Stage>
          <ReactionOverlay reactions={reactions} />
        </Stage>
        <button
          type="button"
          className="px-3 py-1.5 rounded-md text-xs font-medium bg-surface-panel border border-border text-text-primary"
          onClick={() => {
            emojis.forEach((emoji, i) => {
              setTimeout(
                () =>
                  setReactions((prev) => [
                    ...prev,
                    { id: `${emoji}-${Date.now()}-${i}`, emoji },
                  ]),
                i * 220,
              );
            });
          }}
        >
          Simulate a 5-reaction burst
        </button>
      </div>
    );
  },
};

/** Steady state with no traffic: the overlay is an inert, pointer-events-none
 *  layer, so the stage underneath stays fully interactive. */
export const Idle: Story = {
  args: { reactions: [] },
  render: (args) => (
    <Stage>
      <ReactionOverlay {...args} />
    </Stage>
  ),
};

/** ReactionPickerButton — the compact control-bar trigger. It sits in a dark
 *  control row (like CallControls' 36px round buttons) and opens the emoji
 *  row as an absolute popover above itself: never position:fixed, so it
 *  stays anchored inside CallWidget's transformed root. */
export const ControlBarTrigger: Story = {
  args: { reactions: [] },
  render: () => {
    const [reactions, setReactions] = useState<Reaction[]>([]);
    return (
      <Stage>
        <ReactionOverlay reactions={reactions} />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-surface-inverse/90 border border-white/10">
          <ReactionPickerButton
            onReact={(emoji) =>
              setReactions((prev) => [
                ...prev,
                { id: `${emoji}-${Date.now()}`, emoji },
              ])
            }
          />
        </div>
      </Stage>
    );
  },
};
