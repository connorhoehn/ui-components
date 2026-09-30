// StackedRail geometry, read from classes and structure (jsdom has no layout;
// tests/storybook/stacked-rail-geometry.spec.ts measures the same rules in a
// browser). The model: every control starts at RailNavList's 10px inset, then
// a run of 18px gutter cells — one per nesting level, one for a caret — whose
// trailing negative margin cancels the control's flex gap. So text x is
// 10 + 18 × (cells before it) and a caret's x is 10 + 18 × (cells before it).
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { StackedRail, STACKED_RAIL_STEP_CLASS, type StackedRailGroup } from '../StackedRail';
import { RAIL_NAV_ITEM_CLASS } from '../RailNavList';

afterEach(cleanup);

const PX: Record<string, number> = { 'px-2.5': 10, 'gap-2.5': 10, 'gap-2': 8, '-mr-2.5': -10, '-mr-2': -8, 'w-[18px]': 18 };
const px = (el: Element, pattern: RegExp) => {
  const hit = el.className.split(' ').filter((c) => pattern.test(c));
  expect(hit.length, `${pattern} on ${el.className}`).toBeLessThanOrEqual(1);
  if (hit.length === 0) return 0;
  expect(PX[hit[0]!], `unknown class ${hit[0]}`).toBeDefined();
  return PX[hit[0]!]!;
};

/** x of a gutter cell or of the text span, from the control's classes. */
function layout(control: HTMLElement) {
  const inset = px(control, /^(px|pl)-/);
  const gutter = control.querySelector(':scope > [data-rail-gutter]');
  const cells = gutter ? [...gutter.children] : [];
  for (const cell of cells) expect(cell.className).toBe(STACKED_RAIL_STEP_CLASS);
  const cellX = cells.map((_, i) => inset + 18 * i);
  const gutterWidth = cells.reduce((sum, cell) => sum + px(cell, /^w-/), 0);
  // The gutter's negative margin must cancel exactly the control's gap.
  if (gutter) expect(px(gutter, /^-mr-/) + px(control, /^gap-/)).toBe(0);
  return {
    cells: cells.map((cell, i) => ({ x: cellX[i]!, step: cell.getAttribute('data-rail-step'), caret: cell.querySelector('svg') != null })),
    textX: inset + gutterWidth,
  };
}

const groups: StackedRailGroup[] = [
  { id: 'views', title: 'Views', collapsible: false, rows: [{ id: 'all', label: 'All documents' }] },
  {
    id: 'src', title: 'Sprint planning', count: 10,
    rows: [
      { id: 'meetings', label: 'Meetings', open: true, children: [
        { id: 'standups', label: 'Standups', open: true, children: [
          { id: 'mon', label: 'Monday', open: true, children: [{ id: 'notes', label: 'Notes' }] },
          { id: 'tue', label: 'Tuesday' },
        ] },
        { id: 'retro', label: 'Retro' },
      ] },
      { id: 'backlog', label: 'Backlog' },
    ],
  },
];

describe('StackedRail geometry', () => {
  it('starts every row at RailNavList’s inset: the row class carries it, nothing adds padding', () => {
    expect(RAIL_NAV_ITEM_CLASS).toContain('px-2.5');
    render(<StackedRail groups={groups} />);
    for (const id of ['all', 'meetings', 'standups', 'mon', 'notes', 'backlog']) {
      expect(screen.getByTestId(`stacked-rail-row-${id}`).className.split(' ').filter((c) => /^p[lx]-/.test(c))).toEqual(['px-2.5']);
    }
    expect(layout(screen.getByTestId('stacked-rail-row-backlog')).textX).toBe(10);
    expect(layout(screen.getByTestId('stacked-rail-row-all')).textX).toBe(10);
  });

  it('puts a collapsible heading’s caret in the row-text column, and every heading label at one x', () => {
    render(<StackedRail title="Documents" groups={groups} />);
    const src = layout(screen.getByTestId('stacked-rail-group-src-header'));
    const views = layout(screen.getByTestId('stacked-rail-group-views-header'));
    const leaf = layout(screen.getByTestId('stacked-rail-row-backlog'));
    expect(src.cells).toEqual([{ x: 10, step: 'caret', caret: true }]);
    expect(src.cells[0]!.x).toBe(leaf.textX);
    // A heading that does not collapse keeps the (empty) caret cell.
    expect(views.cells).toEqual([{ x: 10, step: 'caption', caret: false }]);
    expect(views.textX).toBe(src.textX);
    expect(src.textX).toBe(28);
    // The rail caption lines up with the headings too.
    const caption = screen.getByTestId('stacked-rail-title').parentElement!;
    expect(layout(caption).textX).toBe(src.textX);
  });

  it('adds exactly one 18px step per level, the caret occupying the first step', () => {
    render(<StackedRail groups={groups} />);
    const at = (id: string) => layout(screen.getByTestId(`stacked-rail-row-${id}`));
    // Leaves: 10 + 18·depth.
    expect(at('backlog').textX).toBe(10);
    expect(at('retro').textX).toBe(28);
    expect(at('tue').textX).toBe(46);
    expect(at('notes').textX).toBe(64);
    // A row with children: its caret in its level's leaf column, its label one
    // step in — its children's text column.
    const chain: Array<[parent: string, leafSibling: string, child: string]> = [
      ['meetings', 'backlog', 'retro'],
      ['standups', 'retro', 'tue'],
      ['mon', 'tue', 'notes'],
    ];
    for (const [parent, sibling, child] of chain) {
      const p = at(parent);
      const caret = p.cells.at(-1)!;
      expect(caret).toMatchObject({ step: 'caret', caret: true });
      expect(p.cells.slice(0, -1).every((c) => c.step === 'indent')).toBe(true);
      expect(caret.x).toBe(at(sibling).textX);
      expect(p.textX - caret.x).toBe(18);
      expect(p.textX).toBe(at(child).textX);
      expect(at(child).textX - at(sibling).textX).toBe(18);
    }
  });
});
