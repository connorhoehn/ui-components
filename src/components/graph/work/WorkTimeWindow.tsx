import { RangeSlider } from '../../forms/RangeSlider';
import { Select } from '../../forms/Select';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import type { WorkActivityPresentation } from './types';

const MINUTE = 60_000;
export function WorkTimeWindow({ activity, timezone = 'UTC' }: { activity: WorkActivityPresentation; timezone?: string }) {
  const { bounds, window, onWindowChange } = activity;
  const duration = Math.max(MINUTE, window.end - window.start);
  const format = (value: number) => new Intl.DateTimeFormat(undefined, { timeZone: timezone, hour: 'numeric', minute: '2-digit' }).format(value);
  const move = (end: number, following: boolean, length = duration) => {
    const safeEnd = Math.max(bounds.start + Math.min(length, bounds.end - bounds.start), Math.min(bounds.end, end));
    onWindowChange({ start: Math.max(bounds.start, safeEnd - length), end: safeEnd, following });
  };
  const span = Math.max(1, bounds.end - bounds.start);
  const preset = [15, 30, 60].find((minutes) => duration === minutes * MINUTE);
  const fullDay = window.start === bounds.start && window.end === bounds.end;
  return (
    <div className="shrink-0 border-b border-border bg-surface px-3 py-2" aria-label="Work time window">
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
        <IconButton size="sm" aria-label="Previous interval" disabled={window.start <= bounds.start} onClick={() => move(window.end - duration, false)}>‹</IconButton>
        <span className="tabular-nums text-text-primary">{format(window.start)}–{format(window.end)}</span>
        <IconButton size="sm" aria-label="Next interval" disabled={window.end >= bounds.end} onClick={() => move(window.end + duration, false)}>›</IconButton>
        <span title={timezone}>{timezone}</span>
        <span className="flex-1" />
        <Button size="sm" variant="ghost" onClick={() => move(bounds.end, true)}>{window.following ? 'Following now' : 'Back to now'}</Button>
        <Select
          aria-label="Interval duration"
          value={fullDay ? 'day' : preset ? String(preset) : 'custom'}
          size="sm" className="w-auto"
          options={[...(!preset && !fullDay ? [{ value: 'custom', label: 'Custom' }] : []), { value: '15', label: '15 minutes' }, { value: '30', label: '30 minutes' }, { value: '60', label: '1 hour' }, { value: 'day', label: 'Full day' }]}
          onChange={(event) => move(window.end, window.following, event.target.value === 'day' ? span : Number(event.target.value) * MINUTE)}
        />
      </div>
      <div className="relative mx-2 mt-1 h-3" aria-label="Activity markers">
        {activity.events?.filter((event) => event.at >= bounds.start && event.at <= bounds.end && event.count > 0).map((event) => (
          <button
            key={event.at}
            type="button"
            aria-label={`${event.count} events at ${format(event.at)}`}
            title={`${event.count} events at ${format(event.at)}`}
            className="absolute top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary/60 focus-visible:outline-2 focus-visible:outline-primary"
            style={{ left: `${(event.at - bounds.start) / span * 100}%`, opacity: Math.min(1, 0.35 + Math.log2(event.count + 1) / 5) }}
            onClick={() => move(event.at, false)}
          />
        ))}
      </div>
      <RangeSlider value={[window.start, window.end]} min={bounds.start} max={bounds.end} step={MINUTE} labels={['Interval start', 'Interval end']} formatValue={format} onChange={([start, end]) => onWindowChange({ start, end, following: false })} />
      {!window.following && activity.temporalMode === 'recent' && <p className="text-xs text-text-secondary">Recent work · statuses reflect the latest available state</p>}
    </div>
  );
}
