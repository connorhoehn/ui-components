import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { Section } from '../../../types/document';
import BooleanEditorRenderer from '../BooleanEditorRenderer';
import BooleanReaderRenderer from '../BooleanReaderRenderer';

const makeSection = (over: Partial<Section> = {}): Section => ({
  id: 's1', type: 'notes', title: 'SOC2 Compliant', collapsed: false, items: [],
  sectionType: 'boolean', ...over,
});

describe('BooleanReaderRenderer', () => {
  it('reads as unanswered when nobody answered — never as No', () => {
    render(<BooleanReaderRenderer section={makeSection()} viewMode="reader" editable={false} />);
    const empty = screen.getByTestId('boolean-field-empty-s1');
    expect(empty).toHaveTextContent('Not answered.');
    // The "No" glyph belongs to an explicit negative answer only. ("Not
    // answered" contains the letters, so assert on the mark, not the word.)
    expect(empty.textContent).not.toContain('\u2717');
    expect(screen.queryByTestId('boolean-field-reader-s1')).not.toBeInTheDocument();
  });

  it('renders an explicit No distinctly from unanswered', () => {
    render(<BooleanReaderRenderer section={makeSection({ metadata: { value: false } })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('boolean-field-reader-s1')).toHaveTextContent('No');
    expect(screen.queryByTestId('boolean-field-empty-s1')).not.toBeInTheDocument();
  });

  it('renders Yes', () => {
    render(<BooleanReaderRenderer section={makeSection({ metadata: { value: true } })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('boolean-field-reader-s1')).toHaveTextContent('Yes');
  });

  it('a truthy non-boolean does not count as an answer', () => {
    render(<BooleanReaderRenderer section={makeSection({ metadata: { value: 'yes' } })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('boolean-field-empty-s1')).toBeInTheDocument();
  });
});

describe('BooleanEditorRenderer', () => {
  it('shows the unanswered state as mixed, not as an unticked No', () => {
    render(<BooleanEditorRenderer section={makeSection()} viewMode="editor" editable />);
    const box = screen.getByTestId('boolean-field-input-s1') as HTMLInputElement;
    expect(box.indeterminate).toBe(true);
    expect(box).toHaveAttribute('aria-checked', 'mixed');
    expect(screen.getByTestId('boolean-field-status-s1')).toHaveTextContent('Not answered');
    expect(screen.queryByTestId('boolean-field-clear-s1')).not.toBeInTheDocument();
  });

  it('names itself after the section for assistive tech', () => {
    render(<BooleanEditorRenderer section={makeSection()} viewMode="editor" editable />);
    expect(screen.getByLabelText('SOC2 Compliant')).toBeInTheDocument();
  });

  it('answering an unanswered field stores Yes', () => {
    const onUpdateSection = vi.fn();
    render(
      <BooleanEditorRenderer
        section={makeSection({ metadata: { keepMe: 1 } })}
        viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.click(screen.getByTestId('boolean-field-input-s1'));
    expect(onUpdateSection).toHaveBeenCalledWith({ metadata: { keepMe: 1, value: true } });
  });

  it('unticking a Yes stores an explicit No', () => {
    const onUpdateSection = vi.fn();
    render(
      <BooleanEditorRenderer
        section={makeSection({ metadata: { value: true } })}
        viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.click(screen.getByTestId('boolean-field-input-s1'));
    expect(onUpdateSection).toHaveBeenCalledWith({ metadata: { value: false } });
  });

  it('Clear returns an answered field to unanswered', () => {
    const onUpdateSection = vi.fn();
    render(
      <BooleanEditorRenderer
        section={makeSection({ metadata: { value: false } })}
        viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    expect(screen.getByTestId('boolean-field-status-s1')).toHaveTextContent('No');
    fireEvent.click(screen.getByTestId('boolean-field-clear-s1'));
    expect(onUpdateSection).toHaveBeenCalledWith({ metadata: {} });
  });

  it('a finalized document reads the answer instead of offering a checkbox', () => {
    render(
      <BooleanEditorRenderer
        section={makeSection({ metadata: { value: true } })}
        viewMode="editor" editable={false}
      />,
    );
    expect(screen.getByTestId('boolean-field-reader-s1')).toHaveTextContent('Yes');
    expect(screen.queryByTestId('boolean-field-input-s1')).not.toBeInTheDocument();
  });
});
