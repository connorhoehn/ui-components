import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { AutoplayGate } from './AutoplayGate';

// Storybook can't reproduce real browser autoplay rejection (the iframe
// has a user-gesture chain after Storybook's own controls render), so
// these stories drive the chip via a wrapping demo that injects the
// blocked state directly. The real production flow is unchanged.

const meta = {
  title: 'Video/AutoplayGate',
  component: AutoplayGate,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof AutoplayGate>;

export default meta;
type Story = StoryObj<typeof meta>;

function makeBlankStream(): MediaStream {
  // A canvas-derived stream gives Storybook a renderable frame without
  // requiring camera/mic permissions.
  if (typeof document === 'undefined') return new MediaStream();
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 320, 180);
    grad.addColorStop(0, '#1e293b');
    grad.addColorStop(1, '#475569');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 320, 180);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText('remote tile', 12, 28);
  }
  const stream =
    (canvas as HTMLCanvasElement & { captureStream?: (fps: number) => MediaStream })
      .captureStream?.(0) ?? new MediaStream();
  return stream;
}

function ForcedBlocked() {
  // Simulate a blocked tile by overriding the wrapped <video>'s play()
  // to reject with NotAllowedError on first call, then resolve after
  // the chip click clears the gesture lock.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [stream] = useState(() => makeBlankStream());

  useEffect(() => {
    const root = wrapperRef.current;
    if (!root) return;
    let blocked = true;
    const video = root.querySelector('video') as HTMLVideoElement | null;
    if (!video) return;
    const originalPlay = video.play.bind(video);
    video.play = () => {
      if (blocked) {
        return Promise.reject(
          Object.assign(new Error('autoplay blocked (demo)'), { name: 'NotAllowedError' }),
        );
      }
      return originalPlay();
    };
    const onClickAnywhere = () => { blocked = false; };
    root.addEventListener('click', onClickAnywhere, { once: true });
    // Kick the effect by re-triggering the play attempt.
    video.dispatchEvent(new Event('loadedmetadata'));
    return () => root.removeEventListener('click', onClickAnywhere);
  }, [stream]);

  return (
    <div ref={wrapperRef} className="w-[320px] h-[180px] bg-black rounded overflow-hidden">
      <AutoplayGate stream={stream} />
    </div>
  );
}

const placeholderArgs = { stream: {} as MediaStream };

export const Blocked: Story = {
  args: placeholderArgs,
  render: () => <ForcedBlocked />,
};

export const CustomLabel: Story = {
  args: placeholderArgs,
  render: () => (
    <div className="w-[320px] h-[180px] bg-black rounded overflow-hidden">
      <AutoplayGate stream={makeBlankStream()} chipLabel="Click to start audio" />
    </div>
  ),
};

export const Playing: Story = {
  // Once the browser plays the canvas-captured stream successfully the
  // chip stays hidden — this story documents the steady-state appearance.
  args: placeholderArgs,
  render: () => (
    <div className="w-[320px] h-[180px] bg-black rounded overflow-hidden">
      <AutoplayGate stream={makeBlankStream()} muted />
    </div>
  ),
};
