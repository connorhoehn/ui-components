import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MasterDetail, type MasterDetailProps } from './MasterDetail';
import Chip from './Chip';

interface Dimension {
  id: string;
  title: string;
  level: number | null;
}

const DIMENSIONS: Dimension[] = [
  { id: '1', title: 'Continuous Integration', level: 3 },
  { id: '2', title: 'Continuous Delivery', level: 2 },
  { id: '3', title: 'Automation', level: null },
  { id: '4', title: 'Source Control & Traceability', level: 4 },
  { id: '5', title: 'Testing & QE', level: 1 },
];

// Storybook infers arg types from the component's prop generic; a bare
// `MasterDetail<Dimension>` value doesn't carry that instantiation, so a
// concretely-typed local wrapper is what actually gives `Meta` a `Dimension`
// shape to infer args from — same pattern DataTable's stories use.
function DimensionMasterDetail(props: MasterDetailProps<Dimension>) {
  return <MasterDetail {...props} />;
}

const meta = {
  title: 'Shared/MasterDetail',
  component: DimensionMasterDetail,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DimensionMasterDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  items: DIMENSIONS,
  keyOf: (d: Dimension) => d.id,
  selectedKey: null,
  onSelect: () => {},
  renderRow: () => null,
  renderDetail: () => null,
};

export const Interactive: Story = {
  args: baseArgs,
  render: () => {
    const [selected, setSelected] = useState<string | null>(DIMENSIONS[0].id);
    return (
      <div style={{ height: 420 }}>
        <MasterDetail
          items={DIMENSIONS}
          keyOf={(d) => d.id}
          selectedKey={selected}
          onSelect={setSelected}
          railTitle="5 Dimensions"
          storageKey="storybook-master-detail-mode"
          renderRow={(d, i, sel) => (
            <div className="flex items-center gap-2.5 px-3 py-2.5">
              <span className="w-6 flex-shrink-0 text-xs font-bold text-text-tertiary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`min-w-0 flex-1 truncate text-sm ${sel ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>
                {d.title}
              </span>
              <Chip size="xs" tone={d.level === null ? 'neutral' : d.level >= 3 ? 'success' : 'warning'}>
                {d.level === null ? 'N/A' : `L${d.level}`}
              </Chip>
            </div>
          )}
          renderCompactRow={(d, i, sel) => (
            <div className="flex flex-col items-center gap-1.5 py-2.5">
              <span className="text-xs font-bold text-text-tertiary">{String(i + 1).padStart(2, '0')}</span>
              <Chip size="xs" tone={sel ? 'info' : 'neutral'}>{d.level === null ? '—' : `L${d.level}`}</Chip>
            </div>
          )}
          renderDetail={(d) => (
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-text-tertiary">Dimension</p>
              <h3 className="mt-0.5 text-lg font-bold text-text-primary">{d.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Detail pane content for {d.title} goes here.
              </p>
            </div>
          )}
          emptyDetail={<div className="p-5 text-sm text-text-tertiary">Select a dimension.</div>}
        />
      </div>
    );
  },
};

export const Empty: Story = {
  args: { ...baseArgs, items: [] },
  render: () => (
    <div style={{ height: 300 }}>
      <MasterDetail
        items={[]}
        keyOf={(d: Dimension) => d.id}
        selectedKey={null}
        onSelect={() => {}}
        renderRow={() => null}
        renderDetail={() => null}
        emptyDetail={<div className="p-5 text-sm text-text-tertiary">No items available.</div>}
      />
    </div>
  ),
};
