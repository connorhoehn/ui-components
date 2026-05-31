import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocsShell } from './DocsShell';
import { DocsSidebar, type DocsSidebarSection } from './DocsSidebar';
import { DocsTopNav } from './DocsTopNav';

const SECTIONS: DocsSidebarSection[] = [
  {
    id: 'getting-started',
    label: 'Get started',
    basePath: '/get-started',
    groups: [
      {
        id: 'intro',
        items: [
          { id: 'intro', label: 'Introduction', to: '/get-started/intro' },
          { id: 'install', label: 'Installation', to: '/get-started/install' },
          { id: 'quick-start', label: 'Quick start', to: '/get-started/quick-start' },
        ],
      },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    basePath: '/foundations',
    groups: [
      {
        id: 'theme',
        label: 'Theming',
        items: [
          { id: 'tokens', label: 'Tokens', to: '/foundations/tokens' },
          { id: 'color', label: 'Color', to: '/foundations/color' },
          { id: 'spacing', label: 'Spacing', to: '/foundations/spacing' },
        ],
      },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    basePath: '/components',
    groups: [
      {
        id: 'primitives',
        label: 'Primitives',
        items: [
          { id: 'button', label: 'Button', to: '/components/button' },
          { id: 'card', label: 'Card', to: '/components/card' },
          { id: 'connection-pill', label: 'ConnectionPill', to: '/components/connection-pill', badge: 'new' },
        ],
      },
    ],
  },
];

const TOPNAV_ITEMS = [
  { label: 'Docs', to: '/get-started' },
  { label: 'Components', to: '/components' },
  { label: 'Guides', to: '/guides' },
];

const meta = {
  title: 'Layout/DocsShell',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DocsShell
      topNav={
        <DocsTopNav
          items={TOPNAV_ITEMS}
          activeHref="/components"
          brand="UI Components"
        />
      }
      sidebar={
        <DocsSidebar sections={SECTIONS} activeHref="/components/connection-pill" />
      }
    >
      <h1 className="text-2xl font-bold mb-4">ConnectionPill</h1>
      <p className="text-[var(--color-text-secondary)] mb-4">
        Canonical connection-status pill primitive with compact + label variants
        and aria-live transition announcements.
      </p>
      <p>Body content goes here…</p>
    </DocsShell>
  ),
};

export const WithRightRail: Story = {
  render: () => (
    <DocsShell
      topNav={
        <DocsTopNav
          items={TOPNAV_ITEMS}
          activeHref="/foundations"
          brand="UI Components"
        />
      }
      sidebar={
        <DocsSidebar sections={SECTIONS} activeHref="/foundations/tokens" />
      }
      rightRail={
        <nav className="text-[12px] text-[var(--color-text-secondary)]">
          <div className="font-semibold mb-2">On this page</div>
          <ul className="flex flex-col gap-1.5">
            <li>Overview</li>
            <li>Token table</li>
            <li>Examples</li>
          </ul>
        </nav>
      }
    >
      <h1 className="text-2xl font-bold mb-4">Tokens</h1>
      <p>Token docs…</p>
    </DocsShell>
  ),
};

export const FullBleed: Story = {
  render: () => (
    <DocsShell
      topNav={
        <DocsTopNav
          items={TOPNAV_ITEMS}
          activeHref="/components"
          brand="UI Components"
        />
      }
      sidebar={
        <DocsSidebar sections={SECTIONS} activeHref="/components/button" />
      }
      fullBleed
    >
      <div className="flex-1 grid place-items-center bg-[var(--color-surface-hover,#f8fafc)]">
        Full-bleed demo viewport
      </div>
    </DocsShell>
  ),
};
