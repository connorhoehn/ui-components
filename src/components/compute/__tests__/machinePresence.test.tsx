// MachinePresenceMenu — what only this component can get wrong.
//
// The chip is header chrome that renders for every user on every page, so its
// failure modes are quiet and expensive: rendering for users with no machines
// (chrome for a feature they haven't paired), pulsing when nothing is
// running, or offering sessions an offline machine can't back. The panel's
// job is fidelity — the provider chip and memory line are the two fields the
// backend can't render for us, so their formatting is pinned here.

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MachinePresenceMenu, memorySummary, providerSummary } from '../components/MachinePresenceMenu';
import { fixtureMachines, fixtureModels } from '../fixtures/computeFixture';
import type { MachineNode, MachineSession } from '../types';

const connected = fixtureMachines[0];

describe('MachinePresenceMenu trigger', () => {
  it('renders nothing when there are no machines', () => {
    const { container } = render(<MachinePresenceMenu nodes={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('names the single machine and counts its sessions', () => {
    render(<MachinePresenceMenu nodes={[connected]} />);
    const trigger = screen.getByTestId('machine-presence-menu');
    expect(trigger).toHaveTextContent('demo-macbook · 2');
  });

  it('collapses multiple machines into a count with the total sessions', () => {
    render(<MachinePresenceMenu nodes={fixtureMachines} />);
    expect(screen.getByTestId('machine-presence-menu')).toHaveTextContent('2 machines · 3');
  });

  it('announces status and session count to assistive tech', () => {
    render(<MachinePresenceMenu nodes={[connected]} />);
    expect(
      screen.getByRole('button', { name: /demo-macbook, 2 active sessions, connected/ }),
    ).toBeInTheDocument();
  });
});

describe('MachinePresenceMenu panel', () => {
  it('opens on click and lists every session with project and intent', async () => {
    const user = userEvent.setup();
    render(<MachinePresenceMenu nodes={[connected]} models={fixtureModels} />);
    await user.click(screen.getByTestId('machine-presence-menu'));
    const rows = screen.getAllByTestId('machine-session-row');
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveTextContent('Auth migration · feat/oidc-callback');
    expect(rows[0]).toHaveTextContent('wire the OIDC callback to the session mint');
  });

  it('shortens Bedrock ids but shows local models verbatim with their provider', async () => {
    const user = userEvent.setup();
    render(<MachinePresenceMenu nodes={[connected]} models={fixtureModels} />);
    await user.click(screen.getByTestId('machine-presence-menu'));
    const rows = screen.getAllByTestId('machine-session-row');
    // The fixture's Bedrock id resolves through the models list to its label…
    expect(rows[0]).toHaveTextContent('bedrock · Sonnet');
    // …while the Ollama model is already a human-sized name.
    expect(rows[1]).toHaveTextContent('ollama · qwen2.5-coder:14b');
  });

  it('shows the placeholder, not an empty list, for a connected idle machine', async () => {
    const user = userEvent.setup();
    const idle: MachineNode = { ...connected, sessions: [] };
    render(<MachinePresenceMenu nodes={[idle]} />);
    await user.click(screen.getByTestId('machine-presence-menu'));
    expect(screen.getByTestId('machine-no-sessions')).toHaveTextContent('no active sessions');
  });

  it('omits the footer when no host affordances are wired', async () => {
    const user = userEvent.setup();
    render(<MachinePresenceMenu nodes={[connected]} />);
    await user.click(screen.getByTestId('machine-presence-menu'));
    expect(screen.queryByText('Open Computer Lab')).not.toBeInTheDocument();
  });

  it('fires onOpenLab and closes the panel', async () => {
    const user = userEvent.setup();
    const onOpenLab = vi.fn();
    render(<MachinePresenceMenu nodes={[connected]} onOpenLab={onOpenLab} />);
    await user.click(screen.getByTestId('machine-presence-menu'));
    await user.click(screen.getByText('Open Computer Lab'));
    expect(onOpenLab).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('machine-presence-menu-panel')).not.toBeInTheDocument();
  });
});

describe('memorySummary', () => {
  it('covers all four modes, and treats missing state as sync off', () => {
    expect(memorySummary({ mode: 'synced' })).toBe('● synced');
    expect(memorySummary({ mode: 'pending', pendingOps: 14 })).toBe('◐ 14 pending');
    expect(memorySummary({ mode: 'offline', pendingOps: 203 })).toBe('○ offline — queuing');
    expect(memorySummary({ mode: 'disabled' })).toBe('— sync off');
    expect(memorySummary(undefined)).toBe('— sync off');
  });
});

describe('providerSummary', () => {
  const base: MachineSession = { id: 's1' };

  it('joins provider and model, shortening only Bedrock ids', () => {
    expect(
      providerSummary(
        { ...base, modelProvider: 'bedrock', model: 'us.anthropic.claude-sonnet-5' },
        fixtureModels,
      ),
    ).toBe('bedrock · Sonnet');
    expect(providerSummary({ ...base, modelProvider: 'ollama', model: 'qwen2.5-coder:14b' })).toBe(
      'ollama · qwen2.5-coder:14b',
    );
  });

  it('degrades to the bare model, then to a dash', () => {
    expect(providerSummary({ ...base, model: 'qwen2.5-coder:7b' })).toBe('qwen2.5-coder:7b');
    expect(providerSummary(base)).toBe('—');
  });
});
