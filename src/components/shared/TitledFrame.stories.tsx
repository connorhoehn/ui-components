import type { Meta, StoryObj } from '@storybook/react-vite';
import { TitledFrame } from './TitledFrame';

const meta = {
  title: 'Shared/TitledFrame',
  component: TitledFrame,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TitledFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

const Body = ({ children }: { children: React.ReactNode }) => (
  <div className="p-3 font-mono text-[11px] text-code-subtle">{children}</div>
);

export const Default: Story = {
  args: {
    title: 'claude',
    children: <Body>the title sits in the border, not above it</Body>,
  },
};

/** In a pane grid exactly one frame is active — the border is how you know
 *  which one has the keyboard. */
export const PaneGrid: Story = {
  args: { title: 'demo-alpha', children: null },
  render: () => (
    <div className="grid grid-cols-2 gap-3 h-64">
      <TitledFrame title="demo-alpha" active>
        <Body>focused</Body>
      </TitledFrame>
      <TitledFrame title="demo-bravo">
        <Body>not focused</Body>
      </TitledFrame>
      <TitledFrame title="demo-charlie">
        <Body>not focused</Body>
      </TitledFrame>
      <TitledFrame title="demo-delta">
        <Body>not focused</Body>
      </TitledFrame>
    </div>
  ),
};

export const WithAction: Story = {
  args: {
    title: 'host',
    titleAction: (
      <button type="button" className="text-[10px] font-mono text-code-muted bg-transparent border-none cursor-pointer">
        ×
      </button>
    ),
    children: <Body>a close control lives in the border too</Body>,
  },
};

/** `surface` themes with the app instead of the terminal — for a frame that
 *  does not contain a PTY. */
export const SurfaceTone: Story = {
  args: {
    tone: 'surface',
    title: 'summary',
    active: true,
    children: <div className="p-3 text-[12px] text-text-secondary">app chrome, not terminal chrome</div>,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'a-title-far-longer-than-the-frame-can-hold-without-truncating',
    children: <Body>the title truncates rather than pushing the border open</Body>,
  },
};
