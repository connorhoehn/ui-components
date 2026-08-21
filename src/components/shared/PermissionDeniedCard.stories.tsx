import type { Meta, StoryObj } from '@storybook/react-vite';
import PermissionDeniedCard from './PermissionDeniedCard';

const meta = {
  title: 'Shared/PermissionDeniedCard',
  component: PermissionDeniedCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PermissionDeniedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CameraDenied: Story = {
  args: { kind: 'camera', state: 'denied', onRetry: () => {} },
};

export const MicrophoneBlocked: Story = {
  args: {
    kind: 'microphone',
    state: 'blocked',
    message: 'NotAllowedError: Permission denied by system',
  },
};

export const ScreenUnavailable: Story = {
  args: { kind: 'screen', state: 'unavailable' },
};
