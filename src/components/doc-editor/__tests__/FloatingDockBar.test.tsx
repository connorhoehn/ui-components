import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FloatingDockBar from '../FloatingDockBar';

describe('FloatingDockBar', () => {
  it('renders nothing until the call is docked here', () => {
    const { container } = render(<FloatingDockBar docked={false}><span>row</span></FloatingDockBar>);
    expect(container.firstChild).toBeNull();
  });

  it('floats the row over the bottom edge and lets clicks through around it', () => {
    render(<FloatingDockBar docked bottomOffset={24}><span>row</span></FloatingDockBar>);
    const bar = screen.getByTestId('floating-dock-bar');
    expect(bar.className).toContain('pointer-events-none');
    expect(bar.className).toContain('fixed');
    expect(bar.style.bottom).toBe('24px');
    expect(screen.getByTestId('floating-dock-bar-body').className).toContain('pointer-events-auto');
    expect(screen.getByTestId('floating-dock-bar-body').className.split(' ')).not.toContain('w-full');
    expect(screen.getByText('row')).toBeInTheDocument();
  });

  it('while the call is being dragged, shows a ghost band that the widget can land on', () => {
    render(<FloatingDockBar docked={false} ghost dockId="doc-bottom" ghostLabel="Drop the call here" />);
    const ghost = screen.getByTestId('floating-dock-bar-ghost');
    const target = ghost.querySelector('[data-call-dock-target="doc-bottom"]');
    expect(target).not.toBeNull();
    expect(target!.textContent).toBe('Drop the call here');
    expect(target!.className).toContain('border-dashed');
  });

  it('shows no ghost without a drag, and no ghost once docked', () => {
    const { container, rerender } = render(<FloatingDockBar docked={false} ghost={false} dockId="doc-bottom" />);
    expect(container.firstChild).toBeNull();
    rerender(<FloatingDockBar docked ghost dockId="doc-bottom"><span>row</span></FloatingDockBar>);
    expect(screen.queryByTestId('floating-dock-bar-ghost')).toBeNull();
    expect(screen.getByText('row')).toBeInTheDocument();
  });
});
