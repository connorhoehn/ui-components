import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComputeProvider } from './context/ComputeContext';
import { ComputerLab } from './components/ComputerLab';
import { fixtureComputers, fixtureModels } from './fixtures/computeFixture';

/**
 * Driven by fixtures, so there is no backend and no AWS. Layout, rail,
 * splits, zoom, the fuzzy jump, the status lines and the broadcast bar are
 * all live; dispatching an instruction is not, since nothing is listening.
 */
const meta = {
  title: 'Compute/ComputerLab',
  component: ComputerLab,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <ComputeProvider computers={fixtureComputers} models={fixtureModels} canManage pollIntervalMs={0}>
        <Story />
      </ComputeProvider>
    ),
  ],
} satisfies Meta<typeof ComputerLab>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Everything is the leader key, **⌃B**, then one key: `|` split right, `-`
 * split down, `hjkl` / arrows to move, `z` zoom, `x` close, `e` swap the pane
 * between agent and terminal, `w` fuzzy jump, `s` broadcast, `?` for the rest.
 */
export const Playground: Story = {
  args: { open: true, onClose: () => {} },
};

/** Without `ManageDevbox` the panes still render; the mutating controls go. */
export const ReadOnly: Story = {
  args: { open: true, onClose: () => {} },
  decorators: [
    (Story) => (
      <ComputeProvider computers={fixtureComputers} models={fixtureModels} pollIntervalMs={0}>
        <Story />
      </ComputeProvider>
    ),
  ],
};
