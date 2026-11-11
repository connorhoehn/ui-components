// The voice cards never steal focus from a field the person is typing in, and
// an Enter meant for that field can never confirm (2.519.0). A card opens
// because the assistant asked, not because the person pressed anything; if it
// took focus, the next Enter of a half-typed message would approve an action.

import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { VoiceDock } from '../VoiceDock';
import { VoiceConfirmCard } from '../VoiceTurnStrip';
import { isEditableElement } from '../voiceFocus';

const dockBase = { level: 0, outputLevel: 0, onStart: vi.fn(), onStop: vi.fn(), phase: 'confirming' as const, size: 'footer' as const };

const mockMatchMedia = (matches: boolean) => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches, media: query, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
};

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

/** The microtask the popover defers its focus work to, and any effects after it. */
const settle = () => act(async () => { await Promise.resolve(); await Promise.resolve(); });

function Page({ pending, cardPresentation }: { pending: Parameters<typeof VoiceDock>[0]['pending']; cardPresentation: 'popover' | 'sheet' }) {
  return (
    <div>
      <div contentEditable suppressContentEditableWarning role="textbox" aria-label="Message" data-testid="composer" />
      <textarea aria-label="Notes" data-testid="notes" />
      <footer><VoiceDock {...dockBase} cardPresentation={cardPresentation} pending={pending} /></footer>
    </div>
  );
}

describe.each(['popover', 'sheet'] as const)('VoiceDock card (%s): the focus rule', (cardPresentation) => {
  it('opening while the person types in a contenteditable leaves focus there; their Enter does not confirm, their Escape does not cancel', async () => {
    mockMatchMedia(cardPresentation === 'sheet');
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const pending = { title: 'Send "hello" to Ada?', onConfirm, onCancel };
    const view = render(<Page pending={null} cardPresentation={cardPresentation} />);
    const composer = screen.getByTestId('composer');
    composer.focus();
    expect(composer).toHaveFocus();
    view.rerender(<Page pending={pending} cardPresentation={cardPresentation} />);
    await settle();
    expect(screen.getByTestId('voice-confirm-card')).toBeInTheDocument();
    expect(composer).toHaveFocus();
    fireEvent.keyDown(composer, { key: 'Enter' });
    fireEvent.keyDown(composer, { key: 'Escape' });
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
    // Tab from the composer is not pulled into the card either.
    fireEvent.keyDown(composer, { key: 'Tab' });
    expect(composer).toHaveFocus();
  });

  it('the same for a textarea', async () => {
    mockMatchMedia(cardPresentation === 'sheet');
    const onConfirm = vi.fn();
    const view = render(<Page pending={null} cardPresentation={cardPresentation} />);
    const notes = screen.getByTestId('notes');
    notes.focus();
    view.rerender(<Page pending={{ title: 'Archive Atlas?', onConfirm, onCancel: vi.fn() }} cardPresentation={cardPresentation} />);
    await settle();
    expect(notes).toHaveFocus();
    fireEvent.keyDown(notes, { key: 'Enter' });
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('with nothing editable focused it focuses the card container, never Confirm; Enter there does not confirm', async () => {
    mockMatchMedia(cardPresentation === 'sheet');
    const onConfirm = vi.fn();
    render(<Page pending={{ title: 'Archive Atlas?', onConfirm, onCancel: vi.fn() }} cardPresentation={cardPresentation} />);
    await settle();
    const card = screen.getByTestId('voice-confirm-card');
    expect(card).toHaveFocus();
    expect(screen.getByTestId('voice-confirm-card-confirm')).not.toHaveFocus();
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onConfirm).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('voice-confirm-card-confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('Escape cancels only when focus is inside the card', async () => {
    mockMatchMedia(cardPresentation === 'sheet');
    const onCancel = vi.fn();
    render(<Page pending={{ title: 'Archive Atlas?', onConfirm: vi.fn(), onCancel }} cardPresentation={cardPresentation} />);
    await settle();
    fireEvent.keyDown(screen.getByTestId('notes'), { key: 'Escape' });
    expect(onCancel).not.toHaveBeenCalled();
    fireEvent.keyDown(screen.getByTestId('voice-confirm-card-cancel'), { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('announces the card through its live region', async () => {
    mockMatchMedia(cardPresentation === 'sheet');
    render(<Page pending={{ title: 'Archive Atlas?', onConfirm: vi.fn(), onCancel: vi.fn() }} cardPresentation={cardPresentation} />);
    await settle();
    const region = screen.getByTestId('voice-confirm-card-announce');
    expect(region).toHaveAttribute('role', 'status');
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(region).toHaveTextContent('Confirmation needed: Archive Atlas?');
  });

  it('closing hands focus back only when it was inside the card; a field the person moved to keeps it', async () => {
    mockMatchMedia(cardPresentation === 'sheet');
    const pending = { title: 'Archive Atlas?', onConfirm: vi.fn(), onCancel: vi.fn() };
    const view = render(<Page pending={null} cardPresentation={cardPresentation} />);
    const composer = screen.getByTestId('composer');
    composer.focus();
    view.rerender(<Page pending={pending} cardPresentation={cardPresentation} />);
    await settle();
    const notes = screen.getByTestId('notes');
    notes.focus();
    view.rerender(<Page pending={null} cardPresentation={cardPresentation} />);
    await settle();
    expect(notes).toHaveFocus();
  });
});

describe('VoiceConfirmCard standalone: the focus rule', () => {
  it('does not take focus from an input elsewhere', () => {
    render(<input data-testid="search" aria-label="Search" />);
    const search = screen.getByTestId('search');
    search.focus();
    render(<VoiceConfirmCard pending={{ title: 'x', onConfirm: vi.fn(), onCancel: vi.fn() }} />);
    expect(search).toHaveFocus();
  });

  it('isEditableElement: inputs that take text, textareas, selects and contenteditables; not buttons or checkboxes', () => {
    const make = (html: string) => { const host = document.createElement('div'); host.innerHTML = html; document.body.appendChild(host); return host.firstElementChild!; };
    expect(isEditableElement(make('<input type="text">'))).toBe(true);
    expect(isEditableElement(make('<input type="search">'))).toBe(true);
    expect(isEditableElement(make('<textarea></textarea>'))).toBe(true);
    expect(isEditableElement(make('<select></select>'))).toBe(true);
    expect(isEditableElement(make('<div contenteditable="true"><p>x</p></div>').firstElementChild)).toBe(true);
    expect(isEditableElement(make('<input type="checkbox">'))).toBe(false);
    expect(isEditableElement(make('<button>b</button>'))).toBe(false);
    expect(isEditableElement(null)).toBe(false);
  });
});
