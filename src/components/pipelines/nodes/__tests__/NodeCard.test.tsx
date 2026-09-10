import { render, screen } from '@testing-library/react';
import { NodeCard } from '../NodeCard';
// The point of the export: NodeCard must be reachable from `/shared`, not only
// from the root barrel, which statically needs seven @tiptap packages.
import { NodeCard as NodeCardFromShared } from '../../../shared';

describe('NodeCard', () => {
  it('renders the label, subtitle and icon', () => {
    render(<NodeCard icon="🤖" label="Judge" subtitle="nova-pro" />);
    expect(screen.getByText('Judge')).toBeInTheDocument();
    expect(screen.getByText('nova-pro')).toBeInTheDocument();
    // The icon is decorative — it carries the meaning already in the label.
    expect(screen.getByText('🤖')).toHaveAttribute('aria-hidden', 'true');
  });

  it('defaults the pill label to a capitalised status', () => {
    render(<NodeCard icon="x" label="n" status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('prefers an explicit statusLabel over the derived one', () => {
    render(<NodeCard icon="x" label="n" status="error" statusLabel="Halted" />);
    expect(screen.getByText('Halted')).toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });

  it('renders the body slot', () => {
    render(<NodeCard icon="x" label="n" body={<span>42 runs</span>} />);
    expect(screen.getByText('42 runs')).toBeInTheDocument();
  });

  it('only looks clickable when a handler was wired', () => {
    const { container, unmount } = render(<NodeCard icon="x" label="n" />);
    expect((container.firstChild as HTMLElement).className).not.toContain('cursor-pointer');
    unmount();
    const { container: c2 } = render(<NodeCard icon="x" label="n" onClick={() => {}} />);
    expect((c2.firstChild as HTMLElement).className).toContain('cursor-pointer');
  });

  it('is the same component when imported from the shared barrel', () => {
    expect(NodeCardFromShared).toBe(NodeCard);
  });
});
