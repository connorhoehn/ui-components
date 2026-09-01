// LabRail's project grouping.
//
// The rail's flat-list behavior (attention sort, roving tabindex, the watch
// control) already has coverage via ComputerLab.test.tsx. These tests are
// scoped to what changed: computers grouping under a project heading with a
// budget quick-line, the unassigned bucket landing last with no fabricated
// summary, deployments with no notion of projects staying byte-for-byte
// flat, and roving tabindex still walking every row — headings included in
// the DOM, excluded from the tab order — across group boundaries.

import { render, screen, within, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ComputeProvider } from '../context/ComputeContext';
import { LabRail } from '../components/LabRail';
import { fixtureComputers, fixtureProjects, fixtureRuntimeStatus } from '../fixtures/computeFixture';
import type { ComputeClient } from '../lib/computeClient';
import type { LabRailProps } from '../components/LabRail';

function stubClient(overrides: Partial<ComputeClient> = {}): ComputeClient {
  return {
    getStatus: async () => fixtureRuntimeStatus,
    listComputers: async () => fixtureComputers,
    createComputer: async (input) => ({ ...fixtureComputers[0]!, id: 'new', label: input?.label ?? 'new' }),
    adoptComputer: async () => {},
    renameComputer: async () => {},
    removeComputer: async () => {},
    stopSession: async () => {},
    runTask: async () => {},
    runCommand: async () => {},
    getShellUrl: async () => ({ url: 'wss://example/shell' }),
    tail: (id: string) => ({ url: `/api/devbox/boxes/${id}/tail`, withCredentials: true, headers: {} }),
    ...overrides,
  };
}

const noop = () => {};

function baseProps(overrides: Partial<LabRailProps> = {}): LabRailProps {
  return {
    computers: fixtureComputers,
    activeComputerId: null,
    openComputerIds: [],
    onSelect: noop,
    showAllActivity: true,
    onToggleShowAll: noop,
    ...overrides,
  };
}

/** Every fixture computer charged to a project, plus one (`demo-delta`) left
 * unassigned — matches `fixtureComputers`' own `projectId`s. */
function renderGrouped(props: Partial<LabRailProps> = {}) {
  return render(
    <ComputeProvider
      client={stubClient()}
      computers={fixtureComputers}
      projects={fixtureProjects}
      useFixtures={false}
      pollIntervalMs={0}
    >
      <LabRail {...baseProps(props)} />
    </ComputeProvider>,
  );
}

describe('LabRail project grouping', () => {
  it('groups the computers section under project headings, unassigned last', () => {
    renderGrouped();
    const list = screen.getByRole('listbox', { name: 'computers' });

    // Named projects render their heading with a budget quick-line — real
    // numbers from ProjectSummary, not hand-rolled text.
    expect(within(list).getByText('Auth migration')).toBeInTheDocument();
    expect(within(list).getByText('$412.55', { exact: false })).toBeInTheDocument();
    expect(within(list).getByText('Search relevance')).toBeInTheDocument();
    // A project with no live computers gets NO heading. The first cut showed
    // them all so budgets stayed visible, and fourteen initiatives over two
    // computers buried the fleet under a budget report — that survey lives on
    // the budgets surface, and the chooser still finds every project.
    expect(within(list).queryByText('Platform upkeep')).toBeNull();

    // The unassigned bucket is plain text, with no ProjectSummary underneath
    // fabricating a budget line for boxes that were never allocated one.
    const unassignedHeading = within(list).getByText('unassigned');
    expect(unassignedHeading).toBeInTheDocument();
    expect(unassignedHeading.closest('div')?.textContent).toBe('unassigned');

    // Order: named projects first (fixture order), unassigned last.
    const text = list.textContent ?? '';
    const authIdx = text.indexOf('Auth migration');
    const searchIdx = text.indexOf('Search relevance');
    const unassignedIdx = text.indexOf('unassigned');
    expect(authIdx).toBeGreaterThanOrEqual(0);
    expect(authIdx).toBeLessThan(searchIdx);
    expect(searchIdx).toBeLessThan(unassignedIdx);

    // Every computer is still there — grouping never hides a row.
    const rows = within(list).getAllByRole('option');
    expect(rows.map((r) => r.textContent?.includes('demo-alpha'))).toContain(true);
    expect(rows).toHaveLength(fixtureComputers.length);
  });

  it('falls back to a flat list when the deployment has no notion of projects', () => {
    // No `projects` prop and a client with no `listProjects` — the exact
    // shape of "this host doesn't do cost centres".
    render(
      <ComputeProvider client={stubClient()} computers={fixtureComputers} useFixtures={false} pollIntervalMs={0}>
        <LabRail {...baseProps()} />
      </ComputeProvider>,
    );
    const list = screen.getByRole('listbox', { name: 'computers' });

    expect(within(list).queryByText('Auth migration')).not.toBeInTheDocument();
    expect(within(list).queryByText('unassigned')).not.toBeInTheDocument();

    const rows = within(list).getAllByRole('option');
    expect(rows).toHaveLength(fixtureComputers.length);
    expect(rows.map((r) => r.textContent)).toEqual(
      fixtureComputers.map((c) => c.label),
    );
  });

  it('stays flat when projects are not absent but none are named', () => {
    // `projectsAbsent` is false here (projects were supplied), but the list
    // is empty — there is nothing to group *by*, only an unassigned bucket,
    // so grouping would just be a lone "unassigned" heading over the same
    // list. That is not worth doing.
    render(
      <ComputeProvider client={stubClient()} computers={fixtureComputers} projects={[]} useFixtures={false} pollIntervalMs={0}>
        <LabRail {...baseProps()} />
      </ComputeProvider>,
    );
    const list = screen.getByRole('listbox', { name: 'computers' });
    expect(within(list).queryByText('unassigned')).not.toBeInTheDocument();
    expect(within(list).getAllByRole('option')).toHaveLength(fixtureComputers.length);
  });

  it('walks every row in visual order across group boundaries, skipping headings', () => {
    renderGrouped();
    const list = screen.getByRole('listbox', { name: 'computers' });
    const rows = within(list).getAllByRole('option');
    // Fixture order (alpha, bravo -> Auth; charlie -> Search; delta ->
    // unassigned) happens to match group order, which is what makes this a
    // real cross-boundary walk: bravo -> charlie crosses the Auth/Search
    // seam, and charlie -> delta crosses clean past the empty Platform
    // upkeep group straight into unassigned.
    expect(rows.map((r) => r.textContent)).toEqual([
      'demo-alpha',
      'demo-bravo',
      'demo-charlie',
      'demo-delta',
    ]);

    rows[0]!.focus();
    expect(document.activeElement).toBe(rows[0]);

    fireEvent.keyDown(list, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(rows[1]); // bravo, still inside Auth

    fireEvent.keyDown(list, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(rows[2]); // charlie — crossed into Search

    fireEvent.keyDown(list, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(rows[3]); // delta — past the empty group, into unassigned

    fireEvent.keyDown(list, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(rows[0]); // wraps back to the top
  });

  it('offers the watch control on activity rows only, grouped or not', () => {
    renderGrouped({ onWatch: noop, showAllActivity: true });

    const computersList = screen.getByRole('listbox', { name: 'computers' });
    expect(within(computersList).queryAllByRole('button', { name: /^Watch/ })).toHaveLength(0);

    const activityList = screen.getByRole('listbox', { name: 'agents' });
    // Every fixture computer is shown (showAllActivity), so every activity
    // row gets its own watch control.
    expect(within(activityList).getAllByRole('button', { name: /^Watch/ }).length).toBe(
      fixtureComputers.length,
    );
  });
});
