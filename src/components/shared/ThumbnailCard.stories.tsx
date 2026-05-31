import type { Meta, StoryObj } from '@storybook/react-vite';
import ThumbnailCard from './ThumbnailCard';
import CatalogGrid from './CatalogGrid';

const meta = {
  title: 'Shared/ThumbnailCard',
  component: ThumbnailCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    title: 'Pipeline editor',
    description: 'Drag-and-drop graph editor for streaming pipelines.',
    category: 'Pipelines',
    categoryTone: 'info',
    icon: '🔗',
  },
} satisfies Meta<typeof ThumbnailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBadge: Story = {
  args: { badge: <span className="rounded bg-amber-500 text-white text-[10px] px-1.5 py-0.5">NEW</span> },
};

export const AsLink: Story = {
  args: { href: '#pipelines' },
};

export const AsButton: Story = {
  args: { onClick: () => undefined },
};

export const InCatalogGrid: Story = {
  render: () => (
    <CatalogGrid columns={3}>
      <ThumbnailCard title="Pipeline editor" description="Drag-and-drop graph." category="Pipelines" categoryTone="info" icon="🔗" />
      <ThumbnailCard title="Agent inbox"     description="AG-UI streaming chat." category="Agents"    categoryTone="purple" icon="🤖" />
      <ThumbnailCard title="Doc editor"      description="TipTap collaborative."  category="Docs"     categoryTone="success" icon="📝" />
      <ThumbnailCard title="Call widget"     description="Video + share + chat."  category="Video"    categoryTone="warning" icon="🎥" />
      <ThumbnailCard title="Observability"   description="Metrics, events, health." category="Ops"    categoryTone="neutral" icon="📈" />
      <ThumbnailCard title="Admin console"   description="Users, roles, audit log." category="Identity" categoryTone="caution" icon="🔐" />
    </CatalogGrid>
  ),
};
