import { render, screen } from '@testing-library/react';
import { GuardrailBadge } from '../GuardrailBadge';

describe('GuardrailBadge', () => {
  it('renders "No guardrails" italic placeholder when list is empty', () => {
    render(<GuardrailBadge guardrails={[]} />);
    const placeholder = screen.getByText('No guardrails');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveClass('italic');
  });

  it('compact mode shows shield + count without naming each guardrail', () => {
    render(<GuardrailBadge guardrails={['pii', 'rate-limit', 'prompt-injection']} compact />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText(/pii/)).not.toBeInTheDocument();
    expect(screen.queryByText(/rate-limit/)).not.toBeInTheDocument();
  });

  it('non-compact list renders one chip per guardrail with its name', () => {
    render(<GuardrailBadge guardrails={['pii', 'rate-limit', 'prompt-injection']} />);
    expect(screen.getByText(/pii/)).toBeInTheDocument();
    expect(screen.getByText(/rate-limit/)).toBeInTheDocument();
    expect(screen.getByText(/prompt-injection/)).toBeInTheDocument();
  });

  it('applies extra className to the wrapper in the list variant', () => {
    const { container } = render(
      <GuardrailBadge guardrails={['pii']} className="extra-wrapper-cls" />,
    );
    expect(container.firstChild).toHaveClass('extra-wrapper-cls');
  });

  it('applies extra className to the wrapper in the compact variant', () => {
    const { container } = render(
      <GuardrailBadge guardrails={['pii']} compact className="compact-extra" />,
    );
    expect(container.firstChild).toHaveClass('compact-extra');
  });

  it('applies extra className to the wrapper in the empty variant', () => {
    const { container } = render(
      <GuardrailBadge guardrails={[]} className="empty-extra" />,
    );
    expect(container.firstChild).toHaveClass('empty-extra');
  });
});
