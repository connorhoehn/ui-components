import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Combobox } from '../Combobox';

const OPTS = [{ value: 'react', label: 'React' }, { value: 'rust', label: 'Rust' }, { value: 'go', label: 'Go' }];

function Single({ onChange = () => {}, allowCustom }: { onChange?: (v: string) => void; allowCustom?: boolean }) {
  const [v, setV] = useState('');
  return <Combobox options={OPTS} value={v} onChange={(x) => { setV(x); onChange(x); }} aria-label="skill" allowCustom={allowCustom} />;
}

describe('Combobox', () => {
  it('does not open on focus, opens on typing and filters', () => {
    render(<Single />);
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    expect(screen.queryByRole('listbox')).toBeNull();
    fireEvent.change(input, { target: { value: 'r' } });
    expect(screen.getAllByRole('option')).toHaveLength(2);
  });

  it('arrow keys move the active option and Enter picks it', () => {
    const onChange = vi.fn();
    render(<Single onChange={onChange} />);
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveAttribute('aria-activedescendant', screen.getAllByRole('option')[1].id);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('rust');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(input).toHaveValue('Rust');
  });

  it('Escape closes without clearing the query', () => {
    render(<Single />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'go' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(input).toHaveValue('go');
  });

  it('allowCustom commits free text on Enter', () => {
    const onChange = vi.fn();
    render(<Single onChange={onChange} allowCustom />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'zig' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('zig');
  });

  it('multi-select toggles, shows chips and Backspace removes the last', () => {
    const onChange = vi.fn();
    function Multi() {
      const [v, setV] = useState<string[]>([]);
      return <Combobox multiple options={OPTS} value={v} onChange={(x) => { setV(x); onChange(x); }} aria-label="skills" />;
    }
    render(<Multi />);
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.mouseDown(screen.getAllByRole('option')[0]);
    fireEvent.mouseDown(screen.getAllByRole('option')[2]);
    expect(onChange).toHaveBeenLastCalledWith(['react', 'go']);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(onChange).toHaveBeenLastCalledWith(['react']);
  });

  it('shows the empty message on a miss', () => {
    render(<Single />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'zzz' } });
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });
});
