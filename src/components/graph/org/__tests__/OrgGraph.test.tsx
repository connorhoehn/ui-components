import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { OrgGraph } from '../OrgGraph';
import { departments, people, relationships } from './fixtures';

afterEach(cleanup);

// Radial is static (no d3 timer), so node positions exist on first effect.
const base = { people, relationships, departments, layout: 'radial' as const };

describe('OrgGraph', () => {
  it('renders every person as a keyboard-reachable node, the legend, and the zoom cluster', () => {
    render(<OrgGraph {...base} />);
    for (const p of people) {
      expect(screen.getByRole('button', { name: `${p.name} · ${p.title} · ${p.department}` })).toBeInTheDocument();
    }
    const legend = screen.getByTestId('org-graph-legend');
    expect(within(legend).getByText('Departments')).toBeInTheDocument();
    for (const label of ['Collaborates', 'Mentors', 'Reports To', 'Shared Expertise']) {
      expect(within(legend).getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByRole('toolbar', { name: 'Zoom' })).toBeInTheDocument();
    expect(document.querySelectorAll('line[data-relationship]')).toHaveLength(relationships.length);
    // reports_to carries the arrowhead marker; the marker id is instance-scoped.
    const reports = document.querySelector('line[data-relationship="reports_to"]')!;
    expect(reports.getAttribute('marker-end')).toMatch(/^url\(#org-arrow-/);
  });

  it('single-select toggles a person and reports it', () => {
    const onPersonSelect = vi.fn();
    render(<OrgGraph {...base} onPersonSelect={onPersonSelect} />);
    const vera = screen.getByRole('button', { name: /^Vera Green/ });
    fireEvent.click(vera);
    expect(onPersonSelect).toHaveBeenLastCalledWith(people[0]);
    expect(vera).toHaveAttribute('aria-pressed', 'true');
    fireEvent.keyDown(vera, { key: 'Enter' });
    expect(onPersonSelect).toHaveBeenLastCalledWith(null);
  });

  it('multi-select defers to the host set', () => {
    const onToggle = vi.fn();
    render(<OrgGraph {...base} multiSelectIds={new Set(['p-3'])} onToggleMultiSelect={onToggle} />);
    expect(screen.getByRole('button', { name: /^Hiro Tanaka/ })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: /^Aisha Bello/ }));
    expect(onToggle).toHaveBeenCalledWith('p-4');
  });

  it('filters to a department from the legend', () => {
    render(<OrgGraph {...base} />);
    fireEvent.click(within(screen.getByTestId('org-graph-legend')).getByRole('button', { name: 'Security' }));
    expect(screen.getAllByRole('button', { name: /·/ })).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Clear Filter' }));
    expect(screen.getAllByRole('button', { name: /·/ })).toHaveLength(people.length);
  });

  it('shows influence on the hover card only when allowed', () => {
    const { rerender } = render(<OrgGraph {...base} />);
    fireEvent.mouseEnter(screen.getByRole('button', { name: /^Vera Green/ }));
    expect(screen.getByTestId('org-graph-tooltip')).toHaveTextContent('Staff Engineer');
    expect(screen.queryByText('Influence')).not.toBeInTheDocument();
    rerender(<OrgGraph {...base} showInfluence />);
    expect(screen.getByText('Influence')).toBeInTheDocument();
    expect(screen.getByText('90/100')).toBeInTheDocument();
  });

  it('zooms from the cluster and resets with fit', () => {
    render(<OrgGraph {...base} />);
    expect(screen.getByLabelText('Zoom 100%')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(screen.getByLabelText('Zoom 120%')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    expect(screen.getByLabelText('Zoom 100%')).toBeInTheDocument();
  });

  it('renders the animated force layout without throwing', () => {
    render(<OrgGraph people={people} relationships={relationships} departments={departments} legend={false} controls={false} />);
    expect(screen.getByRole('group', { name: 'Org graph' })).toBeInTheDocument();
    expect(screen.queryByTestId('org-graph-legend')).not.toBeInTheDocument();
  });

  it('focusIds draws the focus and its neighbours only, and spotlights the focus', () => {
    render(<OrgGraph {...base} focusIds={['p-4']} />);
    expect(screen.queryByRole('button', { name: /^Vera Green/ })).toBeNull();
    expect(screen.queryByRole('button', { name: /^Nora Chang/ })).toBeNull();
    expect(screen.getByRole('button', { name: /^Aisha Bello/ })).toHaveAttribute('opacity', '1');
    expect(screen.getByRole('button', { name: /^Hiro Tanaka/ })).toHaveAttribute('opacity', '0.3');
    expect(document.querySelectorAll('line[data-relationship]')).toHaveLength(1);
  });
});
