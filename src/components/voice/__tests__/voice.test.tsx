import { render, screen, fireEvent } from '@testing-library/react';
import { VoiceDock } from '../VoiceDock';
import { VoiceActivityRing } from '../VoiceActivityRing';
import { VoiceTurnStrip } from '../VoiceTurnStrip';
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
