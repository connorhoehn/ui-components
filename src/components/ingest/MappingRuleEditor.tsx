// frontend/src/components/ingest/MappingRuleEditor.tsx
//
// Reusable editor for mapping rules within a source. Renders a table of rules
// with inline editing, reordering, add/delete, and a preview button.

import { useCallback, useState } from 'react';
import { useOptionalIdentityContext } from '../../contexts/IdentityContext';
import { getApiBaseUrl } from '../../lib/apiBaseUrl';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import type { MappingRule } from '../../types/ingest';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface MappingRuleEditorProps {
  rules: MappingRule[];
  onChange: (rules: MappingRule[]) => void;
  /**
   * Render the rule table without any mutating controls. Additive.
   *
   * A caller that has nowhere to put an edit — `SourceDetailPage` outside its
   * edit mode passes `onChange={() => {}}` — still got the full Edit / Delete /
   * reorder / Add Rule toolbar. Every one of those calls `onChange`, so the
   * operator could open a rule, retype its target type, press Save, and watch
   * the row snap back to its old value with no error and no explanation. The
   * preview box stays: it is a read-only dry run and is useful here.
   */
  readOnly?: boolean;
  /**
   * Bearer token for the "Preview" request. Wins over this library's
   * `useIdentityContext().idToken`. Defaults to the context's `idToken`
   * (or `null` when no `<IdentityProvider>` is mounted) via the
   * non-throwing `useOptionalIdentityContext`.
   */
  idToken?: string | null;
  /** Origin for the "Preview" request. Wins over the build-time `VITE_SOCIAL_API_URL` / module `setApiBaseUrl`. */
  baseUrl?: string;
}

const FIELD_OPTIONS = ['extension', 'path', 'mimeType', 'tag', 'name'] as const;
const OP_OPTIONS = ['eq', 'contains', 'regex', 'startsWith'] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MappingRuleEditor({
  rules,
  onChange,
  readOnly = false,
  idToken: idTokenProp,
  baseUrl,
}: MappingRuleEditorProps) {
  const identityCtx = useOptionalIdentityContext();
  const idToken = idTokenProp !== undefined ? idTokenProp : (identityCtx?.idToken ?? null);
  const resolvedBaseUrl = baseUrl ?? getApiBaseUrl();
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [previewPath, setPreviewPath] = useState('');
  const [previewResult, setPreviewResult] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Draft state for the currently editing row
  const [draft, setDraft] = useState<MappingRule | null>(null);

  const startEdit = useCallback((idx: number) => {
    setEditingIdx(idx);
    setDraft({ ...rules[idx] });
  }, [rules]);

  const cancelEdit = useCallback(() => {
    setEditingIdx(null);
    setDraft(null);
  }, []);

  const saveEdit = useCallback(() => {
    if (editingIdx === null || !draft) return;
    const updated = [...rules];
    updated[editingIdx] = draft;
    onChange(updated);
    setEditingIdx(null);
    setDraft(null);
  }, [editingIdx, draft, rules, onChange]);

  const addRule = useCallback(() => {
    const newRule: MappingRule = {
      pattern: '',
      documentTypeId: '',
      priority: rules.length > 0 ? Math.max(...rules.map((r) => r.priority)) + 1 : 1,
    };
    const updated = [...rules, newRule];
    onChange(updated);
    // Immediately start editing the new rule
    setEditingIdx(updated.length - 1);
    setDraft(newRule);
  }, [rules, onChange]);

  const deleteRule = useCallback((idx: number) => {
    const updated = rules.filter((_, i) => i !== idx);
    onChange(updated);
    if (editingIdx === idx) {
      setEditingIdx(null);
      setDraft(null);
    } else if (editingIdx !== null && editingIdx > idx) {
      // Every row after the deleted one shifts down, so the edited row is no
      // longer at `editingIdx`. Without this, saveEdit's
      // `updated[editingIdx] = draft` writes the pending draft over a
      // DIFFERENT rule: editing B in [A,B,C], deleting A, then saving
      // produced [B,B] — C destroyed, silently. moveUp/moveDown already
      // re-point editingIdx the same way; delete was the odd one out.
      setEditingIdx(editingIdx - 1);
    }
  }, [rules, onChange, editingIdx]);

  // A reorder rewrites the `priority` of both swapped rows. If one of them is
  // the row with an open draft, re-pointing `editingIdx` is only half the job:
  // the draft still carries the priority it was snapshotted with, and
  // `saveEdit` writes the WHOLE draft back over the row — so the reorder the
  // operator had just performed was silently undone, leaving two rules sharing
  // one priority and an ambiguous match order at ingest time. Re-pointing the
  // draft's priority as well keeps the two in step, and the change is visible:
  // the draft's priority input updates on screen as the arrow is clicked.
  const repointDraftPriority = useCallback((priority: number) => {
    setDraft((d) => (d ? { ...d, priority } : d));
  }, []);

  const moveUp = useCallback((idx: number) => {
    if (idx === 0) return;
    const updated = [...rules];
    [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
    // Swap priorities
    const tmpPriority = updated[idx - 1].priority;
    updated[idx - 1] = { ...updated[idx - 1], priority: updated[idx].priority };
    updated[idx] = { ...updated[idx], priority: tmpPriority };
    onChange(updated);
    if (editingIdx === idx) {
      setEditingIdx(idx - 1);
      repointDraftPriority(updated[idx - 1].priority);
    } else if (editingIdx === idx - 1) {
      setEditingIdx(idx);
      repointDraftPriority(updated[idx].priority);
    }
  }, [rules, onChange, editingIdx, repointDraftPriority]);

  const moveDown = useCallback((idx: number) => {
    if (idx >= rules.length - 1) return;
    const updated = [...rules];
    [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
    // Swap priorities
    const tmpPriority = updated[idx].priority;
    updated[idx] = { ...updated[idx], priority: updated[idx + 1].priority };
    updated[idx + 1] = { ...updated[idx + 1], priority: tmpPriority };
    onChange(updated);
    if (editingIdx === idx) {
      setEditingIdx(idx + 1);
      repointDraftPriority(updated[idx + 1].priority);
    } else if (editingIdx === idx + 1) {
      setEditingIdx(idx);
      repointDraftPriority(updated[idx].priority);
    }
  }, [rules, onChange, editingIdx, repointDraftPriority]);

  const handlePreview = useCallback(async () => {
    if (!previewPath.trim()) return;
    setPreviewLoading(true);
    setPreviewResult(null);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (idToken) headers['Authorization'] = `Bearer ${idToken}`;
      const res = await fetch(`${resolvedBaseUrl}/api/ingest/mapping/preview`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ path: previewPath, rules }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json() as Record<string, unknown>;
      setPreviewResult(JSON.stringify(body, null, 2));
    } catch (err) {
      setPreviewResult(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setPreviewLoading(false);
    }
  }, [previewPath, rules, idToken, resolvedBaseUrl]);

  // Parse pattern into field/op/value for display (pattern format: "field:op:value")
  const parsePattern = (pattern: string) => {
    const parts = pattern.split(':');
    if (parts.length >= 3) {
      return { field: parts[0], op: parts[1], value: parts.slice(2).join(':') };
    }
    return { field: 'path', op: 'contains', value: pattern };
  };

  const buildPattern = (field: string, op: string, value: string) => `${field}:${op}:${value}`;

  return (
    <div className="flex flex-col gap-2.5" data-testid="mapping-rule-editor">
      {rules.length === 0 ? (
        <div className="p-4 text-center text-text-tertiary text-[13px]">
          {readOnly
            ? 'No mapping rules configured.'
            : 'No mapping rules configured. Add one to get started.'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className="px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight">Priority</th>
                <th className="px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight">Condition</th>
                <th className="px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight">Target Type ID</th>
                <th className="px-2.5 py-2 font-semibold text-left border-b border-border text-text-secondary text-[11px] uppercase tracking-tight">Pipeline</th>
                <th className="px-2.5 py-2 font-semibold text-right border-b border-border text-text-secondary text-[11px] uppercase tracking-tight">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule, idx) => {
                const isEditing = !readOnly && editingIdx === idx && draft !== null;
                const parsed = parsePattern(rule.pattern);

                if (isEditing) {
                  const draftParsed = parsePattern(draft.pattern);
                  return (
                    <tr key={idx} className="border-b border-border">
                      <td className="px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle">
                        {/* Table cells: the <th> gives a sighted user the
                            column meaning, but none of these controls had an
                            accessible NAME. Named from the same column
                            headings. */}
                        <Input
                          aria-label="Priority"
                          size="sm"
                          className="w-[50px]"
                          type="number"
                          value={draft.priority}
                          onChange={(e) => setDraft({ ...draft, priority: Number(e.target.value) })}
                        />
                      </td>
                      <td className="px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle">
                        <div className="flex gap-1 items-center flex-wrap">
                          <Select
                            aria-label="Match field"
                            size="sm"
                            className="w-auto min-w-[90px]"
                            value={draftParsed.field}
                            onChange={(e) => setDraft({ ...draft, pattern: buildPattern(e.target.value, draftParsed.op, draftParsed.value) })}
                            options={FIELD_OPTIONS.map((f) => ({ value: f, label: f }))}
                          />
                          <Select
                            aria-label="Match operator"
                            size="sm"
                            className="w-auto min-w-[90px]"
                            value={draftParsed.op}
                            onChange={(e) => setDraft({ ...draft, pattern: buildPattern(draftParsed.field, e.target.value, draftParsed.value) })}
                            options={OP_OPTIONS.map((o) => ({ value: o, label: o }))}
                          />
                          <Input
                            aria-label="Match value"
                            size="sm"
                            className="min-w-[100px]"
                            value={draftParsed.value}
                            placeholder="value"
                            onChange={(e) => setDraft({ ...draft, pattern: buildPattern(draftParsed.field, draftParsed.op, e.target.value) })}
                          />
                        </div>
                      </td>
                      <td className="px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle">
                        <Input
                          aria-label="Target Type ID"
                          size="sm"
                          className="min-w-[80px]"
                          value={draft.documentTypeId}
                          placeholder="document type id"
                          onChange={(e) => setDraft({ ...draft, documentTypeId: e.target.value })}
                        />
                      </td>
                      <td className="px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle">
                        <Input
                          aria-label="Pipeline"
                          size="sm"
                          className="min-w-[80px]"
                          value={draft.pipelineId ?? ''}
                          placeholder="(optional)"
                          onChange={(e) => setDraft({ ...draft, pipelineId: e.target.value || undefined })}
                        />
                      </td>
                      <td className="px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right">
                        <div className="flex gap-1 justify-end">
                          <button className="px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary" onClick={saveEdit}>Save</button>
                          <button className="px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary" onClick={cancelEdit}>Cancel</button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={idx} className="border-b border-border">
                    <td className="px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono font-semibold">{rule.priority}</td>
                    <td className="px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle">
                      <span className="font-mono text-[11px]">
                        {parsed.field} {parsed.op} &quot;{parsed.value}&quot;
                      </span>
                    </td>
                    <td className="px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle font-mono">{rule.documentTypeId || '—'}</td>
                    <td className="px-2.5 py-1.5 border-b border-border text-text-tertiary text-xs align-middle font-mono">
                      {rule.pipelineId ?? '—'}
                    </td>
                    <td className="px-2.5 py-1.5 border-b border-border text-text-secondary text-xs align-middle text-right">
                      {readOnly ? (
                        <span className="text-[11px] text-text-tertiary">—</span>
                      ) : (
                        <div className="flex gap-1 justify-end">
                          <button className="px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary" onClick={() => moveUp(idx)} disabled={idx === 0} title="Move up">
                            &uarr;
                          </button>
                          <button className="px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary" onClick={() => moveDown(idx)} disabled={idx === rules.length - 1} title="Move down">
                            &darr;
                          </button>
                          <button className="px-2 py-0.5 text-[11px] font-medium border border-border rounded bg-surface cursor-pointer font-[inherit] text-text-secondary" onClick={() => startEdit(idx)}>Edit</button>
                          <button className="px-2 py-0.5 text-[11px] font-medium border border-[var(--color-state-failed)] rounded bg-danger-bg cursor-pointer font-[inherit] text-[var(--color-state-failed)]" onClick={() => deleteRule(idx)}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer: Add Rule + Preview */}
      {!readOnly && (
        <div className="flex gap-2.5 items-center">
          <button
            className="px-3.5 py-1.5 text-xs font-medium border border-border rounded-md bg-surface cursor-pointer font-[inherit] text-text-secondary self-start"
            onClick={addRule}
            data-testid="add-rule-btn"
          >
            + Add Rule
          </button>
        </div>
      )}

      {/* Preview section */}
      <div className="flex gap-2 items-center mt-1">
        <Input
          aria-label="Enter a file path to preview mapping"
          className="flex-1"
          value={previewPath}
          onChange={(e) => setPreviewPath(e.target.value)}
          placeholder="Enter a file path to preview mapping..."
        />
        <button
          className={cn(
            'px-3.5 py-1.5 text-xs font-medium border border-primary rounded-md bg-info-bg cursor-pointer font-[inherit] text-primary self-start',
            (previewLoading || !previewPath.trim()) && 'opacity-50 cursor-not-allowed',
          )}
          onClick={() => void handlePreview()}
          disabled={previewLoading || !previewPath.trim()}
        >
          {previewLoading ? 'Checking...' : 'Preview'}
        </button>
      </div>
      {previewResult && (
        <div className="p-3 bg-surface-inset border border-border rounded-md text-xs text-text-secondary font-mono whitespace-pre-wrap break-words">
          {previewResult}
        </div>
      )}
    </div>
  );
}
