import { render, screen, fireEvent } from '@testing-library/react';
import { InviteCandidateList } from '../InviteCandidateList';

const onInvite = vi.fn();
beforeEach(() => onInvite.mockClear());

const candidates = [
  { userId: 'u-alice', name: 'Alice Chen' },
  { userId: 'u-bob', name: 'Bob Martinez', alreadyInCall: true },
  { userId: 'u-grace', name: 'Grace Wilson' },
];

describe('InviteCandidateList', () => {
  it('default layout renders the rows AND an inline confirm with the dialog testids', () => {
    render(<InviteCandidateList candidates={candidates} onInvite={onInvite} />);
    expect(screen.getAllByTestId('invite-candidate')).toHaveLength(3);
    const confirm = screen.getByTestId('invite-to-call-confirm');
    expect(confirm).toBeDisabled();

    fireEvent.click(screen.getAllByTestId('invite-candidate')[0]);
    expect(confirm).toHaveTextContent('Invite 1 person');
    fireEvent.click(confirm);
    expect(onInvite).toHaveBeenCalledWith(['u-alice']);
  });

  it('keeps already-in-call rows visible but disabled', () => {
    render(<InviteCandidateList candidates={candidates} onInvite={onInvite} />);
    const bob = screen
      .getAllByTestId('invite-candidate')
      .find((r) => r.getAttribute('data-user-id') === 'u-bob')!;
    expect(bob).toBeDisabled();
    expect(bob).toHaveAttribute('data-already-in-call', 'true');
  });

  it('renders the empty and everyone-already-here states', () => {
    const { unmount } = render(<InviteCandidateList candidates={[]} onInvite={onInvite} />);
    expect(screen.getByTestId('invite-to-call-empty')).toBeInTheDocument();
    unmount();
    render(
      <InviteCandidateList
        candidates={[{ userId: 'u-bob', name: 'Bob', alreadyInCall: true }]}
        onInvite={onInvite}
      />,
    );
    expect(screen.getByTestId('invite-to-call-everyone-here')).toBeInTheDocument();
  });

  it('clears the selection when resetKey changes', () => {
    const { rerender } = render(
      <InviteCandidateList candidates={candidates} onInvite={onInvite} resetKey={1} />,
    );
    fireEvent.click(screen.getAllByTestId('invite-candidate')[0]);
    expect(screen.getByTestId('invite-to-call-confirm')).not.toBeDisabled();
    rerender(
      <InviteCandidateList candidates={candidates} onInvite={onInvite} resetKey={2} />,
    );
    expect(screen.getByTestId('invite-to-call-confirm')).toBeDisabled();
  });

  it('render-prop children place the list and confirm blocks', () => {
    render(
      <InviteCandidateList candidates={candidates} onInvite={onInvite}>
        {({ list, confirm }) => (
          <div>
            <div data-testid="custom-list-slot">{list}</div>
            <div data-testid="custom-confirm-slot">{confirm}</div>
          </div>
        )}
      </InviteCandidateList>,
    );
    expect(
      screen.getByTestId('custom-list-slot').querySelectorAll('[data-testid="invite-candidate"]'),
    ).toHaveLength(3);
    expect(
      screen.getByTestId('custom-confirm-slot').querySelector('[data-testid="invite-to-call-confirm"]'),
    ).not.toBeNull();
  });
});
