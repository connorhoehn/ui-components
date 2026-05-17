import { render, screen, fireEvent } from '@testing-library/react';
import { ParticipantTile } from '../ParticipantTile';

describe('ParticipantTile', () => {
  it('renders the displayName badge', () => {
    render(<ParticipantTile id="a" displayName="Alice" />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('renders the "You" label instead of displayName for local participant', () => {
    render(<ParticipantTile id="me" displayName="Connor" isLocal />);
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.queryByText('Connor')).not.toBeInTheDocument();
  });

  it('uses the uppercase first character of displayName as the avatar fallback', () => {
    render(<ParticipantTile id="a" displayName="alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders a videoElement instead of the avatar fallback when supplied', () => {
    render(
      <ParticipantTile
        id="a"
        displayName="Alice"
        videoElement={<video data-testid="custom-video" />}
      />,
    );
    expect(screen.getByTestId('custom-video')).toBeInTheDocument();
    // Avatar initial should NOT be rendered when videoElement is provided
    expect(screen.queryByText('A')).not.toBeInTheDocument();
  });

  it('applies the speaking border and corner-dot when isSpeaking', () => {
    const { container } = render(
      <ParticipantTile id="a" displayName="Alice" isSpeaking />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('border-[#22c55e]');
    const dot = container.querySelector('.bg-\\[\\#22c55e\\].rounded-full');
    expect(dot).not.toBeNull();
  });

  it('omits the speaking border when isSpeaking is false', () => {
    const { container } = render(<ParticipantTile id="a" displayName="Alice" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('border-transparent');
  });

  it('renders the muted glyph when isMuted', () => {
    const { container } = render(
      <ParticipantTile id="a" displayName="Alice" isMuted />,
    );
    // The mute SVG uses stroke="#ef4444"
    expect(container.querySelector('svg path[stroke="#ef4444"]')).not.toBeNull();
  });

  it('does not render the muted glyph when isMuted is false', () => {
    const { container } = render(<ParticipantTile id="a" displayName="Alice" />);
    expect(container.querySelector('svg path[stroke="#ef4444"]')).toBeNull();
  });

  it('exposes a button role only when onClick is set', () => {
    const { rerender, container } = render(
      <ParticipantTile id="a" displayName="Alice" />,
    );
    expect(screen.queryByRole('button')).toBeNull();

    rerender(<ParticipantTile id="a" displayName="Alice" onClick={() => {}} />);
    expect(screen.getByRole('button')).toBe(container.firstElementChild);
  });

  it('fires onClick on click', () => {
    const onClick = vi.fn();
    render(<ParticipantTile id="a" displayName="Alice" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fires onClick on Enter and Space keypresses', () => {
    const onClick = vi.fn();
    render(<ParticipantTile id="a" displayName="Alice" onClick={onClick} />);
    const tile = screen.getByRole('button');
    fireEvent.keyDown(tile, { key: 'Enter' });
    fireEvent.keyDown(tile, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('ignores non-activation keys', () => {
    const onClick = vi.fn();
    render(<ParticipantTile id="a" displayName="Alice" onClick={onClick} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
    expect(onClick).not.toHaveBeenCalled();
  });
});
