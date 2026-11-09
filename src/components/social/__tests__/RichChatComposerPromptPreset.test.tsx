// 2.508.0 — `toolbar="prompt"`: a box for one instruction. No formatting
// controls anywhere; the strip is attach (when allowed), the divider, then the
// host's extras. Docks like `basic`. `suggestionsVisible="empty"` keeps the
// chips at rest. `ContextComposer` forwards `toolbar` and `suggestionsVisible`.
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';
import { ContextComposer } from '../ContextComposer';

afterEach(cleanup);

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

const base = { onSend: () => {}, 'data-testid': 'composer', toolbar: 'prompt' } as const;
const FORMATTING = ['Bold', 'Italic', 'Strikethrough', 'Code', 'Add link', 'Bulleted list', 'Numbered list', 'Quote', 'More formatting'];

const stripLabels = () =>
  within(screen.getByTestId('composer-format-toolbar'))
    .queryAllByRole('button')
    .map((b) => b.getAttribute('aria-label'));

describe('toolbar="prompt"', () => {
  it('renders zero formatting buttons and keeps attach when attachments are allowed', () => {
    render(<RichChatComposer {...base} layout="wide" allowAttachments />);
    expect(stripLabels()).toEqual(['Attach files']);
    for (const name of FORMATTING) expect(screen.queryByRole('button', { name })).toBeNull();
  });

  it('without attachments the strip is empty and draws no divider', () => {
    render(<RichChatComposer {...base} layout="wide" />);
    expect(stripLabels()).toEqual([]);
    expect(screen.queryByTestId('composer-extras-divider')).toBeNull();
  });

  it('attach, then the divider, then the host extras', () => {
    render(<RichChatComposer {...base} layout="wide" allowAttachments toolbarExtras={<span data-testid="extra">Workflow</span>} />);
    const strip = screen.getByTestId('composer-format-toolbar');
    const attach = within(strip).getByRole('button', { name: 'Attach files' });
    const divider = screen.getByTestId('composer-extras-divider');
    const extra = screen.getByTestId('extra');
    expect(attach.compareDocumentPosition(divider) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(divider.compareDocumentPosition(extra) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('extras alone get no leading divider', () => {
    render(<RichChatComposer {...base} layout="wide" toolbarExtras={<span data-testid="extra">Workflow</span>} />);
    expect(screen.getByTestId('extra')).toBeInTheDocument();
    expect(screen.queryByTestId('composer-extras-divider')).toBeNull();
  });

  it('the ? menu lists keyboard hints only, no Formatting section', async () => {
    render(<RichChatComposer {...base} layout="wide" density="compact" hints={[{ key: '⌘K', label: 'to quickly open' }]} />);
    await act(async () => { fireEvent.click(screen.getByTestId('composer-hints-toggle')); });
    const menu = screen.getByTestId('composer-hints-menu');
    expect(within(menu).queryByText('Formatting')).toBeNull();
    expect(within(menu).queryByText('Strikethrough')).toBeNull();
    expect(within(menu).getByText('to quickly open')).toBeInTheDocument();
  });

  it('narrow: the toggle reads "Show tools", and is absent with nothing to show', () => {
    const { rerender } = render(<RichChatComposer {...base} layout="narrow" allowAttachments />);
    expect(screen.getByRole('button', { name: 'Show tools' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Show formatting' })).toBeNull();
    rerender(<RichChatComposer {...base} layout="narrow" />);
    expect(screen.queryByTestId('composer-format-toggle')).toBeNull();
  });

  it('docks like basic under modeControl="menu": boxed picker, input well, no formatting', () => {
    render(<RichChatComposer {...base} layout="wide" mode="agent" modeControl="menu" onModeChange={() => {}} allowAttachments />);
    expect(document.querySelector('[data-basic-well]')).not.toBeNull();
    expect(screen.getByTestId('composer-mode-menu').className).toContain('border-border');
    expect(stripLabels()).toEqual(['Attach files']);
    // Not the prompt card: no `/ Commands` foot, no round icon Send.
    expect(screen.queryByTestId('composer-prompt-toolbar')).toBeNull();
    expect(screen.getByTestId('composer-send')).not.toHaveClass('rounded-full');
  });

  it('prompt-card keeps the 2.389.11 card', () => {
    render(<RichChatComposer {...base} toolbar="prompt-card" layout="wide" mode="agent" modeControl="menu" onModeChange={() => {}} />);
    expect(screen.getByTestId('composer-prompt-toolbar')).toBeInTheDocument();
  });
});

describe('suggestionsVisible', () => {
  const suggestions = ['Approve', 'Set up voices'];

  it('focused (default): no chips at rest', () => {
    render(<RichChatComposer {...base} layout="wide" suggestions={suggestions} onSuggestion={() => {}} />);
    expect(screen.queryByTestId('composer-suggestions')).toBeNull();
  });

  it('empty: chips at rest while the input is empty; a chip calls onSuggestion', () => {
    const onSuggestion = vi.fn();
    render(<RichChatComposer {...base} layout="wide" suggestions={suggestions} onSuggestion={onSuggestion} suggestionsVisible="empty" />);
    const row = screen.getByTestId('composer-suggestions');
    fireEvent.click(within(row).getByText('Set up voices'));
    expect(onSuggestion).toHaveBeenCalledWith('Set up voices');
  });

  it('chips are on the 12px control step (2.515.0, was 11px)', () => {
    render(<RichChatComposer {...base} layout="wide" suggestions={suggestions} onSuggestion={() => {}} suggestionsVisible="empty" />);
    const chip = within(screen.getByTestId('composer-suggestions')).getByText('Approve');
    expect(chip).toHaveClass('text-xs');
    expect(chip.className).not.toContain('text-[11px]');
    expect(chip).toHaveAttribute('data-ui-chip', 'suggestion');
  });

  it('empty: still never on the folded idle row', () => {
    render(<RichChatComposer {...base} layout="wide" collapseWhenIdle suggestions={suggestions} onSuggestion={() => {}} suggestionsVisible="empty" />);
    expect(screen.queryByTestId('composer-suggestions')).toBeNull();
  });
});

describe('ContextComposer', () => {
  const DOC = { kind: 'document', id: 'doc-1', title: 'Roadmap' } as const;

  it('forwards toolbar: prompt drops the formatting strip, the default keeps it', () => {
    const { unmount } = render(<ContextComposer context={DOC} onSend={() => true} composerTestId="composer" expanded />);
    expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
    unmount();
    render(<ContextComposer context={DOC} onSend={() => true} composerTestId="composer" expanded toolbar="prompt" />);
    expect(screen.queryByRole('button', { name: 'Bold' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Quote' })).toBeNull();
    expect(screen.getByTestId('composer-format-toolbar')).toBeInTheDocument();
  });

  it('forwards suggestionsVisible', () => {
    render(<ContextComposer context={DOC} onSend={() => true} composerTestId="composer" expanded
      suggestions={['Approve']} onSuggestion={() => {}} suggestionsVisible="empty" />);
    expect(screen.getByTestId('composer-suggestions')).toHaveTextContent('Approve');
  });
});
