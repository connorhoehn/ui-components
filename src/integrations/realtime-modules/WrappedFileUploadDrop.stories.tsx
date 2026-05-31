// src/integrations/realtime-modules/WrappedFileUploadDrop.stories.tsx
//
// Demonstrates WrappedFileUploadDrop wired to mocked useFileUpload() returns
// across the upload lifecycle: idle, in-flight, completed, scanning, failed.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { WrappedFileUploadDrop } from './WrappedFileUploadDrop';
import type {
  RMFileUploadState,
  RMUseFileUploadReturn,
} from './types';

const noop = () => {};

function makeFileUpload(
  uploads: RMFileUploadState[],
): RMUseFileUploadReturn {
  return {
    uploads,
    upload: async () => uploads[uploads.length - 1] ?? mockState('idle', 'completed'),
    cancel: noop,
    removeCompleted: noop,
  };
}

function mockState(
  id: string,
  status: RMFileUploadState['status'],
  overrides: Partial<RMFileUploadState> = {},
): RMFileUploadState {
  return {
    id,
    filename: `${id}.png`,
    size: 240_512,
    status,
    progress:
      status === 'uploading' ? 47 : status === 'completed' ? 100 : undefined,
    downloadUrl: status === 'completed' ? `https://example.com/${id}.png` : undefined,
    error: status === 'failed' ? 'Network timed out' : undefined,
    ...overrides,
  };
}

const meta = {
  title: 'Integrations/WrappedFileUploadDrop',
  component: WrappedFileUploadDrop,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'FileUploadDrop pre-wired to a `useFileUpload()` hook return from realtime-modules. ' +
          'Bridges the drag-drop surface to `upload()` and renders a live progress list ' +
          'beneath. The stories below cover each visible lifecycle state.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '28rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WrappedFileUploadDrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  name: 'Idle (no uploads)',
  args: {
    fileUpload: makeFileUpload([]),
    label: 'Drop files here or click to select',
    multiple: true,
  },
};

export const Uploading: Story = {
  name: 'Uploading (one in-flight)',
  args: {
    fileUpload: makeFileUpload([
      mockState('design-spec', 'uploading'),
    ]),
    label: 'Drop files here or click to select',
    multiple: true,
  },
};

export const Scanning: Story = {
  name: 'Scanning (virus scan in progress)',
  args: {
    fileUpload: makeFileUpload([
      mockState('uploaded-file', 'scanning'),
    ]),
    label: 'Drop files here or click to select',
  },
};

export const Mixed: Story = {
  name: 'Mixed states (uploading + completed + failed)',
  args: {
    fileUpload: makeFileUpload([
      mockState('hero-asset', 'completed', { filename: 'hero-asset.png' }),
      mockState('logo-v2', 'uploading', { filename: 'logo-v2.svg' }),
      mockState('crash-report', 'failed', { filename: 'crash-report.zip' }),
    ]),
    label: 'Drop files here or click to select',
    multiple: true,
  },
};

export const Disabled: Story = {
  name: 'Disabled (capability denied or read-only)',
  args: {
    fileUpload: makeFileUpload([]),
    label: 'Uploads are disabled for this channel',
    disabled: true,
  },
};
