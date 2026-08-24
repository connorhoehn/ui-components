import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SetupGuidePage } from '../SetupGuidePage';

// REGRESSION: each setup step's header carried `role="button"` and
// `aria-expanded` but was a plain <div> with no `tabIndex` and no key
// handler — a control that announced itself as a button to a screen reader
// and then could only be operated with a mouse. A keyboard user could not
// open any step of the setup guide to read its instructions. Nothing inside
// the header is interactive, so it is now a real <button type="button">,
// which gets Tab, Enter and Space from the browser.

const status: React.ComponentProps<typeof SetupGuidePage>['status'] = {
  hasUserPools: false,
  poolCount: 0,
  hasClients: false,
  clientCount: 0,
  hasAdminUser: false,
  totalUsers: 0,
  adminEmails: [],
  smtpConfigured: false,
  issuer: 'https://example.test',
  issuerConfigured: true,
};

function renderPage() {
  render(<SetupGuidePage status={status} onNavigate={vi.fn()} />);
  return screen.getAllByRole('button').filter((b) => b.hasAttribute('aria-expanded'));
}

describe('SetupGuidePage — step disclosure keyboard access', () => {
  it('renders each step header as a real button, not an ARIA-patched div', () => {
    const headers = renderPage();
    expect(headers.length).toBeGreaterThan(0);
    for (const h of headers) {
      expect(h.tagName).toBe('BUTTON');
      expect(h).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('points aria-controls at the panel it actually reveals', () => {
    const headers = renderPage();
    const first = headers[0];
    const panelId = first.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();

    fireEvent.click(first);

    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById(panelId as string)).not.toBeNull();
  });

  it('opens a step from the keyboard', () => {
    const headers = renderPage();
    const first = headers[0];
    first.focus();
    expect(document.activeElement).toBe(first);

    // A real <button> activates on both keys via the browser's click
    // synthesis; asserting the element type is what pins the fix, so drive
    // the same path the browser would.
    fireEvent.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');
  });
});
