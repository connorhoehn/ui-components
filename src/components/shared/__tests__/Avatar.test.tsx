import { render, screen } from '@testing-library/react';
import { Avatar, nameToInitials, nameToColor } from '../Avatar';

describe('Avatar', () => {
  it('renders initials derived from the name when no src is provided', () => {
    render(<Avatar name="Alice Smith" />);
    expect(screen.getByText('AS')).toBeInTheDocument();
    expect(screen.getByTitle('Alice Smith')).toBeInTheDocument();
  });

  it('renders an <img> with src when src is provided', () => {
    render(<Avatar name="Alice" src="https://example.com/a.png" />);
    const img = screen.getByAltText('Alice') as HTMLImageElement;
    expect(img.tagName).toBe('IMG');
    expect(img.src).toBe('https://example.com/a.png');
  });

  it('falls back to initials for empty names', () => {
    render(<Avatar name="" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('uses an explicit title when provided', () => {
    render(<Avatar name="Bob" title="Bob (admin)" />);
    expect(screen.getByTitle('Bob (admin)')).toBeInTheDocument();
  });
});

describe('nameToInitials', () => {
  it('returns "?" for empty input', () => {
    expect(nameToInitials('')).toBe('?');
    expect(nameToInitials('   ')).toBe('?');
  });

  it('returns uppercased initials of first two words', () => {
    expect(nameToInitials('alice smith')).toBe('AS');
    expect(nameToInitials('Alice Smith Carter')).toBe('AS');
  });

  it('returns first two characters (capitalized) for a single word', () => {
    expect(nameToInitials('alice')).toBe('Al');
    expect(nameToInitials('a')).toBe('A');
  });
});

describe('nameToColor', () => {
  it('returns a deterministic color from the palette for the same name', () => {
    expect(nameToColor('alice')).toBe(nameToColor('alice'));
  });

  it('returns one of the palette colors', () => {
    const palette = new Set([
      '#4f7cff',
      '#22c55e',
      '#f59e0b',
      '#ef4444',
      '#a855f7',
      '#14b8a6',
      '#0ea5e9',
      '#f97316',
    ]);
    expect(palette.has(nameToColor('alice'))).toBe(true);
    expect(palette.has(nameToColor('bob'))).toBe(true);
  });
});
