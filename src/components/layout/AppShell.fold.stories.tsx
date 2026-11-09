import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AppShell } from './AppShell';
import { NavRail, type NavRailItem } from '../shared/NavRail';
import { AppBrand } from '../shared/AppBrand';
import { ThemeModeToggle, type ThemeMode } from '../shared/ThemeModeToggle';
import { PageFrame } from '../shared/PageFrame';
import { ActivityIcon, DocumentIcon, FolderIcon, GraphIcon, ChartIcon, CodeIcon } from '../ui/Icons';

const ITEMS: NavRailItem[] = [
  { to: '#/overview', label: 'Overview', group: 'WORKSPACE', icon: <ChartIcon /> },
  { to: '#/episodes', label: 'Episodes', group: 'PRODUCTION', icon: <DocumentIcon /> },
  { to: '#/assets', label: 'Cast & assets', group: 'PRODUCTION', icon: <FolderIcon /> },
  { to: '#/work', label: 'Work', group: 'PRODUCTION', icon: <ActivityIcon />, badge: 2 },
  { to: '#/builds', label: 'Builds', group: 'PIPELINE', icon: <CodeIcon /> },
  { to: '#/renders', label: 'Renders', group: 'PIPELINE', icon: <GraphIcon /> },
];

function FoldingShell({ initialFolded }: { initialFolded: boolean }) {
  const [folded, setFolded] = useState(initialFolded);
  const [mode, setMode] = useState<ThemeMode>('light');
  return (
    <AppShell
      layout="fill"
      sidebarWidth={224}
      sidebarFold={{ folded, toggle: () => setFolded((f) => !f) }}
      header={<><AppBrand mark={<DocumentIcon />} name="Storymaker" secondary="Studio" href="#/" /><ThemeModeToggle className="ml-auto" mode={mode} onModeChange={setMode} /></>}
      sidebar={<NavRail title="Studio" items={ITEMS} activeHref="#/episodes" />}
    >
      <PageFrame title="Episodes" description="The rail is an in-flow column: folding it gives its width to the page.">
        {null}
      </PageFrame>
    </AppShell>
  );
}

const meta = {
  title: 'Layout/AppShell/Folding rail',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const base = { header: null, children: null };

/** `sidebarFold` open: the NavRail at sidebarWidth, in flow, with its « toggle. */
export const Open: Story = { args: base, render: () => <FoldingShell initialFolded={false} /> };

/** Folded: the 44px icon strip; labels in tooltips, the » toggle at the top. */
export const Folded: Story = { args: base, render: () => <FoldingShell initialFolded /> };
