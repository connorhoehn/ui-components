import { render, screen, fireEvent, act } from '@testing-library/react';
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
    expect(screen.getByTestId('voice-dock-phase')).toHaveAttribute('role', 'status');
    expect(screen.getByTestId('voice-dock-phase')).toHaveTextContent('Listening');
  });

  it.each(['panel', 'footer'] as const)('the %s size has the phase live region', (size) => {
    render(<VoiceDock {...dockBase} phase="thinking" size={size} />);
    const status = screen.getByTestId('voice-dock-phase');
    expect(status).toHaveAttribute('role', 'status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Thinking');
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
    expect(screen.getByTestId('voice-dock-phase').firstElementChild!.getAttribute('class')).toContain('text-xs');
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
    expect(screen.getAllByRole('option')).toHaveLength(10);
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

describe('voice cards: roles, per-request reset, dock precedence', () => {
  const cands = [{ title: 'Alpha one' }, { title: 'Alpha two' }, { title: 'Alpha three' }];

  it('choice rows are options in a listbox with aria-selected, not buttons', () => {
    render(<VoiceChoiceCard choice={{ title: 'Which?', candidates: cands, onChoose: vi.fn(), onCancel: vi.fn() }} />);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('Enter on a focused option chooses it', () => {
    const onChoose = vi.fn();
    render(<VoiceChoiceCard choice={{ title: 'Which?', candidates: cands, onChoose, onCancel: vi.fn() }} />);
    fireEvent.keyDown(screen.getByTestId('voice-choice-card-row-2'), { key: 'Enter' });
    expect(onChoose).toHaveBeenCalledWith(1);
  });

  it('a second ambiguous request with the same ordinal fires onChoose again', () => {
    const onChoose = vi.fn();
    const base = { title: 'Which Alpha?', candidates: cands, onChoose, onCancel: vi.fn(), ordinal: 2 };
    const { rerender } = render(<VoiceChoiceCard choice={{ ...base, requestId: 'a' }} />);
    expect(onChoose).toHaveBeenCalledTimes(1);
    rerender(<VoiceChoiceCard choice={{ ...base, requestId: 'b' }} />);
    expect(onChoose).toHaveBeenCalledTimes(2);
    expect(onChoose).toHaveBeenLastCalledWith(1);
  });

  it('a second confirmation does not inherit the previous note or toggle', () => {
    const base = { fields: {}, onConfirm: vi.fn(), onCancel: vi.fn() };
    const { rerender } = render(<VoiceConfirmCard pending={{ ...base, title: 'Decide', requestId: 1 }} />);
    fireEvent.click(screen.getByText('Reject'));
    fireEvent.change(screen.getByTestId('voice-confirm-card-note'), { target: { value: 'old note' } });
    rerender(<VoiceConfirmCard pending={{ ...base, title: 'Decide', requestId: 2 }} />);
    expect(screen.getByTestId('voice-confirm-card-note')).toHaveValue('');
    fireEvent.click(screen.getByTestId('voice-confirm-card-confirm'));
    expect(base.onConfirm).toHaveBeenCalledWith({ decision: 'approve', note: '' });
  });

  it('the dock opens the confirmation on pending alone, whatever the phase', () => {
    render(<VoiceDock {...dockBase} phase="executing" pending={{ title: 'Archive?', onConfirm: vi.fn(), onCancel: vi.fn() }} />);
    expect(screen.getByTestId('voice-confirm-card')).toBeInTheDocument();
  });

  it('with pending and pendingChoice both set, the choice shows first', () => {
    const choice = { title: 'Which?', candidates: cands, onChoose: vi.fn(), onCancel: vi.fn() };
    const pending = { title: 'Archive?', onConfirm: vi.fn(), onCancel: vi.fn() };
    const { rerender } = render(<VoiceDock {...dockBase} phase="confirming" pending={pending} pendingChoice={choice} />);
    expect(screen.getByTestId('voice-choice-card')).toBeInTheDocument();
    expect(screen.queryByTestId('voice-confirm-card')).toBeNull();
    rerender(<VoiceDock {...dockBase} phase="confirming" pending={pending} pendingChoice={null} />);
    expect(screen.getByTestId('voice-confirm-card')).toBeInTheDocument();
  });
});

describe('VoiceDock transcript, history and pulse (2.510.6)', () => {
  const turns = Array.from({ length: 5 }, (_, i) => ({ id: `t${i}`, role: (i % 2 ? 'assistant' : 'you') as 'you' | 'assistant', text: `turn ${i}`, at: '10:00' }));

  it('CC toggles the inline strip and never mounts a dialog at footer size', () => {
    const onToggle = vi.fn();
    const { rerender } = render(<VoiceDock {...dockBase} phase="listening" size="footer" turns={turns} onToggleTranscript={onToggle} transcriptOpen={false} />);
    expect(screen.queryByTestId('voice-dock-strip')).toBeNull();
    fireEvent.click(screen.getByTestId('voice-dock-cc'));
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('voice-dock-cc')).toHaveAttribute('aria-pressed', 'false');
    rerender(<VoiceDock {...dockBase} phase="listening" size="footer" turns={turns} onToggleTranscript={onToggle} transcriptOpen />);
    const dock = screen.getByTestId('voice-dock');
    expect(screen.getByTestId('voice-dock-strip')).toBeInTheDocument();
    expect(screen.getByTestId('voice-dock-cc')).toHaveAttribute('aria-pressed', 'true');
    expect(dock.firstElementChild).toBe(screen.getByTestId('voice-dock-transcript'));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(dock.querySelector('[data-popover], [role="dialog"]')).toBeNull();
  });

  it('shows the history control only with onOpenLog', () => {
    const onOpenLog = vi.fn();
    const { rerender } = render(<VoiceDock {...dockBase} phase="off" size="footer" />);
    expect(screen.queryByTestId('voice-dock-history')).toBeNull();
    rerender(<VoiceDock {...dockBase} phase="off" size="footer" onOpenLog={onOpenLog} />);
    fireEvent.click(screen.getByTestId('voice-dock-history'));
    expect(onOpenLog).toHaveBeenCalledTimes(1);
  });

  it('pulses the control once per flip to true', () => {
    vi.useFakeTimers();
    try {
      const { rerender } = render(<VoiceDock {...dockBase} phase="off" size="footer" pulse={false} />);
      const cls = () => screen.getByTestId('voice-dock-start').getAttribute('class') ?? '';
      expect(cls()).not.toContain('animate-');
      rerender(<VoiceDock {...dockBase} phase="off" size="footer" pulse />);
      expect(cls()).toContain('motion-safe:animate-[pulse_600ms_ease-out_1]');
      act(() => { vi.advanceTimersByTime(600); });
      expect(cls()).not.toContain('animate-');
      rerender(<VoiceDock {...dockBase} phase="off" size="footer" pulse />);
      expect(cls()).not.toContain('animate-');
      rerender(<VoiceDock {...dockBase} phase="off" size="footer" pulse={false} />);
      rerender(<VoiceDock {...dockBase} phase="off" size="footer" pulse />);
      expect(cls()).toContain('motion-safe:animate-[pulse_600ms_ease-out_1]');
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('VoiceTurnStrip size and keep switch (2.510.6)', () => {
  const turns = Array.from({ length: 5 }, (_, i) => ({ id: `t${i}`, role: 'you' as const, text: `turn ${i}`, at: '10:00' }));

  it('footer rows are 28px at xs, all turns kept, list capped at three rows', () => {
    render(<VoiceTurnStrip size="footer" turns={turns} />);
    for (const t of turns) {
      const row = screen.getByTestId(`voice-turn-strip-turn-${t.id}`);
      expect(row.getAttribute('class')).toContain('h-7');
    }
    const list = screen.getByTestId('voice-turn-strip-list').getAttribute('class') ?? '';
    expect(list).toContain('max-h-21');
    expect(list).toContain('overflow-y-auto');
    expect(screen.getByText('turn 0').getAttribute('class')).toContain('text-xs');
  });

  it('panel size is unchanged and still slices to maxVisible', () => {
    render(<VoiceTurnStrip turns={turns} maxVisible={2} />);
    expect(screen.queryByTestId('voice-turn-strip-turn-t0')).toBeNull();
    expect(screen.getByTestId('voice-turn-strip-turn-t4')).toBeInTheDocument();
    expect(screen.queryByTestId('voice-turn-strip-keep')).toBeNull();
  });

  it('the keep switch is labelled and calls back; History calls onOpenLog', () => {
    const onKeep = vi.fn();
    const onOpenLog = vi.fn();
    render(<VoiceTurnStrip size="footer" turns={turns} keepTranscript={false} onKeepTranscriptChange={onKeep} onOpenLog={onOpenLog} />);
    const sw = screen.getByRole('switch', { name: 'Keep transcripts on this device' });
    expect(sw).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(sw);
    expect(onKeep).toHaveBeenCalledWith(true);
    fireEvent.click(screen.getByTestId('voice-turn-strip-log'));
    expect(onOpenLog).toHaveBeenCalledTimes(1);
  });
});

describe('VoiceConfirmCard hint', () => {
  const base = { title: 'Do it?', onConfirm: vi.fn(), onCancel: vi.fn() };
  it('renders a muted line described by the confirm button', () => {
    render(<VoiceConfirmCard pending={{ ...base, hint: 'Say yes to confirm' }} />);
    const hint = screen.getByTestId('voice-confirm-card-hint');
    expect(hint).toHaveTextContent('Say yes to confirm');
    expect(screen.getByTestId('voice-confirm-card-confirm')).toHaveAttribute('aria-describedby', hint.id);
  });
  it('the hint prop overrides pending.hint', () => {
    render(<VoiceConfirmCard pending={{ ...base, hint: 'a' }} hint="b" />);
    expect(screen.getByTestId('voice-confirm-card-hint')).toHaveTextContent('b');
  });
  it('renders nothing without a hint', () => {
    render(<VoiceConfirmCard pending={base} />);
    expect(screen.queryByTestId('voice-confirm-card-hint')).toBeNull();
    expect(screen.getByTestId('voice-confirm-card-confirm')).not.toHaveAttribute('aria-describedby');
  });
});

describe('VoiceConfirmCard pre-filled note, labels and click-only (2.516.0)', () => {
  const base = { title: 'Answer the agent', onConfirm: vi.fn(), onCancel: vi.fn() };

  it('noteDefault opens the note filled in; editing then confirming returns the edited text', () => {
    const onConfirm = vi.fn();
    render(<VoiceConfirmCard pending={{ ...base, onConfirm, noteDefault: 'Ship it on Friday' }} />);
    const input = screen.getByTestId('voice-confirm-card-note');
    expect(input).toHaveValue('Ship it on Friday');
    fireEvent.change(input, { target: { value: '  Ship it on Monday  ' } });
    fireEvent.click(screen.getByTestId('voice-confirm-card-confirm'));
    expect(onConfirm).toHaveBeenCalledWith({ decision: 'approve', note: 'Ship it on Monday' });
  });

  it('noteLabel is a visible label that names the field', () => {
    render(<VoiceConfirmCard pending={{ ...base, noteDefault: '', noteLabel: 'Your answer' }} />);
    const label = screen.getByTestId('voice-confirm-card-note-label');
    expect(label).toHaveTextContent('Your answer');
    expect(screen.getByRole('textbox', { name: 'Your answer' })).toBe(screen.getByTestId('voice-confirm-card-note'));
  });

  it('noteMaxLength caps the field and the result, with a visible count', () => {
    const onConfirm = vi.fn();
    render(<VoiceConfirmCard pending={{ ...base, onConfirm, noteDefault: 'abc', noteMaxLength: 500 }} />);
    const input = screen.getByTestId('voice-confirm-card-note');
    expect(input).toHaveAttribute('maxLength', '500');
    expect(screen.getByTestId('voice-confirm-card-note-count')).toHaveTextContent('3/500');
    fireEvent.change(input, { target: { value: 'z'.repeat(600) } });
    expect(screen.getByTestId('voice-confirm-card-note-count')).toHaveTextContent('600/500');
    fireEvent.click(screen.getByTestId('voice-confirm-card-confirm'));
    expect(onConfirm).toHaveBeenCalledWith({ decision: 'approve', note: 'z'.repeat(500) });
  });

  it('without noteMaxLength there is no count and the cap stays at 200', () => {
    render(<VoiceConfirmCard pending={{ ...base, noteDefault: 'abc' }} />);
    expect(screen.queryByTestId('voice-confirm-card-note-count')).toBeNull();
    expect(screen.getByTestId('voice-confirm-card-note')).toHaveAttribute('maxLength', '200');
  });

  it('confirmLabel and cancelLabel rename the buttons; the defaults stay Confirm and Cancel', () => {
    const { rerender } = render(<VoiceConfirmCard pending={base} />);
    expect(screen.getByTestId('voice-confirm-card-confirm')).toHaveTextContent('Confirm');
    expect(screen.getByTestId('voice-confirm-card-cancel')).toHaveTextContent('Cancel');
    rerender(<VoiceConfirmCard pending={{ ...base, confirmLabel: 'Send', cancelLabel: 'Not now' }} />);
    expect(screen.getByRole('button', { name: 'Send' })).toBe(screen.getByTestId('voice-confirm-card-confirm'));
    expect(screen.getByTestId('voice-confirm-card-cancel')).toHaveTextContent('Not now');
  });

  it('the card props override the pending fields', () => {
    render(<VoiceConfirmCard pending={{ ...base, confirmLabel: 'Send' }} confirmLabel="Queue" />);
    expect(screen.getByTestId('voice-confirm-card-confirm')).toHaveTextContent('Queue');
  });

  it('hideDecisionToggle drops the toggle but keeps the note and the starting decision', () => {
    const onConfirm = vi.fn();
    render(<VoiceConfirmCard pending={{ ...base, onConfirm, fields: { decision: 'reject' }, hideDecisionToggle: true }} />);
    expect(screen.queryByTestId('voice-confirm-card-decision')).toBeNull();
    expect(screen.queryByRole('radio')).toBeNull();
    fireEvent.change(screen.getByTestId('voice-confirm-card-note'), { target: { value: 'why' } });
    fireEvent.click(screen.getByTestId('voice-confirm-card-confirm'));
    expect(onConfirm).toHaveBeenCalledWith({ decision: 'reject', note: 'why' });
  });

  it('clickOnly hints "Check it, then click <confirmLabel>" and sets data-click-only', () => {
    const { rerender } = render(<VoiceConfirmCard pending={{ ...base, clickOnly: true, confirmLabel: 'Send' }} />);
    expect(screen.getByTestId('voice-confirm-card')).toHaveAttribute('data-click-only');
    expect(screen.getByTestId('voice-confirm-card-hint')).toHaveTextContent('Check it, then click Send');
    rerender(<VoiceConfirmCard pending={{ ...base, clickOnly: true }} />);
    expect(screen.getByTestId('voice-confirm-card-hint')).toHaveTextContent('Check it, then click Confirm');
    rerender(<VoiceConfirmCard pending={{ ...base, clickOnly: true, hint: 'Click to send' }} />);
    expect(screen.getByTestId('voice-confirm-card-hint')).toHaveTextContent('Click to send');
    rerender(<VoiceConfirmCard pending={base} />);
    expect(screen.getByTestId('voice-confirm-card')).not.toHaveAttribute('data-click-only');
  });

  it('a new requestId resets the edited note to the new noteDefault', () => {
    const onConfirm = vi.fn();
    const { rerender } = render(<VoiceConfirmCard pending={{ ...base, onConfirm, requestId: 'q1', noteDefault: 'first answer' }} />);
    fireEvent.change(screen.getByTestId('voice-confirm-card-note'), { target: { value: 'first answer, edited' } });
    rerender(<VoiceConfirmCard pending={{ ...base, onConfirm, requestId: 'q2', noteDefault: 'second answer' }} />);
    expect(screen.getByTestId('voice-confirm-card-note')).toHaveValue('second answer');
    fireEvent.click(screen.getByTestId('voice-confirm-card-confirm'));
    expect(onConfirm).toHaveBeenCalledWith({ decision: 'approve', note: 'second answer' });
  });

  it('the dock passes the new fields through to its card', () => {
    const onConfirm = vi.fn();
    render(
      <VoiceDock
        {...dockBase}
        phase="confirming"
        pending={{ ...base, onConfirm, noteDefault: 'dictated', confirmLabel: 'Send', hideDecisionToggle: true, clickOnly: true }}
      />,
    );
    expect(screen.getByTestId('voice-confirm-card')).toHaveAttribute('data-click-only');
    expect(screen.getByTestId('voice-confirm-card-note')).toHaveValue('dictated');
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onConfirm).toHaveBeenCalledWith({ decision: 'approve', note: 'dictated' });
  });
});
