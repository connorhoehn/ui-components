// Crash resistance: a section renderer that throws must not blank the document.
//
// Section renderers are handed data straight off the Yjs CRDT and the host
// API, and TypeScript's types are erased at runtime — an unknown item status,
// a missing `items` array or a null entry in a list have all produced a throw
// from inside a renderer. Without a boundary, React unmounts the nearest
// mounted tree, which is the whole SectionList: every *well-formed* section
// disappears too and the user is left with an empty document.
//
// SectionBlock now scopes an ErrorBoundary around the renderer, so the damage
// is confined to the one section that actually has bad data.

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import * as Y from 'yjs';
import SectionList from '../SectionList';
import { registerRenderer } from '../../../renderers';
import type { Section } from '../../../types/document';
import type { SectionRendererProps } from '../../../renderers/types';

function GoodRenderer({ section }: SectionRendererProps) {
  return <div data-testid="good-renderer">rendered {section.title}</div>;
}

function ThrowingRenderer(): never {
  throw new TypeError("Cannot read properties of undefined (reading 'color')");
}

beforeAll(() => {
  registerRenderer('crash-test-ok', 'editor', GoodRenderer);
  registerRenderer('crash-test-boom', 'editor', ThrowingRenderer as unknown as typeof GoodRenderer);
});

// Both React and the boundary log the caught error; keep the suite output
// readable without swallowing genuine failures elsewhere.
afterEach(() => {
  vi.restoreAllMocks();
});

const mkSection = (id: string, sectionType: string): Section => ({
  id,
  type: 'custom',
  title: `section ${id}`,
  collapsed: false,
  items: [],
  sectionType,
});

function renderDoc(sections: Section[]) {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  return render(
    <SectionList
      sections={sections}
      getSectionFragment={() => null}
      ydoc={new Y.Doc()}
      provider={null}
      user={{ name: 'me', color: '#000000' }}
      editable
      onUpdateSection={vi.fn()}
      onAddItem={vi.fn()}
      onUpdateItem={vi.fn()}
      onRemoveItem={vi.fn()}
    />,
  );
}

describe('SectionBlock — renderer error boundary', () => {
  it('keeps every well-formed section when one section renderer throws', () => {
    renderDoc([
      mkSection('a', 'crash-test-ok'),
      mkSection('bad', 'crash-test-boom'),
      mkSection('c', 'crash-test-ok'),
    ]);

    // The good sections still render — this is what the crash used to destroy.
    expect(screen.getByText('rendered section a')).toBeInTheDocument();
    expect(screen.getByText('rendered section c')).toBeInTheDocument();
    // Two good sections rendered, not zero.
    expect(screen.getAllByTestId('good-renderer')).toHaveLength(2);
  });

  it('replaces only the failing section body with an inline error, keeping its card', () => {
    renderDoc([
      mkSection('a', 'crash-test-ok'),
      mkSection('bad', 'crash-test-boom'),
    ]);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    // The failing section's own card/header survives, so the user can still see
    // WHICH section is broken rather than facing an empty page.
    expect(screen.getByTestId('section-block-bad')).toBeInTheDocument();
    expect(screen.getByTestId('section-block-a')).toBeInTheDocument();
  });
});
