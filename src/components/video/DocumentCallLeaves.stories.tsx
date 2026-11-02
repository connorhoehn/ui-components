import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DeviceToggleSelect } from './DeviceToggleSelect';
import { AudioLevelMeter } from './AudioLevelMeter';
import { VolumeSlider } from './VolumeSlider';
import { MediaPrecheckRow } from './MediaPrecheckRow';
import { ReviewDocumentList } from './ReviewDocumentList';
import { CollaboratorCheckList } from './CollaboratorCheckList';
import { CallPeopleList, type CallPerson } from './CallPeopleList';
import { AudioVideoSettingsForm } from './AudioVideoSettingsForm';
import { CAST, DEVICES, REVIEW_DOCS, fakeCameraStream, noop, themed, type StoryTheme } from './documentCallStoryKit';
import { DEFAULT_AV } from './CallSettingsDrawer.stories';

// The small pieces the document-call surfaces are built from, each in its
// states, light and dark. (The composites have their own stories.)

const meta = {
  title: 'Video/Document calls/Pieces',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function Card({ title, children, className = 'w-[380px]' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 ${className}`}>
      <h4 className="m-0 text-xs font-semibold uppercase tracking-wide text-text-tertiary">{title}</h4>
      {children}
    </section>
  );
}

function DeviceToggles() {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(false);
  const common = { devices: DEVICES.microphones, selectedDeviceId: 'mbp-mic', onSelectDevice: noop, permission: 'granted' as const };
  return (
    <Card title="DeviceToggleSelect" className="w-[520px]">
      <div className="flex flex-wrap items-center gap-2">
        <DeviceToggleSelect kind="microphone" on={mic} onToggle={() => setMic((v) => !v)} {...common} level={0.4} />
        <DeviceToggleSelect kind="camera" on={cam} onToggle={() => setCam((v) => !v)} {...common} devices={DEVICES.cameras} extraItems={[{ label: 'Blur background…', onSelect: noop }]} />
        <DeviceToggleSelect kind="microphone" on={false} onToggle={noop} {...common} />
        <DeviceToggleSelect kind="microphone" on onToggle={noop} {...common} permission="denied" />
        <DeviceToggleSelect kind="camera" on onToggle={noop} {...common} devices={[]} permission="unavailable" />
      </div>
      <div className="flex items-center gap-2">
        <DeviceToggleSelect kind="microphone" size="md" showLabel on={mic} onToggle={() => setMic((v) => !v)} {...common} />
        <DeviceToggleSelect kind="camera" size="md" showLabel on={cam} onToggle={() => setCam((v) => !v)} {...common} devices={DEVICES.cameras} />
      </div>
    </Card>
  );
}

function Meters() {
  const [vol, setVol] = useState(0.62);
  return (
    <Card title="AudioLevelMeter · VolumeSlider">
      {[0, 0.3, 0.6, 1].map((l) => (
        <div key={l} className="flex items-center gap-3 text-sm">
          <span className="w-10 text-text-tertiary">{Math.round(l * 100)}%</span>
          <AudioLevelMeter level={l} />
        </div>
      ))}
      <div className="flex items-center gap-3 text-sm">
        <span className="w-10 text-text-tertiary">off</span>
        <AudioLevelMeter level={0.8} disabled />
      </div>
      <VolumeSlider value={vol} onChange={setVol} onTest={noop} />
    </Card>
  );
}

function Precheck() {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  return (
    <Card title="MediaPrecheckRow">
      <MediaPrecheckRow micOn={mic} cameraOn={cam} permission="granted" onToggleMic={() => setMic((v) => !v)} onToggleCamera={() => setCam((v) => !v)} onOpenSettings={noop} />
      <MediaPrecheckRow micOn cameraOn={false} showCamera={false} permission="granted" onToggleMic={noop} onToggleCamera={noop} onOpenSettings={noop} testIdPrefix="audio-only" />
      <MediaPrecheckRow micOn cameraOn permission="denied" onToggleMic={noop} onToggleCamera={noop} onOpenSettings={noop} testIdPrefix="denied" />
    </Card>
  );
}

function Documents() {
  return (
    <Card title="ReviewDocumentList">
      <ReviewDocumentList trailing="remove" items={REVIEW_DOCS.map((d, i) => ({ ...d, removable: i > 0 }))} onRemove={noop} />
      <ReviewDocumentList
        trailing="open"
        onOpen={noop}
        items={[
          { ...REVIEW_DOCS[0]!, selected: true, subline: 'Presenting · Alice' },
          { ...REVIEW_DOCS[1]!, subline: 'Up next', sublineTone: 'muted' },
        ]}
      />
      <ReviewDocumentList trailing="open" items={[]} />
    </Card>
  );
}

function Collaborators() {
  const [sel, setSel] = useState<string[]>([CAST.alice.userId]);
  const rows = [
    { userId: CAST.alice.userId, name: CAST.alice.name, presence: 'online' as const, statusLabel: 'Online' },
    { userId: CAST.frank.userId, name: CAST.frank.name, presence: 'offline' as const, statusLabel: 'Offline' },
    { userId: CAST.carol.userId, name: CAST.carol.name, presence: 'away' as const, statusLabel: 'Away' },
    { userId: CAST.connor.userId, name: 'Connor Hoehn', presence: 'online' as const, statusLabel: 'Online', disabledReason: 'You' },
  ];
  return (
    <Card title="CollaboratorCheckList">
      <CollaboratorCheckList title="Document collaborators" rows={rows} selected={sel} onToggle={(id, n) => setSel((s) => (n ? [...s, id] : s.filter((x) => x !== id)))} footnote="Offline people can use the invite link." />
      <CollaboratorCheckList title="Loading" rows={[]} selected={[]} onToggle={noop} loading data-testid="collab-loading" />
      <CollaboratorCheckList title="Empty" rows={[]} selected={[]} onToggle={noop} data-testid="collab-empty" />
    </Card>
  );
}

function People() {
  const base = { isLocal: false, isHost: false, presence: 'online' as const, state: 'in-call' as const, audioOn: true, cameraOn: true, screenSharing: false, presenting: false };
  const people: CallPerson[] = [
    { ...base, userId: 'u1', name: CAST.connor.name, isLocal: true, isHost: true },
    { ...base, userId: 'u2', name: CAST.alice.name, presenting: true },
    { ...base, userId: 'u3', name: CAST.frank.name, screenSharing: true },
    { ...base, userId: 'u4', name: CAST.bob.name, cameraOn: false, audioOn: false },
    { ...base, userId: 'u5', name: 'Dan Ortiz', state: 'reconnecting' },
    { ...base, userId: 'u6', name: CAST.carol.name, state: 'ringing' },
    { ...base, userId: 'u6b', name: 'Ivy Novak', presence: 'offline', state: 'notified' },
    { ...base, userId: 'u7', name: 'Eve Park', state: 'missed' },
    { ...base, userId: 'u8', name: 'Gus Lee', state: 'declined' },
    { ...base, userId: 'u9', name: 'Hana Ito', state: 'left' },
  ];
  return (
    <Card title="CallPeopleList — every sub-status">
      <CallPeopleList people={people} count={5} followingUserId="u2" canModerate onInvite={noop} onFollow={noop} onMuteForMe={noop} onMute={noop} onRemove={noop} onMakeHost={noop} onRingAgain={noop} />
    </Card>
  );
}

function AVForm({ camOff = false }: { camOff?: boolean }) {
  const [v, setV] = useState(DEFAULT_AV);
  return (
    <Card title={camOff ? 'AudioVideoSettingsForm — camera off' : 'AudioVideoSettingsForm'}>
      <AudioVideoSettingsForm
        value={v}
        onChange={setV}
        devices={DEVICES}
        permission={{ microphone: 'granted', camera: 'granted' }}
        micLevel={0.45}
        previewStream={camOff ? null : fakeCameraStream('dev-connor', 205)}
        cameraOn={!camOff}
        speakerSelectionSupported
        onTestMic={noop}
        onTestSound={noop}
        testMicState={camOff ? 'recording' : 'idle'}
        selfName="Connor Hoehn"
      />
    </Card>
  );
}

function All() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <DeviceToggles />
      <Meters />
      <Precheck />
      <Documents />
      <Collaborators />
      <People />
      <AVForm />
      <AVForm camOff />
    </div>
  );
}

function themedStory(theme: StoryTheme): Story {
  return { render: () => <All />, decorators: [themed(theme)] };
}

export const Light: Story = themedStory('light');
export const Dark: Story = themedStory('dark');

function PreJoinForm() {
  const [value, setValue] = useState(DEFAULT_AV);
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(true);
  return <div className="mx-auto w-full max-w-[960px] rounded-xl border border-border bg-surface p-6">
    <AudioVideoSettingsForm layout="prejoin" value={value} onChange={setValue} devices={DEVICES}
      permission={{ microphone: 'granted', camera: 'granted' }} micLevel={mic ? 0.4 : 0}
      previewStream={camera ? fakeCameraStream('prejoin-camera', 205) : null} cameraOn={camera}
      speakerSelectionSupported onTestMic={noop} onTestSound={noop} selfName="Connor Hoehn"
      previewControls={<>
        <DeviceToggleSelect kind="microphone" on={mic} onToggle={() => setMic(!mic)} showLabel
          devices={DEVICES.microphones} permission="granted" onSelectDevice={microphoneId => setValue({ ...value, microphoneId })} />
        <DeviceToggleSelect kind="camera" on={camera} onToggle={() => setCamera(!camera)} showLabel
          devices={DEVICES.cameras} permission="granted" onSelectDevice={cameraId => setValue({ ...value, cameraId })} />
      </>} />
  </div>;
}
export const PreJoinLight: Story = { render: () => <PreJoinForm />, decorators: [themed('light')] };
export const PreJoinDark: Story = { render: () => <PreJoinForm />, decorators: [themed('dark')] };
