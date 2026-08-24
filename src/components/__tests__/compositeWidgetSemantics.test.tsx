// src/components/__tests__/compositeWidgetSemantics.test.tsx
//
// Deep a11y audit: several composites declared a composite ARIA role
// (`tablist`, `radiogroup`) but implemented none of the keyboard contract the
// role promises — no arrow keys, and every item its own Tab stop. One of them
// declared `role="tab"` with no `tablist` owner at all.

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { PoolScopedLayout } from '../identity/shared/PoolScopedLayout';
import RunsFilterBar from '../pipelines/RunsFilterBar';
import ScatterPathPicker from '../pipelines/nodes/scatter/ScatterPathPicker';
import QuickInsertPopover from '../pipelines/canvas/QuickInsertPopover';

describe('PoolScopedLayout — tab bar semantics', () => {
  function renderLayout() {
    return render(
      <PoolScopedLayout
        poolId="p1"
        poolName="Main pool"
        activeSection="users"
        onNavigate={() => {}}
        onBack={() => {}}
      >
        <div>content</div>
      </PoolScopedLayout>,
    );
  }

  it('owns its role="tab" children with a labelled tablist', () => {
    renderLayout();
    // The tabs used to be orphans: ARIA requires a `tablist` owner, and
    // without one the role is unreliable in assistive tech.
    const list = screen.getByRole('tablist', { name: 'Pool sections' });
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(list).toContainElement(screen.getByRole('tab', { name: 'Users' }));
  });

  it('exposes exactly one Tab stop (roving tabindex)', () => {
    renderLayout();
    const tabbable = screen
      .getAllByRole('tab')
      .filter((el) => el.getAttribute('tabindex') === '0');
    expect(tabbable).toHaveLength(1);
    expect(tabbable[0]).toHaveAccessibleName('Users');
  });

  it('moves focus with arrow keys', () => {
    renderLayout();
    const list = screen.getByRole('tablist');
    screen.getByRole('tab', { name: 'Users' }).focus();

    fireEvent.keyDown(list, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Groups' }));

    fireEvent.keyDown(list, { key: 'End' });
    expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'MFA' }));
  });
});

describe('RunsFilterBar — date-range radiogroup semantics', () => {
  function renderBar() {
    return render(
      <RunsFilterBar
        query=""
        onQueryChange={() => {}}
        range="24h"
        onRangeChange={() => {}}
        statuses={new Set()}
        onStatusToggle={() => {}}
        triggerKinds={new Set()}
        onTriggerToggle={() => {}}
        onClearFilters={() => {}}
      />,
    );
  }

  it('exposes exactly one Tab stop for the whole group', () => {
    renderBar();
    const group = screen.getByRole('radiogroup', { name: 'Date range' });
    const radios = within(group).getAllByRole('radio');
    expect(radios.length).toBeGreaterThan(1);
    expect(radios.filter((el) => el.getAttribute('tabindex') === '0')).toHaveLength(1);
  });

  it('moves focus between ranges with arrow keys', () => {
    renderBar();
    const group = screen.getByRole('radiogroup', { name: 'Date range' });
    const radios = within(group).getAllByRole('radio');
    radios[0].focus();
    fireEvent.keyDown(group, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(radios[1]);
  });
});

describe('ScatterPathPicker — listbox with no options', () => {
  const SCHEMA = {
    type: 'object',
    properties: {
      tags: { type: 'array', items: { type: 'string' } },
      caption: { type: 'string' },
    },
  };

  it('does not claim to be a listbox when its children are buttons', () => {
    render(<ScatterPathPicker value="$.tags" onChange={() => {}} upstreamSchema={SCHEMA} />);
    // role="listbox" with plain <button> children reported an EMPTY list box:
    // ARIA requires `option` children, so nothing inside was exposed.
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.getByRole('group', { name: 'Available output paths' })).toBeInTheDocument();
  });

  it('exposes which path is selected', () => {
    render(<ScatterPathPicker value="$.tags" onChange={() => {}} upstreamSchema={SCHEMA} />);
    // Selection was conveyed by a background tint and a ring, nothing else.
    expect(screen.getByTestId('path-row-$.tags')).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('QuickInsertPopover — combobox wiring', () => {
  function renderPopover() {
    return render(
      <QuickInsertPopover
        anchor={{ x: 10, y: 10 }}
        flowPosition={{ x: 0, y: 0 }}
        onClose={() => {}}
        onInsert={() => {}}
      />,
    );
  }

  it('points aria-activedescendant at the highlighted option', () => {
    renderPopover();
    const input = screen.getByRole('combobox', { name: 'Search node types' });
    const active = input.getAttribute('aria-activedescendant');
    expect(active).toBeTruthy();
    // ArrowUp/Down move the highlight while focus stays in the input, so
    // without this the screen reader announced nothing at all.
    expect(document.getElementById(active as string)).toHaveAttribute('aria-selected', 'true');
  });

  it('follows the highlight as the user arrows down', () => {
    renderPopover();
    const input = screen.getByRole('combobox', { name: 'Search node types' });
    const before = input.getAttribute('aria-activedescendant');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.getAttribute('aria-activedescendant')).not.toBe(before);
  });

  it('names the listbox it controls', () => {
    renderPopover();
    const input = screen.getByRole('combobox', { name: 'Search node types' });
    const listbox = screen.getByRole('listbox', { name: 'Node types' });
    expect(input).toHaveAttribute('aria-controls', listbox.id);
  });
});
