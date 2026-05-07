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
    expect(alert).toHaveStyle({ background: '#fef2f2' });
  });

  it('renders with warning variant styling', () => {
    render(<Banner variant="warning">Warning message</Banner>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveStyle({ background: '#fffbeb' });
  });

  it('renders with info variant styling', () => {
    render(<Banner variant="info">Info message</Banner>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveStyle({ background: '#eff6ff' });
  });

  it('renders with success variant styling', () => {
    render(<Banner variant="success">Success message</Banner>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveStyle({ background: '#f0fdf4' });
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
});
