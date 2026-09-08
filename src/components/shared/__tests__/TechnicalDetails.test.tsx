import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TechnicalDetails from '../TechnicalDetails';

describe('TechnicalDetails', () => {
  it('renders nothing when there is no detail to reveal', () => {
    const { container } = render(<TechnicalDetails text={null} />);
    expect(container).toBeEmptyDOMElement();
    const { container: blank } = render(<TechnicalDetails text="   " />);
    expect(blank).toBeEmptyDOMElement();
  });

  it('keeps the raw text out of the way until asked, then shows it verbatim', async () => {
    const user = userEvent.setup();
    const raw = 'enqueue failed: [durable-transport] publish to "q" failed after 3 attempts';
    render(<TechnicalDetails text={raw} />);

    expect(screen.queryByTestId('technical-details-text')).toBeNull();
    const toggle = screen.getByTestId('technical-details-toggle');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(screen.getByTestId('technical-details-text')).toHaveTextContent(raw);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(toggle);
    expect(screen.queryByTestId('technical-details-text')).toBeNull();
  });

  it('offers a copy control only while the text is showing', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<TechnicalDetails text="boom" />);
    expect(screen.queryByTestId('technical-details-copy')).toBeNull();

    await user.click(screen.getByTestId('technical-details-toggle'));
    await user.click(screen.getByTestId('technical-details-copy'));
    expect(writeText).toHaveBeenCalledWith('boom');
  });
});
