import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrgGraph } from './OrgGraph';
import { DepartmentChips } from './DepartmentChips';
import { GraphSearchBox } from './GraphSearchBox';
import { Inline, Stack } from '../../ui/Stack';
import { Card } from '../../ui/Card';
import type { GraphDepartment, GraphPerson, GraphRelationship, PresenceStatus } from './types';

// Department colours are data (they arrive from the org read), so they stay
// literal hexes, as the Avatar palette does.
const DEPARTMENTS: GraphDepartment[] = [
  { id: 'plat', name: 'Platform Engineering', color: '#4f46e5' },
  { id: 'data', name: 'Data Platform', color: '#9333ea' },
  { id: 'prod', name: 'Product', color: '#16a34a' },
  { id: 'design', name: 'Design Systems', color: '#ea580c' },
  { id: 'ml', name: 'ML / AI', color: '#0891b2' },
  { id: 'sec', name: 'Security', color: '#dc2626' },
];

const NAMES = [
  'Vera', 'Nora', 'Caleb', 'Rachel', 'Marcus', 'Sienna', 'Daniel', 'Tara', 'Hiro', 'Aisha', 'Henry', 'Raj',
  'Sasha', 'Iris', 'Theo', 'Mateo', 'Hugo', 'Isabel', 'Jordan', 'Ben', 'Lucas', 'Nina', 'Kevin', 'Mia',
];
const SKILLS = ['Kubernetes', 'Go', 'Terraform', 'Spark', 'Rust', 'Figma', 'PyTorch', 'Zero Trust', 'SQL', 'React'];
const PRESENCE: PresenceStatus[] = ['office', 'wfh', 'travel', 'office', 'pto', 'wfh', 'vacation', 'sick'];

const PEOPLE: GraphPerson[] = NAMES.map((first, i) => ({
  id: `p-${i + 1}`,
  name: `${first} ${['Green', 'Chang', 'Okafor', 'Silva', 'Tanaka', 'Bello'][i % 6]}`,
  title: i % 4 === 0 ? 'Staff Engineer' : 'Engineer',
  department: DEPARTMENTS[i % DEPARTMENTS.length]!.name,
  skills: [SKILLS[i % SKILLS.length]!, SKILLS[(i * 3 + 1) % SKILLS.length]!],
  influenceScore: ((i * 37) % 100) / 100,
  presence: PRESENCE[i % PRESENCE.length],
}));

const TYPES: GraphRelationship['type'][] = ['collaborates', 'mentors', 'reports_to', 'expert_in_common'];
const RELATIONSHIPS: GraphRelationship[] = PEOPLE.flatMap((p, i) => [
  { source: p.id, target: PEOPLE[(i + 6) % PEOPLE.length]!.id, type: TYPES[i % 4]!, strength: 0.4 + ((i * 13) % 60) / 100 },
  { source: p.id, target: PEOPLE[(i + 1) % PEOPLE.length]!.id, type: 'collaborates' as const, strength: 0.5 },
]);

const meta = {
  title: 'Graph/OrgGraph',
  component: OrgGraph,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { people: PEOPLE, relationships: RELATIONSHIPS, departments: DEPARTMENTS },
  decorators: [(Story) => <div className="h-[640px] w-full"><Story /></div>],
} satisfies Meta<typeof OrgGraph>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Departments colour the nodes; the legend (top-left) keys departments and
 *  relationship line styles and filters on click. Hover a node for its card. */
export const Default: Story = {};

// The portal's full org size — the count the large-graph forces are tuned for.
const PEOPLE_56: GraphPerson[] = Array.from({ length: 56 }, (_, i) => ({
  ...PEOPLE[i % PEOPLE.length]!,
  id: `q-${i + 1}`,
  department: DEPARTMENTS[i % DEPARTMENTS.length]!.name,
  influenceScore: ((i * 37) % 100) / 100,
}));
const RELATIONSHIPS_56: GraphRelationship[] = PEOPLE_56.flatMap((p, i) => [
  { source: p.id, target: PEOPLE_56[(i + 6) % 56]!.id, type: TYPES[i % 4]!, strength: 0.4 + ((i * 13) % 60) / 100 },
  { source: p.id, target: PEOPLE_56[(i + 1) % 56]!.id, type: 'collaborates' as const, strength: 0.5 },
]);

/** Fifty-six people — the whole org — in the search page's 1160 × 360 frame
 *  (the 2.403.2 regression): departments sit in a grid shaped to the strip
 *  and the pulls are aspect-weighted, so the drawing spans the width right of
 *  the legend; the fit stops at 110% so names stay 11px, and the rows that do
 *  not fit run off the bottom for the viewer to pan to. */
export const Default56: Story = {
  name: 'Default (56)',
  args: { people: PEOPLE_56, relationships: RELATIONSHIPS_56 },
  decorators: [(Story) => <div className="h-[360px] w-[1160px] max-w-full border border-border"><Story /></div>],
};

/** A host card overlaid on the right: `fitInset={{ right: 320 }}` keeps the
 *  focused drawing clear of it (the card here is a stand-in panel). */
export const WithCardInset: Story = {
  name: 'Focused, card inset',
  args: { focusIds: ['p-1'], fitInset: { right: 320 } },
  render: (args) => (
    <Stack gap="none" className="relative h-full">
      <OrgGraph {...args} />
      <Card className="absolute bottom-3 right-3 top-3 w-[300px] p-4">Person card (300px)</Card>
    </Stack>
  ),
};

/** Radial rings, most influential in the centre. */
export const Radial: Story = { args: { layout: 'radial', showInfluence: true } };

/** Multi-select owned by the host, with the page's search box and department
 *  chips driving the same selection — the People panel's shape. */
export const WithSelection: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Set<string>>(() => new Set(['p-1', 'p-7']));
    const [dept, setDept] = useState<string | null>(null);
    const toggle = useMemo(() => (id: string) => setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    }), []);
    return (
      <Stack gap="none" className="h-full">
        <Inline gap="sm" className="border-b border-border p-2">
          <GraphSearchBox people={PEOPLE} onPickPerson={(id) => setSelected(new Set([id]))} onPickSkill={(_s, ids) => setSelected(new Set(ids))} />
          <DepartmentChips departments={DEPARTMENTS} people={PEOPLE} activeDepartment={dept}
            onToggle={(name, ids) => { setDept(name); setSelected(new Set(name ? ids : [])); }} />
        </Inline>
        <OrgGraph {...args} multiSelectIds={selected} onToggleMultiSelect={toggle} spotlightIds={selected} className="flex-1" />
      </Stack>
    );
  },
};

/** Presence filter on: nodes that are not remote dim, and the legend keys the dots. */
export const PresenceFilter: Story = { args: { presenceFilter: 'remote' } };

/** Focused on one person: Vera, the people she is directly connected to and
 *  the lines among them — the `/iq/search?selection=person:<id>` view. */
export const FocusedOnOnePerson: Story = { args: { focusIds: ['p-1'] } };

/** The smallest focused drawing: two people and the line between them. The
 *  fit stops at 125%, so they stay people-sized in a wide canvas. */
export const FocusedTwoPeople: Story = {
  name: 'Focused, two people',
  args: {
    people: PEOPLE.slice(0, 2),
    relationships: [{ source: 'p-1', target: 'p-2', type: 'mentors', strength: 0.8 }],
    focusIds: ['p-1'],
  },
};
