import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import DocumentToolbar, { useDocumentToolbarSize, type DocumentToolbarSize } from './DocumentToolbar';
import { PresenceAvatars } from '../shared/PresenceAvatars';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';

/**
 * The formatting bar over a page, at each of its three one-row layouts.
 *
 * It never wraps. `Auto` (the default in the app) measures the bar's own box;
 * the fixed sizes are here to see each layout without dragging.
 */
const meta = {
  title: 'DocEditor/DocumentToolbar',
  component: DocumentToolbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DocumentToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const PEOPLE = [
  { id: 'ak', name: 'Alex Kim' },
  { id: 'mt', name: 'Maria Torres' },
];

/** What a host renders into `actions`: presence, and a Comment button that shrinks with the bar. */
function HostActions() {
  const size = useDocumentToolbarSize();
  return (
    <>
      <PresenceAvatars users={PEOPLE} size={24} />
      {size === 'wide' ? (
        <Button size="sm" variant="ghost">Comment</Button>
      ) : (
        <IconButton size="sm" variant="ghost" aria-label="Comment" title="Comment">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2.5 3.5h11v7h-6l-3 2.5v-2.5h-2z" strokeLinejoin="round" />
          </svg>
        </IconButton>
      )}
    </>
  );
}

function Page({ size, width }: { size: DocumentToolbarSize | 'auto'; width?: string }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<h1>Release plan</h1><p>The bar above never takes a second row. Resize the frame to watch the groups move behind ⋯.</p><ul><li>One row, always</li><li>Style ▾ at narrow</li></ul>',
  });
  return (
    <div className="flex h-screen flex-col bg-workspace">
      <div className="border-b border-border bg-surface-panel" style={width ? { width } : undefined}>
        <DocumentToolbar editor={editor} size={size} actions={<HostActions />} commentCount={2} gutterVisible onToggleGutter={() => {}} />
      </div>
      <div className="mx-auto my-6 w-full max-w-2xl rounded bg-paper p-8 text-paper-ink shadow">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

/** Measures its own box: drag the frame's edge and watch. */
export const Auto: Story = {
  args: { editor: null },
  render: () => <Page size="auto" />,
};

/** Everything on the bar — the layout at 1240px of bar and up. */
export const Wide: Story = {
  args: { editor: null },
  render: () => <Page size="wide" />,
};

/** Colour, alignment, spacing, inserts and clear behind ⋯; Comment is an icon. */
export const Medium: Story = {
  args: { editor: null },
  render: () => <Page size="medium" width="900px" />,
};

/** The three selects fold into one Style ▾. */
export const Narrow: Story = {
  args: { editor: null },
  render: () => <Page size="narrow" width="560px" />,
};
