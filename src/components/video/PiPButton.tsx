// PiPButton — wraps `video.requestPictureInPicture()` so users can
// float a call's spotlight video into an OS-level PiP window.

import { useCallback, useEffect, useState } from 'react';
import { cn } from '../../lib/cn';

export interface PiPButtonProps {
  /** Callback to obtain the `<video>` element to enter PiP with. */
  getVideoElement: () => HTMLVideoElement | null;
  className?: string;
  title?: string;
}

export function PiPButton({
  getVideoElement,
  className,
  title,
}: PiPButtonProps) {
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof document !== 'undefined' && document.pictureInPictureEnabled === true);
  }, []);

  useEffect(() => {
    const onLeave = () => setActive(false);
    const onEnter = () => setActive(true);
    document.addEventListener('leavepictureinpicture', onLeave);
    document.addEventListener('enterpictureinpicture', onEnter);
    return () => {
      document.removeEventListener('leavepictureinpicture', onLeave);
      document.removeEventListener('enterpictureinpicture', onEnter);
    };
  }, []);

  const toggle = useCallback(async () => {
    if (!supported) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setActive(false);
        return;
      }
      const v = getVideoElement();
      if (!v) return;
      v.disablePictureInPicture = false;
      await v.requestPictureInPicture();
      setActive(true);
    } catch {
      // user-gesture failures or already-in-PiP races — silent
    }
  }, [supported, getVideoElement]);

  const disabled = !supported;
  return (
    <button
      data-ui-part=""
      type="button"
      onClick={toggle}
      disabled={disabled}
      title={
        title ??
        (disabled
          ? 'Picture-in-Picture not supported'
          : active
            ? 'Exit Picture-in-Picture'
            : 'Open Picture-in-Picture')
      }
      aria-label={active ? 'Exit Picture-in-Picture' : 'Open Picture-in-Picture'}
      aria-pressed={active}
      className={cn(
        'w-9 h-9 rounded flex items-center justify-center transition-colors',
        disabled
          ? 'bg-white/5 text-white/30 cursor-not-allowed'
          : 'bg-white/10 hover:bg-white/20 text-white',
        className,
      )}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.5v-3.5A1.5 1.5 0 0 1 10 6h4V3H2v7h4v1H2a1 1 0 0 1-1-1V2zm9 5h4v3.5a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5z"/>
      </svg>
    </button>
  );
}

export default PiPButton;
