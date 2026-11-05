// Library ownership markers read by the DOM audit (skills/ui-dom-audit):
// `element.unmarked` treats a control/table/section without one of these as
// hand-rolled consumer DOM, and `table.zebra` trusts `data-ui-table-striped`.
// Each form control marks its native element `data-ui-control="<kind>"`
// (matching Select's trigger), Card marks its root `data-ui-card`, Table marks
// its `<table>` `data-ui-table`, and every raw element a component renders
// internally carries `data-ui-part`.
import { render, screen } from '@testing-library/react';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';
import { Checkbox } from '../forms/Checkbox';
import { NumberInput } from '../forms/NumberInput';
import { RadioGroup } from '../forms/RadioGroup';
import { Slider } from '../forms/Slider';
import { ColorInput } from '../forms/ColorInput';
import SearchInput from '../shared/SearchInput';
import Switch from '../shared/Switch';
import { Card } from '../ui/Card';
import { Table, TableBody, TableRow, TableTd } from '../ui/Table';
import { DataTable } from '../shared/DataTable';

const noop = () => {};

describe('library ownership markers', () => {
  it.each([
    ['input', () => <Input aria-label="f" />],
    ['input', () => <Input aria-label="f" prefix="$" />],
    ['textarea', () => <Textarea aria-label="f" value="" onChange={noop} />],
    ['checkbox', () => <Checkbox aria-label="f" checked={false} onChange={noop} />],
    ['checkbox', () => <Checkbox aria-label="f" checked={false} onChange={noop} shape="round" />],
    ['number', () => <NumberInput aria-label="f" value={1} onChange={noop} />],
    ['slider', () => <Slider aria-label="f" value={1} onChange={noop} />],
    ['color', () => <ColorInput aria-label="f" value="#000000" onChange={noop} />],
    ['search', () => <SearchInput aria-label="f" value="" onChange={noop} />],
    ['switch', () => <Switch aria-label="f" checked={false} onChange={noop} />],
  ])('marks the %s control element', (kind, ui) => {
    const { container } = render(ui());
    const marked = container.querySelectorAll(`[data-ui-control="${kind}"]`);
    expect(marked).toHaveLength(1);
    expect(marked[0].matches('input, textarea, button')).toBe(true);
  });

  it('marks every radio of a RadioGroup', () => {
    render(<RadioGroup name="g" value="a" onChange={noop} options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]} />);
    for (const radio of screen.getAllByRole('radio')) expect(radio).toHaveAttribute('data-ui-control', 'radio');
  });

  it('lets NumberInput override the Input marker rather than emit two', () => {
    const { container } = render(<NumberInput aria-label="f" value={1} onChange={noop} />);
    expect(container.querySelector('[data-ui-control="input"]')).toBeNull();
  });

  it('marks the Card root', () => {
    const { container } = render(<Card>Body</Card>);
    expect(container.firstElementChild).toHaveAttribute('data-ui-card');
  });

  it('marks the Table element and its striped body', () => {
    const { container, rerender } = render(<Table><TableBody><TableRow><TableTd>x</TableTd></TableRow></TableBody></Table>);
    expect(container.querySelector('table')).toHaveAttribute('data-ui-table');
    expect(container.querySelector('tbody')).toHaveAttribute('data-ui-table-striped');
    rerender(<Table><TableBody striped={false}><TableRow><TableTd>x</TableTd></TableRow></TableBody></Table>);
    expect(container.querySelector('tbody')).not.toHaveAttribute('data-ui-table-striped');
  });

  it('marks a striped DataTable body (it paints its own stripe) and not an unstriped one', () => {
    const props = { data: [{ id: '1' }], columns: [{ key: 'id', header: 'Id' }], keyField: (r: { id: string }) => r.id };
    const { container, rerender } = render(<DataTable {...props} />);
    expect(container.querySelector('table')).toHaveAttribute('data-ui-table');
    expect(container.querySelector('tbody')).toHaveAttribute('data-ui-table-striped');
    rerender(<DataTable {...props} striped={false} />);
    expect(container.querySelector('tbody')).not.toHaveAttribute('data-ui-table-striped');
  });

  it('marks raw elements rendered inside a component as library parts', () => {
    const { container } = render(<SearchInput aria-label="f" value="query" onChange={noop} />);
    const clear = screen.getByRole('button', { name: 'Clear search' });
    expect(clear).toHaveAttribute('data-ui-part');
    for (const el of container.querySelectorAll('button, input')) expect(el).toHaveAttribute('data-ui-part');
  });
});
