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

/**
 * The pattern the two variants exist for: a primary row in the 53px header
 * (`pill`) and a section row in the content column under it (`underline`).
 *
 * The rows do NOT share a left edge and cannot — the header is anchored to the
 * window, the section strip to the content column, and the content column
 * moves when a sidebar collapses. What makes them read as a pair instead is
 * everything else: one item box (h-9 / px-3 / gap-1), one type scale, and an
 * active treatment that is unmistakably louder on the row above.
 */
export const StackedRows: Story = {
  render: () => (
    <div className="min-w-[640px]">
      <div className="flex h-[53px] items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6">
        <strong className="shrink-0">UI Components</strong>
        <NavTabs
          items={[
            { label: 'Previews', to: '/previews' },
            { label: 'Social', to: '/social', badge: 3 },
            { label: 'Documents', to: '/documents' },
            { label: 'Pipelines', to: '/pipelines' },
          ]}
          activeHref="/documents"
          aria-label="Primary"
          variant="pill"
          className="shrink-0"
        />
      </div>
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-8">
        <NavTabs
          items={[
            { label: 'Documents', to: '/documents' },
            { label: 'Document Types', to: '/document-types' },
            { label: 'Data Types', to: '/field-types' },
          ]}
          activeHref="/documents"
          aria-label="Documents"
          className="border-b-0"
        />
      </div>
      <div className="bg-[var(--color-surface-panel)] p-8 text-sm text-[var(--color-text-secondary)]">
        Page content starts here.
      </div>
    </div>
  ),
  args: { items: ITEMS },
};
