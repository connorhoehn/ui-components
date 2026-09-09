// AuthedAudio — an <audio> whose source needs a bearer token.
//
// A media element cannot carry an Authorization header, so a protected
// recording either gets a signed URL (infrastructure) or is fetched as a Blob
// and played from an object URL (this). The fetch happens on demand — a list
// of forty voicemails must not download forty files to draw itself.

import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';

export interface AuthedAudioProps {
  src: string;
  getAuthToken: () => string | null | Promise<string | null>;
  /** Fires once, when playback first starts — "mark as listened". */
  onFirstPlay?: () => void;
  /** Fetch immediately rather than on the Play click. */
  eager?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function AuthedAudio({ src, getAuthToken, onFirstPlay, eager = false, className, 'data-testid': testId = 'authed-audio' }: AuthedAudioProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [wanted, setWanted] = useState(eager);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!wanted) return;
    let cancelled = false;
    let objectUrl: string | null = null;
    setState('loading');
    void (async () => {
      try {
        const token = await getAuthToken();
        const res = await fetch(src, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl); setState('ready');
      } catch { if (!cancelled) setState('error'); }
    })();
    return () => { cancelled = true; if (objectUrl) URL.revokeObjectURL(objectUrl); };
    // getAuthToken is a plain accessor; re-fetch only when the source changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, wanted]);

  if (state === 'idle') {
    return <Button variant="secondary" size="sm" onClick={() => setWanted(true)} data-testid={`${testId}-load`}>▶ Play</Button>;
  }
  if (state === 'loading') return <span className="text-sm text-text-tertiary" data-testid={`${testId}-loading`}>Loading…</span>;
  if (state === 'error' || !url) {
    return <Button variant="ghost" size="sm" onClick={() => { setState('idle'); setWanted(false); setTimeout(() => setWanted(true), 0); }} data-testid={`${testId}-error`}>Couldn’t load — retry</Button>;
  }
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption -- a voice message has no caption track
    <audio
      controls
      autoPlay
      src={url}
      className={className}
      data-testid={testId}
      onPlay={() => { if (!playedRef.current) { playedRef.current = true; onFirstPlay?.(); } }}
    />
  );
}

export default AuthedAudio;
