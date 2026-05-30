import { render, screen, fireEvent, within } from '@testing-library/react';
import { DataTable, type DataTableColumn } from '../DataTable';

interface Row {
  id: string;
  name: string;
  status: string;
  count: number;
}

const rows: Row[] = [
  { id: 'a', name: 'Alpha', status: 'running', count: 3 },
  { id: 'b', name: 'Bravo', status: 'failed', count: 7 },
  { id: 'c', name: 'Charlie', status: 'pending', count: 1 },
  { id: 'd', name: 'Delta', status: 'running', count: 5 },
];

const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status' },
  {
    key: 'count',
    header: 'Count',
    sortable: true,
    compare: (a, b) => a.count - b.count,
    render: (row) => <span data-testid={`count-${row.id}`}>×{row.count}</span>,
    align: 'right',
  },
];

const keyField = (row: Row) => row.id;

describe('DataTable', () => {
  it('renders headers and rows', () => {
    render(<DataTable data={rows} columns={columns} keyField={keyField} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByTestId('count-b')).toHaveTextContent('×7');
  });

  it('sorts ascending then descending on header click', () => {
    render(<DataTable data={rows} columns={columns} keyField={keyField} />);
    const header = screen.getByTestId('datatable-header-name');

    fireEvent.click(header);
    let cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('Alpha');

    fireEvent.click(header);
    cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('Delta');
  });

  it('uses custom compare for numeric sort', () => {
    render(<DataTable data={rows} columns={columns} keyField={keyField} />);
    fireEvent.click(screen.getByTestId('datatable-header-count'));
    const firstRow = screen.getAllByRole('row')[1];
    expect(within(firstRow).getByTestId('count-c')).toBeInTheDocument();
  });

  it('filters rows by search query across all columns', () => {
    render(
      <DataTable data={rows} columns={columns} keyField={keyField} searchable />,
    );
    fireEvent.change(screen.getByTestId('datatable-search'), {
      target: { value: 'failed' },
    });
    expect(screen.getByText('Bravo')).toBeInTheDocument();
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });

  it('paginates when data exceeds pageSize', () => {
    render(
      <DataTable
        data={rows}
        columns={columns}
        keyField={keyField}
        pageSize={2}
      />,
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Bravo')).toBeInTheDocument();
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
    expect(screen.getByTestId('datatable-page-summary')).toHaveTextContent(
      'Page 1 of 2',
    );

    fireEvent.click(screen.getByTestId('datatable-next'));
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });

  it('renders empty message when data is empty', () => {
    render(
      <DataTable
        data={[]}
        columns={columns}
        keyField={keyField}
        emptyMessage="No records yet"
      />,
    );
    expect(screen.getByText('No records yet')).toBeInTheDocument();
  });

  it('renders loading skeleton rows', () => {
    render(
      <DataTable
        data={[]}
        columns={columns}
        keyField={keyField}
        loading
        loadingRows={3}
      />,
    );
    expect(screen.getAllByTestId('datatable-loading-row')).toHaveLength(3);
  });

  it('fires onRowClick when a body row is clicked', () => {
    const onRowClick = vi.fn();
    render(
      <DataTable
        data={rows}
        columns={columns}
        keyField={keyField}
        onRowClick={onRowClick}
      />,
    );
    fireEvent.click(screen.getByText('Charlie'));
    expect(onRowClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'c' }),
    );
  });

  it('renders rowActions and does not bubble click to row', () => {
    const onRowClick = vi.fn();
    const onDelete = vi.fn();
    render(
      <DataTable
        data={rows}
        columns={columns}
        keyField={keyField}
        onRowClick={onRowClick}
        rowActions={(row) => (
          <button onClick={() => onDelete(row.id)}>Delete {row.id}</button>
        )}
      />,
    );
    fireEvent.click(screen.getByText('Delete a'));
    expect(onDelete).toHaveBeenCalledWith('a');
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('resets to first page when the search query changes', () => {
    render(
      <DataTable
        data={rows}
        columns={columns}
        keyField={keyField}
        searchable
        pageSize={2}
      />,
    );
    fireEvent.click(screen.getByTestId('datatable-next'));
    expect(screen.getByTestId('datatable-page-summary')).toHaveTextContent(
      'Page 2 of 2',
    );
    fireEvent.change(screen.getByTestId('datatable-search'), {
      target: { value: 'a' },
    });
    expect(screen.getByTestId('datatable-page-summary')).toHaveTextContent(
      'Page 1 of',
    );
  });
});
