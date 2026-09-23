import { useState } from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Workbench, type WorkbenchTab } from '../Workbench';
import { AgentTaskCard } from '../AgentTaskCard';
import { MoreContextDisclosure } from '../MoreContextDisclosure';

afterEach(cleanup);

const TABS: WorkbenchTab[] = [
  { id: 'comments', label: 'Comments', count: 3, content: <p>Three threads</p> },
  { id: 'activity', label: 'Activity', content: <p>Recent activity</p> },
  { id: 'details', label: 'Details', content: <p>File details</p> },
];

describe('Workbench', () => {
  it('is a labelled column with the file title, kind mark and tabbed panels', () => {
    render(<Workbench title="Sprint review" subtitle="Presentation · 5 slides" kind="presentation" tabs={TABS} />);
    const aside = screen.getByRole('complementary', { name: 'Workbench' });
    expect(within(aside).getByRole('heading', { name: 'Sprint review' })).toBeInTheDocument();
    expect(screen.getByTestId('workbench-kind')).toHaveAttribute('data-kind', 'presentation');
    expect(screen.getAllByRole('tab').map((t) => t.textContent)).toEqual(['Comments3', 'Activity', 'Details']);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Three threads');
  });

  it('switches tabs on its own when uncontrolled', () => {
    render(<Workbench title="Sprint review" tabs={TABS} defaultTab="activity" />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Recent activity');
    fireEvent.click(screen.getByRole('tab', { name: 'Details' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('File details');
  });

  it('lets a host drive the tab from outside ("View details" in a row menu)', () => {
    function Host() {
      const [tab, setTab] = useState('comments');
      return (
        <>
          <button type="button" onClick={() => setTab('details')}>View details</button>
          <Workbench title="Sprint review" tabs={TABS} activeTab={tab} onTabChange={setTab} />
        </>
      );
    }
    render(<Host />);
    fireEvent.click(screen.getByRole('button', { name: 'View details' }));
    expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('File details');
  });

  it('wires each tab to its panel', () => {
    render(<Workbench title="Sprint review" tabs={TABS} />);
    const tab = screen.getByRole('tab', { name: /Comments/ });
    const panel = screen.getByRole('tabpanel');
    expect(tab.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.getAttribute('aria-labelledby')).toBe(tab.id);
  });

  it('renders the close button, task slot, more-context and footer only when given', () => {
    const onClose = vi.fn();
    const { rerender } = render(<Workbench title="x" tabs={TABS} />);
    expect(screen.queryByTestId('workbench-close')).toBeNull();
    expect(screen.queryByTestId('workbench-task')).toBeNull();
    expect(screen.queryByTestId('workbench-footer')).toBeNull();

    rerender(
      <Workbench
        title="x"
        tabs={TABS}
        onClose={onClose}
        task={<AgentTaskCard title="Build risk outlook slide" status="running" />}
        footer={<button type="button">Open run</button>}
      />,
    );
    expect(within(screen.getByTestId('workbench-task')).getByText('Current task')).toBeInTheDocument();
    expect(within(screen.getByTestId('workbench-footer')).getByRole('button', { name: 'Open run' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close workbench' }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe('AgentTaskCard', () => {
  it('shows status and phase, and no bar or percentage without a real one', () => {
    render(<AgentTaskCard title="Build risk outlook slide" status="running" phase="Editing slide 4" startedLabel="Started 2m ago" description="From the release plan." />);
    const card = screen.getByRole('region', { name: 'Current task: Build risk outlook slide' });
    expect(within(card).getByTestId('agent-task-card-status')).toHaveTextContent('Running');
    expect(within(card).getByTestId('agent-task-card-meta')).toHaveTextContent('Started 2m ago · Editing slide 4');
    expect(within(card).queryByRole('progressbar')).toBeNull();
    expect(card).not.toHaveTextContent('%');
    expect(card).toHaveAttribute('aria-busy', 'true');
  });

  it('draws the bar and the percentage when the run reports one', () => {
    render(<AgentTaskCard title="Deck" status="running" percent={45} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '45');
    expect(screen.getByTestId('agent-task-card-meta')).toHaveTextContent('45%');
  });

  it('maps finished states to their words', () => {
    const { rerender } = render(<AgentTaskCard title="Deck" status="paused" />);
    expect(screen.getByTestId('agent-task-card-status')).toHaveTextContent('Paused');
    rerender(<AgentTaskCard title="Deck" status="failed" statusLabel="Timed out" />);
    expect(screen.getByTestId('agent-task-card-status')).toHaveTextContent('Timed out');
    expect(screen.getByTestId('agent-task-card')).not.toHaveAttribute('aria-busy');
  });
});

describe('MoreContextDisclosure', () => {
  it('is collapsed by default and lists the rows once opened', () => {
    const onSources = vi.fn();
    render(
      <MoreContextDisclosure
        items={[
          { id: 'sources', label: 'Sources', count: 2, onSelect: onSources },
          { id: 'versions', label: 'Versions', count: 6 },
        ]}
      />,
    );
    const details = screen.getByTestId('more-context');
    expect(details).not.toHaveAttribute('open');
    fireEvent.click(screen.getByText('More context'));
    fireEvent.click(screen.getByRole('button', { name: /Sources/ }));
    expect(onSources).toHaveBeenCalledOnce();
    // A row without a handler is text, not a button that does nothing.
    expect(screen.queryByRole('button', { name: /Versions/ })).toBeNull();
    expect(screen.getByTestId('more-context-versions')).toHaveTextContent('Versions· 6');
  });
});
