import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo } from 'react';
import * as Y from 'yjs';
import { Awareness } from 'y-protocols/awareness';
import StandaloneTiptap from './StandaloneTiptap';

// Storybook can't reach a real gateway, so these stories exercise the
// escape-hatch path with an in-memory Y.Doc and a mock awareness-only
// provider. The production bootstrap path (gatewayUrl + docId + authToken)
// is unchanged; this just demonstrates the UX surface.

const meta = {
  title: 'Doc-Editor/StandaloneTiptap',
  component: StandaloneTiptap,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof StandaloneTiptap>;

export default meta;
type Story = StoryObj<typeof meta>;

const USER = { name: 'Ada Lovelace', color: '#8b5cf6' };

function useMockCollab() {
  return useMemo(() => {
    const ydoc = new Y.Doc();
    const awareness = new Awareness(ydoc);
    const provider = { awareness };
    return { ydoc, provider };
  }, []);
}

function Editable() {
  const { ydoc, provider } = useMockCollab();
  return (
    <div className="w-[640px]">
      <StandaloneTiptap
        ydoc={ydoc}
        provider={provider}
        user={USER}
        placeholder="Start writing — your edits sync via Y.Doc…"
      />
    </div>
  );
}

function ReadOnly() {
  const { ydoc, provider } = useMockCollab();
  return (
    <div className="w-[640px]">
      <StandaloneTiptap
        ydoc={ydoc}
        provider={provider}
        user={USER}
        editable={false}
      />
    </div>
  );
}

function CustomFragment() {
  const { ydoc, provider } = useMockCollab();
  return (
    <div className="w-[640px]">
      <StandaloneTiptap
        ydoc={ydoc}
        provider={provider}
        user={USER}
        fragmentName="section-intro"
        placeholder="Each fragment is a separately addressable XmlFragment on the same doc."
      />
    </div>
  );
}

function BootstrapPlaceholder() {
  // In production: <StandaloneTiptap gatewayUrl="wss://…" docId="d1" authToken="…" user={…} />
  // Storybook can't open a real WS, so we show the loading slot.
  return (
    <div className="w-[640px] border border-border rounded-lg p-6 text-sm text-text-secondary">
      <strong className="block mb-2 text-text-primary">Bootstrap mode</strong>
      In production, pass <code>{'gatewayUrl'}</code>, <code>{'docId'}</code>,
      and <code>{'authToken'}</code> — the component opens the WebSocket,
      builds the Y.Doc + GatewayProvider, and renders the editor once the
      first snapshot arrives. The <code>{'loadingSlot'}</code> prop renders
      until then.
    </div>
  );
}

// Storybook's discriminated-union args type wants one full arm; we render
// everything via `render` instead so the args are a no-op placeholder.
const placeholderArgs = {
  gatewayUrl: '',
  docId: '',
  authToken: '',
  user: USER,
} as const;

export const Default: Story = {
  args: placeholderArgs,
  render: () => <Editable />,
};

export const ReadOnlySurface: Story = {
  args: placeholderArgs,
  render: () => <ReadOnly />,
};

export const NamedFragment: Story = {
  args: placeholderArgs,
  render: () => <CustomFragment />,
};

export const BootstrapDescription: Story = {
  args: placeholderArgs,
  render: () => <BootstrapPlaceholder />,
};
