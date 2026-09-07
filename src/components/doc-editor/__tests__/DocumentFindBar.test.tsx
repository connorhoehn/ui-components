import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DocumentFindBar } from '../DocumentFindBar';

afterEach(cleanup);

/**
 * A stand-in editor: the bar only needs a doc to search and a chain to move the
 * selection with. Recording the chain calls is how we assert the two things
 * that are easy to get wrong — that stepping SELECTS the right range, and that
 * replace-all walks backwards.
 */
function makeEditor(text: string, cursor = 0) {
  const calls: string[] = [];
  const chain: Record<string, unknown> = {};
  for (const name of ['focus', 'setTextSelection', 'scrollIntoView', 'insertContent', 'run']) {
    chain[name] = (arg?: unknown) => {
      calls.push(arg === undefined ? name : `${name}:${JSON.stringify(arg)}`);
      return chain;
    };
  }
  const editor = {
    state: {
      doc: { descendants: (fn: (n: unknown, pos: number) => void) => fn({ isText: true, text }, 1) },
      selection: { from: cursor },
    },
    chain: () => chain,
    commands: { focus: () => {} },
  };
  return { editor: editor as never, calls };
}

describe('DocumentFindBar', () => {
  it('counts matches as you type, before you step anywhere', () => {
    const { editor } = makeEditor('the cat sat on the mat');
    render(<DocumentFindBar editor={editor} onClose={() => {}} />);

    // Nothing typed: no count at all, rather than "0 of 0".
    expect(screen.getByTestId('find-bar-count').textContent).toBe('');

    fireEvent.change(screen.getByTestId('find-bar-query'), { target: { value: 'the' } });
    expect(screen.getByTestId('find-bar-count').textContent).toBe('1 of 2');
  });

  it('says so when a term is not there', () => {
    const { editor } = makeEditor('the cat sat');
    render(<DocumentFindBar editor={editor} onClose={() => {}} />);
    fireEvent.change(screen.getByTestId('find-bar-query'), { target: { value: 'dog' } });
    expect(screen.getByTestId('find-bar-count').textContent).toBe('No results');
    expect(screen.getByTestId('find-bar-next')).toBeDisabled();
  });

  it('selects the match it steps to, and scrolls it into view', () => {
    // A match below the fold that is selected but not shown reads as
    // "found nothing".
    const { editor, calls } = makeEditor('the cat sat on the mat');
    render(<DocumentFindBar editor={editor} onClose={() => {}} />);
    fireEvent.change(screen.getByTestId('find-bar-query'), { target: { value: 'the' } });
    fireEvent.click(screen.getByTestId('find-bar-next'));

    expect(calls.join('|')).toContain('setTextSelection:{"from":1,"to":4}');
    expect(calls).toContain('scrollIntoView');
  });

  it('replaces all matches back to front', () => {
    // Replacing shifts every position after the match, so going forwards
    // would invalidate the rest of the list on the first edit.
    const { editor, calls } = makeEditor('the cat sat on the mat');
    render(<DocumentFindBar editor={editor} onClose={() => {}} />);
    fireEvent.change(screen.getByTestId('find-bar-query'), { target: { value: 'the' } });
    fireEvent.change(screen.getByTestId('find-bar-replacement'), { target: { value: 'a' } });
    fireEvent.click(screen.getByTestId('find-bar-replace-all'));

    const selections = calls.filter((c) => c.startsWith('setTextSelection'));
    expect(selections[0]).toContain('"from":16');
    expect(selections[1]).toContain('"from":1');
  });

  it('hides replace when the document cannot be edited, but still finds', () => {
    const { editor } = makeEditor('the cat sat');
    render(<DocumentFindBar editor={editor} onClose={() => {}} canReplace={false} />);
    expect(screen.queryByTestId('find-bar-replacement')).toBeNull();
    expect(screen.getByTestId('find-bar-query')).toBeInTheDocument();
  });

  it('closes on Escape', () => {
    const onClose = vi.fn();
    const { editor } = makeEditor('text');
    render(<DocumentFindBar editor={editor} onClose={onClose} />);
    fireEvent.keyDown(screen.getByTestId('find-bar-query'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
