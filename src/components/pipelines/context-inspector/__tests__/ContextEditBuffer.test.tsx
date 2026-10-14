import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContextEditBuffer } from '../ContextEditBuffer';
import { chooseOptionByLabel, selectLabels, selectValue } from '../../../../test-utils/selectListbox';

afterEach(cleanup);

function setup(value: boolean) {
  const props = {
    inputContext: { approved: value },
    buffer: {},
    parseErrors: {},
    newKeyDraft: { key: '', value: '' },
    setNewKeyDraft: vi.fn(),
    onCommitNewKey: vi.fn(),
    onBeginEditKey: vi.fn(),
    onSetValue: vi.fn(),
    onRemoveKey: vi.fn(),
    onParseError: vi.fn(),
  };
  render(<ContextEditBuffer {...props} />);
  return props;
}

describe('ContextEditBuffer boolean value', () => {
  it('is the library listbox, not a platform <select>, and sets a real boolean', () => {
    const props = setup(true);
    const trigger = screen.getByTestId('context-edit-input-approved');
    expect(trigger).toHaveAttribute('data-ui-control', 'select');
    expect(document.querySelector('select')).toBeNull();
    expect(trigger).toHaveAccessibleName('approved value');
    expect(selectValue(trigger)).toBe('true');
    expect(selectLabels(trigger)).toEqual(['true', 'false']);
    chooseOptionByLabel(trigger, 'false');
    expect(props.onSetValue).toHaveBeenCalledWith('approved', false);
  });

  it('begins the edit when the field takes focus', () => {
    const props = setup(false);
    fireEvent.focus(screen.getByTestId('context-edit-input-approved'));
    expect(props.onBeginEditKey).toHaveBeenCalledWith('approved', false);
  });
});
