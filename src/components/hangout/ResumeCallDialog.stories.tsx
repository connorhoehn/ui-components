import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResumeCallDialog } from './ResumeCallDialog';

const meta = {
    title: 'Hangout/ResumeCallDialog',
    component: ResumeCallDialog,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ResumeCallDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const OneParticipant: Story = {
    args: {
        open: true,
        onClose: noop,
        onReconnect: noop,
        callerName: 'Bob Johnson',
        lobbyName: 'dm:bob|hank',
        elapsedMs: 75_000, // 1:15
        participants: [{ userId: 'bob', name: 'Bob Johnson' }],
    },
};

export const MultipleParticipants: Story = {
    args: {
        open: true,
        onClose: noop,
        onReconnect: noop,
        callerName: 'Bob Johnson',
        lobbyName: 'group:product-sync',
        elapsedMs: 9 * 60_000 + 42_000, // 9:42
        participants: [
            { userId: 'bob', name: 'Bob Johnson' },
            { userId: 'carol', name: 'Carol Lopez' },
            { userId: 'dave', name: 'Dave Park' },
            { userId: 'eve', name: 'Eve Chen' },
        ],
    },
};

export const LongRunningCall: Story = {
    args: {
        open: true,
        onClose: noop,
        onReconnect: noop,
        callerName: 'Carol Lopez',
        lobbyName: 'room:support-warroom',
        elapsedMs: 1 * 3600_000 + 24 * 60_000 + 7_000, // 1:24:07
        participants: [
            { userId: 'carol', name: 'Carol Lopez' },
            { userId: 'dave', name: 'Dave Park' },
        ],
    },
};

export const Reconnecting: Story = {
    args: {
        open: true,
        onClose: noop,
        onReconnect: noop,
        callerName: 'Bob Johnson',
        lobbyName: 'dm:bob|hank',
        elapsedMs: 30_000,
        participants: [{ userId: 'bob', name: 'Bob Johnson' }],
        loading: true,
    },
};

export const ZeroParticipantsEdgeCase: Story = {
    args: {
        // The hook normally filters this out — story exists to document
        // the visual fallback (no chip row, dialog still renders).
        open: true,
        onClose: noop,
        onReconnect: noop,
        callerName: 'Bob Johnson',
        lobbyName: 'dm:bob|hank',
        elapsedMs: 5_000,
        participants: [],
    },
};
