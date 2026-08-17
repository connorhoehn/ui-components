import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopNav, NavTabs, type TopNavItem } from './TopNav';

const meta = {
  title: 'Layout/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS: TopNavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Components', to: '/components' },
  { label: 'Hooks', to: '/hooks', badge: 4 },
  { label: 'Patterns', to: '/patterns' },
  { label: 'Guides', to: '/guides' },
  { label: 'Releases', to: '/releases' },
];

export const Default: Story = {
  args: { items: ITEMS, activeHref: '/components', brand: <strong>UI Components</strong> },
};

export const WithBadgesAndRightSlot: Story = {
  args: {
    items: ITEMS,
    activeHref: '/hooks',
    brand: <strong>UI Components</strong>,
    rightSlot: (
      <>
        <button type="button" className="text-sm text-text-secondary">Search</button>
        <span className="text-sm text-text-tertiary">·</span>
        <a href="#" className="text-sm text-text-secondary no-underline">GitHub</a>
      </>
    ),
  },
};

export const WithOverflow: Story = {
  args: {
    items: ITEMS,
    activeHref: '/guides',
    brand: <strong>UI Components</strong>,
    maxVisible: 3,
  },
};

export const SubNav: Story = {
  render: () => (
    <div className="p-6">
      <NavTabs
        items={[
          { label: 'Overview', to: '/admin' },
          { label: 'Users', to: '/admin/users' },
          { label: 'Roles', to: '/admin/roles' },
          { label: 'Audit', to: '/admin/audit', badge: 'New' },
        ]}
        activeHref="/admin/users"
      />
    </div>
  ),
  args: { items: ITEMS },
};
