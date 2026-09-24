import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProcedureSteps } from './ProcedureSteps';

const meta = {
  title: 'Work/ProcedureSteps',
  component: ProcedureSteps,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="w-[560px]"><Story /></div>],
  args: {
    'aria-label': 'What to do',
    steps: [
      { id: '1', title: 'Rerun the failing test twice on its own.' },
      { id: '2', title: 'Compare both results with the original CI failure.' },
      { id: '3', title: 'If all three fail the same way, investigate a real regression.' },
    ],
  },
} satisfies Meta<typeof ProcedureSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A guide's steps, read once in the record body (Knowledge mockup). */
export const Numbered: Story = {};

/** The procedure's Runs tab: each step's latest outcome (Overview mockup). */
export const WithOutcomes: Story = {
  args: {
    size: 'sm',
    'aria-label': 'Latest run',
    steps: [
      { id: 'a', title: 'Keep the SAML shim behind a flag', status: 'done' },
      { id: 'b', title: 'Confirm active sessions stay signed in', status: 'done' },
      { id: 'c', title: 'Flip one tenant to Cognito', status: 'failed', note: 'The hosted-UI redirect still resolved to the old domain.' },
      { id: 'd', title: 'Roll back if login fails', status: 'pending', note: 'Not reached in this run.' },
    ],
  },
  decorators: [(Story) => <div className="w-[340px]"><Story /></div>],
};

export const WithBodies: Story = {
  args: {
    steps: [
      { id: '1', title: 'Reproduce locally', body: 'Run the single test with the CI seed and the same parallelism.' },
      { id: '2', title: 'Check shared resources', body: 'Ports, temp directories and fixtures that two tests can both claim.', status: 'skipped', note: 'Skipped — not relevant to this failure.' },
    ],
  },
};

export const Selectable: Story = { args: { onSelectStep: () => {} } };

export const Unnumbered: Story = { args: { numbered: false } };

export const Empty: Story = { args: { steps: [] } };

export const Dark: Story = {
  args: WithOutcomes.args,
  render: (args) => (
    <div data-theme="dark" className="w-[340px] bg-surface p-4">
      <ProcedureSteps {...args} />
    </div>
  ),
};
