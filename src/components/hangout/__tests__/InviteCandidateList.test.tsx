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

  it('searchable renders a filter input that narrows rows by name or userId, case-insensitive', () => {
    render(<InviteCandidateList candidates={candidates} onInvite={onInvite} searchable />);
    const search = screen.getByTestId('people-search');

    fireEvent.change(search, { target: { value: 'ALICE' } });
    let rows = screen.getAllByTestId('invite-candidate');
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveAttribute('data-user-id', 'u-alice');

    fireEvent.change(search, { target: { value: 'u-gr' } });
    rows = screen.getAllByTestId('invite-candidate');
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveAttribute('data-user-id', 'u-grace');

    fireEvent.change(search, { target: { value: 'zzz' } });
    expect(screen.queryAllByTestId('invite-candidate')).toHaveLength(0);
    expect(screen.getByTestId('people-search-empty')).toBeInTheDocument();
  });

  it('grouped renders Online then Offline sections; offline rows show lastSeenLabel and stay selectable', () => {
    render(
      <InviteCandidateList
        grouped
        onInvite={onInvite}
        candidates={[
          { userId: 'u-alice', name: 'Alice Chen', online: true },
          { userId: 'u-grace', name: 'Grace Wilson', online: false, lastSeenLabel: 'Last seen 2h ago' },
        ]}
      />,
    );
    expect(screen.getByTestId('people-group-online')).toHaveTextContent('Online');
    expect(screen.getByTestId('people-group-offline')).toHaveTextContent('Offline');
    expect(screen.getByTestId('invite-candidate-last-seen')).toHaveTextContent('Last seen 2h ago');

    // Online section renders before offline.
    const rows = screen.getAllByTestId('invite-candidate');
    expect(rows[0]).toHaveAttribute('data-user-id', 'u-alice');
    expect(rows[1]).toHaveAttribute('data-user-id', 'u-grace');

    // The offline person is still selectable.
    fireEvent.click(rows[1]);
    fireEvent.click(screen.getByTestId('invite-to-call-confirm'));
    expect(onInvite).toHaveBeenCalledWith(['u-grace']);
  });

  it('grouped swaps the empty-state copy (offline people may exist)', () => {
    const { unmount } = render(
      <InviteCandidateList grouped candidates={[]} onInvite={onInvite} />,
    );
    expect(screen.getByTestId('invite-to-call-empty')).toHaveTextContent('No one to show yet.');
    unmount();
    // Ungrouped copy is untouched.
    render(<InviteCandidateList candidates={[]} onInvite={onInvite} />);
    expect(screen.getByTestId('invite-to-call-empty')).toHaveTextContent(
      'Nobody else is online right now.',
    );
  });

  it('renders a presence dot only when online is defined', () => {
    render(
      <InviteCandidateList
        onInvite={onInvite}
        candidates={[
          { userId: 'u-alice', name: 'Alice Chen', online: true },
          { userId: 'u-grace', name: 'Grace Wilson', online: false },
          { userId: 'u-dan', name: 'Dan Okafor' },
        ]}
      />,
    );
    const rows = screen.getAllByTestId('invite-candidate');
    expect(rows[0].querySelector('[data-testid="presence-online"]')).not.toBeNull();
    expect(rows[1].querySelector('[data-testid="presence-offline"]')).not.toBeNull();
    expect(rows[2].querySelector('[data-testid^="presence-"]')).toBeNull();
  });

  it("selectMode='single' fires onPick on row click and renders no checkboxes or confirm", () => {
    const onPick = vi.fn();
    render(
      <InviteCandidateList
        candidates={candidates}
        onInvite={onInvite}
        selectMode="single"
        onPick={onPick}
      />,
    );
    expect(screen.queryByTestId('invite-to-call-confirm')).toBeNull();

    const rows = screen.getAllByTestId('invite-candidate');
    fireEvent.click(rows[0]);
    expect(onPick).toHaveBeenCalledWith('u-alice');
    expect(onInvite).not.toHaveBeenCalled();
    // No selection state accrues in single mode.
    expect(rows[0]).toHaveAttribute('data-selected', 'false');
    // Already-in-call rows stay disabled — no pick fires.
    const bob = rows.find((r) => r.getAttribute('data-user-id') === 'u-bob')!;
    fireEvent.click(bob);
    expect(onPick).toHaveBeenCalledTimes(1);
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
