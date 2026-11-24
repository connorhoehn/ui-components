import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBand } from '../FilterBand';

function setup(extra: Partial<Parameters<typeof FilterBand>[0]> = {}) {
  const onText = vi.fn();
  const onStatus = vi.fn();
  const onFilter = vi.fn();
  const onReset = vi.fn();
  render(
    <FilterBand
      fields={[
        { id: 'q', label: 'Render', value: 'ep', onChange: onText, placeholder: 'Render…' },
        { id: 'status', label: 'Status', value: '', onChange: onStatus, options: [{ value: 'done', label: 'Done' }] },
      ]}
      onFilter={onFilter}
      onReset={onReset}
      summary="19 runs · 4 waiting for you"
      {...extra}
    />,
  );
  return { onText, onStatus, onFilter, onReset };
}

describe('FilterBand', () => {
  it('labels each field and shows the summary in a search landmark', () => {
    setup();
    expect(screen.getByRole('search', { name: 'Filters' })).toBeInTheDocument();
    expect(screen.getByLabelText('Render')).toHaveValue('ep');
    expect(screen.getByLabelText('Status')).toHaveTextContent('Any');
    expect(screen.getByTestId('filter-band-summary')).toHaveTextContent('19 runs · 4 waiting for you');
  });

  it('reports typing, and Enter in a text field applies the filter', () => {
    const { onText, onFilter } = setup();
    const field = screen.getByLabelText('Render');
    fireEvent.change(field, { target: { value: 'ep 17' } });
    expect(onText).toHaveBeenCalledWith('ep 17');
    fireEvent.keyDown(field, { key: 'Enter' });
    expect(onFilter).toHaveBeenCalledTimes(1);
  });

  it('Filter and Reset call their handlers; extra actions follow Reset', () => {
    const { onFilter, onReset } = setup({ actions: <button type="button">Cancel selected</button> });
    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(onFilter).toHaveBeenCalledTimes(1);
    expect(onReset).toHaveBeenCalledTimes(1);
    const reset = screen.getByRole('button', { name: 'Reset' });
    const extra = screen.getByRole('button', { name: 'Cancel selected' });
    expect(reset.compareDocumentPosition(extra) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('a select offers "Any" first and reports the chosen value', () => {
    const { onStatus } = setup();
    fireEvent.click(screen.getByLabelText('Status'));
    const options = screen.getAllByRole('option');
    expect(options.map((o) => o.textContent?.replace('✓', ''))).toEqual(['Any', 'Done']);
    fireEvent.mouseDown(options[1]);
    expect(onStatus).toHaveBeenCalledWith('done');
  });
});
