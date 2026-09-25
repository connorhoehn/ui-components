// The All documents page's docked card (2.389.x): no mode switch, the prompt
// context's chips + an "add" control as the header row, and the card as a drop
// target for a result row's payload. Plus the shared store behind it.
import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';
import {
  PROMPT_CONTEXT_DRAG_TYPE, PROMPT_CONTEXT_LIMIT, promptContextStore, readPromptContextDrag, resetPromptContextStores,
  usePromptContext, writePromptContextDrag,
} from '../../../hooks/usePromptContext';

afterEach(() => { cleanup(); sessionStorage.clear(); resetPromptContextStores(); });

const base = {
  onSend: () => {},
  'data-testid': 'composer',
  layout: 'wide',
  mode: 'agent',
  modeControl: 'menu',
  toolbar: 'editor',
  onModeChange: () => {},
} as const;

function fakeTransfer(data: Record<string, string>): DataTransfer {
  const store = { ...data };
  return {
    types: Object.keys(store),
    getData: (t: string) => store[t] ?? '',
    setData: (t: string, v: string) => { store[t] = v; },
    dropEffect: 'none',
    effectAllowed: 'all',
  } as unknown as DataTransfer;
}

describe('docked card without a mode menu', () => {
  it('shows the references left-aligned, then the add control, and no mode menu', () => {
    render(
      <RichChatComposer
        {...base}
        hideModeMenu
        references={[{ id: 'a', label: 'Release plan' }, { id: 'b', label: 'Sprint notes' }]}
        onRemoveReference={() => {}}
        referencesAction={<button type="button" data-testid="add">+</button>}
      />,
    );
    expect(screen.queryByTestId('composer-mode-menu')).toBeNull();
    const refs = screen.getByTestId('composer-references');
    expect(refs).toHaveTextContent('Release plan');
    expect(refs.className).not.toContain('ml-auto');
    const action = screen.getByTestId('composer-references-action');
    expect(refs.compareDocumentPosition(action) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('shows the add control with no references at all', () => {
    render(<RichChatComposer {...base} hideModeMenu references={[]} referencesAction={<button type="button" data-testid="add">+</button>} />);
    expect(screen.getByTestId('add')).toBeInTheDocument();
  });

  it('keeps the mode menu by default', () => {
    render(<RichChatComposer {...base} references={[{ id: 'a', label: 'A' }]} />);
    expect(screen.getByTestId('composer-mode-menu')).toBeInTheDocument();
  });
});

describe('reference drop', () => {
  it('rings the card while a matching drag is over it and hands the drop to the host', () => {
    const onDrop = vi.fn();
    render(<RichChatComposer {...base} hideModeMenu referenceDrop={{ types: [PROMPT_CONTEXT_DRAG_TYPE], onDrop, hint: 'Drop to use together' }} />);
    const card = screen.getByTestId('composer');
    const dt = fakeTransfer({ [PROMPT_CONTEXT_DRAG_TYPE]: JSON.stringify([{ id: 'x', title: 'X' }]) });
    fireEvent.dragEnter(card, { dataTransfer: dt });
    expect(card).toHaveAttribute('data-reference-drop', 'over');
    expect(screen.getByTestId('composer-drop-hint')).toHaveTextContent('Drop to use together');
    fireEvent.drop(card, { dataTransfer: dt });
    expect(onDrop).toHaveBeenCalledTimes(1);
    expect(card).toHaveAttribute('data-reference-drop', 'ready');
  });

  it('ignores a drag of anything else', () => {
    const onDrop = vi.fn();
    render(<RichChatComposer {...base} referenceDrop={{ types: [PROMPT_CONTEXT_DRAG_TYPE], onDrop }} />);
    const card = screen.getByTestId('composer');
    const dt = fakeTransfer({ 'text/plain': 'hello' });
    fireEvent.dragEnter(card, { dataTransfer: dt });
    fireEvent.drop(card, { dataTransfer: dt });
    expect(card).toHaveAttribute('data-reference-drop', 'ready');
    expect(onDrop).not.toHaveBeenCalled();
  });
});

describe('usePromptContext', () => {
  it('is one store per scope: two hooks agree, and it persists to sessionStorage', () => {
    const a = renderHook(() => usePromptContext());
    const b = renderHook(() => usePromptContext());
    act(() => { a.result.current.add({ id: 'd1', title: 'Doc one', kind: 'page' }); });
    expect(b.result.current.has('d1')).toBe(true);
    expect(b.result.current.items).toEqual([{ id: 'd1', title: 'Doc one', kind: 'page' }]);
    expect(JSON.parse(sessionStorage.getItem('uic:prompt-context:documents')!)).toHaveLength(1);
    act(() => { b.result.current.toggle({ id: 'd1', title: 'Doc one' }); });
    expect(a.result.current.items).toEqual([]);
    expect(sessionStorage.getItem('uic:prompt-context:documents')).toBeNull();
  });

  it('dedupes, refreshes a title, caps the set, and reloads from storage', () => {
    const s = promptContextStore('t');
    expect(s.add({ id: 'a', title: 'A' })).toBe(true);
    expect(s.add({ id: 'a', title: 'A2' })).toBe(true);
    expect(s.get()).toEqual([{ id: 'a', title: 'A2' }]);
    for (let i = 0; i < PROMPT_CONTEXT_LIMIT; i++) s.add({ id: `n${i}`, title: `N${i}` });
    expect(s.get()).toHaveLength(PROMPT_CONTEXT_LIMIT);
    expect(s.add({ id: 'over', title: 'Over' })).toBe(false);
    resetPromptContextStores();
    expect(promptContextStore('t').get()).toHaveLength(PROMPT_CONTEXT_LIMIT);
  });

  it('keeps scopes apart and survives a storage that throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    promptContextStore('one').add({ id: 'a', title: 'A' });
    expect(promptContextStore('two').get()).toEqual([]);
    expect(promptContextStore('one').has('a')).toBe(true);
    spy.mockRestore();
  });

  it('round-trips a drag payload and rejects junk', () => {
    const dt = fakeTransfer({});
    writePromptContextDrag(dt, [{ id: 'a', title: 'A', kind: 'page' }, { id: '', title: 'bad' }]);
    expect(dt.getData('text/plain')).toBe('A');
    expect(readPromptContextDrag(dt)).toEqual([{ id: 'a', title: 'A', kind: 'page' }]);
    expect(readPromptContextDrag(fakeTransfer({ [PROMPT_CONTEXT_DRAG_TYPE]: '{nope' }))).toEqual([]);
  });
});

describe('PromptContextPicker', () => {
  it('searches and toggles results in the shared store', async () => {
    const { PromptContextPicker } = await import('../PromptContextPicker');
    const search = vi.fn(async (q: string) => [{ id: 'r1', title: `Release ${q}` }]);
    render(<PromptContextPicker search={search} debounceMs={0} />);
    fireEvent.click(screen.getByTestId('prompt-context-picker'));
    const row = await screen.findByTestId('prompt-context-picker-result');
    expect(row).toHaveTextContent('Add');
    fireEvent.click(row);
    expect(promptContextStore().has('r1')).toBe(true);
    expect(await screen.findByText('✓ Added')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('prompt-context-picker-result'));
    expect(promptContextStore().has('r1')).toBe(false);
  });
});
