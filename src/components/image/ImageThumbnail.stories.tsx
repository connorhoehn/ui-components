import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageThumbnail } from './ImageThumbnail';

const SAMPLE_SRC = 'https://picsum.photos/seed/thumb/400/400';
const BROKEN_SRC = 'https://this-domain-does-not-exist.invalid/image.jpg';

const meta = {
  title: 'Image/ImageThumbnail',
  component: ImageThumbnail,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    aspectRatio: { control: 'radio', options: ['square', 'video', 'auto'] },
    rounded: { control: 'boolean' },
    loading: { control: 'radio', options: ['lazy', 'eager'] },
  },
} satisfies Meta<typeof ImageThumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { src: SAMPLE_SRC, alt: 'Sample photo', size: 'md', aspectRatio: 'square' },
};

export const Small: Story = {
  args: { src: SAMPLE_SRC, alt: 'Small thumbnail', size: 'sm' },
};

export const Large: Story = {
  args: { src: SAMPLE_SRC, alt: 'Large thumbnail', size: 'lg' },
};

export const VideoAspect: Story = {
  args: {
    src: 'https://picsum.photos/seed/video/640/360',
    alt: 'Video thumbnail',
    size: 'lg',
    aspectRatio: 'video',
  },
};

export const RoundedAvatar: Story = {
  args: {
    src: 'https://picsum.photos/seed/avatar/200/200',
    alt: 'Avatar',
    size: 'sm',
    aspectRatio: 'square',
    rounded: true,
  },
};

export const BrokenSrc: Story = {
  args: {
    src: BROKEN_SRC,
    alt: 'Broken image',
    size: 'md',
    loading: 'eager',
  },
};

export const CustomFallback: Story = {
  args: {
    src: BROKEN_SRC,
    alt: 'Custom fallback',
    size: 'md',
    loading: 'eager',
    fallback: (
      <div className="flex flex-col items-center gap-1 text-slate-400">
        <span className="text-2xl">📷</span>
        <span className="text-xs">No image</span>
      </div>
    ),
  },
};

export const AllSizes: StoryObj = {
  render: () => (
    <div className="flex items-end gap-4">
      <ImageThumbnail src={SAMPLE_SRC} alt="sm" size="sm" loading="eager" />
      <ImageThumbnail src={SAMPLE_SRC} alt="md" size="md" loading="eager" />
      <ImageThumbnail src={SAMPLE_SRC} alt="lg" size="lg" loading="eager" />
    </div>
  ),
};
