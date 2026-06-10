// src/components/pipelines/nodes/__tests__/BaseNode.categories.test.tsx
//
// Coverage for the node-category visual system (NODE-VISUALS-AUDIT §3.1):
// - no `category` prop → no accent bar, no icon chip, no data attribute
//   (full back-compat for the 30+ existing consumers)
// - each category → correct `data-node-category` + distinct chip shape
// - execution state styling is unaffected by category (orthogonal channels)
// - NODE_CATEGORIES registry covers every type in the node registry

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BaseNode from '../BaseNode';
import { NODE_CATEGORIES, categoryFor, type NodeCategory } from '../categories';

function renderNode(extra: Partial<Parameters<typeof BaseNode>[0]> = {}) {
  return render(
    <BaseNode icon="✦" subtitle="Test node" state="idle" {...extra} />,
  );
}

function card(container: HTMLElement): HTMLElement {
  const el = container.querySelector('[data-pipeline-node="true"]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

describe('BaseNode without category (back-compat)', () => {
  it('renders no accent bar, no chip, and no data-node-category', () => {
    const { container } = renderNode();
    expect(screen.queryByTestId('category-accent')).not.toBeInTheDocument();
    expect(screen.queryByTestId('category-chip')).not.toBeInTheDocument();
    expect(card(container).hasAttribute('data-node-category')).toBe(false);
  });

  it('renders the bare icon span exactly as before', () => {
    renderNode();
    const icon = screen.getByText('✦');
    expect(icon.className).toBe('text-sm leading-none shrink-0');
  });
});

describe('BaseNode with category', () => {
  const CASES: Array<{ category: NodeCategory; bar: string; chipHas: string[] }> = [
    { category: 'source',    bar: 'bg-cat-source',    chipHas: ['rounded-full', 'w-5', 'bg-cat-source/15'] },
    { category: 'transform', bar: 'bg-cat-transform', chipHas: ['rounded-md', 'w-5', 'bg-cat-transform/15'] },
    { category: 'ai',        bar: 'bg-cat-ai',        chipHas: ['rounded-md', 'bg-gradient-to-br', 'from-cat-ai/25'] },
    { category: 'control',   bar: 'bg-cat-control',   chipHas: ['rotate-45', 'rounded-[4px]', 'bg-cat-control/15'] },
    { category: 'sink',      bar: 'bg-cat-sink',      chipHas: ['rounded-md', 'w-5', 'bg-cat-sink/15'] },
    { category: 'human',     bar: 'bg-cat-human',     chipHas: ['rounded-full', 'w-7', 'bg-cat-human/15'] },
  ];

  it.each(CASES)('$category: data attribute, accent bar color, chip shape', ({ category, bar, chipHas }) => {
    const { container } = renderNode({ category });
    expect(card(container).getAttribute('data-node-category')).toBe(category);

    const accent = screen.getByTestId('category-accent');
    expect(accent.className).toContain(bar);
    expect(accent.className).toContain('w-[3px]');

    const chip = screen.getByTestId('category-chip');
    for (const cls of chipHas) {
      expect(chip.className).toContain(cls);
    }
  });

  it('chip shapes are pairwise distinct class sets', () => {
    const shapes = CASES.map(({ category }) => {
      const { unmount } = renderNode({ category });
      const cls = screen.getByTestId('category-chip').className;
      unmount();
      return cls;
    });
    expect(new Set(shapes).size).toBe(CASES.length);
  });

  it('counter-rotates the glyph inside the control diamond chip', () => {
    renderNode({ category: 'control' });
    const glyph = screen.getByText('✦');
    expect(glyph.className).toContain('-rotate-45');
  });
});

describe('category × state orthogonality', () => {
  const STATES = ['idle', 'pending', 'running', 'awaiting', 'completed', 'failed', 'skipped'] as const;

  it.each(STATES)('state %s card classes are identical with and without category', (state) => {
    const { container: plain, unmount } = renderNode({ state });
    const plainClasses = card(plain).className;
    unmount();

    const { container: withCat } = renderNode({ state, category: 'ai' });
    expect(card(withCat).className).toBe(plainClasses);
  });

  it('failed state keeps its red border + retry pill with a category present', () => {
    renderNode({ state: 'failed', category: 'control', onRetry: () => {} });
    const node = screen.getByRole('button', { name: /Test node, state: failed/ });
    expect(node.className).toContain('border-[#dc2626]');
    expect(node.className).toContain('bg-[#fef2f2]');
    expect(screen.getByLabelText('Retry from here')).toBeInTheDocument();
  });
});

describe('categories registry', () => {
  it('categoryFor returns mapped categories and undefined for unknown types', () => {
    expect(categoryFor('trigger')).toBe('source');
    expect(categoryFor('image-source')).toBe('source');
    expect(categoryFor('memory')).toBe('transform');
    expect(categoryFor('image:vision-analyze')).toBe('ai');
    expect(categoryFor('image:generate')).toBe('ai');
    expect(categoryFor('scatter')).toBe('control');
    expect(categoryFor('image:save')).toBe('sink');
    expect(categoryFor('approval')).toBe('human');
    expect(categoryFor('definitely-not-a-node')).toBeUndefined();
  });

  it('covers every type registered in the node registry', async () => {
    // Import lazily: the registry pulls in all node components.
    const { nodeTypes } = await import('../index');
    for (const type of Object.keys(nodeTypes)) {
      expect(NODE_CATEGORIES[type], `missing category for "${type}"`).toBeDefined();
    }
  });

  it('only contains known node types (no orphan entries)', async () => {
    const { nodeTypes } = await import('../index');
    const registered = new Set(Object.keys(nodeTypes));
    for (const type of Object.keys(NODE_CATEGORIES)) {
      expect(registered.has(type), `orphan category entry "${type}"`).toBe(true);
    }
  });
});
