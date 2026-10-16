import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MeetingToolbar, deviceMenuSections, type MeetingToolbarItem } from './MeetingToolbar';
import { MeetingStatusCluster } from './MeetingStatusCluster';
import {
  MeetingAppsIcon, MeetingHandIcon, MeetingNotesIcon, MeetingReactIcon, MeetingRoomsIcon, MeetingShareIcon, MeetingViewIcon,
} from './MeetingIcons';
import { ReactionPicker } from './ReactionOverlay';
import { ChatBubbleIcon, MicIcon, MicOffIcon, UsersIcon, VideoIcon, VideoOffIcon } from './MediaIcons';

const CAMERAS = [{ deviceId: 'cam-1', label: 'FaceTime HD Camera' }, { deviceId: 'cam-2', label: 'Studio Display Camera' }];
const MICS = [{ deviceId: 'mic-1', label: 'MacBook Pro Microphone' }, { deviceId: 'mic-2', label: 'AirPods Pro' }];

function Bar({ compact }: { compact?: boolean }) {
  const [pane, setPane] = useState<string | null>('rooms');
  const [hand, setHand] = useState(false);
  const [cam, setCam] = useState(false);
  const [mic, setMic] = useState(false);
  const [camId, setCamId] = useState('cam-1');
  const [micId, setMicId] = useState('mic-1');
  const toggle = (id: string) => setPane((p) => (p === id ? null : id));
  const items: MeetingToolbarItem[] = [
    { id: 'chat', label: 'Chat', icon: <ChatBubbleIcon />, active: pane === 'chat', onClick: () => toggle('chat'), badge: 2 },
    { id: 'people', label: 'People', icon: <UsersIcon />, count: 15, active: pane === 'people', onClick: () => toggle('people') },
    { id: 'raise', label: hand ? 'Lower' : 'Raise', icon: <MeetingHandIcon />, pressed: hand, onClick: () => setHand((v) => !v) },
    {
      id: 'react', label: 'React', icon: <MeetingReactIcon />, popoverLabel: 'Send a reaction',
      popover: (close) => <ReactionPicker tone="surface" onReact={() => close()} />,
    },
    { id: 'view', label: 'View', icon: <MeetingViewIcon />, priority: 'secondary', onClick: () => {} },
    { id: 'notes', label: 'Notes', icon: <MeetingNotesIcon />, priority: 'secondary', active: pane === 'notes', onClick: () => toggle('notes') },
    { id: 'rooms', label: 'Rooms', icon: <MeetingRoomsIcon />, active: pane === 'rooms', onClick: () => toggle('rooms') },
    { id: 'apps', label: 'Apps', icon: <MeetingAppsIcon />, priority: 'secondary', onClick: () => {} },
  ];
  const media: MeetingToolbarItem[] = [
    { id: 'camera', label: 'Camera', icon: cam ? <VideoIcon /> : <VideoOffIcon />, tone: cam ? 'default' : 'off', onClick: () => setCam((v) => !v), menu: deviceMenuSections('Camera', CAMERAS, camId, setCamId) },
    { id: 'mic', label: 'Mic', icon: mic ? <MicIcon /> : <MicOffIcon />, tone: mic ? 'default' : 'off', onClick: () => setMic((v) => !v), menu: deviceMenuSections('Microphone', MICS, micId, setMicId) },
    { id: 'share', label: 'Share', icon: <MeetingShareIcon />, priority: 'secondary', onClick: () => {} },
  ];
  return (
    <MeetingToolbar
      compact={compact}
      start={<MeetingStatusCluster recording={{ armed: true, active: true }} startedAt={Date.now() - (32 * 60 + 52) * 1000} onOpenOptions={() => {}} />}
      items={items}
      media={media}
      moreSections={[{ items: [{ label: 'Settings', onSelect: () => {} }, { label: 'Turn on live captions', onSelect: () => {} }] }]}
      onLeave={() => {}}
      leaveMenu={[{ items: [{ label: 'End meeting for everyone', danger: true, onSelect: () => {} }] }]}
    />
  );
}

const meta = {
  title: 'Video/MeetingToolbar',
  component: MeetingToolbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MeetingToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The reference bar: status cluster, labelled buttons, Rooms open, split Camera/Mic, Leave. */
export const Teams: Story = {
  args: { items: [], onLeave: () => {} },
  render: () => <Bar compact={false} />,
};

/** Narrow: View, Notes and Apps fold into More. */
export const Compact: Story = {
  args: { items: [], onLeave: () => {} },
  render: () => <Bar compact />,
};

/** A phone (2.472.0): icon-only; items, Share and the device menus fold into More; React stays. */
export const Phone: Story = {
  args: { items: [], onLeave: () => {} },
  render: () => <div className="w-full max-w-[390px] border border-border"><Bar /></div>,
};

