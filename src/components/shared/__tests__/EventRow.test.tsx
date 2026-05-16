import { render, screen, fireEvent } from '@testing-library/react';
import EventRow from '../EventRow';

describe('EventRow', () => {
  it('renders timestamp, type, and summary', () => {
    render(<EventRow timestamp="12:34:56" type="pipeline.started" summary="Run begun" />);
    expect(screen.getByText('12:34:56')).toBeInTheDocument();
    expect(screen.getByText('pipeline.started')).toBeInTheDocument();
    expect(screen.getByText('Run begun')).toBeInTheDocument();
  });

  it('calls onClick when clicked and onClick is provided', () => {
    const onClick = vi.fn();
    render(
      <EventRow timestamp="00:00" type="test.event" summary="summary" onClick={onClick} />,
    );
    fireEvent.click(screen.getByTestId('event-row'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies selected styles when selected=true', () => {
    render(
      <EventRow timestamp="00:00" type="test" summary="x" selected={true} />,
    );
    expect(screen.getByTestId('event-row').className).toContain('bg-violet-100');
  });

  it('does not apply selected styles when selected=false', () => {
    render(
      <EventRow timestamp="00:00" type="test" summary="x" selected={false} />,
    );
    expect(screen.getByTestId('event-row').className).not.toContain('bg-violet-100');
  });
});
