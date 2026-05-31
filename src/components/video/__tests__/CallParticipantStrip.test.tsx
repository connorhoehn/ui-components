import { render, screen } from '@testing-library/react';
import { CallParticipantStrip } from '../CallParticipantStrip';
import type { CallStripParticipant } from '../CallParticipantStrip';

function p(
  id: string,
  extras: Partial<CallStripParticipant> = {},
): CallStripParticipant {
  return { id, displayName: id, ...extras };
}

describe('CallParticipantStrip', () => {
  it('renders one avatar per participant', () => {
    render(
      <CallParticipantStrip
        participants={[p('alice'), p('bob'), p('carol')]}
      />,
    );
    expect(screen.getAllByTestId('call-avatar')).toHaveLength(3);
  });

  it('respects maxVisible and renders the overflow indicator', () => {
    render(
      <CallParticipantStrip
        participants={[p('a'), p('b'), p('c'), p('d'), p('e'), p('f')]}
        maxVisible={3}
      />,
    );
    expect(screen.getAllByTestId('call-avatar')).toHaveLength(3);
    expect(screen.getByTestId('call-participant-strip-overflow')).toHaveTextContent('+3');
  });

  it('does NOT render the overflow indicator when count <= maxVisible', () => {
    render(<CallParticipantStrip participants={[p('a'), p('b')]} maxVisible={4} />);
    expect(screen.queryByTestId('call-participant-strip-overflow')).toBeNull();
  });

  it('renders the localFallback when participants is empty', () => {
    render(
      <CallParticipantStrip
        participants={[]}
        localFallback={p('me', { displayName: 'Me' })}
      />,
    );
    expect(screen.getAllByTestId('call-avatar')).toHaveLength(1);
  });

  it('does NOT render localFallback when participants is non-empty', () => {
    render(
      <CallParticipantStrip
        participants={[p('alice')]}
        localFallback={p('me')}
      />,
    );
    expect(screen.getAllByTestId('call-avatar')).toHaveLength(1);
  });

  it('renders the speaking indicator on participants flagged as speaking', () => {
    render(
      <CallParticipantStrip
        participants={[
          p('alice', { isSpeaking: true }),
          p('bob'),
        ]}
      />,
    );
    expect(screen.getAllByTestId('call-avatar-speaking')).toHaveLength(1);
  });

  it('renders the muted indicator on participants flagged as muted', () => {
    render(
      <CallParticipantStrip
        participants={[
          p('alice', { isMuted: true }),
          p('bob', { isMuted: true }),
          p('carol'),
        ]}
      />,
    );
    expect(screen.getAllByTestId('call-avatar-muted')).toHaveLength(2);
  });

  it('exposes data-count on the root for e2e diagnostics', () => {
    render(<CallParticipantStrip participants={[p('a'), p('b')]} />);
    expect(screen.getByTestId('call-participant-strip')).toHaveAttribute(
      'data-count',
      '2',
    );
  });

  it('uses the provided testId when supplied', () => {
    render(<CallParticipantStrip participants={[]} testId="custom-strip" />);
    expect(screen.getByTestId('custom-strip')).toBeInTheDocument();
    expect(screen.queryByTestId('call-participant-strip')).toBeNull();
  });
});
