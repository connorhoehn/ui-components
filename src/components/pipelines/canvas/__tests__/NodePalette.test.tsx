// canvas/__tests__/NodePalette.test.tsx
//
// Vitest + Testing Library coverage for the revamped NodePalette.
// Tests: search filtering, category chip filtering, collapsed sections,
// recently-used pinning, clear-filters, compact toggle.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import NodePalette, { recordRecentType } from '../NodePalette';
import { categoryFor } from '../../nodes/categories';

// ---------------------------------------------------------------------------
// localStorage stub
// ---------------------------------------------------------------------------

const localStorageData: Record<string, string> = {};

const localStorageMock = {
  getItem: vi.fn((key: string) => localStorageData[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { localStorageData[key] = value; }),
  removeItem: vi.fn((key: string) => { delete localStorageData[key]; }),
  clear: vi.fn(() => { for (const k of Object.keys(localStorageData)) delete localStorageData[k]; }),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderPalette(props = {}) {
  return render(<NodePalette {...props} />);
}

function getSearch() {
  return screen.getByTestId('palette-search') as HTMLInputElement;
}

function typeSearch(text: string) {
  fireEvent.change(getSearch(), { target: { value: text } });
}

function getScrollBody() {
  return screen.getByTestId('palette-scroll');
}

function getAllVisibleNodeTypes(): string[] {
  return Array.from(
    getScrollBody().querySelectorAll('[data-node-type]'),
  ).map((el) => el.getAttribute('data-node-type')!);
}

// ---------------------------------------------------------------------------
// Reset storage between tests
// ---------------------------------------------------------------------------

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

afterEach(() => {
  localStorageMock.clear();
});

// ---------------------------------------------------------------------------
// Search filtering
// ---------------------------------------------------------------------------

describe('search', () => {
  it('shows all items when query is empty', () => {
    renderPalette();
    const types = getAllVisibleNodeTypes();
    // All 27 items should be present
    expect(types.length).toBeGreaterThanOrEqual(27);
  });

  it('filters items by name (case-insensitive)', () => {
    renderPalette();
    typeSearch('vision');
    const types = getAllVisibleNodeTypes();
    // Should include vision-* items
    expect(types.some((t) => t.includes('vision'))).toBe(true);
    // Should NOT include trigger or llm
    expect(types).not.toContain('trigger');
    expect(types).not.toContain('llm');
  });

  it('filters by node type string', () => {
    renderPalette();
    typeSearch('image:crop');
    const types = getAllVisibleNodeTypes();
    expect(types).toContain('image:crop');
    expect(types).not.toContain('trigger');
  });

  it('filters by description', () => {
    renderPalette();
    typeSearch('neptune');
    const types = getAllVisibleNodeTypes();
    expect(types).toContain('graph-query');
  });

  it('shows empty state when nothing matches', () => {
    renderPalette();
    typeSearch('zzznomatch');
    expect(screen.getByTestId('palette-empty')).toBeTruthy();
    expect(screen.getByTestId('palette-clear-filters')).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Category chip filtering
// ---------------------------------------------------------------------------

describe('category chip filter', () => {
  it('activating a chip narrows to that category', () => {
    renderPalette();
    const chips = screen.getByTestId('palette-category-chips');
    const aiChip = within(chips).getByText('AI');
    fireEvent.click(aiChip);
    const types = getAllVisibleNodeTypes();
    expect(types.some((t) => t.includes('vision'))).toBe(true);
    expect(types).toContain('llm');
    expect(types).not.toContain('trigger');
    expect(types).not.toContain('condition');
  });

  it('activating two chips shows both categories', () => {
    renderPalette();
    const chips = screen.getByTestId('palette-category-chips');
    fireEvent.click(within(chips).getByText('AI'));
    fireEvent.click(within(chips).getByText('Sources'));
    const types = getAllVisibleNodeTypes();
    expect(types).toContain('llm');
    expect(types).toContain('trigger');
    expect(types).not.toContain('condition');
  });

  it('deactivating a chip removes the filter', () => {
    renderPalette();
    const chips = screen.getByTestId('palette-category-chips');
    const sourcesChip = within(chips).getByText('Sources');
    fireEvent.click(sourcesChip);
    fireEvent.click(sourcesChip); // toggle off
    const types = getAllVisibleNodeTypes();
    expect(types.length).toBeGreaterThanOrEqual(27);
  });
});

// ---------------------------------------------------------------------------
// Collapsible sections
// ---------------------------------------------------------------------------

describe('collapsible sections', () => {
  it('all categories start expanded by default', () => {
    renderPalette();
    // trigger node should be visible (Triggers category expanded)
    expect(getAllVisibleNodeTypes()).toContain('trigger');
  });

  it('clicking a category header collapses its items', () => {
    renderPalette();
    const sourcesSection = screen.getByTestId('palette-category-Sources');
    const header = sourcesSection.querySelector('button')!;
    // Starts expanded — trigger is visible
    expect(getAllVisibleNodeTypes()).toContain('trigger');
    fireEvent.click(header);
    // After collapse, trigger disappears from visible list
    expect(getAllVisibleNodeTypes()).not.toContain('trigger');
  });

  it('clicking collapsed header re-expands the section', () => {
    renderPalette();
    const sourcesSection = screen.getByTestId('palette-category-Sources');
    const header = sourcesSection.querySelector('button')!;
    fireEvent.click(header); // collapse
    fireEvent.click(header); // expand
    expect(getAllVisibleNodeTypes()).toContain('trigger');
  });

  it('persists collapsed state to localStorage', () => {
    renderPalette();
    const sourcesSection = screen.getByTestId('palette-category-Sources');
    const header = sourcesSection.querySelector('button')!;
    fireEvent.click(header); // collapse
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'pipeline.palette.collapsed.Sources',
      'true',
    );
  });
});

// ---------------------------------------------------------------------------
// Recently used
// ---------------------------------------------------------------------------

describe('recently used', () => {
  it('does not show recently-used section when buffer is empty', () => {
    renderPalette();
    expect(screen.queryByTestId('palette-recents')).toBeNull();
  });

  it('shows recently-used section after recordRecentType is called and component re-renders', () => {
    // Seed localStorage directly
    localStorageData['pipeline.palette.recents'] = JSON.stringify(['llm']);
    renderPalette();
    expect(screen.getByTestId('palette-recents')).toBeTruthy();
    // LLM item appears in recents
    const recentsSection = screen.getByTestId('palette-recents');
    expect(within(recentsSection).getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('recently-used items pin before categories (first in flat order)', () => {
    localStorageData['pipeline.palette.recents'] = JSON.stringify(['llm']);
    renderPalette();
    const types = getAllVisibleNodeTypes();
    // llm should appear before trigger (triggers is first category)
    const llmIdx = types.indexOf('llm');
    const triggerIdx = types.indexOf('trigger');
    expect(llmIdx).toBeLessThan(triggerIdx);
  });

  it('hides recently-used section when search is active', () => {
    localStorageData['pipeline.palette.recents'] = JSON.stringify(['llm']);
    renderPalette();
    expect(screen.getByTestId('palette-recents')).toBeTruthy();
    typeSearch('vision');
    expect(screen.queryByTestId('palette-recents')).toBeNull();
  });

  it('hides recently-used section when a category chip is active', () => {
    localStorageData['pipeline.palette.recents'] = JSON.stringify(['llm']);
    renderPalette();
    const chips = screen.getByTestId('palette-category-chips');
    fireEvent.click(within(chips).getByText('AI'));
    expect(screen.queryByTestId('palette-recents')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Clear filters
// ---------------------------------------------------------------------------

describe('clear filters', () => {
  it('clear-filters button resets search and chips', () => {
    renderPalette();
    typeSearch('zzznomatch');
    expect(screen.getByTestId('palette-empty')).toBeTruthy();
    fireEvent.click(screen.getByTestId('palette-clear-filters'));
    // Empty state gone
    expect(screen.queryByTestId('palette-empty')).toBeNull();
    // Search input cleared
    expect(getSearch().value).toBe('');
    // All items back
    expect(getAllVisibleNodeTypes().length).toBeGreaterThanOrEqual(27);
  });

  it('clear-filters also resets active category chips', () => {
    renderPalette();
    const chips = screen.getByTestId('palette-category-chips');
    fireEvent.click(within(chips).getByText('AI'));
    typeSearch('zzznomatch');
    fireEvent.click(screen.getByTestId('palette-clear-filters'));
    // All items visible (chips reset)
    expect(getAllVisibleNodeTypes().length).toBeGreaterThanOrEqual(27);
  });
});

// ---------------------------------------------------------------------------
// Compact toggle
// ---------------------------------------------------------------------------

describe('compact toggle', () => {
  it('starts in card view (compact off)', () => {
    renderPalette();
    const toggle = screen.getByTestId('palette-compact-toggle');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('clicking compact toggle switches to compact view', () => {
    renderPalette();
    const toggle = screen.getByTestId('palette-compact-toggle');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('compact view items have h-8 class instead of h-11', () => {
    localStorageData['pipeline.palette.compact'] = 'true';
    renderPalette();
    const scroll = getScrollBody();
    // In compact mode, items should not have h-11 class
    const cardItems = scroll.querySelectorAll('.h-11');
    expect(cardItems.length).toBe(0);
    // Compact items have h-8
    const compactItems = scroll.querySelectorAll('.h-8');
    expect(compactItems.length).toBeGreaterThan(0);
  });

  it('persists compact preference to localStorage', () => {
    renderPalette();
    fireEvent.click(screen.getByTestId('palette-compact-toggle'));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('pipeline.palette.compact', 'true');
  });
});

// ---------------------------------------------------------------------------
// Disabled types
// ---------------------------------------------------------------------------

describe('disabledTypes prop', () => {
  it('marks disabled items with data-disabled', () => {
    renderPalette({ disabledTypes: ['trigger'] });
    const triggerEl = screen.getByTestId('palette-item-trigger');
    expect(triggerEl).toHaveAttribute('data-disabled');
  });

  it('disabled items are not draggable', () => {
    renderPalette({ disabledTypes: ['trigger'] });
    const triggerEl = screen.getByTestId('palette-item-trigger');
    expect(triggerEl).toHaveAttribute('draggable', 'false');
  });
});

// ---------------------------------------------------------------------------
// Drag handoff
// ---------------------------------------------------------------------------

describe('drag handoff', () => {
  it('sets application/reactflow MIME on dragstart', () => {
    renderPalette();
    const llmEl = screen.getByTestId('palette-item-llm');
    const transferData: Record<string, string> = {};
    fireEvent.dragStart(llmEl, {
      dataTransfer: {
        setData: (type: string, val: string) => { transferData[type] = val; },
        effectAllowed: '',
      },
    });
    expect(transferData['application/reactflow']).toBe(JSON.stringify({ nodeType: 'llm' }));
  });
});

// ---------------------------------------------------------------------------
// Category-grouped sections (NODE_CATEGORIES-driven)
// ---------------------------------------------------------------------------

describe('category-grouped sections', () => {
  const expectInCategory = (nodeType: string, categoryName: string) => {
    renderPalette();
    const section = screen.getByTestId(`palette-category-${categoryName}`);
    const types = Array.from(section.querySelectorAll('[data-node-type]')).map(
      (el) => el.getAttribute('data-node-type')!,
    );
    expect(types).toContain(nodeType);
  };

  it('trigger is in Sources', () => expectInCategory('trigger', 'Sources'));
  it('image-source is in Sources', () => expectInCategory('image-source', 'Sources'));
  it('knowledge-base is in Sources', () => expectInCategory('knowledge-base', 'Sources'));
  it('transform is in Transform', () => expectInCategory('transform', 'Transform'));
  it('memory is in Transform', () => expectInCategory('memory', 'Transform'));
  it('image:crop is in Transform', () => expectInCategory('image:crop', 'Transform'));
  it('image:resize is in Transform', () => expectInCategory('image:resize', 'Transform'));
  it('llm is in AI', () => expectInCategory('llm', 'AI'));
  it('agent is in AI', () => expectInCategory('agent', 'AI'));
  it('image:generate is in AI', () => expectInCategory('image:generate', 'AI'));
  it('image:vision-analyze is in AI', () => expectInCategory('image:vision-analyze', 'AI'));
  it('condition is in Control', () => expectInCategory('condition', 'Control'));
  it('scatter is in Control', () => expectInCategory('scatter', 'Control'));
  it('guardrail is in Control', () => expectInCategory('guardrail', 'Control'));
  it('action is in Sinks', () => expectInCategory('action', 'Sinks'));
  it('image:save is in Sinks', () => expectInCategory('image:save', 'Sinks'));
  it('approval is in Human', () => expectInCategory('approval', 'Human'));

  it('every palette item sits in the section matching categoryFor(type)', () => {
    renderPalette();
    const LABELS: Record<string, string> = {
      source: 'Sources',
      transform: 'Transform',
      ai: 'AI',
      control: 'Control',
      sink: 'Sinks',
      human: 'Human',
    };
    const items = getScrollBody().querySelectorAll('[data-node-type]');
    expect(items.length).toBeGreaterThanOrEqual(27);
    for (const el of Array.from(items)) {
      const type = el.getAttribute('data-node-type')!;
      const cat = categoryFor(type);
      expect(cat, `no category for palette item "${type}"`).toBeDefined();
      const section = el.closest(`[data-testid="palette-category-${LABELS[cat!]}"]`);
      expect(section, `"${type}" not inside ${LABELS[cat!]} section`).not.toBeNull();
    }
  });

  it('renders all six category section headers in order', () => {
    renderPalette();
    const sections = Array.from(
      getScrollBody().querySelectorAll('[data-testid^="palette-category-"]'),
    ).map((el) => el.getAttribute('data-testid'));
    expect(sections).toEqual([
      'palette-category-Sources',
      'palette-category-Transform',
      'palette-category-AI',
      'palette-category-Control',
      'palette-category-Sinks',
      'palette-category-Human',
    ]);
  });

  it('section headers carry a category-colored accent dot', () => {
    renderPalette();
    for (const key of ['source', 'transform', 'ai', 'control', 'sink', 'human']) {
      const dot = screen.getByTestId(`palette-section-accent-${key}`);
      expect(dot.className).toContain(`bg-cat-${key}`);
    }
  });

  it('items carry a category-colored accent dot', () => {
    renderPalette();
    expect(screen.getByTestId('palette-accent-trigger').className).toContain('bg-cat-source');
    expect(screen.getByTestId('palette-accent-llm').className).toContain('bg-cat-ai');
    expect(screen.getByTestId('palette-accent-image:resize').className).toContain('bg-cat-transform');
    expect(screen.getByTestId('palette-accent-condition').className).toContain('bg-cat-control');
    expect(screen.getByTestId('palette-accent-image:save').className).toContain('bg-cat-sink');
    expect(screen.getByTestId('palette-accent-approval').className).toContain('bg-cat-human');
  });
});
