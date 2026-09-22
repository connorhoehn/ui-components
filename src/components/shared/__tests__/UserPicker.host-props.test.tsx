// Verifies UserPicker is usable by a host that does NOT mount this
// library's <PresenceProvider>/<IdentityProvider> — the `presenceUsers`,
// `idToken`, `searchUsers`, and `baseUrl` props exist for exactly that case.
//
// Deliberately does NOT vi.mock PresenceContext/IdentityContext: these tests
// exercise the REAL `useOptionalPresenceContext`/`useOptionalIdentityContext`
// (which return `null` outside a provider) and the REAL providers, to prove
// the actual precedence logic in UserPicker rather than a mocked stand-in.

import { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserPicker from '../UserPicker';
import { PresenceProvider } from '../../../contexts/PresenceContext';
import { IdentityProvider } from '../../../contexts/IdentityContext';
import type { PresenceUser } from '../../../hooks/usePresence';

function setup(props: Partial<Parameters<typeof UserPicker>[0]> = {}) {
  const onChange = vi.fn();
  render(
    <UserPicker value={props.value ?? []} onChange={onChange} {...props} />,
  );
  return { onChange };
}

describe('UserPicker — props only, no library providers mounted', () => {
  it('renders with no provider in the tree and no crash', () => {
    setup();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows presence candidates supplied via the presenceUsers prop', () => {
    const presenceUsers: PresenceUser[] = [
      { clientId: 'host-alice-client', status: 'online', metadata: { userId: 'host-alice', displayName: 'Host Alice' } },
    ];
    setup({ presenceUsers });
    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByText('Host Alice')).toBeInTheDocument();
  });

  it('searches via the searchUsers prop with no idToken and no provider', async () => {
    const searchUsers = vi.fn().mockResolvedValue([
      { userId: 'remote-1', displayName: 'Remote One' },
    ]);
    setup({ searchUsers });
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'rem' } });

    await waitFor(() => expect(searchUsers).toHaveBeenCalled());
    expect(searchUsers).toHaveBeenCalledWith('rem', expect.any(AbortSignal));
    await waitFor(() => expect(screen.getByText('Remote One')).toBeInTheDocument());
  });

  it('selecting a presence-prop candidate calls onChange with its userId', () => {
    const presenceUsers: PresenceUser[] = [
      { clientId: 'host-bob-client', status: 'online', metadata: { userId: 'host-bob', displayName: 'Host Bob' } },
    ];
    const { onChange } = setup({ presenceUsers });
    fireEvent.focus(screen.getByRole('textbox'));
    fireEvent.click(screen.getByText('Host Bob'));
    expect(onChange).toHaveBeenCalledWith(['host-bob']);
  });
});

describe('UserPicker — props win over a mounted provider', () => {
  const providerPresenceUsers: PresenceUser[] = [
    { clientId: 'ctx-client', status: 'online', metadata: { userId: 'ctx-user', displayName: 'Context User' } },
  ];

  function renderWithProviders(props: Partial<Parameters<typeof UserPicker>[0]> = {}) {
    const onChange = vi.fn();
    render(
      <PresenceProvider value={{ presenceUsers: providerPresenceUsers, currentClientId: null, setTyping: () => {} }}>
        <IdentityProvider value={{ userId: 'ctx-user', displayName: 'Context User', userEmail: null, idToken: 'ctx-token', onSignOut: () => {} }}>
          <UserPicker value={props.value ?? []} onChange={onChange} {...props} />
        </IdentityProvider>
      </PresenceProvider>,
    );
    return { onChange };
  }

  it('presenceUsers prop overrides the mounted PresenceProvider', () => {
    const propPresenceUsers: PresenceUser[] = [
      { clientId: 'prop-client', status: 'online', metadata: { userId: 'prop-user', displayName: 'Prop User' } },
    ];
    renderWithProviders({ presenceUsers: propPresenceUsers });
    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByText('Prop User')).toBeInTheDocument();
    expect(screen.queryByText('Context User')).not.toBeInTheDocument();
  });

  it('searchUsers prop overrides the mounted IdentityProvider token / default fetch', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const searchUsers = vi.fn().mockResolvedValue([{ userId: 'x', displayName: 'X User' }]);
    renderWithProviders({ searchUsers });
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'x' } });

    await waitFor(() => expect(searchUsers).toHaveBeenCalledWith('x', expect.any(AbortSignal)));
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('idToken prop (including explicit null) overrides the mounted IdentityProvider token', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ profiles: [] }),
    } as Response);
    renderWithProviders({ idToken: null });
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'anything' } });

    // Give the 250ms debounce a chance to fire if it were going to.
    await act(async () => new Promise(r => setTimeout(r, 300)));
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});

describe('UserPicker — default path unchanged when no override props are given', () => {
  it('falls back to the mounted PresenceProvider/IdentityProvider exactly as before', async () => {
    const presenceUsers: PresenceUser[] = [
      { clientId: 'default-client', status: 'online', metadata: { userId: 'default-user', displayName: 'Default User' } },
    ];
    const onChange = vi.fn();
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ profiles: [{ userId: 'remote-default', displayName: 'Remote Default' }] }),
    } as Response);

    render(
      <PresenceProvider value={{ presenceUsers, currentClientId: null, setTyping: () => {} }}>
        <IdentityProvider value={{ userId: 'default-user', displayName: 'Default User', userEmail: null, idToken: 'default-token', onSignOut: () => {} }}>
          <UserPicker value={[]} onChange={onChange} />
        </IdentityProvider>
      </PresenceProvider>,
    );

    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByText('Default User')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'remote' } });
    await waitFor(() => expect(fetchSpy).toHaveBeenCalled());
    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/profiles?q=remote');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer default-token');
    await waitFor(() => expect(screen.getByText('Remote Default')).toBeInTheDocument());

    fetchSpy.mockRestore();
  });

  it('renders without throwing, with no candidates, when no provider and no props are given at all', () => {
    expect(() => render(<UserPicker value={[]} onChange={vi.fn()} />)).not.toThrow();
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    // No presence/remote candidates to show — the dropdown never opens.
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});
