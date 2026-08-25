import { render, screen, fireEvent } from '@testing-library/react';
import MediaEffectsTray, {
  type MediaEffectsTrayProps,
} from '../MediaEffectsTray';

const FILTERS = [
  { id: 'none', label: 'None' },
  { id: 'warm', label: 'Warm' },
  { id: 'mono', label: 'Mono' },
];

const BACKGROUNDS = [
  { id: 'beach', label: 'Beach', url: 'data:image/gif;base64,beach' },
  { id: 'forest', label: 'Forest', url: 'data:image/gif;base64,forest' },
];

const FACE_SPRITES = [
  { id: 'glasses', label: '🕶️ Glasses' },
  { id: 'crown', label: '👑 Crown' },
];

function baseProps(overrides: Partial<MediaEffectsTrayProps> = {}): MediaEffectsTrayProps {
  return {
    filters: FILTERS,
    activeFilterId: 'none',
    onSelectFilter: () => {},
    backgrounds: BACKGROUNDS,
    backgroundMode: 'none',
    activeBackgroundUrl: null,
    onSelectBackground: () => {},
    faceSprites: FACE_SPRITES,
    activeFaceSpriteId: null,
    onSelectFaceSprite: () => {},
    ...overrides,
  };
}

describe('MediaEffectsTray', () => {
  it('renders the three section headings', () => {
    render(<MediaEffectsTray {...baseProps()} />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Background')).toBeInTheDocument();
    expect(screen.getByText('Face FX')).toBeInTheDocument();
  });

  it('renders a chip per filter with stable testids', () => {
    render(<MediaEffectsTray {...baseProps()} />);
    expect(screen.getByTestId('effects-filter-none')).toBeInTheDocument();
    expect(screen.getByTestId('effects-filter-warm')).toBeInTheDocument();
    expect(screen.getByTestId('effects-filter-mono')).toBeInTheDocument();
  });

  it('fires onSelectFilter with the clicked id', () => {
    const onSelectFilter = vi.fn();
    render(<MediaEffectsTray {...baseProps({ onSelectFilter })} />);
    fireEvent.click(screen.getByTestId('effects-filter-warm'));
    expect(onSelectFilter).toHaveBeenCalledWith('warm');
  });

  it('marks the active filter via aria-pressed', () => {
    render(<MediaEffectsTray {...baseProps({ activeFilterId: 'mono' })} />);
    expect(screen.getByTestId('effects-filter-mono')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('effects-filter-warm')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('effects-filter-none')).toHaveAttribute('aria-pressed', 'false');
  });

  // ── Background section — always fires the (mode, url) tuple ───────────

  it('renders None + Blur + one chip per background image', () => {
    render(<MediaEffectsTray {...baseProps()} />);
    expect(screen.getByTestId('effects-bg-none')).toBeInTheDocument();
    expect(screen.getByTestId('effects-bg-blur')).toBeInTheDocument();
    expect(screen.getByTestId('effects-bg-beach')).toBeInTheDocument();
    expect(screen.getByTestId('effects-bg-forest')).toBeInTheDocument();
  });

  it("fires ('none', null) from the None chip", () => {
    const onSelectBackground = vi.fn();
    render(<MediaEffectsTray {...baseProps({ onSelectBackground, backgroundMode: 'blur' })} />);
    fireEvent.click(screen.getByTestId('effects-bg-none'));
    expect(onSelectBackground).toHaveBeenCalledWith('none', null);
  });

  it("fires ('blur', null) from the Blur chip", () => {
    const onSelectBackground = vi.fn();
    render(<MediaEffectsTray {...baseProps({ onSelectBackground })} />);
    fireEvent.click(screen.getByTestId('effects-bg-blur'));
    expect(onSelectBackground).toHaveBeenCalledWith('blur', null);
  });

  it("fires ('image', url) from an image chip", () => {
    const onSelectBackground = vi.fn();
    render(<MediaEffectsTray {...baseProps({ onSelectBackground })} />);
    fireEvent.click(screen.getByTestId('effects-bg-forest'));
    expect(onSelectBackground).toHaveBeenCalledWith('image', BACKGROUNDS[1].url);
  });

  it('reflects backgroundMode via aria-pressed on None / Blur', () => {
    const { rerender } = render(<MediaEffectsTray {...baseProps({ backgroundMode: 'none' })} />);
    expect(screen.getByTestId('effects-bg-none')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('effects-bg-blur')).toHaveAttribute('aria-pressed', 'false');
    rerender(<MediaEffectsTray {...baseProps({ backgroundMode: 'blur' })} />);
    expect(screen.getByTestId('effects-bg-none')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('effects-bg-blur')).toHaveAttribute('aria-pressed', 'true');
  });

  it('marks only the image chip whose url matches activeBackgroundUrl', () => {
    render(
      <MediaEffectsTray
        {...baseProps({
          backgroundMode: 'image',
          activeBackgroundUrl: BACKGROUNDS[0].url,
        })}
      />,
    );
    expect(screen.getByTestId('effects-bg-beach')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('effects-bg-forest')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('effects-bg-none')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('effects-bg-blur')).toHaveAttribute('aria-pressed', 'false');
  });

  // ── Face FX section — null = off ───────────────────────────────────────

  it('renders a None chip then one chip per sprite', () => {
    render(<MediaEffectsTray {...baseProps()} />);
    expect(screen.getByTestId('effects-face-none')).toBeInTheDocument();
    expect(screen.getByTestId('effects-face-glasses')).toBeInTheDocument();
    expect(screen.getByTestId('effects-face-crown')).toBeInTheDocument();
  });

  it('fires onSelectFaceSprite with the sprite id, and null from None', () => {
    const onSelectFaceSprite = vi.fn();
    render(
      <MediaEffectsTray
        {...baseProps({ onSelectFaceSprite, activeFaceSpriteId: 'glasses' })}
      />,
    );
    fireEvent.click(screen.getByTestId('effects-face-crown'));
    expect(onSelectFaceSprite).toHaveBeenCalledWith('crown');
    fireEvent.click(screen.getByTestId('effects-face-none'));
    expect(onSelectFaceSprite).toHaveBeenCalledWith(null);
  });

  it('marks the None chip active when activeFaceSpriteId is null', () => {
    render(<MediaEffectsTray {...baseProps({ activeFaceSpriteId: null })} />);
    expect(screen.getByTestId('effects-face-none')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('effects-face-glasses')).toHaveAttribute('aria-pressed', 'false');
  });

  it('marks the active sprite (not None) when a sprite is on', () => {
    render(<MediaEffectsTray {...baseProps({ activeFaceSpriteId: 'crown' })} />);
    expect(screen.getByTestId('effects-face-none')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('effects-face-crown')).toHaveAttribute('aria-pressed', 'true');
  });

  // ── disabled ───────────────────────────────────────────────────────────

  it('disabled blocks every chip and swallows clicks', () => {
    const onSelectFilter = vi.fn();
    const onSelectBackground = vi.fn();
    const onSelectFaceSprite = vi.fn();
    render(
      <MediaEffectsTray
        {...baseProps({
          disabled: true,
          onSelectFilter,
          onSelectBackground,
          onSelectFaceSprite,
        })}
      />,
    );
    expect(screen.getByTestId('effects-filter-warm')).toBeDisabled();
    expect(screen.getByTestId('effects-bg-blur')).toBeDisabled();
    expect(screen.getByTestId('effects-face-crown')).toBeDisabled();
    fireEvent.click(screen.getByTestId('effects-filter-warm'));
    fireEvent.click(screen.getByTestId('effects-bg-blur'));
    fireEvent.click(screen.getByTestId('effects-face-crown'));
    expect(onSelectFilter).not.toHaveBeenCalled();
    expect(onSelectBackground).not.toHaveBeenCalled();
    expect(onSelectFaceSprite).not.toHaveBeenCalled();
  });

  it('forwards className and data-testid to the root', () => {
    render(
      <MediaEffectsTray
        {...baseProps()}
        className="w-96"
        data-testid="effects-tray"
      />,
    );
    const root = screen.getByTestId('effects-tray');
    expect(root.className).toContain('w-96');
  });
});
