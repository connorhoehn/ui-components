import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GraphQueryConfig from '../GraphQueryConfig';
import type { GraphQueryNodeData } from '../../../../../types/pipeline';

const base = (over: Partial<GraphQueryNodeData> = {}): GraphQueryNodeData => ({
  type: 'graph-query',
  graphId: 'neptune-prod',
  query: 'MATCH (n) RETURN n',
  ...over,
});

const show = (data: GraphQueryNodeData, onChange = vi.fn()) => {
  render(<GraphQueryConfig data={data} onChange={onChange} />);
  return onChange;
};

describe('GraphQueryConfig', () => {
  it('edits the graph id and query', () => {
    const onChange = show(base());
    fireEvent.change(screen.getByLabelText('Graph ID'), { target: { value: 'g2' } });
    expect(onChange).toHaveBeenCalledWith({ graphId: 'g2' });

    fireEvent.change(screen.getByLabelText('openCypher query'), {
      target: { value: 'MATCH (u:User) RETURN u' },
    });
    expect(onChange).toHaveBeenCalledWith({ query: 'MATCH (u:User) RETURN u' });
  });

  it('requires a graph id and a query', () => {
    show(base({ graphId: '', query: '   ' }));
    expect(screen.getByText('Graph ID is required.')).toBeInTheDocument();
    expect(screen.getByText('Query is required.')).toBeInTheDocument();
  });

  it('says so when there are no parameters', () => {
    show(base());
    expect(screen.getByText(/No parameters/)).toBeInTheDocument();
  });

  it('adds a parameter row without clobbering an existing one', () => {
    // Naming the new row after the row count would collide with a user who
    // already renamed a row to that name.
    const onChange = show(base({ parameters: { param1: 'x' } }));
    fireEvent.click(screen.getByText('+ Add parameter'));
    const patch = onChange.mock.calls[0][0];
    expect(patch.parameters.param1).toBe('x');
    expect(Object.keys(patch.parameters)).toHaveLength(2);
  });

  it('renames a parameter in place, preserving row order', () => {
    const onChange = show(base({ parameters: { a: '1', b: '2' } }));
    fireEvent.change(screen.getByLabelText('Parameter 1 name'), {
      target: { value: 'userId' },
    });
    expect(onChange).toHaveBeenCalledWith({ parameters: { userId: '1', b: '2' } });
  });

  it('edits a parameter value', () => {
    const onChange = show(base({ parameters: { a: '1' } }));
    fireEvent.change(screen.getByLabelText('Parameter 1 value'), {
      target: { value: '{{context.trigger.id}}' },
    });
    expect(onChange).toHaveBeenCalledWith({
      parameters: { a: '{{context.trigger.id}}' },
    });
  });

  it('removes a parameter, dropping the key entirely when it was the last', () => {
    // An empty object would persist `parameters: {}` rather than unsetting it.
    const onChange = show(base({ parameters: { a: '1' } }));
    fireEvent.click(screen.getByLabelText('Remove parameter a'));
    expect(onChange).toHaveBeenCalledWith({ parameters: undefined });
  });

  it('refuses a rename that would collide, instead of silently merging rows', () => {
    // parameters is a Record, so renaming `b` to `a` would overwrite `a`'s
    // value AND drop a row — a binding disappears with no indication.
    const onChange = vi.fn();
    render(
      <GraphQueryConfig data={base({ parameters: { a: '1', b: '2' } })} onChange={onChange} />,
    );

    fireEvent.change(screen.getByLabelText('Parameter 2 name'), { target: { value: 'a' } });

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent(/already exists/);
  });

  it('allows a rename once the collision is resolved', () => {
    const onChange = vi.fn();
    render(
      <GraphQueryConfig data={base({ parameters: { a: '1', b: '2' } })} onChange={onChange} />,
    );
    fireEvent.change(screen.getByLabelText('Parameter 2 name'), { target: { value: 'a' } });
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText('Parameter 2 name'), { target: { value: 'c' } });
    expect(onChange).toHaveBeenCalledWith({ parameters: { a: '1', c: '2' } });
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('rejects an out-of-range timeout', () => {
    show(base({ timeoutMs: 10 }));
    expect(screen.getByText(/Must be between 100 and 300000 ms/)).toBeInTheDocument();
  });

  it('leaves the timeout unset rather than defaulting it', () => {
    show(base());
    expect(screen.queryByText(/Must be between 100 and 300000 ms/)).toBeNull();
  });

  it('renders without an editor provider', () => {
    expect(() => show(base())).not.toThrow();
  });
});
