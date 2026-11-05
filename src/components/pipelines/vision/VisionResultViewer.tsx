import { useState } from 'react';
import { cn } from '../../../lib/cn';
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
    <div className={cn('flex w-full flex-col gap-4 text-text-primary', className)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {showImage ? (
          <div className="md:col-span-7">
            <ImageWithBBoxOverlay
              {...overlayProps}
              onSelectPerson={handlePersonSelect}
              alt={result.caption ?? 'Vision result'}
            />
            {result.model ? (
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary">
                <span className="font-medium text-text-primary">{result.model.endpointId}</span>
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
        <div className={cn('flex flex-col gap-4', showImage ? 'md:col-span-5' : 'md:col-span-12')}>
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
        <section data-ui-part="" className="flex flex-col gap-1.5">
          <h4 className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
            Text (OCR)
          </h4>
          <ul className="flex flex-col gap-1">
            {result.text.map((line, i) => (
              <li
                key={i}
                className="rounded border border-border bg-surface px-2 py-1 font-mono text-[12px]"
              >
                {line}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {showRawText && result.rawText ? (
        <section data-ui-part="" className="flex flex-col gap-1.5">
          <button
            data-ui-part=""
            type="button"
            onClick={() => setShowRaw((v) => !v)}
            aria-expanded={showRaw}
            aria-label={`${showRaw ? 'Hide' : 'Show'} raw model output`}
            className="self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded"
          >
            {showRaw ? '▾' : '▸'} Raw model output
          </button>
          {showRaw ? (
            <pre className="overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary">
              {result.rawText}
            </pre>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

export default VisionResultViewer;
