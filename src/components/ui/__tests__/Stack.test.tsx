import { render, screen } from '@testing-library/react';
import { Stack, Inline } from '../Stack';

describe('Stack', () => {
  it('is a flex column with the default md gap', () => {
    render(<Stack data-testid="s">child</Stack>);
    const el = screen.getByTestId('s');
    expect(el.className).toContain('flex');
    expect(el.className).toContain('flex-col');
    expect(el.className).toContain('gap-3');
  });

  it('maps the gap scale to literal Tailwind classes', () => {
    // The classes must be literals, not `gap-${n}` — a template literal
    // produces no rule at all under Tailwind v4's source scan.
    const gaps = { none: 'gap-0', xs: 'gap-1.5', sm: 'gap-2', md: 'gap-3', lg: 'gap-4', xl: 'gap-6' } as const;
    for (const [gap, cls] of Object.entries(gaps)) {
      const { unmount } = render(
        <Stack data-testid="g" gap={gap as keyof typeof gaps}>x</Stack>,
      );
      expect(screen.getByTestId('g').className).toContain(cls);
      unmount();
    }
  });

  it('applies align and justify', () => {
    render(<Stack data-testid="s" align="center" justify="between">x</Stack>);
    const cls = screen.getByTestId('s').className;
    expect(cls).toContain('items-center');
    expect(cls).toContain('justify-between');
  });

  it('does not wrap by default but does when asked', () => {
    const { rerender } = render(<Stack data-testid="s">x</Stack>);
    expect(screen.getByTestId('s').className).not.toContain('flex-wrap');
    rerender(<Stack data-testid="s" wrap>x</Stack>);
    expect(screen.getByTestId('s').className).toContain('flex-wrap');
  });

  it('renders as another element via `as`', () => {
    render(<Stack as="ul" data-testid="s"><li>a</li></Stack>);
    expect(screen.getByTestId('s').tagName).toBe('UL');
  });

  it('merges a caller className over the defaults', () => {
    // twMerge: a caller-supplied gap must beat the prop-derived one, or a page
    // can never override spacing without an inline style — the exact escape
    // hatch this component exists to remove.
    render(<Stack data-testid="s" gap="sm" className="gap-6">x</Stack>);
    const cls = screen.getByTestId('s').className;
    expect(cls).toContain('gap-6');
    expect(cls).not.toContain('gap-2');
  });

  it('forwards arbitrary DOM props', () => {
    render(<Stack data-testid="s" role="group" aria-label="Filters">x</Stack>);
    expect(screen.getByRole('group', { name: 'Filters' })).toBeInTheDocument();
  });
});

describe('Inline', () => {
  it('is a flex row that wraps and centres by default', () => {
    render(<Inline data-testid="i">x</Inline>);
    const cls = screen.getByTestId('i').className;
    expect(cls).toContain('flex-row');
    expect(cls).toContain('flex-wrap');
    expect(cls).toContain('items-center');
    expect(cls).toContain('gap-2'); // sm — the row default, tighter than Stack's
  });

  it('can opt out of wrapping', () => {
    render(<Inline data-testid="i" wrap={false}>x</Inline>);
    expect(screen.getByTestId('i').className).not.toContain('flex-wrap');
  });

  it('can override the cross-axis alignment', () => {
    render(<Inline data-testid="i" align="baseline">x</Inline>);
    expect(screen.getByTestId('i').className).toContain('items-baseline');
  });

  it('renders its children', () => {
    render(<Inline><span>a</span><span>b</span></Inline>);
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });
});
