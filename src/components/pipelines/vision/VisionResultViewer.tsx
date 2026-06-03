import { useState } from 'react';
import CaptionPanel from './CaptionPanel';
import ImageWithBBoxOverlay, { imageOverlayPropsFrom } from './ImageWithBBoxOverlay';
import PeoplePanel from './PeoplePanel';
import ObjectsPanel from './ObjectsPanel';
import TagsPanel from './TagsPanel';
import EditRecommendationsPanel from './EditRecommendationsPanel';
import type { VisionPerson, VisionResult } from './types';

export interface VisionResultViewerProps {
  result: VisionResult;
  /** Whether to render the image overlay + per-section panels. Default: true. */
  showImage?: boolean;
  showCaption?: boolean;
  showPeople?: boolean;
  showObjects?: boolean;
  showTags?: boolean;
  showEdits?: boolean;
  showRawText?: boolean;
  /** Fires when a tag is clicked (e.g. to filter the activity stream). */
  onTagClick?: (tag: string) => void;
  /** Fires when "Apply" is clicked on an edit recommendation. */
  onApplyEdit?: (edit: string) => void;
  className?: string;
}

/**
 * Top-level vision-result composite. Renders every populated section of a
 * `VisionResult`, gracefully omitting sections the model didn't emit.
 *
 * Layout: two-column on `md+` (image left, panels right), single-column on
 * mobile. Selecting a person in the people list highlights the corresponding
 * bbox on the image and vice versa.
 *
 * Designed to be embedded in `PipelineRunsPage` as the expanded view of a
 * `pipeline.image.vision.completed` step, OR rendered standalone for direct
 * vision-model exploration.
 */
export function VisionResultViewer({
  result,
  showImage = true,
  showCaption = true,
  showPeople = true,
  showObjects = true,
  showTags = true,
  showEdits = true,
  showRawText = false,
  onTagClick,
  onApplyEdit,
  className,
}: VisionResultViewerProps) {
  const [highlightedPersonIndex, setHighlightedPersonIndex] = useState<number | undefined>();
  const [showRaw, setShowRaw] = useState(false);

  const handlePersonSelect = (p: VisionPerson) =>
    setHighlightedPersonIndex(highlightedPersonIndex === p.index ? undefined : p.index);

  const overlayProps = imageOverlayPropsFrom(result);

  return (
    <div
      className={[
        'flex w-full flex-col gap-4 text-[var(--color-text,#0f172a)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {showImage ? (
          <div className="md:col-span-7">
            <ImageWithBBoxOverlay
              {...overlayProps}
              onSelectPerson={handlePersonSelect}
              alt={result.caption ?? 'Vision result'}
            />
            {result.model ? (
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-text-muted,#64748b)]">
                <span className="font-medium text-[var(--color-text,#0f172a)]">{result.model.endpointId}</span>
                <span>·</span>
                <span>latency {result.model.latencyMs}ms</span>
                {typeof result.model.tokensOut === 'number' ? (
                  <>
                    <span>·</span>
                    <span>{result.model.tokensOut} tok out</span>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
        <div className={['flex flex-col gap-4', showImage ? 'md:col-span-5' : 'md:col-span-12'].join(' ')}>
          {showCaption ? <CaptionPanel result={result} /> : null}
          {showPeople && result.people && result.people.length > 0 ? (
            <PeoplePanel
              people={result.people}
              highlightedIndex={highlightedPersonIndex}
              onSelect={handlePersonSelect}
            />
          ) : null}
        </div>
      </div>

      {showObjects && result.objects && result.objects.length > 0 ? (
        <ObjectsPanel objects={result.objects} />
      ) : null}

      {showTags && result.tags && result.tags.length > 0 ? (
        <TagsPanel tags={result.tags} onTagClick={onTagClick} />
      ) : null}

      {showEdits ? (
        <EditRecommendationsPanel
          exposure={result.exposure}
          whiteBalance={result.whiteBalance}
          contrast={result.contrast}
          composition={result.composition}
          edits={result.edits}
          onApplyEdit={onApplyEdit}
        />
      ) : null}

      {result.text && result.text.length > 0 ? (
        <section className="flex flex-col gap-1.5">
          <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted,#64748b)]">
            Text (OCR)
          </h4>
          <ul className="flex flex-col gap-1">
            {result.text.map((line, i) => (
              <li
                key={i}
                className="rounded border border-[var(--color-border,#e2e8f0)] bg-[var(--color-surface,#fff)] px-2 py-1 font-mono text-[12px]"
              >
                {line}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {showRawText && result.rawText ? (
        <section className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setShowRaw((v) => !v)}
            className="self-start text-[11px] font-medium text-[var(--color-text-muted,#64748b)] hover:underline"
          >
            {showRaw ? '▾' : '▸'} Raw model output
          </button>
          {showRaw ? (
            <pre className="overflow-x-auto rounded-md border border-[var(--color-border,#e2e8f0)] bg-[var(--color-surface-muted,#f8fafc)] p-2 font-mono text-[11px] leading-snug text-[var(--color-text-muted,#475569)]">
              {result.rawText}
            </pre>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

export default VisionResultViewer;
