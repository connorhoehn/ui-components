// The composer in a dock under a canvas: one status line instead of a banner,
// suggestions only for an empty focused box (or in `?` when narrower), and a
// compact density that spends the fewest rows on chrome.
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';

afterEach(cleanup);

const base = { onSend: () => {}, 'data-testid': 'composer' } as const;

describe('status line', () => {
  it('renders one line with its action and dismiss', () => {
    const onUndo = vi.fn();
    const onDismiss = vi.fn();
    render(<RichChatComposer {...base} layout="wide" status={{ text: 'v15 is the agent’s edit.', tone: 'info', action: { label: 'Undo', onSelect: onUndo }, onDismiss }} />);
    const line = screen.getByTestId('composer-status');
    expect(line).toHaveAttribute('role', 'status');
    expect(line).toHaveTextContent('v15 is the agent’s edit.');
    fireEvent.click(screen.getByTestId('composer-status-action'));
    expect(onUndo).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('composer-status-dismiss'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders nothing without a status', () => {
    render(<RichChatComposer {...base} layout="wide" status={null} />);
    expect(screen.queryByTestId('composer-status')).toBeNull();
  });
});

describe('suggestions', () => {
  const suggestions = ['Make the title shorter', 'Tighten the bullets'];

  it('wide: a chip row only while the input is empty and focused', async () => {
    const onSuggestion = vi.fn();
    render(<RichChatComposer {...base} layout="wide" suggestions={suggestions} onSuggestion={onSuggestion} />);
    expect(screen.queryByTestId('composer-suggestions')).toBeNull();
    const input = document.querySelector('[data-testid=composer] .ProseMirror') as HTMLElement;
    await act(async () => { input.focus(); fireEvent.focusIn(input); });
    const row = screen.getByTestId('composer-suggestions');
    // Above the input: a bottom-pinned dock grows upward, so the input stays under the pointer.
    expect(row.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    fireEvent.click(within(row).getByText('Tighten the bullets'));
    expect(onSuggestion).toHaveBeenCalledWith('Tighten the bullets');
    await act(async () => { fireEvent.focusOut(input, { relatedTarget: document.body }); });
    expect(screen.queryByTestId('composer-suggestions')).toBeNull();
  });

  it('medium: no chip row; the suggestions are in the ? menu', () => {
    render(<RichChatComposer {...base} layout="medium" suggestions={suggestions} onSuggestion={() => {}} />);
    expect(screen.queryByTestId('composer-suggestions')).toBeNull();
    fireEvent.click(screen.getByTestId('composer-hints-toggle'));
    expect(screen.getByText('Make the title shorter')).toBeInTheDocument();
  });
});

describe('compact density', () => {
  it('folds the hints row into ? even when wide, and puts references and the mode-row end on the mode row', () => {
    render(
      <RichChatComposer
        {...base}
        layout="wide"
        density="compact"
        mode="agent"
        onModeChange={() => {}}
        modeControl="compact"
        hints={[{ key: 'Enter', label: 'run' }]}
        references={[{ id: 'r', label: 'Deck · Slide 1' }]}
        modeRowEnd={<span>scope</span>}
      />,
    );
    expect(screen.queryByTestId('composer-hints')).toBeNull();
    expect(screen.getByTestId('composer-hints-toggle')).toBeInTheDocument();
    const modes = screen.getByTestId('composer-modes');
    expect(within(modes).getByTestId('composer-references')).toHaveTextContent('Deck · Slide 1');
    expect(within(modes).getByTestId('composer-mode-row-end')).toHaveTextContent('scope');
    expect(screen.getByTestId('composer')).toHaveAttribute('data-density', 'compact');
  });

  it('comfortable keeps the hints row when wide and the references above', () => {
    render(<RichChatComposer {...base} layout="wide" mode="agent" onModeChange={() => {}} modeControl="compact" hints={[{ key: 'Enter', label: 'run' }]} references={[{ id: 'r', label: 'Deck' }]} />);
    expect(screen.getByTestId('composer-hints')).toBeInTheDocument();
    expect(within(screen.getByTestId('composer-modes')).queryByTestId('composer-references')).toBeNull();
  });
});
