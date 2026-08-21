import { useState, useEffect, useRef, useCallback } from 'react';
import { useEventSimulator } from '../../engine/EventSimulator';
import { SimulationControlsPanel } from '../../engine/SimulationControls';
import { CallWidget } from '@/components/video';
import Chip from '@/components/shared/Chip';
import type { CallWidgetState, CallMode, CallWidgetParticipant } from '@/components/video';
import { callWidgetTimeline } from './simulation';

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const USERS = {
  sarah: { id: 'sarah', displayName: 'Sarah Chen', avatarUrl: '' },
  marcus: { id: 'marcus', displayName: 'Marcus Johnson', avatarUrl: '' },
  alex: { id: 'alex', displayName: 'Alex Rivera', avatarUrl: '' },
  jordan: { id: 'jordan', displayName: 'Jordan Park', avatarUrl: '' },
  taylor: { id: 'taylor', displayName: 'Taylor Kim', avatarUrl: '' },
  local: { id: 'local', displayName: 'You', avatarUrl: '' },
};

const AVAILABLE_TO_ADD: CallWidgetParticipant[] = [
  { ...USERS.alex, isMuted: false, isSpeaking: false },
  { ...USERS.jordan, isMuted: false, isSpeaking: false },
  { ...USERS.taylor, isMuted: false, isSpeaking: false },
];

interface ChatMessage {
  id: string;
  sender: typeof USERS.sarah;
  text: string;
  time: string;
}

const CHANNELS = [
  { id: 'general', name: 'general', unread: 0 },
  { id: 'engineering', name: 'engineering', unread: 3 },
  { id: 'design', name: 'design', unread: 0 },
  { id: 'api-team', name: 'api-team', unread: 1, active: true },
  { id: 'random', name: 'random', unread: 0 },
];

const ONLINE_USERS = [USERS.sarah, USERS.marcus, USERS.alex];

// ---------------------------------------------------------------------------
// App Sidebar
// ---------------------------------------------------------------------------

function AppSidebar() {
  return (
    <div className="w-52 bg-code-surface border-r border-code-border flex flex-col shrink-0 h-full overflow-hidden">
      <div className="px-4 py-3 border-b border-code-border">
        <div className="text-[15px] font-bold text-text-inverse">Acme Workspace</div>
        <div className="text-[11px] text-neutral mt-0.5">4 members online</div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-4 py-1 text-[10px] font-bold text-neutral uppercase tracking-wider">
          Channels
        </div>
        {CHANNELS.map(ch => (
          <div
            key={ch.id}
            className={`flex items-center justify-between px-4 py-1.5 text-[13px] cursor-pointer border-l-[3px] ${
              ch.active
                ? 'text-text-inverse bg-primary/10 border-l-primary'
                : 'text-text-tertiary border-l-transparent hover:bg-white/5'
            }`}
          >
            <span># {ch.name}</span>
            {ch.unread > 0 && (
              <Chip tone="purple" size="xs" solid>{ch.unread}</Chip>
            )}
          </div>
        ))}

        <div className="px-4 py-1 mt-3 text-[10px] font-bold text-neutral uppercase tracking-wider">
          Online
        </div>
        {ONLINE_USERS.map(u => (
          <div key={u.id} className="flex items-center gap-2 px-4 py-1 text-[13px] text-text-tertiary">
            <span className="w-2 h-2 rounded-full bg-success shrink-0" />
            {u.displayName}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Message bubble
// ---------------------------------------------------------------------------

function MessageBubble({ sender, text, time, isLocal }: { sender: typeof USERS.sarah; text: string; time: string; isLocal?: boolean }) {
  const hue = sender.displayName.split('').reduce((h, c) => c.charCodeAt(0) + ((h << 5) - h), 0) % 360;
  return (
    <div className="flex gap-2.5 py-2 items-start">
      <div
        className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-semibold"
        style={{ background: isLocal ? 'var(--color-info)' : `hsl(${Math.abs(hue)}, 50%, 45%)` }}
      >
        {sender.displayName.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-semibold text-text-inverse">{sender.displayName}</span>
          <span className="text-[10px] text-neutral">{time}</span>
        </div>
        <p className="m-0 mt-0.5 text-[13px] text-text-disabled leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chat area
// ---------------------------------------------------------------------------

function ChatArea({ callActive, messages }: { callActive: boolean; messages: ChatMessage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setNewMsg('');
  };

  return (
    <div className="flex-1 flex flex-col h-full min-w-0">
      {/* Channel header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-code-border shrink-0">
        <div>
          <div className="text-[15px] font-semibold text-text-inverse"># api-team</div>
          <div className="text-[11px] text-neutral">Sarah, Marcus, Alex, and you</div>
        </div>
        {callActive && (
          <Chip tone="success" size="sm">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Call in progress
            </span>
          </Chip>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-3">
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            time={msg.time}
            isLocal={msg.sender.id === 'local'}
          />
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="px-5 py-3 border-t border-code-border shrink-0">
        <input
          type="text"
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-border-emphasis bg-surface-inverse text-text-inverse text-[13px] font-[inherit] outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main demo
// ---------------------------------------------------------------------------

export default function CallWidgetLiveDemo() {
  const [callState, setCallState] = useState<CallWidgetState>('idle');
  const [mode, setMode] = useState<CallMode>('audio');
  const [minimized, setMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [extraParticipants, setExtraParticipants] = useState<string[]>([]);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const msgCounter = useRef(0);

  const dispatch = useCallback((message: Record<string, unknown>) => {
    const { type, action } = message as { type: string; action: string };

    if (type === 'chat' && action === 'message') {
      const senderId = message.sender as keyof typeof USERS;
      const sender = USERS[senderId] || USERS.sarah;
      msgCounter.current += 1;
      setMessages(prev => [...prev, {
        id: String(msgCounter.current),
        sender,
        text: message.text as string,
        time: message.time as string,
      }]);
    }

    if (type === 'call') {
      switch (action) {
        case 'ring':
          setCallState('ringing');
          break;
        case 'answer':
          setCallState('connecting');
          break;
        case 'connected':
          setCallState('active');
          break;
        case 'speaking':
          setSpeakingId(message.speaker as string | null);
          break;
        case 'mute':
          setIsMuted(message.muted as boolean);
          break;
        case 'upgrade-video':
          setMode('video');
          break;
        case 'screen-share':
          setIsScreenSharing(message.sharing as boolean);
          break;
        case 'minimize':
          setMinimized(true);
          break;
        case 'expand':
          setMinimized(false);
          break;
        case 'end':
          setCallState('idle');
          setMinimized(false);
          setIsMuted(false);
          setIsScreenSharing(false);
          setMode('audio');
          setSpeakingId(null);
          break;
        case 'reset':
          setCallState('idle');
          setMinimized(false);
          setIsMuted(false);
          setIsScreenSharing(false);
          setMode('audio');
          setSpeakingId(null);
          setMessages([]);
          break;
      }
    }
  }, []);

  const controls = useEventSimulator(callWidgetTimeline, dispatch);
  const [lastDescription, setLastDescription] = useState<string | undefined>();

  useEffect(() => {
    if (callWidgetTimeline.events.length > 0 && controls.currentEventIndex > 0) {
      const lastIdx = controls.currentEventIndex - 1;
      if (lastIdx < callWidgetTimeline.events.length) {
        setLastDescription(callWidgetTimeline.events[lastIdx].description);
      }
    }
  }, [controls.currentEventIndex]);

  // Auto-play on mount
  useEffect(() => {
    controls.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const participants: CallWidgetParticipant[] = [
    { ...USERS.sarah, isMuted: false, isSpeaking: speakingId === 'sarah' },
    { ...USERS.marcus, isMuted: false, isSpeaking: speakingId === 'marcus' },
    ...extraParticipants.map(id => ({
      ...(USERS[id as keyof typeof USERS] || { id, displayName: id, avatarUrl: '' }),
      isMuted: false,
      isSpeaking: speakingId === id,
    })),
  ];

  const localParticipant: CallWidgetParticipant = {
    ...USERS.local,
    isMuted,
    isSpeaking: speakingId === 'local',
  };

  useEffect(() => {
    if (callState === 'active') {
      setDuration(0);
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [callState]);

  const handleAnswer = useCallback(() => {
    setCallState('connecting');
    setTimeout(() => setCallState('active'), 1500);
  }, []);

  const handleEndCall = useCallback(() => {
    setCallState('idle');
    setMinimized(false);
    setIsMuted(false);
    setIsScreenSharing(false);
    setMode('audio');
    setSpeakingId(null);
    setExtraParticipants([]);
  }, []);

  const handleAddParticipant = useCallback((participantId: string) => {
    if (extraParticipants.includes(participantId)) return;
    setExtraParticipants(prev => [...prev, participantId]);
    const user = USERS[participantId as keyof typeof USERS];
    if (user) {
      msgCounter.current += 1;
      setMessages(prev => [...prev, {
        id: String(msgCounter.current),
        sender: user,
        text: '\u{1F44B} Joined the call',
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      }]);
    }
  }, [extraParticipants]);

  const handleToggleScreenShare = useCallback(() => {
    setIsScreenSharing(s => {
      const next = !s;
      msgCounter.current += 1;
      setMessages(prev => [...prev, {
        id: String(msgCounter.current),
        sender: USERS.local,
        text: next ? '\u{1F4BB} Started sharing screen' : '\u{1F4BB} Stopped sharing screen',
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      }]);
      return next;
    });
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0 px-6 pt-4">
      <div className="mb-3">
        <h1 className="text-xl font-semibold text-text-primary m-0">Call Widget — Live Demo</h1>
        <p className="text-sm text-neutral mt-1 m-0 max-w-2xl">
          Simulated messaging app with a floating call widget. The simulation auto-plays a full call lifecycle — use the controls to pause, step, or adjust speed.
        </p>
      </div>

      {/* Simulated app — fills remaining space, contains the call widget */}
      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 flex bg-surface-inverse overflow-hidden">
          <AppSidebar />
          <ChatArea callActive={callState === 'active'} messages={messages} />
        </div>

        {/* The floating call widget — contained within the chat app */}
        <CallWidget
          state={callState}
          mode={mode}
          participants={participants}
          localParticipant={localParticipant}
          callerName="Sarah Chen"
          duration={callState === 'active' ? duration : undefined}
          minimized={minimized}
          isMuted={isMuted}
          isCameraOn={isCameraOn}
          isScreenSharing={isScreenSharing}
          draggable
          contained
          position="bottom-right"
          onAnswer={handleAnswer}
          onDecline={() => setCallState('idle')}
          onEndCall={handleEndCall}
          onToggleMute={() => setIsMuted(m => !m)}
          onToggleCamera={() => setIsCameraOn(c => !c)}
          onToggleScreenShare={handleToggleScreenShare}
          onUpgradeToVideo={() => setMode('video')}
          onAddParticipant={handleAddParticipant}
          availableParticipants={AVAILABLE_TO_ADD}
          onMinimize={() => setMinimized(m => !m)}
        />
      </div>

      {/* Simulation controls */}
      <SimulationControlsPanel controls={controls} eventDescription={lastDescription} />
    </div>
  );
}
