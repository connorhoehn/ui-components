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
