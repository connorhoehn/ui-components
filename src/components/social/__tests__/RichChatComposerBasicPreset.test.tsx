// 2.390.0 — `toolbar="basic"`, `referencesPlacement` and ComposerReference
// `marker="dot"`: the Initiatives mockup's light docked composer.
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';
import { ComposerReferences } from '../ComposerReferences';

afterEach(cleanup);

const base = {
  onSend: () => {},
  'data-testid': 'composer',
  layout: 'wide',
  mode: 'agent',
  modeControl: 'menu',
  onModeChange: () => {},
} as const;

const labels = () =>
  within(screen.getByTestId('composer-format-toolbar'))
    .getAllByRole('button')
    .map((b) => b.getAttribute('aria-label'));

describe('toolbar="basic"', () => {
  it('renders B, I, code, link, attach — no lists, no quote', () => {
    render(<RichChatComposer {...base} toolbar="basic" allowAttachments />);
    expect(labels()).toEqual(['Bold', 'Italic', 'Code', 'Add link', 'Attach files']);
  });

  it('divides the formatting from the host extras', () => {
    render(<RichChatComposer {...base} toolbar="basic" toolbarExtras={<span>Workflow</span>} />);
    expect(screen.getByTestId('composer-extras-divider')).toBeInTheDocument();
  });

  it('docks: the input sits in a bordered well and the mode is a boxed picker without a glyph', () => {
    render(<RichChatComposer {...base} toolbar="basic" />);
    expect(document.querySelector('[data-basic-well]')).not.toBeNull();
    const trigger = screen.getByTestId('composer-mode-menu');
    expect(trigger.className).toContain('border-border');
    // Only the chevron — no sparkle glyph before "Agent".
    expect(within(trigger).getByTestId('composer-mode-label').querySelectorAll('svg')).toHaveLength(1);
  });

  it('files lists and quote under the mode menu → Formatting', async () => {
    render(<RichChatComposer {...base} toolbar="basic" />);
    await act(async () => { fireEvent.click(screen.getByTestId('composer-mode-menu')); });
    const menu = screen.getByTestId('composer-mode-menu-list');
    for (const item of ['Strikethrough', 'Bulleted list', 'Numbered list', 'Quote']) {
      expect(within(menu).getByText(item)).toBeInTheDocument();
    }
  });

  it('the editor preset is unchanged (bulleted list and quote stay; no well)', () => {
    render(<RichChatComposer {...base} toolbar="editor" allowAttachments />);
    expect(labels()).toEqual(['Bold', 'Italic', 'Code', 'Add link', 'Bulleted list', 'Quote', 'Attach files']);
    expect(document.querySelector('[data-basic-well]')).toBeNull();
    expect(screen.getByTestId('composer-mode-label').querySelectorAll('svg')).toHaveLength(2);
  });
});

describe('referencesPlacement', () => {
  const refs = [{ id: 'scope', label: 'Observability Platform', marker: 'dot' as const }];

  it('start keeps the chips beside the mode menu, not pushed to the end', () => {
    render(<RichChatComposer {...base} toolbar="basic" references={refs} referencesPlacement="start" />);
    const list = screen.getByTestId('composer-references');
    expect(list.className).not.toContain('ml-auto');
  });

  it('defaults to the end of the row', () => {
    render(<RichChatComposer {...base} toolbar="basic" references={refs} />);
    expect(screen.getByTestId('composer-references').className).toContain('ml-auto');
  });
});

describe('ComposerReference marker', () => {
  it('marker="dot" draws a dot in place of the document glyph', () => {
    render(<ComposerReferences references={[{ id: 'a', label: 'This work item', marker: 'dot' }]} />);
    expect(screen.getByTestId('composer-references-dot')).toBeInTheDocument();
    expect(screen.getByTestId('composer-references-item').querySelector('svg')).toBeNull();
  });

  it('defaults to the document glyph; an icon wins over the dot', () => {
    const { rerender } = render(<ComposerReferences references={[{ id: 'a', label: 'Doc' }]} />);
    expect(screen.queryByTestId('composer-references-dot')).toBeNull();
    expect(screen.getByTestId('composer-references-item').querySelector('svg')).not.toBeNull();
    rerender(<ComposerReferences references={[{ id: 'a', label: 'Doc', icon: '📄', marker: 'dot' }]} />);
    expect(screen.queryByTestId('composer-references-dot')).toBeNull();
  });
});
