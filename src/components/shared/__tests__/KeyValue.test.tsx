import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { KeyValue } from '../KeyValue';

const ITEMS = [
  { label: 'Input', value: '13 run notes' },
  { label: 'Output', value: '4 patterns' },
  { label: 'Job id', value: 'cmp-0007', mono: true, title: 'cmp-0007-full' },
];

describe('KeyValue', () => {
  it('renders a description list with each label and value', () => {
    const { container } = render(<KeyValue items={ITEMS} aria-label="Run facts" />);
    expect(container.querySelector('dl')?.getAttribute('aria-label')).toBe('Run facts');
    const terms = [...container.querySelectorAll('dt')].map((n) => n.textContent);
    const defs = [...container.querySelectorAll('dd')].map((n) => n.textContent);
    expect(terms).toEqual(['Input', 'Output', 'Job id']);
    expect(defs).toEqual(['13 run notes', '4 patterns', 'cmp-0007']);
  });

  it('defaults to row layout with the label width class', () => {
    render(<KeyValue items={ITEMS} />);
    expect(screen.getByTestId('key-value').getAttribute('data-layout')).toBe('row');
    expect(screen.getByText('Input').className).toContain('w-28');
  });

  it('honours labelWidth and the other layouts', () => {
    const { rerender } = render(<KeyValue items={ITEMS} labelWidth="w-16" />);
    expect(screen.getByText('Input').className).toContain('w-16');
    rerender(<KeyValue items={ITEMS} layout="grid" />);
    expect(screen.getByTestId('key-value').className).toContain('grid-cols-2');
    rerender(<KeyValue items={ITEMS} layout="stack" />);
    expect(screen.getByTestId('key-value').getAttribute('data-layout')).toBe('stack');
    expect(screen.getByText('Input').className).not.toContain('w-28');
  });

  it('applies mono and title to the value', () => {
    render(<KeyValue items={ITEMS} />);
    const dd = screen.getByText('cmp-0007');
    expect(dd.className).toContain('font-mono');
    expect(dd.getAttribute('title')).toBe('cmp-0007-full');
    expect(screen.getByText('13 run notes').hasAttribute('title')).toBe(false);
  });

  it('renders nothing for no items', () => {
    const { container } = render(<KeyValue items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
