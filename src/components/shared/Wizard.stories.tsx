import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Wizard, type WizardStep } from './Wizard';
import { Input } from '../forms/Input';

const meta = {
  title: 'Shared/Wizard',
  component: Wizard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Wizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = { steps: [], activeKey: '', onStep: () => {} };

export const Interactive: Story = {
  args: baseArgs,
  render: () => {
    const [name, setName] = useState('');
    const [activeKey, setActiveKey] = useState('drop');
    const steps: WizardStep[] = [
      { key: 'drop', label: '1. Drop file', content: <p className="text-sm text-text-secondary">Drop a Forms export to begin.</p> },
      {
        key: 'preview',
        label: '2. Preview',
        canAdvance: name.trim().length > 0,
        content: (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-text-secondary">Name the team this submission belongs to.</p>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="TEAM-002" />
          </div>
        ),
      },
      { key: 'fetch', label: '3. Fetch links', content: <p className="text-sm text-text-secondary">Collect linked evidence.</p> },
      { key: 'run', label: '4. Run prompt', content: <p className="text-sm text-text-secondary">Launch the scoring run.</p> },
    ];
    return (
      <Wizard steps={steps} activeKey={activeKey} onStep={setActiveKey} onFinish={() => alert('Finished!')} />
    );
  },
};

export const BlockedStep: Story = {
  args: baseArgs,
  render: () => {
    const steps: WizardStep[] = [
      { key: 'a', label: '1. One', content: <p className="text-sm text-text-secondary">Step one.</p> },
      { key: 'b', label: '2. Two', canAdvance: false, content: <p className="text-sm text-text-secondary">Cannot advance until a field is filled.</p> },
    ];
    return <Wizard steps={steps} activeKey="b" onStep={() => {}} />;
  },
};
