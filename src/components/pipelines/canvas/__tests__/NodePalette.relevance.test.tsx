// The palette's pinned section, keyed on the pipeline rather than on history.
//
// It used to be RECENTLY USED: a five-entry localStorage ring buffer shared
// across every pipeline, so opening a document review offered whatever image
// nodes were last touched somewhere else. These assert that the section now
// answers "what belongs in THIS pipeline".

import { render, screen, cleanup, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import NodePalette from '../NodePalette';
import type { NodeType } from '../../../../types/pipeline';
import { recordRecentType } from '../NodePalette';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../services/PipelineEditorServicesContext';

const services: PipelineEditorServices = { getImageUrl: (id) => `/img/${id}` };

function renderPalette(contextTypes?: readonly string[], disabledTypes?: NodeType[]) {
  return render(
    <PipelineEditorServicesProvider services={services}>
      <NodePalette contextTypes={contextTypes} disabledTypes={disabledTypes} />
    </PipelineEditorServicesProvider>,
  );
}

function pinnedSection() {
  return screen.queryByTestId('palette-recents');
}

describe('NodePalette pinned section', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it('shows nothing pinned when there is no context and no history', () => {
    renderPalette();
    expect(pinnedSection()).not.toBeInTheDocument();
  });

  it('falls back to recently used when no context is given', () => {
    recordRecentType('image:crop');
    renderPalette();
    expect(pinnedSection()).toBeInTheDocument();
    expect(screen.getByText('Recently used')).toBeInTheDocument();
  });

  it('prefers the pipeline over history when context is given', () => {
    // The exact complaint: crop was recently used somewhere else, and this
    // pipeline has nothing to do with images.
    recordRecentType('image:crop');
    renderPalette(['llm']);
    expect(screen.getByText('Relevant here')).toBeInTheDocument();
    expect(screen.queryByText('Recently used')).not.toBeInTheDocument();
  });

  it('keeps the image nodes out of a pipeline that has none', () => {
    recordRecentType('image:crop');
    recordRecentType('image:resize');
    renderPalette(['llm']);
    const pinned = pinnedSection();
    expect(pinned).toBeInTheDocument();
    expect(within(pinned as HTMLElement).queryByText('Crop')).not.toBeInTheDocument();
    expect(within(pinned as HTMLElement).queryByText('Resize')).not.toBeInTheDocument();
  });

  it('falls back to history when nothing in the pipeline is in the palette', () => {
    // KNOWN LIMIT, worth pinning down: a document pipeline is built entirely
    // from server-registered kinds (`document:read`, `document:apply`) and the
    // palette's catalog holds none of them, so there is nothing to rank and the
    // old recents list is still what shows. Relevance cannot help the pipelines
    // that need it most until the palette carries server kinds too.
    recordRecentType('image:crop');
    renderPalette(['document:apply', 'document:read']);
    expect(screen.getByText('Recently used')).toBeInTheDocument();
  });

  it('offers the rest of an image pipeline’s own domain', () => {
    renderPalette(['image:crop']);
    const pinned = pinnedSection();
    expect(pinned).toBeInTheDocument();
    expect(within(pinned as HTMLElement).getByText('Crop')).toBeInTheDocument();
  });
});

describe('NodePalette relevance excludes what cannot be added', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it('does not suggest a node that is already placed', () => {
    // Every pipeline has exactly one trigger, so `trigger` is both the
    // strongest relevance signal and never addable. Leading with it put a node
    // marked "Placed" at the top of the section.
    renderPalette(['trigger', 'llm'], ['trigger']);
    const pinned = screen.queryByTestId('palette-recents');
    expect(pinned).toBeInTheDocument();
    expect(within(pinned as HTMLElement).queryByText('Trigger')).not.toBeInTheDocument();
  });

  it('still suggests the rest of the pipeline', () => {
    renderPalette(['trigger', 'llm'], ['trigger']);
    const pinned = screen.getByTestId('palette-recents');
    expect(within(pinned).getByText('LLM')).toBeInTheDocument();
  });
});
