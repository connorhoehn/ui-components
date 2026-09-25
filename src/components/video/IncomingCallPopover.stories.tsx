import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { IncomingCallPopover, type IncomingCallPopoverProps } from './IncomingCallPopover';
import { Button } from '../ui/Button';
import { PhoneCallIcon } from './MediaIcons';
import { CAST, DEVICES, REVIEW_DOCS, noop, themed } from './documentCallStoryKit';

// The ring for a document-review call (mockups 05 and 05b), anchored under a
// stand-in for the toolbar's "Call ▾" button in the top-right corner.

function Scene(over: Partial<IncomingCallPopoverProps>) {
  const anchor = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(false);
  return (
    <div className="flex justify-end pr-2">
      <Button
        ref={(el) => {
          anchor.current = el;
          if (el && !open) setOpen(true);
        }}
        variant="ghost"
        size="sm"
        className="inline-flex items-center gap-1.5"
        onClick={() => setOpen(true)}
      >
        <PhoneCallIcon size={14} /> Call
      </Button>
      <IncomingCallPopover
        open={open}
        anchorRef={anchor}
        caller={{ name: CAST.connor.name, color: 'rgb(79,70,229)' }}
        title="Auth architecture review"
        documents={REVIEW_DOCS}
        onOpenDocument={noop}
        participants={[
          { id: CAST.connor.userId, name: CAST.connor.name },
          { id: CAST.alice.userId, name: CAST.alice.name },
          { id: CAST.frank.userId, name: CAST.frank.name },
        ]}
        participantCount={3}
        mic={{ on: mic, onToggle: () => setMic((v) => !v), devices: DEVICES.microphones, selectedDeviceId: 'mbp-mic', onSelectDevice: noop, permission: 'granted' }}
        camera={{ on: cam, onToggle: () => setCam((v) => !v), devices: DEVICES.cameras, selectedDeviceId: 'facetime', onSelectDevice: noop, permission: 'granted' }}
        onOpenSettings={noop}
        onJoin={noop}
        onDecline={() => setOpen(false)}
        onDismiss={noop}
        {...over}
      />
    </div>
  );
}

const meta = {
  title: 'Video/Document calls/IncomingCallPopover',
  component: IncomingCallPopover,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof IncomingCallPopover>;
export default meta;
type Story = StoryObj<typeof meta>;
const args = {} as IncomingCallPopoverProps;

/** Mockup 05 (407px). */
export const Default: Story = { args, render: () => <Scene />, decorators: [themed('light')] };
export const DefaultDark: Story = { args, render: () => <Scene />, decorators: [themed('dark')] };
/** Mockup 05b (375px): one-line caller, "+1", "3 in call". */
export const Compact: Story = { args, render: () => <Scene compact />, decorators: [themed('light')] };
export const CompactDark: Story = { args, render: () => <Scene compact />, decorators: [themed('dark')] };
/** Already in a call: Switch instead of Join call. */
export const Busy: Story = { args, render: () => <Scene compact busy onSwitch={noop} />, decorators: [themed('light')] };
/** Nobody has joined yet, one document. */
export const NobodyYet: Story = {
  args,
  render: () => <Scene participants={[]} participantCount={0} documents={[REVIEW_DOCS[0]!]} />,
  decorators: [themed('light')],
};
/** Microphone blocked. */
export const MicBlocked: Story = {
  args,
  render: () => (
    <Scene mic={{ on: false, onToggle: noop, devices: DEVICES.microphones, onSelectDevice: noop, permission: 'denied' }} />
  ),
  decorators: [themed('light')],
};

/** 2.395.0: focus lands on Join call by default (Default above); `initialFocus="close"` puts it on the ×. */
export const FocusOnClose: Story = { args, render: () => <Scene initialFocus="close" />, decorators: [themed('light')] };
