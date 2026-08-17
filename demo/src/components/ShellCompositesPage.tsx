import { useState } from 'react';
import {
  ChannelHeader,
  PresenceAvatars,
  NotificationCenter,
  UserMenu,
  Breadcrumbs,
  PageHeader as LibPageHeader,
  IconButton,
  Button,
} from '@connorhoehnslalom/ui-components/shared';
import type {
  NotificationItem,
  PresenceUser,
  UserMenuItem,
} from '@connorhoehnslalom/ui-components/shared';
import {
  ExampleBlock,
  PropsTable,
  PageHeader,
  useRegisterToc,
} from '../shared';
import type { TocItem } from '../shared';

const tocItems: TocItem[] = [
  { id: 'channel-header', label: 'ChannelHeader', level: 2 },
  { id: 'presence-avatars', label: 'PresenceAvatars', level: 2 },
  { id: 'notification-center', label: 'NotificationCenter', level: 2 },
  { id: 'user-menu', label: 'UserMenu', level: 2 },
  { id: 'breadcrumbs', label: 'Breadcrumbs', level: 2 },
  { id: 'page-header', label: 'PageHeader', level: 2 },
  { id: 'props', label: 'API Reference', level: 2 },
];

const MOCK_USERS: PresenceUser[] = [
  { id: 'u1', name: 'Alice Chen', online: true },
  { id: 'u2', name: 'Devon Lee', online: true },
  { id: 'u3', name: 'Erin Pope', online: true },
  { id: 'u4', name: 'Marcus Wu', online: false },
  { id: 'u5', name: 'Sara Bashir', online: true },
  { id: 'u6', name: 'Hiro Tanaka', online: true },
  { id: 'u7', name: 'Priya Rao', online: false },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'New comment on "Q3 roadmap"',
    body: 'Devon Lee mentioned you in a thread',
    timestamp: Date.now() - 4 * 60_000,
    read: false,
    icon: '💬',
    category: 'Documents',
  },
  {
    id: 'n2',
    title: 'Pipeline auth-rotation finished',
    body: '12 stages green · 0 retries',
    timestamp: Date.now() - 35 * 60_000,
    read: false,
    icon: '✅',
    category: 'Pipelines',
  },
  {
    id: 'n3',
    title: 'Sara invited you to #ingest-debug',
    timestamp: Date.now() - 3 * 3_600_000,
    read: true,
    icon: '👋',
    category: 'Channels',
  },
];

export default function ShellCompositesPage() {
  useRegisterToc(tocItems);

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const userMenuItems: UserMenuItem[] = [
    { label: 'Profile', icon: '👤', onClick: () => alert('Profile') },
    { label: 'Settings', icon: '⚙️', onClick: () => alert('Settings') },
    {
      label: 'Help & feedback',
      icon: '❓',
      onClick: () => alert('Help'),
      separator: true,
    },
    {
      label: 'Sign out',
      icon: '🚪',
      onClick: () => alert('Sign out'),
      separator: true,
      danger: true,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Shell Composites"
        description="Page-shell primitives that absorb the repetitive scaffolding around portal screens — header bars, presence rows, breadcrumbs, notification inboxes, and user menus. Use these instead of hand-rolled HTML to keep visual + accessibility behavior consistent across consumer apps."
        importPath="import { ChannelHeader, PresenceAvatars, NotificationCenter, UserMenu, Breadcrumbs, PageHeader } from '@connorhoehnslalom/ui-components/shared'"
      />

      {/* ChannelHeader */}
      <ExampleBlock
        id="channel-header"
        title="ChannelHeader"
        description="Header bar for a channel / DM / thread view. Composes Avatar + StatusDot + actions into a single bar."
        background="#fff"
        code={`<ChannelHeader
  name="ingest-debug"
  description="Live pipeline telemetry"
  memberCount={47}
  online
  actions={
    <>
      <IconButton aria-label="Notifications">🔔</IconButton>
      <IconButton aria-label="Settings">⚙</IconButton>
    </>
  }
/>`}
      >
        <ChannelHeader
          name="ingest-debug"
          description="Live pipeline telemetry"
          memberCount={47}
          online
          actions={
            <>
              <IconButton aria-label="Notifications">🔔</IconButton>
              <IconButton aria-label="Settings">⚙</IconButton>
            </>
          }
        />
      </ExampleBlock>

      {/* PresenceAvatars */}
      <ExampleBlock
        id="presence-avatars"
        title="PresenceAvatars"
        description="Stacked avatar row for online users. Renders up to maxVisible avatars, then a clickable +N overflow chip. Online users get a green status dot."
        code={`<PresenceAvatars users={users} maxVisible={4} />`}
      >
        <div className="flex flex-col gap-4">
          <PresenceAvatars users={MOCK_USERS} maxVisible={4} />
          <PresenceAvatars users={MOCK_USERS.slice(0, 3)} size={40} />
        </div>
      </ExampleBlock>

      {/* NotificationCenter */}
      <ExampleBlock
        id="notification-center"
        title="NotificationCenter"
        description="Inbox-style notification feed with Unread / All tabs. Empty states are handled internally. Mark-all-read and clear-all are caller-controlled."
        code={`<NotificationCenter
  items={notifications}
  onItemClick={(item) => navigate(item.id)}
  onMarkAllRead={() => markAllRead()}
  onClearAll={() => clearAll()}
/>`}
      >
        <div className="max-w-md border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] overflow-hidden">
          <NotificationCenter
            items={notifications}
            onItemClick={(item) => alert(`Open: ${item.title}`)}
            onMarkAllRead={() =>
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
            }
            onClearAll={() => setNotifications([])}
          />
        </div>
      </ExampleBlock>

      {/* UserMenu */}
      <ExampleBlock
        id="user-menu"
        title="UserMenu"
        description="Avatar trigger that opens a dropdown menu for the signed-in user. Supports separators and a danger-style destructive item (typically Sign out)."
        code={`<UserMenu
  user={{ name: 'Alice Chen', email: 'alice@example.com' }}
  items={[
    { label: 'Profile', onClick: openProfile },
    { label: 'Settings', onClick: openSettings },
    { label: 'Sign out', onClick: signOut, separator: true, danger: true },
  ]}
/>`}
      >
        <div className="flex items-center gap-6">
          <UserMenu
            user={{ name: 'Alice Chen', email: 'alice@example.com' }}
            items={userMenuItems}
          />
          <span className="text-sm text-[var(--color-text-secondary)]">
            Click the avatar to open the menu
          </span>
        </div>
      </ExampleBlock>

      {/* Breadcrumbs */}
      <ExampleBlock
        id="breadcrumbs"
        title="Breadcrumbs"
        description="Accessible breadcrumb trail. Items can be links, click handlers, or plain text. Long trails truncate via maxItems."
        code={`<Breadcrumbs
  items={[
    { label: 'Workflows', href: '/workflows' },
    { label: 'Pipelines', href: '/workflows/pipelines' },
    { label: 'auth-rotation', onClick: e => openPipeline(e) },
    { label: 'run #4218' },
  ]}
/>`}
      >
        <div className="flex flex-col gap-4">
          <Breadcrumbs
            items={[
              { label: 'Workflows', href: '#' },
              { label: 'Pipelines', href: '#' },
              { label: 'auth-rotation', href: '#' },
              { label: 'run #4218' },
            ]}
          />
          <Breadcrumbs
            items={[
              { label: 'Org', href: '#' },
              { label: 'Engineering', href: '#' },
              { label: 'Platform', href: '#' },
              { label: 'Infrastructure', href: '#' },
              { label: 'Observability', href: '#' },
              { label: 'Dashboards' },
            ]}
            maxItems={4}
          />
        </div>
      </ExampleBlock>

      {/* PageHeader */}
      <ExampleBlock
        id="page-header"
        title="PageHeader"
        description="Page-level title + description + actions header. Replaces the ad-hoc h1/p/button pattern repeated across every portal page. Supports a back link and an optional badge."
        background="#fff"
        code={`<PageHeader
  title="Pipeline runs"
  description="History of all executions across this workspace."
  back={{ label: 'Pipelines', to: '/workflows/pipelines' }}
  badge={<span className="text-xs px-2 py-0.5 rounded bg-warning-bg text-warning-fg">12 active</span>}
  actions={
    <>
      <Button variant="ghost">Filter</Button>
      <Button variant="primary">+ New run</Button>
    </>
  }
/>`}
      >
        <LibPageHeader
          title="Pipeline runs"
          description="History of all executions across this workspace."
          back={{ label: 'Pipelines', to: '#' }}
          badge={
            <span className="text-xs px-2 py-0.5 rounded bg-warning-bg text-warning-fg font-medium">
              12 active
            </span>
          }
          actions={
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                Filter
              </Button>
              <Button variant="primary" size="sm">
                + New run
              </Button>
            </div>
          }
        />
      </ExampleBlock>

      {/* API Reference */}
      <h2 id="props" className="text-2xl font-semibold text-[var(--color-text-primary)] mt-12 mb-4">
        API Reference
      </h2>

      <PropsTable
        componentName="ChannelHeader"
        props={[
          { name: 'name', type: 'string', required: true, description: 'Channel or user display name.' },
          { name: 'description', type: 'string', description: 'Short description shown below the name.' },
          { name: 'memberCount', type: 'number', description: 'Member-count chip next to the name.' },
          { name: 'avatarUrl', type: 'string', description: 'Avatar image; falls back to initials.' },
          { name: 'online', type: 'boolean', description: 'Show a green online indicator.' },
          { name: 'actions', type: 'ReactNode', description: 'Right-aligned action area.' },
          { name: 'onMembersClick', type: '() => void', description: 'Fired when the member-count area is clicked.' },
          { name: 'className', type: 'string', description: 'Extra classes merged onto the root.' },
        ]}
      />

      <PropsTable
        componentName="PresenceAvatars"
        props={[
          { name: 'users', type: 'PresenceUser[]', required: true, description: 'Users to render. Each is { id, name, avatarUrl?, online? }.' },
          { name: 'maxVisible', type: 'number', default: '5', description: 'Avatars to render before the +N overflow chip.' },
          { name: 'size', type: 'number', default: '28', description: 'Avatar diameter in px.' },
          { name: 'onMoreClick', type: '() => void', description: 'Called when the +N chip is clicked.' },
          { name: 'className', type: 'string', description: 'Extra classes merged onto the root.' },
        ]}
      />

      <PropsTable
        componentName="NotificationCenter"
        props={[
          { name: 'items', type: 'NotificationItem[]', required: true, description: 'Notifications to render. Each is { id, title, body?, timestamp?, read?, icon?, category? }.' },
          { name: 'onItemClick', type: '(item) => void', description: 'Fired when a notification row is clicked.' },
          { name: 'onMarkAllRead', type: '() => void', description: 'Fired by the "mark all read" toolbar button.' },
          { name: 'onClearAll', type: '() => void', description: 'Fired by the "clear all" toolbar button.' },
          { name: 'className', type: 'string', description: 'Extra classes merged onto the root.' },
        ]}
      />

      <PropsTable
        componentName="UserMenu"
        props={[
          { name: 'user', type: 'UserMenuUser', required: true, description: '{ name, email, avatarUrl? } shown in the menu header.' },
          { name: 'items', type: 'UserMenuItem[]', required: true, description: 'Menu items. Each is { label, onClick, icon?, separator?, danger? }.' },
          { name: 'className', type: 'string', description: 'Extra classes merged onto the root.' },
        ]}
      />

      <PropsTable
        componentName="Breadcrumbs"
        props={[
          { name: 'items', type: 'BreadcrumbItem[]', required: true, description: 'Trail items. Each is { label, href?, onClick? }. The last item is rendered as the current page.' },
          { name: 'separator', type: 'ReactNode', default: '"/"', description: 'Custom separator between items.' },
          { name: 'maxItems', type: 'number', description: 'Truncate the middle of the trail to fit this many visible items.' },
          { name: 'className', type: 'string', description: 'Extra classes merged onto the root.' },
        ]}
      />

      <PropsTable
        componentName="PageHeader"
        props={[
          { name: 'title', type: 'string', required: true, description: 'Page title.' },
          { name: 'description', type: 'string', description: 'Lede paragraph under the title.' },
          { name: 'back', type: '{ label, to, onClick? }', description: 'Back link rendered above the title.' },
          { name: 'badge', type: 'ReactNode', description: 'Status pill rendered next to the title.' },
          { name: 'actions', type: 'ReactNode', description: 'Right-aligned action area.' },
          { name: 'className', type: 'string', description: 'Extra classes merged onto the root.' },
        ]}
      />
    </div>
  );
}
