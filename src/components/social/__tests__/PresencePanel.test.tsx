import { render, screen } from '@testing-library/react';
import { PresencePanel } from '../PresencePanel';
import type { PresenceUser } from '../../../hooks/usePresence';

function makeUser(overrides: Partial<PresenceUser> & { clientId: string }): PresenceUser {
  return {
    clientId: overrides.clientId,
    status: overrides.status ?? 'online',
    metadata: overrides.metadata ?? {},
  };
}

describe('PresencePanel', () => {
  it('shows the user count in the header', () => {
    const users = [
      makeUser({ clientId: 'a', metadata: { displayName: 'Alice' } }),
      makeUser({ clientId: 'b', metadata: { displayName: 'Bob' } }),
    ];
    render(<PresencePanel users={users} currentClientId={null} />);
    expect(screen.getByText('Users in channel (2)')).toBeInTheDocument();
  });

  it('renders empty-state copy when there are no users', () => {
    render(<PresencePanel users={[]} currentClientId={null} />);
    expect(screen.getByText('Users in channel (0)')).toBeInTheDocument();
    expect(screen.getByText('No other users connected')).toBeInTheDocument();
  });

  it('renders displayName when provided in metadata', () => {
    const users = [makeUser({ clientId: 'client-xyz', metadata: { displayName: 'Carol' } })];
    render(<PresencePanel users={users} currentClientId={null} />);
    expect(screen.getByText('Carol')).toBeInTheDocument();
  });

  it('falls back to truncated clientId when displayName is missing', () => {
    const longId = 'abcdefghijklmnop';
    const users = [makeUser({ clientId: longId })];
    render(<PresencePanel users={users} currentClientId={null} />);
    expect(screen.getByText('abcdefghijkl...')).toBeInTheDocument();
  });

  it('uses the full clientId when it is short enough to fit', () => {
    const users = [makeUser({ clientId: 'short-id' })];
    render(<PresencePanel users={users} currentClientId={null} />);
    expect(screen.getByText('short-id')).toBeInTheDocument();
  });

  it('shows the "(you)" label only on the row matching currentClientId', () => {
    const users = [
      makeUser({ clientId: 'a', metadata: { displayName: 'Alice' } }),
      makeUser({ clientId: 'b', metadata: { displayName: 'Bob' } }),
    ];
    render(<PresencePanel users={users} currentClientId="b" />);
    const youLabels = screen.getAllByText('(you)');
    expect(youLabels).toHaveLength(1);
  });

  it('shows the "typing..." indicator when metadata.isTyping is true', () => {
    const users = [
      makeUser({ clientId: 'a', metadata: { displayName: 'Alice', isTyping: true } }),
      makeUser({ clientId: 'b', metadata: { displayName: 'Bob', isTyping: false } }),
    ];
    render(<PresencePanel users={users} currentClientId={null} />);
    const typing = screen.getAllByText('typing...');
    expect(typing).toHaveLength(1);
  });

  it('does not render any typing indicator when no user is typing', () => {
    const users = [makeUser({ clientId: 'a', metadata: { displayName: 'Alice' } })];
    render(<PresencePanel users={users} currentClientId={null} />);
    expect(screen.queryByText('typing...')).not.toBeInTheDocument();
  });
});

describe('PresencePanel type scale (2.515.12)', () => {
  it('uses the house font with a 12px header and 11px initials (was monospace, 12.8px and 8.8px)', () => {
    render(<PresencePanel users={[makeUser({ clientId: 'a', metadata: { displayName: 'Alice Smith' } })]} currentClientId={null} />);
    expect(screen.getByTestId('presence-panel')).not.toHaveClass('font-mono');
    const title = screen.getByTestId('presence-panel-title');
    expect(title).toHaveClass('text-xs');
    expect(title.className).not.toContain('0.8rem');
    const initials = screen.getByTestId('presence-panel').querySelector('[data-ui-text="avatar"]')!;
    expect(initials).toHaveClass('text-[11px]');
    expect(initials.className).not.toContain('0.55rem');
  });
});
