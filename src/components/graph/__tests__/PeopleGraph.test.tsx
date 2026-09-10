import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PEOPLE_GRAPH_QUERY_NODE_ID, PeopleGraph, matchingTag, peopleToGraph, type GraphPerson } from '../PeopleGraph';

afterEach(cleanup);

const people: GraphPerson[] = [
  { id: 'grace', name: 'Grace Hopper', title: 'Staff engineer', tags: ['go', 'kubernetes'], score: 0.9 },
  { id: 'bob', name: 'Bob Martinez', title: 'SRE', tags: ['terraform', 'kubernetes'], score: 0.6 },
  { id: 'nora', name: 'Nora DaSilva', tags: ['helm'], score: 0.4 },
  { id: 'hank', name: 'Hank Anderson', score: 0.2 },
];

describe('matchingTag / peopleToGraph', () => {
  it('picks the tag the query mentions, else the first tag, else nothing', () => {
    expect(matchingTag(people[0], 'kubernetes experts')).toBe('kubernetes');
    expect(matchingTag(people[0], 'k8s')).toBe('go');
    expect(matchingTag(people[0], 'Go')).toBe('go');
    expect(matchingTag(people[2], 'kubernetes experts')).toBe('helm');
    expect(matchingTag(people[3], 'kubernetes experts')).toBeUndefined();
  });

  it('puts the query in the centre and one edge per person labelled by the matching tag', () => {
    const { nodes, edges } = peopleToGraph(people, 'kubernetes experts');
    expect(nodes[0]).toMatchObject({ id: PEOPLE_GRAPH_QUERY_NODE_ID, label: 'kubernetes experts', group: 'center', sublabel: '4 people' });
    expect(nodes.slice(1).map((n) => n.group)).toEqual(['kubernetes', 'kubernetes', 'helm', undefined]);
    expect(edges).toEqual([
      { from: PEOPLE_GRAPH_QUERY_NODE_ID, to: 'grace', label: 'kubernetes', weight: 0.9 },
      { from: PEOPLE_GRAPH_QUERY_NODE_ID, to: 'bob', label: 'kubernetes', weight: 0.6 },
      { from: PEOPLE_GRAPH_QUERY_NODE_ID, to: 'nora', label: 'helm', weight: 0.4 },
      { from: PEOPLE_GRAPH_QUERY_NODE_ID, to: 'hank', label: undefined, weight: 0.2 },
    ]);
    expect(peopleToGraph([], undefined).nodes[0].label).toBe('Everyone');
  });
});

describe('PeopleGraph', () => {
  it('renders the graph with tag-labelled edges and the same people as a list with actions', () => {
    const onOpen = vi.fn();
    const onMessage = vi.fn();
    render(<PeopleGraph people={people} query="kubernetes experts" onOpenPerson={onOpen} onMessagePerson={onMessage} />);

    expect(screen.getByTestId(`people-graph-graph-edge-label-${PEOPLE_GRAPH_QUERY_NODE_ID}-grace`)).toHaveTextContent('kubernetes');
    expect(screen.getByTestId(`people-graph-graph-edge-label-${PEOPLE_GRAPH_QUERY_NODE_ID}-nora`)).toHaveTextContent('helm');
    expect(screen.queryByTestId(`people-graph-graph-edge-label-${PEOPLE_GRAPH_QUERY_NODE_ID}-hank`)).toBeNull();
    expect(screen.getByRole('button', { name: 'kubernetes experts, 4 people' })).toBeInTheDocument();

    const list = screen.getByRole('list', { name: 'People' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(4);
    expect(within(list).getByText('Staff engineer')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('people-graph-message-bob'));
    expect(onMessage).toHaveBeenCalledWith('bob');
    fireEvent.click(screen.getByTestId('people-graph-open-nora'));
    expect(onOpen).toHaveBeenCalledWith('nora');
  });

  it('keeps the graph and the list on one selection', () => {
    render(<PeopleGraph people={people} query="kubernetes" />);
    fireEvent.click(screen.getByTestId('people-graph-graph-node-grace'));
    expect(screen.getByTestId('people-graph-row-grace')).toHaveAttribute('data-selected', 'true');
    fireEvent.click(screen.getByTestId('people-graph-row-bob'));
    expect(screen.getByTestId('people-graph-graph-node-bob')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('people-graph-row-grace')).not.toHaveAttribute('data-selected');
    // The query node is not a person: picking it clears rather than selects.
    fireEvent.click(screen.getByTestId(`people-graph-graph-node-${PEOPLE_GRAPH_QUERY_NODE_ID}`));
    expect(screen.getByTestId('people-graph-row-bob')).not.toHaveAttribute('data-selected');
  });

  it('hides the actions it was not given', () => {
    render(<PeopleGraph people={people.slice(0, 1)} />);
    expect(screen.queryByText('Message')).toBeNull();
    expect(screen.queryByText('Open')).toBeNull();
  });

  it('shows an empty state instead of an empty graph', () => {
    render(<PeopleGraph people={[]} query="cobol" />);
    expect(screen.getByTestId('people-graph-empty')).toHaveTextContent('No people found');
    expect(screen.getByTestId('people-graph-empty')).toHaveTextContent('cobol');
    expect(screen.queryByTestId('people-graph')).toBeNull();
  });
});
