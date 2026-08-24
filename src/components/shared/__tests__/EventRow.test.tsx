import { render, screen, fireEvent, createEvent } from '@testing-library/react';
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
    expect(screen.getByTestId('event-row').className).toContain('bg-accent-bg');
  });

  it('does not apply selected styles when selected=false', () => {
    render(
      <EventRow timestamp="00:00" type="test" summary="x" selected={false} />,
    );
    expect(screen.getByTestId('event-row').className).not.toContain('bg-accent-bg');
  });
});

// REGRESSION (keyboard a11y): a clickable EventRow was a `<div onClick>` whose
// children are all plain <span>s — nothing focusable anywhere — so selecting an
// entry in the event log (and opening its detail pane) was mouse-only. It is a
// real `<button type="button">` when onClick is supplied, which gets focus plus
// Enter and Space from the browser. A row with no onClick must stay a plain
// <div> so a read-only log does not fill the tab order with dead stops.
describe('EventRow keyboard activation', () => {
  it('renders a clickable row as a button named after its content', () => {
    render(
      <EventRow timestamp="00:00" type="audit.access" summary="alice read billing" onClick={() => {}} />,
    );
    const row = screen.getByRole('button', { name: /alice read billing/ });
    expect(row).toBe(screen.getByTestId('event-row'));
    expect(row).toHaveAttribute('type', 'button');
  });

  it('puts a clickable row in the tab order without an author-set tabindex', () => {
    render(<EventRow timestamp="00:00" type="t" summary="s" onClick={() => {}} />);
    const row = screen.getByTestId('event-row');
    expect(row.tagName).toBe('BUTTON');
    row.focus();
    expect(document.activeElement).toBe(row);
  });

  it('activates on Space without scrolling the page', () => {
    const onClick = vi.fn();
    render(<EventRow timestamp="00:00" type="t" summary="s" onClick={onClick} />);
    const row = screen.getByTestId('event-row');
    // A native button turns keydown Space into a click and prevents the scroll
    // itself; assert the element type that guarantees it rather than jsdom's
    // (absent) default action.
    expect(row.tagName).toBe('BUTTON');
    const ev = createEvent.keyDown(row, { key: ' ' });
    fireEvent(row, ev);
    fireEvent.click(row);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('reports selection through aria-pressed on the clickable row', () => {
    const { rerender } = render(
      <EventRow timestamp="00:00" type="t" summary="s" onClick={() => {}} selected />,
    );
    expect(screen.getByTestId('event-row')).toHaveAttribute('aria-pressed', 'true');
    rerender(<EventRow timestamp="00:00" type="t" summary="s" onClick={() => {}} />);
    expect(screen.getByTestId('event-row')).toHaveAttribute('aria-pressed', 'false');
  });

  it('leaves a non-clickable row out of the tab order entirely', () => {
    render(<EventRow timestamp="00:00" type="t" summary="s" />);
    const row = screen.getByTestId('event-row');
    expect(row.tagName).toBe('DIV');
    expect(screen.queryByRole('button')).toBeNull();
  });
});
