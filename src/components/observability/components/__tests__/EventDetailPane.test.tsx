import { render, screen, fireEvent } from '@testing-library/react';
import EventDetailPane from '../EventDetailPane';
import type { EventItem } from '../EventTimeline';

function makeEvent(overrides: Partial<EventItem> = {}): EventItem {
  return {
    id: 'e1',
    timestamp: '12:00:00',
    type: 'run.started',
    summary: 'pipeline-A started',
    payload: { runId: 'r-1', detail: { ok: true } },
    ...overrides,
  };
}

describe('EventDetailPane', () => {
  it('renders the null state when event is null', () => {
    render(<EventDetailPane event={null} />);
    expect(screen.getByTestId('event-detail-empty')).toBeInTheDocument();
    expect(
      screen.getByText('Select an event to see details'),
    ).toBeInTheDocument();
  });

  it('renders event type and timestamp in the header', () => {
    render(<EventDetailPane event={makeEvent()} />);
    expect(screen.getByText('run.started')).toBeInTheDocument();
    expect(screen.getByText('12:00:00')).toBeInTheDocument();
  });

  it('pretty-prints event.payload as JSON in the pre block', () => {
    const { container } = render(<EventDetailPane event={makeEvent()} />);
    const pre = container.querySelector('pre');
    expect(pre).not.toBeNull();
    const expected = JSON.stringify(
      { runId: 'r-1', detail: { ok: true } },
      null,
      2,
    );
    expect(pre!.textContent).toBe(expected);
  });

  it('falls back to pretty-printing the event when payload is missing', () => {
    const ev = makeEvent({ payload: undefined });
    const { container } = render(<EventDetailPane event={ev} />);
    const pre = container.querySelector('pre');
    expect(pre).not.toBeNull();
    expect(pre!.textContent).toBe(JSON.stringify(ev, null, 2));
  });

  it('invokes navigator.clipboard.writeText when Copy is clicked', () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const original = (navigator as Navigator & { clipboard?: Clipboard })
      .clipboard;
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    });

    render(<EventDetailPane event={makeEvent()} />);
    fireEvent.click(screen.getByTestId('event-detail-copy'));

    const expected = JSON.stringify(
      { runId: 'r-1', detail: { ok: true } },
      null,
      2,
    );
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(expected);

    Object.defineProperty(navigator, 'clipboard', {
      value: original,
      writable: true,
      configurable: true,
    });
  });

  it('creates an object URL and triggers anchor click on Download', () => {
    const createObjectURL = vi.fn().mockReturnValue('blob:fake-url');
    const revokeObjectURL = vi.fn();
    const originalCreate = URL.createObjectURL;
    const originalRevoke = URL.revokeObjectURL;
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = revokeObjectURL;
    const anchorClick = vi.spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    render(<EventDetailPane event={makeEvent()} />);
    fireEvent.click(screen.getByTestId('event-detail-download'));

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    const [blobArg] = createObjectURL.mock.calls[0];
    expect(blobArg).toBeInstanceOf(Blob);
    expect((blobArg as Blob).type).toBe('application/json');
    expect(anchorClick).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:fake-url');

    anchorClick.mockRestore();
    URL.createObjectURL = originalCreate;
    URL.revokeObjectURL = originalRevoke;
  });
});
