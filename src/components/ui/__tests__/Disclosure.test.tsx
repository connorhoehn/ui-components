import { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Disclosure } from '../Disclosure';

// The browser (and jsdom, matching spec) fires `toggle` as a queued task
// after a click — never synchronously — so any assertion on `onToggle`
// following a click has to wait for it.

describe('Disclosure', () => {
  it('renders native <details>/<summary>', () => {
    render(<Disclosure summary="Label">Body</Disclosure>);
    const details = screen.getByTestId('disclosure');
    expect(details.tagName).toBe('DETAILS');
    expect(screen.getByTestId('disclosure-summary').tagName).toBe('SUMMARY');
  });

  it('accepts a ReactNode summary', () => {
    render(
      <Disclosure summary={<strong data-testid="rich-summary">Rich</strong>}>
        Body
      </Disclosure>,
    );
    expect(screen.getByTestId('rich-summary')).toBeInTheDocument();
  });

  it('defaults to closed', () => {
    render(<Disclosure summary="S">Body</Disclosure>);
    expect((screen.getByTestId('disclosure') as HTMLDetailsElement).open).toBe(false);
  });

  it('honours defaultOpen (uncontrolled)', () => {
    render(
      <Disclosure summary="S" defaultOpen>
        Body
      </Disclosure>,
    );
    expect((screen.getByTestId('disclosure') as HTMLDetailsElement).open).toBe(true);
  });

  it('is keyboard/click toggleable when uncontrolled, and calls onToggle', async () => {
    const onToggle = vi.fn();
    render(
      <Disclosure summary="Toggle me" onToggle={onToggle}>
        Body
      </Disclosure>,
    );
    const details = screen.getByTestId('disclosure') as HTMLDetailsElement;
    expect(details.open).toBe(false);
    expect(screen.queryByText('Body')).not.toBeVisible();

    fireEvent.click(screen.getByTestId('disclosure-summary'));
    expect(details.open).toBe(true);
    await waitFor(() => expect(onToggle).toHaveBeenCalledWith(true));

    fireEvent.click(screen.getByTestId('disclosure-summary'));
    expect(details.open).toBe(false);
    await waitFor(() => expect(onToggle).toHaveBeenCalledWith(false));
  });

  it('is fully controlled via `open` + `onToggle`', async () => {
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <Disclosure summary="Controlled" open={open} onToggle={setOpen}>
          Body
        </Disclosure>
      );
    }
    render(<Controlled />);
    const details = screen.getByTestId('disclosure') as HTMLDetailsElement;
    expect(details.open).toBe(false);
    fireEvent.click(screen.getByTestId('disclosure-summary'));
    await waitFor(() => expect(details.open).toBe(true));
  });

  it('syncs the DOM `open` attribute when a controlled parent flips it externally', () => {
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen((o) => !o)}>external toggle</button>
          <Disclosure summary="Controlled" open={open} onToggle={setOpen}>
            Body
          </Disclosure>
        </>
      );
    }
    render(<Controlled />);
    const details = screen.getByTestId('disclosure') as HTMLDetailsElement;
    expect(details.open).toBe(false);
    fireEvent.click(screen.getByText('external toggle'));
    expect(details.open).toBe(true);
  });

  it('does not self-manage state once `open` is controlled — a click still fires onToggle even if the parent ignores it', async () => {
    const onToggle = vi.fn();
    render(
      <Disclosure summary="Locked open" open={true} onToggle={onToggle}>
        Body
      </Disclosure>,
    );
    const details = screen.getByTestId('disclosure') as HTMLDetailsElement;
    expect(details.open).toBe(true);
    fireEvent.click(screen.getByTestId('disclosure-summary'));
    await waitFor(() => expect(onToggle).toHaveBeenCalledWith(false));
  });

  it('applies neutral border/summary tokens with no tone', () => {
    render(<Disclosure summary="S">Body</Disclosure>);
    expect(screen.getByTestId('disclosure').className).toContain('border-border');
    expect(screen.getByTestId('disclosure-summary').className).toContain('bg-surface');
  });

  it('applies tone tokens to the summary row and tone border to the body', () => {
    render(
      <Disclosure summary="S" tone="danger">
        Body
      </Disclosure>,
    );
    const summary = screen.getByTestId('disclosure-summary');
    expect(summary.className).toContain('bg-danger-bg');
    expect(summary.className).toContain('text-danger-fg');
    expect(screen.getByTestId('disclosure').className).toContain('border-danger-border');
    expect(screen.getByTestId('disclosure-body').className).toContain('border-danger-border');
  });

  it('folds the deprecated "purple" tone alias to accent', () => {
    render(
      <Disclosure summary="S" tone="purple">
        Body
      </Disclosure>,
    );
    expect(screen.getByTestId('disclosure-summary').className).toContain('bg-accent-bg');
  });

  it('renders the body content', () => {
    render(
      <Disclosure summary="S" open>
        <p>Body content</p>
      </Disclosure>,
    );
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('defaults to the default density — unchanged padding/text size', () => {
    render(<Disclosure summary="S">Body</Disclosure>);
    expect(screen.getByTestId('disclosure').className).toContain('text-sm');
    expect(screen.getByTestId('disclosure-summary').className).toContain('px-3');
    expect(screen.getByTestId('disclosure-summary').className).toContain('py-2');
    expect(screen.getByTestId('disclosure-body').className).toContain('px-3');
  });

  it('tightens padding and text size under density="compact"', () => {
    render(
      <Disclosure summary="S" density="compact">
        Body
      </Disclosure>,
    );
    expect(screen.getByTestId('disclosure').className).toContain('text-xs');
    expect(screen.getByTestId('disclosure-summary').className).toContain('px-2');
    expect(screen.getByTestId('disclosure-summary').className).toContain('py-1');
    expect(screen.getByTestId('disclosure-body').className).toContain('px-2');
  });

  it('merges custom data-testid, className, summaryClassName, bodyClassName', () => {
    render(
      <Disclosure
        summary="S"
        data-testid="my-disclosure"
        className="extra-root"
        summaryClassName="extra-summary"
        bodyClassName="extra-body"
      >
        Body
      </Disclosure>,
    );
    expect(screen.getByTestId('my-disclosure').className).toContain('extra-root');
    expect(screen.getByTestId('my-disclosure-summary').className).toContain('extra-summary');
    expect(screen.getByTestId('my-disclosure-body').className).toContain('extra-body');
  });
});
