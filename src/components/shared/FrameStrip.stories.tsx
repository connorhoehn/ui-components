import type { Meta, StoryObj } from '@storybook/react-vite';
import { FrameStrip, type FrameStripFrame } from './FrameStrip';

// 20 frames of a ball bouncing across the frame, drawn as SVG data URIs.
const N = 20;
function ball(i: number, size = 120) {
  const t = i / (N - 1);
  const x = 14 + t * 92;
  const y = 100 - Math.abs(Math.sin(t * Math.PI * 2)) * 70;
  const squash = y > 96 ? 0.8 : 1;
  return (
    `<g><rect width="${size}" height="${size}" fill="aliceblue"/>` +
    `<rect y="106" width="${size}" height="14" fill="lightsteelblue"/>` +
    `<ellipse cx="${x.toFixed(1)}" cy="${(y + 2).toFixed(1)}" rx="${(10 / squash).toFixed(1)}" ry="${(10 * squash).toFixed(1)}" fill="tomato" stroke="firebrick" stroke-width="1.5"/>` +
    `<text x="6" y="16" font-family="sans-serif" font-size="11" fill="slategray">${i + 1}</text></g>`
  );
}
const svg = (body: string, w = 120, h = 120) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${body}</svg>`)}`;

const frames: FrameStripFrame[] = Array.from({ length: N }, (_, i) => ({
  src: svg(ball(i)),
  label: `Frame ${i + 1}`,
  alt: `Ball, frame ${i + 1} of ${N}`,
}));

// One image of all 20 frames, 5 across.
const contactSheet = svg(
  Array.from({ length: N }, (_, i) => `<g transform="translate(${(i % 5) * 120} ${Math.floor(i / 5) * 120})">${ball(i)}</g>`).join(''),
  600,
  480,
);

const meta = {
  title: 'Shared/FrameStrip',
  component: FrameStrip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
} satisfies Meta<typeof FrameStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Focus the strip: Left/Right step, Home/End jump, Space plays.
export const Default: Story = {
  args: { frames, label: 'Ball bounce', 'data-testid': 'frames-default' },
};

export const WithContactSheet: Story = {
  args: { frames, label: 'Ball bounce', contactSheet: { src: contactSheet, alt: 'All 20 frames' }, 'data-testid': 'frames-sheet' },
};

export const AutoPlayWide: Story = {
  args: { frames, autoPlay: true, fps: 8, aspect: 'landscape' },
};

// A 390px column: the thumbnail row scrolls inside the strip, never widening it.
export const NarrowColumn: Story = {
  args: { frames, label: 'Ball bounce', 'data-testid': 'frames-narrow' },
  decorators: [(Story) => <div className="w-[390px] max-w-full" data-testid="frames-narrow-column"><Story /></div>],
};
