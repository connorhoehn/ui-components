import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ParticipantTile } from './ParticipantTile';

// ParticipantTile is pure presentation: the caller owns the `<video>` element
// and the speaking / mute booleans. These stories use a static placeholder in
// place of a real media element so they render identically in a static build.
const CameraPlaceholder = (
  <div className="w-full h-full grid place-items-center bg-video-tile text-white/50 text-xs font-mono">
    camera feed
  </div>
);

const meta = {
  title: 'Video/ParticipantTile',
  component: ParticipantTile,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-72 bg-video-stage p-2 rounded-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ParticipantTile>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Camera off — the deterministic name-hashed backdrop plus initials, so a
 *  participant is never an empty black square. */
export const AvatarFallback: Story = {
  args: { id: 'alice', displayName: 'Alice Johnson' },
};

/** With a caller-supplied media element in the `videoElement` slot. */
export const WithVideo: Story = {
  args: { id: 'bob', displayName: 'Bob Smith', videoElement: CameraPlaceholder },
};

/** Speaking: green border + corner dot. Tiles deliberately do NOT reflow on
 *  speaker change (Meet/Teams/Zoom convention). */
export const Speaking: Story = {
  args: { id: 'cai', displayName: 'Cai Lund', isSpeaking: true, videoElement: CameraPlaceholder },
};

/** Muted: red mic-slash corner badge plus the inline glyph in the name badge. */
export const Muted: Story = {
  args: { id: 'dee', displayName: 'Dee Okafor', isMuted: true },
};

/** The local user's tile labels itself "You" rather than repeating the name. */
export const Local: Story = {
  args: { id: 'me', displayName: 'Morgan Reyes', isLocal: true, isMuted: true },
};

/** Spotlight emphasis — bigger initials chip and a larger mute badge. */
export const Spotlight: Story = {
  args: { id: 'alice', displayName: 'Alice Johnson', isSpotlight: true, isMuted: true },
};

/** Clickable tiles (pin / promote-to-spotlight) get a pointer cursor plus a
 *  hover border, and become keyboard-activatable. */
export const Clickable: Story = {
  args: { id: 'alice', displayName: 'Alice Johnson' },
  render: (args) => {
    const [pinned, setPinned] = useState(false);
    return (
      <ParticipantTile
        {...args}
        isSpeaking={pinned}
        onClick={() => setPinned((v) => !v)}
        displayName={pinned ? 'Alice Johnson (pinned)' : 'Alice Johnson'}
      />
    );
  },
};

/** View only: the host stopped this person publishing. An eye in the name
 *  chip, named "View only" for screen readers. */
export const ViewOnly: Story = {
  args: { id: 'dee', displayName: 'Dee Okafor', access: 'view-only', isMuted: true },
};
