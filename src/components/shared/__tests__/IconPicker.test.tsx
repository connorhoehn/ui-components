import { render, screen, fireEvent } from '@testing-library/react';
import IconPicker, { DEFAULT_PIPELINE_ICONS } from '../IconPicker';

describe('IconPicker', () => {
  it('renders the trigger with the current value and starts closed', () => {
    render(<IconPicker value="🚀" onChange={() => {}} />);
    const trigger = screen.getByTestId('icon-picker-trigger');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveTextContent('🚀');
    expect(screen.queryByTestId('icon-picker-popover')).not.toBeInTheDocument();
  });

  it('opens the popover on trigger click and renders the curated grid', () => {
    render(<IconPicker value="🚀" onChange={() => {}} />);
    fireEvent.click(screen.getByTestId('icon-picker-trigger'));
    const trigger = screen.getByTestId('icon-picker-trigger');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('icon-picker-popover')).toBeInTheDocument();
    // A unique default-icon cell should be in the DOM. (Index 0 '🔀' is
    // intentionally not used here because it appears twice in
    // DEFAULT_PIPELINE_ICONS — at index 0 and again at index 42.)
    expect(screen.getByLabelText('Select 🧠')).toBeInTheDocument();
    // Sanity check: the list we render against actually includes our pick.
    expect(DEFAULT_PIPELINE_ICONS).toContain('🧠');
  });

  it('calls onChange and closes when a grid cell is picked', () => {
    const onChange = vi.fn();
    render(<IconPicker value="🚀" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('icon-picker-trigger'));
    fireEvent.click(screen.getByLabelText('Select 💡'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('💡');
    expect(screen.queryByTestId('icon-picker-popover')).not.toBeInTheDocument();
  });

  it("marks the currently-selected emoji cell with aria-pressed='true'", () => {
    render(<IconPicker value="💡" onChange={() => {}} />);
    fireEvent.click(screen.getByTestId('icon-picker-trigger'));
    expect(screen.getByLabelText('Select 💡')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('Select 🚀')).toHaveAttribute('aria-pressed', 'false');
  });

  it('commits a custom emoji on Enter and closes the popover', () => {
    const onChange = vi.fn();
    render(<IconPicker value="🚀" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('icon-picker-trigger'));
    const input = screen.getByTestId('icon-picker-custom-input');
    fireEvent.change(input, { target: { value: '🦄' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('🦄');
    expect(screen.queryByTestId('icon-picker-popover')).not.toBeInTheDocument();
  });

  it('commits a custom emoji when the Set button is clicked', () => {
    const onChange = vi.fn();
    render(<IconPicker value="🚀" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('icon-picker-trigger'));
    fireEvent.change(screen.getByTestId('icon-picker-custom-input'), {
      target: { value: '🌟' },
    });
    fireEvent.click(screen.getByText('Set'));
    expect(onChange).toHaveBeenCalledWith('🌟');
    expect(screen.queryByTestId('icon-picker-popover')).not.toBeInTheDocument();
  });

  it('does not commit when the custom input is empty or whitespace-only', () => {
    const onChange = vi.fn();
    render(<IconPicker value="🚀" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('icon-picker-trigger'));
    const input = screen.getByTestId('icon-picker-custom-input');
    // Empty Enter
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
    // Whitespace-only Enter
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
    // Set button is disabled while input is empty/whitespace
    expect(screen.getByText('Set')).toBeDisabled();
    // Popover stays open
    expect(screen.getByTestId('icon-picker-popover')).toBeInTheDocument();
  });

  it('closes the popover when Escape is pressed in the custom input', () => {
    const onChange = vi.fn();
    render(<IconPicker value="🚀" onChange={onChange} />);
    fireEvent.click(screen.getByTestId('icon-picker-trigger'));
    const input = screen.getByTestId('icon-picker-custom-input');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByTestId('icon-picker-popover')).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('closes the popover on outside mousedown', () => {
    render(
      <div>
        <IconPicker value="🚀" onChange={() => {}} />
        <button data-testid="outside">outside</button>
      </div>,
    );
    fireEvent.click(screen.getByTestId('icon-picker-trigger'));
    expect(screen.getByTestId('icon-picker-popover')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByTestId('icon-picker-popover')).not.toBeInTheDocument();
  });

  it('keeps the popover open on inside mousedown (popover body or trigger)', () => {
    render(<IconPicker value="🚀" onChange={() => {}} />);
    fireEvent.click(screen.getByTestId('icon-picker-trigger'));
    const popover = screen.getByTestId('icon-picker-popover');
    fireEvent.mouseDown(popover);
    expect(screen.getByTestId('icon-picker-popover')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId('icon-picker-trigger'));
    expect(screen.getByTestId('icon-picker-popover')).toBeInTheDocument();
  });

  it('renders the provided curated set instead of DEFAULT_PIPELINE_ICONS', () => {
    const curated = ['🍎', '🍌', '🍒'];
    render(<IconPicker value="🍎" onChange={() => {}} curated={curated} />);
    fireEvent.click(screen.getByTestId('icon-picker-trigger'));
    expect(screen.getByLabelText('Select 🍎')).toBeInTheDocument();
    expect(screen.getByLabelText('Select 🍌')).toBeInTheDocument();
    expect(screen.getByLabelText('Select 🍒')).toBeInTheDocument();
    // A default-set emoji that is NOT in curated should be absent
    expect(screen.queryByLabelText('Select 🧠')).not.toBeInTheDocument();
  });

  it('toggles closed when the trigger is clicked while open', () => {
    render(<IconPicker value="🚀" onChange={() => {}} />);
    const trigger = screen.getByTestId('icon-picker-trigger');
    fireEvent.click(trigger);
    expect(screen.getByTestId('icon-picker-popover')).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.queryByTestId('icon-picker-popover')).not.toBeInTheDocument();
  });
});
