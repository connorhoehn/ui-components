import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CodeEditor from '../CodeEditor';

function setTextareaSelection(textarea: HTMLTextAreaElement, start: number, end: number) {
  textarea.focus();
  textarea.setSelectionRange(start, end);
}

describe('CodeEditor', () => {
  describe('rendering', () => {
    it('renders a textarea with the initial value', () => {
      render(<CodeEditor value="hello" onChange={() => {}} aria-label="editor" />);
      const ta = screen.getByLabelText('editor') as HTMLTextAreaElement;
      expect(ta).toBeInTheDocument();
      expect(ta.value).toBe('hello');
    });

    it('passes placeholder through to the textarea', () => {
      render(
        <CodeEditor
          value=""
          onChange={() => {}}
          placeholder="type something"
          aria-label="editor"
        />,
      );
      const ta = screen.getByLabelText('editor');
      expect(ta).toHaveAttribute('placeholder', 'type something');
    });

    it('renders a gutter with at least minLines line numbers when value is short', () => {
      const { container } = render(
        <CodeEditor value="" onChange={() => {}} minLines={4} aria-label="editor" />,
      );
      const gutter = container.querySelector('[data-gutter]');
      expect(gutter).not.toBeNull();
      const lines = (gutter!.textContent ?? '').split('\n');
      expect(lines.length).toBeGreaterThanOrEqual(4);
      expect(lines[0]).toBe('1');
      expect(lines[3]).toBe('4');
    });

    it('grows the gutter to match line count when value exceeds minLines', () => {
      const value = ['a', 'b', 'c', 'd', 'e', 'f'].join('\n');
      const { container } = render(
        <CodeEditor value={value} onChange={() => {}} minLines={4} aria-label="editor" />,
      );
      const gutter = container.querySelector('[data-gutter]');
      const lines = (gutter!.textContent ?? '').split('\n');
      // 6 lines of content → gutter shows 6 line numbers
      expect(lines.length).toBe(6);
      expect(lines[5]).toBe('6');
    });
  });

  describe('onChange', () => {
    it('fires when the user types in the textarea', () => {
      const onChange = vi.fn();
      render(<CodeEditor value="abc" onChange={onChange} aria-label="editor" />);
      const ta = screen.getByLabelText('editor') as HTMLTextAreaElement;
      fireEvent.change(ta, { target: { value: 'abcd' } });
      expect(onChange).toHaveBeenCalledWith('abcd');
    });
  });

  describe('Tab key', () => {
    it('inserts two spaces at the cursor and prevents default', () => {
      const onChange = vi.fn();
      render(<CodeEditor value="abc" onChange={onChange} aria-label="editor" />);
      const ta = screen.getByLabelText('editor') as HTMLTextAreaElement;
      setTextareaSelection(ta, 1, 1);

      // fireEvent.keyDown returns false if any handler called preventDefault.
      const dispatched = fireEvent.keyDown(ta, { key: 'Tab' });
      expect(dispatched).toBe(false);
      expect(onChange).toHaveBeenCalledWith('a  bc');
    });

    it('replaces the current selection range when Tab is pressed', () => {
      const onChange = vi.fn();
      render(<CodeEditor value="hello" onChange={onChange} aria-label="editor" />);
      const ta = screen.getByLabelText('editor') as HTMLTextAreaElement;
      // Select 'ell' (positions 1..4).
      setTextareaSelection(ta, 1, 4);
      fireEvent.keyDown(ta, { key: 'Tab' });
      expect(onChange).toHaveBeenCalledWith('h  o');
    });

    it('is a no-op when readOnly', () => {
      const onChange = vi.fn();
      render(
        <CodeEditor value="abc" onChange={onChange} readOnly aria-label="editor" />,
      );
      const ta = screen.getByLabelText('editor') as HTMLTextAreaElement;
      setTextareaSelection(ta, 1, 1);
      const dispatched = fireEvent.keyDown(ta, { key: 'Tab' });
      // readOnly returns before preventDefault → event remains cancelable/true.
      expect(dispatched).toBe(true);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not intercept non-Tab keys', () => {
      const onChange = vi.fn();
      render(<CodeEditor value="abc" onChange={onChange} aria-label="editor" />);
      const ta = screen.getByLabelText('editor') as HTMLTextAreaElement;
      setTextareaSelection(ta, 1, 1);
      const dispatched = fireEvent.keyDown(ta, { key: 'Enter' });
      expect(dispatched).toBe(true);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('variable pills', () => {
    it('does not render a pill row when variables is empty or undefined', () => {
      const { rerender } = render(
        <CodeEditor value="" onChange={() => {}} aria-label="editor" />,
      );
      expect(screen.queryByTitle(/Insert/)).not.toBeInTheDocument();

      rerender(
        <CodeEditor value="" onChange={() => {}} variables={[]} aria-label="editor" />,
      );
      expect(screen.queryByTitle(/Insert/)).not.toBeInTheDocument();
    });

    it('renders one button per variable with the right title', () => {
      render(
        <CodeEditor
          value=""
          onChange={() => {}}
          variables={['foo', 'bar']}
          aria-label="editor"
        />,
      );
      expect(screen.getByTitle('Insert {{ foo }}')).toBeInTheDocument();
      expect(screen.getByTitle('Insert {{ bar }}')).toBeInTheDocument();
    });

    it('inserts {{ varName }} at the cursor on pill click', () => {
      const onChange = vi.fn();
      render(
        <CodeEditor
          value="hi "
          onChange={onChange}
          variables={['name']}
          aria-label="editor"
        />,
      );
      const ta = screen.getByLabelText('editor') as HTMLTextAreaElement;
      setTextareaSelection(ta, 3, 3);
      fireEvent.click(screen.getByTitle('Insert {{ name }}'));
      expect(onChange).toHaveBeenCalledWith('hi {{ name }}');
    });

    it('disables variable pills when readOnly', () => {
      render(
        <CodeEditor
          value=""
          onChange={() => {}}
          variables={['foo']}
          readOnly
          aria-label="editor"
        />,
      );
      const pill = screen.getByTitle('Insert {{ foo }}') as HTMLButtonElement;
      expect(pill).toBeDisabled();
    });
  });

  describe('readOnly', () => {
    it('marks the textarea as readOnly', () => {
      render(
        <CodeEditor value="abc" onChange={() => {}} readOnly aria-label="editor" />,
      );
      const ta = screen.getByLabelText('editor') as HTMLTextAreaElement;
      expect(ta).toHaveAttribute('readonly');
    });
  });

  describe('focus state', () => {
    it('applies the focused border style when the textarea is focused', () => {
      render(<CodeEditor value="" onChange={() => {}} aria-label="editor" />);
      const ta = screen.getByLabelText('editor') as HTMLTextAreaElement;
      // The bordered wrapper is the textarea's parent element.
      const wrapper = ta.parentElement!;
      expect(wrapper.className).not.toMatch(/border-primary/);
      fireEvent.focus(ta);
      expect(wrapper.className).toMatch(/border-primary/);
      fireEvent.blur(ta);
      expect(wrapper.className).not.toMatch(/border-primary/);
    });
  });
});
