import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import MappingRuleEditor from './MappingRuleEditor';
import { IdentityProvider } from '../../contexts/IdentityContext';
import type { MappingRule } from '../../types/ingest';

// The editor is a controlled component; it only reaches for identity to sign
// its pattern-preview request, so a mocked context value is all it needs.
const IDENTITY = {
  userId: 'u-ops',
  displayName: 'Ops Operator',
  userEmail: 'ops@example.com',
  idToken: 'story-token',
  onSignOut: () => {},
};

const rules: MappingRule[] = [
  { pattern: '**/*.pdf', documentTypeId: 'dt-contract', pipelineId: 'pl-contract', priority: 100 },
  { pattern: 'invoices/**', documentTypeId: 'dt-invoice', priority: 50 },
  { pattern: '**/*.csv', documentTypeId: 'dt-table', priority: 10 },
];

const meta = {
  title: 'Ingest/MappingRuleEditor',
  component: MappingRuleEditor,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { rules, onChange: () => {} },
  decorators: [
    (Story) => (
      <IdentityProvider value={IDENTITY}>
        <div className="w-[720px]">
          <Story />
        </div>
      </IdentityProvider>
    ),
  ],
} satisfies Meta<typeof MappingRuleEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three rules, highest priority first — priority breaks pattern ties. */
export const WithRules: Story = {};

/** No rules yet: everything falls through to the source default pipeline. */
export const Empty: Story = { args: { rules: [] } };

/** A single catch-all rule. */
export const SingleCatchAll: Story = {
  args: { rules: [{ pattern: '**', documentTypeId: 'dt-generic', priority: 1 }] },
};

/**
 * Fully controlled: add, edit, reorder and delete all round-trip through
 * `onChange`, so the parent owns the list.
 */
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<MappingRule[]>(args.rules);
    return <MappingRuleEditor rules={value} onChange={setValue} />;
  },
};
