import { RangeSlider } from '../../forms/RangeSlider';
import { Select } from '../../forms/Select';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { cn } from '../../../lib/cn';
import type { WorkActivityPresentation } from './types';

const MINUTE = 60_000;
// Coarsen the hour ruler until it fits: a 15-minute window wants quarters, a
// working day wants three-hour marks, and neither should print a tick every
// few pixels.
const TICK_STEPS = [15, 30, 60, 120, 180, 360, 720];

export function WorkTimeWindow({ activity, timezone = 'UTC' }: { activity: WorkActivityPresentation; timezone?: string }) {
  const { bounds, window, onWindowChange } = activity;
  const duration = Math.max(MINUTE, window.end - window.start);
  const formatter = new Intl.DateTimeFormat(undefined, { timeZone: timezone, hour: 'numeric', minute: '2-digit' });
  const format = (value: number) => formatter.format(value);
  // The ruler and the range label are read against each other, so they drop the
  // day period the way a clock face does. Announced values keep it.
  const clock = (value: number) => formatter.formatToParts(value).filter((part) => part.type !== 'dayPeriod').map((part) => part.value).join('').trim();
  const move = (end: number, following: boolean, length = duration) => {
    const safeEnd = Math.max(bounds.start + Math.min(length, bounds.end - bounds.start), Math.min(bounds.end, end));
    onWindowChange({ start: Math.max(bounds.start, safeEnd - length), end: safeEnd, following });
  };
  const span = Math.max(1, bounds.end - bounds.start);
  const preset = [15, 30, 60].find((minutes) => duration === minutes * MINUTE);
  const fullDay = window.start === bounds.start && window.end === bounds.end;
  const atNow = window.end >= bounds.end;
  // The ruler counts from real clock marks in the host's zone, not from the
  // start of the window: "8:30" has to land where 8:30 actually is.
  const stepMinutes = TICK_STEPS.find((minutes) => span / (minutes * MINUTE) <= 5) ?? TICK_STEPS.at(-1)!;
  const step = stepMinutes * MINUTE;
  const ticks: number[] = [];
  for (let at = Math.ceil(bounds.start / step) * step; at <= bounds.end; at += step) {
    // Leave the last stretch to the "Now" label so the two never overprint.
    if ((at - bounds.start) / span < 0.82) ticks.push(at);
  }
  return (
    <div className="shrink-0 border-b border-border bg-surface px-3 pb-3 pt-2" aria-label="Work time window">
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
        <strong aria-live="polite" title={timezone} className="tabular-nums font-semibold text-text-primary">{clock(window.start)} – {atNow ? 'Now' : clock(window.end)}</strong>
        <span className="flex-1" />
        <IconButton size="sm" aria-label="Previous interval" disabled={window.start <= bounds.start} onClick={() => move(window.end - duration, false)}>‹</IconButton>
        <IconButton size="sm" aria-label="Next interval" disabled={atNow} onClick={() => move(window.end + duration, false)}>›</IconButton>
        <Button size="sm" variant="secondary" disabled={window.following} onClick={() => move(bounds.end, true)}>
          <span aria-hidden="true" className={cn('mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle', window.following ? 'bg-success' : 'bg-border-emphasis')} />
          {window.following ? 'Following now' : 'Back to now'}
        </Button>
        <Select
          aria-label="Interval duration"
          value={fullDay ? 'day' : preset ? String(preset) : 'custom'}
          size="sm" className="w-auto"
          options={[...(!preset && !fullDay ? [{ value: 'custom', label: 'Custom' }] : []), { value: '15', label: '15 min' }, { value: '30', label: '30 min' }, { value: '60', label: '1 hour' }, { value: 'day', label: 'Full day' }]}
          onChange={(event) => move(window.end, window.following, event.target.value === 'day' ? span : Number(event.target.value) * MINUTE)}
        />
      </div>
      <div className="relative mx-1 mt-2 h-4 text-[10px] text-text-tertiary" aria-hidden="true">
        {ticks.map((at) => (
          <span key={at} className="absolute top-0 -translate-x-1/2 first:translate-x-0 tabular-nums" style={{ left: `${(at - bounds.start) / span * 100}%` }}>{clock(at)}</span>
        ))}
        <span className="absolute right-0 top-0 font-semibold tabular-nums text-text-secondary">Now {clock(bounds.end)}</span>
      </div>
      <div className="relative mx-1 h-3 border-b border-border" aria-label="Activity markers">
        {activity.events?.filter((event) => event.at >= bounds.start && event.at <= bounds.end && event.count > 0).map((event) => {
          const inWindow = event.at >= window.start && event.at <= window.end;
          return (
            <button
              key={event.at}
              type="button"
              aria-label={`${event.count} events at ${format(event.at)}`}
              title={`${event.count} events at ${format(event.at)}`}
              className={cn('absolute bottom-0.5 h-2 w-2 -translate-x-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-primary', inWindow ? 'bg-primary ring-2 ring-primary/20' : 'bg-primary/40')}
              style={{ left: `${(event.at - bounds.start) / span * 100}%`, opacity: Math.min(1, 0.45 + Math.log2(event.count + 1) / 5) }}
              onClick={() => move(event.at, false)}
            />
          );
        })}
      </div>
      <RangeSlider className="mx-1" value={[window.start, window.end]} min={bounds.start} max={bounds.end} step={MINUTE} labels={['Interval start', 'Interval end']} formatValue={format} onChange={([start, end]) => onWindowChange({ start, end, following: false })} />
      {!window.following && activity.temporalMode === 'recent' && <p className="text-xs text-text-secondary">Recent work · statuses reflect the latest available state</p>}
    </div>
  );
}
