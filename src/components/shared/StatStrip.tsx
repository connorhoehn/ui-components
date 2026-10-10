// StatStrip — a row of small stats in one card: the compact density variant
// of a KPIGrid of StatCards, for pages where the numbers are context rather
// than the content. Four StatCards spend ~110px of height on four numbers;
// this says the same in ~52px.
//
// Router-agnostic like the rest of the library: a cluster becomes clickable
// via `onSelect` (the host wires its router's navigate) or a plain `href`.

//
// 2.388.0 — a strip can also be a FLOW: `connectors` draws a labelled arrow
// between neighbouring clusters instead of a divider ("L0 89 → Compact → L1 22
// → Compact → L2 11 → Publish → Library 7"), and a cluster can carry a
// `status` line under its number ("● 50m behind", "● Stalled") and a native
// `title` tooltip for provenance a reader only needs on demand.

import { Fragment, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useDensitySize } from './Density';
import { TONE_SOLID_BG, TONE_TEXT, type Tone } from './tones';
import { ProgressBar } from './ProgressBar';

/** A cluster's health line: a tone dot and a short worded state. */
export interface StatStripStatus {
  label: string;
  /** Default `neutral` (secondary ink). */
  tone?: Tone;
}

export interface StatStripItem {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: 'default' | 'accent' | 'danger';
  /** A line under the value — "● 50m behind". Since 2.388.0. */
  status?: StatStripStatus | null;
  /** Native tooltip on the cluster (the full hint, provenance). Since 2.388.0. */
  title?: string;
  onSelect?: () => void;
  href?: string;
  /**
   * A thin bar under the cluster — "18 / 52 points delivered" with its fill.
   * Drawn only when `max` is above zero and `value` is finite (nothing is
   * drawn for "we do not know"). Since 2.390.0.
   */
  progress?: { value: number; max: number } | null;
  /**
   * `line` only (since 2.440.0): a small inline track drawn after the label
   * in place of the `progress` bar — a compact `WorkflowStepper` reading
   * "L1 ✓ — L2 ● — L3 ○" where a bar against a level ladder would be a
   * continuous reading of a stepped fact. Wins over `progress`.
   */
  track?: ReactNode;
}

/** A labelled arrow between two clusters — "Compact", "Publish". */
export interface StatStripConnector {
  label: string;
  /** Tints the arrow and its label. Default: tertiary ink. */
  tone?: Tone;
}

export interface StatStripProps {
  items: StatStripItem[];
  /**
   * Drop the strip's own border, rounding and fill so a host frame can
   * provide them — the same escape hatch DataTable has.
   *
   * The strip is a card by default, which is right when it sits on the page.
   * Inside another Card it reads as a card in a card: two nested rounded
   * boxes a few pixels apart, which is visual noise standing in for a
   * hierarchy that isn't there. The dividers between clusters stay, since
   * those separate the numbers from each other, not the strip from the page.
   */
  frameless?: boolean;
  /**
   * Since 2.388.0: `connectors[i]` is drawn between `items[i]` and
   * `items[i + 1]` as a labelled arrow, replacing the divider there. A strip
   * with connectors reads left to right as a flow. Extra entries are ignored;
   * a missing one leaves a plain gap.
   */
  connectors?: StatStripConnector[];
  /**
   * `default`: the label over a 17px value (a KPI card, compressed).
   * `inline` (since 2.390.0): the value then its label on ONE line, sentence
   * case — "**18** / 52 points delivered · **2** agents running · **$1.73**
   * spent of $95 allocated" — with dividers between clusters, no card, and a
   * rule under the strip. The label is the words after the number, so write
   * it as the rest of the sentence.
   *
   * `line` (since 2.392.0): ONE unboxed line of prose-weight stats, clusters
   * separated by a muted "•" — "**18** / 52 points delivered ▬▬▭▭ • **2**
   * agents running • **$1.73** of $95 spent". No dividers, no rule, no card;
   * a cluster's `progress` is drawn as a 150px bar INLINE after its label
   * rather than under it. `hint` and `status` are not drawn (use `title`).
   * The line wraps between clusters, never inside one.
   */
  variant?: 'default' | 'inline' | 'line';
  /**
   * `line` only. `md` (default): 16px semibold values over 15px labels. `sm`
   * (since 2.429.0): the app's body step — 14px semibold values and 14px
   * labels (`T size="sm"`) — for a stats line under a tab strip, where 15–16px
   * reads a size up from the 14px tabs.
   */
  size?: 'md' | 'sm';
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

const VALUE_TONE: Record<NonNullable<StatStripItem['tone']>, string> = {
  default: 'text-text-primary',
  accent: 'text-primary',
  danger: 'text-danger',
};

function ProgressLine({ progress, label }: { progress: StatStripItem['progress']; label: string }) {
  if (!progress || !(progress.max > 0) || !Number.isFinite(progress.value)) return null;
  return (
    <ProgressBar
      value={progress.value}
      max={progress.max}
      size="sm"
      aria-label={label}
      className="mt-2 max-w-[20rem]"
      data-testid="stat-strip-progress"
    />
  );
}

function InlineCluster({ item, first, last }: { item: StatStripItem; first: boolean; last: boolean }) {
  return (
    <div className={cn('min-w-0 py-3', first ? 'pl-0 pr-6' : 'px-6', last && !first && 'pr-0')} data-testid="stat-strip-cluster">
      <div className="flex min-w-0 items-baseline gap-1.5 whitespace-nowrap">
        <span className={cn('text-[17px] font-bold leading-6 tabular-nums', VALUE_TONE[item.tone ?? 'default'])}>{item.value}</span>
        <span className="min-w-0 truncate text-[15px] leading-6 text-text-secondary">{item.label}</span>
      </div>
      <ProgressLine progress={item.progress} label={item.label} />
      {item.hint != null && <div className="mt-0.5 truncate text-[12px] text-text-tertiary">{item.hint}</div>}
    </div>
  );
}

function LineCluster({ item, sm = false }: { item: StatStripItem; sm?: boolean }) {
  const bar = item.progress && item.progress.max > 0 && Number.isFinite(item.progress.value);
  return (
    <span className="flex min-w-0 items-center whitespace-nowrap" data-testid="stat-strip-cluster">
      <span className="flex min-w-0 items-baseline gap-1.5">
        <span className={cn('font-semibold tabular-nums', sm ? 'text-sm leading-5' : 'text-[16px] leading-6', VALUE_TONE[item.tone ?? 'default'])}>{item.value}</span>
        <span className={cn('min-w-0 truncate text-text-secondary', sm ? 'text-sm leading-5' : 'text-[15px] leading-6')}>{item.label}</span>
      </span>
      {item.track != null ? (
        <span className="ml-[18px] flex shrink-0 items-center" data-testid="stat-strip-track">{item.track}</span>
      ) : bar && (
        <ProgressBar
          value={item.progress!.value}
          max={item.progress!.max}
          size="sm"
          aria-label={item.label}
          className="ml-[18px] w-[150px] shrink-0"
          data-testid="stat-strip-progress"
        />
      )}
    </span>
  );
}

function Cluster({ item, flush }: { item: StatStripItem; flush?: 'start' | 'end' | 'both' }) {
  return (
    <div
      className={cn(
        'min-w-0 px-4 py-2.5',
        // A framed strip pads its own edges. A frameless one sits inside a
        // host that already did, so keeping the outer padding indents the
        // first number past everything else in that container — the exact
        // misalignment the frame was hiding.
        (flush === 'start' || flush === 'both') && 'pl-0',
        (flush === 'end' || flush === 'both') && 'pr-0',
      )}
    >
      <div className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">
        {item.label}
      </div>
      <div className="mt-0.5 flex min-w-0 items-baseline gap-2">
        <span className={cn('text-[17px] font-bold leading-none tabular-nums', VALUE_TONE[item.tone ?? 'default'])}>
          {item.value}
        </span>
        {item.hint != null && (
          <span className="min-w-0 truncate text-[11px] text-text-tertiary">{item.hint}</span>
        )}
      </div>
      {item.status && (
        <div className="mt-1 flex min-w-0 items-center gap-1.5 text-[12px]" data-testid="stat-strip-status">
          <span aria-hidden="true" className={cn('inline-block h-2 w-2 shrink-0 rounded-full', TONE_SOLID_BG[item.status.tone ?? 'neutral'])} />
          <span className={cn('min-w-0 truncate', item.status.tone && item.status.tone !== 'neutral' ? TONE_TEXT[item.status.tone] : 'text-text-secondary')}>
            {item.status.label}
          </span>
        </div>
      )}
      <ProgressLine progress={item.progress} label={item.label} />
    </div>
  );
}

function Connector({ connector }: { connector: StatStripConnector | undefined }) {
  const tone = connector?.tone;
  return (
    <div
      className={cn(
        'flex shrink-0 flex-col items-center justify-center gap-1 self-center px-1',
        tone ? TONE_TEXT[tone] : 'text-text-tertiary',
      )}
      data-testid="stat-strip-connector"
    >
      <svg aria-hidden="true" width="56" height="8" viewBox="0 0 56 8" className="block">
        <line x1="0" y1="4" x2="50" y2="4" stroke="currentColor" strokeWidth="1.25" />
        <path d="M49 0.5 L55 4 L49 7.5 Z" fill="currentColor" />
      </svg>
      {connector?.label && <span className="whitespace-nowrap text-[11px] leading-none">{connector.label}</span>}
    </div>
  );
}

export function StatStrip({
  items,
  frameless = false,
  connectors,
  variant = 'default',
  size: sizeProp,
  className,
  'aria-label': ariaLabel,
  'data-testid': testId,
}: StatStripProps) {
  const size = useDensitySize('StatStrip', sizeProp, { comfortable: 'md', compact: 'sm' });
  const flow = !!connectors && connectors.length > 0;
  if (variant === 'line') {
    return (
      <div
        role="group"
        data-variant="line"
        {...(size === 'sm' ? { 'data-size': 'sm' } : {})}
        className={cn('flex min-w-0 flex-wrap items-center gap-y-1', className)}
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
        {...(testId ? { 'data-testid': testId } : {})}
      >
        {items.map((item, i) => {
          const tip = item.title ? { title: item.title } : {};
          const inner = <LineCluster item={item} sm={size === 'sm'} />;
          let cluster: ReactNode;
          if (item.href) {
            cluster = <a href={item.href} className="min-w-0 rounded no-underline hover:underline" {...tip}>{inner}</a>;
          } else if (item.onSelect) {
            cluster = (
              <button type="button" onClick={item.onSelect} className="min-w-0 cursor-pointer rounded border-none bg-transparent p-0 text-left hover:underline" {...tip}>
                {inner}
              </button>
            );
          } else {
            cluster = <span className="min-w-0" {...tip}>{inner}</span>;
          }
          return (
            <Fragment key={item.label}>
              {i > 0 && (
                <span aria-hidden="true" className={cn('mx-5 text-text-secondary', size === 'sm' ? 'text-sm leading-5' : 'text-[15px] leading-6')} data-testid="stat-strip-separator">•</span>
              )}
              {cluster}
            </Fragment>
          );
        })}
      </div>
    );
  }
  if (variant === 'inline') {
    return (
      <div
        role="group"
        data-variant="inline"
        className={cn('flex items-center divide-x divide-border overflow-x-auto border-b border-border pb-1', className)}
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
        {...(testId ? { 'data-testid': testId } : {})}
      >
        {items.map((item, i) => {
          const tip = item.title ? { title: item.title } : {};
          const inner = <InlineCluster item={item} first={i === 0} last={i === items.length - 1} />;
          if (item.href) {
            return <a key={item.label} href={item.href} className="min-w-0 flex-1 no-underline hover:bg-surface-hover" {...tip}>{inner}</a>;
          }
          if (item.onSelect) {
            return (
              <button key={item.label} type="button" onClick={item.onSelect} className="min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left hover:bg-surface-hover" {...tip}>
                {inner}
              </button>
            );
          }
          return <div key={item.label} className="min-w-0 flex-1" {...tip}>{inner}</div>;
        })}
      </div>
    );
  }
  return (
    <div
      role="group"
      className={cn(
        'flex overflow-x-auto',
        flow ? 'items-stretch' : 'divide-x divide-border',
        !frameless && 'rounded-lg border border-border bg-surface',
        className,
      )}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
      {...(testId ? { 'data-testid': testId } : {})}
    >
      {items.map((item, i) => {
        // Only the OUTER edges go flush, and only when frameless: the padding
        // between clusters is what keeps the dividers from crowding numbers.
        const flush = !frameless
          ? undefined
          : items.length === 1
            ? ('both' as const)
            : i === 0
              ? ('start' as const)
              : i === items.length - 1
                ? ('end' as const)
                : undefined;
        const tip = item.title ? { title: item.title } : {};
        let cluster: ReactNode;
        if (item.href) {
          cluster = (
            <a href={item.href} className="min-w-0 flex-1 no-underline transition-colors hover:bg-surface-hover" {...tip}>
              <Cluster item={item} flush={flush} />
            </a>
          );
        } else if (item.onSelect) {
          cluster = (
            <button
              type="button"
              onClick={item.onSelect}
              className="min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left transition-colors hover:bg-surface-hover"
              {...tip}
            >
              <Cluster item={item} flush={flush} />
            </button>
          );
        } else {
          cluster = (
            <div className="min-w-0 flex-1" {...tip}>
              <Cluster item={item} flush={flush} />
            </div>
          );
        }
        return (
          <Fragment key={item.label}>
            {cluster}
            {flow && i < items.length - 1 && <Connector connector={connectors![i]} />}
          </Fragment>
        );
      })}
    </div>
  );
}

export default StatStrip;
