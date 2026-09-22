// src/components/__tests__/focusAndLiveRegions.test.tsx
//
// Second a11y audit pass: what happens AFTER a control is activated.
//
//  * Overlays that let Tab escape into the page behind them, never move focus
//    in, or never hand it back to the trigger (categories A and B).
//  * Dismissable layers that Escape could not close (category C).
//  * Async results — a fetch that failed, a save that landed, a stream that
//    died — rendered with no live region, so a screen-reader user gets
//    silence and no way to know the operation finished (category D).
//  * A wizard step that advances without moving focus (category E).
//
// jsdom caveat, stated plainly: jsdom implements no native Tab traversal, so
// the trap assertions below drive the components' own `keydown` handlers via
// `fireEvent.keyDown(window, …)` and assert where the handler put focus. They
// prove the handler's logic; they cannot prove the browser's tab order.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import IngestItemDrawer from '../ingest/IngestItemDrawer';
import ErrorOverlay from '../pipelines/canvas/ErrorOverlay';
import { UserMenu } from '../shared/UserMenu';
import IconPicker from '../shared/IconPicker';
import FieldTypesPage from '../field-types/FieldTypesPage';
import { resetOverlayStack } from '../../lib/overlayStack';
import type { IngestItem } from '../../types/ingest';

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({ idToken: 'test-token' }),
  useOptionalIdentityContext: () => ({ idToken: 'test-token' }),
}));
vi.mock('../../hooks/useIngestProgress', () => ({
  useIngestProgress: () => ({ events: [] }),
}));

beforeEach(() => {
  resetOverlayStack();
});

const ITEM = {
  itemId: 'item-1',
  sourceId: 'src-1',
  sourcePath: '/inbox/report.pdf',
  status: 'failed',
} as unknown as IngestItem;

const NOOP_ACTIONS = {
  onRetry: async () => true,
  onSkip: async () => true,
};

// ── A + B: IngestItemDrawer claimed aria-modal but had no trap ────────────

describe('IngestItemDrawer — focus trap and restore', () => {
  it('moves focus into the panel on open instead of leaving it on body', () => {
    render(<IngestItemDrawer item={ITEM} onClose={() => {}} {...NOOP_ACTIONS} />);

    const panel = screen.getByRole('dialog', { name: 'Ingest item details' });
    // Mount-count independent: assert containment, not a specific element,
    // since StrictMode runs the focus effect more than once.
    expect(panel.contains(document.activeElement)).toBe(true);
    expect(document.activeElement).not.toBe(document.body);
  });

  it('wraps Tab from the last focusable back into the panel', () => {
    render(<IngestItemDrawer item={ITEM} onClose={() => {}} {...NOOP_ACTIONS} />);

    const panel = screen.getByRole('dialog', { name: 'Ingest item details' });
    const focusables = Array.from(panel.querySelectorAll<HTMLElement>('button, a[href], input'));
    expect(focusables.length).toBeGreaterThan(1);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    last.focus();
    fireEvent.keyDown(window, { key: 'Tab' });

    // Assert the WRAP, not merely "still inside": with no trap at all jsdom
    // simply leaves focus where it was, which containment would accept. Before
    // the fix Tab walked out into the ingest table behind the drawer, while
    // aria-modal="true" told the screen reader that page was inert.
    expect(document.activeElement).toBe(first);
  });

  it('restores focus to the row that opened it when it closes', () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>open row</button>
          <IngestItemDrawer
            item={open ? ITEM : null}
            onClose={() => setOpen(false)}
            {...NOOP_ACTIONS}
          />
        </>
      );
    }
    render(<Harness />);

    const trigger = screen.getByRole('button', { name: 'open row' });
    trigger.focus();
    fireEvent.click(trigger);
    const panel = screen.getByRole('dialog', { name: 'Ingest item details' });

    // Put focus somewhere INSIDE the drawer first. Without this the assertion
    // below passes vacuously against the unfixed component, which never moved
    // focus off the trigger in the first place.
    const close = screen.getByTestId('ingest-item-drawer-close');
    close.focus();
    expect(panel.contains(document.activeElement)).toBe(true);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: 'Ingest item details' })).toBeNull();
    // Without restore the user resumes from the top of the document.
    expect(document.activeElement).toBe(trigger);
  });
});

// ── C: layers that Escape could not close ────────────────────────────────

describe('ErrorOverlay — reachable and dismissable by keyboard', () => {
  const ERROR = {
    nodeId: 'node-7',
    message: 'Upstream timed out',
  } as never;

  it('moves focus into the dialog it announces itself as', () => {
    render(
      <ErrorOverlay error={ERROR} anchor={{ x: 10, y: 10 }} onDismiss={() => {}} />,
    );
    const panel = screen.getByTestId('error-overlay');
    expect(panel.contains(document.activeElement)).toBe(true);
  });

  it('closes on Escape rather than only on a mouse click of the ×', () => {
    const onDismiss = vi.fn();
    render(
      <ErrorOverlay error={ERROR} anchor={{ x: 10, y: 10 }} onDismiss={onDismiss} />,
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onDismiss).toHaveBeenCalled();
  });
});

describe('UserMenu — Escape returns focus to the trigger', () => {
  it('does not strand focus on body after dismissing', () => {
    render(
      <UserMenu
        user={{ name: 'Ada', email: 'ada@example.com' }}
        items={[{ label: 'Sign out', onClick: () => {} }]}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'User menu for Ada' });
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeTruthy();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('menu')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});

describe('IconPicker — Escape works anywhere in the panel', () => {
  it('closes from the emoji grid, not only from the custom-emoji input', () => {
    render(<IconPicker value="🙂" onChange={() => {}} />);

    const trigger = screen.getByTestId('icon-picker-trigger');
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.getByTestId('icon-picker-popover')).toBeTruthy();

    // Focus is on the grid, NOT in the custom input — the only place the old
    // handler listened. Previously this keystroke did nothing at all.
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByTestId('icon-picker-popover')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('gives the panel the dialog role its trigger advertises', () => {
    render(<IconPicker value="🙂" onChange={() => {}} />);
    fireEvent.click(screen.getByTestId('icon-picker-trigger'));
    expect(screen.getByRole('dialog', { name: 'Choose an icon' })).toBeTruthy();
  });
});

// ── A/B/C: the field-types delete confirmation ───────────────────────────

// Mirrors the helper in FieldTypesPage.test.tsx — walks the two-step wizard
// and saves, leaving one custom type in the left-hand list.
function createCustomType(name = 'Temperature') {
  fireEvent.click(screen.getByTestId('new-data-type-empty-btn'));
  fireEvent.change(screen.getByTestId('name-input'), { target: { value: name } });
  const select = screen.getByTestId('primitive-type-select') as HTMLSelectElement;
  const firstEnabled = Array.from(select.options).find((o) => o.value && !o.disabled)!;
  fireEvent.change(select, { target: { value: firstEnabled.value } });
  fireEvent.click(screen.getByTestId('next-button'));
  fireEvent.click(screen.getByTestId('save-button'));
}

describe('FieldTypesPage delete confirmation — now a real dialog', () => {
  it('announces itself, takes focus, and closes on Escape', () => {
    render(<FieldTypesPage />);
    createCustomType();

    fireEvent.click(screen.getByTitle('Delete'));

    // Was a bare portal div: no role, no name, no Escape, no focus move.
    const dialog = screen.getByRole('dialog', { name: 'Delete data type?' });
    expect(dialog.contains(document.activeElement)).toBe(true);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Delete data type?' })).toBeNull();
  });
});

// ── E: wizard step advance ───────────────────────────────────────────────

describe('FieldTypesPage wizard — focus follows the step', () => {
  it('moves focus to the new step region instead of dropping it on body', () => {
    render(<FieldTypesPage />);

    fireEvent.click(screen.getByTestId('new-data-type-empty-btn'));
    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'Temperature' },
    });
    const select = screen.getByTestId('primitive-type-select') as HTMLSelectElement;
    const firstEnabled = Array.from(select.options).find((o) => o.value && !o.disabled)!;
    fireEvent.change(select, { target: { value: firstEnabled.value } });

    fireEvent.click(screen.getByTestId('next-button'));

    // "Next →" is replaced by "Save", so the activated element is unmounted
    // and focus used to fall back to <body> with nothing announced.
    const region = screen.getByTestId('wizard-step-region');
    expect(region.getAttribute('aria-label')).toBe('Step 2 of 2');
    expect(document.activeElement).toBe(region);
  });

  it('announces the save confirmation through a live region', () => {
    render(<FieldTypesPage />);
    createCustomType();

    // Saving tears the form down, so this banner is the only evidence it
    // worked — it has to be in a live region to reach a screen reader.
    const banner = screen.getByTestId('save-banner');
    expect(banner.getAttribute('role')).toBe('status');
  });
});
