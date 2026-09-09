// VoicemailRecorder — the dialog a caller gets when nobody picked up.
//
// It records the moment it opens (the person already chose to leave a message;
// a second "start" click is a beat of dead air), shows the clock against the
// ceiling, lets them listen back and re-record, and sends. What "send" means —
// where the bytes go — is the host's (`onSend`); this component never sees an
// endpoint.

import { useEffect, useRef, useState } from 'react';
import Modal from '../shared/Modal';
import { Button } from '../ui/Button';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';

export interface VoicemailRecorderProps {
  open: boolean;
  onClose: () => void;
  /** Who the message is for — the title. */
  recipientName: string;
  /** Microphone access, with whatever device preference the host applies. */
  getStream: () => Promise<MediaStream>;
  /** Deliver the message. Reject to keep the dialog open with the error shown. */
  onSend: (blob: Blob, durationMs: number, mimeType: string) => Promise<void>;
  maxSeconds?: number;
  'data-testid'?: string;
}

function clock(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function VoicemailRecorder({ open, onClose, recipientName, getStream, onSend, maxSeconds = 60, 'data-testid': testId = 'voicemail-recorder' }: VoicemailRecorderProps) {
  const rec = useAudioRecorder({ getStream, maxMs: maxSeconds * 1000 });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // Record on open; put everything back on close.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open && !wasOpen.current) { setSendError(null); setSending(false); void rec.start(); }
    if (!open && wasOpen.current) rec.reset();
    wasOpen.current = open;
    // `rec` changes identity every render; start/reset are stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const send = async () => {
    if (!rec.blob) return;
    setSending(true); setSendError(null);
    try { await onSend(rec.blob, rec.elapsedMs, rec.mimeType ?? (rec.blob.type || 'audio/webm')); onClose(); }
    catch (err) { setSendError(err instanceof Error ? err.message : 'Could not send the voicemail.'); }
    finally { setSending(false); }
  };

  const status =
    rec.state === 'starting' ? 'Opening the microphone…'
    : rec.state === 'recording' ? 'Recording — speak now'
    : rec.state === 'recorded' ? 'Listen back, then send'
    : rec.state === 'error' ? rec.error ?? 'Something went wrong'
    : 'Ready';

  return (
    <Modal open={open} onClose={onClose} title={`Leave a voicemail for ${recipientName}`} maxWidth={440}
      footer={
        <div className="flex w-full items-center justify-end gap-2" data-testid={`${testId}-actions`}>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={sending} data-testid={`${testId}-cancel`}>Cancel</Button>
          {rec.state === 'recording' && (
            <Button variant="primary" size="sm" onClick={rec.stop} data-testid={`${testId}-stop`}>Stop</Button>
          )}
          {(rec.state === 'recorded' || rec.state === 'error') && (
            <Button variant="secondary" size="sm" onClick={() => void rec.start()} disabled={sending} data-testid={`${testId}-rerecord`}>
              {rec.state === 'error' ? 'Try again' : 'Re-record'}
            </Button>
          )}
          {rec.state === 'recorded' && (
            <Button variant="primary" size="sm" onClick={() => void send()} disabled={sending || !rec.blob} data-testid={`${testId}-send`}>
              {sending ? 'Sending…' : 'Send voicemail'}
            </Button>
          )}
        </div>
      }
    >
      <div className="flex flex-col items-center gap-3 py-2" data-testid={testId} data-state={rec.state}>
        <div className="flex items-center gap-2 text-sm text-text-secondary" role="status" data-testid={`${testId}-status`}>
          {rec.state === 'recording' && <span aria-hidden="true" className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-danger" />}
          {status}
        </div>
        <div className="font-mono text-3xl tabular-nums text-text-primary" data-testid={`${testId}-clock`}>
          {clock(rec.elapsedMs)}<span className="text-base text-text-tertiary"> / {clock(maxSeconds * 1000)}</span>
        </div>
        {rec.state === 'recorded' && rec.url && (
          // eslint-disable-next-line jsx-a11y/media-has-caption -- a voice message has no caption track
          <audio controls src={rec.url} className="w-full" data-testid={`${testId}-preview`} />
        )}
        {sendError && <p className="m-0 text-sm text-danger" role="alert">{sendError}</p>}
      </div>
    </Modal>
  );
}

export default VoicemailRecorder;
