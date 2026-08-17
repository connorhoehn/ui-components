// Palette "preview" marking.
//
// The palette ships more node types than any given backend implements — a
// survey against platform-api found 11 of 37 with no discoverable handler. An
// author could drag one on, wire it up, and get a pipeline that silently never
// ran that step.
//
// The library does NOT hardcode which types execute: that is a property of the
// host's deployment, and a baked-in guess goes stale the moment a handler
// ships. The host declares `executableNodeTypes`; the palette marks the rest.

import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import NodePalette from '../NodePalette';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../services/PipelineEditorServicesContext';

const baseServices: PipelineEditorServices = { getImageUrl: (id) => `/img/${id}` };

function renderPalette(services: PipelineEditorServices) {
  return render(
    <PipelineEditorServicesProvider services={services}>
      <NodePalette />
    </PipelineEditorServicesProvider>,
  );
}

afterEach(cleanup);

describe('NodePalette preview marking', () => {
  it('marks nothing when the host has not declared its executable types', () => {
    renderPalette(baseServices);
    expect(screen.queryAllByTestId(/^palette-preview-/)).toHaveLength(0);
  });

  it('marks a type the host cannot execute', () => {
    renderPalette({ ...baseServices, executableNodeTypes: ['trigger', 'llm'] });
    expect(screen.getByTestId('palette-preview-guardrail')).toBeInTheDocument();
    expect(screen.getByTestId('palette-preview-agent')).toBeInTheDocument();
  });

  it('leaves declared types unmarked', () => {
    renderPalette({ ...baseServices, executableNodeTypes: ['trigger', 'llm'] });
    expect(screen.queryByTestId('palette-preview-llm')).not.toBeInTheDocument();
    expect(screen.queryByTestId('palette-preview-trigger')).not.toBeInTheDocument();
  });

  it('flags the item element so callers can style or filter on it', () => {
    renderPalette({ ...baseServices, executableNodeTypes: ['llm'] });
    expect(screen.getByTestId('palette-item-guardrail')).toHaveAttribute('data-preview', 'true');
    expect(screen.getByTestId('palette-item-llm')).not.toHaveAttribute('data-preview');
  });

  it('explains the consequence in the tooltip rather than just labelling it', () => {
    renderPalette({ ...baseServices, executableNodeTypes: ['llm'] });
    expect(screen.getByTestId('palette-item-guardrail').getAttribute('title'))
      .toMatch(/no executor for it yet.*will not run/i);
  });

  it('still allows dragging a preview type — marking informs, it does not block', () => {
    renderPalette({ ...baseServices, executableNodeTypes: ['llm'] });
    expect(screen.getByTestId('palette-item-guardrail')).toHaveAttribute('draggable', 'true');
  });

  it('treats an empty declared list as "nothing executes" rather than "unset"', () => {
    renderPalette({ ...baseServices, executableNodeTypes: [] });
    expect(screen.getByTestId('palette-preview-llm')).toBeInTheDocument();
  });
});
