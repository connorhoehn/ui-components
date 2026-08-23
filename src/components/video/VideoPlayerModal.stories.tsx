import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { VideoPlayerModal, type VideoPlayerSource } from './VideoPlayerModal';
import { Button } from '../ui/Button';

// What this component actually owns is the chrome around a raw <video>: the
// title block, the segment switcher, the download footer, and the
// backdrop/Escape dismissal. The stories exercise that chrome; the media area
// stays empty because no real MP4 is shipped with the library.

const SEGMENTS: VideoPlayerSource[] = [
  { url: '/recordings/hangout-42/recording_00001.mp4', label: 'Segment 1', sizeBytes: 18_400_000 },
  { url: '/recordings/hangout-42/recording_00002.mp4', label: 'Segment 2', sizeBytes: 22_100_000 },
  { url: '/recordings/hangout-42/recording_00003.mp4', sizeBytes: 4_900_000 },
];

const meta = {
  title: 'Video/VideoPlayerModal',
  component: VideoPlayerModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { onClose: () => console.log('close') },
} satisfies Meta<typeof VideoPlayerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One capture, with a title block and the download footer. */
export const SingleSource: Story = {
  args: {
    sources: [SEGMENTS[0]!],
    title: '#product-design',
    subtitle: 'May 30, 2026 · 3:30 PM · 18 minutes',
  },
};

/** Multiple segments add a switcher row. Segment 3 has no `label`, so it falls
 *  back to "Segment 3"; sizes surface as the button's tooltip. */
export const MultipleSegments: Story = {
  args: {
    sources: SEGMENTS,
    title: '#all-hands',
    subtitle: 'May 29, 2026 · 52 minutes across 3 segments',
  },
};

/** Chromeless: no title, no subtitle, no download — just the player and the
 *  backdrop. Use for private channels. */
export const Minimal: Story = {
  args: { sources: [SEGMENTS[0]!], hideDownload: true },
};

/** Both composition slots in use. */
export const WithHeaderAndFooterSlots: Story = {
  args: {
    sources: SEGMENTS,
    title: '#product-design',
    subtitle: 'May 30, 2026 · 3:30 PM',
    header: (
      <span className="text-[11px] px-2 py-1 rounded bg-success-bg text-success-fg">Transcribed</span>
    ),
    footer: <span>Recorded by Alice Johnson · retained 90 days</span>,
  },
};

/** Every source filtered out (empty URLs) — the modal says so rather than
 *  rendering a broken player. */
export const NoPlayableSources: Story = {
  args: { sources: [], title: '#product-design', subtitle: 'Recording failed to upload' },
};

/** The real usage: mounted conditionally by the caller. Escape and a backdrop
 *  click both fire `onClose`. */
export const OpenedFromButton: Story = {
  args: { sources: SEGMENTS },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-6">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Play recording
        </Button>
        {open && (
          <VideoPlayerModal
            {...args}
            title="#product-design"
            subtitle="May 30, 2026 · 3:30 PM"
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    );
  },
};
