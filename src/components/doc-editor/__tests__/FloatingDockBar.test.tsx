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
    expect(screen.getByText('row')).toBeInTheDocument();
  });
});
