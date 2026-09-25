import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { StartCallDrawer, type StartCallDrawerProps } from './StartCallDrawer';
import type { CollaboratorRow } from './CollaboratorCheckList';
import type { MediaPermission } from './DeviceToggleSelect';
import { CAST, REVIEW_DOCS, noop, themed } from './documentCallStoryKit';

// "Start a call" (mockup 01), docked in the 400px right column at 1672 × 941
// (360px at 1280 × 720).

const ROWS: CollaboratorRow[] = [
  { userId: CAST.alice.userId, name: CAST.alice.name, presence: 'online', statusLabel: 'Online', color: 'rgb(34,160,90)' },
  { userId: CAST.frank.userId, name: CAST.frank.name, presence: 'offline', statusLabel: 'Offline', color: 'rgb(236,120,120)' },
  { userId: CAST.bob.userId, name: CAST.bob.name, presence: 'online', statusLabel: 'Online', color: 'rgb(110,118,135)' },
  { userId: CAST.carol.userId, name: CAST.carol.name, presence: 'away', statusLabel: 'Away', color: 'rgb(180,150,230)' },
];

interface SceneProps {
  width?: 400 | 360;
  media?: 'video' | 'audio';
  permission?: MediaPermission;
  over?: Partial<StartCallDrawerProps>;
  loading?: boolean;
}

function Scene({ width = 400, media: initialMedia = 'video', permission = 'granted', over = {}, loading = false }: SceneProps) {
  const [title, setTitle] = useState('Auth architecture review');
  const [media, setMedia] = useState<'video' | 'audio'>(initialMedia);
  const [docs, setDocs] = useState(REVIEW_DOCS.map((d) => ({ ...d, removable: true })));
  const [selected, setSelected] = useState<string[]>([CAST.alice.userId, CAST.frank.userId]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('Review the sign-in flow and migration plan.');
  const [ring, setRing] = useState(true);
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const rows = useMemo(
    () => ROWS.filter((r) => r.name.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );
  const names = Object.fromEntries(ROWS.map((r) => [r.userId, r.name]));
  return (
    <div className={width === 360 ? 'h-[941px] w-[360px] overflow-hidden border border-border' : 'h-[941px] w-[400px] overflow-hidden border border-border'}>
      <StartCallDrawer
        open
        onClose={noop}
        title={title}
        onTitleChange={setTitle}
        media={media}
        onMediaChange={setMedia}
        documents={{ items: docs, onRemove: (id) => setDocs((d) => d.filter((x) => x.id !== id)), onAdd: noop }}
        onManageAccess={noop}
        people={{
          query,
          onQueryChange: setQuery,
          chips: selected.map((id) => ({ userId: id, name: names[id] ?? id })),
          onRemoveChip: (id) => setSelected((s) => s.filter((x) => x !== id)),
          collaborators: {
            rows,
            selected,
            loading,
            onToggle: (id, next) => setSelected((s) => (next ? [...s, id] : s.filter((x) => x !== id))),
          },
        }}
        message={message}
        onMessageChange={setMessage}
        ring={ring}
        onRingChange={setRing}
        precheck={{
          micOn: mic,
          cameraOn: cam,
          permission,
          onToggleMic: () => setMic((v) => !v),
          onToggleCamera: () => setCam((v) => !v),
          onOpenSettings: noop,
        }}
        selectedCount={selected.length}
        onCopyLink={noop}
        onStart={noop}
        {...over}
      />
    </div>
  );
}

const meta = {
  title: 'Video/Document calls/StartCallDrawer',
  component: StartCallDrawer,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StartCallDrawer>;
export default meta;
type Story = StoryObj<typeof meta>;

const args = {} as StartCallDrawerProps;

/** Mockup 01: Alice and Frank ticked and chipped, two review documents, ring on. */
export const Default: Story = { args, render: () => <Scene />, decorators: [themed('light')] };
export const DefaultDark: Story = { args, render: () => <Scene />, decorators: [themed('dark')] };
/** 1280 × 720: the column is 360px. */
export const Narrow: Story = { args, render: () => <Scene width={360} />, decorators: [themed('light')] };
/** Audio: the camera pre-check is gone. */
export const Audio: Story = { args, render: () => <Scene media="audio" />, decorators: [themed('light')] };
/** Microphone and camera blocked in the browser. */
export const PermissionDenied: Story = { args, render: () => <Scene permission="denied" />, decorators: [themed('light')] };
export const PermissionDeniedDark: Story = { args, render: () => <Scene permission="denied" />, decorators: [themed('dark')] };
export const LoadingCollaborators: Story = { args, render: () => <Scene loading />, decorators: [themed('light')] };
export const Starting: Story = { args, render: () => <Scene over={{ starting: true }} />, decorators: [themed('light')] };
export const StartFailed: Story = {
  args,
  render: () => <Scene over={{ error: { message: 'the call service did not answer', onRetry: noop } }} />,
  decorators: [themed('light')],
};
export const StartFailedDark: Story = { ...StartFailed, decorators: [themed('dark')] };
