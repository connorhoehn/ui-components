// RecordGraphCard — a record graph as a card inside a chat / answer view:
// a one-row summary ("Connections · 25 records · 31 connections" with the
// selection's marks) that expands inline to the full `RecordGraph`, and an
// "Open graph ↗" action that sends the host to its own Connections view.
// Since 2.405.2.
//
// Why a card: an answer view that swaps to the graph loses the conversation,
// and one that draws the graph inline at full height pushes the conversation
// off screen. Collapsed the card is one row; expanded it is a fixed-height
// canvas (`height`), so the conversation below it stays put.
//
// The host owns the records, edges, selection, the expanded state (or lets
// the card hold it) and navigation; the card owns the summary and the frame.

import { useMemo, useState } from 'react';
import { cn } from '../../lib/cn';
import { RecordGraph } from '../graph/RecordGraph';
import { recordGraphKey, type RecordGraphEdge, type RecordGraphRecord } from '../graph/recordGraphLayout';
import { T } from '../shared/Text';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ChevronIcon, ExternalLinkIcon, GraphIcon } from '../ui/Icons';
import { Inline } from '../ui/Stack';
import { RecordMark } from './recordMarks';

/** How many marks the collapsed header draws before "+N". */
const MAX_MARKS = 6;

export interface RecordGraphCardProps {
  records: RecordGraphRecord[];
  /** `source`/`target` are `type:id` keys (`recordGraphKey`). */
  edges: RecordGraphEdge[];
  /**
   * Selected `type:id` keys, shared with the host's other views. The
   * collapsed header shows these records' marks (else the best-connected
   * records); the expanded graph frames them (`focusKeys`).
   */
  selectedKeys?: string[];
  /** The card's heading. Default "Connections". */
  title?: string;
  /** The line after the title. Default "N records · M connections". */
  summary?: string;
  /** Controlled expanded state. Omit to let the card hold it (starts collapsed). */
  expanded?: boolean;
  onToggleExpanded?: (next: boolean) => void;
  /** "Open graph ↗" — the host switches to its full Connections view. Omitted, no button. */
  onOpen?: () => void;
  /** Selection changes from the expanded graph. Omitted, the card holds the selection itself. */
  onSelectionChange?: (keys: string[]) => void;
  /** "Open record ↗" in the expanded graph while one record is selected. */
  onOpenRecord?: (record: RecordGraphRecord) => void;
  /** "Ask about selection →" in the expanded graph. Omitted, no button. */
  onAskSelection?: () => void;
  /** The expanded canvas's height in px (the graph's toolbar included). Default 320. */
  height?: number;
  className?: string;
  'data-testid'?: string;
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** "25 records · 31 connections". Exported for hosts that echo it. */
export function recordGraphSummary(records: number, connections: number): string {
  return `${plural(records, 'record', 'records')} · ${plural(connections, 'connection', 'connections')}`;
}

export function RecordGraphCard({
  records,
  edges,
  selectedKeys,
  title = 'Connections',
  summary,
  expanded: controlledExpanded,
  onToggleExpanded,
  onOpen,
  onSelectionChange,
  onOpenRecord,
  onAskSelection,
  height = 320,
  className,
  'data-testid': testId = 'record-graph-card',
}: RecordGraphCardProps) {
  const [ownExpanded, setOwnExpanded] = useState(false);
  const [ownSelection, setOwnSelection] = useState<string[]>([]);
  const expanded = controlledExpanded ?? ownExpanded;
  const selection = selectedKeys ?? ownSelection;

  const byKey = useMemo(() => new Map(records.map((r) => [recordGraphKey(r), r])), [records]);
  // Only edges between records the card holds count as connections.
  const liveEdges = useMemo(() => edges.filter((e) => byKey.has(e.source) && byKey.has(e.target)), [edges, byKey]);
  const hasConnections = liveEdges.length > 0;

  // The marks: the selection when there is one, else the best-connected records.
  const marks = useMemo(() => {
    const selected = selection.map((k) => byKey.get(k)).filter((r): r is RecordGraphRecord => !!r);
    if (selected.length) return selected;
    const degree = new Map<string, number>();
    for (const e of liveEdges) {
      degree.set(e.source, (degree.get(e.source) ?? 0) + 1);
      degree.set(e.target, (degree.get(e.target) ?? 0) + 1);
    }
    return [...degree.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([k]) => byKey.get(k)!)
      .filter(Boolean);
  }, [selection, byKey, liveEdges]);
  const shown = marks.slice(0, MAX_MARKS);
  const more = marks.length - shown.length;

  const toggle = () => {
    const next = !expanded;
    if (controlledExpanded === undefined) setOwnExpanded(next);
    onToggleExpanded?.(next);
  };
  const changeSelection = (keys: string[]) => {
    if (selectedKeys === undefined) setOwnSelection(keys);
    onSelectionChange?.(keys);
  };

  const line = hasConnections ? (summary ?? recordGraphSummary(records.length, liveEdges.length)) : 'No recorded connections';
  const open = expanded && hasConnections;
  // The canvas height is the host's number — a runtime value no class can carry.
  const canvasSize = { height };

  return (
    <Card
      data-testid={testId}
      data-expanded={open ? 'true' : 'false'}
      role="region"
      aria-label={title}
      className={cn('flex min-w-0 flex-col', className)}
    >
      <Inline gap="sm" align="center" wrap={false} className="min-h-12 px-3 py-2" data-testid={`${testId}-header`}>
        <span aria-hidden="true" className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary">
          <GraphIcon size={16} />
        </span>
        <T as="span" className="shrink-0 text-sm font-semibold text-text-primary">{title}</T>
        <T as="span" className="min-w-0 truncate text-xs text-text-secondary" data-testid={`${testId}-summary`}>{line}</T>
        {hasConnections && shown.length > 0 && (
          <Inline
            gap="none"
            align="center"
            wrap={false}
            className="shrink-0 -space-x-1.5"
            role="list"
            aria-label={selection.length ? 'Selected records' : 'Most connected records'}
            data-testid={`${testId}-marks`}
          >
            {shown.map((r) => (
              <span key={recordGraphKey(r)} role="listitem" title={r.title} className="inline-flex rounded-full ring-2 ring-surface">
                <RecordMark record={r} size={22} />
                <span className="sr-only">{r.title}</span>
              </span>
            ))}
            {more > 0 && <T as="span" className="pl-2.5 text-xs text-text-tertiary">+{more}</T>}
          </Inline>
        )}
        <Inline gap="xs" align="center" wrap={false} className="ml-auto shrink-0">
          {hasConnections && (
            <Button size="sm" variant="ghost" aria-expanded={open} onClick={toggle} data-testid={`${testId}-toggle`}>
              {open ? 'Collapse' : 'Expand'}
              <ChevronIcon size={14} dir={open ? 'up' : 'down'} aria-hidden="true" />
            </Button>
          )}
          {onOpen && (
            <Button size="sm" variant="secondary" onClick={onOpen} data-testid={`${testId}-open`}>
              Open graph
              <ExternalLinkIcon size={14} aria-hidden="true" />
            </Button>
          )}
        </Inline>
      </Inline>
      {open && (
        <div className="flex min-h-0 flex-col border-t border-border px-2" style={canvasSize} data-testid={`${testId}-canvas`}>
          <RecordGraph
            records={records}
            edges={edges}
            selectedKeys={selection}
            focusKeys={selection}
            onSelectionChange={changeSelection}
            {...(onAskSelection ? { onAskSelection } : {})}
            {...(onOpenRecord ? { onOpenRecord } : {})}
            aria-label={`${title} graph`}
            data-testid={`${testId}-graph`}
          />
        </div>
      )}
    </Card>
  );
}

export default RecordGraphCard;
