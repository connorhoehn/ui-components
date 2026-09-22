import { render, screen, fireEvent } from '@testing-library/react';
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

  it('falls back to initials when the image fails to load', () => {
    render(<Avatar name="Alice Smith" src="https://example.com/broken.png" />);
    const img = screen.getByAltText('Alice Smith');
    expect(screen.queryByText('AS')).toBeNull();

    fireEvent.error(img);
    expect(screen.getByText('AS')).toBeInTheDocument();
    expect(screen.queryByAltText('Alice Smith')).toBeNull();
  });

  it('retries the image when src changes after a failure', () => {
    const { rerender } = render(
      <Avatar name="Alice Smith" src="https://example.com/broken.png" />,
    );
    fireEvent.error(screen.getByAltText('Alice Smith'));
    expect(screen.getByText('AS')).toBeInTheDocument();

    rerender(<Avatar name="Alice Smith" src="https://example.com/fresh.png" />);
    expect(screen.getByAltText('Alice Smith')).toBeInTheDocument();
    expect(screen.queryByText('AS')).toBeNull();
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

// A channel is avatar-shaped without being a person. Before `glyph`/`icon` the
// only way to draw one at the same size, colour and overlap was a hand-rolled
// span beside the real Avatars — two components to keep in step, one of them
// outside the design system.
describe('Avatar — glyph and icon', () => {
  it('renders a glyph instead of initials, so a channel # goes through Avatar', () => {
    render(<Avatar name="general" glyph="#" />);
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.queryByText('Ge')).not.toBeInTheDocument();
  });

  it('keeps the name as the accessible title and the colour source', () => {
    render(<Avatar name="general" glyph="#" />);
    const circle = screen.getByTitle('general');
    expect(circle).toHaveStyle({ background: nameToColor('general') });
  });

  it('renders an arbitrary icon node', () => {
    render(<Avatar name="releases" icon={<svg data-testid="lock-icon" />} />);
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
    expect(screen.queryByText('Re')).not.toBeInTheDocument();
  });

  it('lets a loaded image win over the glyph — a photo is more specific', () => {
    render(<Avatar name="Alice" glyph="#" src="https://example.com/a.png" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/a.png');
    expect(screen.queryByText('#')).not.toBeInTheDocument();
  });

  it('falls back to the glyph when the image fails, not to initials', () => {
    render(<Avatar name="general" glyph="#" src="https://example.com/missing.png" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('#')).toBeInTheDocument();
  });

  it('sizes a single glyph larger than two initials would be', () => {
    const { rerender } = render(<Avatar name="general" size={40} />);
    expect(screen.getByTitle('general')).toHaveStyle({ fontSize: '15.2px' });
    rerender(<Avatar name="general" size={40} glyph="#" />);
    expect(screen.getByTitle('general')).toHaveStyle({ fontSize: '20px' });
  });
});
