import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import HangoutPreJoinShell, { type PreJoinRosterEntry } from './HangoutPreJoinShell';

// Per the locked consumer contract the shell never calls getUserMedia itself —
// camera state and readiness are props. That makes it fully storyable: every
// state below is reached with `previewStream: null`, and the preview area
// falls back to the identity tile / permission card / spinner accordingly.

const ROSTER: PreJoinRosterEntry[] = [
  { participantId: 'a7f3c19b2e4d', ready: true, displayName: 'Alice Johnson' },
  { participantId: 'd41d8cd98f00', ready: true, displayName: 'Bob Smith' },
  { participantId: '9e107d9d372b', ready: false },
];

const meta = {
  title: 'Video/HangoutPreJoinShell',
  component: HangoutPreJoinShell,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="h-[720px] w-full">
        <Story />
      </div>
    ),
  ],
  args: {
    channelName: '#product-design',
    previewStream: null,
    onToggleAudio: () => {},
    onToggleVideo: () => {},
    onJoin: () => {},
    onCancel: () => {},
  },
} satisfies Meta<typeof HangoutPreJoinShell>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Permission still being requested — spinner over the preview, toggles
 *  disabled, Join reads "Allow camera to join". */
export const AwaitingPermission: Story = {
  args: { permission: 'pending', audioEnabled: true, videoEnabled: true, readyLoading: true },
};

/** Granted, camera off. With `localIdentity` set you get the Meet/Teams
 *  identity tile instead of the bare "Camera off" text. */
export const CameraOffWithIdentity: Story = {
  args: {
    permission: 'granted',
    audioEnabled: true,
    videoEnabled: false,
    localIdentity: { displayName: 'Morgan Reyes' },
    readyState: 'ready',
    participants: ROSTER,
  },
};

/** Same state without `localIdentity` — the legacy text fallback, kept so
 *  existing consumers are unaffected. */
export const CameraOffLegacyFallback: Story = {
  args: {
    permission: 'granted',
    audioEnabled: false,
    videoEnabled: false,
    readyState: 'empty',
  },
};

/** Permission denied — the shell swaps the preview for PermissionDeniedCard
 *  and keeps Join disabled. `onRetryPermission` adds the retry action. */
export const PermissionDenied: Story = {
  args: {
    permission: 'denied',
    permissionMessage: 'NotAllowedError: Permission denied by user',
    audioEnabled: true,
    videoEnabled: true,
    onRetryPermission: () => console.log('retry'),
  },
};

/** No camera attached at all — a different fallback from "denied". */
export const NoDevice: Story = {
  args: { permission: 'no-device', audioEnabled: true, videoEnabled: false },
};

/** First one in: the roster is empty and the subtitle says so. */
export const EmptyRoom: Story = {
  args: { permission: 'granted', audioEnabled: true, videoEnabled: true, readyState: 'empty' },
};

/** Others are publishing but still mid-handshake — an amber note explains you
 *  can join anyway. */
export const OthersStillConnecting: Story = {
  args: {
    permission: 'granted',
    audioEnabled: true,
    videoEnabled: true,
    readyState: 'pending',
    participants: ROSTER,
    localIdentity: { displayName: 'Morgan Reyes' },
  },
};

/** Fully wired pre-flight: the toggles drive the intent object handed to
 *  `onJoin`, which is how a consumer spawns the publisher already muted. */
export const Interactive: Story = {
  args: { permission: 'granted', audioEnabled: true, videoEnabled: true },
  render: (args) => {
    const [audio, setAudio] = useState(true);
    const [video, setVideo] = useState(false);
    const [joined, setJoined] = useState<string | null>(null);
    return (
      <HangoutPreJoinShell
        {...args}
        audioEnabled={audio}
        videoEnabled={video}
        onToggleAudio={() => setAudio((v) => !v)}
        onToggleVideo={() => setVideo((v) => !v)}
        localIdentity={{ displayName: 'Morgan Reyes' }}
        readyState="ready"
        participants={ROSTER}
        subtitleOverride={joined ?? undefined}
        onJoin={(intent) => setJoined(`Joined with audio=${intent.audio} video=${intent.video}`)}
      />
    );
  },
};

/** The Teams arrangement in full: an eyebrow over the one title, and a gear on
 *  the stage that swaps the roster card for the host's device pickers. The
 *  slot is the host's — the shell never enumerates devices itself. */
export const WithDeviceSettings: Story = {
  args: {
    permission: 'granted',
    audioEnabled: true,
    videoEnabled: true,
    readyState: 'ready',
    participants: ROSTER,
    localIdentity: { displayName: 'Morgan Reyes' },
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <HangoutPreJoinShell
        {...args}
        eyebrow="Before you go live"
        devicesOpen={open}
        onToggleDevices={setOpen}
        devicesSlot={
          <div className="flex flex-col gap-2 text-sm text-text-secondary">
            <label className="flex flex-col gap-1">
              Microphone
              <select className="h-8 rounded-md border border-border bg-surface px-2 text-[13px]">
                <option>MacBook Pro Microphone</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              Camera
              <select className="h-8 rounded-md border border-border bg-surface px-2 text-[13px]">
                <option>FaceTime HD Camera</option>
              </select>
            </label>
          </div>
        }
        secondaryActions={
          <button type="button" className="text-xs text-neutral hover:text-text-primary">
            Other join options
          </button>
        }
      />
    );
  },
};
