// Regression tests for bugs found auditing src/renderers (2026-08-24).
//
// Each block names the user-visible symptom it pins. Every one of these was
// confirmed to FAIL against the code before its fix and pass after.

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import type { Section, TaskItem } from '../../types/document';

import TasksReaderRenderer from '../tasks/TasksReaderRenderer';
import DecisionsReaderRenderer from '../decisions/DecisionsReaderRenderer';
import ChecklistEditorRenderer from '../checklist/ChecklistEditorRenderer';
import DecisionsEditorRenderer from '../decisions/DecisionsEditorRenderer';
import LinkBlockEditorRenderer from '../link-block/LinkBlockEditorRenderer';
import LinkBlockReaderRenderer from '../link-block/LinkBlockReaderRenderer';

const mkItem = (o: Partial<TaskItem> & { id: string; text: string }): TaskItem => ({
  status: 'pending', assignee: '', ackedBy: '', ackedAt: '', priority: 'medium', notes: '', ...o,
});

const mkSection = (items: TaskItem[] = [], metadata?: Record<string, unknown>): Section => ({
  id: 's1', type: 'tasks', title: 'T', collapsed: false, items, sectionType: 'tasks', metadata,
});

// A status/priority this build does not know about. Section items round-trip
// through the CRDT and through documents saved by other builds, so the value
// is not guaranteed to be one of the four the union declares.
const UNKNOWN_STATUS = 'in-review' as TaskItem['status'];
const UNKNOWN_PRIORITY = 'blocker' as TaskItem['priority'];

describe('TasksReaderRenderer — an unrecognised status must not break the section', () => {
  // SYMPTOM (crash): STATUS_META[item.status] came back undefined and reading
  // `meta.color` threw a TypeError, so one item with an out-of-range status
  // took down the entire section — and with it the document that mounted it.
  it('renders instead of throwing when an item carries an unknown status', () => {
    const items = [mkItem({ id: '1', text: 'Under review', status: UNKNOWN_STATUS })];
    expect(() =>
      render(<TasksReaderRenderer section={mkSection(items)} viewMode="reader" editable={false} />),
    ).not.toThrow();
  });

  // SYMPTOM (silent data loss): the three status groups were three positive
  // filters (=== 'pending', done/acked, === 'rejected'), so an item matching
  // none of them was dropped from the output with no error and no placeholder.
  // A reviewer would see a shorter list than the document actually contains.
  it('still shows an item whose status matches none of the known groups', () => {
    const items = [
      mkItem({ id: '1', text: 'Known pending' }),
      mkItem({ id: '2', text: 'Odd one out', status: UNKNOWN_STATUS }),
    ];
    render(<TasksReaderRenderer section={mkSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('Known pending')).toBeInTheDocument();
    expect(screen.getByText('Odd one out')).toBeInTheDocument();
  });

  it('groups an unknown status with the outstanding items, not the done ones', () => {
    const items = [mkItem({ id: '1', text: 'Odd one out', status: UNKNOWN_STATUS })];
    render(<TasksReaderRenderer section={mkSection(items)} viewMode="reader" editable={false} />);
    // Not struck through / dimmed like a completed item.
    expect(screen.getByText('Odd one out').className).not.toContain('line-through');
  });

  // SYMPTOM (invisible indicator): PRIORITY_COLORS[item.priority] came back
  // undefined for an unknown priority, so `background: undefined` left the
  // priority dot painted with nothing — a blank gap in the row where every
  // other item shows a coloured dot. No error, just a missing signal.
  it('paints the priority dot even for an unrecognised priority', () => {
    const items = [mkItem({ id: '1', text: 'Odd priority', priority: UNKNOWN_PRIORITY })];
    render(<TasksReaderRenderer section={mkSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('Odd priority')).toBeInTheDocument();
    const dot = screen.getByTitle(`Priority: ${UNKNOWN_PRIORITY}`);
    expect((dot as HTMLElement).style.background).toBeTruthy();
  });
});

// A hardcoded colour and a token are distinguishable after JSDOM has parsed
// them: JSDOM normalises `#92400e` to `rgb(146, 64, 14)` and leaves
// `var(--color-warning-fg)` verbatim, because it cannot resolve the variable.
// So "no rgb()/hex literal survives in an inline style" is exactly the
// assertion "every colour here goes through the token scale". (Matching on
// `#` alone would never fire — that is how the first draft of these two tests
// passed against the unfixed code.)
function assertNoLiteralColours(container: HTMLElement): void {
  const styled = [...container.querySelectorAll<HTMLElement>('[style]')];
  expect(styled.length, 'nothing was inline-styled — the assertion would be vacuous').toBeGreaterThan(0);
  for (const el of styled) {
    const s = el.getAttribute('style') ?? '';
    expect(s, `literal colour in an inline style: ${s}`).not.toMatch(/rgba?\(|#[0-9a-fA-F]{3,8}/);
  }
}

describe('reader renderers stay re-tonable through the token scale', () => {
  // SYMPTOM: a consumer that rebrands by overriding --color-warning-fg /
  // --color-success-fg / --color-danger-fg (the documented on-ramp) got
  // re-toned status badges but stock amber/green/red group headers, because
  // the headers were literal palette hexes (#92400e / #065f46 / #991b1b).
  it('DecisionsReaderRenderer group headers use the same token as their badge', () => {
    const items = [
      mkItem({ id: '1', text: 'Open one', status: 'pending' }),
      mkItem({ id: '2', text: 'Decided one', status: 'acked' }),
      mkItem({ id: '3', text: 'Vetoed one', status: 'rejected' }),
    ];
    const { container } = render(
      <DecisionsReaderRenderer section={mkSection(items)} viewMode="reader" editable={false} />,
    );
    assertNoLiteralColours(container);
    // Header and badge for the same status resolve to one variable.
    const headerColors = [...container.querySelectorAll<HTMLElement>('[style*="color"]')]
      .map((el) => el.style.color);
    expect(headerColors).toContain('var(--color-warning-fg)');
    expect(headerColors).toContain('var(--color-success-fg)');
    expect(headerColors).toContain('var(--color-danger-fg)');
  });

  // SYMPTOM: the due-date pill's background and border were raw sky/red
  // palette hexes, so it kept its stock blue after a rebrand while every other
  // chip in the same row followed the theme.
  it('TasksReaderRenderer due-date pill carries no raw palette hex', () => {
    const items = [
      mkItem({ id: '1', text: 'Due soon', dueDate: '2999-01-01' }),
      mkItem({ id: '2', text: 'Overdue', dueDate: '2000-01-01' }),
    ];
    const { container } = render(
      <TasksReaderRenderer section={mkSection(items)} viewMode="reader" editable={false} />,
    );
    assertNoLiteralColours(container);
  });
});

describe.each([
  ['ChecklistEditorRenderer', ChecklistEditorRenderer, '+ Add item'],
  ['DecisionsEditorRenderer', DecisionsEditorRenderer, '+ Add decision'],
] as const)('%s — "add item" must not steal the caret', (_name, Renderer, addLabel) => {
  const twoRows = () => [
    mkItem({ id: 'a', text: 'first' }),
    mkItem({ id: 'b', text: 'last' }),
  ];

  // SYMPTOM: onAddItem is optional, and the renderers call it with `?.`. In
  // editable mode without one, clicking "+ Add item" added nothing but still
  // armed the focus flag — which was only ever cleared from inside the row's
  // focus effect. On the next render (a collaborator's edit, a status change,
  // anything) the caret jumped out of the row being typed in and into the last
  // row, mid-word.
  it('does not move focus on a later render when no add handler is wired', () => {
    const props = { section: mkSection(twoRows()), viewMode: 'editor' as const, editable: true };
    const { rerender } = render(<Renderer {...props} />);

    fireEvent.click(screen.getByText(addLabel));

    const first = screen.getByDisplayValue('first') as HTMLInputElement;
    first.focus();
    expect(document.activeElement).toBe(first);

    rerender(<Renderer {...props} />);
    expect(document.activeElement).toBe(first);
  });

  // SYMPTOM (same root cause, async variant): with an onAddItem that appends
  // on a later tick, an unrelated re-render arriving in the gap consumed the
  // focus intent — the caret jumped to the OLD last row, and the newly added
  // row never got focus at all.
  it('focuses the new row, not the old last row, when the add lands late', async () => {
    const onAddItem = vi.fn();
    const base = { viewMode: 'editor' as const, editable: true, onAddItem };
    const { rerender } = render(<Renderer section={mkSection(twoRows())} {...base} />);

    fireEvent.click(screen.getByText(addLabel));
    expect(onAddItem).toHaveBeenCalledTimes(1);

    // The item has not arrived yet; an unrelated update re-renders the section.
    const edited = [mkItem({ id: 'a', text: 'first edited' }), mkItem({ id: 'b', text: 'last' })];
    rerender(<Renderer section={mkSection(edited)} {...base} />);
    const oldLast = screen.getByDisplayValue('last') as HTMLInputElement;
    expect(document.activeElement).not.toBe(oldLast);

    // Now the add lands.
    await act(async () => {
      rerender(<Renderer section={mkSection([...edited, mkItem({ id: 'c', text: '' })])} {...base} />);
    });
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    expect(document.activeElement).toBe(inputs[inputs.length - 1]);
  });

  it('still focuses the new row on the normal synchronous add path', async () => {
    const items = twoRows();
    const onAddItem = vi.fn();
    const base = { viewMode: 'editor' as const, editable: true, onAddItem };
    const { rerender } = render(<Renderer section={mkSection(items)} {...base} />);

    fireEvent.click(screen.getByText(addLabel));
    await act(async () => {
      rerender(<Renderer section={mkSection([...items, mkItem({ id: 'c', text: '' })])} {...base} />);
    });

    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    expect(document.activeElement).toBe(inputs[inputs.length - 1]);
  });
});

describe('link-block renderers survive a malformed metadata payload', () => {
  // SYMPTOM: section.metadata is an untyped bag that round-trips through the
  // CRDT and the server. A null or non-object entry in `links` made
  // `l.url` / `l.label` throw, blanking the whole document — and the entries
  // that WERE well-formed were lost with it.
  const malformed = {
    links: [
      null,
      'https://not-an-object.test',
      { label: 'Good link', url: 'https://good.test' },
      { label: 'No url' },
      42,
    ],
  };

  it('reader renders the well-formed links and skips the junk', () => {
    const section = mkSection([], malformed);
    expect(() =>
      render(<LinkBlockReaderRenderer section={section} viewMode="reader" editable={false} />),
    ).not.toThrow();
    expect(screen.getByText('Good link')).toBeInTheDocument();
    // The entry with no url is not a usable link and must not render a
    // dead anchor.
    expect(screen.queryByText('No url')).not.toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('editor renders a row per salvageable entry instead of throwing', () => {
    const section = mkSection([], malformed);
    expect(() =>
      render(<LinkBlockEditorRenderer section={section} viewMode="editor" editable />),
    ).not.toThrow();
    expect(screen.getByDisplayValue('Good link')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://good.test')).toBeInTheDocument();
  });

  it('a links value that is not an array falls back to the empty state', () => {
    render(
      <LinkBlockReaderRenderer
        section={mkSection([], { links: { nope: true } })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getByTestId('link-block-reader-empty-s1')).toBeInTheDocument();
  });
});
