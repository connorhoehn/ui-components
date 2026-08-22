// v2.72.0 consolidation contracts:
//  - IdentityFormField delegates presentation to shared/FormField and gains
//    the aria wiring identity forms never had.
//  - EntityTable is a facade over shared/DataTable (single sorting/row path)
//    while keeping identity's Card frame and emoji empty state.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FormField } from '../FormField';
import { EntityTable } from '../EntityTable';

describe('IdentityFormField aria wiring (via shared/FormField)', () => {
  it('links the error message to the input and marks it invalid', () => {
    render(
      <FormField label="Email" name="email" value="" onChange={() => {}} error="Required" />,
    );
    const input = screen.getByLabelText(/Email/);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent('Required');
  });

  it('links helpText the same way when there is no error', () => {
    render(
      <FormField label="Email" name="email" value="" onChange={() => {}} helpText="Work address" />,
    );
    const input = screen.getByLabelText(/Email/);
    expect(input).not.toHaveAttribute('aria-invalid');
    const describedBy = input.getAttribute('aria-describedby');
    expect(document.getElementById(describedBy!)).toHaveTextContent('Work address');
  });

  it('still coerces values per type', () => {
    const onChange = vi.fn();
    render(
      <FormField label="Count" name="count" type="number" value={0} onChange={onChange} />,
    );
    fireEvent.change(screen.getByLabelText(/Count/), { target: { value: '7' } });
    expect(onChange).toHaveBeenCalledWith(7);
  });
});

const ROWS = [
  { id: 'b', name: 'Beta' },
  { id: 'a', name: 'Alpha' },
];
const COLUMNS = [{ key: 'name', header: 'Name', sortable: true }];

describe('EntityTable facade over DataTable', () => {
  it('renders rows through DataTable and sorts on header click', () => {
    render(<EntityTable columns={COLUMNS} data={ROWS} keyField="id" />);
    const before = screen.getAllByRole('row').slice(1).map((r) => r.textContent);
    expect(before).toEqual(['Beta', 'Alpha']);
    fireEvent.click(screen.getByText('Name'));
    const after = screen.getAllByRole('row').slice(1).map((r) => r.textContent);
    expect(after).toEqual(['Alpha', 'Beta']);
  });

  it('keeps identity\'s emoji empty state (not the in-table row)', () => {
    render(
      <EntityTable columns={COLUMNS} data={[]} keyField="id" emptyMessage="No pools." emptyIcon="🏊" />,
    );
    expect(screen.getByText('🏊')).toBeInTheDocument();
    expect(screen.getByText('No pools.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).toBeNull();
  });

  it('row clicks and per-row actions both fire, actions without triggering the row', () => {
    const onRowClick = vi.fn();
    const onAction = vi.fn();
    render(
      <EntityTable
        columns={COLUMNS}
        data={ROWS}
        keyField="id"
        onRowClick={onRowClick}
        actions={(row) => <button onClick={() => onAction(row.id)}>Edit</button>}
      />,
    );
    fireEvent.click(screen.getAllByText('Edit')[0]);
    expect(onAction).toHaveBeenCalledWith('b');
    expect(onRowClick).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText('Beta'));
    expect(onRowClick).toHaveBeenCalled();
  });
});
