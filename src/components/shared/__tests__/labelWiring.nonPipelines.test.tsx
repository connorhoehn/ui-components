// The v2.89.0 ConfigField audit fixed 106 fields across 30 pipelines node
// panels. The same three defects were live everywhere else, in the same three
// shapes:
//
//   A. a `<label>` (or a `<span>` styled like one) with no `htmlFor` that
//      wrapped no control — it labelled NOTHING;
//   B. a control with no accessible name at all, or named only by a
//      `placeholder`, which browsers use only as a last resort and which is
//      gone the moment the user types;
//   C. an `aria-label` that CONTRADICTED the visible words beside it.
//
// (C) is the nastiest: no sighted user can see the name being read aloud, so
// nobody can report the mismatch. `IngestAuditPage` had three — "Time range"
// beside a caption reading "Time", "Event type" beside "Event", "Target ID"
// beside "Target". The visible text wins.
//
// Every assertion resolves the association rather than checking an attribute
// exists — an id pointing at no element still "has an id".

import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';

import { ChatComposer } from '../ChatComposer';
import TagEditor from '../TagEditor';
import SearchInput from '../SearchInput';
import EventsPage from '../../observability/EventsPage';
import { EventStreamProvider } from '../../pipelines/context/EventStreamContext';
import { FieldDefinitionEditor } from '../../doc-types/FieldDefinitionEditor';
import type { DocumentTypeField } from '../../../types/documentType';

// ---------------------------------------------------------------------------
// B — controls with no accessible name
// ---------------------------------------------------------------------------

describe('observability EventsPage filter rail', () => {
  it('associates the two text filters with their captions', () => {
    render(<EventStreamProvider><EventsPage /></EventStreamProvider>);
    expect(screen.getByLabelText('Runs')).toBe(screen.getByTestId('events-filter-runs'));
    expect(screen.getByLabelText('Pipelines')).toBe(screen.getByTestId('events-filter-pipelines'));
  });

  it('names each checkbox set as a group so the loose boxes have context', () => {
    render(<EventStreamProvider><EventsPage /></EventStreamProvider>);
    // The captions were <div>s: a "lifecycle" checkbox announced with no hint
    // of which filter dimension it belonged to.
    const eventType = screen.getByRole('group', { name: 'Event type' });
    expect(within(eventType).getAllByRole('checkbox').length).toBeGreaterThan(0);
    expect(screen.getByRole('group', { name: 'Severity' })).toBeInTheDocument();
  });
});

describe('doc-types FieldDefinitionEditor row', () => {
  const field: DocumentTypeField = {
    id: 'f1', name: 'Agenda', sectionType: 'rich_text',
  } as DocumentTypeField;

  it('names the inline rename box and the type picker', () => {
    render(
      <FieldDefinitionEditor
        field={field}
        index={0}
        total={1}
        onRename={vi.fn()}
        onChangeType={vi.fn()}
        onRemove={vi.fn()}
        onMoveUp={vi.fn()}
        onMoveDown={vi.fn()}
        onToggleRequired={vi.fn()}
        onToggleCollapsed={vi.fn()}
      />,
    );
    // The rename box reads as plain text, so there is no visible caption to
    // associate — both controls announced anonymously in a list of sections.
    expect(screen.getByRole('textbox', { name: 'Agenda name' })).toBe(screen.getByTestId('field-name-f1'));
    expect(screen.getByRole('combobox', { name: 'Agenda type' })).toBe(screen.getByTestId('field-type-f1'));
  });

  it('falls back to a positional name while the section is unnamed', () => {
    render(
      <FieldDefinitionEditor
        field={{ ...field, name: '' }}
        index={2}
        total={3}
        onRename={vi.fn()}
        onChangeType={vi.fn()}
        onRemove={vi.fn()}
        onMoveUp={vi.fn()}
        onMoveDown={vi.fn()}
        onToggleRequired={vi.fn()}
        onToggleCollapsed={vi.fn()}
      />,
    );
    expect(screen.getByRole('textbox', { name: 'Section 3 name' })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// B — shared primitives whose field is rendered internally
// ---------------------------------------------------------------------------

describe('ChatComposer', () => {
  it('names the message field, which a host cannot wrap in its own label', () => {
    render(<ChatComposer value="" onChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeInTheDocument();
  });

  it('accepts a host-supplied name and an external labelling element', () => {
    const { rerender } = render(
      <ChatComposer value="" onChange={vi.fn()} onSubmit={vi.fn()} aria-label="Reply to thread" />,
    );
    expect(screen.getByRole('textbox', { name: 'Reply to thread' })).toBeInTheDocument();

    rerender(
      <>
        <span id="composer-cap">Comment</span>
        <ChatComposer value="" onChange={vi.fn()} onSubmit={vi.fn()} aria-labelledby="composer-cap" />
      </>,
    );
    expect(screen.getByRole('textbox', { name: 'Comment' })).toBeInTheDocument();
  });

  it('names the send button when its label is only a glyph', () => {
    render(<ChatComposer value="hi" onChange={vi.fn()} onSubmit={vi.fn()} />);
    // Default submitLabel is '→', which announces as nothing useful.
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('lets a worded submitLabel name the button itself, with no override', () => {
    render(<ChatComposer value="hi" onChange={vi.fn()} onSubmit={vi.fn()} submitLabel="Post" />);
    // The visible text wins — an aria-label of "Send" here would be exactly
    // the contradiction this audit exists to remove.
    expect(screen.getByRole('button', { name: 'Post' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Send' })).toBeNull();
  });
});

describe('TagEditor / SearchInput keep a name after the placeholder disappears', () => {
  it('names the TagEditor draft box even with the placeholder blanked', () => {
    render(<TagEditor value={[]} onChange={vi.fn()} placeholder="" />);
    expect(screen.getByRole('textbox', { name: 'Add tag' })).toBe(screen.getByTestId('tag-editor-input'));
  });

  it('keeps the SearchInput named once a query is typed', () => {
    render(<SearchInput value="pipeline" onChange={vi.fn()} placeholder="Search events…" />);
    // A placeholder is only a last-resort name and is not rendered at all when
    // the field has a value; the mirrored aria-label survives.
    expect(screen.getByRole('textbox', { name: 'Search events…' })).toBeInTheDocument();
  });
});
