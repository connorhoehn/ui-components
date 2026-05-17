import { render, screen } from '@testing-library/react';
import { PolicyDecisionLog } from '../PolicyDecisionLog';
import type { PolicyDecision } from '../PolicyDecisionLog';

function makeDecision(overrides: Partial<PolicyDecision> = {}): PolicyDecision {
  return {
    id: 'd-1',
    action: 'read',
    resource: 'doc:42',
    principal: 'alice',
    decision: 'allow',
    policyId: 'p-allow-all',
    timestamp: '2026-05-17T13:45:09Z',
    ...overrides,
  };
}

describe('PolicyDecisionLog', () => {
  it('empty list renders "No decisions recorded" placeholder and 0 total', () => {
    render(<PolicyDecisionLog decisions={[]} />);
    expect(screen.getByText('No decisions recorded')).toBeInTheDocument();
    expect(screen.getByText('0 total')).toBeInTheDocument();
  });

  it('renders one row per decision with action, resource, principal, policyId', () => {
    render(
      <PolicyDecisionLog
        decisions={[
          makeDecision({ id: 'd-1', action: 'read', resource: 'doc:1', principal: 'alice', policyId: 'p1' }),
          makeDecision({ id: 'd-2', action: 'write', resource: 'doc:2', principal: 'bob', policyId: 'p2', decision: 'deny' }),
        ]}
      />,
    );
    expect(screen.getByText('read')).toBeInTheDocument();
    expect(screen.getByText('write')).toBeInTheDocument();
    expect(screen.getByText('doc:1')).toBeInTheDocument();
    expect(screen.getByText('doc:2')).toBeInTheDocument();
    expect(screen.getByText('by alice')).toBeInTheDocument();
    expect(screen.getByText('by bob')).toBeInTheDocument();
    expect(screen.getByText('p1')).toBeInTheDocument();
    expect(screen.getByText('p2')).toBeInTheDocument();
    expect(screen.getByText('2 total')).toBeInTheDocument();
  });

  it('allow decision renders ✓ with emerald color', () => {
    render(<PolicyDecisionLog decisions={[makeDecision({ decision: 'allow' })]} />);
    const indicator = screen.getByText('✓');
    expect(indicator).toHaveClass('bg-emerald-100');
    expect(indicator).toHaveClass('text-emerald-700');
  });

  it('deny decision renders ✗ with red color', () => {
    render(<PolicyDecisionLog decisions={[makeDecision({ decision: 'deny' })]} />);
    const indicator = screen.getByText('✗');
    expect(indicator).toHaveClass('bg-red-100');
    expect(indicator).toHaveClass('text-red-700');
  });

  it('clamps visible decisions to maxItems but total count reflects full input', () => {
    const decisions = Array.from({ length: 5 }, (_, i) =>
      makeDecision({ id: `d-${i}`, action: `act-${i}`, resource: `res-${i}` }),
    );
    render(<PolicyDecisionLog decisions={decisions} maxItems={2} />);
    expect(screen.getByText('act-0')).toBeInTheDocument();
    expect(screen.getByText('act-1')).toBeInTheDocument();
    expect(screen.queryByText('act-2')).not.toBeInTheDocument();
    expect(screen.queryByText('act-4')).not.toBeInTheDocument();
    expect(screen.getByText('5 total')).toBeInTheDocument();
  });

  it('default maxItems is 50 — a 51st decision is hidden', () => {
    const decisions = Array.from({ length: 51 }, (_, i) =>
      makeDecision({ id: `d-${i}`, action: `act-${i}`, resource: `res-${i}` }),
    );
    render(<PolicyDecisionLog decisions={decisions} />);
    expect(screen.getByText('act-0')).toBeInTheDocument();
    expect(screen.getByText('act-49')).toBeInTheDocument();
    expect(screen.queryByText('act-50')).not.toBeInTheDocument();
    expect(screen.getByText('51 total')).toBeInTheDocument();
  });

  it('renders the optional reason when present', () => {
    render(
      <PolicyDecisionLog
        decisions={[makeDecision({ reason: 'tenant not allowed' })]}
      />,
    );
    expect(screen.getByText('tenant not allowed')).toBeInTheDocument();
  });

  it('hides the reason when omitted', () => {
    render(<PolicyDecisionLog decisions={[makeDecision({ reason: undefined })]} />);
    // Only the bullet between principal and policyId remains (1 dot, not 2).
    expect(screen.queryAllByText('·')).toHaveLength(1);
  });

  it('formats timestamp as zero-padded HH:MM:SS', () => {
    render(
      <PolicyDecisionLog
        decisions={[makeDecision({ timestamp: '2026-05-17T03:04:05Z' })]}
      />,
    );
    const d = new Date('2026-05-17T03:04:05Z');
    const expected = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:05`;
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('applies extra className to the wrapper', () => {
    const { container } = render(
      <PolicyDecisionLog decisions={[]} className="extra-wrap" />,
    );
    expect(container.firstChild).toHaveClass('extra-wrap');
  });
});
