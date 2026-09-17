// Server-registered kinds in the palette.
//
// The palette's catalog was the library's own ~37 node types. platform-api
// registers ~50 more — `document:apply`, `transcript:store`, `media:classify` —
// and the document, transcript, recording and media pipelines are built almost
// entirely from those. So the palette listed mostly things those pipelines
// never use, while omitting everything they are made of, and relevance ranking
// had nothing to rank.

import { render, screen, cleanup, within, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import NodePalette from '../NodePalette';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../services/PipelineEditorServicesContext';

const services: PipelineEditorServices = { getImageUrl: (id) => `/img/${id}` };

const SERVER_KINDS = [
  'llm:judge',
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

  // These sections start SHUT. Expanded they put fifty-odd kinds on screen,
  // most of them irrelevant to whatever pipeline is open — `captions:arm` on a
  // document pipeline. The section header is the offer; opening it is the ask.
  it('lists a server kind the library has never heard of, once its section is opened', () => {
    renderPalette();
    expect(screen.queryByText('document:apply')).not.toBeInTheDocument();
    fireEvent.click(within(screen.getByTestId('palette-category-Document')).getByRole('button'));
    expect(screen.getByText('document:apply')).toBeInTheDocument();
  });

  it('offers every namespace as a section without listing their contents', () => {
    renderPalette();
    expect(screen.getByTestId('palette-category-Transcript')).toBeInTheDocument();
    expect(screen.queryByText('transcript:store')).not.toBeInTheDocument();
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
    fireEvent.click(within(doc).getByRole('button'));
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

  // A hit hidden inside a shut section is the same as no hit at all, so a
  // search opens whatever it matched.
  it('is searchable like any other item, shut section notwithstanding', () => {
    renderPalette();
    expect(screen.queryByText('media:classify')).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search nodes...'), { target: { value: 'classify' } });
    expect(screen.getByText('media:classify')).toBeInTheDocument();
  });

  // The same node offered in two places reads as two different things.
  it('does not repeat a pinned item in the section below', () => {
    renderPalette({ contextTypes: ['document:apply'] });
    expect(screen.getAllByText('document:apply')).toHaveLength(1);
  });
});

describe('NodePalette server kinds that extend a built-in type', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it('does not give `llm:judge` a section of its own', () => {
    // A lone "Llm" section sitting next to the AI category, containing one
    // item, reads as a bug rather than a category.
    renderPalette();
    expect(screen.queryByTestId('palette-category-Llm')).not.toBeInTheDocument();
  });

  it('files it under the category of the type it extends', () => {
    renderPalette();
    const ai = screen.getByTestId('palette-category-AI');
    expect(within(ai).getByText('llm:judge')).toBeInTheDocument();
  });

  it('says what it extends', () => {
    renderPalette();
    expect(screen.getByText('Server step · extends llm')).toBeInTheDocument();
  });

  it('still gives an unrelated namespace its own section', () => {
    renderPalette();
    expect(screen.getByTestId('palette-category-Document')).toBeInTheDocument();
  });
});
