import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { Section } from '../../../types/document';
import NumberEditorRenderer from '../NumberEditorRenderer';
import NumberReaderRenderer from '../NumberReaderRenderer';

const makeSection = (over: Partial<Section> = {}): Section => ({
  id: 's1', type: 'notes', title: 'Deal Value', collapsed: false, items: [],
  sectionType: 'number', ...over,
});

describe('NumberReaderRenderer', () => {
  it('reads as unanswered when nobody filled it in — never 0', () => {
    render(<NumberReaderRenderer section={makeSection()} viewMode="reader" editable={false} />);
    const empty = screen.getByTestId('number-field-empty-s1');
    expect(empty).toHaveTextContent('No value.');
    expect(empty).not.toHaveTextContent('0');
  });

  it('renders a real zero as a value, not as unanswered', () => {
    render(<NumberReaderRenderer section={makeSection({ metadata: { value: 0 } })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('number-field-reader-s1')).toHaveTextContent('0');
    expect(screen.queryByTestId('number-field-empty-s1')).not.toBeInTheDocument();
  });

  it('groups thousands without rounding the value away', () => {
    render(<NumberReaderRenderer section={makeSection({ metadata: { value: 1234567.8912 } })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('number-field-reader-s1').textContent).toContain('8912');
  });

  it('accepts a numeric string left by a JSON round-trip', () => {
    render(<NumberReaderRenderer section={makeSection({ metadata: { value: '42' } })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('number-field-reader-s1')).toHaveTextContent('42');
  });

  it('treats NaN as unanswered', () => {
    render(<NumberReaderRenderer section={makeSection({ metadata: { value: Number.NaN } })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('number-field-empty-s1')).toBeInTheDocument();
  });
});

describe('NumberEditorRenderer', () => {
  it('renders an empty numeric field when unanswered — not a pre-filled 0', () => {
    render(<NumberEditorRenderer section={makeSection()} viewMode="editor" editable />);
    const input = screen.getByTestId('number-field-input-s1');
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveValue(null);
  });

  it('uses the cookbook placeholder when there is one', () => {
    render(<NumberEditorRenderer section={makeSection({ placeholder: '0.00' })} viewMode="editor" editable />);
    expect(screen.getByTestId('number-field-input-s1')).toHaveAttribute('placeholder', '0.00');
  });

  it('writes the typed number, preserving sibling metadata', () => {
    const onUpdateSection = vi.fn();
    render(
      <NumberEditorRenderer
        section={makeSection({ metadata: { keepMe: true } })}
        viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.change(screen.getByTestId('number-field-input-s1'), { target: { value: '2500' } });
    expect(onUpdateSection).toHaveBeenCalledWith({ metadata: { keepMe: true, value: 2500 } });
  });

  it('emptying the field unsets it instead of leaving the old number behind', () => {
    const onUpdateSection = vi.fn();
    render(
      <NumberEditorRenderer
        section={makeSection({ metadata: { value: 42 } })}
        viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.change(screen.getByTestId('number-field-input-s1'), { target: { value: '' } });
    expect(onUpdateSection).toHaveBeenCalledWith({ metadata: {} });
  });

  it('a finalized document reads the number instead of offering a field', () => {
    render(
      <NumberEditorRenderer
        section={makeSection({ metadata: { value: 42 } })}
        viewMode="editor" editable={false}
      />,
    );
    expect(screen.getByTestId('number-field-reader-s1')).toHaveTextContent('42');
    expect(screen.queryByTestId('number-field-input-s1')).not.toBeInTheDocument();
  });
});
