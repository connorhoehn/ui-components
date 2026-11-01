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

  it.each([
    { readOnly: 'Your role cannot post' },
    { disabled: true },
  ])('blocks the narrow formatting menu when the editor is blocked: %j', async (blocked) => {
    render(<RichChatComposer {...base} {...blocked} layout="medium" toolbar="compact" />);
    const more = screen.getByRole('button', { name: 'More formatting' });
    expect(more).toBeDisabled();
    await act(async () => { fireEvent.click(more); });
    expect(screen.queryByTestId('composer-format-more-menu')).toBeNull();
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

  // 2.386.0: the docked editor card has no `?` and no `⋯` on its strip —
  // what they held is under `Agent ⌄`, after the modes.
  it('keeps formatting out of the Agent mode menu', async () => {
    render(<RichChatComposer {...base} toolbar="editor" hints={[]} />);
    expect(screen.queryByTestId('composer-hints-toggle')).toBeNull();
    await act(async () => { fireEvent.click(screen.getByTestId('composer-mode-menu')); });
    const menu = screen.getByTestId('composer-mode-menu-list');
    expect(within(menu).queryByText('Formatting')).toBeNull();
    expect(within(menu).queryByText('Strikethrough')).toBeNull();
    expect(within(menu).queryByText('Numbered list')).toBeNull();
    expect(within(menu).queryByText('Code')).toBeNull();
    expect(within(menu).queryByText('Quote')).toBeNull();
  });

  it('puts moreActions under Agent ⌄ rather than a ⋯, and Send takes the host label', async () => {
    let picked = '';
    render(
      <RichChatComposer
        {...base}
        toolbar="editor"
        submitLabel="Send"
        moreActions={[{ items: [{ label: 'Draft a presentation', onSelect: () => { picked = 'deck'; } }] }]}
      />,
    );
    expect(screen.queryByTestId('composer-more-actions-trigger')).toBeNull();
    expect(screen.getByTestId('composer-send')).toHaveTextContent('Send');
    await act(async () => { fireEvent.click(screen.getByTestId('composer-mode-menu')); });
    await act(async () => { fireEvent.click(screen.getByText('Draft a presentation')); });
    expect(picked).toBe('deck');
  });

  it('keeps ⋯ for moreActions on the compact strip', () => {
    render(<RichChatComposer {...base} toolbar="compact" moreActions={[{ items: [{ label: 'X', onSelect: () => {} }] }]} />);
    expect(screen.getByTestId('composer-more-actions-trigger')).toBeInTheDocument();
  });

  it('renders no ⋯ without moreActions', () => {
    render(<RichChatComposer {...base} toolbar="editor" />);
    expect(screen.queryByTestId('composer-more-actions')).toBeNull();
  });
});
