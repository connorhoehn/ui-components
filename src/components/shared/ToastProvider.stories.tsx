import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from './ToastProvider';
import { Button } from '../ui/Button';

function Demo() {
  const { toast } = useToast();
  return (
    <div className="flex gap-2 p-8">
      <Button size="sm" onClick={() => toast('Saved', { type: 'success' })}>Success</Button>
      <Button size="sm" variant="secondary" onClick={() => toast('Heads up', { type: 'warning' })}>Warning</Button>
      <Button size="sm" variant="danger" onClick={() => toast('Failed to sync', { type: 'error', actionLabel: 'Retry', onAction: () => {} })}>
        Error + action
      </Button>
    </div>
  );
}

const meta = {
  title: 'Shared/ToastProvider',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
