import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InboxSection, InboxSectionRow } from '../InboxSection';

describe('InboxSection', () => {
  it('is a landmark named by its heading, with the count beside it', () => {
    render(
      <InboxSection title="Decisions" count={2} data-testid="lane">
        <InboxSectionRow>one</InboxSectionRow>
        <InboxSectionRow>two</InboxSectionRow>
      </InboxSection>,
    );
    const region = screen.getByRole('region', { name: 'Decisions' });
    expect(within(region).getByRole('heading', { level: 2, name: 'Decisions' })).toBeInTheDocument();
    expect(within(region).getByLabelText('2 in Decisions')).toHaveTextContent('2');
    expect(within(region).getAllByRole('listitem')).toHaveLength(2);
  });

  it('draws the empty state — glyph, line and hint — instead of the list when the count is zero', () => {
    render(
      <InboxSection
        title="Mentions"
        count={0}
        data-testid="lane"
        empty={{ icon: '@', title: 'No recent mentions', body: 'Mentions of you appear here.' }}
        footer="never shown while empty"
      />,
    );
    const empty = screen.getByTestId('lane-empty');
    expect(empty).toHaveTextContent('No recent mentions');
    expect(empty).toHaveTextContent('Mentions of you appear here.');
    expect(screen.queryByRole('list')).toBeNull();
    // A horizon note under zero rows qualifies nothing.
    expect(screen.queryByText('never shown while empty')).toBeNull();
  });

  it('keeps the footer and the action when there are rows', () => {
    render(
      <InboxSection
        title="Tasks"
        count={1}
        action={<button type="button">Refresh</button>}
        footer="Last 24 hours only."
      >
        <InboxSectionRow>row</InboxSectionRow>
      </InboxSection>,
    );
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
    expect(screen.getByText('Last 24 hours only.')).toBeInTheDocument();
  });

  it('lets the caller choose the heading level and the empty testid', () => {
    render(
      <InboxSection title="Tasks" count={0} headingLevel={3} empty={{ title: 'Clear', testId: 'tasks-empty' }} />,
    );
    expect(screen.getByRole('heading', { level: 3, name: 'Tasks' })).toBeInTheDocument();
    expect(screen.getByTestId('tasks-empty')).toBeInTheDocument();
  });
});
