import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuickPromptGrid } from '../QuickPromptGrid';

describe('QuickPromptGrid', () => {
  it('renders a card per prompt with label and hint, reporting clicks', () => {
    const onSelect = vi.fn();
    render(
      <QuickPromptGrid
        prompts={[{ label: 'Summarize', hint: 'the last run' }, { label: 'Explain' }]}
        onSelect={onSelect}
      />,
    );
    expect(screen.getByText('the last run')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Explain/ }));
    expect(onSelect).toHaveBeenCalledWith('Explain');
  });

  it('uses a fixed column count when given, auto-fit otherwise', () => {
    const { container, rerender } = render(
      <QuickPromptGrid prompts={[]} onSelect={() => {}} columns={2} />,
    );
    const grid = () => container.querySelector('div[style*="grid"]') as HTMLElement;
    expect(grid().style.gridTemplateColumns).toContain('repeat(2,');
    rerender(<QuickPromptGrid prompts={[]} onSelect={() => {}} />);
    expect(grid().style.gridTemplateColumns).toContain('auto-fit');
  });

  it('renders the title only when provided', () => {
    render(<QuickPromptGrid prompts={[]} onSelect={() => {}} title="Try asking:" />);
    expect(screen.getByText('Try asking:')).toBeInTheDocument();
  });
});
