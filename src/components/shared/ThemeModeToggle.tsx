// ThemeModeToggle — the light/dark switch for the app header or a user menu.
//
// Apps wrote a "Dark" / "Light" text button (UX audit 2026-11-08, L3), whose
// label is a control in the header's type scale and whose meaning flips with
// the state. This is an `IconButton size="sm"` with the sun (light) or moon
// (dark) glyph: `aria-pressed` reads whether dark mode is on, and its name
// says what pressing does.

import { IconButton } from '../ui/IconButton';
import { MoonIcon, SunIcon } from '../ui/Icons';

export type ThemeMode = 'light' | 'dark';

export interface ThemeModeToggleProps {
  /** The current mode (controlled). */
  mode: ThemeMode;
  /** Called with the other mode when pressed. */
  onModeChange: (mode: ThemeMode) => void;
  /** Default `sm`, the header's control size. */
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
}

/** The light/dark switch: an IconButton showing the current mode, aria-pressed when dark. */
export function ThemeModeToggle({
  mode, onModeChange, size = 'sm', disabled, className, 'data-testid': testId = 'theme-mode-toggle',
}: ThemeModeToggleProps) {
  const dark = mode === 'dark';
  const name = dark ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <IconButton
      aria-label={name}
      title={name}
      aria-pressed={dark}
      size={size}
      variant="ghost"
      disabled={disabled}
      className={className}
      data-theme-mode={mode}
      data-testid={testId}
      onClick={() => onModeChange(dark ? 'light' : 'dark')}
      icon={dark ? <MoonIcon /> : <SunIcon />}
    />
  );
}

export default ThemeModeToggle;
