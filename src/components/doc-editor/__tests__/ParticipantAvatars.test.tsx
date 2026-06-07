import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ParticipantAvatars from '../ParticipantAvatars';
import type { Participant } from '../../../types/document';

function mk(overrides: Partial<Participant> = {}): Participant {
  return {
    clientId: 'c1',
    userId: 'u1',
    displayName: 'Alice Anderson',
    color: '#3b82f6',
    mode: 'editor',
    currentSectionId: null,
    ...overrides,
  };
}

beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date('2026-06-07T12:00:00Z')); });
afterEach(() => { vi.useRealTimers(); });

describe('ParticipantAvatars', () => {
  it('renders nothing when participants is empty', () => {
    const { container } = render(<ParticipantAvatars participants={[]} />);
    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId('participant-avatars')).toBeNull();
  });

  it('renders one avatar per unique participant, dedupes by userId||clientId', () => {
    const ps = [
      mk({ clientId: 'c1', userId: 'u1', displayName: 'Alice A' }),
      mk({ clientId: 'c2', userId: 'u1', displayName: 'Alice (dupe)' }), // dupe by userId
      mk({ clientId: 'c3', userId: 'u2', displayName: 'Bob Brown' }),
    ];
    render(<ParticipantAvatars participants={ps} />);
    expect(screen.getByTestId('participant-avatars')).toBeInTheDocument();
    // dedupe keeps first occurrence
    expect(screen.getAllByText('AA').length).toBe(1); // initials for "Alice A"
    expect(screen.queryByText('A(')).toBeNull();      // "Alice (dupe)" not rendered
    expect(screen.getByText('BB')).toBeInTheDocument(); // initials for "Bob Brown"
  });

  it('renders mode badge text for editor / reviewer / reader', () => {
    const ps = [
      mk({ clientId: 'c1', userId: 'u1', displayName: 'Ed One', mode: 'editor' }),
      mk({ clientId: 'c2', userId: 'u2', displayName: 'Rev Two', mode: 'reviewer' }),
      mk({ clientId: 'c3', userId: 'u3', displayName: 'Rd Three', mode: 'reader' }),
    ];
    render(<ParticipantAvatars participants={ps} />);
    // mode badge appears alongside avatar; getAllByText handles tooltip-vs-badge duplicates
    expect(screen.getAllByText('editing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('reviewing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('reading').length).toBeGreaterThan(0);
  });

  it('renders "away" badge when participant is idle, swapping out mode text', () => {
    const ps = [mk({ idle: true, mode: 'editor' })];
    render(<ParticipantAvatars participants={ps} />);
    expect(screen.getByText('away')).toBeInTheDocument();
    expect(screen.queryByText('editing')).toBeNull();
  });

  it('renders section indicator (with § prefix) when currentSectionId matches a known section', () => {
    const ps = [mk({ currentSectionId: 's42' })];
    render(<ParticipantAvatars participants={ps} sections={[{ id: 's42', title: 'Intro' }]} />);
    // section indicator appears under the avatar; also in tooltip if hovered
    expect(screen.getByText(/§\s*Intro/)).toBeInTheDocument();
  });

  it('does not render section indicator when currentSectionId has no matching section', () => {
    const ps = [mk({ currentSectionId: 'unknown' })];
    render(<ParticipantAvatars participants={ps} sections={[{ id: 's42', title: 'Intro' }]} />);
    expect(screen.queryByText(/§/)).toBeNull();
  });

  it('click on avatar fires onJumpToUser with the participant', () => {
    const onJump = vi.fn();
    const p = mk();
    render(<ParticipantAvatars participants={[p]} onJumpToUser={onJump} />);
    fireEvent.click(screen.getByText('AA'));
    expect(onJump).toHaveBeenCalledTimes(1);
    expect(onJump).toHaveBeenCalledWith(expect.objectContaining({ userId: 'u1', clientId: 'c1' }));
  });

  it('hover shows tooltip with displayName + mode + Follow button when onFollowUser is provided', () => {
    const p = mk({ displayName: 'Alice Anderson', mode: 'editor' });
    render(<ParticipantAvatars participants={[p]} onFollowUser={vi.fn()} />);
    fireEvent.mouseEnter(screen.getByText('AA').closest('.cursor-pointer')!);
    expect(screen.getByText('Alice Anderson')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
  });

  it('tooltip hides after the 150ms leave delay', () => {
    const p = mk();
    render(<ParticipantAvatars participants={[p]} />);
    const item = screen.getByText('AA').closest('.cursor-pointer')!;
    fireEvent.mouseEnter(item);
    expect(screen.getByText('Alice Anderson')).toBeInTheDocument();
    fireEvent.mouseLeave(item);
    act(() => { vi.advanceTimersByTime(160); });
    expect(screen.queryByText('Alice Anderson')).toBeNull();
  });

  it('click Follow inside tooltip fires onFollowUser AND does NOT bubble to onJumpToUser (stopPropagation)', () => {
    const onJump = vi.fn();
    const onFollow = vi.fn();
    const p = mk();
    render(<ParticipantAvatars participants={[p]} onJumpToUser={onJump} onFollowUser={onFollow} />);
    fireEvent.mouseEnter(screen.getByText('AA').closest('.cursor-pointer')!);
    fireEvent.click(screen.getByRole('button', { name: 'Follow' }));
    expect(onFollow).toHaveBeenCalledWith(expect.objectContaining({ userId: 'u1' }));
    expect(onJump).not.toHaveBeenCalled();
  });

  it('shows "following" indicator + "Stop following" tooltip CTA when followingUserId matches', () => {
    const p = mk({ userId: 'u1' });
    render(
      <ParticipantAvatars
        participants={[p]}
        onFollowUser={vi.fn()}
        followingUserId="u1"
      />,
    );
    expect(screen.getByText('following')).toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByText('AA').closest('.cursor-pointer')!);
    expect(screen.getByRole('button', { name: 'Stop following' })).toBeInTheDocument();
  });

  it('tooltip shows "away" instead of mode when idle, and lastSeen renders as ", Nm" duration suffix', () => {
    // lastSeen 4 minutes (240s) ago
    const fourMinAgo = new Date('2026-06-07T11:56:00Z').getTime();
    const p = mk({ idle: true, mode: 'editor', lastSeen: fourMinAgo });
    render(<ParticipantAvatars participants={[p]} />);
    fireEvent.mouseEnter(screen.getByText('AA').closest('.cursor-pointer')!);
    // tooltip body line should read "away, 4m"
    expect(screen.getAllByText(/away, 4m/).length).toBeGreaterThan(0);
  });
});
