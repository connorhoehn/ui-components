import type { Meta, StoryObj } from '@storybook/react-vite';
import { DetailHeader } from './DetailHeader';

const meta = {
  title: 'Shared/DetailHeader',
  component: DetailHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DetailHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `panel` (default): 14px, a panel's heading. */
export const Panel: Story = { args: { title: 'Takes' } };

/** `section` (since 2.545.0): 16px, a header inside a card that leads its own section. */
export const Section: Story = { args: { title: 'Takes', titleSize: 'section', as: 'h3' } };

/** `page`: 20px, the page-title size. */
export const Page: Story = { args: { title: 'Dot', titleSize: 'page', as: 'h1' } };
