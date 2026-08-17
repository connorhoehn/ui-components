import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  describe('variant="count"', () => {
    it('renders the value', () => {
      render(<Badge variant="count" value={3} data-testid="badge" />);
      expect(screen.getByTestId('badge')).toHaveTextContent('3');
    });

    it('clamps to "99+" when value > 99', () => {
      render(<Badge variant="count" value={150} data-testid="badge" />);
      expect(screen.getByTestId('badge')).toHaveTextContent('99+');
    });

    it('renders "0" when value is 0', () => {
      render(<Badge variant="count" value={0} data-testid="badge" />);
      expect(screen.getByTestId('badge')).toHaveTextContent('0');
    });

    it('treats missing value as 0', () => {
      render(<Badge variant="count" data-testid="badge" />);
      expect(screen.getByTestId('badge')).toHaveTextContent('0');
    });

    it('exposes an aria-label derived from the value', () => {
      render(<Badge variant="count" value={4} data-testid="badge" />);
      expect(screen.getByTestId('badge')).toHaveAttribute('aria-label', '4 items');
    });

    it('uses a custom aria-label when provided', () => {
      render(
        <Badge variant="count" value={4} aria-label="4 unread messages" data-testid="badge" />,
      );
      expect(screen.getByTestId('badge')).toHaveAttribute('aria-label', '4 unread messages');
    });

    it('applies color classes', () => {
      const { container } = render(<Badge variant="count" value={1} color="success" />);
      expect(container.firstChild).toHaveClass('bg-success-bg');
    });
  });

  describe('variant="dot"', () => {
    it('renders a colored dot', () => {
      render(<Badge variant="dot" color="danger" data-testid="dot" />);
      const el = screen.getByTestId('dot');
      expect(el).toBeInTheDocument();
      expect(el.className).toMatch(/rounded-full/);
      expect(el.className).toMatch(/bg-danger/);
    });

    it('omits role/aria-label when no label provided', () => {
      render(<Badge variant="dot" data-testid="dot" />);
      const el = screen.getByTestId('dot');
      expect(el).not.toHaveAttribute('role');
    });

    it('sets role="img" when aria-label is provided', () => {
      render(<Badge variant="dot" aria-label="online" data-testid="dot" />);
      const el = screen.getByTestId('dot');
      expect(el).toHaveAttribute('role', 'img');
      expect(el).toHaveAttribute('aria-label', 'online');
    });
  });

  describe('variant="pulse"', () => {
    it('renders both the dot and the ping ring', () => {
      const { container } = render(<Badge variant="pulse" color="accent" data-testid="pulse" />);
      expect(screen.getByTestId('pulse')).toBeInTheDocument();
      // The ping ring is the first inner span with animate-ping
      const pingRing = container.querySelector('.animate-ping');
      expect(pingRing).toBeTruthy();
    });

    it('applies pulse-ring color', () => {
      const { container } = render(<Badge variant="pulse" color="success" />);
      const pingRing = container.querySelector('.animate-ping');
      expect(pingRing?.className).toMatch(/bg-success/);
    });
  });
});
