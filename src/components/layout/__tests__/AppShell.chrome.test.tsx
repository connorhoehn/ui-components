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
