import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import CircularIconToggle from './CircularIconToggle';
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon, ScreenShareIcon, ScreenShareOffIcon } from './MediaIcons';

// The round on/off control behind MediaControlsBar and HangoutPreJoinShell.
// State is reflected via `aria-pressed`, so the icon swap is decoration, not
// the accessible signal.

const meta = {
  title: 'Video/CircularIconToggle',
  component: CircularIconToggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CircularIconToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const micIcons = { iconOn: <MicIcon />, iconOff: <MicOffIcon /> };

/** On: soft emphasis surface, the feature is active. */
export const On: Story = {
  args: { on: true, 'aria-label': 'Microphone', ...micIcons },
};

/** Off: red soft by default, matching the Meet convention that "off" for
 *  mic/camera is an alarming state worth noticing. */
export const OffDanger: Story = {
  args: { on: false, 'aria-label': 'Microphone', ...micIcons },
};

/** `offTone="neutral"` for controls where off is the *normal* state —
 *  screen-share, for instance, is off almost all the time. */
export const OffNeutral: Story = {
  args: {
    on: false,
    offTone: 'neutral',
    'aria-label': 'Screen share',
    iconOn: <ScreenShareIcon />,
    iconOff: <ScreenShareOffIcon />,
  },
};

/** Disabled — used before camera permission is granted. */
export const Disabled: Story = {
  args: { on: false, disabled: true, 'aria-label': 'Camera', iconOn: <VideoIcon />, iconOff: <VideoOffIcon /> },
};

/** The three sizes side by side. */
export const Sizes: Story = {
  args: { on: true, 'aria-label': 'Microphone', ...micIcons },
  render: () => (
    <div className="flex items-center gap-4">
      <CircularIconToggle on size="sm" aria-label="Microphone" iconOn={<MicIcon size={16} />} iconOff={<MicOffIcon size={16} />} />
      <CircularIconToggle on size="md" aria-label="Microphone" iconOn={<MicIcon size={18} />} iconOff={<MicOffIcon size={18} />} />
      <CircularIconToggle on size="lg" aria-label="Microphone" iconOn={<MicIcon size={22} />} iconOff={<MicOffIcon size={22} />} />
    </div>
  ),
};

/** Click to flip — the honest demonstration of the on/off pair. */
export const Interactive: Story = {
  args: { on: true, 'aria-label': 'Microphone', ...micIcons },
  render: () => {
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(false);
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <CircularIconToggle
            on={micOn}
            onClick={() => setMicOn((v) => !v)}
            aria-label="Microphone"
            iconOn={<MicIcon size={18} />}
            iconOff={<MicOffIcon size={18} />}
          />
          <CircularIconToggle
            on={camOn}
            onClick={() => setCamOn((v) => !v)}
            aria-label="Camera"
            iconOn={<VideoIcon size={18} />}
            iconOff={<VideoOffIcon size={18} />}
          />
        </div>
        <p className="text-xs text-text-secondary">
          mic {micOn ? 'on' : 'off'} · camera {camOn ? 'on' : 'off'}
        </p>
      </div>
    );
  },
};
