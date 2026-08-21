import { render, screen, fireEvent } from '@testing-library/react';
import type { Editor } from '@tiptap/react';
import EditorToolbar from '../EditorToolbar';

function makeMockEditor(activeMarks: Set<string> = new Set()) {
  const calls: string[] = [];
  const chain = (label: string) => ({
    focus: () => chain(label),
    toggleBold: () => { calls.push('toggleBold'); return chain(label); },
    toggleItalic: () => { calls.push('toggleItalic'); return chain(label); },
    toggleStrike: () => { calls.push('toggleStrike'); return chain(label); },
    toggleCode: () => { calls.push('toggleCode'); return chain(label); },
    toggleHeading: ({ level }: { level: number }) => { calls.push(`toggleHeading:${level}`); return chain(label); },
    toggleBulletList: () => { calls.push('toggleBulletList'); return chain(label); },
    toggleOrderedList: () => { calls.push('toggleOrderedList'); return chain(label); },
    toggleTaskList: () => { calls.push('toggleTaskList'); return chain(label); },
    toggleBlockquote: () => { calls.push('toggleBlockquote'); return chain(label); },
    toggleCodeBlock: () => { calls.push('toggleCodeBlock'); return chain(label); },
    setHorizontalRule: () => { calls.push('setHorizontalRule'); return chain(label); },
    run: () => true,
  });
  const editor = {
    chain: () => chain('root'),
    isActive: (name: string, attrs?: Record<string, unknown>) => {
      if (attrs && 'level' in attrs) return activeMarks.has(`${name}:${attrs.level}`);
      return activeMarks.has(name);
    },
  } as unknown as Editor;
  return { editor, calls };
}

describe('EditorToolbar', () => {
  it('renders nothing when the editor is null', () => {
    const { container } = render(<EditorToolbar editor={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders all 13 formatting buttons', () => {
    const { editor } = makeMockEditor();
    render(<EditorToolbar editor={editor} />);
    const labels = ['B', 'I', 'S', '</>', 'H1', 'H2', 'H3', 'Bullet', 'Ordered', 'Task', 'Quote', 'Code Block', 'HR'];
    for (const l of labels) {
      expect(screen.getByText(l)).toBeInTheDocument();
    }
  });

  it('runs the matching editor command when a button is clicked', () => {
    const { editor, calls } = makeMockEditor();
    render(<EditorToolbar editor={editor} />);
    fireEvent.click(screen.getByText('B'));
    fireEvent.click(screen.getByText('H2'));
    fireEvent.click(screen.getByText('Bullet'));
    fireEvent.click(screen.getByText('HR'));
    expect(calls).toEqual(['toggleBold', 'toggleHeading:2', 'toggleBulletList', 'setHorizontalRule']);
  });

  it('applies the active class set when isActive returns true for a mark', () => {
    const { editor } = makeMockEditor(new Set(['bold']));
    render(<EditorToolbar editor={editor} />);
    expect(screen.getByText('B').className).toMatch(/bg-info/);
    // Italic is not active, so it stays in the white bucket.
    expect(screen.getByText('I').className).toMatch(/bg-white/);
  });
});
