import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SubNavLayout, type SubNavItem } from '../SubNavLayout';

const FLAT: SubNavItem[] = [
  { path: 'summary', label: 'Summary' },
  { path: 'runs', label: 'Runs', count: 12 },
  { path: 'halt', label: 'Halt', onClick: vi.fn(), accent: 'danger' },
];

describe('SubNavLayout', () => {
  beforeEach(() => window.localStorage.clear());

  it('renders the rail title and the content children', () => {
    render(
      <SubNavLayout title="Ingest" items={FLAT}>
        <div>main content</div>
      </SubNavLayout>,
    );
    expect(screen.getByText('Ingest')).toBeInTheDocument();
    expect(screen.getByText('main content')).toBeInTheDocument();
  });

  it('renders link items as anchors and action items as buttons', () => {
    render(<SubNavLayout title="T" items={FLAT}>c</SubNavLayout>);
    expect(screen.getByRole('link', { name: /Summary/ })).toBeInTheDocument();
    const halt = screen.getByRole('button', { name: /Halt/ });
    fireEvent.click(halt);
    expect(FLAT[2].onClick).toHaveBeenCalled();
  });

  it('shows the count badge', () => {
    render(<SubNavLayout title="T" items={FLAT}>c</SubNavLayout>);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders collapsible group sections when items carry groups', () => {
    const grouped: SubNavItem[] = [
      { path: 'a', label: 'Alpha', group: 'Sources' },
      { path: 'b', label: 'Beta', group: 'Sources' },
    ];
    render(<SubNavLayout title="T" items={grouped}>c</SubNavLayout>);
    const header = screen.getByText('Sources');
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    fireEvent.click(header);
    expect(screen.queryByText('Alpha')).toBeNull();
  });

  it('delegates link rendering to renderNavItem when provided', () => {
    render(
      <SubNavLayout
        title="T"
        items={[{ path: 'x', label: 'X' }]}
        renderNavItem={(item, children) => (
          <div data-testid={`custom-${item.path}`}>{children}</div>
        )}
      >
        c
      </SubNavLayout>,
    );
    expect(screen.getByTestId('custom-x')).toHaveTextContent('X');
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('renders the secondary rail when secondaryItems are given', () => {
    render(
      <SubNavLayout
        title="T"
        items={FLAT}
        secondaryTitle="Details"
        secondaryItems={[{ path: 'd', label: 'Detail A' }]}
      >
        c
      </SubNavLayout>,
    );
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Detail A')).toBeInTheDocument();
  });
});
