// src/integrations/realtime-modules/NewHangoutRoomDialog.stories.tsx
//
// Demonstrates the controlled "Create room" Modal. The dialog is rendered
// already open so its form is visible in the preview frame.

import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewHangoutRoomDialog } from './NewHangoutRoomDialog';
import type { RMCreateRoomInput, RMRoom } from './types';

const noop = () => {};

async function fakeCreate(input: RMCreateRoomInput): Promise<RMRoom> {
  return {
    orgId: 'org-1',
    roomId: 'room-fake',
    slug: input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: input.name,
    description: input.description,
    createdBy: 'u-self',
    createdAt: new Date().toISOString(),
    visibility: input.visibility ?? 'org',
    settings: {
      audioOnly: input.settings?.audioOnly ?? false,
      recordingEnabled: input.settings?.recordingEnabled ?? false,
      softCap: input.settings?.softCap ?? 12,
    },
    state: 'active',
    lastActiveAt: new Date().toISOString(),
  };
}

async function alwaysFail(): Promise<RMRoom> {
  await new Promise((r) => setTimeout(r, 300));
  throw new Error('Room name is already taken in this org.');
}

const meta = {
  title: 'Integrations/NewHangoutRoomDialog',
  component: NewHangoutRoomDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Controlled Modal that runs the realtime-modules `createRoom(input)` ' +
          'call. Validates name length, previews the slug, and forwards optional ' +
          '`audioOnly` / `recordingEnabled` settings.',
      },
    },
  },
} satisfies Meta<typeof NewHangoutRoomDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  name: 'Open (empty form)',
  args: {
    open: true,
    onClose: noop,
    onCreate: fakeCreate,
  },
};

export const DefaultPrivate: Story = {
  name: 'Default visibility = private',
  args: {
    open: true,
    onClose: noop,
    onCreate: fakeCreate,
    defaultVisibility: 'private',
  },
};

export const ServerError: Story = {
  name: 'Server error (name collision)',
  args: {
    open: true,
    onClose: noop,
    onCreate: alwaysFail,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the error path: submit a valid form and the create call ' +
          'rejects, surfacing the gateway error message inline beneath the form.',
      },
    },
  },
};
