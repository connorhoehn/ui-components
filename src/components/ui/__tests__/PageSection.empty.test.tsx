import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageSection } from '../PageSection';

describe('PageSection empty', () => {
  it('collapses to one row: the title and one quiet line, no description or content', () => {
    const { container } = render(
      <PageSection size="sm" title="Needs your attention" description="Agent questions and reviews." empty="Nothing right now"
        actions={<a href="#all">All runs</a>}>
        <p>content</p>
      </PageSection>,
    );
    const section = container.querySelector('section')!;
    expect(section).toHaveAttribute('data-section-empty');
    expect(section).toHaveAttribute('data-ui-section');
    const line = screen.getByText('Nothing right now');
    expect(line).toHaveAttribute('data-ui-empty');
    // The line shares the heading's cell (one row), and neither the description nor the content draws.
    expect(line.parentElement!.contains(screen.getByRole('heading', { name: 'Needs your attention' }))).toBe(true);
    expect(screen.queryByText('Agent questions and reviews.')).toBeNull();
    expect(screen.queryByText('content')).toBeNull();
    expect(screen.getByText('All runs')).toBeInTheDocument();
  });

  it('draws its content (and no empty marker) when not empty', () => {
    const { container } = render(<PageSection size="sm" title="Recent runs"><p>content</p></PageSection>);
    expect(container.querySelector('section')).not.toHaveAttribute('data-section-empty');
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
