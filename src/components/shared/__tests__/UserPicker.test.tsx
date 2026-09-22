import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserPicker from '../UserPicker';
import { PresenceProvider } from '../../../contexts/PresenceContext';
import { IdentityProvider } from '../../../contexts/IdentityContext';

vi.mock('../../../contexts/PresenceContext', async () => {
  const actual = await vi.importActual<typeof import('../../../contexts/PresenceContext')>(
    '../../../contexts/PresenceContext',
  );
  return {
    ...actual,
    useOptionalPresenceContext: () => ({
      presenceUsers: [
        { clientId: 'alice-id', metadata: { displayName: 'Alice' } },
        { clientId: 'bob-id', metadata: { displayName: 'Bob' } },
      ],
      currentClientId: null,
      setTyping: () => {},
    }),
  };
});

vi.mock('../../../contexts/IdentityContext', async () => {
  const actual = await vi.importActual<typeof import('../../../contexts/IdentityContext')>(
    '../../../contexts/IdentityContext',
  );
  return {
    ...actual,
    useOptionalIdentityContext: () => ({
      idToken: null,
      userId: 'ctx-user',
      displayName: 'Ctx User',
      userEmail: null,
      onSignOut: () => {},
    }),
  };
});

function setup(props: Partial<Parameters<typeof UserPicker>[0]> = {}) {
  const onChange = vi.fn();
  render(
    <UserPicker value={props.value ?? []} onChange={onChange} {...props} />,
  );
  return { onChange };
}

describe('UserPicker', () => {
  it('renders the text input', () => {
    setup();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders chips for existing selected values', () => {
    setup({ value: ['alice-id'] });
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('shows presence candidates in dropdown when focused', () => {
    setup();
    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('calls onChange with selected user when candidate is clicked', () => {
    const { onChange } = setup();
    fireEvent.focus(screen.getByRole('textbox'));
    fireEvent.click(screen.getByText('Alice'));
    expect(onChange).toHaveBeenCalledWith(['alice-id']);
  });

  it('removes a selected user when × chip button is clicked', () => {
    const { onChange } = setup({ value: ['alice-id'] });
    fireEvent.click(screen.getByLabelText('Remove Alice'));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('accepts free-text entry on Enter when no candidate matches', () => {
    const { onChange } = setup();
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'custom-user-id' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['custom-user-id']);
  });

  it('filters candidates by typed query', () => {
    setup();
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'ali' } });
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('removes last chip on Backspace with empty input', () => {
    const { onChange } = setup({ value: ['alice-id', 'bob-id'] });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Backspace' });
    expect(onChange).toHaveBeenCalledWith(['alice-id']);
  });

  it('disables input and hides candidates when maxSelect is reached', () => {
    setup({ value: ['alice-id'], maxSelect: 1 });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('does not add duplicate user', () => {
    const { onChange } = setup({ value: ['alice-id'] });
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'alice-id' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('UserPicker identity resolution', () => {
  it('dedupes two presence entries sharing the same metadata.userId into one candidate', async () => {
    vi.resetModules();
    vi.doMock('../../../contexts/PresenceContext', () => ({
      useOptionalPresenceContext: () => ({
        presenceUsers: [
          { clientId: 'tab-1-uuid', metadata: { userId: 'alice-sub', displayName: 'Alice' } },
          { clientId: 'tab-2-uuid', metadata: { userId: 'alice-sub', displayName: 'Alice' } },
        ],
      }),
    }));
    vi.doMock('../../../contexts/IdentityContext', () => ({
      useOptionalIdentityContext: () => ({ idToken: null }),
    }));
    const { default: FreshUserPicker } = await import('../UserPicker');
    const onChange = vi.fn();
    render(<FreshUserPicker value={[]} onChange={onChange} />);
    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getAllByText('Alice')).toHaveLength(1);
    fireEvent.click(screen.getByText('Alice'));
    expect(onChange).toHaveBeenCalledWith(['alice-sub']);
  });

  it('falls back to clientId when a presence entry has no metadata.userId', async () => {
    vi.resetModules();
    vi.doMock('../../../contexts/PresenceContext', () => ({
      useOptionalPresenceContext: () => ({
        presenceUsers: [
          { clientId: 'anon-client-id', metadata: { displayName: 'Guest' } },
        ],
      }),
    }));
    vi.doMock('../../../contexts/IdentityContext', () => ({
      useOptionalIdentityContext: () => ({ idToken: null }),
    }));
    const { default: FreshUserPicker } = await import('../UserPicker');
    const onChange = vi.fn();
    render(<FreshUserPicker value={[]} onChange={onChange} />);
    fireEvent.focus(screen.getByRole('textbox'));
    fireEvent.click(screen.getByText('Guest'));
    expect(onChange).toHaveBeenCalledWith(['anon-client-id']);
  });

  it('round-trips the identity id through selection and chip rendering', async () => {
    vi.resetModules();
    vi.doMock('../../../contexts/PresenceContext', () => ({
      useOptionalPresenceContext: () => ({
        presenceUsers: [
          { clientId: 'tab-1-uuid', metadata: { userId: 'alice-sub', displayName: 'Alice' } },
        ],
      }),
    }));
    vi.doMock('../../../contexts/IdentityContext', () => ({
      useOptionalIdentityContext: () => ({ idToken: null }),
    }));
    const { default: FreshUserPicker } = await import('../UserPicker');
    render(<FreshUserPicker value={['alice-sub']} onChange={vi.fn()} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByLabelText('Remove Alice')).toBeInTheDocument();
  });
});
