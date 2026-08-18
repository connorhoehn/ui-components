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

describe('MemoryConfig', () => {
  it('edits mode and scope', () => {
    const onChange = show(base());
    fireEvent.change(screen.getByLabelText('Memory mode'), { target: { value: 'write' } });
    expect(onChange).toHaveBeenCalledWith({ mode: 'write' });
    fireEvent.change(screen.getByLabelText('Memory scope'), { target: { value: 'long-term' } });
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
    expect(screen.getByLabelText('Memory output key')).toBeInTheDocument();
    expect(screen.queryByLabelText('Memory value field')).toBeNull();
  });

  it('does not demand a value field on a read', () => {
    show(base({ mode: 'read', valueField: '' }));
    expect(screen.queryByText('Value field is required for a write.')).toBeNull();
  });

  it('clears optional fields to undefined rather than empty string', () => {
    const onChange = show(base({ mode: 'read', outputKey: 'recalled' }));
    fireEvent.change(screen.getByLabelText('Memory output key'), { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith({ outputKey: undefined });
  });
});
