import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ConsultCard from '../ConsultCard';

describe('ConsultCard', () => {
  it('puts the footer beside the send button while pending and answerable', () => {
    const onAnswer = vi.fn();
    render(
      <ConsultCard
        question="Drop the columns?"
        status="pending"
        onAnswer={onAnswer}
        footer={<button type="button">Open the callout</button>}
      />,
    );
    const send = screen.getByRole('button', { name: 'Send answer' });
    const open = screen.getByRole('button', { name: 'Open the callout' });
    expect(send).toBeDisabled();
    // Same row: one parent for both.
    expect(open.parentElement).toBe(send.parentElement);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'yes' } });
    expect(send).toBeEnabled();
    fireEvent.click(send);
    expect(onAnswer).toHaveBeenCalledWith('yes');
  });

  // The regression this file exists for. A pending consult with no `onAnswer`
  // is the one state where the footer is the ONLY affordance on the card, and
  // it used to be the one state where the footer was dropped.
  it('still renders the footer when pending and NOT answerable', () => {
    render(
      <ConsultCard
        question="Drop the columns?"
        status="pending"
        footer={<button type="button">Answer in document</button>}
      />,
    );
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Send answer' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Answer in document' })).toBeInTheDocument();
  });

  it('renders the footer on an expired card', () => {
    render(
      <ConsultCard
        question="Drop the columns?"
        status="expired"
        footer={<a href="/doc">Open</a>}
      />,
    );
    expect(screen.getByText(/stopped waiting/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open' })).toBeInTheDocument();
  });

  it('drops its own frame when flush, so a list group can supply it', () => {
    const { rerender } = render(<ConsultCard question="Q" status="pending" data-testid="c" />);
    expect(screen.getByTestId('c').className).toMatch(/\bborder\b/);
    rerender(<ConsultCard question="Q" status="pending" data-testid="c" flush />);
    expect(screen.getByTestId('c').className).not.toMatch(/\brounded-lg\b/);
    expect(screen.getByTestId('c').className).not.toMatch(/\bp-3\.5\b/);
  });
});
