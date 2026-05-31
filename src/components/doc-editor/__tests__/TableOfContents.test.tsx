import { render, screen, fireEvent } from '@testing-library/react';
import TableOfContents from '../TableOfContents';

// jsdom doesn't ship IntersectionObserver; the component uses it to highlight
// the in-view section. A no-op stub satisfies the constructor + lifecycle.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
  root = null;
  rootMargin = '';
  thresholds = [];
}

beforeAll(() => {
  if (typeof globalThis.IntersectionObserver === 'undefined') {
    (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
      IntersectionObserverStub;
  }
});

describe('TableOfContents', () => {
  it('renders nothing when there are no sections', () => {
    const { container } = render(
      <TableOfContents sections={[]} focusedSectionId={null} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders one button per unique section title', () => {
    render(
      <TableOfContents
        sections={[
          { id: 's1', title: 'Overview' },
          { id: 's2', title: 'Details' },
          { id: 's3', title: 'Conclusion' },
        ]}
        focusedSectionId="s1"
      />,
    );
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Conclusion')).toBeInTheDocument();
  });

  it('falls back to "Untitled" when a section title is blank', () => {
    render(
      <TableOfContents
        sections={[{ id: 's1', title: '' }, { id: 's2', title: 'Other' }]}
        focusedSectionId="s1"
      />,
    );
    expect(screen.getByText('Untitled')).toBeInTheDocument();
  });

  it('deduplicates sections that share an ID', () => {
    render(
      <TableOfContents
        sections={[
          { id: 's1', title: 'Same' },
          { id: 's1', title: 'Same' },
          { id: 's2', title: 'Other' },
        ]}
        focusedSectionId="s1"
      />,
    );
    // Only the first "Same" survives; the second is dropped by the dedup filter.
    expect(screen.getAllByText('Same').length).toBe(1);
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('calls scrollIntoView when a section button is clicked', () => {
    const sectionEl = document.createElement('div');
    sectionEl.id = 'section-s1';
    const scrollSpy = vi.fn();
    sectionEl.scrollIntoView = scrollSpy as unknown as Element['scrollIntoView'];
    document.body.appendChild(sectionEl);

    render(
      <TableOfContents
        sections={[{ id: 's1', title: 'Overview' }]}
        focusedSectionId="s1"
      />,
    );
    fireEvent.click(screen.getByText('Overview'));
    expect(scrollSpy).toHaveBeenCalledTimes(1);
    document.body.removeChild(sectionEl);
  });
});
