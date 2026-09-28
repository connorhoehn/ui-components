import type { Meta, StoryObj } from '@storybook/react-vite';
import { Highlight } from './Highlight';

const meta = {
  title: 'Shared/Highlight', component: Highlight, tags: ['autodocs'],
  args: { text: 'Programmatic access to the design system: typed component contracts, versioned release channels.', terms: ['component contracts', 'release'] },
} satisfies Meta<typeof Highlight>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoMatch: Story = { args: { terms: ['kubernetes'] } };
export const Dark: Story = { decorators: [(Story) => <div data-theme="dark" className="bg-surface p-4 text-text-primary"><Story /></div>] };
