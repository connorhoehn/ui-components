import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RecordingActivityCard } from '../RecordingActivityCard';
import { recordingRefFromMetadata } from '../ChatPanel';

afterEach(cleanup);

describe('RecordingActivityCard', () => {
  it('shows the length on the picture, who it is by, and plays on the picture', () => {
    const onOpen = vi.fn();
    render(<RecordingActivityCard recordingId="r1" recordedBy="Mia Zhao" durationMs={32_000} onOpen={onOpen} />);
    expect(screen.getByTestId('recording-activity-card-duration').textContent).toBe('32s');
    expect(screen.getByTestId('recording-activity-card-by').textContent).toBe('Mia Zhao');
    fireEvent.click(screen.getByTestId('recording-activity-card-thumb'));
    expect(onOpen).toHaveBeenCalledWith('r1');
  });

  it('does not play while processing, and says so', () => {
    const onOpen = vi.fn();
    render(<RecordingActivityCard recordingId="r1" status="processing" onOpen={onOpen} />);
    fireEvent.click(screen.getByTestId('recording-activity-card-thumb'));
    expect(onOpen).not.toHaveBeenCalled();
    expect(screen.getByTestId('recording-activity-card-notice').textContent).toMatch(/processing/i);
  });

  it('warns about an expiry', () => {
    render(<RecordingActivityCard recordingId="r1" expiresAt="2030-01-02T00:00:00Z" />);
    expect(screen.getByTestId('recording-activity-card-notice').textContent).toMatch(/expires on/);
  });
});

describe('recordingRefFromMetadata', () => {
  it('reads a recording card and ignores anything else', () => {
    expect(recordingRefFromMetadata({ kind: 'call', callId: 'c' })).toBeNull();
    expect(recordingRefFromMetadata({ kind: 'recording' })).toBeNull();
    const ref = recordingRefFromMetadata({ kind: 'recording', recordingId: 'r1', durationMs: 5000, status: 'ready', thumbnailUrl: 'http://x/t.jpg', participantCount: 2 });
    expect(ref).toMatchObject({ recordingId: 'r1', durationMs: 5000, status: 'ready', thumbnailUrl: 'http://x/t.jpg', participantCount: 2 });
  });
});
