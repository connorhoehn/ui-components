import { render, screen } from '@testing-library/react';
import { Card } from '../Card';
import { AssistantMark } from '../../social/AssistantMark';

describe('Card tone', () => {
  it('the default card keeps the plain surface and border', () => {
    render(<Card data-testid="c">x</Card>);
    const card = screen.getByTestId('c');
    expect(card.className).toContain('bg-surface');
    expect(card.className).toContain('border-border');
    expect(card).not.toHaveAttribute('data-tone');
  });

  it('tone="assistant" sits on the accent-tinted surface an assistant reply uses', () => {
    render(<Card data-testid="c" tone="assistant" padding="sm">x</Card>);
    const card = screen.getByTestId('c');
    expect(card).toHaveAttribute('data-tone', 'assistant');
    expect(card.className).toContain('bg-accent-callout');
    expect(card.className).toContain('border-accent-callout-border');
    expect(card.className).not.toContain('bg-surface');
    expect(card.className).toContain('p-4');
  });
});

describe('AssistantMark', () => {
  it('is decorative by default and named when given a label', () => {
    const { rerender } = render(<AssistantMark />);
    expect(screen.getByTestId('assistant-mark')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('assistant-mark').querySelector('svg')).not.toBeNull();
    rerender(<AssistantMark label="Nova" icon={<span data-testid="glyph" />} size={32} />);
    expect(screen.getByRole('img', { name: 'Nova' })).toContainElement(screen.getByTestId('glyph'));
  });
});
