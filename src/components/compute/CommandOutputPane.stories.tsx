import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandOutputPane } from './components/CommandOutputPane';

const meta: Meta<typeof CommandOutputPane> = {
  title: 'Compute/CommandOutputPane',
  component: CommandOutputPane,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="h-80 flex flex-col"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof CommandOutputPane>;

const lines = [
  { id: '1', message: 'RUN  v3.2.4 /work/ui-components' },
  { id: '2', message: ' ✓ src/compute/__tests__/ComputeDock.test.tsx (14 tests)' },
  { id: '3', message: ' ✓ src/compute/__tests__/keymap.test.ts (9 tests)' },
];

export const Running: Story = {
  args: { command: 'npm test', lines, running: true, onOpenShell: () => {} },
};

export const Finished: Story = {
  args: {
    command: 'npm test',
    lines: [...lines, { id: '4', message: ' Tests  23 passed (23)' }],
    exitCode: 0,
    onOpenShell: () => {},
  },
};

export const Failed: Story = {
  args: {
    command: 'npm run lint',
    lines: [{ id: '1', level: 'error', message: 'src/App.tsx: unexpected any' }],
    exitCode: 1,
    onOpenShell: () => {},
  },
};
