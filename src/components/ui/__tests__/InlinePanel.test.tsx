import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { InlinePanel } from '../InlinePanel';

describe('InlinePanel', () => {
  it('renders children directly in place — no portal', () => {
    const { container } = render(
      <div data-testid="host">
        <InlinePanel>Sidebar content</InlinePanel>
      </div>,
    );
    // A portal would render into document.body, outside `host`.
    expect(screen.getByTestId('host')).toContainElement(screen.getByText('Sidebar content'));
    expect(container.querySelector('[data-testid="inline-panel"]')).not.toBeNull();
  });

  it('fills its parent — no fixed width, no `position: fixed`', () => {
    render(<InlinePanel>content</InlinePanel>);
    const el = screen.getByTestId('inline-panel');
    expect(el.className).toContain('h-full');
    expect(el.className).toContain('w-full');
    expect(el.className).not.toMatch(/\bfixed\b/);
    expect(el.style.width).toBe('');
    expect(el.getAttribute('style')).toBeNull();
  });

  it('carries no floating chrome — no shadow, no z-index layer', () => {
    render(<InlinePanel>content</InlinePanel>);
    const el = screen.getByTestId('inline-panel');
    expect(el.className).not.toMatch(/shadow/);
    expect(el.className).not.toMatch(/z-\[/);
  });

  it('defaults to the light surface token', () => {
    render(<InlinePanel>content</InlinePanel>);
    expect(screen.getByTestId('inline-panel').className).toContain('bg-surface');
  });

  it('applies the theme-invariant dark chrome tokens for variant="dark"', () => {
    render(<InlinePanel variant="dark">content</InlinePanel>);
    const el = screen.getByTestId('inline-panel');
    expect(el.className).toContain('bg-call-chrome');
    expect(el.className).toContain('border-call-chrome-border');
  });

  it('accepts a custom data-testid and merges className', () => {
    render(
      <InlinePanel data-testid="chat-sidebar" className="w-80">
        content
      </InlinePanel>,
    );
    const el = screen.getByTestId('chat-sidebar');
    expect(el.className).toContain('w-80');
  });

  it('gives the caller its underlying node via ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<InlinePanel ref={ref}>content</InlinePanel>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByTestId('inline-panel'));
  });

  it('does not leak a `ref` attribute onto the DOM', () => {
    const ref = createRef<HTMLDivElement>();
    render(<InlinePanel ref={ref}>content</InlinePanel>);
    expect(screen.getByTestId('inline-panel').hasAttribute('ref')).toBe(false);
  });
});
