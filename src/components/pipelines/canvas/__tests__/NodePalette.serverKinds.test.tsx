// Server-registered kinds in the palette.
//
// The palette's catalog was the library's own ~37 node types. platform-api
// registers ~50 more — `document:apply`, `transcript:store`, `media:classify` —
// and the document, transcript, recording and media pipelines are built almost
// entirely from those. So the palette listed mostly things those pipelines
// never use, while omitting everything they are made of, and relevance ranking
// had nothing to rank.

import { render, screen, cleanup, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import NodePalette from '../NodePalette';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../services/PipelineEditorServicesContext';

const services: PipelineEditorServices = { getImageUrl: (id) => `/img/${id}` };

const SERVER_KINDS = [
  'document:read',
  'document:plan',
  'document:apply',
  'transcript:store',
  'transcript:publish',
  'media:classify',
];

function renderPalette(props: Partial<React.ComponentProps<typeof NodePalette>> = {}) {
  return render(
    <PipelineEditorServicesProvider services={services}>
      <NodePalette serverKinds={SERVER_KINDS} {...props} />
    </PipelineEditorServicesProvider>,
  );
}

describe('NodePalette server kinds', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it('lists a server kind the library has never heard of', () => {
    renderPalette();
    expect(screen.getByText('document:apply')).toBeInTheDocument();
  });

  it('groups them into one section per namespace', () => {
    renderPalette();
    expect(screen.getByTestId('palette-category-Document')).toBeInTheDocument();
    expect(screen.getByTestId('palette-category-Transcript')).toBeInTheDocument();
    expect(screen.getByTestId('palette-category-Media')).toBeInTheDocument();
  });

  it('keeps each namespace’s kinds in its own section', () => {
    renderPalette();
    const doc = screen.getByTestId('palette-category-Document');
    expect(within(doc).getByText('document:read')).toBeInTheDocument();
    expect(within(doc).queryByText('transcript:store')).not.toBeInTheDocument();
  });

  it('leaves the built-in categories alone', () => {
    renderPalette();
    expect(screen.getByTestId('palette-category-Sources')).toBeInTheDocument();
    expect(screen.getByTestId('palette-category-AI')).toBeInTheDocument();
  });

  it('changes nothing when no server kinds are given', () => {
    render(
      <PipelineEditorServicesProvider services={services}>
        <NodePalette />
      </PipelineEditorServicesProvider>,
    );
    expect(screen.queryByTestId('palette-category-Document')).not.toBeInTheDocument();
  });

  it('now has something to rank for a document pipeline', () => {
    // The whole point. Before this, document-agent-review's kinds were absent
    // from the catalog, relevance came back empty, and the section fell back to
    // a global recents list showing image nodes.
    renderPalette({ contextTypes: ['trigger', 'document:apply'], disabledTypes: ['trigger'] });
    const pinned = screen.getByTestId('palette-recents');
    expect(within(pinned).getByText('Relevant here')).toBeInTheDocument();
    expect(within(pinned).getByText('document:apply')).toBeInTheDocument();
  });

  it('pulls in the rest of the namespace, and nothing from another', () => {
    renderPalette({ contextTypes: ['document:apply'] });
    const pinned = screen.getByTestId('palette-recents');
    expect(within(pinned).getByText('document:read')).toBeInTheDocument();
    expect(within(pinned).queryByText('transcript:store')).not.toBeInTheDocument();
  });

  it('is searchable like any other item', () => {
    renderPalette();
    expect(screen.getByText('media:classify')).toBeInTheDocument();
  });
});
