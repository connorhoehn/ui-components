import { render, screen, fireEvent, cleanup, waitFor, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { VoicemailRecorder } from '../VoicemailRecorder';
import { AuthedAudio } from '../AuthedAudio';

// jsdom has no MediaRecorder; this one records whatever it is told to.
class FakeRecorder {
  static instances: FakeRecorder[] = [];
  static isTypeSupported = (t: string) => t.startsWith('audio/webm');
  state: 'inactive' | 'recording' = 'inactive';
  mimeType: string;
  ondataavailable: ((e: { data: Blob }) => void) | null = null;
  onstop: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(_s: unknown, opts?: { mimeType?: string }) { this.mimeType = opts?.mimeType ?? ''; FakeRecorder.instances.push(this); }
  start() { this.state = 'recording'; }
  stop() {
    this.state = 'inactive';
    this.ondataavailable?.({ data: new Blob(['abc'], { type: 'audio/webm' }) });
    this.onstop?.();
  }
}

const stopTrack = vi.fn();
const getStream = vi.fn(async () => ({ getTracks: () => [{ stop: stopTrack }] }) as unknown as MediaStream);

beforeEach(() => {
  FakeRecorder.instances = [];
  vi.stubGlobal('MediaRecorder', FakeRecorder);
  URL.createObjectURL = vi.fn(() => 'blob:preview');
  URL.revokeObjectURL = vi.fn();
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('VoicemailRecorder', () => {
  it('records on open, stops, previews, and sends the blob with its duration', async () => {
    const onSend = vi.fn(async () => undefined);
    const onClose = vi.fn();
    render(<VoicemailRecorder open onClose={onClose} recipientName="Alice" getStream={getStream} onSend={onSend} />);
    await waitFor(() => expect(screen.getByTestId('voicemail-recorder').dataset.state).toBe('recording'));
    expect(getStream).toHaveBeenCalledTimes(1);
    expect(FakeRecorder.instances[0]!.mimeType).toBe('audio/webm;codecs=opus');

    fireEvent.click(screen.getByTestId('voicemail-recorder-stop'));
    await waitFor(() => expect(screen.getByTestId('voicemail-recorder').dataset.state).toBe('recorded'));
    // The microphone is released the moment recording stops, not on close.
    expect(stopTrack).toHaveBeenCalled();
    expect((screen.getByTestId('voicemail-recorder-preview-element') as HTMLAudioElement).src).toContain('blob:preview');
    // The library player, not the browser's: no native controls anywhere.
    expect(screen.getByTestId('voicemail-recorder-preview-element').hasAttribute('controls')).toBe(false);

    fireEvent.click(screen.getByTestId('voicemail-recorder-send'));
    await waitFor(() => expect(onSend).toHaveBeenCalledTimes(1));
    const [blob, durationMs, mime] = onSend.mock.calls[0] as unknown as [Blob, number, string];
    expect(blob.size).toBe(3);
    expect(durationMs).toBeGreaterThanOrEqual(0);
    expect(mime).toBe('audio/webm;codecs=opus');
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('keeps the dialog open with the error when sending fails, and can re-record', async () => {
    const onSend = vi.fn(async () => { throw new Error('too large'); });
    render(<VoicemailRecorder open onClose={() => {}} recipientName="Alice" getStream={getStream} onSend={onSend} />);
    await waitFor(() => expect(screen.getByTestId('voicemail-recorder').dataset.state).toBe('recording'));
    fireEvent.click(screen.getByTestId('voicemail-recorder-stop'));
    await waitFor(() => screen.getByTestId('voicemail-recorder-send'));
    fireEvent.click(screen.getByTestId('voicemail-recorder-send'));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('too large'));
    fireEvent.click(screen.getByTestId('voicemail-recorder-rerecord'));
    await waitFor(() => expect(screen.getByTestId('voicemail-recorder').dataset.state).toBe('recording'));
    expect(FakeRecorder.instances).toHaveLength(2);
  });

  it('says so when the microphone is blocked', async () => {
    const denied = vi.fn(async () => { const e = new Error('nope'); e.name = 'NotAllowedError'; throw e; });
    render(<VoicemailRecorder open onClose={() => {}} recipientName="Alice" getStream={denied} onSend={vi.fn()} />);
    await waitFor(() => expect(screen.getByTestId('voicemail-recorder-status')).toHaveTextContent('Microphone access was blocked.'));
    expect(screen.getByTestId('voicemail-recorder-rerecord')).toHaveTextContent('Try again');
  });
});

describe('AuthedAudio', () => {
  it('fetches with the bearer only when asked, then plays from an object URL', async () => {
    const fetchMock = vi.fn(async () => new Response(new Blob(['x'], { type: 'audio/webm' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const onFirstPlay = vi.fn();
    render(<AuthedAudio src="/api/vm/1/audio" getAuthToken={() => 'tok'} onFirstPlay={onFirstPlay} />);
    expect(fetchMock).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('authed-audio-load'));
    await waitFor(() => expect(screen.getByTestId('authed-audio-element')).toBeTruthy());
    expect((fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].headers).toEqual({ Authorization: 'Bearer tok' });
    expect((screen.getByTestId('authed-audio-element') as HTMLAudioElement).src).toContain('blob:preview');
    await act(async () => { fireEvent.play(screen.getByTestId('authed-audio-element')); fireEvent.play(screen.getByTestId('authed-audio-element')); });
    expect(onFirstPlay).toHaveBeenCalledTimes(1);
  });
});
