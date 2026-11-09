import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ListRailLayout } from '../ListRailLayout';
import { MasterDetailPage } from '../../shared/MasterDetailPage';
import { DetailSection } from '../../shared/DetailSection';
import { T } from '../../shared/Text';

afterEach(cleanup);

describe('ListRailLayout narrow form (2.515.1)', () => {
  const list = { title: 'Sessions', count: 2, label: 'sessions', body: <ul><li>row</li></ul> };
  it('omitted: no size container, no narrow classes, no back control', () => {
    render(<ListRailLayout list={list} header={<h1>Logging</h1>}><p>record</p></ListRailLayout>);
    expect(screen.queryByTestId('explorer-layout-container')).toBeNull();
    expect(screen.getByTestId('explorer-layout').className).not.toContain('@max-[40rem]');
    expect(screen.getByTestId('explorer-layout-rail').className).not.toContain('@max-[40rem]');
    expect(screen.queryByTestId('explorer-layout-narrow-back')).toBeNull();
  });
  it('list: the frame is a size container whose rail fills the width under the header; the record body is hidden', () => {
    render(<ListRailLayout list={list} header={<h1>Logging</h1>} footer={<textarea aria-label="Composer" />} narrow={{ showing: 'list', onBack: () => undefined }}><p>record</p></ListRailLayout>);
    expect(screen.getByTestId('explorer-layout-container').className).toContain('@container');
    const frame = screen.getByTestId('explorer-layout');
    expect(frame.getAttribute('data-narrow')).toBe('list');
    expect(frame.className).toContain('@max-[40rem]:flex-col');
    const rail = screen.getByTestId('explorer-layout-rail').className;
    expect(rail).toContain('@max-[40rem]:w-full');
    expect(rail).toContain('@max-[40rem]:flex-1');
    expect(rail).not.toContain('@max-[40rem]:hidden');
    // The header column comes first and keeps only the header.
    expect(frame.querySelector('[data-narrow-part="pane"]')!.className).toContain('@max-[40rem]:order-first');
    // The header column keeps the row's width (a flex-none ROW child would size to its widest line).
    expect(screen.getByTestId('explorer-layout-pane-column').className).not.toContain('flex-none');
    expect(screen.getByTestId('explorer-layout-pane').className).toContain('@max-[40rem]:hidden');
    expect(screen.getByTestId('explorer-layout-pane-footer').className).toContain('@max-[40rem]:hidden');
    expect(screen.getByRole('heading', { name: 'Logging' })).toBeTruthy();
    expect(screen.queryByTestId('explorer-layout-narrow-back')).toBeNull();
  });
  it('record: the rail is hidden under 40rem and a back control (shown only there) calls onBack', () => {
    const onBack = vi.fn();
    render(<ListRailLayout list={list} header={<h1>Logging</h1>} narrow={{ showing: 'record', onBack, backLabel: 'All sessions' }}><p>record</p></ListRailLayout>);
    expect(screen.getByTestId('explorer-layout-rail').className).toContain('@max-[40rem]:hidden');
    expect(screen.getByTestId('explorer-layout-pane').className).not.toContain('@max-[40rem]:hidden');
    expect(screen.getByTestId('explorer-layout-narrow-back-row').className).toContain('@min-[40rem]:hidden');
    fireEvent.click(screen.getByRole('button', { name: 'All sessions' }));
    expect(onBack).toHaveBeenCalledTimes(1);
    // A control's type step (12 or 14px): the rail's 13px back-link size is not one.
    expect(screen.getByTestId('explorer-layout-narrow-back').className).toContain('text-sm');
    expect(screen.getByTestId('explorer-layout-narrow-back').className).not.toContain('text-[13px]');
    // The back row sits above the header in the pane column.
    const column = screen.getByTestId('explorer-layout-pane-column');
    expect(column.firstElementChild).toBe(screen.getByTestId('explorer-layout-narrow-back-row'));
  });
  it('MasterDetailPage derives the side from its selection', () => {
    const { rerender } = render(<MasterDetailPage title="Logging" list={list} narrow={{ onBack: () => undefined }}>{null}</MasterDetailPage>);
    expect(screen.getByTestId('explorer-layout').getAttribute('data-narrow')).toBe('list');
    rerender(<MasterDetailPage title="Logging" list={list} narrow={{ onBack: () => undefined }}><p>record</p></MasterDetailPage>);
    expect(screen.getByTestId('explorer-layout').getAttribute('data-narrow')).toBe('record');
    expect(screen.getByRole('button', { name: 'Back to the list' })).toBeTruthy();
  });
});

describe('T status tones and DetailSection caption (2.515.1)', () => {
  it('T tone success / warning / danger map to the status ink tokens', () => {
    render(<><T tone="success">Saved.</T><T tone="warning">Slow</T><T tone="danger">Could not save</T></>);
    expect(screen.getByText('Saved.').closest('[data-ui-layout]')!.className).toContain('text-success');
    expect(screen.getByText('Slow').closest('[data-ui-layout]')!.className).toContain('text-warning');
    expect(screen.getByText('Could not save').closest('[data-ui-layout]')!.className).toContain('text-danger');
  });
  it('DetailSection label caption is the SectionLabel caption (12px bold caps), as the given heading level', () => {
    render(<DetailSection title="Events" as="h2" first><p>x</p></DetailSection>);
    const h = screen.getByRole('heading', { name: 'Events', level: 2 });
    expect(h.className).toContain('font-bold');
    expect(h.className).toContain('text-[12px]');
    expect(h.className).not.toContain('font-semibold');
  });
});
