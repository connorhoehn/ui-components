import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InlinePlaceholder } from '../InlinePlaceholder';

describe('InlinePlaceholder', () => {
  it('renders the message', () => {
    render(<InlinePlaceholder>nothing here</InlinePlaceholder>);
    expect(screen.getByText('nothing here')).toBeInTheDocument();
  });

  it('renders an action beside the message', () => {
    render(
      <InlinePlaceholder action={<button type="button">+ new</button>}>
        No computers yet.
      </InlinePlaceholder>,
    );
    expect(screen.getByRole('button', { name: '+ new' })).toBeInTheDocument();
  });

  it('omits the action slot entirely when no action is given', () => {
    render(<InlinePlaceholder>empty</InlinePlaceholder>);
    expect(screen.getByTestId('inline-placeholder').querySelectorAll('span')).toHaveLength(1);
  });

  // The whole point of the component: EmptyState's min-h-[220px] is what
  // overflows a rail section or a quarter-window pane, so this one must never
  // grow a height floor.
  it('imposes no minimum height', () => {
    render(<InlinePlaceholder>empty</InlinePlaceholder>);
    expect(screen.getByTestId('inline-placeholder').className).not.toMatch(/min-h/);
  });

  it('defaults to the xs scale, left-aligned, in the surface family', () => {
    render(<InlinePlaceholder>empty</InlinePlaceholder>);
    expect(screen.getByTestId('inline-placeholder')).toHaveClass(
      'text-[11px]',
      'justify-start',
      'text-left',
      'text-text-tertiary',
    );
  });

  it('paints in the code family when tone="code"', () => {
    render(<InlinePlaceholder tone="code">empty</InlinePlaceholder>);
    const el = screen.getByTestId('inline-placeholder');
    expect(el).toHaveClass('text-code-raised');
    expect(el).not.toHaveClass('text-text-tertiary');
  });

  it('centres and enlarges for a region it owns outright', () => {
    render(<InlinePlaceholder size="sm" align="center">gone</InlinePlaceholder>);
    expect(screen.getByTestId('inline-placeholder')).toHaveClass(
      'text-[13px]',
      'justify-center',
      'text-center',
    );
  });

  it('forwards className and a custom testid', () => {
    render(
      <InlinePlaceholder className="px-3 py-4" data-testid="rail-empty">
        empty
      </InlinePlaceholder>,
    );
    expect(screen.getByTestId('rail-empty')).toHaveClass('px-3', 'py-4');
  });

  // Same trust-boundary reasoning as crash-resistance.test.tsx: these props
  // cross a type-erased boundary, and a placeholder is the LAST thing that
  // should take a region down.
  it('falls back to the defaults for out-of-union prop values', () => {
    render(
      <InlinePlaceholder
        size={'huge' as unknown as 'sm'}
        align={'end' as unknown as 'start'}
        tone={'neon' as unknown as 'code'}
      >
        empty
      </InlinePlaceholder>,
    );
    expect(screen.getByTestId('inline-placeholder')).toHaveClass(
      'text-[11px]',
      'justify-start',
      'text-text-tertiary',
    );
  });
});
