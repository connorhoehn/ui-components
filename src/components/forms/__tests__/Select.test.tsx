// Select — the library's custom listbox (2.445.0). Behaviour, keyboard and
// a11y contracts; the call-site API (event-shaped onChange, FormField wiring)
// is pinned because 70+ components and the portal depend on it unchanged.
import { useState } from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Select, type SelectOption } from '../Select';
import FormField from '../../shared/FormField';
import { readSelectOptions, selectValue } from '../../../test-utils/selectListbox';

afterEach(cleanup);

const OPTS: SelectOption[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Bravo', description: 'Second option' },
  { value: 'c', label: 'Charlie', disabled: true },
  { value: 'd', label: 'Delta' },
];

function Controlled({ onChange = () => {}, initial = 'a', ...rest }: { onChange?: (v: string) => void; initial?: string } & Partial<React.ComponentProps<typeof Select>>) {
  const [v, setV] = useState(initial);
  return <Select aria-label="Letter" options={OPTS} value={v} onChange={(e) => { setV(e.target.value); onChange(e.target.value); }} data-testid="sel" {...rest} />;
}

const listbox = () => screen.getByRole('listbox');
const trigger = () => screen.getByRole('combobox', { name: 'Letter' });

describe('Select — a custom listbox, never the platform menu', () => {
  it('renders a combobox trigger with no <select> anywhere and the chosen label shown', () => {
    const { container } = render(<Controlled />);
    expect(container.querySelector('select')).toBeNull();
    expect(trigger()).toHaveAttribute('data-ui-control', 'select');
    expect(trigger()).toHaveAttribute('aria-haspopup', 'listbox');
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    expect(trigger()).toHaveTextContent('Alpha');
    expect(selectValue(trigger())).toBe('a');
  });

  it('click opens a styled listbox in a portal with options, descriptions and the selected mark', () => {
    render(<Controlled />);
    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute('aria-expanded', 'true');
    const list = listbox();
    expect(list).toHaveAttribute('data-ui-listbox', 'select');
    expect(trigger().getAttribute('aria-controls')).toBe(list.id);
    const options = within(list).getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[2]).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByText('Second option').className).toContain('text-xs');
    expect(list.innerHTML).not.toMatch(/text-\[(9|10|11|13|15|16|17)px\]/);
  });

  it('mouse choice fires an event-shaped onChange and closes', () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    fireEvent.click(trigger());
    fireEvent.mouseDown(within(listbox()).getByRole('option', { name: /Delta/ }));
    expect(onChange).toHaveBeenCalledWith('d');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(trigger()).toHaveTextContent('Delta');
  });

  it('a disabled option cannot be chosen', () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    fireEvent.click(trigger());
    fireEvent.mouseDown(within(listbox()).getByRole('option', { name: /Charlie/ }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('keyboard: arrows skip disabled options, Home/End jump, Enter chooses, focus stays on the trigger', () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    trigger().focus();
    fireEvent.keyDown(trigger(), { key: 'ArrowDown' });
    expect(trigger()).toHaveAttribute('aria-activedescendant', within(listbox()).getAllByRole('option')[0].id);
    fireEvent.keyDown(trigger(), { key: 'ArrowDown' });
    fireEvent.keyDown(trigger(), { key: 'ArrowDown' });
    // Charlie (disabled) is skipped.
    expect(trigger().getAttribute('aria-activedescendant')).toBe(within(listbox()).getAllByRole('option')[3].id);
    fireEvent.keyDown(trigger(), { key: 'Home' });
    expect(trigger().getAttribute('aria-activedescendant')).toBe(within(listbox()).getAllByRole('option')[0].id);
    fireEvent.keyDown(trigger(), { key: 'End' });
    fireEvent.keyDown(trigger(), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('d');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(document.activeElement).toBe(trigger());
  });

  it('keyboard: Escape closes without changing; type-ahead jumps to a matching label', () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    fireEvent.keyDown(trigger(), { key: 'Enter' });
    fireEvent.keyDown(trigger(), { key: 'd' });
    expect(trigger().getAttribute('aria-activedescendant')).toBe(within(listbox()).getAllByRole('option')[3].id);
    fireEvent.keyDown(trigger(), { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
    // Closed type-ahead opens on the match.
    fireEvent.keyDown(trigger(), { key: 'b' });
    expect(trigger().getAttribute('aria-activedescendant')).toBe(within(listbox()).getAllByRole('option')[1].id);
  });

  it('Escape inside an overlay closes only the list', () => {
    const outer = vi.fn();
    window.addEventListener('keydown', outer);
    render(<Controlled />);
    fireEvent.click(trigger());
    fireEvent.keyDown(trigger(), { key: 'Escape' });
    expect(outer).not.toHaveBeenCalled();
    window.removeEventListener('keydown', outer);
  });

  it('an outside mousedown closes the list', () => {
    render(<><Controlled /><button type="button">elsewhere</button></>);
    fireEvent.click(trigger());
    fireEvent.mouseDown(screen.getByText('elsewhere'));
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('the placeholder shows in the field and is not an option', () => {
    render(<Select aria-label="Letter" options={OPTS} value="" placeholder="Choose a letter" onChange={() => {}} />);
    expect(trigger()).toHaveTextContent('Choose a letter');
    expect(readSelectOptions(trigger()).map((o) => o.value)).toEqual(['a', 'b', 'c', 'd']);
  });

  it('groups render as labelled headings after the flat options', () => {
    render(<Select aria-label="Letter" options={[{ value: 'x', label: 'Loose' }]} groups={[{ label: 'Greek', options: [{ value: 'al', label: 'Alpha' }] }]} value="x" onChange={() => {}} />);
    const read = readSelectOptions(trigger());
    expect(read.map((o) => o.value)).toEqual(['x', 'al']);
    expect(read[1].group).toBe('Greek');
  });

  it('takes FormField wiring: the label names the trigger, describedby and invalid reach it', () => {
    render(
      <FormField label="Workspace" hint="Pick one" error="Required">
        {(w) => <Select {...w} options={OPTS} value="" onChange={() => {}} />}
      </FormField>,
    );
    const t = screen.getByRole('combobox', { name: 'Workspace' });
    expect(t).toHaveAttribute('aria-invalid', 'true');
    expect(t.getAttribute('aria-describedby')).toBeTruthy();
    expect(t.className).toContain('border-danger');
  });

  it('a change event on the trigger commits (fireEvent.change compatibility)', () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    fireEvent.change(trigger(), { target: { value: 'b' } });
    expect(onChange).toHaveBeenCalledWith('b');
    expect(trigger()).toHaveTextContent('Bravo');
  });

  it('uncontrolled with defaultValue, and `name` writes a hidden input for form submission', () => {
    const { container } = render(<Select aria-label="Letter" name="letter" options={OPTS} defaultValue="b" />);
    expect(trigger()).toHaveTextContent('Bravo');
    expect(container.querySelector('input[type="hidden"][name="letter"]')).toHaveValue('b');
    fireEvent.click(trigger());
    fireEvent.mouseDown(within(listbox()).getByRole('option', { name: /Delta/ }));
    expect(container.querySelector('input[type="hidden"][name="letter"]')).toHaveValue('d');
  });

  it('disabled: no list opens', () => {
    render(<Controlled disabled />);
    expect(trigger()).toBeDisabled();
    fireEvent.click(trigger());
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('the panel stays inside the viewport: it flips above a trigger near the bottom', () => {
    render(<Controlled />);
    const t = trigger();
    t.getBoundingClientRect = () => ({ top: 740, bottom: 768, left: 900, right: 1100, width: 200, height: 28, x: 900, y: 740, toJSON: () => ({}) }) as DOMRect;
    act(() => { fireEvent.click(t); });
    const list = listbox();
    const top = parseFloat(list.style.top);
    expect(top).toBeLessThan(740);
    expect(top).toBeGreaterThanOrEqual(0);
    expect(parseFloat(list.style.left) + parseFloat(list.style.width)).toBeLessThanOrEqual(window.innerWidth);
  });
});

describe('Select variants', () => {
  it('pill paints the capsule in the requested tone; neutral by default', () => {
    render(<><Select aria-label="P1" variant="pill" tone="success" options={OPTS} value="a" onChange={() => {}} /><Select aria-label="P2" variant="pill" options={OPTS} value="a" onChange={() => {}} /></>);
    expect(screen.getByRole('combobox', { name: 'P1' }).className).toMatch(/success/);
    expect(screen.getByRole('combobox', { name: 'P2' }).className).toMatch(/neutral/);
    expect(screen.getByRole('combobox', { name: 'P1' }).className).toContain('rounded-full');
  });

  it('sm is the 12px step and md the 14px step', () => {
    render(<><Select aria-label="S" size="sm" options={OPTS} value="a" onChange={() => {}} /><Select aria-label="M" size="md" options={OPTS} value="a" onChange={() => {}} /></>);
    expect(screen.getByRole('combobox', { name: 'S' }).className).toContain('text-xs');
    expect(screen.getByRole('combobox', { name: 'M' }).className).toContain('text-sm');
  });

  it('the chevron is decorative', () => {
    render(<Controlled />);
    expect(trigger().querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('data-testid lands on the trigger; the open list is <testid>-listbox', () => {
    render(<Controlled />);
    expect(screen.getByTestId('sel')).toBe(trigger());
    fireEvent.click(trigger());
    expect(screen.getByTestId('sel-listbox')).toBe(listbox());
  });
});

describe('Select renderValue', () => {
  it('draws custom closed-field content while the list still draws the options', () => {
    render(<Select aria-label="Letter" options={OPTS} value="b" onChange={() => {}} renderValue={(o) => <span>Pick: {o?.label}</span>} />);
    expect(trigger()).toHaveTextContent('Pick: Bravo');
    expect(readSelectOptions(trigger()).map((o) => o.label)).toEqual(['Alpha', 'Bravo', 'Charlie', 'Delta']);
  });
});

describe('Select escape hatches', () => {
  it('searchable renders the library Combobox over the same options', () => {
    const onChange = vi.fn();
    render(<Select aria-label="Letter" searchable options={OPTS} value="" onChange={(e) => onChange(e.target.value)} />);
    const input = screen.getByRole('combobox', { name: 'Letter' });
    expect(input.tagName).toBe('INPUT');
    fireEvent.change(input, { target: { value: 'del' } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('d');
  });

  it('native is opt-in, carries its reason and the audit marker', () => {
    const { container } = render(<Select aria-label="Letter" native={{ reason: 'Mobile OS picker for a long list' }} options={OPTS} value="a" onChange={() => {}} />);
    const el = container.querySelector('select')!;
    expect(el).toHaveAttribute('data-ui-native-select');
    expect(el).toHaveAttribute('data-ui-native-reason', 'Mobile OS picker for a long list');
  });
});
