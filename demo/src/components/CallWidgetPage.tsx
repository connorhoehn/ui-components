import { useState, useEffect, useRef } from 'react';
import { PageHeader, ExampleBlock } from '../shared';
import { CallWidget } from '@/components/video';
import type { CallWidgetState, CallMode, CallWidgetParticipant } from '@/components/video';

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

function LiveDemo() {
  const [state, setState] = useState<CallWidgetState>('idle');
  const [mode, setMode] = useState<CallMode>('audio');
  const [minimized, setMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [duration, setDuration] = useState(0);
  const [participants, setParticipants] = useState(mockParticipants);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

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
    <div style={{ position: 'relative', minHeight: 320 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        <button type="button" onClick={() => startCall('audio')} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}>
          Start Audio Call
        </button>
        <button type="button" onClick={() => startCall('video')} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}>
          Start Video Call
        </button>
        <button type="button" onClick={() => setState('ringing')} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}>
          Simulate Incoming
        </button>
        <button type="button" onClick={() => { setState('idle'); setMinimized(false); setParticipants(mockParticipants); }} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}>
          Reset
        </button>
      </div>

      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
        State: <strong>{state}</strong> | Mode: <strong>{mode}</strong> | Minimized: <strong>{minimized ? 'yes' : 'no'}</strong> | Screen share: <strong>{isScreenSharing ? 'on' : 'off'}</strong> | Participants: <strong>{participants.length}</strong>
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

export default function CallWidgetPage() {
  return (
    <div>
      <PageHeader
        title="Call Widget"
        description="Floating, draggable audio/video call widget with incoming calls, active call controls (mute, camera, screen share, add participants), minimized pill view, participant picker, and upgrade from audio to video. Designed for embedding in any app — position it in a corner and drag it anywhere."
        importPath="import { CallWidget } from '@connorhoehnslalom/ui-components/video'"
      />

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
        <div style={{ position: 'relative', minHeight: 240, background: '#0f172a', borderRadius: 8 }}>
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
        <div style={{ position: 'relative', minHeight: 80, background: '#0f172a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        <div style={{ padding: 16, fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
          <p style={{ margin: '0 0 8px' }}><strong>contained</strong> — Uses <code>position: absolute</code> within a <code>relative</code> parent instead of fixed to the viewport.</p>
          <p style={{ margin: '0 0 8px' }}><strong>availableParticipants</strong> — Populates the "Add person" picker. Only shows people not already in the call.</p>
          <p style={{ margin: '0 0 8px' }}><strong>draggable</strong> — Enables drag-to-move. Snap zones appear near corners. A snap-back button shows when dragged away from default position.</p>
          <p style={{ margin: 0 }}><strong>onAddParticipant(id)</strong> — Called with the selected participant's ID when picked from the popover.</p>
        </div>
      </ExampleBlock>
    </div>
  );
}
