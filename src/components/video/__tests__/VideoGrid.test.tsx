import { render, screen } from '@testing-library/react';
import { VideoGrid, type Participant } from '../VideoGrid';

function makeParticipants(n: number, overrides: Partial<Participant> = {}): Participant[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `p${i + 1}`,
    displayName: `Person ${i + 1}`,
    ...overrides,
  }));
}

function getGridRoot(container: HTMLElement): HTMLElement {
  const root = container.firstChild as HTMLElement | null;
  if (!root) throw new Error('expected a grid root element');
  return root;
}

describe('VideoGrid', () => {
  it('renders one tile per participant', () => {
    render(<VideoGrid participants={makeParticipants(3)} />);
    expect(screen.getByText('Person 1')).toBeInTheDocument();
    expect(screen.getByText('Person 2')).toBeInTheDocument();
    expect(screen.getByText('Person 3')).toBeInTheDocument();
  });

  it('renders nothing inside the grid when participants is empty', () => {
    const { container } = render(<VideoGrid participants={[]} />);
    const root = getGridRoot(container);
    expect(root.children.length).toBe(0);
  });

  // count → expected column count tier
  // 1            → 1 col
  // 2,3,4        → 2 cols
  // 5,6,7,8,9    → 3 cols
  // 10+          → 4 cols
  const tiers: Array<[number, number]> = [
    [1, 1],
    [2, 2],
    [4, 2],
    [5, 3],
    [9, 3],
    [10, 4],
  ];

  for (const [count, cols] of tiers) {
    it(`uses ${cols} columns for ${count} participant(s)`, () => {
      const { container } = render(<VideoGrid participants={makeParticipants(count)} />);
      const root = getGridRoot(container);
      expect(root.style.gridTemplateColumns).toBe(`repeat(${cols}, 1fr)`);
    });
  }

  it('merges caller-supplied style with gridTemplateColumns', () => {
    const { container } = render(
      <VideoGrid participants={makeParticipants(2)} style={{ height: '400px' }} />,
    );
    const root = getGridRoot(container);
    expect(root.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
    expect(root.style.height).toBe('400px');
  });

  it('applies the speaking border on speaking tiles only', () => {
    const participants: Participant[] = [
      { id: 'a', displayName: 'Alice', isSpeaking: true },
      { id: 'b', displayName: 'Bob', isSpeaking: false },
    ];
    const { container } = render(<VideoGrid participants={participants} />);
    const root = getGridRoot(container);
    const tiles = Array.from(root.children) as HTMLElement[];
    expect(tiles).toHaveLength(2);
    expect(tiles[0].className).toContain('border-success');
    expect(tiles[1].className).toContain('border-transparent');
  });

  it('renders the "You" label for the local participant', () => {
    const participants: Participant[] = [
      { id: 'me', displayName: 'Connor', isLocal: true },
      { id: 'other', displayName: 'Riley' },
    ];
    render(<VideoGrid participants={participants} />);
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('Riley')).toBeInTheDocument();
    expect(screen.queryByText('Connor')).not.toBeInTheDocument();
  });

  it('renders a caller-provided videoElement instead of the avatar fallback', () => {
    const participants: Participant[] = [
      {
        id: 'a',
        displayName: 'Alice',
        videoElement: <video data-testid="custom-video" />,
      },
    ];
    render(<VideoGrid participants={participants} />);
    expect(screen.getByTestId('custom-video')).toBeInTheDocument();
  });
});
