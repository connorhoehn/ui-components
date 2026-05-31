import { render, screen, fireEvent } from '@testing-library/react';
import FollowModeBar from '../FollowModeBar';
import type { Participant } from '../../../types/document';

function mkParticipant(over: Partial<Participant> = {}): Participant {
  return {
    clientId: over.clientId ?? 'c1',
    userId: over.userId ?? 'u1',
    displayName: over.displayName ?? 'Alice',
    color: over.color ?? '#aaaaaa',
    mode: over.mode ?? 'editor',
    currentSectionId: over.currentSectionId ?? null,
  };
}

describe('FollowModeBar', () => {
  it('renders nothing when followingUserId is null', () => {
    const { container } = render(
      <FollowModeBar followingUserId={null} participants={[]} onStopFollow={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when the followed user is no longer in participants', () => {
    const { container } = render(
      <FollowModeBar
        followingUserId="ghost"
        participants={[mkParticipant({ userId: 'someone-else' })]}
        onStopFollow={() => {}}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders the "Following <name>" banner with a Stop button', () => {
    const onStopFollow = vi.fn();
    render(
      <FollowModeBar
        followingUserId="u1"
        participants={[mkParticipant({ userId: 'u1', displayName: 'Alice' })]}
        onStopFollow={onStopFollow}
      />,
    );
    expect(screen.getByText('Following Alice')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Stop'));
    expect(onStopFollow).toHaveBeenCalledTimes(1);
  });

  it('matches by clientId when userId is empty', () => {
    render(
      <FollowModeBar
        followingUserId="c-only"
        participants={[mkParticipant({ clientId: 'c-only', userId: '', displayName: 'Bob' })]}
        onStopFollow={() => {}}
      />,
    );
    expect(screen.getByText('Following Bob')).toBeInTheDocument();
  });
});
