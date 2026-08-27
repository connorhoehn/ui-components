import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavRail, NavRailStack } from './NavRail';
import type { NavRailItem, NavRailSpec } from './NavRail';
import { WorkArea } from './WorkArea';
import { Breadcrumbs } from './Breadcrumbs';
import { Toolbar, ToolbarGroup } from './Toolbar';
import { Button } from '../ui/Button';

const PLATFORM: NavRailItem[] = [
  { to: '/build/work', label: 'Work', badge: 4, group: 'Build' },
  { to: '/build/initiatives', label: 'Initiatives', group: 'Build' },
  { to: '/build/computers', label: 'Computers', hint: 'microVM fleet', group: 'Build' },
  { to: '/operate/health', label: 'Health', group: 'Operate' },
  { to: '/operate/knowledge', label: 'Knowledge', group: 'Operate' },
  { to: '/system/identity', label: 'Identity', group: 'System' },
];

const HEALTH: NavRailItem[] = [
  { to: '/operate/health/summary', label: 'Summary', hint: 'What is on fire' },
  { to: '/operate/health/runs', label: 'Runs', badge: 128 },
  { to: '/operate/health/harness', label: 'Harness' },
  { to: '/operate/health/cost', label: 'Cost' },
];

const HARNESS: NavRailItem[] = [
  { to: '/operate/health/harness', label: 'Overview' },
  { to: '/operate/health/harness/runs', label: 'Runs' },
  { to: '/operate/health/harness/compare', label: 'Compare' },
];

const meta = {
  title: 'Shared/NavRail',
  component: NavRail,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof NavRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Platform', items: PLATFORM, activeHref: '/operate/health' },
  decorators: [(S) => <div className="h-[420px] flex">{S()}</div>],
};

export const Flat: Story = {
  name: 'Flat — no groups',
  args: { title: 'Health', items: HEALTH, activeHref: '/operate/health/runs' },
  decorators: [(S) => <div className="h-[420px] flex">{S()}</div>],
};

export const WithSlots: Story = {
  name: 'Header + footer slots',
  args: {
    title: 'Health',
    items: HEALTH,
    activeHref: '/operate/health/runs',
    header: <Button size="sm" variant="secondary" fullWidth>+ New run</Button>,
    footer: <span className="text-[11px] text-text-tertiary">projected 2m ago</span>,
  },
  decorators: [(S) => <div className="h-[420px] flex">{S()}</div>],
};

export const CodeTone: Story = {
  name: 'tone="code" — terminal chrome',
  args: { title: 'Fleet', items: HEALTH, tone: 'code', activeHref: '/operate/health/runs' },
  decorators: [(S) => <div className="h-[420px] flex bg-code-bg">{S()}</div>],
};

const DEEP_RAILS: NavRailSpec[] = [
  { id: 'global', title: 'Platform', items: PLATFORM, width: 'narrow' },
  { id: 'section', title: 'Health', items: HEALTH, width: 'narrow' },
  { id: 'sub', title: 'Harness', items: HARNESS, match: 'exact', width: 'narrow' },
];

export const ThreeLevelStack: StoryObj = {
  name: 'NavRailStack — three levels deep',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="h-[480px]">
      <NavRailStack rails={DEEP_RAILS} activeHref="/operate/health/harness/compare">
        <WorkArea
          breadcrumbs={
            <Breadcrumbs
              overflow="menu"
              maxItems={4}
              items={[
                { label: 'Operate' },
                { label: 'Health', href: '/operate/health' },
                { label: 'Harness', href: '/operate/health/harness' },
                { label: 'Runs', href: '/operate/health/harness/runs' },
                { label: 'Compare runs' },
              ]}
            />
          }
          toolbar={
            <Toolbar aria-label="Comparison actions" end={<Button size="sm" variant="ghost">Export</Button>}>
              <ToolbarGroup>
                <Button size="sm" variant="primary">Re-run both</Button>
              </ToolbarGroup>
            </Toolbar>
          }
          status={<span>2 runs · 1,204 spans</span>}
        >
          <p className="text-sm text-text-secondary">
            Three rails, a trail and a toolbar — none of which the leaf page had to wire.
          </p>
        </WorkArea>
      </NavRailStack>
    </div>
  ),
};
