import { RangeSlider } from '../../forms/RangeSlider';
import { Select } from '../../forms/Select';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { cn } from '../../../lib/cn';
import type { WorkActivityPresentation } from './types';
import { useMeasuredWidth } from '../../doc-editor/useMeasuredWidth';

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
// Coarsen the ruler until it fits: a quarter-hour window wants quarters, a
// working day wants three-hour marks, and neither should print a tick every
// few pixels. Read as [longest extent this step may cover, step].
const TICK_STEPS: Array<[number, number]> = [
  [2 * HOUR, 30 * MINUTE],
  [6 * HOUR, HOUR],
  [12 * HOUR, 2 * HOUR],
  [Infinity, 3 * HOUR],
];

/** The "Now 3:52" label's width plus half a tick label and a gap. */
const NOW_LABEL_CLEARANCE_PX = 80;
/** The least room between two tick labels' centres. */
const TICK_SPACING_PX = 44;

export function WorkTimeWindow({ activity, timezone = 'UTC' }: { activity: WorkActivityPresentation; timezone?: string }) {
  const { bounds, window, onWindowChange } = activity;
  const duration = Math.max(MINUTE, window.end - window.start);
  const announce = new Intl.DateTimeFormat(undefined, { timeZone: timezone, hour: 'numeric', minute: '2-digit' });
  const format = (value: number) => announce.format(value);
  // The ruler and the range label are read against each other, so they print
  // as a clock face does — a plain 24-hour h:mm, no day period, no padded
  // hour. Announced values keep the locale's full wording.
  const digits = new Intl.DateTimeFormat('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const clock = (value: number) => {
    const parts = digits.formatToParts(value);
    const hour = parts.find((part) => part.type === 'hour')?.value ?? '0';
    const minute = parts.find((part) => part.type === 'minute')?.value ?? '00';
    return `${Number(hour)}:${minute}`;
  };
  // A day's bounds run to midnight, but nobody has worked the rest of it yet.
  // The ruler stops at the real clock so "Now" lands where now actually is.
  const now = activity.now ?? (window.following ? window.end : Date.now());
  const live = activity.temporalMode === 'recent' || window.following;
  const end = live ? Math.min(bounds.end, Math.max(bounds.start + MINUTE, now)) : bounds.end;
  const span = Math.max(1, end - bounds.start);
  const at = (value: number) => Math.min(100, Math.max(0, (value - bounds.start) / span * 100));
  const move = (target: number, following: boolean, length = duration) => {
    const safeEnd = Math.max(bounds.start + Math.min(length, span), Math.min(end, target));
    onWindowChange({ start: Math.max(bounds.start, safeEnd - length), end: safeEnd, following });
  };
  const preset = [15, 30, 60].find((minutes) => duration === minutes * MINUTE);
  const fullDay = window.start === bounds.start && window.end >= end;
  const atNow = window.end >= end;
  // Never render the selection outside the extent, however stale it is.
  const selection: [number, number] = [
    Math.min(Math.max(window.start, bounds.start), end),
    Math.min(Math.max(window.end, bounds.start), end),
  ];
  // The ruler counts from real clock marks in the host's zone, not from the
  // start of the window: "8:30" has to land where 8:30 actually is.
  const step = TICK_STEPS.find(([limit]) => span <= limit)![1];
  // Leave the last stretch to the "Now" label so the two never overprint, and
  // keep marks a label's width apart — in pixels, measured: a fixed 82 % of a
  // ~270 px ruler (a 1280 px window with the node pane open) left "3:00"
  // touching "Now 3:52" (realtime-examples Loop 32 (activity)).
  const ruler = useMeasuredWidth<HTMLDivElement>();
  const rulerWidth = ruler.width ?? 0;
  const ticks: number[] = [];
  for (let mark = Math.ceil(bounds.start / step) * step; mark <= end; mark += step) {
    const fraction = (mark - bounds.start) / span;
    if (fraction >= 0.82) continue;
    if (rulerWidth > 0) {
      if ((1 - fraction) * rulerWidth < NOW_LABEL_CLEARANCE_PX) continue;
      const last = ticks[ticks.length - 1];
      if (last !== undefined && (mark - last) / span * rulerWidth < TICK_SPACING_PX) continue;
    }
    ticks.push(mark);
  }
  return (
    <div className="shrink-0 border-b border-border bg-surface px-3 pb-3 pt-2" aria-label="Work time window">
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
        <strong aria-live="polite" title={timezone} className="tabular-nums font-semibold text-text-primary">{clock(selection[0])} – {atNow ? 'Now' : clock(selection[1])}</strong>
        <span className="flex-1" />
        <IconButton size="sm" aria-label="Previous interval" disabled={window.start <= bounds.start} onClick={() => move(window.end - duration, false)}>‹</IconButton>
        <IconButton size="sm" aria-label="Next interval" disabled={atNow} onClick={() => move(window.end + duration, false)}>›</IconButton>
        <Button size="sm" variant="secondary" disabled={window.following} onClick={() => move(end, true)}>
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
      <div ref={ruler.ref} className="relative mx-1 mt-2 h-4 text-[10px] text-text-tertiary" aria-hidden="true" data-testid="work-time-ruler">
        {ticks.map((mark) => (
          <span key={mark} className="absolute top-0 -translate-x-1/2 first:translate-x-0 tabular-nums" style={{ left: `${at(mark)}%` }}>{clock(mark)}</span>
        ))}
        <span className="absolute right-0 top-0 font-semibold tabular-nums text-text-secondary">Now {clock(end)}</span>
      </div>
      <div className="relative mx-1 h-3 border-b border-border" aria-label="Activity markers">
        {activity.events?.filter((event) => event.at >= bounds.start && event.at <= end && event.count > 0).map((event) => {
          const inWindow = event.at >= selection[0] && event.at <= selection[1];
          return (
            <button
              key={event.at}
              type="button"
              aria-label={`${event.count} events at ${format(event.at)}`}
              title={`${event.count} events at ${format(event.at)}`}
              className={cn('absolute bottom-0.5 h-2 w-2 -translate-x-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-primary', inWindow ? 'bg-primary ring-2 ring-primary/20' : 'bg-primary/40')}
              style={{ left: `${at(event.at)}%`, opacity: Math.min(1, 0.45 + Math.log2(event.count + 1) / 5) }}
              onClick={() => move(event.at, false)}
            />
          );
        })}
      </div>
      <RangeSlider className="mx-1" value={selection} min={bounds.start} max={end} step={MINUTE} labels={['Interval start', 'Interval end']} formatValue={format} onChange={([start, value]) => onWindowChange({ start, end: value, following: false })} />
      {!window.following && activity.temporalMode === 'recent' && <p className="text-xs text-text-secondary">Recent work · statuses reflect the latest available state</p>}
    </div>
  );
}
