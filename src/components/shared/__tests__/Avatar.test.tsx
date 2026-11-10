import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar, AvatarGroup, AVATAR_PALETTE, nameToInitials, nameToColor } from '../Avatar';

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
    const palette = new Set(AVATAR_PALETTE);
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
    expect(screen.getByTitle('general')).toHaveStyle({ fontSize: '14px' });
    rerender(<Avatar name="general" size={40} glyph="#" />);
    expect(screen.getByTitle('general')).toHaveStyle({ fontSize: '20px' });
  });
});

describe('Avatar foreground and title opt-out', () => {
  it('still renders white initials by default', () => {
    render(<Avatar name="Alice Smith" color="#4f7cff" />);
    expect(screen.getByTitle('Alice Smith')).toHaveStyle({ color: '#fff' });
  });

  it('honours an explicit foreground', () => {
    render(<Avatar name="Alice Smith" color="#e0e7ff" foreground="#4338ca" />);
    expect(screen.getByTitle('Alice Smith')).toHaveStyle({ color: '#4338ca' });
  });

  it('picks a dark foreground on a light fill with autoContrast', () => {
    render(<Avatar name="Alice Smith" color="#e0e7ff" autoContrast />);
    expect(screen.getByTitle('Alice Smith')).toHaveStyle({ color: 'var(--color-text-primary)' });
  });

  it('keeps white on a dark fill with autoContrast', () => {
    render(<Avatar name="Alice Smith" color="#1e293b" autoContrast />);
    expect(screen.getByTitle('Alice Smith')).toHaveStyle({ color: '#fff' });
  });

  it('falls back to white when the colour cannot be read', () => {
    render(<Avatar name="Alice Smith" color="var(--color-primary)" autoContrast />);
    expect(screen.getByTitle('Alice Smith')).toHaveStyle({ color: '#fff' });
  });

  it('paints a tone as classes, leaving the inline colours unset', () => {
    render(<Avatar name="Alice Smith" tone="info" data-testid="a" />);
    const el = screen.getByTitle('Alice Smith');
    expect(el.className).toContain('bg-info-bg');
    expect(el.className).toContain('text-info-fg');
    expect(el.style.background).toBe('');
    expect(el.style.color).toBe('');
  });

  it('renders no title attribute at all for title={null}', () => {
    const { container } = render(<Avatar name="Alice Smith" title={null} />);
    expect(container.firstElementChild).not.toHaveAttribute('title');
  });

  it('renders no title attribute for showTitle={false}', () => {
    const { container } = render(<Avatar name="Alice Smith" showTitle={false} />);
    expect(container.firstElementChild).not.toHaveAttribute('title');
  });

  it('snaps initials to the house type scale by size step (2.515.12; was size × 0.38)', () => {
    const table: Array<[number, string]> = [[16, '11px'], [18, '11px'], [20, '11px'], [24, '12px'], [28, '12px'], [32, '12px'], [36, '14px'], [40, '14px'], [48, '16px'], [64, '16px']];
    const { rerender } = render(<Avatar name="Vera Green" size={48} />);
    for (const [size, px] of table) {
      rerender(<Avatar name="Vera Green" size={size} />);
      expect(screen.getByTitle('Vera Green')).toHaveStyle({ fontSize: px });
    }
  });

  it('AvatarGroup overflow count uses the same scale', () => {
    render(<AvatarGroup names={['A B', 'C D', 'E F']} maxVisible={1} size={32} />);
    expect(screen.getByTitle('+2 more')).toHaveStyle({ fontSize: '12px' });
  });
});
