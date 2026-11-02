import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Stack } from '../ui/Stack';
import { Button } from '../ui/Button';
import { MediaPlaybackDock, type PlaybackSource } from './MediaPlaybackDock';

// A local generated tone, no network or personal production audio in Storybook.
function tone() {
  const bytes = new Uint8Array(44 + 16000), v = new DataView(bytes.buffer);
  const text = (at: number, s: string) => [...s].forEach((c, i) => bytes[at + i] = c.charCodeAt(0));
  text(0, 'RIFF'); v.setUint32(4, bytes.length - 8, true); text(8, 'WAVEfmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, 8000, true); v.setUint32(28, 8000, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true);
  text(36, 'data'); v.setUint32(40, 16000, true);
  for (let i = 44; i < bytes.length; i++) bytes[i] = 128 + Math.round(15 * Math.sin((i - 44) * Math.PI * 440 / 4000));
  return `data:audio/wav;base64,${btoa(String.fromCharCode(...bytes))}`;
}
const meta = { title: 'Video/MediaPlaybackDock', component: MediaPlaybackDock, tags: ['autodocs'], parameters: { layout: 'fullscreen' } } satisfies Meta<typeof MediaPlaybackDock>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Idle: Story = { args: { status: <span className="text-xs text-text-secondary">Local files connected</span> } };
export const Audio: Story = { args: { source: { id: 'tone', src: tone(), kind: 'audio', title: 'Example tone', subtitle: 'Generated locally · two seconds' } } };
export const Narrow: Story = { ...Audio, decorators: [Story => <div className="w-[360px]"><Story /></div>] };
export const MissingVideo: Story = { args: { source: { id: 'missing', src: '/missing-preview.mp4', kind: 'video', title: 'Missing video', subtitle: 'Visible error; never reported as playing' } } };
export const PersistentFooter: Story = { render: () => {
  const [source, setSource] = useState<PlaybackSource | null>(null);
  return <Stack gap="none" className="h-[600px]">
    <div className="min-h-0 flex-1 overflow-auto p-4"><Button onClick={() => setSource({ id: 'tone', src: tone(), kind: 'audio', title: 'Example tone' })}>Play example</Button>
      {Array.from({ length: 30 }, (_, i) => <p key={i}>Scrollable source record {i + 1}</p>)}
    </div><MediaPlaybackDock source={source} autoPlay onClose={() => setSource(null)} />
  </Stack>;
} };
