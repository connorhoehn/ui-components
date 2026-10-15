// DiffViewer — a unified git diff, rendered for review.
//
// The reviewer's contract: parse real `git diff` output (the only input this
// accepts) into files and hunks, and render it the way a person reviews —
// per-file sections with counts, dual line-number gutters, collapse for the
// files you've finished with, and a file strip up top so a 14-file change is
// navigated, not scrolled.
//
// Annotations are the second half. A review pipeline that flags "file X line
// 40" produces exactly the shape reviewers already know from code review:
// a note pinned under the line it is about. Callers pass findings; this
// component anchors each one after the matching new-side line (file-level
// notes, or lines the diff doesn't contain, render at the top of the file's
// section — a finding must never be silently dropped).
//
// Theme-aware by construction: every colour is a design token, so the same
// diff reads correctly in day and night. No hard-coded terminal palette.

import { useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Chip from './Chip';

export interface DiffAnnotation {
  /** Path as it appears in the diff (new side). */
  file: string;
  /** New-side line number. Omit for a file-level note. */
  line?: number;
  severity?: 'critical' | 'warning' | 'info';
  note: string;
  /** Who said it — a reviewer model, a person. */
  author?: string;
}

export interface DiffViewerProps {
  /** Unified diff — real `git diff` output. */
  diff: string;
  annotations?: readonly DiffAnnotation[];
  /** Start with every file collapsed (big changes). Default false. */
  defaultCollapsed?: boolean;
  /** Hard cap on rendered lines per file, beyond which the file truncates. */
  maxLinesPerFile?: number;
  /** Note rendered when the caller knows the diff itself was truncated upstream. */
  truncatedNote?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

// ── Parsing ─────────────────────────────────────────────────────────────────

export interface DiffLine {
  kind: 'add' | 'del' | 'ctx' | 'hunk';
  text: string;
  oldNo: number | null;
  newNo: number | null;
}

export interface DiffFile {
  path: string;
  oldPath: string | null;
  status: 'added' | 'deleted' | 'renamed' | 'modified';
  adds: number;
  dels: number;
  lines: DiffLine[];
  binary: boolean;
}

const HUNK_RE = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/;

/** Parse unified git diff output. Exported for tests and for hosts that need
 *  the file list without rendering. */
export function parseUnifiedDiff(diff: string): DiffFile[] {
  const files: DiffFile[] = [];
  let cur: DiffFile | null = null;
  let oldNo = 0;
  let newNo = 0;

  for (const raw of diff.split('\n')) {
    if (raw.startsWith('diff --git ')) {
      // `diff --git a/x b/y` — y is the new path (rename-aware).
      const m = raw.match(/^diff --git a\/(.*) b\/(.*)$/);
      cur = {
        path: m?.[2] ?? raw.slice('diff --git '.length),
        oldPath: m && m[1] !== m[2] ? m[1] : null,
        status: m && m[1] !== m[2] ? 'renamed' : 'modified',
        adds: 0, dels: 0, lines: [], binary: false,
      };
      files.push(cur);
      continue;
    }
    if (!cur) continue;
    if (raw.startsWith('new file mode')) { cur.status = 'added'; continue; }
    if (raw.startsWith('deleted file mode')) { cur.status = 'deleted'; continue; }
    if (raw.startsWith('Binary files ')) { cur.binary = true; continue; }
    if (raw.startsWith('index ') || raw.startsWith('--- ') || raw.startsWith('+++ ')
      || raw.startsWith('similarity index') || raw.startsWith('rename from') || raw.startsWith('rename to')) {
      continue;
    }
    const hunk = raw.match(HUNK_RE);
    if (hunk) {
      oldNo = parseInt(hunk[1]!, 10);
      newNo = parseInt(hunk[2]!, 10);
      cur.lines.push({ kind: 'hunk', text: raw, oldNo: null, newNo: null });
      continue;
    }
    if (cur.lines.length === 0) continue; // preamble noise before the first hunk
    if (raw.startsWith('+')) {
      cur.lines.push({ kind: 'add', text: raw.slice(1), oldNo: null, newNo: newNo++ });
      cur.adds++;
    } else if (raw.startsWith('-')) {
      cur.lines.push({ kind: 'del', text: raw.slice(1), oldNo: oldNo++, newNo: null });
      cur.dels++;
    } else if (raw.startsWith('\\')) {
      // "\ No newline at end of file" — metadata, not content.
      continue;
    } else {
      cur.lines.push({ kind: 'ctx', text: raw.startsWith(' ') ? raw.slice(1) : raw, oldNo: oldNo++, newNo: newNo++ });
    }
  }
  return files;
}

// ── Rendering ───────────────────────────────────────────────────────────────

const STATUS_TONE = { added: 'success', deleted: 'danger', renamed: 'info', modified: 'neutral' } as const;
const SEVERITY_TONE = { critical: 'danger', warning: 'warning', info: 'info' } as const;

const LINE_BG: Record<DiffLine['kind'], string> = {
  add: 'bg-success-bg/40',
  del: 'bg-danger-bg/40',
  ctx: '',
  hunk: 'bg-surface-hover',
};

function AnnotationRow({ a }: { a: DiffAnnotation }) {
  return (
    <div className="flex items-start gap-2 px-3 py-2 border-y border-border bg-surface-panel">
      <Chip tone={SEVERITY_TONE[a.severity ?? 'info']} size="xs" uppercase>{a.severity ?? 'note'}</Chip>
      <div className="min-w-0">
        <span className="text-[12px] text-text-primary leading-snug">{a.note}</span>
        {a.author && <span className="ml-2 text-xs text-text-tertiary whitespace-nowrap">— {a.author}</span>}
      </div>
    </div>
  );
}

function FileSection({ file, annotations, collapsed, onToggle, maxLines }: {
  file: DiffFile;
  annotations: DiffAnnotation[];
  collapsed: boolean;
  onToggle: () => void;
  maxLines: number;
}) {
  // line number → annotations pinned there; the rest render at the top so a
  // finding about a line the (possibly truncated) diff lacks still shows.
  const { pinned, floating } = useMemo(() => {
    const pinned = new Map<number, DiffAnnotation[]>();
    const floating: DiffAnnotation[] = [];
    const newLines = new Set(file.lines.filter((l) => l.newNo != null).map((l) => l.newNo));
    for (const a of annotations) {
      if (a.line != null && newLines.has(a.line)) {
        const list = pinned.get(a.line) ?? [];
        list.push(a);
        pinned.set(a.line, list);
      } else {
        floating.push(a);
      }
    }
    return { pinned, floating };
  }, [file, annotations]);

  const shown = file.lines.slice(0, maxLines);
  const truncated = file.lines.length > maxLines;

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-surface">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={!collapsed}
        className="w-full flex items-center gap-2 px-3 py-2 bg-surface-panel border-0 cursor-pointer text-left hover:bg-surface-hover min-w-0"
      >
        <span aria-hidden className="text-[10px] text-text-tertiary">{collapsed ? '▸' : '▾'}</span>
        <span className="text-[12px] font-mono font-semibold text-text-primary truncate">
          {file.oldPath ? `${file.oldPath} → ${file.path}` : file.path}
        </span>
        <Chip tone={STATUS_TONE[file.status]} size="xs">{file.status}</Chip>
        {annotations.length > 0 && (
          <Chip tone="warning" size="xs" mono>{annotations.length} note{annotations.length === 1 ? '' : 's'}</Chip>
        )}
        <span className="flex-1" />
        <span className="text-[11px] font-mono tabular-nums whitespace-nowrap">
          <span className="text-success">+{file.adds}</span>{' '}
          <span className="text-danger">−{file.dels}</span>
        </span>
      </button>

      {!collapsed && (
        <div className="overflow-x-auto">
          {floating.map((a, i) => <AnnotationRow key={`f${i}`} a={a} />)}
          {file.binary ? (
            <div className="px-3 py-2 text-[12px] text-text-tertiary">Binary file — no text diff.</div>
          ) : (
            <table className="w-full border-collapse font-mono text-[11.5px] leading-[1.5]">
              <tbody>
                {shown.map((l, i) => (
                  l.kind === 'hunk' ? (
                    <tr key={i} className={LINE_BG.hunk}>
                      <td colSpan={3} className="px-3 py-0.5 text-xs text-text-tertiary select-none">{l.text}</td>
                    </tr>
                  ) : (
                    <>
                      <tr key={i} className={LINE_BG[l.kind]}>
                        <td className="w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60">
                          {l.oldNo ?? ''}
                        </td>
                        <td className="w-[3.2em] px-1.5 text-right text-[10px] text-text-tertiary select-none align-top tabular-nums border-r border-border/60">
                          {l.newNo ?? ''}
                        </td>
                        <td className={cn(
                          'px-2 whitespace-pre align-top',
                          l.kind === 'add' && 'text-success',
                          l.kind === 'del' && 'text-danger',
                          l.kind === 'ctx' && 'text-text-secondary',
                        )}>
                          <span className="select-none inline-block w-[1ch] mr-1 text-text-tertiary">
                            {l.kind === 'add' ? '+' : l.kind === 'del' ? '-' : ' '}
                          </span>
                          {l.text || ' '}
                        </td>
                      </tr>
                      {l.newNo != null && pinned.get(l.newNo)?.map((a, j) => (
                        <tr key={`${i}-a${j}`}>
                          <td colSpan={3} className="p-0"><AnnotationRow a={a} /></td>
                        </tr>
                      ))}
                    </>
                  )
                ))}
                {truncated && (
                  <tr>
                    <td colSpan={3} className="px-3 py-1.5 text-[11px] text-text-tertiary">
                      … {file.lines.length - maxLines} more lines in this file not shown.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export function DiffViewer({
  diff,
  annotations = [],
  defaultCollapsed = false,
  maxLinesPerFile = 800,
  truncatedNote,
  className,
  'data-testid': testId,
}: DiffViewerProps) {
  const files = useMemo(() => parseUnifiedDiff(diff), [diff]);
  const [collapsed, setCollapsed] = useState<Set<string>>(
    () => (defaultCollapsed ? new Set(files.map((f) => f.path)) : new Set()),
  );
  const sectionRefs = useRef(new Map<string, HTMLDivElement | null>());

  const byFile = useMemo(() => {
    const m = new Map<string, DiffAnnotation[]>();
    for (const a of annotations) {
      const list = m.get(a.file) ?? [];
      list.push(a);
      m.set(a.file, list);
    }
    return m;
  }, [annotations]);

  function toggle(path: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path); else next.add(path);
      return next;
    });
  }

  function jumpTo(path: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.delete(path);
      return next;
    });
    // After the expand renders — a collapsed target scrolls to a 40px header.
    requestAnimationFrame(() => {
      sectionRefs.current.get(path)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (files.length === 0) {
    return (
      <div data-testid={testId} className={cn('text-[12px] text-text-tertiary', className)}>
        No parseable diff.
      </div>
    );
  }

  const totalAdds = files.reduce((n, f) => n + f.adds, 0);
  const totalDels = files.reduce((n, f) => n + f.dels, 0);

  return (
    <div data-testid={testId} className={cn('flex flex-col gap-2 min-w-0', className)}>
      {/* File strip — the change at a glance, and the way around a big one. */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-text-secondary font-medium whitespace-nowrap">
          {files.length} file{files.length === 1 ? '' : 's'}
          {' '}<span className="font-mono tabular-nums"><span className="text-success">+{totalAdds}</span> <span className="text-danger">−{totalDels}</span></span>
        </span>
        {files.map((f) => (
          <button
            key={f.path}
            type="button"
            onClick={() => jumpTo(f.path)}
            title={f.path}
            className={cn(
              'px-1.5 py-0.5 rounded border border-border bg-surface text-[10.5px] font-mono cursor-pointer',
              'text-text-secondary hover:border-border-emphasis hover:text-text-primary truncate max-w-[220px]',
              (byFile.get(f.path)?.length ?? 0) > 0 && 'border-warning/60',
            )}
          >
            {f.path.split('/').pop()}
          </button>
        ))}
      </div>

      {truncatedNote && (
        <div className="text-[11px] text-warning">{truncatedNote}</div>
      )}

      {files.map((f) => (
        <div key={f.path} ref={(el) => { sectionRefs.current.set(f.path, el); }}>
          <FileSection
            file={f}
            annotations={byFile.get(f.path) ?? []}
            collapsed={collapsed.has(f.path)}
            onToggle={() => toggle(f.path)}
            maxLines={maxLinesPerFile}
          />
        </div>
      ))}
    </div>
  );
}

export default DiffViewer;
