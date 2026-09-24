import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CanvasZoomControls } from './CanvasZoomControls';

function Live() {
  const [zoom, setZoom] = useState(1);
  return (
    <CanvasZoomControls
      zoom={zoom}
      minZoom={0.3}
      maxZoom={2}
      onZoomIn={() => setZoom((z) => Math.min(2, z * 1.2))}
      onZoomOut={() => setZoom((z) => Math.max(0.3, z / 1.2))}
      onFit={() => setZoom(1)}
    />
  );
}

const meta: Meta<typeof CanvasZoomControls> = {
  title: 'Graph/CanvasZoomControls',
  component: CanvasZoomControls,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof CanvasZoomControls>;

export const Default: Story = { render: () => <Live /> };

export const NoReadout: Story = { render: () => <CanvasZoomControls onZoomIn={() => {}} onZoomOut={() => {}} onFit={() => {}} /> };

export const AtLimit: Story = { render: () => <CanvasZoomControls zoom={2} maxZoom={2} onZoomIn={() => {}} onZoomOut={() => {}} onFit={() => {}} /> };

export const Dark: Story = {
  render: () => (
    <div data-theme="dark" className="bg-surface p-4">
      <Live />
    </div>
  ),
};
