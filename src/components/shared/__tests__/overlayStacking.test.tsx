// src/components/shared/__tests__/overlayStacking.test.tsx
//
// Stacked-overlay contract. Every overlay primitive here binds its keydown
// handler on `window`, which is the last node in the propagation path — so
// before lib/overlayStack.ts landed, ONE Escape keystroke ran EVERY open
// overlay's handler and tore down the whole stack. Same for the Tab trap:
// the lower layer's trap saw a focused element it did not contain and
// "rescued" focus out of the dialog the user was actually looking at.
//
// jsdom note: jsdom implements no native Tab traversal, so the Tab tests
// here drive the components' own keydown handlers (fireEvent.keyDown on
// `window`) and assert where the handler put focus. They prove the handler's
// logic, not the browser's tab order.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRef, useState } from 'react';
import Drawer from '../Drawer';
import Modal from '../Modal';
import InlinePopover from '../InlinePopover';
import { ImageLightbox } from '../ImageLightbox';
import { resetOverlayStack } from '../../../lib/overlayStack';

function pressEscape() {
  return fireEvent.keyDown(window, { key: 'Escape' });
}
function pressTab(shiftKey = false) {
  return fireEvent.keyDown(window, { key: 'Tab', shiftKey });
}

beforeEach(() => {
  resetOverlayStack();
});

describe('Escape only dismisses the top overlay layer', () => {
  it('leaves the drawer open when a modal above it takes the Escape', () => {
    const onDrawerClose = vi.fn();
    const onModalClose = vi.fn();

    // Two separate renders, mirroring the real sequence: the drawer is
    // already up, then something opens a dialog over it.
    render(
      <Drawer open onClose={onDrawerClose} title="Settings">
        <button>drawer button</button>
      </Drawer>,
    );
    render(
      <Modal open onClose={onModalClose} title="Discard changes?">
        <button>discard</button>
      </Modal>,
    );

    pressEscape();

    expect(onModalClose).toHaveBeenCalled();
    // The bug: the drawer's own window listener also fired, so backing out
    // of the confirmation threw away the settings drawer and its edits.
    expect(onDrawerClose).not.toHaveBeenCalled();
  });

  it('leaves the modal open when a popover above it takes the Escape', () => {
    const onModalClose = vi.fn();
    const onPopoverClose = vi.fn();

    function PopoverHarness() {
      const triggerRef = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={triggerRef}>menu</button>
          <InlinePopover
            trigger={triggerRef}
            open
            onClose={onPopoverClose}
            aria-label="Row actions"
          >
            <button>rename</button>
          </InlinePopover>
        </>
      );
    }

    render(
      <Modal open onClose={onModalClose} title="Edit item">
        <button>save</button>
      </Modal>,
    );
    render(<PopoverHarness />);

    pressEscape();

    expect(onPopoverClose).toHaveBeenCalled();
    expect(onModalClose).not.toHaveBeenCalled();
  });

  it('hands Escape back to the lower layer once the top one closes', () => {
    const onDrawerClose = vi.fn();

    function Harness() {
      // Starts closed and is opened by a click, so the modal registers in a
      // LATER commit than the drawer — the real sequence a user produces.
      const [modalOpen, setModalOpen] = useState(false);
      return (
        <Drawer open onClose={onDrawerClose} title="Settings">
          <button onClick={() => setModalOpen(true)}>delete…</button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirm">
            <button onClick={() => setModalOpen(false)}>ok</button>
          </Modal>
        </Drawer>
      );
    }
    render(<Harness />);

    fireEvent.click(screen.getByRole('button', { name: 'delete…' }));
    // Close the top layer by clicking, not by Escape, so this assertion does
    // not depend on which layer won the first keystroke.
    fireEvent.click(screen.getByRole('button', { name: 'ok' }));
    expect(screen.queryByRole('button', { name: 'ok' })).toBeNull();

    pressEscape();
    // With the stack now empty above it, the drawer is topmost again.
    expect(onDrawerClose).toHaveBeenCalled();
  });

  it('does not suppress Escape for a lone overlay', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Only layer">
        <button>ok</button>
      </Modal>,
    );
    pressEscape();
    expect(onClose).toHaveBeenCalled();
  });
});

describe('the Tab trap only runs on the top overlay layer', () => {
  it('lets Tab advance normally in the middle of the top dialog', () => {
    render(
      <Drawer open onClose={() => {}} title="Settings">
        <button>drawer alpha</button>
        <button>drawer omega</button>
      </Drawer>,
    );
    render(
      <Modal open onClose={() => {}} title="Confirm">
        <button>modal alpha</button>
        <button>modal beta</button>
        <button>modal omega</button>
      </Modal>,
    );

    const beta = screen.getByRole('button', { name: 'modal beta' });
    beta.focus();
    pressTab();

    // Focus is mid-list, so the top layer's trap deliberately does NOT
    // intercept — it lets the browser advance to "modal omega". The bug: the
    // drawer's trap ran too, saw a focused element its panel doesn't contain,
    // preventDefault'd and yanked focus to the drawer behind; the modal's trap
    // then rescued it to "modal alpha". Net effect for the user — Tab in the
    // middle of a stacked dialog jumps backwards to the first control instead
    // of advancing, and the browser's own move never happens.
    //
    // jsdom implements no native tab traversal, so "advanced normally" can
    // only be observed here as "no handler moved focus". A real browser would
    // land on "modal omega".
    expect(document.activeElement).toBe(beta);
  });
});

describe('ImageLightbox arrow-key navigation respects the stack', () => {
  it('stops paging the lightbox while a modal is open above it', () => {
    const onNavigate = vi.fn();
    render(
      <ImageLightbox
        images={[
          { src: 'a.png', alt: 'a' },
          { src: 'b.png', alt: 'b' },
        ]}
        openIndex={0}
        onClose={() => {}}
        onNavigate={onNavigate}
      />,
    );
    render(
      <Modal open onClose={() => {}} title="Report image">
        <button>submit</button>
      </Modal>,
    );

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    // Otherwise the picture silently changes underneath the open dialog.
    expect(onNavigate).not.toHaveBeenCalled();
  });
});
