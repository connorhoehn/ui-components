import { render, screen, fireEvent } from '@testing-library/react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarLabel } from '../Toolbar';

function renderToolbar(extra?: React.ReactNode) {
  return render(
    <Toolbar aria-label="Run actions" end={<button type="button">Refresh</button>}>
      <ToolbarGroup aria-label="Execution">
        <button type="button">Run</button>
        <button type="button">Stop</button>
      </ToolbarGroup>
      <ToolbarGroup divided>
        <button type="button">Filter</button>
      </ToolbarGroup>
      {extra}
    </Toolbar>,
  );
}

describe('Toolbar', () => {
  it('exposes a named toolbar landmark', () => {
    renderToolbar();
    expect(screen.getByRole('toolbar', { name: 'Run actions' })).toBeInTheDocument();
  });

  it('renders start content and the end slot', () => {
    renderToolbar();
    expect(screen.getByRole('button', { name: 'Run' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
  });

  it('names a group when aria-label is given', () => {
    renderToolbar();
    expect(screen.getByRole('group', { name: 'Execution' })).toBeInTheDocument();
  });

  it('divided groups draw a separator', () => {
    renderToolbar();
    expect(screen.getAllByRole('separator')).toHaveLength(1);
  });

  it('ArrowRight moves focus to the next control', () => {
    renderToolbar();
    const run = screen.getByRole('button', { name: 'Run' });
    run.focus();
    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowRight' });
    expect(screen.getByRole('button', { name: 'Stop' })).toHaveFocus();
  });

  it('ArrowLeft wraps from the first control to the last', () => {
    renderToolbar();
    screen.getByRole('button', { name: 'Run' }).focus();
    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowLeft' });
    expect(screen.getByRole('button', { name: 'Refresh' })).toHaveFocus();
  });

  it('Home and End jump to the ends of the row', () => {
    renderToolbar();
    screen.getByRole('button', { name: 'Filter' }).focus();
    const toolbar = screen.getByRole('toolbar');
    fireEvent.keyDown(toolbar, { key: 'End' });
    expect(screen.getByRole('button', { name: 'Refresh' })).toHaveFocus();
    fireEvent.keyDown(toolbar, { key: 'Home' });
    expect(screen.getByRole('button', { name: 'Run' })).toHaveFocus();
  });

  it('skips disabled controls when walking the row', () => {
    render(
      <Toolbar>
        <button type="button">First</button>
        <button type="button" disabled>Middle</button>
        <button type="button">Last</button>
      </Toolbar>,
    );
    screen.getByRole('button', { name: 'First' }).focus();
    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowRight' });
    expect(screen.getByRole('button', { name: 'Last' })).toHaveFocus();
  });

  it('ignores keys it does not own', () => {
    renderToolbar();
    const run = screen.getByRole('button', { name: 'Run' });
    run.focus();
    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowDown' });
    expect(run).toHaveFocus();
  });

  it('does not throw when the row has no focusable controls', () => {
    render(
      <Toolbar>
        <ToolbarLabel>12 selected</ToolbarLabel>
      </Toolbar>,
    );
    expect(() =>
      fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowRight' }),
    ).not.toThrow();
  });

  it('paints in the code family when tone="code"', () => {
    render(<Toolbar tone="code" data-testid="tb">x</Toolbar>);
    expect(screen.getByTestId('tb').className).toContain('bg-code-panel');
  });

  it('ToolbarSeparator is decorative-but-announced and vertical', () => {
    render(<ToolbarSeparator />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('ToolbarLabel renders muted text without a role', () => {
    render(<ToolbarLabel>us-east-1</ToolbarLabel>);
    expect(screen.getByText('us-east-1').className).toContain('text-text-tertiary');
  });

  it('scrolls horizontally by default, so a long row stays one line', () => {
    const { container } = render(<Toolbar><button type="button">a</button></Toolbar>);
    const row = container.querySelector('[role="toolbar"] > div')!;
    expect(row.className).toContain('overflow-x-auto');
    expect(row.className).not.toContain('flex-wrap');
  });

  it('wrap swaps the scroller for a wrapping row', () => {
    // The scroller hides overflowing controls behind a scrollbar nobody looks
    // for — fine for verbs, wrong for a filter bar, where a hidden filter
    // reads as a missing feature.
    const { container } = render(<Toolbar wrap><button type="button">a</button></Toolbar>);
    const row = container.querySelector('[role="toolbar"] > div')!;
    expect(row.className).toContain('flex-wrap');
    expect(row.className).not.toContain('overflow-x-auto');
  });

  it('wrap aligns groups to the top, since the row is now multi-line', () => {
    render(<Toolbar wrap data-testid="tb">x</Toolbar>);
    expect(screen.getByTestId('tb').className).toContain('items-start');
    expect(screen.getByTestId('tb').className).not.toContain('items-center');
  });

  it('keeps roving focus working across a wrapped row', () => {
    render(
      <Toolbar wrap>
        <button type="button">one</button>
        <button type="button">two</button>
      </Toolbar>,
    );
    const one = screen.getByText('one');
    one.focus();
    fireEvent.keyDown(screen.getByRole('toolbar'), { key: 'ArrowRight' });
    expect(screen.getByText('two')).toHaveFocus();
  });

  it('honours wrap on the row itself, so the end slot can drop to its own line instead of overflowing', () => {
    render(
      <Toolbar wrap end={<button type="button">Refresh</button>} data-testid="tb">
        <button type="button">Run</button>
      </Toolbar>,
    );
    // The row that holds both the children slot and the end slot must allow
    // wrapping, or `end` (flex-none) has nowhere to go but past the edge.
    expect(screen.getByTestId('tb').className).toContain('flex-wrap');
  });

  it('drops the end slot left padding when wrapped (it may no longer share a line with children)', () => {
    const { rerender } = render(
      <Toolbar end={<button type="button">Refresh</button>}>
        <button type="button">Run</button>
      </Toolbar>,
    );
    const endWrapper = () => screen.getByRole('button', { name: 'Refresh' }).parentElement!;
    expect(endWrapper().className).toContain('pl-2');

    rerender(
      <Toolbar wrap end={<button type="button">Refresh</button>}>
        <button type="button">Run</button>
      </Toolbar>,
    );
    expect(endWrapper().className).not.toContain('pl-2');
    expect(endWrapper().className).toContain('flex-wrap');
  });
});

// At 900px a long `end` line ("3 of 3 knowledge bases · registry vs. the live
// account") kept its full width while the search field shrank to ~6
// characters. The controls are sized from their content and `end` gives way
// first (never below its own min-content).
describe('Toolbar — the controls keep their room (2.447.1)', () => {
  it('sizes the controls from their content and lets `end` shrink first', () => {
    render(
      <Toolbar data-testid="tb" end={<span>3 of 3 knowledge bases · registry vs. the live account</span>}>
        <input aria-label="Search" placeholder="Search by name, slug or id…" />
      </Toolbar>,
    );
    const controls = screen.getByRole('textbox', { name: 'Search' }).parentElement!;
    expect(controls).toHaveAttribute('data-toolbar-controls');
    expect(controls.classList.contains('flex-auto')).toBe(true);
    expect(controls.classList.contains('flex-1')).toBe(false);
    const end = screen.getByText(/registry vs\. the live account/).parentElement!;
    expect(end.classList.contains('shrink-[3]')).toBe(true);
    expect(end.classList.contains('flex-none')).toBe(false);
    expect(end.classList.contains('min-w-0')).toBe(false);
  });
});
