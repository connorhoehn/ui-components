import { render, screen, fireEvent } from '@testing-library/react';
import { AgUiReasoningBlock } from '../AgUiReasoningBlock';

describe('AgUiReasoningBlock', () => {
  it('renders nothing when reasoning is empty', () => {
    const { container } = render(<AgUiReasoningBlock reasoning="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when reasoning is whitespace-only', () => {
    const { container } = render(<AgUiReasoningBlock reasoning="   " />);
    expect(container.firstChild).toBeNull();
  });

  it('shows "Reasoning" label when not streaming', () => {
    render(<AgUiReasoningBlock reasoning="think hard" isStreaming={false} />);
    expect(screen.getByText('Reasoning')).toBeInTheDocument();
  });

  it('shows "Thinking…" label when streaming', () => {
    render(<AgUiReasoningBlock reasoning="think hard" isStreaming={true} />);
    expect(screen.getByText('Thinking…')).toBeInTheDocument();
  });

  it('displays token count chip', () => {
    render(<AgUiReasoningBlock reasoning="one two three four" />);
    expect(screen.getByText('4 tok')).toBeInTheDocument();
  });

  it('is collapsed by default (body not visible)', () => {
    render(<AgUiReasoningBlock reasoning="secret thoughts" />);
    expect(screen.queryByText('secret thoughts')).not.toBeInTheDocument();
  });

  it('expands body on header click', () => {
    render(<AgUiReasoningBlock reasoning="secret thoughts" />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('secret thoughts')).toBeInTheDocument();
  });

  it('collapses body on second click', () => {
    render(<AgUiReasoningBlock reasoning="secret thoughts" />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('secret thoughts')).not.toBeInTheDocument();
  });

  it('starts expanded when defaultOpen=true', () => {
    render(<AgUiReasoningBlock reasoning="visible from start" defaultOpen={true} />);
    expect(screen.getByText('visible from start')).toBeInTheDocument();
  });

  it('passes className to outer wrapper', () => {
    const { container } = render(
      <AgUiReasoningBlock reasoning="hi" className="custom-cls" />,
    );
    expect(container.firstChild).toHaveClass('custom-cls');
  });
});
