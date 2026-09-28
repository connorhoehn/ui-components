import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ConnectionPathStrip } from '../ConnectionPathStrip';
import { DepartmentChips } from '../DepartmentChips';
import { DepartmentInsightStrip } from '../DepartmentInsightStrip';
import { GraphSearchBox } from '../GraphSearchBox';
import { PersonDetailCard, type PersonDetail } from '../PersonDetailCard';
import { findConnectionPath } from '../connectionPath';
import { indexBusFactorFindings } from '../graphInsights';
import { departments, people, relationships } from './fixtures';

afterEach(cleanup);

describe('findConnectionPath', () => {
  it('finds the shortest path across relationship types, and null when unreachable', () => {
    const path = findConnectionPath(people, relationships, 'p-2', 'p-4')!;
    expect(path.map((h) => h.person.id)).toEqual(['p-2', 'p-1', 'p-3', 'p-4']);
    expect(path[0]!.viaType).toBe('');
    expect(findConnectionPath(people, [], 'p-1', 'p-4')).toBeNull();
    expect(findConnectionPath(people, relationships, 'p-1', 'p-1')).toBeNull();
  });
});

describe('ConnectionPathStrip', () => {
  it('names the ends, the hops and highlights the corridor', () => {
    const onHighlightPath = vi.fn();
    render(<ConnectionPathStrip path={findConnectionPath(people, relationships, 'p-2', 'p-4')!} onHighlightPath={onHighlightPath} />);
    expect(screen.getByText('Connected via 2 people')).toBeInTheDocument();
    expect(screen.getByText('—reports to→')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show path on graph' }));
    expect(onHighlightPath).toHaveBeenCalledWith(['p-2', 'p-1', 'p-3', 'p-4']);
  });
});

describe('GraphSearchBox', () => {
  it('matches people and skills, moves with arrows and picks with Enter', () => {
    const onPickPerson = vi.fn(), onPickSkill = vi.fn();
    render(<GraphSearchBox people={people} onPickPerson={onPickPerson} onPickSkill={onPickSkill} />);
    const box = screen.getByRole('combobox', { name: 'Find a person or skill' });
    fireEvent.change(box, { target: { value: 'go' } });
    const options = screen.getAllByRole('option');
    expect(options.map((o) => o.textContent)).toEqual(['Go2 people']);
    fireEvent.keyDown(box, { key: 'Enter' });
    expect(onPickSkill).toHaveBeenCalledWith('Go', ['p-1', 'p-4']);

    fireEvent.change(box, { target: { value: 'nora' } });
    fireEvent.click(screen.getByRole('option', { name: /Nora Chang/ }));
    expect(onPickPerson).toHaveBeenCalledWith('p-2');
  });

  it('says so when nothing matches', () => {
    render(<GraphSearchBox people={people} onPickPerson={vi.fn()} onPickSkill={vi.fn()} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'zzz' } });
    expect(screen.getByText('No matches for "zzz"')).toBeInTheDocument();
  });
});

describe('DepartmentChips', () => {
  it('draws a counted chip per staffed department and toggles it', () => {
    const onToggle = vi.fn();
    render(<DepartmentChips departments={[...departments, { id: 'd-x', name: 'Empty', color: '#000' }]} people={people} activeDepartment={null} onToggle={onToggle} />);
    expect(screen.queryByText('Empty')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Platform Engineering'));
    expect(onToggle).toHaveBeenCalledWith('Platform Engineering', ['p-1', 'p-2']);
  });
});

describe('DepartmentInsightStrip', () => {
  it('links a rare skill to its finding and routes plain clicks through onNavigate', () => {
    const onNavigate = vi.fn(), onFocusPerson = vi.fn();
    const findings = indexBusFactorFindings([{ id: 'f-9', sweep: 'bus_factor', status: 'open', entityType: 'skill', title: 'Spark: 1 holder org-wide' }]);
    render(
      <DepartmentInsightStrip department="Data Platform" people={people} onFocusPerson={onFocusPerson}
        busFactorFindings={findings} onNavigate={onNavigate} findingHref={(skill, id) => `/f?skill=${skill}&id=${id ?? ''}`} />,
    );
    expect(screen.getByText(/Data Platform · 1 people/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Spark · Hiro' }));
    expect(onFocusPerson).toHaveBeenCalledWith('p-3');
    const link = screen.getByRole('link', { name: 'finding →' });
    expect(link).toHaveAttribute('href', '/f?skill=Spark&id=f-9');
    fireEvent.click(link);
    expect(onNavigate).toHaveBeenCalledWith('/f?skill=Spark&id=f-9', expect.anything());
    // Rust is rare too, but the sweep never flagged it: no link, say so.
    expect(screen.getByText('not on the sweep yet')).toBeInTheDocument();
  });
});

describe('PersonDetailCard', () => {
  const person: PersonDetail = {
    id: 'p-1', name: 'Vera Green', title: 'Staff Engineer', department: 'Platform Engineering', skills: ['Kubernetes'],
    influenceScore: 0.9, scoredAt: '2026-09-01T00:00:00Z',
    connections: [
      { type: 'mentors', strength: 0.8, otherPerson: { id: 'p-2', name: 'Nora Chang', title: 'Engineer' } },
      { type: 'collaborates', strength: 0.4, otherPerson: null },
    ],
  };

  it('draws the person, connections as meter rows, evidence, and asks', () => {
    const onFocusPerson = vi.fn(), onAsk = vi.fn();
    render(<PersonDetailCard person={person} evidence={[{ id: 'd1', title: 'ADR: Aurora', source: 'adr', sourceUri: null, ingestedAt: '2026-09-01T00:00:00Z', mentionCount: 3 }]}
      onClose={vi.fn()} onFocusPerson={onFocusPerson} onAsk={onAsk} formatTime={() => 'yesterday'} />);
    expect(screen.getByText('Vera Green')).toBeInTheDocument();
    expect(screen.queryByText(/influence/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Add Nora Chang to selection'));
    expect(onFocusPerson).toHaveBeenCalledWith('p-2');
    expect(screen.getByText('ADR: Aurora')).toBeInTheDocument();
    expect(screen.getByText('yesterday')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Ask agent about Vera →' }));
    expect(onAsk).toHaveBeenCalledWith('p-1');
  });

  it('shows analytics only with showInfluence, and loading/error states', () => {
    const { rerender } = render(<PersonDetailCard person={person} showInfluence onClose={vi.fn()} onFocusPerson={vi.fn()} onAsk={vi.fn()} />);
    expect(screen.getByText('influence 0.90')).toBeInTheDocument();
    rerender(<PersonDetailCard person={null} loading onClose={vi.fn()} onFocusPerson={vi.fn()} onAsk={vi.fn()} />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
    rerender(<PersonDetailCard person={null} error="Failed to load person" onClose={vi.fn()} onFocusPerson={vi.fn()} onAsk={vi.fn()} />);
    expect(screen.getByText('Failed to load person')).toBeInTheDocument();
  });
});
