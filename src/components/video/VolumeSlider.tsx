// ui-components/src/components/video/VolumeSlider.tsx
//
// Output volume for a call: a speaker glyph, a slider, and an optional
// "Test sound" button. The value is the local playback gain (0..1) — it
// changes what you hear, never what others hear.

import { cn } from '../../lib/cn';
import { Slider } from '../forms/Slider';
import { Button } from '../ui/Button';
import { SpeakerIcon } from './MediaIcons';

export interface VolumeSliderProps {
  /** 0..1. */
  value: number;
  onChange: (value: number) => void;
  /** When set, a "Test sound" button follows the slider. */
  onTest?: () => void;
  /** Label of the test button. Default `Test sound`. */
  testLabel?: string;
  /** Disables the test button (a test is already playing). */
  testing?: boolean;
  muted?: boolean;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
  /** Test id of the test button. Default `settings-test-sound`. */
  testButtonTestId?: string;
}

export function VolumeSlider({
  value,
  onChange,
  onTest,
  testLabel = 'Test sound',
  testing = false,
  muted = false,
  disabled = false,
  className,
  'data-testid': testId = 'settings-volume',
  testButtonTestId = 'settings-test-sound',
}: VolumeSliderProps) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <SpeakerIcon size={20} className={cn('shrink-0', muted ? 'text-text-tertiary' : 'text-text-primary')} />
      <Slider
        value={pct}
        onChange={(v) => onChange(v / 100)}
        min={0}
        max={100}
        step={1}
        readout={false}
        disabled={disabled}
        aria-label="Speaker volume"
        data-testid={testId}
        className="min-w-0 flex-1"
      />
      {onTest && (
        <Button
          variant="ghost"
          size="md"
          onClick={onTest}
          disabled={disabled || testing}
          data-testid={testButtonTestId}
          className="shrink-0 font-medium"
        >
          {testLabel}
        </Button>
      )}
    </div>
  );
}

export default VolumeSlider;
