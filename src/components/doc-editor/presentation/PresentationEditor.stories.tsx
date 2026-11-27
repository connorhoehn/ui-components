import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PresentationEditor } from './PresentationEditor';
import { EditorShell } from '../EditorShell';
import { AppShell } from '../../layout/AppShell';
import { NavRail, type NavRailItem } from '../../shared/NavRail';
import { SubNavLayout } from '../../shared/SubNavLayout';
import { IconButton } from '../../ui/IconButton';
import { ChartIcon, DocumentIcon, FolderIcon } from '../../ui/Icons';
import { ShellFocusModeProvider, useRailFold, useShellFocusMode } from '../../shared/railFold';
import type { DeckSpec } from './deckSpec';
import type { PresentationPreview } from './PresentationEditor';

// The editor with no modals (2.548.0). Insert → "All layouts…" swaps the
// stage for the gallery in place; Present replaces the editor's regions with
// the in-place presentation, and `onFocusModeChange` lets the shell fold
// both of its left rails while it is up.

const slideSvg = (title: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540"><rect width="960" height="540" fill="white"/><text x="60" y="120" font-size="48" font-family="sans-serif">${title}</text></svg>`;

const source = [{ documentId: 'doc-1', title: 'Q3 report' }];
const initial: DeckSpec = {
  title: 'Quarterly review',
  slides: [
    { id: 'summary', layout: 'title', title: 'Summary', notes: 'Open with the headline.', sources: source },
    { id: 'details', layout: 'bullets', title: 'Details', bullets: ['Launch A shipped', 'Launch B in beta'], notes: 'Name both teams.', sources: source },
  ],
};

function Editor({ onFocusModeChange }: { onFocusModeChange?: (focused: boolean) => void }) {
  const [spec, setSpec] = useState(initial);
  const preview: PresentationPreview = { slides: spec.slides.map((slide) => ({ id: slide.id, svg: slideSvg(slide.title) })) };
  return (
    <PresentationEditor
      spec={spec}
      onChange={setSpec}
      preview={preview}
      onRequestPreview={() => {}}
      onSaveRevision={async () => {}}
      revisions={[{ id: 'r1', label: 'v1' }]}
      activeRevisionId="r1"
      onSelectRevision={() => {}}
      sources={source}
      showNotes
      {...(onFocusModeChange ? { onFocusModeChange } : {})}
      renderFrame={({ toolbar, actions, surface, footer }) => (
        <EditorShell title={spec.title} toolbar={toolbar} headActions={actions} footer={footer}>
          {surface}
        </EditorShell>
      )}
    />
  );
}

const ITEMS: NavRailItem[] = [
  { to: '#/overview', label: 'Overview', icon: <ChartIcon /> },
  { to: '#/decks', label: 'Decks', icon: <DocumentIcon /> },
  { to: '#/files', label: 'Files', icon: <FolderIcon /> },
];

function Page() {
  const focus = useShellFocusMode();
  const section = useRailFold({ storageKey: 'story.deck-section-rail' });
  return (
    <SubNavLayout
      title="Decks"
      items={[{ path: '#/decks/q3', label: 'Quarterly review' }, { path: '#/decks/kick', label: 'Kickoff' }]}
      collapsed={section.folded}
      titleAction={<IconButton aria-label={section.folded ? 'Show decks' : 'Hide decks'} variant="ghost" size="sm" icon={<FolderIcon />} onClick={section.toggle} />}
      contentPadding="none"
    >
      <Editor onFocusModeChange={focus.request} />
    </SubNavLayout>
  );
}

function ShellWithRails() {
  const primary = useRailFold({ storageKey: 'story.primary-rail' });
  return (
    <AppShell
      layout="fill"
      contentPadding="none"
      sidebarWidth={224}
      sidebarFold={primary}
      header={null}
      sidebar={<NavRail title="Workspace" items={ITEMS} activeHref="#/decks" />}
    >
      <Page />
    </AppShell>
  );
}

function Story({ shell }: { shell: boolean }) {
  return shell ? (
    <ShellFocusModeProvider>
      <ShellWithRails />
    </ShellFocusModeProvider>
  ) : (
    <div className="h-[720px]">
      <Editor />
    </div>
  );
}

const meta = {
  title: 'Doc Editor/Presentation/PresentationEditor',
  component: Story,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Story>;

export default meta;
type StoryT = StoryObj<typeof meta>;

/**
 * The editor in its frame. Insert → "All layouts…" shows the gallery in
 * place of the stage (Back or Escape returns); Present shows the slide large
 * in the same box, with the speaker notes beside it.
 */
export const Editing: StoryT = { args: { shell: false } };

/**
 * In the owner's shell: a primary rail and a section rail. Present calls
 * `onFocusModeChange(true)`; the page passes `useShellFocusMode().request`,
 * so both rails fold, and Exit puts each back as it was.
 */
export const PresentInShellFocusMode: StoryT = { args: { shell: true } };
