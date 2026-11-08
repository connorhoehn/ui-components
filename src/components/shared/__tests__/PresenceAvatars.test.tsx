import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PresenceAvatars } from '../PresenceAvatars';
import type { PresenceUser } from '../PresenceAvatars';

const makeUsers = (n: number): PresenceUser[] =>
  Array.from({ length: n }, (_, i) => ({ id: `u${i}`, name: `User ${i + 1}` }));

describe('PresenceAvatars', () => {
  it('renders all users when under maxVisible', () => {
    render(<PresenceAvatars users={makeUsers(3)} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders empty list with no users', () => {
    render(<PresenceAvatars users={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('shows overflow chip when users exceed maxVisible', () => {
    render(<PresenceAvatars users={makeUsers(8)} maxVisible={5} />);
    expect(screen.getByLabelText('3 more users')).toBeInTheDocument();
  });

  it.each([16, 20, 24])('keeps initials and overflow readable in a %ipx avatar', size => {
    render(<PresenceAvatars users={makeUsers(8)} maxVisible={5} size={size} />);
    const overflow = screen.getByLabelText('3 more users');
    expect(parseFloat(overflow.style.fontSize)).toBeGreaterThanOrEqual(9);
    expect(overflow.style.width).toBe(`${size}px`);
    for (const text of document.querySelectorAll<HTMLElement>('[data-ui-text="avatar"]')) {
      expect(parseFloat(text.style.fontSize)).toBeGreaterThanOrEqual(9);
    }
  });

  it('does not show overflow chip when users equal maxVisible', () => {
    render(<PresenceAvatars users={makeUsers(5)} maxVisible={5} />);
    expect(screen.queryByLabelText(/more users/)).not.toBeInTheDocument();
  });

  it('calls onMoreClick when overflow chip is clicked', () => {
    const onMoreClick = vi.fn();
    render(<PresenceAvatars users={makeUsers(8)} maxVisible={5} onMoreClick={onMoreClick} />);
    fireEvent.click(screen.getByLabelText('3 more users'));
    expect(onMoreClick).toHaveBeenCalledTimes(1);
  });

  it('renders online status dot for users with online=true', () => {
    const users: PresenceUser[] = [
      { id: 'u1', name: 'Alice', online: true },
      { id: 'u2', name: 'Bob', online: false },
    ];
    render(<PresenceAvatars users={users} />);
    expect(screen.getByLabelText('Alice online')).toBeInTheDocument();
    expect(screen.getByLabelText('Bob offline')).toBeInTheDocument();
  });

  it('renders avatarUrl image when provided', () => {
    const users: PresenceUser[] = [
      { id: 'u1', name: 'Alice', avatarUrl: 'https://example.com/a.png' },
    ];
    render(<PresenceAvatars users={users} />);
    const img = screen.getByRole('img', { name: 'Alice' });
    expect(img).toHaveAttribute('src', 'https://example.com/a.png');
  });

  it('respects custom maxVisible prop', () => {
    render(<PresenceAvatars users={makeUsers(10)} maxVisible={3} />);
    expect(screen.getByLabelText('7 more users')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  // ── v2 surface (color / idle / mode / onUserClick) ─────────────────────

  describe('custom color', () => {
    it('passes color through to the Avatar background', () => {
      // Avatar applies background inline. We assert via the rendered
      // style on the inner Avatar div — the testid `presence-avatar`
      // sits on the outer wrapper, so the first child is the Avatar.
      const { container } = render(
        <PresenceAvatars users={[{ id: 'u1', name: 'Alice', color: '#ff0080' }]} />,
      );
      const wrapper = container.querySelector('[data-testid="presence-avatar"]');
      expect(wrapper).not.toBeNull();
      const avatarEl = wrapper!.firstElementChild as HTMLElement;
      expect(avatarEl.style.background).toMatch(/#ff0080|rgb\(255,\s*0,\s*128\)/i);
    });

    it('color is ignored when avatarUrl wins', () => {
      // Image override beats color — the consumer's preference.
      const { container } = render(
        <PresenceAvatars users={[{ id: 'u1', name: 'Alice', color: '#ff0080', avatarUrl: 'https://x.test/a.png' }]} />,
      );
      const img = container.querySelector('img');
      expect(img).not.toBeNull();
      expect(img!.getAttribute('src')).toBe('https://x.test/a.png');
    });
  });

  describe('idle state', () => {
    it('flips the status dot to amber when idle=true', () => {
      render(<PresenceAvatars users={[{ id: 'u1', name: 'Alice', idle: true }]} />);
      // The status-dot label reflects the away state.
      expect(screen.getByLabelText('Alice away')).toBeInTheDocument();
      // No green "online" / gray "offline" labels.
      expect(screen.queryByLabelText('Alice online')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Alice offline')).not.toBeInTheDocument();
    });

    it('idle takes precedence over online (online+idle = away)', () => {
      render(<PresenceAvatars users={[{ id: 'u1', name: 'Alice', online: true, idle: true }]} />);
      expect(screen.getByLabelText('Alice away')).toBeInTheDocument();
      expect(screen.queryByLabelText('Alice online')).not.toBeInTheDocument();
    });

    it('dims the avatar color via hex+alpha when both color and idle are set', () => {
      const { container } = render(
        <PresenceAvatars users={[{ id: 'u1', name: 'Alice', color: '#ff0080', idle: true }]} />,
      );
      const avatarEl = container.querySelector('[data-testid="presence-avatar"] > :first-child') as HTMLElement;
      // #ff0080 → #ff008099 (60% alpha) when idle is true. jsdom
      // normalises the inline-style hex+alpha into rgba(), so accept
      // either textual form.
      const bg = avatarEl.style.background.toLowerCase();
      const acceptsHex = bg.includes('#ff008099');
      const acceptsRgba = bg.replace(/\s+/g, '') === 'rgba(255,0,128,0.6)';
      expect(acceptsHex || acceptsRgba).toBe(true);
    });

    it('drops opacity when idle is set without a color (Avatar uses name-derived bg)', () => {
      const { container } = render(
        <PresenceAvatars users={[{ id: 'u1', name: 'Alice', idle: true /* no color */ }]} />,
      );
      const avatarEl = container.querySelector('[data-testid="presence-avatar"] > :first-child') as HTMLElement;
      // Opacity fallback path — wrapper-level opacity rather than alpha-blended color.
      expect(avatarEl.style.opacity).toBe('0.6');
    });

    it('sets data-presence-idle="true" for e2e selectors', () => {
      render(<PresenceAvatars users={[{ id: 'u1', name: 'Alice', idle: true }]} />);
      const item = screen.getByTestId('presence-avatar');
      expect(item.getAttribute('data-presence-idle')).toBe('true');
    });

    it('omits data-presence-idle when idle is absent (no spurious attribute)', () => {
      render(<PresenceAvatars users={[{ id: 'u1', name: 'Alice' }]} />);
      const item = screen.getByTestId('presence-avatar');
      expect(item.getAttribute('data-presence-idle')).toBe(null);
    });
  });

  describe('mode badge', () => {
    it('renders the pencil badge for mode="editor"', () => {
      render(<PresenceAvatars users={[{ id: 'u1', name: 'Alice', mode: 'editor' }]} />);
      const badge = screen.getByTestId('presence-mode-badge');
      expect(badge).toBeInTheDocument();
      expect(badge.textContent).toContain('✏');
      expect(badge.getAttribute('aria-label')).toBe('Editing');
    });

    it('renders the check badge for mode="reviewer"', () => {
      render(<PresenceAvatars users={[{ id: 'u1', name: 'Alice', mode: 'reviewer' }]} />);
      const badge = screen.getByTestId('presence-mode-badge');
      expect(badge.textContent).toContain('✔');
      expect(badge.getAttribute('aria-label')).toBe('Reviewing');
    });

    it('renders the eye badge for mode="reader"', () => {
      render(<PresenceAvatars users={[{ id: 'u1', name: 'Alice', mode: 'reader' }]} />);
      const badge = screen.getByTestId('presence-mode-badge');
      expect(badge.textContent).toContain('👁');
      expect(badge.getAttribute('aria-label')).toBe('Viewing');
    });

    it('does not render the badge when mode is omitted', () => {
      render(<PresenceAvatars users={[{ id: 'u1', name: 'Alice' }]} />);
      expect(screen.queryByTestId('presence-mode-badge')).not.toBeInTheDocument();
    });

    it('sets data-presence-mode for e2e selectors', () => {
      render(<PresenceAvatars users={[{ id: 'u1', name: 'Alice', mode: 'reviewer' }]} />);
      const item = screen.getByTestId('presence-avatar');
      expect(item.getAttribute('data-presence-mode')).toBe('reviewer');
    });
  });

  describe('onUserClick', () => {
    it('renders avatars as buttons when onUserClick is provided', () => {
      const onUserClick = vi.fn();
      render(<PresenceAvatars users={[{ id: 'u1', name: 'Alice' }]} onUserClick={onUserClick} />);
      const item = screen.getByTestId('presence-avatar');
      expect(item.tagName).toBe('BUTTON');
      expect(item.getAttribute('type')).toBe('button');
    });

    it('renders avatars as divs when onUserClick is absent (back-compat)', () => {
      render(<PresenceAvatars users={[{ id: 'u1', name: 'Alice' }]} />);
      const item = screen.getByTestId('presence-avatar');
      expect(item.tagName).toBe('DIV');
    });

    it('fires onUserClick with the user id', () => {
      const onUserClick = vi.fn();
      render(<PresenceAvatars users={[{ id: 'alice-uid', name: 'Alice' }]} onUserClick={onUserClick} />);
      fireEvent.click(screen.getByTestId('presence-avatar'));
      expect(onUserClick).toHaveBeenCalledTimes(1);
      expect(onUserClick).toHaveBeenCalledWith('alice-uid');
    });

    it('stops propagation so parent click handlers do not also fire', () => {
      const parentClick = vi.fn();
      const onUserClick = vi.fn();
      render(
        <div onClick={parentClick}>
          <PresenceAvatars users={[{ id: 'u1', name: 'Alice' }]} onUserClick={onUserClick} />
        </div>,
      );
      fireEvent.click(screen.getByTestId('presence-avatar'));
      expect(onUserClick).toHaveBeenCalled();
      expect(parentClick).not.toHaveBeenCalled();
    });
  });

  it('title text reflects mode label when set, falling back to bare name', () => {
    render(
      <PresenceAvatars
        users={[
          { id: 'u1', name: 'Alice', mode: 'editor' },
          { id: 'u2', name: 'Bob' },
        ]}
      />,
    );
    const items = screen.getAllByTestId('presence-avatar');
    expect(items[0].getAttribute('title')).toBe('Alice — Editing');
    expect(items[1].getAttribute('title')).toBe('Bob');
  });

  it('title text says "Away" for idle (overriding mode label)', () => {
    render(
      <PresenceAvatars users={[{ id: 'u1', name: 'Alice', mode: 'editor', idle: true }]} />,
    );
    expect(screen.getByTestId('presence-avatar').getAttribute('title')).toBe('Alice — Away');
  });
});

describe('PresenceAvatars — hover card placement', () => {
  const rect = (left: number, top: number, width: number, height: number) =>
    ({ left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON: () => ({}) }) as DOMRect;

  it('shifts the card right to stay inside a clipping pane at its left edge', () => {
    const proto = HTMLElement.prototype;
    const original = proto.getBoundingClientRect;
    proto.getBoundingClientRect = function (this: HTMLElement) {
      if (this.dataset.testid === 'presence-card') return rect(-40, 40, 160, 60); // centred under an avatar at x≈40
      if (this.dataset.testid === 'clip-pane') return rect(10, 0, 600, 400);
      return rect(20, 10, 22, 22);
    };
    const realStyle = window.getComputedStyle.bind(window);
    const spy = vi.spyOn(window, 'getComputedStyle').mockImplementation((el: Element) => {
      const style = realStyle(el);
      if ((el as HTMLElement).dataset?.testid !== 'clip-pane') return style;
      return { ...style, overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden' } as CSSStyleDeclaration;
    });
    try {
      render(
        <div data-testid="clip-pane">
          <PresenceAvatars users={makeUsers(1)} onFollowUser={() => {}} />
        </div>,
      );
      fireEvent.mouseEnter(document.querySelector('span.relative.inline-flex')!);
      const card = screen.getByTestId('presence-card');
      // pane left 10 + edge 8 − card left (−40) = 58
      expect(card.style.getPropertyValue('--presence-card-shift')).toBe('58px');
      expect(card).toHaveAttribute('data-placement', 'bottom');
    } finally {
      spy.mockRestore();
      proto.getBoundingClientRect = original;
    }
  });
});

describe('PresenceAvatars detail tooltip', () => {
  it('puts a status message in the avatar tooltip, after the name and state', () => {
    render(<PresenceAvatars users={[
      { id: 'a', name: 'Ada', detail: 'back at 3' },
      { id: 'b', name: 'Bo', idle: true, detail: 'lunch' },
    ]} />);
    const [ada, bo] = screen.getAllByTestId('presence-avatar');
    expect(ada).toHaveAttribute('title', 'Ada: back at 3');
    expect(ada).toHaveAttribute('data-presence-detail', 'back at 3');
    expect(bo).toHaveAttribute('title', 'Bo — Away: lunch');
  });

  it('leaves the tooltip unchanged without detail', () => {
    render(<PresenceAvatars users={[{ id: 'a', name: 'Ada' }, { id: 'b', name: 'Bo', idle: true }]} />);
    const [ada, bo] = screen.getAllByTestId('presence-avatar');
    expect(ada).toHaveAttribute('title', 'Ada');
    expect(ada).not.toHaveAttribute('data-presence-detail');
    expect(bo).toHaveAttribute('title', 'Bo — Away');
  });
});
