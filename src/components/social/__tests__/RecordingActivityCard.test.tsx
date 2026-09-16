import { render, screen, cleanup, fireEvent, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RecordingActivityCard, describeRecordingParticipants } from '../RecordingActivityCard';
import { ChatPanel, recordingRefFromMetadata } from '../ChatPanel';

afterEach(cleanup);

const people = [
  { id: 'mia', name: 'Mia Zhao', avatarUrl: 'http://x/mia.png' },
  { id: 'eve', name: 'Eve Thompson' },
  { id: 'bob', name: 'Bob Martinez' },
];

describe('RecordingActivityCard', () => {
  it('shows the length, who it is by, the people, and plays on the picture', () => {
    const onOpen = vi.fn();
    render(<RecordingActivityCard recordingId="r1" recordedBy="Mia Zhao" participants={people} durationMs={32_000} thumbnailUrl="http://x/t.jpg" onOpen={onOpen} />);
    expect(screen.getByTestId('recording-activity-card-duration').textContent).toBe('32s');
    expect(screen.getByTestId('recording-activity-card-by').textContent).toBe('by Mia Zhao');
    expect(screen.getByTestId('recording-activity-card-thumbnail')).toBeTruthy();
    expect(screen.getByTestId('recording-activity-card-people').textContent).toContain('Mia Zhao and 2 others');
    fireEvent.click(screen.getByTestId('recording-activity-card-thumb'));
    expect(onOpen).toHaveBeenCalledWith('r1');
  });

  it('stands the participants in as tiles until there is a thumbnail', () => {
    render(<RecordingActivityCard recordingId="r1" participants={people} participantCount={6} stage="saving" />);
    expect(screen.queryByTestId('recording-activity-card-thumbnail')).toBeNull();
    expect(screen.getAllByTestId('recording-activity-card-tile')).toHaveLength(3);
    expect(screen.getByTestId('recording-activity-card-tile-more').textContent).toBe('+3');
  });

  it('does not play while saving, and says where the pipeline is', () => {
    const onOpen = vi.fn();
    render(<RecordingActivityCard recordingId="r1" stage="saving" onOpen={onOpen} />);
    fireEvent.click(screen.getByTestId('recording-activity-card-thumb'));
    expect(onOpen).not.toHaveBeenCalled();
    expect(screen.getByTestId('recording-activity-card-stage').textContent).toMatch(/Saving/);
  });

  it('says the transcript and summary exist once ready', () => {
    render(<RecordingActivityCard recordingId="r1" stage="ready" transcriptReady summaryReady />);
    expect(screen.getByTestId('recording-activity-card-transcript')).toBeTruthy();
    expect(screen.getByTestId('recording-activity-card-summary')).toBeTruthy();
  });

  it('carries the expiry with a way to change it, and the pin', () => {
    const onManageExpiry = vi.fn();
    render(<RecordingActivityCard recordingId="r1" expiresAt="2030-01-02T00:00:00Z" pinned onManageExpiry={onManageExpiry} />);
    expect(screen.getByTestId('recording-activity-card-expiry').textContent).toMatch(/Set to expire/);
    fireEvent.click(screen.getByTestId('recording-activity-card-manage-expiry'));
    expect(onManageExpiry).toHaveBeenCalledWith('r1');
    expect(screen.getByTestId('recording-activity-card-pinned')).toBeTruthy();
  });

  it('offers share, pin, transcript and download in the menu', () => {
    render(
      <RecordingActivityCard recordingId="r1" stage="ready" transcriptReady onOpen={vi.fn()} onShare={vi.fn()} onTogglePin={vi.fn()} onDownload={vi.fn()} onOpenTranscript={vi.fn()} onCopyLink={vi.fn()} />,
    );
    fireEvent.click(screen.getByLabelText('More options'));
    const menu = within(screen.getByTestId('recording-activity-card-menu-items'));
    for (const label of ['Open', 'Transcript', 'Copy link', 'Share…', 'Pin', 'Download']) {
      expect(menu.getByText(label)).toBeTruthy();
    }
  });
});

describe('describeRecordingParticipants', () => {
  it('names the first and counts the rest', () => {
    expect(describeRecordingParticipants(people, 3)).toBe('Mia Zhao and 2 others');
    expect(describeRecordingParticipants(people.slice(0, 1), 1)).toBe('Mia Zhao');
    expect(describeRecordingParticipants([], 4)).toBe('4 people');
  });
});

describe('recordingRefFromMetadata', () => {
  it('reads a recording card, its people and stage, and ignores anything else', () => {
    expect(recordingRefFromMetadata({ kind: 'call', callId: 'c' })).toBeNull();
    expect(recordingRefFromMetadata({ kind: 'recording' })).toBeNull();
    const ref = recordingRefFromMetadata({ kind: 'recording', recordingId: 'r1', durationMs: 5000, stage: 'saving', participants: [{ userId: 'mia', displayName: 'Mia Zhao' }, { userId: 'eve' }] });
    expect(ref).toMatchObject({ recordingId: 'r1', durationMs: 5000, stage: 'saving' });
    expect(ref?.participants).toEqual([{ id: 'mia', name: 'Mia Zhao' }, { id: 'eve', name: 'eve' }]);
    expect(recordingRefFromMetadata({ kind: 'recording', recordingId: 'r2', status: 'processing' })?.stage).toBe('saving');
  });
});

describe('ChatPanel recording card', () => {
  it('overlays the live status the host reports', () => {
    const msg = { id: 'm1', clientId: 'c', displayName: 'Pipeline', content: 'Recording', timestamp: new Date().toISOString(), metadata: { kind: 'recording', recordingId: 'r1', stage: 'saving' } };
    render(
      <ChatPanel
        messages={[msg as never]}
        onSend={vi.fn()}
        onOpenRecording={vi.fn()}
        recordingStatus={(id) => (id === 'r1' ? { stage: 'ready', thumbnailUrl: 'http://x/t.jpg', transcriptReady: true } : undefined)}
      />,
    );
    const card = screen.getByTestId('recording-activity-card');
    expect(card.getAttribute('data-stage')).toBe('ready');
    expect(screen.getByTestId('recording-activity-card-thumbnail')).toBeTruthy();
    expect(screen.getByTestId('recording-activity-card-transcript')).toBeTruthy();
  });
});

describe('RecordingActivityCard gone', () => {
  it('is a record, not a button, with no expiry and no share', () => {
    const onOpen = vi.fn();
    render(<RecordingActivityCard recordingId="r1" stage="gone" expiresAt="2030-01-01T00:00:00Z" onOpen={onOpen} onShare={vi.fn()} onCopyLink={vi.fn()} />);
    fireEvent.click(screen.getByTestId('recording-activity-card-thumb'));
    expect(onOpen).not.toHaveBeenCalled();
    expect(screen.getByTestId('recording-activity-card-stage').textContent).toMatch(/No longer available/);
    expect(screen.queryByTestId('recording-activity-card-expiry')).toBeNull();
    expect(screen.queryByLabelText('More options')).toBeNull();
  });
});
