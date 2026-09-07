// One human is one colour, however many tabs they have open.
//
// The panel used to hash the avatar colour off `metadata.email ?? clientId`.
// clientId is per-WebSocket-session, so three tabs of one person produced
// three different colours in the same roster (UX audit 2026-08-25).

import { render, screen } from '@testing-library/react';
import { PresencePanel } from '../PresencePanel';
import { presenceColorKey } from '../presenceIdentity';
import { identityToColor } from '../../../utils/identity';
import type { PresenceUser } from '../../../hooks/usePresence';

function makeUser(clientId: string, metadata: Record<string, unknown> = {}): PresenceUser {
  return { clientId, status: 'online', metadata };
}

/** The avatar circles, in render order. */
function avatarColors(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll<HTMLElement>('[style*="background-color"]')).map(
    (el) => el.style.backgroundColor,
  );
}

describe('presenceColorKey', () => {
  it('prefers the stable user id over everything else', () => {
    expect(presenceColorKey('dev-hank', 'Hank Anderson', 'ws-1')).toBe('dev-hank');
  });

  it('falls back to display name, then clientId', () => {
    expect(presenceColorKey(undefined, 'Hank Anderson', 'ws-1')).toBe('Hank Anderson');
    expect(presenceColorKey(undefined, undefined, 'ws-1')).toBe('ws-1');
    expect(presenceColorKey(null, null, null)).toBe('');
  });
});

describe('PresencePanel avatar colour', () => {
  it('gives ONE user across three clientIds ONE colour', () => {
    const users = [
      makeUser('ws-tab-1', { userId: 'dev-hank', displayName: 'Hank Anderson' }),
      makeUser('ws-tab-2', { userId: 'dev-hank', displayName: 'Hank Anderson' }),
      makeUser('ws-tab-3', { userId: 'dev-hank', displayName: 'Hank Anderson' }),
    ];
    const { container } = render(<PresencePanel users={users} currentClientId="ws-tab-1" />);

    const colors = avatarColors(container);
    expect(colors).toHaveLength(3);
    expect(new Set(colors).size).toBe(1);
    expect(colors[0]).toBe(hexToRgb(identityToColor('dev-hank')));
  });

  it('still separates two DIFFERENT users', () => {
    const users = [
      makeUser('ws-1', { userId: 'dev-hank', displayName: 'Hank Anderson' }),
      makeUser('ws-2', { userId: 'dev-carol', displayName: 'Carol Johnson' }),
    ];
    const { container } = render(<PresencePanel users={users} currentClientId="ws-1" />);
    const colors = avatarColors(container);
    expect(new Set(colors).size).toBe(2);
  });

  it('keeps a colour stable across a reconnect that mints a new clientId', () => {
    const { container, rerender } = render(
      <PresencePanel
        users={[makeUser('ws-old', { userId: 'dev-hank', displayName: 'Hank Anderson' })]}
        currentClientId="ws-old"
      />,
    );
    const before = avatarColors(container)[0];

    rerender(
      <PresencePanel
        users={[makeUser('ws-new', { userId: 'dev-hank', displayName: 'Hank Anderson' })]}
        currentClientId="ws-new"
      />,
    );
    expect(avatarColors(container)[0]).toBe(before);
  });

  it('falls back to the display name when the roster carries no userId', () => {
    const users = [
      makeUser('ws-a', { displayName: 'Hank Anderson' }),
      makeUser('ws-b', { displayName: 'Hank Anderson' }),
    ];
    const { container } = render(<PresencePanel users={users} currentClientId="ws-a" />);
    expect(new Set(avatarColors(container)).size).toBe(1);
  });

  it('still uses clientId for a genuinely anonymous session', () => {
    const { container } = render(
      <PresencePanel users={[makeUser('ws-anon')]} currentClientId={null} />,
    );
    expect(avatarColors(container)[0]).toBe(hexToRgb(identityToColor('ws-anon')));
    expect(screen.getByText('ws-anon')).toBeInTheDocument();
  });
});

/** jsdom normalises inline colours to rgb(); the palette is hex. */
function hexToRgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
}
