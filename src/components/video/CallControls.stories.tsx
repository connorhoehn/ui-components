import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CallControls } from './CallControls';
import type { CallStripParticipant } from './CallParticipantStrip';

// CallControls renders on the dark call surface, so every story sits on an
// inverse-surface backdrop — the buttons are white-on-translucent.

const ROSTER: CallStripParticipant[] = [
  { id: 'alice', displayName: 'Alice Johnson' },
  { id: 'bob', displayName: 'Bob Smith' },
  { id: 'cai', displayName: 'Cai Lund' },
];

const meta = {
  title: 'Video/CallControls',
  component: CallControls,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-80 pt-3 rounded-lg bg-call-chrome">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CallControls>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Audio call, everything nominal. `onUpgradeToVideo` adds the
 *  "switch to video" glyph — omit it and the button disappears. */
export const AudioCall: Story = {
  args: {
    mode: 'audio',
    onToggleMute: () => {},
    onToggleScreenShare: () => {},
    onUpgradeToVideo: () => {},
    onEndCall: () => {},
  },
};

/** Video call — the camera toggle replaces the upgrade button. */
export const VideoCall: Story = {
  args: {
    mode: 'video',
    isCameraOn: true,
    onToggleMute: () => {},
    onToggleCamera: () => {},
    onToggleScreenShare: () => {},
    onEndCall: () => {},
  },
};

/** Muted mic, camera off, screen currently shared — the "active" glyph state
 *  for all three toggles at once. */
export const MutedCameraOffSharing: Story = {
  args: {
    mode: 'video',
    isMuted: true,
    isCameraOn: false,
    isScreenSharing: true,
    onToggleMute: () => {},
    onToggleCamera: () => {},
    onToggleScreenShare: () => {},
    onEndCall: () => {},
  },
};

/** Passing `onAddParticipant` reveals the add-people button; clicking it opens
 *  the inline picker. `currentParticipantIds` dedupes people already in. */
export const WithAddParticipantPicker: Story = {
  args: {
    mode: 'audio',
    onToggleMute: () => {},
    onEndCall: () => {},
    onAddParticipant: () => {},
    availableParticipants: ROSTER,
    currentParticipantIds: ['alice'],
  },
  render: (args) => {
    const [added, setAdded] = useState<string[]>(['alice']);
    return (
      <CallControls
        {...args}
        currentParticipantIds={added}
        onAddParticipant={(id) => setAdded((prev) => [...prev, id])}
      />
    );
  },
};

/** Everyone available is already in the call — the picker shows its empty copy
 *  rather than an empty list. */
export const AddParticipantPickerEmpty: Story = {
  args: {
    mode: 'audio',
    onToggleMute: () => {},
    onEndCall: () => {},
    onAddParticipant: () => {},
    availableParticipants: ROSTER,
    currentParticipantIds: ROSTER.map((p) => p.id),
  },
};

/** Publishing revoked: mute, camera and share are off-limits with a reason
 *  (their tooltip and accessible description). End call still works. */
export const PublishRevoked: Story = {
  args: {
    mode: 'video',
    isMuted: true,
    isCameraOn: false,
    onToggleMute: () => {},
    onToggleCamera: () => {},
    onToggleScreenShare: () => {},
    onEndCall: () => {},
    audioDisabledReason: 'The host made you view-only',
    videoDisabledReason: 'The host made you view-only',
    screenShareDisabledReason: 'The host made you view-only',
  },
};

/** Compact density: the disabled share control in the More menu shows its reason under the label. */
export const PublishRevokedCompact: Story = {
  args: { ...PublishRevoked.args, mode: 'video', density: 'compact' },
};
