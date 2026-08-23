import { render, screen, fireEvent } from '@testing-library/react';
import { InviteToCallDialog } from '../InviteToCallDialog';

const onClose = vi.fn();
const onInvite = vi.fn();

const candidates = [
  { userId: 'u-alice', name: 'Alice Chen' },
  { userId: 'u-bob', name: 'Bob Martinez', alreadyInCall: true },
  { userId: 'u-grace', name: 'Grace Wilson' },
];

const base = { open: true, onClose, onInvite, candidates, lobbyLabel: 'global-hangout' };

beforeEach(() => { onClose.mockClear(); onInvite.mockClear(); });

describe('InviteToCallDialog', () => {
  it('renders nothing when closed', () => {
    render(<InviteToCallDialog {...base} open={false} />);
    expect(screen.queryByTestId('invite-to-call-dialog')).toBeNull();
  });

  it('lists every candidate and marks people already on the call', () => {
    render(<InviteToCallDialog {...base} />);
    const rows = screen.getAllByTestId('invite-candidate');
    expect(rows).toHaveLength(3);
    const bob = rows.find((r) => r.getAttribute('data-user-id') === 'u-bob')!;
    expect(bob).toHaveAttribute('data-already-in-call', 'true');
    expect(bob).toBeDisabled();
  });

  it('confirm is disabled until someone is selected, and reports the selection', () => {
    render(<InviteToCallDialog {...base} />);
    const confirm = screen.getByTestId('invite-to-call-confirm');
    expect(confirm).toBeDisabled();

    fireEvent.click(screen.getAllByTestId('invite-candidate')[0]);
    expect(confirm).not.toBeDisabled();
    expect(confirm).toHaveTextContent('Invite 1 person');

    fireEvent.click(screen.getAllByTestId('invite-candidate')[2]);
    expect(confirm).toHaveTextContent('Invite 2 people');

    fireEvent.click(confirm);
    expect(onInvite).toHaveBeenCalledWith(['u-alice', 'u-grace']);
  });

  it('toggling a selection off removes it', () => {
    render(<InviteToCallDialog {...base} />);
    const alice = screen.getAllByTestId('invite-candidate')[0];
    fireEvent.click(alice);
    expect(alice).toHaveAttribute('data-selected', 'true');
    fireEvent.click(alice);
    expect(alice).toHaveAttribute('data-selected', 'false');
    expect(screen.getByTestId('invite-to-call-confirm')).toBeDisabled();
  });

  it('explains the empty and everyone-already-here cases', () => {
    const { unmount } = render(<InviteToCallDialog {...base} candidates={[]} />);
    expect(screen.getByTestId('invite-to-call-empty')).toBeInTheDocument();
    unmount();

    render(<InviteToCallDialog {...base} candidates={[{ userId: 'u-bob', name: 'Bob', alreadyInCall: true }]} />);
    expect(screen.getByTestId('invite-to-call-everyone-here')).toBeInTheDocument();
  });
});
