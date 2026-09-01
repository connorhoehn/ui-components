// Density split for the call control row.
//
// The operator's report was "the icons on the bottom are duplicated, it seems
// way off, some of them should be hidden in this view anyway" — a 320px docked
// widget was rendering the same row as a fullscreen stage. `density="compact"`
// thins the row; these tests pin the two halves of that contract: 'full' is
// byte-for-byte the row that shipped before the prop existed, and nothing
// compact demotes ever becomes unreachable.

import { render, screen, fireEvent, within } from '@testing-library/react';
import { CallControls, type CallControlsProps } from '../CallControls';

/** Every control wired at once — the densest row the component can produce. */
function allWired(): CallControlsProps {
  return {
    mode: 'video',
    onToggleMute: vi.fn(),
    onToggleCamera: vi.fn(),
    onToggleScreenShare: vi.fn(),
    onEndCall: vi.fn(),
    onOpenAddParticipant: vi.fn(),
  };
}

/** Ordered testids of the buttons rendered directly in the row. */
function rowTestIds(): string[] {
  const row = screen.getByTestId('call-controls');
  return Array.from(row.querySelectorAll<HTMLElement>('button[data-testid]'))
    // The overflow PANEL is a descendant of the row (it is positioned against
    // its trigger), so items inside the menu are not "in the row".
    .filter((b) => !b.closest('[role="menu"]'))
    .map((b) => b.dataset.testid!);
}

describe('CallControls density', () => {
  it('defaults to full: the row is exactly what it rendered before the prop existed', () => {
    render(<CallControls {...allWired()} />);
    expect(rowTestIds()).toEqual([
      'mute-button',
      'camera-button',
      'screenshare-button',
      'add-participant-button',
      'hangup-button',
    ]);
    expect(screen.queryByTestId('call-controls-more-button')).toBeNull();
  });

  it('full keeps the audio-mode row unchanged too', () => {
    render(
      <CallControls
        {...allWired()}
        mode="audio"
        onUpgradeToVideo={vi.fn()}
      />,
    );
    expect(rowTestIds()).toEqual([
      'mute-button',
      'upgrade-to-video-button',
      'screenshare-button',
      'add-participant-button',
      'hangup-button',
    ]);
  });

  it('compact keeps only mute / camera / end inline, behind a More trigger', () => {
    render(<CallControls {...allWired()} density="compact" />);
    expect(rowTestIds()).toEqual([
      'mute-button',
      'camera-button',
      'call-controls-more-button',
      'hangup-button',
    ]);
  });

  it('compact keeps caller-supplied extras inline', () => {
    render(
      <CallControls
        {...allWired()}
        density="compact"
        extras={<button type="button" data-testid="captions-button">CC</button>}
      />,
    );
    expect(rowTestIds()).toContain('captions-button');
  });

  it('demoted controls are still REACHABLE through the overflow menu', () => {
    const props = allWired();
    render(<CallControls {...props} density="compact" />);

    // Not in the row…
    expect(screen.queryByTestId('call-controls-overflow')).toBeNull();

    fireEvent.click(screen.getByTestId('call-controls-more-button'));
    const menu = screen.getByTestId('call-controls-overflow');
    expect(within(menu).getByTestId('screenshare-button')).toBeInTheDocument();
    expect(within(menu).getByTestId('add-participant-button')).toBeInTheDocument();

    // …and still wired to the same handler.
    fireEvent.click(within(menu).getByTestId('screenshare-button'));
    expect(props.onToggleScreenShare).toHaveBeenCalledTimes(1);
    // Selecting an item closes the menu.
    expect(screen.queryByTestId('call-controls-overflow')).toBeNull();
  });

  it('the overflow trigger has an accessible name and announces its menu', () => {
    render(<CallControls {...allWired()} density="compact" />);
    const trigger = screen.getByRole('button', { name: 'More call controls' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: 'More call controls' })).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem').length).toBeGreaterThan(0);
  });

  it('Escape closes the overflow menu and returns focus to the trigger', () => {
    render(<CallControls {...allWired()} density="compact" />);
    const trigger = screen.getByTestId('call-controls-more-button');
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByTestId('call-controls-overflow'), { key: 'Escape' });
    expect(screen.queryByTestId('call-controls-overflow')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  // The pre-existing rule: no handler ⇒ no button. Compact must not resurrect
  // an unwired control as a dead menu row — that would be the same "looks
  // clickable, does nothing" bug relocated.
  it.each(['full', 'compact'] as const)(
    'renders nothing for an unwired handler at %s density',
    (density) => {
      render(
        <CallControls
          mode="video"
          density={density}
          onToggleMute={vi.fn()}
          onEndCall={vi.fn()}
        />,
      );
      expect(screen.queryByTestId('screenshare-button')).toBeNull();
      expect(screen.queryByTestId('camera-button')).toBeNull();
      expect(screen.queryByTestId('add-participant-button')).toBeNull();

      const more = screen.queryByTestId('call-controls-more-button');
      if (more) {
        fireEvent.click(more);
        expect(screen.queryByTestId('screenshare-button')).toBeNull();
        expect(screen.queryByTestId('add-participant-button')).toBeNull();
      }
    },
  );

  it('drops the More trigger entirely when nothing was demoted', () => {
    // Only inline-eligible controls are wired, so an empty menu would be a
    // trigger that opens onto nothing.
    render(
      <CallControls
        mode="video"
        density="compact"
        onToggleMute={vi.fn()}
        onToggleCamera={vi.fn()}
        onEndCall={vi.fn()}
      />,
    );
    expect(screen.queryByTestId('call-controls-more-button')).toBeNull();
  });

  it('compact still opens the built-in add-participant picker from the menu', () => {
    const onAddParticipant = vi.fn();
    render(
      <CallControls
        mode="video"
        density="compact"
        onToggleMute={vi.fn()}
        onEndCall={vi.fn()}
        onAddParticipant={onAddParticipant}
        availableParticipants={[{ id: 'alice', displayName: 'Alice' }]}
      />,
    );
    fireEvent.click(screen.getByTestId('call-controls-more-button'));
    fireEvent.click(screen.getByTestId('add-participant-button'));
    fireEvent.click(screen.getByText('Alice'));
    expect(onAddParticipant).toHaveBeenCalledWith('alice');
  });
});
