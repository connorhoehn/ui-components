// frontend/src/components/ingest/MappingRuleEditor.tsx
//
// Reusable editor for mapping rules within a source. Renders a table of rules
// with inline editing, reordering, add/delete, and a preview button.

import type { CSSProperties } from 'react';
import { useCallback, useState } from 'react';
import { useIdentityContext } from '../../contexts/IdentityContext';
import { colors, fieldStyle, saveBtnStyle } from '../../constants/styles';
import type { MappingRule } from '../../types/ingest';

const BASE_URL = (import.meta.env as Record<string, string>).VITE_SOCIAL_API_URL ?? '';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface MappingRuleEditorProps {
  rules: MappingRule[];
  onChange: (rules: MappingRule[]) => void;
}

// ---------------------------------------------------------------------------
// Static styles
// ---------------------------------------------------------------------------

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    width: '100%', borderCollapse: 'collapse', fontSize: 12,
  },
  th: {
    padding: '8px 10px', fontWeight: 600, textAlign: 'left' as const,
    borderBottom: `1px solid ${colors.border}`, color: colors.textSecondary, fontSize: 11,
    textTransform: 'uppercase' as const, letterSpacing: '0.03em',
  },
  td: {
    padding: '6px 10px', borderBottom: `1px solid ${colors.border}`,
    color: colors.textSecondary, fontSize: 12, verticalAlign: 'middle',
  },
  row: {
    borderBottom: `1px solid ${colors.border}`,
  },
  actionBtn: {
    padding: '3px 8px', fontSize: 11, fontWeight: 500, border: `1px solid ${colors.border}`,
    borderRadius: 4, background: colors.surface, cursor: 'pointer', fontFamily: 'inherit',
    color: colors.textSecondary,
  },
  actionBtnDanger: {
    padding: '3px 8px', fontSize: 11, fontWeight: 500, border: `1px solid ${colors.state.failed}`,
    borderRadius: 4, background: '#fef2f2', cursor: 'pointer', fontFamily: 'inherit',
    color: colors.state.failed,
  },
  addBtn: {
    padding: '6px 14px', fontSize: 12, fontWeight: 500, border: `1px solid ${colors.border}`,
    borderRadius: 6, background: colors.surface, cursor: 'pointer', fontFamily: 'inherit',
    color: colors.textSecondary, alignSelf: 'flex-start',
  },
  inlineInput: {
    ...fieldStyle, padding: '4px 8px', fontSize: 12, minWidth: 80, width: '100%',
  },
  inlineSelect: {
    ...fieldStyle, padding: '4px 8px', fontSize: 12, minWidth: 90, cursor: 'pointer',
  },
  previewBtn: {
    padding: '6px 14px', fontSize: 12, fontWeight: 500, border: `1px solid ${colors.primary}`,
    borderRadius: 6, background: '#eff6ff', cursor: 'pointer', fontFamily: 'inherit',
    color: colors.primary, alignSelf: 'flex-start',
  },
  previewResult: {
    padding: 12, background: colors.surfaceInset, border: `1px solid ${colors.border}`,
    borderRadius: 6, fontSize: 12, color: colors.textSecondary, fontFamily: 'monospace',
    whiteSpace: 'pre-wrap', wordBreak: 'break-word',
  },
  footer: {
    display: 'flex', gap: 10, alignItems: 'center',
  },
  emptyMsg: {
    padding: 16, textAlign: 'center', color: colors.textTertiary, fontSize: 13,
  },
};

const FIELD_OPTIONS = ['extension', 'path', 'mimeType', 'tag', 'name'] as const;
const OP_OPTIONS = ['eq', 'contains', 'regex', 'startsWith'] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MappingRuleEditor({ rules, onChange }: MappingRuleEditorProps) {
  const { idToken } = useIdentityContext();
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
    }
  }, [rules, onChange, editingIdx]);

  const moveUp = useCallback((idx: number) => {
    if (idx === 0) return;
    const updated = [...rules];
    [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
    // Swap priorities
    const tmpPriority = updated[idx - 1].priority;
    updated[idx - 1] = { ...updated[idx - 1], priority: updated[idx].priority };
    updated[idx] = { ...updated[idx], priority: tmpPriority };
    onChange(updated);
    if (editingIdx === idx) setEditingIdx(idx - 1);
    else if (editingIdx === idx - 1) setEditingIdx(idx);
  }, [rules, onChange, editingIdx]);

  const moveDown = useCallback((idx: number) => {
    if (idx >= rules.length - 1) return;
    const updated = [...rules];
    [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
    // Swap priorities
    const tmpPriority = updated[idx].priority;
    updated[idx] = { ...updated[idx], priority: updated[idx + 1].priority };
    updated[idx + 1] = { ...updated[idx + 1], priority: tmpPriority };
    onChange(updated);
    if (editingIdx === idx) setEditingIdx(idx + 1);
    else if (editingIdx === idx + 1) setEditingIdx(idx);
  }, [rules, onChange, editingIdx]);

  const handlePreview = useCallback(async () => {
    if (!previewPath.trim()) return;
    setPreviewLoading(true);
    setPreviewResult(null);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (idToken) headers['Authorization'] = `Bearer ${idToken}`;
      const res = await fetch(`${BASE_URL}/api/ingest/mapping/preview`, {
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
  }, [previewPath, rules, idToken]);

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
    <div style={styles.container} data-testid="mapping-rule-editor">
      {rules.length === 0 ? (
        <div style={styles.emptyMsg}>No mapping rules configured. Add one to get started.</div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Condition</th>
                <th style={styles.th}>Target Type ID</th>
                <th style={styles.th}>Pipeline</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule, idx) => {
                const isEditing = editingIdx === idx && draft !== null;
                const parsed = parsePattern(rule.pattern);

                if (isEditing) {
                  const draftParsed = parsePattern(draft.pattern);
                  return (
                    <tr key={idx} style={styles.row}>
                      <td style={styles.td}>
                        <input
                          style={{ ...styles.inlineInput, width: 50 }}
                          type="number"
                          value={draft.priority}
                          onChange={(e) => setDraft({ ...draft, priority: Number(e.target.value) })}
                        />
                      </td>
                      <td style={styles.td}>
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                          <select
                            style={styles.inlineSelect}
                            value={draftParsed.field}
                            onChange={(e) => setDraft({ ...draft, pattern: buildPattern(e.target.value, draftParsed.op, draftParsed.value) })}
                          >
                            {FIELD_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                          </select>
                          <select
                            style={styles.inlineSelect}
                            value={draftParsed.op}
                            onChange={(e) => setDraft({ ...draft, pattern: buildPattern(draftParsed.field, e.target.value, draftParsed.value) })}
                          >
                            {OP_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                          <input
                            style={{ ...styles.inlineInput, minWidth: 100 }}
                            value={draftParsed.value}
                            placeholder="value"
                            onChange={(e) => setDraft({ ...draft, pattern: buildPattern(draftParsed.field, draftParsed.op, e.target.value) })}
                          />
                        </div>
                      </td>
                      <td style={styles.td}>
                        <input
                          style={styles.inlineInput}
                          value={draft.documentTypeId}
                          placeholder="document type id"
                          onChange={(e) => setDraft({ ...draft, documentTypeId: e.target.value })}
                        />
                      </td>
                      <td style={styles.td}>
                        <input
                          style={styles.inlineInput}
                          value={draft.pipelineId ?? ''}
                          placeholder="(optional)"
                          onChange={(e) => setDraft({ ...draft, pipelineId: e.target.value || undefined })}
                        />
                      </td>
                      <td style={{ ...styles.td, textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                          <button style={styles.actionBtn} onClick={saveEdit}>Save</button>
                          <button style={styles.actionBtn} onClick={cancelEdit}>Cancel</button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={idx} style={styles.row}>
                    <td style={{ ...styles.td, fontFamily: 'monospace', fontWeight: 600 }}>{rule.priority}</td>
                    <td style={styles.td}>
                      <span style={{ fontFamily: 'monospace', fontSize: 11 }}>
                        {parsed.field} {parsed.op} &quot;{parsed.value}&quot;
                      </span>
                    </td>
                    <td style={{ ...styles.td, fontFamily: 'monospace' }}>{rule.documentTypeId || '—'}</td>
                    <td style={{ ...styles.td, fontFamily: 'monospace', color: colors.textTertiary }}>
                      {rule.pipelineId ?? '—'}
                    </td>
                    <td style={{ ...styles.td, textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                        <button style={styles.actionBtn} onClick={() => moveUp(idx)} disabled={idx === 0} title="Move up">
                          ↑
                        </button>
                        <button style={styles.actionBtn} onClick={() => moveDown(idx)} disabled={idx === rules.length - 1} title="Move down">
                          ↓
                        </button>
                        <button style={styles.actionBtn} onClick={() => startEdit(idx)}>Edit</button>
                        <button style={styles.actionBtnDanger} onClick={() => deleteRule(idx)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer: Add Rule + Preview */}
      <div style={styles.footer}>
        <button style={styles.addBtn} onClick={addRule} data-testid="add-rule-btn">
          + Add Rule
        </button>
      </div>

      {/* Preview section */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
        <input
          style={{ ...fieldStyle, flex: 1 }}
          value={previewPath}
          onChange={(e) => setPreviewPath(e.target.value)}
          placeholder="Enter a file path to preview mapping..."
        />
        <button
          style={styles.previewBtn}
          onClick={() => void handlePreview()}
          disabled={previewLoading || !previewPath.trim()}
        >
          {previewLoading ? 'Checking...' : 'Preview'}
        </button>
      </div>
      {previewResult && (
        <div style={styles.previewResult}>{previewResult}</div>
      )}
    </div>
  );
}
