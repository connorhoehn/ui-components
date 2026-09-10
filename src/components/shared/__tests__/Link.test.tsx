import { render, screen } from '@testing-library/react';
import { Link } from '../Link';

describe('Link', () => {
  it('renders an anchor to the href', () => {
    render(<Link href="https://example.com">Docs</Link>);
    const a = screen.getByRole('link', { name: 'Docs' });
    expect(a).toHaveAttribute('href', 'https://example.com');
  });

  it('carries the default styling, and drops it when unstyled', () => {
    const { unmount } = render(<Link href="/a">x</Link>);
    expect(screen.getByRole('link').className).toContain('text-primary');
    unmount();
    render(<Link href="/a" unstyled>y</Link>);
    expect(screen.getByRole('link').className).not.toContain('text-primary');
  });

  // The whole reason this is a component: a new tab without rel="noopener"
  // hands the opened page a live window.opener back to yours.
  it('forces safe rel when external', () => {
    render(<Link href="https://x.test" external>PR</Link>);
    const a = screen.getByRole('link');
    expect(a).toHaveAttribute('target', '_blank');
    expect(a.getAttribute('rel')).toContain('noopener');
    expect(a.getAttribute('rel')).toContain('noreferrer');
  });

  it('protects an explicit target="_blank" too, not just `external`', () => {
    render(<Link href="https://x.test" target="_blank">PR</Link>);
    expect(screen.getByRole('link').getAttribute('rel')).toContain('noopener');
  });

  it('merges a caller rel without duplicating the safety tokens', () => {
    render(<Link href="https://x.test" external rel="nofollow noopener">PR</Link>);
    const rel = screen.getByRole('link').getAttribute('rel') ?? '';
    expect(rel).toContain('nofollow');
    expect(rel.match(/noopener/g)).toHaveLength(1);
  });

  it('leaves rel alone for a same-tab link', () => {
    render(<Link href="/internal">home</Link>);
    const a = screen.getByRole('link');
    expect(a).not.toHaveAttribute('target');
    expect(a).not.toHaveAttribute('rel');
  });

  it('forwards arbitrary anchor attributes', () => {
    render(<Link href="/a" title="tip" data-testid="l" aria-label="A">x</Link>);
    const a = screen.getByTestId('l');
    expect(a).toHaveAttribute('title', 'tip');
    expect(a).toHaveAttribute('aria-label', 'A');
  });
});
