// The inline form under the slide preview — the fields THIS layout reads.
//
// One form per layout rather than one form with every field on it. A deck
// slide has thirteen possible shapes (the six added in 2.547.0 have their
// forms in `SlideLayoutForms`) and no slide uses more than three of them;
// showing all seven would make a `quote` slide a page of empty boxes, and
// people fill empty boxes.
//
// What the form does NOT do is delete what a layout stopped reading. Switching
// a bullets slide to `chart` and back returns the bullets, because the
// alternative makes the layout picker a control that eats work — see
// `withLayoutDefaults`.

import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { Input } from '../../forms/Input';
import { Select } from '../../forms/Select';
import { Textarea } from '../../forms/Textarea';
import FormField from '../../shared/FormField';
import { SectionLabel } from '../../shared/SectionLabel';
import { Text } from '../../shared/Text';
import { Table, TableBody, TableHead, TableRow, TableTd, TableTh } from '../../ui/Table';
import SlideSources, { type PresentationSourceOption } from './SlideSources';
import { AgendaEditor, ClosingEditor, ComparisonEditor, FiguresEditor, TableEditor, TimelineEditor } from './SlideLayoutForms';
import {
  DECK_CHART_KINDS,
  DECK_CHART_KIND_LABELS,
  MAX_PIE_SLICES,
  MAX_BULLETS_PER_SLIDE,
  MAX_BULLET_CHARS,
  MAX_CHART_LABELS,
  MAX_CHART_SERIES,
  MAX_EYEBROW_CHARS,
  MAX_NOTES_CHARS,
  MAX_QUOTE_CHARS,
  MAX_TITLE_CHARS,
  type DeckChart,
  type DeckSlide,
} from './deckSpec';

export interface SlideFormProps {
  slide: DeckSlide;
  onChange: (slide: DeckSlide) => void;
  sources: readonly PresentationSourceOption[];
  onSearchSources?: (query: string) => PresentationSourceOption[] | Promise<PresentationSourceOption[]>;
  readOnly?: boolean;
  /**
   * Render the citation picker at the foot of the form. Default true. The
   * editor turns it off when the sources sit in their own compact row outside
   * a collapsed form — Save depends on them, so they cannot be folded away.
   */
  showSources?: boolean;
  /**
   * Render the speaker-notes field. Default true. The editor turns it off when
   * the notes have their own pane under the stage (`SpeakerNotes`), so the
   * same field is not editable in two places at once.
   */
  showNotes?: boolean;
  testIdPrefix: string;
}

function TrashGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Bullets
// ---------------------------------------------------------------------------

function BulletListEditor({
  label,
  bullets,
  onChange,
  readOnly,
  testIdPrefix,
}: {
  label: string;
  bullets: readonly string[];
  onChange: (bullets: string[]) => void;
  readOnly: boolean;
  testIdPrefix: string;
}) {
  const set = (index: number, value: string) => {
    const next = bullets.slice();
    next[index] = value;
    onChange(next);
  };
  return (
    <div className="flex flex-col gap-1" data-testid={testIdPrefix}>
      <SectionLabel as="div">{label}</SectionLabel>
      <ol className="m-0 flex list-none flex-col gap-1 p-0">
        {bullets.map((bullet, index) => (
          // Bullets have no identity of their own in the spec — they are a
          // string array — so the index IS the key. Reordering is not offered
          // here for exactly that reason.
          <li key={index} className="flex items-center gap-1">
            <Text className="w-3 shrink-0 text-[11px] text-text-tertiary">{'•'}</Text>
            <Input
              value={bullet}
              maxLength={MAX_BULLET_CHARS}
              disabled={readOnly}
              aria-label={`${label} ${index + 1}`}
              onChange={(event) => set(index, event.target.value)}
              data-testid={`${testIdPrefix}-${index}`}
            />
            {!readOnly && (
              <IconButton
                aria-label={`Remove ${label.toLowerCase()} ${index + 1}`}
                variant="ghost"
                size="sm"
                icon={<TrashGlyph />}
                onClick={() => onChange(bullets.filter((_, i) => i !== index))}
                data-testid={`${testIdPrefix}-remove-${index}`}
              />
            )}
          </li>
        ))}
      </ol>
      {!readOnly && (
        <Button
          variant="ghost"
          size="sm"
          disabled={bullets.length >= MAX_BULLETS_PER_SLIDE}
          onClick={() => onChange([...bullets, ''])}
          data-testid={`${testIdPrefix}-add`}
          className="self-start"
        >
          Add bullet
        </Button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chart
// ---------------------------------------------------------------------------

function ChartEditor({
  chart,
  onChange,
  readOnly,
  testIdPrefix,
}: {
  chart: DeckChart;
  onChange: (chart: DeckChart) => void;
  readOnly: boolean;
  testIdPrefix: string;
}) {
  // The table is labels DOWN and series ACROSS, which is how the numbers are
  // read off a bar chart and how a spreadsheet would hold them. The alternative
  // — series down — makes adding a quarter a column edit in six places.
  const setValue = (seriesIndex: number, labelIndex: number, raw: string) => {
    const parsed = Number(raw);
    const series = chart.series.map((entry, index) => {
      if (index !== seriesIndex) return entry;
      const values = entry.values.slice();
      // NaN would travel into the spec and be rejected by the validator with a
      // message about the series rather than about the cell. Zero is the
      // honest reading of an unparseable cell in a numeric grid.
      values[labelIndex] = Number.isFinite(parsed) ? parsed : 0;
      return { ...entry, values };
    });
    onChange({ ...chart, series });
  };

  // A pie is one series of slices, at most six (every theme has six colours).
  // The form stops offering more, and says so when a chart switched to pie
  // still holds more than that.
  const isPie = chart.kind === 'pie';
  const labelCap = isPie ? MAX_PIE_SLICES : MAX_CHART_LABELS;
  const seriesCap = isPie ? 1 : MAX_CHART_SERIES;
  const pieProblem = isPie && (chart.series.length > 1 || chart.labels.length > MAX_PIE_SLICES)
    ? `A pie takes one series and at most ${MAX_PIE_SLICES} slices; this chart has ${chart.series.length} series and ${chart.labels.length} labels. Remove the extra ones, or pick another chart type.`
    : null;

  const addLabel = () => {
    if (chart.labels.length >= labelCap) return;
    onChange({
      ...chart,
      labels: [...chart.labels, `Label ${chart.labels.length + 1}`],
      series: chart.series.map((entry) => ({ ...entry, values: [...entry.values, 0] })),
    });
  };

  const removeLabel = (labelIndex: number) => {
    if (chart.labels.length <= 1) return;
    onChange({
      ...chart,
      labels: chart.labels.filter((_, index) => index !== labelIndex),
      series: chart.series.map((entry) => ({
        ...entry,
        values: entry.values.filter((_, index) => index !== labelIndex),
      })),
    });
  };

  return (
    <div className="flex flex-col gap-1.5" data-testid={testIdPrefix}>
      <div className="flex items-end gap-2">
        <FormField label="Chart type" className="w-40">
          {(wiring) => (
            <Select
              {...wiring}
              size="sm"
              value={chart.kind}
              disabled={readOnly}
              options={DECK_CHART_KINDS.map((kind) => ({ value: kind, label: DECK_CHART_KIND_LABELS[kind] }))}
              onChange={(event) => onChange({ ...chart, kind: event.target.value as DeckChart['kind'] })}
              data-testid={`${testIdPrefix}-kind`}
            />
          )}
        </FormField>
        {!readOnly && (
          <>
            <Button
              variant="ghost"
              size="sm"
              disabled={chart.labels.length >= labelCap}
              onClick={addLabel}
              data-testid={`${testIdPrefix}-add-label`}
            >
              Add row
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={chart.series.length >= seriesCap}
              onClick={() =>
                onChange({
                  ...chart,
                  series: [
                    ...chart.series,
                    { name: `Series ${chart.series.length + 1}`, values: chart.labels.map(() => 0) },
                  ],
                })
              }
              data-testid={`${testIdPrefix}-add-series`}
            >
              Add series
            </Button>
          </>
        )}
      </div>
      <Text size="xs" tone="tertiary" data-testid={`${testIdPrefix}-limits`}>
        {isPie
          ? `${chart.labels.length} of ${MAX_PIE_SLICES} slices · one series`
          : `${chart.labels.length} of ${MAX_CHART_LABELS} rows · ${chart.series.length} of ${MAX_CHART_SERIES} series`}
      </Text>
      {pieProblem && (
        <Text size="xs" tone="danger" role="alert" data-testid={`${testIdPrefix}-pie-problem`}>{pieProblem}</Text>
      )}

      <div className="overflow-x-auto rounded-md border border-border">
        <Table data-testid={`${testIdPrefix}-table`}>
          <TableHead>
            <TableRow>
              <TableTh>Label</TableTh>
              {chart.series.map((entry, seriesIndex) => (
                <TableTh key={seriesIndex}>
                  <div className="flex items-center gap-1">
                  <Input
                    size="sm"
                    value={entry.name}
                    disabled={readOnly}
                    aria-label={`Series ${seriesIndex + 1} name`}
                    onChange={(event) =>
                      onChange({
                        ...chart,
                        series: chart.series.map((candidate, index) =>
                          index === seriesIndex ? { ...candidate, name: event.target.value } : candidate,
                        ),
                      })
                    }
                    data-testid={`${testIdPrefix}-series-name-${seriesIndex}`}
                  />
                  {/* Since 2.547.0: a pie takes one series, so a chart switched
                      to pie needs a way to drop the others. */}
                  {!readOnly && chart.series.length > 1 && (
                    <IconButton
                      aria-label={`Remove series ${seriesIndex + 1}`}
                      variant="ghost"
                      size="sm"
                      icon={<TrashGlyph />}
                      onClick={() => onChange({ ...chart, series: chart.series.filter((_, index) => index !== seriesIndex) })}
                      data-testid={`${testIdPrefix}-remove-series-${seriesIndex}`}
                    />
                  )}
                  </div>
                </TableTh>
              ))}
              {!readOnly && <TableTh />}
            </TableRow>
          </TableHead>
          <TableBody>
            {chart.labels.map((label, labelIndex) => (
              <TableRow key={labelIndex}>
                <TableTd>
                  <Input
                    size="sm"
                    value={label}
                    disabled={readOnly}
                    aria-label={`Row ${labelIndex + 1} label`}
                    onChange={(event) =>
                      onChange({
                        ...chart,
                        labels: chart.labels.map((candidate, index) =>
                          index === labelIndex ? event.target.value : candidate,
                        ),
                      })
                    }
                    data-testid={`${testIdPrefix}-label-${labelIndex}`}
                  />
                </TableTd>
                {chart.series.map((entry, seriesIndex) => (
                  <TableTd key={seriesIndex}>
                    <Input
                      size="sm"
                      type="number"
                      value={String(entry.values[labelIndex] ?? 0)}
                      disabled={readOnly}
                      aria-label={`${entry.name} at ${label}`}
                      onChange={(event) => setValue(seriesIndex, labelIndex, event.target.value)}
                      data-testid={`${testIdPrefix}-value-${seriesIndex}-${labelIndex}`}
                    />
                  </TableTd>
                ))}
                {!readOnly && (
                  <TableTd>
                    <IconButton
                      aria-label={`Remove row ${labelIndex + 1}`}
                      variant="ghost"
                      size="sm"
                      icon={<TrashGlyph />}
                      disabled={chart.labels.length <= 1}
                      onClick={() => removeLabel(labelIndex)}
                      data-testid={`${testIdPrefix}-remove-label-${labelIndex}`}
                    />
                  </TableTd>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The form
// ---------------------------------------------------------------------------

export function SlideForm({
  slide,
  onChange,
  sources,
  onSearchSources,
  readOnly = false,
  showSources = true,
  showNotes = true,
  testIdPrefix,
}: SlideFormProps) {
  const patch = (partial: Partial<DeckSlide>) => onChange({ ...slide, ...partial });

  return (
    <div className={cn('flex flex-col gap-3')} data-testid={`${testIdPrefix}-form`}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <FormField label="Eyebrow" hint="The small line above the title.">
          {(wiring) => (
            <Input
              {...wiring}
              value={slide.eyebrow ?? ''}
              maxLength={MAX_EYEBROW_CHARS}
              disabled={readOnly}
              onChange={(event) => patch({ eyebrow: event.target.value || undefined })}
              data-testid={`${testIdPrefix}-eyebrow`}
            />
          )}
        </FormField>
        <FormField label="Slide title" required>
          {(wiring) => (
            <Input
              {...wiring}
              value={slide.title}
              maxLength={MAX_TITLE_CHARS}
              disabled={readOnly}
              onChange={(event) => patch({ title: event.target.value })}
              // PresentationEditor finds the field by this to focus it (2.549.0).
              data-slide-title=""
              data-testid={`${testIdPrefix}-title`}
            />
          )}
        </FormField>
      </div>

      {slide.layout === 'bullets' && (
        <BulletListEditor
          label="Bullets"
          bullets={slide.bullets ?? []}
          onChange={(bullets) => patch({ bullets })}
          readOnly={readOnly}
          testIdPrefix={`${testIdPrefix}-bullets`}
        />
      )}

      {slide.layout === 'two-column' && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <BulletListEditor
            label="Left column"
            bullets={slide.columns?.[0] ?? []}
            onChange={(left) => patch({ columns: [left, slide.columns?.[1] ?? []] })}
            readOnly={readOnly}
            testIdPrefix={`${testIdPrefix}-column-0`}
          />
          <BulletListEditor
            label="Right column"
            bullets={slide.columns?.[1] ?? []}
            onChange={(right) => patch({ columns: [slide.columns?.[0] ?? [], right] })}
            readOnly={readOnly}
            testIdPrefix={`${testIdPrefix}-column-1`}
          />
        </div>
      )}

      {slide.layout === 'chart' && slide.chart && (
        <ChartEditor
          chart={slide.chart}
          onChange={(chart) => patch({ chart })}
          readOnly={readOnly}
          testIdPrefix={`${testIdPrefix}-chart`}
        />
      )}

      {slide.layout === 'quote' && (
        <div className="flex flex-col gap-2">
          <FormField label="Quote">
            {(wiring) => (
              <Textarea
                {...wiring}
                rows={3}
                maxLength={MAX_QUOTE_CHARS}
                value={slide.quote?.text ?? ''}
                disabled={readOnly}
                onChange={(event) => patch({ quote: { text: event.target.value, by: slide.quote?.by ?? '' } })}
                data-testid={`${testIdPrefix}-quote-text`}
              />
            )}
          </FormField>
          <FormField label="Attributed to">
            {(wiring) => (
              <Input
                {...wiring}
                value={slide.quote?.by ?? ''}
                disabled={readOnly}
                onChange={(event) => patch({ quote: { text: slide.quote?.text ?? '', by: event.target.value } })}
                data-testid={`${testIdPrefix}-quote-by`}
              />
            )}
          </FormField>
        </div>
      )}

      {slide.layout === 'image' && (
        <FormField
          label="Image description"
          hint="An image slide is a framed caption until an asset pipeline puts bytes behind it."
        >
          {(wiring) => (
            <Input
              {...wiring}
              value={slide.image?.alt ?? ''}
              disabled={readOnly}
              onChange={(event) => patch({ image: { alt: event.target.value } })}
              data-testid={`${testIdPrefix}-image-alt`}
            />
          )}
        </FormField>
      )}

      {slide.layout === 'key-figures' && slide.figures && (
        <FiguresEditor
          figures={slide.figures}
          onChange={(figures) => patch({ figures })}
          readOnly={readOnly}
          testIdPrefix={`${testIdPrefix}-figures`}
        />
      )}

      {slide.layout === 'table' && slide.table && (
        <TableEditor
          table={slide.table}
          onChange={(table) => patch({ table })}
          readOnly={readOnly}
          testIdPrefix={`${testIdPrefix}-table`}
        />
      )}

      {slide.layout === 'comparison' && slide.comparison && (
        <ComparisonEditor
          comparison={slide.comparison}
          onChange={(comparison) => patch({ comparison })}
          readOnly={readOnly}
          testIdPrefix={`${testIdPrefix}-comparison`}
        />
      )}

      {slide.layout === 'timeline' && slide.timeline && (
        <TimelineEditor
          steps={slide.timeline}
          onChange={(timeline) => patch({ timeline })}
          readOnly={readOnly}
          testIdPrefix={`${testIdPrefix}-timeline`}
        />
      )}

      {slide.layout === 'agenda' && slide.agenda && (
        <AgendaEditor
          agenda={slide.agenda}
          onChange={(agenda) => patch({ agenda })}
          readOnly={readOnly}
          testIdPrefix={`${testIdPrefix}-agenda`}
        />
      )}

      {slide.layout === 'closing' && slide.closing && (
        <ClosingEditor
          closing={slide.closing}
          onChange={(closing) => patch({ closing })}
          readOnly={readOnly}
          testIdPrefix={`${testIdPrefix}-closing`}
        />
      )}

      {showNotes && <FormField label="Speaker notes" hint="Goes into the .pptx notes pane, not onto the slide.">
        {(wiring) => (
          <Textarea
            {...wiring}
            rows={3}
            maxLength={MAX_NOTES_CHARS}
            value={slide.notes ?? ''}
            disabled={readOnly}
            onChange={(event) => patch({ notes: event.target.value || undefined })}
            data-testid={`${testIdPrefix}-notes`}
          />
        )}
      </FormField>}

      {showSources && <SlideSources
        sources={slide.sources}
        onChange={(next) => patch({ sources: next })}
        options={sources}
        onSearchSources={onSearchSources}
        readOnly={readOnly}
        testIdPrefix={testIdPrefix}
      />}
    </div>
  );
}

export default SlideForm;
