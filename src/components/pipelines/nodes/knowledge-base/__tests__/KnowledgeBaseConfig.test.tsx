import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import KnowledgeBaseConfig from '../KnowledgeBaseConfig';
import type { KnowledgeBaseNodeData } from '../../../../../types/pipeline';

const base = (over: Partial<KnowledgeBaseNodeData> = {}): KnowledgeBaseNodeData => ({
  type: 'knowledge-base',
  knowledgeBaseId: 'kb-1',
  queryTemplate: '{{context.trigger.question}}',
  topK: 5,
  ...over,
});

const show = (data: KnowledgeBaseNodeData, onChange = vi.fn()) => {
  render(<KnowledgeBaseConfig data={data} onChange={onChange} />);
  return onChange;
};

describe('KnowledgeBaseConfig', () => {
  it('edits the knowledge base id and query template', () => {
    const onChange = show(base());
    // Required fields carry ConfigField's aria-hidden "●" in the label text,
    // which getByLabelText's textContent match trips over and the accessible
    // name drops — so query by role+name now that the visible label (rather
    // than a restating aria-label) is what names these controls.
    fireEvent.change(screen.getByRole('textbox', { name: 'Knowledge base ID' }), {
      target: { value: 'kb-2' },
    });
    expect(onChange).toHaveBeenCalledWith({ knowledgeBaseId: 'kb-2' });

    fireEvent.change(screen.getByRole('textbox', { name: 'Query template' }), {
      target: { value: 'find docs' },
    });
    expect(onChange).toHaveBeenCalledWith({ queryTemplate: 'find docs' });
  });

  it('requires an id and a query template', () => {
    show(base({ knowledgeBaseId: '  ', queryTemplate: '' }));
    expect(screen.getByText('Knowledge base ID is required.')).toBeInTheDocument();
    expect(screen.getByText('Query template is required.')).toBeInTheDocument();
  });

  it('rejects a topK outside 1..100', () => {
    show(base({ topK: 0 }));
    expect(screen.getByText('Must be between 1 and 100.')).toBeInTheDocument();
  });

  it('accepts the topK boundaries', () => {
    const { unmount } = render(
      <KnowledgeBaseConfig data={base({ topK: 1 })} onChange={vi.fn()} />,
    );
    expect(screen.queryByText('Must be between 1 and 100.')).toBeNull();
    unmount();

    render(<KnowledgeBaseConfig data={base({ topK: 100 })} onChange={vi.fn()} />);
    expect(screen.queryByText('Must be between 1 and 100.')).toBeNull();
  });

  it('treats a score threshold of 0 as valid, not missing', () => {
    // 0 means "keep everything" — a falsy check here would flag it as an error.
    show(base({ scoreThreshold: 0 }));
    expect(screen.queryByText('Must be between 0 and 1.')).toBeNull();
  });

  it('rejects a score threshold above 1', () => {
    show(base({ scoreThreshold: 1.5 }));
    expect(screen.getByText('Must be between 0 and 1.')).toBeInTheDocument();
  });

  it('leaves the score threshold unset rather than defaulting it', () => {
    show(base());
    expect(screen.queryByText('Must be between 0 and 1.')).toBeNull();
  });

  it('clears the output key to undefined when emptied', () => {
    // '' would persist an empty string into the definition and read as a
    // configured-but-blank key downstream.
    const onChange = show(base({ outputKey: 'passages' }));
    fireEvent.change(screen.getByLabelText('Output key'), { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith({ outputKey: undefined });
  });

  it('renders without an editor provider', () => {
    // The context picker must not require the pipeline editor to be mounted.
    expect(() => show(base())).not.toThrow();
  });
});
