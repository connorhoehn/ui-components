import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Shared/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Pipelines', href: '/pipelines' },
      { label: 'CSV ingest' },
    ],
  },
};

export const TwoLevel: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings' },
    ],
  },
};

export const Truncated: Story = {
  name: 'Truncated middle (maxItems=3)',
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Workspaces', href: '/workspaces' },
      { label: 'Team Alpha', href: '/workspaces/alpha' },
      { label: 'Projects', href: '/workspaces/alpha/projects' },
      { label: 'Q3 launch' },
    ],
    maxItems: 3,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Docs', href: '/docs' },
      { label: 'API reference' },
    ],
    separator: '›',
  },
};

const DEEP = [
  { label: 'Operate' },
  { label: 'Health', href: '/health' },
  { label: 'Harness', href: '/health/harness' },
  { label: 'Runs', href: '/health/harness/runs' },
  { label: 'Compare runs' },
];

export const OverflowMenu: Story = {
  name: 'Deep trail — overflow="menu"',
  args: { items: DEEP, maxItems: 4, overflow: 'menu' },
};

export const GroupCrumbsAreInert: Story = {
  name: 'Group crumbs are context, not links',
  args: {
    items: [
      { label: 'Operate' },
      { label: 'Knowledge', href: '/knowledge' },
      { label: 'Pipeline', href: '/knowledge/pipeline' },
      { label: 'Runs' },
    ],
    separator: '›',
  },
};

export const HiddenWhenShallow: Story = {
  name: 'minItems={3} — nothing renders here',
  args: { items: [{ label: 'Home', href: '/' }, { label: 'Settings' }], minItems: 3 },
};
