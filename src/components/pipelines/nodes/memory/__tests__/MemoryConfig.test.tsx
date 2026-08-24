import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MemoryConfig from '../MemoryConfig';
import type { MemoryNodeData } from '../../../../../types/pipeline';

const base = (over: Partial<MemoryNodeData> = {}): MemoryNodeData => ({
  type: 'memory', mode: 'read', scope: 'session',
  namespace: 'support', keyExpression: '{{context.trigger.userId}}', ...over,
});

const show = (data: MemoryNodeData, onChange = vi.fn()) => {
  render(<MemoryConfig data={data} onChange={onChange} />);
  return onChange;
};

// These queries used to name the controls "Memory mode" / "Memory scope" /
// "Memory output key" — aria-labels the panel carried BECAUSE the visible
// <label> named nothing. They pinned that: the field on screen reads "Mode",
// so the test passed against a name no sighted user could see, and would have
// kept passing if the visible label were deleted outright. The labels are now
// wired to their controls, so the assertions query the accessible name the
// visible label produces. (ConfigField appends an aria-hidden "●" to a
// required label, which getByLabelText's raw textContent match would trip
// over but the accessible-name computation correctly drops — hence getByRole
// with a name for the required fields.)
describe('MemoryConfig', () => {
  it('edits mode and scope', () => {
    const onChange = show(base());
    fireEvent.change(screen.getByRole('combobox', { name: 'Mode' }), {
      target: { value: 'write' },
    });
    expect(onChange).toHaveBeenCalledWith({ mode: 'write' });
    fireEvent.change(screen.getByRole('combobox', { name: 'Scope' }), {
      target: { value: 'long-term' },
    });
    expect(onChange).toHaveBeenCalledWith({ scope: 'long-term' });
  });

  it('requires a namespace and a key expression', () => {
    show(base({ namespace: '', keyExpression: '' }));
    expect(screen.getByText('Namespace is required.')).toBeInTheDocument();
    expect(screen.getByText('Key expression is required.')).toBeInTheDocument();
  });

  it('asks for a value field only when writing', () => {
    show(base({ mode: 'write', valueField: '' }));
    expect(screen.getByText('Value field is required for a write.')).toBeInTheDocument();
  });

  it('offers an output key instead of a value field when reading', () => {
    show(base({ mode: 'read' }));
    expect(screen.getByLabelText('Output key')).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'Value field' })).toBeNull();
  });

  it('does not demand a value field on a read', () => {
    show(base({ mode: 'read', valueField: '' }));
    expect(screen.queryByText('Value field is required for a write.')).toBeNull();
  });

  it('clears optional fields to undefined rather than empty string', () => {
    const onChange = show(base({ mode: 'read', outputKey: 'recalled' }));
    fireEvent.change(screen.getByLabelText('Output key'), { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith({ outputKey: undefined });
  });
});
