import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageFilmstrip } from './ImageFilmstrip';

const meta = {
  title: 'Shared/ImageFilmstrip',
  component: ImageFilmstrip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(S) => <div className="max-w-[560px]"><S /></div>],
} satisfies Meta<typeof ImageFilmstrip>;

export default meta;
type Story = StoryObj<typeof meta>;

const views = ['Full', 'Front', 'Side', 'Back', '¾', 'Top', 'Detail'].map((label, i) => ({
  id: label,
  label,
  src: `https://picsum.photos/seed/toby-view-${i}/${i === 0 ? '900/1200' : '600/800'}`,
  description: i === 0 ? 'v2 · approved 9:05' : undefined,
}));

/** Concepts §5: the approved concept whole, its views under it, "+2 more". */
export const ApprovedConcept: Story = {
  args: { items: views, caption: 'Approved concept · v2', maxThumbs: 5, onMore: () => {} },
};

export const FourViews: Story = {
  args: { items: views.slice(0, 4), aspect: 'portrait' },
};
