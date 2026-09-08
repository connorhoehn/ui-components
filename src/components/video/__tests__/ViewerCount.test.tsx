import { render, screen } from '@testing-library/react';
import { ViewerCount, isKnownViewerCount } from '../ViewerCount';

describe('ViewerCount', () => {
  it('renders an integer count under 1000 verbatim', () => {
    render(<ViewerCount count={42} />);
    expect(screen.getByText('42 watching')).toBeInTheDocument();
  });

  it('renders zero as "0 watching"', () => {
    render(<ViewerCount count={0} />);
    expect(screen.getByText('0 watching')).toBeInTheDocument();
  });

  it('formats 1000 as 1.0K', () => {
    render(<ViewerCount count={1000} />);
    expect(screen.getByText('1.0K watching')).toBeInTheDocument();
  });

  it('formats counts >= 1000 with one decimal of K precision', () => {
    render(<ViewerCount count={2345} />);
    expect(screen.getByText('2.3K watching')).toBeInTheDocument();
  });

  it('formats large counts with K suffix', () => {
    render(<ViewerCount count={123456} />);
    expect(screen.getByText('123.5K watching')).toBeInTheDocument();
  });
});

// "Nobody measured" and "somebody measured and the answer was nobody" are
// different claims. Upstream `getViewerCount` returns null for the first, and
// this codebase shipped a tracker with NO callers at all — so every channel
// reported an empty house. A badge that renders 0 for an unmeasured channel
// is that bug wearing a confident face.
describe('ViewerCount — measured zero vs never measured', () => {
  it('renders nothing at all when the count is unknown', () => {
    const { container } = render(<ViewerCount count={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when the prop is omitted entirely', () => {
    const { container } = render(<ViewerCount />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing for a nonsense negative from a broken source', () => {
    const { container } = render(<ViewerCount count={-1} />);
    expect(container.firstChild).toBeNull();
  });

  it('still shows a measured zero, which is what proves the counter works', () => {
    render(<ViewerCount count={0} />);
    expect(screen.getByTestId('viewer-count')).toHaveTextContent('0 watching');
  });

  it('carries the raw number for anything asserting on it', () => {
    render(<ViewerCount count={7} />);
    expect(screen.getByTestId('viewer-count')).toHaveAttribute('data-viewers', '7');
  });
});

describe('isKnownViewerCount', () => {
  it('separates the two zeros', () => {
    expect(isKnownViewerCount(0)).toBe(true);
    expect(isKnownViewerCount(null)).toBe(false);
    expect(isKnownViewerCount(undefined)).toBe(false);
    expect(isKnownViewerCount(Number.NaN)).toBe(false);
  });
});
