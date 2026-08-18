// Config panels hold local UI state that belongs to ONE node.
//
// ConfigPanel renders `<Config data={node.data} .../>` — the same component
// type in the same tree position for every node of that type. React therefore
// reuses the instance when the user selects a different node, and any
// `useState(() => derive(props))` keeps the PREVIOUS node's value.
//
// ApprovalConfig is the clearest case: `unit` is inferred once from
// `data.timeoutMs`. Select a node stored in hours, then one stored in minutes,
// and the second renders against the first node's unit — showing "0 hours" for
// a 5-minute timeout. Nudging that 0 to 1 writes 3600000, silently changing the
// node from 5 minutes to 1 hour.
//
// Fixed at the dispatch site rather than per panel: keying the config by node
// id resets every panel's local UI state on selection change, for all of them
// at once.

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ApprovalConfig from '../../nodes/approval/ApprovalConfig';
import { PresenceProvider } from '../../../../contexts/PresenceContext';
import { IdentityProvider } from '../../../../contexts/IdentityContext';

// ApprovalConfig renders UserPicker, which requires presence context.
const presence = { presenceUsers: [], currentClientId: null, setTyping: vi.fn() };
const identity = {
  userId: 'u-tester', displayName: 'Tester', userEmail: null,
  idToken: null, onSignOut: vi.fn(),
};

function renderApproval(timeoutMs: number, key?: string) {
  return (
    <IdentityProvider value={identity}>
      <PresenceProvider value={presence}>
        <ApprovalConfig
        key={key}
        data={{ type: 'approval', approvers: [], requiredCount: 1, timeoutMs } as never}
        onChange={vi.fn()}
        />
      </PresenceProvider>
    </IdentityProvider>
  );
}

const unitSelect = () => screen.getByRole('combobox') as HTMLSelectElement;

describe('config panel local state across node selection', () => {
  it('infers hours for an hour-aligned timeout', () => {
    render(renderApproval(7_200_000));
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(unitSelect().value).toBe('hours');
  });

  it('keeps the previous node’s unit when the instance is reused', () => {
    // This documents the defect the key fixes: same element type, no key, so
    // React reuses the instance and `unit` stays 'hours'.
    const { rerender } = render(renderApproval(7_200_000));
    rerender(renderApproval(300_000));
    expect(unitSelect().value).toBe('hours');
  });

  it('re-infers the unit when the panel is keyed by node id', () => {
    const { rerender } = render(renderApproval(7_200_000, 'node-a'));
    rerender(renderApproval(300_000, 'node-b'));
    expect(unitSelect().value).toBe('minutes');
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });
});
