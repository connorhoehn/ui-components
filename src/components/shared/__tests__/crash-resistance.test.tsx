// Crash resistance for the shared primitives.
//
// This is a LIBRARY, so every prop crosses a trust boundary: the data behind it
// came from a host app's API, a gateway socket or localStorage, and TypeScript's
// types are erased at runtime. A `state: 'running' | 'failed' | …` union says
// nothing about what the server actually sent.
//
// Each test below feeds a shape the type forbids and asserts that the GOOD data
// still renders. The bug being pinned is never "it looked wrong" — it is that
// the throw unmounted a whole page region and took the well-formed records with
// it.

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DataTable } from '../DataTable';
import { StatusPill } from '../StatusPill';
import { ConnectionPill } from '../ConnectionPill';
import { Avatar, nameToColor, nameToInitials } from '../Avatar';
import PermissionDeniedCard from '../PermissionDeniedCard';
import { LineChart, type LineSeries } from '../Chart';

// ---------------------------------------------------------------------------
// DataTable — `data` / `columns` absent
//
// DataTable *is* the page on every admin list surface. `data={resp.items}`
// where the API omitted `items`, or an undefined first render before the fetch
// resolves, threw inside the filter/sort memos — which run BEFORE the `loading`
// prop gates anything — and white-screened the page, search box and header
// included.
// ---------------------------------------------------------------------------
describe('DataTable — absent data/columns', () => {
  const columns = [{ key: 'name', header: 'Name' }];

  it('renders its empty state instead of throwing when `data` is undefined', () => {
    render(
      <DataTable
        data={undefined as unknown as Array<{ name: string }>}
        columns={columns}
        keyField={(r) => r.name}
        emptyMessage="No records."
      />,
    );
    expect(screen.getByText('No records.')).toBeInTheDocument();
  });

  it('still renders the header and search box when `data` is undefined', () => {
    render(
      <DataTable
        data={undefined as unknown as Array<{ name: string }>}
        columns={columns}
        keyField={(r) => r.name}
        searchable
      />,
    );
    // The surrounding page chrome is what the crash destroyed.
    expect(screen.getByTestId('datatable-search')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders the rows when `columns` is undefined rather than throwing', () => {
    render(
      <DataTable
        data={[{ name: 'a' }, { name: 'b' }]}
        columns={undefined as unknown as typeof columns}
        keyField={(r) => r.name}
      />,
    );
    expect(screen.getAllByRole('row').length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// StatusPill — a run state outside the union
//
// The most-instantiated status component in the library, and it almost always
// renders inside a table cell or list row. One job in a state the pill did not
// know ('queued', 'cancelled') took the entire table down.
// ---------------------------------------------------------------------------
describe('StatusPill — unrecognised state', () => {
  it('renders an unknown state as itself instead of throwing', () => {
    render(
      <StatusPill
        state={'queued' as never}
        label="Queued"
        data-testid="pill"
      />,
    );
    expect(screen.getByTestId('pill')).toBeInTheDocument();
    // The label and the data attribute still carry the REAL state — the pill
    // degrades its styling, it does not lie about or hide the value.
    expect(screen.getByText('Queued')).toBeInTheDocument();
    expect(screen.getByTestId('pill').getAttribute('data-state')).toBe('queued');
  });

  it('keeps sibling rows alive when one row has an unknown state', () => {
    render(
      <div>
        <StatusPill state="success" label="Done" />
        <StatusPill state={'cancelled' as never} label="Cancelled" />
        <StatusPill state="error" label="Failed" />
      </div>,
    );
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// ConnectionPill — a socket state outside the union
//
// This lives in the app shell header, so the throw took the whole top bar down
// exactly when the user most needed to see the connection state.
// ---------------------------------------------------------------------------
describe('ConnectionPill — unrecognised state', () => {
  it('renders an unknown gateway state as its raw value', () => {
    render(<ConnectionPill state={'closing' as never} />);
    expect(screen.getByText('closing')).toBeInTheDocument();
  });

  it('still honours a host-supplied label override for an unknown state', () => {
    render(
      <ConnectionPill
        state={'closing' as never}
        labels={{ closing: 'Shutting down' } as never}
      />,
    );
    expect(screen.getByText('Shutting down')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Avatar — a non-string `name`
//
// ActivityFeed, PresenceAvatars, UserChip, UserMenu and ChannelHeader all pass
// a payload field straight in, and a user who never set a display name arrives
// as `name: null`. Supplying `initials` did NOT rescue it: `nameToColor(name)`
// runs first.
// ---------------------------------------------------------------------------
describe('Avatar — non-string name', () => {
  it('renders with a null name', () => {
    render(<Avatar name={null as unknown as string} />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders with a null name even when initials are supplied', () => {
    render(<Avatar name={null as unknown as string} initials="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('exposes non-throwing helpers (they are public exports)', () => {
    expect(() => nameToColor(undefined as unknown as string)).not.toThrow();
    expect(nameToInitials(null as unknown as string)).toBe('?');
    // A numeric id leaking into the name slot must still produce initials.
    expect(() => nameToInitials(42 as unknown as string)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// PermissionDeniedCard — a state outside the union
//
// These maps hold FUNCTIONS, so an unmapped state gave "undefined is not a
// function" — a hard TypeError. `state` is commonly derived from
// `navigator.permissions.query().state`, whose vocabulary includes 'prompt'.
// This component is the fallback shown when something already went wrong; it
// must not convert a degraded state into a crashed call screen.
// ---------------------------------------------------------------------------
describe('PermissionDeniedCard — unrecognised state', () => {
  it('renders fallback copy for a browser PermissionState of "prompt"', () => {
    render(<PermissionDeniedCard kind="microphone" state={'prompt' as never} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('still shows the retry affordance for an unknown state', () => {
    const onRetry = vi.fn();
    render(
      <PermissionDeniedCard
        kind="camera"
        state={'prompt' as never}
        onRetry={onRetry}
      />,
    );
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// LineChart — a series with no data array
//
// A metrics API returning `{label: "p99", data: null}` for a series with no
// samples in the window is routine. mergeSeriesData runs during the PARENT's
// render, so the throw blanked the whole dashboard row, not just the chart.
// ---------------------------------------------------------------------------
describe('LineChart — malformed series', () => {
  it('renders when one series has a null data array', () => {
    const series = [
      { label: 'p50', data: [{ x: 0, y: 1 }, { x: 1, y: 2 }] },
      { label: 'p99', data: null },
    ] as unknown as LineSeries[];
    expect(() => render(<LineChart series={series} />)).not.toThrow();
  });

  it('renders when `series` itself is undefined', () => {
    expect(() =>
      render(<LineChart series={undefined as unknown as LineSeries[]} />),
    ).not.toThrow();
  });
});
