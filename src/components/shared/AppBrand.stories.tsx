import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppBrand } from './AppBrand';
import { DocumentIcon } from '../ui/Icons';

const meta = {
  title: 'Shared/AppBrand',
  component: AppBrand,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof AppBrand>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The header's brand: mark, name at the identity size (16px), a link home. */
export const Default: Story = {
  args: { mark: <DocumentIcon />, name: 'Storymaker', secondary: 'Studio', href: '#/' },
};

/** A compact header: 24px mark, 14px name. */
export const Small: Story = {
  args: { mark: <DocumentIcon />, name: 'Storymaker', size: 'sm', href: '#/' },
};

/** No link, no mark: just the name. */
export const NameOnly: Story = {
  args: { name: 'Storymaker' },
};
