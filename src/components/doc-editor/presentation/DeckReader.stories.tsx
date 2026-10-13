import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeckReader } from './DeckReader';
import { EditorShell } from '../EditorShell';
import type { DeckSpec } from './deckSpec';
import type { PresentationPreview } from './PresentationEditor';

const slideSvg = (title: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540"><rect width="960" height="540" fill="white"/><text x="60" y="120" font-size="48" font-family="sans-serif">${title}</text></svg>`;

const source = [{ documentId: 'doc-1', title: 'Q3 report' }];
const spec: DeckSpec = {
  title: 'Quarterly review',
  slides: [
    { id: 'summary', layout: 'title', title: 'Summary', bullets: ['Revenue up', 'Two launches'], notes: 'Open with the headline.', sources: source },
    { id: 'details', layout: 'bullets', title: 'Details', bullets: ['Launch A shipped', 'Launch B in beta'], sources: source },
  ],
};

function Reader({ preview, compactReview = false }: { preview: PresentationPreview; compactReview?: boolean }) {
  const [requests, setRequests] = useState(0);
  return (
    <div className="h-[640px]">
      <DeckReader
        spec={spec}
        compactReview={compactReview}
        preview={preview}
        onRequestPreview={() => setRequests((n) => n + 1)}
        onFocusConversation={() => {}}
        renderFrame={({ toolbar, surface }) => (
          <EditorShell title={`${spec.title} (${requests} preview requests)`} toolbar={toolbar}>
            {surface}
          </EditorShell>
        )}
      />
    </div>
  );
}

const meta = {
  title: 'Doc Editor/Presentation/DeckReader',
  component: Reader,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Reader>;

export default meta;
type Story = StoryObj<typeof meta>;

const rendered: PresentationPreview = {
  slides: [
    { id: 'summary', svg: slideSvg('Summary') },
    { id: 'details', svg: slideSvg('Details') },
    { id: 'sources', svg: slideSvg('Sources'), title: 'Sources', generated: true },
  ],
};

/** A rendered deck: thumbnails, the fitted stage, speaker notes. */
export const Default: Story = { args: { preview: rendered } };

/** Rendering in progress. */
export const Loading: Story = { args: { preview: 'loading' } };

/** The renderer failed: the stage says so and offers Retry. */
export const PreviewError: Story = { args: { preview: { error: 'The renderer is unavailable.' } } };

/** An active call's review: one View menu, notes closed. */
export const CompactReview: Story = { args: { preview: rendered, compactReview: true } };
