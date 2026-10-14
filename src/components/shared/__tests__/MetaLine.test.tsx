import { render, screen } from '@testing-library/react';
import { MetaLine } from '../MetaLine';

describe('MetaLine', () => {
  it('weaves separators between the items', () => {
    render(<MetaLine data-testid="m" items={['Auth Migration', '18 Aug', '3 days left']} />);
    expect(screen.getByTestId('m').textContent).toBe('Auth Migration·18 Aug·3 days left');
  });

  it('does not put a separator before the first item', () => {
    render(<MetaLine data-testid="m" items={['only']} />);
    expect(screen.getByTestId('m').textContent).toBe('only');
  });

  it('drops an empty entry WITH its separator', () => {
    // The bug this component exists to kill: a hand-rolled `{a}{' · '}{b}`
    // leaves "Auth Migration ·  · 0d left" when the middle field is null.
    render(<MetaLine data-testid="m" items={['Auth Migration', null, '0d left']} />);
    expect(screen.getByTestId('m').textContent).toBe('Auth Migration·0d left');
  });

  it.each([
    ['undefined', undefined],
    ['false', false],
    ['empty string', ''],
    ['whitespace', '   '],
  ])('treats %s as absent', (_label, value) => {
    render(<MetaLine data-testid="m" items={['a', value, 'b']} />);
    expect(screen.getByTestId('m').textContent).toBe('a·b');
  });

  it('keeps a zero — a zero is a value, not a missing field', () => {
    render(<MetaLine data-testid="m" items={['pts', 0]} />);
    expect(screen.getByTestId('m').textContent).toBe('pts·0');
  });

  it('renders nothing at all when every item is absent', () => {
    const { container } = render(<MetaLine items={[null, '', false]} />);
    expect(container.firstChild).toBeNull();
  });

  it('accepts element items, not just strings', () => {
    render(<MetaLine items={[<a key="l" href="/p">Project</a>, 'today']} />);
    expect(screen.getByRole('link', { name: 'Project' })).toBeInTheDocument();
  });

  it('takes a custom separator', () => {
    render(<MetaLine data-testid="m" separator="→" items={['18 Aug', '1 Sept']} />);
    expect(screen.getByTestId('m').textContent).toBe('18 Aug→1 Sept');
  });

  it('hides separators from assistive tech', () => {
    render(<MetaLine data-testid="m" items={['a', 'b']} />);
    const seps = screen.getByTestId('m').querySelectorAll('[aria-hidden="true"]');
    expect(seps).toHaveLength(1);
  });

  it('applies the size and tone scales', () => {
    const { rerender } = render(<MetaLine data-testid="m" items={['a']} />);
    expect(screen.getByTestId('m').className).toContain('text-[12px]');
    expect(screen.getByTestId('m').className).toContain('text-text-tertiary');
    rerender(<MetaLine data-testid="m" items={['a']} size="sm" tone="secondary" />);
    expect(screen.getByTestId('m').className).toContain('text-[12px]');
    expect(screen.getByTestId('m').className).toContain('text-text-secondary');
  });
});
