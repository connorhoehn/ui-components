import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { ToastProvider, useToast } from '../shared/ToastProvider';
import { ContextColumn, type ContextColumnState } from './ContextColumn';
import { ChatIcon, PhoneIcon } from '../ui/Icons';
import { SettingsGearIcon } from '../video/MediaIcons';
import Drawer from '../shared/Drawer';
import { Button } from '../ui/Button';

// The side column. 2.391.0 adds two per-panel settings for the call drawers:
//   chrome: 'bare'  — no tab row; the panel brings its own header and close.
//   width: 'drawer' (340 → 380px at ≥1440) / 'drawer-wide' (360 → 400px).
// Resize the canvas across 1440px to see the step.

function Chat() {
  return <div className="p-4 text-sm text-text-secondary">The conversation panel (tabbed chrome, default width).</div>;
}

function Scene({ initial }: { initial: string }) {
  const [state, setState] = useState<ContextColumnState>('open');
  const [active, setActive] = useState(initial);
  const close = () => setActive('chat');
  return (
    <div className="flex h-[640px] border border-border bg-surface">
      <div className="flex-1 p-6 text-sm text-text-secondary">
        The page. Active panel: <strong>{active}</strong>.{' '}
        <Button variant="link" onClick={() => setActive('start')}>Start a call</Button>{' '}
        <Button variant="link" onClick={() => setActive('settings')}>Call settings</Button>
      </div>
      <ContextColumn
        state={state}
        onStateChange={setState}
        activeId={active}
        onActivate={setActive}
        panels={[
          { id: 'chat', label: 'Chat', icon: <ChatIcon />, content: <Chat /> },
          {
            id: 'start',
            label: 'Start a call',
            icon: <PhoneIcon />,
            chrome: 'bare',
            width: 'drawer-wide',
            content: (
              <Drawer open docked onClose={close} title="Start a call" headerClassName="border-b-0" titleClassName="text-lg">
                <p className="m-0 text-sm text-text-secondary">A bare panel: this drawer's header is the only one. 400px at ≥1440, 360px below.</p>
              </Drawer>
            ),
          },
          {
            id: 'settings',
            label: 'Call settings',
            icon: <SettingsGearIcon size={14} />,
            chrome: 'bare',
            width: 'drawer',
            content: (
              <Drawer open docked onClose={close} title="Call settings" headerClassName="border-b-0" titleClassName="text-lg">
                <p className="m-0 text-sm text-text-secondary">380px at ≥1440, 340px below.</p>
              </Drawer>
            ),
          },
        ]}
      />
    </div>
  );
}

const meta = {
  title: 'Layout/ContextColumn',
  component: ContextColumn,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ContextColumn>;
export default meta;
type Story = StoryObj<typeof meta>;
const args = { state: 'open' as const, onStateChange: () => {}, panels: [], onActivate: () => {} };

/** The ordinary tabbed column. */
export const Tabbed: Story = { args, render: () => <Scene initial="chat" /> };
/** A bare, wide panel: Start a call. */
export const BareDrawerWide: Story = { args, render: () => <Scene initial="start" /> };
/** A bare panel at the drawer width: Call settings. */
export const BareDrawer: Story = { args, render: () => <Scene initial="settings" /> };
export const BareDrawerDark: Story = {
  args,
  render: () => (
    <div data-theme="dark">
      <Scene initial="settings" />
    </div>
  ),
};

// ── 2.395.0: overlays stay clear of the open column ─────────────────────────


function FireToast() {
  const { toast } = useToast();
  useEffect(() => {
    toast('Pipeline (agent) Recording — 25s', { type: 'info', durationMs: 600_000 });
  }, [toast]);
  return null;
}

/** A toast while Call settings is open: it sits left of the column, not over the drawer. */
export const ToastsClearOfColumn: Story = {
  args,
  render: () => (
    <ToastProvider>
      <FireToast />
      <Scene initial="settings" />
    </ToastProvider>
  ),
};
export const ToastsClearOfColumnDark: Story = {
  args,
  render: () => (
    <div data-theme="dark">
      <ToastProvider>
        <FireToast />
        <Scene initial="settings" />
      </ToastProvider>
    </div>
  ),
};
