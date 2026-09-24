import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextColumn } from '../ContextColumn';

const panels = [
  { id: 'conversation', label: '#design', icon: <span>c</span>, badge: 3, content: <div>the thread</div> },
  { id: 'activity', label: 'Activity', icon: <span>a</span>, content: <div>the feed</div> },
];

describe('ContextColumn', () => {
  it('collapsed: a strip with an expand control and one icon per panel, badged; pressing one opens to it', () => {
    const onStateChange = vi.fn(); const onActivate = vi.fn();
    render(<ContextColumn state="collapsed" onStateChange={onStateChange} onActivate={onActivate} panels={panels} activeId="activity" />);
    expect(screen.getByTestId('context-column').getAttribute('data-state')).toBe('collapsed');
    expect(screen.queryByText('the feed')).toBeNull();
    expect(screen.getByTestId('context-column-badge-conversation').textContent).toBe('3');
    fireEvent.click(screen.getByRole('button', { name: '#design (3 unread)' }));
    expect(onActivate).toHaveBeenCalledWith('conversation');
    expect(onStateChange).toHaveBeenCalledWith('open');
  });

  it('open: one panel at a time, chosen by tabs in a header row of its own', () => {
    const onStateChange = vi.fn(); const onActivate = vi.fn();
    render(<ContextColumn state="open" onStateChange={onStateChange} onActivate={onActivate} panels={panels} activeId="activity" />);
    expect(screen.getByTestId('context-column-header').className).toContain('h-9');
    expect(screen.getByText('the feed')).toBeInTheDocument();
    expect(screen.queryByText('the thread')).toBeNull();
    expect(screen.getByRole('tab', { name: /Activity/ }).getAttribute('aria-selected')).toBe('true');
    fireEvent.click(screen.getByRole('tab', { name: /#design/ }));
    expect(onActivate).toHaveBeenCalledWith('conversation');
    fireEvent.click(screen.getByRole('button', { name: 'Widen the column' }));
    expect(onStateChange).toHaveBeenCalledWith('wide');
    fireEvent.click(screen.getByRole('button', { name: 'Collapse side column' }));
    expect(onStateChange).toHaveBeenCalledWith('collapsed');
  });

  it('an unknown active id falls back to the first panel; no panels renders nothing', () => {
    const { container, rerender } = render(<ContextColumn state="wide" onStateChange={vi.fn()} onActivate={vi.fn()} panels={panels} activeId="gone" />);
    expect(screen.getByText('the thread')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Narrow the column' })).toBeInTheDocument();
    rerender(<ContextColumn state="open" onStateChange={vi.fn()} onActivate={vi.fn()} panels={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('crowded (three tabs in the open column): the active tab keeps its label, the others are icons named by tooltip', () => {
    const three = [...panels, { id: 'run-draft', label: 'Run draft', icon: <span>r</span>, content: <div>the draft</div> }];
    const onActivate = vi.fn();
    render(<ContextColumn state="open" onStateChange={vi.fn()} onActivate={onActivate} panels={three} activeId="run-draft" roomy />);
    const active = screen.getByRole('tab', { name: /Run draft/ });
    expect(active).toHaveTextContent('Run draft');
    const activity = screen.getByRole('tab', { name: 'Activity' });
    expect(activity).toHaveAttribute('title', 'Activity');
    expect(activity).not.toHaveTextContent('Activity');
    expect(screen.getByRole('tab', { name: '#design (3 unread)' })).toBeInTheDocument();
    fireEvent.click(activity);
    expect(onActivate).toHaveBeenCalledWith('activity');
    expect(screen.getByTestId('context-column').className).toContain('2xl:w-96');
  });

  it('two tabs are not crowded: both keep their labels', () => {
    render(<ContextColumn state="open" onStateChange={vi.fn()} onActivate={vi.fn()} panels={panels} activeId="activity" />);
    expect(screen.getByRole('tab', { name: /#design/ })).toHaveTextContent('#design');
    expect(screen.getByTestId('context-column')).not.toHaveAttribute('data-crowded');
  });
});
