import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageFrame } from './PageFrame';
import { ColumnDock } from '../layout/DockedColumn';

describe('PageFrame', () => {
  it('draws the trail, the title, the actions and the body under one template marker', () => {
    const { container } = render(
      <PageFrame title="New connector" breadcrumbs={[{ label: 'Connectors', href: '/c' }, { label: 'New' }]} actions={<button type="button">Save</button>}>
        <p>form body</p>
      </PageFrame>,
    );
    const root = container.querySelector('[data-page-template="page-frame"]')!;
    expect(root).toBeTruthy();
    expect(root.className).toContain('h-full');
    expect(root.className).toContain('min-h-0');
    expect(root.hasAttribute('data-shell-flush')).toBe(true);
    expect(screen.getByRole('heading', { name: 'New connector' })).toBeTruthy();
    expect(screen.getByText('Connectors')).toBeTruthy();
    expect(screen.getByText('Save')).toBeTruthy();
    expect(screen.getByText('form body')).toBeTruthy();
  });

  it('scrolls the body, not the page, at the page gutter', () => {
    const { container } = render(<PageFrame title="T"><p>x</p></PageFrame>);
    const body = container.querySelector('[data-page-body]')!;
    expect(body.getAttribute('data-page-body')).toBe('scroll');
    expect(body.className).toContain('overflow-auto');
    expect(body.className).toContain('px-[var(--ui-page-gutter,1.5rem)]');
    expect(container.querySelector('[data-page-template]')!.className).not.toContain('overflow-auto');
  });

  it('fill mode hands scrolling to the children, docks a footer, and drops the gutter on request', () => {
    const { container } = render(<PageFrame title="T" body="fill" gutter="none" footer={<div>save bar</div>}><p>x</p></PageFrame>);
    const body = container.querySelector('[data-page-body]')!;
    expect(body.getAttribute('data-page-body')).toBe('fill');
    expect(body.className).toContain('overflow-hidden');
    expect(body.className).not.toContain('--ui-page-gutter');
    expect(container.querySelector('[data-page-footer]')!.textContent).toBe('save bar');
  });

  it('marks the column and the header for the DOM audit, and keeps the 2.501.0 header without trail-row props', () => {
    const { container } = render(<PageFrame title="T" breadcrumbs={[{ label: 'A' }, { label: 'T' }]}><p>x</p></PageFrame>);
    const root = container.querySelector('[data-page-template="page-frame"]')!;
    expect(root.hasAttribute('data-page-column')).toBe(true);
    expect(root.querySelector(':scope > [data-page-header]')).toBeTruthy();
    expect(root.querySelector('[data-page-trail]')).toBeNull();
    expect(root.querySelector('[data-page-title]')).toBeNull();
  });

  it('titleAs sets the heading level', () => {
    render(<PageFrame title="Embedded" titleAs="h2"><p>x</p></PageFrame>);
    expect(screen.getByRole('heading', { name: 'Embedded', level: 2 })).toBeTruthy();
  });

  it('trailControls put controls on the trail row, with the title band under it', () => {
    const { container } = render(
      <PageFrame title="Communication" breadcrumbs={[{ label: 'Org', href: '#' }, { label: 'Communication' }]}
        trailControls={<button type="button">Scope</button>} trailLink={{ label: 'Docs', href: '/docs' }}>
        <p>x</p>
      </PageFrame>,
    );
    const root = container.querySelector('[data-page-template="page-frame"]')!;
    const trail = root.querySelector(':scope > [data-page-trail]')!;
    expect(trail).toBeTruthy();
    expect(trail.textContent).toContain('Org');
    expect(trail.textContent).toContain('Scope');
    expect(trail.textContent).toContain('Docs');
    const band = root.querySelector(':scope > [data-page-title]')!;
    expect(band.className).toContain('px-[var(--ui-page-gutter,1.5rem)]');
    expect(band.querySelector('h1')!.textContent).toBe('Communication');
    expect(trail.compareDocumentPosition(band) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed folds the title into the trail and draws no title band', () => {
    let toggled = 0;
    const { container } = render(
      <PageFrame title="General" breadcrumbs={[{ label: 'Social' }, { label: 'Channels' }]} collapsed onToggleCollapsed={() => { toggled++; }}>
        <p>x</p>
      </PageFrame>,
    );
    expect(container.querySelector('[data-page-title]')).toBeNull();
    const trail = container.querySelector('[data-page-trail]')!;
    expect(trail.getAttribute('data-collapsed')).toBe('true');
    expect(trail.textContent).toContain('General');
    fireEvent.click(screen.getByRole('button', { name: /expand header/i }));
    expect(toggled).toBe(1);
  });

  it('body="docked" scrolls the body over a dock that holds the footer and any ColumnDock in the body', () => {
    const { container } = render(
      <PageFrame title="T" body="docked" footer={<div>composer</div>}>
        <p>x</p>
        <ColumnDock><div>section command</div></ColumnDock>
      </PageFrame>,
    );
    const body = container.querySelector('[data-page-body="docked"]')!;
    expect(body.hasAttribute('data-docked-column-body')).toBe(true);
    expect(body.className).toContain('overflow-auto');
    const dock = container.querySelector('[data-column-dock]')!;
    expect(dock.textContent).toContain('composer');
    expect(dock.textContent).toContain('section command');
    expect(body.textContent).not.toContain('composer');
    expect(container.querySelector('[data-page-footer]')).toBeNull();
  });

  it('dockedBody="fill" makes the docked body a fixed frame', () => {
    const { container } = render(<PageFrame title="T" body="docked" dockedBody="fill"><p>x</p></PageFrame>);
    const body = container.querySelector('[data-page-body="docked"]')!;
    expect(body.className).toContain('overflow-hidden');
    expect(body.className).not.toContain('overflow-auto');
  });

  it('bodyGutter drops the body inset while the header keeps it', () => {
    const { container } = render(<PageFrame title="T" body="docked" bodyGutter="none" trailControls={<span>c</span>}><p>x</p></PageFrame>);
    expect(container.querySelector('[data-page-body]')!.className).not.toContain('--ui-page-gutter');
    expect(container.querySelector('[data-page-title]')!.className).toContain('--ui-page-gutter');
  });
});
