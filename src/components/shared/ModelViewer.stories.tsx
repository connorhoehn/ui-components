import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModelViewer, type ModelChannelView } from './ModelViewer';
import { Card } from '../ui/Card';
import cubeUrl from './__fixtures__/cube.glb?url';
import cubePartsUrl from './__fixtures__/cube-parts.glb?url';
import cubeBaseColorUrl from './__fixtures__/cube-basecolor.png?url';
import gradientMapUrl from './__fixtures__/gradient-map.png?url';

// A concept "drawing" of the cube for the reference pane.
const concept = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="ivory"/>' +
    '<path d="M60 18 98 38v44L60 102 22 82V38z" fill="lightsteelblue" stroke="slategray" stroke-width="2"/>' +
    '<path d="M60 18 98 38 60 58 22 38z" fill="lavender" stroke="slategray" stroke-width="2"/>' +
    '<path d="M60 58v44" stroke="slategray" stroke-width="2"/></svg>',
)}`;

const meta = {
  title: 'Shared/ModelViewer',
  component: ModelViewer,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
} satisfies Meta<typeof ModelViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

// The turntable beside its concept image: two up from a 28rem container,
// stacked below that, both frames the same height. Drag to orbit.
export const Default: Story = {
  args: {
    src: cubeUrl,
    poster: cubeBaseColorUrl,
    alt: 'A checkered cube',
    label: 'Generated model',
    reference: { src: concept, label: 'Concept', alt: 'Concept drawing of the cube' },
    'data-testid': 'model-default',
  },
};

// Lit, the model's own embedded maps (base colour, normal) and an external
// roughness map passed as a URL — its thumbnail shows beside the toggle.
export const Channels: Story = {
  args: {
    src: cubeUrl,
    alt: 'A checkered cube',
    channels: { roughness: { src: gradientMapUrl, label: 'Roughness' } },
    'data-testid': 'model-channels',
  },
  render: (args) => {
    const [channel, setChannel] = useState<ModelChannelView>('lit');
    return <ModelViewer {...args} channel={channel} onChannelChange={setChannel} />;
  },
};

// Named parts of the GLB (nodes "body" and "legs"): hover or focus a part to
// light it on the mesh, click to select it, click again to clear.
export const Parts: Story = {
  args: {
    src: cubePartsUrl,
    alt: 'A two-part model',
    autoRotate: false,
    parts: [
      { id: 'body', label: 'Body', color: '#f59e0b' },
      { id: 'legs', label: 'Legs', color: '#06b6d4' },
    ],
    'data-testid': 'model-parts',
  },
  render: (args) => {
    const [part, setPart] = useState<string | null>(null);
    return <ModelViewer {...args} selectedPart={part} onSelectPart={setPart} />;
  },
};

export const Versions: Story = {
  args: {
    src: cubeUrl,
    alt: 'A checkered cube',
    aspect: 'landscape',
    versions: [
      { id: 'v3', label: 'Version 3', description: 'Regenerated with the new concept · today', current: true },
      { id: 'v2', label: 'Version 2', description: 'Retopologised · yesterday' },
      { id: 'v1', label: 'Version 1', description: 'First generation · 3 days ago' },
    ],
    onOpenVersion: (id) => console.log('open version', id),
    onSnapshot: (png) => console.log('snapshot', png.size, 'bytes'),
  },
};

// Inside a card: no frame of its own, on the dark media stage.
export const FramelessDark: Story = {
  args: { src: cubeUrl, alt: 'A checkered cube', frameless: true, tone: 'dark', aspect: 'wide' },
  render: (args) => (
    <Card>
      <ModelViewer {...args} />
    </Card>
  ),
};

export const InsetTone: Story = {
  args: { src: cubeUrl, alt: 'A checkered cube', tone: 'inset', reference: { src: concept } },
};

export const LoadError: Story = {
  args: { src: '/does-not-exist.glb', poster: cubeBaseColorUrl, alt: 'Missing model' },
};
