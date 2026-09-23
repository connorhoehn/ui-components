// `toolbar="compact"` (2.383.0): the editor's docked card shows B, I, link,
// bulleted list and attach — no separators — and files strikethrough, code,
// numbered list and quote under `?` → Formatting. The default `full` strip
// is untouched, and below wide both presets fold exactly as before.
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';

afterEach(cleanup);

const base = {
  onSend: () => {},
  'data-testid': 'composer',
  layout: 'wide',
  mode: 'agent',
  modeControl: 'menu',
  modeShortcuts: true,
  onModeChange: () => {},
} as const;

const labels = () =>
  within(screen.getByTestId('composer-format-toolbar'))
    .getAllByRole('button')
    .map((b) => b.getAttribute('aria-label'));

describe('toolbar="compact"', () => {
  it('renders exactly B, I, link, bulleted list, attach — and no separators', () => {
    render(<RichChatComposer {...base} toolbar="compact" allowAttachments />);
    expect(labels()).toEqual(['Bold', 'Italic', 'Add link', 'Bulleted list', 'Attach files']);
    expect(screen.getByTestId('composer-format-toolbar').querySelectorAll('.bg-border')).toHaveLength(0);
    expect(screen.queryByTestId('composer-format-more')).toBeNull();
  });

  it('keeps the control size: every button is the 28px box', () => {
    render(<RichChatComposer {...base} toolbar="compact" />);
    for (const b of within(screen.getByTestId('composer-format-toolbar')).getAllByRole('button')) {
      expect(b.className).toContain('h-7 w-7');
    }
  });

  it('files strikethrough, code, numbered list and quote under ? → Formatting', async () => {
    render(<RichChatComposer {...base} toolbar="compact" hints={[]} />);
    expect(screen.queryByLabelText('Strikethrough')).toBeNull();
    expect(screen.queryByLabelText('Numbered list')).toBeNull();
    await act(async () => { fireEvent.click(screen.getByTestId('composer-hints-toggle')); });
    const menu = screen.getByTestId('composer-hints-menu');
    expect(within(menu).getByText('Formatting')).toBeInTheDocument();
    for (const item of ['Strikethrough', 'Code', 'Numbered list', 'Quote']) {
      expect(within(menu).getByText(item)).toBeInTheDocument();
    }
  });

  it('the default strip is unchanged', () => {
    render(<RichChatComposer {...base} allowAttachments />);
    expect(labels()).toEqual(['Bold', 'Italic', 'Strikethrough', 'Code', 'Add link', 'Bulleted list', 'Numbered list', 'Quote', 'Attach files']);
  });

  it('below wide the compact strip folds into ⋯ as before, not into ?', () => {
    render(<RichChatComposer {...base} layout="medium" toolbar="compact" hints={[]} />);
    expect(labels()).toEqual(['Bold', 'Italic', 'Add link', 'More formatting']);
    expect(screen.getByTestId('composer-format-more')).toBeInTheDocument();
    expect(screen.queryByTestId('composer-hints-toggle')).toBeNull();
  });
});

// `toolbar="editor"` + `moreActions` (2.385.6): the document page's docked
// card as the mockup draws it — B, I, code, link, bulleted list, quote,
// attach, a divider before the host's extras — with page actions behind ⋯.
describe('toolbar="editor"', () => {
  it('renders B, I, code, link, bulleted list, quote, attach', () => {
    render(<RichChatComposer {...base} toolbar="editor" allowAttachments />);
    expect(labels()).toEqual(['Bold', 'Italic', 'Code', 'Add link', 'Bulleted list', 'Quote', 'Attach files']);
  });

  it('divides the formatting from the host extras', () => {
    render(<RichChatComposer {...base} toolbar="editor" toolbarExtras={<span data-testid="extra">Workflow</span>} />);
    expect(screen.getByTestId('composer-extras-divider')).toBeInTheDocument();
  });

  it('files only strikethrough and numbered list under ? → Formatting', async () => {
    render(<RichChatComposer {...base} toolbar="editor" hints={[]} />);
    await act(async () => { fireEvent.click(screen.getByTestId('composer-hints-toggle')); });
    const menu = screen.getByTestId('composer-hints-menu');
    expect(within(menu).getByText('Strikethrough')).toBeInTheDocument();
    expect(within(menu).getByText('Numbered list')).toBeInTheDocument();
    expect(within(menu).queryByText('Code')).toBeNull();
    expect(within(menu).queryByText('Quote')).toBeNull();
  });

  it('puts moreActions behind a ⋯ before Send, and Send takes the host label', async () => {
    let picked = '';
    render(
      <RichChatComposer
        {...base}
        toolbar="editor"
        submitLabel="Send"
        moreActions={[{ items: [{ label: 'Draft a presentation', onSelect: () => { picked = 'deck'; } }] }]}
      />,
    );
    const trigger = screen.getByTestId('composer-more-actions-trigger');
    expect(trigger).toHaveAttribute('aria-label', 'More actions');
    expect(screen.getByTestId('composer-send')).toHaveTextContent('Send');
    await act(async () => { fireEvent.click(trigger); });
    await act(async () => { fireEvent.click(screen.getByText('Draft a presentation')); });
    expect(picked).toBe('deck');
  });

  it('renders no ⋯ without moreActions', () => {
    render(<RichChatComposer {...base} toolbar="editor" />);
    expect(screen.queryByTestId('composer-more-actions')).toBeNull();
  });
});
