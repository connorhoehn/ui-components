import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FormField } from '../FormField';
import { EntityTable, type Column } from '../EntityTable';
import { selectLabels } from '../../../../test-utils/selectListbox';

// ---------------------------------------------------------------------------
// FormField
// ---------------------------------------------------------------------------

describe('FormField', () => {
  it('renders a text input with its label', () => {
    render(
      <FormField label="Email" name="email" type="email" value="" onChange={() => {}} />,
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    const input = screen.getByLabelText('Email') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('marks required fields with an asterisk', () => {
    render(
      <FormField label="Name" name="name" value="" required onChange={() => {}} />,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('calls onChange with a string for text inputs', () => {
    const onChange = vi.fn();
    render(<FormField label="Name" name="name" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'alice' } });
    expect(onChange).toHaveBeenCalledWith('alice');
  });

  it('calls onChange with a number for number inputs', () => {
    const onChange = vi.fn();
    render(
      <FormField label="Count" name="count" type="number" value={0} onChange={onChange} />,
    );
    fireEvent.change(screen.getByLabelText('Count'), { target: { value: '42' } });
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it('calls onChange with a boolean for checkbox inputs', () => {
    const onChange = vi.fn();
    render(
      <FormField label="Active" name="active" type="checkbox" value={false} onChange={onChange} />,
    );
    fireEvent.click(screen.getByLabelText('Active'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders the error message and applies the error border class', () => {
    const { container } = render(
      <FormField
        label="Name"
        name="name"
        value=""
        onChange={() => {}}
        error="Required"
      />,
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(container.querySelector('input')).toHaveClass('border-danger');
  });

  it('renders helpText only when no error is set', () => {
    const { rerender } = render(
      <FormField label="Name" name="name" value="" onChange={() => {}} helpText="Your full name" />,
    );
    expect(screen.getByText('Your full name')).toBeInTheDocument();

    rerender(
      <FormField
        label="Name"
        name="name"
        value=""
        onChange={() => {}}
        helpText="Your full name"
        error="Required"
      />,
    );
    expect(screen.queryByText('Your full name')).not.toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('renders a textarea when type=textarea', () => {
    render(
      <FormField label="Bio" name="bio" type="textarea" value="hi" onChange={() => {}} />,
    );
    const ta = screen.getByLabelText('Bio') as HTMLTextAreaElement;
    expect(ta.tagName).toBe('TEXTAREA');
    expect(ta.value).toBe('hi');
  });

  it('renders a select with provided options and a placeholder row', () => {
    render(
      <FormField
        label="Role"
        name="role"
        type="select"
        value=""
        onChange={() => {}}
        placeholder="Pick one"
        options={[
          { value: 'admin', label: 'Admin' },
          { value: 'member', label: 'Member' },
        ]}
      />,
    );
    const role = screen.getByLabelText('Role');
    expect(role).toHaveAttribute('data-ui-control', 'select');
    // The placeholder is a selectable "none" row (identity forms let a user clear the choice).
    expect(role).toHaveTextContent('Pick one');
    expect(selectLabels(role)).toEqual(['Pick one', 'Admin', 'Member']);
  });

  it('respects the disabled prop', () => {
    render(
      <FormField label="Name" name="name" value="x" disabled onChange={() => {}} />,
    );
    expect(screen.getByLabelText('Name')).toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// EntityTable
// ---------------------------------------------------------------------------

interface Row extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
}

const ROWS: Row[] = [
  { id: '1', name: 'Charlie', email: 'c@x.io' },
  { id: '2', name: 'Alice', email: 'a@x.io' },
  { id: '3', name: 'Bob', email: 'b@x.io' },
];

const COLUMNS: Column<Row>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
];

describe('EntityTable', () => {
  it('renders 5 skeleton rows while loading', () => {
    const { container } = render(
      <EntityTable columns={COLUMNS} data={[]} keyField="id" loading />,
    );
    // 5 skeleton rows × 2 column placeholders = 10 animate-pulse divs
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(10);
  });

  it('renders the empty state with the default message when data is empty', () => {
    render(<EntityTable columns={COLUMNS} data={[]} keyField="id" />);
    expect(screen.getByText('No records found.')).toBeInTheDocument();
  });

  it('renders a custom empty message when provided', () => {
    render(
      <EntityTable
        columns={COLUMNS}
        data={[]}
        keyField="id"
        emptyMessage="No users yet"
      />,
    );
    expect(screen.getByText('No users yet')).toBeInTheDocument();
  });

  it('renders column headers and one row per data item', () => {
    render(<EntityTable columns={COLUMNS} data={ROWS} keyField="id" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('fires onRowClick with the row item when a row is clicked', () => {
    const onRowClick = vi.fn();
    render(
      <EntityTable
        columns={COLUMNS}
        data={ROWS}
        keyField="id"
        onRowClick={onRowClick}
      />,
    );
    fireEvent.click(screen.getByText('Charlie'));
    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(ROWS[0]);
  });

  it('renders the actions slot for each row', () => {
    render(
      <EntityTable
        columns={COLUMNS}
        data={ROWS}
        keyField="id"
        actions={(item) => <button>Edit {item.name}</button>}
      />,
    );
    expect(screen.getByText('Edit Charlie')).toBeInTheDocument();
    expect(screen.getByText('Edit Alice')).toBeInTheDocument();
    expect(screen.getByText('Edit Bob')).toBeInTheDocument();
  });

  it('toggles sort direction (asc → desc) when a sortable header is clicked twice', () => {
    const { container } = render(
      <EntityTable columns={COLUMNS} data={ROWS} keyField="id" />,
    );
    const nameHeader = screen.getByText('Name').closest('th') as HTMLElement;

    // First click — sort asc. Data should become Alice, Bob, Charlie.
    fireEvent.click(nameHeader);
    let bodyRows = container.querySelectorAll('tbody tr');
    expect(bodyRows[0].textContent).toContain('Alice');
    expect(bodyRows[2].textContent).toContain('Charlie');
    expect(nameHeader.textContent).toContain('↑');

    // Second click — sort desc. Data should become Charlie, Bob, Alice.
    fireEvent.click(nameHeader);
    bodyRows = container.querySelectorAll('tbody tr');
    expect(bodyRows[0].textContent).toContain('Charlie');
    expect(bodyRows[2].textContent).toContain('Alice');
    expect(nameHeader.textContent).toContain('↓');
  });

  it('uses col.render to compute the cell when provided', () => {
    const customColumns: Column<Row>[] = [
      { key: 'name', header: 'Name' },
      {
        key: 'email',
        header: 'Email',
        render: (item) => <a href={`mailto:${item.email}`}>{item.email.toUpperCase()}</a>,
      },
    ];
    render(<EntityTable columns={customColumns} data={ROWS} keyField="id" />);
    const link = screen.getByText('C@X.IO');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'mailto:c@x.io');
  });
});
