import { useState, useEffect, useRef } from 'react';
import { PageHeader, ExampleBlock } from '../shared';
import {
  CallWidget,
  CallControls,
  CallSettingsDialog,
  ExpandableCallWidget,
  MediaEffectsPreviewPanel,
} from '@/components/video';
import type { CallSidePanelTab, CallWidgetState, CallMode, CallWidgetParticipant } from '@/components/video';
import { ChatPanel } from '@/components/social';
import type { ChatMessage } from '@/hooks/useChat';

const mockParticipants: CallWidgetParticipant[] = [
  { id: '1', displayName: 'Sarah Chen', isSpeaking: false, isMuted: false },
  { id: '2', displayName: 'Marcus Johnson', isSpeaking: true, isMuted: false },
  { id: '3', displayName: 'Alex Rivera', isSpeaking: false, isMuted: true },
];

const mockLocal: CallWidgetParticipant = {
  id: 'local',
  displayName: 'You',
  isMuted: false,
  isSpeaking: false,
};

const availableToAdd: CallWidgetParticipant[] = [
  { id: '4', displayName: 'Jordan Park', isMuted: false, isSpeaking: false },
  { id: '5', displayName: 'Taylor Kim', isMuted: false, isSpeaking: false },
  { id: '6', displayName: 'Casey Lee', isMuted: false, isSpeaking: false },
];

const DEMO_BUTTON_CLASSES =
  'px-4 py-2 rounded-md border border-border bg-white cursor-pointer text-[13px] font-semibold hover:bg-surface-panel';

function LiveDemo() {
  const [state, setState] = useState<CallWidgetState>('idle');
  const [mode, setMode] = useState<CallMode>('audio');
  const [minimized, setMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [duration, setDuration] = useState(0);
  const [participants, setParticipants] = useState(mockParticipants);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (state === 'active') {
      setDuration(0);
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [state]);

  const startCall = (callMode: CallMode) => {
    setMode(callMode);
    setState('connecting');
    setTimeout(() => setState('active'), 1500);
  };

  return (
    <div className="relative min-h-[320px]">
      <div className="flex flex-wrap gap-2 mb-4">
        <button type="button" onClick={() => startCall('audio')} className={DEMO_BUTTON_CLASSES}>
          Start Audio Call
        </button>
        <button type="button" onClick={() => startCall('video')} className={DEMO_BUTTON_CLASSES}>
          Start Video Call
        </button>
        <button type="button" onClick={() => setState('ringing')} className={DEMO_BUTTON_CLASSES}>
          Simulate Incoming
        </button>
        <button
          type="button"
          onClick={() => { setState('idle'); setMinimized(false); setParticipants(mockParticipants); }}
          className={DEMO_BUTTON_CLASSES}
        >
          Reset
        </button>
      </div>

      <div className="text-xs text-neutral mb-2">
        State: <strong>{state}</strong> | Mode: <strong>{mode}</strong> | Minimized:{' '}
        <strong>{minimized ? 'yes' : 'no'}</strong> | Screen share:{' '}
        <strong>{isScreenSharing ? 'on' : 'off'}</strong> | Participants:{' '}
        <strong>{participants.length}</strong>
      </div>

      <CallWidget
        state={state}
        mode={mode}
        participants={state === 'active' ? participants : []}
        localParticipant={mockLocal}
        callerName="Sarah Chen"
        duration={state === 'active' ? duration : undefined}
        minimized={minimized}
        isMuted={isMuted}
        isCameraOn={isCameraOn}
        isScreenSharing={isScreenSharing}
        contained
        draggable
        onAnswer={() => { setState('connecting'); setTimeout(() => setState('active'), 1200); }}
        onDecline={() => setState('idle')}
        onEndCall={() => { setState('idle'); setMinimized(false); }}
        onToggleMute={() => setIsMuted(m => !m)}
        onToggleCamera={() => setIsCameraOn(c => !c)}
        onToggleScreenShare={() => setIsScreenSharing(s => !s)}
        onUpgradeToVideo={() => setMode('video')}
        onAddParticipant={(id) => {
          const person = availableToAdd.find(p => p.id === id);
          if (person) setParticipants(prev => [...prev, person]);
        }}
        availableParticipants={availableToAdd}
        onMinimize={() => setMinimized(m => !m)}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Docked side panel — chat/people/captions attached to the call card.
// Deliberately STATIC (no timers, no simulation) so the composition can be
// measured: the video column and the panel column must end at the same y.
// ---------------------------------------------------------------------------

const DOCK_SENDERS = ['Sarah Chen', 'Marcus Johnson', 'Alex Rivera', 'You'];
const DOCK_LINES = [
  'Can everyone see my screen?',
  'Yep, looks good.',
  'One sec, grabbing the link…',
  'Pushed the fix to the branch.',
  'Nice — I’ll review after standup.',
];

const DOCK_MESSAGES: ChatMessage[] = Array.from({ length: 20 }, (_, i) => ({
  id: `m${i}`,
  clientId: `c${i % 4}`,
  displayName: DOCK_SENDERS[i % 4],
  content: DOCK_LINES[i % DOCK_LINES.length],
  timestamp: new Date(1750000000000 + i * 60_000).toISOString(),
}));

function DockedDemo() {
  const [activeTab, setActiveTab] = useState<string | null>('chat');
  const [isMuted, setIsMuted] = useState(false);

  const tabs: CallSidePanelTab[] = [
    {
      id: 'chat',
      label: 'Chat',
      badgeCount: 3,
      // Note: no `showHeader`/`fill` props here — inside the dock the chat
      // panel picks those up from the dock itself.
      content: <ChatPanel tone="dark" messages={DOCK_MESSAGES} onSend={() => {}} />,
    },
    {
      id: 'people',
      label: 'People',
      content: (
        <ul className="m-0 flex list-none flex-col gap-1 p-3 text-[13px] text-white">
          {['Sarah Chen', 'Marcus Johnson', 'Alex Rivera', 'You'].map((n) => (
            <li key={n} className="rounded px-2 py-1.5 hover:bg-white/10">{n}</li>
          ))}
        </ul>
      ),
    },
    {
      id: 'captions',
      label: 'Captions',
      content: (
        <div className="flex flex-col gap-2 p-3 text-[13px] leading-snug text-white/80">
          <p className="m-0"><b className="text-white">Sarah:</b> can everyone hear me?</p>
          <p className="m-0"><b className="text-white">Marcus:</b> loud and clear.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative min-h-[620px]" data-testid="call-widget-dock-demo">
      <CallWidget
        state="active"
        mode="video"
        participants={mockParticipants.slice(0, 1)}
        localParticipant={mockLocal}
        duration={15}
        isMuted={isMuted}
        isCameraOn={false}
        contained
        draggable={false}
        position="bottom-right"
        sidePanelTabs={tabs}
        activeSidePanelTab={activeTab}
        onSidePanelTabChange={setActiveTab}
        onToggleMute={() => setIsMuted((m) => !m)}
        onToggleCamera={() => {}}
        onToggleScreenShare={() => {}}
        onEndCall={() => {}}
      />
    </div>
  );
}


// ---------------------------------------------------------------------------
// Expanded ("window") chrome
//
// <ExpandableCallWidget> had NO rendering harness anywhere, which is how
// its title bar shipped painted with a theme-FLIPPING token: under
// `data-theme="dark"` the bar went white behind its white Mini/Window/
// Fullscreen buttons, hiding the only way back to the docked chrome. The
// widget positions itself `fixed`, so it is mounted on demand rather than
// inline — the button below is the harness, and
// tests/e2e/call-chrome-contrast.spec.ts drives it in both themes.
// ---------------------------------------------------------------------------

function ExpandedChromeExample() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<string | null>('chat');
  const [muted, setMuted] = useState(false);

  const tabs: CallSidePanelTab[] = [
    { id: 'chat', label: 'Chat', content: <ChatPanel tone="dark" messages={DOCK_MESSAGES} onSend={() => {}} /> },
    {
      id: 'people',
      label: 'People',
      content: (
        <ul className="m-0 flex list-none flex-col gap-1 p-3 text-[13px] text-white">
          {mockParticipants.map((p) => (
            <li key={p.id} className="rounded px-2 py-1.5 hover:bg-white/10">{p.displayName}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="p-4">
      <button
        type="button"
        data-testid="open-expanded-chrome"
        onClick={() => setOpen((v) => !v)}
        className="rounded-md bg-primary px-3 py-1.5 text-sm text-white"
      >
        {open ? 'Close the expanded chrome' : 'Open the expanded (window) chrome'}
      </button>
      {open && (
        <ExpandableCallWidget
          title="Design review"
          subtitle="3 in call"
          durationSeconds={87}
          defaultMode="window"
          sidePanelTabs={tabs}
          activeSidePanelTab={tab}
          onSidePanelTabChange={setTab}
          controls={
            <CallControls
              mode="video"
              isMuted={muted}
              isCameraOn={false}
              onToggleMute={() => setMuted((m) => !m)}
              onToggleCamera={() => {}}
              onToggleScreenShare={() => {}}
              onOpenAddParticipant={() => {}}
              onEndCall={() => setOpen(false)}
            />
          }
        >
          <div className="grid h-full w-full place-items-center bg-video-stage text-sm text-white/50">
            stage
          </div>
        </ExpandableCallWidget>
      )}
    </div>
  );
}


// ---------------------------------------------------------------------------
// Call settings — effects preview
//
// This dialog had NO rendering harness, which is how it shipped with its
// Apply/Cancel footer laid out below the card AND below the viewport: the
// entire effects catalogue was unreachable in the running app while every
// unit test passed. `tests/e2e/call-settings-effects.spec.ts` measures the
// footer against the card and the viewport so it cannot regress silently.
// ---------------------------------------------------------------------------

const DEMO_FILTERS = [
  { id: 'none', label: 'None' }, { id: 'bw', label: 'B&W' },
  { id: 'sepia', label: 'Sepia' }, { id: 'warm', label: 'Warm' },
  { id: 'cool', label: 'Cool' }, { id: 'vintage', label: 'Vintage' },
  { id: 'noir', label: 'Noir' }, { id: 'contrast', label: 'High Contrast' },
  { id: 'beauty', label: 'Beauty' },
];
const DEMO_BACKGROUNDS = [
  { id: 'dusk', label: 'Dusk', url: '' },
  { id: 'ocean', label: 'Ocean', url: '' },
  { id: 'forest', label: 'Forest', url: '' },
  { id: 'slate', label: 'Slate', url: '' },
];
const DEMO_SPRITES = [
  { id: 'none', label: 'None' }, { id: 'dog', label: 'Dog Ears', emoji: '\u{1F436}' },
  { id: 'shades', label: 'Sunglasses', emoji: '\u{1F576}' },
  { id: 'disguise', label: 'Disguise', emoji: '\u{1F978}' },
  { id: 'party', label: 'Party', emoji: '\u{1F389}' },
  { id: 'crown', label: 'Crown', emoji: '\u{1F451}' },
];

function EffectsDialogExample() {
  const [open, setOpen] = useState(false);
  const [filterId, setFilterId] = useState('none');
  const [bg, setBg] = useState('none');
  const [sprite, setSprite] = useState<string | null>(null);
  const dirty = filterId !== 'none' || bg !== 'none' || sprite !== null;

  const reset = () => { setFilterId('none'); setBg('none'); setSprite(null); };

  return (
    <div className="p-4">
      <button
        type="button"
        data-testid="open-effects-dialog"
        onClick={() => setOpen(true)}
        className="rounded-md bg-primary px-3 py-1.5 text-sm text-white"
      >
        Open call settings (effects)
      </button>
      <CallSettingsDialog
        open={open}
        onClose={() => { setOpen(false); reset(); }}
        title="Call settings — demo"
        initialTab="effects"
        showPreview={false}
        previewStream={null}
        effectsContent={
          <MediaEffectsPreviewPanel
            previewActive
            previewStream={null}
            isDirty={dirty}
            onApply={() => setOpen(false)}
            onCancel={() => { setOpen(false); reset(); }}
            filters={DEMO_FILTERS}
            activeFilterId={filterId}
            onSelectFilter={setFilterId}
            backgrounds={DEMO_BACKGROUNDS}
            backgroundMode={bg === 'none' ? 'none' : bg === 'blur' ? 'blur' : 'image'}
            activeBackgroundUrl={null}
            onSelectBackground={(mode: string) => setBg(mode)}
            faceSprites={DEMO_SPRITES}
            activeFaceSpriteId={sprite}
            onSelectFaceSprite={setSprite}
          />
        }
        peopleContent={<div className="p-2 text-sm text-white/70">People tab.</div>}
      />
    </div>
  );
}

export default function CallWidgetPage() {
  return (
    <div>
      <PageHeader
        title="Call Widget"
        description="Floating, draggable audio/video call widget with incoming calls, active call controls (mute, camera, screen share, add participants), minimized pill view, participant picker, and upgrade from audio to video. Designed for embedding in any app — position it in a corner and drag it anywhere."
        importPath="import { CallWidget } from '@connorhoehn/ui-components/video'"
      />

      <ExampleBlock
        id="call-settings-effects"
        title="Call settings — effects preview"
        description="The effects surface inside the settings dialog. Its footer must stay inside the card and inside the viewport."
        code={`<CallSettingsDialog
  open={open}
  onClose={close}
  initialTab="effects"
  showPreview={false}
  effectsContent={<MediaEffectsPreviewPanel … />}
/>`}
      >
        <EffectsDialogExample />
      </ExampleBlock>

      <ExampleBlock
        id="call-widget-live"
        title="Interactive Demo"
        description="Click a button to trigger different call states. The widget appears in the bottom-right corner and can be dragged. Try screen sharing, adding participants from the picker, minimizing, or upgrading from audio to video."
        code={`<CallWidget
  state="active"
  mode="audio"
  participants={participants}
  localParticipant={localUser}
  duration={elapsed}
  isMuted={isMuted}
  isCameraOn={isCameraOn}
  isScreenSharing={isScreenSharing}
  contained
  draggable
  availableParticipants={availableUsers}
  onToggleMute={() => setIsMuted(m => !m)}
  onToggleCamera={() => setIsCameraOn(c => !c)}
  onToggleScreenShare={() => setIsScreenSharing(s => !s)}
  onUpgradeToVideo={() => setMode('video')}
  onAddParticipant={(id) => addToCall(id)}
  onEndCall={() => endCall()}
  onMinimize={() => setMinimized(m => !m)}
/>`}
        background="#0f172a"
      >
        <LiveDemo />
      </ExampleBlock>

      <ExampleBlock
        id="call-widget-dock"
        title="Docked Side Panel"
        description="Chat, People and Captions dock to the right edge of the call card — one region, three mutually-exclusive destinations, driven by the toggles in the control row. The card widens; the video column and the panel stay height-matched, and the panel's message list absorbs the slack."
        code={`<CallWidget
  state="active"
  mode="video"
  participants={participants}
  localParticipant={localUser}
  duration={elapsed}
  sidePanelTabs={[
    { id: 'chat', label: 'Chat', badgeCount: 3,
      content: <ChatPanel tone="dark" messages={messages} onSend={send} /> },
    { id: 'people', label: 'People', content: <PeopleList /> },
    { id: 'captions', label: 'Captions', content: <Captions /> },
  ]}
  activeSidePanelTab={activeTab}
  onSidePanelTabChange={setActiveTab}
/>`}
        background="#0f172a"
      >
        <DockedDemo />
      </ExampleBlock>

      <ExampleBlock
        id="call-widget-expanded"
        title="Expanded (window) chrome"
        description="The pop-out call window: draggable title bar with Mini / Window / Fullscreen mode buttons, a stage, the same dock on the right and a control strip below. Mounted on demand because it positions itself fixed to the viewport."
        code={`<ExpandableCallWidget
  title="Design review"
  subtitle="3 in call"
  durationSeconds={87}
  defaultMode="window"
  sidePanelTabs={tabs}
  activeSidePanelTab={tab}
  onSidePanelTabChange={setTab}
  controls={<CallControls … />}
>
  <HangoutLayout fillParent participants={participants} />
</ExpandableCallWidget>`}
      >
        <ExpandedChromeExample />
      </ExampleBlock>

      <ExampleBlock
        id="call-widget-ringing"
        title="Ringing State"
        description="Incoming call notification with answer/decline buttons. Shows caller info with animated indicator."
        code={`<CallWidget
  state="ringing"
  mode="audio"
  participants={[]}
  callerName="Marcus Johnson"
  contained
  onAnswer={() => joinCall()}
  onDecline={() => dismiss()}
/>`}
      >
        <div className="relative min-h-[240px] bg-call-chrome rounded-lg">
          <CallWidget
            state="ringing"
            mode="audio"
            participants={[]}
            callerName="Marcus Johnson"
            draggable={false}
            contained
            position="bottom-right"
            onAnswer={() => {}}
            onDecline={() => {}}
          />
        </div>
      </ExampleBlock>

      <ExampleBlock
        id="call-widget-minimized"
        title="Minimized Pill"
        description="Compact view showing call status, duration, and quick mute/end buttons. Click to expand back to full view."
        code={`<CallWidget
  state="active"
  mode="audio"
  participants={participants}
  duration={127}
  minimized
  contained
  isMuted={false}
  onMinimize={() => setMinimized(m => !m)}
  onEndCall={() => endCall()}
/>`}
      >
        <div className="relative min-h-[80px] bg-call-chrome rounded-lg flex items-center justify-center">
          <CallWidget
            state="active"
            mode="audio"
            participants={mockParticipants.slice(0, 2)}
            duration={127}
            minimized
            isMuted={false}
            contained
            draggable={false}
            onToggleMute={() => {}}
            onEndCall={() => {}}
            onMinimize={() => {}}
          />
        </div>
      </ExampleBlock>

      <ExampleBlock
        id="call-widget-props"
        title="Props Reference"
        description="Key props for controlling the CallWidget."
        code={`interface CallWidgetProps {
  state: 'idle' | 'ringing' | 'connecting' | 'active' | 'ended';
  mode: 'audio' | 'video';
  participants: CallWidgetParticipant[];
  localParticipant?: CallWidgetParticipant;
  callerName?: string;
  duration?: number;
  isMuted?: boolean;
  isCameraOn?: boolean;
  isScreenSharing?: boolean;
  minimized?: boolean;
  contained?: boolean; // absolute within parent vs fixed to viewport
  draggable?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  availableParticipants?: CallWidgetParticipant[]; // for the add-person picker

  onAnswer?: () => void;
  onDecline?: () => void;
  onEndCall?: () => void;
  onToggleMute?: () => void;
  onToggleCamera?: () => void;
  onToggleScreenShare?: () => void;
  onUpgradeToVideo?: () => void;
  onAddParticipant?: (participantId: string) => void;
  onMinimize?: () => void;
}`}
      >
        <div className="p-4 text-[13px] text-text-secondary leading-relaxed">
          <p className="m-0 mb-2"><strong>contained</strong> — Uses <code>position: absolute</code> within a <code>relative</code> parent instead of fixed to the viewport.</p>
          <p className="m-0 mb-2"><strong>availableParticipants</strong> — Populates the "Add person" picker. Only shows people not already in the call.</p>
          <p className="m-0 mb-2"><strong>draggable</strong> — Enables drag-to-move. Snap zones appear near corners. A snap-back button shows when dragged away from default position.</p>
          <p className="m-0"><strong>onAddParticipant(id)</strong> — Called with the selected participant's ID when picked from the popover.</p>
        </div>
      </ExampleBlock>
    </div>
  );
}
