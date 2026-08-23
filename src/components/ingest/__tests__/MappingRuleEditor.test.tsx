// Mapping rules are matched in priority order, so the reorder controls have to
// do two things at once: swap the rows AND swap the priority numbers attached
// to them. Swapping only one of the two silently changes which rule wins.
// The other non-obvious piece is the pattern codec: a rule stores one string
// ("field:op:value") that the editor splits into three controls and rebuilds
// on every keystroke, with a documented fallback for legacy 1-part patterns.

import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useState } from 'react';
import type { MappingRule } from '../../../types/ingest';

vi.mock('../../../contexts/IdentityContext', () => ({ useIdentityContext: () => ({ idToken: 'tok' }) }));

import MappingRuleEditor from '../MappingRuleEditor';

function rule(over: Partial<MappingRule> = {}): MappingRule {
  return { pattern: 'extension:eq:pdf', documentTypeId: 'dt-pdf', priority: 1, ...over };
}

/** Controlled host so reorder/edit results are observable across renders. */
function Host({ initial, onChange }: { initial: MappingRule[]; onChange?: (r: MappingRule[]) => void }) {
  const [rules, setRules] = useState(initial);
  return (
    <MappingRuleEditor
      rules={rules}
      onChange={(next) => { setRules(next); onChange?.(next); }}
    />
  );
}

function renderEditor(initial: MappingRule[] = []) {
  const onChange = vi.fn<(r: MappingRule[]) => void>();
  render(<Host initial={initial} onChange={onChange} />);
  return onChange;
}

/** Row order as [priority, documentTypeId] pairs. */
function rowSummary(): Array<[string, string]> {
  return screen.getAllByRole('row')
    .slice(1)
    .map((r) => {
      const cells = within(r).getAllByRole('cell');
      return [cells[0].textContent ?? '', cells[2].textContent ?? ''] as [string, string];
    });
}

beforeEach(() => vi.stubGlobal('fetch', vi.fn()));
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('MappingRuleEditor empty state', () => {
  it('explains itself rather than rendering an empty table', () => {
    renderEditor();
    expect(screen.getByText(/No mapping rules configured/)).toBeInTheDocument();
    expect(screen.queryByRole('table')).toBeNull();
  });

  it('the first added rule gets priority 1', () => {
    const onChange = renderEditor();
    fireEvent.click(screen.getByTestId('add-rule-btn'));
    expect(onChange).toHaveBeenCalledWith([{ pattern: '', documentTypeId: '', priority: 1 }]);
  });
});

describe('MappingRuleEditor add', () => {
  it('a new rule takes one above the highest existing priority, not the row count', () => {
    const onChange = renderEditor([rule({ priority: 3 }), rule({ priority: 9 })]);
    fireEvent.click(screen.getByTestId('add-rule-btn'));
    expect(onChange.mock.calls[0][0][2].priority).toBe(10);
  });

  it('drops straight into edit mode on the new row', () => {
    renderEditor([rule()]);
    fireEvent.click(screen.getByTestId('add-rule-btn'));
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});

describe('MappingRuleEditor pattern codec', () => {
  it('renders a three-part pattern as field / op / value', () => {
    renderEditor([rule({ pattern: 'path:contains:/invoices/' })]);
    expect(screen.getByText(/path contains/)).toHaveTextContent('path contains "/invoices/"');
  });

  it('keeps colons inside the value instead of dropping them', () => {
    renderEditor([rule({ pattern: 'mimeType:eq:application/vnd:custom' })]);
    expect(screen.getByText(/mimeType eq/)).toHaveTextContent('"application/vnd:custom"');
  });

  it('reads a legacy bare pattern as a path-contains rule', () => {
    renderEditor([rule({ pattern: 'reports' })]);
    expect(screen.getByText(/path contains/)).toHaveTextContent('path contains "reports"');
  });

  it('rebuilds the full pattern string when only the value changes', () => {
    const onChange = renderEditor([rule({ pattern: 'extension:eq:pdf' })]);
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByDisplayValue('pdf'), { target: { value: 'docx' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onChange.mock.calls[0][0][0].pattern).toBe('extension:eq:docx');
  });

  it('rebuilds it when only the operator changes, preserving field and value', () => {
    const onChange = renderEditor([rule({ pattern: 'path:eq:/a/b' })]);
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByDisplayValue('eq'), { target: { value: 'startsWith' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onChange.mock.calls[0][0][0].pattern).toBe('path:startsWith:/a/b');
  });
});

describe('MappingRuleEditor editing', () => {
  it('Cancel throws the draft away and emits nothing', () => {
    const onChange = renderEditor([rule({ documentTypeId: 'dt-pdf' })]);
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByDisplayValue('dt-pdf'), { target: { value: 'dt-other' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText('dt-pdf')).toBeInTheDocument();
  });

  it('an emptied optional pipeline id becomes undefined, never an empty string', () => {
    const onChange = renderEditor([rule({ pipelineId: 'pl-1' })]);
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByDisplayValue('pl-1'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onChange.mock.calls[0][0][0].pipelineId).toBeUndefined();
  });
});

describe('MappingRuleEditor reordering', () => {
  it('moving a rule up swaps both the position and the priority numbers', () => {
    renderEditor([
      rule({ priority: 1, documentTypeId: 'first' }),
      rule({ priority: 2, documentTypeId: 'second' }),
    ]);
    fireEvent.click(screen.getAllByTitle('Move up')[1]);
    expect(rowSummary()).toEqual([['1', 'second'], ['2', 'first']]);
  });

  it('moving down is the exact inverse', () => {
    renderEditor([
      rule({ priority: 1, documentTypeId: 'first' }),
      rule({ priority: 2, documentTypeId: 'second' }),
    ]);
    fireEvent.click(screen.getAllByTitle('Move down')[0]);
    expect(rowSummary()).toEqual([['1', 'second'], ['2', 'first']]);
  });

  it('preserves non-sequential priorities rather than renumbering them', () => {
    renderEditor([
      rule({ priority: 10, documentTypeId: 'first' }),
      rule({ priority: 40, documentTypeId: 'second' }),
    ]);
    fireEvent.click(screen.getAllByTitle('Move down')[0]);
    expect(rowSummary()).toEqual([['10', 'second'], ['40', 'first']]);
  });

  it('the ends of the list cannot be moved past', () => {
    renderEditor([rule({ documentTypeId: 'a' }), rule({ priority: 2, documentTypeId: 'b' })]);
    expect(screen.getAllByTitle('Move up')[0]).toBeDisabled();
    expect(screen.getAllByTitle('Move down')[1]).toBeDisabled();
  });
});

describe('MappingRuleEditor deletion', () => {
  it('removes exactly the targeted row', () => {
    const onChange = renderEditor([
      rule({ documentTypeId: 'keep-me' }),
      rule({ priority: 2, documentTypeId: 'delete-me' }),
    ]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[1]);
    expect(onChange.mock.calls[0][0]).toHaveLength(1);
    expect(onChange.mock.calls[0][0][0].documentTypeId).toBe('keep-me');
  });

  it('deleting the last rule falls back to the empty state', () => {
    renderEditor([rule()]);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByText(/No mapping rules configured/)).toBeInTheDocument();
  });

  // NOTE: deleting a row ABOVE the row currently being edited is broken —
  // `deleteRule` only clears the edit state when the deleted index IS the
  // edited index, so `editingIdx` keeps pointing at a now-shifted row and a
  // subsequent Save writes the stale draft over the wrong rule. Not covered
  // here on purpose: a test would have to assert the corrupt result.
  // See MappingRuleEditor.tsx:73-80 (deleteRule) and :51-58 (saveEdit).
});

describe('MappingRuleEditor preview', () => {
  it('cannot be run without a path', () => {
    renderEditor([rule()]);
    expect(screen.getByRole('button', { name: 'Preview' })).toBeDisabled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('posts the path together with the current rule set', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true, json: () => Promise.resolve({ matched: 'dt-pdf' }),
    });
    const rules = [rule()];
    renderEditor(rules);
    fireEvent.change(screen.getByPlaceholderText(/preview mapping/), { target: { value: '/a/b.pdf' } });
    fireEvent.click(screen.getByRole('button', { name: 'Preview' }));
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const body = JSON.parse((fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0][1].body as string);
    expect(body).toEqual({ path: '/a/b.pdf', rules });
  });

  it('renders a failed preview as text instead of throwing', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ ok: false, status: 500 });
    renderEditor([rule()]);
    fireEvent.change(screen.getByPlaceholderText(/preview mapping/), { target: { value: '/a/b.pdf' } });
    fireEvent.click(screen.getByRole('button', { name: 'Preview' }));
    await waitFor(() => expect(screen.getByText(/Error: HTTP 500/)).toBeInTheDocument());
  });
});
