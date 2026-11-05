// Fuzzy jump across the lab — tmux's `choose-tree`, and the reason the rail
// is optional rather than load-bearing.
//
// Ad-hoc fleet work is typing-shaped: you know the box you want by name and
// you want to be in it before you have finished thinking about it. Reaching
// for a sidebar breaks that, and at twelve boxes the sidebar is a scroll.
//
// Two things are searchable at once and they are not the same: PANES (already
// on screen — jumping is free) and COMPUTERS (not on screen — arriving costs
// a pane). Panes sort first because the cheap answer should be the default
// one, and each row says which it is so ⏎ is never a surprise.

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';
import { StatusDot } from '../../shared/StatusDot';
import Chip from '../../shared/Chip';
import { COMPUTE_STATUS, statusOf } from '../lib/status';
import { chromeVarsFor, type ChromeTone } from '../lib/chromeTokens';
import type { PaneLeaf } from '../lib/paneTree';
import { ProjectSummary } from './ProjectSummary';
import type { ProjectRollup } from '../hooks/useComputeProjects';
import type { Computer } from '../types';

export type ChooserRow =
  | { kind: 'pane'; id: string; pane: PaneLeaf; computer: Computer }
  | { kind: 'computer'; id: string; computer: Computer }
  | { kind: 'project'; id: string; project: ProjectRollup };

export interface LabChooserProps {
  open: boolean;
  onClose: () => void;
  computers: Computer[];
  panes: PaneLeaf[];
  /** Jump focus to a pane already on screen. */
  onJumpToPane: (paneId: string) => void;
  /** Bind the focused pane to this computer — the cheap "look at that" move. */
  onRetarget: (computer: Computer) => void;
  /** Open in a new split — the "watch both" move. Bound to ⇧⏎. */
  onOpenInSplit: (computer: Computer) => void;
  /**
   * Projects, so the chooser answers "take me to that project's computers"
   * and not only "take me to that box". Omit where there are none.
   */
  projects?: readonly ProjectRollup[];
  /** Focus a project's first computer, or offer to make one if it has none. */
  onSelectProject?: (project: ProjectRollup) => void;
  /**
   * Which palette the chooser card paints in. `code` (default) keeps the
   * terminal family; `app` re-points it at the host's tokens, the way the
   * lab's own chrome does — see `../lib/chromeTokens`.
   *
   * The scrim is NOT affected either way. It covers the panes as well as the
   * chrome, and a light film over a terminal dims nothing.
   */
  chrome?: ChromeTone;
}

/**
 * Subsequence match, the thing every fuzzy finder actually does.
 *
 * `dba` matches `demo-bravo`. Returns a score where lower is better, so a
 * prefix match beats a match scattered across the whole string — otherwise
 * `demo-alpha` and `demo-bravo` are equally good answers to `da` and the
 * order is whatever the array happened to be in.
 */
export function fuzzyScore(text: string, query: string): number | null {
  if (!query) return 0;
  const haystack = text.toLowerCase();
  const needle = query.toLowerCase();
  let index = 0;
  let score = 0;
  let previous = -1;
  for (const char of needle) {
    const found = haystack.indexOf(char, index);
    if (found < 0) return null;
    // Gaps cost; adjacency is free. A run of consecutive characters is what
    // makes a match feel like the word you typed.
    score += previous >= 0 ? found - previous - 1 : found;
    previous = found;
    index = found + 1;
  }
  return score;
}

export function LabChooser({
  open, onClose, computers, panes, onJumpToPane, onRetarget, onOpenInSplit,
  projects = [], onSelectProject, chrome: chromeTone = 'code',
}: LabChooserProps) {
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const byId = useMemo(() => new Map(computers.map((c) => [c.id, c])), [computers]);

  const rows = useMemo<ChooserRow[]>(() => {
    const paneRows: Array<{ row: ChooserRow; score: number }> = [];
    for (const pane of panes) {
      const computer = byId.get(pane.computerId);
      if (!computer) continue;
      const score = fuzzyScore(`${computer.label} ${pane.kindId}`, query);
      if (score == null) continue;
      paneRows.push({ row: { kind: 'pane', id: `pane:${pane.id}`, pane, computer }, score });
    }

    const onScreen = new Set(panes.map((p) => p.computerId));
    const computerRows: Array<{ row: ChooserRow; score: number }> = [];
    for (const computer of computers) {
      // A box already in a pane is reachable as a pane; listing it twice
      // makes the top of the list a set of duplicates.
      if (onScreen.has(computer.id)) continue;
      const score = fuzzyScore(`${computer.label} ${computer.sessionId}`, query);
      if (score == null) continue;
      computerRows.push({ row: { kind: 'computer', id: `box:${computer.id}`, computer }, score });
    }

    // Projects last, and only when searching: unprompted they would push the
    // panes — the cheap answer — below the fold. Searching by name is exactly
    // when you want them, which is the "find the project" case.
    const projectRows: Array<{ row: ChooserRow; score: number }> = [];
    // Only once there is a query. An empty query matches everything (score 0),
    // so without this gate every project is listed unprompted and pushes the
    // panes — the cheap answer — below the fold.
    if (onSelectProject && query.trim()) {
      for (const project of projects) {
        const score = fuzzyScore(project.name, query);
        if (score == null) continue;
        projectRows.push({ row: { kind: 'project', id: `proj:${project.id}`, project }, score });
      }
    }

    const byScore = (a: { score: number }, b: { score: number }) => a.score - b.score;
    return [
      ...paneRows.sort(byScore),
      ...computerRows.sort(byScore),
      ...projectRows.sort(byScore),
    ].map((r) => r.row);
  }, [panes, computers, byId, query, projects, onSelectProject]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setHighlight(0);
      // Deferred: the overlay has to exist before it can take focus, and
      // stealing it in the same tick lands on whatever was there before.
      const timer = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    setHighlight((h) => Math.min(h, Math.max(0, rows.length - 1)));
  }, [rows.length]);

  // Keep the highlighted row on screen when arrowing past the fold.
  useEffect(() => {
    listRef.current?.querySelector('[data-highlighted="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [highlight]);

  if (!open) return null;

  const commit = (row: ChooserRow | undefined, split: boolean) => {
    if (!row) return;
    if (row.kind === 'project') onSelectProject?.(row.project);
    else if (row.kind === 'pane') onJumpToPane(row.pane.id);
    else if (split) onOpenInSplit(row.computer);
    else onRetarget(row.computer);
    onClose();
  };

  return (
    <div
      className="absolute inset-0 z-20 flex items-start justify-center pt-[12vh] bg-code-bg/70"
      onClick={onClose}
    >
      <div
        style={chromeVarsFor(chromeTone)}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Jump to a computer, pane or project"
        className="w-[480px] max-w-[92vw] rounded-lg border border-code-border bg-code-panel overflow-hidden font-mono shadow-2xl"
      >
        <div className="flex items-center gap-2 px-3 py-2 border-b border-code-border">
          <span aria-hidden="true" className="text-code-green text-[12px]">/</span>
          <input
            data-ui-part=""
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(0);
            }}
            onKeyDown={(e) => {
              // Handled here rather than on window: this input has focus, and
              // a second global listener would double-step the highlight.
              if (e.key === 'ArrowDown' || (e.key === 'n' && e.ctrlKey)) {
                e.preventDefault();
                setHighlight((h) => (rows.length ? (h + 1) % rows.length : 0));
              } else if (e.key === 'ArrowUp' || (e.key === 'p' && e.ctrlKey)) {
                e.preventDefault();
                setHighlight((h) => (rows.length ? (h - 1 + rows.length) % rows.length : 0));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                commit(rows[highlight], e.shiftKey);
              } else if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
              }
            }}
            placeholder="jump to a computer, pane or project…"
            aria-label="Filter computers, panes and projects"
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-[12px] text-code-text placeholder:text-code-raised"
          />
          <span className="text-[10px] text-code-raised shrink-0 hidden sm:inline">⏎ jump · ⇧⏎ split</span>
        </div>

        <div ref={listRef} role="listbox" data-ui-listbox="lab-chooser" aria-label="Results" className="max-h-[46vh] overflow-y-auto">
          {rows.length === 0 ? (
            <div className="px-3 py-4 text-[11px] text-code-raised">nothing matches “{query}”</div>
          ) : (
            rows.map((row, index) => {
              const selected = index === highlight;

              if (row.kind === 'project') {
                return (
                  <div
                    key={row.id}
                    role="option"
                    aria-selected={selected}
                    data-highlighted={selected}
                    onMouseEnter={() => setHighlight(index)}
                    onClick={() => commit(row, false)}
                    className={cn(
                      'flex flex-col gap-0.5 px-3 py-1.5 cursor-pointer border-l-2',
                      selected ? 'bg-code-surface border-code-mauve' : 'bg-transparent border-transparent',
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Chip size="xs" mono tone="accent" className="shrink-0">project</Chip>
                      <span className={cn('text-[12px] truncate', selected ? 'text-code-text' : 'text-code-subtle')}>
                        {row.project.name}
                      </span>
                    </div>
                    <ProjectSummary project={row.project} showMeter={false} className="pl-1" />
                  </div>
                );
              }

              const status = statusOf(row.computer);
              const meta = COMPUTE_STATUS[status];
              return (
                <div
                  key={row.id}
                  role="option"
                  aria-selected={selected}
                  data-highlighted={selected}
                  onMouseEnter={() => setHighlight(index)}
                  onClick={(e) => commit(row, e.shiftKey)}
                  // Same left rule the project rows already carry. A tinted
                  // background alone is the whole selection cue, and on the app
                  // palette that tint is `surface-hover` on `surface-panel` —
                  // two greys four percent apart. The rule reads at any
                  // contrast, and it makes both row shapes indicate the same
                  // way, which they did not before.
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 cursor-pointer border-l-2',
                    selected ? 'bg-code-surface border-code-blue' : 'bg-transparent border-transparent',
                  )}
                >
                  <StatusDot size="xs" color={meta.color} pulse={meta.pulse} aria-label={meta.label} />
                  <span className={cn('text-[12px] truncate', selected ? 'text-code-text' : 'text-code-subtle')}>
                    {row.computer.label}
                  </span>
                  <span className="flex-1" />
                  {row.kind === 'pane' ? (
                    <Chip size="xs" mono tone="info" className="shrink-0">
                      on screen · {row.pane.kindId}
                    </Chip>
                  ) : (
                    <Chip size="xs" mono tone={meta.tone} className="bg-transparent px-0 shrink-0">
                      {meta.label}
                    </Chip>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
