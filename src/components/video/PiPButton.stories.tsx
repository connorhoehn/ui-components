import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';
import { PiPButton } from './PiPButton';

// The button's enabled/disabled state is derived from
// `document.pictureInPictureEnabled`, so it is browser-determined rather than
// prop-driven: in Chrome these render enabled, in Firefox disabled. Clicking
// requires a real <video> with frames, which Storybook has none of — the
// stories document the chrome and the getVideoElement contract.

const meta = {
  title: 'Video/PiPButton',
  component: PiPButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="p-3 rounded-lg bg-video-stage">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PiPButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default chrome. `getVideoElement` is a callback rather than a ref so the
 *  caller can resolve the *currently spotlit* video at click time. */
export const Default: Story = {
  args: { getVideoElement: () => null },
};

/** With an explicit `title` override, replacing the state-derived tooltip. */
export const CustomTitle: Story = {
  args: { getVideoElement: () => null, title: 'Pop the speaker out' },
};

/** Realistic wiring: the button sits in a player's control row and reaches
 *  into that player's `<video>` through a ref. */
export const InPlayerControls: Story = {
  args: { getVideoElement: () => null },
  render: () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    return (
      <div className="relative w-[420px] aspect-video rounded-lg overflow-hidden bg-video-stage">
        <video ref={videoRef} playsInline muted className="w-full h-full object-contain" />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <PiPButton getVideoElement={() => videoRef.current} />
        </div>
      </div>
    );
  },
};
