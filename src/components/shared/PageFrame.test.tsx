import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageFrame } from './PageFrame';

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
});
