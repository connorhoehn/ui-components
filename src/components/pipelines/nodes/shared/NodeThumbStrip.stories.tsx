import type { Meta, StoryObj } from '@storybook/react-vite';
import { NodeThumbStrip } from './NodeThumbStrip';
import { PipelineEditorServicesProvider } from '../../services';

// Storybook host: resolve imageIds straight to picsum seeds.
const services = {
  getImageUrl: (imageId: string) => `https://picsum.photos/seed/${imageId}/300/300`,
};

function imgs(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    imageId: `strip-${i}`,
    alt: `Result image ${i + 1}`,
  }));
}

const meta = {
  title: 'Pipelines/NodeThumbStrip',
  component: NodeThumbStrip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <PipelineEditorServicesProvider services={services}>
        {/* Node-card width context — strips live inside 200px cards */}
        <div className="w-[200px] rounded-lg border border-border bg-white p-3">
          <Story />
        </div>
      </PipelineEditorServicesProvider>
    ),
  ],
} satisfies Meta<typeof NodeThumbStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleImage: Story = {
  args: { images: imgs(1) },
};

export const FullRowNoOverflow: Story = {
  args: { images: imgs(4) },
};

export const WithOverflow: Story = {
  args: { images: imgs(9) },
};

export const CustomMax: Story = {
  args: { images: imgs(6), max: 3 },
};
