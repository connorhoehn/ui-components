// ui-components/src/components/shared/FullscreenToggle.tsx
//
// The one control that puts a host's element into the browser's full-screen
// mode and back: an icon button whose glyph and label flip with the state.
// Hidden where the API is absent (an iframe without allowfullscreen, SSR), so
// a host never has to check support itself. The element is the host's — a
// canvas, a stage, a graph — passed by ref; the hook (useFullscreen) does the
// rest. Escape leaves full screen natively; the same button shows "Exit full
// screen" while inside it for people who reach for a control.

import type { RefObject } from 'react';
import { useFullscreen } from '../../hooks/useFullscreen';
import { IconButton, type IconButtonProps } from '../ui/IconButton';
import { MaximizeIcon, MinimizeIcon } from '../ui/Icons';

export interface FullscreenToggleProps extends Omit<IconButtonProps, 'aria-label' | 'icon' | 'onClick' | 'children'> {
  /** The element to present full screen. */
  target: RefObject<HTMLElement | null>;
  /** Accessible name while not in full screen. Default `Full screen`. */
  label?: string;
  /** Accessible name while in full screen. Default `Exit full screen`. */
  exitLabel?: string;
  /** After the browser accepted or refused the request. */
  onChange?: (active: boolean) => void;
}

export function FullscreenToggle({
  target,
  label = 'Full screen',
  exitLabel = 'Exit full screen',
  onChange,
  size = 'sm',
  variant = 'ghost',
  'data-testid': testId = 'fullscreen-toggle',
  ...rest
}: FullscreenToggleProps & { 'data-testid'?: string }) {
  const fullscreen = useFullscreen(target);
  if (!fullscreen.supported) return null;
  const name = fullscreen.active ? exitLabel : label;
  return (
    <IconButton
      {...rest}
      size={size}
      variant={variant}
      aria-label={name}
      title={name}
      aria-pressed={fullscreen.active}
      data-testid={testId}
      data-fullscreen={fullscreen.active ? 'true' : 'false'}
      icon={fullscreen.active ? <MinimizeIcon size={16} /> : <MaximizeIcon size={16} />}
      onClick={() => {
        void fullscreen.toggle().then(() => onChange?.(!!target.current && document.fullscreenElement === target.current));
      }}
    />
  );
}

export default FullscreenToggle;
