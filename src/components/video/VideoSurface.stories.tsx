import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, type ComponentProps } from 'react';
import { VideoSurface } from './VideoSurface';
import { VideoOverlayChip } from './VideoOverlayChip';
import { NetworkQualityBadge } from './NetworkQualityBadge';

// A VideoSurface is usually driven by a hook that owns the <video> element
// (a publisher assigning its camera, hls.js attaching a playlist). These
// stories stand in for that hook with a canvas test pattern captured as a
// MediaStream and assigned through `videoRef`, so nothing here passes
// `stream` unless the story is about the `stream` prop.

/** Draws a moving test pattern and returns its stream; stops on cleanup. */
function useTestPatternStream(): { start: () => MediaStream | null; stop: () => void } {
  const frame = useRef<number | null>(null);
  const stream = useRef<MediaStream | null>(null);
  return {
    start() {
      if (typeof document === 'undefined') return null;
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');
      if (!ctx || typeof canvas.captureStream !== 'function') return null;
      const css = getComputedStyle(document.documentElement);
      const bars = ['--color-primary', '--color-success', '--color-warning', '--color-danger', '--color-info', '--color-accent']
        .map((name) => css.getPropertyValue(name).trim())
        .filter(Boolean);
      const block = css.getPropertyValue('--color-video-stage').trim();
      let t = 0;
      const draw = () => {
        bars.forEach((colour, i) => {
          ctx.fillStyle = colour;
          ctx.fillRect((i * canvas.width) / bars.length, 0, canvas.width / bars.length, canvas.height);
        });
        ctx.fillStyle = block;
        ctx.fillRect(((t * 4) % (canvas.width + 80)) - 80, canvas.height / 2 - 40, 80, 80);
        t += 1;
        frame.current = requestAnimationFrame(draw);
      };
      draw();
      stream.current = canvas.captureStream(30);
      return stream.current;
    },
    stop() {
      if (frame.current != null) cancelAnimationFrame(frame.current);
      stream.current?.getTracks().forEach((track) => track.stop());
    },
  };
}

/** Stands in for a hook: assigns the pattern to `srcObject` through the ref. */
function HookDrivenSurface(props: Omit<ComponentProps<typeof VideoSurface>, 'videoRef' | 'stream'>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pattern = useTestPatternStream();
  useEffect(() => {
    const el = videoRef.current;
    const stream = pattern.start();
    if (el && stream) {
      el.srcObject = stream;
      void el.play().catch(() => undefined);
    }
    return () => {
      if (el) el.srcObject = null;
      pattern.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <VideoSurface {...props} videoRef={videoRef} />;
}

const meta = {
  title: 'Video/VideoSurface',
  component: VideoSurface,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VideoSurface>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A camera preview the way a publisher hook drives it: the hook owns
 *  `srcObject` through `videoRef`; the surface supplies the frame, a stat
 *  chip (press it for the counters) and the network-quality badge. */
export const HookDrivenPreview: Story = {
  render: () => (
    <HookDrivenSurface
      label="Camera preview"
      muted
      mirrored
      bottomLeft={
        <VideoOverlayChip mono details="bytes: 1,204,331 · packets: 1,022 · lost: 3">
          2.4 Mb/s · 30 fps · loss 0.3%
        </VideoOverlayChip>
      }
      topRight={<NetworkQualityBadge quality="good" />}
    />
  ),
};

/** A player with native controls: the bottom slots sit above the control bar. */
export const WithControls: Story = {
  render: () => (
    <HookDrivenSurface
      label="Live playback"
      muted
      controls
      topLeft={<VideoOverlayChip tone="success" live>● live (HLS)</VideoOverlayChip>}
      bottomRight={<VideoOverlayChip mono>latency 2.1 s</VideoOverlayChip>}
    />
  ),
};

/** Nothing attached yet: the placeholder covers the stage. */
export const Empty: Story = { args: { state: 'empty', placeholder: 'Select a channel to watch' } };

/** A source is attaching: a spinner and label over the video. */
export const Loading: Story = { args: { state: 'loading', loadingLabel: 'Buffering…' } };

/** The source failed: an alert over the stage. Corner chips still show. */
export const ErrorState: Story = {
  name: 'Error',
  args: {
    state: 'error',
    error: 'Playlist not found (404)',
    topLeft: <VideoOverlayChip tone="danger">failed</VideoOverlayChip>,
  },
};

/** Every slot filled, to check they never collide. */
export const AllSlots: Story = {
  args: {
    state: 'empty',
    placeholder: ' ',
    topLeft: <VideoOverlayChip>top left</VideoOverlayChip>,
    topRight: <NetworkQualityBadge quality="medium" />,
    bottomLeft: <VideoOverlayChip mono>bottom left</VideoOverlayChip>,
    bottomRight: <VideoOverlayChip tone="info">bottom right</VideoOverlayChip>,
    center: <VideoOverlayChip tone="warning">centre</VideoOverlayChip>,
  },
};

/** Portrait frame with `fit="cover"`, as a phone tile. */
export const PortraitCover: Story = {
  decorators: [
    (Story) => (
      <div className="h-96">
        <Story />
      </div>
    ),
  ],
  render: () => <HookDrivenSurface aspect="portrait" fit="cover" muted label="Portrait preview" />,
};
