// A reference with a `menu` (2.389.0) — "This guide ▾" — must work where the
// composer draws references: the `modeControl="menu"` row, the compact row,
// and the idle one-row composer.
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';

afterEach(cleanup);

function guideRef(onSelect: () => void) {
  return {
    id: 'guide',
    label: 'This guide',
    menu: [{ items: [
      { label: 'This guide', active: true, onSelect: () => {} },
      { label: 'No context', onSelect },
    ] }],
  };
}

const base = { onSend: () => {}, 'data-testid': 'composer', layout: 'wide', mode: 'agent', onModeChange: () => {} } as const;

async function pick(scope: HTMLElement, label: string) {
  await act(async () => { fireEvent.click(within(scope).getByRole('button', { name: 'This guide' })); });
  await act(async () => { fireEvent.click(screen.getByRole('menuitem', { name: label })); });
}

describe('RichChatComposer — reference menu', () => {
  it('modeControl="menu": the chip sits in the mode row, opens its menu, no ×', async () => {
    const onSelect = vi.fn();
    render(<RichChatComposer {...base} modeControl="menu" references={[guideRef(onSelect)]} onRemoveReference={() => {}} />);
    const row = screen.getByTestId('composer-modes');
    const refs = within(row).getByTestId('composer-references');
    expect(within(refs).queryByRole('button', { name: /Remove/ })).toBeNull();
    await pick(refs, 'No context');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('compact density: works in the compact mode row', async () => {
    const onSelect = vi.fn();
    render(<RichChatComposer {...base} modeControl="compact" density="compact" references={[guideRef(onSelect)]} />);
    const refs = within(screen.getByTestId('composer-modes')).getByTestId('composer-references');
    await pick(refs, 'No context');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('idle (collapseWhenIdle): the chip shows in the one-row composer and its menu works', async () => {
    const onSelect = vi.fn();
    render(<RichChatComposer {...base} modeControl="menu" density="compact" collapseWhenIdle references={[guideRef(onSelect)]} />);
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'true');
    const refs = screen.getByTestId('composer-references');
    await pick(refs, 'No context');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
