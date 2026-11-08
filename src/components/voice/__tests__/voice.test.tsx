import { render, screen, fireEvent } from '@testing-library/react';
import { VoiceDock } from '../VoiceDock';
import { VoiceActivityRing } from '../VoiceActivityRing';
import { VoiceTurnStrip, VoiceConfirmCard } from '../VoiceTurnStrip';
import { VoiceChoiceCard } from '../VoiceChoiceCard';
import { VOICE_PHASES, VOICE_PHASE_LABEL, clampLevel } from '../voiceTypes';

const dockBase = { level: 0.4, outputLevel: 0.2, onStart: vi.fn(), onStop: vi.fn(), onMute: vi.fn() };

describe('VoiceDock phases', () => {
  it.each(VOICE_PHASES)('renders %s with its label', (phase) => {
    render(<VoiceDock {...dockBase} phase={phase} />);
    expect(screen.getByTestId('voice-dock')).toHaveAttribute('data-phase', phase);
    expect(screen.getByTestId('voice-dock-phase')).toHaveTextContent(VOICE_PHASE_LABEL[phase]);
    expect(screen.getByTestId('voice-dock-ring')).toHaveAttribute('aria-hidden', 'true');
  });

  it('phase label is a status live region', () => {
    render(<VoiceDock {...dockBase} phase="listening" />);
    const status = screen.getByTestId('voice-dock-phase').querySelector('[role="status"]');
    expect(status).toHaveTextContent('Listening');
  });

  it('shows Start when off and calls onStart; Stop and Mute when live', () => {
    const onStart = vi.fn();
    const { rerender } = render(<VoiceDock {...dockBase} onStart={onStart} phase="off" />);
    fireEvent.click(screen.getByTestId('voice-dock-start'));
    expect(onStart).toHaveBeenCalledTimes(1);
    const onStop = vi.fn();
    const onMute = vi.fn();
    rerender(<VoiceDock {...dockBase} onStop={onStop} onMute={onMute} phase="listening" elapsedSeconds={75} />);
    fireEvent.click(screen.getByTestId('voice-dock-stop'));
    fireEvent.click(screen.getByTestId('voice-dock-mute'));
    expect(onStop).toHaveBeenCalledTimes(1);
    expect(onMute).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('voice-dock-elapsed')).toHaveTextContent('01:15');
  });

  it('unavailable disables Start and carries the reason as the title', () => {
    render(<VoiceDock {...dockBase} phase="unavailable" unavailableReason="No voice grant" />);
    expect(screen.getByTestId('voice-dock-start')).toBeDisabled();
    expect(screen.getByTestId('voice-dock-phase')).toHaveAttribute('title', 'No voice grant');
  });

  it('shows the last line and the budget meter; compact hides both', () => {
    const props = { ...dockBase, phase: 'listening' as const, lastLine: { role: 'you' as const, text: 'open atlas' }, budget: { usedUsd: 0.25, holdUsd: 1 } };
    const { rerender } = render(<VoiceDock {...props} />);
    expect(screen.getByTestId('voice-dock-last-line')).toHaveTextContent('open atlas');
    expect(screen.getByTestId('voice-dock-budget')).toBeInTheDocument();
    rerender(<VoiceDock {...props} compact />);
    expect(screen.queryByTestId('voice-dock-last-line')).toBeNull();
    expect(screen.queryByTestId('voice-dock-budget')).toBeNull();
  });

  it('confirming opens the card; confirm, cancel and Escape call back once each', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(<VoiceDock {...dockBase} phase="confirming" pending={{ title: 'Archive Atlas?', onConfirm, onCancel }} />);
    expect(screen.getByTestId('voice-confirm-card')).toHaveTextContent('Archive Atlas?');
    fireEvent.click(screen.getByTestId('voice-confirm-card-confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('voice-confirm-card-cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(screen.getByTestId('voice-confirm-card'), { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledTimes(2);
  });
});

describe('VoiceDock size', () => {
  it('panel (default) keeps the md ring, the pill and the filled Start square', () => {
    render(<VoiceDock {...dockBase} phase="off" />);
    expect(screen.getByTestId('voice-dock')).toHaveAttribute('data-size', 'panel');
    expect(screen.getByTestId('voice-dock-ring').getAttribute('class')).toContain('size-9');
    expect(screen.getByTestId('voice-dock-start')).not.toHaveTextContent('Voice');
  });

  it('footer matches the footer controls: sm ring, xs labels, ghost icon+label Start, no vertical padding', () => {
    const lastLine = { role: 'you' as const, text: 'open atlas' };
    const { rerender } = render(<VoiceDock {...dockBase} phase="off" size="footer" />);
    const dock = screen.getByTestId('voice-dock');
    expect(dock).toHaveAttribute('data-size', 'footer');
    expect(dock.getAttribute('class')).not.toMatch(/\bpy-/);
    expect(screen.getByTestId('voice-dock-ring').getAttribute('class')).toContain('size-4.5');
    const start = screen.getByTestId('voice-dock-start');
    expect(start).toHaveTextContent('Voice');
    expect(start).toHaveAttribute('data-variant', 'ghost');
    expect(start).toHaveAttribute('data-size', 'sm');
    expect(screen.getByTestId('voice-dock-phase').querySelector('[role="status"]')!.getAttribute('class')).toContain('text-xs');
    rerender(<VoiceDock {...dockBase} phase="listening" size="footer" lastLine={lastLine} />);
    expect(screen.getByTestId('voice-dock-last-line').getAttribute('class')).toContain('text-xs');
    const stop = screen.getByTestId('voice-dock-stop');
    expect(stop).toHaveAttribute('data-variant', 'ghost');
    expect(stop).toHaveTextContent('End');
    expect(screen.getByTestId('voice-dock-mute')).toBeInTheDocument();
  });

  it('footer Start takes a custom label and stays disabled when unavailable', () => {
    render(<VoiceDock {...dockBase} phase="unavailable" size="footer" startLabel="Talk" unavailableReason="No grant" />);
    expect(screen.getByTestId('voice-dock-start')).toHaveTextContent('Talk');
    expect(screen.getByTestId('voice-dock-start')).toBeDisabled();
  });
});

describe('VoiceDock Escape', () => {
  it('Escape with focus in the dock popover cancels exactly once', () => {
    const onCancel = vi.fn();
    render(<VoiceDock {...dockBase} phase="confirming" pending={{ title: 'Archive?', onConfirm: vi.fn(), onCancel }} />);
    fireEvent.keyDown(screen.getByTestId('voice-confirm-card'), { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

describe('VoiceActivityRing', () => {
  it('clamps levels to 0..1', () => {
    expect(clampLevel(5)).toBe(1);
    expect(clampLevel(-2)).toBe(0);
    expect(clampLevel(Number.NaN)).toBe(0);
    const { rerender } = render(<VoiceActivityRing phase="listening" level={9} data-testid="r" />);
    expect(screen.getByTestId('r')).toHaveAttribute('data-level', '1.00');
    rerender(<VoiceActivityRing phase="speaking" level={0} outputLevel={-3} data-testid="r" />);
    expect(screen.getByTestId('r')).toHaveAttribute('data-output-level', '0.00');
  });

  it('listening stroke follows level', () => {
    const { rerender } = render(<VoiceActivityRing phase="listening" level={0} data-testid="r" />);
    const w0 = Number(screen.getByTestId('r').querySelector('[data-part="ring"]')!.getAttribute('stroke-width'));
    rerender(<VoiceActivityRing phase="listening" level={1} data-testid="r" />);
    const w1 = Number(screen.getByTestId('r').querySelector('[data-part="ring"]')!.getAttribute('stroke-width'));
    expect(w1).toBeGreaterThan(w0);
  });

  it('rotates while thinking and executing, not when off', () => {
    const { rerender } = render(<VoiceActivityRing phase="thinking" data-testid="r" />);
    expect(screen.getByTestId('r').getAttribute('class')).toContain('animate-spin');
    rerender(<VoiceActivityRing phase="executing" data-testid="r" />);
    expect(screen.getByTestId('r').getAttribute('class')).toContain('animate-spin');
    rerender(<VoiceActivityRing phase="off" data-testid="r" />);
    expect(screen.getByTestId('r').getAttribute('class')).not.toContain('animate-spin');
  });
});

describe('VoiceTurnStrip', () => {
  const turns = [
    { id: 'a', role: 'you' as const, text: 'one', at: '09:00' },
    { id: 'b', role: 'assistant' as const, text: 'two', at: '09:01', toolCalls: [{ name: 'nav.open', status: 'running' as const, summary: 'atlas' }] },
    { id: 'c', role: 'you' as const, text: 'three', at: '09:02' },
  ];

  it('shows the last maxVisible turns and tool statuses', () => {
    render(<VoiceTurnStrip turns={turns} maxVisible={2} />);
    expect(screen.queryByTestId('voice-turn-strip-turn-a')).toBeNull();
    expect(screen.getByTestId('voice-turn-strip-tool-b-0')).toHaveAttribute('data-status', 'running');
  });

  it('clear calls onClear', () => {
    const onClear = vi.fn();
    render(<VoiceTurnStrip turns={turns} onClear={onClear} />);
    fireEvent.click(screen.getByTestId('voice-turn-strip-clear'));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('confirmation card: buttons, Enter confirms on the card, Escape cancels', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(<VoiceTurnStrip turns={[]} pending={{ title: 'Delete?', detail: 'Cannot undo', onConfirm, onCancel }} />);
    const card = screen.getByTestId('voice-confirm-card');
    expect(card).toHaveTextContent('Cannot undo');
    expect(card).toHaveFocus();
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onConfirm).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(card, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('voice-confirm-card-confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(2);
  });

  it('Enter on the Cancel button does not also confirm', () => {
    const onConfirm = vi.fn();
    render(<VoiceTurnStrip turns={[]} pending={{ title: 'x', onConfirm, onCancel: vi.fn() }} />);
    fireEvent.keyDown(screen.getByTestId('voice-confirm-card-cancel'), { key: 'Enter' });
    expect(onConfirm).not.toHaveBeenCalled();
  });
});

describe('VoiceChoiceCard', () => {
  const candidates = Array.from({ length: 12 }, (_, i) => ({ title: `Alpha ${i + 1}`, subtitle: `sub ${i + 1}`, kind: 'initiative' }));
  const make = (extra: Record<string, unknown> = {}, n = 3) => {
    const onChoose = vi.fn();
    const onCancel = vi.fn();
    const choice = { title: 'Which Alpha?', candidates: candidates.slice(0, n), onChoose, onCancel, ...extra };
    return { onChoose, onCancel, ui: <VoiceChoiceCard choice={choice} /> };
  };

  it('shows ordinals, titles and secondary lines; at most ten rows', () => {
    const { ui } = make({ candidates }, 12);
    render(ui);
    expect(screen.getAllByRole('listitem')).toHaveLength(10);
    expect(screen.getByTestId('voice-choice-card-row-2')).toHaveTextContent('2Alpha 2initiativesub 2');
  });

  it('click chooses by zero-based index', () => {
    const { ui, onChoose } = make();
    render(ui);
    fireEvent.click(screen.getByTestId('voice-choice-card-row-2'));
    expect(onChoose).toHaveBeenCalledWith(1);
  });

  it('the ordinal prop chooses that row once, and preselects it', () => {
    const { onChoose, onCancel } = make();
    const choice = { title: 'Which?', candidates: candidates.slice(0, 3), onChoose, onCancel };
    const { rerender } = render(<VoiceChoiceCard choice={{ ...choice, ordinal: 2 }} />);
    expect(onChoose).toHaveBeenCalledTimes(1);
    expect(onChoose).toHaveBeenCalledWith(1);
    expect(screen.getByTestId('voice-choice-card-row-2')).toHaveAttribute('data-selected', 'true');
    rerender(<VoiceChoiceCard choice={{ ...choice, ordinal: 2 }} />);
    expect(onChoose).toHaveBeenCalledTimes(1);
    rerender(<VoiceChoiceCard choice={{ ...choice, ordinal: 9 }} />);
    expect(onChoose).toHaveBeenCalledTimes(1);
  });

  it('digits choose, 0 chooses the tenth, out-of-range digits do nothing', () => {
    const { ui, onChoose } = make({}, 10);
    render(ui);
    const card = screen.getByTestId('voice-choice-card');
    fireEvent.keyDown(card, { key: '3' });
    expect(onChoose).toHaveBeenLastCalledWith(2);
    fireEvent.keyDown(card, { key: '0' });
    expect(onChoose).toHaveBeenLastCalledWith(9);
    const second = make();
    render(second.ui);
    fireEvent.keyDown(screen.getAllByTestId('voice-choice-card')[1]!, { key: '7' });
    expect(second.onChoose).not.toHaveBeenCalled();
  });

  it('arrows move the active row; Escape and the Cancel button cancel', () => {
    const { ui, onChoose, onCancel } = make();
    render(ui);
    const card = screen.getByTestId('voice-choice-card');
    fireEvent.keyDown(card, { key: 'ArrowDown' });
    expect(screen.getByTestId('voice-choice-card-row-2')).toHaveAttribute('data-selected', 'true');
    fireEvent.keyDown(card, { key: 'ArrowUp' });
    fireEvent.keyDown(card, { key: 'ArrowUp' });
    expect(screen.getByTestId('voice-choice-card-row-3')).toHaveAttribute('data-selected', 'true');
    expect(onChoose).not.toHaveBeenCalled();
    fireEvent.keyDown(card, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('voice-choice-card-cancel'));
    expect(onCancel).toHaveBeenCalledTimes(2);
  });

  it('renders inside the strip and the dock (compact at footer size)', () => {
    const { onChoose, onCancel } = make();
    const pendingChoice = { title: 'Which?', candidates: candidates.slice(0, 2), onChoose, onCancel };
    const { unmount } = render(<VoiceTurnStrip turns={[]} pendingChoice={pendingChoice} />);
    expect(screen.getByTestId('voice-choice-card')).toBeInTheDocument();
    unmount();
    render(<VoiceDock {...dockBase} phase="confirming" size="footer" pendingChoice={pendingChoice} />);
    expect(screen.getByTestId('voice-choice-card')).toHaveAttribute('data-compact', 'true');
  });
});

describe('VoiceConfirmCard fields', () => {
  it('without fields, confirm is a bare call and detail lists render as a list', () => {
    const onConfirm = vi.fn();
    render(<VoiceConfirmCard pending={{ title: 'Do it?', detail: ['one', 'two'], onConfirm, onCancel: vi.fn() }} />);
    expect(screen.queryByTestId('voice-confirm-card-note')).toBeNull();
    expect(screen.getByTestId('voice-confirm-card-detail').querySelectorAll('li')).toHaveLength(2);
    fireEvent.click(screen.getByTestId('voice-confirm-card-confirm'));
    expect(onConfirm).toHaveBeenCalledWith();
  });

  it('with fields, confirm carries { decision, note }; the note is trimmed and capped at 200', () => {
    const onConfirm = vi.fn();
    render(<VoiceConfirmCard pending={{ title: 'Decide', fields: {}, onConfirm, onCancel: vi.fn() }} />);
    fireEvent.click(screen.getByTestId('voice-confirm-card-confirm'));
    expect(onConfirm).toHaveBeenLastCalledWith({ decision: 'approve', note: '' });
    fireEvent.click(screen.getByRole('radio', { name: 'Reject' }));
    fireEvent.change(screen.getByTestId('voice-confirm-card-note'), { target: { value: `   ${'x'.repeat(250)}   ` } });
    fireEvent.click(screen.getByTestId('voice-confirm-card-confirm'));
    expect(onConfirm).toHaveBeenLastCalledWith({ decision: 'reject', note: 'x'.repeat(200) });
  });

  it('a long note without padding is capped at exactly 200; Enter in the note confirms', () => {
    const onConfirm = vi.fn();
    render(<VoiceConfirmCard pending={{ title: 'Decide', fields: { decision: 'reject' }, onConfirm, onCancel: vi.fn() }} />);
    const input = screen.getByTestId('voice-confirm-card-note');
    fireEvent.change(input, { target: { value: 'y'.repeat(300) } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onConfirm).toHaveBeenCalledWith({ decision: 'reject', note: 'y'.repeat(200) });
  });
});
