import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';
import { SplitPane } from './SplitPane';

const Header = () => (
  <div className="flex h-[53px] items-center border-b border-border bg-surface px-6 text-[15px] font-semibold text-text-primary">
    My App
  </div>
);

const Sidebar = () => (
  <div className="flex h-full flex-col gap-2 bg-surface p-4">
    {['Dashboard', 'Projects', 'Messages', 'Settings'].map(item => (
      <div
        key={item}
        className="cursor-pointer rounded-md px-3 py-2 text-sm text-text-secondary"
      >
        {item}
      </div>
    ))}
  </div>
);

const Content = () => (
  <div className="p-8 text-text-primary">
    <h1 className="mb-4 text-xl font-semibold">Page Content</h1>
    <p className="text-sm text-text-secondary">
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
      <div className="border-t border-warning-border bg-warning-bg px-6 py-2 text-[13px] text-warning-fg">
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

const LongPane = ({ label }: { label: string }) => (
  <div className="h-full overflow-y-auto p-4 text-sm text-text-secondary">
    {Array.from({ length: 60 }, (_, i) => (
      <p key={i} className="m-0 py-1">{label} line {i + 1}</p>
    ))}
  </div>
);

/**
 * `layout="fill"`, the recommended mode for portal apps (since 2.504.0).
 * The shell is exactly 100dvh, the document never scrolls, and each pane of
 * the child layout scrolls on its own.
 */
export const Fill: Story = {
  args: {
    layout: 'fill',
    sidebar: <Sidebar />,
    children: <SplitPane primary={<LongPane label="Primary" />} secondary={<LongPane label="Secondary" />} />,
  },
};
