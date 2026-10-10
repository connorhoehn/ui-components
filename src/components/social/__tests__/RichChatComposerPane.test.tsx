// 2.431.0: `responsive="pane"` — a composer in a side pane beside a page is
// ONE input row below the wide breakpoint: a single mode · subject chip, an
// icon-only Send, a 1px focus border; wide, nothing changes. And `Tabs`
// folds its tail into `More ▾` by its parent's width (`overflowBelow`).
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';
import { Tabs } from '../../shared/Tabs';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
  }
});

const refs = [{ id: 'initiative:p-llm', label: 'Org › Initiatives › LLM Application Platform' }];

function renderComposer(layout: 'medium' | 'wide' | 'narrow', extra: Record<string, unknown> = {}) {
  return render(<RichChatComposer data-testid="c" layout={layout} responsive="pane" modeControl="menu"
    mode="chat" onModeChange={() => true} modes={['chat', 'agent']} references={refs} onRemoveReference={() => {}}
    onSend={() => true} {...extra} />);
}

describe('RichChatComposer responsive="pane"', () => {
  it('below wide: one row — the context chip, no mode row, no references row, icon-only Send', () => {
    renderComposer('medium');
    const root = screen.getByTestId('c');
    expect(root.getAttribute('data-responsive')).toBe('pane');
    expect(root.className).toContain('focus-within:ring-0');
    const chip = screen.getByTestId('c-context-chip');
    expect(chip.textContent).toContain('Chat');
    expect(chip.textContent).toContain('Platform');
    expect(chip.className).toContain('whitespace-nowrap');
    expect(screen.queryByTestId('c-modes')).toBeNull();
    expect(screen.queryByTestId('c-references')).toBeNull();
    const send = screen.getByTestId('c-send');
    expect(send.getAttribute('data-icon-only')).toBe('true');
    expect(send.textContent).toBe('Send');
    expect(send.querySelector('.sr-only')?.textContent).toBe('Send');
    // Aa and ? wait for focus.
    expect(screen.queryByTestId('c-format-toggle')).toBeNull();
    expect(screen.getByTestId('c-body').className).toContain('uic-composer-single-row');
  });

  it('the chip keeps both ends of a long subject and removes it with ×', () => {
    const remove = vi.fn();
    renderComposer('medium', { onRemoveReference: remove });
    const label = screen.getByTestId('c-context-label');
    expect(label.children).toHaveLength(2);
    expect(label.lastElementChild?.textContent).toBe('ion Platform');
    fireEvent.click(screen.getByRole('button', { name: /Remove Org › Initiatives › LLM Application Platform/ }));
    expect(remove).toHaveBeenCalledWith('initiative:p-llm');
  });

  it('focus brings Aa (and the host’s row end) back', () => {
    renderComposer('medium', { modeRowEnd: <span data-testid="row-end">@</span> });
    act(() => { screen.getByTestId('c-context-chip').querySelector('button')!.focus(); });
    expect(screen.getByTestId('c-format-toggle')).toBeTruthy();
    expect(screen.getByTestId('row-end')).toBeTruthy();
  });

  it('wide: unchanged (mode row, labelled Send, ring)', () => {
    renderComposer('wide');
    expect(screen.getByTestId('c').getAttribute('data-responsive')).toBeNull();
    expect(screen.queryByTestId('c-context-chip')).toBeNull();
    expect(screen.getByTestId('c-modes')).toBeTruthy();
    expect(screen.getByTestId('c-send').getAttribute('data-icon-only')).toBeNull();
  });
});

describe('Tabs overflowBelow', () => {
  const items = [
    { id: 'chat', label: 'Chat', testId: 't-chat' },
    { id: 'pins', label: 'Pinned', testId: 't-pins' },
    { id: 'files', label: 'Files', testId: 't-files' },
    { id: 'calls', label: 'Calls', testId: 't-calls' },
  ];
  const withParentWidth = (width: number) => {
    vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
    return vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      return { width: this.getAttribute('role') === 'tablist' ? 0 : width, height: 30, x: 0, y: 0, top: 0, left: 0, right: width, bottom: 30, toJSON: () => ({}) } as DOMRect;
    });
  };

  it('under the breakpoint keeps the first and the selected tab, the rest in More', () => {
    const spy = withParentWidth(360);
    const onChange = vi.fn();
    render(<div><Tabs items={items} value="files" onValueChange={onChange} overflowBelow={440} data-testid="t" /></div>);
    expect(screen.getByTestId('t').getAttribute('data-folded')).toBe('true');
    expect(screen.getByTestId('t-chat')).toBeTruthy();
    expect(screen.getByTestId('t-files')).toBeTruthy();
    expect(screen.queryByTestId('t-pins')).toBeNull();
    fireEvent.click(screen.getByTestId('t-more'));
    fireEvent.click(screen.getByTestId('t-pins'));
    expect(onChange).toHaveBeenCalledWith('pins');
    spy.mockRestore();
  });

  it('at or above it, every tab shows', () => {
    const spy = withParentWidth(480);
    render(<div><Tabs items={items} value="chat" onValueChange={() => {}} overflowBelow={440} data-testid="t" /></div>);
    expect(screen.getByTestId('t').getAttribute('data-folded')).toBe('false');
    for (const id of ['t-chat', 't-pins', 't-files', 't-calls']) expect(screen.getByTestId(id)).toBeTruthy();
    expect(screen.queryByTestId('t-more')).toBeNull();
    spy.mockRestore();
  });
});
