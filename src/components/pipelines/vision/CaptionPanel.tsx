import Chip from '../../shared/Chip';
import type { VisionResult } from './types';

export interface CaptionPanelProps {
  result: Pick<VisionResult, 'caption' | 'setting' | 'location' | 'timeOfDay' | 'mood' | 'colors'>;
  className?: string;
}

/**
 * Caption + scene metadata header. Renders compactly even when the model
 * only filled `caption`; setting/location/tod/mood/colors are individually
 * optional and each renders as a chip.
 */
export function CaptionPanel({ result, className }: CaptionPanelProps) {
  const { caption, setting, location, timeOfDay, mood, colors } = result;
  if (!caption && !setting && !location && !timeOfDay && !mood && (!colors || colors.length === 0)) {
    return null;
  }
  return (
    <section className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}>
      {caption ? (
        <p className="text-base leading-relaxed text-[var(--color-text,#0f172a)]">{caption}</p>
      ) : null}
      <div className="flex flex-wrap gap-1.5">
        {setting ? <Chip tone="neutral" size="sm" title="Scene setting">setting: {setting}</Chip> : null}
        {location ? <Chip tone="neutral" size="sm" title="Location">loc: {location}</Chip> : null}
        {timeOfDay ? <Chip tone="neutral" size="sm" title="Time of day">tod: {timeOfDay}</Chip> : null}
        {mood ? <Chip tone="info" size="sm" title="Mood">mood: {mood}</Chip> : null}
        {(colors ?? []).map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border,#e2e8f0)] bg-[var(--color-surface,#fff)] px-2 py-0.5 text-[11px] text-[var(--color-text-muted,#475569)]"
            title={`Dominant color: ${c}`}
          >
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 rounded-full border border-black/10"
              style={{ background: c }}
            />
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}

export default CaptionPanel;
