import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PersonPicker, type PersonPickerPerson } from '../PersonPicker';

const PEOPLE: PersonPickerPerson[] = [
  { id: 'u-priya', name: 'Priya Venkataraman', tag: 'You', detail: 'Access admin' },
  { id: 'u-omar', name: 'Omar Haddad', detail: 'Approver · Security' },
  { id: 'u-rhea', name: 'Rhea Castellanos', detail: 'Requester · Security' },
  { id: 'u-gone', name: 'Former Person', detail: 'No longer in the directory', disabled: true },
];

function Host({ onChange = () => {}, initial = '', loading }: { onChange?: (v: string) => void; initial?: string; loading?: boolean }) {
  const [v, setV] = useState(initial);
  return <PersonPicker people={PEOPLE} value={v} onChange={(x) => { setV(x); onChange(x); }} id="who" aria-describedby="who-hint" aria-required loading={loading} data-testid="picker" />;
}

describe('PersonPicker', () => {
  it('lists every person with an avatar, the tag and the detail line', () => {
    const { container } = render(<Host />);
    fireEvent.click(screen.getByRole('combobox'));
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options[0].textContent).toContain('Priya Venkataraman');
    expect(options[0].textContent).toContain('You');
    expect(options[0].textContent).toContain('Access admin');
    expect(container.querySelectorAll('[role="option"] [data-ui-text="avatar"]')).toHaveLength(4);
  });

  it('filters on name, detail and tag', () => {
    render(<Host />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'omar' } });
    expect(screen.getAllByRole('option')).toHaveLength(1);
    fireEvent.change(input, { target: { value: 'requester' } });
    expect(screen.getAllByRole('option')[0].textContent).toContain('Rhea');
    fireEvent.change(input, { target: { value: 'you' } });
    expect(screen.getAllByRole('option')[0].textContent).toContain('Priya');
  });

  it('commits the person id, then shows their name with their avatar at the field start', () => {
    const onChange = vi.fn();
    const { container } = render(<Host onChange={onChange} />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'rhea' } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('u-rhea');
    expect(input).toHaveValue('Rhea Castellanos');
    expect(container.querySelector('[data-combobox-leading] [data-ui-text="avatar"]')).not.toBeNull();
  });

  it('never commits typed text that names nobody', () => {
    const onChange = vi.fn();
    render(<Host onChange={onChange} />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'u-mallory' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText('Nobody matches')).toBeInTheDocument();
  });

  it('a disabled person is shown but not choosable', () => {
    const onChange = vi.fn();
    render(<Host onChange={onChange} />);
    fireEvent.click(screen.getByRole('combobox'));
    const gone = screen.getAllByRole('option')[3];
    expect(gone).toHaveAttribute('aria-disabled', 'true');
    fireEvent.mouseDown(gone);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('takes FormField wiring and says when it is loading', () => {
    const { container } = render(<Host loading />);
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('id', 'who');
    expect(input).toHaveAttribute('aria-describedby', 'who-hint');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('placeholder', 'Loading people…');
    expect(container.querySelector('[data-ui-control="combobox"]')).not.toBeNull();
  });
});
