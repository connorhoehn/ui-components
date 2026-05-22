import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';

const Header = () => (
  <div style={{
    height: 53,
    background: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5rem',
    fontWeight: 600,
    fontSize: 15,
    color: 'var(--color-text-primary)',
  }}>
    My App
  </div>
);

const Sidebar = () => (
  <div style={{
    padding: '1rem',
    background: 'var(--color-surface)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }}>
    {['Dashboard', 'Projects', 'Messages', 'Settings'].map(item => (
      <div key={item} style={{
        padding: '0.5rem 0.75rem',
        borderRadius: 6,
        cursor: 'pointer',
        color: 'var(--color-text-secondary)',
        fontSize: 14,
      }}>
        {item}
      </div>
    ))}
  </div>
);

const Content = () => (
  <div style={{ padding: '2rem', color: 'var(--color-text-primary)' }}>
    <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: '1rem' }}>Page Content</h1>
    <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
      Main content area. AppShell handles the layout chrome.
    </p>
  </div>
);

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    header: <Header />,
    children: <Content />,
    toastRegion: null,
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSidebar: Story = {
  args: {
    sidebar: <Sidebar />,
  },
};

export const NoSidebar: Story = {
  args: {},
};

export const WithApiDegradedBanner: Story = {
  args: {
    sidebar: <Sidebar />,
    apiDegraded: (
      <div style={{
        background: '#fffbeb',
        color: '#92400e',
        padding: '0.5rem 1.5rem',
        fontSize: 13,
        borderTop: '1px solid #fde68a',
      }}>
        API is experiencing degraded performance.
      </div>
    ),
  },
};

export const LoadingState: Story = {
  args: {
    sidebar: <Sidebar />,
    loading: true,
  },
};
