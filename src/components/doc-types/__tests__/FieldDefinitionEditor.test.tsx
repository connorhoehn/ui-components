import { render, fireEvent, screen } from '@testing-library/react';
import { FieldDefinitionEditor } from '../FieldDefinitionEditor';
import type { DocumentTypeField } from '../../../types/documentType';

function mkField(over: Partial<DocumentTypeField> = {}): DocumentTypeField {
  return {
    id: over.id ?? 'f1',
    name: over.name ?? 'Title',
    sectionType: over.sectionType ?? 'text',
    required: over.required ?? false,
    defaultCollapsed: over.defaultCollapsed ?? false,
    placeholder: over.placeholder ?? '',
    hiddenInModes: over.hiddenInModes ?? [],
    rendererOverrides: over.rendererOverrides ?? {},
  };
}

function handlers() {
  return {
    onRename: vi.fn(),
    onChangeType: vi.fn(),
    onRemove: vi.fn(),
    onMoveUp: vi.fn(),
    onMoveDown: vi.fn(),
    onToggleRequired: vi.fn(),
    onToggleCollapsed: vi.fn(),
  };
}

describe('FieldDefinitionEditor', () => {
  it('renders the field name input and the reorder/toggle/remove controls', () => {
    const h = handlers();
    render(
      <FieldDefinitionEditor field={mkField()} index={0} total={2} {...h} />,
    );
    expect((screen.getByTestId('field-name-f1') as HTMLInputElement).value).toBe('Title');
    expect(screen.getByTestId('field-up-f1')).toBeInTheDocument();
    expect(screen.getByTestId('field-down-f1')).toBeInTheDocument();
    expect(screen.getByTestId('field-required-f1')).toBeInTheDocument();
    expect(screen.getByTestId('field-collapsed-f1')).toBeInTheDocument();
    expect(screen.getByTestId('field-remove-f1')).toBeInTheDocument();
  });

  it('disables the up arrow on the first row and the down arrow on the last row', () => {
    const h = handlers();
    const { rerender } = render(
      <FieldDefinitionEditor field={mkField()} index={0} total={3} {...h} />,
    );
    expect(screen.getByTestId('field-up-f1')).toBeDisabled();
    expect(screen.getByTestId('field-down-f1')).not.toBeDisabled();

    rerender(<FieldDefinitionEditor field={mkField()} index={2} total={3} {...h} />);
    expect(screen.getByTestId('field-up-f1')).not.toBeDisabled();
    expect(screen.getByTestId('field-down-f1')).toBeDisabled();
  });

  it('fires the matching handlers when controls are interacted with', () => {
    const h = handlers();
    render(
      <FieldDefinitionEditor field={mkField()} index={1} total={3} {...h} />,
    );
    fireEvent.change(screen.getByTestId('field-name-f1'), { target: { value: 'Body' } });
    fireEvent.click(screen.getByTestId('field-up-f1'));
    fireEvent.click(screen.getByTestId('field-down-f1'));
    fireEvent.click(screen.getByTestId('field-required-f1'));
    fireEvent.click(screen.getByTestId('field-collapsed-f1'));
    fireEvent.click(screen.getByTestId('field-remove-f1'));

    expect(h.onRename).toHaveBeenCalledWith('Body');
    expect(h.onMoveUp).toHaveBeenCalledTimes(1);
    expect(h.onMoveDown).toHaveBeenCalledTimes(1);
    expect(h.onToggleRequired).toHaveBeenCalledTimes(1);
    expect(h.onToggleCollapsed).toHaveBeenCalledTimes(1);
    expect(h.onRemove).toHaveBeenCalledTimes(1);
  });

  it('falls back to the default icon when no field type is registered', () => {
    const h = handlers();
    const { container } = render(
      <FieldDefinitionEditor field={mkField({ sectionType: 'not-registered' })} index={0} total={1} {...h} />,
    );
    // Icon span is the only direct child span with text equal to '📄'.
    expect(container.textContent).toContain('📄');
  });
});
