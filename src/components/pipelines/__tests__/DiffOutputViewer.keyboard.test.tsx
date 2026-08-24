// REGRESSION — the per-step diff disclosure header was a plain `<div onClick>`.
//
// The bug: the ▶/▼ header that expands a step's JSON diff had no role, no
// tabIndex and no key handler, so a keyboard user could never open any diff
// section. Its contents are only spans + a Chip, so it is now a real
// `<button type="button">` carrying `aria-expanded` — which gets focus,
// Enter and Space from the browser for free.
//
// jsdom does not synthesise a button's implicit Enter/Space -> click, so the
// assertions below pin the two things that actually regressed: the element
// is exposed as a button, and it is keyboard-focusable (a bare <div> is
// neither — `getByRole('button')` throws and `.focus()` is a no-op).

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { PipelineDefinition, PipelineRun } from '../../../types/pipeline';
import DiffOutputViewer from '../DiffOutputViewer';

const def = {
  id: 'p1',
  name: 'P',
  nodes: [{ id: 'n1', type: 'transform', position: { x: 0, y: 0 }, data: { type: 'transform' } }],
  edges: [],
} as unknown as PipelineDefinition;

function runWith(output: unknown): PipelineRun {
  return {
    id: 'r',
    pipelineId: 'p1',
    status: 'completed',
    steps: { n1: { nodeId: 'n1', status: 'completed', output } },
  } as unknown as PipelineRun;
}

function renderViewer() {
  render(
    <DiffOutputViewer runA={runWith({ rows: 1 })} runB={runWith({ rows: 2 })} def={def} />,
  );
  return screen.getByRole('button', { name: /Transform/ });
}

describe('DiffOutputViewer disclosure header — keyboard access', () => {
  it('renders the header as a real button with aria-expanded', () => {
    const header = renderViewer();
    expect(header.tagName).toBe('BUTTON');
    expect(header).toHaveAttribute('type', 'button');
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });

  it('is reachable by keyboard focus', () => {
    const header = renderViewer();
    header.focus();
    expect(document.activeElement).toBe(header);
  });

  it('expands the diff when activated, flipping aria-expanded', () => {
    const header = renderViewer();
    expect(screen.queryByText(/rows/)).toBeNull();
    fireEvent.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/rows/)).toBeInTheDocument();
  });
});
