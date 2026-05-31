import { useState, useEffect, useCallback } from 'react';
import { PageHeader, ExampleBlock, PropsTable, useRegisterToc } from '../shared';
import {
  VideoPlayer,
  StatsCard,
  NetworkQualityBadge,
  VideoGrid,
  ReactionOverlay,
  ReactionPicker,
  StatusStrip,
  ViewerCount,
} from '@/components/video';
import type {
  StreamMetrics,
  Reaction,
  Participant,
  NetworkQuality,
} from '@/components/video';

export default function VideoPage() {
  useRegisterToc([
    { id: 'video-player', label: 'VideoPlayer', level: 2 },
    { id: 'video-grid', label: 'VideoGrid', level: 2 },
    { id: 'reactions', label: 'Reactions', level: 2 },
    { id: 'stats-card', label: 'StatsCard', level: 2 },
    { id: 'network-quality', label: 'NetworkQualityBadge', level: 2 },
    { id: 'status-strip', label: 'StatusStrip', level: 2 },
    { id: 'viewer-count', label: 'ViewerCount', level: 2 },
    { id: 'props', label: 'Props Reference', level: 2 },
  ]);

  return (
    <div>
      <PageHeader
        title="Video"
        description="Components for building live video streaming, conferencing, and playback interfaces. Includes player, participant grid, reactions, stream health indicators, and broadcast controls. For the floating Call Widget, see the dedicated /components/call-widget page."
        importPath="import { VideoPlayer, VideoGrid, ... } from '@connorhoehn/ui-components/video'"
      />

      <VideoPlayerExample />
      <VideoGridExample />
      <ReactionsExample />
      <StatsCardExample />
      <NetworkQualityExample />
      <StatusStripExample />
      <ViewerCountExample />
      <PropsSection />
    </div>
  );
}

function VideoPlayerExample() {
  return (
    <ExampleBlock
      id="video-player"
      title="VideoPlayer"
      description="A video player with status overlays for different playback phases. Supports autoplay, looping, and external phase control."
      code={`<VideoPlayer
  src="/assets/sample.mp4"
  autoPlay
  muted
  loop
  onPhaseChange={(phase) => console.log(phase)}
/>`}
    >
      <div style={{ maxWidth: 500 }}>
        <VideoPlayer
          src="/assets/sample.mp4"
          autoPlay
          muted
          loop
        />
      </div>
    </ExampleBlock>
  );
}

function VideoGridExample() {
  const [participants] = useState<Participant[]>([
    { id: '1', displayName: 'Alice Chen', isSpeaking: true, isLocal: true },
    { id: '2', displayName: 'Bob Martinez', isMuted: true },
    { id: '3', displayName: 'Carol Johnson', isSpeaking: false },
    { id: '4', displayName: 'David Kim' },
    { id: '5', displayName: 'Eve Thompson', isMuted: true },
    { id: '6', displayName: 'Frank Li' },
  ]);

  return (
    <ExampleBlock
      id="video-grid"
      title="VideoGrid"
      description="Adaptive grid layout for video conferencing. Automatically adjusts columns based on participant count. Shows speaking indicators, mute status, and avatar fallbacks."
      code={`const participants = [
  { id: '1', displayName: 'Alice Chen', isSpeaking: true, isLocal: true },
  { id: '2', displayName: 'Bob Martinez', isMuted: true },
  { id: '3', displayName: 'Carol Johnson' },
  { id: '4', displayName: 'David Kim' },
];

<VideoGrid participants={participants} />`}
      background="#0f0f0f"
    >
      <VideoGrid participants={participants} style={{ maxWidth: 600 }} />
    </ExampleBlock>
  );
}

function ReactionsExample() {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  const handleReact = useCallback((emoji: string) => {
    setReactions(prev => [...prev, { id: crypto.randomUUID(), emoji }]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const emojis = ['👍', '❤️', '🔥', '😂', '👏', '🎉'];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      setReactions(prev => [...prev, { id: crypto.randomUUID(), emoji }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ExampleBlock
      id="reactions"
      title="Reactions"
      description="Floating emoji reactions that animate upward and fade out, plus a picker bar for sending reactions. Reactions auto-simulate every 2 seconds in this demo."
      code={`const [reactions, setReactions] = useState<Reaction[]>([]);

<div style={{ position: 'relative', height: 200 }}>
  <ReactionOverlay reactions={reactions} />
  <ReactionPicker
    onReact={(emoji) => setReactions(prev => [
      ...prev, { id: crypto.randomUUID(), emoji }
    ])}
  />
</div>`}
      background="#0f0f0f"
    >
      <div style={{ position: 'relative', height: 220, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
        <ReactionOverlay reactions={reactions} />
        <ReactionPicker onReact={handleReact} />
      </div>
    </ExampleBlock>
  );
}

function StatsCardExample() {
  const [metrics, setMetrics] = useState<StreamMetrics>({
    bitrateBps: 2_500_000,
    fps: 30,
    resolution: { width: 1920, height: 1080 },
    packetsLost: 12,
    jitter: 3.2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        bitrateBps: prev.bitrateBps + (Math.random() - 0.5) * 200_000,
        fps: Math.max(24, Math.min(60, prev.fps + Math.floor((Math.random() - 0.5) * 4))),
        packetsLost: prev.packetsLost + Math.floor(Math.random() * 3),
        jitter: Math.max(0, prev.jitter! + (Math.random() - 0.5) * 2),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ExampleBlock
      id="stats-card"
      title="StatsCard"
      description="Displays real-time stream metrics: bitrate, FPS, resolution, packet loss, and jitter. Updates reflect live WebRTC stats polling."
      code={`<StatsCard metrics={{
  bitrateBps: 2_500_000,
  fps: 30,
  resolution: { width: 1920, height: 1080 },
  packetsLost: 12,
  jitter: 3.2,
}} />`}
      background="#0f172a"
    >
      <div style={{ maxWidth: 240 }}>
        <StatsCard metrics={metrics} />
      </div>
    </ExampleBlock>
  );
}

function NetworkQualityExample() {
  const qualities: NetworkQuality[] = ['good', 'medium', 'poor', 'dead'];

  return (
    <ExampleBlock
      id="network-quality"
      title="NetworkQualityBadge"
      description="Visual indicator of stream connection quality, shown as signal bars with a color-coded label."
      code={`<NetworkQualityBadge quality="good" />
<NetworkQualityBadge quality="medium" />
<NetworkQualityBadge quality="poor" />
<NetworkQualityBadge quality="dead" />`}
      background="#1e293b"
    >
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {qualities.map(q => (
          <NetworkQualityBadge key={q} quality={q} />
        ))}
      </div>
    </ExampleBlock>
  );
}

function StatusStripExample() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <ExampleBlock
      id="status-strip"
      title="StatusStrip"
      description="Compact broadcast status indicator showing live state, bitrate, elapsed duration, and viewer count."
      code={`<StatusStrip phase="live" bitrateBps={2_500_000} viewerCount={842} duration={elapsed} />`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <StatusStrip phase="live" bitrateBps={2_500_000} viewerCount={842} duration={elapsed} />
        <StatusStrip phase="connecting" />
        <StatusStrip phase="error" />
      </div>
    </ExampleBlock>
  );
}

function ViewerCountExample() {
  return (
    <ExampleBlock
      id="viewer-count"
      title="ViewerCount"
      description="Displays the current number of live viewers with a compact badge."
      code={`<ViewerCount count={1342} />
<ViewerCount count={47} />`}
      background="#1e293b"
    >
      <div style={{ display: 'flex', gap: 12 }}>
        <ViewerCount count={1342} />
        <ViewerCount count={47} />
      </div>
    </ExampleBlock>
  );
}

function PropsSection() {
  return (
    <div id="props" style={{ marginTop: 48 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#0f172a' }}>Props Reference</h2>

      <PropsTable componentName="VideoPlayer" props={[
        { name: 'src', type: 'string', default: '—', description: 'Video source URL (MP4, HLS)' },
        { name: 'autoPlay', type: 'boolean', default: 'false', description: 'Start playing immediately' },
        { name: 'muted', type: 'boolean', default: 'true', description: 'Mute audio on load' },
        { name: 'loop', type: 'boolean', default: 'false', description: 'Loop playback' },
        { name: 'phase', type: 'PlayerPhase', default: '(auto)', description: 'Override player phase for controlled mode' },
        { name: 'onPhaseChange', type: '(phase) => void', default: '—', description: 'Callback on phase transitions' },
        { name: 'onTimeUpdate', type: '(time, duration) => void', default: '—', description: 'Periodic time update' },
      ]} />

      <PropsTable componentName="VideoGrid" props={[
        { name: 'participants', type: 'Participant[]', default: '[]', description: 'Array of participants to render' },
      ]} />

      <PropsTable componentName="Participant" props={[
        { name: 'id', type: 'string', required: true, description: 'Unique participant identifier' },
        { name: 'displayName', type: 'string', required: true, description: 'Name shown on tile' },
        { name: 'isSpeaking', type: 'boolean', default: 'false', description: 'Show speaking indicator' },
        { name: 'isMuted', type: 'boolean', default: 'false', description: 'Show mute icon' },
        { name: 'isLocal', type: 'boolean', default: 'false', description: 'Mark as local user ("You")' },
        { name: 'videoElement', type: 'ReactNode', default: '—', description: 'Custom video element to render in tile' },
      ]} />

      <PropsTable componentName="ReactionOverlay" props={[
        { name: 'reactions', type: 'Reaction[]', default: '[]', description: 'Reactions array; new entries trigger animation' },
      ]} />

      <PropsTable componentName="ReactionPicker" props={[
        { name: 'onReact', type: '(emoji: string) => void', required: true, description: 'Callback when user picks a reaction' },
        { name: 'emojis', type: 'string[]', default: "['👍','❤️','🔥',...]", description: 'Custom emoji set' },
      ]} />

      <PropsTable componentName="StatsCard" props={[
        { name: 'metrics', type: 'StreamMetrics | null', default: 'null', description: 'Current stream metrics object' },
      ]} />

      <PropsTable componentName="StatusStrip" props={[
        { name: 'phase', type: 'PlayerPhase | "live" | "reconnecting"', required: true, description: 'Current stream/broadcast phase' },
        { name: 'bitrateBps', type: 'number', description: 'Current bitrate in bits per second' },
        { name: 'viewerCount', type: 'number', description: 'Number of active viewers' },
        { name: 'duration', type: 'number', description: 'Elapsed seconds' },
      ]} />
    </div>
  );
}
