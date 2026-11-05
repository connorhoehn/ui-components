import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});
