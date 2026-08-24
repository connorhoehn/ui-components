// src/components/shared/__tests__/overlayFocus.test.tsx
//
// Focus-management contract shared by the overlay surfaces (deep a11y audit).
// Each of these pins a behaviour that was missing: a dialog that lets Tab
// escape into the page behind it, or that drops focus on `<body>` when it
// closes, is unusable with a keyboard or a screen reader even though every
// button inside it is perfectly labelled.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import Drawer from '../Drawer';
import { ImageLightbox, type ImageLightboxImage } from '../ImageLightbox';
import Modal from '../Modal';
import { VideoPlayerModal } from '../../video/VideoPlayerModal';

// jsdom does not implement native Tab traversal, so these tests assert the
// component's own handler: it must preventDefault and move focus itself.
function pressTab(shiftKey = false) {
  return fireEvent.keyDown(window, { key: 'Tab', shiftKey });
}

describe('Drawer — focus trap and restore', () => {
  it('wraps Tab from the last focusable back to the first', () => {
    render(
      <Drawer open onClose={() => {}} title="Settings">
        <button>alpha</button>
        <button>omega</button>
      </Drawer>,
    );

    const close = screen.getByRole('button', { name: 'Close' });
    const omega = screen.getByRole('button', { name: 'omega' });

    omega.focus();
    expect(document.activeElement).toBe(omega);

    pressTab();
    // Without the trap this would leave the dialog entirely.
    expect(document.activeElement).toBe(close);
  });

  it('wraps Shift+Tab from the first focusable back to the last', () => {
    render(
      <Drawer open onClose={() => {}} title="Settings">
        <button>alpha</button>
        <button>omega</button>
      </Drawer>,
    );

    const close = screen.getByRole('button', { name: 'Close' });
    const omega = screen.getByRole('button', { name: 'omega' });

    close.focus();
    pressTab(true);
    expect(document.activeElement).toBe(omega);
  });

  it('restores focus to the trigger when it closes', () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Open drawer</button>
          <Drawer open={open} onClose={() => setOpen(false)} title="Settings">
            <button>alpha</button>
          </Drawer>
        </>
      );
    }
    render(<Harness />);

    const trigger = screen.getByRole('button', { name: 'Open drawer' });
    trigger.focus();
    fireEvent.click(trigger);
    expect(document.activeElement).not.toBe(trigger);

    fireEvent.keyDown(window, { key: 'Escape' });
    // Previously focus was left on <body>, so the next Tab restarted from
    // the top of the page.
    expect(document.activeElement).toBe(trigger);
  });

  it('labels the dialog with its visible heading', () => {
    render(<Drawer open onClose={() => {}} title="Settings">body</Drawer>);
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Settings');
  });

  it('accepts an explicit aria-label when there is no visible title', () => {
    render(
      <Drawer open onClose={() => {}} aria-label="Item details">
        body
      </Drawer>,
    );
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Item details');
  });
});

const LIGHTBOX_IMAGES: ImageLightboxImage[] = [
  { src: '/a.png', alt: 'A', caption: 'First' },
  { src: '/b.png', alt: 'B' },
];

describe('ImageLightbox — focus trap', () => {
  it('keeps Tab inside the overlay', () => {
    render(
      <ImageLightbox images={LIGHTBOX_IMAGES} openIndex={0} onClose={() => {}} />,
    );

    const close = screen.getByTestId('image-lightbox-close');
    const next = screen.getByTestId('image-lightbox-next');

    next.focus();
    pressTab();
    // The overlay is fully opaque; focus landing behind it would be invisible.
    expect(document.activeElement).toBe(close);
  });

  it('pulls focus back in when it has escaped the overlay', () => {
    render(
      <>
        <button>behind</button>
        <ImageLightbox images={LIGHTBOX_IMAGES} openIndex={0} onClose={() => {}} />
      </>,
    );

    screen.getByRole('button', { name: 'behind' }).focus();
    pressTab();
    expect(screen.getByTestId('image-lightbox')).toContainElement(
      document.activeElement as HTMLElement,
    );
  });
});

describe('VideoPlayerModal — focus management', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('moves focus into the card on mount and restores it on unmount', () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Play recording</button>
          {open && (
            <VideoPlayerModal
              title="Standup"
              sources={[{ url: '/clip.mp4' }]}
              onClose={() => setOpen(false)}
            />
          )}
        </>
      );
    }
    render(<Harness />);

    const trigger = screen.getByRole('button', { name: 'Play recording' });
    trigger.focus();
    fireEvent.click(trigger);

    // Focus used to stay on the trigger BEHIND the aria-modal overlay.
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close' }));

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(document.activeElement).toBe(trigger);
  });

  it('wraps Tab inside the card', () => {
    render(
      <>
        <button>behind</button>
        <VideoPlayerModal
          title="Standup"
          sources={[{ url: '/clip.mp4' }]}
          onClose={() => {}}
        />
      </>,
    );

    const download = screen.getByRole('link', { name: 'Download' });
    download.focus();
    pressTab();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close' }));
  });
});

describe('Modal — accessible name', () => {
  it('uses ariaLabel when the modal renders its own heading', () => {
    render(
      <Modal open onClose={() => {}} ariaLabel="Command palette" rawChildren>
        <button>run</button>
      </Modal>,
    );
    // Previously `aria-label={title}` left a title-less modal announcing as a
    // bare "dialog".
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Command palette');
  });

  it('still prefers the visible title when both are given', () => {
    render(
      <Modal open onClose={() => {}} title="Delete pipeline" ariaLabel="ignored">
        body
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Delete pipeline');
  });
});
