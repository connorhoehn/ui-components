import { useState, useEffect, useRef } from 'react';
import { PageHeader, ExampleBlock } from '../../shared';
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

function LiveDemo() {
  const [state, setState] = useState<CallWidgetState>('idle');
  const [mode, setMode] = useState<CallMode>('audio');
  const [minimized, setMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [duration, setDuration] = useState(0);
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

  const simulateIncoming = () => {
    setState('ringing');
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => startCall('audio')}
          style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}
        >
          Start Audio Call
        </button>
        <button
          type="button"
          onClick={() => startCall('video')}
          style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}
        >
          Start Video Call
        </button>
        <button
          type="button"
          onClick={simulateIncoming}
          style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}
        >
          Simulate Incoming
        </button>
        <button
          type="button"
          onClick={() => { setState('idle'); setMinimized(false); }}
          style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}
        >
          Reset
        </button>
      </div>

      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
        State: <strong>{state}</strong> | Mode: <strong>{mode}</strong> | Minimized: <strong>{minimized ? 'yes' : 'no'}</strong>
      </div>

      <CallWidget
        state={state}
        mode={mode}
        participants={state === 'active' ? mockParticipants : []}
        localParticipant={mockLocal}
        callerName="Sarah Chen"
        duration={state === 'active' ? duration : undefined}
        minimized={minimized}
        isMuted={isMuted}
        isCameraOn={isCameraOn}
        isScreenSharing={isScreenSharing}
        draggable
        onAnswer={() => {
          setState('connecting');
          setTimeout(() => setState('active'), 1200);
        }}
        onDecline={() => setState('idle')}
        onEndCall={() => { setState('idle'); setMinimized(false); }}
        onToggleMute={() => setIsMuted(m => !m)}
        onToggleCamera={() => setIsCameraOn(c => !c)}
        onToggleScreenShare={() => setIsScreenSharing(s => !s)}
        onUpgradeToVideo={() => setMode('video')}
        onAddParticipant={() => console.log('[CallWidget] Add participant')}
        onMinimize={() => setMinimized(m => !m)}
      />
    </div>
  );
}

export default function CallWidgetDemo() {
  return (
    <div>
      <PageHeader
        title="Call Widget"
        description="Floating, draggable audio/video call widget. Supports incoming calls, active call controls (mute, camera, screen share, add participants), minimized pill view, and upgrade from audio to video. Designed for embedding in any app — position it in a corner and drag it anywhere."
        importPath="import { CallWidget } from '@connorhoehn/ui-components/video'"
      />

      <ExampleBlock
        id="call-widget-live"
        title="Interactive Demo"
        description="Click a button to trigger different call states. The widget appears in the bottom-right corner and can be dragged. Try minimizing it, toggling mute, or upgrading from audio to video."
        code={`<CallWidget
  state="active"
  mode="audio"
  participants={participants}
  localParticipant={localUser}
  duration={elapsed}
  isMuted={isMuted}
  isCameraOn={isCameraOn}
  draggable
  onToggleMute={() => setIsMuted(m => !m)}
  onToggleCamera={() => setIsCameraOn(c => !c)}
  onUpgradeToVideo={() => setMode('video')}
  onAddParticipant={() => openPicker()}
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
  onAnswer={() => joinCall()}
  onDecline={() => dismiss()}
/>`}
      >
        <div style={{ position: 'relative', minHeight: 240, background: '#0f172a', borderRadius: 8 }}>
          <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
            <div
              style={{ background: '#1e293b', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', width: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              <CallWidget
                state="ringing"
                mode="audio"
                participants={[]}
                callerName="Marcus Johnson"
                draggable={false}
                position="bottom-right"
                onAnswer={() => console.log('Answer')}
                onDecline={() => console.log('Decline')}
                style={{ position: 'static', transform: 'none' }}
                className="relative z-auto"
              />
            </div>
          </div>
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
  isMuted={false}
  onMinimize={() => setMinimized(m => !m)}
  onEndCall={() => endCall()}
/>`}
      >
        <div style={{ position: 'relative', minHeight: 80, background: '#0f172a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#1e293b', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', width: 260, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
            <CallWidget
              state="active"
              mode="audio"
              participants={mockParticipants.slice(0, 2)}
              duration={127}
              minimized
              isMuted={false}
              draggable={false}
              onToggleMute={() => console.log('Toggle mute')}
              onEndCall={() => console.log('End')}
              onMinimize={() => console.log('Expand')}
              style={{ position: 'static', transform: 'none' }}
              className="relative z-auto"
            />
          </div>
        </div>
      </ExampleBlock>
    </div>
  );
}
