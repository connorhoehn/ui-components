import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'danger-solid', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Click me' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete' },
};

export const DangerSolid: Story = {
  args: { variant: 'danger-solid', children: 'Delete permanently' },
};

/** Semantic colour is a `variant`, not a `tone` — `tone` already names the
 *  surface-vs-code family axis (see `CodeTone` below). Soft fill, same
 *  shape as `danger`. */
export const Success: Story = {
  args: { variant: 'success', children: 'Approve' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Small' },
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Large' },
};

export const Disabled: Story = {
  args: { variant: 'primary', children: 'Disabled', disabled: true },
};

export const FullWidth: Story = {
  args: { variant: 'primary', children: 'Full width', fullWidth: true },
  parameters: { layout: 'padded' },
};

/** The `code` family, for buttons on a terminal / log / debugger surface.
 *  Every bare `<button className="…">` in those files is there because this
 *  prop did not exist. */
export const CodeTone: Story = {
  args: { variant: 'primary', tone: 'code', children: 'run' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2 bg-code-bg p-4 rounded">
      <Button tone="code" variant="primary" size="sm">run</Button>
      <Button tone="code" variant="secondary" size="sm">detach</Button>
      <Button tone="code" variant="ghost" size="sm">+ new pane</Button>
      <Button tone="code" variant="danger" size="sm">kill</Button>
      <Button tone="code" variant="danger-solid" size="sm">destroy</Button>
      <Button tone="code" variant="success" size="sm">approve</Button>
    </div>
  ),
};
