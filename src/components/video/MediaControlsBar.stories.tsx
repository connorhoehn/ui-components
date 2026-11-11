import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import MediaControlsBar from './MediaControlsBar';
import CircularIconToggle from './CircularIconToggle';
import { MoreHorizontalIcon, UserPlusIcon } from './MediaIcons';

// The leave-call affordance lives HERE by contract — not on the room header
// and not on the wrapped hangout layout — so consumers never re-implement the
// red round button.

const meta = {
  title: 'Video/MediaControlsBar',
  component: MediaControlsBar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-xl bg-surface-panel border border-border">
        <Story />
      </div>
    ),
  ],
  args: {
    onToggleAudio: () => {},
    onToggleVideo: () => {},
    onLeave: () => {},
  },
} satisfies Meta<typeof MediaControlsBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Mic and camera both live. Screen-share is omitted, because
 *  `onToggleScreenShare` was not supplied. */
export const AudioAndVideoOn: Story = {
  args: { audioOn: true, videoOn: true },
};

/** Muted with the camera off — both toggles in their danger-soft state. */
export const MutedAndCameraOff: Story = {
  args: { audioOn: false, videoOn: false, onToggleScreenShare: () => {} },
};

/** Actively presenting. Screen-share uses the neutral off-tone, so "on" is the
 *  emphasised state rather than "off" being alarming. */
export const ScreenSharing: Story = {
  args: { audioOn: true, videoOn: true, screenSharing: true, onToggleScreenShare: () => {} },
};

/** Devices not yet granted — every toggle is disabled but Leave stays live, so
 *  a user stuck in a broken pre-flight can always get out. */
export const DevicesUnavailable: Story = {
  args: {
    audioOn: false,
    videoOn: false,
    audioDisabled: true,
    videoDisabled: true,
    screenShareDisabled: true,
    onToggleScreenShare: () => {},
  },
};

/** The `extras` slot sits between screen-share and Leave — raise hand,
 *  captions, invite, overflow menu. */
export const WithExtras: Story = {
  args: {
    audioOn: true,
    videoOn: true,
    onToggleScreenShare: () => {},
    extras: (
      <>
        <CircularIconToggle
          on={false}
          offTone="neutral"
          aria-label="Invite people"
          iconOn={<UserPlusIcon size={18} />}
          iconOff={<UserPlusIcon size={18} />}
        />
        <CircularIconToggle
          on={false}
          offTone="neutral"
          aria-label="More options"
          iconOn={<MoreHorizontalIcon size={18} />}
          iconOff={<MoreHorizontalIcon size={18} />}
        />
      </>
    ),
  },
};

/** All three sizes; `size` scales the toggles and the Leave button together. */
export const Sizes: Story = {
  args: { audioOn: true, videoOn: true },
  render: (args) => (
    <div className="flex flex-col items-center">
      <MediaControlsBar {...args} size="sm" onToggleScreenShare={() => {}} />
      <MediaControlsBar {...args} size="md" onToggleScreenShare={() => {}} />
      <MediaControlsBar {...args} size="lg" onToggleScreenShare={() => {}} />
    </div>
  ),
};

/** Fully wired, so the glyph/label swaps are visible rather than described. */
export const Interactive: Story = {
  args: { audioOn: true, videoOn: true },
  render: () => {
    const [audioOn, setAudioOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [sharing, setSharing] = useState(false);
    const [left, setLeft] = useState(false);
    return (
      <div className="flex flex-col items-center gap-2">
        <MediaControlsBar
          audioOn={audioOn}
          videoOn={videoOn}
          screenSharing={sharing}
          onToggleAudio={() => setAudioOn((v) => !v)}
          onToggleVideo={() => setVideoOn((v) => !v)}
          onToggleScreenShare={() => setSharing((v) => !v)}
          onLeave={() => setLeft(true)}
        />
        <p className="text-xs text-text-secondary pb-3">
          {left ? 'onLeave fired' : `mic ${audioOn ? 'on' : 'off'} · cam ${videoOn ? 'on' : 'off'} · ${sharing ? 'presenting' : 'not presenting'}`}
        </p>
      </div>
    );
  },
};

/** Publishing revoked: each reason disables its toggle and is its tooltip and
 *  accessible description; the toggles stay focusable so the reason can be read. */
export const PublishRevoked: Story = {
  args: {
    audioOn: false,
    videoOn: false,
    audioDisabledReason: 'The host made you view-only',
    videoDisabledReason: 'The host made you view-only',
    screenShareDisabledReason: 'The host made you view-only',
    onToggleScreenShare: () => {},
  },
};
