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

describe('Combobox — picker options (2.445.0)', () => {
  const ITEMS = [
    { value: 'sme', label: 'SME in Work', meta: 'Work', description: 'Dispatch agent runs on granted initiatives' },
    { value: 'lead', label: 'Lead assessor', meta: 'Assessment', description: 'Signs off scorecards' },
  ];
  function Picker({ invalid }: { invalid?: boolean }) {
    const [v, setV] = useState('');
    return <Combobox options={ITEMS} value={v} onChange={setV} id="item" aria-describedby="item-hint" aria-invalid={invalid} aria-label="Item" />;
  }

  it('a click on the field opens the full list; the chevron toggles it', () => {
    render(<Picker />);
    const input = screen.getByRole('combobox');
    fireEvent.click(input);
    expect(screen.getAllByRole('option')).toHaveLength(2);
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Close options' }));
    expect(screen.queryByRole('listbox')).toBeNull();
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Show options' }));
    expect(screen.getAllByRole('option')).toHaveLength(2);
  });

  it('draws meta and a 12px description, and filters on description and meta', () => {
    render(<Picker />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'scorecard' } });
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByText('Signs off scorecards').className).toContain('text-xs');
    fireEvent.change(input, { target: { value: 'work' } });
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByText('Work').className).toContain('text-xs');
  });

  it('takes FormField wiring and marks the chosen option', () => {
    const { container } = render(<Picker invalid />);
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('id', 'item');
    expect(input).toHaveAttribute('aria-describedby', 'item-hint');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(container.querySelector('[data-ui-control="combobox"]')).not.toBeNull();
    fireEvent.click(input);
    fireEvent.mouseDown(screen.getAllByRole('option')[1]);
    fireEvent.click(input);
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getAllByRole('option')[1].textContent).toContain('✓');
  });
});

describe('Combobox house control size', () => {
  const field = (c: HTMLElement) => c.querySelector('[data-ui-control="combobox"] > div') as HTMLElement;

  it('uses the --ui-control-* height tokens and Input\'s border, surface and padding', () => {
    const { container } = render(<Combobox options={OPTS} value="" onChange={() => {}} aria-label="skill" size="md" />);
    const cls = field(container).className;
    expect(cls).toContain('h-[var(--ui-control-md,2.25rem)]');
    expect(cls).toContain('px-2.5');
    expect(cls).toContain('text-sm');
    expect(cls).toContain('bg-surface-panel');
    expect(cls).toContain('border-border-emphasis');
    expect(cls).not.toContain('py-0.5');
  });

  it('small takes the sm token, and a multi field grows from it instead of fixing it', () => {
    const sm = render(<Combobox options={OPTS} value="" onChange={() => {}} aria-label="a" size="sm" />);
    expect(field(sm.container).className).toContain('h-[var(--ui-control-sm,1.75rem)]');
    const multi = render(<Combobox multiple options={OPTS} value={['go']} onChange={() => {}} aria-label="b" size="sm" />);
    const cls = field(multi.container).className;
    expect(cls).toContain('min-h-[var(--ui-control-sm,1.75rem)]');
    expect(cls).not.toMatch(/(^| )h-\[/);
  });

  it('defaults to the md house size like Input', () => {
    const { container } = render(<Combobox options={OPTS} value="" onChange={() => {}} aria-label="skill" />);
    expect(field(container).className).toContain('h-[var(--ui-control-md,2.25rem)]');
  });
});
