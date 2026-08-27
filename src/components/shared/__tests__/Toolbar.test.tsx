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
});
