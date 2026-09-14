import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextColumn } from '../ContextColumn';

const panels = [
  { id: 'conversation', label: '#design', icon: <span>c</span>, badge: 3, onOpen: vi.fn() },
  { id: 'activity', label: 'Activity', icon: <span>a</span> },
];

describe('ContextColumn', () => {
  it('collapsed: a strip with an expand control and one icon per panel, badged; pressing one opens to it', () => {
    const onStateChange = vi.fn();
    render(<ContextColumn state="collapsed" onStateChange={onStateChange} panels={panels}>content</ContextColumn>);
    expect(screen.getByTestId('context-column').getAttribute('data-state')).toBe('collapsed');
    expect(screen.queryByText('content')).toBeNull();
    expect(screen.getByTestId('context-column-badge-conversation').textContent).toBe('3');
    fireEvent.click(screen.getByRole('button', { name: '#design (3 unread)' }));
    expect(onStateChange).toHaveBeenCalledWith('open');
    expect(panels[0].onOpen).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Open side column' }));
    expect(onStateChange).toHaveBeenLastCalledWith('open');
  });

  it('open: its controls in a header row of their own, the panels beneath', () => {
    const onStateChange = vi.fn();
    render(<ContextColumn state="open" onStateChange={onStateChange} panels={panels}><div>content</div></ContextColumn>);
    const header = screen.getByTestId('context-column-header');
    expect(header.className).toContain('h-9');
    expect(screen.getByText('content')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Widen the column' }));
    expect(onStateChange).toHaveBeenCalledWith('wide');
    fireEvent.click(screen.getByRole('button', { name: 'Collapse side column' }));
    expect(onStateChange).toHaveBeenCalledWith('collapsed');
  });

  it('wide: offers to narrow', () => {
    const onStateChange = vi.fn();
    render(<ContextColumn state="wide" onStateChange={onStateChange} panels={[]}>x</ContextColumn>);
    expect(screen.getByTestId('context-column').getAttribute('data-state')).toBe('wide');
    fireEvent.click(screen.getByRole('button', { name: 'Narrow the column' }));
    expect(onStateChange).toHaveBeenCalledWith('open');
  });
});
