// The citations on one slide, and the Documents-explorer search that adds them.
//
// This is the control the whole editor is built around. The generator is
// grounded: a slide names the documents its claims came from, and a slide that
// names none is refused server-side. So this is not a metadata field tucked
// into an "advanced" disclosure — it sits under every slide's form with a
// warning when it is empty, and the Save button watches it.
//
// The chips are `ComposerReferences`, the same component the chat composer
// uses for what a draft points AT, and for the same reason: a citation and a
// message reference are the same object wearing different words, and having
// two chip rows in one product means having two that drift.
//
// Results come from the HOST's `onSearchSources`, which is the Documents page
// explorer's own search. What a person picks here is what the generator cites,
// so the two lists must be the same list — a picker with its own index would
// eventually offer a document the generator cannot read.

import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import { Button } from '../../ui/Button';
import ComposerReferences, { type ComposerReference } from '../../social/ComposerReferences';
import InlineAlert from '../../shared/InlineAlert';
import SearchInput from '../../shared/SearchInput';
import { SectionLabel } from '../../shared/SectionLabel';
import { Text } from '../../shared/Text';
import { MAX_SOURCES_PER_SLIDE, type DeckSource } from './deckSpec';

/** One row the host's Documents search can return. */
export interface PresentationSourceOption {
  documentId: string;
  title: string;
  /** How the host would open it — a document page, or a recording transcript. */
  kind?: 'document' | 'transcript';
}

export interface SlideSourcesProps {
  /** The citations already on the slide. */
  sources: readonly DeckSource[];
  onChange: (sources: DeckSource[]) => void;
  /**
   * What the deck already has to hand — the run's own inputs. Offered before
   * anything is typed, because the slide's source is nearly always one of
   * them.
   */
  options: readonly PresentationSourceOption[];
  /** The Documents explorer's search. Absent, only `options` can be picked. */
  onSearchSources?: (query: string) => PresentationSourceOption[] | Promise<PresentationSourceOption[]>;
  readOnly?: boolean;
  /**
   * One line: the chips and a small "Add source" button that opens the
   * search. For the editor's agent layout, where the slide's form is folded
   * away but its citations cannot be — Save depends on them. Default false.
   */
  compact?: boolean;
  testIdPrefix: string;
}

const KIND_ICON: Record<'document' | 'transcript', string> = {
  document: '📄',
  transcript: '🎙️',
};

export function SlideSources({
  sources,
  onChange,
  options,
  onSearchSources,
  readOnly = false,
  compact = false,
  testIdPrefix,
}: SlideSourcesProps) {
  const [query, setQuery] = useState('');
  // Compact mode's search is behind a button; the full mode always shows it.
  const [picking, setPicking] = useState(false);
  const [results, setResults] = useState<readonly PresentationSourceOption[]>(options);
  const labelId = useId();
  // Guards against a slower earlier search landing after a faster later one
  // and repainting the list with stale rows.
  const requestRef = useRef(0);

  useEffect(() => {
    const trimmed = query.trim();
    if (!onSearchSources) {
      const q = trimmed.toLowerCase();
      setResults(q ? options.filter((option) => option.title.toLowerCase().includes(q)) : options);
      return;
    }
    const ticket = ++requestRef.current;
    let cancelled = false;
    void Promise.resolve(onSearchSources(trimmed))
      .then((next) => {
        if (cancelled || ticket !== requestRef.current) return;
        setResults(next);
      })
      .catch(() => {
        // A search that failed shows the inputs it already had rather than an
        // empty list, which would read as "no such document".
        if (!cancelled && ticket === requestRef.current) setResults(options);
      });
    return () => { cancelled = true; };
  }, [query, onSearchSources, options]);

  const chips: ComposerReference[] = sources.map((source) => ({
    id: `${source.documentId}${source.anchor ? `#${source.anchor}` : ''}`,
    label: source.anchor ? `${source.title} · ${source.anchor}` : source.title,
    icon: '📄',
    title: source.title,
  }));

  const atCap = sources.length >= MAX_SOURCES_PER_SLIDE;

  const add = (option: PresentationSourceOption) => {
    if (atCap) return;
    if (sources.some((source) => source.documentId === option.documentId && !source.anchor)) return;
    onChange([...sources, { documentId: option.documentId, title: option.title }]);
    setQuery('');
    setPicking(false);
  };

  const remove = (chipId: string) => {
    onChange(
      sources.filter(
        (source) => `${source.documentId}${source.anchor ? `#${source.anchor}` : ''}` !== chipId,
      ),
    );
  };

  const chipRow = (
    <ComposerReferences
      references={chips}
      onRemove={readOnly ? undefined : remove}
      removeLabel={(reference) => `Remove source ${reference.label}`}
      className="px-0 py-0"
      data-testid={`${testIdPrefix}-source-chips`}
    />
  );

  const search = (
    <div className="flex flex-col gap-1">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search your documents and transcripts…"
        aria-label="Search sources"
        data-testid={`${testIdPrefix}-source-search`}
      />
      {atCap ? (
        <Text className="text-[11px] text-text-tertiary">
          {`A slide cites at most ${MAX_SOURCES_PER_SLIDE} sources.`}
        </Text>
      ) : results.length === 0 ? (
        <Text
          className="text-[11px] text-text-tertiary"
          data-testid={`${testIdPrefix}-source-no-results`}
        >
          Nothing matches that. Sources come from the Documents explorer.
        </Text>
      ) : (
        <ul
          aria-labelledby={labelId}
          className="m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0"
          data-testid={`${testIdPrefix}-source-results`}
        >
          {results.slice(0, 20).map((option) => {
            const already = sources.some((source) => source.documentId === option.documentId);
            return (
              <li key={option.documentId}>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  disabled={already}
                  onClick={() => add(option)}
                  data-testid={`${testIdPrefix}-source-option-${option.documentId}`}
                  className={cn('justify-start border-none text-left')}
                >
                  <span className="mr-1.5" aria-hidden="true">{KIND_ICON[option.kind ?? 'document']}</span>
                  <span className="truncate">{option.title}</span>
                  {already && <span className="ml-1.5 text-xs text-text-tertiary">added</span>}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  if (compact) {
    return (
      <div className="flex flex-col gap-1.5" data-testid={`${testIdPrefix}-sources`}>
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <SectionLabel as="div">
            <span id={labelId}>Sources</span>
          </SectionLabel>
          {sources.length === 0 ? (
            <Text
              as="span"
              className="text-[12px] font-semibold text-danger-fg"
              data-testid={`${testIdPrefix}-sources-warning`}
            >
              None yet — this slide needs one before Save.
            </Text>
          ) : (
            <div className="min-w-0">{chipRow}</div>
          )}
          {!readOnly && (
            <Button
              variant="ghost"
              size="sm"
              aria-expanded={picking}
              disabled={atCap && !picking}
              onClick={() => { setPicking((open) => !open); setQuery(''); }}
              data-testid={`${testIdPrefix}-add-source`}
            >
              {picking ? 'Done' : '+ Add source'}
            </Button>
          )}
        </div>
        {!readOnly && picking && search}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5" data-testid={`${testIdPrefix}-sources`}>
      <SectionLabel as="div">
        <span id={labelId}>Sources used</span>
      </SectionLabel>

      {sources.length === 0 ? (
        <InlineAlert tone="warning" data-testid={`${testIdPrefix}-sources-warning`}>
          This slide cites nothing. Every slide names at least one source — add one before saving.
        </InlineAlert>
      ) : (
        chipRow
      )}

      {!readOnly && search}
    </div>
  );
}

export default SlideSources;
