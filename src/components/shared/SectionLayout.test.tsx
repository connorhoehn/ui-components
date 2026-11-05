import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SectionLayout } from './SectionLayout';
import { PageFrame } from './PageFrame';
import { ColumnDock } from '../layout/DockedColumn';

const items = [{ label: 'Summary', path: '/obs/summary' }, { label: 'Runs', path: '/obs/runs' }];
const trail = [{ label: 'Observability', href: '#' }, { label: 'Runs' }];
const list = { label: 'runs', title: 'Runs', count: 2, body: <ul><li>Run A</li><li>Run B</li></ul> };

describe('SectionLayout', () => {
  it('draws the section rail and, with a header, the content column: trail row, title band, docked body', () => {
    const { container } = render(
      <SectionLayout title="Observability" items={items} fill="parent"
        header={{ breadcrumbs: trail, title: 'Runs', trailControls: <button type="button">Scope</button> }}
        footer={<div>composer</div>}>
        <p>record</p>
      </SectionLayout>,
    );
    const root = container.querySelector('[data-page-template="section-layout"]')!;
    expect(root.hasAttribute('data-shell-flush')).toBe(true);
    expect(root.getAttribute('data-section-layout')).toBe('section');
    expect(screen.getByRole('navigation', { name: 'Observability navigation' })).toBeTruthy();
    expect(screen.getByRole('region', { name: 'Observability workspace' })).toBeTruthy();
    const column = root.querySelector('[data-page-column]')!;
    const trailRow = column.querySelector(':scope > [data-page-trail]')!;
    expect(trailRow.textContent).toContain('Scope');
    expect(column.querySelector(':scope > [data-page-title] h1')!.textContent).toBe('Runs');
    const body = column.querySelector('[data-page-body="scroll"]')!;
    expect(body.textContent).toContain('record');
    expect(body.className).toContain('px-[var(--ui-page-gutter,1.5rem)]');
    expect(column.querySelector('[data-column-dock]')!.textContent).toBe('composer');
  });

  it('a header without a title is the trail row alone; a ColumnDock in the body docks at the column bottom', () => {
    const { container } = render(
      <SectionLayout title="Knowledge" items={items} fill="parent" header={{ breadcrumbs: trail }}>
        <ColumnDock><div>section command</div></ColumnDock>
      </SectionLayout>,
    );
    expect(container.querySelector('[data-page-trail]')).toBeTruthy();
    expect(container.querySelector('[data-page-title]')).toBeNull();
    expect(container.querySelector('[data-column-dock]')!.textContent).toBe('section command');
  });

  it('a list puts the page list as a rail beside the section rail, with its fold', () => {
    const onToggle = vi.fn();
    const { container } = render(
      <SectionLayout title="Design" items={items} fill="parent" list={list} listFold={{ folded: false, onToggle }}
        header={{ breadcrumbs: trail, title: 'Runs' }}>
        <p>record</p>
      </SectionLayout>,
    );
    expect(container.querySelector('[data-page-template="section-layout"]')!.getAttribute('data-section-layout')).toBe('list');
    expect(container.querySelector('[data-list-rail]')).toBeTruthy();
    expect(screen.getByText('Run A')).toBeTruthy();
    // The column (trail first) sits inside the list layout's pane, right of the list rail.
    expect(container.querySelector('[data-list-rail] [data-page-column] > [data-page-trail]')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Hide runs' }));
    expect(onToggle).toHaveBeenCalled();
  });

  it('railFold folds the section rail to its strip and keeps the toggle', () => {
    const onToggle = vi.fn();
    const { container, rerender } = render(
      <SectionLayout title="Org" items={items} fill="parent" railFold={{ folded: false, onToggle }} header={{ breadcrumbs: trail }}><p>x</p></SectionLayout>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Hide Org navigation' }));
    expect(onToggle).toHaveBeenCalledTimes(1);
    rerender(<SectionLayout title="Org" items={items} fill="parent" railFold={{ folded: true, onToggle }} header={{ breadcrumbs: trail }}><p>x</p></SectionLayout>);
    expect(container.querySelector('aside[data-collapsed="true"]')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Show Org navigation' })).toBeTruthy();
  });

  it('without a header the children are the column (a page template), and a footer sits under them', () => {
    const { container } = render(
      <SectionLayout title="Access" items={items} fill="parent" footer={<div>bar</div>}>
        <PageFrame title="New role" breadcrumbs={trail}><p>form</p></PageFrame>
      </SectionLayout>,
    );
    const columns = container.querySelectorAll('[data-page-column]');
    expect(columns).toHaveLength(1);
    expect(columns[0]!.getAttribute('data-page-template')).toBe('page-frame');
    expect(container.querySelector('[data-page-footer]')!.textContent).toBe('bar');
  });

  it('fills the viewport by default', () => {
    render(<SectionLayout title="Org" items={items}><p>x</p></SectionLayout>);
    expect(screen.getByTestId('section-layout-fill')).toBeTruthy();
  });
});
