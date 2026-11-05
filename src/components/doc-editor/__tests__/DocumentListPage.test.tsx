import { cleanup, createEvent, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DocumentListPage from '../DocumentListPage';
import type { DocumentInfo, PresenceInfo } from '../DocumentListPage';

afterEach(cleanup);

function doc(overrides: Partial<DocumentInfo> = {}): DocumentInfo {
  return {
    id: 'doc-1',
    title: 'Launch Plan',
    type: 'plan',
    status: 'draft',
    createdBy: 'u1',
    createdAt: '2026-06-07T12:00:00Z',
    updatedAt: '2026-06-07T12:00:00Z',
    icon: '📄',
    ...overrides,
  };
}

function presenceUser(overrides: Partial<PresenceInfo> = {}): PresenceInfo {
  return { userId: 'u2', displayName: 'Ann Lee', color: '#0f0', mode: 'editor', ...overrides };
}

function renderList(overrides: Partial<React.ComponentProps<typeof DocumentListPage>> = {}) {
  const props = {
    documents: [doc()],
    presence: {} as Record<string, PresenceInfo[]>,
    onOpenDocument: vi.fn(),
    onCreateDocument: vi.fn(),
    onDeleteDocument: vi.fn(),
    onJumpToUser: vi.fn(),
    ...overrides,
  };
  render(<DocumentListPage {...props} />);
  return props;
}

// REGRESSION: the document card was a bare <div> with onClick. The only
// focusable thing inside it was the Delete button, which is hover-only, so a
// keyboard user could not open a document from this page. The card wraps that
// nested button, so it is role="button" + tabIndex + onKeyDown, not a <button>.
describe('DocumentListPage — document card keyboard access', () => {
  it('exposes the card as a focusable button with a meaningful label', () => {
    renderList();

    const card = screen.getByRole('button', { name: 'Open Launch Plan' });
    expect(card).toHaveAttribute('tabindex', '0');
    expect(card).toHaveAttribute('data-testid', 'document-card-doc-1');

    card.focus();
    expect(card).toHaveFocus();
  });

  it('opens the document on Enter', () => {
    const { onOpenDocument } = renderList();

    fireEvent.keyDown(screen.getByRole('button', { name: 'Open Launch Plan' }), { key: 'Enter' });

    expect(onOpenDocument).toHaveBeenCalledWith('doc-1');
  });

  it('opens the document on Space and prevents the page from scrolling', () => {
    const { onOpenDocument } = renderList();

    const card = screen.getByRole('button', { name: 'Open Launch Plan' });
    const ev = createEvent.keyDown(card, { key: ' ' });
    fireEvent(card, ev);

    expect(onOpenDocument).toHaveBeenCalledWith('doc-1');
    expect(ev.defaultPrevented).toBe(true);
  });
});

// REGRESSION: the presence avatar carried an onClick that jumps to that user's
// cursor, but was a plain <div> — no role, not focusable, unusable by keyboard.
describe('DocumentListPage — presence avatar keyboard access', () => {
  it('exposes each avatar as a focusable button that jumps to the user', () => {
    const { onJumpToUser, onOpenDocument } = renderList({
      presence: { 'doc-1': [presenceUser()] },
    });

    const avatar = screen.getByRole('button', { name: 'Ann Lee — Editing' });
    expect(avatar.tagName).toBe('BUTTON');
    expect(avatar).toHaveAttribute('type', 'button');

    avatar.focus();
    expect(avatar).toHaveFocus();

    fireEvent.click(avatar);
    expect(onJumpToUser).toHaveBeenCalledWith('doc-1', 'u2');
    // The avatar click must not also open the document.
    expect(onOpenDocument).not.toHaveBeenCalled();
  });
});

// REGRESSION: the per-card Delete button was gated on `hoveredCard`, which was
// set only by onMouseEnter. It was therefore never in the DOM for a keyboard
// user — no Tab stop existed — so a document could not be deleted without a
// mouse. Making the card focusable did not fix that on its own; the reveal
// itself had to react to focus.
describe('DocumentListPage — Delete is reachable without a mouse', () => {
  it('is absent until the card is hovered or focused', () => {
    renderList();
    expect(screen.queryByRole('button', { name: 'Delete Launch Plan' })).not.toBeInTheDocument();
  });

  it('appears when the card takes focus', () => {
    renderList();
    const card = screen.getByRole('button', { name: 'Open Launch Plan' });

    fireEvent.focus(card);

    expect(screen.getByRole('button', { name: 'Delete Launch Plan' })).toBeInTheDocument();
  });

  it('stays mounted while focus moves from the card into it', () => {
    renderList();
    const card = screen.getByRole('button', { name: 'Open Launch Plan' });
    fireEvent.focus(card);
    const del = screen.getByRole('button', { name: 'Delete Launch Plan' });

    fireEvent.blur(card, { relatedTarget: del });

    expect(screen.getByRole('button', { name: 'Delete Launch Plan' })).toBeInTheDocument();
  });

  it('hides again once focus leaves the card entirely', () => {
    renderList();
    const card = screen.getByRole('button', { name: 'Open Launch Plan' });
    fireEvent.focus(card);
    expect(screen.getByRole('button', { name: 'Delete Launch Plan' })).toBeInTheDocument();

    fireEvent.blur(card, { relatedTarget: document.body });

    expect(screen.queryByRole('button', { name: 'Delete Launch Plan' })).not.toBeInTheDocument();
  });

  it('does not also open the document when Delete is keyed', () => {
    const { onOpenDocument } = renderList();
    const card = screen.getByRole('button', { name: 'Open Launch Plan' });
    fireEvent.focus(card);

    const del = screen.getByRole('button', { name: 'Delete Launch Plan' });
    fireEvent.keyDown(del, { key: ' ' });

    expect(onOpenDocument).not.toHaveBeenCalled();
  });
});

// Empty-chrome rule (2.503.0): a pager appears only when there is more than
// one page — never above an empty list, never for a list that fits.
describe('DocumentListPage pager', () => {
  it('draws no pager with zero documents or a list that fits on one page', () => {
    renderList({ documents: [] });
    expect(screen.queryByTestId('pagination-controls')).toBeNull();
    cleanup();
    renderList({ documents: Array.from({ length: 10 }, (_, i) => doc({ id: `d${i}`, title: `Doc ${i}` })) });
    expect(screen.queryByTestId('pagination-controls')).toBeNull();
  });
  it('draws the pager once the list spans pages', () => {
    renderList({ documents: Array.from({ length: 11 }, (_, i) => doc({ id: `d${i}`, title: `Doc ${i}` })) });
    expect(screen.getByTestId('pagination-controls')).toHaveAttribute('data-collection-pager');
  });
});
