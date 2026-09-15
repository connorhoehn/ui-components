import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CollapsibleSection } from '../CollapsibleSection';

describe('CollapsibleSection', () => {
  beforeEach(() => window.localStorage.clear());

  it('starts closed by default and toggles via the header button', () => {
    render(<CollapsibleSection title="Advanced">body</CollapsibleSection>);
    const header = screen.getByRole('button', { name: /Advanced/ });
    expect(header).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('body')).toBeNull();
    fireEvent.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('honors defaultOpen', () => {
    render(<CollapsibleSection title="T" defaultOpen>body</CollapsibleSection>);
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('persists the open state under storageKey and restores it on remount', () => {
    const { unmount } = render(
      <CollapsibleSection title="T" storageKey="sec-a">body</CollapsibleSection>,
    );
    fireEvent.click(screen.getByRole('button', { name: /T/ }));
    expect(window.localStorage.getItem('sec-a')).toBe('true');
    unmount();
    render(<CollapsibleSection title="T" storageKey="sec-a">body</CollapsibleSection>);
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('a stored value beats defaultOpen', () => {
    window.localStorage.setItem('sec-b', 'false');
    render(
      <CollapsibleSection title="T" storageKey="sec-b" defaultOpen>body</CollapsibleSection>,
    );
    expect(screen.queryByText('body')).toBeNull();
  });

  it('renders the badge in the header', () => {
    render(
      <CollapsibleSection title="T" badge={<span data-testid="badge">3</span>}>b</CollapsibleSection>,
    );
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });
});

// REGRESSION: closing the section unmounts its body. With focus on a control
// inside that body, the browser had nowhere to put focus and dropped it to
// <body> — the keyboard user's Tab position silently reset to the top of the
// page. Focus must be handed up to the header that now stands for the
// collapsed section. Same defect and same fix as layout/CollapsibleSidebar
// and sidebar/SidebarSection.
describe('CollapsibleSection — focus handoff on close', () => {
  it('moves focus to the header instead of stranding it in the unmounted body', () => {
    render(
      <CollapsibleSection title="Details" defaultOpen>
        <button type="button">Inner action</button>
      </CollapsibleSection>,
    );

    const inner = screen.getByRole('button', { name: 'Inner action' });
    inner.focus();
    expect(document.activeElement).toBe(inner);

    const header = screen.getByRole('button', { name: /details/i });
    fireEvent.click(header);

    expect(document.activeElement).toBe(header);
    expect(document.activeElement).not.toBe(document.body);
  });

  it('leaves focus alone when it was never inside the body', () => {
    render(
      <>
        <button type="button">Outside</button>
        <CollapsibleSection title="Details" defaultOpen>
          <button type="button">Inner action</button>
        </CollapsibleSection>
      </>,
    );

    const outside = screen.getByRole('button', { name: 'Outside' });
    outside.focus();

    fireEvent.click(screen.getByRole('button', { name: /details/i }));

    expect(document.activeElement).toBe(outside);
  });

  it('points aria-controls at the body it reveals', () => {
    render(
      <CollapsibleSection title="Details" defaultOpen>
        <span>body content</span>
      </CollapsibleSection>,
    );

    const header = screen.getByRole('button', { name: /details/i });
    const bodyId = header.getAttribute('aria-controls');
    expect(bodyId).toBeTruthy();
    expect(document.getElementById(bodyId as string)).not.toBeNull();
  });

  it('renders actions beside the header button, never inside it', () => {
    render(
      <CollapsibleSection title="Session" actions={<button type="button">Terminate</button>}>
        body
      </CollapsibleSection>,
    );
    const header = screen.getByRole('button', { name: /Session/ });
    const terminate = screen.getByRole('button', { name: 'Terminate' });
    expect(header.contains(terminate)).toBe(false);
    // The action does not toggle the section.
    fireEvent.click(terminate);
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });
});
