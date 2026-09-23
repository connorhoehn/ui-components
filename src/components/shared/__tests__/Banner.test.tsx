import { render, screen, fireEvent } from '@testing-library/react';
import Banner from '../Banner';
import type { BannerVariant } from '../Banner';

describe('Banner', () => {
  it('renders all variants', () => {
    const variants: BannerVariant[] = ['error', 'warning', 'info', 'success'];
    for (const variant of variants) {
      const { unmount } = render(
        <Banner variant={variant}>Message for {variant}</Banner>
      );
      expect(screen.getByText(`Message for ${variant}`)).toBeInTheDocument();
      unmount();
    }
  });

  it('renders with error variant styling by default', () => {
    render(<Banner>Error message</Banner>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-danger-bg', 'border-danger-border');
  });

  it('renders with warning variant styling', () => {
    render(<Banner variant="warning">Warning message</Banner>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-warning-bg', 'border-warning-border');
  });

  it('renders with info variant styling', () => {
    render(<Banner variant="info">Info message</Banner>);
    const alert = screen.getByRole('status');
    expect(alert).toHaveClass('bg-info-bg', 'border-info-border');
  });

  it('renders with success variant styling', () => {
    render(<Banner variant="success">Success message</Banner>);
    const alert = screen.getByRole('status');
    expect(alert).toHaveClass('bg-success-bg', 'border-success-border');
  });

  it('shows dismiss button and calls onDismiss', () => {
    const onDismiss = vi.fn();
    render(<Banner onDismiss={onDismiss}>Dismissible</Banner>);
    const dismissBtn = screen.getByLabelText('Dismiss');
    expect(dismissBtn).toBeInTheDocument();
    fireEvent.click(dismissBtn);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not render dismiss button when onDismiss is not provided', () => {
    render(<Banner>No dismiss</Banner>);
    expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Banner title="Alert!">Body text</Banner>);
    expect(screen.getByText('Alert!')).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  // In a 280px comment gutter the title and body split the width and the body
  // was left with 68px — about six characters per line, wrapping into a ragged
  // tower. Inline stays the default because it is right across a page.
  it('stacks the title above the body when asked', () => {
    const { rerender } = render(<Banner title="Heads up">Body text</Banner>);
    const inline = screen.getByText('Body text').parentElement!;
    expect(inline.className).toContain('items-center');
    expect(inline.className).not.toContain('flex-col');

    rerender(<Banner title="Heads up" layout="stacked">Body text</Banner>);
    const stacked = screen.getByText('Body text').parentElement!;
    expect(stacked.className).toContain('flex-col');
    expect(stacked.className).toContain('items-start');
  });

  it('gives a stacked body the full width rather than a flex share', () => {
    render(<Banner title="Heads up" layout="stacked">Body text</Banner>);
    expect(screen.getByText('Body text').className).toContain('w-full');
  });

  it('renders an action control after the message and before dismiss', () => {
    const onClick = vi.fn();
    render(
      <Banner variant="warning" onDismiss={() => {}} action={<button onClick={onClick}>Convert to page</button>}>
        This document format is deprecated.
      </Banner>,
    );
    const alert = screen.getByRole('alert');
    const buttons = Array.from(alert.querySelectorAll('button')).map((b) => b.textContent);
    expect(buttons).toEqual(['Convert to page', '×']);
    fireEvent.click(screen.getByText('Convert to page'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders no action wrapper when there is no action', () => {
    render(<Banner variant="info">Plain</Banner>);
    expect(screen.getByRole('status').querySelectorAll('.shrink-0')).toHaveLength(0);
  });
});
