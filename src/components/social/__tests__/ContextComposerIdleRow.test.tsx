// The idle row's shape, pinned. The collapsed ContextComposer row
// (`data-collapsed="true"`) must be ONE centred line: the mode pill, the
// context chip, the editor's text box and the Send cluster are direct items of
// one `flex items-center` container, none of them pulled to an edge with a
// self-/margin offset; and the placeholder is drawn inside the editor's own
// text box, in its type (no size/leading of its own, in the markup or the
// stylesheet). 2.407.12 fixed a regression here (the row was `items-end` with
// `mb-1.5 self-end` offsets tuned for a smaller input); layout itself is
// measured by tests/storybook/composer-idle-row.spec.ts.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ContextComposer } from '../ContextComposer';

afterEach(cleanup);

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

const CONTEXTS = {
  conversation: { kind: 'conversation', id: 'dm-hank', title: 'Hank', dm: true },
  document: { kind: 'document', id: 'doc-1', title: 'Roadmap' },
} as const;

/** Any class that would pull an item off the row's centre line. */
const OFF_CENTRE = /^(self-(start|end|baseline|stretch)|m[tby]-|-m[tby]-|translate-y-|top-|bottom-|align-)/;
/** Any class that would give text a size or leading of its own. */
const TEXT_SIZE = /^(text-(xs|sm|base|lg|xl|\d|\[)|leading-)/;

const classes = (el: Element) => [...el.classList];

describe.each(Object.entries(CONTEXTS))('ContextComposer idle row — %s', (kind, context) => {
  const renderIdle = () => {
    render(
      <ContextComposer
        context={context}
        onSend={vi.fn(() => true)}
        onRemoveContext={vi.fn()}
        {...(kind === 'conversation' ? { sendOptions: [{ id: 'later', label: 'Send later' }], onSendOption: vi.fn() } : {})}
        composerTestId="c"
      />,
    );
    const root = screen.getByTestId('c');
    expect(root).toHaveAttribute('data-collapsed', 'true');
    return root;
  };

  it('is one flex items-center row holding the pill, the text box and Send', () => {
    const root = renderIdle();
    const body = within(root).getByTestId('c-body');
    expect(body).toHaveAttribute('data-idle-row', 'true');
    expect(classes(body)).toEqual(expect.arrayContaining(['flex', 'items-center']));
    expect(classes(body).filter((c) => /^items-/.test(c))).toEqual(['items-center']);

    const pill = within(root).getByTestId('c-mode-pill');
    const toolbar = within(root).getByTestId('c-toolbar');
    const send = within(root).getByTestId('c-send');
    const inputBox = within(root).getByTestId('c-input-box');
    // Direct items of the row (the input line is `display: contents`, so the
    // text box is a flex item of the row too).
    expect(pill.parentElement).toBe(body);
    expect(toolbar.parentElement).toBe(body);
    expect(toolbar.contains(send)).toBe(true);
    const inputLine = within(root).getByTestId('c-input-line');
    expect(inputLine.parentElement).toBe(body);
    expect(classes(inputLine)).toEqual(['contents']);
    expect(inputBox.parentElement).toBe(inputLine);
    // The toolbar centres Send inside itself with even padding.
    expect(classes(toolbar)).toContain('items-center');

    const items = [pill, toolbar, inputBox, inputLine];
    if (kind === 'document') {
      const chip = within(root).getByTestId('c-references');
      expect(chip.parentElement).toBe(body);
      items.push(chip);
    }
    for (const item of items) {
      expect(classes(item).filter((c) => OFF_CENTRE.test(c)), item.dataset.testid).toEqual([]);
    }
    // The toolbar's vertical padding is symmetric (py-*), never a lone pt/pb.
    expect(classes(toolbar).filter((c) => /^p[tb]-/.test(c))).toEqual([]);
  });

  it('draws the placeholder inside the editor\'s own text box, in the typed text\'s type', () => {
    const root = renderIdle();
    const inputBox = within(root).getByTestId('c-input-box');
    const editor = inputBox.querySelector('.ProseMirror') as HTMLElement;
    expect(editor).not.toBeNull();
    const placeholder = editor.querySelector('p.is-empty[data-placeholder]') as HTMLElement;
    expect(placeholder).not.toBeNull();
    expect(placeholder.getAttribute('data-placeholder')).toBeTruthy();
    // The placeholder is the empty paragraph a typed character lands in: no
    // text-size or leading class of its own anywhere between it and the box.
    for (let el: HTMLElement | null = placeholder; el && el !== inputBox.parentElement; el = el.parentElement) {
      expect(classes(el).filter((c) => TEXT_SIZE.test(c)), el.className).toEqual([]);
    }
  });
});

describe('composer placeholder stylesheet', () => {
  it('gives the placeholder pseudo no font-size / line-height of its own', () => {
    const css = readFileSync(join(__dirname, '..', '..', '..', 'styles.css'), 'utf8');
    const rules = [...css.matchAll(/([^{}]*is-empty::before[^{}]*)\{([^}]*)\}/g)];
    expect(rules.length).toBeGreaterThan(0);
    for (const [, selector, body] of rules) {
      expect(body, selector!.trim()).not.toMatch(/(^|[;\s])(font-size|line-height|font)\s*:/);
    }
  });
});

describe('ContextComposer idle row — a header that folds (G174-3)', () => {
  const context = { kind: 'document', id: 'doc-1', title: 'Roadmap' } as const;

  it('a header forces the full card', () => {
    render(<ContextComposer context={context} onSend={vi.fn(() => true)} composerTestId="c" header={<p>1 question waiting</p>} />);
    expect(screen.getByTestId('c')).toHaveAttribute('data-collapsed', 'false');
  });

  it('headerFolds keeps the idle row and draws the header line over it', () => {
    render(<ContextComposer context={context} onSend={vi.fn(() => true)} composerTestId="c" header={<p>1 question waiting</p>} headerFolds />);
    const root = screen.getByTestId('c');
    expect(root).toHaveAttribute('data-collapsed', 'true');
    expect(within(root).getByTestId('c-header')).toHaveTextContent('1 question waiting');
    expect(within(root).getByTestId('c-body')).toHaveAttribute('data-idle-row', 'true');
  });
});
