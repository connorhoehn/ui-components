import { render, screen } from '@testing-library/react';
import { HangoutLayout } from '../HangoutLayout';
import type { HangoutLayoutParticipant } from '../HangoutLayoutTypes';

function p(id: string, displayName?: string): HangoutLayoutParticipant {
  return { id, displayName: displayName ?? id };
}

describe('HangoutLayout — orchestrator', () => {
  it('renders the grid path by default with few participants', () => {
    render(<HangoutLayout participants={[p('a'), p('b')]} />);
    // Spotlight has data-testid="hangout-spotlight". Its absence means
    // the grid path rendered.
    expect(screen.queryByTestId('hangout-spotlight')).not.toBeInTheDocument();
  });

  it('forces spotlight when spotlightContent is provided', () => {
    render(
      <HangoutLayout
        participants={[p('a'), p('b')]}
        mode="auto"
        spotlightContent={<div>screen</div>}
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.getByTestId('hangout-spotlight')).toBeInTheDocument();
  });

  it('renders spotlight when mode="spotlight"', () => {
    render(
      <HangoutLayout
        participants={[p('a'), p('b')]}
        mode="spotlight"
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.getByTestId('hangout-spotlight')).toBeInTheDocument();
  });

  it('auto-flips to spotlight at the participant threshold (totalCount >= 10)', () => {
    const remotes = Array.from({ length: 10 }, (_, i) => p(`r${i}`));
    render(
      <HangoutLayout
        participants={remotes}
        mode="auto"
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.getByTestId('hangout-spotlight')).toBeInTheDocument();
  });

  it('stays in the grid path at 9 participants', () => {
    const remotes = Array.from({ length: 9 }, (_, i) => p(`r${i}`));
    render(
      <HangoutLayout
        participants={remotes}
        mode="auto"
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.queryByTestId('hangout-spotlight')).not.toBeInTheDocument();
  });

  it('auto-flips to spotlight when ANY participant supplies screenElement (remote)', () => {
    render(
      <HangoutLayout
        participants={[
          p('a'),
          { ...p('b', 'Bob'), screenElement: <div data-testid="screen">s</div> },
        ]}
        mode="auto"
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.getByTestId('hangout-spotlight')).toBeInTheDocument();
    expect(screen.getByTestId('screen')).toBeInTheDocument();
  });

  it('auto-flips to spotlight when the LOCAL participant supplies screenElement', () => {
    render(
      <HangoutLayout
        participants={[p('a'), p('b')]}
        localParticipant={{
          ...p('me', 'Me'),
          screenElement: <div data-testid="my-screen">my</div>,
        }}
        mode="auto"
        speakerHysteresisMs={0}
      />,
    );
    expect(screen.getByTestId('hangout-spotlight')).toBeInTheDocument();
    expect(screen.getByTestId('my-screen')).toBeInTheDocument();
  });
});
