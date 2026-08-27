import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ComputeProvider, useCompute } from '../context/ComputeContext';
import type { ComputeClient } from '../lib/computeClient';

// ── The provider's `enabled` gate ──────────────────────────────────────────
//
// A deployment is very likely to gate the whole compute API on one capability
// — the reference one gates every route on ManageDevbox. A provider mounted in
// an app shell then polls for every user on every page, so an unauthorized
// viewer generates a 403 every few seconds plus one per mount. Invisible in
// development, where the developer is always authorized.


function Probe() {
  const { computers, isLoading } = useCompute();
  return <div data-testid="probe">{isLoading ? 'loading' : `${computers.length} computers`}</div>;
}

describe('ComputeProvider enabled gate', () => {
  it('makes no request at all when disabled', async () => {
    const calls: string[] = [];
    const client = {
      getStatus: async () => { calls.push('getStatus'); return {} as never; },
      listComputers: async () => { calls.push('listComputers'); return []; },
    } as unknown as ComputeClient;

    render(
      <ComputeProvider client={client} enabled={false} useFixtures={false} pollIntervalMs={0}>
        <Probe />
      </ComputeProvider>,
    );

    await screen.findByTestId('probe');
    // Both the poll AND the one-shot status read must stay silent — the status
    // call is the one that leaks even with polling turned off.
    expect(calls).toEqual([]);
    expect(screen.getByTestId('probe').textContent).toBe('0 computers');
  });

  it('reads normally when enabled', async () => {
    const calls: string[] = [];
    const client = {
      getStatus: async () => { calls.push('getStatus'); return {} as never; },
      listComputers: async () => { calls.push('listComputers'); return [{ id: 'a' }] as never; },
      adoptComputer: async () => {},
    } as unknown as ComputeClient;

    render(
      <ComputeProvider client={client} useFixtures={false} pollIntervalMs={0}>
        <Probe />
      </ComputeProvider>,
    );

    await screen.findByText('1 computers');
    expect(calls).toContain('listComputers');
    expect(calls).toContain('getStatus');
  });
});
