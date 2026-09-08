import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { Section } from '../../../types/document';
import DateEditorRenderer from '../DateEditorRenderer';
import DateReaderRenderer from '../DateReaderRenderer';

const makeSection = (over: Partial<Section> = {}): Section => ({
  id: 's1', type: 'notes', title: 'Due Date', collapsed: false, items: [],
  sectionType: 'date', ...over,
});

describe('DateReaderRenderer', () => {
  it('reads as unanswered when no date was set — never the epoch', () => {
    render(<DateReaderRenderer section={makeSection()} viewMode="reader" editable={false} />);
    const empty = screen.getByTestId('date-field-empty-s1');
    expect(empty).toHaveTextContent('No date set.');
    expect(empty).not.toHaveTextContent('1970');
  });

  it('formats the stored date and keeps it machine-readable', () => {
    render(<DateReaderRenderer section={makeSection({ metadata: { value: '2026-03-04' } })} viewMode="reader" editable={false} />);
    const el = screen.getByTestId('date-field-reader-s1');
    expect(el.tagName).toBe('TIME');
    expect(el).toHaveAttribute('datetime', '2026-03-04');
    // Formatted in UTC: a local-timezone format would render Mar 3 for every
    // user west of Greenwich.
    expect(el.textContent).toContain('2026');
    expect(el.textContent).toContain('4');
    expect(el.textContent).not.toContain('3,');
  });

  it('narrows a full ISO timestamp to its date part instead of rejecting it', () => {
    render(
      <DateReaderRenderer
        section={makeSection({ metadata: { value: '2026-03-04T17:45:00.000Z' } })}
        viewMode="reader" editable={false}
      />,
    );
    expect(screen.getByTestId('date-field-reader-s1')).toHaveAttribute('datetime', '2026-03-04');
  });

  it('treats a non-date string as unanswered', () => {
    render(<DateReaderRenderer section={makeSection({ metadata: { value: 'soon' } })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('date-field-empty-s1')).toBeInTheDocument();
  });
});

describe('DateEditorRenderer', () => {
  it('uses a native date control, not a hand-rolled text field', () => {
    render(<DateEditorRenderer section={makeSection()} viewMode="editor" editable />);
    expect(screen.getByTestId('date-field-input-s1')).toHaveAttribute('type', 'date');
  });

  it('shows the unanswered hint and no Clear button when empty', () => {
    render(<DateEditorRenderer section={makeSection()} viewMode="editor" editable />);
    expect(screen.getByTestId('date-field-input-s1')).toHaveValue('');
    expect(screen.getByTestId('date-field-hint-s1')).toHaveTextContent('No date set');
    expect(screen.queryByTestId('date-field-clear-s1')).not.toBeInTheDocument();
  });

  it('writes the picked date to metadata.value, preserving siblings', () => {
    const onUpdateSection = vi.fn();
    render(
      <DateEditorRenderer
        section={makeSection({ metadata: { keepMe: 'x' } })}
        viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.change(screen.getByTestId('date-field-input-s1'), { target: { value: '2026-03-04' } });
    expect(onUpdateSection).toHaveBeenCalledWith({ metadata: { keepMe: 'x', value: '2026-03-04' } });
  });

  it('echoes the formatted date next to the control', () => {
    render(<DateEditorRenderer section={makeSection({ metadata: { value: '2026-03-04' } })} viewMode="editor" editable />);
    expect(screen.getByTestId('date-field-formatted-s1').textContent).toContain('2026');
  });

  it('Clear returns the field to unanswered by deleting the key', () => {
    const onUpdateSection = vi.fn();
    render(
      <DateEditorRenderer
        section={makeSection({ metadata: { value: '2026-03-04' } })}
        viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.click(screen.getByTestId('date-field-clear-s1'));
    expect(onUpdateSection).toHaveBeenCalledWith({ metadata: {} });
  });

  it('clearing the native control unsets rather than storing an empty string', () => {
    const onUpdateSection = vi.fn();
    render(
      <DateEditorRenderer
        section={makeSection({ metadata: { value: '2026-03-04' } })}
        viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.change(screen.getByTestId('date-field-input-s1'), { target: { value: '' } });
    expect(onUpdateSection).toHaveBeenCalledWith({ metadata: {} });
  });

  it('a finalized document reads the date instead of offering a picker', () => {
    render(
      <DateEditorRenderer
        section={makeSection({ metadata: { value: '2026-03-04' } })}
        viewMode="editor" editable={false}
      />,
    );
    expect(screen.getByTestId('date-field-reader-s1')).toBeInTheDocument();
    expect(screen.queryByTestId('date-field-input-s1')).not.toBeInTheDocument();
  });
});
