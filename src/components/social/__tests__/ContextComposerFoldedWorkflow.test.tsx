// The Workflow menu while the strip is folded (narrow batch, 2.518.0).
//
// At a phone's width the composer's strip — where the host's `Workflow ▾`
// lives — is behind `Aa`, and the one-row idle composer draws no strip at all,
// so a workflow took focus → Aa → Workflow. The rows now ride the row's
// overflow: their own `⋯` on the idle row, or the top of the `?` menu (then
// `⋯`, named "Workflow and keyboard hints") once the card is open.
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContextComposer, type ContextComposerProps } from '../ContextComposer';

let emitters: Array<(width: number) => void> = [];
class FakeResizeObserver {
  constructor(private cb: (entries: Array<{ contentRect: { width: number } }>) => void) {
    emitters.push((width: number) => this.cb([{ contentRect: { width } }]));
  }
  observe() {}
  disconnect() {}
}
const resize = (width: number) => act(() => { for (const emit of emitters) emit(width); });

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
  }
});
beforeEach(() => { vi.stubGlobal('ResizeObserver', FakeResizeObserver); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); emitters = []; });

const DOC = { kind: 'document', id: 'doc-1', title: 'Roadmap' } as const;
const workflows = [
  { id: 'deck', label: 'Presentation deck', description: 'Draft a deck' },
  { id: 'unblock', label: 'Unblock this item', description: 'Plan the next step' },
];

function setup(overrides: Partial<ContextComposerProps> = {}) {
  const props: ContextComposerProps = { context: DOC, onSend: vi.fn(() => true), composerTestId: 'composer', workflows, ...overrides };
  return render(<ContextComposer {...props} />);
}
const root = () => screen.getByTestId('composer');

describe('Workflow at narrow width', () => {
  it('the idle row carries a Workflow ⋯ before Send: one tap opens the rows, a pick writes the command', async () => {
    const onDraftChange = vi.fn();
    setup({ onDraftChange });
    resize(358);
    expect(root()).toHaveAttribute('data-collapsed', 'true');
    expect(screen.queryByTestId('context-composer-workflow')).toBeNull();
    const trigger = screen.getByRole('button', { name: 'Workflow' });
    expect(trigger).toHaveAttribute('data-testid', 'composer-folded-menu');
    expect(trigger).toHaveTextContent('⋯');
    expect(trigger).not.toHaveAttribute('tabindex', '-1');
    await act(async () => { fireEvent.click(trigger); });
    const list = screen.getByTestId('composer-folded-menu-list');
    expect(within(list).getByText('Workflow')).toBeInTheDocument();
    await act(async () => { fireEvent.click(within(list).getByText('Unblock this item')); });
    expect(onDraftChange).toHaveBeenCalledWith(
      expect.objectContaining({ command: expect.objectContaining({ trigger: '/workflow', argument: expect.objectContaining({ id: 'unblock' }) }) }),
      expect.anything(),
    );
  });

  it('opens from the keyboard: Enter on the focused trigger shows the rows', async () => {
    setup();
    resize(358);
    const trigger = screen.getByRole('button', { name: 'Workflow' });
    trigger.focus();
    expect(document.activeElement).toBe(trigger);
    await act(async () => { fireEvent.keyDown(trigger, { key: 'Enter' }); fireEvent.click(trigger); });
    await waitFor(() => expect(screen.getByText('Presentation deck')).toBeInTheDocument());
  });

  it('the open card at narrow width puts the rows at the top of the ? menu, renamed', async () => {
    setup({ expanded: true, hints: [{ key: 'Enter', label: 'Send' }] });
    resize(358);
    expect(root()).toHaveAttribute('data-collapsed', 'false');
    expect(screen.queryByTestId('composer-folded-menu')).toBeNull();
    const trigger = screen.getByRole('button', { name: 'Workflow and keyboard hints' });
    expect(trigger).toHaveAttribute('data-testid', 'composer-hints-toggle');
    await act(async () => { fireEvent.click(trigger); });
    const list = screen.getByTestId('composer-hints-menu');
    const text = list.textContent ?? '';
    expect(text.indexOf('Workflow')).toBeGreaterThanOrEqual(0);
    expect(text.indexOf('Workflow')).toBeLessThan(text.indexOf('Keys'));
    expect(within(list).getByText('Presentation deck')).toBeInTheDocument();
  });

  it('wide: no folded menu; the strip keeps Workflow ▾', async () => {
    setup({ expanded: true });
    resize(900);
    expect(screen.queryByTestId('composer-folded-menu')).toBeNull();
    expect(screen.getByTestId('context-composer-workflow')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Workflow and keyboard hints' })).toBeNull();
  });

  it('Aa open at narrow width: the strip shows Workflow ▾ and the overflow drops the rows', async () => {
    setup({ expanded: true, hints: [{ key: 'Enter', label: 'Send' }] });
    resize(358);
    await act(async () => { fireEvent.mouseDown(screen.getByTestId('composer-format-toggle')); });
    expect(screen.getByTestId('context-composer-workflow')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Keyboard hints' })).toBeInTheDocument();
  });

  it('no workflows: nothing new on the idle row', () => {
    setup({ workflows: [] });
    resize(358);
    expect(screen.queryByTestId('composer-folded-menu')).toBeNull();
  });
});
