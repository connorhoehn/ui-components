import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { VideoSession } from '../../../hooks/useVideoSessions';
import VideoHistoryPanel from '../VideoHistoryPanel';

const NOW = new Date('2026-06-07T12:00:00Z');

function isoMinutesAgo(mins: number): string {
  return new Date(NOW.getTime() - mins * 60_000).toISOString();
}

function mk(overrides: Partial<VideoSession> = {}): VideoSession {
  return {
    documentId: 'doc-1',
    sessionId: 's1',
    vnlSessionId: 'vnl-1',
    status: 'ended',
    startedAt: isoMinutesAgo(10),
    endedAt: isoMinutesAgo(5),
    startedBy: 'u1',
    participants: [{ userId: 'u1', displayName: 'Alice', joinedAt: isoMinutesAgo(10) }],
    ...overrides,
  };
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('VideoHistoryPanel', () => {
  it('calls onFetch exactly once on mount', () => {
    const onFetch = vi.fn();
    render(<VideoHistoryPanel sessions={[]} loading={false} onFetch={onFetch} onClose={vi.fn()} />);
    expect(onFetch).toHaveBeenCalledTimes(1);
  });

  it('renders "Loading..." when loading=true', () => {
    render(<VideoHistoryPanel sessions={[]} loading={true} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText(/No video conversations yet/)).not.toBeInTheDocument();
  });

  it('renders the empty state when not loading and sessions=[]', () => {
    render(<VideoHistoryPanel sessions={[]} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('No video conversations yet for this document.')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders the "Live" pill on active sessions and not on ended sessions', () => {
    const sessions = [mk({ sessionId: 'A', status: 'active', endedAt: undefined }), mk({ sessionId: 'B', status: 'ended' })];
    render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    const live = screen.getAllByText('Live');
    expect(live).toHaveLength(1);
  });

  it('renders active sessions before ended sessions in DOM order', () => {
    const sessions = [
      mk({ sessionId: 'ended-1', status: 'ended' }),
      mk({ sessionId: 'active-1', status: 'active', endedAt: undefined, participants: [{ userId: 'u1', displayName: 'ActiveAlice', joinedAt: isoMinutesAgo(2) }] }),
      mk({ sessionId: 'ended-2', status: 'ended', participants: [{ userId: 'u2', displayName: 'EndedBob', joinedAt: isoMinutesAgo(20) }] }),
    ];
    render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    const html = document.body.innerHTML;
    expect(html.indexOf('ActiveAlice')).toBeLessThan(html.indexOf('Alice'));
    expect(html.indexOf('Alice')).toBeLessThan(html.indexOf('EndedBob'));
  });

  it('formats duration as "<1m" when below a minute', () => {
    const sessions = [mk({ startedAt: NOW.toISOString(), endedAt: new Date(NOW.getTime() + 30_000).toISOString() })];
    render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('<1m')).toBeInTheDocument();
  });

  it('formats duration as "Nm" for under-an-hour calls', () => {
    const sessions = [mk({ startedAt: isoMinutesAgo(10), endedAt: isoMinutesAgo(8) })];
    render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('2m')).toBeInTheDocument();
  });

  it('formats duration as "Nh Mm" for hour-plus calls', () => {
    const sessions = [mk({ startedAt: isoMinutesAgo(90), endedAt: isoMinutesAgo(0) })];
    render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('1h 30m')).toBeInTheDocument();
  });

  it('uses Date.now() for active sessions with no endedAt', () => {
    const sessions = [mk({ status: 'active', startedAt: isoMinutesAgo(15), endedAt: undefined })];
    render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('15m')).toBeInTheDocument();
  });

  it('relativeTime "just now" under a minute', () => {
    const sessions = [mk({ startedAt: new Date(NOW.getTime() - 30_000).toISOString() })];
    render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('just now')).toBeInTheDocument();
  });

  it('relativeTime "Nm ago" / "Nh ago" / "Nd ago" thresholds', () => {
    const sessions = [
      mk({ sessionId: 'm', startedAt: isoMinutesAgo(5), endedAt: isoMinutesAgo(4) }),
      mk({ sessionId: 'h', startedAt: isoMinutesAgo(120), endedAt: isoMinutesAgo(119) }),
      mk({ sessionId: 'd', startedAt: isoMinutesAgo(60 * 24 * 3), endedAt: isoMinutesAgo(60 * 24 * 3 - 1) }),
    ];
    render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('5m ago')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
    expect(screen.getByText('3d ago')).toBeInTheDocument();
  });

  it('participant chip falls back to userId.slice(0,10) when displayName is empty', () => {
    const sessions = [mk({ participants: [{ userId: 'abcdefghij1234567890', displayName: '', joinedAt: isoMinutesAgo(10) }] })];
    render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('abcdefghij')).toBeInTheDocument();
  });

  it('renders the aiSummary block when set', () => {
    const sessions = [mk({ aiSummary: 'Discussed retro priorities and next sprint goals.' })];
    render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('Discussed retro priorities and next sprint goals.')).toBeInTheDocument();
  });

  it('does not render the aiSummary block when absent', () => {
    const sessions = [mk({ aiSummary: undefined })];
    const { container } = render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(container.textContent).not.toMatch(/Discussed/);
  });

  it('renders the transcript status line for pending/processing/failed but not for available', () => {
    const sessions = [
      mk({ sessionId: 'p', transcriptStatus: 'pending', participants: [{ userId: 'pX', displayName: 'PendingUser', joinedAt: isoMinutesAgo(10) }] }),
      mk({ sessionId: 'a', transcriptStatus: 'available', participants: [{ userId: 'aX', displayName: 'AvailableUser', joinedAt: isoMinutesAgo(10) }] }),
      mk({ sessionId: 'n', transcriptStatus: undefined, participants: [{ userId: 'nX', displayName: 'NoStatusUser', joinedAt: isoMinutesAgo(10) }] }),
    ];
    render(<VideoHistoryPanel sessions={sessions} loading={false} onFetch={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText('Transcript: pending')).toBeInTheDocument();
    expect(screen.queryByText('Transcript: available')).not.toBeInTheDocument();
  });

  it('clicking the close button invokes onClose', () => {
    const onClose = vi.fn();
    render(<VideoHistoryPanel sessions={[]} loading={false} onFetch={vi.fn()} onClose={onClose} />);
    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
