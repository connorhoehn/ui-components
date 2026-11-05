import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppShell } from '../AppShell';

describe('AppShell chrome', () => {
  it('pins the header row and derives every offset from one chrome height', () => {
    const { container } = render(
      <AppShell header={<span>brand</span>} subheader={<span>band</span>} sidebar={<span>rail</span>} toastRegion={null} headerHeight={53} subheaderHeight={36}>
        page
      </AppShell>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute('data-chrome-height')).toBe('89');
    expect(root.style.getPropertyValue('--app-shell-chrome-h')).toBe('89px');
    expect(screen.getByTestId('app-shell-header').style.height).toBe('53px');
    expect(screen.getByTestId('app-subheader').style.height).toBe('36px');
    const sidebar = screen.getByRole('navigation', { name: 'App sidebar' });
    expect(sidebar.style.top).toBe('var(--app-shell-chrome-h)');
  });

  it('counts the subheader only when there is one, and drops the page padding on request', () => {
    const { container } = render(
      <AppShell header={<span>brand</span>} toastRegion={null} contentPadding="none">
        page
      </AppShell>,
    );
    expect((container.firstElementChild as HTMLElement).getAttribute('data-chrome-height')).toBe('53');
    expect(screen.queryByTestId('app-subheader')).toBeNull();
    expect(screen.getByTestId('app-shell-content').getAttribute('data-padding')).toBe('none');
  });
});

describe('AppShell layout', () => {
  it("defaults to 'document': at least the window tall, the document scrolls", () => {
    const { container } = render(<AppShell header={<span>brand</span>} toastRegion={null}>page</AppShell>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute('data-layout')).toBe('document');
    expect(root.className).toContain('min-h-screen');
    expect(root.className).not.toContain('h-dvh');
    expect(screen.getByRole('main').className).not.toContain('overflow-hidden');
  });

  it("'fill' pins the shell to 100dvh and gives the main region a definite, non-scrolling height", () => {
    const { container } = render(
      <AppShell layout="fill" header={<span>brand</span>} sidebar={<span>rail</span>} toastRegion={null}>page</AppShell>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute('data-layout')).toBe('fill');
    expect(root.className).toContain('h-dvh');
    expect(root.className).toContain('overflow-hidden');
    expect(root.className).not.toContain('min-h-screen');
    const body = screen.getByTestId('app-shell-body');
    expect(body.className).toContain('min-h-0');
    expect(body.className).toContain('flex-1');
    const main = screen.getByRole('main');
    expect(main.className).toContain('min-h-0');
    expect(main.className).toContain('overflow-hidden');
    expect(screen.getByTestId('app-shell-content').className).toContain('overflow-hidden');
  });

  it('pads the page with the shared --ui-page-gutter token', () => {
    render(<AppShell header={<span>brand</span>} toastRegion={null}>page</AppShell>);
    expect(screen.getByTestId('app-shell-content').className).toContain('px-[var(--ui-page-gutter,1.5rem)]');
  });
});
