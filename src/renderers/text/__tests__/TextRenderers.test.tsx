import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as Y from 'yjs';
import type { Section } from '../../../types/document';
import TextEditorRenderer from '../TextEditorRenderer';
import TextReaderRenderer from '../TextReaderRenderer';

const makeSection = (over: Partial<Section> = {}): Section => ({
  id: 's1', type: 'notes', title: 'Severity', collapsed: false, items: [],
  sectionType: 'text', ...over,
});

describe('TextReaderRenderer', () => {
  it('reads as unanswered when the value was never set', () => {
    render(<TextReaderRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('text-field-empty-s1')).toHaveTextContent('Not set.');
  });

  it('reads as unanswered when the value is whitespace only', () => {
    render(<TextReaderRenderer section={makeSection({ metadata: { value: '   ' } })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('text-field-empty-s1')).toBeInTheDocument();
  });

  it('renders the stored value as one line, not a prose box', () => {
    render(<TextReaderRenderer section={makeSection({ metadata: { value: 'Critical' } })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('text-field-reader-s1')).toHaveTextContent('Critical');
    expect(screen.queryByTestId('text-field-empty-s1')).not.toBeInTheDocument();
  });

  it('ignores a non-string left in the slot rather than stringifying it', () => {
    render(<TextReaderRenderer section={makeSection({ metadata: { value: { a: 1 } } })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('text-field-empty-s1')).toBeInTheDocument();
  });
});

describe('TextEditorRenderer', () => {
  it('shows the cookbook placeholder — the only guidance the author gets', () => {
    render(
      <TextEditorRenderer
        section={makeSection({ placeholder: 'Critical / High / Medium / Low' })}
        viewMode="editor" editable
      />,
    );
    expect(screen.getByTestId('text-field-input-s1')).toHaveAttribute('placeholder', 'Critical / High / Medium / Low');
  });

  it('is a single-line input, never a textarea', () => {
    render(<TextEditorRenderer section={makeSection()} viewMode="editor" editable />);
    const input = screen.getByTestId('text-field-input-s1');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('names itself after the section for assistive tech', () => {
    render(<TextEditorRenderer section={makeSection()} viewMode="editor" editable />);
    expect(screen.getByLabelText('Severity')).toBeInTheDocument();
  });

  it('writes typed text into metadata.value, preserving sibling metadata', () => {
    const onUpdateSection = vi.fn();
    render(
      <TextEditorRenderer
        section={makeSection({ metadata: { keepMe: 1 } })}
        viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.change(screen.getByTestId('text-field-input-s1'), { target: { value: 'High' } });
    expect(onUpdateSection).toHaveBeenCalledWith({ metadata: { keepMe: 1, value: 'High' } });
  });

  it('emptying the field UNSETS it rather than storing an empty string', () => {
    const onUpdateSection = vi.fn();
    render(
      <TextEditorRenderer
        section={makeSection({ metadata: { value: 'High' } })}
        viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.change(screen.getByTestId('text-field-input-s1'), { target: { value: '' } });
    expect(onUpdateSection).toHaveBeenCalledWith({ metadata: {} });
  });

  it('a finalized document (editable=false) reads as a value, not a disabled form', () => {
    render(
      <TextEditorRenderer
        section={makeSection({ metadata: { value: 'High' } })}
        viewMode="editor" editable={false}
      />,
    );
    expect(screen.getByTestId('text-field-reader-s1')).toHaveTextContent('High');
    expect(screen.queryByTestId('text-field-input-s1')).not.toBeInTheDocument();
  });
});

// The four scalar types took over sections DefaultRenderer used to edit as
// rich text. Anything already typed into that fragment must remain visible,
// or the upgrade reads as data loss.
describe('prose typed before this field had a renderer', () => {
  const fragmentWith = (words: string) => {
    const doc = new Y.Doc();
    const frag = doc.getXmlFragment('section');
    const para = new Y.XmlElement('paragraph');
    para.insert(0, [new Y.XmlText(words)]);
    frag.insert(0, [para]);
    return frag;
  };

  it('surfaces the old prose under an unanswered field, in the editor', () => {
    render(
      <TextEditorRenderer
        section={makeSection()} viewMode="editor" editable
        fragment={fragmentWith('Critical')}
      />,
    );
    expect(screen.getByTestId('scalar-legacy-note-s1')).toHaveTextContent('Critical');
  });

  it('surfaces it in the reader too', () => {
    render(
      <TextReaderRenderer
        section={makeSection()} viewMode="reader" editable={false}
        fragment={fragmentWith('Critical')}
      />,
    );
    expect(screen.getByTestId('scalar-legacy-note-s1')).toHaveTextContent('Critical');
  });

  it('disappears once the field has a real answer', () => {
    render(
      <TextEditorRenderer
        section={makeSection({ metadata: { value: 'High' } })} viewMode="editor" editable
        fragment={fragmentWith('Critical')}
      />,
    );
    expect(screen.queryByTestId('scalar-legacy-note-s1')).not.toBeInTheDocument();
  });

  it('adds no chrome when there is no legacy prose — the normal case', () => {
    render(<TextEditorRenderer section={makeSection()} viewMode="editor" editable />);
    expect(screen.queryByTestId('scalar-legacy-note-s1')).not.toBeInTheDocument();
  });
});
