// VoiceDock `density="compact"` (2.519.0): a phone-width footer's dock. Idle,
// the phase text is visually hidden (still the live region) and the ring goes;
// captions and history live in one overflow menu. Live and card states still
// show their phase text.
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { VoiceDock } from '../VoiceDock';

afterEach(cleanup);
const base = { level: 0, outputLevel: 0, onStart: vi.fn(), onStop: vi.fn(), size: 'footer' as const };

describe('VoiceDock density="compact"', () => {
  it('idle: the phase text is sr-only but still the status region; no ring; no CC or history buttons in the row', () => {
    render(<VoiceDock {...base} phase="off" density="compact" onToggleTranscript={vi.fn()} onOpenLog={vi.fn()} />);
    expect(screen.getByTestId('voice-dock')).toHaveAttribute('data-density', 'compact');
    const phase = screen.getByTestId('voice-dock-phase');
    expect(phase).toHaveClass('sr-only');
    expect(phase).toHaveAttribute('role', 'status');
    expect(screen.queryByTestId('voice-dock-ring')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Show transcript' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Open voice history' })).toBeNull();
    expect(screen.getByRole('button', { name: 'More voice controls' })).toBeInTheDocument();
    expect(screen.getByTestId('voice-dock-start')).toBeInTheDocument();
  });

  it('the overflow menu carries the captions toggle and history', () => {
    const onToggleTranscript = vi.fn();
    const onOpenLog = vi.fn();
    render(<VoiceDock {...base} phase="listening" density="compact" onToggleTranscript={onToggleTranscript} onOpenLog={onOpenLog} />);
    fireEvent.click(screen.getByRole('button', { name: 'More voice controls' }));
    fireEvent.click(screen.getByText('Show transcript'));
    expect(onToggleTranscript).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'More voice controls' }));
    fireEvent.click(screen.getByText('Open voice history'));
    expect(onOpenLog).toHaveBeenCalledTimes(1);
  });

  it('live and confirm states still show the phase text and the ring', () => {
    const { rerender } = render(<VoiceDock {...base} phase="listening" density="compact" />);
    expect(screen.getByTestId('voice-dock-phase')).not.toHaveClass('sr-only');
    expect(screen.getByTestId('voice-dock-ring')).toBeInTheDocument();
    rerender(<VoiceDock {...base} phase="off" density="compact" pending={{ title: 'Archive?', onConfirm: vi.fn(), onCancel: vi.fn() }} />);
    expect(screen.getByTestId('voice-dock-phase')).not.toHaveClass('sr-only');
  });

  it('no overflow without CC or history; default density is unchanged', () => {
    const { rerender } = render(<VoiceDock {...base} phase="off" density="compact" />);
    expect(screen.queryByRole('button', { name: 'More voice controls' })).toBeNull();
    rerender(<VoiceDock {...base} phase="off" onToggleTranscript={vi.fn()} onOpenLog={vi.fn()} />);
    expect(screen.getByTestId('voice-dock')).toHaveAttribute('data-density', 'default');
    expect(screen.getByTestId('voice-dock-phase')).not.toHaveClass('sr-only');
    expect(screen.getByTestId('voice-dock-cc')).toBeInTheDocument();
    expect(screen.getByTestId('voice-dock-history')).toBeInTheDocument();
  });
});
