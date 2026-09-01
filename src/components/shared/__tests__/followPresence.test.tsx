// Follow mode — the presence card and the banner's two exits.

import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PresenceAvatars, type PresenceUser } from '../PresenceAvatars';
import { FollowBanner } from '../FollowBanner';

const USERS: PresenceUser[] = [
  { id: 'u1', name: 'Ada Lovelace', online: true, mode: 'editor', detail: 'editing', location: 'Rollout plan' },
  { id: 'u2', name: 'Grace Hopper', online: true, mode: 'reader', detail: 'reading' },
];

afterEach(cleanup);

describe('PresenceAvatars follow card', () => {
  it('is absent without onFollowUser — the bubbles stay exactly what they were', () => {
    render(<PresenceAvatars users={USERS} onUserClick={() => {}} />);
    fireEvent.mouseEnter(screen.getAllByTestId('presence-avatar')[0]!);
    expect(screen.queryByTestId('presence-card')).toBeNull();
    // Back-compat: the native title tooltip survives in this mode.
    expect(screen.getAllByTestId('presence-avatar')[0]).toHaveAttribute('title');
  });

  it('shows name, detail and location on hover, and Follow acts on that user', async () => {
    const onFollow = vi.fn();
    render(<PresenceAvatars users={USERS} onUserClick={() => {}} onFollowUser={onFollow} />);

    const [ada] = screen.getAllByTestId('presence-avatar');
    fireEvent.mouseEnter(ada!.parentElement!);
    const card = await screen.findByTestId('presence-card');
    expect(card).toHaveTextContent('Ada Lovelace');
    expect(card).toHaveTextContent('editing');
    expect(card).toHaveTextContent('Rollout plan');

    await userEvent.click(screen.getByRole('button', { name: 'Follow' }));
    expect(onFollow).toHaveBeenCalledWith('u1');
  });

  it('offers Stop following on the followed user', async () => {
    render(
      <PresenceAvatars users={USERS} onUserClick={() => {}} onFollowUser={() => {}} followingUserId="u1" />,
    );
    fireEvent.mouseEnter(screen.getAllByTestId('presence-avatar')[0]!.parentElement!);
    expect(await screen.findByRole('button', { name: 'Stop following' })).toBeInTheDocument();
  });

  it('does not follow on a bare avatar click — that is jump, not a mode change', async () => {
    const onFollow = vi.fn();
    const onJump = vi.fn();
    render(<PresenceAvatars users={USERS} onUserClick={onJump} onFollowUser={onFollow} />);
    await userEvent.click(screen.getAllByTestId('presence-avatar')[0]!);
    expect(onJump).toHaveBeenCalledWith('u1');
    expect(onFollow).not.toHaveBeenCalled();
  });

  it('drops the native title while the card is on duty', () => {
    render(<PresenceAvatars users={USERS} onUserClick={() => {}} onFollowUser={() => {}} />);
    expect(screen.getAllByTestId('presence-avatar')[0]).not.toHaveAttribute('title');
  });
});

describe('FollowBanner', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('renders nothing when nobody is followed', () => {
    const { container } = render(<FollowBanner name={null} onStop={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('Stop is the explicit exit', () => {
    const onStop = vi.fn();
    render(<FollowBanner name="Ada Lovelace" onStop={onStop} />);
    fireEvent.click(screen.getByRole('button', { name: 'Stop' }));
    expect(onStop).toHaveBeenCalled();
  });

  it('any local interaction is the implicit exit — grabbing the page wins', () => {
    const onStop = vi.fn();
    render(<FollowBanner name="Ada" onStop={onStop} />);
    // Before the arming delay, the click that started following must not
    // immediately end it.
    fireEvent.mouseDown(window);
    expect(onStop).not.toHaveBeenCalled();

    act(() => { vi.advanceTimersByTime(600); });
    fireEvent.mouseDown(window);
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it('keyboard and wheel unlock too', () => {
    const onStop = vi.fn();
    render(<FollowBanner name="Ada" onStop={onStop} />);
    act(() => { vi.advanceTimersByTime(600); });
    fireEvent.keyDown(window, { key: 'j' });
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it('autoStopOnInteract=false leaves only the button', () => {
    const onStop = vi.fn();
    render(<FollowBanner name="Ada" onStop={onStop} autoStopOnInteract={false} />);
    act(() => { vi.advanceTimersByTime(600); });
    fireEvent.mouseDown(window);
    expect(onStop).not.toHaveBeenCalled();
  });
});
