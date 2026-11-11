import { vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ParticipantAccessBadge, participantAccessInfo } from '../ParticipantAccessBadge';
import { RosterPanel, type RosterParticipant } from '../RosterPanel';
import { CallPeopleList, callPersonStatus, type CallPerson } from '../CallPeopleList';
import { ParticipantTile } from '../ParticipantTile';
import { HangoutGrid } from '../HangoutGrid';
import { CallTileRow } from '../CallTileRow';
import { CallParticipantStrip } from '../CallParticipantStrip';
import { VideoGrid } from '../VideoGrid';

describe('ParticipantAccessBadge', () => {
  it('describes view-only, and nothing for full access', () => {
    expect(participantAccessInfo('view-only')?.label).toBe('View only');
    expect(participantAccessInfo('view-only')?.description).toMatch(/watch and listen/);
    expect(participantAccessInfo(undefined)).toBeNull();
    expect(participantAccessInfo(null)).toBeNull();
  });

  it('draws the label with the description as its tooltip', () => {
    render(<ParticipantAccessBadge access="view-only" />);
    const badge = screen.getByTestId('participant-access-badge');
    expect(badge).toHaveTextContent('View only');
    expect(badge).toHaveAttribute('data-access', 'view-only');
    expect(badge.getAttribute('title')).toMatch(/cannot turn on a camera/);
  });

  it('icon-only is an image named by the label; a label override replaces the words', () => {
    const { rerender } = render(<ParticipantAccessBadge access="view-only" iconOnly />);
    expect(screen.getByRole('img', { name: 'View only' })).not.toHaveTextContent('View only');
    rerender(<ParticipantAccessBadge access="view-only" label="Nur ansehen" />);
    expect(screen.getByTestId('participant-access-badge')).toHaveTextContent('Nur ansehen');
  });

  it('renders nothing without access', () => {
    const { container } = render(<ParticipantAccessBadge access={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });
});

const ROSTER: RosterParticipant[] = [
  { id: 'me', displayName: 'Morgan Reyes', isLocal: true },
  { id: 'ana', displayName: 'Ana Ruiz', access: 'view-only' },
  { id: 'bo', displayName: 'Bo Lind', isMuted: true },
];

describe('RosterPanel — access and row menu', () => {
  it('a view-only row shows the chip, in the row button’s accessible name', () => {
    render(<RosterPanel participants={ROSTER} />);
    const rows = screen.getAllByTestId('roster-row');
    const ana = rows.find((r) => r.getAttribute('data-user-id') === 'ana')!;
    expect(within(ana).getByTestId('roster-access')).toHaveTextContent('View only');
    expect(within(ana).getByRole('button')).toHaveAccessibleName(/Ana Ruiz.*View only/);
    const bo = rows.find((r) => r.getAttribute('data-user-id') === 'bo')!;
    expect(within(bo).queryByTestId('roster-access')).toBeNull();
  });

  it('dark tone draws the chip in the overlay ink', () => {
    render(<RosterPanel participants={ROSTER} tone="dark" />);
    expect(screen.getByTestId('roster-access').className).toContain('text-white');
  });

  it('rowMenu adds a ⋯ menu per row that has items, and runs the chosen item', () => {
    const onRevoke = vi.fn();
    render(
      <RosterPanel
        participants={ROSTER}
        rowMenu={(p) => (p.isLocal ? null : [{ items: [{ label: p.access === 'view-only' ? 'Allow publishing' : 'Make view-only', onSelect: () => onRevoke(p.id) }] }])}
      />,
    );
    const triggers = screen.getAllByTestId('roster-row-menu');
    expect(triggers).toHaveLength(2);
    expect(triggers[0]).toHaveAccessibleName('Actions for Ana Ruiz');
    fireEvent.click(triggers[1]!);
    fireEvent.click(screen.getByText('Make view-only'));
    expect(onRevoke).toHaveBeenCalledWith('bo');
  });

  it('rowMenuLabel names the trigger; sections with no items draw no trigger', () => {
    render(
      <RosterPanel
        participants={ROSTER}
        rowMenu={(p) => (p.id === 'bo' ? [{ items: [] }] : [{ items: [{ label: 'Remove', onSelect: () => {} }] }])}
        rowMenuLabel={(p) => `More for ${p.displayName}`}
      />,
    );
    const names = screen.getAllByTestId('roster-row-menu').map((el) => el.getAttribute('aria-label'));
    expect(names).toEqual(['More for Morgan Reyes', 'More for Ana Ruiz']);
  });

  it('without access or rowMenu the markup is what it was', () => {
    const plain = ROSTER.map(({ access: _access, ...rest }) => rest);
    const { container: before } = render(<RosterPanel participants={plain} />);
    const { container: withEmptyMenu } = render(
      <RosterPanel participants={plain.map((p) => ({ ...p, access: undefined }))} rowMenu={() => null} />,
    );
    expect(withEmptyMenu.innerHTML).toBe(before.innerHTML);
    expect(before.querySelector('[data-testid="roster-row-menu"]')).toBeNull();
    expect(before.querySelector('[data-testid="roster-access"]')).toBeNull();
  });
});

const PERSON: CallPerson = {
  userId: 'x',
  name: 'X',
  isLocal: false,
  isHost: false,
  state: 'in-call',
  audioOn: false,
  cameraOn: false,
  screenSharing: false,
  presenting: false,
};

describe('CallPeopleList — access and row menu', () => {
  it('View only outranks presenting, sharing and camera off; reconnecting and not-in-call states outrank it', () => {
    expect(callPersonStatus({ ...PERSON, access: 'view-only' })).toMatchObject({ label: 'View only', kind: 'view-only' });
    expect(callPersonStatus({ ...PERSON, access: 'view-only', presenting: true, screenSharing: true }).kind).toBe('view-only');
    expect(callPersonStatus({ ...PERSON, access: 'view-only', isHost: true }).label).toBe('Host · View only');
    expect(callPersonStatus({ ...PERSON, access: 'view-only', state: 'reconnecting' }).kind).toBe('reconnecting');
    expect(callPersonStatus({ ...PERSON, access: 'view-only', state: 'left' }).kind).toBe('left');
    expect(callPersonStatus({ ...PERSON, cameraOn: false }).kind).toBe('camera-off');
  });

  function list(extra: Partial<Parameters<typeof CallPeopleList>[0]> = {}) {
    return render(
      <CallPeopleList
        people={[
          { ...PERSON, userId: 'me', name: 'Connor Hoehn', isLocal: true, isHost: true },
          { ...PERSON, userId: 'al', name: 'Alice Chen', access: 'view-only' },
        ]}
        count={2}
        canModerate
        onInvite={() => {}}
        onFollow={() => {}}
        onMuteForMe={() => {}}
        {...extra}
      />,
    );
  }

  it('shows the view-only sub-status with its description as the tooltip', () => {
    list();
    const status = screen.getByTestId('call-person-status-al');
    expect(status).toHaveTextContent('View only');
    expect(status).toHaveAttribute('data-status', 'view-only');
    expect(status.getAttribute('title')).toMatch(/watch and listen/);
  });

  it('rowMenu sections follow the built-in items', () => {
    const onGrant = vi.fn();
    list({ rowMenu: (p) => (p.isLocal ? null : [{ label: 'Publishing', items: [{ label: 'Allow publishing', onSelect: () => onGrant(p.userId) }] }]) });
    fireEvent.click(screen.getByTestId('call-person-menu-al'));
    const panel = screen.getByTestId('call-person-menu-panel-al');
    const labels = within(panel).getAllByRole('menuitem').map((el) => el.textContent);
    expect(labels.indexOf('Mute for me')).toBeLessThan(labels.findIndex((l) => l?.includes('Allow publishing')));
    fireEvent.click(within(panel).getByText('Allow publishing'));
    expect(onGrant).toHaveBeenCalledWith('al');
  });

  it('a row with no built-in items gets the ⋯ button only when rowMenu supplies some', () => {
    const { unmount } = list();
    // Your own row has no built-in items here (no settings / leave handlers).
    expect(screen.queryByTestId('call-person-menu-me')).toBeNull();
    unmount();
    list({ rowMenu: (p) => (p.isLocal ? [{ items: [{ label: 'Hand over host', onSelect: () => {} }] }] : null) });
    expect(screen.getByTestId('call-person-menu-me')).toBeInTheDocument();
  });

  it('without access or rowMenu the markup is what it was', () => {
    const people: CallPerson[] = [{ ...PERSON, userId: 'al', name: 'Alice Chen' }];
    const props = { count: 1, canModerate: false, onInvite: () => {}, onFollow: () => {}, onMuteForMe: () => {} };
    const { container: before } = render(<CallPeopleList people={people} {...props} />);
    const { container: after } = render(<CallPeopleList people={people.map((p) => ({ ...p, access: undefined }))} rowMenu={() => []} {...props} />);
    expect(after.innerHTML).toBe(before.innerHTML);
  });
});

describe('tiles — view-only mark', () => {
  it('ParticipantTile draws the eye in its name chip, named for screen readers', () => {
    render(<ParticipantTile id="a" displayName="Ana Ruiz" access="view-only" />);
    expect(screen.getByTestId('remote-tile')).toHaveAttribute('data-access', 'view-only');
    expect(screen.getByTestId('tile-access')).toHaveAccessibleName('View only');
  });

  it('ParticipantTile without access is unchanged', () => {
    const { container: before } = render(<ParticipantTile id="a" displayName="Ana Ruiz" isMuted />);
    const { container: after } = render(<ParticipantTile id="a" displayName="Ana Ruiz" isMuted access={undefined} />);
    expect(after.innerHTML).toBe(before.innerHTML);
    expect(before.querySelector('[data-access]')).toBeNull();
  });

  it('HangoutGrid and VideoGrid pass access to their tiles', () => {
    render(
      <>
        <HangoutGrid participants={[{ id: 'a', displayName: 'Ana', access: 'view-only' }, { id: 'b', displayName: 'Bo' }]} />
        <VideoGrid participants={[{ id: 'c', displayName: 'Cy', access: 'view-only' }]} />
      </>,
    );
    expect(screen.getAllByTestId('tile-access')).toHaveLength(2);
  });

  it('CallTileRow dock tiles and avatar bubbles carry the standing', () => {
    const { unmount } = render(
      <CallTileRow
        variant="dock"
        participants={[{ id: 'a', displayName: 'Ana', access: 'view-only' }]}
        data-testid="row"
      />,
    );
    const tile = document.querySelector('[data-peer-id="a"]')!;
    expect(tile).toHaveAttribute('data-access', 'view-only');
    expect(tile.getAttribute('aria-label')).toBe('Ana, view only');
    unmount();
    render(<CallTileRow variant="floating" participants={[{ id: 'b', displayName: 'Bo', access: 'view-only' }]} />);
    const bubble = screen.getByTestId('remote-bubble');
    expect(bubble).toHaveAttribute('data-access', 'view-only');
    expect(bubble).toHaveAccessibleName('Bo, view only');
    expect(within(bubble).getByTestId('bubble-access')).toBeInTheDocument();
  });

  it('CallParticipantStrip avatars mark a view-only person', () => {
    render(<CallParticipantStrip participants={[{ id: 'a', displayName: 'Ana', access: 'view-only' }, { id: 'b', displayName: 'Bo' }]} />);
    const marks = screen.getAllByTestId('call-avatar-access');
    expect(marks).toHaveLength(1);
    expect(marks[0]).toHaveAccessibleName('View only');
  });
});
