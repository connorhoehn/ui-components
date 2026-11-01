import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { useState } from 'react';
import { DataTable } from '../../shared/DataTable';
import { ExplorerLayout } from '../ExplorerLayout';
import { SidePane, SidePaneProvider, SidePaneSplit, useSidePaneHost } from '../SidePane';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });
beforeEach(() => localStorage.clear());
function width(value: number) {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: value, height: 800, right: value, bottom: 800, x: 0, y: 0, toJSON: () => ({}) });
}
function Rail() {
  const [folded, setFolded] = useState(false);
  return <ExplorerLayout rail="Items" railTitle="Work" railLabel="work items" railResize={{ storageKey: 'test.rail' }}
    railCollapsed={folded} onToggleRail={() => setFolded(!folded)}><input aria-label="Draft" defaultValue="Keep this draft" /></ExplorerLayout>;
}
it('widens, keyboard-resizes and remembers a rail while folding keeps the main content mounted', () => {
  width(1200);
  const view = render(<Rail />);
  const draft = screen.getByLabelText('Draft');
  fireEvent.click(screen.getByRole('button', { name: 'Widen work items' }));
  expect(localStorage.getItem('test.rail')).toBe('560');
  fireEvent.keyDown(screen.getByRole('separator', { name: 'Resize work items' }), { key: 'ArrowLeft' });
  expect(Number(localStorage.getItem('test.rail'))).toBeLessThan(560);
  fireEvent.click(screen.getByRole('button', { name: 'Hide work items' }));
  expect(screen.queryByRole('separator')).toBeNull();
  expect(screen.getByLabelText('Draft')).toBe(draft);
  fireEvent.click(screen.getByRole('button', { name: 'Show work items' }));
  expect(screen.getByLabelText('Draft')).toBe(draft);
  view.unmount(); render(<Rail />);
  expect(screen.getByRole('button', { name: 'Reset work items width' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Reset work items width' }));
  expect(localStorage.getItem('test.rail')).toBe('300');
});
function Document() {
  const host = useSidePaneHost();
  return <><button onClick={host.reveal}>Preview</button><input aria-label="Unsent text" defaultValue="Still here" />
    <SidePane title="Brief" presentation="document" widthPx={{ min: 960, max: 1280 }}><p>Document text</p></SidePane></>;
}
it.each([900, 1680])('gives a document usable space at %ipx without discarding the page', value => {
  width(value);
  render(<SidePaneProvider defaultOpen={false}><SidePaneSplit><Document /></SidePaneSplit></SidePaneProvider>);
  const draft = screen.getByLabelText('Unsent text');
  fireEvent.click(screen.getByText('Preview'));
  expect(screen.getByText('Document text')).toBeVisible();
  expect(screen.queryByRole('heading', { level: 1, name: 'Brief' }) !== null).toBe(value === 900);
  expect(screen.getByTestId('side-pane-split-primary').hidden).toBe(value === 900);
  fireEvent.click(screen.getByRole('button', { name: 'Collapse brief' }));
  expect(screen.getByLabelText('Unsent text')).toBe(draft);
  expect(draft).toBeVisible();
});

it('document tables declare their wrapping row profile', () => {
  const columns = [{ key: 'text', header: 'Text' }];
  const { container, rerender } = render(<DataTable rowHeight="content" data={[{ text: 'A long document paragraph' }]} columns={columns} keyField={row => row.text} />);
  expect(container.querySelector('table')).toHaveAttribute('data-ui-table-rows', 'content');
  rerender(<DataTable data={[{ text: 'A row' }]} columns={columns} keyField={row => row.text} />);
  expect(container.querySelector('table')).toHaveAttribute('data-ui-table-rows', 'fixed');
});
