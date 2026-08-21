import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogGrid } from './CatalogGrid';

const tile = (label: string) => (
  <div
    key={label}
    className="rounded-lg border border-border bg-surface-panel p-6 text-sm text-text-secondary text-center"
  >
    {label}
  </div>
);

const meta = {
  title: 'Shared/CatalogGrid',
  component: CatalogGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CatalogGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
  args: { children: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map(tile) },
};

export const DenseFour: Story = {
  args: { columns: 4, dense: true, children: ['A', 'B', 'C', 'D'].map(tile) },
};
