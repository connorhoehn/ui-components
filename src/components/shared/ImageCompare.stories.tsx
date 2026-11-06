import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageCompare } from './ImageCompare';
import { StatusPill } from './StatusPill';

const meta = {
  title: 'Shared/ImageCompare',
  component: ImageCompare,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ImageCompare>;

export default meta;
type Story = StoryObj<typeof meta>;

// Different source orientations on purpose: the shared frame keeps every pane
// the same height. Click a pane (or Tab to it and press Enter) to open the
// lightbox, then use the arrow keys to flip between the images at full size.
export const ReferenceCurrentCandidate: Story = {
  args: {
    label: 'Driveway artwork comparison',
    images: [
      { src: 'https://picsum.photos/seed/compare-ref/800/1200', label: 'Reference', description: 'Uploaded with the brief' },
      { src: 'https://picsum.photos/seed/compare-cur/1200/800', label: 'Current', description: 'v2 · approved', meta: <StatusPill size="sm" state="success" label="In use" /> },
      { src: 'https://picsum.photos/seed/compare-new/1200/900', label: 'Candidate', description: 'v3 · just generated', meta: <StatusPill size="sm" state="warning" label="Needs review" /> },
    ],
  },
};

export const TwoUp: Story = {
  args: {
    images: [
      { src: 'https://picsum.photos/seed/compare-a/1200/800', label: 'Before' },
      { src: 'https://picsum.photos/seed/compare-b/1200/800', label: 'After' },
    ],
    aspect: 'wide',
  },
};

// In a narrow container (an inspector column) the panes stack — the layout
// follows the component's width, not the viewport's.
export const NarrowContainerStacks: Story = {
  args: ReferenceCurrentCandidate.args,
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export const NotZoomable: Story = {
  args: { ...TwoUp.args, zoomable: false, fit: 'cover' },
};
