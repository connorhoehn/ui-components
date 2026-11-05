import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ColumnDock } from '../layout/DockedColumn';
import { MasterDetailPage } from './MasterDetailPage';

const list = { label: 'requests', title: 'Pending', count: 2, body: <ul><li>Request A</li><li>Request B</li></ul> };

describe('MasterDetailPage', () => {
  it('draws the list rail, the header and the selected record', () => {
    const { container } = render(<MasterDetailPage title="Request A" list={list}><p>record A</p></MasterDetailPage>);
    const root = container.querySelector('[data-page-template="master-detail"]')!;
    expect(root.className).toContain('h-full');
    expect(root.querySelector('[data-list-rail]')).toBeTruthy();
    expect(screen.getByText('Request B')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Request A' })).toBeTruthy();
    expect(screen.getByText('record A')).toBeTruthy();
    expect(container.querySelector('[data-master-detail-body]')!.getAttribute('data-master-detail-body')).toBe('selected');
  });

  it('shows the default empty-selection state when nothing is selected', () => {
    const { container } = render(<MasterDetailPage title="Requests" list={list}>{null}</MasterDetailPage>);
    expect(screen.getByText('Select an item from the list')).toBeTruthy();
    expect(container.querySelector('[data-master-detail-body]')!.getAttribute('data-master-detail-body')).toBe('empty');
  });

  it('uses a custom empty detail and keeps the record at the page gutter', () => {
    const { container } = render(<MasterDetailPage title="Requests" list={list} emptyDetail={<p>Pick one</p>} />);
    expect(screen.getByText('Pick one')).toBeTruthy();
    expect(container.querySelector('[data-master-detail-body]')!.className).toContain('px-[var(--ui-page-gutter,1.5rem)]');
  });

  it('titleAs sets the header heading level', () => {
    render(<MasterDetailPage title="Request A" titleAs="h3" list={list}><p>record A</p></MasterDetailPage>);
    expect(screen.getByRole('heading', { name: 'Request A', level: 3 })).toBeTruthy();
  });

  it('keeps footer as a band under the record by default', () => {
    const { container } = render(<MasterDetailPage title="Request A" list={list} footer={<p>composer</p>}><p>record A</p></MasterDetailPage>);
    expect(container.querySelector('[data-docked-column]')).toBeNull();
    expect(container.querySelector('[data-testid$="-pane-footer"]')).toContainElement(screen.getByText('composer'));
  });

  it('body="docked" docks the footer and an overview\'s ColumnDock at the record column\'s bottom', () => {
    const { container, rerender } = render(
      <MasterDetailPage title="Designs" list={list} body="docked"
        emptyDetail={<><p>overview</p><ColumnDock><p>command composer</p></ColumnDock></>}>{null}</MasterDetailPage>,
    );
    const column = container.querySelector('[data-docked-column]')!;
    const body = column.querySelector('[data-docked-column-body]')!;
    const dock = column.querySelector('[data-column-dock]')!;
    expect(body).toHaveAttribute('data-page-body', 'docked');
    expect(body).toHaveAttribute('data-master-detail-body', 'empty');
    expect(body).toContainElement(screen.getByText('overview'));
    expect(body.className).toContain('px-[var(--ui-page-gutter,1.5rem)]');
    expect(dock).toContainElement(screen.getByText('command composer'));
    expect(body).not.toContainElement(screen.getByText('command composer'));
    expect(container.querySelector('[data-testid$="-pane-footer"]')).toBeNull();

    rerender(<MasterDetailPage title="Design A" list={list} body="docked" footer={<p>reply</p>}><p>record A</p></MasterDetailPage>);
    const dock2 = container.querySelector('[data-column-dock]')!;
    expect(container.querySelector('[data-docked-column-body]')).toHaveAttribute('data-master-detail-body', 'selected');
    expect(dock2).toContainElement(screen.getByText('reply'));
    expect(container.querySelector('[data-testid$="-pane-footer"]')).toBeNull();
  });

  it('dockedBody="fill" makes the docked body a fixed frame', () => {
    const { container } = render(<MasterDetailPage title="Thread" list={list} body="docked" dockedBody="fill"><p>conversation</p></MasterDetailPage>);
    const body = container.querySelector('[data-docked-column-body]')!;
    expect(body.className).toContain('overflow-hidden');
    expect(body.className).not.toContain('overflow-auto');
  });
});
