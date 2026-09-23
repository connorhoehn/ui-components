// src/components/ingest/ConflictsPage.tsx
//
// Operator queue for write-back conflicts, on the shared change-review pattern.
//
// ORPHAN WARNING — READ BEFORE INVESTING HERE
//
// This page has NO consumers. Nothing outside `ingest/index.ts` imports it, and
// the ingest backend it targets (`/api/sync/conflicts`) was deleted from
// platform-api when ingest scope was cut, so `useSyncConflicts` always falls
// through to its mock fixture. It is refitted onto `ChangeReviewList` /
// `ChangeReviewCard` so the review pattern is consistent across the library,
// NOT because it is reachable. Do not build a backend for it on the strength of
// this file existing.
//
// WHAT CHANGED, AND WHY
//
// The previous version led with the SYSTEM ("Sync Conflicts") and buried the
// document — the document's name appeared on screen only as a value inside a
// diff cell, so you had to read the diff to learn what you were looking at.
// Now each document heads its own queue: "Acme MSA — 2 changes".
//
// The other inversion was the merge model. SOURCE / AUTO-MERGED / PLATFORM with
// a radio per column is `git mergetool`: a RESOLUTION ui doing a REVIEW ui's
// job. Reviewing is a one-axis question — what does this change do to the
// document — so the primary surface is now before → after, where "before" is
// what the document says today and "after" is what the incoming edit proposes.
// Three-way picking still exists, because a genuine conflict sometimes needs
// it, but it is folded away per field instead of being the first thing read.

import { useEffect, useMemo, useState } from 'react';
import { useSyncConflicts } from '../../hooks/useSyncConflicts';
import { useIngestSources } from '../../hooks/useIngestSources';
import Chip from '../shared/Chip';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { cn } from '../../lib/cn';
import ChangeReviewList from '../change-review/ChangeReviewList';
import ChangeReviewCard from '../change-review/ChangeReviewCard';
import type { ConflictField, ConflictSide, SyncConflict, ConflictResolution } from '../../types/ingest';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  return `${Math.floor(d / 86_400_000)}d ago`;
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string') return v;
  try { return JSON.stringify(v, null, 2); } catch { return String(v); }
}

/**
 * A field path in the reviewer's words.
 *
 * `body.summary` is a machine key. The reviewer is looking for "Summary" — so
 * the last segment, de-cased, becomes the category, and the FULL path stays
 * visible as the location hint. Nothing is hidden; it is just no longer the
 * only thing on offer.
 */
function categoryFor(field: string): string {
  const last = field.split('.').pop() ?? field;
  const spaced = last
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Document-relative breadcrumb, from the connector when it knows one. */
function pathFor(field: ConflictField): string[] {
  if (field.path && field.path.length > 0) return field.path;
  const segments = field.field.split('.');
  // Drop the trailing segment — it is the category, already the card's heading.
  return segments.slice(0, -1).map(categoryFor);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ConflictsPage() {
  const {
    conflicts, loading, error, usingMock, refresh, resolveConflict, discardConflict,
    actionError, clearActionError,
  } = useSyncConflicts();
  const { sources } = useIngestSources();
  const [fieldChoices, setFieldChoices] = useState<Record<string, ConflictSide>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  const sourceNameMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of sources) map.set(s.sourceId, s.name);
    return map;
  }, [sources]);

  // Pending conflicts only — resolved/discarded fall off the queue.
  const pending = useMemo(() => conflicts.filter((c) => c.status === 'pending'), [conflicts]);

  // Drop choices for conflicts that have left the queue, so a stale pick can
  // never be submitted against a conflict the operator is no longer looking at.
  useEffect(() => {
    const live = new Set(pending.map((c) => c.conflictId));
    setFieldChoices((prev) => {
      const next: Record<string, ConflictSide> = {};
      for (const [key, side] of Object.entries(prev)) {
        if (live.has(key.split('::')[0] ?? '')) next[key] = side;
      }
      return next;
    });
  }, [pending]);

  const choiceFor = (conflictId: string, field: string): ConflictSide =>
    fieldChoices[`${conflictId}::${field}`] ?? 'source';

  const setChoice = (conflictId: string, field: string, side: ConflictSide) =>
    setFieldChoices((prev) => ({ ...prev, [`${conflictId}::${field}`]: side }));

  const handleResolve = async (conflict: SyncConflict) => {
    setSubmitting(conflict.conflictId);
    try {
      const perField: Record<string, ConflictSide> = {};
      for (const f of conflict.fields) {
        perField[f.field] = choiceFor(conflict.conflictId, f.field);
      }
      const note = (notes[conflict.conflictId] ?? '').trim();
      const resolution: ConflictResolution = {
        // `pick` is the whole-conflict fallback the API requires; the per-field
        // map is what the operator actually chose, so it always wins.
        pick: 'source',
        fieldChoices: perField,
        ...(note ? { note } : {}),
      };
      await resolveConflict(conflict.conflictId, resolution);
    } finally {
      setSubmitting(null);
    }
  };

  const handleDiscard = async (conflictId: string) => {
    setSubmitting(conflictId);
    try {
      await discardConflict(conflictId);
    } finally {
      setSubmitting(null);
    }
  };

  if (loading && conflicts.length === 0) {
    return (
      <div data-testid="conflicts-page" className="flex flex-col gap-3 p-6">
        <SkeletonCard height={48} />
        <SkeletonCard height={200} />
      </div>
    );
  }

  return (
    <div data-testid="conflicts-page" className="flex flex-col gap-6 p-6">
      {/* The page's own identity is deliberately small and secondary. The
          documents below are the headings; this is just the breadcrumb that
          says which queue you are in. */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-wide text-text-tertiary">
          Incoming changes · {pending.length} document{pending.length === 1 ? '' : 's'} waiting
        </span>
        <Button size="sm" variant="ghost" onClick={() => void refresh()} data-testid="conflicts-refresh">
          Refresh
        </Button>
      </div>

      {usingMock && (
        <div
          className="rounded-lg border border-warning-border bg-warning-bg px-3.5 py-2.5 text-xs text-warning-fg"
          data-testid="conflicts-mock-banner"
        >
          Showing mock conflicts — backend endpoint <code>/api/sync/conflicts</code> not implemented.
        </div>
      )}

      {error && !usingMock && (
        <div
          className="rounded-lg border border-danger-border bg-danger-bg px-4 py-3 text-[13px] text-danger-fg"
          role="alert"
        >
          Failed to load conflicts: {error}
        </div>
      )}

      {/* Action-failure banner — a rejected Resolve/Discard is NOT a failed
          load, and must not be reported as one. The conflict is still
          pending, so say so rather than letting the operator move on. */}
      {actionError && (
        <div
          data-testid="conflicts-action-error"
          role="alert"
          className="flex items-center justify-between gap-3 rounded-lg border border-danger-border bg-danger-bg px-4 py-3"
        >
          <span className="text-[13px] font-medium text-danger-fg">
            That conflict was not updated: {actionError}
          </span>
          <Button size="sm" variant="ghost" onClick={clearActionError}>Dismiss</Button>
        </div>
      )}

      {pending.length === 0 ? (
        <EmptyState
          icon="✅"
          title="No pending conflicts"
          body="Write-back conflicts that need operator intervention will appear here."
        />
      ) : (
        pending.map((conflict) => (
          <ChangeReviewList
            key={conflict.conflictId}
            // The DOCUMENT is the heading. Falls back to the id only when the
            // connector gave us no name — never to the source system's name.
            documentTitle={conflict.documentTitle ?? conflict.documentId}
            changeCount={conflict.fields.length}
            documentMeta={
              <>
                {sourceNameMap.get(conflict.sourceId) ?? conflict.sourceId} · detected{' '}
                {relativeTime(conflict.detectedAt)}
              </>
            }
            notices={
              <div className="flex flex-wrap items-center gap-1.5">
                <Chip tone="warning" size="xs" uppercase>Sync conflict</Chip>
                <span className="text-[11px] text-text-tertiary">
                  {conflict.summary} · source edited {relativeTime(conflict.sourceUpdatedAt)}, this
                  copy edited {relativeTime(conflict.platformUpdatedAt)}
                </span>
              </div>
            }
            footer={
              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border pt-3">
                <Input
                  aria-label="Optional note (logged in audit trail)"
                  className="min-w-[240px] flex-1"
                  placeholder="Optional note (logged in audit trail)"
                  value={notes[conflict.conflictId] ?? ''}
                  onChange={(e) =>
                    setNotes((prev) => ({ ...prev, [conflict.conflictId]: e.target.value }))
                  }
                  data-testid={`conflict-note-${conflict.conflictId}`}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={submitting === conflict.conflictId}
                  onClick={() => void handleDiscard(conflict.conflictId)}
                  data-testid={`conflict-discard-${conflict.conflictId}`}
                >
                  Discard
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  disabled={submitting === conflict.conflictId}
                  onClick={() => void handleResolve(conflict)}
                  data-testid={`conflict-resolve-${conflict.conflictId}`}
                >
                  {submitting === conflict.conflictId ? 'Applying…' : 'Apply to document'}
                </Button>
              </div>
            }
          >
            {conflict.fields.map((field) => {
              const side = choiceFor(conflict.conflictId, field.field);
              return (
                <ChangeReviewCard
                  key={field.field}
                  data-testid={`conflict-field-${field.field}`}
                  category={categoryFor(field.field)}
                  // Honest about attribution: most connectors cannot name an
                  // editor, and the source system is not a person.
                  {...(field.changedBy ? { author: { name: field.changedBy } } : {})}
                  path={pathFor(field)}
                  locationHint={field.field}
                  // One axis: what the document says now → what the incoming
                  // edit proposes. The three-way pick is below, folded away.
                  pairs={[{
                    before: formatValue(field.platformValue),
                    after: formatValue(field.sourceValue),
                  }]}
                  beforeLabel="This copy"
                  afterLabel="Incoming"
                  badges={
                    <Chip
                      tone={side === 'source' ? 'success' : side === 'merged' ? 'info' : 'neutral'}
                      size="xs"
                      data-testid={`conflict-choice-${field.field}`}
                    >
                      {side === 'source'
                        ? 'Taking incoming'
                        : side === 'merged'
                          ? 'Taking merged'
                          : 'Keeping this copy'}
                    </Chip>
                  }
                  actions={
                    <FieldChoice
                      field={field}
                      side={side}
                      onPick={(next) => setChoice(conflict.conflictId, field.field, next)}
                    />
                  }
                />
              );
            })}

          </ChangeReviewList>
        ))
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FieldChoice — three-way pick, demoted to an inline control.
// ---------------------------------------------------------------------------

/**
 * The merge picker, kept but moved.
 *
 * It used to be the primary reading surface: three columns of raw values with a
 * radio row under each. That is the right shape for RESOLVING and the wrong one
 * for REVIEWING, and this queue is read far more often than it is resolved. So
 * the diff above answers "what does this do", and this answers "and if I want
 * something other than the incoming value" — which is the rarer question.
 */
function FieldChoice({
  field,
  side,
  onPick,
}: {
  field: ConflictField;
  side: ConflictSide;
  onPick: (side: ConflictSide) => void;
}) {
  const hasMerge = field.mergedValue !== undefined;
  const options: Array<{ value: ConflictSide; label: string; enabled: boolean }> = [
    { value: 'source', label: 'Take incoming', enabled: true },
    { value: 'merged', label: 'Take merged', enabled: hasMerge },
    { value: 'platform', label: 'Keep this copy', enabled: true },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={`Resolution for ${field.field}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={side === opt.value}
          disabled={!opt.enabled}
          onClick={() => opt.enabled && onPick(opt.value)}
          className={cn(
            'cursor-pointer rounded-full border px-2.5 py-0.5 font-[inherit] text-[11px] font-medium',
            side === opt.value
              ? 'border-primary bg-primary text-on-primary'
              : 'border-border bg-surface text-text-secondary hover:border-border-emphasis',
            !opt.enabled && 'cursor-not-allowed opacity-40',
          )}
          data-testid={`field-pick-${field.field}-${opt.value}`}
        >
          {opt.label}
        </button>
      ))}
      {hasMerge && side === 'merged' && (
        <span className="font-mono text-[11px] text-text-tertiary">
          → {formatValue(field.mergedValue)}
        </span>
      )}
    </div>
  );
}
