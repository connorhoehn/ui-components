import type { Meta, StoryObj } from '@storybook/react-vite';
import { TitleCard } from './TitleCard';
import { IconButton } from '../ui/IconButton';
import { EditIcon } from '../ui/Icons';

const meta = {
  title: 'Shared/TitleCard',
  component: TitleCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TitleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const image = { src: 'https://picsum.photos/seed/titlecard/1280/720', alt: 'An office floor at dusk' };

/** A show's title card: wide, title, tagline and meta bottom-left on the picture. */
export const Default: Story = {
  args: { title: 'Little Office', tagline: 'Everyone has a desk, nobody has a plan.', meta: '6 episodes · Season 1', image },
};

/** With an action top-right, as a banner. */
export const BannerWithActions: Story = {
  args: {
    title: 'Little Office',
    tagline: 'Everyone has a desk, nobody has a plan.',
    image,
    aspect: 'banner',
    actions: <IconButton size="sm" variant="ghost" aria-label="Edit title card" icon={<EditIcon />} onClick={() => {}} />,
  },
};

/** Title only. */
export const TitleOnly: Story = { args: { title: 'Episode 3: The Printer', image, aspect: 'landscape', as: 'h1' } };
