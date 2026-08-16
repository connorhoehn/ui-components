import { useState, useEffect, useCallback } from 'react';
import {
  VideoPlayer,
  VideoGrid,
  ReactionOverlay,
  ReactionPicker,
  StatsCard,
  StatusStrip,
  ViewerCount,
  NetworkQualityBadge,
} from '@/components/video';
import type {
  Participant,
  Reaction,
  StreamMetrics,
  NetworkQuality,
} from '@/components/video';

const FAKE_NAMES = [
  'Alice Chen', 'Bob Martinez', 'Carol Johnson', 'David Kim',
  'Eve Thompson', 'Frank Li', 'Grace Park', 'Henry Wilson',
  'Iris Nakamura', 'Jake Robinson',
];

const EMOJI_POOL = ['👍', '❤️', '🔥', '😂', '👏', '🎉', '😮', '💯', '🚀', '✨'];

export default function VideoStreamingDemo() {
  const [participants, setParticipants] = useState<Participant[]>(() =>
    FAKE_NAMES.slice(0, 6).map((name, i) => ({
      id: String(i),
      displayName: name,
      isLocal: i === 0,
      isSpeaking: false,
      isMuted: i === 3 || i === 5,
    }))
  );

  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [viewerCount, setViewerCount] = useState(847);
  const [elapsed, setElapsed] = useState(0);
  const [metrics, setMetrics] = useState<StreamMetrics>({
    bitrateBps: 2_500_000,
    fps: 30,
    resolution: { width: 1920, height: 1080 },
    packetsLost: 0,
    jitter: 2.1,
  });
  const [quality, setQuality] = useState<NetworkQuality>('good');

  // Simulate speaking changes
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants(prev => prev.map(p => ({
        ...p,
        isSpeaking: Math.random() < 0.2,
      })));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Simulate incoming reactions
  useEffect(() => {
    const interval = setInterval(() => {
      const emoji = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
      const name = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
      setReactions(prev => [...prev, { id: crypto.randomUUID(), emoji, displayName: name }]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Simulate viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor((Math.random() - 0.4) * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Elapsed timer
  useEffect(() => {
    const interval = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate metrics fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newBitrate = Math.max(500_000, prev.bitrateBps + (Math.random() - 0.5) * 300_000);
        const newFps = Math.max(24, Math.min(60, prev.fps + Math.floor((Math.random() - 0.5) * 4)));
        const newJitter = Math.max(0, (prev.jitter ?? 2) + (Math.random() - 0.5) * 1.5);

        const q: NetworkQuality = newBitrate > 2_000_000 && newFps >= 28 ? 'good'
          : newBitrate > 1_000_000 ? 'medium' : 'poor';
        setQuality(q);

        return {
          bitrateBps: newBitrate,
          fps: newFps,
          resolution: prev.resolution,
          packetsLost: prev.packetsLost + Math.floor(Math.random() * 2),
          jitter: newJitter,
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulate participants joining/leaving
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants(prev => {
        if (prev.length < 9 && Math.random() > 0.6) {
          const name = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
          if (prev.find(p => p.displayName === name)) return prev;
          return [...prev, { id: crypto.randomUUID(), displayName: name, isSpeaking: false }];
        }
        if (prev.length > 3 && Math.random() > 0.7) {
          const idx = 1 + Math.floor(Math.random() * (prev.length - 1));
          return prev.filter((_, i) => i !== idx);
        }
        return prev;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleReact = useCallback((emoji: string) => {
    setReactions(prev => [...prev, { id: crypto.randomUUID(), emoji, userId: 'local', displayName: 'You' }]);
  }, []);

  return (
    <div className="flex h-full bg-[#0a0a0f] text-border">
      {/* Main video area */}
      <div className="flex-[1] flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 px-4 border-b border-[#1e293b]">
          <div className="flex items-center gap-3">
            <StatusStrip phase="live" bitrateBps={metrics.bitrateBps} viewerCount={viewerCount} duration={elapsed} />
          </div>
          <div className="flex items-center gap-2">
            <NetworkQualityBadge quality={quality} />
          </div>
        </div>

        {/* Video player with reactions */}
        <div className="flex-[1] relative flex items-center justify-center p-4">
          <div className="relative w-full max-w-200">
            <VideoPlayer
              src="/assets/sample.mp4"
              autoPlay
              muted
              loop
            />
            <ReactionOverlay reactions={reactions} />
            <ViewerCount className="absolute top-2 left-2" count={viewerCount} />
          </div>
        </div>

        {/* Reaction picker */}
        <div className="flex justify-center py-2 px-4 border-t border-[#1e293b]">
          <ReactionPicker onReact={handleReact} />
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-75 border-l border-[#1e293b] flex flex-col overflow-hidden">
        {/* Participants grid */}
        <div className="flex-[1] p-3 overflow-auto">
          <div className="text-[12px] font-semibold text-text-tertiary mb-2 uppercase tracking-[0.5px]">
            Participants ({participants.length})
          </div>
          <VideoGrid participants={participants} />
        </div>

        {/* Stats panel */}
        <div className="p-3 border-t border-[#1e293b]">
          <div className="text-[12px] font-semibold text-text-tertiary mb-2 uppercase tracking-[0.5px]">
            Stream Stats
          </div>
          <StatsCard metrics={metrics} />
        </div>
      </div>
    </div>
  );
}
