import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ToolCallStrip, ToolCallPill } from '../ToolCallStrip';

describe('ToolCallPill', () => {
  it('shows a check when done and an ellipsis while pending', () => {
    const { rerender } = render(<ToolCallPill name="search" done />);
    expect(screen.getByText(/search/).textContent).toContain('✓');
    rerender(<ToolCallPill name="search" done={false} />);
    expect(screen.getByText(/search/).textContent).toContain('…');
  });

  it('tones done green and pending blue', () => {
    const { rerender } = render(<ToolCallPill name="t" done />);
    expect(screen.getByText(/t/).className).toContain('success');
    rerender(<ToolCallPill name="t" done={false} />);
    expect(screen.getByText(/t/).className).toContain('info');
  });

  it('renders title as the tooltip attribute when set, and none by default', () => {
    const { rerender } = render(<ToolCallPill name="search" done />);
    expect(screen.getByText(/search/)).not.toHaveAttribute('title');

    rerender(<ToolCallPill name="search" done title="query_knowledge_base" />);
    expect(screen.getByText(/search/)).toHaveAttribute('title', 'query_knowledge_base');
  });
});

describe('ToolCallStrip', () => {
  it('renders one pill per tool call', () => {
    render(
      <ToolCallStrip
        toolCalls={[
          { id: '1', name: 'search', done: true },
          { id: '2', name: 'fetch', done: false },
        ]}
      />,
    );
    expect(screen.getByText(/search/)).toBeInTheDocument();
    expect(screen.getByText(/fetch/)).toBeInTheDocument();
  });
});
