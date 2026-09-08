// Editor → reader round-trips.
//
// The per-renderer suites test each half against a hand-written fixture: the
// editor is driven and its callback payload inspected, and separately the
// reader is handed a metadata object typed out in the test. Nothing checks
// that the shape the editor WRITES is the shape the reader READS — so a
// rename on one side (fileDataUrl → fileUrl, links → items) would leave both
// suites green while every real document rendered its empty state.
//
// These tests close that loop: drive the editor's own UI, apply the patch it
// emits to the section, then render the reader from that section and assert
// the content shows up. No fixture is typed by hand.

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import type { Section, TaskItem } from '../../types/document';

import FileUploadEditorRenderer from '../file-upload/FileUploadEditorRenderer';
import FileUploadReaderRenderer from '../file-upload/FileUploadReaderRenderer';
import DiagramEditorRenderer from '../diagram/DiagramEditorRenderer';
import DiagramReaderRenderer from '../diagram/DiagramReaderRenderer';
import LinkBlockEditorRenderer from '../link-block/LinkBlockEditorRenderer';
import LinkBlockReaderRenderer from '../link-block/LinkBlockReaderRenderer';
import ChecklistEditorRenderer from '../checklist/ChecklistEditorRenderer';
import ChecklistReaderRenderer from '../checklist/ChecklistReaderRenderer';
import TasksEditorRenderer from '../tasks/TasksEditorRenderer';
import TasksReaderRenderer from '../tasks/TasksReaderRenderer';
import DecisionsEditorRenderer from '../decisions/DecisionsEditorRenderer';
import DecisionsReaderRenderer from '../decisions/DecisionsReaderRenderer';
import TextEditorRenderer from '../text/TextEditorRenderer';
import TextReaderRenderer from '../text/TextReaderRenderer';
import DateEditorRenderer from '../date/DateEditorRenderer';
import DateReaderRenderer from '../date/DateReaderRenderer';
import NumberEditorRenderer from '../number/NumberEditorRenderer';
import NumberReaderRenderer from '../number/NumberReaderRenderer';
import BooleanEditorRenderer from '../boolean/BooleanEditorRenderer';
import BooleanReaderRenderer from '../boolean/BooleanReaderRenderer';

const mkSection = (over: Partial<Section> = {}): Section => ({
  id: 's1', type: 'custom', title: 'S', collapsed: false, items: [], ...over,
});

const mkItem = (o: Partial<TaskItem> & { id: string; text: string }): TaskItem => ({
  status: 'pending', assignee: '', ackedBy: '', ackedAt: '', priority: 'medium', notes: '', ...o,
});

/** Applies a renderer's section patch the way a host document would. */
function applyPatch(section: Section, patch: Partial<Section>): Section {
  return { ...section, ...patch };
}

describe('file-upload: what the editor stores is what the reader downloads', () => {
  it('round-trips a chosen file into a working download link', async () => {
    let section = mkSection({ sectionType: 'file-upload' });
    const onUpdateSection = vi.fn((patch: Partial<Section>) => {
      section = applyPatch(section, patch);
    });

    const { unmount } = render(
      <FileUploadEditorRenderer
        section={section} viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );

    const file = new File(['hello world'], 'quarterly-report.pdf', { type: 'application/pdf' });
    await act(async () => {
      fireEvent.change(screen.getByTestId('file-upload-input-s1'), { target: { files: [file] } });
    });
    await waitFor(() => expect(onUpdateSection).toHaveBeenCalled());
    unmount();

    render(<FileUploadReaderRenderer section={section} viewMode="reader" editable={false} />);

    // Not the empty state — the reader found what the editor wrote.
    expect(screen.queryByTestId('file-upload-reader-empty-s1')).not.toBeInTheDocument();
    const link = screen.getByTestId('file-upload-link-s1');
    expect(link).toHaveTextContent('Download quarterly-report.pdf');
    expect(link).toHaveAttribute('download', 'quarterly-report.pdf');
    expect(link.getAttribute('href')).toMatch(/^data:application\/pdf/);
    expect(screen.getByText(`(${(file.size / 1024).toFixed(1)} kB)`)).toBeInTheDocument();
  });

  it('clearing in the editor returns the reader to its empty state', async () => {
    let section = mkSection({
      sectionType: 'file-upload',
      metadata: { fileName: 'old.pdf', fileDataUrl: 'data:text/plain;base64,b2xk', fileSize: 3 },
    });
    const onUpdateSection = (patch: Partial<Section>) => { section = applyPatch(section, patch); };

    const { unmount } = render(
      <FileUploadEditorRenderer
        section={section} viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.click(screen.getByTestId('file-upload-remove-s1'));
    unmount();

    render(<FileUploadReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('file-upload-reader-empty-s1')).toBeInTheDocument();
  });
});

describe('diagram: what the editor stores is what the reader displays', () => {
  it('round-trips an uploaded image plus its alt text into the figure', async () => {
    let section = mkSection({ sectionType: 'diagram' });
    const onUpdateSection = vi.fn((patch: Partial<Section>) => {
      section = applyPatch(section, patch);
    });

    const editor = render(
      <DiagramEditorRenderer
        section={section} viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );

    const img = new File(['PNG'], 'architecture.png', { type: 'image/png' });
    await act(async () => {
      fireEvent.change(screen.getByTestId('diagram-input-s1'), { target: { files: [img] } });
    });
    await waitFor(() => expect(onUpdateSection).toHaveBeenCalled());

    // Re-render the editor over the stored section so the alt field appears,
    // then edit the alt text — that is a second write the reader must pick up.
    editor.rerender(
      <DiagramEditorRenderer
        section={section} viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.change(screen.getByTestId('diagram-alt-s1'), {
      target: { value: 'Service topology' },
    });
    editor.unmount();

    render(<DiagramReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.queryByTestId('diagram-reader-empty-s1')).not.toBeInTheDocument();
    const rendered = screen.getByRole('img');
    expect(rendered.getAttribute('src')).toMatch(/^data:image\/png/);
    expect(rendered).toHaveAttribute('alt', 'Service topology');
    // The alt doubles as the caption.
    expect(screen.getByText('Service topology')).toBeInTheDocument();
  });

  it('defaults the alt text to the file name so the reader is never unlabelled', async () => {
    let section = mkSection({ sectionType: 'diagram' });
    const onUpdateSection = vi.fn((patch: Partial<Section>) => {
      section = applyPatch(section, patch);
    });
    const { unmount } = render(
      <DiagramEditorRenderer
        section={section} viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    await act(async () => {
      fireEvent.change(screen.getByTestId('diagram-input-s1'), {
        target: { files: [new File(['x'], 'flow.svg', { type: 'image/svg+xml' })] },
      });
    });
    await waitFor(() => expect(onUpdateSection).toHaveBeenCalled());
    unmount();

    render(<DiagramReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'flow.svg');
  });
});

describe('link-block: rows added in the editor become links in the reader', () => {
  it('round-trips two link rows', () => {
    let section = mkSection({ sectionType: 'link-block' });
    const onUpdateSection = (patch: Partial<Section>) => { section = applyPatch(section, patch); };

    const editor = render(
      <LinkBlockEditorRenderer
        section={section} viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    const rerender = () => editor.rerender(
      <LinkBlockEditorRenderer
        section={section} viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );

    fireEvent.click(screen.getByTestId('link-block-add-s1'));
    rerender();
    fireEvent.change(screen.getByTestId('link-block-label-s1-0'), { target: { value: 'Runbook' } });
    rerender();
    fireEvent.change(screen.getByTestId('link-block-url-s1-0'), { target: { value: 'https://runbook.test' } });
    rerender();

    fireEvent.click(screen.getByTestId('link-block-add-s1'));
    rerender();
    // Second row deliberately has no label — the reader must fall back to the
    // URL rather than rendering an empty anchor nobody can click.
    fireEvent.change(screen.getByTestId('link-block-url-s1-1'), { target: { value: 'https://dash.test' } });
    editor.unmount();

    render(<LinkBlockReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.queryByTestId('link-block-reader-empty-s1')).not.toBeInTheDocument();
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('Runbook');
    expect(links[0]).toHaveAttribute('href', 'https://runbook.test');
    expect(links[1]).toHaveTextContent('https://dash.test');
  });

  it('a row the author never gave a URL is not shown to the reader', () => {
    let section = mkSection({ sectionType: 'link-block' });
    const onUpdateSection = (patch: Partial<Section>) => { section = applyPatch(section, patch); };
    const editor = render(
      <LinkBlockEditorRenderer
        section={section} viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.click(screen.getByTestId('link-block-add-s1'));
    editor.unmount();

    render(<LinkBlockReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('link-block-reader-empty-s1')).toBeInTheDocument();
  });

  it('removing a row in the editor removes the link from the reader', () => {
    let section = mkSection({
      sectionType: 'link-block',
      metadata: { links: [{ label: 'Keep', url: 'https://keep.test' }, { label: 'Drop', url: 'https://drop.test' }] },
    });
    const onUpdateSection = (patch: Partial<Section>) => { section = applyPatch(section, patch); };
    const editor = render(
      <LinkBlockEditorRenderer
        section={section} viewMode="editor" editable onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.click(screen.getByTestId('link-block-remove-s1-1'));
    editor.unmount();

    render(<LinkBlockReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByText('Keep')).toBeInTheDocument();
  });
});

/**
 * Runs the item-list renderers through the same loop: the editor emits item
 * mutations, a host applies them, the reader renders the result.
 */
function itemHost(initial: TaskItem[]) {
  let items = initial;
  return {
    get section() { return mkSection({ type: 'tasks', items }); },
    onAddItem: (item: Omit<TaskItem, 'id'>) => {
      items = [...items, { ...item, id: `gen-${items.length}` }];
    },
    onUpdateItem: (id: string, patch: Partial<TaskItem>) => {
      items = items.map((i) => (i.id === id ? { ...i, ...patch } : i));
    },
    onRemoveItem: (id: string) => { items = items.filter((i) => i.id !== id); },
  };
}

describe('checklist: edits in the editor drive the reader progress bar', () => {
  it('ticking items in the editor is reflected in the reader count', () => {
    const host = itemHost([
      mkItem({ id: 'a', text: 'Draft the RFC' }),
      mkItem({ id: 'b', text: 'Get sign-off' }),
    ]);
    const editor = render(
      <ChecklistEditorRenderer
        section={host.section} viewMode="editor" editable
        onAddItem={host.onAddItem} onUpdateItem={host.onUpdateItem} onRemoveItem={host.onRemoveItem}
      />,
    );
    // Editor shows 0/2 before any tick.
    expect(screen.getByText('0 / 2 done')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    editor.unmount();

    render(<ChecklistReaderRenderer section={host.section} viewMode="reader" editable={false} />);
    expect(screen.getByText('1 / 2 done')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    // The ticked item reads as done on the reader side too.
    expect(screen.getByText('Draft the RFC').className).toContain('line-through');
  });

  it('an item added and typed in the editor appears in the reader', () => {
    const host = itemHost([]);
    const editor = render(
      <ChecklistEditorRenderer
        section={host.section} viewMode="editor" editable
        onAddItem={host.onAddItem} onUpdateItem={host.onUpdateItem} onRemoveItem={host.onRemoveItem}
      />,
    );
    fireEvent.click(screen.getByText('+ Add item'));
    editor.rerender(
      <ChecklistEditorRenderer
        section={host.section} viewMode="editor" editable
        onAddItem={host.onAddItem} onUpdateItem={host.onUpdateItem} onRemoveItem={host.onRemoveItem}
      />,
    );
    fireEvent.change(screen.getByPlaceholderText('Checklist item...'), {
      target: { value: 'Book the room' },
    });
    editor.unmount();

    render(<ChecklistReaderRenderer section={host.section} viewMode="reader" editable={false} />);
    expect(screen.getByText('Book the room')).toBeInTheDocument();
    expect(screen.queryByText('No items.')).not.toBeInTheDocument();
  });
});

describe('tasks: items added in the editor show up in the reader', () => {
  it('round-trips an added task', () => {
    const host = itemHost([]);
    const props = {
      viewMode: 'editor' as const, editable: true,
      onAddItem: host.onAddItem, onUpdateItem: host.onUpdateItem, onRemoveItem: host.onRemoveItem,
    };
    const editor = render(<TasksEditorRenderer section={host.section} {...props} />);
    fireEvent.click(screen.getByText('+ Add item'));
    editor.rerender(<TasksEditorRenderer section={host.section} {...props} />);
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Ship the release' } });
    editor.unmount();

    render(<TasksReaderRenderer section={host.section} viewMode="reader" editable={false} />);
    expect(screen.getByText('Ship the release')).toBeInTheDocument();
    expect(screen.queryByText('No items.')).not.toBeInTheDocument();
  });

  it('a status set in the reader survives back into the editor', () => {
    const host = itemHost([mkItem({ id: 'a', text: 'Review PR' })]);
    const reader = render(
      <TasksReaderRenderer
        section={host.section} viewMode="reader" editable={false} onUpdateItem={host.onUpdateItem}
      />,
    );
    fireEvent.click(screen.getByTitle('Status: pending — click to toggle done'));
    reader.unmount();

    render(<TasksEditorRenderer section={host.section} viewMode="editor" editable />);
    expect(screen.getByDisplayValue('Review PR')).toBeInTheDocument();
    // Round-tripped as done, not silently dropped.
    expect(host.section.items[0].status).toBe('done');
  });
});

describe('decisions: a decision recorded in the editor lands in the right reader group', () => {
  it('round-trips a vetoed decision', () => {
    const host = itemHost([mkItem({ id: 'a', text: 'Adopt gRPC' })]);
    const props = {
      viewMode: 'editor' as const, editable: true,
      onAddItem: host.onAddItem, onUpdateItem: host.onUpdateItem, onRemoveItem: host.onRemoveItem,
    };
    // The editor mirrors terminal transitions to the approvals API; stub it so
    // the round-trip does not depend on the network.
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200 }));

    const editor = render(<DecisionsEditorRenderer section={host.section} {...props} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'rejected' } });
    editor.unmount();
    vi.unstubAllGlobals();

    render(<DecisionsReaderRenderer section={host.section} viewMode="reader" editable={false} />);
    expect(screen.getByText('Adopt gRPC')).toBeInTheDocument();
    // "Vetoed" appears twice: the group header and the per-row badge.
    expect(screen.getAllByText('Vetoed')).toHaveLength(2);
    expect(screen.queryByText('Open')).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Scalar fields — text / date / number / boolean
//
// Same closed loop: drive the real control, apply the patch the editor emits,
// render the reader from the resulting section. A rename of the metadata key
// on one side (value -> text, say) leaves both per-type suites green and every
// real Invoice showing "No date set".
// ---------------------------------------------------------------------------

describe('scalar fields: what the editor stores is what the reader shows', () => {
  it('text round-trips a typed answer, and clearing returns the empty state', () => {
    let section = mkSection({ sectionType: 'text', title: 'Severity' });
    const onUpdateSection = (patch: Partial<Section>) => { section = applyPatch(section, patch); };

    const editor = render(
      <TextEditorRenderer section={section} viewMode="editor" editable onUpdateSection={onUpdateSection} />,
    );
    fireEvent.change(screen.getByTestId('text-field-input-s1'), { target: { value: 'Critical' } });
    editor.unmount();

    const reader = render(<TextReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('text-field-reader-s1')).toHaveTextContent('Critical');
    reader.unmount();

    const editor2 = render(
      <TextEditorRenderer section={section} viewMode="editor" editable onUpdateSection={onUpdateSection} />,
    );
    fireEvent.change(screen.getByTestId('text-field-input-s1'), { target: { value: '' } });
    editor2.unmount();

    render(<TextReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('text-field-empty-s1')).toBeInTheDocument();
  });

  it('date round-trips a picked date, and Clear returns the empty state', () => {
    let section = mkSection({ sectionType: 'date', title: 'Due Date' });
    const onUpdateSection = (patch: Partial<Section>) => { section = applyPatch(section, patch); };

    const editor = render(
      <DateEditorRenderer section={section} viewMode="editor" editable onUpdateSection={onUpdateSection} />,
    );
    fireEvent.change(screen.getByTestId('date-field-input-s1'), { target: { value: '2026-03-04' } });
    editor.unmount();

    const reader = render(<DateReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('date-field-reader-s1')).toHaveAttribute('datetime', '2026-03-04');
    reader.unmount();

    const editor2 = render(
      <DateEditorRenderer section={section} viewMode="editor" editable onUpdateSection={onUpdateSection} />,
    );
    fireEvent.click(screen.getByTestId('date-field-clear-s1'));
    editor2.unmount();

    render(<DateReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('date-field-empty-s1')).toBeInTheDocument();
  });

  it('number round-trips a typed amount, and emptying returns the empty state', () => {
    let section = mkSection({ sectionType: 'number', title: 'Deal Value' });
    const onUpdateSection = (patch: Partial<Section>) => { section = applyPatch(section, patch); };

    const editor = render(
      <NumberEditorRenderer section={section} viewMode="editor" editable onUpdateSection={onUpdateSection} />,
    );
    fireEvent.change(screen.getByTestId('number-field-input-s1'), { target: { value: '2500' } });
    editor.unmount();

    const reader = render(<NumberReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('number-field-reader-s1')).toHaveTextContent('2,500');
    reader.unmount();

    const editor2 = render(
      <NumberEditorRenderer section={section} viewMode="editor" editable onUpdateSection={onUpdateSection} />,
    );
    fireEvent.change(screen.getByTestId('number-field-input-s1'), { target: { value: '' } });
    editor2.unmount();

    render(<NumberReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('number-field-empty-s1')).toBeInTheDocument();
  });

  it('boolean round-trips unanswered -> Yes -> No -> unanswered', () => {
    let section = mkSection({ sectionType: 'boolean', title: 'SOC2 Compliant' });
    const onUpdateSection = (patch: Partial<Section>) => { section = applyPatch(section, patch); };
    const drive = () => render(
      <BooleanEditorRenderer section={section} viewMode="editor" editable onUpdateSection={onUpdateSection} />,
    );

    let editor = drive();
    fireEvent.click(screen.getByTestId('boolean-field-input-s1'));
    editor.unmount();
    let reader = render(<BooleanReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('boolean-field-reader-s1')).toHaveTextContent('Yes');
    reader.unmount();

    editor = drive();
    fireEvent.click(screen.getByTestId('boolean-field-input-s1'));
    editor.unmount();
    reader = render(<BooleanReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('boolean-field-reader-s1')).toHaveTextContent('No');
    reader.unmount();

    editor = drive();
    fireEvent.click(screen.getByTestId('boolean-field-clear-s1'));
    editor.unmount();
    render(<BooleanReaderRenderer section={section} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('boolean-field-empty-s1')).toBeInTheDocument();
  });
});
