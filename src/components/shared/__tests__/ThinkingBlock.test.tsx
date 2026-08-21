import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThinkingBlock } from '../ThinkingBlock';

describe('ThinkingBlock', () => {
  it('labels a finished thought "Thought" and an active one "Thinking"', () => {
    const { rerender } = render(<ThinkingBlock content="chain of thought" />);
    expect(screen.getByText('Thought')).toBeInTheDocument();
    rerender(<ThinkingBlock content="partial" streaming />);
    expect(screen.getByText('Thinking')).toBeInTheDocument();
  });

  it('renders the content text', () => {
    render(<ThinkingBlock content="step 1: read the file" defaultOpen />);
    expect(screen.getByText('step 1: read the file')).toBeInTheDocument();
  });

  it('collapsed by default, open with defaultOpen', () => {
    const { container, rerender } = render(<ThinkingBlock content="c" />);
    expect((container.querySelector('details') as HTMLDetailsElement).open).toBe(false);
    rerender(<ThinkingBlock content="c" defaultOpen />);
    expect((container.querySelector('details') as HTMLDetailsElement).open).toBe(true);
  });
});
