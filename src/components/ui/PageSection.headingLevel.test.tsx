// PageSection's heading level (2.549.0): one h1 per PageFrame page.
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageSection } from './PageSection';
import { PageFrame } from '../shared/PageFrame';

describe('PageSection heading level', () => {
  it('outside a PageFrame: h1 for lg and h2 for md, as before', () => {
    render(<><PageSection title="Overview" /><PageSection title="Up next" size="md" /></>);
    expect(screen.getByRole('heading', { level: 1, name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Up next' })).toBeInTheDocument();
  });

  it('inside a PageFrame: sections are h2, so the page keeps one h1', () => {
    render(
      <PageFrame title="New presentation">
        <PageSection title="Start from a template" />
        <PageSection title="Start from a document" />
      </PageFrame>,
    );
    expect(screen.getAllByRole('heading', { level: 1 }).map((h) => h.textContent)).toEqual(['New presentation']);
    expect(screen.getByRole('heading', { level: 2, name: 'Start from a template' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Start from a document' })).toBeInTheDocument();
  });

  it('follows the frame title: under titleAs="h2" a section is h3', () => {
    render(<PageFrame title="Record" titleAs="h2"><PageSection title="Details" /></PageFrame>);
    expect(screen.getByRole('heading', { level: 3, name: 'Details' })).toBeInTheDocument();
  });

  it('as wins, and the look does not change with the level', () => {
    const { container } = render(
      <>
        <PageSection title="Plain" />
        <PageFrame title="Page"><PageSection title="Framed" /><PageSection title="Own" as="h4" /></PageFrame>
      </>,
    );
    expect(screen.getByRole('heading', { level: 4, name: 'Own' })).toBeInTheDocument();
    const plain = screen.getByRole('heading', { name: 'Plain' });
    const framed = screen.getByRole('heading', { name: 'Framed' });
    expect(framed.className).toBe(plain.className);
    expect(container).toBeTruthy();
  });
});
