import type { Meta, StoryObj } from '@storybook/react-vite';
import ConfirmDialog from './ConfirmDialog';

const meta = {
  title: 'Shared/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Info: Story = {
  args: {
    open: true,
    onConfirm: noop,
    onCancel: noop,
    title: 'Apply changes?',
    body: 'These changes will affect all pipelines in this project.',
  },
};

export const Destructive: Story = {
  args: {
    open: true,
    tone: 'destructive',
    onConfirm: noop,
    onCancel: noop,
    title: 'Delete pipeline?',
    body: 'This will permanently remove the pipeline and its run history.',
    confirmLabel: 'Delete',
  },
};

export const Caution: Story = {
  args: {
    open: true,
    tone: 'caution',
    onConfirm: noop,
    onCancel: noop,
    title: 'Pause all pipelines?',
    body: 'In-flight runs will continue, but no new runs will start.',
    confirmLabel: 'Pause all',
  },
};

export const ConfirmDisabled: Story = {
  args: {
    open: true,
    tone: 'destructive',
    confirmDisabled: true,
    onConfirm: noop,
    onCancel: noop,
    title: 'Delete pipeline?',
    body: 'Type DELETE in the input below to enable.',
    confirmLabel: 'Delete',
  },
};
