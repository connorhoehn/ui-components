import { render, screen, fireEvent } from '@testing-library/react';
import TagEditor from '../TagEditor';

function setup(props: Partial<Parameters<typeof TagEditor>[0]> = {}) {
  const onChange = vi.fn();
  render(
    <TagEditor
      value={props.value ?? []}
      onChange={onChange}
      {...props}
    />,
  );
  return { onChange };
}

describe('TagEditor', () => {
  it('renders empty with no tags', () => {
    setup();
    expect(screen.getByTestId('tag-editor')).toBeInTheDocument();
    expect(screen.queryByTestId(/^tag-chip-/)).not.toBeInTheDocument();
  });

  it('renders existing tags', () => {
    setup({ value: ['react', 'typescript'] });
    expect(screen.getByTestId('tag-chip-react')).toBeInTheDocument();
    expect(screen.getByTestId('tag-chip-typescript')).toBeInTheDocument();
  });

  it('adds a tag when Enter is pressed', () => {
    const { onChange } = setup({ value: [] });
    fireEvent.change(screen.getByTestId('tag-editor-input'), { target: { value: 'newtag' } });
    fireEvent.keyDown(screen.getByTestId('tag-editor-input'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['newtag']);
  });

  it('trims and lowercases the tag by default', () => {
    const { onChange } = setup({ value: [] });
    fireEvent.change(screen.getByTestId('tag-editor-input'), { target: { value: '  UPPER  ' } });
    fireEvent.keyDown(screen.getByTestId('tag-editor-input'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['upper']);
  });

  it('preserves case when lowercase=false', () => {
    const { onChange } = setup({ value: [], lowercase: false });
    fireEvent.change(screen.getByTestId('tag-editor-input'), { target: { value: 'ViewSalary' } });
    fireEvent.keyDown(screen.getByTestId('tag-editor-input'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['ViewSalary']);
  });

  it('does not add a duplicate tag', () => {
    const { onChange } = setup({ value: ['existing'] });
    fireEvent.change(screen.getByTestId('tag-editor-input'), { target: { value: 'existing' } });
    fireEvent.keyDown(screen.getByTestId('tag-editor-input'), { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not add an empty tag', () => {
    const { onChange } = setup({ value: [] });
    fireEvent.keyDown(screen.getByTestId('tag-editor-input'), { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('removes a tag when × button is clicked', () => {
    const { onChange } = setup({ value: ['alpha', 'beta'] });
    fireEvent.click(screen.getByLabelText('Remove tag alpha'));
    expect(onChange).toHaveBeenCalledWith(['beta']);
  });

  it('removes the last tag when Backspace is pressed on empty input', () => {
    const { onChange } = setup({ value: ['one', 'two'] });
    fireEvent.keyDown(screen.getByTestId('tag-editor-input'), { key: 'Backspace' });
    expect(onChange).toHaveBeenCalledWith(['one']);
  });

  it('does not remove anything on Backspace if input has text', () => {
    const { onChange } = setup({ value: ['one'] });
    fireEvent.change(screen.getByTestId('tag-editor-input'), { target: { value: 'x' } });
    fireEvent.keyDown(screen.getByTestId('tag-editor-input'), { key: 'Backspace' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows suggestions popover when focused and matching suggestions exist', () => {
    setup({ value: [], suggestions: ['alpha', 'beta', 'gamma'] });
    fireEvent.focus(screen.getByTestId('tag-editor-input'));
    expect(screen.getByTestId('tag-suggestions')).toBeInTheDocument();
    expect(screen.getByText('+ alpha')).toBeInTheDocument();
  });

  it('filters suggestions by draft text', () => {
    setup({ value: [], suggestions: ['apple', 'banana', 'apricot'] });
    fireEvent.focus(screen.getByTestId('tag-editor-input'));
    fireEvent.change(screen.getByTestId('tag-editor-input'), { target: { value: 'ap' } });
    expect(screen.getByText('+ apple')).toBeInTheDocument();
    expect(screen.getByText('+ apricot')).toBeInTheDocument();
    expect(screen.queryByText('+ banana')).not.toBeInTheDocument();
  });

  it('excludes already-added tags from suggestions', () => {
    setup({ value: ['alpha'], suggestions: ['alpha', 'beta'] });
    fireEvent.focus(screen.getByTestId('tag-editor-input'));
    expect(screen.queryByText('+ alpha')).not.toBeInTheDocument();
    expect(screen.getByText('+ beta')).toBeInTheDocument();
  });

  it('adds a tag when suggestion button is clicked', () => {
    const { onChange } = setup({ value: [], suggestions: ['quick'] });
    fireEvent.focus(screen.getByTestId('tag-editor-input'));
    fireEvent.click(screen.getByText('+ quick'));
    expect(onChange).toHaveBeenCalledWith(['quick']);
  });
});
