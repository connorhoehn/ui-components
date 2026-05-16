import { render, screen, fireEvent } from '@testing-library/react';
import UserPicker from '../UserPicker';

vi.mock('../../../contexts/PresenceContext', () => ({
  usePresenceContext: () => ({
    presenceUsers: [
      { clientId: 'alice-id', metadata: { displayName: 'Alice' } },
      { clientId: 'bob-id', metadata: { displayName: 'Bob' } },
    ],
  }),
}));

vi.mock('../../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({ idToken: null }),
}));

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
